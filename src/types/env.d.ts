export {};

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			API_URL: string;
			DEV_API_URL: string;
			TOKEN?: string;
			DEFAULT_TRANSLATIONS?: string;
			DEFAULT_APP_MODE?: "development" | "production";
		}
	}
}
