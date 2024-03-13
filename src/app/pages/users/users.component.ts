import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { User } from '../../domain';
import { FeedbackFormComponent } from '../../shared';

@Component({
  standalone: true,
  selector: 'app-users',
  templateUrl: './users.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FeedbackFormComponent,
  ],
})
export class UsersComponent {
  readonly users = input.required<User[]>();

  readonly user: User = {
    firstName: 'Jane',
    lastName: 'Doe',
    gender: 'female',
  };

  readonly translations: Translations = {
    title: $localize`:@@usersTitle:Users`,
  };
}
