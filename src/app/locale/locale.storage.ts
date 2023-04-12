import { Locale } from './locale';
import { localeStorageKey } from './locale-storage-key';

import { getInitialLocale } from '../utils';

class LocaleStorage {
  #locale: Locale = getInitialLocale();

  getLocale(): Locale {
    return this.#locale;
  }

  setLocale(locale: Locale): void {
    this.#locale = locale;
    globalThis.localStorage.setItem(localeStorageKey, locale);
  }
}

export const localeStorage = new LocaleStorage();
