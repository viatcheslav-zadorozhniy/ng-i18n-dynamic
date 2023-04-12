import { AsyncPipe, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

import { User } from '../../domain';
import { FeedbackFormComponent } from '../../shared';

@Component({
  standalone: true,
  templateUrl: './users.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    FeedbackFormComponent,
    NgFor,
  ],
})
export class UsersComponent implements OnInit {
  readonly user: User = {
    firstName: 'Jane',
    lastName: 'Doe',
    gender: 'female',
  };

  readonly translations: Translations = {
    title: $localize`:@@usersTitle:Users`,
  };

  readonly users$ = inject(ActivatedRoute).data.pipe(map(data => data['users']));

  private readonly meta = inject(Meta);

  ngOnInit(): void {
    this.meta.updateTag({
      name: 'description',
      content: $localize`:@@usersPageSEODescription:Users page meta description`,
    });
  }
}
