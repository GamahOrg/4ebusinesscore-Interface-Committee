import words from "./words.json";
export function getCurrentSystemLanguage(): string {
  const I18N_LANGUAGE_KEY =
    (window as any)._env_?.REACT_APP_I18N_LANGUAGE_KEY || "i18nConfig";
  return JSON.parse(localStorage.getItem(I18N_LANGUAGE_KEY) || "").selectedLang;
}

type Gender = "masculine" | "feminine";

export function numToWord(num: number, gender: Gender = "masculine"): string {
  let language = getCurrentSystemLanguage();
  const wordsArray =
    language === "en" ? words.words.en : words.words.ar[gender];
  if (num < 1 || num > 30) {
    throw new Error(
      "Number out of range. This function supports numbers from 1 to 30."
    );
  }

  return wordsArray[num];
}

export const isCurrentMode = (mode: "light" | "dark" = "light"): boolean =>
  localStorage.getItem("Theme") === mode;
