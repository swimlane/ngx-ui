import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: 'ngx-card-subtitle, [ngxCardSubtitle], [ngx-card-subtitle]',
})
export class CardSubtitleDirective {
  @HostBinding('class.ngx-card-subtitle') hostClass = true;
}
