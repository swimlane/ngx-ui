import { Component, TemplateRef, ViewChild } from '@angular/core';

import { DrawerManager } from '../components/drawer/index.js';

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

  @ViewChild('editTmpl')
  editTmpl: TemplateRef<any>;

  set state(val) { window.state = val; }
  get state() { return window.state; }

  colors = [
    'blue',
    'light-blue',
    'green',
    'red',
    'orange',
    'purple'
  ];

  code = `
    var foo = true;
    var bar = false;

    function moo() {
      console.log(foo);
    }
  `;

  editorConfig = {
    lineNumbers: true,
    theme: 'dracula',
    mode: {
      name: 'javascript',
      json: true
    }
  };

  sliderValue = 85;

  gradients = [
    'gradient-blue',
    'gradient-blue-green',
    'gradient-blue-red',
    'gradient-blue-purple',
    'gradient-red-orange',
    'gradient-orange-purple',
  ];

  toolbarMenu = [
    {
      label: 'File',
      click: () => {
        console.log('File clicked');
      }
    },
    {
      label: 'Run',
      disabled: true
    },
    {
      label: 'Edit',
      dropdown: true,
      click: () => {
        console.log('Edit clicked');
      }
    }
  ];

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

  openDrawer(direction = 'left') {
    this.drawerMngr.open(this.editTmpl, {
      title: 'A dialog title',
      direction
    });
  }

  menuClicked(event) {
    console.log('Menu clicked', event);
  }

}
