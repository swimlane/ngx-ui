"use strict";(self.webpackChunkngx_ui=self.webpackChunkngx_ui||[]).push([[6266],{96266:function(e,n,t){t.r(n),t.d(n,{JsonEditorPageModule:function(){return _}});var o=t(38583),a=t(44579),d=t(75141),i=t(29421),r=t(39813),s=t(37716),l=t(55197);function u(e,n){if(1&e){const e=s.EpF();s.TgZ(0,"input",29),s.NdJ("ngModelChange",function(n){return s.CHM(e),s.oxw().nodeChangeValue$.next(n)}),s.qZA()}if(2&e){const e=s.oxw().nodeModel;s.Q6J("ngModel",e)}}function g(e,n){if(1&e){const e=s.EpF();s.TgZ(0,"input",30),s.NdJ("ngModelChange",function(n){return s.CHM(e),s.oxw().nodeChangeValue$.next(n)}),s.qZA()}if(2&e){const e=s.oxw().nodeModel;s.Q6J("ngModel",e)}}function p(e,n){if(1&e){const e=s.EpF();s.TgZ(0,"ngx-button",5),s.NdJ("click",function(){s.CHM(e);const n=s.oxw().nodeExpandTrigger$,t=s.oxw();return t.expanded=!t.expanded,n.next(t.expanded)}),s._uU(1),s.qZA()}if(2&e){const e=s.oxw(2);s.xp6(1),s.hij("",e.expanded?"Collapse":"Expand"," me!")}}function h(e,n){if(1&e&&(s._uU(0,"\n    "),s.TgZ(1,"div",18),s._uU(2,"\n      "),s.TgZ(3,"ngx-tabs"),s._uU(4,"\n        "),s.TgZ(5,"ngx-tab",19),s._uU(6,"\n          "),s.ynx(7,20),s._uU(8,"\n            "),s.YNc(9,u,1,1,"input",21),s._uU(10,"\n            "),s.YNc(11,g,1,1,"input",22),s._uU(12,"\n            "),s.YNc(13,p,2,1,"ngx-button",23),s._uU(14,"\n          "),s.BQk(),s._uU(15,"\n        "),s.qZA(),s._uU(16,"\n        "),s.TgZ(17,"ngx-tab",24),s._uU(18,"\n          "),s.TgZ(19,"div",25),s._uU(20),s.ALo(21,"json"),s.qZA(),s._uU(22,"\n        "),s.qZA(),s._uU(23,"\n        "),s.TgZ(24,"ngx-tab",26),s._uU(25,"\n          "),s.TgZ(26,"div",25),s._uU(27),s.ALo(28,"json"),s.qZA(),s._uU(29,"\n        "),s.qZA(),s._uU(30,"\n        "),s.TgZ(31,"ngx-tab",27),s._uU(32),s.ALo(33,"json"),s.qZA(),s._uU(34,"\n        "),s.TgZ(35,"ngx-tab",28),s._uU(36),s.qZA(),s._uU(37,"\n      "),s.qZA(),s._uU(38,"\n    "),s.qZA(),s._uU(39,"\n    \n  ")),2&e){const e=n.nodeModel,t=n.nodeSchema,o=n.nodePath,a=n.nodeContext;s.xp6(7),s.Q6J("ngSwitch",a.keyFieldType),s.xp6(2),s.Q6J("ngSwitchCase","integer"),s.xp6(2),s.Q6J("ngSwitchCase","string"),s.xp6(2),s.Q6J("ngSwitchCase","object"),s.xp6(7),s.hij("\n            ",s.lcZ(21,8,e),"\n          "),s.xp6(7),s.hij("\n            ",s.lcZ(28,10,t),"\n          "),s.xp6(5),s.hij("\n          ",s.lcZ(33,12,a),"\n        "),s.xp6(4),s.hij("\n          ",o,"\n        ")}}const c=function(){return{}},m=[{path:"",component:(()=>{class e{constructor(){this.jsonEditorSchema={$schema:"http://json-schema.org/draft-07/schema#",title:"Product",description:"A product from Acme's catalog",type:"object",properties:{metaData:{type:["string","string=code","number","object"]},productId:{title:"The unique identifier for a product",description:"The unique identifier for a product",type:"number"},productName:{description:"Name of the product",type:"string",examples:["Apples","Oranges"],minLength:3,maxLength:20},price:{description:"The price of the product",type:"number",exclusiveMinimum:0},tags:{description:"Tags for the product",type:"array",items:{type:"string"},minItems:1,uniqueItems:!0},availability:{type:"string",enum:["In Stock","Sold Out"],default:"In Stock"},onSale:{description:"The sale status of the product",type:"boolean"},dimensions:{type:"object",properties:{length:{type:"integer"},width:{type:"number"},height:{type:"number",description:"Height if dimensions are a volume"}},required:["length","width"],additionalProperties:!1},warehouseLocation:{description:"Coordinates of the warehouse where the product is located.",title:"Longitude and Latitude",required:["latitude","longitude"],type:"object",properties:{latitude:{type:"number",minimum:-90,maximum:90},longitude:{type:"number",minimum:-180,maximum:180}}},userApiKey:{title:"User API key",type:"string",format:"password"},file:{title:"File Binary",type:"string",format:"binary"}},required:["productId","productName","price","availability","onSale","dimensions","userApiKey","file"]},this.hideRoot=!1,this.showKnownProperties=!1,this.passwordToggleEnabled=!1,this.expanded=!0,this._jsonEditorSchema={},this.jsonEditorModel={metaData:"<< console.log('this should be of type code') >>"},this.jsonEditorModelFlat={metaData:"<< console.log('this should be of type code') >>"},this.jsonEditorFlatWithTemplateModel={},this.jsonEditorSchemaBuilderModel={},this.schemaRef={},this.modelSchemaRef={},this.schemaWithTemplate={},this.customFormats=["password","code","date","date-time","custom"],this.typeOverrides={"string=code":e=>"string"==typeof e&&/^<<(.*)>>$/s.test(e)}}updateJsonEditorSchema(e){this.jsonEditorSchema=JSON.parse(e),this.jsonEditorModel={},this.jsonEditorModelFlat={}}schemaUpdate(e){this.schemaRef=e}modelschemaUpdate(e){this.modelSchemaRef=e}}return e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=s.Xpm({type:e,selectors:[["app-json-editor-page"]],decls:208,vars:52,consts:[[1,"style-header"],[1,"shadow",3,"sectionTitle"],["label","Editor"],["label","Model",3,"model","schema","typeCheckOverrides","modelChange"],["label","Schema"],[1,"btn","btn-primary",3,"click"],["mode","javascript",3,"ngModel","ngModelChange"],["label","Markup"],["language","html"],["label","Typescript"],["language","js"],["label","Hide Root",3,"ngModel","ngModelChange"],["label","Show Known Object Properties",3,"ngModel","ngModelChange"],["label","Enable Password Toggle",3,"ngModel","ngModelChange"],["label","Model",3,"model","schema","typeCheckOverrides","hideRoot","showKnownProperties","passwordToggleEnabled","modelChange","schemaUpdate"],["label","Model",3,"model","schema","hideRoot","showKnownProperties","passwordToggleEnabled","inputControlTemplate","enableSchemaValidation","modelChange","schemaUpdate"],["myInputControl",""],["label","Schema",3,"model","schema","hideRoot","typeCheckOverrides","schemaBuilderMode","formats","modelChange","schemaUpdate"],[1,"myInputControlNodeContainer"],["label","Value"],[3,"ngSwitch"],["type","number",3,"ngModel","ngModelChange",4,"ngSwitchCase"],["type","text",3,"ngModel","ngModelChange",4,"ngSwitchCase"],["class","btn btn-primary",3,"click",4,"ngSwitchCase"],["label","NodeModel"],[1,"myInputControlNodeContainer__scrollable"],["label","NodeSchema"],["label","NodeContext"],["label","NodePath"],["type","number",3,"ngModel","ngModelChange"],["type","text",3,"ngModel","ngModelChange"]],template:function(e,n){if(1&e&&(s.TgZ(0,"h3",0),s._uU(1,"JSON Editor"),s.qZA(),s._uU(2,"\n\n"),s.TgZ(3,"ngx-section",1),s._uU(4,"\n  "),s.TgZ(5,"ngx-tabs"),s._uU(6,"\n    "),s.TgZ(7,"ngx-tab",2),s._uU(8,"\n      "),s.TgZ(9,"ngx-json-editor",3),s.NdJ("modelChange",function(e){return n.jsonEditorModel=e}),s._uU(10,"\n      "),s.qZA(),s._uU(11,"\n\n      "),s._UZ(12,"hr"),s._uU(13,"\n      "),s.TgZ(14,"h3"),s._uU(15,"Model"),s.qZA(),s._uU(16,"\n      "),s.TgZ(17,"pre"),s._uU(18),s.ALo(19,"json"),s.qZA(),s._uU(20,"\n    "),s.qZA(),s._uU(21,"\n    "),s.TgZ(22,"ngx-tab",4),s._uU(23,"\n      "),s.TgZ(24,"ngx-button",5),s.NdJ("click",function(){return n.updateJsonEditorSchema(n._jsonEditorSchema)}),s._uU(25,"Update Schema"),s.qZA(),s._uU(26,"\n      "),s.TgZ(27,"ngx-codemirror",6),s.NdJ("ngModelChange",function(e){return n._jsonEditorSchema=e}),s.ALo(28,"json"),s.qZA(),s._uU(29,"\n    "),s.qZA(),s._uU(30,"\n  "),s.qZA(),s._uU(31,"\n\n  "),s.TgZ(32,"ngx-tabs"),s._uU(33,"\n    "),s.TgZ(34,"ngx-tab",7),s._uU(35,"\n      "),s.TgZ(36,"app-prism",8),s._uU(37,"\n        "),s._uU(38,'<ngx-json-editor [(model)]="jsonEditorModel" [schema]="jsonEditorSchema" label="Model"\n        [typeCheckOverrides]="typeOverrides" > </ngx-json-editor>'),s._uU(39,"\n      "),s.qZA(),s._uU(40,"\n    "),s.qZA(),s._uU(41,"\n    "),s.TgZ(42,"ngx-tab",9),s._uU(43,"\n      "),s.TgZ(44,"app-prism",10),s._uU(45,"\n        "),s._uU(46,"typeOverrides: any = { 'string=code': (value: any) => { if (typeof value !== 'string') { return false;\n        } const regex = new RegExp(/^<<(.*)>>$/, 's'); return regex.test(value); } };"),s._uU(47,"\n      "),s.qZA(),s._uU(48,"\n    "),s.qZA(),s._uU(49,"\n  "),s.qZA(),s._uU(50,"\n"),s.qZA(),s._uU(51,"\n\n"),s.TgZ(52,"ngx-section",1),s._uU(53,"\n  "),s.TgZ(54,"ngx-toggle",11),s.NdJ("ngModelChange",function(e){return n.hideRoot=e}),s._uU(55," "),s.qZA(),s._uU(56,"\n\n  "),s.TgZ(57,"ngx-toggle",12),s.NdJ("ngModelChange",function(e){return n.showKnownProperties=e}),s._uU(58," "),s.qZA(),s._uU(59,"\n\n  "),s.TgZ(60,"ngx-toggle",13),s.NdJ("ngModelChange",function(e){return n.passwordToggleEnabled=e}),s._uU(61," "),s.qZA(),s._uU(62,"\n\n  "),s.TgZ(63,"ngx-json-editor-flat",14),s.NdJ("modelChange",function(e){return n.jsonEditorModelFlat=e})("schemaUpdate",function(e){return n.modelschemaUpdate(e)}),s._uU(64,"\n  "),s.qZA(),s._uU(65,"\n\n  "),s._UZ(66,"hr"),s._uU(67,"\n  "),s.TgZ(68,"h3"),s._uU(69,"Model"),s.qZA(),s._uU(70,"\n  "),s.TgZ(71,"pre"),s._uU(72),s.ALo(73,"json"),s.qZA(),s._uU(74,"\n  "),s.TgZ(75,"h3"),s._uU(76,"Schema"),s.qZA(),s._uU(77,"\n  "),s.TgZ(78,"pre"),s._uU(79),s.ALo(80,"json"),s.qZA(),s._uU(81,"\n\n  "),s.TgZ(82,"ngx-tabs"),s._uU(83,"\n    "),s.TgZ(84,"ngx-tab",7),s._uU(85,"\n      "),s.TgZ(86,"app-prism",8),s._uU(87,"\n        "),s._uU(88,'<ngx-json-editor-flat [(model)]="jsonEditorModelFlat" [schema]="jsonEditorSchema" label="Model"\n        [typeCheckOverrides]="typeOverrides" [hideRoot]="hideRoot" [showKnownProperties]="showKnownProperties"\n        [passwordToggleEnabled]="showKnownProperties" (schemaUpdate)="modelschemaUpdate($event)">\n        </ngx-json-editor-flat>'),s._uU(89,"\n      "),s.qZA(),s._uU(90,"\n    "),s.qZA(),s._uU(91,"\n    "),s.TgZ(92,"ngx-tab",9),s._uU(93,"\n      "),s.TgZ(94,"app-prism",10),s._uU(95,"\n        "),s._uU(96,"typeOverrides: any = { 'string=code': (value: any) => { if (typeof value !== 'string') { return false;\n        } const regex = new RegExp(/^<<(.*)>>$/, 's'); return regex.test(value); } };"),s._uU(97,"\n      "),s.qZA(),s._uU(98,"\n    "),s.qZA(),s._uU(99,"\n  "),s.qZA(),s._uU(100,"\n"),s.qZA(),s._uU(101,"\n\n"),s.TgZ(102,"ngx-section",1),s._uU(103,"\n  "),s.TgZ(104,"section"),s._uU(105,"\n    This component exposes the below variables to the template:\n    "),s.TgZ(106,"ul"),s._uU(107,"\n      "),s.TgZ(108,"li"),s.TgZ(109,"b"),s._uU(110,"nodeModel: "),s.qZA(),s._uU(111,"the model of the current node"),s.qZA(),s._uU(112,"\n      "),s.TgZ(113,"li"),s.TgZ(114,"b"),s._uU(115,"nodeSchema: "),s.qZA(),s._uU(116,"the schema of the current node"),s.qZA(),s._uU(117,"\n      "),s.TgZ(118,"li"),s.TgZ(119,"b"),s._uU(120,"nodeContext: "),s.qZA(),s._uU(121,"an object of JSONEditorTemplateProperty type that has some information about the current node"),s.qZA(),s._uU(122,"\n      "),s.TgZ(123,"li"),s.TgZ(124,"b"),s._uU(125,"nodePath: "),s.qZA(),s._uU(126,"the path of the current node (the root property does not have path)"),s.qZA(),s._uU(127,"\n      "),s.TgZ(128,"li"),s.TgZ(129,"b"),s._uU(130,"nodeChangeValue$: "),s.qZA(),s._uU(131,"subject that is used to update the model of the current node"),s.qZA(),s._uU(132,"\n      "),s.TgZ(133,"li"),s.TgZ(134,"b"),s._uU(135,"nodeExpandTrigger$: "),s.qZA(),s._uU(136,"subject that is used to collapse/expand the current node"),s.qZA(),s._uU(137,"\n    "),s.qZA(),s._uU(138,"\n  "),s.qZA(),s._uU(139,"\n  "),s.TgZ(140,"ngx-json-editor-flat",15),s.NdJ("modelChange",function(e){return n.jsonEditorFlatWithTemplateModel=e})("schemaUpdate",function(e){return n.schemaWithTemplate=e}),s._uU(141,"\n  "),s.qZA(),s._uU(142,"\n\n  "),s.YNc(143,h,40,14,"ng-template",null,16,s.W1O),s._uU(145,"\n\n  "),s._UZ(146,"hr"),s._uU(147,"\n  "),s.TgZ(148,"h3"),s._uU(149,"Model"),s.qZA(),s._uU(150,"\n  "),s.TgZ(151,"pre"),s._uU(152),s.ALo(153,"json"),s.qZA(),s._uU(154,"\n  "),s.TgZ(155,"h3"),s._uU(156,"Schema"),s.qZA(),s._uU(157,"\n  "),s.TgZ(158,"pre"),s._uU(159),s.ALo(160,"json"),s.qZA(),s._uU(161,"\n\n  "),s.TgZ(162,"ngx-tabs"),s._uU(163,"\n    "),s.TgZ(164,"ngx-tab",7),s._uU(165,"\n      "),s.TgZ(166,"app-prism",8),s._uU(167,"\n      "),s._uU(168),s._uU(169,"\n      "),s.qZA(),s._uU(170,"\n    "),s.qZA(),s._uU(171,"\n  "),s.qZA(),s._uU(172,"\n"),s.qZA(),s._uU(173,"\n\n"),s.TgZ(174,"ngx-section",1),s._uU(175,"\n  "),s.TgZ(176,"ngx-json-editor-flat",17),s.NdJ("modelChange",function(e){return n.jsonEditorSchemaBuilderModel=e})("schemaUpdate",function(e){return n.schemaUpdate(e)}),s._uU(177,"\n  "),s.qZA(),s._uU(178,"\n  "),s._UZ(179,"hr"),s._uU(180,"\n  "),s.TgZ(181,"h3"),s._uU(182,"Schema"),s.qZA(),s._uU(183,"\n  "),s.TgZ(184,"pre"),s._uU(185),s.ALo(186,"json"),s.qZA(),s._uU(187,"\n\n  "),s.TgZ(188,"ngx-tabs"),s._uU(189,"\n    "),s.TgZ(190,"ngx-tab",7),s._uU(191,"\n      "),s.TgZ(192,"app-prism",8),s._uU(193,"\n        "),s._uU(194,'<ngx-json-editor-flat [(model)]="jsonEditorSchemaBuilderModel" [schema]="{}" label="Schema"\n        [typeCheckOverrides]="typeOverrides" [schemaBuilderMode]="true" [formats]="customFormats"\n        (schemaUpdate)="schemaUpdate($event)"> </ngx-json-editor-flat>'),s._uU(195,"\n      "),s.qZA(),s._uU(196,"\n    "),s.qZA(),s._uU(197,"\n    "),s.TgZ(198,"ngx-tab",9),s._uU(199,"\n      "),s.TgZ(200,"app-prism",10),s._uU(201,"\n        "),s._uU(202,"typeOverrides: any = { 'string=code': (value: any) => { if (typeof value !== 'string') { return false;\n        } const regex = new RegExp(/^<<(.*)>>$/, 's'); return regex.test(value); } };"),s._uU(203,"\n      "),s.qZA(),s._uU(204,"\n    "),s.qZA(),s._uU(205,"\n  "),s.qZA(),s._uU(206,"\n"),s.qZA(),s._uU(207,"\n")),2&e){const e=s.MAs(144);s.xp6(3),s.Q6J("sectionTitle","JSON Editor"),s.xp6(6),s.Q6J("model",n.jsonEditorModel)("schema",n.jsonEditorSchema)("typeCheckOverrides",n.typeOverrides),s.xp6(9),s.Oqu(s.lcZ(19,37,n.jsonEditorModel)),s.xp6(9),s.Q6J("ngModel",s.lcZ(28,39,n.jsonEditorSchema)),s.xp6(25),s.Q6J("sectionTitle","ngx-json-editor-flat"),s.xp6(2),s.Q6J("ngModel",n.hideRoot),s.xp6(3),s.Q6J("ngModel",n.showKnownProperties),s.xp6(3),s.Q6J("ngModel",n.passwordToggleEnabled),s.xp6(3),s.Q6J("model",n.jsonEditorModelFlat)("schema",n.jsonEditorSchema)("typeCheckOverrides",n.typeOverrides)("hideRoot",n.hideRoot)("showKnownProperties",n.showKnownProperties)("passwordToggleEnabled",n.passwordToggleEnabled),s.xp6(9),s.Oqu(s.lcZ(73,41,n.jsonEditorModelFlat)),s.xp6(7),s.Oqu(s.lcZ(80,43,n.modelSchemaRef)),s.xp6(23),s.Q6J("sectionTitle","ngx-json-editor-flat with custom template for input control"),s.xp6(38),s.Q6J("model",n.jsonEditorFlatWithTemplateModel)("schema",n.schemaWithTemplate)("hideRoot",n.hideRoot)("showKnownProperties",n.showKnownProperties)("passwordToggleEnabled",!0)("inputControlTemplate",e)("enableSchemaValidation",!1),s.xp6(12),s.Oqu(s.lcZ(153,45,n.jsonEditorFlatWithTemplateModel)),s.xp6(7),s.Oqu(s.lcZ(160,47,n.schemaWithTemplate)),s.xp6(9),s.hij('<ngx-json-editor-flat\n        [(model)]="jsonEditorFlatWithTemplateModel"\n        [schema]="schemaWithTemplate"\n        label="Model"\n        [hideRoot]="hideRoot"\n        [showKnownProperties]="showKnownProperties"\n        [passwordToggleEnabled]="true"\n        [inputControlTemplate]="myInputControl"\n        [enableSchemaValidation]="false"\n        (schemaUpdate)="schemaWithTemplate = $event"\n      >\n      </ngx-json-editor-flat>\n      <ng-template #myInputControl let-nodeModel="nodeModel" let-nodeSchema="nodeSchema" let-nodePath="nodePath" let-nodeExpandTrigger$="nodeExpandTrigger$" let-nodeChangeValue$="nodeChangeValue$" let-nodeContext="nodeContext">\n        <div class="myInputControlNodeContainer">\n          <ngx-tabs>\n            <ngx-tab label="Value">\n              <ng-container [ngSwitch]="nodeContext.keyFieldType">\n                <input type="number" *ngSwitchCase="\'integer\'" [ngModel]="nodeModel" (ngModelChange)="nodeChangeValue$.next($event)"/>\n                <input type="text" *ngSwitchCase="\'string\'" [ngModel]="nodeModel" (ngModelChange)="nodeChangeValue$.next($event)"/>\n                <ngx-button *ngSwitchCase="\'object\'" class="btn btn-primary" (click)="expanded = !expanded; nodeExpandTrigger$.next(expanded)">',n.expanded?"Collapse":"Expand",' me!</ngx-button>\n              </ng-container>\n            </ngx-tab>\n            <ngx-tab label="NodeModel">\n              <div class="myInputControlNodeContainer__scrollable">\n              </div>\n            </ngx-tab>\n            <ngx-tab label="NodeSchema">\n              <div class="myInputControlNodeContainer__scrollable">\n              </div>\n            </ngx-tab>\n            <ngx-tab label="NodeContext">\n            </ngx-tab>\n            <ngx-tab label="NodePath">\n            </ngx-tab>\n          </ngx-tabs>\n        </div>\n        \n      </ng-template>\n      '),s.xp6(6),s.Q6J("sectionTitle","Schema Builder Mode"),s.xp6(2),s.Q6J("model",n.jsonEditorSchemaBuilderModel)("schema",s.DdM(51,c))("hideRoot",!0)("typeCheckOverrides",n.typeOverrides)("schemaBuilderMode",!0)("formats",n.customFormats),s.xp6(9),s.Oqu(s.lcZ(186,49,n.schemaRef))}},directives:[d.e0w,d.n4f,d.idV,d.TOI,d.r0F,d.wIv,a.JJ,a.On,l.U,d.n$2,d.NMg,o.RF,o.n9,a.wV,a.Fj],pipes:[o.Ts],styles:[".myInputControlNodeContainer[_ngcontent-%COMP%]{height:90px;width:100%;position:relative;display:inline-block}.myInputControlNodeContainer__scrollable[_ngcontent-%COMP%]{position:absolute;width:100%;height:50%;overflow:auto;padding-bottom:10px}"],changeDetection:0}),e})()}];let U=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=s.oAB({type:e}),e.\u0275inj=s.cJS({imports:[[r.Bz.forChild(m)],r.Bz]}),e})(),_=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=s.oAB({type:e}),e.\u0275inj=s.cJS({imports:[[o.ez,a.u5,i.F,d.HNi,d._xO,d.P4_,d.Suy,d.vmb,d.Y05,d.hJ1,U]]}),e})()}}]);