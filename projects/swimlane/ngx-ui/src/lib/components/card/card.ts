import { Directive } from '@angular/core';

@Directive({
  selector: 'ngx-card-body, [ngxCardBody], [ngx-card-body]',
  host: { class: 'ngx-card-body' },
  standalone: false
})
export class CardBodyDirective {}

@Directive({
  selector: 'ngx-card-tag, [ngxCardTag], [ngx-card-tag]',
  host: { class: 'ngx-card-tag' },
  standalone: false
})
export class CardTagDirective {}

@Directive({
  selector: 'ngx-card-title, [ngxCardTitle], [ngx-card-title]',
  host: { class: 'ngx-card-title' },
  standalone: false
})
export class CardTitleDirective {}

@Directive({
  selector: 'ngx-card-subtitle, [ngxCardSubtitle], [ngx-card-subtitle]',
  host: { class: 'ngx-card-subtitle' },
  standalone: false
})
export class CardSubtitleDirective {}

@Directive({
  selector: 'ngx-card-section, [ngxCardSection], [ngx-card-section]',
  host: { class: 'ngx-card-section' },
  standalone: false
})
export class CardSectionDirective {}
