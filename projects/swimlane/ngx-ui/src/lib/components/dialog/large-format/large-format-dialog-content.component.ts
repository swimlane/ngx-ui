import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { pluck, take } from 'rxjs/operators';
import { StepperComponent } from '../../stepper/stepper.component';
import { TabsComponent } from '../../tabs/tabs.component';
import { AlertService } from '../alert/alert.service';
import { LargeFormatDialogFooterComponent } from './components/large-format-dialog-footer/large-format-dialog-footer.component';

@Component({
  selector: 'ngx-large-format-dialog-content',
  exportAs: 'ngxLargeFormatDialogContent',
  templateUrl: './large-format-dialog-content.component.html',
  styleUrls: ['./large-format-dialog-content.component.scss', './large-format-dialog-content-drawer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class LargeFormatDialogContentComponent {
  // header-title inputs
  @Input() title = '';
  @Input() subtitle?: string;

  // header-action inputs
  @Input() actionTitle = 'Close';
  @Input() dirty = false;
  @Input() dirtyActionTitle = 'Cancel';

  // header-action outputs
  @Output() closeOrCancel = new EventEmitter<boolean>();

  @HostBinding('class.ngx-large-format-dialog-content') hostClass = true;

  @ContentChild(LargeFormatDialogFooterComponent) footerComponent?: LargeFormatDialogFooterComponent;

  @ContentChild(StepperComponent) set stepperComponent(v: StepperComponent) {
    this.useStepper = !!v;
  }

  useStepper = false;

  @ContentChild(TabsComponent) set tabsComponent(v: TabsComponent) {
    this.useTabs = !!v;
  }

  useTabs = false;

  constructor(public elementRef: ElementRef, private readonly alertService: AlertService) {}

  onCloseOrCancel(isDirty: boolean) {
    if (isDirty) {
      const alertRef = this.alertService.confirm({
        title: 'You Have Unsaved Changes',
        content: 'Are you sure you want to discard your changes?',
        cancelButtonText: 'Discard',
        cancelButtonClass: 'btn-bordered',
        confirmButtonText: 'Cancel'
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
