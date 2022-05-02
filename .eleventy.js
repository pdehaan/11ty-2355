const cheerio = require("cheerio");

module.exports = function (eleventyConfig) {
  eleventyConfig.addTransform("inject-ads", function (content) {
    // Guart for `permalink:false`.
    if (!this.outputPath) {
      return content;
    }
    // Only inject ads into **/blog/*.html pages.
    if (this.outputPath.includes("/blog/") && this.outputPath.endsWith(".html")) {
      const $ = cheerio.load(content);
      // Inject ads after 2nd <p> tag, then after 8,16,24,32, etc.
      const r = $("main p:nth-of-type(2), main p:nth-of-type(8n)");
      $(r).after("<!-- AD HERE -->");
      return $.html();
    }
    // Return original content.
    return content;
  });

  return {
    dir: {
      input: "src",
      output: "www",
    }
  };
};
