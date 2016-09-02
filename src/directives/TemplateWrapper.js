import {
  Directive,
  ViewContainerRef,
  Input
} from '@angular/core';

@Directive({ selector: '[templateWrapper]' })
export class TemplateWrapper {

  @Input() template;
  @Input() context;

  constructor(viewContainer: ViewContainerRef) {
    this.viewContainer = viewContainer;
  }

  ngOnInit() {
    const view = this.viewContainer.createEmbeddedView(
      this.template, this.context);
  }
}
