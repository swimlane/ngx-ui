import {
  Component, Input, Output, EventEmitter,
  ElementRef, HostListener
} from '@angular/core';

import { DialogOptions } from './dialog-options';
import './dialog.scss';

@Component({
  selector: 'swui-dialog',
  template: `
    <div
      [style.zIndex]="zIndex"
      class="swui-dialog {{cssClass}}"
      tabindex="-1"
      role="dialog">
      <div class="swui-dialog-content">
        <div class="swui-dialog-header" *ngIf="title || closeButton">
          <button
            *ngIf="closeButton"
            type="button"
            class="close"
            (click)="hide()">
            <span class="icon-x"></span>
          </button>
          <h2
            *ngIf="title"
            class="swui-dialog-title">
            {{title}}
          </h2>
        </div>
        <div class="swui-dialog-body">
          <template
            [ngTemplateOutlet]="template"
            [ngOutletContext]="{ context: context }">
          </template>
        </div>
      </div>
    </div>
  `
})
export class DialogComponent {

  @Output() onClose = new EventEmitter();

  private zIndex: string;
  private title: string;
  private template: any;
  private cssClass: string;
  private context: any;
  private closeOnBlur: boolean = true;
  private closeOnEscape: boolean = true;
  private closeButton: boolean = true;

  constructor(private element: ElementRef, options: DialogOptions) {
    Object.assign(this, options);
  }

  show() {
    this.element.nativeElement.focus();
  }

  @HostListener('keydown.esc')
  hide() {
    this.onClose.emit();
  }

  @HostListener('document:click', ['$event.target'])
  onDocumentClick(target) {
    let shouldHide =
      this.closeOnBlur &&
      target.classList.contains('dialog');

    if(shouldHide) {
      this.hide();
    }
  }

}
