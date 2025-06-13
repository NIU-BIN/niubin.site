import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  isSearch: boolean;
  keyword: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  isSearch,
  keyword,
}: PaginationProps) {
  const back = () => {
    console.log("!!!", keyword, isSearch);
    if (keyword) {
      return currentPage - 1 === 1
        ? `/blog/1/${keyword}`
        : `/blog/${currentPage - 1}?keyword=${keyword}`;
    } else {
      return currentPage - 1 === 1 ? "/blog/1" : `/blog/${currentPage - 1}`;
    }
  };
  const next = () => {
    if (keyword) {
      console.log("!!!!!!!!!");
      return `/blog/${currentPage + 1}/${keyword}`;
    } else {
      console.log("@@@@@@@@@@");
      return `/blog/${currentPage + 1}`;
    }
  };

  return (
    <div className="mt-16 flex gap-12 justify-center items-center">
      <Link
        className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100"
        href={{
          pathname: back(),
        }}
      >
        {/* style={{
          cursor: currentPage === 1 && !isSearch ? "not-allowed" : "pointer",
          opacity: currentPage === 1 && !isSearch ? 0.5 : 1,
          pointerEvents: currentPage === 1 && !isSearch ? "none" : "auto",
        }} */}
        上一页
      </Link>
      {!isSearch && (
        <span className="w-20 text-center">
          {currentPage}/{totalPages}
        </span>
      )}
      <Link
        className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100"
        href={{
          pathname: next(),
        }}
      >
        {/* style={{
          cursor:
            currentPage === totalPages && !isSearch ? "not-allowed" : "pointer",
          opacity: currentPage === totalPages && !isSearch ? 0.5 : 1,
          pointerEvents:
            currentPage === totalPages && !isSearch ? "none" : "auto",
        }} */}
        下一页
      </Link>
    </div>
  );
}
