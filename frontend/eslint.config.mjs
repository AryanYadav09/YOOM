import js from "@eslint/js";
import globals from "globals";
import reactPlugin from "eslint-plugin-react";

export default [
  {
    ignores: ["dist", ".next", "node_modules", "_js_migration_*"],
  },
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx,mjs}"],
    plugins: {
      react: reactPlugin,
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      "no-unused-vars": ["warn", { varsIgnorePattern: "^React$" }],
      "react/jsx-uses-vars": "warn",
      "react/react-in-jsx-scope": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
