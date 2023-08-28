/**
 * @type {import('next-export-optimize-images').Config}
 */

const SUB_DIRECTORY = "/blog-sample";

const isProd = process.env.NODE_ENV == "production";

const config = {
  basePath: isProd ? SUB_DIRECTORY : "",
};

module.exports = config;
