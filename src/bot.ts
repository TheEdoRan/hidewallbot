import { Telegraf } from "telegraf";

import { handleInlineQuery } from "./telegram/handleInlineQuery";
import { handleStartHelpCommand } from "./telegram/handleStartHelpCommand";
import { handleTextMessage } from "./telegram/handleTextMessage";
import { logger } from "./telegram/logger";
import { ENV_BOT_TOKEN, ENV_DEBUG } from "./utils/envs";

const bot = new Telegraf(ENV_BOT_TOKEN);

if (ENV_DEBUG) {
  bot.use(logger());
}

handleStartHelpCommand(bot);
handleTextMessage(bot);
handleInlineQuery(bot);

bot.launch().catch(console.error);

// Enable graceful stop.
process.once("SIGINT", () => {
  bot.stop("SIGINT");
});
process.once("SIGTERM", () => {
  bot.stop("SIGTERM");
});
