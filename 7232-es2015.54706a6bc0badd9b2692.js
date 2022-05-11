"use strict";(self.webpackChunkngx_ui=self.webpackChunkngx_ui||[]).push([[7232],{7232:function(e,t,n){n.r(t),n.d(t,{DateDisplayPageModule:function(){return s}});var i=n(8583),u=n(5719),a=n(9421),m=n(4330),U=n(1412),_=n.n(U),o=n(3018),Z=n(7402);const g=function(){return{Local:"",GMT:"Etc/UTC",Tokyo:"Asia/Tokyo"}},d="2011-03-11T05:46:24Z",p=[{path:"",component:(()=>{class e{constructor(){this.date=d,this.localString=_()(d).tz(_().tz.guess()).format("MMMM D, YYYY h:mm:ss A")}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=o.Xpm({type:e,selectors:[["ng-component"]],decls:184,vars:17,consts:[["sectionTitle","Basic"],[1,"example"],[3,"datetime"],["sectionTitle","Formats"],["format","dateTime",3,"datetime"],["format","YYYY MMM",3,"datetime"],["sectionTitle","Modes"],["mode","human",3,"datetime"],["mode","local",3,"datetime"],["sectionTitle","Types"],["type","time",3,"datetime"],["type","date",3,"datetime"],["sectionTitle","Time Zones"],["datetime","March 11, 2011 2:46:24 PM","timezone","Asia/Tokyo"],["datetime","March 11, 2011 2:46:24 PM","defaultInputTimeZone","Asia/Tokyo"],["datetime","03/10/2011 9:46:24 PM -08:00","defaultInputTimeZone","Asia/Tokyo"],["sectionTitle","Popup"],["tooltipDisabled","true",3,"datetime"],[3,"datetime","timezones"],["tooltipFormat","localeTime",3,"datetime"],["tooltipFormat","YYYY MMM",3,"datetime"],["sectionTitle","Invalid"]],template:function(e,t){1&e&&(o.TgZ(0,"ngx-section",0),o._uU(1,"\n  "),o.TgZ(2,"div",1),o._uU(3,"\n    "),o.TgZ(4,"h4"),o._uU(5,"Default Date-Time"),o.qZA(),o._uU(6,"\n    "),o._UZ(7,"ngx-time",2),o._uU(8,"\n    "),o.TgZ(9,"app-prism"),o._uU(10,'<ngx-time [datetime]="date"></ngx-time>'),o.qZA(),o._uU(11,"\n  "),o.qZA(),o._uU(12,"\n"),o.qZA(),o._uU(13,"\n\n"),o.TgZ(14,"ngx-section",3),o._uU(15,"\n  "),o.TgZ(16,"div",1),o._uU(17,"\n    "),o.TgZ(18,"h4"),o._uU(19,"Format"),o.qZA(),o._uU(20,"\n    "),o._UZ(21,"ngx-time",4),o._uU(22,"\n    "),o.TgZ(23,"app-prism"),o._uU(24,'<ngx-time [datetime]="date" format="fullDateTime"></ngx-time>'),o.qZA(),o._uU(25,"  \n  "),o.qZA(),o._uU(26,"\n  \n  "),o.TgZ(27,"div",1),o._uU(28,"\n    "),o.TgZ(29,"h4"),o._uU(30,"Custom format"),o.qZA(),o._uU(31,"\n    "),o._UZ(32,"ngx-time",5),o._uU(33,"\n    "),o.TgZ(34,"app-prism"),o._uU(35,'<ngx-time [datetime]="date" format="YYYY MMM"></ngx-time>'),o.qZA(),o._uU(36,"    \n  "),o.qZA(),o._uU(37,"\n"),o.qZA(),o._uU(38,"\n\n"),o.TgZ(39,"ngx-section",6),o._uU(40,"\n  "),o.TgZ(41,"div",1),o._uU(42,"\n    "),o.TgZ(43,"h4"),o._uU(44,"Human Readable Date-Time"),o.qZA(),o._uU(45,"\n    "),o._UZ(46,"ngx-time",7),o._uU(47,"\n    "),o.TgZ(48,"app-prism"),o._uU(49,'<ngx-time [datetime]="date" mode="human"></ngx-time>'),o.qZA(),o._uU(50," \n  "),o.qZA(),o._uU(51,"\n\n  "),o.TgZ(52,"div",1),o._uU(53,"\n    "),o.TgZ(54,"h4"),o._uU(55,"Local"),o.qZA(),o._uU(56,"\n    "),o._UZ(57,"ngx-time",8),o._uU(58,"\n    "),o.TgZ(59,"app-prism"),o._uU(60,'<ngx-time [datetime]="date" mode="local"></ngx-time>'),o.qZA(),o._uU(61," \n  "),o.qZA(),o._uU(62,"\n"),o.qZA(),o._uU(63,"\n\n"),o.TgZ(64,"ngx-section",9),o._uU(65,"\n  "),o.TgZ(66,"div",1),o._uU(67,"\n    "),o.TgZ(68,"h4"),o._uU(69,"Time"),o.qZA(),o._uU(70,"\n    "),o._UZ(71,"ngx-time",10),o._uU(72,"\n    "),o.TgZ(73,"app-prism"),o._uU(74,'<ngx-time [datetime]="date" type="time"></ngx-time>'),o.qZA(),o._uU(75," \n  "),o.qZA(),o._uU(76,"\n\n  "),o.TgZ(77,"div",1),o._uU(78,"\n    "),o.TgZ(79,"h4"),o._uU(80,"Date"),o.qZA(),o._uU(81,"\n    "),o._UZ(82,"ngx-time",11),o._uU(83,"\n    "),o.TgZ(84,"app-prism"),o._uU(85,'<ngx-time [datetime]="date" type="date"></ngx-time>'),o.qZA(),o._uU(86," \n  "),o.qZA(),o._uU(87,"\n"),o.qZA(),o._uU(88,"\n\n"),o.TgZ(89,"ngx-section",12),o._uU(90,"\n  "),o.TgZ(91,"output"),o._uU(92),o.ALo(93,"json"),o.qZA(),o._uU(94,"\n  \n  "),o.TgZ(95,"div",1),o._uU(96,"\n    "),o.TgZ(97,"h4"),o._uU(98,"Input and display TZ can be defined"),o.qZA(),o._uU(99,"\n    "),o._UZ(100,"ngx-time",13),o._uU(101,"\n    "),o.TgZ(102,"app-prism"),o._uU(103,'<ngx-time [datetime]="\'March 11, 2011 2:46:24 PM\'" timezone="Asia/Tokyo"></ngx-time>'),o.qZA(),o._uU(104," \n  "),o.qZA(),o._uU(105,"\n\n  "),o.TgZ(106,"div",1),o._uU(107,"\n    "),o.TgZ(108,"h4"),o._uU(109,"Default input timezone can be specified separately from display"),o.qZA(),o._uU(110,"\n    "),o._UZ(111,"ngx-time",14),o._uU(112,"\n    "),o.TgZ(113,"app-prism"),o._uU(114,'<ngx-time [datetime]="March 11, 2011 2:46:24 PM" defaultInputTimeZone="Asia/Tokyo"></ngx-time>'),o.qZA(),o._uU(115,"\n  "),o.qZA(),o._uU(116,"\n\n  "),o.TgZ(117,"div",1),o._uU(118,"\n    "),o.TgZ(119,"h4"),o._uU(120,"Explicit timezone in input value overrides default input timezone"),o.qZA(),o._uU(121,"\n    "),o._UZ(122,"ngx-time",15),o._uU(123,"\n    "),o.TgZ(124,"app-prism"),o._uU(125,'<ngx-time [datetime]="Thu, Mar 10, 2011 9:46 PM -08:00" defaultInputTimeZone="Asia/Tokyo"></ngx-time>'),o.qZA(),o._uU(126,"\n  "),o.qZA(),o._uU(127,"\n"),o.qZA(),o._uU(128,"\n\n"),o.TgZ(129,"ngx-section",16),o._uU(130,"\n  "),o.TgZ(131,"div",1),o._uU(132,"\n    "),o.TgZ(133,"h4"),o._uU(134,"Native Tooltip"),o.qZA(),o._uU(135,"\n    "),o._UZ(136,"ngx-time",17),o._uU(137,"\n    "),o.TgZ(138,"app-prism"),o._uU(139,'<ngx-time [datetime]="date" tooltipDisabled="true"></ngx-time>'),o.qZA(),o._uU(140,"\n  "),o.qZA(),o._uU(141,"\n\n  "),o.TgZ(142,"div",1),o._uU(143,"\n    "),o.TgZ(144,"h4"),o._uU(145,"Defined Timezones"),o.qZA(),o._uU(146,"\n    "),o._UZ(147,"ngx-time",18),o._uU(148,"\n    "),o.TgZ(149,"app-prism"),o._uU(150,"<ngx-time [datetime]=\"date\" [timezones]=\"{ 'Local': '', 'GMT': 'Etc/UTC', 'Tokyo': 'Asia/Tokyo' }\"></ngx-time>"),o.qZA(),o._uU(151,"\n  "),o.qZA(),o._uU(152,"\n\n  "),o.TgZ(153,"div",1),o._uU(154,"\n    "),o.TgZ(155,"h4"),o._uU(156,"Popup Format"),o.qZA(),o._uU(157,"\n    "),o._UZ(158,"ngx-time",19),o._uU(159,"\n    "),o.TgZ(160,"app-prism"),o._uU(161,'<ngx-time [datetime]="date" tooltipFormat="localeTime"></ngx-time>'),o.qZA(),o._uU(162,"\n  "),o.qZA(),o._uU(163,"\n\n  "),o.TgZ(164,"div",1),o._uU(165,"\n    "),o.TgZ(166,"h4"),o._uU(167,"Custom Popup Format"),o.qZA(),o._uU(168,"\n    "),o._UZ(169,"ngx-time",20),o._uU(170,"\n    "),o.TgZ(171,"app-prism"),o._uU(172,'<ngx-time [datetime]="date" tooltipFormat="YYYY MMM"></ngx-time>'),o.qZA(),o._uU(173,"\n  "),o.qZA(),o._uU(174,"\n"),o.qZA(),o._uU(175,"\n\n"),o.TgZ(176,"ngx-section",21),o._uU(177,"\n  "),o.TgZ(178,"div",1),o._uU(179,"\n    "),o._UZ(180,"ngx-time",2),o._uU(181,"\n  "),o.qZA(),o._uU(182,"\n"),o.qZA(),o._uU(183,"\n\n")),2&e&&(o.xp6(7),o.Q6J("datetime",t.date),o.xp6(14),o.Q6J("datetime",t.date),o.xp6(11),o.Q6J("datetime",t.date),o.xp6(14),o.Q6J("datetime",t.date),o.xp6(11),o.Q6J("datetime",t.date),o.xp6(14),o.Q6J("datetime",t.date),o.xp6(11),o.Q6J("datetime",t.date),o.xp6(10),o.Oqu(o.lcZ(93,14,t.localString)),o.xp6(44),o.Q6J("datetime",t.date),o.xp6(11),o.Q6J("datetime",t.date)("timezones",o.DdM(16,g)),o.xp6(11),o.Q6J("datetime",t.date),o.xp6(11),o.Q6J("datetime",t.date),o.xp6(11),o.Q6J("datetime","1/1/1/1970"))},directives:[u.e0w,u.UuQ,Z.U],pipes:[i.Ts],styles:[".example[_ngcontent-%COMP%]{margin:10px 0 40px;line-height:.9em}"],changeDetection:0}),e})()}];let T=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=o.oAB({type:e}),e.\u0275inj=o.cJS({imports:[[m.Bz.forChild(p)],m.Bz]}),e})(),s=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=o.oAB({type:e}),e.\u0275inj=o.cJS({imports:[[i.ez,T,u._2L,a.F,u.HNi]]}),e})()}}]);