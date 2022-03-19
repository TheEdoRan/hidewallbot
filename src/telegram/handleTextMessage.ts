import { buildArticleMarkupKeyboard } from "./utils/markupKeyboard";
import { getMessageText } from "./utils/messageText";

import { isValidURL } from "../url";

import type { Context, Telegraf } from "telegraf";

// Private chat only middleware.
const isPrivateChat = (ctx: Context, next: () => Promise<void>) => {
	if (ctx.chat?.type === "private") {
		next();
	}
};

export const handleTextMessage = (bot: Telegraf) => {
	bot.on("text", isPrivateChat, (ctx) => {
		const { text } = ctx.message;

		if (!isValidURL(text)) {
			return;
		}

		return ctx
			.reply(getMessageText(text), {
				parse_mode: "HTML",
				reply_to_message_id: ctx.message.message_id,
				...buildArticleMarkupKeyboard(text),
			})
			.catch(() => undefined);
	});
};
