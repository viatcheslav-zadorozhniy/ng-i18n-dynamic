import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { MenuItem } from './domain';
import { localeProvider, Locale, localeStorage } from './locale';
import { setLocaleData } from './utils';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app-root.component.html',
  styleUrls: ['./app-root.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
  ],
})
export class AppRootComponent {
  readonly currentLocale = localeStorage.getLocale();

  readonly locales: { id: Locale; label: string }[] = [
    { id: 'en', label: 'English' },
    { id: 'he', label: 'עברית' },
    { id: 'uk', label: 'Українська' },
  ];

  readonly menuItems: MenuItem[] = [
    {
      link: '/',
      label: $localize`:@@navItem.home:Home`,
    },
    {
      link: '/users',
      label: $localize`:@@navItem.users:Users`,
    },
  ];

  #router = inject(Router);

  async handleLocaleChange(locale: Locale) {
    localeProvider.state = 'loading';

    await setLocaleData(locale);

    // Reload the current route to recalculate translations.
    await this.#router.navigateByUrl(this.#router.url, {
      onSameUrlNavigation: 'reload'
    });

    localeProvider.state = 'translated';
  }
}
