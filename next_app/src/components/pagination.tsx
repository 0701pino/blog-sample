import "@/app/styles/globals.css";
import Link from "next/link";

const Pagination = ({ currentPage, maxPage }: { currentPage: number; maxPage: number }) => {
  const pages = generatePaginationArray(currentPage, maxPage);

  return (
    <div className="flex items-center space-x-1 mt-8">
      {pages.map((page, index) =>
        typeof page === "string" ? (
          <span key={"page_" + index} className="mx-2">
            {page}
          </span>
        ) : (
          <Link
            href={`/page/${page}`}
            key={"page_" + index}
            className={`px-4 py-2 border hover:bg-black hover:text-white ${
              currentPage === page ? "bg-black text-white" : ""
            }`}
          >
            {page}
          </Link>
        ),
      )}
    </div>
  );
};

export default Pagination;

const generatePaginationArray = (currentPage: number, maxPage: number): (number | string)[] => {
  const paginationArray: (number | string)[] = [1];
  if (maxPage == 1) {
    return paginationArray;
  }

  if (currentPage > 4) {
    paginationArray.push("･･･");
  }

  for (let i = Math.max(2, currentPage - 2); i <= Math.min(maxPage - 1, currentPage + 2); i++) {
    paginationArray.push(i);
  }

  if (currentPage < maxPage - 3) {
    paginationArray.push("･･･");
  }

  paginationArray.push(maxPage);

  return paginationArray;
};
