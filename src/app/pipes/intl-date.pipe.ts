import { Pipe, PipeTransform } from '@angular/core';

import { localeStorage } from '../locale';

import { isEmpty } from './is-empty';

type IntlDateFormat = 'mediumDate' | 'mediumTime';

/**
 * An alternative to the Angular built-in `DatePipe` based on the native `Intl.DateTimeFormat` API.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
 * https://angular.io/api/common/DatePipe
 */
@Pipe({
  standalone: true,
  name: 'intlDate',
})
export class IntlDatePipe implements PipeTransform {
  readonly #formatOptions: Record<IntlDateFormat, Intl.DateTimeFormatOptions> = {
    mediumDate: { // Equal to the "mediumDate" format in Angular.
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    },
    mediumTime: { // Equal to the "mediumTime" format in Angular.
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    },
  };

  transform(
    value: Date | number | string,
    format: IntlDateFormat = 'mediumDate',
    timeZone?: string
  ): string | null {
    if (isEmpty(value)) {
      return null;
    }

    const date = new Date(value);

    if (isNaN(date.valueOf())) {
      throw new Error(`Unable to convert "${value}" into a date.`);
    }

    const dateTimeFormatter = new Intl.DateTimeFormat(localeStorage.getLocale(), {
      ...this.#formatOptions[format],
      timeZone,
    });

    return dateTimeFormatter.format(date);
  }
}
