// eslint.config.js
import { defineConfig } from "eslint-define-config";
import typescriptEslintPlugin from "@typescript-eslint/eslint-plugin";
import typescriptEslintParser from "@typescript-eslint/parser";
import reactPlugin from "eslint-plugin-react";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginPrettier from "eslint-plugin-prettier";

export default defineConfig(
	{
		// Define the files to lint directly here
		files: ["src/**/*.{js,jsx,ts,tsx}"],

		languageOptions: {
			parser: typescriptEslintParser,
			parserOptions: {
				ecmaVersion: "latest",
				sourceType: "module",
			},
		},

		settings: {
			react: {
				version: "detect", // Automatically detect the React version
			},
		},

		plugins: {
			typescriptEslintPlugin,
			reactPlugin,
			prettier: eslintPluginPrettier,
		},

		rules: {
			//"no-unused-vars": "warn",
			//"no-console": "warn",
			"prettier/prettier": "error", // Make Prettier violations throw ESLint errors
		},
	},
	//eslintPluginRecommended,
	eslintConfigPrettier,
);
