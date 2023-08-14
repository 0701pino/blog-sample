import Pagination from "@/components/pagination";
import PostList from "@/components/post-list";
import { PAGE_POSTS_LIMIT } from "@/lib/config";
import { getAllPosts, getPageContents } from "@/lib/get-contents";

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

type PageParams = {
  page: string;
}[];

// App RouterではgetStaticPathsの代わりにgenerateStaticParamsを使う
export async function generateStaticParams(): Promise<PageParams> {
  const allPosts = await getAllPosts();
  const maxPage = Math.ceil(allPosts.length / PAGE_POSTS_LIMIT);
  return Array.from({ length: maxPage }, (_, i) => ({
    page: String(i + 1),
  }));
}
