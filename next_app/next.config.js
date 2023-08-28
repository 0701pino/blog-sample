/** @type {import('next').NextConfig} */
const withExportImages = require("next-export-optimize-images");
const SUB_DIRECTORY = "/blog-sample";

const isProd = process.env.NODE_ENV == "production";

const nextConfig = withExportImages({
  output: "export",
  basePath: isProd ? SUB_DIRECTORY : "",
});

module.exports = nextConfig;
