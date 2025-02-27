import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getArticles } from "@/lib/data";
import ArticleList from "@/components/ArticleList";
import Pagination from "@/components/Pagination";

export default function Blog({
  data,
  count,
  page,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <ArticleList totalPages={count} currentPage={page} articles={data} />
      <Pagination currentPage={page} totalPages={Math.ceil(count / 10)} />
    </>
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
