import Pagination from "@/components/pagination";
import PagePosts from "@/components/page-posts";
import { getPageContents } from "@/lib/get-contents";

export default async function CurrentPage({ params }: { params: { page: string } }) {
  const currentPage = Number.parseInt(params.page);
  const { pagePosts, maxPage } = await getPageContents(currentPage);
  console.log(maxPage);
  return (
    <>
      <div className="flex flex-col items-center  ">
        <div className="max-w-[90%]">
          <PagePosts pagePosts={pagePosts} />
        </div>
      </div>
      <Pagination maxPage={maxPage} currentPage={currentPage}></Pagination>
    </>
  );
}
