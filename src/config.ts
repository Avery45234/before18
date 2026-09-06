// The public address of the app, used on the flyer and in the share links.
// (env variables in Vite: https://vite.dev/guide/env-and-mode)
// Set VITE_APP_URL in a .env file (or in the GitHub Actions workflow) once the
// site is deployed. Until then the flyer uses wherever the app is running from.
const fromEnv = (import.meta.env.VITE_APP_URL as string | undefined)?.trim();
const here = typeof window !== "undefined" ? window.location.origin + window.location.pathname : "";
export const APP_URL = fromEnv || here;
export const APP_URL_IS_LOCAL = !fromEnv && /localhost|127\.0\.0\.1/.test(here);
