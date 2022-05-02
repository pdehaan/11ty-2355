const cheerio = require("cheerio");

module.exports = function (eleventyConfig) {
  eleventyConfig.addTransform("inject-ads", function (content) {
    if (!this.outputPath?.endsWith(".html")) {
      console.log("abort early:", this.outputPath);
      return content;
    }
    const $ = cheerio.load(content);
    // Inject ads after 2nd <p> tag, then after 5,10,15th, etc.
    const r = $("main p:nth-of-type(2), main p:nth-of-type(8n)");
    $(r).after("<!-- AD HERE -->");
    return $.html();
  });

  return {
    dir: {
      input: "src",
      output: "www",
    }
  };
};
