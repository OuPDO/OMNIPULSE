/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["./react.js", "plugin:@next/next/recommended"],
  rules: {
    // Next.js-spezifisch
    "@next/next/no-html-link-for-pages": "error",
    "@next/next/no-img-element": "error",
  },
};
