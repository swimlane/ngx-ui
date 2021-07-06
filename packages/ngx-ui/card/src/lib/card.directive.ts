import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: 'ngx-card-body, [ngxCardBody], [ngx-card-body]',
})
export class CardBodyDirective {
  @HostBinding('class.ngx-card-body') hostClass = true;
}

@Directive({
  selector: 'ngx-card-tag, [ngxCardTag], [ngx-card-tag]',
})
export class CardTagDirective {
  @HostBinding('class.ngx-card-tag') hostClass = true;
}

@Directive({
  selector: 'ngx-card-title, [ngxCardTitle], [ngx-card-title]',
})
export class CardTitleDirective {
  @HostBinding('class.ngx-card-title') hostClass = true;
}

@Directive({
  selector: 'ngx-card-subtitle, [ngxCardSubtitle], [ngx-card-subtitle]',
})
export class CardSubtitleDirective {
  @HostBinding('class.ngx-card-subtitle') hostClass = true;
}

@Directive({
  selector: 'ngx-card-section, [ngxCardSection], [ngx-card-section]',
})
export class CardSectionDirective {
  @HostBinding('class.ngx-card-section') hostClass = true;
}
