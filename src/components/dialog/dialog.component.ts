import {
  Component, Input, Output, EventEmitter,
  ElementRef, HostListener, trigger, style,
  animate, transition, state
} from '@angular/core';

import { DialogOptions } from './dialog-options';
import './dialog.scss';

@Component({
  selector: 'swui-dialog',
  template: `
    <div class="swui-dialog" [style.zIndex]="zIndex">
      <div
        class="swui-dialog-content {{cssClass}}"
        [@visibilityTransition]="'load'"
        [style.zIndex]="contentzIndex"
        tabindex="-1"
        role="dialog">
        <div
          class="swui-dialog-header"
          *ngIf="title || closeButton">
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
  `,
  animations: [
    trigger('visibilityTransition', [
      state('load',   style({
        opacity: 1,
        transform: 'scale3d(1, 1, 1)'
      })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'scale3d(1.2, 1.2, 1.2)'
        }),
        animate('0.2s ease-out')
      ]),
      transition('* => void', [
        style({
          opacity: 0,
          'pointer-events': 'none',
          tranform: 'scale3d(0.9, 0.9, 1)'
        }),
        animate('0.2s ease-out')
      ])
    ])
  ]
})
export class DialogComponent {

  @Input() id: string;
  @Input() zIndex: number;
  @Input() title: string;
  @Input() template: any;
  @Input() cssClass: string;
  @Input() context: any;
  @Input() closeOnBlur: boolean = true;
  @Input() closeOnEscape: boolean = true;
  @Input() closeButton: boolean = true;

  @Output() onClose = new EventEmitter();

  get contentzIndex(): number {
    return this.zIndex + 1;
  }

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
