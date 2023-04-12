/// <reference types="@angular/localize" />

/*
 * Import all supported locales (used by Angular built-in pipes for localization).
 * Alternatively, it can be replaced with the native `Intl` API.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl
 */
import '@angular/common/locales/global/uk';
import '@angular/common/locales/global/he';

import { provideHttpClient } from '@angular/common/http';
import { LOCALE_ID } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouteReuseStrategy, TitleStrategy } from '@angular/router';

import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';
import { localeProvider, localeStorage } from './app/locale';
import { I18nRouteReuseStrategy, PageTitleStrategy } from './app/services';
import { setLocaleData } from './app/utils';

// Set an initial locale data before the application bootstrap.
setLocaleData(localeStorage.getLocale()).then(() => {
  bootstrapApplication(AppComponent, {
    providers: [
      provideHttpClient(),
      provideRouter(appRoutes),
      { provide: LOCALE_ID, useValue: localeProvider }, // Not necessary with the native `Intl` API.
      { provide: TitleStrategy, useClass: PageTitleStrategy },
      { provide: RouteReuseStrategy, useClass: I18nRouteReuseStrategy },
    ],
  }).catch(error => console.error(error));
});
