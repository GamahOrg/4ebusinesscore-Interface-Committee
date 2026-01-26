import React, { FC, createContext, useContext, useEffect } from "react";

const I18N_CONFIG_KEY =
  (window as any)._env_?.REACT_APP_I18N_CONFIG_KEY || "i18nConfig";

type Props = {
  selectedLang: "en" | "ar";
};
const initialState: Props = {
  selectedLang: "ar",
};

function getConfig(): Props {
  const ls = localStorage.getItem(I18N_CONFIG_KEY);
  if (ls) {
    try {
      return JSON.parse(ls) as Props;
    } catch (er) {
      console.error(er);
    }
  }
  return initialState;
}

// Side effect
export function setLanguage(lang: string) {
  localStorage.setItem(I18N_CONFIG_KEY, JSON.stringify({ selectedLang: lang }));
  window.location.reload();
}

const I18nContext = createContext<Props>(initialState);

function useLang() {
  return useContext(I18nContext).selectedLang;
}

interface Iprop {
  children?: React.ReactNode;
}

const MetronicI18nProvider: FC<Iprop> = ({ children }) => {
  const lang = getConfig();

  useEffect(() => {
    if (lang) {
      document.documentElement.lang = lang.selectedLang;
      if (lang.selectedLang === "ar") {
        document.body.style.direction = "rtl";
      } else {
        document.body.style.direction = "ltr";
      }
    }
  }, [lang]);

  return <I18nContext.Provider value={lang}>{children}</I18nContext.Provider>;
};

export { MetronicI18nProvider, useLang };
