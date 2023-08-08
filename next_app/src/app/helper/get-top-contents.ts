import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

const TOP_POSTS_LIMIT = 4;

//
export type PostData = {
  slug: string;
  title: string;
  description?: string;
  createdAt: string;
  updatedAt?: string;
  image?: string;
  emoji?: string;
  content: string;
};

export const getTopPosts = async (): Promise<PostData[]> => {
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

  return sortedPosts.slice(0, TOP_POSTS_LIMIT);
};
