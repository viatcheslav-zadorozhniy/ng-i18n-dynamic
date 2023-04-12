import { Locale, defaultLocale, localeStorageKey, supportedLocales } from '../locale';

export const getInitialLocale = (): Locale => {
  const navigatorLanguage = globalThis.navigator.language.slice(0, 2) as Locale;

  let locale = globalThis.localStorage.getItem(localeStorageKey) as Locale
    || navigatorLanguage
    || defaultLocale
  ;

  // If locale is not supported, fallback to the `navigator.language` if supported or the default.
  if (!supportedLocales.includes(locale)) {
    locale = supportedLocales.includes(navigatorLanguage) ? navigatorLanguage : defaultLocale;
  }

  return locale;
};
