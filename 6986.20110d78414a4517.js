"use strict";(self.webpackChunkngx_ui=self.webpackChunkngx_ui||[]).push([[6986],{96986:(P,p,t)=>{t.r(p),t.d(p,{PipesPageModule:()=>h});var a=t(54460),r=t(25371),s=t(84053),c=t(70077),E=t(61888),n=t(48891),m=t(2410);function g(e,j){if(1&e&&(n.j41(0,"li"),n.EFF(1),n.k0s()),2&e){const F=j.$implicit;n.R7$(),n.SpI("\n      ",F,"\n    ")}}const d=[{path:"",component:(()=>{class e{constructor(){this.jsonObject=JSON.parse('{\n    "firstName": "John",\n    "lastName": "Smith",\n    "age": 25,\n    "address": {\n      "streetAddress": "21 2nd Street",\n      "city": "New York",\n      "state": "NY",\n      "postalCode": "10021-3100"\n    }\n  }'),this.date=new Date,this.array=["HERMIONE GRANGER","HARRY POTTER","GINNY WEASLEY","RON WEASLEY","NEVILLE LONGBOTTOM","FRED WEASLEY","GEORGE WEASLEY","LUNA LOVEGOOD","ANGELINA JOHNSON","KATIE BELL"],this.stringFilter=""}static#n=this.\u0275fac=function(i){return new(i||e)};static#e=this.\u0275cmp=n.VBU({type:e,selectors:[["app-pipes-page"]],decls:51,vars:17,consts:[[1,"style-header"],["sectionTitle","DecamelizePipe",1,"shadow"],["language","js"],["sectionTitle","TimeZonePipe",1,"shadow"],["sectionTitle","FilterPipe",1,"shadow"],["type","text",3,"ngModelChange","ngModel"],[4,"ngFor","ngForOf"],["sectionTitle","JSONTreePipe",1,"shadow"]],template:function(i,o){1&i&&(n.j41(0,"h3",0),n.EFF(1,"Pipes"),n.k0s(),n.EFF(2,"\n\n"),n.j41(3,"ngx-section",1),n.EFF(4),n.nI1(5,"decamelize"),n.j41(6,"app-prism",2),n.EFF(7,"\n"),n.EFF(8,"{ { 'DecamelizePipe' | decamelize } }"),n.EFF(9,"\n  "),n.k0s(),n.EFF(10,"\n"),n.k0s(),n.EFF(11,"\n\n"),n.j41(12,"ngx-section",3),n.EFF(13),n.nI1(14,"amTimeZone"),n.j41(15,"app-prism",2),n.EFF(16,"\n"),n.EFF(17,"{ { date | amTimeZone: 'America/Los_Angeles' } }"),n.EFF(18,"\n  "),n.k0s(),n.EFF(19,"\n"),n.k0s(),n.EFF(20,"\n\n"),n.j41(21,"ngx-section",4),n.EFF(22,"\n  "),n.j41(23,"ngx-input",5),n.mxI("ngModelChange",function(l){return n.DH7(o.stringFilter,l)||(o.stringFilter=l),l}),n.k0s(),n.EFF(24,"\n  "),n.j41(25,"ul"),n.EFF(26,"\n    "),n.DNE(27,g,2,1,"li",6),n.nI1(28,"filterBy"),n.EFF(29,"\n  "),n.k0s(),n.EFF(30,"\n  \n  "),n.j41(31,"app-prism"),n.EFF(32,"\n"),n.EFF(33,'<ngx-input type="text" [(ngModel)]="stringFilter"></ngx-input>\n<ul>\n  <li *ngFor="let item of array | filterBy: stringFilter">\n    { { item } }\n  </li>\n</ul>'),n.EFF(34,"\n  "),n.k0s(),n.EFF(35,"\n"),n.k0s(),n.EFF(36,"\n\n"),n.j41(37,"ngx-section",7),n.EFF(38,"\n  "),n.j41(39,"code")(40,"pre"),n.EFF(41),n.nI1(42,"jsonTree"),n.nI1(43,"json"),n.k0s()(),n.EFF(44,"\n\n  "),n.j41(45,"app-prism"),n.EFF(46,"\n"),n.EFF(47,"<code><pre>{ { jsonObject | jsonTree | json } }</pre></code>"),n.EFF(48,"\n  "),n.k0s(),n.EFF(49,"\n"),n.k0s(),n.EFF(50,"\n")),2&i&&(n.R7$(4),n.SpI("\n  ",n.bMT(5,5,"DecamelizePipe"),"\n\n  "),n.R7$(9),n.SpI("\n  ",n.i5U(14,7,o.date,"America/Los_Angeles"),"\n\n  "),n.R7$(10),n.R50("ngModel",o.stringFilter),n.R7$(4),n.Y8G("ngForOf",n.i5U(28,10,o.array,o.stringFilter)),n.R7$(14),n.JRh(n.bMT(43,15,n.bMT(42,13,o.jsonObject))))},dependencies:[a.Sq,r.BC,r.vS,m.r,s.nEw,s.Sjx,a.TG,s.k0S,s.OFv,s.LIO,s.zWF],encapsulation:2})}return e})()}];let u=(()=>{class e{static#n=this.\u0275fac=function(i){return new(i||e)};static#e=this.\u0275mod=n.$C({type:e});static#t=this.\u0275inj=n.G2t({imports:[E.iI.forChild(d),E.iI]})}return e})(),h=(()=>{class e{static#n=this.\u0275fac=function(i){return new(i||e)};static#e=this.\u0275mod=n.$C({type:e});static#t=this.\u0275inj=n.G2t({imports:[a.MD,r.YN,c.Q,s.sVo,s.x1Z,s.YcI,u]})}return e})()}}]);