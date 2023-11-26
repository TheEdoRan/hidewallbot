import { Markup } from "telegraf";
import { proxyURL } from "../../url";

export const proxies = [
  { name: "1ft", url: "https://1ft.io" },
  { name: "12ft", url: "https://12ft.io" },
];

export const buildArticleMarkupKeyboard = (query: string) =>
  Markup.inlineKeyboard(
    proxies.map((proxy) => [
      Markup.button.url(
        `🔗 Remove paywall with ${proxy.name}`,
        proxyURL(query, proxy.url),
      ),
    ]),
  );

export const buildCommandMarkupKeyboard = () =>
  Markup.inlineKeyboard([
    [
      Markup.button.url("🔗 Open 12ft", "https://12ft.io/"),
      Markup.button.url("🔗 Open 1ft", "https://1ft.io/"),
    ],
    [
      Markup.button.url(
        "🔗 View source code",
        "https://github.com/TheEdoRan/hidewallbot",
      ),
    ],
  ]);
