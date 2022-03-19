import crypto from "crypto";

import axios from "axios";
import createMetascraper from "metascraper";
import metaImage from "metascraper-image";
import metaTitle from "metascraper-title";

import { buildArticleMarkupKeyboard } from "./utils/markupKeyboard";
import { getMessageText } from "./utils/messageText";

import { isValidURL } from "../url";
import { ENV_DEV } from "../utils/envs";

import type { Telegraf } from "telegraf";
import type { InlineQueryResultArticle } from "typegram";

const metascraper = createMetascraper([metaTitle(), metaImage()]);

export const handleInlineQuery = (bot: Telegraf) => {
	bot.on("inline_query", async (ctx) => {
		const { query } = ctx.inlineQuery;

		if (!isValidURL(query)) {
			return;
		}

		try {
			const { data: html } = await axios.get(query);

			const { title, image } = await metascraper({
				html,
				url: query,
			});

			const queryHash = crypto.createHash("md5").update(query).digest("hex");

			const result: InlineQueryResultArticle = {
				type: "article",
				id: queryHash,
				title: title || "Title unavailable",
				description: "Tap here to generate link",
				thumb_url: image || "",
				input_message_content: {
					message_text: getMessageText(query),
					parse_mode: "HTML",
				},
				...buildArticleMarkupKeyboard(query),
			};

			return await ctx
				.answerInlineQuery([result], {
					is_personal: false,
					cache_time: ENV_DEV ? 0 : 60 * 60 * 4,
				})
				.catch(() => undefined);
		} catch (_) {
			return null;
		}
	});
};
