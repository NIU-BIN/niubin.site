import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getArticles, getTargetArticles } from "@/lib/data";
import ArticleList from "@/components/ArticleList";
import Pagination from "@/components/Pagination";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import "@/styles/blog.css";

const requestMap = {
  search: "/api/search",
  all: "/api/article",
};

const uid = "545789884249437";

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
    cursor: "0",
  });
  const [complete, setComplete] = useState(false);
  const [date, setDate] = useState<null | number>(null);
  const [isSearch, setIsSearch] = useState(false);
  const theEndRef = useRef(null);

  useEffect(() => {
    let observer: IntersectionObserver;
    if (theEndRef.current) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setDate(new Date().getTime());
          }
        });
      });
      observer.observe(theEndRef.current!);
    }
    return () => {
      observer && observer.disconnect();
    };
  }, [theEndRef]);

  useEffect(() => {
    console.log("!!!!!!!!res: ", res, data);
    setRes({
      data,
      count,
      page,
      cursor: "0",
    });
  }, [data]);

  useEffect(() => {
    if (date) {
      !complete && handleSearch(res.cursor);
    }
  }, [date]);

  const handleSearch = async (cursor?: string) => {
    const requestURL = keyword ? requestMap["search"] : requestMap["all"];
    setIsSearch(!!keyword);
    const params: any = {
      uid,
    };
    if (keyword || cursor) {
      params.keyword = keyword;
      params.cursor = cursor || "0";
      params.limit = 5;
    } else {
      params.cursor = "0";
    }
    const result = await axios.post(requestURL, params);
    console.log("result: ", result);
    setRes({
      ...res,
      data: cursor ? [...res.data, ...result.data.data] : result.data.data,
      count: result.data.count,
      page: 1,
      cursor: result.data.cursor,
    });
    keyword && setComplete(!result.data.has_more);
    console.log("result: ", result.data);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mt-12 mb-4">
        <h2 className="text-5xl font-black font-serif">All Article</h2>
        <p className="mt-5 italic font-mono text-gray-500">
          Here are all the articles I have written. I hope you can find what you
          want.
        </p>
      </div>
      <div className="mb-12 border-b pb-10 border-gray-200 ">
        <div className="relative w-[460px] h-10 overflow-hidden">
          <input
            type="text"
            className="w-full h-full border border-gray-400 rounded-md pl-4"
            placeholder="Search article"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button
            className="absolute right-0 top-0 h-full w-10 flex justify-center items-center"
            onClick={() => handleSearch()}
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
      {/* {JSON.stringify(res.data)} */}
      <ArticleList
        totalPages={res.count}
        currentPage={res.page}
        articles={res.data}
        isHome={false}
      />
      {isSearch && (
        <div ref={theEndRef} className="my-8 text-center">
          {complete ? (
            <p className="text-center text-gray-500">已经到底啦</p>
          ) : (
            <div>loading...</div>
          )}
        </div>
      )}
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
  console.log("??????初始化context!!!!!: ", context.query.slug);
  /* 
    文章列表查询的 cursor 为 0 代表第一页，为 10 代表第二页
    但是搜索的时候 cursor 为 0 代表第一页，但是传递10 20 30永远不会结束，
    他查询搜索的第二页的时候需要传递第一页返回的cursor作为入参，第三页的时候需要传递第二页返回的cursor作为入参
    所以该接口无法得知你查询的总条数有多少
  */
  const uid = process.env.uid!;
  const slug = context.query.slug;
  if (slug && slug.length === 1) {
    const { data, count } = await getArticles(uid, (Number(slug[0]) - 1) * 10);
    console.log("data: ", data[0]?.article_info);
    console.log(
      `----------------------------------------------------${slug[0]} end`
    );
    return { props: { data: data, count, page: +slug[0]! } };
  } else if (slug && slug.length === 2) {
    const keyword = slug[1];
    console.log("keyword^^^^^^: ", keyword);
    const { data, count } = await getTargetArticles(uid, keyword, "0", 5);
    return { props: { data, count, page: 1 } };
  } else {
    return { props: { data: [], count: 0, page: 1 } };
  }
}
