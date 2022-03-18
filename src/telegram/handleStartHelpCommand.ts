import { Telegraf } from "telegraf";

import { buildCommandMarkupKeyboard } from "./utils/markupKeyboard";

export const handleStartHelpCommand = (bot: Telegraf) => {
	bot.command(["start", "help"], (ctx) => {
		let text =
			"This bot removes paywall from articles, using the <b>12ft</b> service.\n\n";
		text += "<b>Usage</b> ❓\n";
		text +=
			"You can use this tool by pasting a valid link in this bot's private chat, or in any chat you want, using inline mode, like this:\n\n";
		text += "<pre>@hidewallbot [URL]</pre>\n\n";
		text += "<b>Contribute</b>  📖\n";
		text +=
			'This bot is free and open source, licensed under the <a href="https://opensource.org/licenses/MIT">MIT license</a>. You can explore and contribute to the source code by tapping on the button below.';

		ctx.reply(text, {
			parse_mode: "HTML",
			reply_to_message_id: ctx.message.message_id,
			...buildCommandMarkupKeyboard(),
		});
	});
};
