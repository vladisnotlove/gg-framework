export {};

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			API_URL: string;
			DEV_API_URL: string;
		}
	}
}
