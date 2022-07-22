"use strict";(self.webpackChunkngx_ui=self.webpackChunkngx_ui||[]).push([[911],{30911:function(n,e,r){r.r(e),r.d(e,{ColorsPageModule:function(){return hn}});var t=r(38583),o=r(29421),i=r(39813);function l(n,e,r){n.prototype=e.prototype=r,r.constructor=n}function a(n,e){var r=Object.create(n.prototype);for(var t in e)r[t]=e[t];return r}function u(){}var s=.7,c=1/s,g="\\s*([+-]?\\d+)\\s*",h="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",d="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",p=/^#([0-9a-f]{3,8})$/,f=new RegExp(`^rgb\\(${g},${g},${g}\\)$`),_=new RegExp(`^rgb\\(${d},${d},${d}\\)$`),U=new RegExp(`^rgba\\(${g},${g},${g},${h}\\)$`),Z=new RegExp(`^rgba\\(${d},${d},${d},${h}\\)$`),m=new RegExp(`^hsl\\(${h},${d},${d}\\)$`),x=new RegExp(`^hsla\\(${h},${d},${d},${h}\\)$`),b={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};function A(){return this.rgb().formatHex()}function w(){return this.rgb().formatRgb()}function F(n){var e,r;return n=(n+"").trim().toLowerCase(),(e=p.exec(n))?(r=e[1].length,e=parseInt(e[1],16),6===r?y(e):3===r?new C(e>>8&15|e>>4&240,e>>4&15|240&e,(15&e)<<4|15&e,1):8===r?q(e>>24&255,e>>16&255,e>>8&255,(255&e)/255):4===r?q(e>>12&15|e>>8&240,e>>8&15|e>>4&240,e>>4&15|240&e,((15&e)<<4|15&e)/255):null):(e=f.exec(n))?new C(e[1],e[2],e[3],1):(e=_.exec(n))?new C(255*e[1]/100,255*e[2]/100,255*e[3]/100,1):(e=U.exec(n))?q(e[1],e[2],e[3],e[4]):(e=Z.exec(n))?q(255*e[1]/100,255*e[2]/100,255*e[3]/100,e[4]):(e=m.exec(n))?D(e[1],e[2]/100,e[3]/100,1):(e=x.exec(n))?D(e[1],e[2]/100,e[3]/100,e[4]):b.hasOwnProperty(n)?y(b[n]):"transparent"===n?new C(NaN,NaN,NaN,0):null}function y(n){return new C(n>>16&255,n>>8&255,255&n,1)}function q(n,e,r,t){return t<=0&&(n=e=r=NaN),new C(n,e,r,t)}function $(n){return n instanceof u||(n=F(n)),n?new C((n=n.rgb()).r,n.g,n.b,n.opacity):new C}function T(n,e,r,t){return 1===arguments.length?$(n):new C(n,e,r,null==t?1:t)}function C(n,e,r,t){this.r=+n,this.g=+e,this.b=+r,this.opacity=+t}function v(){return`#${E(this.r)}${E(this.g)}${E(this.b)}`}function k(){const n=N(this.opacity);return`${1===n?"rgb(":"rgba("}${M(this.r)}, ${M(this.g)}, ${M(this.b)}${1===n?")":`, ${n})`}`}function N(n){return isNaN(n)?1:Math.max(0,Math.min(1,n))}function M(n){return Math.max(0,Math.min(255,Math.round(n)||0))}function E(n){return((n=M(n))<16?"0":"")+n.toString(16)}function D(n,e,r,t){return t<=0?n=e=r=NaN:r<=0||r>=1?n=e=NaN:e<=0&&(n=NaN),new J(n,e,r,t)}function O(n){if(n instanceof J)return new J(n.h,n.s,n.l,n.opacity);if(n instanceof u||(n=F(n)),!n)return new J;if(n instanceof J)return n;var e=(n=n.rgb()).r/255,r=n.g/255,t=n.b/255,o=Math.min(e,r,t),i=Math.max(e,r,t),l=NaN,a=i-o,s=(i+o)/2;return a?(l=e===i?(r-t)/a+6*(r<t):r===i?(t-e)/a+2:(e-r)/a+4,a/=s<.5?i+o:2-i-o,l*=60):a=s>0&&s<1?0:l,new J(l,a,s,n.opacity)}function J(n,e,r,t){this.h=+n,this.s=+e,this.l=+r,this.opacity=+t}function B(n){return(n=(n||0)%360)<0?n+360:n}function Q(n){return Math.max(0,Math.min(1,n||0))}function H(n,e,r){return 255*(n<60?e+(r-e)*n/60:n<180?r:n<240?e+(r-e)*(240-n)/60:e)}l(u,F,{copy(n){return Object.assign(new this.constructor,this,n)},displayable(){return this.rgb().displayable()},hex:A,formatHex:A,formatHex8:function(){return this.rgb().formatHex8()},formatHsl:function(){return O(this).formatHsl()},formatRgb:w,toString:w}),l(C,T,a(u,{brighter(n){return n=null==n?c:Math.pow(c,n),new C(this.r*n,this.g*n,this.b*n,this.opacity)},darker(n){return n=null==n?s:Math.pow(s,n),new C(this.r*n,this.g*n,this.b*n,this.opacity)},rgb(){return this},clamp(){return new C(M(this.r),M(this.g),M(this.b),N(this.opacity))},displayable(){return-.5<=this.r&&this.r<255.5&&-.5<=this.g&&this.g<255.5&&-.5<=this.b&&this.b<255.5&&0<=this.opacity&&this.opacity<=1},hex:v,formatHex:v,formatHex8:function(){return`#${E(this.r)}${E(this.g)}${E(this.b)}${E(255*(isNaN(this.opacity)?1:this.opacity))}`},formatRgb:k,toString:k})),l(J,function(n,e,r,t){return 1===arguments.length?O(n):new J(n,e,r,null==t?1:t)},a(u,{brighter(n){return n=null==n?c:Math.pow(c,n),new J(this.h,this.s,this.l*n,this.opacity)},darker(n){return n=null==n?s:Math.pow(s,n),new J(this.h,this.s,this.l*n,this.opacity)},rgb(){var n=this.h%360+360*(this.h<0),e=isNaN(n)||isNaN(this.s)?0:this.s,r=this.l,t=r+(r<.5?r:1-r)*e,o=2*r-t;return new C(H(n>=240?n-240:n+120,o,t),H(n,o,t),H(n<120?n+240:n-120,o,t),this.opacity)},clamp(){return new J(B(this.h),Q(this.s),Q(this.l),N(this.opacity))},displayable(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1},formatHsl(){const n=N(this.opacity);return`${1===n?"hsl(":"hsla("}${B(this.h)}, ${100*Q(this.s)}%, ${100*Q(this.l)}%${1===n?")":`, ${n})`}`}}));var L=r(37716),S=r(55197);function Y(n,e){if(1&n&&(L.TgZ(0,"li",null,19),L._uU(2,"\n        "),L.TgZ(3,"span",20),L._uU(4," "),L.qZA(),L._uU(5,"\n        "),L.TgZ(6,"span",20),L._uU(7," "),L.qZA(),L._uU(8,"\n      "),L.qZA()),2&n){const n=e.$implicit,r=L.MAs(1),t=L.oxw().$implicit,o=L.oxw();L.MT6("color color-",t,"-",n,"00"),L.xp6(3),L.Q6J("innerHTML","$color-"+t+"-"+n+"00",L.oJD),L.xp6(3),L.Q6J("innerHTML",o.getBackgroundColor(r),L.oJD)}}const R=function(){return[1,2,3,4,5,6,7,8,9]};function j(n,e){if(1&n&&(L.TgZ(0,"div",4),L._uU(1,"\n    "),L.TgZ(2,"ul",5),L._uU(3,"\n      "),L.TgZ(4,"li"),L._uU(5),L.qZA(),L._uU(6,"\n      "),L.YNc(7,Y,9,6,"li",18),L._uU(8,"\n    "),L.qZA(),L._uU(9,"\n  "),L.qZA()),2&n){const n=e.$implicit;L.xp6(4),L.Gre("color main-color color-",n,"-500"),L.xp6(1),L.hij("$color-",n,""),L.xp6(2),L.Q6J("ngForOf",L.DdM(5,R))}}function I(n,e){if(1&n&&(L.TgZ(0,"li",null,19),L._uU(2,"\n        "),L.TgZ(3,"span",20),L._uU(4," "),L.qZA(),L._uU(5,"\n        "),L.TgZ(6,"span",20),L._uU(7," "),L.qZA(),L._uU(8,"\n      "),L.qZA()),2&n){const n=e.$implicit,r=L.MAs(1),t=L.oxw().$implicit,o=L.oxw();L.MT6("color color-",t,"-",n,""),L.xp6(3),L.Q6J("innerHTML","$color-"+t+"-"+n,L.oJD),L.xp6(3),L.Q6J("innerHTML",o.getBackgroundColor(r),L.oJD)}}const P=function(){return["050",100,150,200,250,300,350,400,450,500,550,600,650,700,725,750,775,800,825,850,875,900]};function G(n,e){if(1&n&&(L.TgZ(0,"div",4),L._uU(1,"\n    "),L.TgZ(2,"ul",5),L._uU(3,"\n      "),L.TgZ(4,"li"),L._uU(5),L.qZA(),L._uU(6,"\n      "),L.YNc(7,I,9,6,"li",18),L._uU(8,"\n    "),L.qZA(),L._uU(9,"\n  "),L.qZA()),2&n){const n=e.$implicit;L.xp6(4),L.Gre("color main-color color-",n,"-500"),L.xp6(1),L.hij("$color-",n,""),L.xp6(2),L.Q6J("ngForOf",L.DdM(5,P))}}function V(n,e){1&n&&(L.TgZ(0,"span",8),L._uU(1,"Linear"),L.qZA())}function z(n,e){if(1&n&&(L.TgZ(0,"li",21),L._uU(1,"\n        "),L.YNc(2,V,2,0,"span",22),L._uU(3,"\n        "),L._UZ(4,"br"),L._uU(5,"\n        "),L.TgZ(6,"span",9),L._uU(7),L.qZA(),L._uU(8,"\n      "),L.qZA()),2&n){const n=e.$implicit,r=e.index;L.Gre("color main-color ",n,""),L.xp6(2),L.Q6J("ngIf",0===r),L.xp6(5),L.hij("$",n,"")}}function K(n,e){if(1&n&&(L.TgZ(0,"span",27),L._uU(1),L._UZ(2,"br"),L._uU(3,"\n        "),L.qZA()),2&n){const n=L.oxw(2).$implicit;L.xp6(1),L.hij("",n.name,"\n          ")}}const X=function(n){return{"main-color":n}};function W(n,e){if(1&n&&(L.TgZ(0,"li",24),L._uU(1,"\n        "),L.YNc(2,K,4,1,"span",25),L._uU(3,"\n        "),L.TgZ(4,"span",26),L._uU(5," "),L.qZA(),L._uU(6,"\n      "),L.qZA()),2&n){const n=e.$implicit,r=e.index;L.Udp("background",n),L.Q6J("ngClass",L.VKq(5,X,0===r)),L.xp6(2),L.Q6J("ngIf",0===r),L.xp6(2),L.Q6J("innerHTML",n,L.oJD)}}function nn(n,e){if(1&n&&(L.TgZ(0,"div",4),L._uU(1,"\n    "),L.TgZ(2,"ul",5),L._uU(3,"\n      "),L.YNc(4,W,7,7,"li",23),L._uU(5,"\n    "),L.qZA(),L._uU(6,"\n  "),L.qZA()),2&n){const n=e.$implicit;L.xp6(4),L.Q6J("ngForOf",n.colors)}}function en(n,e){if(1&n&&(L.TgZ(0,"span",27),L._uU(1),L._UZ(2,"br"),L._uU(3,"\n        "),L.qZA()),2&n){const n=L.oxw(2).$implicit;L.xp6(1),L.hij("",n.name,"\n          ")}}function rn(n,e){if(1&n&&(L.TgZ(0,"li",24),L._uU(1,"\n        "),L.YNc(2,en,4,1,"span",25),L._uU(3,"\n        "),L.TgZ(4,"span",26),L._uU(5," "),L.qZA(),L._uU(6,"\n      "),L.qZA()),2&n){const n=e.$implicit,r=e.index;L.Udp("background",n),L.Q6J("ngClass",L.VKq(5,X,0===r)),L.xp6(2),L.Q6J("ngIf",0===r),L.xp6(2),L.Q6J("innerHTML",n,L.oJD)}}function tn(n,e){if(1&n&&(L.TgZ(0,"div",4),L._uU(1,"\n    "),L.TgZ(2,"ul",5),L._uU(3,"\n      "),L.YNc(4,rn,7,7,"li",23),L._uU(5,"\n    "),L.qZA(),L._uU(6,"\n  "),L.qZA()),2&n){const n=e.$implicit;L.xp6(4),L.Q6J("ngForOf",n.colors)}}function on(n,e){if(1&n&&(L.TgZ(0,"div",30),L._uU(1),L.qZA()),2&n){const n=e.$implicit,r=L.oxw().$implicit;L.MT6("glow-demo glow-",r,"-",n,"00"),L.xp6(1),L.AsE("\n      .glow-",r,"-",n,"00\n    ")}}function ln(n,e){1&n&&(L.TgZ(0,"div",28),L._uU(1,"\n    "),L.YNc(2,on,2,6,"div",29),L._uU(3,"\n  "),L.qZA()),2&n&&(L.xp6(2),L.Q6J("ngForOf",L.DdM(1,R)))}function an(n,e){if(1&n&&(L.TgZ(0,"div",16),L._uU(1,"\n    "),L.TgZ(2,"div",30),L._uU(3),L.qZA(),L._uU(4,"\n  "),L.qZA()),2&n){const n=e.$implicit;L.xp6(2),L.Gre("shadow-demo shadow-",n,""),L.xp6(1),L.hij("$shadow-",n,"")}}const un=function(){return["blue","light-blue","green","orange","red","purple"]},sn=function(){return["blue-grey","grey"]},cn=[{path:"",component:(()=>{class n{constructor(){this.chartColorsOrdinal=[{name:"Vivid",colors:["#62CD8C","#3D4EB4","#1594F2","#00B965","#B7DF3F","#99B726","#F4E667","#FF990D","#FF5821","#D24018"]},{name:"Natural",colors:["#C09E77","#EA9551","#D9A05B","#F2E0A8","#F2E0A8","#A4D7C6","#7693B1","#AFAFAF","#707160","#D9D5C3"]},{name:"Cool",colors:["#ACCCED","#A9E3F5","#7CD2ED","#4DAACC","#79A2E4","#8695BF","#A27DA7","#AE6785","#AA5963","#A9375C"]},{name:"Fire",colors:["#FF3E00","#C0370A","#FF900B","#FF7002","#FF3E00","#FF5821","#E75200","#FFCC31","#FFAC12","#FF7002"]}],this.chartColorsSequential=[{name:"Solar",colors:["#FFF8E1","#FFEDB4","#FFE184","#FFD654","#FFCC31","#FFC31B","#FFB414","#FFA10F","#FF900B","#FF7002"]},{name:"Air",colors:["#E1F5FE","#B2E5FC","#7FD3F9","#4AC2F6","#1EB5F5","#00A7F3","#0099E4","#0086D0","#0075BC","#00559A"]},{name:"Aqua",colors:["#E0F7FA","#B1EBF2","#7EDEEA","#48D0E1","#1AC6DA","#00BBD4","#00ACC1","#0097A7","#00838F","#006064"]}],this.gradients=["gradient-blue","gradient-blue-green","gradient-blue-red","gradient-blue-purple","gradient-red-orange","gradient-orange-purple"],this.shadows=[];let n=1;for(;n<=24;)this.shadows.push(n++)}getBackgroundColor(n){return function(n){return(n=(n=(n=T(n).toString()).match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i))&&4===n.length?"#"+("0"+parseInt(n[1],10).toString(16)).slice(-2)+("0"+parseInt(n[2],10).toString(16)).slice(-2)+("0"+parseInt(n[3],10).toString(16)).slice(-2):"").toUpperCase()}(function(n,e){let r=n.ownerDocument.defaultView;(!r||!r.opener)&&(r=window);const t=r.getComputedStyle(n);return t.getPropertyValue(e)||t[e]}(n,"background-color"))}}return n.\u0275fac=function(e){return new(e||n)},n.\u0275cmp=L.Xpm({type:n,selectors:[["app-colors-page"]],decls:119,vars:10,consts:[[1,"style-header"],[1,"ngx-flex--row"],["class","ngx-flex--col-12 ngx-flex--col-md-6 ngx-flex--col-lg-4 ngx-flex--col-xl-3",4,"ngFor","ngForOf"],[1,"ngx-flex--row","start"],[1,"ngx-flex--col-12","ngx-flex--col-md-6","ngx-flex--col-lg-4","ngx-flex--col-xl-3"],[1,"color-group","shadow-2","shadow-fx","list-reset"],["style","border-top: solid 1px #fff;",3,"class",4,"ngFor","ngForOf"],[1,"color","main-color","bg-linear-1"],[1,"name","u-floatLeft",2,"color","white"],["dbl-click-copy","",1,"hex","tag","tag-small","u-floatRight"],[1,"color","main-color","bg-linear-2",2,"border-top","solid 1px #fff"],[1,"color","main-color","bg-radial-1"],[1,"color","main-color","bg-radial-2",2,"border-top","solid 1px #fff"],["language","css"],["class","ngx-flex--col-2",4,"ngFor","ngForOf"],["class","ngx-flex--col-2 center",4,"ngFor","ngForOf"],[1,"ngx-flex--col-2","center"],[1,"shadow-demo","shadow-10","shadow-fx"],[3,"class",4,"ngFor","ngForOf"],["swatch",""],["dbl-click-copy","",1,"hex","tag","tag-small",3,"innerHTML"],[2,"border-top","solid 1px #fff"],["class","name u-floatLeft","style","color: white;",4,"ngIf"],["class","color",3,"background","ngClass",4,"ngFor","ngForOf"],[1,"color",3,"ngClass"],["class","name u-floatLeft",4,"ngIf"],["dbl-click-copy","",1,"hex","tag","tag-small","u-floatRight",3,"innerHTML"],[1,"name","u-floatLeft"],[1,"ngx-flex--col-2"],["dbl-click-copy","",3,"class",4,"ngFor","ngForOf"],["dbl-click-copy",""]],template:function(n,e){1&n&&(L.TgZ(0,"h3",0),L._uU(1,"Colors: Hues"),L.qZA(),L._uU(2,"\n"),L.TgZ(3,"div",1),L._uU(4,"\n  "),L.YNc(5,j,10,6,"div",2),L._uU(6,"\n"),L.qZA(),L._uU(7,"\n\n"),L.TgZ(8,"h3",0),L._uU(9,"Colors: Greys"),L.qZA(),L._uU(10,"\n"),L.TgZ(11,"div",3),L._uU(12,"\n  "),L.YNc(13,G,10,6,"div",2),L._uU(14,"\n"),L.qZA(),L._uU(15,"\n\n"),L.TgZ(16,"h3",0),L._uU(17,"Colors: Gradients"),L.qZA(),L._uU(18,"\n"),L.TgZ(19,"div",1),L._uU(20,"\n  "),L.TgZ(21,"div",4),L._uU(22,"\n    "),L.TgZ(23,"ul",5),L._uU(24,"\n      "),L.YNc(25,z,9,5,"li",6),L._uU(26,"\n    "),L.qZA(),L._uU(27,"\n  "),L.qZA(),L._uU(28,"\n  "),L.TgZ(29,"div",4),L._uU(30,"\n    "),L.TgZ(31,"ul",5),L._uU(32,"\n      "),L.TgZ(33,"li",7),L._uU(34,"\n        "),L.TgZ(35,"span",8),L._uU(36,"Bg Linear"),L.qZA(),L._uU(37,"\n        "),L._UZ(38,"br"),L._uU(39,"\n        "),L.TgZ(40,"span",9),L._uU(41,"$bg-linear-1"),L.qZA(),L._uU(42,"\n      "),L.qZA(),L._uU(43,"\n      "),L.TgZ(44,"li",10),L._uU(45,"\n        "),L.TgZ(46,"span",9),L._uU(47,"$bg-linear-2"),L.qZA(),L._uU(48,"\n      "),L.qZA(),L._uU(49,"\n    "),L.qZA(),L._uU(50,"\n  "),L.qZA(),L._uU(51,"\n  "),L.TgZ(52,"div",4),L._uU(53,"\n    "),L.TgZ(54,"ul",5),L._uU(55,"\n      "),L.TgZ(56,"li",11),L._uU(57,"\n        "),L.TgZ(58,"span",8),L._uU(59,"Bg Radial"),L.qZA(),L._uU(60,"\n        "),L._UZ(61,"br"),L._uU(62,"\n        "),L.TgZ(63,"span",9),L._uU(64,"$bg-radial-1"),L.qZA(),L._uU(65,"\n      "),L.qZA(),L._uU(66,"\n      "),L.TgZ(67,"li",12),L._uU(68,"\n        "),L.TgZ(69,"span",9),L._uU(70,"$bg-radial-2"),L.qZA(),L._uU(71,"\n      "),L.qZA(),L._uU(72,"\n    "),L.qZA(),L._uU(73,"\n  "),L.qZA(),L._uU(74,"\n"),L.qZA(),L._uU(75,"\n\n"),L.TgZ(76,"h3",0),L._uU(77,"Colors: Ordinal Charts"),L.qZA(),L._uU(78,"\n"),L.TgZ(79,"div",1),L._uU(80,"\n  "),L.YNc(81,nn,7,1,"div",2),L._uU(82,"\n"),L.qZA(),L._uU(83,"\n\n"),L.TgZ(84,"h3",0),L._uU(85,"Colors: Sequential Charts"),L.qZA(),L._uU(86,"\n"),L.TgZ(87,"div",1),L._uU(88,"\n  "),L.YNc(89,tn,7,1,"div",2),L._uU(90,"\n"),L.qZA(),L._uU(91,"\n\n"),L.TgZ(92,"h3",0),L._uU(93,"Colors: Borders and Glows"),L.qZA(),L._uU(94,"\nApply the class to an element to give it a glowing border. Alternatively, you can use the glow mixin in any class:\n"),L.TgZ(95,"app-prism",13),L._uU(96,"\n"),L._uU(97," .my-class { @include glow($color); }\n"),L._uU(98,"\n"),L.qZA(),L._uU(99,"\n"),L.TgZ(100,"div",1),L._uU(101,"\n  "),L.YNc(102,ln,4,2,"div",14),L._uU(103,"\n"),L.qZA(),L._uU(104,"\n\n"),L.TgZ(105,"h3",0),L._uU(106,"Colors: Shadows"),L.qZA(),L._uU(107,"\n"),L.TgZ(108,"div",1),L._uU(109,"\n  "),L.YNc(110,an,5,4,"div",15),L._uU(111,"\n  "),L.TgZ(112,"div",16),L._uU(113,"\n    "),L.TgZ(114,"div",17),L._uU(115,"\n      shadow-fx\n    "),L.qZA(),L._uU(116,"\n  "),L.qZA(),L._uU(117,"\n"),L.qZA(),L._uU(118,"\n")),2&n&&(L.xp6(5),L.Q6J("ngForOf",L.DdM(7,un)),L.xp6(8),L.Q6J("ngForOf",L.DdM(8,sn)),L.xp6(12),L.Q6J("ngForOf",e.gradients),L.xp6(56),L.Q6J("ngForOf",e.chartColorsOrdinal),L.xp6(8),L.Q6J("ngForOf",e.chartColorsSequential),L.xp6(13),L.Q6J("ngForOf",L.DdM(9,un)),L.xp6(8),L.Q6J("ngForOf",e.shadows))},directives:[t.sg,S.U,t.O5,t.mk],styles:[".color-group[_ngcontent-%COMP%]{width:250px}.color-group[_ngcontent-%COMP%]   .main-color[_ngcontent-%COMP%]{height:70px}.color-group[_ngcontent-%COMP%]   .color[_ngcontent-%COMP%]{padding:15px 10px}.shadow-demo[_ngcontent-%COMP%]{height:120px;margin:15px;text-align:center;line-height:120px}"]}),n})()}];let gn=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=L.oAB({type:n}),n.\u0275inj=L.cJS({imports:[[i.Bz.forChild(cn)],i.Bz]}),n})(),hn=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=L.oAB({type:n}),n.\u0275inj=L.cJS({imports:[[t.ez,o.F,gn]]}),n})()}}]);