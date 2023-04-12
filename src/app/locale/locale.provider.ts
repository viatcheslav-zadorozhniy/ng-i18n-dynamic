import { Locale } from './locale';

import { localeStorage } from './locale.storage';

/*
 * Extends `String` for compatibility with an Angular `LOCALE_ID` provider.
 * When switching to the native `Intl` API may be converted to a regular class.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl
 */
class LocaleProvider extends String {
  // The state is used to perform additional actions on locale change.
  state: 'translated' | 'loading' = 'translated';

  override toString(): Locale {
    return localeStorage.getLocale();
  }

  override valueOf(): Locale {
    return this.toString();
  }
}

export const localeProvider = new LocaleProvider();
