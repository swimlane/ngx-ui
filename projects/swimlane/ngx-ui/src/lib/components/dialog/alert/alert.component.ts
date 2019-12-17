import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { DialogComponent } from '../dialog.component';

// Disable lint until codelyzer supports class inheritance
// https://github.com/mgechev/codelyzer/issues/191

/* tslint:disable */
@Component({
  selector: 'ngx-alert-dialog',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../dialog.component.scss', './alert.component.scss'],
  template: `
    <div class="ngx-dialog ngx-alert-dialog {{ type }}" [style.zIndex]="zIndex">
      <div
        class="ngx-dialog-content {{ cssClass }}"
        [@visibilityTransition]="visibleState"
        [style.zIndex]="contentzIndex"
        #dialogContent
        (keydown.escape)="onCancelClick()"
        (keydown.enter)="onKeydown()"
        tabindex="-1"
        role="dialog"
      >
        <div class="ngx-dialog-header" *ngIf="title || closeButton">
          <button *ngIf="closeButton" type="button" class="close" (click)="hide()">
            <span class="icon-x"></span>
          </button>
          <button
            *ngIf="type === 'alert'"
            type="button"
            class="btn close-button"
            [class.btn-warning]=""
            (click)="onOkClick()"
          >
            Ok
          </button>
          <h1 *ngIf="title" [innerHTML]="title"></h1>
        </div>
        <div *ngIf="content" class="ngx-dialog-body" [innerHTML]="content"></div>

        <div class="ngx-dialog-body" *ngIf="type === 'prompt'">
          <ngx-input type="text" autofocus="true" name="confirm_input" [(ngModel)]="data"> </ngx-input>
        </div>

        <div class="ngx-dialog-footer" *ngIf="type !== 'alert'">
          <ng-container *ngIf="!longPress">
            <button type="button" class="btn btn-primary" (click)="onOkClick()">
              Ok
            </button>
            <button type="button" class="btn" (click)="onCancelClick()">
              Cancel
            </button>
          </ng-container>
          <ngx-long-press-button *ngIf="longPress" (longPress)="onOkClick()" duration="1000"></ngx-long-press-button>
        </div>
      </div>
    </div>
  `,
  animations: [
    trigger('visibilityTransition', [
      state(
        'active',
        style({
          opacity: 1,
          transform: 'scale3d(1, 1, 1)'
        })
      ),
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
        animate(
          '0.2s ease-out',
          style({
            transform: 'scale3d(0.9, 0.9, 1)',
            opacity: 0
          })
        )
      ])
    ])
  ],
  host: {
    tabindex: '-1'
  }
})
export class AlertComponent extends DialogComponent {
  defaults: any = {
    inputs: {
      zIndex: 991,
      closeOnBlur: false,
      closeOnEscape: false,
      closeButton: false,
      showOverlay: true,
      visible: true,
      class: ''
    }
  };

  @Input() type: any;
  @Input() data: any = '';
  @Input() longPress?: boolean = false;
  @Output() ok = new EventEmitter();
  @Output() cancel = new EventEmitter();

  @ViewChild('dialogContent', { static: true }) dialogElm;

  ngOnInit(): void {
    if (this.type !== 'prompt') {
      this.dialogElm.nativeElement.focus();
    }

    if (this.longPress) {
      this.closeButton = true;
    }
  }

  onOkClick(): void {
    this.ok.emit({ data: this.data });
    this.hide();
  }

  onCancelClick(): void {
    this.cancel.emit({ data: this.data });
    this.hide();
  }

  onKeydown(): void {
    if (!this.longPress) {
      this.ok.emit({ data: this.data });
      this.hide();
    }
  }
}
/* tslint:enable */
