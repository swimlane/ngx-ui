import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  TemplateRef,
  ViewEncapsulation,
  ViewChild,
  OnInit
} from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { pluck, take } from 'rxjs/operators';
import { AlertService } from '../alert/alert.service';
import { DialogOptions } from '../dialog-options.interface';
import { LargeFormatDialogFooterComponent } from './components/large-format-dialog-footer/large-format-dialog-footer.component';
import { LargeFormatDialogStepperDirective } from './directives/large-format-dialog-stepper/large-format-dialog-stepper.directive';
import { LargeFormatDialogTabsDirective } from './directives/large-format-dialog-tabs/large-format-dialog-tabs.directive';
@Component({
  selector: 'ngx-large-format-dialog-content, ngx-medium-format-dialog-content',
  templateUrl: './large-format-dialog-content.component.html',
  styleUrls: ['./large-format-dialog-content.component.scss', './large-format-dialog-content-drawer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: false
})
export class LargeFormatDialogContentComponent implements OnInit {
  // header-title inputs
  @Input() dialogTitle = '';
  @Input() dialogSubtitle?: string;
  @Input() imgSrc?: string | SafeUrl;
  @Input() removeImageBackground?: boolean;
  @Input() logoTemplate?: TemplateRef<unknown>;
  @Input() dialogSubtitleTemplate?: TemplateRef<unknown>;
  @Input() format: 'large' | 'medium' = 'large';

  // header-action inputs
  @Input() dialogActionTitle = 'Close';
  @Input() dirty = false;
  @Input() dialogDirtyActionTitle = 'Cancel';

  // dirty alert options
  @Input() dirtyAlertOptions?: DialogOptions;
  @Input() skipDirtyAlert = false;

  // header-action outputs
  @Output() closeOrCancel = new EventEmitter<boolean>();

  @HostBinding('class.ngx-large-format-dialog-content')
  get isLargeFormat() {
    return this.format === 'large';
  }

  @HostBinding('class.ngx-medium-format-dialog-content')
  get isMediumFormat() {
    return this.format === 'medium';
  }

  @ContentChild(LargeFormatDialogFooterComponent) footerComponent?: LargeFormatDialogFooterComponent;

  @ContentChild(LargeFormatDialogStepperDirective, { read: TemplateRef }) stepperTemplate?: TemplateRef<unknown>;

  @ContentChild(LargeFormatDialogTabsDirective, { read: TemplateRef }) tabsTemplate?: TemplateRef<unknown>;

  @ViewChild('myTemplate', { static: true }) myTemplate: ElementRef;
  imageTemplate = {};

  constructor(public elementRef: ElementRef, private readonly alertService: AlertService) {
    if (elementRef.nativeElement.tagName.toLowerCase() === 'ngx-medium-format-dialog-content') {
      this.format = 'medium';
    }
  }

  ngOnInit() {
    if (this.myTemplate) {
      this.imageTemplate = {
        template: this.myTemplate
      };
    }
  }
  onCloseOrCancel(isDirty: boolean) {
    if (isDirty && !this.skipDirtyAlert) {
      const alertRef = this.alertService.confirm({
        title: 'You Have Unsaved Changes',
        content: 'Are you sure you want to discard your changes?',
        cancelButtonText: 'Discard',
        cancelButtonClass: 'btn-bordered',
        confirmButtonText: 'Cancel',
        ...(this.dirtyAlertOptions || {})
      });

      alertRef
        .asObservable()
        .pipe(take(1), pluck('type'))
        .subscribe((okOrCancel: 'ok' | 'cancel') => {
          /**
           * Based on the design, Cancel button is on the "confirmButtonText" position while Discard button is on the "cancelButtonText"
           * - When Discard is clicked, alertRef will emit {type: cancel}, it means that the consumers want to discard their changes => emit the output
           * - When Cancel is clicked, alertRef will emit {type: ok}, it means that the consumers DO NOT want to discard their changes.
           */
          if (okOrCancel === 'cancel') {
            this.closeOrCancel.emit(isDirty);
          }
        });
    } else {
      this.closeOrCancel.emit(isDirty);
    }
  }
}
