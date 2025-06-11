import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  keyword: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  keyword,
}: PaginationProps) {
  return (
    <div className="mt-16 flex gap-12 justify-center items-center">
      <Link
        className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100"
        href={{
          pathname: `${
            currentPage - 1 === 1 ? "/blog/1" : `/blog/${currentPage - 1}`
          }`,
        }}
        style={{
          cursor: currentPage === 1 ? "not-allowed" : "pointer",
          opacity: currentPage === 1 ? 0.5 : 1,
          pointerEvents: currentPage === 1 ? "none" : "auto",
        }}
      >
        上一页
      </Link>
      {!keyword && (
        <span className="w-20 text-center">
          {currentPage}/{totalPages}
        </span>
      )}
      <Link
        className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100"
        href={{
          pathname: `/blog/${currentPage + 1}`,
        }}
        style={{
          cursor: currentPage === totalPages ? "not-allowed" : "pointer",
          opacity: currentPage === totalPages ? 0.5 : 1,
          pointerEvents: currentPage === totalPages ? "none" : "auto",
        }}
      >
        下一页
      </Link>
    </div>
  );
}
