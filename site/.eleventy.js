
module.exports = function(eleventyConfig) {

  eleventyConfig.addPassthroughCopy("./src/style.css")
  eleventyConfig.addPassthroughCopy("./src/media")
  eleventyConfig.addPassthroughCopy("./src/css")
  eleventyConfig.addPassthroughCopy("./src/js")

  return {
    dir: {
      input: "src",
      output: "public",
    }
  };
};
