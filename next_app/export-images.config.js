/**
 * @type {import('next-export-optimize-images').Config}
 */

const basePath = process.env.URL_PREFIX ? process.env.URL_PREFIX : "";
const config = {
  basePath: basePath,
};

module.exports = config;
