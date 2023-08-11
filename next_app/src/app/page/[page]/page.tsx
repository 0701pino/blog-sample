import Pagination from "@/components/pagination";
import PostList from "@/components/post-list";
import { getPageContents } from "@/lib/get-contents";

const CurrentPage = async ({ params }: { params: { page: string } }) => {
  const currentPage = Number.parseInt(params.page);
  const { pagePosts, maxPage } = await getPageContents(currentPage);
  return (
    <>
      <div className="flex flex-col items-center  ">
        <div className="mb-6">
          <PostList posts={pagePosts} />
        </div>
      </div>
      <Pagination maxPage={maxPage} currentPage={currentPage}></Pagination>
    </>
  );
};

export default CurrentPage;
