import { Injectable, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  ActivatedRouteSnapshot,
  PRIMARY_OUTLET,
  ResolveFn,
  RouterStateSnapshot,
  TitleStrategy,
} from '@angular/router';
import { firstValueFrom, isObservable, Observable } from 'rxjs';

import { localeProvider } from '../locale';

/**
 * A custom page title strategy can be used to append/prepend a page title with common wording.
 * It is also helpful to recalculate the current page title on locale change.
 */
@Injectable({ providedIn: 'root' })
export class PageTitleStrategy extends TitleStrategy {
  #title = inject(Title);

  // https://angular.io/guide/router#setting-the-page-title
  override updateTitle(state: RouterStateSnapshot) {
    // Recalculate page title on locale change.
    if (localeProvider.state === 'loading') {
      const deepestRouteWithTitle = this.#getDeepestRouteWithTitle(state);
      const routeTitle = deepestRouteWithTitle.routeConfig?.title as ResolveFn<string>;

      if (typeof routeTitle === 'function') {
        this.#unwrapAndSetTitle(routeTitle(deepestRouteWithTitle, state));
        return;
      }
    }

    const title = this.buildTitle(state);

    if (title !== undefined) {
      this.#setTitle(title);
    }
  }

  #getDeepestRouteWithTitle(state: RouterStateSnapshot): ActivatedRouteSnapshot {
    let routeWithTitle = state.root;
    let nextRoute: ActivatedRouteSnapshot | undefined = routeWithTitle;

    while (nextRoute !== undefined) {
      nextRoute = nextRoute.children.find(child => child.outlet === PRIMARY_OUTLET);

      if (nextRoute && this.getResolvedTitleForRoute(nextRoute)) {
        routeWithTitle = nextRoute;
      }
    }

    return routeWithTitle;
  }

  async #unwrapAndSetTitle(routeTitle: Observable<string> | Promise<string> | string) {
    const title = await (isObservable(routeTitle) ? firstValueFrom(routeTitle) : routeTitle);
    this.#setTitle(title);
  }

  #setTitle(title: string) {
    this.#title.setTitle($localize`:@@fullPageTitle:${title}:pageTitle: | Application`);
  }
}
