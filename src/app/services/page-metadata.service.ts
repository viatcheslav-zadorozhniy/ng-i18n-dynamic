import { Injectable, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

import { RouteMetadata, RouteMetadataKey, RouteWithMetadata } from '../domain';

@Injectable({ providedIn: 'root' })
export class PageMetadataService {
  #meta = inject(Meta);
  #router = inject(Router);

  #previousPageTags?: HTMLMetaElement[];

  init() {
    this.#router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.#setPageMetadata(this.#getCurrentRouteMetadata()));
  }

  #setPageMetadata(routeMetadata?: RouteMetadata) {
    this.#previousPageTags?.forEach(tag => this.#meta.removeTagElement(tag));
    this.#previousPageTags = [];

    if (routeMetadata) {
      this.#previousPageTags = this.#meta.addTags(routeMetadata.tags);
    }
  }

  #getCurrentRouteMetadata(): RouteMetadata | undefined {
    let route = this.#router.routerState.root;
    let routeConfigWithMetadata = route.routeConfig as RouteWithMetadata;

    while (route.firstChild) {
     route = route.firstChild;

     const routeConfig = route.routeConfig as RouteWithMetadata;
     routeConfigWithMetadata = routeConfig?.[RouteMetadataKey] ? routeConfig : routeConfigWithMetadata;
    }

    return routeConfigWithMetadata?.[RouteMetadataKey]?.();
  }
}
