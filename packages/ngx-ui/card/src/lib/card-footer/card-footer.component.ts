import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ngx-card-footer',
  templateUrl: './card-footer.component.html',
  styleUrls: ['./card-footer.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'ngxCardFooter'
})
export class CardFooterComponent {
  @Input() label!: string; // used for vertical card

  @HostBinding('class.ngx-card-footer') hostClass = true;
}
