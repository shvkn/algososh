module.exports = {
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  "plugins": [
    "react-hooks",
    "@typescript-eslint",
    "prettier"
  ],
  "overrides": [],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "rules": {
    "react/react-in-jsx-scope": "off",
    "camelcase": "error",
    "spaced-comment": "error",
    "quotes": [
      "error",
      "double"
    ],
    "no-duplicate-imports": "error",
    "max-len": [
      "error",
      {
        code: 100,
        ignoreUrls: true,
      },
    ],
    "no-confusing-arrow": [
      "error",
      {
        allowParens: false,
      },
    ],
    'no-unexpected-multiline': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'error',
  }
}
