import { ArticleType } from "@/types/article";
import Image from "next/image";
import Link from "next/link";

type Props = {
  articles: ArticleType[];
  currentPage: number;
  totalPages: number;
  isHome?: boolean;
};

const ArticleList = ({
  articles,
  totalPages,
  currentPage,
  isHome = true,
}: Props) => {
  return (
    <div className="px-3 md:px-0 max-w-5xl mx-auto">
      <ul className="flex flex-col gap-16">
        {articles &&
          articles.length &&
          articles.map((article) => {
            return (
              <li
                key={article.article_id}
                className={`flex gap-8 ${!isHome && "even:flex-row-reverse"}`}
              >
                {/* <Image
                src={article.article_info.cover_image}
                alt={article.article_info.title}
                width="108"
                height="72"
                quality="95"
                priority={true}
              /> */}
                <div className="relative border-2 border-gray-500 rounded-md w-[280px] h-[190px]">
                  <img
                    src={article.article_info.cover_image}
                    className="absolute -top-3 -left-3 rounded-md object-fill w-full h-full object-fit"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl inline-block font-bold text-gray-700 relative group">
                    <Link
                      href={`/article/${article.article_id}`}
                      dangerouslySetInnerHTML={{
                        __html: article.article_info.title,
                      }}
                    ></Link>
                    <div className="absolute left-0 bottom-0 h-4 w-0 bg-indigo-200 group-hover:w-full -z-[1] transition-all duration-200 ease-in-out"></div>
                  </h3>
                  <ul className="flex gap-2 my-3">
                    {article.tags.map((tag) => {
                      return (
                        <li
                          key={tag.tag_id}
                          className="px-2 py-1 rounded-sm bg-zinc-200 text-xs text-gray-700 shadow-sm"
                        >
                          {tag.tag_name}
                        </li>
                      );
                    })}
                  </ul>
                  <p
                    className="text-zinc-500 text-sm mt-4 leading-7"
                    dangerouslySetInnerHTML={{
                      __html:
                        article.article_info.content ||
                        article.article_info.brief_content,
                    }}
                  >
                    {/* {article.article_info.content ||
                      article.article_info.brief_content} */}
                  </p>
                  <div className="float-right overflow-hidden mt-4 text-sm text-gray-500">
                    <span className="px-2 border-r border-gray-400">
                      {new Date(
                        +article.article_info.ctime * 1000
                      ).toLocaleDateString("zh-CN", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                    <span className="px-2">
                      掘金{article.article_info.view_count} 次阅读
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default ArticleList;
