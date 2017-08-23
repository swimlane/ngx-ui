import {
  Component, Input, Output, EventEmitter, HostListener,
  HostBinding, ViewEncapsulation
} from '@angular/core';
import { NotificationService } from './notification.service';
import { NotificationType } from './notification.type';
import { NotificationStyleType } from './notification-style.type';

@Component({
  selector: 'ngx-notification',
  template: `
    <div>
      <div *ngIf="styleType !== 'none' && !icon" class="icon-container">
        <span *ngIf="styleType==='info'" class="icon icon-info-fulled"></span>
        <span *ngIf="styleType==='warning'" class="icon icon-warning-filled"></span>
        <span *ngIf="styleType==='error'" class="icon icon-x-filled"></span>
        <span *ngIf="styleType==='success'" class="icon icon-check-filled"></span>
      </div>

      <div *ngIf="styleType === 'none' && icon" class="icon-container">
        <span [class]="'icon ' + icon"></span>
      </div>

      <div class="notification-content" [class.has-icon]="styleType !== 'none' || icon">
        <h2 class="ngx-notification-title" [innerHTML]="title"></h2>
        <p class="ngx-notification-body" [innerHTML]="body"></p>
        <ng-template
          *ngIf="template"
          [ngTemplateOutlet]="template"
          [ngTemplateOutletContext]="notificationService">
        </ng-template>
        <button
          *ngIf="showClose"
          type="button"
          (click)="close.emit()"
          class="icon-x ngx-notification-close">
        </button>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent {

  @Input() cssClass: string = '';
  @Input() title: string;
  @Input() body: string;
  @Input() template: any;
  @Input() pauseOnHover: boolean;
  @Input() styleType: NotificationStyleType;
  @Input() showClose: boolean;
  @Input() timestamp: any;
  @Input() icon: string;

  @Output() close = new EventEmitter();
  @Output() pause = new EventEmitter();
  @Output() resume = new EventEmitter();

  timeout: any;

  @HostBinding('class')
  get cssClasses(): string {
    let cls = `ngx-notification ngx-notification-${this.styleType}`;
    if(this.cssClass) cls += ` ${this.cssClass}`;
    if(this.showClose) cls += ' notification-closeable';
    return cls;
  }

  constructor(private notificationService: NotificationService) { }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if(this.pauseOnHover) {
      this.pause.emit();
    }
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    if(this.pauseOnHover) {
      this.resume.emit();
    }
  }

}
