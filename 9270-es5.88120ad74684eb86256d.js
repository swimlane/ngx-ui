!function(){"use strict";function n(n,e){for(var o=0;o<e.length;o++){var c=e[o];c.enumerable=c.enumerable||!1,c.configurable=!0,"value"in c&&(c.writable=!0),Object.defineProperty(n,c.key,c)}}function e(e,o,c){return o&&n(e.prototype,o),c&&n(e,c),Object.defineProperty(e,"prototype",{writable:!1}),e}function o(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}(self.webpackChunkngx_ui=self.webpackChunkngx_ui||[]).push([[9270],{9270:function(n,c,u){u.r(c),u.d(c,{CheckboxPageModule:function(){return s}});var r,t=u(8583),a=u(665),i=u(5719),l=u(9421),p=u(4330),h=u(3018),g=u(7402),U=[{path:"",component:(r=e(function n(e){o(this,n),this.checked=!1,this.alertType=e.group({breach:!1,ddos:!1,physical:!1})}),r.\u0275fac=function(n){return new(n||r)(h.Y36(a.qu))},r.\u0275cmp=h.Xpm({type:r,selectors:[["app-checkbox-page"]],decls:89,vars:10,consts:[[1,"style-header"],["sectionTitle","Demo",1,"shadow"],["name","chk1",3,"ngModel"],["name","chk2","disabled","",3,"ngModel"],["name","chk3",3,"ngModel"],["sectionTitle","Round"],["round","","diameter","25px","name","chk4"],["sectionTitle","Events and FormGroup",1,"shadow"],["name","chk5",3,"checked","checkedChange"],["data-cy","form-group",3,"formGroup"],["formControlName","breach"],["formControlName","ddos"],["formControlName","physical"],[3,"formGroup"]],template:function(n,e){1&n&&(h.TgZ(0,"h3",0),h._uU(1,"Checkbox"),h.qZA(),h._uU(2,"\n\n"),h.TgZ(3,"ngx-section",1),h._uU(4,"\n  "),h.TgZ(5,"h3"),h._uU(6,"Simple"),h.qZA(),h._uU(7,"\n  "),h.TgZ(8,"ngx-checkbox",2),h._uU(9,"\n    Alert the SOC\n  "),h.qZA(),h._uU(10,"\n\n  "),h.TgZ(11,"app-prism"),h._uU(12,"\n"),h._uU(13,'<ngx-checkbox\n  name="chk1"\n  [ngModel]="true"\n>\n  Alert the SOC\n</ngx-checkbox>'),h._uU(14,"\n  "),h.qZA(),h._uU(15,"\n\n  "),h._UZ(16,"br"),h._uU(17,"\n  "),h._UZ(18,"br"),h._uU(19,"\n\n  "),h.TgZ(20,"ngx-checkbox",3),h._uU(21,"\n    Alert the SOC\n  "),h.qZA(),h._uU(22,"\n\n  "),h.TgZ(23,"app-prism"),h._uU(24,"\n"),h._uU(25,'<ngx-checkbox\n  name="chk2"\n  [ngModel]="true"\n  disabled\n>\n  Alert the SOC\n</ngx-checkbox>'),h._uU(26,"\n  "),h.qZA(),h._uU(27,"\n\n  "),h._UZ(28,"br"),h._uU(29,"\n  "),h._UZ(30,"br"),h._uU(31,"\n\n  "),h.TgZ(32,"h3"),h._uU(33,"Large Label"),h.qZA(),h._uU(34,"\n  "),h.TgZ(35,"ngx-checkbox",4),h._uU(36,"\n    System continue gobble error headers protocol gc exception leet ip alloc epoch less xss overflow mainframe\n    concurrently perl\n    tera. *.* bit interpreter gurfle firewall salt brute force double if spoof back door fopen wombat hexadecimal\n    nak\n    client pwned. Leapfrog root boolean rm -rf port Trojan horse finally linux mountain dew new bypass while\n    terminal\n    sudo /dev/null float.\n  "),h.qZA(),h._uU(37,"\n"),h.qZA(),h._uU(38,"\n\n"),h.TgZ(39,"ngx-section",5),h._uU(40,"\n  "),h.TgZ(41,"ngx-checkbox",6),h._uU(42,"\n    Round Checkbox\n  "),h.qZA(),h._uU(43,"\n\n  "),h.TgZ(44,"app-prism"),h._uU(45,"\n"),h._uU(46,'<ngx-checkbox round diameter="25px">\n  Round Checkbox\n</ngx-checkbox>'),h._uU(47,"\n  "),h.qZA(),h._uU(48,"\n"),h.qZA(),h._uU(49,"\n\n"),h.TgZ(50,"ngx-section",7),h._uU(51,"\n  "),h.TgZ(52,"ngx-checkbox",8),h.NdJ("checkedChange",function(n){return e.checked=n}),h._uU(53,"\n    Alert the SOC\n  "),h.qZA(),h._uU(54,"\n\n  "),h.TgZ(55,"p"),h._uU(56,"Checked: "),h.TgZ(57,"code"),h._uU(58),h.qZA(),h.qZA(),h._uU(59,"\n\n  "),h.TgZ(60,"div",9),h._uU(61,"\n    "),h.TgZ(62,"h4"),h._uU(63,"Select Alert Type:"),h.qZA(),h._uU(64,"\n    "),h.TgZ(65,"p"),h.TgZ(66,"ngx-checkbox",10),h._uU(67,"Breach"),h.qZA(),h.qZA(),h._uU(68,"\n    "),h.TgZ(69,"p"),h.TgZ(70,"ngx-checkbox",11),h._uU(71,"DDOS"),h.qZA(),h.qZA(),h._uU(72,"\n    "),h.TgZ(73,"p"),h.TgZ(74,"ngx-checkbox",12),h._uU(75,"Physical"),h.qZA(),h.qZA(),h._uU(76,"\n  "),h.qZA(),h._uU(77,"\n  \n  "),h.TgZ(78,"div",13),h._uU(79,"\n    "),h.TgZ(80,"h4"),h._uU(81,"You chose:"),h.qZA(),h._uU(82,"\n    "),h.TgZ(83,"code"),h._uU(84),h.ALo(85,"json"),h.qZA(),h._uU(86,"\n  "),h.qZA(),h._uU(87,"\n"),h.qZA(),h._uU(88,"\n")),2&n&&(h.xp6(8),h.Q6J("ngModel",!0),h.xp6(12),h.Q6J("ngModel",!0),h.xp6(15),h.Q6J("ngModel",!1),h.xp6(17),h.Q6J("checked",e.checked),h.xp6(6),h.Oqu(e.checked),h.xp6(2),h.Q6J("formGroup",e.alertType),h.xp6(18),h.Q6J("formGroup",e.alertType),h.xp6(6),h.Oqu(h.lcZ(85,8,e.alertType.value)))},directives:[i.e0w,i.bK4,a.JJ,a.On,g.U,a.JL,a.sg,a.u],pipes:[t.Ts],encapsulation:2,changeDetection:0}),r)}],_=function(){var n=e(function n(){o(this,n)});return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=h.oAB({type:n}),n.\u0275inj=h.cJS({imports:[[p.Bz.forChild(U)],p.Bz]}),n}(),s=function(){var n=e(function n(){o(this,n)});return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=h.oAB({type:n}),n.\u0275inj=h.cJS({imports:[[t.ez,a.u5,l.F,i.HNi,i.nDK,_,a.UX]]}),n}()}}])}();