import { Component } from '@angular/core';

import { Drawer } from '../components/drawer/Drawer.js';

import template from './app.html';
import './app.scss';

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

  constructor(drawer: Drawer) {
    this.drawer = drawer;
  }

  openDrawer() {
    drawer.open();
  }

}
