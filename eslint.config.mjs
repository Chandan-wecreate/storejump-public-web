import globals from "globals";
import js from "@eslint/js";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import sortImportAutoFix from "eslint-plugin-sort-imports-es6-autofix";
import stylisticTs from "@stylistic/eslint-plugin-ts";
import tseslint from "typescript-eslint";
import unusedImports from "eslint-plugin-unused-imports";

const two = 2;

const tsEslintRules = {
  "naming-convention": [
    "error",
    {
      selector: "interface",
      format: ["PascalCase"],
      custom: { regex: "^I[A-Z]", match: true }
    },
    {
      selector: "typeLike",
      format: ["PascalCase"],
    },
    {
      selector: "function",
      format: ["camelCase", "PascalCase"],
      leadingUnderscore: "forbid",
      trailingUnderscore: "forbid",
    }
  ],
  "no-magic-numbers": [
    "error",
    {
      ignoreEnums: true,
      ignoreNumericLiteralTypes: true,
      ignoreReadonlyClassProperties: true,
      ignore: [-1, 0, 1],
      ignoreArrayIndexes: true
    }
  ],
  "array-type": [
    "error",
    { default: "array", readonly: "array" }
  ],
  "prefer-for-of": "error",
};

const stylisticRules = {
  "member-delimiter-style": "error",
  "semi": "error",
  "quotes": "error",
  "object-curly-spacing": ["error", "always"],
  "block-spacing": ["error", "always"],
  "no-extra-parens": ["error", "all"],
  "no-extra-semi": "error",
  "keyword-spacing": "error"
};

const getRulesWithBase = (rules, base) => {
  const updatedRules = {};
  Object.entries(rules).forEach(([key]) => {
    updatedRules[`${base}/${key}`] = rules[key];
  });
  return updatedRules;
};

export default tseslint.config(
  { ignores: ["dist", ".vite", "node_modules"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx,js}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "sort-imports-es6-autofix": sortImportAutoFix,
      "unused-imports": unusedImports,
      "@stylistic/ts": stylisticTs
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...getRulesWithBase(stylisticRules, "@stylistic/ts"),
      ...getRulesWithBase(tsEslintRules, "@typescript-eslint"),
      "@typescript-eslint/no-unused-expressions": "off",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "sort-imports-es6-autofix/sort-imports-es6": [
        two,
        {
          "ignoreCase": true,
          "ignoreMemberSort": false,
          "memberSyntaxSortOrder": [
            "all",
            "multiple",
            "single",
            "none"
          ]
        }
      ],
      "unused-imports/no-unused-imports": "error",
      "no-duplicate-imports": "error",
      "no-irregular-whitespace": "error",
      "arrow-body-style": ["error", "as-needed"],
      "prefer-const": "error",
      "prefer-spread": "error",
      "prefer-object-spread": "error",
      "no-return-assign": [
        "error",
        "always"
      ],
      "max-len": [
        "error",
        {
          code: 120,
          tabWidth: 2,
          comments: 120,
          ignoreUrls: true,
          ignoreStrings: true
        }
      ],
      "prefer-arrow-callback": [
        "error",
        {
          "allowNamedFunctions": false,
          "allowUnboundThis": true
        }
      ],
      "no-else-return": "error",
      "object-shorthand": ["error", "always"],
      "no-console": "error",
      "max-classes-per-file": ["error", 1],
    },
  },
);