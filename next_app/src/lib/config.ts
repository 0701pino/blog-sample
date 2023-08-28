export const TOP_POSTS_LIMIT = 3;
export const PAGE_POSTS_LIMIT = 6;

const SUB_DIRECTORY = "/blog-sample";

const isProd = process.env.NODE_ENV == "production";

export const BASE_PATH = isProd ? SUB_DIRECTORY : "";
