import Image from "next/image";
import Intro from "@/components/Intro";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getArticles, data } from "@/lib/data";
import { Article } from "@/types/article";
import ArticleList from "@/components/ArticleList";
import GithubContribute from "@/components/GithubContribute";
import Pagination from "@/components/Pagination";
import Link from "next/link";
// import { getServerSideProps } from "next/dist/build/templates/pages";

export default function Home({
  data,
  count,
  page,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Intro />
      <GithubContribute />
      <section className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center my-32">
          <h2 className="text-3xl font-bold">Latest Article</h2>
          <Link href={"/blog"}>view all article</Link>
        </div>
        <ArticleList totalPages={count} currentPage={page} articles={data} />
      </section>

      {/* <Pagination currentPage={page} totalPages={Math.ceil(count / 10)} /> */}
    </>
  );
}

// 每次刷新页面查询文章列表（首页只显示最近5条）
export async function getServerSideProps(context: GetServerSidePropsContext) {
  console.log("context: ", context.query);
  const page = (context.query?.page as string) || 1;
  const uid = process.env.uid!;
  const { data, count } = await getArticles(uid, (+page - 1) * 10);
  return { props: { data: data.slice(0, 5), count, page: +page } };
}
