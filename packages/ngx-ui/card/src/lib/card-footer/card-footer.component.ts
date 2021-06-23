import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'ngx-card-footer',
  exportAs: 'ngxCardFooter',
  templateUrl: './card-footer.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardFooterComponent {
  @HostBinding('class.ngx-card-footer') hostClass = true;

  @Input() label = ''; // used for vertical card
}
