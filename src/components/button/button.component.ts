import {
  Component,
  Input,
  Output,
  EventEmitter,
  NgZone,
  ViewEncapsulation,
  OnInit,
  OnChanges,
  ContentChild,
  TemplateRef,
  HostBinding,
  HostListener
} from '@angular/core';

import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgModel } from '@angular/forms';

@Component({
  selector: 'ngx-button',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./button.component.scss'],
  host: {class: 'ngx-button'},
  template: `
    <button [disabled]="_disabled">
      <span class="content"><ng-content></ng-content></span>
      <span class="state-icon">
        <span *ngIf="inProgress" class="icon icon-loading"></span>
        <span *ngIf="success" class="icon icon-check"></span>
        <span *ngIf="fail" class="icon icon-x"></span>
      </span>
    </button>
  `
})
export class ButtonComponent implements OnInit, OnChanges {
  @Input() disabled: boolean = false;
  @Input() state: string = 'active'; // active, inProgress, success, fail
  @Input() promise: any;

  @HostBinding('class.in-progress') inProgress: boolean = false;
  @HostBinding('class.active') active: boolean = true;
  @HostBinding('class.success') success: boolean = false;
  @HostBinding('class.fail') fail: boolean = false;
  @HostBinding('class.disabled-button') _disabled: boolean = false;

  lastTimeout: any;

  ngOnInit(): void {
    this.updateState();
  }

  ngOnChanges(): void {
    this._disabled = this.disabled;
    this.updateState();
    this.updatePromise();
  }

  updatePromise() {
    if (this.promise !== undefined) {
      this.state = 'inProgress';
      this.updateState();
      this.promise.then(() => {
        this.state = 'success';
        this.updateState();
      }).catch((error) => {
        this.state = 'fail';
        this.updateState();
      });
    }
  }

  updateState() {
    if (!this.state) {
      this.state = 'active';
    }

    this.inProgress = false;
    this.active = false;
    this.success = false;
    this.fail = false;

    switch (this.state) {
      case 'inProgress':
        this.inProgress = true;
        break;
      case 'success':
        this.success = true;
        break;
      case 'fail':
        this.fail = true;
        break;
      default:
        this.active = true;
        break;
    }

    if (this.success || this.fail || this.inProgress) {
      this._disabled = true;
    }

    if (this.success || this.fail) {
      clearTimeout(this.lastTimeout);
      this.lastTimeout = setTimeout(() => {
        this.state = 'active';
        this._disabled = this.disabled;
        this.updateState();
      }, 3000);
    }
  }

  @HostListener('click', ['$event'])
  onClick(event): boolean {
    if (this._disabled) {
      event.stopPropagation();
      event.preventDefault();
      return false;
    }
    return true;
  }
}
