import axios from "axios";

// cursor为0时，表示第一页，为10表示第二页，以此类推
export async function getArticles(uid: string, cursor: number = 0) {
  const res = await axios.post(
    "https://api.juejin.cn/content_api/v1/article/query_list",
    {
      cursor: cursor + "",
      sort_type: 2,
      user_id: uid + "",
    }
  );

  return res.data;
}

export async function getArticleDetail(article_id: string) {
  const res = await axios.post(
    "https://api.juejin.cn/content_api/v1/article/detail",
    {
      article_id: article_id + "",
      client_type: 2608,
    }
  );

  return res.data;
}

// 搜索文章
export async function getTargetArticles(
  uid: string,
  cursor: string,
  keyword: string,
  limit: number = 10
) {
  const res = await axios.post(
    "https://api.juejin.cn/search_api/v1/user/content",
    {
      user_id: uid,
      search_type: 1,
      cursor,
      key_word: keyword,
      limit,
    }
  );
  return res.data;
}
