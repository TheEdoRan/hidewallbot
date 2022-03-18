import { Telegraf } from "telegraf";

import { buildArticleMarkupKeyboard } from "./utils/markupKeyboard";
import { getMessageText } from "./utils/messageText";

import { validURL } from "@/url";

export const handleTextMessage = (bot: Telegraf) => {
	bot.on("text", (ctx) => {
		if (ctx.chat.type !== "private") {
			return;
		}

		const { text } = ctx.message;

		if (!validURL(text)) {
			return;
		}

		ctx.reply(getMessageText(text), {
			parse_mode: "HTML",
			reply_to_message_id: ctx.message.message_id,
			...buildArticleMarkupKeyboard(text),
		});
	});
};
