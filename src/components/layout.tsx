import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import { config } from "@/config";
import { MENU_LIST } from "@/lib";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <nav className="px-[20vw] flex justify-between h-16 items-center">
        <h1>{config.title}</h1>
        <ul className="flex gap-4 items-center">
          {MENU_LIST.map((item) => {
            return (
              <Link href={item.path} key={item.path}>
                {item.name}
              </Link>
            );
          })}
        </ul>
      </nav>
      <div className="bg-[#f9fad6] absolute top-[-6rem] -z-10 right-[11rem] h-[70vh] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem] dark:bg-[#43523d]"></div>
      <div className="bg-[#c8d2ff] absolute top-[-1rem] -z-10 left-[-35rem] h-[70vh] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem]  dark:bg-[#303b53]"></div>
      <div>{children}</div>
    </>
  );
}
