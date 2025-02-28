import Link from "next/link";

export default function Pagination({ currentPage, totalPages, keyword }: any) {
  return (
    <div className="mt-16 flex gap-12 justify-center items-center">
      <Link
        className="border border-gray-300 px-4 py-2 rounded-md cursor-pointer hover:bg-gray-100"
        href={{
          pathname: `${
            currentPage - 1 === 1 ? "/blog" : `/blog/${currentPage - 1}`
          }`,
          query: { keyword },
        }}
      >
        上一页
      </Link>
      <span className="w-20 text-center">
        {currentPage}/{totalPages}
      </span>
      <Link
        className="border border-gray-300 px-4 py-2 rounded-md cursor-pointer hover:bg-gray-100"
        href={{
          pathname: `/blog/${currentPage + 1}`,
          query: { keyword },
        }}
      >
        下一页
      </Link>
    </div>
  );
}
