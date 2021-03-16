import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: 'ngx-card-tag, [ngxCardTag], [ngx-card-tag]'
})
export class CardTagDirective {
  @HostBinding('class.ngx-card-tag') hostClass = true;
}
