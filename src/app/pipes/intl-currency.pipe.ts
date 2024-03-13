import { DEFAULT_CURRENCY_CODE, Pipe, PipeTransform, inject } from '@angular/core';

import { localeStorage } from '../locale';

import { isEmpty } from './is-empty';

/**
 * An alternative to the Angular built-in `CurrencyPipe` based on the native `Intl.NumberFormat` API.
 * `DecimalPipe` and `PercentPipe` can be replaced with the `Intl.NumberFormat` API as well.
 *
 * https://angular.io/api/common/DatePipe
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#style
 */
@Pipe({
  standalone: true,
  name: 'intlCurrency',
})
export class IntlCurrencyPipe implements PipeTransform {
  readonly #defaultCurrencyCode = inject(DEFAULT_CURRENCY_CODE) || 'USD';

  transform(
    value: number | bigint | string,
    currency: string = this.#defaultCurrencyCode,
  ): string | null {
    if (isEmpty(value)) {
      return null;
    }

    const number = typeof value === 'string' ? parseFloat(value) : value as number;

    if (isNaN(number)) {
      throw new Error(`"${value}" is not a number.`);
    }

    const currencyFormatter = new Intl.NumberFormat(localeStorage.getLocale(), {
      currency,
      style: 'currency',
    });

    return currencyFormatter.format(number);
  }
}
