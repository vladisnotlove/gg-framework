export {};

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			API_URL: string;
			DEFAULT_TRANSLATIONS: string;
			DEFAULT_TOKEN?: string;
		}
	}
}
