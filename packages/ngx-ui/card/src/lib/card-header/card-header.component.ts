import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ngx-card-header',
  templateUrl: './card-header.component.html',
  styleUrls: ['./card-header.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'ngxCardHeader'
})
export class CardHeaderComponent {
  @Input() label!: string; // used for vertical card

  @HostBinding('class.ngx-card-header') hostClass = true;
}
