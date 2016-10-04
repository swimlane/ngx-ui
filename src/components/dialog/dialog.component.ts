import {
  Component, Input, Output, EventEmitter,
  ElementRef, HostListener, trigger, style,
  animate, transition, state, OnInit
} from '@angular/core';

import { DialogOptions } from './dialog-options';
import './dialog.scss';

@Component({
  selector: 'swui-dialog',
  template: `
    <div
      [hidden]="!visible"
      class="swui-dialog"
      [style.zIndex]="zIndex">
      <div
        class="swui-dialog-content {{cssClass}}"
        [@visibilityTransition]="visibleState"
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
            *ngIf="template"
            [ngTemplateOutlet]="template"
            [ngOutletContext]="{ context: context }">
          </template>
          <div
            *ngIf="content"
            [innerHTML]="content">
          </div>
        </div>
      </div>
    </div>
  `,
  animations: [
    trigger('visibilityTransition', [
      state('active', style({
        opacity: 1,
        transform: 'scale3d(1, 1, 1)'
      })),
      state('inactive', style({
        visibility: 'hidden',
        opacity: 0
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
export class DialogComponent implements OnInit {

  @Input() id: string;
  @Input() visible: boolean;
  @Input() zIndex: number;
  @Input() title: string;
  @Input() content: string;
  @Input() template: any;
  @Input() cssClass: string;
  @Input() context: any;
  @Input() closeOnBlur: boolean = true;
  @Input() closeOnEscape: boolean = true;
  @Input() closeButton: boolean = true;

  @Output() onOpen = new EventEmitter();
  @Output() onClose = new EventEmitter();

  get contentzIndex(): number {
    return this.zIndex + 1;
  }

  get visibleState(): string {
    return this.visible ? 'active' : 'inactive';
  }

  constructor(private element: ElementRef, options: DialogOptions) {
    if(options) Object.assign(this, options);
  }

  ngOnInit() {
    if(this.visible) this.show();
  }

  show() {
    this.visible = true;
    this.element.nativeElement.focus();
    this.onOpen.emit();
  }

  @HostListener('keydown.esc')
  hide() {
    this.visible = false;
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
