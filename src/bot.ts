import "./utils/resolve";

import { createServer } from "http";

import { Telegraf } from "telegraf";

import { handleInlineQuery } from "./telegram/handleInlineQuery";
import { handleStartHelpCommand } from "./telegram/handleStartHelpCommand";
import { handleTextMessage } from "./telegram/handleTextMessage";
import { ENV_BOT_TOKEN } from "./utils/envs";

const bot = new Telegraf(ENV_BOT_TOKEN);

handleStartHelpCommand(bot);
handleTextMessage(bot);
handleInlineQuery(bot);

bot.launch();

// fly healthcheck.
const server = createServer((_, res) => {
	res.writeHead(200);
	res.end("ok");
});

server.listen(8080);

// Enable graceful stop.
process.once("SIGINT", () => {
	bot.stop("SIGINT");
	server.close();
});
process.once("SIGTERM", () => {
	bot.stop("SIGTERM");
	server.close();
});
