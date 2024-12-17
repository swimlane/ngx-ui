"use strict";(self.webpackChunkngx_ui=self.webpackChunkngx_ui||[]).push([[952],{70952:(j,a,e)=>{e.r(a),e.d(a,{ToolbarPageModule:()=>d});var c=e(54460),F=e(84053),r=e(70077),E=e(61888),n=e(48891),m=e(2410);const u=[{path:"",component:(()=>{class t{constructor(){this.toolbarMenu=[{label:"File",click:()=>{console.log("File clicked")}},{label:"Run",disabled:!0},{label:"Edit",dropdown:!0,click:()=>{console.log("Edit clicked")}}]}menuClicked(s){console.log("Menu clicked",s)}scrollTo(s){document.getElementById(s)?.scrollIntoView({behavior:"smooth"})}static#n=this.\u0275fac=function(o){return new(o||t)};static#t=this.\u0275cmp=n.VBU({type:t,selectors:[["app-toolbar-page"]],decls:165,vars:3,consts:[[1,"style-header"],["label","Examples"],["sectionTitle","Title/Menu",1,"shadow"],[3,"menuClick","mainTitle","subtitle","menu"],["sectionTitle","Dynamic Content",1,"shadow"],[1,"tag"],["label","API"],[1,"documentation-content",3,"click"],["id","inputs",1,"style-header"],[1,"table","documentation-table"],[1,"component-type"],["id","outputs",1,"style-header"]],template:function(o,l){1&o&&(n.j41(0,"h3",0),n.EFF(1,"Toolbar"),n.k0s(),n.EFF(2,"\n\n"),n.j41(3,"ngx-tabs"),n.EFF(4,"\n  "),n.j41(5,"ngx-tab",1),n.EFF(6,"\n    "),n.j41(7,"ngx-section",2),n.EFF(8,"\n      "),n.j41(9,"ngx-toolbar",3),n.bIt("menuClick",function(p){return l.menuClicked(p)}),n.EFF(10,"\n      "),n.k0s(),n.EFF(11,"\n      "),n.nrm(12,"br"),n.EFF(13,"\n      "),n.j41(14,"app-prism"),n.EFF(15,"\n    "),n.EFF(16,'<ngx-toolbar\n      [mainTitle]="\'Record\'"\n      [subtitle]="\'IR-344\'"\n      [menu]="toolbarMenu"\n      (menuClick)="menuClicked($event)">\n    </ngx-toolbar>'),n.EFF(17,"\n      "),n.k0s(),n.EFF(18,"\n    "),n.k0s(),n.EFF(19,"\n    \n    "),n.j41(20,"ngx-section",4),n.EFF(21,"\n      "),n.j41(22,"ngx-toolbar"),n.EFF(23,"\n        "),n.j41(24,"ngx-toolbar-title"),n.EFF(25,"\n          "),n.j41(26,"span",5),n.EFF(27,"dynamic title"),n.k0s(),n.EFF(28,"\n        "),n.k0s(),n.EFF(29,"\n        "),n.j41(30,"ngx-toolbar-content"),n.EFF(31,"\n          "),n.j41(32,"i"),n.EFF(33,"dynamic content"),n.k0s(),n.EFF(34,"\n        "),n.k0s(),n.EFF(35,"\n      "),n.k0s(),n.EFF(36,"\n      "),n.nrm(37,"br"),n.EFF(38,"\n      "),n.j41(39,"app-prism"),n.EFF(40,"\n    "),n.EFF(41,'<ngx-toolbar>\n      <ngx-toolbar-title>\n        <span class="tag">dynamic title</span>\n      </ngx-toolbar-title>\n      <ngx-toolbar-content>\n        <i>dynamic content</i>\n      </ngx-toolbar-content>\n    </ngx-toolbar>'),n.EFF(42,"\n      "),n.k0s(),n.EFF(43,"\n    "),n.k0s(),n.EFF(44,"\n  "),n.k0s(),n.EFF(45,"\n  "),n.j41(46,"ngx-tab",6),n.EFF(47,"\n    "),n.j41(48,"h3"),n.EFF(49,"Table of Contents"),n.k0s(),n.EFF(50,"\n    "),n.j41(51,"a",7),n.bIt("click",function(){return l.scrollTo("inputs")}),n.EFF(52,"Component Inputs"),n.k0s(),n.EFF(53,"\n    "),n.j41(54,"a",7),n.bIt("click",function(){return l.scrollTo("outputs")}),n.EFF(55,"Component Outputs"),n.k0s(),n.EFF(56,"\n    "),n.nrm(57,"hr"),n.EFF(58,"\n\n    "),n.j41(59,"h3",8),n.EFF(60,"Component Inputs"),n.k0s(),n.EFF(61,"\n    "),n.j41(62,"table",9),n.EFF(63,"\n      "),n.j41(64,"thead"),n.EFF(65,"\n        "),n.j41(66,"tr"),n.EFF(67,"\n          "),n.j41(68,"th"),n.EFF(69,"Name"),n.k0s(),n.EFF(70,"\n          "),n.j41(71,"th"),n.EFF(72,"Description"),n.k0s(),n.EFF(73,"\n        "),n.k0s(),n.EFF(74,"\n      "),n.k0s(),n.EFF(75,"\n      "),n.j41(76,"tbody"),n.EFF(77,"\n        "),n.j41(78,"tr"),n.EFF(79,"\n          "),n.j41(80,"th"),n.EFF(81,"\n            "),n.j41(82,"code",10),n.EFF(83,"@Input()"),n.k0s(),n.EFF(84,"\n            "),n.j41(85,"code"),n.EFF(86,"mainTitle: string"),n.k0s(),n.EFF(87,"\n          "),n.k0s(),n.EFF(88,"\n          "),n.j41(89,"td"),n.EFF(90,"The primary title for the component. See Examples tab."),n.k0s(),n.EFF(91,"\n        "),n.k0s(),n.EFF(92,"\n        "),n.j41(93,"tr"),n.EFF(94,"\n          "),n.j41(95,"th"),n.EFF(96,"\n            "),n.j41(97,"code",10),n.EFF(98,"@Input()"),n.k0s(),n.EFF(99,"\n            "),n.j41(100,"code"),n.EFF(101,"menu: ToolbarMenuItem = []"),n.k0s(),n.EFF(102,"\n          "),n.k0s(),n.EFF(103,"\n          "),n.j41(104,"td"),n.EFF(105,"The menu for the component. See Examples tab."),n.k0s(),n.EFF(106,"\n        "),n.k0s(),n.EFF(107,"\n        "),n.j41(108,"tr"),n.EFF(109,"\n          "),n.j41(110,"th"),n.EFF(111,"\n            "),n.j41(112,"code",10),n.EFF(113,"@Input()"),n.k0s(),n.EFF(114,"\n            "),n.j41(115,"code"),n.EFF(116,"subtitle: string"),n.k0s(),n.EFF(117,"\n          "),n.k0s(),n.EFF(118,"\n          "),n.j41(119,"td"),n.EFF(120,"The secondary title for the component. See Examples tab."),n.k0s(),n.EFF(121,"\n        "),n.k0s(),n.EFF(122,"\n      "),n.k0s(),n.EFF(123,"\n    "),n.k0s(),n.EFF(124,"\n    "),n.nrm(125,"hr"),n.EFF(126,"\n    "),n.j41(127,"h3",11),n.EFF(128,"Component Outputs"),n.k0s(),n.EFF(129,"\n    "),n.j41(130,"table",9),n.EFF(131,"\n      "),n.j41(132,"thead"),n.EFF(133,"\n        "),n.j41(134,"tr"),n.EFF(135,"\n          "),n.j41(136,"th"),n.EFF(137,"Name"),n.k0s(),n.EFF(138,"\n          "),n.j41(139,"th"),n.EFF(140,"Description"),n.k0s(),n.EFF(141,"\n        "),n.k0s(),n.EFF(142,"\n      "),n.k0s(),n.EFF(143,"\n      "),n.j41(144,"tbody"),n.EFF(145,"\n        "),n.j41(146,"tr"),n.EFF(147,"\n          "),n.j41(148,"th"),n.EFF(149,"\n            "),n.j41(150,"code",10),n.EFF(151,"@Output()"),n.k0s(),n.EFF(152,"\n            "),n.j41(153,"code"),n.EFF(154,"menuClick: EventEmitter<any>"),n.k0s(),n.EFF(155,"\n          "),n.k0s(),n.EFF(156,"\n          "),n.j41(157,"td"),n.EFF(158,"Event emitted when the component menu is clicked."),n.k0s(),n.EFF(159,"\n        "),n.k0s(),n.EFF(160,"\n      "),n.k0s(),n.EFF(161,"\n    "),n.k0s(),n.EFF(162,"\n  "),n.k0s(),n.EFF(163,"\n"),n.k0s(),n.EFF(164,"\n")),2&o&&(n.R7$(9),n.Y8G("mainTitle","Record")("subtitle","IR-344")("menu",l.toolbarMenu))},dependencies:[m.r,F.nEw,F.H_6,F.RDw,F.kIe,F.jeq,F.OW7],encapsulation:2,changeDetection:0})}return t})()}];let k=(()=>{class t{static#n=this.\u0275fac=function(o){return new(o||t)};static#t=this.\u0275mod=n.$C({type:t});static#F=this.\u0275inj=n.G2t({imports:[E.iI.forChild(u),E.iI]})}return t})(),d=(()=>{class t{static#n=this.\u0275fac=function(o){return new(o||t)};static#t=this.\u0275mod=n.$C({type:t});static#F=this.\u0275inj=n.G2t({imports:[c.MD,r.Q,F.sVo,F.mEZ,k,F.jr_]})}return t})()}}]);