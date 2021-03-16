import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: 'ngx-card-body, [ngxCardBody], [ngx-card-body]',
})
export class CardBodyDirective {
  @HostBinding('class.ngx-card-body') hostClass = true;
}
