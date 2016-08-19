import { Component } from '@angular/core';

import template from './app.html';
import './app.scss';
import './assets/fonts/icons/icons-font.js';

@Component({
  selector: 'app',
  template
})
export class App {

  version = APP_VERSION;

  colors = [
    'blue',
    'light-blue',
    'green',
    'red',
    'orange'
  ];

}
