import {
  Component,
  ViewEncapsulation,
  ViewChild,
  ChangeDetectionStrategy,
  TemplateRef,
  Input,
  HostBinding,
  EventEmitter,
  Output
} from '@angular/core';

@Component({
  selector: 'ngx-nav-menu',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./nav-menu.component.scss'],
  template: `
    <div class="nav-menu">
      <ng-content></ng-content>
      <ngx-icon *ngIf="!expanded" svgSrc="slide-right" (click)="setExpanded(true)" class="expand-icon bottom" ngx-tooltip tooltipTitle="Expand" tooltipPlacement="right"></ngx-icon>
      <ngx-icon *ngIf="expanded" svgSrc="slide-left" (click)="setExpanded(false)" class="expand-icon bottom" ngx-tooltip tooltipTitle="Collapse" tooltipPlacement="right"></ngx-icon>
    </div>
  `
})
export class NavMenuComponent {
  @HostBinding('class.expanded')
  @Input()
  expanded: boolean = false;

  @Output() expandedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  setExpanded(value: boolean): void {
    this.expanded = value;
    this.expandedChange.emit(this.expanded);
  }
}
