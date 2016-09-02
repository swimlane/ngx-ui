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

        <ul class="horizontal-menu menu">
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

  @Input() title = '';
  @Input() subtitle = '';
  @Input() menu = [];

}
