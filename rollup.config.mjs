import typescript from "@rollup/plugin-typescript";

export default [
	{
		input: "src/components/index.ts",
		output: {
			dir: "dist/components",
			format: "esm",
			name: "gg-framework/components",
		},
		plugins: [typescript()],
	},
	{
		input: "src/utils/index.ts",
		output: {
			dir: "dist/utils",
			format: "esm",
			name: "gg-framework/utils",
		},
		plugins: [typescript()],
	},
];
