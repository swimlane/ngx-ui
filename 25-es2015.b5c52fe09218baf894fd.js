(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{VwpH:function(n,t,c){"use strict";c.r(t),c.d(t,"ToolbarPageModule",function(){return u});var e=c("ofXK"),o=c("8lIJ"),l=c("alW4"),i=c("tyNb"),b=c("fXoL"),a=c("LMvA");const r=[{path:"",component:(()=>{class n{constructor(){this.toolbarMenu=[{label:"File",click:()=>{console.log("File clicked")}},{label:"Run",disabled:!0},{label:"Edit",dropdown:!0,click:()=>{console.log("Edit clicked")}}]}menuClicked(n){console.log("Menu clicked",n)}}return n.\u0275fac=function(t){return new(t||n)},n.\u0275cmp=b.Gb({type:n,selectors:[["app-toolbar-page"]],decls:40,vars:5,consts:[[1,"style-header"],[1,"shadow",3,"sectionTitle"],[3,"mainTitle","subtitle","menu","menuClick"],[1,"tag"]],template:function(n,t){1&n&&(b.Sb(0,"h3",0),b.Ic(1,"Toolbar"),b.Rb(),b.Ic(2,"\n\n"),b.Sb(3,"ngx-section",1),b.Ic(4,"\n  "),b.Sb(5,"ngx-toolbar",2),b.Zb("menuClick",function(n){return t.menuClicked(n)}),b.Ic(6,"\n  "),b.Rb(),b.Ic(7,"\n  "),b.Nb(8,"br"),b.Ic(9,"\n  "),b.Sb(10,"app-prism"),b.Ic(11,"\n"),b.Ic(12,'<ngx-toolbar\n  [mainTitle]="\'Record\'"\n  [subtitle]="\'IR-344\'"\n  [menu]="toolbarMenu"\n  (menuClick)="menuClicked($event)">\n</ngx-toolbar>'),b.Ic(13,"\n  "),b.Rb(),b.Ic(14,"\n"),b.Rb(),b.Ic(15,"\n\n"),b.Sb(16,"ngx-section",1),b.Ic(17,"\n  "),b.Sb(18,"ngx-toolbar"),b.Ic(19,"\n    "),b.Sb(20,"ngx-toolbar-title"),b.Ic(21,"\n      "),b.Sb(22,"span",3),b.Ic(23,"dynamic title"),b.Rb(),b.Ic(24,"\n    "),b.Rb(),b.Ic(25,"\n    "),b.Sb(26,"ngx-toolbar-content"),b.Ic(27,"\n      "),b.Sb(28,"i"),b.Ic(29,"dynamic content"),b.Rb(),b.Ic(30,"\n    "),b.Rb(),b.Ic(31,"\n  "),b.Rb(),b.Ic(32,"\n  "),b.Nb(33,"br"),b.Ic(34,"\n  "),b.Sb(35,"app-prism"),b.Ic(36,"\n"),b.Ic(37,'<ngx-toolbar>\n  <ngx-toolbar-title>\n    <span class="tag">dynamic title</span>\n  </ngx-toolbar-title>\n  <ngx-toolbar-content>\n    <i>dynamic content</i>\n  </ngx-toolbar-content>\n</ngx-toolbar>'),b.Ic(38,"\n  "),b.Rb(),b.Ic(39,"\n"),b.Rb()),2&n&&(b.zb(3),b.jc("sectionTitle","Title/Menu"),b.zb(2),b.jc("mainTitle","Record")("subtitle","IR-344")("menu",t.toolbarMenu),b.zb(11),b.jc("sectionTitle","Dynamic Content"))},directives:[o.yb,o.ac,a.a,o.dc,o.bc],encapsulation:2,changeDetection:0}),n})()}];let s=(()=>{class n{}return n.\u0275mod=b.Kb({type:n}),n.\u0275inj=b.Jb({factory:function(t){return new(t||n)},imports:[[i.g.forChild(r)],i.g]}),n})(),u=(()=>{class n{}return n.\u0275mod=b.Kb({type:n}),n.\u0275inj=b.Jb({factory:function(t){return new(t||n)},imports:[[e.c,l.a,o.Ab,o.cc,s]]}),n})()}}]);