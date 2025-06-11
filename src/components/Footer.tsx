import Image from "next/image";
import { MENU_LIST } from "@/lib";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="max-w-5xl mx-auto mt-16 gap-4 border-t">
      <div className="pt-6 gap-4 flex justify-center">
        <div className="flex-1">
          <div className="h-10 flex items-center gap-2">
            <Image
              src="/image/avatar.jpg"
              alt="avatar"
              width="30"
              height="30"
              quality="95"
              priority={true}
              className="rounded-md overflow-hidden"
            />
            <span className="italic">NiuBin's site</span>
          </div>
          <p className="my-4 text-base text-gray-500 italic font-mono">
            This is my personal website, used to record my articles, technology,
            and life. I hope it can help front-end developers and I am happy to
            become friends with you.
          </p>
          <div className="mt-5 flex items-center gap-2">
            <Image
              src="/icon/location.svg"
              alt="avatar"
              width="24"
              height="24"
              quality="95"
              priority={true}
              className="rounded-md overflow-hidden"
            />
            <span>Xi'an. China</span>
          </div>
        </div>
        <div className="w-32 text-right">
          <span className="h-10 items-center w-full leading-10 font-semibold">
            Sitemap
          </span>
          <ul className="my-2 text-gray-600 font-sans">
            {MENU_LIST.map((item) => {
              return (
                <li key={item.path} className="my-4 hover:text-indigo-400">
                  <Link href={item.path}>{item.name}</Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="w-36 text-right">
          <span className="h-10 items-center w-full leading-10 font-semibold">
            Personal stuff
          </span>
          <ul className="my-2 text-gray-600 font-sans">
            <li className="my-4 hover:text-indigo-400">
              <Link href="/about">About</Link>
            </li>
            <li className="my-4 hover:text-indigo-400">
              <Link href="/friends">Friends</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t py-3 text-center text-sm">
        Copyright ©2024 by &nbsp;
        <a
          href="https://github.com/NIU-BIN"
          target="_blank"
          className="italic font-mono text-indigo-400 underline"
        >
          NIU-BIN
        </a>
        &nbsp; |&nbsp; <span className="">ICP备案号：</span>
        <a
          href="https://beian.miit.gov.cn/"
          target="_blank"
          className="text-indigo-400 underline"
        >
          陕ICP备2024027341号
        </a>
      </div>
    </footer>
  );
}
