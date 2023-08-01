import "./styles/globals.css";
import type { Metadata } from "next";
import Head from "next/head";
import Image from "next/image";

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
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex flex-col items-center flex-1">{children}</main>
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
        <div className="flex items-center mr-2">
          <Image src="/images/logo.png" alt="" width="32" height="32" />
          <h1 className="ml-3 text-lg font-bold">Pino blog</h1>
        </div>
      </div>
      {/* <div>Link</div> */}
    </header>
  );
};

export const Footer: React.FC = () => {
  return (
    <footer className="mx-auto max-w-screen-2xl px-4 md:px-8">
      <div className=" pt-4 sm:pt-10 lg:pt-12">
        <div className="py-8 text-center text-sm ">&copy; pino All rights reserved.</div>
      </div>
    </footer>
  );
};

export default RootLayout;
