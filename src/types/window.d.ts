export {};

declare global {
  interface Window {
    token?: string;
    translations?: Record<string, string>;
  }
}
