export {};

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			API_URL: string;
			TRANSLATIONS?: string;
			TOKEN?: string;
		}
	}
}
