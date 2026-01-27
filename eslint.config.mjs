import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: globals.node,
    },
  },

  // React recommended rules
  pluginReact.configs.flat.recommended,

  // 🔽 Override specific React rules
  {
    rules: {
      "react/prop-types": "off",
    },
  },
]);
