import { Component, TemplateRef, ViewChild } from '@angular/core';

import { DrawerService } from '../../components/drawer';
import { DialogService } from '../../components/dialog';

import * as icons from '../../assets/fonts/icons/icons.json';
import * as colors from '../../styles/colors/colors.json';
import * as template from './app.template.html';
import './app.scss';

@Component({
  selector: 'app',
  template
})
export class App {

  version = APP_VERSION;

  @ViewChild('editTmpl') editTmpl: TemplateRef<any>;
  @ViewChild('dialogTmpl') dialogTpl: TemplateRef<any>;

  tooltipModel = {
    text: 'foo'
  };

  dynamicVal = `Attack at ${new Date()}`;

  colors = [
    'blue',
    'light-blue',
    'green',
    'red',
    'orange',
    'purple'
  ];

  chartColorsOrdinal = [
    {
      name: 'Vivid',
      colors: [
        '#62CD8C',
        '#3D4EB4',
        '#1594F2',
        '#00B965',
        '#B7DF3F',
        '#99B726',
        '#F4E667',
        '#FF990D',
        '#FF5821',
        '#D24018'
      ]
    },
    {
      name: 'Natural',
      colors: [
        '#C09E77',
        '#EA9551',
        '#D9A05B',
        '#F2E0A8',
        '#F2E0A8',
        '#A4D7C6',
        '#7693B1',
        '#AFAFAF',
        '#707160',
        '#D9D5C3'
      ]
    },
    {
      name: 'Cool',
      colors: [
        '#ACCCED',
        '#A9E3F5',
        '#7CD2ED',
        '#4DAACC',
        '#79A2E4',
        '#8695BF',
        '#A27DA7',
        '#AE6785',
        '#AA5963',
        '#A9375C'
      ]
    },
    {
      name: 'Fire',
      colors: [
        '#FF3E00',
        '#C0370A',
        '#FF900B',
        '#FF7002',
        '#FF3E00',
        '#FF5821',
        '#E75200',
        '#FFCC31',
        '#FFAC12',
        '#FF7002'
      ]
    }
  ];

  chartColorsSequential = [
    {
      name: 'Solar',
      colors: [
        '#FFF8E1',
        '#FFEDB4',
        '#FFE184',
        '#FFD654',
        '#FFCC31',
        '#FFC31B',
        '#FFB414',
        '#FFA10F',
        '#FF900B',
        '#FF7002'
      ]
    },
    {
      name: 'Air',
      colors: [
        '#E1F5FE',
        '#B2E5FC',
        '#7FD3F9',
        '#4AC2F6',
        '#1EB5F5',
        '#00A7F3',
        '#0099E4',
        '#0086D0',
        '#0075BC',
        '#00559A'
      ]
    },
    {
      name: 'Aqua',
      colors: [
        '#E0F7FA',
        '#B1EBF2',
        '#7EDEEA',
        '#48D0E1',
        '#1AC6DA',
        '#00BBD4',
        '#00ACC1',
        '#0097A7',
        '#00838F',
        '#006064'
      ]
    }
  ];

  icons = icons;

  code = `
    var foo = true;
    var bar = false;

    function moo() {
      console.log(foo);
    }
  `;

  curDate = new Date();
  minDate = new Date('10/2/2016');
  maxDate = new Date('10/22/2016');
  invalidDate = 'foo';
  emptyDate = null;

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

  uploader = {
    url: 'https://evening-anchorage-3159.herokuapp.com/api/',
    autoUpload: true
  };

  constructor(
    private drawerMngr: DrawerService,
    private dialogMngr: DialogService) {

    let i = 1;
    while(i <= 24) {
      this.shadows.push(i++);
    }
  }

  getHex(scssVar) {
    const color = colors[scssVar];
    if(color) {
      return color.type + color.value;
    }
  }

  dateChanged(val) {
    console.log('date changed!', val);
  }

  setTheme(theme) {
    const elm = document.querySelector('body');

    // remove old
    elm.classList.remove('day-theme');
    elm.classList.remove('night-theme');
    elm.classList.remove('moonlight-theme');

    // add new
    elm.classList.add(`${theme}-theme`);
  }

  openDrawer(direction = 'left') {
    this.drawerMngr.open(this.editTmpl, {
      title: 'A dialog title',
      direction
    });
  }

  openDialog(options) {
    this.dialogMngr.open(options);
  }

  menuClicked(event) {
    console.log('Menu clicked', event);
  }

}
