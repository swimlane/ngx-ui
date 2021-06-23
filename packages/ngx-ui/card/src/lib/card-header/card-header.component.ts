import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'ngx-card-header',
  exportAs: 'ngxCardHeader',
  templateUrl: './card-header.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardHeaderComponent {
  @HostBinding('class.ngx-card-header') hostClass = true;

  @Input() label = ''; // used for vertical card
}
