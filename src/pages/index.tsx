import Image from "next/image";
import Intro from "@/components/Intro";
import { InferGetServerSidePropsType } from "next";
import { getArticles } from "@/lib/data";
import ArticleList from "@/components/ArticleList";
import GithubContribute from "@/components/GithubContribute";
import Link from "next/link";
import Skills from "@/components/Skills";
import About from "@/components/About";
// import { getServerSideProps } from "next/dist/build/templates/pages";

export default function Home({
  data,
  count,
  page,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <div className="bg-[#f9fad6] absolute top-[-6rem] -z-10 right-[11rem] h-[70vh] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem] dark:bg-[#43523d]"></div>
      <div className="bg-[#c8d2ff] absolute top-[-1rem] -z-10 left-[-35rem] h-[70vh] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem]  dark:bg-[#303b53]"></div>
      <Intro />
      <GithubContribute />
      {/* <About />
      <Skills /> */}
      <section className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center my-16">
          <h2 className="text-3xl font-bold border-b-2 border-black dark:border-white">
            Latest Article
          </h2>
          <Link
            href={"/blog/1"}
            className="hover:text-indigo-400 dark:border-white transition-all duration-300"
          >
            View all article →
          </Link>
        </div>
        <ArticleList
          totalPages={count}
          currentPage={page}
          articles={data}
          isHome={true}
        />
      </section>
    </>
  );
}

// 每次刷新页面查询文章列表（首页只显示最近5条）
export async function getServerSideProps() {
  const page = 1;
  const uid = process.env.uid!;
  const { data, count } = await getArticles(uid, 0);
  return { props: { data: data.slice(0, 5), count, page } };
}
