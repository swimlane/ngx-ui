import { Component } from '@angular/core';
import { DialogComponent } from '../dialog';

@Component({
  selector: 'ngx-alert-dialog',
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
          <div
            *ngIf="content"
            [innerHTML]="content">
          </div>
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `
})
export class AlertComponent extends DialogComponent {


}
