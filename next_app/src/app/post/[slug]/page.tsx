import "zenn-content-css";
import Image from "next/image";
import { getContent } from "@/lib/get-contents";
import markdownToHtml from "zenn-markdown-html";
import { formatDate } from "@/lib/util";

export default async function PageDetail({ params }: { params: { slug: string } }) {
  const post = await getContent(params.slug);
  if (!post) {
    return <>not-found</>;
  }
  const content = markdownToHtml(post.content || "");
  return (
    <>
      <div className="p-3">
        <div className="flex justify-center max-w-full m-5">
          <Image
            src={post.image ? `/images/${post.image}` : "/images/no-image.png"}
            alt=""
            width={720}
            height={378}
            layout="responsive"
          />
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

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
