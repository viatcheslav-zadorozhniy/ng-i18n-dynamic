# Dynamic locale change using Angular i18n


## Table of contents
- [Introduction](#introduction)
- [Conventions](#conventions)
- [LOCALE_ID](#locale_id)
- [ICU expressions](#icu-expressions)
- [Page title](#page-title)
- [Locale change handling](#locale-change-handling)
- [Demo](#demo)
- [Additionally](#additionally)


## Introduction
So, is it possible? In short - **yes**!

Thanks to the `clearTranslations()` and `loadTranslations()` functions from the [@angular/localize](https://angular.io/api/localize) package it became possible.
But, of course, you should follow some *conventions* so it will work properly.


## Conventions
There are 2 places where the text can be marked for translation:
- [component template](https://angular.io/guide/i18n-common-prepare#mark-text-in-component-template)
- [component code](https://angular.io/guide/i18n-common-prepare#mark-text-in-component-code)

According to the principle of Angular Ivy compiler operations, translations in the template are performed only once.
Therefore, if we want to achieve dynamic translation, we must use component code and not a template to mark text for translation.

E.g.

```ts
#translations = {
  title: $localize`Page title`,
  imageAltText: $localize`Image alt text`
};
```

and then use text interpolation or binding in the template:

```html
<h1>{{ translations['title'] }}</h1>
<img [alt]="translations['imageAltText']" />
```


## LOCALE_ID
Angular currently doesn't allow dynamic [LOCALE_ID](https://angular.io/api/core/LOCALE_ID) change ([#47637](https://github.com/angular/angular/issues/47637)). Although it is necessary with a dynamic locale change for proper work of the built-in pipes. To deal with it, we have several options:
- provide it directly to the pipes
- implement wrappers for the pipes and provide it there
- use [ECMAScript Internationalization API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) instead
- implement custom locale provider (e.g. [locale.provider.ts](src/app/locale/locale.provider.ts))


## ICU expressions
[ICU expressions](https://angular.io/guide/i18n-common-prepare#icu-expressions) are not supported by the [$localize](https://angular.io/api/localize/init/$localize).

Luckily, we have several alternatives:
- Angular ICU pipes ([I18nSelectPipe](https://angular.io/api/common/I18nSelectPipe), [I18nPluralPipe](https://angular.io/api/common/I18nPluralPipe))
- ECMAScript Internationalization API, such as [Intl.PluralRules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules)
- [Intl MessageFormat](https://formatjs.io/docs/intl-messageformat/) library


## Page title
Angular [Route](https://angular.io/api/router/Route) provides the ability to set the title of the current route via `title` property. It can be a *string* or [ResolveFn](https://angular.io/api/router/ResolveFn).

E.g.
```ts
const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent,
    title: $localize`Users page`
  }
];
```

In the case of a *string*, the title will be calculated only once. Which is not suitable for dynamic translation. Therefore, we must use [ResolveFn](https://angular.io/api/router/ResolveFn) instead.

E.g.
```ts
const routes: Routes = [
  {
    // ...the same as above
    title: () => $localize`Users page`
  }
];
```

One more thing to be done - implement a custom [TitleStrategy](https://angular.io/api/router/TitleStrategy) to trigger the title [ResolveFn](https://angular.io/api/router/ResolveFn) recalculation. See [page-title.strategy.ts](src/app/services/page-title.strategy.ts) for more details.


## Locale change handling
With the described approach, all we need to apply the translation on locale change is to reload the current route (do not confuse it with full page reload). Of course, the translations themselves should be loaded and applied before reloading.

E.g.
```ts
this.router.navigateByUrl(this.router.url, {
  onSameUrlNavigation: 'reload'
});
```

`{ onSameUrlNavigation: 'reload' }` is required, otherwise, Angular will not perform recalculation. See [usage notes](https://angular.io/api/router/OnSameUrlNavigation#description).

Do not forget to update the [Document](https://developer.mozilla.org/en-US/docs/Web/API/Document) [dir](https://developer.mozilla.org/en-US/docs/Web/API/Document/dir) and [lang](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang) attributes according to the locale.

`getLocaleDirection()` function from the [@angular/common](https://angular.io/api/common) package can be used to retrieve the writing direction of the locale. [Intl.Locale.prototype.textInfo](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/textInfo) can be used as an alternative. But keep in mind that it is not [supported](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/textInfo#browser_compatibility) by all major engines at the time of writing.


## Demo
This repository contains a complete example of the Angular application with dynamic locale change.

Run `yarn install` to initialize the project after cloning the repo.

After that, run `yarn start` to see the app in action.


## Additionally
To extract i18n messages from source code, run `yarn extract-i18n`.

Even when we use dynamic translation, we can run validation for missing and duplicate translations, e.g. during CI/CD. Run `yarn validate-i18n` to perform it.

See [angular.json](angular.json) for more configuration details.
