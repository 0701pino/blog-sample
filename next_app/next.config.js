/** @type {import('next').NextConfig} */
const withExportImages = require("next-export-optimize-images");
const basePath = process.env.URL_PREFIX ? process.env.URL_PREFIX : "";

const nextConfig = withExportImages({
  output: "export",
  basePath: basePath,
});

module.exports = nextConfig;
