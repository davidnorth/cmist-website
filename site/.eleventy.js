
module.exports = function (eleventyConfig) {

  // Static assets copied as-is. CSS is also concatenated into /bundle.css
  // for production (see src/bundle.njk and src/_data/cssFiles.js).
  eleventyConfig.addPassthroughCopy("./src/media")
  eleventyConfig.addPassthroughCopy("./src/css")
  eleventyConfig.addPassthroughCopy("./src/js")

  return {
    dir: {
      input: "src",
      output: "_site"
    }
  };
};
