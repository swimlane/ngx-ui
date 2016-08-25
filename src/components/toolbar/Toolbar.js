import {
  Component,
  Input
} from '@angular/core';

import './toolbar.scss';

@Component({
  selector: 'toolbar',
  template: `
    <header class="Grid toolbar">
      <div class="Grid-cell u-size1of4 toolbar-title-col">
        <h2 class="toolbar-title">
          {{title}}
          <small>{{subtitle}}</small>
        </h2>
      </div>
      <div class="Grid-cell u-sizeFill toolbar-content-col">
        <menu type="toolbar">
          <li>
            <button type="menu" menu="file-menu">File</button>
          </li>
          <li>
            <button type="menu" menu="edit-menu">...</button>
            <menu type="context" id="edit-menu">
              <menuitem label="Cut..."></menuitem>
              <menuitem label="Copy..."></menuitem>
              <menuitem label="Paste..."></menuitem>
            </menu>
          </li>
        </menu>
      </div>
    </header>
  `
})
export class Toolbar {

  @Input() title = '';
  @Input() subtitle = '';
  @Input() menu = [];

}
