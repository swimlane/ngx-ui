import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-long-press-button-example',
  templateUrl: './long-press-button-example.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LongPressButtonExampleComponent {
  onClick(message: string) {
    console.log(message);
  }
}
