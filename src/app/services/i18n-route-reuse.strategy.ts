import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, BaseRouteReuseStrategy } from '@angular/router';

import { localeProvider } from '../locale';

@Injectable({ providedIn: 'root' })
export class I18nRouteReuseStrategy extends BaseRouteReuseStrategy {
  // Override the default `BaseRouteReuseStrategy` to allow route reload on locale change.
  override shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return localeProvider.state === 'loading'
      ? false
      : super.shouldReuseRoute(future, curr)
    ;
  }
}
