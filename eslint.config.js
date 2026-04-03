const tsEslintPlugin = require("@typescript-eslint/eslint-plugin");
const prettierRecommended = require("eslint-plugin-prettier/recommended");

module.exports = [
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      "coverage/**",
      "*.config.ts",
      "*.config.js",
    ],
  },
  ...tsEslintPlugin.configs["flat/recommended-type-checked"],
  {
    files: ["**/*.{ts,tsx,mts,cts}"],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      parserOptions: {
        project: ["./tsconfig.json", "./tsconfig.test.json"],
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unsafe-assignment": "warn",
      "@typescript-eslint/no-unsafe-member-access": "warn",
      "@typescript-eslint/no-unsafe-call": "warn",
      "@typescript-eslint/no-unsafe-return": "warn",
      "@typescript-eslint/no-unsafe-argument": "warn",
      "@typescript-eslint/require-await": "warn",
      "@typescript-eslint/only-throw-error": "off",
      "@typescript-eslint/no-base-to-string": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/naming-convention": [
        "warn",
        {
          selector: "interface",
          format: ["PascalCase"],
        },
        {
          selector: "typeAlias",
          format: ["PascalCase"],
        },
        {
          selector: "enum",
          format: ["PascalCase"],
        },
      ],
    },
  },
  prettierRecommended,
];
