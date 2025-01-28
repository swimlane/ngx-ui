import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { CardStatus } from '../card-status.enum';

@Component({
  exportAs: 'ngxCardAvatar',
  selector: 'ngx-card-avatar',
  templateUrl: './card-avatar.component.html',
  styleUrls: ['./card-avatar.component.scss'],
  host: {
    class: 'ngx-card-avatar',
    '[class.ngx-card-avatar-img]': '!!src'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: false
})
export class CardAvatarComponent {
  @Input() src: string | SafeUrl;
  @Input() status: CardStatus;
  @Input() removeImageBackground?: boolean;
}
