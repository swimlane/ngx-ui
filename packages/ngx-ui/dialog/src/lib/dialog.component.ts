import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import {
  BooleanInput,
  NgxBooleanInput,
  NgxNumericInput,
  NumericInput,
} from '@swimlane/ngx-ui/common';
import { EnumKey } from '@swimlane/ngx-ui/typings';
import { DialogFormat } from './enums';

@Component({
  selector: 'ngx-dialog',
  exportAs: 'ngxDialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('visibilityTransition', [
      state(
        'active',
        style({
          opacity: 1,
          transform: 'scale3d(1, 1, 1)',
        })
      ),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'scale3d(1.2, 1.2, 1.2)',
        }),
        animate('0.2s ease-out'),
      ]),
      transition('* => inactive', [
        style({
          opacity: 1,
          transform: 'scale3d(1, 1, 1)',
        }),
        animate(
          '0.2s ease-out',
          style({
            transform: 'scale3d(0.9, 0.9, 1)',
            opacity: 0,
          })
        ),
      ]),
    ]),
  ],
})
export class DialogComponent implements OnInit, OnDestroy {
  static ngAcceptInputType_closeOnBlur: BooleanInput;
  static ngAcceptInputType_closeOnEscape: BooleanInput;
  static ngAcceptInputType_closeButton: BooleanInput;
  static ngAcceptInputType_visible: BooleanInput;
  static ngAcceptInputType_zIndex: NumericInput;

  @HostBinding('attr.tabindex') hostTabIndex = -1;

  @Input() id?: string;
  @Input() dialogTitle?: string;
  @Input() content?: string;
  @Input() template?: TemplateRef<unknown>;
  @Input() cssClass = '';
  @Input() context?: unknown;
  @Input() class?: string;

  @Input('format') set _format(v: EnumKey<typeof DialogFormat>) {
    this.format = DialogFormat[v];
  }

  format = DialogFormat.regular;

  @NgxBooleanInput()
  @Input()
  closeOnBlur = true;

  @NgxBooleanInput()
  @Input()
  closeOnEscape = true;

  @NgxBooleanInput()
  @Input()
  closeButton = true;

  @NgxBooleanInput()
  @Input()
  visible = true;

  @NgxNumericInput(995)
  @Input()
  zIndex = 995;

  @Output() dialogOpen = new EventEmitter<boolean | void>();
  @Output() dialogClose = new EventEmitter<boolean | void>();

  get contentZIndex(): number {
    return this.zIndex + 1;
  }

  get visibleState() {
    return this.visible ? 'active' : 'inactive';
  }

  readonly DialogFormat = DialogFormat;

  ngOnInit(): void {
    if (this.visible) this.show();
  }

  ngOnDestroy() {
    this.dialogClose.emit(true);
  }

  show(): void {
    this.visible = true;
    this.dialogOpen.emit();
  }

  hide(): void {
    this.visible = false;
    this.dialogClose.emit();
  }

  containsTarget(target: HTMLElement): boolean {
    return this.closeOnBlur && target.classList.contains('dialog');
  }

  @HostListener('keydown.esc')
  onEscapeKeyDown(): void {
    if (this.closeOnEscape) this.hide();
  }

  @HostListener('document:click', ['$event.target'])
  onDocumentClick(target: HTMLElement): void {
    if (this.containsTarget(target)) {
      this.hide();
    }
  }
}
