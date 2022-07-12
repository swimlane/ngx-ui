!function(){"use strict";function t(t,o){for(var n=0;n<o.length;n++){var e=o[n];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(t,e.key,e)}}function o(o,n,e){return n&&t(o.prototype,n),e&&t(o,e),Object.defineProperty(o,"prototype",{writable:!1}),o}function n(t,o){if(!(t instanceof o))throw new TypeError("Cannot call a class as a function")}(self.webpackChunkngx_ui=self.webpackChunkngx_ui||[]).push([[4512],{24512:function(t,e,p){p.r(e),p.d(e,{TooltipPageModule:function(){return h}});var i=p(38583),l=p(75141),a=p(29421),u=p(39813),r=p(37716),g=p(55197);function _(t,o){1&t&&(r._uU(0,"\n    "),r.TgZ(1,"strong",25),r._uU(2,"ALERT: High Priority"),r.qZA(),r._uU(3,"\n  "))}function s(t,o){if(1&t&&(r.TgZ(0,"p"),r._uU(1),r.qZA()),2&t){var n=r.oxw().model;r.xp6(1),r.hij("Outside Context ",n.foo,"")}}function c(t,o){if(1&t&&(r._uU(0,"\n    "),r.TgZ(1,"h3"),r._uU(2,"Tool tip custom content defined inside a template"),r.qZA(),r._uU(3,"\n    "),r.TgZ(4,"p"),r._uU(5),r.qZA(),r._uU(6,"\n    "),r.YNc(7,s,2,1,"p",26),r._uU(8,"\n  ")),2&t){var n=o.model,e=r.oxw();r.xp6(5),r.hij("With context binding: ",e.tooltipModel.text,""),r.xp6(2),r.Q6J("ngIf",n)}}var U,T=function(){return{foo:"YAZ"}},Z=[{path:"",component:(U=o(function t(){n(this,t),this.tooltipModel={text:"foo"},this.dynamicVal="Attack at ".concat(new Date),this.aLongString="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ac magna sed velit vestibulum suscipit. Fusce pulvinar ac purus ut commodo. Suspendisse potenti. Sed convallis quam in velit ultrices volutpat. Integer non aliquam sem. Integer eu nibh sit amet diam lacinia dignissim. Quisque semper justo non tellus feugiat fermentum. Nulla eu faucibus augue.",this.aVeryLongString=this.aLongString.replace(/\s/g,"")}),U.\u0275fac=function(t){return new(t||U)},U.\u0275cmp=r.Xpm({type:U,selectors:[["app-tooltip-page"]],decls:205,vars:71,consts:[[1,"style-header"],["sectionTitle","Tooltip",1,"shadow"],["href","#","ngx-tooltip","",3,"tooltipPlacement","tooltipType","tooltipTitle"],[2,"padding","0 15px"],["toolTipTemplate",""],["href","#","ngx-tooltip","",3,"tooltipPlacement","tooltipType","tooltipTemplate"],["href","#","ngx-tooltip","",3,"tooltipPlacement","tooltipType","tooltipCssClass","tooltipTitle"],["sectionTitle","Popover",1,"shadow"],["popoverTemplate",""],["href","#","ngx-tooltip","",3,"tooltipContext","tooltipType","tooltipPlacement","tooltipTemplate"],["href","#","ngx-tooltip","",3,"tooltipType","tooltipPlacement","tooltipTemplate"],["href","#","ngx-tooltip","",3,"tooltipType","tooltipPlacement","tooltipShowEvent","tooltipTemplate"],["href","#","ngx-tooltip","",3,"tooltipType","tooltipPlacement","tooltipShowTimeout","tooltipHideTimeout","tooltipTemplate"],["href","#","ngx-tooltip","",3,"tooltipType","tooltipPlacement","tooltipDisabled","tooltipTemplate"],["href","#","ngx-tooltip","",3,"tooltipType","tooltipPlacement","tooltipShowCaret","tooltipTemplate","onShow","onHide"],["sectionTitle","Appearances",1,"shadow"],[1,"appearance-table",2,"max-width","100%"],["width","10%"],["width","45%"],["type","tooltip","placement","top","title","Phishing",3,"showCaret"],["type","popover","placement","top","title","Phishing",3,"showCaret"],["type","tooltip","placement","top",3,"title","showCaret"],["type","popover","placement","top",3,"title","showCaret"],["cssClass","narrow","type","tooltip","placement","top",3,"title","showCaret"],["cssClass","narrow","type","popover","placement","top",3,"title","showCaret"],[2,"color","red"],[4,"ngIf"]],template:function(t,o){if(1&t&&(r.TgZ(0,"h3",0),r._uU(1,"Tooltip"),r.qZA(),r._uU(2,"\n\n"),r.TgZ(3,"ngx-section",1),r._uU(4,"\n  "),r.TgZ(5,"a",2),r._uU(6,"\n    Top\n  "),r.qZA(),r._uU(7,"\n\n  "),r.TgZ(8,"span",3),r._uU(9,"|"),r.qZA(),r._uU(10,"\n\n  "),r.TgZ(11,"a",2),r._uU(12,"\n    Right\n  "),r.qZA(),r._uU(13,"\n\n  "),r.TgZ(14,"span",3),r._uU(15,"|"),r.qZA(),r._uU(16,"\n\n  "),r.TgZ(17,"a",2),r._uU(18,"\n    Bottom\n  "),r.qZA(),r._uU(19,"\n\n  "),r.TgZ(20,"span",3),r._uU(21,"|"),r.qZA(),r._uU(22,"\n\n  "),r.TgZ(23,"a",2),r._uU(24,"\n    Left\n  "),r.qZA(),r._uU(25,"\n\n  "),r.TgZ(26,"span",3),r._uU(27,"|"),r.qZA(),r._uU(28,"\n\n  "),r.TgZ(29,"a",2),r._uU(30,"\n    Sibling\n  "),r.qZA(),r._uU(31,"\n\n  "),r.TgZ(32,"span",3),r._uU(33,"|"),r.qZA(),r._uU(34,"\n\n  "),r.YNc(35,_,4,0,"ng-template",null,4,r.W1O),r._uU(37,"\n\n  "),r.TgZ(38,"a",5),r._uU(39,"\n    Template\n  "),r.qZA(),r._uU(40,"\n\n  "),r.TgZ(41,"span",3),r._uU(42,"|"),r.qZA(),r._uU(43,"\n\n  "),r.TgZ(44,"a",2),r._uU(45,"\n    Large HTML\n  "),r.qZA(),r._uU(46,"\n\n  "),r.TgZ(47,"span",3),r._uU(48,"|"),r.qZA(),r._uU(49,"\n\n  "),r.TgZ(50,"a",6),r._uU(51,"\n    Custom Class\n  "),r.qZA(),r._uU(52,"\n\n  "),r._UZ(53,"br"),r._uU(54,"\n  "),r._UZ(55,"br"),r._uU(56,"\n\n  "),r.TgZ(57,"app-prism"),r._uU(58,"\n"),r._uU(59,'<a\n  href="#"\n  [tooltipPlacement]="\'top\'"\n  [tooltipType]="\'tooltip\'"\n  ngx-tooltip\n  [tooltipTitle]="\'Phishing Attack\'">\n  Top\n</a>'),r._uU(60,"\n  "),r.qZA(),r._uU(61,"\n\n"),r.qZA(),r._uU(62,"\n\n"),r.TgZ(63,"ngx-section",7),r._uU(64,"\n  "),r.YNc(65,c,9,2,"ng-template",null,8,r.W1O),r._uU(67,"\n\n  "),r.TgZ(68,"a",9),r._uU(69,"\n    Top\n  "),r.qZA(),r._uU(70,"\n\n  "),r.TgZ(71,"span",3),r._uU(72,"|"),r.qZA(),r._uU(73,"\n\n  "),r.TgZ(74,"a",10),r._uU(75,"\n    Right\n  "),r.qZA(),r._uU(76,"\n\n  "),r.TgZ(77,"span",3),r._uU(78,"|"),r.qZA(),r._uU(79,"\n\n  "),r.TgZ(80,"a",10),r._uU(81,"\n    Bottom\n  "),r.qZA(),r._uU(82,"\n\n  "),r.TgZ(83,"span",3),r._uU(84,"|"),r.qZA(),r._uU(85,"\n\n  "),r.TgZ(86,"a",10),r._uU(87,"\n    Left\n  "),r.qZA(),r._uU(88,"\n\n  "),r.TgZ(89,"span",3),r._uU(90,"|"),r.qZA(),r._uU(91,"\n\n  "),r.TgZ(92,"a",11),r._uU(93,"\n    Focus\n  "),r.qZA(),r._uU(94,"\n\n  "),r.TgZ(95,"span",3),r._uU(96,"|"),r.qZA(),r._uU(97,"\n\n  "),r.TgZ(98,"a",12),r._uU(99,"\n    Immediate\n  "),r.qZA(),r._uU(100,"\n\n  "),r.TgZ(101,"span",3),r._uU(102,"|"),r.qZA(),r._uU(103,"\n\n  "),r.TgZ(104,"a",13),r._uU(105,"\n    Disabled\n  "),r.qZA(),r._uU(106,"\n\n  "),r.TgZ(107,"span",3),r._uU(108,"|"),r.qZA(),r._uU(109,"\n\n  "),r.TgZ(110,"a",14),r.NdJ("onShow",function(){return o.shown="Yay!"})("onHide",function(){return o.shown=""}),r._uU(111),r.qZA(),r._uU(112,"\n  "),r._UZ(113,"br"),r._uU(114,"\n  "),r._UZ(115,"br"),r._uU(116,"\n\n  "),r.TgZ(117,"app-prism"),r._uU(118,"\n"),r._uU(119,'<ng-template #popoverTemplate let-model="model">\n  <h3>Tool tip custom content defined inside a template</h3>\n  <p>With context binding: tooltipModel.text</p>\n</ng-template>\n\n<a\n  href="#"\n  ngx-tooltip\n  [tooltipContext]="{ foo: \'YAZ\' }"\n  [tooltipType]="\'popover\'"\n  [tooltipPlacement]="\'top\'"\n  [tooltipTemplate]="popoverTemplate">\n  Top\n</a>'),r._uU(120,"\n  "),r.qZA(),r._uU(121,"\n"),r.qZA(),r._uU(122,"\n\n"),r.TgZ(123,"ngx-section",15),r._uU(124,"\n  "),r.TgZ(125,"table",16),r._uU(126,"\n    "),r.TgZ(127,"tr"),r._uU(128,"\n      "),r._UZ(129,"th",17),r._uU(130,"\n      "),r.TgZ(131,"th",18),r._uU(132,"Tooltip"),r.qZA(),r._uU(133,"\n      "),r.TgZ(134,"th",18),r._uU(135,"Popup"),r.qZA(),r._uU(136,"\n    "),r.qZA(),r._uU(137,"\n    "),r.TgZ(138,"tr"),r._uU(139,"\n      "),r.TgZ(140,"td"),r._uU(141,"Default"),r.qZA(),r._uU(142,"\n      "),r.TgZ(143,"td"),r._uU(144,"\n        "),r._UZ(145,"ngx-tooltip-content",19),r._uU(146,"\n      "),r.qZA(),r._uU(147,"\n      "),r.TgZ(148,"td"),r._uU(149,"\n        "),r._UZ(150,"ngx-tooltip-content",20),r._uU(151,"\n      "),r.qZA(),r._uU(152,"\n    "),r.qZA(),r._uU(153,"\n    "),r.TgZ(154,"tr"),r._uU(155,"\n      "),r.TgZ(156,"td"),r._uU(157,"Long String"),r.qZA(),r._uU(158,"\n      "),r.TgZ(159,"td"),r._uU(160,"\n        "),r._UZ(161,"ngx-tooltip-content",21),r._uU(162,"\n      "),r.qZA(),r._uU(163,"\n      "),r.TgZ(164,"td"),r._uU(165,"\n        "),r._UZ(166,"ngx-tooltip-content",22),r._uU(167,"\n      "),r.qZA(),r._uU(168,"\n    "),r.qZA(),r._uU(169,"\n    "),r.TgZ(170,"tr"),r._uU(171,"\n      "),r.TgZ(172,"td"),r._uU(173,"Long String "),r.TgZ(174,"code"),r._uU(175,".narrow"),r.qZA(),r.qZA(),r._uU(176,"\n      "),r.TgZ(177,"td"),r._uU(178,"\n        "),r._UZ(179,"ngx-tooltip-content",23),r._uU(180,"\n      "),r.qZA(),r._uU(181,"\n      "),r.TgZ(182,"td"),r._uU(183,"\n        "),r._UZ(184,"ngx-tooltip-content",24),r._uU(185,"\n      "),r.qZA(),r._uU(186,"\n    "),r.qZA(),r._uU(187,"\n    "),r.TgZ(188,"tr"),r._uU(189,"\n      "),r.TgZ(190,"td"),r._uU(191,"Unbroken String"),r.qZA(),r._uU(192,"\n      "),r.TgZ(193,"td"),r._uU(194,"\n        "),r._UZ(195,"ngx-tooltip-content",21),r._uU(196,"\n      "),r.qZA(),r._uU(197,"\n      "),r.TgZ(198,"td"),r._uU(199,"\n        "),r._UZ(200,"ngx-tooltip-content",22),r._uU(201,"\n      "),r.qZA(),r._uU(202,"\n    "),r.qZA(),r._uU(203,"\n  "),r.qZA(),r._uU(204,"\n"),r.qZA()),2&t){var n=r.MAs(36),e=r.MAs(66);r.xp6(5),r.Q6J("tooltipPlacement","top")("tooltipType","tooltip")("tooltipTitle","Phishing Attack"),r.xp6(6),r.Q6J("tooltipPlacement","right")("tooltipType","tooltip")("tooltipTitle","Phishing Attack"),r.xp6(6),r.Q6J("tooltipPlacement","bottom")("tooltipType","tooltip")("tooltipTitle","Phishing Attack"),r.xp6(6),r.Q6J("tooltipPlacement","left")("tooltipType","tooltip")("tooltipTitle","Phishing Attack"),r.xp6(6),r.Q6J("tooltipPlacement","top")("tooltipType","tooltip")("tooltipTitle",o.dynamicVal),r.xp6(9),r.Q6J("tooltipPlacement","top")("tooltipType","tooltip")("tooltipTemplate",n),r.xp6(6),r.Q6J("tooltipPlacement","top")("tooltipType","tooltip")("tooltipTitle","Suitably small values long sudo bar giga mutex tarball race condition <strong>January 1, 1970</strong>. <br />Case d00dz bytes eaten by a grue linux script kiddies hack the mainframe mailbomb highjack Linus Torvalds <br />snarf firewall false. Wannabee printf wombat back door fail terminal for warez James T. <br />Kirk /dev/null private void Starcraft do big-endian break spoof."),r.xp6(6),r.Q6J("tooltipPlacement","top")("tooltipType","tooltip")("tooltipCssClass","demo-class demo-class2")("tooltipTitle","Security breach!"),r.xp6(18),r.Q6J("tooltipContext",r.DdM(70,T))("tooltipType","popover")("tooltipPlacement","top")("tooltipTemplate",e),r.xp6(6),r.Q6J("tooltipType","popover")("tooltipPlacement","right")("tooltipTemplate",e),r.xp6(6),r.Q6J("tooltipType","popover")("tooltipPlacement","bottom")("tooltipTemplate",e),r.xp6(6),r.Q6J("tooltipType","popover")("tooltipPlacement","left")("tooltipTemplate",e),r.xp6(6),r.Q6J("tooltipType","popover")("tooltipPlacement","top")("tooltipShowEvent","focus")("tooltipTemplate",e),r.xp6(6),r.Q6J("tooltipType","popover")("tooltipPlacement","top")("tooltipShowTimeout",0)("tooltipHideTimeout",0)("tooltipTemplate",e),r.xp6(6),r.Q6J("tooltipType","popover")("tooltipPlacement","top")("tooltipDisabled",!0)("tooltipTemplate",e),r.xp6(6),r.Q6J("tooltipType","popover")("tooltipPlacement","top")("tooltipShowCaret",!1)("tooltipTemplate",e),r.xp6(1),r.hij("\n    No Caret ",o.shown,"\n  "),r.xp6(34),r.Q6J("showCaret",!0),r.xp6(5),r.Q6J("showCaret",!1),r.xp6(11),r.Q6J("title",o.aLongString)("showCaret",!1),r.xp6(5),r.Q6J("title",o.aLongString)("showCaret",!1),r.xp6(13),r.Q6J("title",o.aLongString)("showCaret",!1),r.xp6(5),r.Q6J("title",o.aLongString)("showCaret",!1),r.xp6(11),r.Q6J("title",o.aVeryLongString)("showCaret",!1),r.xp6(5),r.Q6J("title",o.aVeryLongString)("showCaret",!1)}},directives:[l.e0w,l.i9q,g.U,l.usc,i.O5],styles:[".appearance-table[_ngcontent-%COMP%]{max-width:100%}.appearance-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{height:170px;overflow:auto;position:relative;vertical-align:top}.appearance-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]   ngx-tooltip-content[_ngcontent-%COMP%]{top:0}"],changeDetection:0}),U)}],m=function(){var t=o(function t(){n(this,t)});return t.\u0275fac=function(o){return new(o||t)},t.\u0275mod=r.oAB({type:t}),t.\u0275inj=r.cJS({imports:[[u.Bz.forChild(Z)],u.Bz]}),t}(),h=function(){var t=o(function t(){n(this,t)});return t.\u0275fac=function(o){return new(o||t)},t.\u0275mod=r.oAB({type:t}),t.\u0275inj=r.cJS({imports:[[i.ez,a.F,l.HNi,l.z8t,m]]}),t}()}}])}();