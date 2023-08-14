import Image from "next/image";
import { getTopPosts } from "@/lib/get-contents";
import Link from "next/link";
import PostList from "@/components/post-list";

const Home: React.FC = async () => {
  const pagePosts = await getTopPosts();
  return (
    <div className="flex flex-col items-center">
      <Image
        src="/images/top.png"
        alt="banner"
        width={720}
        height={378}
        className="max-w-[720px] w-[80vw] m-5"
      />
      <div className="mb-6">
        <PostList posts={pagePosts} />
      </div>
      <Link
        href="/page/1.html"
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        すべての記事を見る
      </Link>
    </div>
  );
};

export default Home;
