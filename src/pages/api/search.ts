import axios from "axios";

export default async function handler(req: any, res: any) {
  const { uid, keyword } = req.body;
  try {
    const response = await axios.post(
      "https://api.juejin.cn/search_api/v1/user/content",
      {
        user_id: uid,
        search_type: 1,
        cursor: "0",
        key_word: keyword,
        limit: 10,
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error("@@@proxy search error:", error);
    res.status(500).json({ error: "search代理请求失败" });
  }
}
