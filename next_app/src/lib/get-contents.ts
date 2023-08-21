import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { PostData } from "@/types/post-data";
import { TOP_POSTS_LIMIT, PAGE_POSTS_LIMIT } from "./config";

export const getAllPosts = async (): Promise<PostData[]> => {
  const postsDirectory = path.join(process.cwd(), "./posts");

  // fs.promises.readdirは指定したディレクトリ内の全てのファイルの名前を非同期的に返します。
  const fileNames = await fs.readdir(postsDirectory);

  // Promise.allを使用して非同期操作を並列に実行します。
  const allPostsRaw = await Promise.all(
    fileNames
      .filter((filename) => path.extname(filename) === ".md")
      .map(async (fileName): Promise<PostData | null> => {
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = await fs.readFile(fullPath, "utf8");

        type PostMetaData = {
          title?: string;
          description?: string;
          createdAt?: string;
          updatedAt?: string;
          image?: string;
          emoji?: string;
          [key: string]: string | undefined;
        };

        const { data, content }: { data: PostMetaData; content: string } = matter(fileContents);

        if (!data.title || !data.createdAt) {
          return null;
        }

        return {
          slug: path.basename(fileName, ".md"),
          title: data.title,
          image: data.image,
          description: data.description,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
          emoji: data.emoji,
          content,
        };
      }),
  );

  const allPosts = allPostsRaw.filter((post): post is PostData => post !== null); // nullをフィルタリングして、正常なデータのみを保持します。

  const sortedPosts = allPosts.sort((a, b) => {
    if (a.createdAt < b.createdAt) return 1;
    if (a.createdAt > b.createdAt) return -1;
    return 0;
  });
  return sortedPosts;
};

export const getTopPosts = async (): Promise<PostData[]> => {
  const allPosts = await getAllPosts();
  if (allPosts) {
    return allPosts.slice(0, TOP_POSTS_LIMIT);
  } else {
    return [];
  }
};

export const getPageContents = async (
  page: number,
): Promise<{ pagePosts: PostData[]; maxPage: number }> => {
  const allPosts = await getAllPosts();
  const maxPage = Math.ceil(allPosts.length / PAGE_POSTS_LIMIT);
  if (allPosts) {
    const startIndex = (page - 1) * PAGE_POSTS_LIMIT;
    const endIndex = startIndex + PAGE_POSTS_LIMIT;
    const postsForCurrentPage = allPosts.slice(startIndex, endIndex);
    return {
      pagePosts: postsForCurrentPage,
      maxPage: maxPage,
    };
  } else {
    return { pagePosts: [], maxPage: maxPage };
  }
};

export const getContent = async (slug: string): Promise<PostData | null> => {
  const allPosts = await getAllPosts();
  if (allPosts) {
    const post = allPosts.find((p) => p.slug === slug);

    if (!post) {
      return null;
    }
    return post;
  } else {
    return null;
  }
};

type ImageAttributes = {
  imageSrc: string;
  imageSize: string;
};

export const getImageAttributes = (emoji?: string, image?: string): ImageAttributes => {
  const emojiImagePath = emoji?.codePointAt(0)?.toString(16).toLowerCase();

  const imageSrc = image
    ? `/images/${image}`
    : emojiImagePath
    ? `/emoji/emoji_u${emojiImagePath}.svg`
    : "/images/no-image.png";

  const imageSize = image ? "100vw" : emojiImagePath ? "35%" : "100vw";

  return { imageSrc, imageSize };
};
