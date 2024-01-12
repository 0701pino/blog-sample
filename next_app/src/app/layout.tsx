import { BASE_PATH, BASE_URL, DESCRIPTION, TITLE } from "@/lib/config";
import "./styles/globals.css";
import type { Metadata } from "next";

import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: {
    default: TITLE,
    template: `%s | ${TITLE}`,
  },
  description: DESCRIPTION,
  metadataBase: new URL(BASE_URL),
  generator: "Next.js",
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: BASE_URL,
    siteName: TITLE,
    locale: "ja_JP",
    type: "website",
    images: `${BASE_PATH}/images/top.png`,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    creator: "@0701pino",
    images: `${BASE_PATH}/images/top.png`,
  },
};

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="ja">
      <head>
        <title>Home</title>
      </head>
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

export default RootLayout;
