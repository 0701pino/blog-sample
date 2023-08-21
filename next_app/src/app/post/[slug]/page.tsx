import "zenn-content-css";
import Image from "next/image";
import { getAllPosts, getContent, getImageAttributes } from "@/lib/get-contents";
import markdownToHtml from "zenn-markdown-html";
import { formatDate } from "@/lib/util";

export default async function PageDetail({ params }: { params: { slug: string } }) {
  const post = await getContent(params.slug);
  if (!post) {
    return <>not-found</>;
  }
  const content = markdownToHtml(post.content || "");

  const { imageSrc, imageSize } = getImageAttributes(post.emoji, post.image);

  return (
    <>
      <div className="p-3">
        <div className="flex justify-center max-w-full">
          <Image
            src={imageSrc}
            alt=""
            width={720}
            height={378}
            sizes="50vw"
            style={{
              width: `${imageSize}`,
              height: "auto",
            }}
          />
        </div>

        <h1 className="text-4xl font-bold my-4">{post.title}</h1>

        <div className="mt-4 mb-4 flex justify-end">
          <div>{`作成日: ${formatDate(post.createdAt, true)}`}</div>
          {post.updatedAt ? (
            <div className="ml-2">最終更新日: {formatDate(post.updatedAt, true)}</div>
          ) : (
            ""
          )}
        </div>

        <div
          className="znc"
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />
      </div>
    </>
  );
}

type SlugParams = {
  slug: string;
}[];

// App RouterではgetStaticPathsの代わりにgenerateStaticParamsを使う
export async function generateStaticParams(): Promise<SlugParams> {
  const allPosts = await getAllPosts();
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}
