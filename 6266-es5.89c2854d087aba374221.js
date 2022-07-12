!function(){"use strict";function e(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function n(e,n){for(var t=0;t<n.length;t++){var o=n[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function t(e,t,o){return t&&n(e.prototype,t),o&&n(e,o),Object.defineProperty(e,"prototype",{writable:!1}),e}(self.webpackChunkngx_ui=self.webpackChunkngx_ui||[]).push([[6266],{96266:function(n,o,r){r.r(o),r.d(o,{JsonEditorPageModule:function(){return U}});var i,s=r(38583),a=r(44579),d=r(75141),u=r(29421),l=r(39813),c=r(37716),p=r(55197),g=function(){return{}},h=[{path:"",component:(i=function(){function n(){e(this,n),this.jsonEditorSchema={$schema:"http://json-schema.org/draft-07/schema#",title:"Product",description:"A product from Acme's catalog",type:"object",properties:{metaData:{type:["string","string=code","number","object"]},productId:{title:"The unique identifier for a product",description:"The unique identifier for a product",type:"number"},productName:{description:"Name of the product",type:"string",examples:["Apples","Oranges"],minLength:3,maxLength:20},price:{description:"The price of the product",type:"number",exclusiveMinimum:0},tags:{description:"Tags for the product",type:"array",items:{type:"string"},minItems:1,uniqueItems:!0},availability:{type:"string",enum:["In Stock","Sold Out"],default:"In Stock"},onSale:{description:"The sale status of the product",type:"boolean"},dimensions:{type:"object",properties:{length:{type:"integer"},width:{type:"number"},height:{type:"number",description:"Height if dimensions are a volume"}},required:["length","width"],additionalProperties:!1},warehouseLocation:{description:"Coordinates of the warehouse where the product is located.",title:"Longitude and Latitude",required:["latitude","longitude"],type:"object",properties:{latitude:{type:"number",minimum:-90,maximum:90},longitude:{type:"number",minimum:-180,maximum:180}}},userApiKey:{title:"User API key",type:"string",format:"password"},file:{title:"File Binary",type:"string",format:"binary"}},required:["productId","productName","price","availability","onSale","dimensions","userApiKey","file"]},this.hideRoot=!1,this.showKnownProperties=!1,this.passwordToggleEnabled=!1,this._jsonEditorSchema={},this.jsonEditorModel={metaData:"<< console.log('this should be of type code') >>"},this.jsonEditorModelFlat={metaData:"<< console.log('this should be of type code') >>"},this.jsonEditorSchemaBuilderModel={},this.schemaRef={},this.modelSchemaRef={},this.customFormats=["password","code","date","date-time","custom"],this.typeOverrides={"string=code":function(e){return"string"==typeof e&&/^<<([\s\S]*)>>$/.test(e)}}}return t(n,[{key:"updateJsonEditorSchema",value:function(e){this.jsonEditorSchema=JSON.parse(e),this.jsonEditorModel={},this.jsonEditorModelFlat={}}},{key:"schemaUpdate",value:function(e){this.schemaRef=e}},{key:"modelschemaUpdate",value:function(e){this.modelSchemaRef=e}}]),n}(),i.\u0275fac=function(e){return new(e||i)},i.\u0275cmp=c.Xpm({type:i,selectors:[["app-json-editor-page"]],decls:138,vars:37,consts:[[1,"style-header"],[1,"shadow",3,"sectionTitle"],["label","Editor"],["label","Model",3,"model","schema","typeCheckOverrides","modelChange"],["label","Schema"],[1,"btn","btn-primary",3,"click"],["mode","javascript",3,"ngModel","ngModelChange"],["label","Markup"],["language","html"],["label","Typescript"],["language","js"],["label","Hide Root",3,"ngModel","ngModelChange"],["label","Show Known Object Properties",3,"ngModel","ngModelChange"],["label","Enable Password Toggle",3,"ngModel","ngModelChange"],["label","Model",3,"model","schema","typeCheckOverrides","hideRoot","showKnownProperties","passwordToggleEnabled","modelChange","schemaUpdate"],["label","Schema",3,"model","schema","hideRoot","typeCheckOverrides","schemaBuilderMode","formats","modelChange","schemaUpdate"]],template:function(e,n){1&e&&(c.TgZ(0,"h3",0),c._uU(1,"JSON Editor"),c.qZA(),c._uU(2,"\n\n"),c.TgZ(3,"ngx-section",1),c._uU(4,"\n  "),c.TgZ(5,"ngx-tabs"),c._uU(6,"\n    "),c.TgZ(7,"ngx-tab",2),c._uU(8,"\n      "),c.TgZ(9,"ngx-json-editor",3),c.NdJ("modelChange",function(e){return n.jsonEditorModel=e}),c._uU(10,"\n      "),c.qZA(),c._uU(11,"\n\n      "),c._UZ(12,"hr"),c._uU(13,"\n      "),c.TgZ(14,"h3"),c._uU(15,"Model"),c.qZA(),c._uU(16,"\n      "),c.TgZ(17,"pre"),c._uU(18),c.ALo(19,"json"),c.qZA(),c._uU(20,"\n    "),c.qZA(),c._uU(21,"\n    "),c.TgZ(22,"ngx-tab",4),c._uU(23,"\n      "),c.TgZ(24,"ngx-button",5),c.NdJ("click",function(){return n.updateJsonEditorSchema(n._jsonEditorSchema)}),c._uU(25,"Update Schema"),c.qZA(),c._uU(26,"\n      "),c.TgZ(27,"ngx-codemirror",6),c.NdJ("ngModelChange",function(e){return n._jsonEditorSchema=e}),c.ALo(28,"json"),c.qZA(),c._uU(29,"\n    "),c.qZA(),c._uU(30,"\n  "),c.qZA(),c._uU(31,"\n\n  "),c.TgZ(32,"ngx-tabs"),c._uU(33,"\n    "),c.TgZ(34,"ngx-tab",7),c._uU(35,"\n      "),c.TgZ(36,"app-prism",8),c._uU(37,"\n        "),c._uU(38,'<ngx-json-editor [(model)]="jsonEditorModel" [schema]="jsonEditorSchema" label="Model"\n        [typeCheckOverrides]="typeOverrides" > </ngx-json-editor>'),c._uU(39,"\n      "),c.qZA(),c._uU(40,"\n    "),c.qZA(),c._uU(41,"\n    "),c.TgZ(42,"ngx-tab",9),c._uU(43,"\n      "),c.TgZ(44,"app-prism",10),c._uU(45,"\n        "),c._uU(46,"typeOverrides: any = { 'string=code': (value: any) => { if (typeof value !== 'string') { return false;\n        } const regex = new RegExp(/^<<(.*)>>$/, 's'); return regex.test(value); } };"),c._uU(47,"\n      "),c.qZA(),c._uU(48,"\n    "),c.qZA(),c._uU(49,"\n  "),c.qZA(),c._uU(50,"\n"),c.qZA(),c._uU(51,"\n\n"),c.TgZ(52,"ngx-section",1),c._uU(53,"\n  "),c.TgZ(54,"ngx-toggle",11),c.NdJ("ngModelChange",function(e){return n.hideRoot=e}),c._uU(55," "),c.qZA(),c._uU(56,"\n\n  "),c.TgZ(57,"ngx-toggle",12),c.NdJ("ngModelChange",function(e){return n.showKnownProperties=e}),c._uU(58," "),c.qZA(),c._uU(59,"\n\n  "),c.TgZ(60,"ngx-toggle",13),c.NdJ("ngModelChange",function(e){return n.passwordToggleEnabled=e}),c._uU(61," "),c.qZA(),c._uU(62,"\n\n  "),c.TgZ(63,"ngx-json-editor-flat",14),c.NdJ("modelChange",function(e){return n.jsonEditorModelFlat=e})("schemaUpdate",function(e){return n.modelschemaUpdate(e)}),c._uU(64,"\n  "),c.qZA(),c._uU(65,"\n\n  "),c._UZ(66,"hr"),c._uU(67,"\n  "),c.TgZ(68,"h3"),c._uU(69,"Model"),c.qZA(),c._uU(70,"\n  "),c.TgZ(71,"pre"),c._uU(72),c.ALo(73,"json"),c.qZA(),c._uU(74,"\n  "),c.TgZ(75,"h3"),c._uU(76,"Schema"),c.qZA(),c._uU(77,"\n  "),c.TgZ(78,"pre"),c._uU(79),c.ALo(80,"json"),c.qZA(),c._uU(81,"\n\n  "),c.TgZ(82,"ngx-tabs"),c._uU(83,"\n    "),c.TgZ(84,"ngx-tab",7),c._uU(85,"\n      "),c.TgZ(86,"app-prism",8),c._uU(87,"\n        "),c._uU(88,'<ngx-json-editor-flat [(model)]="jsonEditorModelFlat" [schema]="jsonEditorSchema" label="Model"\n        [typeCheckOverrides]="typeOverrides" [hideRoot]="hideRoot" [showKnownProperties]="showKnownProperties"\n        [passwordToggleEnabled]="showKnownProperties" (schemaUpdate)="modelschemaUpdate($event)">\n        </ngx-json-editor-flat>'),c._uU(89,"\n      "),c.qZA(),c._uU(90,"\n    "),c.qZA(),c._uU(91,"\n    "),c.TgZ(92,"ngx-tab",9),c._uU(93,"\n      "),c.TgZ(94,"app-prism",10),c._uU(95,"\n        "),c._uU(96,"typeOverrides: any = { 'string=code': (value: any) => { if (typeof value !== 'string') { return false;\n        } const regex = new RegExp(/^<<(.*)>>$/, 's'); return regex.test(value); } };"),c._uU(97,"\n      "),c.qZA(),c._uU(98,"\n    "),c.qZA(),c._uU(99,"\n  "),c.qZA(),c._uU(100,"\n"),c.qZA(),c._uU(101,"\n\n"),c._UZ(102,"br"),c._uU(103,"\n\n"),c.TgZ(104,"ngx-section",1),c._uU(105,"\n  "),c.TgZ(106,"ngx-json-editor-flat",15),c.NdJ("modelChange",function(e){return n.jsonEditorSchemaBuilderModel=e})("schemaUpdate",function(e){return n.schemaUpdate(e)}),c._uU(107,"\n  "),c.qZA(),c._uU(108,"\n  "),c._UZ(109,"hr"),c._uU(110,"\n  "),c.TgZ(111,"h3"),c._uU(112,"Schema"),c.qZA(),c._uU(113,"\n  "),c.TgZ(114,"pre"),c._uU(115),c.ALo(116,"json"),c.qZA(),c._uU(117,"\n\n  "),c.TgZ(118,"ngx-tabs"),c._uU(119,"\n    "),c.TgZ(120,"ngx-tab",7),c._uU(121,"\n      "),c.TgZ(122,"app-prism",8),c._uU(123,"\n        "),c._uU(124,'<ngx-json-editor-flat [(model)]="jsonEditorSchemaBuilderModel" [schema]="{}" label="Schema"\n        [typeCheckOverrides]="typeOverrides" [schemaBuilderMode]="true" [formats]="customFormats"\n        (schemaUpdate)="schemaUpdate($event)"> </ngx-json-editor-flat>'),c._uU(125,"\n      "),c.qZA(),c._uU(126,"\n    "),c.qZA(),c._uU(127,"\n    "),c.TgZ(128,"ngx-tab",9),c._uU(129,"\n      "),c.TgZ(130,"app-prism",10),c._uU(131,"\n        "),c._uU(132,"typeOverrides: any = { 'string=code': (value: any) => { if (typeof value !== 'string') { return false;\n        } const regex = new RegExp(/^<<(.*)>>$/, 's'); return regex.test(value); } };"),c._uU(133,"\n      "),c.qZA(),c._uU(134,"\n    "),c.qZA(),c._uU(135,"\n  "),c.qZA(),c._uU(136,"\n"),c.qZA(),c._uU(137,"\n")),2&e&&(c.xp6(3),c.Q6J("sectionTitle","JSON Editor"),c.xp6(6),c.Q6J("model",n.jsonEditorModel)("schema",n.jsonEditorSchema)("typeCheckOverrides",n.typeOverrides),c.xp6(9),c.Oqu(c.lcZ(19,26,n.jsonEditorModel)),c.xp6(9),c.Q6J("ngModel",c.lcZ(28,28,n.jsonEditorSchema)),c.xp6(25),c.Q6J("sectionTitle","ngx-json-editor-flat"),c.xp6(2),c.Q6J("ngModel",n.hideRoot),c.xp6(3),c.Q6J("ngModel",n.showKnownProperties),c.xp6(3),c.Q6J("ngModel",n.passwordToggleEnabled),c.xp6(3),c.Q6J("model",n.jsonEditorModelFlat)("schema",n.jsonEditorSchema)("typeCheckOverrides",n.typeOverrides)("hideRoot",n.hideRoot)("showKnownProperties",n.showKnownProperties)("passwordToggleEnabled",n.passwordToggleEnabled),c.xp6(9),c.Oqu(c.lcZ(73,30,n.jsonEditorModelFlat)),c.xp6(7),c.Oqu(c.lcZ(80,32,n.modelSchemaRef)),c.xp6(25),c.Q6J("sectionTitle","Schema Builder Mode"),c.xp6(2),c.Q6J("model",n.jsonEditorSchemaBuilderModel)("schema",c.DdM(36,g))("hideRoot",!0)("typeCheckOverrides",n.typeOverrides)("schemaBuilderMode",!0)("formats",n.customFormats),c.xp6(9),c.Oqu(c.lcZ(116,34,n.schemaRef)))},directives:[d.e0w,d.n4f,d.idV,d.TOI,d.r0F,d.wIv,a.JJ,a.On,p.U,d.n$2,d.NMg],pipes:[s.Ts],encapsulation:2,changeDetection:0}),i)}],m=function(){var n=t(function n(){e(this,n)});return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=c.oAB({type:n}),n.\u0275inj=c.cJS({imports:[[l.Bz.forChild(h)],l.Bz]}),n}(),U=function(){var n=t(function n(){e(this,n)});return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=c.oAB({type:n}),n.\u0275inj=c.cJS({imports:[[s.ez,a.u5,u.F,d.HNi,d._xO,d.P4_,d.Suy,d.vmb,d.Y05,d.hJ1,m]]}),n}()}}])}();