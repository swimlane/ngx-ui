import {
  Component, Input, Output, EventEmitter, Renderer, ViewContainerRef,
  ElementRef, HostListener, trigger, style, ViewRef, ComponentRef,
  animate, transition, state, OnInit, ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'ngx-dialog',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./dialog.component.scss'],
  template: `
    <div
      class="ngx-dialog"
      [style.zIndex]="zIndex">
      <div
        class="ngx-dialog-content {{cssClass}}"
        [@visibilityTransition]="visibleState"
        [style.zIndex]="contentzIndex"
        tabindex="-1"
        role="dialog">
        <div
          class="ngx-dialog-header"
          *ngIf="title || closeButton">
          <button
            *ngIf="closeButton"
            type="button"
            class="close"
            (click)="hide()">
            <span class="icon-x"></span>
          </button>
          <h2
            *ngIf="title"
            class="ngx-dialog-title">
            {{title}}
          </h2>
        </div>
        <div class="ngx-dialog-body">
          <template
            *ngIf="template"
            [ngTemplateOutlet]="template"
            [ngOutletContext]="{ context: context }">
          </template>
          <div
            *ngIf="content"
            [innerHTML]="content">
          </div>
          <ng-content></ng-content>
        </div>
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
  ]
})
export class DialogComponent implements OnInit {

  @Input() id: string;
  @Input() visible: boolean;
  @Input() zIndex: number;
  @Input() title: string;
  @Input() content: string;
  @Input() cssClass: string = '';
  @Input() context: any;
  @Input() closeOnBlur: boolean = true;
  @Input() closeOnEscape: boolean = true;
  @Input() closeButton: boolean = true;

  @Input()
  set template(val) {
    console.log('this', this.renderer, this.viewContainerRef);

    if(typeof val === 'string') {
      val = this.renderer.createText(this.element.nativeElement, `${val}`);
      // val = new ContentRef([[elm]]);
      debugger;
    }

    this._template = val;
  }

  get template(): any {
    return this._template;
  }

  @Output() open = new EventEmitter();
  @Output() close = new EventEmitter();

  get contentzIndex(): number {
    return this.zIndex + 1;
  }

  get visibleState(): string {
    return this.visible ? 'active' : 'inactive';
  }

  _template: any;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private renderer: Renderer,
    private element: ElementRef) { }

  ngOnInit() {
    if(this.visible) this.show();
  }

  show() {
    this.visible = true;
    this.element.nativeElement.focus();
    this.open.emit();
  }

  @HostListener('keydown.esc')
  hide() {
    this.visible = false;
    this.close.emit();
  }

  @HostListener('document:click', ['$event.target'])
  onDocumentClick(target) {
    let shouldHide =
      this.closeOnBlur &&
      target.classList.contains('dialog');

    if(shouldHide) {
      this.hide();
    }
  }

}
