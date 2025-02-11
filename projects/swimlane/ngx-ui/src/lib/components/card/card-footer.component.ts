import { Component, Input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ngx-card-footer',
  exportAs: 'ngxCardFooter',
  templateUrl: './card-footer.component.html',
  host: {
    class: 'ngx-card-footer'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: false
})
export class CardFooterComponent {
  @Input() label: string; // used for vertical card
}
