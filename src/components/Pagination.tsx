import Link from "next/link";

export default function Pagination({ currentPage, totalPages }: any) {
  return (
    <div className="flex justify-between items-center">
      <Link
        className="border border-gray-300 px-4 py-2 rounded-md cursor-pointer"
        href={`${currentPage - 1 === 1 ? "/blog" : `/blog/${currentPage - 1}`}`}
      >
        上一页
      </Link>
      <span>
        {currentPage}/{totalPages}
      </span>
      <Link
        className="border border-gray-300 px-4 py-2 rounded-md cursor-pointer"
        href={`/blog/${currentPage + 1}`}
      >
        下一页
      </Link>
    </div>
  );
}
