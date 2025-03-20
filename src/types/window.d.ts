import { Adsgram } from "./Adsgram";

declare global {
	interface Window {
		// app data
		token?: string;
		translations?: Record<string, string>;
		appMode?: "development" | "production";
		blockId?: string;
		safeTop?: string;
		safeBottom?: string;

		// libs
		Adsgram?: Adsgram;
	}
}
