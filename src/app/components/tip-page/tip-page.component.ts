import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

enum TipStatus {
  Success = 'success',
  Error = 'error',
  Notice = 'notice'
}
const text = 'Validate and submit the form to the left to view the method’s response.';
@Component({
  selector: 'app-tip-page',
  templateUrl: './tip-page.component.html',
  styleUrls: ['./tip-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TipPageComponent {
  readonly TipStatus = TipStatus;
  status: TipStatus;
  text: string = text;
  showTip: boolean = true;
}
