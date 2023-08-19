/** @type {import('next').NextConfig} */
const withExportImages = require("next-export-optimize-images");
const nextConfig = withExportImages({
  output: "export",
  experimental: {
    appDir: true,
  },
});

module.exports = nextConfig;
