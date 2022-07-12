!function(){"use strict";function n(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}function e(n,e){for(var r=0;r<e.length;r++){var i=e[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(n,i.key,i)}}function r(n,r,i){return r&&e(n.prototype,r),i&&e(n,i),Object.defineProperty(n,"prototype",{writable:!1}),n}(self.webpackChunkngx_ui=self.webpackChunkngx_ui||[]).push([[5361],{15361:function(e,i,o){o.r(i),o.d(i,{ColorsPageModule:function(){return cn}});var t=o(38583),a=o(29421),l=o(39813);function u(n,e,r){n.prototype=e.prototype=r,r.constructor=n}function s(n,e){var r=Object.create(n.prototype);for(var i in e)r[i]=e[i];return r}function g(){}var c=.7,h=1/c,d="\\s*([+-]?\\d+)\\s*",p="\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",f="\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",_=/^#([0-9a-f]{3,8})$/,U=new RegExp("^rgb\\("+[d,d,d]+"\\)$"),m=new RegExp("^rgb\\("+[f,f,f]+"\\)$"),Z=new RegExp("^rgba\\("+[d,d,d,p]+"\\)$"),x=new RegExp("^rgba\\("+[f,f,f,p]+"\\)$"),b=new RegExp("^hsl\\("+[p,f,f]+"\\)$"),w=new RegExp("^hsla\\("+[p,f,f,p]+"\\)$"),A={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};function F(){return this.rgb().formatHex()}function y(){return this.rgb().formatRgb()}function v(n){var e,r;return n=(n+"").trim().toLowerCase(),(e=_.exec(n))?(r=e[1].length,e=parseInt(e[1],16),6===r?q(e):3===r?new M(e>>8&15|e>>4&240,e>>4&15|240&e,(15&e)<<4|15&e,1):8===r?T(e>>24&255,e>>16&255,e>>8&255,(255&e)/255):4===r?T(e>>12&15|e>>8&240,e>>8&15|e>>4&240,e>>4&15|240&e,((15&e)<<4|15&e)/255):null):(e=U.exec(n))?new M(e[1],e[2],e[3],1):(e=m.exec(n))?new M(255*e[1]/100,255*e[2]/100,255*e[3]/100,1):(e=Z.exec(n))?T(e[1],e[2],e[3],e[4]):(e=x.exec(n))?T(255*e[1]/100,255*e[2]/100,255*e[3]/100,e[4]):(e=b.exec(n))?O(e[1],e[2]/100,e[3]/100,1):(e=w.exec(n))?O(e[1],e[2]/100,e[3]/100,e[4]):A.hasOwnProperty(n)?q(A[n]):"transparent"===n?new M(NaN,NaN,NaN,0):null}function q(n){return new M(n>>16&255,n>>8&255,255&n,1)}function T(n,e,r,i){return i<=0&&(n=e=r=NaN),new M(n,e,r,i)}function C(n){return n instanceof g||(n=v(n)),n?new M((n=n.rgb()).r,n.g,n.b,n.opacity):new M}function k(n,e,r,i){return 1===arguments.length?C(n):new M(n,e,r,null==i?1:i)}function M(n,e,r,i){this.r=+n,this.g=+e,this.b=+r,this.opacity=+i}function N(){return"#"+D(this.r)+D(this.g)+D(this.b)}function E(){var n=this.opacity;return(1===(n=isNaN(n)?1:Math.max(0,Math.min(1,n)))?"rgb(":"rgba(")+Math.max(0,Math.min(255,Math.round(this.r)||0))+", "+Math.max(0,Math.min(255,Math.round(this.g)||0))+", "+Math.max(0,Math.min(255,Math.round(this.b)||0))+(1===n?")":", "+n+")")}function D(n){return((n=Math.max(0,Math.min(255,Math.round(n)||0)))<16?"0":"")+n.toString(16)}function O(n,e,r,i){return i<=0?n=e=r=NaN:r<=0||r>=1?n=e=NaN:e<=0&&(n=NaN),new J(n,e,r,i)}function $(n){if(n instanceof J)return new J(n.h,n.s,n.l,n.opacity);if(n instanceof g||(n=v(n)),!n)return new J;if(n instanceof J)return n;var e=(n=n.rgb()).r/255,r=n.g/255,i=n.b/255,o=Math.min(e,r,i),t=Math.max(e,r,i),a=NaN,l=t-o,u=(t+o)/2;return l?(a=e===t?(r-i)/l+6*(r<i):r===t?(i-e)/l+2:(e-r)/l+4,l/=u<.5?t+o:2-t-o,a*=60):l=u>0&&u<1?0:a,new J(a,l,u,n.opacity)}function J(n,e,r,i){this.h=+n,this.s=+e,this.l=+r,this.opacity=+i}function B(n,e,r){return 255*(n<60?e+(r-e)*n/60:n<180?r:n<240?e+(r-e)*(240-n)/60:e)}u(g,v,{copy:function(n){return Object.assign(new this.constructor,this,n)},displayable:function(){return this.rgb().displayable()},hex:F,formatHex:F,formatHsl:function(){return $(this).formatHsl()},formatRgb:y,toString:y}),u(M,k,s(g,{brighter:function(n){return n=null==n?h:Math.pow(h,n),new M(this.r*n,this.g*n,this.b*n,this.opacity)},darker:function(n){return n=null==n?c:Math.pow(c,n),new M(this.r*n,this.g*n,this.b*n,this.opacity)},rgb:function(){return this},displayable:function(){return-.5<=this.r&&this.r<255.5&&-.5<=this.g&&this.g<255.5&&-.5<=this.b&&this.b<255.5&&0<=this.opacity&&this.opacity<=1},hex:N,formatHex:N,formatRgb:E,toString:E})),u(J,function(n,e,r,i){return 1===arguments.length?$(n):new J(n,e,r,null==i?1:i)},s(g,{brighter:function(n){return n=null==n?h:Math.pow(h,n),new J(this.h,this.s,this.l*n,this.opacity)},darker:function(n){return n=null==n?c:Math.pow(c,n),new J(this.h,this.s,this.l*n,this.opacity)},rgb:function(){var n=this.h%360+360*(this.h<0),e=isNaN(n)||isNaN(this.s)?0:this.s,r=this.l,i=r+(r<.5?r:1-r)*e,o=2*r-i;return new M(B(n>=240?n-240:n+120,o,i),B(n,o,i),B(n<120?n+240:n-120,o,i),this.opacity)},displayable:function(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1},formatHsl:function(){var n=this.opacity;return(1===(n=isNaN(n)?1:Math.max(0,Math.min(1,n)))?"hsl(":"hsla(")+(this.h||0)+", "+100*(this.s||0)+"%, "+100*(this.l||0)+"%"+(1===n?")":", "+n+")")}}));var Q=o(37716),H=o(55197);function L(n,e){if(1&n&&(Q.TgZ(0,"li",null,19),Q._uU(2,"\n        "),Q.TgZ(3,"span",20),Q._uU(4," "),Q.qZA(),Q._uU(5,"\n        "),Q.TgZ(6,"span",20),Q._uU(7," "),Q.qZA(),Q._uU(8,"\n      "),Q.qZA()),2&n){var r=e.$implicit,i=Q.MAs(1),o=Q.oxw().$implicit,t=Q.oxw();Q.MT6("color color-",o,"-",r,"00"),Q.xp6(3),Q.Q6J("innerHTML","$color-"+o+"-"+r+"00",Q.oJD),Q.xp6(3),Q.Q6J("innerHTML",t.getBackgroundColor(i),Q.oJD)}}var S=function(){return[1,2,3,4,5,6,7,8,9]};function Y(n,e){if(1&n&&(Q.TgZ(0,"div",4),Q._uU(1,"\n    "),Q.TgZ(2,"ul",5),Q._uU(3,"\n      "),Q.TgZ(4,"li"),Q._uU(5),Q.qZA(),Q._uU(6,"\n      "),Q.YNc(7,L,9,6,"li",18),Q._uU(8,"\n    "),Q.qZA(),Q._uU(9,"\n  "),Q.qZA()),2&n){var r=e.$implicit;Q.xp6(4),Q.Gre("color main-color color-",r,"-500"),Q.xp6(1),Q.hij("$color-",r,""),Q.xp6(2),Q.Q6J("ngForOf",Q.DdM(5,S))}}function j(n,e){if(1&n&&(Q.TgZ(0,"li",null,19),Q._uU(2,"\n        "),Q.TgZ(3,"span",20),Q._uU(4," "),Q.qZA(),Q._uU(5,"\n        "),Q.TgZ(6,"span",20),Q._uU(7," "),Q.qZA(),Q._uU(8,"\n      "),Q.qZA()),2&n){var r=e.$implicit,i=Q.MAs(1),o=Q.oxw().$implicit,t=Q.oxw();Q.MT6("color color-",o,"-",r,""),Q.xp6(3),Q.Q6J("innerHTML","$color-"+o+"-"+r,Q.oJD),Q.xp6(3),Q.Q6J("innerHTML",t.getBackgroundColor(i),Q.oJD)}}var R=function(){return["050",100,150,200,250,300,350,400,450,500,550,600,650,700,725,750,775,800,825,850,875,900]};function P(n,e){if(1&n&&(Q.TgZ(0,"div",4),Q._uU(1,"\n    "),Q.TgZ(2,"ul",5),Q._uU(3,"\n      "),Q.TgZ(4,"li"),Q._uU(5),Q.qZA(),Q._uU(6,"\n      "),Q.YNc(7,j,9,6,"li",18),Q._uU(8,"\n    "),Q.qZA(),Q._uU(9,"\n  "),Q.qZA()),2&n){var r=e.$implicit;Q.xp6(4),Q.Gre("color main-color color-",r,"-500"),Q.xp6(1),Q.hij("$color-",r,""),Q.xp6(2),Q.Q6J("ngForOf",Q.DdM(5,R))}}function I(n,e){1&n&&(Q.TgZ(0,"span",8),Q._uU(1,"Linear"),Q.qZA())}function G(n,e){if(1&n&&(Q.TgZ(0,"li",21),Q._uU(1,"\n        "),Q.YNc(2,I,2,0,"span",22),Q._uU(3,"\n        "),Q._UZ(4,"br"),Q._uU(5,"\n        "),Q.TgZ(6,"span",9),Q._uU(7),Q.qZA(),Q._uU(8,"\n      "),Q.qZA()),2&n){var r=e.$implicit,i=e.index;Q.Gre("color main-color ",r,""),Q.xp6(2),Q.Q6J("ngIf",0===i),Q.xp6(5),Q.hij("$",r,"")}}function V(n,e){if(1&n&&(Q.TgZ(0,"span",27),Q._uU(1),Q._UZ(2,"br"),Q._uU(3,"\n        "),Q.qZA()),2&n){var r=Q.oxw(2).$implicit;Q.xp6(1),Q.hij("",r.name,"\n          ")}}var z=function(n){return{"main-color":n}};function K(n,e){if(1&n&&(Q.TgZ(0,"li",24),Q._uU(1,"\n        "),Q.YNc(2,V,4,1,"span",25),Q._uU(3,"\n        "),Q.TgZ(4,"span",26),Q._uU(5," "),Q.qZA(),Q._uU(6,"\n      "),Q.qZA()),2&n){var r=e.$implicit,i=e.index;Q.Udp("background",r),Q.Q6J("ngClass",Q.VKq(5,z,0===i)),Q.xp6(2),Q.Q6J("ngIf",0===i),Q.xp6(2),Q.Q6J("innerHTML",r,Q.oJD)}}function X(n,e){if(1&n&&(Q.TgZ(0,"div",4),Q._uU(1,"\n    "),Q.TgZ(2,"ul",5),Q._uU(3,"\n      "),Q.YNc(4,K,7,7,"li",23),Q._uU(5,"\n    "),Q.qZA(),Q._uU(6,"\n  "),Q.qZA()),2&n){var r=e.$implicit;Q.xp6(4),Q.Q6J("ngForOf",r.colors)}}function W(n,e){if(1&n&&(Q.TgZ(0,"span",27),Q._uU(1),Q._UZ(2,"br"),Q._uU(3,"\n        "),Q.qZA()),2&n){var r=Q.oxw(2).$implicit;Q.xp6(1),Q.hij("",r.name,"\n          ")}}function nn(n,e){if(1&n&&(Q.TgZ(0,"li",24),Q._uU(1,"\n        "),Q.YNc(2,W,4,1,"span",25),Q._uU(3,"\n        "),Q.TgZ(4,"span",26),Q._uU(5," "),Q.qZA(),Q._uU(6,"\n      "),Q.qZA()),2&n){var r=e.$implicit,i=e.index;Q.Udp("background",r),Q.Q6J("ngClass",Q.VKq(5,z,0===i)),Q.xp6(2),Q.Q6J("ngIf",0===i),Q.xp6(2),Q.Q6J("innerHTML",r,Q.oJD)}}function en(n,e){if(1&n&&(Q.TgZ(0,"div",4),Q._uU(1,"\n    "),Q.TgZ(2,"ul",5),Q._uU(3,"\n      "),Q.YNc(4,nn,7,7,"li",23),Q._uU(5,"\n    "),Q.qZA(),Q._uU(6,"\n  "),Q.qZA()),2&n){var r=e.$implicit;Q.xp6(4),Q.Q6J("ngForOf",r.colors)}}function rn(n,e){if(1&n&&(Q.TgZ(0,"div",30),Q._uU(1),Q.qZA()),2&n){var r=e.$implicit,i=Q.oxw().$implicit;Q.MT6("glow-demo glow-",i,"-",r,"00"),Q.xp6(1),Q.AsE("\n      .glow-",i,"-",r,"00\n    ")}}function on(n,e){1&n&&(Q.TgZ(0,"div",28),Q._uU(1,"\n    "),Q.YNc(2,rn,2,6,"div",29),Q._uU(3,"\n  "),Q.qZA()),2&n&&(Q.xp6(2),Q.Q6J("ngForOf",Q.DdM(1,S)))}function tn(n,e){if(1&n&&(Q.TgZ(0,"div",16),Q._uU(1,"\n    "),Q.TgZ(2,"div",30),Q._uU(3),Q.qZA(),Q._uU(4,"\n  "),Q.qZA()),2&n){var r=e.$implicit;Q.xp6(2),Q.Gre("shadow-demo shadow-",r,""),Q.xp6(1),Q.hij("$shadow-",r,"")}}var an,ln=function(){return["blue","light-blue","green","orange","red","purple"]},un=function(){return["blue-grey","grey"]},sn=[{path:"",component:(an=function(){function e(){n(this,e),this.chartColorsOrdinal=[{name:"Vivid",colors:["#62CD8C","#3D4EB4","#1594F2","#00B965","#B7DF3F","#99B726","#F4E667","#FF990D","#FF5821","#D24018"]},{name:"Natural",colors:["#C09E77","#EA9551","#D9A05B","#F2E0A8","#F2E0A8","#A4D7C6","#7693B1","#AFAFAF","#707160","#D9D5C3"]},{name:"Cool",colors:["#ACCCED","#A9E3F5","#7CD2ED","#4DAACC","#79A2E4","#8695BF","#A27DA7","#AE6785","#AA5963","#A9375C"]},{name:"Fire",colors:["#FF3E00","#C0370A","#FF900B","#FF7002","#FF3E00","#FF5821","#E75200","#FFCC31","#FFAC12","#FF7002"]}],this.chartColorsSequential=[{name:"Solar",colors:["#FFF8E1","#FFEDB4","#FFE184","#FFD654","#FFCC31","#FFC31B","#FFB414","#FFA10F","#FF900B","#FF7002"]},{name:"Air",colors:["#E1F5FE","#B2E5FC","#7FD3F9","#4AC2F6","#1EB5F5","#00A7F3","#0099E4","#0086D0","#0075BC","#00559A"]},{name:"Aqua",colors:["#E0F7FA","#B1EBF2","#7EDEEA","#48D0E1","#1AC6DA","#00BBD4","#00ACC1","#0097A7","#00838F","#006064"]}],this.gradients=["gradient-blue","gradient-blue-green","gradient-blue-red","gradient-blue-purple","gradient-red-orange","gradient-orange-purple"],this.shadows=[];for(var r=1;r<=24;)this.shadows.push(r++)}return r(e,[{key:"getBackgroundColor",value:function(n){return function(n){return(n=(n=(n=k(n).toString()).match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i))&&4===n.length?"#"+("0"+parseInt(n[1],10).toString(16)).slice(-2)+("0"+parseInt(n[2],10).toString(16)).slice(-2)+("0"+parseInt(n[3],10).toString(16)).slice(-2):"").toUpperCase()}(function(n,e){var r=n.ownerDocument.defaultView;(!r||!r.opener)&&(r=window);var i=r.getComputedStyle(n);return i.getPropertyValue(e)||i[e]}(n,"background-color"))}}]),e}(),an.\u0275fac=function(n){return new(n||an)},an.\u0275cmp=Q.Xpm({type:an,selectors:[["app-colors-page"]],decls:119,vars:10,consts:[[1,"style-header"],[1,"ngx-flex--row"],["class","ngx-flex--col-12 ngx-flex--col-md-6 ngx-flex--col-lg-4 ngx-flex--col-xl-3",4,"ngFor","ngForOf"],[1,"ngx-flex--row","start"],[1,"ngx-flex--col-12","ngx-flex--col-md-6","ngx-flex--col-lg-4","ngx-flex--col-xl-3"],[1,"color-group","shadow-2","shadow-fx","list-reset"],["style","border-top: solid 1px #fff;",3,"class",4,"ngFor","ngForOf"],[1,"color","main-color","bg-linear-1"],[1,"name","u-floatLeft",2,"color","white"],["dbl-click-copy","",1,"hex","tag","tag-small","u-floatRight"],[1,"color","main-color","bg-linear-2",2,"border-top","solid 1px #fff"],[1,"color","main-color","bg-radial-1"],[1,"color","main-color","bg-radial-2",2,"border-top","solid 1px #fff"],["language","css"],["class","ngx-flex--col-2",4,"ngFor","ngForOf"],["class","ngx-flex--col-2 center",4,"ngFor","ngForOf"],[1,"ngx-flex--col-2","center"],[1,"shadow-demo","shadow-10","shadow-fx"],[3,"class",4,"ngFor","ngForOf"],["swatch",""],["dbl-click-copy","",1,"hex","tag","tag-small",3,"innerHTML"],[2,"border-top","solid 1px #fff"],["class","name u-floatLeft","style","color: white;",4,"ngIf"],["class","color",3,"background","ngClass",4,"ngFor","ngForOf"],[1,"color",3,"ngClass"],["class","name u-floatLeft",4,"ngIf"],["dbl-click-copy","",1,"hex","tag","tag-small","u-floatRight",3,"innerHTML"],[1,"name","u-floatLeft"],[1,"ngx-flex--col-2"],["dbl-click-copy","",3,"class",4,"ngFor","ngForOf"],["dbl-click-copy",""]],template:function(n,e){1&n&&(Q.TgZ(0,"h3",0),Q._uU(1,"Colors: Hues"),Q.qZA(),Q._uU(2,"\n"),Q.TgZ(3,"div",1),Q._uU(4,"\n  "),Q.YNc(5,Y,10,6,"div",2),Q._uU(6,"\n"),Q.qZA(),Q._uU(7,"\n\n"),Q.TgZ(8,"h3",0),Q._uU(9,"Colors: Greys"),Q.qZA(),Q._uU(10,"\n"),Q.TgZ(11,"div",3),Q._uU(12,"\n  "),Q.YNc(13,P,10,6,"div",2),Q._uU(14,"\n"),Q.qZA(),Q._uU(15,"\n\n"),Q.TgZ(16,"h3",0),Q._uU(17,"Colors: Gradients"),Q.qZA(),Q._uU(18,"\n"),Q.TgZ(19,"div",1),Q._uU(20,"\n  "),Q.TgZ(21,"div",4),Q._uU(22,"\n    "),Q.TgZ(23,"ul",5),Q._uU(24,"\n      "),Q.YNc(25,G,9,5,"li",6),Q._uU(26,"\n    "),Q.qZA(),Q._uU(27,"\n  "),Q.qZA(),Q._uU(28,"\n  "),Q.TgZ(29,"div",4),Q._uU(30,"\n    "),Q.TgZ(31,"ul",5),Q._uU(32,"\n      "),Q.TgZ(33,"li",7),Q._uU(34,"\n        "),Q.TgZ(35,"span",8),Q._uU(36,"Bg Linear"),Q.qZA(),Q._uU(37,"\n        "),Q._UZ(38,"br"),Q._uU(39,"\n        "),Q.TgZ(40,"span",9),Q._uU(41,"$bg-linear-1"),Q.qZA(),Q._uU(42,"\n      "),Q.qZA(),Q._uU(43,"\n      "),Q.TgZ(44,"li",10),Q._uU(45,"\n        "),Q.TgZ(46,"span",9),Q._uU(47,"$bg-linear-2"),Q.qZA(),Q._uU(48,"\n      "),Q.qZA(),Q._uU(49,"\n    "),Q.qZA(),Q._uU(50,"\n  "),Q.qZA(),Q._uU(51,"\n  "),Q.TgZ(52,"div",4),Q._uU(53,"\n    "),Q.TgZ(54,"ul",5),Q._uU(55,"\n      "),Q.TgZ(56,"li",11),Q._uU(57,"\n        "),Q.TgZ(58,"span",8),Q._uU(59,"Bg Radial"),Q.qZA(),Q._uU(60,"\n        "),Q._UZ(61,"br"),Q._uU(62,"\n        "),Q.TgZ(63,"span",9),Q._uU(64,"$bg-radial-1"),Q.qZA(),Q._uU(65,"\n      "),Q.qZA(),Q._uU(66,"\n      "),Q.TgZ(67,"li",12),Q._uU(68,"\n        "),Q.TgZ(69,"span",9),Q._uU(70,"$bg-radial-2"),Q.qZA(),Q._uU(71,"\n      "),Q.qZA(),Q._uU(72,"\n    "),Q.qZA(),Q._uU(73,"\n  "),Q.qZA(),Q._uU(74,"\n"),Q.qZA(),Q._uU(75,"\n\n"),Q.TgZ(76,"h3",0),Q._uU(77,"Colors: Ordinal Charts"),Q.qZA(),Q._uU(78,"\n"),Q.TgZ(79,"div",1),Q._uU(80,"\n  "),Q.YNc(81,X,7,1,"div",2),Q._uU(82,"\n"),Q.qZA(),Q._uU(83,"\n\n"),Q.TgZ(84,"h3",0),Q._uU(85,"Colors: Sequential Charts"),Q.qZA(),Q._uU(86,"\n"),Q.TgZ(87,"div",1),Q._uU(88,"\n  "),Q.YNc(89,en,7,1,"div",2),Q._uU(90,"\n"),Q.qZA(),Q._uU(91,"\n\n"),Q.TgZ(92,"h3",0),Q._uU(93,"Colors: Borders and Glows"),Q.qZA(),Q._uU(94,"\nApply the class to an element to give it a glowing border. Alternatively, you can use the glow mixin in any class:\n"),Q.TgZ(95,"app-prism",13),Q._uU(96,"\n"),Q._uU(97," .my-class { @include glow($color); }\n"),Q._uU(98,"\n"),Q.qZA(),Q._uU(99,"\n"),Q.TgZ(100,"div",1),Q._uU(101,"\n  "),Q.YNc(102,on,4,2,"div",14),Q._uU(103,"\n"),Q.qZA(),Q._uU(104,"\n\n"),Q.TgZ(105,"h3",0),Q._uU(106,"Colors: Shadows"),Q.qZA(),Q._uU(107,"\n"),Q.TgZ(108,"div",1),Q._uU(109,"\n  "),Q.YNc(110,tn,5,4,"div",15),Q._uU(111,"\n  "),Q.TgZ(112,"div",16),Q._uU(113,"\n    "),Q.TgZ(114,"div",17),Q._uU(115,"\n      shadow-fx\n    "),Q.qZA(),Q._uU(116,"\n  "),Q.qZA(),Q._uU(117,"\n"),Q.qZA(),Q._uU(118,"\n")),2&n&&(Q.xp6(5),Q.Q6J("ngForOf",Q.DdM(7,ln)),Q.xp6(8),Q.Q6J("ngForOf",Q.DdM(8,un)),Q.xp6(12),Q.Q6J("ngForOf",e.gradients),Q.xp6(56),Q.Q6J("ngForOf",e.chartColorsOrdinal),Q.xp6(8),Q.Q6J("ngForOf",e.chartColorsSequential),Q.xp6(13),Q.Q6J("ngForOf",Q.DdM(9,ln)),Q.xp6(8),Q.Q6J("ngForOf",e.shadows))},directives:[t.sg,H.U,t.O5,t.mk],styles:[".color-group[_ngcontent-%COMP%]{width:250px}.color-group[_ngcontent-%COMP%]   .main-color[_ngcontent-%COMP%]{height:70px}.color-group[_ngcontent-%COMP%]   .color[_ngcontent-%COMP%]{padding:15px 10px}.shadow-demo[_ngcontent-%COMP%]{height:120px;margin:15px;text-align:center;line-height:120px}"]}),an)}],gn=function(){var e=r(function e(){n(this,e)});return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=Q.oAB({type:e}),e.\u0275inj=Q.cJS({imports:[[l.Bz.forChild(sn)],l.Bz]}),e}(),cn=function(){var e=r(function e(){n(this,e)});return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=Q.oAB({type:e}),e.\u0275inj=Q.cJS({imports:[[t.ez,a.F,gn]]}),e}()}}])}();