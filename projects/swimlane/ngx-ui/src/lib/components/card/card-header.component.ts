import { Component, ChangeDetectionStrategy, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ngx-card-header',
  exportAs: 'ngxCardHeader',
  templateUrl: './card-header.component.html',
  host: {
    class: 'ngx-card-header'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: false
})
export class CardHeaderComponent {
  @Input() label: string; // used for vertical card
}
