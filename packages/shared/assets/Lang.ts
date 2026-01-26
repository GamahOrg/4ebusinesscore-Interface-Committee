export const SystemLang = () => {
  const I18N_LANGUAGE_KEY =
    (window as any)._env_?.REACT_APP_I18N_LANGUAGE_KEY || "i18nConfig";
  const configString = localStorage.getItem(I18N_LANGUAGE_KEY);

  try {
    const config = configString ? JSON.parse(configString) : null;
    return config?.selectedLang || "ar";
  } catch (error) {
    console.error("Failed to parse language config from localStorage", error);
    return "en";
  }
};
