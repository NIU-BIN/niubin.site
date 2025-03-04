import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import { getArticleDetail } from "@/lib/data";
import { ArticleType } from "@/types/article";
import { useEffect } from "react";
import matter from "gray-matter";
import MarkdownIt from "markdown-it";
import Prism from "prismjs";
import Error from "next/error";

const md = new MarkdownIt();

export default function Article({
  data,
  statusCode,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  const article = matter(data?.article_info.mark_content || "");

  if (statusCode || !data) {
    return <Error statusCode={statusCode} />;
  }

  return (
    <div className="max-w-5xl mx-auto ">
      <h1 className="mt-10 text-3xl font-bold text-gray-900">
        {data?.article_info.title}
      </h1>
      <div className="border-b-2 border-indigo-400">
        <dl className="flex items-center mt-6 mb-4 text-sm text-gray-500">
          <dt className="flex items-center gap-1">
            <Image
              src="/icon/create.svg"
              alt=""
              width="20"
              height="20"
              quality="95"
              priority={true}
            />
            <span>
              {new Date(+data?.article_info.ctime! * 1000).toLocaleDateString()}
            </span>
          </dt>
          <span className="mx-3">|</span>
          <dt className="flex items-center gap-1">
            <Image
              src="/icon/time.svg"
              alt=""
              width="20"
              height="20"
              quality="95"
              priority={true}
            />
            <span>{data?.article_info.read_time}</span>
          </dt>
          <span className="mx-3">|</span>
          <dt className="flex items-center gap-1">
            <Image
              src="/icon/views.svg"
              alt=""
              width="20"
              height="20"
              quality="95"
              priority={true}
            />
            <span>掘金{data?.article_info.view_count} 次阅读</span>
          </dt>
        </dl>
      </div>
      <div className="max-w-none prose">
        <div
          dangerouslySetInnerHTML={{ __html: md.render(article.content) }}
        ></div>
      </div>
    </div>
  );
}

// 每次刷新页面查询文章列表（首页只显示最近5条）
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const articleId = context.query?.article_id as string;
  const res = await getArticleDetail(articleId);
  if (res.err_msg === "success") {
    return { props: { data: res.data as ArticleType } };
  }
  return { props: { statusCode: 500 } };
}
