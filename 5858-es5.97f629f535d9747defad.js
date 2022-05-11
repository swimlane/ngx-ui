!function(){"use strict";function n(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}function e(n,e){for(var t=0;t<e.length;t++){var u=e[t];u.enumerable=u.enumerable||!1,u.configurable=!0,"value"in u&&(u.writable=!0),Object.defineProperty(n,u.key,u)}}function t(n,t,u){return t&&e(n.prototype,t),u&&e(n,u),Object.defineProperty(n,"prototype",{writable:!1}),n}(self.webpackChunkngx_ui=self.webpackChunkngx_ui||[]).push([[5858],{5858:function(e,u,o){o.r(u),o.d(u,{PlusMenuPageModule:function(){return Z}});var l,i=o(8583),s=o(5719),c=o(9421),p=o(4330),m=o(3018),a=o(7402),r=function(n,e){return[n,e]},g=function(n,e,t){return[n,e,t]},U=[{path:"",component:(l=function(){function e(){n(this,e),this.upload={title:"Upload a plugin",subtitle:"ctrl+alt+u",icon:"upload-outline-small"},this.uploadCustomColor={title:"Upload a plugin",subtitle:"ctrl+alt+u",icon:"upload-outline-small",color:"#CDD2DD"},this.create={title:"Create",subtitle:"ctrl+alt+n",icon:"add-circle-medium"},this.createCustomColor={title:"Create",subtitle:"ctrl+alt+n",icon:"add-circle-medium",color:"#01E1B9"},this.search={title:"Search",icon:"search"},this.searchCustomColor={title:"Search",subtitle:"ctrl+alt+f",icon:"search",color:"#E200B6"}}return t(e,[{key:"onClick",value:function(n){console.log(n)}}]),e}(),l.\u0275fac=function(n){return new(n||l)},l.\u0275cmp=m.Xpm({type:l,selectors:[["app-plus-menu-page"]],decls:161,vars:54,consts:[[1,"style-header"],["sectionTitle","Plus Menu - Right - Two Items",1,"shadow"],[1,"container-right"],[1,"my-class",3,"items","clickItem"],["sectionTitle","Plus Menu - Right - Three Items",1,"shadow"],["menuColor","#CDD2DD","menuTitle","Install a Plugin",3,"items","clickItem"],["sectionTitle","Plus Menu - Bottom - Two Items",1,"shadow"],[1,"container-bottom"],["position","bottom","menuColor","#01E1B9","menuTitle","Install a Plugin",3,"items","clickItem"],["sectionTitle","Plus Menu - Bottom - Three Items",1,"shadow"],["position","bottom","menuTitle","Install a Plugin",3,"items","clickItem"],["sectionTitle","Plus Menu - Top - Two Items",1,"shadow"],[1,"container-top"],["position","top","menuTitle","Install a Plugin",3,"items","clickItem"],["sectionTitle","Plus Menu - Top - Three Items",1,"shadow"],["sectionTitle","Plus Menu - Right - Two Items Custom Color",1,"shadow"],["sectionTitle","Plus Menu - Right - Three Items Custom Color",1,"shadow"],["menuColor","#01E1B9","menuTitle","Install a Plugin",3,"items","clickItem"],["sectionTitle","Plus Menu - Bottom - Two Items Custom Color",1,"shadow"],["sectionTitle","Plus Menu - Bottom - Three Items Custom Colors",1,"shadow"],["sectionTitle","Plus Menu - Top - Two Items Custom Color",1,"shadow"],["sectionTitle","Plus Menu - Top - Three Items Custom Color",1,"shadow",2,"margin-bottom","300px"]],template:function(n,e){1&n&&(m.TgZ(0,"h3",0),m._uU(1,"Plus Menu"),m.qZA(),m._uU(2,"\n"),m.TgZ(3,"ngx-section",1),m._uU(4,"\n  "),m.TgZ(5,"div",2),m._uU(6,"\n    "),m.TgZ(7,"ngx-plus-menu",3),m.NdJ("clickItem",function(n){return e.onClick(n)}),m.qZA(),m._uU(8,"\n  "),m.qZA(),m._uU(9,"\n  "),m.TgZ(10,"app-prism"),m._uU(11,"\n    "),m._uU(12,'\n    <ngx-plus-menu\n      [items]="[upload, create]"\n      menuTitle="Install a Plugin"\n      (clickItem)="onClick($event)">\n    </ngx-plus-menu> '),m._uU(13,"\n  "),m.qZA(),m._uU(14,"\n"),m.qZA(),m._uU(15,"\n\n"),m.TgZ(16,"ngx-section",4),m._uU(17,"\n  "),m.TgZ(18,"div",2),m._uU(19,"\n    "),m.TgZ(20,"ngx-plus-menu",5),m.NdJ("clickItem",function(n){return e.onClick(n)}),m.qZA(),m._uU(21,"\n  "),m.qZA(),m._uU(22,"\n  "),m.TgZ(23,"app-prism"),m._uU(24,"\n    "),m._uU(25,'\n    <ngx-plus-menu\n      [items]="[upload, create, search]"\n      menuColor="#CDD2DD"\n      menuTitle="Install a Plugin"\n      (clickItem)="onClick($event)">\n    </ngx-plus-menu> '),m._uU(26,"\n  "),m.qZA(),m._uU(27,"\n"),m.qZA(),m._uU(28,"\n\n"),m.TgZ(29,"ngx-section",6),m._uU(30,"\n  "),m.TgZ(31,"div",7),m._uU(32,"\n    "),m.TgZ(33,"ngx-plus-menu",8),m.NdJ("clickItem",function(n){return e.onClick(n)}),m.qZA(),m._uU(34,"\n  "),m.qZA(),m._uU(35,"\n  "),m.TgZ(36,"app-prism"),m._uU(37,"\n    "),m._uU(38,'\n    <ngx-plus-menu\n      [items]="[upload, create]"\n      position="bottom"\n      menuTitle="Install a Plugin"\n      (clickItem)="onClick($event)">\n    </ngx-plus-menu> '),m._uU(39,"\n  "),m.qZA(),m._uU(40,"\n"),m.qZA(),m._uU(41,"\n\n"),m.TgZ(42,"ngx-section",9),m._uU(43,"\n  "),m.TgZ(44,"div",7),m._uU(45,"\n    "),m.TgZ(46,"ngx-plus-menu",10),m.NdJ("clickItem",function(n){return e.onClick(n)}),m.qZA(),m._uU(47,"\n  "),m.qZA(),m._uU(48,"\n  "),m.TgZ(49,"app-prism"),m._uU(50,"\n    "),m._uU(51,'\n    <ngx-plus-menu\n      [items]="[upload, create, search]"\n      position="bottom"\n      menuTitle="Install a Plugin"\n      (clickItem)="onClick($event)">\n    </ngx-plus-menu> '),m._uU(52,"\n  "),m.qZA(),m._uU(53,"\n"),m.qZA(),m._uU(54,"\n\n"),m.TgZ(55,"ngx-section",11),m._uU(56,"\n  "),m.TgZ(57,"div",12),m._uU(58,"\n    "),m.TgZ(59,"ngx-plus-menu",13),m.NdJ("clickItem",function(n){return e.onClick(n)}),m.qZA(),m._uU(60,"\n  "),m.qZA(),m._uU(61,"\n  "),m.TgZ(62,"app-prism"),m._uU(63,"\n    "),m._uU(64,'\n    <ngx-plus-menu\n      [items]="[upload, create]"\n      position="top"\n      menuTitle="Install a Plugin"\n      (clickItem)="onClick($event)">\n    </ngx-plus-menu> '),m._uU(65,"\n  "),m.qZA(),m._uU(66,"\n"),m.qZA(),m._uU(67,"\n\n"),m.TgZ(68,"ngx-section",14),m._uU(69,"\n  "),m.TgZ(70,"div",12),m._uU(71,"\n    "),m.TgZ(72,"ngx-plus-menu",13),m.NdJ("clickItem",function(n){return e.onClick(n)}),m.qZA(),m._uU(73,"\n  "),m.qZA(),m._uU(74,"\n  "),m.TgZ(75,"app-prism"),m._uU(76,"\n    "),m._uU(77,'\n    <ngx-plus-menu\n      [items]="[upload, create, search]"\n      position="top"\n      menuTitle="Install a Plugin"\n      (clickItem)="onClick($event)">\n    </ngx-plus-menu> '),m._uU(78,"\n  "),m.qZA(),m._uU(79,"\n"),m.qZA(),m._uU(80,"\n\n"),m.TgZ(81,"h3"),m._uU(82," Menu Items with Custom Colors "),m.qZA(),m._uU(83,"\n\n"),m.TgZ(84,"ngx-section",15),m._uU(85,"\n  "),m.TgZ(86,"div",2),m._uU(87,"\n    "),m.TgZ(88,"ngx-plus-menu",3),m.NdJ("clickItem",function(n){return e.onClick(n)}),m.qZA(),m._uU(89,"\n  "),m.qZA(),m._uU(90,"\n  "),m.TgZ(91,"app-prism"),m._uU(92,"\n    "),m._uU(93,'\n    <ngx-plus-menu\n      [items]="[upload, createCustomColor]"\n      menuTitle="Install a Plugin"\n      (clickItem)="onClick($event)">\n    </ngx-plus-menu> '),m._uU(94,"\n  "),m.qZA(),m._uU(95,"\n"),m.qZA(),m._uU(96,"\n\n"),m.TgZ(97,"ngx-section",16),m._uU(98,"\n  "),m.TgZ(99,"div",2),m._uU(100,"\n    "),m.TgZ(101,"ngx-plus-menu",17),m.NdJ("clickItem",function(n){return e.onClick(n)}),m.qZA(),m._uU(102,"\n  "),m.qZA(),m._uU(103,"\n  "),m.TgZ(104,"app-prism"),m._uU(105,"\n    "),m._uU(106,'\n    <ngx-plus-menu\n      [items]="[upload, create, searchCustomColor]"\n      menuColor="#01E1B9"\n      menuTitle="Install a Plugin"\n      (clickItem)="onClick($event)">\n    </ngx-plus-menu> '),m._uU(107,"\n  "),m.qZA(),m._uU(108,"\n"),m.qZA(),m._uU(109,"\n\n"),m.TgZ(110,"ngx-section",18),m._uU(111,"\n  "),m.TgZ(112,"div",7),m._uU(113,"\n    "),m.TgZ(114,"ngx-plus-menu",8),m.NdJ("clickItem",function(n){return e.onClick(n)}),m.qZA(),m._uU(115,"\n  "),m.qZA(),m._uU(116,"\n  "),m.TgZ(117,"app-prism"),m._uU(118,"\n    "),m._uU(119,'\n    <ngx-plus-menu\n      [items]="[uploadCustomColor, create]"\n      position="bottom"\n      menuTitle="Install a Plugin"\n      (clickItem)="onClick($event)">\n    </ngx-plus-menu> '),m._uU(120,"\n  "),m.qZA(),m._uU(121,"\n"),m.qZA(),m._uU(122,"\n\n"),m.TgZ(123,"ngx-section",19),m._uU(124,"\n  "),m.TgZ(125,"div",7),m._uU(126,"\n    "),m.TgZ(127,"ngx-plus-menu",10),m.NdJ("clickItem",function(n){return e.onClick(n)}),m.qZA(),m._uU(128,"\n  "),m.qZA(),m._uU(129,"\n  "),m.TgZ(130,"app-prism"),m._uU(131,"\n    "),m._uU(132,'\n    <ngx-plus-menu\n      [items]="[uploadCustomColor, create, searchCustomColor]"\n      position="bottom"\n      menuTitle="Install a Plugin"\n      (clickItem)="onClick($event)">\n    </ngx-plus-menu> '),m._uU(133,"\n  "),m.qZA(),m._uU(134,"\n"),m.qZA(),m._uU(135,"\n\n"),m.TgZ(136,"ngx-section",20),m._uU(137,"\n  "),m.TgZ(138,"div",12),m._uU(139,"\n    "),m.TgZ(140,"ngx-plus-menu",13),m.NdJ("clickItem",function(n){return e.onClick(n)}),m.qZA(),m._uU(141,"\n  "),m.qZA(),m._uU(142,"\n  "),m.TgZ(143,"app-prism"),m._uU(144,"\n    "),m._uU(145,'\n    <ngx-plus-menu\n      [items]="[upload, createCustomColor]"\n      position="top"\n      menuTitle="Install a Plugin"\n      (clickItem)="onClick($event)">\n    </ngx-plus-menu> '),m._uU(146,"\n  "),m.qZA(),m._uU(147,"\n"),m.qZA(),m._uU(148,"\n\n"),m.TgZ(149,"ngx-section",21),m._uU(150,"\n  "),m.TgZ(151,"div",12),m._uU(152,"\n    "),m.TgZ(153,"ngx-plus-menu",13),m.NdJ("clickItem",function(n){return e.onClick(n)}),m.qZA(),m._uU(154,"\n  "),m.qZA(),m._uU(155,"\n  "),m.TgZ(156,"app-prism"),m._uU(157,"\n    "),m._uU(158,'\n    <ngx-plus-menu\n      [items]="[uploadCustomColor, createCustomColor, searchCustomColor]"\n      position="top"\n      menuTitle="Install a Plugin"\n      (clickItem)="onClick($event)">\n    </ngx-plus-menu> '),m._uU(159,"\n  "),m.qZA(),m._uU(160,"\n"),m.qZA()),2&n&&(m.xp6(7),m.Q6J("items",m.WLB(12,r,e.upload,e.create)),m.xp6(13),m.Q6J("items",m.kEZ(15,g,e.upload,e.create,e.search)),m.xp6(13),m.Q6J("items",m.WLB(19,r,e.upload,e.create)),m.xp6(13),m.Q6J("items",m.kEZ(22,g,e.upload,e.create,e.search)),m.xp6(13),m.Q6J("items",m.WLB(26,r,e.upload,e.create)),m.xp6(13),m.Q6J("items",m.kEZ(29,g,e.upload,e.create,e.search)),m.xp6(16),m.Q6J("items",m.WLB(33,r,e.upload,e.createCustomColor)),m.xp6(13),m.Q6J("items",m.kEZ(36,g,e.upload,e.create,e.searchCustomColor)),m.xp6(13),m.Q6J("items",m.WLB(40,r,e.uploadCustomColor,e.create)),m.xp6(13),m.Q6J("items",m.kEZ(43,g,e.uploadCustomColor,e.create,e.searchCustomColor)),m.xp6(13),m.Q6J("items",m.WLB(47,r,e.upload,e.createCustomColor)),m.xp6(13),m.Q6J("items",m.kEZ(50,g,e.uploadCustomColor,e.createCustomColor,e.searchCustomColor)))},directives:[s.e0w,s.e2L,a.U],styles:["app-plus-menu-page .container-right,app-plus-menu-page .container-bottom,app-plus-menu-page .container-top{position:relative}app-plus-menu-page .container-right ngx-plus-menu,app-plus-menu-page .container-bottom ngx-plus-menu,app-plus-menu-page .container-top ngx-plus-menu{position:absolute}app-plus-menu-page app-prism{margin-top:30px;display:block}app-plus-menu-page .container-right ngx-plus-menu{top:-20px;right:0}app-plus-menu-page .container-bottom{display:flex;justify-content:center}app-plus-menu-page .container-bottom ngx-plus-menu{bottom:-10px}app-plus-menu-page .container-top{display:flex;justify-content:center}app-plus-menu-page .container-top ngx-plus-menu{top:-20px}\n"],encapsulation:2,changeDetection:0}),l)}],_=function(){var e=t(function e(){n(this,e)});return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=m.oAB({type:e}),e.\u0275inj=m.cJS({imports:[[p.Bz.forChild(U)],p.Bz]}),e}(),Z=function(){var e=t(function e(){n(this,e)});return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=m.oAB({type:e}),e.\u0275inj=m.cJS({imports:[[i.ez,c.F,s.HNi,s.Q5Q,_]]}),e}()}}])}();