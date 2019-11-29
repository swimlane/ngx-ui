import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ViewEncapsulation,
  Renderer2,
  ElementRef
} from '@angular/core';

import { ToolbarTitleDirective } from './toolbar-title.directive';
import { ToolbarContentDirective } from './toolbar-content.directive';

@Component({
  selector: 'ngx-toolbar',
  template: `
    <header class="flex-container" fxLayout="row" fxLayoutWrap="nowrap" fxFill fxLayoutGap="5px">
      <div class="ngx-toolbar-title-col" fxFlex>
        <ng-content *ngIf="!mainTitle" select="ngx-toolbar-title"></ng-content>
        <h2 class="ngx-toolbar-title" *ngIf="mainTitle">
          {{ mainTitle }}
          <small *ngIf="subtitle">{{ subtitle }}</small>
        </h2>
      </div>
      <div class="ngx-toolbar-content-col" fxFlex>
        <ng-content *ngIf="!menu" select="ngx-toolbar-content"></ng-content>
        <ul class="horizontal-list ngx-toolbar-menu" *ngIf="menu">
          <li *ngFor="let item of toolbarItems">
            <button type="button" [disabled]="item.disabled" (click)="onMenuClicked(item, $event)">
              {{ item.label }}
            </button>
          </li>
          <li *ngIf="dropdownItems.length">
            <ngx-dropdown>
              <ngx-dropdown-toggle>
                <button type="button">
                  ...
                </button>
              </ngx-dropdown-toggle>
              <ngx-dropdown-menu class="align-right">
                <ul class="vertical-list">
                  <li *ngFor="let item of dropdownItems">
                    <button type="button" (click)="onMenuClicked(item, $event)">
                      {{ item.label }}
                    </button>
                  </li>
                </ul>
              </ngx-dropdown-menu>
            </ngx-dropdown>
          </li>
        </ul>
      </div>
    </header>
  `,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./toolbar.component.scss'],
  host: {
    class: 'ngx-toolbar'
  }
})
export class ToolbarComponent {
  @Input() title: string;
  @Input() mainTitle: string;
  @Input() subtitle: string;
  @Input() menu;

  @Output() menuClick = new EventEmitter();

  @ViewChild(ToolbarTitleDirective) toolbarTitle: ToolbarTitleDirective;
  @ViewChild(ToolbarContentDirective) toolbarContent: ToolbarContentDirective;

  get toolbarItems() {
    return this.menu.filter(m => {
      return !m.dropdown;
    });
  }

  get dropdownItems() {
    return this.menu.filter(m => {
      return m.dropdown;
    });
  }
  constructor(private renderer: Renderer2, private elRef: ElementRef) {}

  onMenuClicked(item, $event) {
    if (item.click) {
      item.click($event);
    }
  }

  ngOnInit() {
    // backwards compatibility
    if (this.title) {
      this.mainTitle = this.title;
      this.renderer.removeAttribute(this.elRef.nativeElement, 'title');
    }
  }
}
