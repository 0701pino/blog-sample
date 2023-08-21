const fs = require("fs").promises;
const path = require("path");
const matter = require("gray-matter");

class CheckImageExistencePlugin {
  emojiToImageFileName(emoji) {
    const emojiCode = [...emoji][0].codePointAt(0).toString(16).toLowerCase();
    return `emoji_u${emojiCode}.svg`;
  }

  async apply(compiler) {
    compiler.hooks.emit.tapAsync("CheckImageExistencePlugin", async (compilation, callback) => {
      const postsDirectory = path.join(compiler.context, "/posts");
      const emojiDirectory = path.join(compiler.context, "/public/emoji");
      const imageDirectory = path.join(compiler.context, "/public/images");

      const mdFiles = await fs.readdir(postsDirectory);
      const filteredMdFiles = mdFiles.filter((file) => file.endsWith(".md"));

      for (const file of filteredMdFiles) {
        const content = await fs.readFile(path.join(postsDirectory, file), "utf-8");
        const metadata = matter(content);

        if (metadata.data.image) {
          const imagePath = path.join(imageDirectory, metadata.data.image);

          try {
            await fs.access(imagePath);
          } catch {
            compilation.errors.push(
              new Error(
                `Image ${metadata.data.image} does not exist. File ${file}, Image path ${imagePath}`,
              ),
            );
          }
        }
        if (metadata.data.emoji) {
          const imageName = this.emojiToImageFileName(metadata.data.emoji);
          const imagePath = path.join(emojiDirectory, imageName);

          try {
            await fs.access(imagePath);
          } catch {
            compilation.errors.push(
              new Error(
                `Emoji ${metadata.data.emoji} does not exist. File ${file}, Image path ${imagePath}`,
              ),
            );
          }
        }
      }

      callback();
    });
  }
}

module.exports = CheckImageExistencePlugin;
