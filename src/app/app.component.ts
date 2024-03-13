import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * Application wrapper, required for route reload on locale change.
 * It must not contain localized text, because it would not be recalculated.
 */
@Component({
  standalone: true,
  selector: 'i18n-app',
  template: '<router-outlet />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet],
})
export class AppComponent {}
