import typescript from "@rollup/plugin-typescript";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import postcss from "rollup-plugin-postcss";
import del from "rollup-plugin-delete";
import url from "@rollup/plugin-url";
import copy from "rollup-plugin-copy";
import cssUrl from "postcss-url";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import fs from "fs-extra";
import path from "path";
import crypto from "crypto";
import slash from "slash";

const buildDir = "dist";

/** @type {import('rollup').RollupOptions} */
const options = {
	input: "src/index.ts",
	output: {
		dir: buildDir,
		entryFileNames: "[name].js",
		format: "es",
	},
	plugins: [
		del({
			targets: buildDir,
			runOnce: true,
		}),
		peerDepsExternal(),
		url({
			include: [
				"**/*.svg",
				"**/*.png",
				"**/*.jp(e)?g",
				"**/*.gif",
				"**/*.webp",
				"**/*.ttf",
				"**/*.woff",
				"**/*.woff2",
			],
			limit: 0,
			destDir: path.join(buildDir, "assets"),
			publicPath: "assets/",
			fileName: "[name].[hash][extname]",
		}),
		nodeResolve({
			jsnext: true,
		}),
		commonjs({
			requireReturnsDefault: "auto",
		}),
		copy({
			targets: [
				{ src: "src/types/**/*", dest: path.join(buildDir, "types") },
			],
		}),
		typescript({
			include: ["src/**/*.ts", "src/**/*.tsx"],
			compilerOptions: {
				declaration: true,
				declarationDir: buildDir,
			},
		}),
		typescript(),
		postcss({
			extract: "index.css",
			plugins: [
				cssUrl([
					{
						url: (asset) => {
							// copy asset to dist/assets
							const hash = crypto
								.createHash("sha1")
								.update(fs.readFileSync(asset.absolutePath))
								.digest("hex")
								.substr(0, 16);
							const contents = fs.readFileSync(asset.absolutePath);
							const fileName =
								path.parse(asset.url).name +
								"." +
								hash +
								path.parse(asset.url).ext;

							const dir = path.join(buildDir, "assets");
							const filePath = path.join(dir, fileName);

							fs.ensureDirSync(dir);
							fs.writeFileSync(filePath, contents);

							return slash(path.join("assets", fileName));
						},
						useHash: true,
					},
				]),
			],
		}),
	],
	external: ["react", "react-dom"],
};

export default options;
