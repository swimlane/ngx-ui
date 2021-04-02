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
import { StepperComponent } from '../../stepper/stepper.component';
import { TabsComponent } from '../../tabs/tabs.component';
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

  constructor(public elementRef: ElementRef) {}
}
