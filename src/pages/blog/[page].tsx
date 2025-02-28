import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getArticles } from "@/lib/data";
import ArticleList from "@/components/ArticleList";
import Pagination from "@/components/Pagination";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import "@/styles/blog.css";

const requestMap = {
  search: "/api/search",
  all: "/api/article",
};

export default function Blog({
  data,
  count,
  page,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [keyword, setKeyword] = useState("");
  const [res, setRes] = useState({
    data,
    count,
    page,
  });

  const handleSearch = async () => {
    const requestURL = keyword ? requestMap["search"] : requestMap["all"];
    const params: any = {
      uid: "545789884249437",
    };
    keyword ? (params["keyword"] = keyword) : (params["cursor"] = "0");
    const result = await axios.post(requestURL, params);
    setRes({
      data: result.data.data,
      count: result.data.count,
      page: 1,
    });
    console.log("result: ", result);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mt-12 mb-4">
        <h2 className="text-4xl font-black italic font-serif">All Article</h2>
        <p className="italic font-mono text-gray-500">
          Here are all the articles I have written. I hope you can find what you
          want.
        </p>
      </div>
      <div className="mb-12 border-b pb-10 border-gray-200 ">
        <div className="relative w-[460px] h-10 overflow-hidden">
          <input
            type="text"
            className="w-full h-full border border-gray-400 rounded-md pl-4"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button
            className="absolute right-0 top-0 h-full w-10 flex justify-center items-center"
            onClick={handleSearch}
          >
            <Image
              src="/icon/search.svg"
              alt="search"
              width="24"
              height="24"
              quality="95"
              priority={true}
            />
          </button>
        </div>
      </div>
      <ArticleList
        totalPages={res.count}
        currentPage={res.page}
        articles={res.data}
      />
      <Pagination
        currentPage={res.page}
        totalPages={Math.ceil(res.count / 10)}
        keyword={keyword}
      />
    </div>
  );
}

// 每次刷新页面查询文章列表（首页只显示最近5条）
export async function getServerSideProps(context: GetServerSidePropsContext) {
  console.log("context: ", context.query);
  const page = (context.query?.page as string) || 1;
  const uid = process.env.uid!;
  const { data, count } = await getArticles(uid, (+page - 1) * 10);
  return { props: { data: data, count, page: +page } };
}
