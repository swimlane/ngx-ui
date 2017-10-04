import {
  Component, Input, Output, EventEmitter, Renderer,
  ElementRef, HostListener, trigger, style,
  animate, transition, state, OnInit, ViewEncapsulation, OnDestroy
} from '@angular/core';

@Component({
  selector: 'ngx-dialog',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./dialog.component.scss'],
  template: `
    <div      
      [class]="class"
      [class.ngx-dialog]="true"
      [style.zIndex]="zIndex">
      <div
        class="ngx-dialog-content {{cssClass}}"
        [@visibilityTransition]="visibleState"
        [style.zIndex]="contentzIndex"
        tabindex="-1"
        role="dialog">
        <button
          *ngIf="closeButton"
          type="button"
          class="close"
          (click)="hide()">
          <span class="icon-x"></span>
        </button>
        <div
          class="ngx-dialog-header"
          *ngIf="title">
          <h2
            *ngIf="title"
            class="ngx-dialog-title"
            [innerHTML]="title">
          </h2>
        </div>
        <ng-template
          *ngIf="template"
          [ngTemplateOutlet]="template"
          [ngTemplateOutletContext]="{ context: context }">
        </ng-template>
        <div
          *ngIf="content"
          [innerHTML]="content">
        </div>
        <ng-content></ng-content>
      </div>
    </div>
  `,
  animations: [
    trigger('visibilityTransition', [
      state('active', style({
        opacity: 1,
        transform: 'scale3d(1, 1, 1)'
      })),
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
        animate('0.2s ease-out', style({
          transform: 'scale3d(0.9, 0.9, 1)',
          opacity: 0
        }))
      ])
    ])
  ],
  host: {
    tabindex: '-1'
  }
})
export class DialogComponent implements OnInit, OnDestroy {

  @Input() id: string;
  @Input() visible: boolean;
  @Input() zIndex: number;
  @Input() title: string;
  @Input() content: string;
  @Input() template: any;
  @Input() cssClass: string;
  @Input() context: any;
  @Input() closeOnBlur: boolean;
  @Input() closeOnEscape: boolean;
  @Input() closeButton: boolean;
  @Input() class: string;

  @Output() open = new EventEmitter();
  @Output() close = new EventEmitter();

  get contentzIndex(): number {
    return this.zIndex + 1;
  }

  get visibleState(): string {
    return this.visible ? 'active' : 'inactive';
  }

  constructor(private element: ElementRef, private renderer: Renderer) { }

  ngOnInit(): void {
    if(this.visible) this.show();
  }

  show(): void {
    this.visible = true;

    setTimeout(() => {
      this.renderer.invokeElementMethod(
        this.element.nativeElement, 'focus', []);
    }, 10);

    this.open.emit();
  }

  @HostListener('keydown.esc')
  onKeyDown(): void {
    if(this.closeOnEscape) this.hide();
  }

  hide(): void {
    this.visible = false;
    this.close.emit();
  }

  @HostListener('document:click', ['$event.target'])
  onDocumentClick(target): void {
    if(this.containsTarget(target)) {
      this.hide();
    }
  }

  containsTarget(target): boolean {
    return this.closeOnBlur &&
      target.classList.contains('dialog');
  }

  /**
   * On destroy callback
   *
   * @memberOf DrawerComponent
   */
  ngOnDestroy() {
    this.close.emit(true);
  }

}
