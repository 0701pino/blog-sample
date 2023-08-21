/** @type {import('next').NextConfig} */
const withExportImages = require("next-export-optimize-images");
const CheckImageExistencePlugin = require("./plugin/check-image-existance.js");

const nextConfig = withExportImages({
  output: "export",
  experimental: {
    appDir: true,
  },
  webpack(config) {
    // 絵文字ファイルが存在するかチェックするカスタムプラグインの追加
    config.plugins.push(new CheckImageExistencePlugin());
    return config;
  },
});

module.exports = nextConfig;
