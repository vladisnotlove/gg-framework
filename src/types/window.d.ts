import { Adsgram } from "./Adsgram";

declare global {
	interface Window {
		token?: string;
		translations?: Record<string, string>;
		appMode?: "development" | "production";
		blockId?: string;
		Adsgram?: Adsgram;
	}
}
