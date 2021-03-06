const path = require("path");

module.exports = function (_context, options) {
  const plausibleDomain = options.customDomain || "plausible.io";
  const scriptURI =
    plausibleDomain === "plausible.io" ? "/js/plausible.js" : "/js/index.js";
  const domain = options.domain;
  const excludePaths = options.excludePaths || [];

  if (!domain) {
    throw new Error(
      "You did not specify the `domain` field in the plugin options."
    );
  }

  const isProd = process.env.NODE_ENV === "production";

  return {
    name: "docusaurus-plugin-plausible",

    getClientModules() {
      return isProd ? [path.resolve(__dirname, "./analytics")] : [];
    },

    injectHtmlTags() {
      if (!isProd) {
        return {};
      }
      const scriptProps = {
        async: true,
        defer: true,
        "data-domain": domain,
        src: `https://${plausibleDomain}${scriptURI}`,
      };

      return {
        headTags: [
          {
            tagName: "link",
            attributes: {
              key: "docusaurus-plugin-plausible-preconnect",
              rel: "preconnect",
              href: `https://${plausibleDomain}`,
            },
          },
          {
            tagName: "script",
            attributes: {
              key: "docusaurus-plugin-plausible-script",
              ...scriptProps,
            },
          },
          {
            tagName: "script",
            attributes: {
              key: "docusaurus-plugin-plausible-custom-events",
            },
            innerHTML: `
              window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) };
              ${
                excludePaths.length
                  ? `window.plausibleExcludePaths=[${excludePaths.join(`,`)}];`
                  : ``
              }
            `,
          },
        ],
      };
    },
  };
};
