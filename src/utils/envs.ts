import "dotenv/config";

export const ENV_BOT_TOKEN = process.env.BOT_TOKEN!;
export const ENV_DEBUG = process.env.DEBUG === "true";
export const ENV_DEV = process.env.DEV === "true";
