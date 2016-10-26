import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';

import { ToolbarTitleDirective } from './toolbar-title.directive';
import { ToolbarContentDirective } from './toolbar-content.directive';
import './toolbar.scss';

@Component({
  selector: 'swui-toolbar',
  template: `
    <header class="Grid">
      <div class="Grid-cell u-size1of2 swui-toolbar-title-col">
        <ng-content *ngIf="!title" select="swui-toolbar-title"></ng-content>
        <h2 class="swui-toolbar-title" *ngIf="title">
          {{title}}
          <small *ngIf="subtitle">{{subtitle}}</small>
        </h2>
      </div>
      <div class="Grid-cell u-sizeFill swui-toolbar-content-col">
        <ng-content *ngIf="!menu" select="swui-toolbar-content"></ng-content>
        <ul class="horizontal-list swui-toolbar-menu" *ngIf="menu">
          <li *ngFor="let item of toolbarItems">
            <button
              type="button"
              [disabled]="item.disabled"
              (click)="onMenuClicked(item, $event)">
              {{item.label}}
            </button>
          </li>
          <li *ngIf="dropdownItems.length">
            <swui-dropdown>
              <swui-dropdown-toggle>
                <button type="button">
                  ...
                </button>
              </swui-dropdown-toggle>
              <swui-dropdown-menu class="align-right">
                <ul class="vertical-list">
                  <li *ngFor="let item of dropdownItems">
                    <button
                      type="button"
                      (click)="onMenuClicked(item, $event)">
                      {{item.label}}
                    </button>
                  </li>
                </ul>
              </swui-dropdown-menu>
            </swui-dropdown>
          </li>
        </ul>
      </div>
    </header>
  `,
  host: {
    class: 'swui-toolbar'
  }
})
export class ToolbarComponent {

  @Input() title: string;
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

  onMenuClicked(item, $event) {
    if(item.click) {
      item.click($event);
    }
  }

}
