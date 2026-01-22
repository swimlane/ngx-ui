import { animate, state, style, transition, trigger } from '@angular/animations';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { DialogFormat } from './dialog-format.enum';

@Component({
  exportAs: 'ngxDialog',
  selector: 'ngx-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
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
  host: { tabindex: '-1' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class DialogComponent implements OnInit, OnDestroy {
  @Input() id: string;
  @Input() title: string;
  @Input() dialogTitle: string;
  @Input() content: string;
  @Input() template: TemplateRef<any>;
  @Input() cssClass: string;
  @Input() context: any;
  @Input() class: string;
  @Input() format = DialogFormat.Regular;

  @Input()
  get closeOnBlur() {
    return this._closeOnBlur;
  }

  set closeOnBlur(closeOnBlur) {
    this._closeOnBlur = coerceBooleanProperty(closeOnBlur);
  }

  @Input()
  get closeOnEscape() {
    return this._closeOnEscape;
  }

  set closeOnEscape(closeOnEscape) {
    this._closeOnEscape = coerceBooleanProperty(closeOnEscape);
  }

  @Input()
  get closeButton() {
    return this._closeButton;
  }

  set closeButton(closeButton) {
    this._closeButton = coerceBooleanProperty(closeButton);
  }

  @Input()
  get visible() {
    return this._visible;
  }

  set visible(visible) {
    this._visible = coerceBooleanProperty(visible);
  }

  @Input()
  get zIndex() {
    return this._zIndex;
  }

  set zIndex(zIndex) {
    this._zIndex = coerceNumberProperty(zIndex);
  }

  @Input() beforeClose: () => boolean;

  @Output() open = new EventEmitter<boolean | void>();
  @Output() close = new EventEmitter<boolean | void>();

  get contentzIndex(): number {
    return this.zIndex + 1;
  }

  get visibleState() {
    return this.visible ? 'active' : 'inactive';
  }

  get canClose(): boolean {
    return this.beforeClose ? this.beforeClose() : true;
  }

  readonly DialogFormat = DialogFormat;

  private _closeOnBlur?: boolean;
  private _closeOnEscape?: boolean;
  private _closeButton?: boolean;
  private _visible?: boolean;
  private _zIndex?: number;

  constructor(private readonly element: ElementRef, private readonly renderer2: Renderer2) {}

  ngOnInit(): void {
    if (this.visible) {
      this.show();
      this.element.nativeElement?.focus();
    }
    // backwards compatibility
    if (this.title) {
      this.dialogTitle = this.title;
      this.renderer2.removeAttribute(this.element.nativeElement, 'title');
    }
  }

  ngOnDestroy() {
    this.close.emit(true);
  }

  show(): void {
    this.visible = true;
    this.open.emit();
  }

  hide(): void {
    this.visible = false;
    this.close.emit();
  }

  @HostListener('keydown.esc')
  onEscapeKeyDown() {
    if (this.closeOnEscape && this.canClose) {
      this.hide();
    }
  }
}
