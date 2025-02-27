import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import { config } from "@/config";
import { MENU_LIST } from "@/lib";
import Link from "next/link";
import Footer from "./Footer";

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
        <h1 className="text-xl font-bold text-gray-700">{config.title}</h1>
        <ul className="flex gap-5 items-center">
          {MENU_LIST.map((item) => {
            return (
              <Link href={item.path} key={item.path}>
                {item.name}
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
