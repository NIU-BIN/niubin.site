import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  const { page } = router.query;

  useEffect(() => {
    if (page) {
      router.replace(`/?page=${page}`, undefined, { shallow: true });
    }
  }, [page, router]);

  return null; // 不需要渲染任何内容
}
