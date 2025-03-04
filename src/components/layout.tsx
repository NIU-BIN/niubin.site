import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import { config } from "@/config";
import { MENU_LIST } from "@/lib";
import Link from "next/link";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import "prismjs/themes/prism-okaidia.css";
// prism-coy prism-okaidia prism-tomorrow

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
  const [isTop, setIsTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsTop(false);
      } else {
        setIsTop(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="fixed w-screen h-screen -z-10 bg-[url(/image/bg.png)]">
        <div
          className="fixed w-screen h-screen -z-10"
          style={{
            background:
              "radial-gradient(rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 700%)",
          }}
        ></div>
      </div>
      <nav
        className="sticky top-0 px-[20vw] flex justify-between h-16 items-center z-30"
        style={{
          backgroundColor: isTop ? "transparent" : "rgba(255, 255, 255, 0.95)",
          boxShadow: isTop ? "none" : "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1 className="text-xl font-bold text-gray-700">{config.title}</h1>
        <ul className="flex gap-6 items-center">
          {MENU_LIST.map((item) => {
            return (
              <Link href={item.path} key={item.path} className="relative group">
                {item.name}
                <div className="absolute bottom-0 left-0 w-0 h-4 bg-indigo-200 group-hover:w-full transition-all duration-200 ease-in-out -z-[1]"></div>
              </Link>
            );
          })}
        </ul>
      </nav>
      <div>{children}</div>
      <Footer />
    </>
  );
}
