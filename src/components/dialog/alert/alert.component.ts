import {
  Component, Input, Output, EventEmitter,
  ElementRef, HostListener, trigger, style,
  animate, transition, state, OnInit, ViewEncapsulation
} from '@angular/core';
import { DialogComponent } from '../dialog.component';

@Component({
  selector: 'ngx-alert-dialog',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    '../dialog.component.scss',
    './alert.component.scss'
  ],
  template: `
    <div
      class="ngx-dialog"
      [style.zIndex]="zIndex">
      <div
        class="ngx-dialog-content {{cssClass}}"
        [@visibilityTransition]="visibleState"
        [style.zIndex]="contentzIndex"
        tabindex="-1"
        role="dialog">
        <div
          class="ngx-dialog-header"
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
            class="ngx-dialog-title">
            {{title}}
          </h2>
        </div>
        <div class="ngx-dialog-body">
          <div [innerHTML]="content"></div>
        </div>
        <div class="ngx-dialog-footer">
          <button
            type="button"
            class="btn btn-primary"
            (click)="onOkClick()">
            Ok
          </button>
          <button
            type="button"
            class="btn"
            (click)="onCancelClick()">
            Cancel
          </button>
      </div>
    </div>
  `,
  animations: [
    trigger('visibilityTransition', [
      state('active', style({
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
      transition('* => inactive', [
        style({
          opacity: 1,
          transform: 'scale3d(1, 1, 1)'
        }),
        animate('0.2s ease-out', style({
          transform: 'scale3d(0.9, 0.9, 1)',
          opacity: 0
        }))
      ])
    ])
  ]
})
export class AlertComponent extends DialogComponent {

  defaults: any = {
    inputs: {
      zIndex: 991,
      closeOnBlur: false,
      closeOnEscape: false,
      closeButton: false,
      showOverlay: true,
      visible: true
    }
  };

  @Input() type: any;
  @Input() data: any;
  @Output() ok = new EventEmitter();
  @Output() cancel = new EventEmitter();

  onOkClick(): void {
    this.ok.emit({ data: this.data });
    this.hide();
  }

  onCancelClick(): void {
    this.cancel.emit();
    this.hide();
  }

}
