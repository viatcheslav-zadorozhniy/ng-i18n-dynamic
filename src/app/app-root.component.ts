import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { MenuItem } from './domain';
import { localeProvider, Locale, localeStorage } from './locale';
import { setLocaleData } from './utils';

@Component({
  standalone: true,
  templateUrl: './app-root.component.html',
  styleUrls: ['./app-root.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    NgFor,
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
      label: $localize`:@@menuItemHome:Home`,
    },
    {
      link: '/users',
      label: $localize`:@@menuItemUsers:Users`,
    },
  ];

  private readonly router = inject(Router);

  async handleLocaleChange(locale: Locale): Promise<void> {
    localeProvider.state = 'loading';

    await setLocaleData(locale);

    // Reload the current route to recalculate translations.
    await this.router.navigateByUrl(this.router.url, {
      onSameUrlNavigation: 'reload'
    });

    localeProvider.state = 'translated';
  }
}
