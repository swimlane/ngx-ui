"use strict";(self.webpackChunkngx_ui=self.webpackChunkngx_ui||[]).push([[1695],{51695:(T,c,s)=>{s.r(c),s.d(c,{AnimationsPageModule:()=>C});var u=s(54460),t=s(84053),E=s(70077),g=s(61888),F=s(71204),n=s(48891),m=s(2410);function p(i,a){1&i&&(n.j41(0,"div",4),n.EFF(1,"Fade In"),n.k0s()),2&i&&n.Y8G("@fadeIn",void 0)}function f(i,a){1&i&&(n.j41(0,"div",4),n.EFF(1,"Fade Out"),n.k0s()),2&i&&n.Y8G("@fadeOut",void 0)}function r(i,a){1&i&&(n.j41(0,"div",4),n.EFF(1,"Slide Down Fade Out"),n.k0s()),2&i&&n.Y8G("@slideDownFadeOut",void 0)}function v(i,a){1&i&&(n.j41(0,"div",4),n.EFF(1,"Slide Up Fade Out"),n.k0s()),2&i&&n.Y8G("@slideUpFadeOut",void 0)}function b(i,a){1&i&&(n.j41(0,"div",4),n.EFF(1,"Slide Left"),n.k0s()),2&i&&n.Y8G("@slideLeft",void 0)}function k(i,a){1&i&&(n.j41(0,"div",4),n.EFF(1,"Slide Right"),n.k0s()),2&i&&n.Y8G("@slideRight",void 0)}function h(i,a){1&i&&(n.j41(0,"div",4),n.EFF(1,"Slide Top"),n.k0s()),2&i&&n.Y8G("@slideTop",void 0)}function _(i,a){1&i&&(n.j41(0,"div",4),n.EFF(1,"Slide Bottom"),n.k0s()),2&i&&n.Y8G("@slideBottom",void 0)}const j=[{path:"",component:(()=>{class i{constructor(){this.count=0,this.visible={fadeIn:!0,fadeOut:!0,slideDownFadeOut:!0,slideUpFadeOut:!0,slideLeft:!0,slideRight:!0,slideTop:!0,slideBottom:!0}}increaseCount(){this.count++}toggle(l){this.visible[l]=!this.visible[l]}static#n=this.\u0275fac=function(o){return new(o||i)};static#i=this.\u0275cmp=n.VBU({type:i,selectors:[["app-animations-page"]],decls:142,vars:9,consts:[[1,"inputs-section"],[1,"style-header"],["sectionTitle","Bounce",1,"shadow"],[1,"btn",3,"click"],[1,"badge"],["sectionTitle","Fade In",1,"shadow"],["class","badge",4,"ngIf"],["sectionTitle","Fade Out",1,"shadow"],["sectionTitle","Slide Down Fade Out",1,"shadow"],["sectionTitle","Slide Up Fade Out",1,"shadow"],["sectionTitle","Slide Left",1,"shadow"],["sectionTitle","Slide Right",1,"shadow"],["sectionTitle","Slide Top",1,"shadow"],["sectionTitle","Slide Bottom",1,"shadow"]],template:function(o,e){1&o&&(n.j41(0,"div",0),n.EFF(1,"\n  "),n.j41(2,"h3",1),n.EFF(3,"Animations"),n.k0s(),n.EFF(4,"\n\n  "),n.j41(5,"ngx-section",2),n.EFF(6,"\n    "),n.j41(7,"ngx-button",3),n.bIt("click",function(){return e.increaseCount()}),n.EFF(8,"Click Me"),n.k0s(),n.EFF(9,"\n    "),n.j41(10,"div",4),n.EFF(11,"Bounce"),n.k0s(),n.EFF(12,"\n\n    "),n.nrm(13,"br"),n.EFF(14,"\n    "),n.j41(15,"app-prism"),n.EFF(16,"\n"),n.EFF(17,'<ngx-button class="btn" (click)="increaseCount()">Click Me</ngx-button>\n<div class="badge" [@bounce]="count">Bounce</div>'),n.EFF(18,"\n    "),n.k0s(),n.EFF(19,"\n  "),n.k0s(),n.EFF(20,"\n\n  "),n.j41(21,"ngx-section",5),n.EFF(22,"\n    "),n.j41(23,"ngx-button",3),n.bIt("click",function(){return e.toggle("fadeIn")}),n.EFF(24,"Click Me"),n.k0s(),n.EFF(25,"\n    "),n.DNE(26,p,2,1,"div",6),n.EFF(27,"\n\n    "),n.nrm(28,"br"),n.EFF(29,"\n    "),n.j41(30,"app-prism"),n.EFF(31,"\n"),n.EFF(32,'<div class="badge" *ngIf="visible.fadeIn" @fadeIn>Fade In</div>'),n.EFF(33,"\n    "),n.k0s(),n.EFF(34,"\n  "),n.k0s(),n.EFF(35,"\n\n  "),n.j41(36,"ngx-section",7),n.EFF(37,"\n    "),n.j41(38,"ngx-button",3),n.bIt("click",function(){return e.toggle("fadeOut")}),n.EFF(39,"Click Me"),n.k0s(),n.EFF(40,"\n    "),n.DNE(41,f,2,1,"div",6),n.EFF(42,"\n\n    "),n.nrm(43,"br"),n.EFF(44,"\n    "),n.j41(45,"app-prism"),n.EFF(46,"\n"),n.EFF(47,'<div class="badge" *ngIf="visible.fadeOut" @fadeOut>Fade Out</div>'),n.EFF(48,"\n    "),n.k0s(),n.EFF(49,"\n  "),n.k0s(),n.EFF(50,"\n\n  "),n.j41(51,"ngx-section",8),n.EFF(52,"\n    "),n.j41(53,"ngx-button",3),n.bIt("click",function(){return e.toggle("slideDownFadeOut")}),n.EFF(54,"Click Me"),n.k0s(),n.EFF(55,"\n    "),n.DNE(56,r,2,1,"div",6),n.EFF(57,"\n\n    "),n.nrm(58,"br"),n.EFF(59,"\n    "),n.j41(60,"app-prism"),n.EFF(61,"\n"),n.EFF(62,'<div class="badge" *ngIf="visible.slideDownFadeOut" @slideDownFadeOut>Slide Down Fade Out</div>'),n.EFF(63,"\n    "),n.k0s(),n.EFF(64,"\n  "),n.k0s(),n.EFF(65,"\n\n  "),n.j41(66,"ngx-section",9),n.EFF(67,"\n    "),n.j41(68,"ngx-button",3),n.bIt("click",function(){return e.toggle("slideUpFadeOut")}),n.EFF(69,"Click Me"),n.k0s(),n.EFF(70,"\n    "),n.DNE(71,v,2,1,"div",6),n.EFF(72,"\n\n    "),n.nrm(73,"br"),n.EFF(74,"\n    "),n.j41(75,"app-prism"),n.EFF(76,"\n"),n.EFF(77,'<div class="badge" *ngIf="visible.slideUpFadeOut" @slideUpFadeOut>Slide Up Fade Out</div>'),n.EFF(78,"\n    "),n.k0s(),n.EFF(79,"\n  "),n.k0s(),n.EFF(80,"\n\n  "),n.j41(81,"ngx-section",10),n.EFF(82,"\n    "),n.j41(83,"ngx-button",3),n.bIt("click",function(){return e.toggle("slideLeft")}),n.EFF(84,"Click Me"),n.k0s(),n.EFF(85,"\n    "),n.DNE(86,b,2,1,"div",6),n.EFF(87,"\n\n    "),n.nrm(88,"br"),n.EFF(89,"\n    "),n.j41(90,"app-prism"),n.EFF(91,"\n"),n.EFF(92,'<div class="badge" *ngIf="visible.slideLeft" @slideLeft>Slide Left</div>'),n.EFF(93,"\n    "),n.k0s(),n.EFF(94,"\n  "),n.k0s(),n.EFF(95,"\n\n  "),n.j41(96,"ngx-section",11),n.EFF(97,"\n    "),n.j41(98,"ngx-button",3),n.bIt("click",function(){return e.toggle("slideRight")}),n.EFF(99,"Click Me"),n.k0s(),n.EFF(100,"\n    "),n.DNE(101,k,2,1,"div",6),n.EFF(102,"\n\n    "),n.nrm(103,"br"),n.EFF(104,"\n    "),n.j41(105,"app-prism"),n.EFF(106,"\n"),n.EFF(107,'<div class="badge" *ngIf="visible.slideRight" @slideRight>Slide Right</div>'),n.EFF(108,"\n    "),n.k0s(),n.EFF(109,"\n  "),n.k0s(),n.EFF(110,"\n\n  "),n.j41(111,"ngx-section",12),n.EFF(112,"\n    "),n.j41(113,"ngx-button",3),n.bIt("click",function(){return e.toggle("slideTop")}),n.EFF(114,"Click Me"),n.k0s(),n.EFF(115,"\n    "),n.DNE(116,h,2,1,"div",6),n.EFF(117,"\n\n    "),n.nrm(118,"br"),n.EFF(119,"\n    "),n.j41(120,"app-prism"),n.EFF(121,"\n"),n.EFF(122,'<div class="badge" *ngIf="visible.slideTop" @slideTop>Slide Top</div>'),n.EFF(123,"\n    "),n.k0s(),n.EFF(124,"\n  "),n.k0s(),n.EFF(125,"\n\n  "),n.j41(126,"ngx-section",13),n.EFF(127,"\n    "),n.j41(128,"ngx-button",3),n.bIt("click",function(){return e.toggle("slideBottom")}),n.EFF(129,"Click Me"),n.k0s(),n.EFF(130,"\n    "),n.DNE(131,_,2,1,"div",6),n.EFF(132,"\n\n    "),n.nrm(133,"br"),n.EFF(134,"\n    "),n.j41(135,"app-prism"),n.EFF(136,"\n"),n.EFF(137,'<div class="badge" *ngIf="visible.slideBottom" @slideBottom>Slide Bottom</div>'),n.EFF(138,"\n    "),n.k0s(),n.EFF(139,"\n  "),n.k0s(),n.EFF(140,"\n"),n.k0s(),n.EFF(141,"\n")),2&o&&(n.R7$(10),n.Y8G("@bounce",e.count),n.R7$(16),n.Y8G("ngIf",e.visible.fadeIn),n.R7$(15),n.Y8G("ngIf",e.visible.fadeOut),n.R7$(15),n.Y8G("ngIf",e.visible.slideDownFadeOut),n.R7$(15),n.Y8G("ngIf",e.visible.slideUpFadeOut),n.R7$(15),n.Y8G("ngIf",e.visible.slideLeft),n.R7$(15),n.Y8G("ngIf",e.visible.slideRight),n.R7$(15),n.Y8G("ngIf",e.visible.slideTop),n.R7$(15),n.Y8G("ngIf",e.visible.slideBottom))},dependencies:[u.bT,m.r,t.nEw,t.Qpp],encapsulation:2,data:{animation:[(0,F.hZ)("bounce",(0,t.VGi)()),(0,F.hZ)("fadeIn",(0,t.I0p)()),(0,F.hZ)("fadeOut",(0,t.hOi)()),(0,F.hZ)("slideDownFadeOut",(0,t.uFU)()),(0,F.hZ)("slideUpFadeOut",(0,t.X_x)()),(0,F.hZ)("slideLeft",(0,t.$69)()),(0,F.hZ)("slideRight",(0,t.a1F)()),(0,F.hZ)("slideTop",(0,t.Nwv)(250)),(0,F.hZ)("slideBottom",(0,t.FOb)(250))]},changeDetection:0})}return i})()}];let I=(()=>{class i{static#n=this.\u0275fac=function(o){return new(o||i)};static#i=this.\u0275mod=n.$C({type:i});static#e=this.\u0275inj=n.G2t({imports:[g.iI.forChild(j),g.iI]})}return i})(),C=(()=>{class i{static#n=this.\u0275fac=function(o){return new(o||i)};static#i=this.\u0275mod=n.$C({type:i});static#e=this.\u0275inj=n.G2t({imports:[u.MD,E.Q,t.sVo,t.tmq,I]})}return i})()}}]);