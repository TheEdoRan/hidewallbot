import validUrl from "valid-url";

export const isValidURL = (query: string) => !!validUrl.isWebUri(query);

export const proxyURL = (query: string, serviceURL: string) =>
  `${serviceURL}/proxy?q=${encodeURIComponent(query)}`;
