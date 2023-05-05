import { getLocaleDirection } from '@angular/common';

import { Locale } from '../locale';

export const setDocumentI18nAttributes = (locale: Locale): void => {
  /**
   * Can be replaced with native `Intl.Locale.prototype.textInfo` when Firefox will support it.
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/textInfo
   * E.g. `new Intl.Locale(locale).textInfo.direction`.
   */
  globalThis.document.documentElement.dir = getLocaleDirection(locale);
  globalThis.document.documentElement.lang = locale;
};
