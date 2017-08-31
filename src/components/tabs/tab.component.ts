import { Component, Input, TemplateRef, ContentChild, ElementRef } from '@angular/core';
import { IfTabActiveDirective } from './if-tab-active.directive';

/**
 * TODO: Remove hidden when https://github.com/angular/angular/issues/18310 is resolved
 */
@Component({
  selector: 'ngx-tab',
  template: `
    <div *ngIf="template; then template_container else content_container"></div>
    <ng-template #template_container>
      <div *ngIf="active">
        <ng-container [ngTemplateOutlet]="template.templateRef"></ng-container>
      </div>
    </ng-template>
    <ng-template #content_container>
      <div [hidden]="!active">
        <ng-content></ng-content>
      </div>
    </ng-template>
  `,
  host: {
    class: 'ngx-tab'
  }
})
export class TabComponent {

  @Input() title = '';

  @Input() active = false;

  @Input() disabled = false;

  @ContentChild(IfTabActiveDirective) template: IfTabActiveDirective;
}
