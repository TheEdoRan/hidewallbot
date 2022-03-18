import { Markup } from "telegraf";

import { proxyURL } from "@/url";

export const buildArticleMarkupKeyboard = (query: string) =>
	Markup.inlineKeyboard([
		Markup.button.url("🔗 Open article without paywall", proxyURL(query)),
	]);

export const buildCommandMarkupKeyboard = () =>
	Markup.inlineKeyboard([
		Markup.button.url(
			"🔗 View source code",
			"https://github.com/TheEdoRan/hidewallbot"
		),
		Markup.button.url("🔗 Open 12ft", "https://12ft.io/"),
	]);
