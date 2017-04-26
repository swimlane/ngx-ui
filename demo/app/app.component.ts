import { Component, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation, OnInit } from '@angular/core';
import { Location, LocationStrategy, HashLocationStrategy } from '@angular/common';

import { FileUploaderOptions, FileUploader } from 'ng2-file-upload';

import { DrawerService } from '../../src/components/drawer';
import { DialogService, AlertService } from '../../src/components/dialog';
import { NotificationService } from '../../src/components/notification';
import { InjectionService } from '../../src/services/injection.service';
import { LoadingService } from '../../src/components/loading';
import { IconRegisteryService } from '../../src/services/icon-registery.service';

import * as icons from '../../src/assets/fonts/icons/icons.json';
import * as colors from '../../src/styles/colors/colors.json';

@Component({
  selector: 'app',
  providers: [Location, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.template.html',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {

  version = APP_VERSION;

  @ViewChild('editTmpl') editTmpl: TemplateRef<any>;
  @ViewChild('dialogTmpl') dialogTpl: TemplateRef<any>;

  tooltipModel = {
    text: 'foo'
  };

  leftSplit = '30%';
  rightSplit = '70%';

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
    const results = [];
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
  iconFx = [
    'inverse',
    'rotate-90',
    'rotate-180',
    'rotate-270',
    'flip',
    'flip-y',
    'half-sized',
    'dbl-sized',
    'badge',
    'spinning',
    'spinning-rev'
  ];

  toggleChk = true;

  code = `
    var foo = true;
    var bar = false;

    function moo() {
      console.log(foo);
    }
  `;

  curDate: any = new Date();
  minDate: any = new Date('10/2/2016');
  maxDate: any = new Date('10/22/2016');
  invalidDate: any = 'foo';
  emptyDate: any = null;
  editorResult: any;
  numericValue: any;
  inputValue: any;
  inputValue1: any;
  inputValue2: any;
  inputValue3: any;
  usernameValue: any;
  passwordValue: any;
  shown: any;
  output: any;
  curDate2: any;
  sliderEvent1: any;
  sliderEvent2: any;
  sliderEvent3: any;
  sliderEvent4: any;
  sliderEvent5: any;
  sliderEvent6: any;
  sliderEvent7: any;
  sliderEvent8: any;
  dialogVis: any;

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
    const res = [];

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

  nodes: any[] = [
    { label: 'Node 1' },
    {
        label: 'Node 2',
        expandable: true,
        expanded: true,
        children: [
          { label: 'Node 1' },
          { label: 'Node 2' },
          {
            label: 'Node 3',
            expanded: false,
            expandable: true,
            children: [
              { label: 'Node 1' },
              { label: 'Node 2' },
              { label: 'Node 3' },
              { label: 'Node 4' }
            ]
          },
          {
            label: 'Node 4',
            expandable: true,
            expanded: true,
            children: [
              { label: 'Node 1' },
              { label: 'Node 2' },
              { label: 'Node 3' },
              { label: 'Node 4' }
            ]
          }
        ]
    },
    { label: 'Node 3' },
    {
      label: 'Node 4',
      children: [
        { label: 'Node 1' },
        { label: 'Node 2' },
        { label: 'Node 3' },
        { label: 'Node 4' }
      ],
      expandable: true
    }
  ];

  nodes1: any[] = [
    {
      label: 'Node1', model: { type: 'Array', count: 1 }
    },
    {
      label: 'Node2',
      expandable: true,
      model: { type: 'Object' },
      children: [
        {
          label: 'Node1', model: { type: 'Array', count: 1 }
        }
      ]
    },
    {
      label: 'Node3', model: { type: 'Array', count: 1 }
    }
  ];

  jsonObject = JSON.parse(`{
    "firstName": "John",
    "lastName": "Smith",
    "isAlive": true,
    "age": 25,
    "address": {
      "streetAddress": "21 2nd Street",
      "city": "New York",
      "state": "NY",
      "postalCode": "10021-3100"
    },
    "phoneNumbers": [
      {
        "type": "home",
        "number": "212 555-1234"
      },
      {
        "type": "office",
        "number": "646 555-4567"
      },
      {
        "type": "mobile",
        "number": "123 456-7890"
      }
    ],
    "children": [],
    "spouse": null
  }`);

  buttonPromise: any = undefined;

  constructor(
    public viewContainerRef: ViewContainerRef,
    public drawerMngr: DrawerService,
    public dialogMngr: DialogService,
    public notificationService: NotificationService,
    public injectionService: InjectionService,
    public alertService: AlertService,
    public loadingService: LoadingService,
    public iconRegisteryService: IconRegisteryService,
    public location: Location
    ) {

    // uncomment for testing
    // this.injectionService.setRootViewContainer(this.viewContainerRef);

    let i = 1;
    while(i <= 24) {
      this.shadows.push(i++);
    }

    this.deps = DEPS;

    this.state = this.location.path(true);

    iconRegisteryService.add('frown-upside-down', 'smiley-frown fx-flip-y');
    iconRegisteryService.add('x-spinning', 'x fx-spinning');
    iconRegisteryService.add('x-spinning-red', 'x-spinning :color-red');
    iconRegisteryService.add('turbine', ['square-filled', 'x-spinning-red']);

    iconRegisteryService.add('app:create', 'new-app');
    iconRegisteryService.add('app:edit', 'edit-app');
    iconRegisteryService.add('app:copy', 'copy-app');
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

  openDrawer(direction = 'left', size?) {
    this.drawerMngr.create({
      direction,
      template: this.editTmpl,
      size,
      context: 'Alert Everyone!'
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

  onClick(event) {
    console.log(event);
    this.buttonPromise = new Promise((resolve, reject) => {
      setTimeout(function(){
        if (Math.random() < 0.5) {
          resolve('Success!');
        } else {
          reject('I fail you!');
        }
      }, 3000);
    });

    this.buttonPromise.then(() => {
      console.log('success');
    }).catch((error) => {
      console.log('fail');
    });
  }

  onPromptClick() {
    const subject = this.alertService.prompt({
      title: 'Alert SOC',
      content: 'What type of compromise?'
    });

    console.log('Prompt subject', subject);

    subject.subscribe({
      next: (v) => console.log('Prompt next', v),
      error: (err) => console.log('Prompt err', err),
      complete: (v) => console.log('Complete', v)
    });
  }

}
