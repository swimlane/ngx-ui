import { Component, Input, ViewChild } from '@angular/core';

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
          <li><button type="button">File</button></li>
          <li>
            <button type="button">...</button>
            <ul>
              <li><button type="button">Edit</button></li>
              <li><button type="button">Save</button></li>
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

  @ViewChild(ToolbarTitle) titleContent;
  @ViewChild(ToolbarContent) titleContent;

}
