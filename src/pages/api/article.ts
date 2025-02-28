import axios from "axios";

export default async function handler(req: any, res: any) {
  const { uid, cursor } = req.body;
  try {
    const response = await axios.post(
      "https://api.juejin.cn/content_api/v1/article/query_list",
      {
        cursor,
        sort_type: 2,
        user_id: uid,
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error("@@@proxy query_list error:", error);
    res.status(500).json({ error: "query_list代理请求失败" });
  }
}
