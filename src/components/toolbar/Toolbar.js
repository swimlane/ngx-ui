import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';

import { ToolbarTitle } from './ToolbarTitle.js';
import { ToolbarContent } from './ToolbarContent.js';
import './toolbar.scss';

@Component({
  selector: 'toolbar',
  template: `
    <header class="Grid toolbar">
      <div class="Grid-cell u-size1of4 toolbar-title-col">
        <ng-content *ngIf="!title" select="toolbar-title"></ng-content>
        <h2 class="toolbar-title" *ngIf="title">
          {{title}}
          <small *ngIf="subtitle">{{subtitle}}</small>
        </h2>
      </div>
      <div class="Grid-cell u-sizeFill toolbar-content-col">
        <ng-content *ngIf="!menu" select="toolbar-content"></ng-content>
        <ul class="horizontal-menu menu" *ngIf="menu">
          <li *ngFor="let item of toolbarItems">
            <button
              type="button"
              [disabled]="item.disabled"
              (click)="menuClicked(item, $event)">
              {{item.label}}
            </button>
          </li>
          <li *ngIf="dropdownItems.length">
            <button type="button">...</button>
            <ul>
              <li *ngFor="let item of dropdownItems">
                <button
                  type="button"
                  (click)="menuClicked(item, $event)">
                  {{item.label}}
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </header>
  `
})
export class Toolbar {

  @Input() title;
  @Input() subtitle;
  @Input() menu;

  @Output() onMenuClick = new EventEmitter();

  @ViewChild(ToolbarTitle) titleContent;
  @ViewChild(ToolbarContent) titleContent;

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

  menuClicked(item, $event) {
    if(item.click) {
      item.click($event)
    }
  }

}
