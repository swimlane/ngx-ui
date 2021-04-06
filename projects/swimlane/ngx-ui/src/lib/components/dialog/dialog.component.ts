import { animate, state, style, transition, trigger } from '@angular/animations';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation,
  Renderer2,
  TemplateRef,
  ChangeDetectionStrategy,
  NgZone
} from '@angular/core';
import { ESCAPE } from '@angular/cdk/keycodes';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';

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
  changeDetection: ChangeDetectionStrategy.OnPush
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

  @Output() open = new EventEmitter<boolean | void>();
  @Output() close = new EventEmitter<boolean | void>();

  get contentzIndex(): number {
    return this.zIndex + 1;
  }

  get visibleState() {
    return this.visible ? 'active' : 'inactive';
  }

  private _closeOnBlur?: boolean;
  private _closeOnEscape?: boolean;
  private _closeButton?: boolean;
  private _visible?: boolean;
  private _zIndex?: number;
  private _unlisteners: VoidFunction[] = [];

  constructor(
    private readonly ngZone: NgZone,
    private readonly element: ElementRef<HTMLElement>,
    private readonly renderer: Renderer2
  ) {}

  ngOnInit(): void {
    if (this.visible) this.show();
    // backwards compatibility
    if (this.title) {
      this.dialogTitle = this.title;
      this.renderer.removeAttribute(this.element.nativeElement, 'title');
    }

    this.setupEventListeners();
  }

  ngOnDestroy() {
    this.close.emit(true);
    while (this._unlisteners.length) {
      this._unlisteners.pop()();
    }
  }

  show(): void {
    this.visible = true;
    this.open.emit();
  }

  hide(): void {
    this.visible = false;
    this.close.emit();
  }

  containsTarget(target: any): boolean {
    return this.closeOnBlur && target.classList.contains('dialog');
  }

  private setupEventListeners(): void {
    this.ngZone.runOutsideAngular(() => {
      const keydownEscListener = this.renderer.listen(this.element.nativeElement, 'keydown', (event: KeyboardEvent) => {
        // We could've actually used `render.listener(element, 'keydown.esc')` and that would definitely work.
        // Unfortunately, Angular delegates the event handling to the `KeyEventsPlugin` when it meets the `.` (dot)
        // in the event name. The `KeyEventsPlugin` calls `ngZone.runGuarded` which triggers change detection anyway
        // (no matter if we added event listeners in the root zone).
        // In that case the change detection will be run only when the user clicks `esc` button.
        if (event.keyCode === ESCAPE && this.closeOnEscape) {
          this.ngZone.run(() => {
            this.hide();
          });
        }
      });

      const documentClickListener = this.renderer.listen('document', 'click', (event: MouseEvent) => {
        if (this.containsTarget(event.target)) {
          this.ngZone.run(() => {
            this.hide();
          });
        }
      });

      this._unlisteners.push(keydownEscListener, documentClickListener);
    });
  }
}
