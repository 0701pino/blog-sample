import Image from "next/image";
import { getTopPosts } from "@/lib/get-contents";
import LatestPosts from "@/components/latest-posts";

const Home: React.FC = async () => {
  const latestPosts = await getTopPosts();
  return (
    <div className="flex flex-col items-center">
      <Image
        src="/images/top.png"
        alt="banner"
        width={720}
        height={378}
        className="max-w-[720px] w-[80vw] m-5"
      />
      <div className="max-w-[90%] mb-6">
        <LatestPosts latestPosts={latestPosts} />
      </div>
      {/* "View All Posts" button */}
      <a href="/page/1" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
        すべての記事を見る
      </a>
    </div>
  );
};

export default Home;
