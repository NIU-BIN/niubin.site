import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getArticleDetail } from "@/lib/data";
import { ArticleType } from "@/types/article";
import { useEffect } from "react";

export default function Article({
  data,
  statusCode,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  useEffect(() => {
    console.log("data: ", data);
  }, [data]);

  return (
    <>
      <div>{data?.article_info.mark_content}</div>
    </>
  );
}

// 每次刷新页面查询文章列表（首页只显示最近5条）
export async function getServerSideProps(context: GetServerSidePropsContext) {
  console.log("context: ", context.query);
  const articleId = context.query?.id as string;
  const res = await getArticleDetail(articleId);
  console.log("res@@@@@: ", res);
  if (res.err_msg === "success") {
    return { props: { data: res.data as ArticleType } };
  }
  return { props: { statusCode: 500 } };
}
