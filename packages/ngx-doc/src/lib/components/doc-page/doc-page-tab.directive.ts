import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[ngxDocPageTab]',
})
export class DocPageTabDirective {
  @Input()
  ngxDocPageTab = '';

  constructor(public readonly templateRef: TemplateRef<unknown>) {}
}
