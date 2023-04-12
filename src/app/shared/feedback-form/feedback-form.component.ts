import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { Gender, User } from '../../domain';
import { icuSelect } from '../../utils';

@Component({
  standalone: true,
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackFormComponent implements OnInit {
  @Input() user!: User;

  readonly translations: Translations = {
    title: $localize`:@@feedbackFormTitle:Feedback form`,
    submit: $localize`:@@submitButton:Submit`,
  };

  ngOnInit(): void {
    this.translations['feedbackLabel'] = this.translateFeedbackLabel(this.user);
  }

  private translateFeedbackLabel(user: User): string {
    const genderAddressing = icuSelect<Gender>(user.gender, {
      'male': $localize`:@@maleAddressing:Mr.`,
      'female': $localize`:@@femaleAddressing:Ms.`,
    });

    return $localize
      `:@@feedbackFormLabel:Leave you feedback, ${genderAddressing}:genderAddressing: ${user.firstName}:userFirstName:`
    ;
  }
}
