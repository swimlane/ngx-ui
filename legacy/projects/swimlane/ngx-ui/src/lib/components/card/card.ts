import { Directive } from '@angular/core';

@Directive({
  selector: 'ngx-card-body, [ngxCardBody], [ngx-card-body]',
  host: { class: 'ngx-card-body' }
})
export class CardBodyDirective {}

@Directive({
  selector: 'ngx-card-tag, [ngxCardTag], [ngx-card-tag]',
  host: { class: 'ngx-card-tag' }
})
export class CardTagDirective {}

@Directive({
  selector: 'ngx-card-title, [ngxCardTitlte], [ngx-card-title]',
  host: { class: 'ngx-card-title' }
})
export class CardTitleDirective {}

@Directive({
  selector: 'ngx-card-subtitle, [ngxCardSubtitle], [ngx-card-subtitle]',
  host: { class: 'ngx-card-subtitle' }
})
export class CardSubtitleDirective {}

@Directive({
  selector: 'ngx-card-section, [ngxCardSection], [ngx-card-section]',
  host: { class: 'ngx-card-section' }
})
export class CardSectionDirective {}
