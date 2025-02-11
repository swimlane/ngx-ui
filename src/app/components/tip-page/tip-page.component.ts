import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

enum TipStatus {
  Success = 'success',
  Error = 'error',
  Notice = 'notice',
  Warning = 'warning'
}
const text = 'Validate and submit the form to the left to view the method’s response.';
@Component({
  selector: 'app-tip-page',
  templateUrl: './tip-page.component.html',
  styleUrls: ['./tip-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class TipPageComponent {
  readonly TipStatus = TipStatus;
  status: TipStatus;
  text: string = text;
  showTip = true;

  scrollTo(id: string) {
    (document.getElementById(id) as HTMLElement)?.scrollIntoView({ behavior: 'smooth' });
  }
}
