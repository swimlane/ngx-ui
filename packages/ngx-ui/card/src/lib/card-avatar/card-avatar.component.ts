import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { EnumKey } from '@swimlane/ngx-ui/typings';
import { CardStatus } from '../enums';

@Component({
  selector: 'ngx-card-avatar',
  exportAs: 'ngxCardAvatar',
  templateUrl: './card-avatar.component.html',
  styleUrls: ['./card-avatar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardAvatarComponent {
  @HostBinding('class.ngx-card-avatar') hostClass = true;

  @HostBinding('class.ngx-card-avatar-img') get avatarImgClass() {
    return !!this.src;
  }

  @Input() src: string | SafeUrl = '';

  @Input('status') set _status(v: EnumKey<typeof CardStatus>) {
    this.status = CardStatus[v];
  }

  status?: CardStatus;
}
