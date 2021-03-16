import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: 'ngx-card-title, [ngxCardTitlte], [ngx-card-title]'
})
export class CardTitleDirective {
  @HostBinding('class.ngx-card-title') hostClass = true;
}
