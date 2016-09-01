import { Component } from '@angular/core';

import { DrawerManager } from '../components/drawer/DrawerModule.js';

import icons from '../assets/fonts/icons/icons.json';
import template from './app.html';
import './app.scss';

@Component({
  selector: 'app',
  template
})
export class App {

  version = APP_VERSION;

  icons = icons;

  set state(val) {
    window.state = val;
  }

  get state() {
    return window.state;
  }

  colors = [
    'blue',
    'light-blue',
    'green',
    'red',
    'orange',
    'purple'
  ];

  gradients = [
    'gradient-blue',
    'gradient-blue-green',
    'gradient-blue-red',
    'gradient-blue-purple',
    'gradient-red-orange',
    'gradient-orange-purple',
  ]

  constructor(drawerMngr: DrawerManager) {
    this.drawerMngr = drawerMngr;
  }

  setTheme(theme) {
    const elm = document.querySelector('body');

    // remove old
    elm.classList.remove('light-theme');
    elm.classList.remove('dark-theme');
    elm.classList.remove('gradient-theme');

    // add new
    elm.classList.add(`${theme}-theme`);
  }

  openDrawer() {
    this.drawerMngr.open(`
      <h1>Hello</h1>
    `, {
      width: 100
    });
  }

}
