import { Component, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';

import { FileUploaderOptions, FileUploader } from 'ng2-file-upload';

import { DrawerService } from '../../src/components/drawer';
import { DialogService } from '../../src/components/dialog';
import { NotificationService } from '../../src/components/notification';
import { InjectionService } from '../../src/services/injection.service';

import '@swimlane/ngx-datatable/release/datatable.css';

import * as icons from '../../src/assets/fonts/icons/icons.json';
import * as colors from '../../src/styles/colors/colors.json';
import * as template from './app.template.html';

@Component({
  selector: 'app',
  template,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  version = APP_VERSION;

  @ViewChild('editTmpl') editTmpl: TemplateRef<any>;
  @ViewChild('dialogTmpl') dialogTpl: TemplateRef<any>;

  tooltipModel = {
    text: 'foo'
  };

  chars = `
    ​‌‘ ​‌? ​‌’ ​‌“ ​‌! ​‌” ​‌( ​‌%​‌ )​‌ [ ​‌# ​‌]​‌ { ​‌@ ​‌}​‌ /​‌& ​‌<​‌
    - ​‌+​ ‌÷​ ‌×​ ‌= ​‌> ​‌® ​‌© ​‌$ ​‌€ ​‌£ ​‌¥ ​‌¢ ​‌: ​‌; ​‌, ​‌. ​‌*
  `;

  nums = `
    1​‌ 2 ​‌3 ​‌4 ​‌5 ​‌6 ​‌7 ​‌8 ​‌9 ​‌0
  `;

  letters = `
    ​‌A​‌ B ​‌C ​‌Ć ​‌D ​‌E ​‌F ​‌G ​‌H ​‌I ​‌J ​‌K ​‌L ​‌M ​‌
    N​‌ O​‌ P​‌ Q ​‌R ​‌S​‌ Š​‌ T ​‌U​‌ V ​‌W​‌ X ​‌Y ​‌Z ​‌Ž​‌
  `;

  lettersLower = `
    a b​‌ c ​‌ć​‌ d​‌ e​‌ f​‌ g​‌ h​‌ i ​‌j ​‌k​‌ l ​‌m​‌
    n​‌ o ​‌p​‌ q​‌ r ​‌s ​‌š​‌ t​‌ u​‌ v​‌ w​‌ x​‌ y​‌ z​‌ ž​‌
  `;

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

  selects = function() {
    let i = 50;
    let results = [];
    while(i--) {
      results.push({
        name: `Breach Level: ${i}`, 
        attr: `${i}_intrusion_breach`, 
        address: `${i}.${i}.${i}.12`,
        disabled: i === 48
      });
    }

    return results;
  }();

  icons = icons;

  toggleChk = true;

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

  rows: any[] = (function() {
    let res = [];

    let i = 0;
    while(i++ < 50) {
      res.push({
        type: i % 2 ? 'DDOS' : 'Malware',
        os: 'Linux',
        user: 'cody'
      });
    }

    return res;
  })();

  shadows = [];

  uploadOptions = {
    url: 'https://evening-anchorage-3159.herokuapp.com/api/',
    autoUpload: true
  };

  uploaderInstance = new FileUploader({
    url: 'https://evening-anchorage-3159.herokuapp.com/api/',
    autoUpload: false
  });

  deps: any;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private drawerMngr: DrawerService,
    private dialogMngr: DialogService,
    private notificationMngr: NotificationService,
    private injectionService: InjectionService) {

    // uncomment for testing
    // this.injectionService.setRootViewContainer(this.viewContainerRef);

    let i = 1;
    while(i <= 24) {
      this.shadows.push(i++);
    }

    this.deps = DEPS;

    // this.state = 'colors';
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
    this.drawerMngr.create({
      title: 'A dialog title',
      direction,
      template: this.editTmpl
    });
  }

  openDialog(options) {
    this.dialogMngr.create(options);
  }

  menuClicked(event) {
    console.log('Menu clicked', event);
  }

  onToggleChange(event) {
    console.log('check?', event);
  }

  onSelectKeyUp(event) {
    console.log('key up', event);
  }

}
