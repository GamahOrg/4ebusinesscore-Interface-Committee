import { FC } from "react";
import { useLang } from "./Metronici18n";
import { IntlProvider } from "react-intl";

import "@formatjs/intl-relativetimeformat/polyfill";
import "@formatjs/intl-relativetimeformat/locale-data/en";
import "@formatjs/intl-relativetimeformat/locale-data/ar";

import enMessages from "./messages/en.json";
import arMessages from "./messages/ar.json";

const allMessages = {
  en: enMessages,
  ar: arMessages,
};

interface Iprop {
  children?: React.ReactNode;
}

const I18nProvider: FC<Iprop> = ({ children }) => {
  const locale = useLang();
  const messages = allMessages[locale];

  return (
    <IntlProvider locale={locale} messages={messages}>
      {children}
    </IntlProvider>
  );
};

export { I18nProvider };
