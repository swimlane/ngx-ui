(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{"h/ag":function(n,e,t){"use strict";t.r(e),t.d(e,"DrawerPageModule",function(){return m});var c=t("ofXK"),r=t("8lIJ"),o=t("alW4"),a=t("tyNb"),i=t("fXoL"),l=t("LMvA");let b=(()=>{class n{constructor(n,e){this.drawerService=n,this.el=e,this.DrawerDirection=r.s}open(n){this.drawerService.create({direction:n,template:this.template,context:"Alert Everyone!",closeOnOutsideClick:!0,parentContainer:this.el.nativeElement,isRoot:!1})}}return n.\u0275fac=function(e){return new(e||n)(i.Mb(r.u),i.Mb(i.l))},n.\u0275cmp=i.Gb({type:n,selectors:[["app-drawer-container-example"]],inputs:{template:"template"},decls:6,vars:0,consts:[["type","button",1,"btn",3,"click"]],template:function(n,e){1&n&&(i.Sb(0,"button",0),i.Zb("click",function(){return e.open(e.DrawerDirection.Left)}),i.Ic(1,"Open Left"),i.Rb(),i.Ic(2,"\n"),i.Sb(3,"button",0),i.Zb("click",function(){return e.open(e.DrawerDirection.Bottom)}),i.Ic(4,"Open Bottom"),i.Rb(),i.Ic(5,"\n"))},styles:["[_nghost-%COMP%]{display:block;position:relative;background-color:#272936;height:500px;overflow:hidden}"],changeDetection:0}),n})();const s=["editTmpl"];function p(n,e){if(1&n){const n=i.Tb();i.Ic(0,"\n    "),i.Sb(1,"ngx-toolbar",12),i.Ic(2,"\n    "),i.Rb(),i.Ic(3,"\n    "),i.Sb(4,"section",13),i.Ic(5,"\n      "),i.Sb(6,"h1"),i.Ic(7,"Attack Type: Malware"),i.Rb(),i.Ic(8,"\n      "),i.Sb(9,"button",2),i.Zb("click",function(){return i.vc(n),i.dc().openDrawer()}),i.Ic(10,"\n        Open Details\n      "),i.Rb(),i.Ic(11,"\n\n      "),i.Sb(12,"ngx-date-time",14),i.Zb("ngModelChange",function(e){return i.vc(n),i.dc().curDate2=e})("change",function(e){return i.vc(n),i.dc().dateChanged(e)}),i.Ic(13,"\n      "),i.Rb(),i.Ic(14,"\n    "),i.Rb(),i.Ic(15,"\n  ")}if(2&n){const n=e.context,t=i.dc();i.zb(1),i.jc("mainTitle",n),i.zb(11),i.jc("label","Date of attack")("ngModel",t.curDate2)}}function u(n,e){if(1&n){const n=i.Tb();i.Ic(0,"\n      "),i.Sb(1,"ngx-toolbar",12),i.Ic(2,"\n      "),i.Rb(),i.Ic(3,"\n      "),i.Sb(4,"section",13),i.Ic(5,"\n        "),i.Sb(6,"h1"),i.Ic(7,"Attack Type: Malware "),i.Rb(),i.Ic(8,"\n        "),i.Sb(9,"button",2),i.Zb("click",function(){i.vc(n);const e=i.dc(),t=i.sc(49);return e.openDrawer(void 0,void 0,!1,t)}),i.Ic(10,"\n          Open Details\n        "),i.Rb(),i.Ic(11,"\n\n        "),i.Sb(12,"ngx-date-time",14),i.Zb("ngModelChange",function(e){return i.vc(n),i.dc().curDate2=e})("change",function(e){return i.vc(n),i.dc().dateChanged(e)}),i.Ic(13,"\n        "),i.Rb(),i.Ic(14,"\n        "),i.Sb(15,"button",2),i.Zb("click",function(){return e.close.emit(!0)}),i.Ic(16,"\n          Close\n        "),i.Rb(),i.Ic(17,"\n      "),i.Rb(),i.Ic(18,"\n    ")}if(2&n){const n=e.context,t=i.dc();i.zb(1),i.jc("mainTitle",n),i.zb(11),i.jc("label","Date of attack")("ngModel",t.curDate2)}}const d=[{path:"",component:(()=>{class n{constructor(n,e){this.drawerMngr=n,this.el=e,this.curDate2=new Date("10/10/2016"),this.DrawerDirection=r.s}dateChanged(n){console.log("date changed!",n)}openDrawer(n=r.s.Left,e,t=!0,c=this.editTmpl,o=!0){this.drawerMngr.create({direction:n,template:c,size:e,context:"Alert Everyone!",closeOnOutsideClick:t,parentContainer:o?void 0:this.el.nativeElement,isRoot:o})}}return n.\u0275fac=function(e){return new(e||n)(i.Mb(r.u),i.Mb(i.l))},n.\u0275cmp=i.Gb({type:n,selectors:[["app-drawer-page"]],viewQuery:function(n,e){if(1&n&&i.Ac(s,!0),2&n){let n;i.rc(n=i.ac())&&(e.editTmpl=n.first)}},decls:115,vars:3,consts:[[1,"style-header"],[1,"shadow",3,"sectionTitle"],["type","button",1,"btn",3,"click"],["editTmpl",""],["label","Markup"],["label","TypeScript"],["language","js"],["editTmpl2",""],["sectionTitle","Adding drawer to parent component instead of root",1,"shadow"],[3,"template"],["label","Styles"],["language","css"],[3,"mainTitle"],[1,"section"],["name","calendar-input1",3,"label","ngModel","ngModelChange","change"]],template:function(n,e){if(1&n){const n=i.Tb();i.Sb(0,"h3",0),i.Ic(1,"Drawer"),i.Rb(),i.Ic(2,"\n\n"),i.Sb(3,"ngx-section",1),i.Ic(4,"\n  "),i.Sb(5,"button",2),i.Zb("click",function(){return e.openDrawer(e.DrawerDirection.Left,70)}),i.Ic(6,"\n    Open Left Drawer\n  "),i.Rb(),i.Ic(7,"\n\n  "),i.Sb(8,"button",2),i.Zb("click",function(){return e.openDrawer(e.DrawerDirection.Bottom)}),i.Ic(9,"\n    Open Bottom Drawer\n  "),i.Rb(),i.Ic(10,"\n\n  "),i.Gc(11,p,16,3,"ng-template",null,3,i.Hc),i.Ic(13,"\n\n  "),i.Nb(14,"br"),i.Ic(15,"\n  "),i.Nb(16,"br"),i.Ic(17,"\n  "),i.Nb(18,"br"),i.Ic(19,"\n  "),i.Sb(20,"ngx-tabs"),i.Ic(21,"\n    "),i.Sb(22,"ngx-tab",4),i.Ic(23,"\n      "),i.Sb(24,"app-prism"),i.Ic(25,"\n"),i.Ic(26,'<button\n  type="button"\n  (click)="openDrawer(\'bottom\')">\n  Open Bottom Drawer\n</button>\n\n<ng-template #editTmpl>\n  <ngx-toolbar\n    [mainTitle]="\'Attack Alert!\'">\n  </ngx-toolbar>\n  <section class="section">\n    <h1>Attack Type: Malware</h1>\n    <button\n      type="button"\n      class="btn"\n      (click)="openDrawer()">\n      Open Details\n    </button>\n  </section>\n</ng-template>'),i.Ic(27,"\n      "),i.Rb(),i.Ic(28,"\n    "),i.Rb(),i.Ic(29,"\n    "),i.Sb(30,"ngx-tab",5),i.Ic(31,"\n      "),i.Sb(32,"app-prism",6),i.Ic(33,"\n"),i.Ic(34,"@Component({ selector: 'app' })\nclass MyComponent {\n  @ViewChild('editTmpl', { static: false }) editTmpl: TemplateRef<any>;\n\n  constructor(private drawerMngr: DrawerService) { }\n\n  openDrawer(direction = 'left', size?, closeOnOutsideClick = true, template = this.editTmpl, isRoot = true, parentContainer?: any) {\n    this.drawerMngr.create({\n      direction,\n      template,\n      size,\n      context: 'Alert Everyone!',\n      closeOnOutsideClick,\n      parentContainer,\n      isRoot\n    });\n  }\n}"),i.Ic(35,"\n      "),i.Rb(),i.Ic(36,"\n    "),i.Rb(),i.Ic(37,"\n  "),i.Rb(),i.Ic(38,"\n"),i.Rb(),i.Ic(39,"\n\n"),i.Sb(40,"ngx-section",1),i.Ic(41,"\n    "),i.Sb(42,"button",2),i.Zb("click",function(){i.vc(n);const t=i.sc(49);return e.openDrawer(e.DrawerDirection.Left,70,!1,t)}),i.Ic(43,"\n      Open Left Drawer\n    "),i.Rb(),i.Ic(44,"\n\n    "),i.Sb(45,"button",2),i.Zb("click",function(){i.vc(n);const t=i.sc(49);return e.openDrawer(e.DrawerDirection.Bottom,void 0,!1,t)}),i.Ic(46,"\n      Open Bottom Drawer\n    "),i.Rb(),i.Ic(47,"\n\n    "),i.Gc(48,u,19,3,"ng-template",null,7,i.Hc),i.Ic(50,"\n\n    "),i.Nb(51,"br"),i.Ic(52,"\n    "),i.Nb(53,"br"),i.Ic(54,"\n    "),i.Nb(55,"br"),i.Ic(56,"\n    "),i.Sb(57,"ngx-tabs"),i.Ic(58,"\n      "),i.Sb(59,"ngx-tab",4),i.Ic(60,"\n        "),i.Sb(61,"app-prism"),i.Ic(62,"\n"),i.Ic(63,'<button\n  type="button"\n  (click)="openDrawer(\'bottom\', undefined, false, editTmpl2)">\n  Open Bottom Drawer\n</button>\n\n<ng-template #editTmpl2 let-context="context" let-close="close">\n  <ngx-toolbar\n    [mainTitle]="\'Attack Alert!\'">\n  </ngx-toolbar>\n  <section class="section">\n    <h1>Attack Type: Malware</h1>\n    <button\n      type="button"\n      class="btn"\n      (click)="openDrawer(undefined, undefined, false, editTmpl2)">\n      Open Details\n    </button>\n    <button type="button" class="btn" (click)="close.emit(true)">\n      Close\n    </button>\n  </section>\n</ng-template>'),i.Ic(64,"\n        "),i.Rb(),i.Ic(65,"\n      "),i.Rb(),i.Ic(66,"\n      "),i.Sb(67,"ngx-tab",5),i.Ic(68,"\n        "),i.Sb(69,"app-prism",6),i.Ic(70,"\n"),i.Ic(71,"@Component({ selector: 'app' })\nclass MyComponent {\n  @ViewChild('editTmpl', { static: false }) editTmpl: TemplateRef<any>;\n\n  constructor(private drawerMngr: DrawerService) { }\n\n  openDrawer(direction = 'left', size?, closeOnOutsideClick = true, template = this.editTmpl, isRoot = true, parentContainer?: any) {\n    this.drawerMngr.create({\n      direction,\n      template,\n      size,\n      context: 'Alert Everyone!',\n      closeOnOutsideClick,\n      parentContainer,\n      isRoot\n    });\n  }\n}"),i.Ic(72,"\n        "),i.Rb(),i.Ic(73,"\n      "),i.Rb(),i.Ic(74,"\n    "),i.Rb(),i.Ic(75,"\n  "),i.Rb(),i.Ic(76,"\n\n  "),i.Sb(77,"ngx-section",8),i.Ic(78,"\n    "),i.Nb(79,"app-drawer-container-example",9),i.Ic(80,"\n\n    "),i.Nb(81,"br"),i.Ic(82,"\n    "),i.Nb(83,"br"),i.Ic(84,"\n    "),i.Nb(85,"br"),i.Ic(86,"\n    "),i.Sb(87,"ngx-tabs"),i.Ic(88,"\n      "),i.Sb(89,"ngx-tab",4),i.Ic(90,"\n        "),i.Sb(91,"app-prism"),i.Ic(92,"\n"),i.Ic(93,'<button type="button" class="btn" (click)="open(DrawerDirection.Left)">Open Left</button>\n<button type="button" class="btn" (click)="open(DrawerDirection.Bottom)">Open Bottom</button>'),i.Ic(94,"\n        "),i.Rb(),i.Ic(95,"\n      "),i.Rb(),i.Ic(96,"\n      "),i.Sb(97,"ngx-tab",5),i.Ic(98,"\n        "),i.Sb(99,"app-prism",6),i.Ic(100,"\n"),i.Ic(101,"import { Component, ChangeDetectionStrategy, ElementRef, Input, TemplateRef } from '@angular/core';\nimport { DrawerService, DrawerDirection } from '@swimlane/ngx-ui';\n\n@Component({\n  selector: 'app-drawer-container-example',\n  templateUrl: './drawer-container-example.component.html',\n  styleUrls: ['./drawer-container-example.component.scss'],\n  changeDetection: ChangeDetectionStrategy.OnPush\n})\nexport class DrawerContainerExampleComponent {\n  @Input() template: TemplateRef<any>;\n\n  readonly DrawerDirection = DrawerDirection;\n\n  constructor(\n    private readonly drawerService: DrawerService,\n    private readonly el: ElementRef<HTMLElement>\n  ) { }\n\n  open(direction: DrawerDirection) {\n    this.drawerService.create({\n      direction,\n      template: this.template,\n      context: 'Alert Everyone!',\n      closeOnOutsideClick: true,\n      parentContainer: this.el.nativeElement,\n      isRoot: false\n    });\n  }\n}"),i.Ic(102,"\n        "),i.Rb(),i.Ic(103,"\n      "),i.Rb(),i.Ic(104,"\n      "),i.Sb(105,"ngx-tab",10),i.Ic(106,"\n        "),i.Sb(107,"app-prism",11),i.Ic(108,"\n"),i.Ic(109,":host {\n  display: block;\n  position: relative;\n  background-color: #272936;\n  height: 500px;\n  overflow: hidden;\n}"),i.Ic(110,"\n        "),i.Rb(),i.Ic(111,"\n      "),i.Rb(),i.Ic(112,"\n    "),i.Rb(),i.Ic(113,"\n  "),i.Rb(),i.Ic(114,"\n")}if(2&n){const n=i.sc(49);i.zb(3),i.jc("sectionTitle","Default"),i.zb(37),i.jc("sectionTitle","Disabling close on outside click"),i.zb(39),i.jc("template",n)}},directives:[r.yb,r.Sb,r.Rb,l.a,b],styles:["[_nghost-%COMP%]{display:block;position:relative}[_nghost-%COMP%]   .drawer-page--parent-container[_ngcontent-%COMP%]{width:100%;height:500px;background-color:#272936}[_nghost-%COMP%]   .drawer-page--parent-container[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{height:100%}"],changeDetection:0}),n})()}];let I=(()=>{class n{}return n.\u0275mod=i.Kb({type:n}),n.\u0275inj=i.Jb({factory:function(e){return new(e||n)},imports:[[a.g.forChild(d)],a.g]}),n})(),m=(()=>{class n{}return n.\u0275mod=i.Kb({type:n}),n.\u0275inj=i.Jb({factory:function(e){return new(e||n)},imports:[[c.c,o.a,r.Ab,r.t,r.Tb,I]]}),n})()}}]);