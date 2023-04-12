import { CurrencyPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';

import { User } from '../../domain';
import { IntlCurrencyPipe, IntlDatePipe } from '../../pipes';
import { FeedbackFormComponent } from '../../shared';

@Component({
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FeedbackFormComponent,

    // Built-in pipes.
    CurrencyPipe,
    DatePipe,

    // Custom pipes, an alternative to the built-in.
    IntlCurrencyPipe,
    IntlDatePipe,
  ],
})
export class HomeComponent implements OnInit {
  readonly user: User = {
    firstName: 'John',
    lastName: 'Doe',
    gender: 'male',
  };

  readonly today = new Date();

  readonly translations: Translations = {
    title: $localize`:@@homePageTitle:Internationalization`,
    welcome: this.getWelcomeMessage(this.user),
    logoAlt: $localize`:@@logoAlternativeText:Angular logo`,
    textWithoutAnElement: $localize`:@@textWithoutAnElement:Text without an element.`,
    builtInPipesTitle: $localize`:@@builtInPipesTitle:Built-in pipes`,
    dateLabel: $localize`:@@dateLabel:Date:`,
    timeLabel: $localize`:@@timeLabel:Time:`,
    currencyLabel: $localize`:@@currencyLabel:Currency:`,
    customPipesTitle: $localize`:@@customPipesTitle:Custom pipes`,
  };

  private readonly meta = inject(Meta);

  ngOnInit(): void {
    this.meta.updateTag({
      name: 'description',
      content: $localize`:@@homePageSEODescription:Homepage meta description`,
    });
  }

  private getWelcomeMessage(user: User): string {
    return $localize
      `:@@welcomeMessage:Glad to see you again, ${user.firstName}:userFirstName: ${user.lastName}:userLastName:.`
    ;
  }
}
