import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import type { SafeUrl } from '@angular/platform-browser';
import { InputEnum } from '@swimlane/ngx-ui/decorators/input-enum';
import type { EnumKey } from '@swimlane/ngx-ui/types';
import { CardStatus } from '../enums';

@Component({
  selector: 'ngx-card-avatar',
  templateUrl: './card-avatar.component.html',
  styleUrls: ['./card-avatar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'ngxCardAvatar'
})
export class CardAvatarComponent {
  @Input() src!: string | SafeUrl;

  @InputEnum(CardStatus)
  @Input('status')
  _status?: EnumKey<typeof CardStatus>;
  status?: CardStatus;

  @HostBinding('class.ngx-card-avatar') hostClass = true;

  @HostBinding('class.ngx-card-avatar-img') get avatarImg() {
    return !!this.src;
  }
}
