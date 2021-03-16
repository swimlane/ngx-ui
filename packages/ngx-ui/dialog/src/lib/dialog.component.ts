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
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { InputBoolean } from '@swimlane/ngx-ui/decorators/input-boolean';
import { InputNumeric } from '@swimlane/ngx-ui/decorators/input-numeric';

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
  @Input() id?: string;
  @Input() title?: string;
  @Input() dialogTitle?: string;
  @Input() content?: string;
  @Input() template?: TemplateRef<unknown>;
  @Input() cssClass?: string;
  @Input() context?: unknown;
  @Input() class?: string;

  @InputBoolean()
  @Input()
  closeOnBlur!: boolean;

  @InputBoolean()
  @Input()
  closeOnEscape!: boolean;

  @InputBoolean()
  @Input()
  closeButton!: boolean;

  @InputBoolean()
  @Input()
  visible = false;

  @InputNumeric()
  @Input()
  zIndex!: number;

  @Output() open = new EventEmitter<boolean | void>();
  @Output() close = new EventEmitter<boolean | void>();

  get contentZIndex(): number {
    return this.zIndex + 1;
  }

  get visibleState() {
    return this.visible ? 'active' : 'inactive';
  }

  @HostBinding('attr.tabindex') hostTabIndex = -1;

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

  constructor(
    private readonly element: ElementRef,
    private readonly renderer2: Renderer2
  ) {}

  ngOnInit(): void {
    if (this.visible) this.show();
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

  containsTarget(target: HTMLElement): boolean {
    return this.closeOnBlur && target.classList.contains('dialog');
  }
}
