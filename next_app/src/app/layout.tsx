import "./styles/globals.css";
import type { Metadata } from "next";
import Head from "next/head";
import Image from "next/image";

import Link from "next/link";

export const metadata: Metadata = {
  title: "Pino blog",
  description: "Blog Sample",
};

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="ja">
      <Head>
        <title>Home</title>
      </Head>
      <body>
        <div className="flex flex-col min-h-screen bg-gray-100 ">
          <Header />
          <main className="m-3 flex flex-col items-center flex-1 ">
            <div className="w-4/5 md:w-4/5 lg:w-7/10">{children} </div>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
};

export const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-gray-200">
      <div className="flex items-center justify-center flex-grow">
        <Link href="/">
          <div className="flex items-center mr-2">
            <Image src="/images/logo.png" alt="" width={32} height={32} className="max-w-[32px]" />
            <h1 className="ml-3 text-lg font-bold">Pino blog</h1>
          </div>
        </Link>
      </div>
      {/* <div>Link</div> */}
    </header>
  );
};

export const Footer: React.FC = () => {
  return (
    <footer className="mx-auto max-w-screen-2xl px-4 md:px-8">
      <div className="pt-4 sm:pt-10 lg:pt-12">
        <div className="flex justify-center space-x-4 mb-4">
          <Link href="/privacy-policy" className="text-sm underline">
            プライバシーポリシー
          </Link>
          <Link href="/contact" className="text-sm underline">
            お問い合わせ
          </Link>
        </div>
        <div className="py-8 text-center text-sm ">&copy; pino All rights reserved.</div>
      </div>
    </footer>
  );
};

export default RootLayout;
