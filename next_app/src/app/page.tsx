import Image from "next/image";
import { getTopPosts } from "./helper/get-top-contents";
import LatestPosts from "./components/latest-posts";

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
      <div className="max-w-[90%]">
        <LatestPosts latestPosts={latestPosts} />
      </div>
      {/* {latestPosts.map((post) => (
        <LatestPost key={post.slug} post={post} />
      ))} */}
    </div>
  );
};

export default Home;
