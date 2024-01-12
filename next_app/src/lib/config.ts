export const TOP_POSTS_LIMIT = 3;
export const PAGE_POSTS_LIMIT = 6;

const SUB_DIRECTORY = "/blog-sample";

const isProd = process.env.NODE_ENV == "production";

export const BASE_PATH = isProd ? SUB_DIRECTORY : "";

export const BASE_URL = process.env.URL
  ? `https://${process.env.URL}`
  : `http://localhost:${process.env.PORT || 3000}`;

export const TITLE = "Pino Sample Blog";
export const DESCRIPTION = "Next.jsの学習のために作成したサンプルブログサイトです。";
