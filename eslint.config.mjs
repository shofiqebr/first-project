import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
// import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';



/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,ts}"]},
  {languageOptions: { globals: globals.node }},
  {
    rules: {
      eqeqeq: "off",
      "no-unused-vars": "error",
      "prefer-const": ["error", { ignoreReadBeforeAssign: true }],
      "no-unused-expressions" : "error",
      "no-console" : "warn",
      "no-undef" : "error"
    },
  },
  {
    ignores: [".node_modules/*", "dist"]
},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  
];




// module.exports = [
//   // Any other config imports go at the top
//   eslintPluginPrettierRecommended,
// ];