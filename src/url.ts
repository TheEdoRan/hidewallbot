import validUrl from "valid-url";

export const validURL = (query: string) => !!validUrl.isWebUri(query);

export const proxyURL = (query: string) =>
	`https://12ft.io/proxy?q=${encodeURIComponent(query)}`;
