import { Component, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';

import { DrawerManagerService } from '../../components/drawer';

import * as icons from '../../assets/fonts/icons/icons.json';
import * as template from './app.template.html';
import './app.scss';

@Component({
  selector: 'app',
  template
})
export class App {

  version = APP_VERSION;

  @ViewChild('editTmpl')
  editTmpl: TemplateRef<any>;

  tooltipModel = {
    text: 'foo'
  };

  colors = [
    'blue',
    'light-blue',
    'green',
    'red',
    'orange',
    'purple'
  ];

  icons = icons;

  code = `
    var foo = true;
    var bar = false;

    function moo() {
      console.log(foo);
    }
  `;

  get state() {
    return window.state;
  }

  set state(val) {
    window.state = val;
  }

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

  shadows = [];

  constructor(
    private drawerMngr: DrawerManagerService,
    public viewContainerRef: ViewContainerRef) {

    let i = 1;
    while(i <= 24) {
      this.shadows.push(i++);
    }
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
