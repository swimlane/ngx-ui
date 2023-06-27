!function(){"use strict";function n(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function t(n,t){for(var e=0;e<t.length;e++){var u=t[e];u.enumerable=u.enumerable||!1,u.configurable=!0,"value"in u&&(u.writable=!0),Object.defineProperty(n,u.key,u)}}function e(n,e,u){return e&&t(n.prototype,e),u&&t(n,u),Object.defineProperty(n,"prototype",{writable:!1}),n}(self.webpackChunkngx_ui=self.webpackChunkngx_ui||[]).push([[3344],{53344:function(t,u,o){o.r(u),o.d(u,{ButtonTogglePageModule:function(){return T}});var g=o(38583),l=o(39813),a=o(44579),s=o(37716),r=o(88035),i=o(55197);function _(n,t){if(1&n&&(s.TgZ(0,"ngx-button-toggle",20),s._uU(1),s.qZA()),2&n){var e=t.$implicit;s.Q6J("value",e),s.xp6(1),s.hij("\n          ",e,"\n        ")}}function U(n,t){if(1&n&&(s.TgZ(0,"ngx-button-toggle",20),s._uU(1),s.qZA()),2&n){var e=t.$implicit;s.Q6J("value",e),s.xp6(1),s.hij("\n          ",e,"\n        ")}}function Z(n,t){if(1&n&&(s.TgZ(0,"ngx-button-toggle",20),s._uU(1),s.qZA()),2&n){var e=t.$implicit;s.Q6J("value",e),s.xp6(1),s.hij("\n            ",e,"\n          ")}}var p,c=[{path:"",component:(p=function(){function t(){n(this,t),this.seasons=["Winter","Spring","Summer","Autumn"],this.favoriteSeason=this.seasons[1],this.disabled=!1,this.form=new a.cw({season:new a.NI(this.seasons[1])}),this.groupDisabled=!0}return e(t,[{key:"addSeason",value:function(){this.seasons.push("Holiday")}},{key:"scrollTo",value:function(n){var t;null===(t=document.getElementById(n))||void 0===t||t.scrollIntoView({behavior:"smooth"})}}]),t}(),p.\u0275fac=function(n){return new(n||p)},p.\u0275cmp=s.Xpm({type:p,selectors:[["app-button-toggle-page"]],decls:197,vars:14,consts:[[1,"style-header"],["label","Examples"],["sectionTitle","Button Toggle"],["label","Process",3,"ngModel"],["value","sequential"],["value","parallel"],[3,"ngModel","ngModelChange"],[3,"value",4,"ngFor","ngForOf"],[1,"example-selected-value"],[3,"disabled"],["type","button",1,"btn",3,"click"],["sectionTitle","Button Toggle with Forms"],[3,"formGroup"],["formControlName","season"],["label","API"],[1,"documentation-content",3,"click"],["id","inputs",1,"style-header"],[1,"table","documentation-table"],[1,"component-type"],["id","outputs",1,"style-header"],[3,"value"]],template:function(n,t){1&n&&(s.TgZ(0,"h3",0),s._uU(1,"Button Toggle"),s.qZA(),s._uU(2,"\n\n"),s.TgZ(3,"ngx-tabs"),s._uU(4,"\n  "),s.TgZ(5,"ngx-tab",1),s._uU(6,"\n    "),s.TgZ(7,"ngx-section",2),s._uU(8,"\n      "),s.TgZ(9,"ngx-button-toggle-group",3),s._uU(10,"\n        "),s.TgZ(11,"ngx-button-toggle",4),s._uU(12," Sequential "),s.qZA(),s._uU(13,"\n        "),s.TgZ(14,"ngx-button-toggle",5),s._uU(15," Parallel "),s.qZA(),s._uU(16,"\n      "),s.qZA(),s._uU(17,"\n\n      "),s.TgZ(18,"app-prism"),s._uU(19,"\n        "),s._uU(20,'<ngx-button-toggle-group [ngModel]="\'sequential\'" label="Process"> <ngx-button-toggle\n        value="sequential"> Sequential </ngx-button-toggle> <ngx-button-toggle value="parallel"> Parallel\n        </ngx-button-toggle> </ngx-button-toggle-group>'),s._uU(21,"\n      "),s.qZA(),s._uU(22,"\n\n      "),s._UZ(23,"br"),s._uU(24,"\n\n      "),s.TgZ(25,"ngx-button-toggle-group",6),s.NdJ("ngModelChange",function(n){return t.favoriteSeason=n}),s._uU(26,"\n        "),s.YNc(27,_,2,2,"ngx-button-toggle",7),s._uU(28,"\n      "),s.qZA(),s._uU(29,"\n      "),s.TgZ(30,"div",8),s._uU(31),s.qZA(),s._uU(32,"\n\n      "),s.TgZ(33,"app-prism"),s._uU(34,"\n        "),s._uU(35),s._uU(36,"\n      "),s.qZA(),s._uU(37,"\n\n      "),s._UZ(38,"br"),s._uU(39,"\n      "),s.TgZ(40,"h3"),s._uU(41,"Disabled Group"),s.qZA(),s._uU(42,"\n      "),s.TgZ(43,"ngx-button-toggle-group",9),s._uU(44,"\n        "),s.YNc(45,U,2,2,"ngx-button-toggle",7),s._uU(46,"\n      "),s.qZA(),s._uU(47,"\n      "),s.TgZ(48,"ngx-button",10),s.NdJ("click",function(){return t.groupDisabled=!t.groupDisabled}),s._uU(49),s.qZA(),s._uU(50,"\n\n      "),s.TgZ(51,"app-prism"),s._uU(52,"\n        "),s._uU(53),s._uU(54,"\n      "),s.qZA(),s._uU(55,"\n    "),s.qZA(),s._uU(56,"\n\n    "),s.TgZ(57,"ngx-section",11),s._uU(58,"\n      "),s.TgZ(59,"form",12),s._uU(60,"\n        "),s.TgZ(61,"ngx-button-toggle-group",13),s._uU(62,"\n          "),s.YNc(63,Z,2,2,"ngx-button-toggle",7),s._uU(64,"\n        "),s.qZA(),s._uU(65,"\n      "),s.qZA(),s._uU(66,"\n\n      "),s.TgZ(67,"div",8),s._uU(68),s.ALo(69,"json"),s.qZA(),s._uU(70,"\n\n      "),s.TgZ(71,"app-prism"),s._uU(72,"\n        "),s._uU(73,'<form [formGroup]="form"> <ngx-button-toggle-group formControlName="season"> <ngx-button-toggle\n        *ngFor="let season of seasons" [value]="season"> { season }} </ngx-button-toggle> </ngx-button-toggle-group>\n        </form>'),s._uU(74,"\n      "),s.qZA(),s._uU(75,"\n    "),s.qZA(),s._uU(76,"\n  "),s.qZA(),s._uU(77,"\n  "),s.TgZ(78,"ngx-tab",14),s._uU(79,"\n    "),s.TgZ(80,"h3"),s._uU(81,"Table of Contents"),s.qZA(),s._uU(82,"\n    "),s.TgZ(83,"a",15),s.NdJ("click",function(){return t.scrollTo("inputs")}),s._uU(84,"Component Inputs"),s.qZA(),s._uU(85,"\n    "),s.TgZ(86,"a",15),s.NdJ("click",function(){return t.scrollTo("outputs")}),s._uU(87,"Component Outputs"),s.qZA(),s._uU(88,"\n    "),s._UZ(89,"hr"),s._uU(90,"\n\n    "),s.TgZ(91,"h3",16),s._uU(92,"Component Inputs"),s.qZA(),s._uU(93,"\n    "),s.TgZ(94,"table",17),s._uU(95,"\n      "),s.TgZ(96,"thead"),s._uU(97,"\n        "),s.TgZ(98,"tr"),s._uU(99,"\n          "),s.TgZ(100,"th"),s._uU(101,"Name"),s.qZA(),s._uU(102,"\n          "),s.TgZ(103,"th"),s._uU(104,"Description"),s.qZA(),s._uU(105,"\n        "),s.qZA(),s._uU(106,"\n      "),s.qZA(),s._uU(107,"\n      "),s.TgZ(108,"tbody"),s._uU(109,"\n        "),s.TgZ(110,"tr"),s._uU(111,"\n          "),s.TgZ(112,"th"),s._uU(113,"\n            "),s.TgZ(114,"code",18),s._uU(115,"@Input()"),s.qZA(),s._uU(116,"\n            "),s.TgZ(117,"code"),s._uU(118,"value: any"),s.qZA(),s._uU(119,"\n          "),s.qZA(),s._uU(120,"\n          "),s.TgZ(121,"td"),s._uU(122,"Selects the toggle button which matches the value"),s.qZA(),s._uU(123,"\n        "),s.qZA(),s._uU(124,"\n        "),s.TgZ(125,"tr"),s._uU(126,"\n          "),s.TgZ(127,"th"),s._uU(128,"\n            "),s.TgZ(129,"code",18),s._uU(130,"@Input()"),s.qZA(),s._uU(131,"\n            "),s.TgZ(132,"code"),s._uU(133,"disabled: boolean"),s.qZA(),s._uU(134,"\n          "),s.qZA(),s._uU(135,"\n          "),s.TgZ(136,"td"),s._uU(137,"Whether the component is disabled."),s.qZA(),s._uU(138,"\n        "),s.qZA(),s._uU(139,"\n        "),s.TgZ(140,"tr"),s._uU(141,"\n          "),s.TgZ(142,"th"),s._uU(143,"\n            "),s.TgZ(144,"code",18),s._uU(145,"@Input()"),s.qZA(),s._uU(146,"\n            "),s.TgZ(147,"code"),s._uU(148,"id: string = 'ngx-button-toggle-1'"),s.qZA(),s._uU(149,"\n          "),s.qZA(),s._uU(150,"\n          "),s.TgZ(151,"td"),s._uU(152,"The ID for the component."),s.qZA(),s._uU(153,"\n        "),s.qZA(),s._uU(154,"\n      "),s.qZA(),s._uU(155,"\n    "),s.qZA(),s._uU(156,"\n    "),s._UZ(157,"hr"),s._uU(158,"\n    "),s.TgZ(159,"h3",19),s._uU(160,"Component Outputs"),s.qZA(),s._uU(161,"\n    "),s.TgZ(162,"table",17),s._uU(163,"\n      "),s.TgZ(164,"thead"),s._uU(165,"\n        "),s.TgZ(166,"tr"),s._uU(167,"\n          "),s.TgZ(168,"th"),s._uU(169,"Name"),s.qZA(),s._uU(170,"\n          "),s.TgZ(171,"th"),s._uU(172,"Description"),s.qZA(),s._uU(173,"\n        "),s.qZA(),s._uU(174,"\n      "),s.qZA(),s._uU(175,"\n      "),s.TgZ(176,"tbody"),s._uU(177,"\n        "),s.TgZ(178,"tr"),s._uU(179,"\n          "),s.TgZ(180,"th"),s._uU(181,"\n            "),s.TgZ(182,"code",18),s._uU(183,"@Output()"),s.qZA(),s._uU(184,"\n            "),s.TgZ(185,"code"),s._uU(186,"valueChange: EventEmitter<any>"),s.qZA(),s._uU(187,"\n          "),s.qZA(),s._uU(188,"\n          "),s.TgZ(189,"td"),s._uU(190,"Event emitted when the toggle button is clicked."),s.qZA(),s._uU(191,"\n        "),s.qZA(),s._uU(192,"\n      "),s.qZA(),s._uU(193,"\n    "),s.qZA(),s._uU(194,"\n  "),s.qZA(),s._uU(195,"\n"),s.qZA(),s._uU(196,"\n")),2&n&&(s.xp6(9),s.Q6J("ngModel","sequential"),s.xp6(16),s.Q6J("ngModel",t.favoriteSeason),s.xp6(2),s.Q6J("ngForOf",t.seasons),s.xp6(4),s.hij("Your favorite season is: ",t.favoriteSeason,""),s.xp6(4),s.hij('<ngx-button-toggle-group [(ngModel)]="favoriteSeason"> <ngx-button-toggle *ngFor="let season of\n        seasons" [value]="season">\n        ',t.season,"\n        </ngx-button-toggle> </ngx-button-toggle-group>"),s.xp6(8),s.Q6J("disabled",t.groupDisabled),s.xp6(2),s.Q6J("ngForOf",t.seasons),s.xp6(4),s.Oqu(t.groupDisabled?"Disabled":"Enabled"),s.xp6(4),s.hij('<ngx-button-toggle-group [disabled]="true"> <ngx-button-toggle *ngFor="let season of seasons; index as\n        i" [value]="season">\n        ',t.season,"\n        </ngx-button-toggle> </ngx-button-toggle-group>"),s.xp6(6),s.Q6J("formGroup",t.form),s.xp6(4),s.Q6J("ngForOf",t.seasons),s.xp6(5),s.Oqu(s.lcZ(69,12,t.form.value)))},directives:[r.n4f,r.idV,r.e0w,r.qaY,a.JJ,a.On,r.QRq,i.U,g.sg,r.r0F,a._Y,a.JL,a.sg,a.u],pipes:[g.Ts],styles:[".example-selected-value[_ngcontent-%COMP%]{margin-top:.5rem}"]}),p)}],d=function(){var t=e(function t(){n(this,t)});return t.\u0275fac=function(n){return new(n||t)},t.\u0275mod=s.oAB({type:t}),t.\u0275inj=s.cJS({imports:[[l.Bz.forChild(c)],l.Bz]}),t}(),b=o(29421),T=function(){var t=e(function t(){n(this,t)});return t.\u0275fac=function(n){return new(n||t)},t.\u0275mod=s.oAB({type:t}),t.\u0275inj=s.cJS({imports:[[g.ez,b.F,r.HNi,a.u5,a.UX,r.hJ1,r.P4_,r.Xhi,d]]}),t}()}}])}();