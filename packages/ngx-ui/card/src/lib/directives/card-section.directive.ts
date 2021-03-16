import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: 'ngx-card-section, [ngxCardSection], [ngx-card-section]'
})
export class CardSectionDirective {
  @HostBinding('class.ngx-card-section') hostClass = true;
}
