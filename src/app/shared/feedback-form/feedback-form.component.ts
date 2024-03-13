import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { Gender, User } from '../../domain';
import { icuSelect } from '../../utils';

@Component({
  standalone: true,
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackFormComponent {
  readonly user = input.required<User>();

  readonly feedbackLabel = computed<string>(() => this.#translateFeedbackLabel(this.user()));

  readonly translations: Translations = {
    title: $localize`:@@feedbackFormTitle:Feedback form`,
    submit: $localize`:@@submitButton:Submit`,
  };

  #translateFeedbackLabel(user: User): string {
    const genderAddressing = icuSelect<Gender>(user.gender, {
      'male': $localize`:@@maleAddressing:Mr.`,
      'female': $localize`:@@femaleAddressing:Ms.`,
    });

    return $localize
      `:@@feedbackFormLabel:Leave you feedback, ${genderAddressing}:genderAddressing: ${user.firstName}:userFirstName:`
    ;
  }
}
