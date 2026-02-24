(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Wt=globalThis,Bi=Wt.ShadowRoot&&(Wt.ShadyCSS===void 0||Wt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Li=Symbol(),$o=new WeakMap;let is=class{constructor(e,t,o){if(this._$cssResult$=!0,o!==Li)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(Bi&&e===void 0){const o=t!==void 0&&t.length===1;o&&(e=$o.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),o&&$o.set(t,e))}return e}toString(){return this.cssText}};const Is=n=>new is(typeof n=="string"?n:n+"",void 0,Li),f=(n,...e)=>{const t=n.length===1?n[0]:e.reduce((o,i,s)=>o+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+n[s+1],n[0]);return new is(t,n,Li)},zs=(n,e)=>{if(Bi)n.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const o=document.createElement("style"),i=Wt.litNonce;i!==void 0&&o.setAttribute("nonce",i),o.textContent=t.cssText,n.appendChild(o)}},Ro=Bi?n=>n:n=>n instanceof CSSStyleSheet?(e=>{let t="";for(const o of e.cssRules)t+=o.cssText;return Is(t)})(n):n;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Ts,defineProperty:Bs,getOwnPropertyDescriptor:Ls,getOwnPropertyNames:Os,getOwnPropertySymbols:Ds,getPrototypeOf:Ms}=Object,De=globalThis,Ho=De.trustedTypes,Ps=Ho?Ho.emptyScript:"",_i=De.reactiveElementPolyfillSupport,Ct=(n,e)=>n,jt={toAttribute(n,e){switch(e){case Boolean:n=n?Ps:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,e){let t=n;switch(e){case Boolean:t=n!==null;break;case Number:t=n===null?null:Number(n);break;case Object:case Array:try{t=JSON.parse(n)}catch{t=null}}return t}},Oi=(n,e)=>!Ts(n,e),Vo={attribute:!0,type:String,converter:jt,reflect:!1,useDefault:!1,hasChanged:Oi};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),De.litPropertyMetadata??(De.litPropertyMetadata=new WeakMap);let Xe=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=Vo){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const o=Symbol(),i=this.getPropertyDescriptor(e,o,t);i!==void 0&&Bs(this.prototype,e,i)}}static getPropertyDescriptor(e,t,o){const{get:i,set:s}=Ls(this.prototype,e)??{get(){return this[t]},set(r){this[t]=r}};return{get:i,set(r){const l=i==null?void 0:i.call(this);s==null||s.call(this,r),this.requestUpdate(e,l,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Vo}static _$Ei(){if(this.hasOwnProperty(Ct("elementProperties")))return;const e=Ms(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(Ct("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Ct("properties"))){const t=this.properties,o=[...Os(t),...Ds(t)];for(const i of o)this.createProperty(i,t[i])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[o,i]of t)this.elementProperties.set(o,i)}this._$Eh=new Map;for(const[t,o]of this.elementProperties){const i=this._$Eu(t,o);i!==void 0&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const o=new Set(e.flat(1/0).reverse());for(const i of o)t.unshift(Ro(i))}else e!==void 0&&t.push(Ro(e));return t}static _$Eu(e,t){const o=t.attribute;return o===!1?void 0:typeof o=="string"?o:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const o of t.keys())this.hasOwnProperty(o)&&(e.set(o,this[o]),delete this[o]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return zs(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var o;return(o=t.hostConnected)==null?void 0:o.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var o;return(o=t.hostDisconnected)==null?void 0:o.call(t)})}attributeChangedCallback(e,t,o){this._$AK(e,o)}_$ET(e,t){var s;const o=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,o);if(i!==void 0&&o.reflect===!0){const r=(((s=o.converter)==null?void 0:s.toAttribute)!==void 0?o.converter:jt).toAttribute(t,o.type);this._$Em=e,r==null?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(e,t){var s,r;const o=this.constructor,i=o._$Eh.get(e);if(i!==void 0&&this._$Em!==i){const l=o.getPropertyOptions(i),c=typeof l.converter=="function"?{fromAttribute:l.converter}:((s=l.converter)==null?void 0:s.fromAttribute)!==void 0?l.converter:jt;this._$Em=i;const h=c.fromAttribute(t,l.type);this[i]=h??((r=this._$Ej)==null?void 0:r.get(i))??h,this._$Em=null}}requestUpdate(e,t,o){var i;if(e!==void 0){const s=this.constructor,r=this[e];if(o??(o=s.getPropertyOptions(e)),!((o.hasChanged??Oi)(r,t)||o.useDefault&&o.reflect&&r===((i=this._$Ej)==null?void 0:i.get(e))&&!this.hasAttribute(s._$Eu(e,o))))return;this.C(e,t,o)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:o,reflect:i,wrapped:s},r){o&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,r??t??this[e]),s!==!0||r!==void 0)||(this._$AL.has(e)||(this.hasUpdated||o||(t=void 0),this._$AL.set(e,t)),i===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var o;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[s,r]of this._$Ep)this[s]=r;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[s,r]of i){const{wrapped:l}=r,c=this[s];l!==!0||this._$AL.has(s)||c===void 0||this.C(s,void 0,r,c)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(o=this._$EO)==null||o.forEach(i=>{var s;return(s=i.hostUpdate)==null?void 0:s.call(i)}),this.update(t)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(o=>{var i;return(i=o.hostUpdated)==null?void 0:i.call(o)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};Xe.elementStyles=[],Xe.shadowRootOptions={mode:"open"},Xe[Ct("elementProperties")]=new Map,Xe[Ct("finalized")]=new Map,_i==null||_i({ReactiveElement:Xe}),(De.reactiveElementVersions??(De.reactiveElementVersions=[])).push("2.1.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Et=globalThis,Qt=Et.trustedTypes,No=Qt?Qt.createPolicy("lit-html",{createHTML:n=>n}):void 0,os="$lit$",Oe=`lit$${Math.random().toFixed(9).slice(2)}$`,ns="?"+Oe,Fs=`<${ns}>`,Ve=document,At=()=>Ve.createComment(""),St=n=>n===null||typeof n!="object"&&typeof n!="function",Di=Array.isArray,qs=n=>Di(n)||typeof(n==null?void 0:n[Symbol.iterator])=="function",wi=`[ 	
\f\r]`,mt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Go=/-->/g,Uo=/>/g,Fe=RegExp(`>|${wi}(?:([^\\s"'>=/]+)(${wi}*=${wi}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Yo=/'/g,Wo=/"/g,ss=/^(?:script|style|textarea|title)$/i,$s=n=>(e,...t)=>({_$litType$:n,strings:e,values:t}),d=$s(1),oe=Symbol.for("lit-noChange"),u=Symbol.for("lit-nothing"),Jo=new WeakMap,$e=Ve.createTreeWalker(Ve,129);function rs(n,e){if(!Di(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return No!==void 0?No.createHTML(e):e}const Rs=(n,e)=>{const t=n.length-1,o=[];let i,s=e===2?"<svg>":e===3?"<math>":"",r=mt;for(let l=0;l<t;l++){const c=n[l];let h,w,g=-1,m=0;for(;m<c.length&&(r.lastIndex=m,w=r.exec(c),w!==null);)m=r.lastIndex,r===mt?w[1]==="!--"?r=Go:w[1]!==void 0?r=Uo:w[2]!==void 0?(ss.test(w[2])&&(i=RegExp("</"+w[2],"g")),r=Fe):w[3]!==void 0&&(r=Fe):r===Fe?w[0]===">"?(r=i??mt,g=-1):w[1]===void 0?g=-2:(g=r.lastIndex-w[2].length,h=w[1],r=w[3]===void 0?Fe:w[3]==='"'?Wo:Yo):r===Wo||r===Yo?r=Fe:r===Go||r===Uo?r=mt:(r=Fe,i=void 0);const b=r===Fe&&n[l+1].startsWith("/>")?" ":"";s+=r===mt?c+Fs:g>=0?(o.push(h),c.slice(0,g)+os+c.slice(g)+Oe+b):c+Oe+(g===-2?l:b)}return[rs(n,s+(n[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),o]};class It{constructor({strings:e,_$litType$:t},o){let i;this.parts=[];let s=0,r=0;const l=e.length-1,c=this.parts,[h,w]=Rs(e,t);if(this.el=It.createElement(h,o),$e.currentNode=this.el.content,t===2||t===3){const g=this.el.content.firstChild;g.replaceWith(...g.childNodes)}for(;(i=$e.nextNode())!==null&&c.length<l;){if(i.nodeType===1){if(i.hasAttributes())for(const g of i.getAttributeNames())if(g.endsWith(os)){const m=w[r++],b=i.getAttribute(g).split(Oe),I=/([.?@])?(.*)/.exec(m);c.push({type:1,index:s,name:I[2],strings:b,ctor:I[1]==="."?Vs:I[1]==="?"?Ns:I[1]==="@"?Gs:hi}),i.removeAttribute(g)}else g.startsWith(Oe)&&(c.push({type:6,index:s}),i.removeAttribute(g));if(ss.test(i.tagName)){const g=i.textContent.split(Oe),m=g.length-1;if(m>0){i.textContent=Qt?Qt.emptyScript:"";for(let b=0;b<m;b++)i.append(g[b],At()),$e.nextNode(),c.push({type:2,index:++s});i.append(g[m],At())}}}else if(i.nodeType===8)if(i.data===ns)c.push({type:2,index:s});else{let g=-1;for(;(g=i.data.indexOf(Oe,g+1))!==-1;)c.push({type:7,index:s}),g+=Oe.length-1}s++}}static createElement(e,t){const o=Ve.createElement("template");return o.innerHTML=e,o}}function nt(n,e,t=n,o){var r,l;if(e===oe)return e;let i=o!==void 0?(r=t._$Co)==null?void 0:r[o]:t._$Cl;const s=St(e)?void 0:e._$litDirective$;return(i==null?void 0:i.constructor)!==s&&((l=i==null?void 0:i._$AO)==null||l.call(i,!1),s===void 0?i=void 0:(i=new s(n),i._$AT(n,t,o)),o!==void 0?(t._$Co??(t._$Co=[]))[o]=i:t._$Cl=i),i!==void 0&&(e=nt(n,i._$AS(n,e.values),i,o)),e}let Hs=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:o}=this._$AD,i=((e==null?void 0:e.creationScope)??Ve).importNode(t,!0);$e.currentNode=i;let s=$e.nextNode(),r=0,l=0,c=o[0];for(;c!==void 0;){if(r===c.index){let h;c.type===2?h=new lt(s,s.nextSibling,this,e):c.type===1?h=new c.ctor(s,c.name,c.strings,this,e):c.type===6&&(h=new Us(s,this,e)),this._$AV.push(h),c=o[++l]}r!==(c==null?void 0:c.index)&&(s=$e.nextNode(),r++)}return $e.currentNode=Ve,i}p(e){let t=0;for(const o of this._$AV)o!==void 0&&(o.strings!==void 0?(o._$AI(e,o,t),t+=o.strings.length-2):o._$AI(e[t])),t++}};class lt{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,o,i){this.type=2,this._$AH=u,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=o,this.options=i,this._$Cv=(i==null?void 0:i.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=nt(this,e,t),St(e)?e===u||e==null||e===""?(this._$AH!==u&&this._$AR(),this._$AH=u):e!==this._$AH&&e!==oe&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):qs(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==u&&St(this._$AH)?this._$AA.nextSibling.data=e:this.T(Ve.createTextNode(e)),this._$AH=e}$(e){var s;const{values:t,_$litType$:o}=e,i=typeof o=="number"?this._$AC(e):(o.el===void 0&&(o.el=It.createElement(rs(o.h,o.h[0]),this.options)),o);if(((s=this._$AH)==null?void 0:s._$AD)===i)this._$AH.p(t);else{const r=new Hs(i,this),l=r.u(this.options);r.p(t),this.T(l),this._$AH=r}}_$AC(e){let t=Jo.get(e.strings);return t===void 0&&Jo.set(e.strings,t=new It(e)),t}k(e){Di(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let o,i=0;for(const s of e)i===t.length?t.push(o=new lt(this.O(At()),this.O(At()),this,this.options)):o=t[i],o._$AI(s),i++;i<t.length&&(this._$AR(o&&o._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){var o;for((o=this._$AP)==null?void 0:o.call(this,!1,!0,t);e!==this._$AB;){const i=e.nextSibling;e.remove(),e=i}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}}class hi{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,o,i,s){this.type=1,this._$AH=u,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=s,o.length>2||o[0]!==""||o[1]!==""?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=u}_$AI(e,t=this,o,i){const s=this.strings;let r=!1;if(s===void 0)e=nt(this,e,t,0),r=!St(e)||e!==this._$AH&&e!==oe,r&&(this._$AH=e);else{const l=e;let c,h;for(e=s[0],c=0;c<s.length-1;c++)h=nt(this,l[o+c],t,c),h===oe&&(h=this._$AH[c]),r||(r=!St(h)||h!==this._$AH[c]),h===u?e=u:e!==u&&(e+=(h??"")+s[c+1]),this._$AH[c]=h}r&&!i&&this.j(e)}j(e){e===u?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Vs extends hi{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===u?void 0:e}}class Ns extends hi{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==u)}}class Gs extends hi{constructor(e,t,o,i,s){super(e,t,o,i,s),this.type=5}_$AI(e,t=this){if((e=nt(this,e,t,0)??u)===oe)return;const o=this._$AH,i=e===u&&o!==u||e.capture!==o.capture||e.once!==o.once||e.passive!==o.passive,s=e!==u&&(o===u||i);i&&this.element.removeEventListener(this.name,this,o),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}}class Us{constructor(e,t,o){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(e){nt(this,e)}}const Ys={I:lt},xi=Et.litHtmlPolyfillSupport;xi==null||xi(It,lt),(Et.litHtmlVersions??(Et.litHtmlVersions=[])).push("3.3.1");const Ws=(n,e,t)=>{const o=(t==null?void 0:t.renderBefore)??e;let i=o._$litPart$;if(i===void 0){const s=(t==null?void 0:t.renderBefore)??null;o._$litPart$=i=new lt(e.insertBefore(At(),s),s,void 0,t??{})}return i._$AI(n),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const He=globalThis;let _=class extends Xe{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Ws(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return oe}};var ts;_._$litElement$=!0,_.finalized=!0,(ts=He.litElementHydrateSupport)==null||ts.call(He,{LitElement:_});const yi=He.litElementPolyfillSupport;yi==null||yi({LitElement:_});(He.litElementVersions??(He.litElementVersions=[])).push("4.2.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Js={attribute:!0,type:String,converter:jt,reflect:!1,hasChanged:Oi},Ks=(n=Js,e,t)=>{const{kind:o,metadata:i}=t;let s=globalThis.litPropertyMetadata.get(i);if(s===void 0&&globalThis.litPropertyMetadata.set(i,s=new Map),o==="setter"&&((n=Object.create(n)).wrapped=!0),s.set(t.name,n),o==="accessor"){const{name:r}=t;return{set(l){const c=e.get.call(this);e.set.call(this,l),this.requestUpdate(r,c,n)},init(l){return l!==void 0&&this.C(r,void 0,n,l),l}}}if(o==="setter"){const{name:r}=t;return function(l){const c=this[r];e.call(this,l),this.requestUpdate(r,c,n)}}throw Error("Unsupported decorator location: "+o)};function a(n){return(e,t)=>typeof t=="object"?Ks(n,e,t):((o,i,s)=>{const r=i.hasOwnProperty(s);return i.constructor.createProperty(s,o),r?Object.getOwnPropertyDescriptor(i,s):void 0})(n,e,t)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function v(n){return a({...n,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const js=(n,e,t)=>(t.configurable=!0,t.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(n,e,t),t);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function $(n,e){return(t,o,i)=>{const s=r=>{var l;return((l=r.renderRoot)==null?void 0:l.querySelector(n))??null};return js(t,o,{get(){return s(this)}})}}const x=f`
  :host {
    /* Colors - Blue */
    --blue-100: rgb(224, 239, 255);
    --blue-200: rgb(173, 212, 255);
    --blue-300: rgb(122, 185, 255);
    --blue-400: rgb(71, 158, 255);
    --blue-500: rgb(20, 131, 255);
    --blue-600: rgb(0, 106, 224);
    --blue-700: rgb(0, 82, 173);
    --blue-800: rgb(0, 58, 122);
    --blue-900: rgb(0, 34, 71);

    /* Colors - Light Blue */
    --lightblue-100: rgb(234, 249, 255);
    --lightblue-200: rgb(184, 234, 254);
    --lightblue-300: rgb(134, 219, 253);
    --lightblue-400: rgb(84, 205, 252);
    --lightblue-500: rgb(34, 190, 251);
    --lightblue-600: rgb(4, 166, 230);
    --lightblue-700: rgb(3, 130, 180);
    --lightblue-800: rgb(2, 94, 130);
    --lightblue-900: rgb(1, 58, 80);

    /* Colors - Green */
    --green-100: rgb(206, 249, 240);
    --green-200: rgb(161, 243, 226);
    --green-300: rgb(116, 237, 212);
    --green-400: rgb(71, 231, 198);
    --green-500: rgb(29, 222, 182);
    --green-600: rgb(23, 177, 145);
    --green-700: rgb(17, 132, 108);
    --green-800: rgb(11, 87, 71);
    --green-900: rgb(5, 42, 34);

    /* Colors - Orange */
    --orange-100: rgb(255, 244, 224);
    --orange-200: rgb(255, 225, 173);
    --orange-300: rgb(255, 206, 122);
    --orange-400: rgb(255, 187, 71);
    --orange-500: rgb(255, 168, 20);
    --orange-600: rgb(224, 141, 0);
    --orange-700: rgb(173, 109, 0);
    --orange-800: rgb(122, 77, 0);
    --orange-900: rgb(71, 45, 0);

    /* Colors - Red */
    --red-100: rgb(255, 230, 224);
    --red-200: rgb(255, 190, 173);
    --red-300: rgb(255, 150, 122);
    --red-400: rgb(255, 109, 71);
    --red-500: rgb(255, 69, 20);
    --red-600: rgb(224, 47, 0);
    --red-700: rgb(173, 36, 0);
    --red-800: rgb(122, 25, 0);
    --red-900: rgb(71, 15, 0);

    /* Colors - Purple */
    --purple-100: rgb(255, 255, 255);
    --purple-200: rgb(239, 234, 252);
    --purple-300: rgb(205, 190, 245);
    --purple-400: rgb(172, 145, 239);
    --purple-500: rgb(138, 101, 232);
    --purple-600: rgb(104, 57, 225);
    --purple-700: rgb(78, 30, 201);
    --purple-800: rgb(61, 23, 157);
    --purple-900: rgb(44, 17, 112);

    /* Colors - Grey */
    --grey-050: rgb(235, 237, 242);
    --grey-100: rgb(205, 210, 221);
    --grey-150: rgb(190, 197, 211);
    --grey-200: rgb(175, 183, 200);
    --grey-250: rgb(160, 170, 190);
    --grey-300: rgb(144, 156, 180);
    --grey-350: rgb(129, 143, 169);
    --grey-400: rgb(114, 129, 159);
    --grey-450: rgb(100, 116, 147);
    --grey-500: rgb(90, 104, 132);
    --grey-550: rgb(80, 92, 117);
    --grey-550-rgb: 80, 92, 117;
    --grey-600: rgb(69, 80, 102);
    --grey-650: rgb(59, 68, 87);
    --grey-700: rgb(49, 56, 71);
    --grey-725: rgb(43, 50, 64);
    --grey-750: rgb(38, 44, 56);
    --grey-775: rgb(33, 38, 49);
    --grey-800: rgb(28, 32, 41);
    --grey-825: rgb(23, 26, 33);
    --grey-850: rgb(18, 20, 26);
    --grey-875: rgb(12, 14, 18);
    --grey-900: rgb(7, 8, 11);

    /* Colors - Base */
    --white: rgb(255, 255, 255);
    --black: rgb(0, 0, 0);

    /* Typography - Font Sizes */
    --font-size-base: 16px;
    --font-size-xxs: 0.625rem;
    --font-size-xs: 0.75rem;
    --font-size-s: 0.875rem;
    --font-size-m: 1rem;
    --font-size-l: 1.125rem;
    --font-size-xl: 1.25rem;
    --font-size-2xl: 1.5rem;
    --font-size-3xl: 1.75rem;
    --font-size-4xl: 2rem;
    --font-size-5xl: 2.25rem;
    --font-size-6xl: 3rem;

    /* Typography - Line Heights */
    --font-line-height-100: 1.1;
    --font-line-height-200: 1.42;
    --font-line-height-300: 20px;
    --font-line-height-400: 40px;

    /* Typography - Font Weights */
    --font-weight-light: 300;
    --font-weight-regular: 400;
    --font-weight-semibold: 600;
    --font-weight-bold: 700;

    /* Spacing */
    --spacing-0: 0;
    --spacing-2: 2px;
    --spacing-4: 4px;
    --spacing-8: 8px;
    --spacing-10: 10px;
    --spacing-12: 12px;
    --spacing-16: 16px;
    --spacing-20: 20px;
    --spacing-24: 24px;
    --spacing-32: 32px;

    /* Border Radius */
    --radius-0: 0;
    --radius-2: 2px;
    --radius-4: 4px;
    --radius-6: 6px;
    --radius-8: 8px;
    --radius-16: 16px;
    --radius-64: 64px;

    /* Semantic colors */
    --color-error: var(--red-500);

    /* Shadows */
    --shadow-1: 0 1px 2px rgba(0, 0, 0, 0.3);
    --shadow-2: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    --shadow-3: 0 1px 8px 0 rgba(0, 0, 0, 0.2), 0 3px 4px 0 rgba(0, 0, 0, 0.14), 0 3px 3px -2px rgba(0, 0, 0, 0.12);
  }
`;f`
  * {
    box-sizing: border-box;
  }
`;const Qs=f`
  :host {
    display: inline-block;
    cursor: pointer;
  }

  :host([disabled]) {
    pointer-events: none;
  }

  button {
    box-sizing: border-box;
    color: var(--button-text, var(--white));
    display: inline-block;
    padding: 0.35em 0.55em;
    position: relative;
    text-align: center;
    text-decoration: none;
    user-select: none;
    font: inherit;
    font-size: var(--font-size-m);
    font-weight: var(--font-weight-bold);
    outline: none;
    line-height: var(--font-line-height-100);
    outline-offset: 2px;
    cursor: inherit;
    width: 100%;

    background: var(--button-bg, var(--grey-600));
    border: solid 1px transparent;
    border-color: var(--button-border, transparent);
    border-radius: var(--radius-4);
    box-shadow: var(--button-shadow, var(--shadow-1));
    transition: background-color 200ms, box-shadow 200ms;
    text-shadow: 1px 1px rgba(0, 0, 0, 0.07);
  }

  button:focus,
  button:focus-within {
    outline: none;
  }

  button:focus-visible {
    outline: 2px solid var(--grey-600);
  }

  /* Hover states (--button-hover set by swim-button-group when used inside a group) */
  :host(:not([disabled])) button:hover {
    cursor: pointer;
    background: var(--button-hover, var(--grey-700));
    outline-color: var(--button-hover, var(--grey-700));
  }

  /* Size variants */
  :host([size='small']) button {
    font-size: var(--font-size-xxs);
  }

  :host([size='large']) button {
    font-size: 1.3em;
  }

  /* Variant: Primary (--button-* overrides when inside swim-button-group) */
  :host([variant='primary']) button {
    background-color: var(--button-bg, var(--blue-400));
    border-color: var(--button-border, var(--blue-400));
    color: var(--button-text, var(--white));
    outline-color: var(--button-border, var(--blue-500));
  }

  :host([variant='primary']) button:focus-visible {
    outline-color: var(--button-border, var(--blue-500));
  }

  :host([variant='primary']:not([disabled])) button:hover {
    background-color: var(--button-hover, var(--blue-500));
    border-color: var(--button-hover, var(--blue-500));
  }

  /* Variant: Warning */
  :host([variant='warning']) button {
    background-color: var(--orange-400);
    color: var(--grey-900);
    outline-color: var(--orange-500);
  }

  :host([variant='warning']) button:focus-visible {
    outline-color: var(--orange-500);
  }

  :host([variant='warning']:not([disabled])) button:hover {
    background-color: var(--orange-500);
  }

  /* Variant: Danger */
  :host([variant='danger']) button {
    background-color: var(--red-400);
    outline-color: var(--red-400);
  }

  :host([variant='danger']) button:focus-visible {
    outline-color: var(--red-400);
  }

  :host([variant='danger']:not([disabled])) button:hover {
    background-color: var(--red-500);
  }

  /* Variant: Link */
  :host([variant='link']) button {
    background-color: transparent;
    box-shadow: none;
  }

  :host([variant='link']:not([disabled])) button:hover {
    background-color: transparent;
  }

  /* Variant: Bordered */
  :host([variant='bordered']) button,
  :host([variant='primary'][bordered]) button {
    border: 1px solid var(--blue-400);
    color: var(--blue-400);
    background-color: transparent;
    box-shadow: none;
    outline-color: var(--blue-400);
  }

  :host([variant='bordered']) button:focus-visible,
  :host([variant='primary'][bordered]) button:focus-visible {
    outline-color: var(--blue-400);
  }

  :host([variant='bordered']:not([disabled])) button:hover,
  :host([variant='primary'][bordered]:not([disabled])) button:hover {
    border-color: var(--blue-200);
    color: var(--blue-200);
  }

  /* Button content and state icon container */
  .content {
    text-overflow: ellipsis;
    overflow-x: clip;
    overflow-y: visible;
    width: 100%;
    display: block;
    white-space: nowrap;
    transition: opacity 0.25s ease-out;
  }

  .state-icon {
    position: absolute;
    inset: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    pointer-events: none;
  }

  /* State: In Progress */
  :host([state='in-progress']) {
    cursor: wait !important;
    position: relative;
    opacity: 1 !important;
  }

  :host([state='in-progress']) button {
    opacity: 1;
    pointer-events: none;
  }

  :host([state='in-progress']) .content {
    opacity: 0;
  }

  :host([state='in-progress']) .state-icon {
    opacity: 1;
  }

  /* State: Success */
  :host([state='success']) {
    cursor: wait !important;
  }

  :host([state='success']) button {
    color: black !important;
    background-color: var(--green-500) !important;
    background: var(--green-500) !important;
    border: 1px solid var(--green-500) !important;
    pointer-events: none;
  }

  :host([state='success']) .content {
    opacity: 0;
  }

  :host([state='success']) .state-icon {
    opacity: 1;
    color: var(--white);
  }

  /* State: Fail */
  :host([state='fail']) {
    cursor: wait !important;
  }

  :host([state='fail']) button {
    color: black !important;
    background-color: var(--red-500) !important;
    background: var(--red-500) !important;
    border: 1px solid var(--red-500) !important;
    pointer-events: none;
  }

  :host([state='fail']) .content {
    opacity: 0;
  }

  :host([state='fail']) .state-icon {
    opacity: 1;
    color: var(--white);
  }

  /* Icon styles */
  .icon {
    height: 1em;
    width: 1em;
    font-weight: var(--font-weight-bold);
    color: var(--white);
    overflow: hidden;
    font-size: var(--font-size-m);
    display: inline-block;
  }

  /* Spinner animation */
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .spinner {
    animation: spin 1s linear infinite;
  }
`;var J=(n=>(n.Active="active",n.InProgress="in-progress",n.Success="success",n.Fail="fail",n))(J||{});function p(n){return n!=null&&`${n}`!="false"}function A(n,e=null){return isNaN(parseFloat(n))||isNaN(Number(n))?e:Number(n)}const Zs=f`
  .ngx-icon.ngx-3d-rotate::before {
    content: '\\ea01';
  }
  .ngx-icon.ngx-action::before {
    content: '\\ea02';
  }
  .ngx-icon.ngx-action-close::before {
    content: '\\ea03';
  }
  .ngx-icon.ngx-action-maximize::before {
    content: '\\ea04';
  }
  .ngx-icon.ngx-action-maximize-inverse::before {
    content: '\\ea05';
  }
  .ngx-icon.ngx-action-minimize::before {
    content: '\\ea06';
  }
  .ngx-icon.ngx-action-outline::before {
    content: '\\ea07';
  }
  .ngx-icon.ngx-action-outline-small::before {
    content: '\\ea08';
  }
  .ngx-icon.ngx-add-circle::before {
    content: '\\ea09';
  }
  .ngx-icon.ngx-add-circle-filled::before {
    content: '\\ea0a';
  }
  .ngx-icon.ngx-add-circle-medium::before {
    content: '\\ea0b';
  }
  .ngx-icon.ngx-add-circle-thin::before {
    content: '\\ea0c';
  }
  .ngx-icon.ngx-add-edge::before {
    content: '\\ea0d';
  }
  .ngx-icon.ngx-add-new::before {
    content: '\\ea0e';
  }
  .ngx-icon.ngx-add-node::before {
    content: '\\ea0f';
  }
  .ngx-icon.ngx-advanced-pie::before {
    content: '\\ea10';
  }
  .ngx-icon.ngx-alert::before {
    content: '\\ea11';
  }
  .ngx-icon.ngx-app-store::before {
    content: '\\ea12';
  }
  .ngx-icon.ngx-app-workspaces::before {
    content: '\\ea13';
  }
  .ngx-icon.ngx-applet::before {
    content: '\\ea14';
  }
  .ngx-icon.ngx-applets::before {
    content: '\\ea15';
  }
  .ngx-icon.ngx-application::before {
    content: '\\ea16';
  }
  .ngx-icon.ngx-apps::before {
    content: '\\ea17';
  }
  .ngx-icon.ngx-area-chart::before {
    content: '\\ea18';
  }
  .ngx-icon.ngx-arrow-bold-circle-left::before {
    content: '\\ea19';
  }
  .ngx-icon.ngx-arrow-bold-circle-right::before {
    content: '\\ea1a';
  }
  .ngx-icon.ngx-arrow-bold-down::before {
    content: '\\ea1b';
  }
  .ngx-icon.ngx-arrow-bold-left::before {
    content: '\\ea1c';
  }
  .ngx-icon.ngx-arrow-bold-right::before {
    content: '\\ea1d';
  }
  .ngx-icon.ngx-arrow-bold-up::before {
    content: '\\ea1e';
  }
  .ngx-icon.ngx-arrow-down::before {
    content: '\\ea1f';
  }
  .ngx-icon.ngx-arrow-input::before {
    content: '\\ea20';
  }
  .ngx-icon.ngx-arrow-left::before {
    content: '\\ea21';
  }
  .ngx-icon.ngx-arrow-output::before {
    content: '\\ea22';
  }
  .ngx-icon.ngx-arrow-right::before {
    content: '\\ea23';
  }
  .ngx-icon.ngx-arrow-right-down-medium::before {
    content: '\\ea24';
  }
  .ngx-icon.ngx-arrow-right-medium::before {
    content: '\\ea25';
  }
  .ngx-icon.ngx-arrow-tail-left::before {
    content: '\\ea26';
  }
  .ngx-icon.ngx-arrow-tail-right::before {
    content: '\\ea27';
  }
  .ngx-icon.ngx-arrow-tail-solid-left::before {
    content: '\\ea28';
  }
  .ngx-icon.ngx-arrow-tail-solid-right::before {
    content: '\\ea29';
  }
  .ngx-icon.ngx-arrow-tail-subright::before {
    content: '\\ea2a';
  }
  .ngx-icon.ngx-arrow-up::before {
    content: '\\ea2b';
  }
  .ngx-icon.ngx-asset-outline::before {
    content: '\\ea2c';
  }
  .ngx-icon.ngx-asset-outline-small::before {
    content: '\\ea2d';
  }
  .ngx-icon.ngx-assets::before {
    content: '\\ea2e';
  }
  .ngx-icon.ngx-attachment::before {
    content: '\\ea2f';
  }
  .ngx-icon.ngx-automation::before {
    content: '\\ea30';
  }
  .ngx-icon.ngx-automation-alternate::before {
    content: '\\ea31';
  }
  .ngx-icon.ngx-back-arrow::before {
    content: '\\ea32';
  }
  .ngx-icon.ngx-back-arrow-filled::before {
    content: '\\ea33';
  }
  .ngx-icon.ngx-bars::before {
    content: '\\ea34';
  }
  .ngx-icon.ngx-bell::before {
    content: '\\ea35';
  }
  .ngx-icon.ngx-bell-alarm::before {
    content: '\\ea36';
  }
  .ngx-icon.ngx-bold::before {
    content: '\\ea37';
  }
  .ngx-icon.ngx-bolt::before {
    content: '\\ea38';
  }
  .ngx-icon.ngx-branch-node::before {
    content: '\\ea39';
  }
  .ngx-icon.ngx-branch-node-vert::before {
    content: '\\ea3a';
  }
  .ngx-icon.ngx-broom::before {
    content: '\\ea3b';
  }
  .ngx-icon.ngx-browser-size::before {
    content: '\\ea3c';
  }
  .ngx-icon.ngx-bug::before {
    content: '\\ea3d';
  }
  .ngx-icon.ngx-builder::before {
    content: '\\ea3e';
  }
  .ngx-icon.ngx-builder-outline::before {
    content: '\\ea3f';
  }
  .ngx-icon.ngx-button-push-outline::before {
    content: '\\ea40';
  }
  .ngx-icon.ngx-button-push-outline-large::before {
    content: '\\ea41';
  }
  .ngx-icon.ngx-button-push-outline-small::before {
    content: '\\ea42';
  }
  .ngx-icon.ngx-calendar::before {
    content: '\\ea43';
  }
  .ngx-icon.ngx-calendar-clock::before {
    content: '\\ea44';
  }
  .ngx-icon.ngx-calender-clock::before {
    content: '\\ea45';
  }
  .ngx-icon.ngx-cards::before {
    content: '\\ea46';
  }
  .ngx-icon.ngx-center-align::before {
    content: '\\ea47';
  }
  .ngx-icon.ngx-chart-area::before {
    content: '\\ea48';
  }
  .ngx-icon.ngx-chart-bar-bar::before {
    content: '\\ea49';
  }
  .ngx-icon.ngx-chart-bubble::before {
    content: '\\ea4a';
  }
  .ngx-icon.ngx-chart-donut::before {
    content: '\\ea4b';
  }
  .ngx-icon.ngx-chart-full-stacked-area::before {
    content: '\\ea4c';
  }
  .ngx-icon.ngx-chart-heat::before {
    content: '\\ea4d';
  }
  .ngx-icon.ngx-chart-horz-full-stack-bar::before {
    content: '\\ea4e';
  }
  .ngx-icon.ngx-chart-number-card::before {
    content: '\\ea4f';
  }
  .ngx-icon.ngx-chart-pie::before {
    content: '\\ea50';
  }
  .ngx-icon.ngx-chart-pie-grid::before {
    content: '\\ea51';
  }
  .ngx-icon.ngx-chart-scatter::before {
    content: '\\ea52';
  }
  .ngx-icon.ngx-chart-spider::before {
    content: '\\ea53';
  }
  .ngx-icon.ngx-chart-stacked-area::before {
    content: '\\ea54';
  }
  .ngx-icon.ngx-chart-vert-bar::before {
    content: '\\ea55';
  }
  .ngx-icon.ngx-chart-vert-bar2::before {
    content: '\\ea56';
  }
  .ngx-icon.ngx-chart-vert-stacked-bar::before {
    content: '\\ea57';
  }
  .ngx-icon.ngx-check::before {
    content: '\\ea58';
  }
  .ngx-icon.ngx-check-filled::before {
    content: '\\ea59';
  }
  .ngx-icon.ngx-check-filled-sm::before {
    content: '\\ea5a';
  }
  .ngx-icon.ngx-check-square-filled::before {
    content: '\\ea5b';
  }
  .ngx-icon.ngx-checklist::before {
    content: '\\ea5c';
  }
  .ngx-icon.ngx-chevron-bold-down::before {
    content: '\\ea5d';
  }
  .ngx-icon.ngx-chevron-bold-left::before {
    content: '\\ea5e';
  }
  .ngx-icon.ngx-chevron-bold-right::before {
    content: '\\ea5f';
  }
  .ngx-icon.ngx-chevron-bold-up::before {
    content: '\\ea60';
  }
  .ngx-icon.ngx-circle::before {
    content: '\\ea61';
  }
  .ngx-icon.ngx-circle-filled::before {
    content: '\\ea62';
  }
  .ngx-icon.ngx-circles::before {
    content: '\\ea63';
  }
  .ngx-icon.ngx-circuit-board::before {
    content: '\\ea64';
  }
  .ngx-icon.ngx-clipboard::before {
    content: '\\ea65';
  }
  .ngx-icon.ngx-clock::before {
    content: '\\ea66';
  }
  .ngx-icon.ngx-cloud-download::before {
    content: '\\ea67';
  }
  .ngx-icon.ngx-cloud-upload::before {
    content: '\\ea68';
  }
  .ngx-icon.ngx-code::before {
    content: '\\ea69';
  }
  .ngx-icon.ngx-cog::before {
    content: '\\ea6a';
  }
  .ngx-icon.ngx-collapse::before {
    content: '\\ea6b';
  }
  .ngx-icon.ngx-commandline::before {
    content: '\\ea6c';
  }
  .ngx-icon.ngx-comments::before {
    content: '\\ea6d';
  }
  .ngx-icon.ngx-component::before {
    content: '\\ea6e';
  }
  .ngx-icon.ngx-component-create::before {
    content: '\\ea6f';
  }
  .ngx-icon.ngx-condition::before {
    content: '\\ea70';
  }
  .ngx-icon.ngx-copy::before {
    content: '\\ea71';
  }
  .ngx-icon.ngx-copy-app::before {
    content: '\\ea72';
  }
  .ngx-icon.ngx-copy-filled::before {
    content: '\\ea73';
  }
  .ngx-icon.ngx-credit-card::before {
    content: '\\ea74';
  }
  .ngx-icon.ngx-dashboard::before {
    content: '\\ea75';
  }
  .ngx-icon.ngx-dashboard-outline::before {
    content: '\\ea76';
  }
  .ngx-icon.ngx-database::before {
    content: '\\ea77';
  }
  .ngx-icon.ngx-debug::before {
    content: '\\ea78';
  }
  .ngx-icon.ngx-devil::before {
    content: '\\ea79';
  }
  .ngx-icon.ngx-disable::before {
    content: '\\ea7a';
  }
  .ngx-icon.ngx-document::before {
    content: '\\ea7b';
  }
  .ngx-icon.ngx-documentation::before {
    content: '\\ea7c';
  }
  .ngx-icon.ngx-domain::before {
    content: '\\ea7d';
  }
  .ngx-icon.ngx-dots-horz::before {
    content: '\\ea7e';
  }
  .ngx-icon.ngx-dots-vert::before {
    content: '\\ea7f';
  }
  .ngx-icon.ngx-dots-vert-round::before {
    content: '\\ea80';
  }
  .ngx-icon.ngx-double-down::before {
    content: '\\ea81';
  }
  .ngx-icon.ngx-double-left::before {
    content: '\\ea82';
  }
  .ngx-icon.ngx-double-right::before {
    content: '\\ea83';
  }
  .ngx-icon.ngx-double-up::before {
    content: '\\ea84';
  }
  .ngx-icon.ngx-downgrade::before {
    content: '\\ea85';
  }
  .ngx-icon.ngx-downgrade-horizontal::before {
    content: '\\ea86';
  }
  .ngx-icon.ngx-download-outline::before {
    content: '\\ea87';
  }
  .ngx-icon.ngx-download-outline-large::before {
    content: '\\ea88';
  }
  .ngx-icon.ngx-download-outline-small::before {
    content: '\\ea89';
  }
  .ngx-icon.ngx-drag::before {
    content: '\\ea8a';
  }
  .ngx-icon.ngx-edit::before {
    content: '\\ea8b';
  }
  .ngx-icon.ngx-edit-app::before {
    content: '\\ea8c';
  }
  .ngx-icon.ngx-edit-outline::before {
    content: '\\ea8d';
  }
  .ngx-icon.ngx-edit-outline-large::before {
    content: '\\ea8e';
  }
  .ngx-icon.ngx-edit-outline-small::before {
    content: '\\ea8f';
  }
  .ngx-icon.ngx-email::before {
    content: '\\ea90';
  }
  .ngx-icon.ngx-enrich-small::before {
    content: '\\ea91';
  }
  .ngx-icon.ngx-escalate::before {
    content: '\\ea92';
  }
  .ngx-icon.ngx-events-outline::before {
    content: '\\ea93';
  }
  .ngx-icon.ngx-events-outline-small::before {
    content: '\\ea94';
  }
  .ngx-icon.ngx-expand::before {
    content: '\\ea95';
  }
  .ngx-icon.ngx-explore::before {
    content: '\\ea96';
  }
  .ngx-icon.ngx-export::before {
    content: '\\ea97';
  }
  .ngx-icon.ngx-export-filled::before {
    content: '\\ea98';
  }
  .ngx-icon.ngx-export-outline::before {
    content: '\\ea99';
  }
  .ngx-icon.ngx-export-outline-large::before {
    content: '\\ea9a';
  }
  .ngx-icon.ngx-export-outline-small::before {
    content: '\\ea9b';
  }
  .ngx-icon.ngx-eye::before {
    content: '\\ea9c';
  }
  .ngx-icon.ngx-eye-disabled::before {
    content: '\\ea9d';
  }
  .ngx-icon.ngx-eye-hidden::before {
    content: '\\ea9e';
  }
  .ngx-icon.ngx-field-created-by::before {
    content: '\\ea9f';
  }
  .ngx-icon.ngx-field-created-date::before {
    content: '\\eaa0';
  }
  .ngx-icon.ngx-field-date::before {
    content: '\\eaa1';
  }
  .ngx-icon.ngx-field-double-select::before {
    content: '\\eaa2';
  }
  .ngx-icon.ngx-field-dynamic::before {
    content: '\\eaa3';
  }
  .ngx-icon.ngx-field-edited-by::before {
    content: '\\eaa4';
  }
  .ngx-icon.ngx-field-edited-date::before {
    content: '\\eaa5';
  }
  .ngx-icon.ngx-field-grid::before {
    content: '\\eaa6';
  }
  .ngx-icon.ngx-field-html::before {
    content: '\\eaa7';
  }
  .ngx-icon.ngx-field-json::before {
    content: '\\eaa8';
  }
  .ngx-icon.ngx-field-list::before {
    content: '\\eaa9';
  }
  .ngx-icon.ngx-field-list-small::before {
    content: '\\eaaa';
  }
  .ngx-icon.ngx-field-lists::before {
    content: '\\eaab';
  }
  .ngx-icon.ngx-field-multiselect::before {
    content: '\\eaac';
  }
  .ngx-icon.ngx-field-number::before {
    content: '\\eaad';
  }
  .ngx-icon.ngx-field-numeric::before {
    content: '\\eaae';
  }
  .ngx-icon.ngx-field-richtext::before {
    content: '\\eaaf';
  }
  .ngx-icon.ngx-field-single-select::before {
    content: '\\eab0';
  }
  .ngx-icon.ngx-field-singleline::before {
    content: '\\eab1';
  }
  .ngx-icon.ngx-field-text::before {
    content: '\\eab2';
  }
  .ngx-icon.ngx-field-textarea::before {
    content: '\\eab3';
  }
  .ngx-icon.ngx-field-textual::before {
    content: '\\eab4';
  }
  .ngx-icon.ngx-field-users::before {
    content: '\\eab5';
  }
  .ngx-icon.ngx-filter::before {
    content: '\\eab6';
  }
  .ngx-icon.ngx-filter-bar::before {
    content: '\\eab7';
  }
  .ngx-icon.ngx-find-page::before {
    content: '\\eab8';
  }
  .ngx-icon.ngx-flame::before {
    content: '\\eab9';
  }
  .ngx-icon.ngx-folder::before {
    content: '\\eaba';
  }
  .ngx-icon.ngx-folder-closed-small::before {
    content: '\\eabb';
  }
  .ngx-icon.ngx-folder-open-small::before {
    content: '\\eabc';
  }
  .ngx-icon.ngx-folders::before {
    content: '\\eabd';
  }
  .ngx-icon.ngx-font::before {
    content: '\\eabe';
  }
  .ngx-icon.ngx-format-indent-decrease::before {
    content: '\\eabf';
  }
  .ngx-icon.ngx-format-indent-increase::before {
    content: '\\eac0';
  }
  .ngx-icon.ngx-formula::before {
    content: '\\eac1';
  }
  .ngx-icon.ngx-forward-arrow::before {
    content: '\\eac2';
  }
  .ngx-icon.ngx-forward-arrow-filled::before {
    content: '\\eac3';
  }
  .ngx-icon.ngx-full-align::before {
    content: '\\eac4';
  }
  .ngx-icon.ngx-gauge::before {
    content: '\\eac5';
  }
  .ngx-icon.ngx-gear::before {
    content: '\\eac6';
  }
  .ngx-icon.ngx-gear-small::before {
    content: '\\eac7';
  }
  .ngx-icon.ngx-gear-square::before {
    content: '\\eac8';
  }
  .ngx-icon.ngx-globe::before {
    content: '\\eac9';
  }
  .ngx-icon.ngx-graph::before {
    content: '\\eaca';
  }
  .ngx-icon.ngx-graph-alt1::before {
    content: '\\eacb';
  }
  .ngx-icon.ngx-grid-view::before {
    content: '\\eacc';
  }
  .ngx-icon.ngx-hand::before {
    content: '\\eacd';
  }
  .ngx-icon.ngx-handle::before {
    content: '\\eace';
  }
  .ngx-icon.ngx-heat::before {
    content: '\\eacf';
  }
  .ngx-icon.ngx-helper::before {
    content: '\\ead0';
  }
  .ngx-icon.ngx-history::before {
    content: '\\ead1';
  }
  .ngx-icon.ngx-horz-bar-graph-grouped::before {
    content: '\\ead2';
  }
  .ngx-icon.ngx-horz-stacked-bar::before {
    content: '\\ead3';
  }
  .ngx-icon.ngx-html-code::before {
    content: '\\ead4';
  }
  .ngx-icon.ngx-icon-chart-bar-horizontal::before {
    content: '\\ead5';
  }
  .ngx-icon.ngx-icon-chart-horz-bar::before {
    content: '\\ead6';
  }
  .ngx-icon.ngx-import-outline::before {
    content: '\\ead7';
  }
  .ngx-icon.ngx-import-outline-large::before {
    content: '\\ead8';
  }
  .ngx-icon.ngx-import-outline-small::before {
    content: '\\ead9';
  }
  .ngx-icon.ngx-info-filled::before {
    content: '\\eada';
  }
  .ngx-icon.ngx-info-filled-2::before {
    content: '\\eadb';
  }
  .ngx-icon.ngx-info-filled-small::before {
    content: '\\eadc';
  }
  .ngx-icon.ngx-ingest-small::before {
    content: '\\eadd';
  }
  .ngx-icon.ngx-inspect::before {
    content: '\\eade';
  }
  .ngx-icon.ngx-integration::before {
    content: '\\eadf';
  }
  .ngx-icon.ngx-integrations::before {
    content: '\\eae0';
  }
  .ngx-icon.ngx-ip::before {
    content: '\\eae1';
  }
  .ngx-icon.ngx-italic::before {
    content: '\\eae2';
  }
  .ngx-icon.ngx-key::before {
    content: '\\eae3';
  }
  .ngx-icon.ngx-key-outline::before {
    content: '\\eae4';
  }
  .ngx-icon.ngx-key-outline-small::before {
    content: '\\eae5';
  }
  .ngx-icon.ngx-keyboard::before {
    content: '\\eae6';
  }
  .ngx-icon.ngx-keyboard-return::before {
    content: '\\eae7';
  }
  .ngx-icon.ngx-layer::before {
    content: '\\eae8';
  }
  .ngx-icon.ngx-left-align::before {
    content: '\\eae9';
  }
  .ngx-icon.ngx-library::before {
    content: '\\eaea';
  }
  .ngx-icon.ngx-line-chart::before {
    content: '\\eaeb';
  }
  .ngx-icon.ngx-line-graph::before {
    content: '\\eaec';
  }
  .ngx-icon.ngx-linear-gauge::before {
    content: '\\eaed';
  }
  .ngx-icon.ngx-link::before {
    content: '\\eaee';
  }
  .ngx-icon.ngx-list::before {
    content: '\\eaef';
  }
  .ngx-icon.ngx-list-1::before {
    content: '\\eaf0';
  }
  .ngx-icon.ngx-list-view::before {
    content: '\\eaf1';
  }
  .ngx-icon.ngx-loading::before {
    content: '\\eaf2';
  }
  .ngx-icon.ngx-locate-filled::before {
    content: '\\eaf3';
  }
  .ngx-icon.ngx-locate-outline::before {
    content: '\\eaf4';
  }
  .ngx-icon.ngx-locate-outline-large::before {
    content: '\\eaf5';
  }
  .ngx-icon.ngx-location::before {
    content: '\\eaf6';
  }
  .ngx-icon.ngx-lock::before {
    content: '\\eaf7';
  }
  .ngx-icon.ngx-lock-sm::before {
    content: '\\eaf8';
  }
  .ngx-icon.ngx-mail::before {
    content: '\\eaf9';
  }
  .ngx-icon.ngx-mail-1::before {
    content: '\\eafa';
  }
  .ngx-icon.ngx-map::before {
    content: '\\eafb';
  }
  .ngx-icon.ngx-marketplace::before {
    content: '\\eafc';
  }
  .ngx-icon.ngx-menu::before {
    content: '\\eafd';
  }
  .ngx-icon.ngx-mfa::before {
    content: '\\eafe';
  }
  .ngx-icon.ngx-mic::before {
    content: '\\eaff';
  }
  .ngx-icon.ngx-minus::before {
    content: '\\eb00';
  }
  .ngx-icon.ngx-money::before {
    content: '\\eb01';
  }
  .ngx-icon.ngx-mouse-hold::before {
    content: '\\eb02';
  }
  .ngx-icon.ngx-multi-line::before {
    content: '\\eb03';
  }
  .ngx-icon.ngx-new-app::before {
    content: '\\eb04';
  }
  .ngx-icon.ngx-notation-arrow-down-left::before {
    content: '\\eb05';
  }
  .ngx-icon.ngx-notation-arrow-up::before {
    content: '\\eb06';
  }
  .ngx-icon.ngx-numbered-list::before {
    content: '\\eb07';
  }
  .ngx-icon.ngx-open::before {
    content: '\\eb08';
  }
  .ngx-icon.ngx-orchestration::before {
    content: '\\eb09';
  }
  .ngx-icon.ngx-paragraph::before {
    content: '\\eb0a';
  }
  .ngx-icon.ngx-pause::before {
    content: '\\eb0b';
  }
  .ngx-icon.ngx-pause-circle::before {
    content: '\\eb0c';
  }
  .ngx-icon.ngx-percent-gauge::before {
    content: '\\eb0d';
  }
  .ngx-icon.ngx-phone::before {
    content: '\\eb0e';
  }
  .ngx-icon.ngx-photo::before {
    content: '\\eb0f';
  }
  .ngx-icon.ngx-pie-chart::before {
    content: '\\eb10';
  }
  .ngx-icon.ngx-pin::before {
    content: '\\eb11';
  }
  .ngx-icon.ngx-plane::before {
    content: '\\eb12';
  }
  .ngx-icon.ngx-play::before {
    content: '\\eb13';
  }
  .ngx-icon.ngx-play-circle::before {
    content: '\\eb14';
  }
  .ngx-icon.ngx-playbook-outline::before {
    content: '\\eb15';
  }
  .ngx-icon.ngx-playbook-outline-small::before {
    content: '\\eb16';
  }
  .ngx-icon.ngx-plugin::before {
    content: '\\eb17';
  }
  .ngx-icon.ngx-plugin-outline::before {
    content: '\\eb18';
  }
  .ngx-icon.ngx-plugin-outline-small::before {
    content: '\\eb19';
  }
  .ngx-icon.ngx-plus::before {
    content: '\\eb1a';
  }
  .ngx-icon.ngx-plus-bold::before {
    content: '\\eb1b';
  }
  .ngx-icon.ngx-prev::before {
    content: '\\eb1c';
  }
  .ngx-icon.ngx-printer::before {
    content: '\\eb1d';
  }
  .ngx-icon.ngx-profile::before {
    content: '\\eb1e';
  }
  .ngx-icon.ngx-profile-filled::before {
    content: '\\eb1f';
  }
  .ngx-icon.ngx-promote::before {
    content: '\\eb20';
  }
  .ngx-icon.ngx-promote-horizontal::before {
    content: '\\eb21';
  }
  .ngx-icon.ngx-question::before {
    content: '\\eb22';
  }
  .ngx-icon.ngx-question-filled::before {
    content: '\\eb23';
  }
  .ngx-icon.ngx-question-filled-sm::before {
    content: '\\eb24';
  }
  .ngx-icon.ngx-radio-button::before {
    content: '\\eb25';
  }
  .ngx-icon.ngx-redo::before {
    content: '\\eb26';
  }
  .ngx-icon.ngx-redo-all::before {
    content: '\\eb27';
  }
  .ngx-icon.ngx-reference::before {
    content: '\\eb28';
  }
  .ngx-icon.ngx-reference-grid::before {
    content: '\\eb29';
  }
  .ngx-icon.ngx-reference-multi::before {
    content: '\\eb2a';
  }
  .ngx-icon.ngx-reference-single::before {
    content: '\\eb2b';
  }
  .ngx-icon.ngx-reference-tree::before {
    content: '\\eb2c';
  }
  .ngx-icon.ngx-refresh::before {
    content: '\\eb2d';
  }
  .ngx-icon.ngx-refresh-circle::before {
    content: '\\eb2e';
  }
  .ngx-icon.ngx-refresh-small::before {
    content: '\\eb2f';
  }
  .ngx-icon.ngx-remove::before {
    content: '\\eb30';
  }
  .ngx-icon.ngx-remove-edge::before {
    content: '\\eb31';
  }
  .ngx-icon.ngx-remove-node::before {
    content: '\\eb32';
  }
  .ngx-icon.ngx-remove-users::before {
    content: '\\eb33';
  }
  .ngx-icon.ngx-repeat::before {
    content: '\\eb34';
  }
  .ngx-icon.ngx-replace::before {
    content: '\\eb35';
  }
  .ngx-icon.ngx-reports::before {
    content: '\\eb36';
  }
  .ngx-icon.ngx-reports-outline::before {
    content: '\\eb37';
  }
  .ngx-icon.ngx-resize::before {
    content: '\\eb38';
  }
  .ngx-icon.ngx-right-align::before {
    content: '\\eb39';
  }
  .ngx-icon.ngx-rocket::before {
    content: '\\eb3a';
  }
  .ngx-icon.ngx-rotate::before {
    content: '\\eb3b';
  }
  .ngx-icon.ngx-rule-outline::before {
    content: '\\eb3c';
  }
  .ngx-icon.ngx-runner::before {
    content: '\\eb3d';
  }
  .ngx-icon.ngx-runs-outline::before {
    content: '\\eb3e';
  }
  .ngx-icon.ngx-runs-outline-small::before {
    content: '\\eb3f';
  }
  .ngx-icon.ngx-sankey::before {
    content: '\\eb40';
  }
  .ngx-icon.ngx-save::before {
    content: '\\eb41';
  }
  .ngx-icon.ngx-save-outline::before {
    content: '\\eb42';
  }
  .ngx-icon.ngx-save-outline-large::before {
    content: '\\eb43';
  }
  .ngx-icon.ngx-save-outline-small::before {
    content: '\\eb44';
  }
  .ngx-icon.ngx-screen::before {
    content: '\\eb45';
  }
  .ngx-icon.ngx-screen-1::before {
    content: '\\eb46';
  }
  .ngx-icon.ngx-search::before {
    content: '\\eb47';
  }
  .ngx-icon.ngx-section::before {
    content: '\\eb48';
  }
  .ngx-icon.ngx-select-all::before {
    content: '\\eb49';
  }
  .ngx-icon.ngx-select-user::before {
    content: '\\eb4a';
  }
  .ngx-icon.ngx-select-users::before {
    content: '\\eb4b';
  }
  .ngx-icon.ngx-sensor-outline::before {
    content: '\\eb4c';
  }
  .ngx-icon.ngx-sensor-outline-small::before {
    content: '\\eb4d';
  }
  .ngx-icon.ngx-server::before {
    content: '\\eb4e';
  }
  .ngx-icon.ngx-shield::before {
    content: '\\eb4f';
  }
  .ngx-icon.ngx-shrink::before {
    content: '\\eb50';
  }
  .ngx-icon.ngx-skip::before {
    content: '\\eb51';
  }
  .ngx-icon.ngx-slide-left::before {
    content: '\\eb52';
  }
  .ngx-icon.ngx-slide-right::before {
    content: '\\eb53';
  }
  .ngx-icon.ngx-sliders::before {
    content: '\\eb54';
  }
  .ngx-icon.ngx-smartphone::before {
    content: '\\eb55';
  }
  .ngx-icon.ngx-smiley-frown::before {
    content: '\\eb56';
  }
  .ngx-icon.ngx-snapshot::before {
    content: '\\eb57';
  }
  .ngx-icon.ngx-solution::before {
    content: '\\eb58';
  }
  .ngx-icon.ngx-sort-ascending::before {
    content: '\\eb59';
  }
  .ngx-icon.ngx-sort-descending::before {
    content: '\\eb5a';
  }
  .ngx-icon.ngx-spaces::before {
    content: '\\eb5b';
  }
  .ngx-icon.ngx-spaces-list::before {
    content: '\\eb5c';
  }
  .ngx-icon.ngx-spaces-outline::before {
    content: '\\eb5d';
  }
  .ngx-icon.ngx-spaces-outline-large::before {
    content: '\\eb5e';
  }
  .ngx-icon.ngx-speedometer::before {
    content: '\\eb5f';
  }
  .ngx-icon.ngx-split-handle::before {
    content: '\\eb60';
  }
  .ngx-icon.ngx-square::before {
    content: '\\eb61';
  }
  .ngx-icon.ngx-square-filled::before {
    content: '\\eb62';
  }
  .ngx-icon.ngx-star::before {
    content: '\\eb63';
  }
  .ngx-icon.ngx-star-filled::before {
    content: '\\eb64';
  }
  .ngx-icon.ngx-stars::before {
    content: '\\eb65';
  }
  .ngx-icon.ngx-stopwatch::before {
    content: '\\eb66';
  }
  .ngx-icon.ngx-superscript::before {
    content: '\\eb67';
  }
  .ngx-icon.ngx-swap::before {
    content: '\\eb68';
  }
  .ngx-icon.ngx-switch::before {
    content: '\\eb69';
  }
  .ngx-icon.ngx-system-diagnostics::before {
    content: '\\eb6a';
  }
  .ngx-icon.ngx-system-diagnostics-2::before {
    content: '\\eb6b';
  }
  .ngx-icon.ngx-table::before {
    content: '\\eb6c';
  }
  .ngx-icon.ngx-tabs::before {
    content: '\\eb6d';
  }
  .ngx-icon.ngx-tag-filled::before {
    content: '\\eb6e';
  }
  .ngx-icon.ngx-tags-outline::before {
    content: '\\eb6f';
  }
  .ngx-icon.ngx-target::before {
    content: '\\eb70';
  }
  .ngx-icon.ngx-task-outline::before {
    content: '\\eb71';
  }
  .ngx-icon.ngx-thumb-down-filled::before {
    content: '\\eb72';
  }
  .ngx-icon.ngx-thumb-down-outline::before {
    content: '\\eb73';
  }
  .ngx-icon.ngx-thumb-down-outline-large::before {
    content: '\\eb74';
  }
  .ngx-icon.ngx-thumb-up-filled::before {
    content: '\\eb75';
  }
  .ngx-icon.ngx-thumb-up-outline::before {
    content: '\\eb76';
  }
  .ngx-icon.ngx-thumb-up-outline-large::before {
    content: '\\eb77';
  }
  .ngx-icon.ngx-tracking-id::before {
    content: '\\eb78';
  }
  .ngx-icon.ngx-transfer::before {
    content: '\\eb79';
  }
  .ngx-icon.ngx-trash::before {
    content: '\\eb7a';
  }
  .ngx-icon.ngx-tree::before {
    content: '\\eb7b';
  }
  .ngx-icon.ngx-tree-collapse::before {
    content: '\\eb7c';
  }
  .ngx-icon.ngx-tree-expand::before {
    content: '\\eb7d';
  }
  .ngx-icon.ngx-trend-down::before {
    content: '\\eb7e';
  }
  .ngx-icon.ngx-trend-level::before {
    content: '\\eb7f';
  }
  .ngx-icon.ngx-trend-up::before {
    content: '\\eb80';
  }
  .ngx-icon.ngx-trending::before {
    content: '\\eb81';
  }
  .ngx-icon.ngx-underline::before {
    content: '\\eb82';
  }
  .ngx-icon.ngx-undo::before {
    content: '\\eb83';
  }
  .ngx-icon.ngx-undo-all::before {
    content: '\\eb84';
  }
  .ngx-icon.ngx-unlink::before {
    content: '\\eb85';
  }
  .ngx-icon.ngx-upload-outline::before {
    content: '\\eb86';
  }
  .ngx-icon.ngx-upload-outline-large::before {
    content: '\\eb87';
  }
  .ngx-icon.ngx-upload-outline-small::before {
    content: '\\eb88';
  }
  .ngx-icon.ngx-user::before {
    content: '\\eb89';
  }
  .ngx-icon.ngx-user-add::before {
    content: '\\eb8a';
  }
  .ngx-icon.ngx-user-circle::before {
    content: '\\eb8b';
  }
  .ngx-icon.ngx-user-groups::before {
    content: '\\eb8c';
  }
  .ngx-icon.ngx-users::before {
    content: '\\eb8d';
  }
  .ngx-icon.ngx-version::before {
    content: '\\eb8e';
  }
  .ngx-icon.ngx-vert-bar-graph-grouped::before {
    content: '\\eb8f';
  }
  .ngx-icon.ngx-vert-full-stack-bar::before {
    content: '\\eb90';
  }
  .ngx-icon.ngx-view-code::before {
    content: '\\eb91';
  }
  .ngx-icon.ngx-view-designer::before {
    content: '\\eb92';
  }
  .ngx-icon.ngx-view-split::before {
    content: '\\eb93';
  }
  .ngx-icon.ngx-wand::before {
    content: '\\eb94';
  }
  .ngx-icon.ngx-warning-filled::before {
    content: '\\eb95';
  }
  .ngx-icon.ngx-warning-filled-sm::before {
    content: '\\eb96';
  }
  .ngx-icon.ngx-warning-thin::before {
    content: '\\eb97';
  }
  .ngx-icon.ngx-web-api::before {
    content: '\\eb98';
  }
  .ngx-icon.ngx-webhook-outline::before {
    content: '\\eb99';
  }
  .ngx-icon.ngx-webhook-outline-large::before {
    content: '\\eb9a';
  }
  .ngx-icon.ngx-webhook-outline-small::before {
    content: '\\eb9b';
  }
  .ngx-icon.ngx-widget::before {
    content: '\\eb9c';
  }
  .ngx-icon.ngx-worker::before {
    content: '\\eb9d';
  }
  .ngx-icon.ngx-workflow::before {
    content: '\\eb9e';
  }
  .ngx-icon.ngx-workflow-alternate::before {
    content: '\\eb9f';
  }
  .ngx-icon.ngx-workflow-alternate-large::before {
    content: '\\eba0';
  }
  .ngx-icon.ngx-workflow-alternate-small::before {
    content: '\\eba1';
  }
  .ngx-icon.ngx-workspaces::before {
    content: '\\eba2';
  }
  .ngx-icon.ngx-workstation::before {
    content: '\\eba3';
  }
  .ngx-icon.ngx-wrench::before {
    content: '\\eba4';
  }
  .ngx-icon.ngx-x::before {
    content: '\\eba5';
  }
  .ngx-icon.ngx-x-filled::before {
    content: '\\eba6';
  }
  .ngx-icon.ngx-x-small::before {
    content: '\\eba7';
  }
`,Xs=f`
  :host {
    display: inline-block;
    vertical-align: baseline;
  }

  :host svg {
    fill: currentColor;
    display: block;
    width: 1em;
    height: 1em;
  }

  .swim-icon__stack {
    position: relative;
    display: inline-block;
    width: 1em;
    height: 1em;
    line-height: 1em;
    vertical-align: baseline;
  }

  .swim-icon__stack .swim-icon__i {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    font-size: inherit;
    line-height: 1em;
    display: block;
  }

  /* Later icons paint on top (e.g. x over square-filled) */
  .swim-icon__stack .swim-icon__i--1 {
    z-index: 1;
  }
  .swim-icon__stack .swim-icon__i--2 {
    z-index: 2;
  }
  .swim-icon__stack .swim-icon__i--3 {
    z-index: 3;
  }

  .swim-icon__stack .swim-icon__i::before {
    line-height: 1em;
  }

  /* Modifier: badge overlay (small icon at top-right), match ngx-ui icons-effects.scss */
  .icon-fx-badge {
    font-size: 0.25em !important;
    position: relative;
    top: -0.5em;
    left: 0.5em;
    width: auto;
    height: auto;
  }

  /* Modifier: red color for overlay icon (match ngx-ui) */
  .text-red {
    color: var(--red-500, rgb(255, 69, 20));
  }

  /* Font icon base (glyphs in icon-font-glyphs.ts) */
  .ngx-icon {
    display: inline-block;
    font: normal normal normal 1em/1 'swim-ngx-icon';
    flex-shrink: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Loading spinner: animate only the inner glyph inside this shadow root */
  @keyframes swim-icon-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  :host([font-icon='loading']) .swim-icon__i {
    animation: swim-icon-spin 1s linear infinite;
  }

  :host([font-icon='loading']) span[part='icon'] {
    animation: swim-icon-spin 1s linear infinite;
  }

  ${Zs}
`,er=n=>`ngx-icon ${n.trim().split(" ").map(t=>{const[o,i]=t.split(":");return o.length?`${o} ${o}-${i}`:i}).join(" ")}`;class tr{constructor(){this._defaultFontSetClass="ngx",this._iconMap=new Map}setDefaultFontSetClass(e){return this._defaultFontSetClass=e,this._defaultFontSetClass}get(e,t){return this.lookup(e,t).map(o=>er(o))}lookup(e,t){const o=t??this._defaultFontSetClass;return(Array.isArray(e)?e:[e]).reduce((i,s)=>{const r=this._expandKeys(s,o).map(l=>{const c=this._iconMap.get(l);return c&&c.length===1?c[0]:l}).join(" ");return i.concat(this._iconMap.get(r)||[r])},[])}add(e,t){const o=this._expandKeys(e,this._defaultFontSetClass).join(" "),i=this.lookup(t);this._iconMap.set(o,i)}_expandKeys(e,t){return e.split(" ").map(o=>o.includes(":")?o:`${t}:${o}`)}}const ir=new tr,or="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",nr="swim-ngx-icon";let Ko=!1;function sr(){if(Ko||typeof document>"u")return;const n=document.createElement("style");n.setAttribute("data-swim-icon-font",""),n.textContent=`
@font-face {
  font-family: '${nr}';
  src: url('data:font/woff2;base64,${or}') format('woff2');
  font-weight: normal;
  font-style: normal;
  font-display: block;
}
`,document.head.appendChild(n),Ko=!0}var rr=Object.defineProperty,Ot=(n,e,t,o)=>{for(var i=void 0,s=n.length-1,r;s>=0;s--)(r=n[s])&&(i=r(e,t,i)||i);return i&&rr(e,t,i),i};const jo="swim-icon",Ni=class Ni extends _{constructor(){super(...arguments),this.fontIcon="",this.alt="",this.fontSet="ngx",this.iconClass="",this._cssClasses=[],this._iconClassTokensOnHost=[]}connectedCallback(){super.connectedCallback(),sr(),this._updateFontIcon()}updated(e){super.updated(e),(e.has("fontIcon")||e.has("fontSet"))&&this._updateFontIcon(),e.has("iconClass")&&this._syncIconClassToHost()}_syncIconClassToHost(){var t;const e=(((t=this.iconClass)==null?void 0:t.trim())??"").split(/\s+/).filter(Boolean);this._iconClassTokensOnHost.forEach(o=>this.classList.remove(o)),e.forEach(o=>this.classList.add(o)),this._iconClassTokensOnHost=e}_parseFontIcon(e){if(Array.isArray(e))return e.filter(Boolean);if(typeof e!="string"||!e)return[];const t=e.trim();if(t.startsWith("["))try{const o=JSON.parse(t);return Array.isArray(o)?o:[t]}catch{return[t]}return[t]}_updateFontIcon(){const e=this._parseFontIcon(this.fontIcon);if(e.length===0){this._cssClasses=[];return}this._cssClasses=ir.get(e,this.fontSet)}render(){var s;const e=this._cssClasses,t=!!this.alt,o=((s=this.iconClass)==null?void 0:s.trim())??"",i=o?` ${o}`:"";return!e||e.length===0?d`
        <span
          part="icon"
          class="${o}"
          role="${t?"img":"presentation"}"
          aria-label="${t?this.alt:u}"
          aria-hidden="${t?"false":"true"}"
        >
          <slot></slot>
        </span>
      `:e.length===1?d`
        <i
          part="icon"
          class="swim-icon__i ${e[0]}${i}"
          role="${t?"img":"presentation"}"
          aria-label="${t?this.alt:u}"
          aria-hidden="${t?"false":"true"}"
        ></i>
      `:d`
      <span
        class="swim-icon__stack"
        role="${t?"img":"presentation"}"
        aria-label="${t?this.alt:u}"
        aria-hidden="${t?"false":"true"}"
      >
        ${e.map((r,l)=>d`<i part="icon icon-${l}" class="swim-icon__i swim-icon__i--${l} ${r}${i}"></i>`)}
      </span>
    `}};Ni.styles=[x,Xs];let Me=Ni;Ot([a({type:String,attribute:"font-icon"})],Me.prototype,"fontIcon");Ot([a({type:String})],Me.prototype,"alt");Ot([a({type:String,attribute:"font-set"})],Me.prototype,"fontSet");Ot([a({type:String,attribute:"icon-class"})],Me.prototype,"iconClass");Ot([v()],Me.prototype,"_cssClasses");customElements.get(jo)||customElements.define(jo,Me);var ar=Object.defineProperty,lr=Object.getOwnPropertyDescriptor,fe=(n,e,t,o)=>{for(var i=o>1?void 0:o?lr(e,t):e,s=n.length-1,r;s>=0;s--)(r=n[s])&&(i=(o?r(e,t,i):r(i))||i);return o&&i&&ar(e,t,i),i};const Qo="swim-button",Gi=class Gi extends _{constructor(){super(...arguments),this.variant="default",this.size="medium",this._disabled=!1,this._state=J.Active,this.type="button",this._inProgress=!1,this._success=!1,this._fail=!1}get disabled(){return this._disabled}set disabled(e){this._disabled=p(e)}get state(){return this._state}set state(e){this._state=e,this._updateStateFlags()}get timeout(){return this._timeout===void 0?3e3:this._timeout}set timeout(e){this._timeout=A(e)}get promise(){return this._promise}set promise(e){this._promise=e,this._handlePromise()}connectedCallback(){super.connectedCallback(),this._updateState()}disconnectedCallback(){super.disconnectedCallback(),this._clearTimer()}render(){return d`
      <button part="button" type="${this.type}" ?disabled="${this.disabled}" @click="${this._handleClick}">
        <span class="content">
          <slot></slot>
        </span>
        <span class="state-icon">${this._renderStateIcon()}</span>
      </button>
    `}_renderStateIcon(){return this._inProgress?d`<swim-icon class="state-icon" font-icon="loading"></swim-icon>`:this._success?d`<swim-icon class="state-icon" font-icon="check"></swim-icon>`:this._fail?d`<swim-icon class="state-icon" font-icon="x"></swim-icon>`:u}_handleClick(e){if(this.disabled){e.stopPropagation(),e.preventDefault();return}}_updateStateFlags(){this._inProgress=this._state===J.InProgress,this._success=this._state===J.Success,this._fail=this._state===J.Fail}_updateState(){this._state||(this.state=J.Active),this.timeout&&(this._state===J.Success||this._state===J.Fail||this._state===J.InProgress)&&(this._clearTimer(),this._timer=window.setTimeout(()=>{this.state=J.Active,this._updateState()},this.timeout))}_handlePromise(){this._promise&&(this.state=J.InProgress,this._promise.then(()=>{this.state=J.Success,this._updateState()}).catch(()=>{this.state=J.Fail,this._updateState()}))}_clearTimer(){this._timer!==void 0&&(clearTimeout(this._timer),this._timer=void 0)}};Gi.styles=[x,Qs];let K=Gi;fe([a({type:String,reflect:!0})],K.prototype,"variant",2);fe([a({type:String,reflect:!0})],K.prototype,"size",2);fe([a({type:Boolean,reflect:!0})],K.prototype,"disabled",1);fe([a({type:String,reflect:!0})],K.prototype,"state",1);fe([a({type:String})],K.prototype,"type",2);fe([a({type:Number})],K.prototype,"timeout",1);fe([a({attribute:!1})],K.prototype,"promise",1);fe([v()],K.prototype,"_inProgress",2);fe([v()],K.prototype,"_success",2);fe([v()],K.prototype,"_fail",2);customElements.get(Qo)||customElements.define(Qo,K);const cr=f`
  :host {
    display: inline-flex;
    position: relative;
    box-sizing: border-box;

    /* Default colors - slotted buttons inherit via --button-* (swim-button uses these with fallbacks) */
    --button-bg: var(--grey-600);
    --button-border: var(--grey-600);
    --button-text: var(--white);
    --button-hover: var(--grey-700);
  }

  :host([button-group-style='primary']) {
    --button-bg: var(--blue-400);
    --button-border: var(--blue-400);
    --button-text: var(--white);
    --button-hover: var(--blue-500);
  }

  /* Contained group: slotted buttons use group colors and no individual shadow */
  :host([variant='contained']) {
    --button-shadow: none;
  }

  /* Horizontal: align items */
  :host([orientation='horizontal']) {
    align-items: center;
  }

  /* Vertical: column layout */
  :host([orientation='vertical']) {
    flex-direction: column;
    align-items: stretch;
  }

  /* Contained variant: unify slotted button appearance and remove radius between items */
  :host([variant='contained'][orientation='horizontal']) ::slotted(swim-button),
  :host([variant='contained'][orientation='horizontal']) ::slotted(button) {
    max-height: 30px;
  }

  :host([variant='contained'][orientation='horizontal']) ::slotted(swim-button:first-child),
  :host([variant='contained'][orientation='horizontal']) ::slotted(button:first-child) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  :host([variant='contained'][orientation='horizontal']) ::slotted(swim-button:last-child),
  :host([variant='contained'][orientation='horizontal']) ::slotted(button:last-child) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  :host([variant='contained'][orientation='horizontal']) ::slotted(swim-button:not(:first-child):not(:last-child)),
  :host([variant='contained'][orientation='horizontal']) ::slotted(button:not(:first-child):not(:last-child)) {
    border-radius: 0;
  }

  :host([variant='contained'][orientation='horizontal']) ::slotted(swim-button:not(:first-child)),
  :host([variant='contained'][orientation='horizontal']) ::slotted(button:not(:first-child)) {
    border-left: 0;
  }

  :host([variant='contained'][orientation='horizontal']) ::slotted(swim-button:not(:last-child)),
  :host([variant='contained'][orientation='horizontal']) ::slotted(button:not(:last-child)) {
    margin-right: 1px;
  }

  /* Vertical contained */
  :host([variant='contained'][orientation='vertical']) ::slotted(swim-button:first-child),
  :host([variant='contained'][orientation='vertical']) ::slotted(button:first-child) {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  :host([variant='contained'][orientation='vertical']) ::slotted(swim-button:last-child),
  :host([variant='contained'][orientation='vertical']) ::slotted(button:last-child) {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  :host([variant='contained'][orientation='vertical']) ::slotted(swim-button:not(:first-child):not(:last-child)),
  :host([variant='contained'][orientation='vertical']) ::slotted(button:not(:first-child):not(:last-child)) {
    border-radius: 0;
  }

  :host([variant='contained'][orientation='vertical']) ::slotted(swim-button:not(:first-child)),
  :host([variant='contained'][orientation='vertical']) ::slotted(button:not(:first-child)) {
    border-top: 0;
  }

  :host([variant='contained'][orientation='vertical']) ::slotted(swim-button:not(:last-child)),
  :host([variant='contained'][orientation='vertical']) ::slotted(button:not(:last-child)) {
    margin-bottom: 1px;
  }

  /* Text variant: divider between items */
  :host([variant='text'][orientation='horizontal']) ::slotted(swim-button:not(:last-child)),
  :host([variant='text'][orientation='horizontal']) ::slotted(button:not(:last-child)) {
    border-right: 1px solid var(--white);
  }

  :host([variant='text'][orientation='vertical']) ::slotted(swim-button:not(:last-child)),
  :host([variant='text'][orientation='vertical']) ::slotted(button:not(:last-child)) {
    border-bottom: 1px solid var(--white);
  }
`;var as=(n=>(n.Horizontal="horizontal",n.Vertical="vertical",n))(as||{}),ls=(n=>(n.Contained="contained",n.Text="text",n))(ls||{}),cs=(n=>(n.Default="default",n.Primary="primary",n))(cs||{}),dr=Object.defineProperty,Mi=(n,e,t,o)=>{for(var i=void 0,s=n.length-1,r;s>=0;s--)(r=n[s])&&(i=r(e,t,i)||i);return i&&dr(e,t,i),i};const Zo="swim-button-group",Ui=class Ui extends _{constructor(){super(...arguments),this.orientation=as.Horizontal,this.variant=ls.Contained,this.buttonGroupStyle=cs.Default}render(){return d`<slot></slot>`}};Ui.styles=[x,cr];let st=Ui;Mi([a({type:String,reflect:!0})],st.prototype,"orientation");Mi([a({type:String,reflect:!0})],st.prototype,"variant");Mi([a({attribute:"button-group-style",type:String,reflect:!0})],st.prototype,"buttonGroupStyle");customElements.get(Zo)||customElements.define(Zo,st);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Le={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4},Pi=n=>(...e)=>({_$litDirective$:n,values:e});class Fi{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,o){this._$Ct=e,this._$AM=t,this._$Ci=o}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{I:hr}=Ys,ur=n=>n.strings===void 0,Xo=()=>document.createComment(""),bt=(n,e,t)=>{var s;const o=n._$AA.parentNode,i=e===void 0?n._$AB:e._$AA;if(t===void 0){const r=o.insertBefore(Xo(),i),l=o.insertBefore(Xo(),i);t=new hr(r,l,n,n.options)}else{const r=t._$AB.nextSibling,l=t._$AM,c=l!==n;if(c){let h;(s=t._$AQ)==null||s.call(t,n),t._$AM=n,t._$AP!==void 0&&(h=n._$AU)!==l._$AU&&t._$AP(h)}if(r!==i||c){let h=t._$AA;for(;h!==r;){const w=h.nextSibling;o.insertBefore(h,i),h=w}}}return t},qe=(n,e,t=n)=>(n._$AI(e,t),n),pr={},ds=(n,e=pr)=>n._$AH=e,gr=n=>n._$AH,ki=n=>{n._$AR(),n._$AA.remove()};/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const en=Pi(class extends Fi{constructor(n){if(super(n),n.type!==Le.PROPERTY&&n.type!==Le.ATTRIBUTE&&n.type!==Le.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!ur(n))throw Error("`live` bindings can only contain a single expression")}render(n){return n}update(n,[e]){if(e===oe||e===u)return e;const t=n.element,o=n.name;if(n.type===Le.PROPERTY){if(e===t[o])return oe}else if(n.type===Le.BOOLEAN_ATTRIBUTE){if(!!e===t.hasAttribute(o))return oe}else if(n.type===Le.ATTRIBUTE&&t.getAttribute(o)===e+"")return oe;return ds(n),e}});/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ce=n=>n??u,ct=f`
  /* Only set standard scrollbar props in browsers that don't support -webkit-scrollbar.
   * Chrome 121+ disables ::-webkit-scrollbar (and thumb :hover) when scrollbar-color/width are set. */
  @supports not selector(::-webkit-scrollbar) {
    .swim-scroll,
    .swim-scroll-overlay,
    .swim-scroll-muted,
    .swim-scroll * {
      scrollbar-width: thin;
      scrollbar-color: rgb(80, 92, 117) transparent;
    }
  }

  /* Base: make element scrollable so scrollbar styling applies (matches overlay/muted) */
  .swim-scroll {
    overflow: auto;
    overflow: overlay;
  }

  .swim-scroll::-webkit-scrollbar,
  .swim-scroll-overlay::-webkit-scrollbar,
  .swim-scroll-muted::-webkit-scrollbar,
  .swim-scroll *::-webkit-scrollbar {
    width: 13px;
    height: 13px;
  }

  /* Track: transparent (matches ngx-ui scrollbars.scss) */
  .swim-scroll::-webkit-scrollbar-track,
  .swim-scroll-overlay::-webkit-scrollbar-track,
  .swim-scroll-muted::-webkit-scrollbar-track,
  .swim-scroll *::-webkit-scrollbar-track {
    background-color: transparent;
    border-radius: 10px;
    margin: 0;
  }

  .swim-scroll::-webkit-scrollbar-corner,
  .swim-scroll-overlay::-webkit-scrollbar-corner,
  .swim-scroll-muted::-webkit-scrollbar-corner,
  .swim-scroll *::-webkit-scrollbar-corner {
    background-color: transparent;
  }

  .swim-scroll::-webkit-scrollbar-thumb,
  .swim-scroll-overlay::-webkit-scrollbar-thumb,
  .swim-scroll-muted::-webkit-scrollbar-thumb,
  .swim-scroll *::-webkit-scrollbar-thumb {
    border-radius: 6px;
    background-clip: padding-box;
    border: 4px solid transparent;
  }

  .swim-scroll::-webkit-scrollbar-button,
  .swim-scroll::-webkit-scrollbar-track-piece,
  .swim-scroll::-webkit-scrollbar-corner,
  .swim-scroll::-webkit-resizer,
  .swim-scroll-overlay::-webkit-scrollbar-button,
  .swim-scroll-overlay::-webkit-scrollbar-track-piece,
  .swim-scroll-overlay::-webkit-scrollbar-corner,
  .swim-scroll-overlay::-webkit-resizer,
  .swim-scroll-muted::-webkit-scrollbar-button,
  .swim-scroll-muted::-webkit-scrollbar-track-piece,
  .swim-scroll-muted::-webkit-scrollbar-corner,
  .swim-scroll-muted::-webkit-resizer,
  .swim-scroll *::-webkit-scrollbar-button,
  .swim-scroll *::-webkit-scrollbar-track-piece,
  .swim-scroll *::-webkit-scrollbar-corner,
  .swim-scroll *::-webkit-resizer {
    display: none;
  }

  /* Default & overlay: thumb 50% opacity (rest), full opacity on hover (matches ngx-ui). */
  /* Use literal rgba for default so scrollbar pseudo-elements always get a distinct rest state. */
  .swim-scroll::-webkit-scrollbar-thumb,
  .swim-scroll *::-webkit-scrollbar-thumb,
  .swim-scroll-overlay::-webkit-scrollbar-thumb {
    background-color: rgba(80, 92, 117, 0.5);
  }

  .swim-scroll::-webkit-scrollbar-thumb:hover,
  .swim-scroll *::-webkit-scrollbar-thumb:hover,
  .swim-scroll-overlay::-webkit-scrollbar-thumb:hover {
    background-color: rgb(80, 92, 117);
  }

  /* Overlay: scrollbars hidden until hover */
  .swim-scroll-overlay {
    overflow: auto;
    overflow: overlay;
    -ms-overflow-style: -ms-autohiding-scrollbar;
  }

  .swim-scroll-overlay::-webkit-scrollbar {
    display: none;
  }

  .swim-scroll-overlay:hover::-webkit-scrollbar {
    display: initial;
  }

  /* Muted: thumb 30% → 50% on container hover → 100% on thumb hover (matches ngx-ui). Literal rgba for reliability. */
  .swim-scroll-muted {
    overflow: auto;
    overflow: overlay;
  }

  .swim-scroll-muted::-webkit-scrollbar-thumb {
    background-color: rgba(80, 92, 117, 0.3);
  }

  .swim-scroll-muted:hover::-webkit-scrollbar-thumb {
    background-color: rgba(80, 92, 117, 0.5);
  }

  .swim-scroll-muted:hover::-webkit-scrollbar-thumb:hover {
    background-color: rgb(80, 92, 117);
  }
`,mr=f`
  :host {
    display: block;
    max-width: 100%;
    margin-top: var(--spacing-16);
    margin-bottom: var(--spacing-8);
    line-height: calc(1em + 0.75em);
    padding-top: calc(0.75rem + 8px);
    padding-bottom: 0;
  }

  :host([marginless]) {
    margin-top: 0;
    margin-bottom: 0;
  }

  :host([no-label]) {
    padding-top: 0;
  }

  :host([size='md']) .input-box,
  :host([size='md']) .input-textarea {
    font-size: var(--font-size-l) !important;
  }

  :host([size='lg']) .input-box,
  :host([size='lg']) .input-textarea {
    font-size: var(--font-size-xl) !important;
  }

  :host([focused]:not([invalid])) .input-label {
    color: var(--blue-500) !important;
  }

  :host([invalid][touched]) .input-underline,
  :host([invalid][dirty]) .input-underline {
    background-color: var(--red-500) !important;
  }

  :host([invalid][touched]) .underline-fill,
  :host([invalid][dirty]) .underline-fill {
    background-color: var(--red-500) !important;
  }

  :host([invalid][touched]) .input-label,
  :host([invalid][dirty]) .input-label {
    color: var(--red-500);
  }

  :host([invalid][touched]) .input-hint,
  :host([invalid][dirty]) .input-hint {
    color: var(--red-500);
  }

  :host([invalid][touched]) .input-box,
  :host([invalid][dirty]) .input-box,
  :host([invalid][touched]) .input-textarea,
  :host([invalid][dirty]) .input-textarea {
    caret-color: var(--red-500) !important;
  }

  :host([autosize]) {
    display: inline-block;
  }

  /* Chrome autofill override */
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
    -webkit-text-fill-color: var(--grey-100) !important;
  }

  .input-flex-wrap {
    display: flex;
  }

  .input-flex-wrap-inner {
    display: flex;
    flex: 1;
    max-width: 100%;
  }

  ::slotted([slot='prefix']),
  ::slotted([slot='suffix']) {
    flex: none;
    white-space: nowrap;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  ::slotted([slot='prefix']) {
    margin-right: var(--spacing-8);
  }

  ::slotted([slot='suffix']) {
    margin-left: var(--spacing-8);
  }

  .input-wrap {
    position: relative;
    display: block;
    margin-bottom: var(--spacing-0);
    width: 100%;
  }

  .input-box-wrap {
    position: relative;
    width: 100%;
    display: flex;
    min-height: 1.75em;
  }

  .input-box-wrap:focus {
    outline: none;
  }

  .input-box,
  .input-textarea {
    flex: auto;
    display: block;
    background: transparent;
    border: none;
    margin-bottom: var(--spacing-0);
    padding-left: var(--spacing-0);
    width: 100%;
    max-width: 100%;
    color: var(--grey-050);
    font-size: var(--font-size-m);
    line-height: 1.25em;
    min-height: var(--input-height, 33px);
    font-family: inherit;
    caret-color: var(--blue-500);
  }

  .input-box::placeholder,
  .input-textarea::placeholder {
    color: var(--grey-350);
  }

  .input-box:focus,
  .input-textarea:focus {
    box-shadow: none;
    outline: none;
  }

  .input-box:disabled,
  .input-textarea:disabled {
    color: var(--grey-400);
    user-select: none;
  }

  .input-box {
    margin: 3px 0;
  }

  .input-box[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  .input-textarea {
    resize: none;
  }

  .input-label {
    position: absolute;
    top: 0.5em;
    line-height: var(--font-line-height-100);
    pointer-events: none;
    font-size: var(--font-size-m);
    font-weight: var(--font-weight-semibold);
    color: var(--grey-350);
    white-space: nowrap;
    overflow-x: clip;
    max-width: 100%;
    text-overflow: ellipsis;
    transition: color 0.2s ease-out, font-size 150ms ease-out, top 150ms ease-out;
  }

  :host([active]) .input-label,
  :host([has-placeholder]) .input-label {
    font-size: 0.75rem;
    top: -1.4em;
  }

  .input-underline {
    width: 100%;
    height: 1px;
    background-color: var(--grey-600);
  }

  .input-underline.visibility-hidden {
    visibility: hidden;
  }

  .underline-fill {
    background-color: var(--blue-500);
    transition: width 250ms ease-out;
    width: 0;
    height: 2px;
    margin: 0 auto;
  }

  :host([focused]) .underline-fill {
    width: 100%;
  }

  .input-hint {
    font-size: var(--font-size-xs);
    color: var(--grey-350);
    margin-top: var(--spacing-8);
    min-height: 1em;
    line-height: 14px;
    transition: color 0.2s ease-in-out;
  }

  .input-hint.hidden {
    display: none;
  }

  .password-toggle,
  .lock-toggle {
    line-height: 25px;
    top: 0;
    bottom: 0;
    right: 10px;
    cursor: pointer;
    font-size: 0.8rem;
    color: var(--grey-300);
    transition: color 100ms;
    padding: 0;
    z-index: 1;
    background: transparent;
    border: none;
    position: absolute;
  }

  .password-toggle:hover,
  .lock-toggle:hover {
    color: var(--grey-050);
  }

  .numeric-spinner {
    display: flex;
    z-index: 2;
    opacity: 0;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    flex-direction: column;
    transition: all 0.1s ease-out;
  }

  :host(:not([disabled])) .input-box-wrap:hover .numeric-spinner,
  .input-box:focus + .numeric-spinner {
    opacity: 1;
  }

  .spinner-btn {
    font-size: var(--font-size-xxs);
    color: var(--grey-300);
    cursor: pointer;
    background: transparent;
    border: none;
    padding: 0;
    margin: 0;
    line-height: 1;
  }

  .spinner-btn:hover {
    color: var(--grey-100);
  }

  .spinner-btn:active {
    transform: scale(1.4);
  }

  /* Fill appearance */
  :host([appearance='fill']:not([readonly])) .input-flex-wrap {
    position: relative;
  }

  :host([appearance='fill']:not([readonly])) .input-flex-wrap::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--grey-875);
    mix-blend-mode: exclusion;
    pointer-events: none;
    border-top-left-radius: var(--radius-4);
    border-top-right-radius: var(--radius-4);
  }

  :host([appearance='fill']) .input-label {
    left: 0;
  }

  :host([appearance='fill']) .input-box-wrap .password-toggle,
  :host([appearance='fill']) .input-box-wrap .lock-toggle {
    line-height: 33.33px;
    z-index: 2;
  }

  :host([appearance='fill']) .input-box,
  :host([appearance='fill']) .input-textarea {
    margin: 0;
    padding: var(--spacing-4) 10px;
    position: relative;
    z-index: 1;
  }

  :host([appearance='fill']) .input-box + .numeric-spinner {
    right: 10px;
  }

  :host([appearance='fill']) ::slotted([slot='prefix']),
  :host([appearance='fill']) ::slotted([slot='suffix']) {
    color: var(--grey-350);
  }

  :host([appearance='fill']) ::slotted([slot='prefix']) {
    padding-left: var(--spacing-10);
  }

  :host([appearance='fill']) ::slotted([slot='suffix']) {
    padding-right: var(--spacing-10);
  }

  /* swim-icon in spinner and password toggle */
  .spinner-btn swim-icon,
  .password-toggle swim-icon {
    display: inline-block;
    font-size: 1em;
  }
`;var ke=(n=>(n.text="text",n.password="password",n.email="email",n.number="number",n.tel="tel",n.url="url",n.textarea="textarea",n))(ke||{}),qi=(n=>(n.legacy="legacy",n.fill="fill",n))(qi||{}),$i=(n=>(n.sm="sm",n.md="md",n.lg="lg",n))($i||{}),br=Object.defineProperty,fr=Object.getOwnPropertyDescriptor,E=(n,e,t,o)=>{for(var i=o>1?void 0:o?fr(e,t):e,s=n.length-1,r;s>=0;s--)(r=n[s])&&(i=(o?r(e,t,i):r(i))||i);return o&&i&&br(e,t,i),i};const tn="swim-input",oi=class oi extends _{constructor(){super(),this.type=ke.text,this.label="",this.placeholder="",this.hint="",this._value="",this.name="",this.id=`swim-input-${Math.random().toString(36).substr(2,9)}`,this._disabled=!1,this._readonly=!1,this._required=!1,this._autofocus=!1,this.autocomplete="off",this.appearance=qi.legacy,this.size=$i.sm,this._withMargin=!0,this._withHint=!0,this._passwordToggleEnabled=!1,this.textareaRows=3,this.requiredIndicator="*",this._focused=!1,this._passwordVisible=!1,this._touched=!1,this._dirty=!1,this._invalid=!1,this._internals=this.attachInternals()}get value(){return this._value}set value(e){const t=this._value;this._value=e,this._internals.setFormValue(e),this.requestUpdate("value",t),this._updateActiveState()}get disabled(){return this._disabled}set disabled(e){this._disabled=p(e)}get readonly(){return this._readonly}set readonly(e){this._readonly=p(e)}get required(){return this._required}set required(e){this._required=p(e)}get autofocus(){return this._autofocus}set autofocus(e){this._autofocus=p(e)}get marginless(){return!this._withMargin}set marginless(e){this._withMargin=!p(e)}get withHint(){return this._withHint}set withHint(e){this._withHint=p(e)}get passwordToggleEnabled(){return this._passwordToggleEnabled}set passwordToggleEnabled(e){this._passwordToggleEnabled=p(e)}connectedCallback(){super.connectedCallback(),this._updateActiveState()}firstUpdated(){this.autofocus&&this.inputElement&&setTimeout(()=>{this.inputElement.focus()})}focus(e){var t;(t=this.inputElement)==null||t.focus(e)}updated(e){super.updated(e),e.has("value")&&this._updateActiveState(),(e.has("required")||e.has("min")||e.has("max"))&&this._validate()}render(){const e=this.type===ke.textarea,t=this.type===ke.password&&this.passwordToggleEnabled&&!this.disabled,o=this.type===ke.number&&!this.disabled,i=this._passwordVisible?ke.text:this.type;return d`
      <div class="input-wrap">
        <div class="input-flex-wrap">
          <slot name="prefix"></slot>
          <div class="input-flex-wrap-inner">
            <div class="input-box-wrap">
              ${e?this._renderTextarea():this._renderInput(i)}
              ${o?d`
                    <div class="numeric-spinner">
                      <button
                        type="button"
                        class="spinner-btn"
                        @mousedown="${this._incrementValue}"
                        @mouseup="${this._stopSpinner}"
                        @mouseleave="${this._stopSpinner}"
                        aria-label="Increment"
                      >
                        <swim-icon font-icon="chevron-bold-up"></swim-icon>
                      </button>
                      <button
                        type="button"
                        class="spinner-btn"
                        @mousedown="${this._decrementValue}"
                        @mouseup="${this._stopSpinner}"
                        @mouseleave="${this._stopSpinner}"
                        aria-label="Decrement"
                      >
                        <swim-icon font-icon="chevron-bold-down"></swim-icon>
                      </button>
                    </div>
                  `:u}
              ${t?d`
                    <button
                      type="button"
                      class="password-toggle"
                      @click="${this._togglePassword}"
                      aria-label="Toggle password visibility"
                    >
                      <swim-icon font-icon="${this._passwordVisible?"eye-disabled":"eye"}"></swim-icon>
                    </button>
                  `:u}
            </div>
            <label class="input-label" part="label" for="${this.id}">
              ${this.label} ${this.required?d`<span>${this.requiredIndicator}</span>`:u}
            </label>
          </div>
          <slot name="suffix"></slot>
        </div>
        <div class="input-underline ${this.readonly?"visibility-hidden":""}">
          <div class="underline-fill"></div>
        </div>
        <div class="input-hint ${this.withHint?"":"hidden"}">
          <slot name="hint">${this.hint}</slot>
        </div>
      </div>
    `}_renderInput(e){return d`
      <input
        part="input"
        class="input-box"
        type="${e}"
        id="${this.id}"
        name="${this.name}"
        .value="${en(this.value)}"
        placeholder="${this.placeholder}"
        ?disabled="${this.disabled}"
        ?readonly="${this.readonly}"
        ?required="${this.required}"
        min="${ce(this.min)}"
        max="${ce(this.max)}"
        minlength="${ce(this.minlength)}"
        maxlength="${ce(this.maxlength)}"
        tabindex="${ce(this.tabindex)}"
        autocomplete="${this.autocomplete}"
        @input="${this._handleInput}"
        @change="${this._handleChange}"
        @focus="${this._handleFocus}"
        @blur="${this._handleBlur}"
      />
    `}_renderTextarea(){return d`
      <textarea
        part="input"
        class="input-textarea swim-scroll"
        id="${this.id}"
        name="${this.name}"
        .value="${en(this.value)}"
        placeholder="${this.placeholder}"
        ?disabled="${this.disabled}"
        ?readonly="${this.readonly}"
        ?required="${this.required}"
        rows="${this.textareaRows}"
        minlength="${ce(this.minlength)}"
        maxlength="${ce(this.maxlength)}"
        tabindex="${ce(this.tabindex)}"
        autocomplete="${this.autocomplete}"
        @input="${this._handleInput}"
        @change="${this._handleChange}"
        @focus="${this._handleFocus}"
        @blur="${this._handleBlur}"
      ></textarea>
    `}_handleInput(e){const t=e.target;this.value=t.value,this._dirty||(this._dirty=!0,this.setAttribute("dirty","")),this.dispatchEvent(new Event("input",{bubbles:!0,composed:!0}))}_handleChange(e){this._validate(),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}_handleFocus(e){this._focused=!0,this.setAttribute("focused",""),this.dispatchEvent(new FocusEvent("focus",{bubbles:!0,composed:!0}))}_handleBlur(e){this._focused=!1,this.removeAttribute("focused"),this._touched||(this._touched=!0,this.setAttribute("touched","")),this._validate(),this.dispatchEvent(new FocusEvent("blur",{bubbles:!0,composed:!0}))}_togglePassword(){var e;this._passwordVisible=!this._passwordVisible,(e=this.inputElement)==null||e.focus()}_incrementValue(e){e.preventDefault(),!this.disabled&&(this._increment(),this._spinnerTimeout=window.setTimeout(()=>{this._spinnerInterval=window.setInterval(()=>this._increment(),50)},500))}_decrementValue(e){e.preventDefault(),!this.disabled&&(this._decrement(),this._spinnerTimeout=window.setTimeout(()=>{this._spinnerInterval=window.setInterval(()=>this._decrement(),50)},500))}disconnectedCallback(){super.disconnectedCallback(),this._stopSpinner()}_stopSpinner(){this._spinnerTimeout!==void 0&&(clearTimeout(this._spinnerTimeout),this._spinnerTimeout=void 0),this._spinnerInterval!==void 0&&(clearInterval(this._spinnerInterval),this._spinnerInterval=void 0)}_increment(){if(this.inputElement&&this.type===ke.number){const e=this.inputElement,t=parseFloat(e.value)||0;if(this.max!==void 0&&t>=this.max)return;const o=t+1;this.value=o.toString(),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}}_decrement(){if(this.inputElement&&this.type===ke.number){const e=this.inputElement,t=parseFloat(e.value)||0;if(this.min!==void 0&&t<=this.min)return;const o=t-1;this.value=o.toString(),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}}_validate(){let e=!0;if(this.required&&!this.value&&(e=!1),this.type===ke.number&&this.value){const t=parseFloat(this.value);this.min!==void 0&&t<this.min&&(e=!1),this.max!==void 0&&t>this.max&&(e=!1)}return this.minlength&&this.value.length<this.minlength&&(e=!1),this.maxlength&&this.value.length>this.maxlength&&(e=!1),this.inputElement&&(this.inputElement.validity.valid||(e=!1)),this._invalid=!e,this._invalid?(this.setAttribute("invalid",""),this._internals.setValidity({customError:!0},"Invalid input")):(this.removeAttribute("invalid"),this._internals.setValidity({})),e}_updateActiveState(){const e=this.value&&this.value.length>0,t=!!this.placeholder;this._focused||e?this.setAttribute("active",""):this.removeAttribute("active"),t?this.setAttribute("has-placeholder",""):this.removeAttribute("has-placeholder"),this.label?this.removeAttribute("no-label"):this.setAttribute("no-label","")}formResetCallback(){this.value="",this._touched=!1,this._dirty=!1,this.removeAttribute("touched"),this.removeAttribute("dirty")}formDisabledCallback(e){this.disabled=e}};oi.styles=[x,ct,mr],oi.formAssociated=!0;let y=oi;E([$(".input-box, .input-textarea")],y.prototype,"inputElement",2);E([a({type:String})],y.prototype,"type",2);E([a({type:String})],y.prototype,"label",2);E([a({type:String})],y.prototype,"placeholder",2);E([a({type:String})],y.prototype,"hint",2);E([a({type:String})],y.prototype,"value",1);E([a({type:String})],y.prototype,"name",2);E([a({type:String})],y.prototype,"id",2);E([a({type:Boolean,reflect:!0})],y.prototype,"disabled",1);E([a({type:Boolean,reflect:!0})],y.prototype,"readonly",1);E([a({type:Boolean,reflect:!0})],y.prototype,"required",1);E([a({type:Boolean})],y.prototype,"autofocus",1);E([a({type:String})],y.prototype,"autocomplete",2);E([a({type:String,reflect:!0})],y.prototype,"appearance",2);E([a({type:String,reflect:!0})],y.prototype,"size",2);E([a({type:Boolean,reflect:!0,attribute:"marginless"})],y.prototype,"marginless",1);E([a({type:Boolean})],y.prototype,"withHint",1);E([a({type:Boolean,attribute:"password-toggle-enabled"})],y.prototype,"passwordToggleEnabled",1);E([a({type:Number})],y.prototype,"min",2);E([a({type:Number})],y.prototype,"max",2);E([a({type:Number})],y.prototype,"minlength",2);E([a({type:Number})],y.prototype,"maxlength",2);E([a({type:Number,attribute:"textarea-rows"})],y.prototype,"textareaRows",2);E([a({type:String,attribute:"required-indicator"})],y.prototype,"requiredIndicator",2);E([a({type:Number})],y.prototype,"tabindex",2);E([v()],y.prototype,"_focused",2);E([v()],y.prototype,"_passwordVisible",2);E([v()],y.prototype,"_touched",2);E([v()],y.prototype,"_dirty",2);E([v()],y.prototype,"_invalid",2);customElements.get(tn)||customElements.define(tn,y);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const on=(n,e,t)=>{const o=new Map;for(let i=e;i<=t;i++)o.set(n[i],i);return o},vr=Pi(class extends Fi{constructor(n){if(super(n),n.type!==Le.CHILD)throw Error("repeat() can only be used in text expressions")}dt(n,e,t){let o;t===void 0?t=e:e!==void 0&&(o=e);const i=[],s=[];let r=0;for(const l of n)i[r]=o?o(l,r):r,s[r]=t(l,r),r++;return{values:s,keys:i}}render(n,e,t){return this.dt(n,e,t).values}update(n,[e,t,o]){const i=gr(n),{values:s,keys:r}=this.dt(e,t,o);if(!Array.isArray(i))return this.ut=r,s;const l=this.ut??(this.ut=[]),c=[];let h,w,g=0,m=i.length-1,b=0,I=s.length-1;for(;g<=m&&b<=I;)if(i[g]===null)g++;else if(i[m]===null)m--;else if(l[g]===r[b])c[b]=qe(i[g],s[b]),g++,b++;else if(l[m]===r[I])c[I]=qe(i[m],s[I]),m--,I--;else if(l[g]===r[I])c[I]=qe(i[g],s[I]),bt(n,c[I+1],i[g]),g++,I--;else if(l[m]===r[b])c[b]=qe(i[m],s[b]),bt(n,i[g],i[m]),m--,b++;else if(h===void 0&&(h=on(r,b,I),w=on(l,g,m)),h.has(l[g]))if(h.has(l[m])){const z=w.get(r[b]),te=z!==void 0?i[z]:null;if(te===null){const he=bt(n,i[g]);qe(he,s[b]),c[b]=he}else c[b]=qe(te,s[b]),bt(n,i[g],te),i[z]=null;b++}else ki(i[m]),m--;else ki(i[g]),g++;for(;b<=I;){const z=bt(n,c[I+1]);qe(z,s[b]),c[b++]=z}for(;g<=m;){const z=i[g++];z!==null&&ki(z)}return this.ut=r,ds(n,c),oe}}),_r=f`
  :host {
    display: block;
    max-width: 100%;
    margin-top: var(--spacing-16);
    margin-bottom: var(--spacing-8);
    line-height: calc(1em + 0.75em);
    padding-top: calc(0.75rem + 8px);
    padding-bottom: 0;
    position: relative;
    min-width: 0;
  }

  :host([marginless]) {
    margin-top: 0;
    margin-bottom: 0;
  }

  :host([no-label]) {
    padding-top: 0;
  }

  :host([size='md']) .select-input {
    font-size: var(--font-size-l) !important;
  }

  :host([size='lg']) .select-input {
    font-size: var(--font-size-xl) !important;
  }

  :host([focused]:not([invalid])) .select-label {
    color: var(--blue-500) !important;
  }

  :host([invalid][touched]) .select-underline {
    background-color: var(--red-500) !important;
  }

  :host([invalid][touched]) .underline-fill {
    background-color: var(--red-500) !important;
  }

  :host([invalid][touched]) .select-label,
  :host([invalid][touched]) .select-hint {
    color: var(--red-500);
  }

  .select-wrap {
    position: relative;
    display: block;
    margin-bottom: 0;
    width: 100%;
  }

  .select-flex-wrap {
    display: flex;
    flex-direction: row;
  }

  .select-flex-wrap-inner {
    display: flex;
    flex: 100%;
    width: 100%;
    position: relative;
  }

  .select-input-wrap {
    width: 100%;
    position: relative;
  }

  .select-input {
    align-items: center;
    position: relative;
    background: transparent;
    outline: none;
    margin-bottom: 0;
    padding-left: 0;
    width: 100%;
    min-height: var(--input-height, 33px);
    min-width: 60px;
    cursor: pointer;
    display: flex;
    border: none;
    color: var(--grey-050);
    font-size: var(--font-size-m);
    font-family: inherit;
  }

  .select-input:focus {
    outline: none;
  }

  .select-input[disabled] {
    cursor: not-allowed;
    color: var(--grey-400);
  }

  .select-value {
    flex: 1;
    padding: 3px 0;
    min-height: 1.4em;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .select-placeholder {
    color: var(--grey-350);
  }

  .select-controls {
    display: flex;
    align-items: center;
    gap: var(--spacing-4);
    padding-right: var(--spacing-4);
    color: var(--grey-350);
  }

  .select-clear,
  .select-caret {
    background: none;
    border: none;
    padding: var(--spacing-2);
    cursor: pointer;
    color: inherit;
    font-size: var(--font-size-xxs);
    display: flex;
    align-items: center;
    transition: color 100ms;
  }

  .select-clear:hover,
  .select-caret:hover {
    color: var(--blue-400);
  }

  .select-caret {
    transition: transform 200ms ease-in-out;
    transform: rotate(0deg);
  }

  :host([open]) .select-caret {
    transform: rotate(180deg);
  }

  .select-label {
    position: absolute;
    top: 0.5em;
    line-height: var(--font-line-height-100);
    pointer-events: none;
    font-size: var(--font-size-m);
    font-weight: var(--font-weight-semibold);
    color: var(--grey-350);
    white-space: nowrap;
    overflow-x: clip;
    max-width: 100%;
    text-overflow: ellipsis;
    transition: color 0.2s ease-out, font-size 150ms ease-out, top 150ms ease-out;
  }

  :host([active]) .select-label,
  :host([has-placeholder]) .select-label {
    font-size: 0.75rem;
    top: -1.4em;
  }

  .select-underline {
    width: 100%;
    height: 1px;
    background-color: var(--grey-600);
  }

  .underline-fill {
    background-color: var(--blue-500);
    transition: width 250ms ease-out;
    width: 0;
    height: 2px;
    margin: 0 auto;
  }

  :host([focused]) .underline-fill,
  :host([open]) .underline-fill {
    width: 100%;
  }

  .select-hint {
    font-size: var(--font-size-xs);
    color: var(--grey-350);
    margin-top: var(--spacing-8);
    min-height: 1em;
    line-height: 14px;
    transition: color 0.2s ease-in-out;
  }

  .select-hint.hidden {
    display: none;
  }

  /* Dropdown */
  .select-dropdown {
    position: absolute;
    left: 0;
    right: 0;
    z-index: 1000;
    background: var(--grey-700);
    border: 1px solid transparent;
    border-radius: var(--radius-4);
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    margin-top: var(--spacing-8);
    max-height: 300px;
    display: none;
  }

  :host([open]) .select-dropdown {
    display: block;
    animation: slideDown 0.25s ease-out;
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .select-filter {
    padding: var(--spacing-10);
    background: var(--grey-600);
    position: sticky;
    top: 0;
    z-index: 1;
    border-top-left-radius: var(--radius-4);
    border-top-right-radius: var(--radius-4);
  }

  .select-filter-input {
    width: 100%;
    background: transparent;
    border: none;
    outline: none;
    color: var(--grey-050);
    font-size: var(--font-size-m);
    font-family: inherit;
    padding: var(--spacing-4);
  }

  .select-filter-input::placeholder {
    color: var(--grey-350);
  }

  .select-options {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .select-option {
    padding: 7px 15px;
    font-size: var(--font-size-m);
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--grey-050);
    transition: background-color 100ms;
  }

  .select-option:not(:last-child) {
    border-bottom: 1px solid var(--grey-650);
  }

  .select-option:hover:not([disabled]) {
    background: var(--grey-750);
  }

  .select-option[selected] {
    background: var(--blue-600);
    color: var(--white);
  }

  .select-option[disabled] {
    color: var(--grey-450);
    cursor: not-allowed;
    opacity: 0.6;
  }

  .select-option[focused]:not([disabled]) {
    background: var(--grey-725);
  }

  .select-empty {
    padding: 7px 15px;
    font-size: var(--font-size-m);
    color: var(--grey-300);
    font-style: italic;
  }

  /* Multiple selection */
  :host([multiple]) .select-value {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-4);
  }

  .select-chip {
    background: var(--grey-600);
    color: var(--white);
    border-radius: var(--radius-2);
    padding: 0 0.5em;
    font-size: var(--font-size-m);
    line-height: 1.4em;
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-4);
    white-space: nowrap;
    max-width: 200px;
  }

  .select-chip-label {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .select-chip-remove {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    color: var(--grey-350);
    font-size: 0.5em;
    line-height: 1;
    transition: color 100ms;
  }

  .select-chip-remove:hover {
    color: var(--white);
  }

  /* Fill appearance */
  :host([appearance='fill']) .select-flex-wrap {
    position: relative;
  }

  :host([appearance='fill']) .select-flex-wrap::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--grey-875);
    mix-blend-mode: exclusion;
    pointer-events: none;
    border-top-left-radius: var(--radius-4);
    border-top-right-radius: var(--radius-4);
  }

  :host([appearance='fill']) .select-input {
    padding: var(--spacing-4) 10px;
    position: relative;
    z-index: 1;
  }

  :host([appearance='fill']) .select-label {
    left: 0;
  }

  /* swim-icon in clear and caret buttons */
  .select-clear swim-icon,
  .select-caret swim-icon {
    display: block;
    font-size: inherit;
  }
`;var wr=Object.defineProperty,xr=Object.getOwnPropertyDescriptor,T=(n,e,t,o)=>{for(var i=o>1?void 0:o?xr(e,t):e,s=n.length-1,r;s>=0;s--)(r=n[s])&&(i=(o?r(e,t,i):r(i))||i);return o&&i&&wr(e,t,i),i};const nn="swim-select",ni=class ni extends _{constructor(){super(),this.label="",this.placeholder="Select...",this.hint="",this.emptyPlaceholder="No options available",this.filterPlaceholder="Filter options...",this.options=[],this._value=[],this.name="",this.id=`swim-select-${Math.random().toString(36).substr(2,9)}`,this._disabled=!1,this._required=!1,this.appearance=qi.legacy,this.size=$i.sm,this._withMargin=!0,this._withHint=!0,this._filterable=!0,this._multiple=!1,this._allowClear=!0,this.requiredIndicator="*",this._open=!1,this._focused=!1,this._touched=!1,this._invalid=!1,this._filterQuery="",this._focusedIndex=-1,this._internals=this.attachInternals()}get value(){return this.multiple?this._value:this._value[0]??null}set value(e){const t=this._value;this.multiple?this._value=Array.isArray(e)?e:e?[e]:[]:this._value=e?[e]:[],this._internals.setFormValue(this.multiple?JSON.stringify(this._value):this._value[0]??""),this.requestUpdate("value",t),this._updateActiveState()}get disabled(){return this._disabled}set disabled(e){this._disabled=p(e)}get required(){return this._required}set required(e){this._required=p(e)}get marginless(){return!this._withMargin}set marginless(e){this._withMargin=!p(e)}get withHint(){return this._withHint}set withHint(e){this._withHint=p(e)}get filterable(){return this._filterable}set filterable(e){this._filterable=p(e)}get multiple(){return this._multiple}set multiple(e){this._multiple=p(e)}get allowClear(){return this._allowClear}set allowClear(e){this._allowClear=p(e)}connectedCallback(){super.connectedCallback(),this._updateActiveState()}disconnectedCallback(){super.disconnectedCallback(),this._removeClickOutsideListener()}updated(e){super.updated(e),e.has("value")&&(this._updateActiveState(),this._validate()),e.has("_open")&&(this._open?(this.setAttribute("open",""),this._addClickOutsideListener(),setTimeout(()=>{this.filterable&&this.filterInput&&this.filterInput.focus()},100)):(this.removeAttribute("open"),this._removeClickOutsideListener(),this._filterQuery="",this._focusedIndex=-1))}render(){const e=this._value.length>0,t=this._getFilteredOptions(),o=this.allowClear&&e&&!this.disabled;return d`
      <div class="select-wrap">
        <div class="select-flex-wrap">
          <div class="select-flex-wrap-inner">
            <div class="select-input-wrap">
              <div
                class="select-input"
                part="select"
                role="combobox"
                aria-expanded="${this._open}"
                aria-haspopup="listbox"
                aria-controls="${this.id}-listbox"
                tabindex="${this.disabled?-1:0}"
                @click="${this._handleInputClick}"
                @keydown="${this._handleKeyDown}"
                @focus="${this._handleFocus}"
                @blur="${this._handleBlur}"
              >
                <div class="select-value">${this._renderValue()}</div>
                <div class="select-controls">
                  ${o?d`
                        <button
                          type="button"
                          class="select-clear"
                          aria-label="Clear selection"
                          @click="${this._handleClear}"
                        >
                          <swim-icon font-icon="x"></swim-icon>
                        </button>
                      `:u}
                  <button
                    type="button"
                    class="select-caret"
                    aria-label="Toggle dropdown"
                    @click="${this._handleToggle}"
                  >
                    <swim-icon font-icon="chevron-bold-down"></swim-icon>
                  </button>
                </div>
              </div>
              <label class="select-label" for="${this.id}">
                ${this.label} ${this.required?d`<span>${this.requiredIndicator}</span>`:u}
              </label>
            </div>
          </div>
        </div>
        <div class="select-underline">
          <div class="underline-fill"></div>
        </div>
        <div class="select-hint ${this.withHint?"":"hidden"}">
          <slot name="hint">${this.hint}</slot>
        </div>

        ${this._open?d`
              <div class="select-dropdown swim-scroll" part="dropdown" role="listbox" id="${this.id}-listbox">
                ${this.filterable?d`
                      <div class="select-filter">
                        <input
                          type="text"
                          class="select-filter-input"
                          placeholder="${this.filterPlaceholder}"
                          .value="${this._filterQuery}"
                          @input="${this._handleFilterInput}"
                          @keydown="${this._handleFilterKeyDown}"
                        />
                      </div>
                    `:u}
                ${t.length>0?d`
                      <ul class="select-options">
                        ${vr(t,i=>this._getOptionValue(i),(i,s)=>this._renderOption(i,s))}
                      </ul>
                    `:d` <div class="select-empty">${this.emptyPlaceholder}</div> `}
              </div>
            `:u}
      </div>
    `}_renderValue(){if(this._value.length===0)return d`<span class="select-placeholder">${this.placeholder}</span>`;if(this.multiple)return d`
        ${this._value.map(e=>{const t=this.options.find(o=>this._getOptionValue(o)===e);return this._renderChip(t||{name:e,value:e})})}
      `;{const e=this.options.find(t=>this._getOptionValue(t)===this._value[0]);return d`${(e==null?void 0:e.name)||this._value[0]}`}}_renderChip(e){return d`
      <div class="select-chip">
        <span class="select-chip-label">${e.name}</span>
        ${this.disabled?u:d`
              <button
                type="button"
                class="select-chip-remove"
                aria-label="Remove ${e.name}"
                @click="${t=>this._removeChip(t,e)}"
              >
                <swim-icon font-icon="x"></swim-icon>
              </button>
            `}
      </div>
    `}_renderOption(e,t){const o=this._getOptionValue(e),i=this._isSelected(o),s=t===this._focusedIndex;return d`
      <li
        class="select-option"
        role="option"
        ?selected="${i}"
        ?focused="${s}"
        ?disabled="${e.disabled}"
        aria-selected="${i}"
        @click="${()=>this._handleOptionClick(e)}"
        @mouseenter="${()=>this._focusedIndex=t}"
      >
        ${e.name}
      </li>
    `}_handleInputClick(e){this.disabled||this._toggleDropdown()}_handleToggle(e){e.stopPropagation(),this.disabled||this._toggleDropdown()}_handleClear(e){e.stopPropagation(),this.value=this.multiple?[]:null,this._dispatchChange(),this._validate()}_handleFocus(){this._focused=!0,this.setAttribute("focused","")}_handleBlur(){this._focused=!1,this.removeAttribute("focused"),this._touched||(this._touched=!0,this.setAttribute("touched","")),this._validate()}_handleKeyDown(e){switch(e.key){case"Enter":case" ":this._open||(e.preventDefault(),this._toggleDropdown());break;case"Escape":this._open&&(e.preventDefault(),this._closeDropdown());break;case"ArrowDown":e.preventDefault(),this._open?this._moveFocus(1):this._openDropdown();break;case"ArrowUp":e.preventDefault(),this._open&&this._moveFocus(-1);break}}_handleFilterInput(e){const t=e.target;this._filterQuery=t.value,this._focusedIndex=0}_handleFilterKeyDown(e){var t;switch(e.key){case"ArrowDown":e.preventDefault(),this._moveFocus(1);break;case"ArrowUp":e.preventDefault(),this._moveFocus(-1);break;case"Enter":e.preventDefault();const o=this._getFilteredOptions();o[this._focusedIndex]&&this._handleOptionClick(o[this._focusedIndex]);break;case"Escape":e.preventDefault(),this._closeDropdown(),(t=this.selectInput)==null||t.focus();break}}_handleOptionClick(e){if(e.disabled)return;const t=this._getOptionValue(e);if(this.multiple){const o=[...this._value],i=o.indexOf(t);i>-1?o.splice(i,1):o.push(t),this.value=o}else this.value=t,this._closeDropdown();this._dispatchChange(),this._validate()}_removeChip(e,t){e.stopPropagation();const o=this._getOptionValue(t),i=this._value.filter(s=>s!==o);this.value=i,this._dispatchChange(),this._validate()}_toggleDropdown(){this._open?this._closeDropdown():this._openDropdown()}_openDropdown(){this.disabled||(this._open=!0,this._focusedIndex=0,this.dispatchEvent(new Event("open",{bubbles:!0,composed:!0})))}_closeDropdown(){this._open=!1,this.dispatchEvent(new Event("close",{bubbles:!0,composed:!0}))}_moveFocus(e){const o=this._getFilteredOptions().length-1;let i=this._focusedIndex+e;i<0?i=o:i>o&&(i=0),this._focusedIndex=i}_getFilteredOptions(){if(!this._filterQuery)return this.options;const e=this._filterQuery.toLowerCase();return this.options.filter(t=>t.name.toLowerCase().includes(e))}_getOptionValue(e){return e.value!==void 0?e.value:e.name}_isSelected(e){return this._value.includes(e)}_dispatchChange(){this.dispatchEvent(new CustomEvent("change",{detail:{value:this.value},bubbles:!0,composed:!0}))}_validate(){let e=!0;return this.required&&this._value.length===0&&(e=!1),this._invalid=!e,this._invalid?(this.setAttribute("invalid",""),this._internals.setValidity({valueMissing:!0},"Please select an option")):(this.removeAttribute("invalid"),this._internals.setValidity({})),e}_updateActiveState(){const e=this._value.length>0,t=!!this.placeholder;this._focused||e||this._open?this.setAttribute("active",""):this.removeAttribute("active"),t?this.setAttribute("has-placeholder",""):this.removeAttribute("has-placeholder"),this.label?this.removeAttribute("no-label"):this.setAttribute("no-label","")}_addClickOutsideListener(){this._clickOutsideListener=e=>{this.contains(e.target)||this._closeDropdown()},setTimeout(()=>{document.addEventListener("click",this._clickOutsideListener)},0)}_removeClickOutsideListener(){this._clickOutsideListener&&(document.removeEventListener("click",this._clickOutsideListener),this._clickOutsideListener=void 0)}formResetCallback(){this.value=this.multiple?[]:null,this._touched=!1,this.removeAttribute("touched")}formDisabledCallback(e){this.disabled=e}};ni.styles=[x,ct,_r],ni.formAssociated=!0;let C=ni;T([$(".select-input")],C.prototype,"selectInput",2);T([$(".select-filter-input")],C.prototype,"filterInput",2);T([a({type:String})],C.prototype,"label",2);T([a({type:String})],C.prototype,"placeholder",2);T([a({type:String})],C.prototype,"hint",2);T([a({type:String,attribute:"empty-placeholder"})],C.prototype,"emptyPlaceholder",2);T([a({type:String,attribute:"filter-placeholder"})],C.prototype,"filterPlaceholder",2);T([a({type:Array})],C.prototype,"options",2);T([a()],C.prototype,"value",1);T([a({type:String})],C.prototype,"name",2);T([a({type:String})],C.prototype,"id",2);T([a({type:Boolean,reflect:!0})],C.prototype,"disabled",1);T([a({type:Boolean,reflect:!0})],C.prototype,"required",1);T([a({type:String,reflect:!0})],C.prototype,"appearance",2);T([a({type:String,reflect:!0})],C.prototype,"size",2);T([a({type:Boolean,reflect:!0,attribute:"marginless"})],C.prototype,"marginless",1);T([a({type:Boolean})],C.prototype,"withHint",1);T([a({type:Boolean})],C.prototype,"filterable",1);T([a({type:Boolean,reflect:!0})],C.prototype,"multiple",1);T([a({type:Boolean,attribute:"allow-clear"})],C.prototype,"allowClear",1);T([a({type:String,attribute:"required-indicator"})],C.prototype,"requiredIndicator",2);T([v()],C.prototype,"_open",2);T([v()],C.prototype,"_focused",2);T([v()],C.prototype,"_touched",2);T([v()],C.prototype,"_invalid",2);T([v()],C.prototype,"_filterQuery",2);T([v()],C.prototype,"_focusedIndex",2);customElements.get(nn)||customElements.define(nn,C);const yr=f`
  :host {
    display: block;
  }

  .swim-tab__panel {
    display: block;
  }

  .swim-tab__panel[hidden] {
    display: none;
  }
`;var kr=Object.defineProperty,Cr=Object.getOwnPropertyDescriptor,dt=(n,e,t,o)=>{for(var i=o>1?void 0:o?Cr(e,t):e,s=n.length-1,r;s>=0;s--)(r=n[s])&&(i=(o?r(e,t,i):r(i))||i);return o&&i&&kr(e,t,i),i};let Er=0;const sn="swim-tab",Yi=class Yi extends _{constructor(){super(...arguments),this._instanceId=++Er,this._generatedPanelId=`tab-panel-${this._instanceId}`,this._generatedTabId=`tab-${this._instanceId}`,this.tabId=this._generatedTabId,this.label="",this._active=!1,this._disabled=!1}get id(){return this._id??this._generatedPanelId}set id(e){this._id=e||this._generatedPanelId}get title(){return this.label}set title(e){this.label=e}get active(){return this._active}set active(e){const t=p(e);if(this._active!==t){const o=this._active;this._active=t,this.requestUpdate("active",o),this.dispatchEvent(new CustomEvent("swim-tab-active-change",{bubbles:!0,composed:!0}))}}get disabled(){return this._disabled}set disabled(e){this._disabled=p(e)}connectedCallback(){super.connectedCallback(),this.hasAttribute("tab-id")||(this.tabId=this._generatedTabId)}render(){return d`
      <div
        class="swim-tab__panel"
        role="tabpanel"
        id="${this.id}"
        aria-labelledby="${this.tabId}"
        ?hidden="${!this.active}"
      >
        <slot></slot>
      </div>
    `}};Yi.styles=[x,yr];let pe=Yi;dt([a({type:String})],pe.prototype,"id",1);dt([a({type:String,attribute:"tab-id"})],pe.prototype,"tabId",2);dt([a({type:String})],pe.prototype,"label",2);dt([a({type:String})],pe.prototype,"title",1);dt([a({type:Boolean,reflect:!0})],pe.prototype,"active",1);dt([a({type:Boolean,reflect:!0})],pe.prototype,"disabled",1);customElements.get(sn)||customElements.define(sn,pe);const Ar=f`
  :host {
    display: block;
    margin-bottom: 2em;
  }

  .swim-tabs {
    display: block;
  }

  /* Tab list – horizontal by default */
  .swim-tabs__list {
    display: block;
    border-bottom: solid 2px var(--grey-700);
  }

  .swim-tabs__tab {
    display: inline-block;
    border: none;
    color: var(--grey-250);
    background: transparent;
    box-shadow: none;
    font-size: var(--font-size-m);
    box-sizing: border-box;
    margin: 0;
    padding: 0.35em 0.75em;
    position: relative;
    text-align: center;
    user-select: none;
    font: inherit;
    font-weight: var(--font-weight-bold);
    bottom: -1px;
    cursor: pointer;
  }

  .swim-tabs__tab::after {
    content: '';
    height: 2px;
    position: absolute;
    width: 100%;
    left: 0;
    bottom: -1px;
    transition: transform 250ms ease;
    transform: scale(0);
    background: var(--blue-500);
    color: var(--white);
  }

  .swim-tabs__tab:not([disabled]):hover {
    border: none;
    color: var(--white);
    background: transparent;
    opacity: 1;
  }

  .swim-tabs__tab:not([disabled]):hover::after,
  .swim-tabs__tab--active::after {
    transform: scale(1);
  }

  .swim-tabs__tab--active,
  .swim-tabs__tab--active:focus,
  .swim-tabs__tab--active:hover {
    color: var(--white);
    border-width: 0;
  }

  .swim-tabs__tab:focus-visible {
    outline: 2px solid var(--blue-200);
    border-radius: var(--radius-2);
    outline-offset: 1px;
  }

  .swim-tabs__tab--disabled {
    pointer-events: none;
    opacity: 0.6;
  }

  /* Tab content area */
  .swim-tabs__content {
    padding: var(--spacing-10);
  }

  /* Light appearance */
  :host([appearance='light']) .swim-tabs {
    border: 2px solid var(--grey-700);
    box-shadow: var(--shadow-2);
  }

  :host([appearance='light']) .swim-tabs__list {
    background-color: var(--grey-700);
    border-bottom: 2px solid var(--grey-700);
    font-size: 13px;
    line-height: 15px;
    font-weight: var(--font-weight-semibold);
    margin-left: -2px;
  }

  :host([appearance='light']) .swim-tabs__tab {
    height: 36px;
    padding: var(--spacing-8) 1.25em;
  }

  :host([appearance='light']) .swim-tabs__content {
    background-color: var(--grey-850);
  }

  /* Vertical layout */
  :host([vertical]) .swim-tabs {
    display: flex;
  }

  :host([vertical]) .swim-tabs__list {
    flex: 0 0 160px;
    border: none;
  }

  :host([vertical]) .swim-tabs__tab {
    height: 53px;
    width: 100%;
    text-align: left;
    font-size: 13px;
    line-height: 45px;
    border: none !important;
    border-bottom: 1px solid var(--grey-700) !important;
    padding-left: 19px;
    font-weight: var(--font-weight-semibold);
  }

  :host([vertical]) .swim-tabs__tab::after {
    display: none;
  }

  :host([vertical]) .swim-tabs__content {
    flex: 1 1 100%;
  }

  /* Vertical + light */
  :host([vertical][appearance='light']) .swim-tabs__list {
    background-color: var(--grey-750);
    border-right: 2px solid var(--grey-700);
    border-left: 2px solid var(--grey-700);
  }

  :host([vertical][appearance='light']) .swim-tabs__tab {
    line-height: 38px;
  }

  :host([vertical][appearance='light']) .swim-tabs__tab:last-child {
    border: none !important;
    border-bottom: none !important;
  }

  :host([vertical][appearance='light']) .swim-tabs__content {
    background-color: var(--grey-750);
  }
`;var hs=(n=>(n.Legacy="legacy",n.Light="light",n))(hs||{}),Sr=Object.defineProperty,Ir=Object.getOwnPropertyDescriptor,ui=(n,e,t,o)=>{for(var i=o>1?void 0:o?Ir(e,t):e,s=n.length-1,r;s>=0;s--)(r=n[s])&&(i=(o?r(e,t,i):r(i))||i);return o&&i&&Sr(e,t,i),i};const rn="swim-tabs",Wi=class Wi extends _{constructor(){super(...arguments),this._vertical=!1,this.appearance=hs.Legacy,this._tabs=[],this._slotChangeBound=()=>this._syncTabs(),this._tabActiveChangeBound=()=>this.requestUpdate()}get vertical(){return this._vertical}set vertical(e){this._vertical=p(e)}connectedCallback(){super.connectedCallback()}firstUpdated(){this._syncTabs(),this._listenToTabChanges();const e=this.slotEl;e&&e.addEventListener("slotchange",this._slotChangeBound)}disconnectedCallback(){var t;const e=(t=this.shadowRoot)==null?void 0:t.querySelector("slot");e&&e.removeEventListener("slotchange",this._slotChangeBound),this._tabs.forEach(o=>o.removeEventListener("swim-tab-active-change",this._tabActiveChangeBound)),super.disconnectedCallback()}_listenToTabChanges(){this._tabs.forEach(e=>e.addEventListener("swim-tab-active-change",this._tabActiveChangeBound))}_syncTabs(){var s;const e=(s=this.shadowRoot)==null?void 0:s.querySelector("slot"),o=((e==null?void 0:e.assignedElements({flatten:!0}))??[]).filter(r=>r instanceof pe);this._tabs.forEach(r=>r.removeEventListener("swim-tab-active-change",this._tabActiveChangeBound)),this._tabs=o,this._listenToTabChanges();const i=o.filter(r=>r.active);i.length>1?console.error('swim-tabs: Multiple active tabs set "active".'):i.length===0&&o.length>0&&(o[0].active=!0)}_tabClicked(e){e.disabled||(this._tabs.forEach(t=>t.active=t===e),e.active=!0,this.dispatchEvent(new CustomEvent("select-tab",{detail:{tab:e},bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("select",{detail:{tab:e},bubbles:!0,composed:!0})))}_move(e){const t=this._tabs,o=t.findIndex(i=>i.active);for(let i=o+e;i>=0&&i<t.length;i+=e){const s=t[i];if(s&&!s.disabled){this._tabClicked(s);return}}}prev(){this._move(-1)}next(){this._move(1)}_handleKeyDown(e){const t=this.vertical,o=e.key;t&&(o==="ArrowUp"||o==="ArrowDown")?(e.preventDefault(),this._move(o==="ArrowDown"?1:-1)):!t&&(o==="ArrowLeft"||o==="ArrowRight")&&(e.preventDefault(),this._move(o==="ArrowRight"?1:-1))}render(){const e=this._tabs;return d`
      <section class="swim-tabs">
        <div class="swim-tabs__list" part="tablist" role="tablist" @keydown="${this._handleKeyDown}">
          ${e.map(t=>d`
              <button
                type="button"
                role="tab"
                id="${t.tabId}"
                aria-controls="${t.id}"
                aria-selected="${t.active}"
                class="swim-tabs__tab ${t.active?"swim-tabs__tab--active":""} ${t.disabled?"swim-tabs__tab--disabled":""}"
                ?disabled="${t.disabled}"
                @click="${()=>this._tabClicked(t)}"
              >
                ${t.label}
              </button>
            `)}
        </div>
        <div class="swim-tabs__content" part="tab-content">
          <slot></slot>
        </div>
      </section>
    `}};Wi.styles=[x,Ar];let Ne=Wi;ui([$("slot")],Ne.prototype,"slotEl",2);ui([a({type:Boolean,reflect:!0})],Ne.prototype,"vertical",1);ui([a({type:String,reflect:!0})],Ne.prototype,"appearance",2);ui([v()],Ne.prototype,"_tabs",2);customElements.get(rn)||customElements.define(rn,Ne);const zr=f`
  :host {
    display: inline-block;
    cursor: pointer;
  }

  :host([disabled]) {
    pointer-events: none;
    cursor: default;
  }

  .swim-button-toggle {
    position: relative;
    z-index: 3;
    padding: 1px 10px;
    border-radius: var(--radius-4);
    color: var(--grey-350);
    white-space: nowrap;
    transition: background-color 0.25s cubic-bezier(0.35, 0, 0.25, 1), font-weight 0.25s ease-in;
    font: inherit;
    font-size: var(--font-size-m);
    cursor: inherit;
    border: none;
    background: transparent;
    width: 100%;
    text-align: inherit;
  }

  .swim-button-toggle.swim-button-toggle--checked {
    font-weight: var(--font-weight-semibold);
    color: var(--grey-050);
    background-color: var(--grey-700);
  }

  :host(:not([disabled])) .swim-button-toggle:hover:not(.swim-button-toggle--checked) {
    background: rgba(59, 68, 87, 0.1);
  }

  .swim-button-toggle:focus {
    outline: none;
  }

  .swim-button-toggle:focus-visible {
    outline: 2px solid var(--grey-500);
  }

  .swim-button-toggle__content {
    display: block;
  }
`;var Tr=Object.defineProperty,Br=Object.getOwnPropertyDescriptor,ht=(n,e,t,o)=>{for(var i=o>1?void 0:o?Br(e,t):e,s=n.length-1,r;s>=0;s--)(r=n[s])&&(i=(o?r(e,t,i):r(i))||i);return o&&i&&Tr(e,t,i),i};let Lr=0;const an="swim-button-toggle",Ji=class Ji extends _{constructor(){super(...arguments),this._uniqueId=`swim-button-toggle-${++Lr}`,this.name=this._uniqueId,this.value=!1,this._checked=!1,this._disabled=!1}get id(){return this._id??this._uniqueId}set id(e){this._id=e}get checked(){return this._checked}set checked(e){const t=p(e);this._checked!==t&&(this._checked=t,this.requestUpdate("checked"))}get disabled(){return this._disabled}set disabled(e){this._disabled=p(e)}render(){return d`
      <button
        type="button"
        class="swim-button-toggle ${this._checked?"swim-button-toggle--checked":""}"
        id="${this.id}"
        ?disabled="${this.disabled}"
        aria-pressed="${this._checked}"
        aria-disabled="${this.disabled?"true":"false"}"
        @click="${this._handleClick}"
      >
        <span class="swim-button-toggle__content">
          <slot></slot>
        </span>
      </button>
    `}_handleClick(e){e.preventDefault(),e.stopPropagation(),!(this.disabled||this.checked)&&(this._checked=!0,this.dispatchEvent(new CustomEvent("value-change",{detail:this.value,bubbles:!0,composed:!0})))}};Ji.styles=[x,zr];let Ae=Ji;ht([a({type:String})],Ae.prototype,"id",1);ht([a({type:String})],Ae.prototype,"name",2);ht([a()],Ae.prototype,"value",2);ht([a({type:Boolean,reflect:!0})],Ae.prototype,"checked",1);ht([v()],Ae.prototype,"_checked",2);ht([a({type:Boolean,reflect:!0})],Ae.prototype,"disabled",1);customElements.get(an)||customElements.define(an,Ae);const Or=f`
  :host {
    display: inline-flex;
    transition: all 0.25s ease;
  }

  :host([role='group']) {
    /* Expose group semantics */
  }

  .swim-button-toggle-group__container {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .swim-button-toggle-group__container__label {
    font-weight: var(--font-weight-semibold);
    font-size: 12px;
    line-height: 12px;
    color: var(--grey-350);
  }

  .swim-button-toggle-group__container__toggle-buttons {
    position: relative;
    display: flex;
    flex-wrap: nowrap;
    border: 1px solid var(--grey-600);
    border-radius: var(--radius-4);
    padding: var(--spacing-2);
    gap: var(--spacing-2);
  }

  .swim-button-toggle-group__container__toggle-buttons__animation-holder {
    position: absolute;
    top: 0;
    margin: var(--spacing-2);
    height: calc(100% - 4px);
    border-radius: var(--radius-2);
    background-color: var(--grey-700);
    transition: all 0.25s cubic-bezier(0.35, 0, 0.25, 1);
    pointer-events: none;
  }

  :host([disabled]) .swim-button-toggle-group__container__toggle-buttons__animation-holder {
    display: none;
  }
`;var Dr=Object.defineProperty,Mr=Object.getOwnPropertyDescriptor,We=(n,e,t,o)=>{for(var i=o>1?void 0:o?Mr(e,t):e,s=n.length-1,r;s>=0;s--)(r=n[s])&&(i=(o?r(e,t,i):r(i))||i);return o&&i&&Dr(e,t,i),i};let Pr=0;const ln="swim-button-toggle-group",si=class si extends _{constructor(){var e;super(),this._uniqueId=`swim-button-toggle-group-${++Pr}`,this._animationHolderLeft=0,this._animationHolderWidth=0,this.label="",this._value=void 0,this._disabled=!1,this._slotChangeBound=()=>this._onSlotChange(),this._slotForCleanup=null,this._internals=((e=this.attachInternals)==null?void 0:e.call(this))??{},this.setAttribute("role","group"),this._boundValueChange=this._onValueChangeEvent.bind(this)}get id(){return this._id??this._uniqueId}set id(e){this._id=e}get value(){return this._value}set value(e){this._value!==e&&(this._value=e,this._internals.setFormValue(e!=null?String(e):""),this._syncSelection())}get disabled(){return this._disabled}set disabled(e){this._disabled=p(e),this._syncDisabled()}connectedCallback(){super.connectedCallback(),this.addEventListener("value-change",this._boundValueChange),this._internals.setFormValue&&this._internals.setFormValue(this._value!=null?String(this._value):"")}disconnectedCallback(){this._slotForCleanup&&(this._slotForCleanup.removeEventListener("slotchange",this._slotChangeBound),this._slotForCleanup=null),this.removeEventListener("value-change",this._boundValueChange),super.disconnectedCallback()}firstUpdated(e){super.firstUpdated(e);const t=this._slot;t&&(this._slotForCleanup=t,t.addEventListener("slotchange",this._slotChangeBound)),this._onSlotChange()}updated(e){super.updated(e),(e.has("value")||e.has("disabled"))&&(this._syncSelection(),this._syncDisabled())}_getToggles(){const e=this._slot;return e?e.assignedElements({flatten:!0}).filter(o=>o instanceof HTMLElement&&o.tagName==="SWIM-BUTTON-TOGGLE"):[]}_onSlotChange(){this._syncSelection(),this._syncDisabled(),requestAnimationFrame(()=>this._calcAnimationDimensions())}_syncSelection(){const e=this._getToggles(),t=this._value;e.forEach(o=>{o.checked=o.value!==void 0&&o.value===t}),requestAnimationFrame(()=>this._calcAnimationDimensions())}_syncDisabled(){this._getToggles().forEach(t=>{t.disabled=this._disabled})}_calcAnimationDimensions(){const e=this._getToggles();if(!e.length||this._disabled){this._animationHolderLeft=0,this._animationHolderWidth=0;return}const t=e.findIndex(l=>l.value!==void 0&&l.value===this._value);if(t<0){this._animationHolderLeft=0,this._animationHolderWidth=0;return}let o=0;for(let l=0;l<t;l++)o+=e[l].offsetWidth??0;o+=t*2+2;const s=e[t],r=Math.max(0,((s==null?void 0:s.offsetWidth)??0)-4);this._animationHolderLeft=o,this._animationHolderWidth=r}_onValueChangeEvent(e){const o=e.detail;this._value!==o&&(this._value=o,this._internals.setFormValue(o!=null?String(o):""),this._syncSelection(),this.dispatchEvent(new CustomEvent("value-change",{detail:o,bubbles:!0,composed:!0})))}render(){return d`
      <div class="swim-button-toggle-group__container" id="${this.id}">
        ${this.label?d`<label class="swim-button-toggle-group__container__label" for="${this.id}-toggles"
              >${this.label}</label
            >`:""}
        <div
          class="swim-button-toggle-group__container__toggle-buttons"
          id="${this.id}-toggles"
          role="group"
          aria-label="${this.label||"Toggle group"}"
        >
          <div
            class="swim-button-toggle-group__container__toggle-buttons__animation-holder"
            style="left: ${this._animationHolderLeft}px; width: ${this._animationHolderWidth}px;"
          ></div>
          <slot></slot>
        </div>
      </div>
    `}};si.styles=[x,Or],si.formAssociated=!0;let ge=si;We([$("slot")],ge.prototype,"_slot",2);We([v()],ge.prototype,"_animationHolderLeft",2);We([v()],ge.prototype,"_animationHolderWidth",2);We([a({type:String})],ge.prototype,"id",1);We([a({type:String})],ge.prototype,"label",2);We([a()],ge.prototype,"value",1);We([a({type:Boolean,reflect:!0})],ge.prototype,"disabled",1);customElements.get(ln)||customElements.define(ln,ge);const Zt=4,Ci=3,cn=25,Fr=30,qr=15,dn=27,$r=f`
  @keyframes cardSlideIn {
    0% {
      opacity: 0;
      transform: translateY(40px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  :host {
    display: flex;
    position: relative;
    background: var(--grey-800);
    border-radius: var(--radius-6);
    box-sizing: border-box;
  }

  :host([disabled]) {
    cursor: default;
    pointer-events: none;
  }

  :host([appearance='flat']) {
    background: none;
    box-shadow: none;
  }

  /* Status dot */
  .swim-card__status {
    display: block;
    background-color: var(--grey-550);
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }

  .swim-card__status--success {
    background-color: var(--card-status-success, #b0e53c);
  }

  .swim-card__status--error {
    background-color: var(--color-error);
  }

  .swim-card__accent {
    display: block;
    background: linear-gradient(180deg, var(--grey-100) 0%, var(--grey-200) 100%);
  }

  .swim-card__dot {
    display: inline-block;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background-color: var(--grey-400);
    margin: 3px var(--spacing-4);
  }

  /* Outline (selected or error) – match ngx-ui */
  .swim-card__outline {
    pointer-events: none;
    position: absolute;
    top: -5px;
    right: -5px;
    left: -5px;
    bottom: -5px;
    border: ${Ci}px solid var(--blue-400);
    border-radius: var(--radius-6);
  }

  .swim-card__outline--error {
    border-color: var(--color-error);
  }

  .swim-card__outline-text {
    pointer-events: none;
    color: var(--blue-400);
    white-space: nowrap;
    position: absolute;
    top: -5px;
    right: -5px;
    left: -5px;
    bottom: -5px;
    border: ${Ci}px solid var(--blue-400);
    border-bottom: 0;
    border-radius: var(--radius-6);
  }

  .swim-card__outline-text--error {
    color: var(--color-error);
    border-color: var(--color-error);
  }

  .swim-card__outline-text-inner {
    font-size: var(--font-size-s);
    width: 100%;
    text-align: center;
    position: absolute;
    display: flex;
    align-items: center;
    bottom: -8px;
    pointer-events: auto;
    cursor: pointer;
  }

  .swim-card__outline-text-inner::before,
  .swim-card__outline-text-inner::after {
    content: '';
    height: ${Ci}px;
    background: var(--blue-400);
  }

  .swim-card__outline-text-inner::before {
    margin-right: var(--spacing-16);
    border-radius: var(--radius-0) var(--radius-0) var(--radius-0) var(--radius-2);
    flex: 1;
  }

  .swim-card__outline-text-inner::after {
    margin-left: var(--spacing-16);
    border-radius: var(--radius-0) var(--radius-0) var(--radius-2) var(--radius-0);
    width: var(--spacing-20);
  }

  .swim-card__outline-text--error .swim-card__outline-text-inner::before,
  .swim-card__outline-text--error .swim-card__outline-text-inner::after {
    background: var(--color-error);
  }

  /* Select checkbox (swim-checkbox round) – match ngx-ui */
  .swim-card__select {
    display: flex;
    align-items: center;
  }

  .swim-card__select swim-checkbox {
    --grey-600: var(--grey-750);
    margin: 0;
  }

  .swim-card__select swim-checkbox::part(box) {
    margin-right: 0;
  }
`,Rr=f`
  :host([orientation='horizontal']) {
    position: relative;
    width: 100%;
    min-width: var(--swim-card-min-width, 500px);
    min-height: 80px;
    height: 80px;
    transition: all 0.2s ease-in-out;
    animation: 0.2s ease-in-out cardSlideIn;
  }

  :host([orientation='horizontal']) .swim-card__status {
    position: absolute;
    left: 10px;
    top: 10px;
  }

  :host([orientation='horizontal']) .swim-card__select {
    margin-left: ${cn}px;
  }

  :host([orientation='horizontal']) .swim-card__accent {
    position: absolute;
    width: ${Zt}px;
    min-width: ${Zt}px;
    right: 0;
    height: 100%;
    border-radius: var(--radius-0) var(--radius-2) var(--radius-2) var(--radius-0);
  }

  :host([orientation='horizontal']) ::slotted(swim-card-header) {
    display: flex;
    align-items: center;
    padding: var(--spacing-0) ${cn}px;
    flex-grow: 1;
    overflow: hidden;
    cursor: pointer;
  }

  :host([orientation='horizontal']) ::slotted(swim-card-header.no-click) {
    cursor: default;
  }

  :host([orientation='horizontal']) ::slotted(swim-card-section) {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: var(--spacing-0) ${Fr}px;
  }

  :host([orientation='horizontal']) .swim-card__outline,
  :host([orientation='horizontal']) .swim-card__outline-text {
    top: -5px;
    right: -5px;
    left: -5px;
    bottom: -5px;
  }
`,Hr=f`
  :host([orientation='vertical']) {
    position: relative;
    flex-direction: column;
    min-width: 347px;
    max-width: 850px;
    height: 418px;
    color: var(--grey-350);
  }

  :host([orientation='vertical']) .swim-card__status {
    margin: ${qr}px auto var(--spacing-0) auto;
  }

  :host([orientation='vertical']) .swim-card__accent {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: ${Zt}px;
    border-radius: var(--radius-0) var(--radius-0) var(--radius-6) var(--radius-6);
  }

  :host([orientation='vertical']) ::slotted(swim-card-header) {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    flex-shrink: 0;
    z-index: 1;
    overflow: visible;
  }

  :host([orientation='vertical']) ::slotted(swim-card-body) {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 1;
    padding: var(--spacing-20) var(--spacing-0);
    padding-left: ${dn}px;
    padding-right: ${dn}px;
  }

  :host([orientation='vertical']) ::slotted(swim-card-footer) {
    position: relative;
    width: 100%;
    flex-shrink: 0;
    height: 50px;
    padding: var(--spacing-20) var(--spacing-0);
    margin-top: 15px;
    margin-bottom: ${Zt}px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`,Vr=[x,$r,Rr,Hr];var zt=(n=>(n.Success="success",n.Error="error",n.Disabled="disabled",n))(zt||{}),us=(n=>(n.Horizontal="horizontal",n.Vertical="vertical",n))(us||{}),ps=(n=>(n.Normal="normal",n.Flat="flat",n))(ps||{});const Nr=f`
  :host {
    display: inline-flex;
  }

  :host([disabled]) {
    pointer-events: none;
  }

  :host([disabled]) .swim-checkbox__label {
    cursor: not-allowed;
  }

  :host([round]) .swim-checkbox__box {
    border-radius: 100%;
  }

  .swim-checkbox__label {
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-bottom: 0;
    outline: none;
  }

  .swim-checkbox__label:focus-visible {
    outline: none;
  }

  .swim-checkbox__label:focus-visible .swim-checkbox__box {
    outline: 2px solid var(--blue-200);
    outline-offset: 1px;
  }

  .swim-checkbox__box {
    position: relative;
    flex-shrink: 0;
    border-radius: var(--radius-2);
    background-color: transparent;
    border: 2px solid var(--grey-600);
    transition: transform 0.4s cubic-bezier(0.45, 1.8, 0.5, 0.75);
    user-select: none;
    margin: auto var(--spacing-10) auto 0;
    outline: 0 none transparent;
    outline-offset: 1px;
  }

  .swim-checkbox__box::after {
    position: absolute;
    top: calc(50% - 9px);
    left: calc(50% - 4px);
    width: 6px;
    height: 12px;
    content: '';
    border: solid var(--white);
    border-width: 0 2px 2px 0;
    transform: rotate(0deg) scale(0);
    transition: all 0.4s cubic-bezier(0.45, 1.8, 0.5, 0.75);
  }

  .swim-checkbox__box--indeterminate {
    background-color: var(--blue-400);
    border-radius: var(--radius-2);
    opacity: 1;
    border: 2px solid var(--blue-400);
    transform: rotate(0deg) scale(1);
  }

  .swim-checkbox__box--indeterminate::after {
    width: 12px;
    height: 2px;
    top: calc(50% - 1px);
    left: calc(50% - 6px);
    border: none;
    transform: rotate(0deg) scale(1);
    background-color: var(--white);
  }

  .swim-checkbox__box--checked {
    background-color: var(--blue-400);
    border-radius: var(--radius-2);
    opacity: 1;
    border: 2px solid var(--blue-400);
    transform: rotate(0deg) scale(1);
  }

  .swim-checkbox__box--checked::after {
    transform: rotate(45deg) scale(1);
    background-color: transparent;
  }

  .swim-checkbox__content {
    margin: auto 0;
    color: var(--grey-100);
    font-size: var(--font-size-m);
    line-height: var(--font-line-height-200);
  }
`;var Gr=Object.defineProperty,Ur=Object.getOwnPropertyDescriptor,Ie=(n,e,t,o)=>{for(var i=o>1?void 0:o?Ur(e,t):e,s=n.length-1,r;s>=0;s--)(r=n[s])&&(i=(o?r(e,t,i):r(i))||i);return o&&i&&Gr(e,t,i),i};let Yr=0;const hn="swim-checkbox",ri=class ri extends _{constructor(){super(),this.id=`swim-checkbox-${++Yr}`,this.name="",this.diameter="18px",this._checked=!1,this._indeterminate=!1,this._tabindex=0,this._disabled=!1,this._round=!1,this._internals=this.attachInternals()}get checked(){return this._checked}set checked(e){const t=p(e);this._checked!==t&&(this._checked=t,this._syncFormValue(),this.dispatchEvent(new CustomEvent("checked-change",{detail:this._checked,bubbles:!0,composed:!0})))}get indeterminate(){return this._indeterminate}set indeterminate(e){const t=p(e);this._indeterminate!==t&&(this._indeterminate=t,this.dispatchEvent(new CustomEvent("indeterminate-change",{detail:this._indeterminate,bubbles:!0,composed:!0})))}get tabindex(){return this._tabindex}set tabindex(e){this._tabindex=A(e,0)}get disabled(){return this._disabled}set disabled(e){this._disabled=p(e)}get round(){return this._round}set round(e){this._round=p(e)}connectedCallback(){super.connectedCallback(),this._syncFormValue()}updated(e){super.updated(e),(e.has("checked")||e.has("_checked"))&&this._syncFormValue()}focus(e){var t;(t=this._roving)==null||t.focus(e)}_syncFormValue(){this._internals.setFormValue(this._checked?"on":"")}_onClick(e){e.preventDefault(),!this.disabled&&this._toggle()}_onKeydown(e){e.key!==" "||this.disabled||(e.stopPropagation(),e.preventDefault(),this._toggle())}_toggle(){this.checked=!this.checked,this._emitChange()}_emitChange(){this.dispatchEvent(new CustomEvent("change",{detail:{stopPropagation:()=>{},timeStamp:Date.now(),target:{checked:this._checked}},bubbles:!0,composed:!0}))}_onFocus(e){this.dispatchEvent(new FocusEvent("focus",{...e,bubbles:!0,composed:!0}))}_onBlur(e){this.dispatchEvent(new FocusEvent("blur",{...e,bubbles:!0,composed:!0}))}render(){const e=`${this.id}-content`;return d`
      <div
        class="swim-checkbox__roving swim-checkbox__label"
        role="checkbox"
        tabindex="${this.disabled?-1:this.tabindex}"
        aria-checked="${this.indeterminate?"mixed":this.checked}"
        aria-disabled="${this.disabled?"true":"false"}"
        aria-labelledby="${e}"
        @click="${this._onClick}"
        @keydown="${this._onKeydown}"
        @focus="${this._onFocus}"
        @blur="${this._onBlur}"
      >
        <div
          part="box"
          class="swim-checkbox__box ${this.checked&&!this.indeterminate?"swim-checkbox__box--checked":""} ${this.indeterminate?"swim-checkbox__box--indeterminate":""}"
          style="width: ${this.diameter}; height: ${this.diameter}; min-width: ${this.diameter}; min-height: ${this.diameter};"
        ></div>
        <div part="content" class="swim-checkbox__content" id="${e}">
          <slot></slot>
        </div>
      </div>
    `}};ri.styles=[x,Nr],ri.formAssociated=!0;let ne=ri;Ie([$(".swim-checkbox__roving")],ne.prototype,"_roving",2);Ie([a({type:String})],ne.prototype,"id",2);Ie([a({type:String})],ne.prototype,"name",2);Ie([a({type:String})],ne.prototype,"diameter",2);Ie([a({type:Boolean,reflect:!0,attribute:"checked"})],ne.prototype,"checked",1);Ie([a({type:Boolean,reflect:!0})],ne.prototype,"indeterminate",1);Ie([a({type:Number})],ne.prototype,"tabindex",1);Ie([a({type:Boolean,reflect:!0})],ne.prototype,"disabled",1);Ie([a({type:Boolean,reflect:!0})],ne.prototype,"round",1);customElements.get(hn)||customElements.define(hn,ne);var Wr=Object.defineProperty,Jr=Object.getOwnPropertyDescriptor,ve=(n,e,t,o)=>{for(var i=o>1?void 0:o?Jr(e,t):e,s=n.length-1,r;s>=0;s--)(r=n[s])&&(i=(o?r(e,t,i):r(i))||i);return o&&i&&Wr(e,t,i),i};const un="swim-card",Ki=class Ki extends _{constructor(){super(...arguments),this._disabled=!1,this.orientation=us.Horizontal,this.statusTooltip="",this._selectable=!1,this._selected=!1,this._error=!1,this.outlineText="",this.appearance=ps.Normal,this._hideAccent=!1}get disabled(){return this._disabled}set disabled(e){this._disabled=p(e)}get selectable(){return this._selectable}set selectable(e){this._selectable=p(e)}get selected(){return this._selected}set selected(e){this._selected=p(e)}get error(){return this._error}set error(e){this._error=p(e)}get hideAccent(){return this._hideAccent}set hideAccent(e){this._hideAccent=p(e)}_onOutlineClick(e){e.stopPropagation(),this.dispatchEvent(new CustomEvent("outline-click",{bubbles:!0,composed:!0}))}_onSelectChange(e){var o,i;e.stopPropagation();const t=((i=(o=e.detail)==null?void 0:o.target)==null?void 0:i.checked)??!1;this.selected=t,this.dispatchEvent(new CustomEvent("select",{detail:this.selected,bubbles:!0,composed:!0}))}_onCheckboxClick(e){e.stopPropagation()}render(){const e=this.selected&&!this.outlineText&&!this.error,t=this.error&&!this.outlineText,o=!!this.outlineText,i=!!this.status,s=this.status===zt.Success?"swim-card__status--success":this.status===zt.Error?"swim-card__status--error":"";return d`
      ${e?d`<div class="swim-card__outline" aria-hidden="true"></div>`:u}
      ${t?d`<div class="swim-card__outline swim-card__outline--error" aria-hidden="true"></div>`:u}
      ${o?d`
            <div
              class="swim-card__outline-text ${this.error?"swim-card__outline-text--error":""}"
              aria-hidden="true"
            >
              <div
                part="outline-text"
                class="swim-card__outline-text-inner"
                role="button"
                tabindex="${this.disabled?-1:0}"
                aria-label="${this.outlineText}"
                @click="${this._onOutlineClick}"
                @keydown="${r=>{(r.key==="Enter"||r.key===" ")&&(r.preventDefault(),this._onOutlineClick(r))}}"
              >
                ${this.outlineText}
              </div>
            </div>
          `:u}
      ${i?d`
            <div
              class="swim-card__status ${s}"
              title="${this.statusTooltip}"
              role="status"
              aria-label="${this.statusTooltip||this.status||""}"
            ></div>
          `:u}
      ${this.selectable?d`
            <div class="swim-card__select" @click="${this._onCheckboxClick}">
              <swim-checkbox
                round
                .checked="${this.selected}"
                ?disabled="${this.disabled}"
                aria-label="Select card"
                @change="${this._onSelectChange}"
              ></swim-checkbox>
            </div>
          `:u}

      <slot></slot>

      ${this.hideAccent?u:d`<div class="swim-card__accent" aria-hidden="true"></div>`}
    `}};Ki.styles=Vr;let j=Ki;ve([a({type:Boolean,reflect:!0})],j.prototype,"disabled",1);ve([a({type:String,reflect:!0})],j.prototype,"orientation",2);ve([a({type:String,reflect:!0})],j.prototype,"status",2);ve([a({type:String,attribute:"status-tooltip"})],j.prototype,"statusTooltip",2);ve([a({type:Boolean,reflect:!0})],j.prototype,"selectable",1);ve([a({type:Boolean,reflect:!0})],j.prototype,"selected",1);ve([a({type:Boolean,reflect:!0})],j.prototype,"error",1);ve([a({type:String,attribute:"outline-text"})],j.prototype,"outlineText",2);ve([a({type:String,reflect:!0})],j.prototype,"appearance",2);ve([a({type:Boolean,attribute:"hide-accent"})],j.prototype,"hideAccent",1);customElements.get(un)||customElements.define(un,j);const pn=25,Kr=f`
  :host {
    display: flex;
    align-items: center;
    padding: var(--spacing-0) ${pn}px;
    flex-grow: 1;
    overflow: hidden;
    cursor: pointer;
    box-sizing: border-box;
  }

  :host(.no-click) {
    cursor: default;
  }

  :host([orientation='vertical']) {
    flex-direction: column;
    flex-grow: 0;
    padding: var(--spacing-0);
    margin-bottom: 15px;
    width: 100%;
    box-sizing: border-box;
    overflow: visible;
    position: relative;
  }

  :host([orientation='vertical']) ::slotted(swim-card-avatar) {
    margin: 15px var(--spacing-0) var(--spacing-20) var(--spacing-0);
    flex-shrink: 0;
  }

  .swim-card-header__title-group {
    margin-left: ${pn}px;
    display: flex;
    flex-direction: column;
    width: calc(100% - 79px);
  }

  :host([orientation='vertical']) .swim-card-header__title-group {
    margin-left: 0;
    width: 100%;
    padding: 0 var(--spacing-16);
    text-align: center;
  }

  :host([orientation='vertical']) ::slotted([slot='title']) {
    text-align: center;
  }

  :host([orientation='vertical']) ::slotted([slot='subtitle']) {
    text-align: center;
  }

  .swim-card-header__tag,
  .swim-card-header__title,
  .swim-card-header__subtitle {
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    color: var(--white);
  }

  ::slotted([slot='tag']) {
    font-weight: var(--font-weight-bold);
    font-size: var(--font-size-xxs);
    line-height: 12px;
  }

  ::slotted([slot='title']) {
    font-weight: var(--font-weight-semibold);
    font-size: 22px;
    color: var(--grey-050);
  }

  ::slotted([slot='subtitle']) {
    display: inline-block;
    font-weight: var(--font-weight-semibold);
    font-size: var(--font-size-s);
    color: var(--grey-300);
  }

  .swim-card-header__label {
    font-weight: var(--font-weight-semibold);
    font-size: var(--font-size-xs);
    color: var(--card-status-success, #b0e53c);
    border-bottom: 0;
    margin-bottom: 0.5rem;
    white-space: nowrap;
    width: 100%;
    text-align: center;
    display: flex;
    align-items: center;
  }

  .swim-card-header__label::before,
  .swim-card-header__label::after {
    content: '';
    height: 2px;
    background: var(--grey-700);
    width: 100%;
  }

  .swim-card-header__label::before {
    margin-right: var(--spacing-20);
  }

  .swim-card-header__label::after {
    margin-left: var(--spacing-20);
  }
`,jr=[x,Kr];var Qr=Object.defineProperty,gs=(n,e,t,o)=>{for(var i=void 0,s=n.length-1,r;s>=0;s--)(r=n[s])&&(i=r(e,t,i)||i);return i&&Qr(e,t,i),i};const gn="swim-card-header",ji=class ji extends _{constructor(){super(...arguments),this.label="",this.orientation="horizontal"}render(){return d`
      <slot name="avatar"></slot>
      <div class="swim-card-header__title-group">
        <slot></slot>
        ${this.label?d`<div class="swim-card-header__label">${this.label}</div>`:u}
        <slot name="tag"></slot>
        <slot name="title"></slot>
        <slot name="subtitle"></slot>
      </div>
    `}};ji.styles=jr;let Tt=ji;gs([a({type:String})],Tt.prototype,"label");gs([a({type:String,reflect:!0})],Tt.prototype,"orientation");customElements.get(gn)||customElements.define(gn,Tt);const Zr=f`
  :host {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    width: 100%;
  }

  .swim-card-footer__label {
    font-weight: var(--font-weight-semibold);
    font-size: var(--font-size-xs);
    color: var(--blue-400);
    border-bottom: 0;
    white-space: nowrap;
    width: 100%;
    text-align: center;
    position: absolute;
    display: flex;
    align-items: center;
    top: -15px;
    left: 0;
  }

  .swim-card-footer__label::before,
  .swim-card-footer__label::after {
    content: '';
    height: 2px;
    background: var(--grey-700);
    width: 100%;
  }

  .swim-card-footer__label::before {
    margin-right: var(--spacing-20);
  }

  .swim-card-footer__label::after {
    margin-left: var(--spacing-20);
  }

  /* Center footer action (match ngx-ui); prevent slotted button from stretching */
  ::slotted(swim-button) {
    width: auto;
  }
`,Xr=[x,Zr];var ea=Object.defineProperty,ta=(n,e,t,o)=>{for(var i=void 0,s=n.length-1,r;s>=0;s--)(r=n[s])&&(i=r(e,t,i)||i);return i&&ea(e,t,i),i};const mn="swim-card-footer",Qi=class Qi extends _{constructor(){super(...arguments),this.label=""}render(){return d`
      ${this.label?d`<div class="swim-card-footer__label">${this.label}</div>`:u}
      <slot></slot>
    `}};Qi.styles=Xr;let Xt=Qi;ta([a({type:String})],Xt.prototype,"label");customElements.get(mn)||customElements.define(mn,Xt);const bn=3,ia=f`
  :host {
    width: 54px;
    height: 54px;
    min-width: 54px;
    min-height: 54px;
    display: inline-block;
    box-sizing: border-box;
  }

  .swim-card-avatar__img:not(.swim-card-avatar__img--no-bg) {
    background-color: var(--white);
  }

  .swim-card-avatar__avatar {
    border: 2px solid var(--grey-100);
    border-radius: 100%;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    position: relative;
    display: flex;
    box-sizing: border-box;
  }

  .swim-card-avatar__inner {
    display: flex;
    height: 100%;
    width: 100%;
    border: ${bn}px solid transparent;
    border-radius: 100%;
    overflow: hidden;
    position: relative;
  }

  .swim-card-avatar__status {
    position: absolute;
    top: -2px;
    left: -2px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: ${bn}px solid var(--grey-800);
    background-color: var(--white);
    z-index: 2;
  }

  .swim-card-avatar__status--success {
    background-color: var(--card-status-success, #b0e53c);
  }

  .swim-card-avatar__status--error {
    background-color: var(--color-error);
  }

  .swim-card-avatar__avatar.has-status .swim-card-avatar__status {
    box-shadow: none;
  }

  .swim-card-avatar__img {
    width: 100%;
    height: 100%;
    border-radius: 100%;
    object-fit: cover;
  }

  .swim-card-avatar__img--no-bg {
    background-color: transparent;
  }

  .swim-card-avatar__content {
    margin: auto;
    font-size: var(--font-size-m);
    color: var(--grey-100);
    font-weight: var(--font-weight-bold);
  }
`,oa=[x,ia];var na=Object.defineProperty,Ri=(n,e,t,o)=>{for(var i=void 0,s=n.length-1,r;s>=0;s--)(r=n[s])&&(i=r(e,t,i)||i);return i&&na(e,t,i),i};const fn="swim-card-avatar",Zi=class Zi extends _{constructor(){super(...arguments),this.src="",this.removeImageBackground=!1}render(){const e=!!this.status,t=this.status===zt.Success?"swim-card-avatar__status--success":this.status===zt.Error?"swim-card-avatar__status--error":"";return d`
      <div class="swim-card-avatar__avatar ${e?"has-status":""}">
        ${e?d`<div
              class="swim-card-avatar__status ${t}"
              role="status"
              aria-label="${this.status||""}"
            ></div>`:u}
        <div class="swim-card-avatar__inner">
          ${this.src?d`
                <img
                  class="swim-card-avatar__img ${this.removeImageBackground?"swim-card-avatar__img--no-bg":""}"
                  src="${this.src}"
                  alt=""
                  draggable="false"
                  loading="lazy"
                />
              `:d`<span class="swim-card-avatar__content"><slot></slot></span>`}
        </div>
      </div>
    `}};Zi.styles=oa;let rt=Zi;Ri([a({type:String})],rt.prototype,"src");Ri([a({type:String,reflect:!0})],rt.prototype,"status");Ri([a({type:Boolean,attribute:"remove-image-background"})],rt.prototype,"removeImageBackground");customElements.get(fn)||customElements.define(fn,rt);const sa=f`
  :host {
    display: inline-block;
    background-color: var(--grey-750);
    border-radius: 11px;
    box-sizing: border-box;
    vertical-align: middle;
  }

  :host([size='small']) {
    height: 10px;
    width: 35%;
    min-width: 80px;
  }

  :host([size='medium']) {
    height: 12px;
    width: 30%;
    min-width: 100px;
  }

  :host([size='large']) {
    height: 16px;
    width: 50%;
    min-width: 150px;
  }
`,ra=[x,sa];var ms=(n=>(n.Small="small",n.Medium="medium",n.Large="large",n))(ms||{}),aa=Object.defineProperty,la=(n,e,t,o)=>{for(var i=void 0,s=n.length-1,r;s>=0;s--)(r=n[s])&&(i=r(e,t,i)||i);return i&&aa(e,t,i),i};const vn="swim-card-placeholder",Xi=class Xi extends _{constructor(){super(...arguments),this.size=ms.Medium}render(){return d``}};Xi.styles=ra;let ei=Xi;la([a({type:String,reflect:!0})],ei.prototype,"size");customElements.get(vn)||customElements.define(vn,ei);const _n=27,ca=f`
  :host {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 1;
    padding: var(--spacing-20) var(--spacing-0);
    padding-left: ${_n}px;
    padding-right: ${_n}px;
    box-sizing: border-box;
  }

  ::slotted(*) {
    font-weight: var(--font-weight-semibold);
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
  }
`,da=[x,ca],wn="swim-card-body",eo=class eo extends _{render(){return d`<slot></slot>`}};eo.styles=da;let Si=eo;customElements.get(wn)||customElements.define(wn,Si);const ha=f`
  :host {
    display: block;
  }

  :host([disabled]) {
    pointer-events: none;
  }

  .swim-radio__label {
    display: flex;
    align-items: center;
    position: relative;
    min-height: 1.5em;
    padding-left: 1.5em;
    margin: 0 0.8rem 0 0;
    cursor: pointer;
    user-select: none;
    outline: none;
  }

  :host([disabled]) .swim-radio__label {
    cursor: not-allowed;
  }

  .swim-radio__label:focus-visible {
    outline: none;
  }

  .swim-radio__label:focus-visible .swim-radio__checkmark {
    outline: 2px solid var(--blue-200);
    outline-offset: 1px;
  }

  .swim-radio__content {
    color: var(--grey-100);
    font-size: var(--font-size-m);
    line-height: var(--font-line-height-200);
  }

  /* Hide native radio visually but keep for semantics/accessibility */
  .swim-radio__input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
    margin: 0;
    pointer-events: none;
  }

  .swim-radio__checkmark {
    position: absolute;
    top: 0.25em;
    left: 0;
    height: 1em;
    width: 1em;
    background-color: transparent;
    border-radius: 50%;
    border: 1px solid var(--grey-600);
    opacity: 1;
    transition: background-color 0.3s ease, border-color 0.3s ease, opacity 0.3s ease;
    outline: 0 none transparent;
    outline-offset: 1px;
  }

  .swim-radio__checkmark::after {
    content: '';
    position: absolute;
    display: block;
    opacity: 0;
    top: 0;
    left: 0;
    width: 0.25em;
    height: 0.25em;
    /* Center dot in 1em circle: (1em - 0.25em) / 2 = 0.375em */
    transform: translate(0.375em, 0.375em);
    border-radius: 50%;
    background: var(--white);
    box-shadow: var(--shadow-1);
    transition: opacity 0.3s ease;
  }

  /* Hover */
  .swim-radio__label:hover .swim-radio__checkmark {
    background-color: var(--blue-400);
    border-color: var(--blue-400);
    opacity: 0.3;
  }

  .swim-radio__label:hover .swim-radio__checkmark::after {
    opacity: 0;
  }

  /* Checked */
  .swim-radio__label .swim-radio__input:checked ~ .swim-radio__checkmark,
  .swim-radio__checkmark--checked {
    background-color: var(--blue-400);
    border-color: var(--blue-400);
    opacity: 1;
  }

  .swim-radio__label .swim-radio__input:checked ~ .swim-radio__checkmark::after,
  .swim-radio__label:hover .swim-radio__checkmark::after,
  .swim-radio__checkmark--checked::after {
    opacity: 1;
  }

  /* Disabled: no hover effect */
  :host([disabled]) .swim-radio__label:hover .swim-radio__checkmark {
    background-color: transparent;
    border-color: var(--grey-600);
    opacity: 1;
  }

  :host([disabled]) .swim-radio__label:hover .swim-radio__checkmark::after {
    opacity: 0;
  }

  :host([disabled]) .swim-radio__label .swim-radio__input:checked ~ .swim-radio__checkmark::after,
  :host([disabled]) .swim-radio__checkmark--checked::after {
    opacity: 1;
  }
`,ua=f`
  :host {
    display: block;
  }

  :host([disabled]) {
    pointer-events: none;
  }

  .swim-radio-group__slot {
    display: block;
    outline: none;
  }

  .swim-radio-group__slot:focus {
    outline: none;
  }
`;var pa=Object.defineProperty,ga=Object.getOwnPropertyDescriptor,_e=(n,e,t,o)=>{for(var i=o>1?void 0:o?ga(e,t):e,s=n.length-1,r;s>=0;s--)(r=n[s])&&(i=(o?r(e,t,i):r(i))||i);return o&&i&&pa(e,t,i),i};let ma=0;const xn="swim-radio",to=class to extends _{constructor(){super(...arguments),this.id=`swim-radio-${++ma}`,this.name="",this.radioId="",this._tabindex=0,this._checked=!1,this.value="",this._disabled=!1,this.groupDisabled=!1,this.isInGroup=!1}get tabindex(){return this._tabindex}set tabindex(e){this._tabindex=A(e,0)}get checked(){return this._checked}set checked(e){const t=p(e);this._checked!==t&&(this._checked=t)}get disabled(){return this._disabled||this.groupDisabled}set disabled(e){this._disabled=p(e)}get _effectiveTabindex(){return this.disabled||this.isInGroup?-1:this._tabindex}get _inputId(){return this.radioId||`${this.id}-radio`}focus(e){var t;(t=this._roving)==null||t.focus(e)}_onClick(e){e.preventDefault(),!this.disabled&&this._select()}_onKeydown(e){e.key!==" "||this.disabled||(e.stopPropagation(),e.preventDefault(),this._select())}_select(){if(this.isInGroup){if(this._checked)return;this.checked=!0}else this.checked=!this._checked;this._checked&&this.dispatchEvent(new CustomEvent("change",{detail:this.value,bubbles:!0,composed:!0}))}_onInputChange(e){this.checked=!0,this.dispatchEvent(new CustomEvent("change",{detail:this.value,bubbles:!0,composed:!0}))}_onFocus(e){this.dispatchEvent(new FocusEvent("focus",{...e,bubbles:!0,composed:!0}))}_onBlur(e){this.dispatchEvent(new FocusEvent("blur",{...e,bubbles:!0,composed:!0}))}render(){const e=`${this.id}-content`;return d`
      <label
        class="swim-radio__label swim-radio__roving"
        for="${this._inputId}"
        tabindex="${this._effectiveTabindex}"
        role="radio"
        aria-checked="${this._checked}"
        aria-disabled="${this.disabled?"true":"false"}"
        aria-labelledby="${e}"
        @click="${this._onClick}"
        @keydown="${this._onKeydown}"
        @focus="${this._onFocus}"
        @blur="${this._onBlur}"
      >
        <input
          type="radio"
          class="swim-radio__input"
          id="${this._inputId}"
          tabindex="-1"
          .checked="${this._checked}"
          ?disabled="${this.disabled}"
          name="${this.name||this.id}"
          aria-checked="${this._checked}"
          @change="${this._onInputChange}"
          @focus="${this._onFocus}"
          @blur="${this._onBlur}"
        />
        <span
          part="checkmark"
          class="swim-radio__checkmark ${this._checked?"swim-radio__checkmark--checked":""}"
        ></span>
        <div part="content" class="swim-radio__content" id="${e}">
          <slot></slot>
        </div>
      </label>
    `}};to.styles=[x,ha];let Q=to;_e([$(".swim-radio__roving")],Q.prototype,"_roving",2);_e([a({type:String})],Q.prototype,"id",2);_e([a({type:String})],Q.prototype,"name",2);_e([a({type:String,attribute:"radio-id"})],Q.prototype,"radioId",2);_e([a({type:Number})],Q.prototype,"tabindex",1);_e([a({type:Boolean,reflect:!0})],Q.prototype,"checked",1);_e([a({type:String})],Q.prototype,"value",2);_e([a({type:Boolean,reflect:!0})],Q.prototype,"disabled",1);_e([a({type:Boolean,attribute:!1})],Q.prototype,"groupDisabled",2);_e([a({type:Boolean,attribute:!1})],Q.prototype,"isInGroup",2);customElements.get(xn)||customElements.define(xn,Q);var ba=Object.defineProperty,fa=Object.getOwnPropertyDescriptor,Pe=(n,e,t,o)=>{for(var i=o>1?void 0:o?fa(e,t):e,s=n.length-1,r;s>=0;s--)(r=n[s])&&(i=(o?r(e,t,i):r(i))||i);return o&&i&&ba(e,t,i),i};let va=0;function _a(n,e){return(n%e+e)%e}const yn="swim-radio-group",ai=class ai extends _{constructor(){super(),this.id=`swim-radio-group-${++va}`,this._disabled=!1,this._value="",this.name="",this._focusIndex=-1,this._tabindex=0,this._radios=[],this._changeHandler=e=>this._onRadioChange(e),this._slotChangeBound=()=>this._syncRadios(),this._onGroupFocus=e=>{if(e.target!==this._slotWrapper)return;const t=this._radios.find(o=>o.checked);t?(this._focusIndex=this._radios.indexOf(t),this._focusOn(this._focusIndex)):this._focusFirst()},this._onGroupBlur=()=>{this.dispatchEvent(new FocusEvent("blur",{bubbles:!0,composed:!0}))},this._internals=this.attachInternals()}get disabled(){return this._disabled}set disabled(e){this._disabled=p(e),this._updateRadioDisabledState()}get value(){return this._value}set value(e){var t;this._value!==e&&(this._value=e,this._updateSelectedFromValue(),(t=this._internals)==null||t.setFormValue(String(this._value)))}get focusIndex(){return this._focusIndex}set focusIndex(e){this._focusIndex=A(e,-1),this._focusOn(this._focusIndex)}get tabindex(){return this.disabled?-1:this._tabindex}set tabindex(e){this._tabindex=A(e,0)}connectedCallback(){super.connectedCallback(),this.addEventListener("change",this._changeHandler),this.addEventListener("focus",this._onGroupFocus),this.addEventListener("blur",this._onGroupBlur)}disconnectedCallback(){var e;(e=this._slot)==null||e.removeEventListener("slotchange",this._slotChangeBound),this.removeEventListener("change",this._changeHandler),this.removeEventListener("focus",this._onGroupFocus),this.removeEventListener("blur",this._onGroupBlur),super.disconnectedCallback()}firstUpdated(){var e;(e=this._slot)==null||e.addEventListener("slotchange",this._slotChangeBound),this._syncRadios()}updated(e){super.updated(e),(e.has("value")||e.has("name")||e.has("disabled"))&&(this._updateSelectedFromValue(),this._updateRadioDisabledState(),this._updateRadioNames())}_syncRadios(){var o;const e=this._slot,t=((o=e==null?void 0:e.assignedElements)==null?void 0:o.call(e))??[];this._radios=t.filter(i=>{var s;return i instanceof HTMLElement&&((s=i.tagName)==null?void 0:s.toLowerCase())==="swim-radio"}),this._updateRadioNames(),this._updateRadioDisabledState(),this._updateSelectedFromValue()}_updateRadioNames(){const e=this.name||this.id;this._radios.forEach(t=>{t.name=e,t.isInGroup=!0})}_updateRadioDisabledState(){this._radios.forEach(e=>{e.groupDisabled=this._disabled})}_updateSelectedFromValue(){this._radios.forEach(e=>{e.checked=this._value===e.value})}_onRadioChange(e){var i;const t=e.target;if(!t||((i=t.tagName)==null?void 0:i.toLowerCase())!=="swim-radio")return;const o=e.detail;this._value!==o&&(this._value=o,this._updateSelectedFromValue(),this._internals.setFormValue(String(this._value)),this.dispatchEvent(new CustomEvent("change",{detail:this._value,bubbles:!0,composed:!0})))}_focusFirst(){if(!(this.disabled||!this._radios.length)){for(let e=0;e<this._radios.length;e++)if(!this._radios[e].disabled){this._focusIndex=e,this._focusOn(e);return}}}_focusOn(e){this.disabled||e<0||e>=this._radios.length||this._radios[e].focus()}_selectIndex(e){if(this.disabled||e<0||e>=this._radios.length)return;const t=this._radios[e];t.disabled||(this.value=t.value)}_focusIn(e){if(this.disabled||!this._radios.length)return;const t=this._radios.length;for(let o=1;o<=t;o++){const i=_a(this._focusIndex+e*o,t);if(!this._radios[i].disabled){this._focusIndex=i,this._focusOn(i);return}}}_onKeydown(e){switch(e.key){case"ArrowLeft":case"ArrowUp":e.preventDefault(),e.stopPropagation(),this._focusIn(-1),this._selectIndex(this._focusIndex);break;case"ArrowRight":case"ArrowDown":e.preventDefault(),e.stopPropagation(),this._focusIn(1),this._selectIndex(this._focusIndex);break}}render(){return d`
      <div
        class="swim-radio-group__slot"
        role="radiogroup"
        tabindex="${this.tabindex}"
        aria-disabled="${this.disabled?"true":"false"}"
        @keydown="${this._onKeydown}"
      >
        <slot></slot>
      </div>
    `}};ai.styles=[x,ua],ai.formAssociated=!0;let de=ai;Pe([$("slot")],de.prototype,"_slot",2);Pe([$(".swim-radio-group__slot")],de.prototype,"_slotWrapper",2);Pe([a({type:String})],de.prototype,"id",2);Pe([a({type:Boolean,reflect:!0})],de.prototype,"disabled",1);Pe([a({type:String})],de.prototype,"value",1);Pe([a({type:String})],de.prototype,"name",2);Pe([a({type:Number})],de.prototype,"focusIndex",1);Pe([a({type:Number})],de.prototype,"tabindex",1);customElements.get(yn)||customElements.define(yn,de);const wa=f`
  :host {
    display: inline-block;
  }

  :host([disabled]) {
    pointer-events: none;
  }

  :host([disabled]) .swim-toggle__track,
  :host([disabled]) .swim-toggle__text {
    cursor: not-allowed;
  }

  .swim-toggle {
    display: inline-flex;
    align-items: center;
    margin-top: var(--spacing-8);
    margin-bottom: var(--spacing-16);
  }

  .swim-toggle__input {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
    pointer-events: none;
  }

  .swim-toggle__roving {
    outline: none;
  }

  .swim-toggle__roving:focus-visible {
    outline: 2px solid var(--blue-200);
    outline-offset: 2px;
  }

  .swim-toggle__track {
    position: relative;
    display: inline-block;
    height: 14px;
    width: 36px;
    background: var(--grey-900);
    border-radius: 100px;
    cursor: pointer;
    transition: background 0.3s ease;
    vertical-align: middle;
    margin-bottom: 3px;
    user-select: none;
  }

  .swim-toggle__track[aria-checked='true'] {
    background: var(--blue-700);
  }

  .swim-toggle__thumb {
    position: absolute;
    left: 0;
    top: -3px;
    display: block;
    height: 20px;
    width: 20px;
    border-radius: 100%;
    background: var(--grey-400);
    box-shadow: 0 3px 3px var(--grey-900);
    content: '';
    transition: left 0.3s ease, background 0.3s ease;
  }

  .swim-toggle__track[aria-checked='true'] .swim-toggle__thumb {
    left: 16px;
    background: var(--blue-500);
  }

  .swim-toggle__icon {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    pointer-events: none;
  }

  /* Check icon when on: nudge tick to the left (thumb is on right) */
  .swim-toggle__icon--on {
    justify-content: flex-start;
    padding-left: 2px;
  }

  /* X icon when off: nudge cross to the right (thumb is on left) */
  .swim-toggle__icon--off {
    justify-content: flex-end;
    padding-right: 2px;
  }

  /* Constrain swim-icon so it centers vertically in the 14px track; override inline-block/baseline */
  .swim-toggle__icon swim-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 0;
    vertical-align: middle;
    block-size: 14px;
    min-inline-size: 14px;
    box-sizing: border-box;
  }

  .swim-toggle__icon--on swim-icon {
    opacity: 0.5;
    color: var(--white);
    font-size: 9px;
    padding: 2.5px 3.5px;
  }

  .swim-toggle__icon--off swim-icon {
    opacity: 0.7;
    color: var(--grey-400);
    font-size: 7px;
    font-weight: 900;
    padding: 3.5px 4.5px;
  }

  .swim-toggle__text {
    cursor: pointer;
    padding-left: 5px;
    color: var(--grey-100);
    font-size: var(--font-size-m);
    line-height: var(--font-line-height-200);
    margin: 0;
  }
`;var xa=Object.defineProperty,ya=Object.getOwnPropertyDescriptor,ze=(n,e,t,o)=>{for(var i=o>1?void 0:o?ya(e,t):e,s=n.length-1,r;s>=0;s--)(r=n[s])&&(i=(o?r(e,t,i):r(i))||i);return o&&i&&xa(e,t,i),i};const ka={fromAttribute:n=>n!=="false"&&n!=="",toAttribute:n=>n?"true":"false"};let Ca=0;const kn="swim-toggle",li=class li extends _{constructor(){super(),this.id=`swim-toggle-${++Ca}`,this.name="",this.label="",this._checked=!1,this._disabled=!1,this._required=!1,this._showIcons=!0,this._tabindex=0,this._internals=this.attachInternals()}get checked(){return this._checked}set checked(e){const t=p(e);this._checked!==t&&(this._checked=t,this._syncFormValue())}get disabled(){return this._disabled}set disabled(e){this._disabled=p(e)}get required(){return this._required}set required(e){this._required=p(e)}get showIcons(){return this._showIcons}set showIcons(e){this._showIcons=e!=null?p(e):!0}get tabindex(){return this._tabindex}set tabindex(e){this._tabindex=A(e,0)}connectedCallback(){super.connectedCallback(),this._syncFormValue()}updated(e){super.updated(e),(e.has("checked")||e.has("_checked"))&&this._syncFormValue()}focus(e){var t;(t=this._roving)==null||t.focus(e)}_syncFormValue(){var t;this._internals.setFormValue(this._checked?"on":""),this.required&&!this._checked?this._internals.setValidity({valueMissing:!0},"This field is required"):this._internals.setValidity({});const e=(t=this.shadowRoot)==null?void 0:t.querySelector(".swim-toggle__input");e&&(e.checked=this._checked,e.required=this.required)}_onClick(e){e.preventDefault(),!this.disabled&&this._toggle()}_onKeydown(e){e.key!==" "&&e.key!=="Enter"||(e.preventDefault(),!this.disabled&&this._toggle())}_toggle(){this.checked=!this.checked,this._emitChange()}_emitChange(){this.dispatchEvent(new CustomEvent("change",{detail:{stopPropagation:()=>{},timeStamp:Date.now(),target:{checked:this._checked}},bubbles:!0,composed:!0}))}_onFocus(e){this.dispatchEvent(new FocusEvent("focus",{...e,bubbles:!0,composed:!0}))}_onBlur(e){this.dispatchEvent(new FocusEvent("blur",{...e,bubbles:!0,composed:!0}))}_onInputChange(e){const t=e.target;this._checked!==t.checked&&(this._checked=t.checked,this.requestUpdate(),this._syncFormValue(),this._emitChange())}render(){const e=`${this.id}-text`;return d`
      <div class="swim-toggle">
        <input
          class="swim-toggle__input"
          type="checkbox"
          id="${this.id}"
          name="${this.name||void 0}"
          ?checked="${this._checked}"
          ?required="${this.required}"
          ?disabled="${this.disabled}"
          tabindex="-1"
          aria-hidden="true"
          @change="${this._onInputChange}"
        />
        <div
          class="swim-toggle__roving swim-toggle__track"
          part="track"
          role="switch"
          tabindex="${this.disabled?-1:this.tabindex}"
          aria-checked="${this._checked}"
          aria-disabled="${this.disabled?"true":"false"}"
          aria-labelledby="${e}"
          @click="${this._onClick}"
          @keydown="${this._onKeydown}"
          @focus="${this._onFocus}"
          @blur="${this._onBlur}"
        >
          <span class="swim-toggle__thumb" part="thumb"></span>
          ${this.showIcons?this._checked?d`<span class="swim-toggle__icon swim-toggle__icon--on" aria-hidden="true"
                  ><swim-icon font-icon="check"></swim-icon
                ></span>`:d`<span class="swim-toggle__icon swim-toggle__icon--off" aria-hidden="true"
                  ><swim-icon font-icon="x"></swim-icon
                ></span>`:""}
        </div>
        <label class="swim-toggle__text" part="text" id="${e}" for="${this.id}">
          ${this.label?d`<span>${this.label}</span>`:""}
          <slot></slot>
        </label>
      </div>
    `}};li.styles=[x,wa],li.formAssociated=!0;let se=li;ze([$(".swim-toggle__roving")],se.prototype,"_roving",2);ze([a({type:String})],se.prototype,"id",2);ze([a({type:String})],se.prototype,"name",2);ze([a({type:String})],se.prototype,"label",2);ze([a({type:Boolean,reflect:!0,attribute:"checked"})],se.prototype,"checked",1);ze([a({type:Boolean,reflect:!0})],se.prototype,"disabled",1);ze([a({type:Boolean,reflect:!0})],se.prototype,"required",1);ze([a({type:Boolean,attribute:"show-icons",converter:ka})],se.prototype,"showIcons",1);ze([a({type:Number})],se.prototype,"tabindex",1);customElements.get(kn)||customElements.define(kn,se);const Ea=f`
  :host {
    display: block;
    width: 100%;
    margin-bottom: 2em;
    background: var(--grey-825);
    border-radius: var(--radius-8);
    box-sizing: border-box;
  }

  .swim-section__inner {
    display: block;
    width: 100%;
  }

  .swim-section__header {
    background: var(--grey-775);
    display: flex;
    align-items: center;
    width: 100%;
    min-width: 0;
    min-height: 44px;
    height: auto;
    line-height: 1.25;
    padding: var(--spacing-8) var(--spacing-10);
    color: var(--grey-100);
    position: relative;
    border-radius: var(--radius-8) var(--radius-8) var(--radius-0) var(--radius-0);
    box-sizing: border-box;
    overflow: hidden;
  }

  .swim-section__header-content {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex: 1;
    min-width: 0;
    overflow: hidden;
    gap: var(--spacing-16);
  }

  /* When toggle is shown (left), reserve space so title isn’t cut off */
  .swim-section__header--collapsible:not(.swim-section__header--toggle-right) .swim-section__header-content {
    padding-left: 28px;
  }

  .swim-section__header-content slot {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;
    min-width: 0;
    gap: var(--spacing-16);
  }

  /* Custom header (e.g. swim-section-header): full-width row so title and link sit at start/end */
  .swim-section__header-content ::slotted(swim-section-header) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    min-width: 0;
    gap: var(--spacing-16);
  }

  /* Slotted headings match section title: same size/weight, no extra margin */
  .swim-section__header-content ::slotted(h1),
  .swim-section__header-content ::slotted(h2),
  .swim-section__header-content ::slotted(h3),
  .swim-section__header-content ::slotted(h4) {
    margin: 0;
    padding: 0;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.25;
  }

  .swim-section__header-content ::slotted(a) {
    flex-shrink: 0;
  }

  .swim-section__header.swim-section__header--collapsed {
    border-radius: var(--radius-8);
  }

  .swim-section__toggle {
    position: absolute;
    left: 0;
    top: 0;
    width: 28px;
    height: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    padding: 0;
    background: none;
    border: none;
    box-shadow: none;
    cursor: pointer;
    color: var(--grey-100);
    overflow: hidden; /* avoid chevron glyph artifacts */
  }

  .swim-section__toggle:focus-visible {
    outline: 2px solid var(--blue-200);
    outline-offset: -2px;
    border-radius: var(--radius-2);
    z-index: 1;
  }

  .swim-section__toggle-icon {
    font-size: 0.75rem;
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .swim-section__toggle swim-icon {
    display: block;
    font-size: 0.75rem;
  }

  .swim-section__header a {
    color: var(--grey-100);
    text-decoration: none;
  }

  .swim-section__header a:hover,
  .swim-section__header a:focus {
    text-decoration: underline;
  }

  .swim-section__header a:visited {
    color: var(--grey-100);
  }

  .swim-section__header-title {
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.25;
    padding: var(--spacing-0);
    margin: var(--spacing-0);
    flex-shrink: 0;
    display: flex;
    align-items: center;
  }

  .swim-section__header.swim-section__header--collapsible:not(.swim-section__header--toggle-right) {
    padding-left: 0; /* space for toggle is from header-content padding-left */
  }

  .swim-section__header.swim-section__header--header-toggle {
    cursor: pointer;
  }

  .swim-section__header.swim-section__header--header-toggle:focus-visible {
    outline: 2px solid var(--blue-200);
    border-radius: var(--radius-2);
    outline-offset: 1px;
  }

  .swim-section__header.swim-section__header--toggle-right.swim-section__header--collapsible {
    padding: var(--spacing-0) var(--spacing-20) var(--spacing-0) var(--spacing-16);
  }

  .swim-section__header.swim-section__header--toggle-right .swim-section__toggle {
    left: auto;
    right: 0;
    width: 28px;
  }

  .swim-section__header--empty {
    height: 0;
    min-height: 0;
    padding: 0;
    overflow: hidden;
    border: none;
    border-radius: 0;
    opacity: 0;
    pointer-events: none;
    position: absolute;
    clip: rect(0, 0, 0, 0);
  }

  .swim-section__content {
    display: block;
    box-sizing: border-box;
  }

  /* Appearance: minimal */
  :host([appearance='minimal']) {
    background: transparent;
  }

  :host([appearance='minimal']) .swim-section__header {
    background: transparent;
  }

  /* Appearance: outline */
  :host([appearance='outline']) .swim-section__header,
  :host([appearance='outline']) .swim-section__content {
    background: none;
    border: 1px solid var(--grey-600);
  }

  :host([appearance='outline']) .swim-section__header {
    border-radius: var(--radius-8) var(--radius-8) var(--radius-0) var(--radius-0);
  }

  :host([appearance='outline']) .swim-section__header.swim-section__header--collapsed {
    border-radius: var(--radius-8);
  }

  :host([appearance='outline']) .swim-section__content {
    border-top: 0;
    border-radius: var(--radius-0) var(--radius-0) var(--radius-8) var(--radius-8);
  }

  /* Appearance: light */
  :host([appearance='light']) .swim-section__header,
  :host([appearance='light']) .swim-section__content {
    border: 2px solid var(--grey-700);
  }

  :host([appearance='light']) .swim-section__header {
    background: var(--grey-700);
    border-radius: var(--radius-8) var(--radius-8) var(--radius-0) var(--radius-0);
  }

  :host([appearance='light']) .swim-section__header.swim-section__header--collapsed {
    border-radius: var(--radius-8);
  }

  :host([appearance='light']) .swim-section__content {
    background: var(--grey-775);
    border-radius: var(--radius-0) var(--radius-0) var(--radius-8) var(--radius-8);
  }
`,Aa=[x,Ea];var bs=(n=>(n.Legacy="legacy",n.Outline="outline",n.Light="light",n.Minimal="minimal",n))(bs||{}),Jt=(n=>(n.Left="left",n.Right="right",n.None="none",n))(Jt||{}),Sa=Object.defineProperty,Ia=Object.getOwnPropertyDescriptor,we=(n,e,t,o)=>{for(var i=o>1?void 0:o?Ia(e,t):e,s=n.length-1,r;s>=0;s--)(r=n[s])&&(i=(o?r(e,t,i):r(i))||i);return o&&i&&Sa(e,t,i),i};const za={fromAttribute:n=>n!=="false"&&n!=="",toAttribute:n=>n?"true":"false"},fs={fromAttribute:n=>n!==null&&n!=="false",toAttribute:n=>n?"true":"false"};let Cn=0;const En="swim-section",io=class io extends _{constructor(){super(...arguments),this._id=`section-${++Cn}`,this._sectionCollapsed=!1,this._sectionCollapsible=!0,this._headerToggle=!1,this.sectionTitle="",this.padding="1.8em",this.appearance=bs.Legacy,this.togglePosition=Jt.Left,this._hasHeaderSlot=!1,this._headerSlotChangeBound=()=>this._checkHeaderSlot()}get id(){return this._id}set id(e){this._id=e||`section-${++Cn}`}get sectionCollapsed(){return this._sectionCollapsed}set sectionCollapsed(e){const t=e!=null?p(e):!1;this._sectionCollapsed!==t&&(this._sectionCollapsed=t)}get sectionCollapsible(){return this._sectionCollapsible}set sectionCollapsible(e){const t=e!=null?p(e):!0;this._sectionCollapsible!==t&&(this._sectionCollapsible=t)}get headerToggle(){return this._headerToggle}set headerToggle(e){const t=e!=null?p(e):!1;this._headerToggle!==t&&(this._headerToggle=t)}get _contentId(){return`${this.id}-content`}firstUpdated(){var t,o;this._checkHeaderSlot();const e=((o=(t=this.renderRoot)==null?void 0:t.querySelector)==null?void 0:o.call(t,'slot[name="header"]'))??this._headerSlot;e&&(this._headerSlotForCleanup=e,e.addEventListener("slotchange",this._headerSlotChangeBound))}disconnectedCallback(){this._headerSlotForCleanup&&(this._headerSlotForCleanup.removeEventListener("slotchange",this._headerSlotChangeBound),this._headerSlotForCleanup=void 0),super.disconnectedCallback()}_checkHeaderSlot(){var t,o;const e=((o=(t=this.renderRoot)==null?void 0:t.querySelector)==null?void 0:o.call(t,'slot[name="header"]'))??this._headerSlot;if(e){const s=e.assignedNodes({flatten:!0}).some(r=>{var l;return r.nodeType===Node.ELEMENT_NODE||r.nodeType===Node.TEXT_NODE&&(((l=r.textContent)==null?void 0:l.trim())??"").length>0});this._hasHeaderSlot!==s&&(this._hasHeaderSlot=s)}}_headerIsEmpty(){var e;return!((e=this.sectionTitle)!=null&&e.trim())&&!this._hasHeaderSlot}_onToggle(e){if(e==null||e.stopPropagation(),!this.sectionCollapsible)return;const t=!this.sectionCollapsed;this.sectionCollapsed=t,this.dispatchEvent(new CustomEvent("toggle",{detail:t,bubbles:!0,composed:!0}))}_onHeaderKeydown(e){e.key!==" "&&e.key!=="Enter"||!this.headerToggle||!this.sectionCollapsible||(e.preventDefault(),this._onToggle(e))}_onHeaderClick(){this.headerToggle&&this.sectionCollapsible&&this._onToggle()}render(){var r;const e=this.sectionCollapsible,t=e&&this.togglePosition!==Jt.None,o=this.togglePosition===Jt.Right,i=["swim-section__header",this.sectionCollapsed?"swim-section__header--collapsed":"",e?"swim-section__header--collapsible":"",this.headerToggle?"swim-section__header--header-toggle":"",o?"swim-section__header--toggle-right":""].filter(Boolean).join(" "),s=this._headerIsEmpty();return d`
      <div class="swim-section__inner">
        <header
          class="${i}${s?" swim-section__header--empty":""}"
          role="${this.headerToggle&&e&&!s?"button":"presentation"}"
          tabindex="${this.headerToggle&&e&&!s?0:-1}"
          aria-expanded="${s?void 0:this.sectionCollapsed?"false":"true"}"
          aria-controls="${this._contentId}"
          @click="${this._onHeaderClick}"
          @keydown="${this._onHeaderKeydown}"
        >
          ${t&&!s?d`
                <button
                  type="button"
                  class="swim-section__toggle"
                  title="Toggle Content Visibility"
                  aria-controls="${this._contentId}"
                  aria-expanded="${this.sectionCollapsed?"false":"true"}"
                  @click="${this._onToggle}"
                  @keydown="${l=>{(l.key===" "||l.key==="Enter")&&(l.preventDefault(),this._onToggle(l))}}"
                >
                  <swim-icon
                    class="swim-section__toggle-icon"
                    font-icon="${this.sectionCollapsed?"chevron-bold-right":"chevron-bold-down"}"
                    aria-hidden="true"
                  ></swim-icon>
                </button>
              `:u}
          <div class="swim-section__header-content">
            ${(r=this.sectionTitle)!=null&&r.trim()?d`<h1 class="swim-section__header-title">${this.sectionTitle}</h1>`:u}
            <slot name="header"></slot>
          </div>
        </header>
        ${this.sectionCollapsed?u:d`
              <div
                id="${this._contentId}"
                class="swim-section__content"
                style="padding: ${this.padding}"
                role="region"
                aria-labelledby="${s?"":void 0}"
              >
                <slot></slot>
              </div>
            `}
      </div>
    `}};io.styles=Aa;let Z=io;we([a({type:String,reflect:!0})],Z.prototype,"id",1);we([a({reflect:!0,attribute:"section-collapsed",converter:fs})],Z.prototype,"sectionCollapsed",1);we([a({reflect:!0,attribute:"section-collapsible",converter:za})],Z.prototype,"sectionCollapsible",1);we([a({reflect:!0,attribute:"header-toggle",converter:fs})],Z.prototype,"headerToggle",1);we([a({type:String,reflect:!0,attribute:"section-title"})],Z.prototype,"sectionTitle",2);we([a({type:String})],Z.prototype,"padding",2);we([a({type:String,reflect:!0})],Z.prototype,"appearance",2);we([a({type:String,reflect:!0,attribute:"toggle-position"})],Z.prototype,"togglePosition",2);we([v()],Z.prototype,"_hasHeaderSlot",2);we([$('slot[name="header"]')],Z.prototype,"_headerSlot",2);customElements.get(En)||customElements.define(En,Z);const Ta=f`
  :host {
    display: contents;
  }
`,An="swim-section-header",oo=class oo extends _{render(){return d`<slot></slot>`}};oo.styles=Ta;let Ii=oo;customElements.get(An)||customElements.define(An,Ii);const Ba=2,La=4,Oa=16,Da=f`
  :host {
    --slider-track-height: ${Ba}px;
    --slider-fill-height: ${La}px;
    --slider-thumb-size: ${Oa}px;
    display: inline-block;
  }

  :host([disabled]) {
    pointer-events: none;
    opacity: 0.6;
  }

  .swim-slider__inner {
    margin: 1em auto;
    position: relative;
    display: inline-block;
  }

  .swim-slider__inputs {
    position: relative;
    min-width: 12.5em;
    height: var(--slider-thumb-size);
  }

  .swim-slider__input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 1;
    appearance: none;
    background-color: transparent;
    margin: 0;
    cursor: pointer;
  }

  .swim-slider__input:focus {
    outline: none;
  }

  .swim-slider__input:focus-visible {
    outline: 2px solid var(--blue-200);
    outline-offset: 2px;
  }

  .swim-slider__input::-webkit-slider-runnable-track {
    cursor: pointer;
    color: transparent;
    background: transparent;
    border-color: transparent;
    appearance: none;
  }

  .swim-slider__input::-moz-range-track {
    cursor: pointer;
    color: transparent;
    background: transparent;
    border-color: transparent;
    appearance: none;
  }

  .swim-slider__input::-ms-track {
    cursor: pointer;
    color: transparent;
    background: transparent;
    border-color: transparent;
    appearance: none;
  }

  .swim-slider__input::-webkit-slider-thumb {
    border: none;
    width: var(--slider-thumb-size);
    height: var(--slider-thumb-size);
    appearance: none;
    position: relative;
    background: transparent;
    border-color: transparent;
    cursor: pointer;
    z-index: 301;
    color: transparent;
  }

  .swim-slider__input::-moz-range-thumb {
    border: none;
    width: var(--slider-thumb-size);
    height: var(--slider-thumb-size);
    appearance: none;
    position: relative;
    background: transparent;
    border-color: transparent;
    cursor: pointer;
    z-index: 302;
    transform: scale(1);
  }

  .swim-slider__input::-ms-thumb {
    border: none;
    width: var(--slider-thumb-size);
    height: var(--slider-thumb-size);
    appearance: none;
    position: relative;
    background: transparent;
    border-color: transparent;
    cursor: pointer;
    z-index: 302;
    transform: scale(1);
  }

  .swim-slider__track {
    position: absolute;
    background-color: var(--blue-400);
    width: 100%;
    height: var(--slider-track-height);
    top: calc(var(--slider-thumb-size) * 0.5 - var(--slider-track-height) * 0.5);
    pointer-events: none;
    opacity: 0.3;
  }

  .swim-slider__thumb {
    position: absolute;
    background-color: var(--blue-400);
    height: var(--slider-thumb-size);
    width: var(--slider-thumb-size);
    border-radius: calc(var(--slider-thumb-size) * 0.5);
    pointer-events: none;
    z-index: 100;
    box-shadow: 0 0 0 0 color-mix(in srgb, var(--blue-400) 30%, transparent);
    transition: box-shadow 0.3s ease-in-out;
    top: 0;
  }

  .swim-slider__thumb--active {
    box-shadow: 0 0 0 5px color-mix(in srgb, var(--blue-400) 30%, transparent);
  }

  .swim-slider__ticks {
    position: absolute;
    display: block;
    top: 0;
    width: 100%;
    height: 3px;
    opacity: 0.3;
  }

  .swim-slider__tick {
    position: absolute;
    border: none;
    height: 100%;
    width: 2px;
    background-color: var(--blue-400);
  }

  .swim-slider--filled .swim-slider__fill {
    background-repeat: no-repeat;
    background-image: linear-gradient(var(--blue-400), var(--blue-400));
    position: absolute;
    border-radius: 0;
    z-index: 99;
    pointer-events: none;
    height: var(--slider-fill-height);
    left: 0;
    top: calc(50% - var(--slider-fill-height) * 0.5);
    width: 100%;
  }

  .swim-slider--vertical {
    display: inline-block;
    height: initial;
    min-height: 12.5em;
    width: var(--slider-thumb-size);
  }

  .swim-slider--vertical .swim-slider__inner {
    transform: translate(0%, -100%) rotate(-90deg) translate(-100%, 0);
    transform-origin: top left;
  }
`;var Ma=Object.defineProperty,Pa=Object.getOwnPropertyDescriptor,Y=(n,e,t,o)=>{for(var i=o>1?void 0:o?Pa(e,t):e,s=n.length-1,r;s>=0;s--)(r=n[s])&&(i=(o?r(e,t,i):r(i))||i);return o&&i&&Ma(e,t,i),i};let Fa=0;const Sn="swim-slider",ci=class ci extends _{constructor(){super(),this.id=`swim-slider-${++Fa}`,this._min=0,this._max=100,this._step=1,this.orientation="horizontal",this._filled=!1,this._multiple=!1,this._disabled=!1,this._showTicks=!1,this.ariaLabel="",this._values=[0],this._active=[],this._internals=this.attachInternals()}get min(){return this._min}set min(e){this._min=A(e,0)}get max(){return this._max}set max(e){this._max=A(e,100)}get step(){return this._step}set step(e){this._step=A(e,1)}get filled(){return this._filled}set filled(e){this._filled=p(e)}get multiple(){return this._multiple}set multiple(e){this._multiple=p(e)}get disabled(){return this._disabled}set disabled(e){this._disabled=p(e)}get showTicks(){return this._showTicks}set showTicks(e){this._showTicks=p(e)}get tickStep(){return this._tickStep??this._step}set tickStep(e){this._tickStep=e!=null?A(e,this._step):void 0}get value(){return this._values.length?this.multiple?[...this._values].sort((e,t)=>e-t).join(","):String(this._values[0]):String(this._min)}set value(e){const t=e!=null?String(e):"",i=(t?t.split(",").map(r=>A(r.trim(),this._min)):[this._min]).map(r=>Math.max(this._min,Math.min(this._max,r)));let s;this.multiple?s=i.length>=2?i:i.length===1?[i[0],this._max]:[this._min,this._max]:s=i.slice(0,1),(s.length!==this._values.length||s.some((r,l)=>r!==this._values[l]))&&(this._values=s,this._syncFormValue())}connectedCallback(){super.connectedCallback(),(this._values.length===0||this._values.length===1&&this._values[0]===0&&this._min!==0)&&(this._values=this.multiple?[this._min,this._max]:[this._min],this._syncFormValue())}updated(e){super.updated(e),(e.has("value")||e.has("min")||e.has("max"))&&this._syncFormValue()}_syncFormValue(){this._internals.setFormValue(this.value)}get _percents(){const e=this._max-this._min||1;return this._values.map(t=>Math.round(100*(Math.max(this._min,Math.min(this._max,t))-this._min)/e))}get _thumbs(){return this._percents.map(e=>({left:`calc(${e}% - ${e/100}em)`}))}get _fill(){if(!this.filled)return null;const e=this._percents,t=this.multiple?Math.min(...e):0,i=(this.multiple?Math.max(...e):e[0])-t;return{left:`${t}%`,width:`${i}%`}}get _tickStepValue(){return this._tickStep??this._step}get _ticks(){if(!this.showTicks)return[];const e=this._tickStepValue,t=[];let o=this._min;for(;o<=this._max;)t.push(o),o+=e;const i=this._max-this._min||1;return t.map(s=>{const r=100*(s-this._min)/i;return{left:`calc(${r}% - ${r/100-.5}em)`}})}_setValue(e,t){const o=A(e,this._min),i=Math.max(this._min,Math.min(this._max,o));if(this._values[t]!==i){const s=[...this._values];s[t]=i,this._values=s,this._syncFormValue(),this._emitChange()}}_onChange(e){this._emitChange()}_emitChange(){const e=this.value,t=this.multiple?this._percents.join(","):String(this._percents[0]);this.dispatchEvent(new CustomEvent("change",{detail:{value:this.multiple?e:Number(e),percent:t},bubbles:!0,composed:!0}))}_setActive(e,t){const o=[...this._active];o[e]=t,this._active=o}_ensureValuesLength(){this.multiple&&this._values.length<2?this._values=[this._min,this._max]:!this.multiple&&this._values.length>1&&(this._values=[this._values[0]])}willUpdate(e){this._ensureValuesLength()}firstUpdated(){this._ensureValuesLength()}_onRangeInput(e,t){const o=e.target.value;this._setValue(Number(o),t)}render(){const e=this.orientation==="vertical";return d`
      <div
        class="swim-slider ${e?"swim-slider--vertical":""} ${this.filled?"swim-slider--filled":""} ${this.multiple?"swim-slider--multiple":""}"
        role="group"
        aria-label="${this.ariaLabel||void 0}"
      >
        <div class="swim-slider__inner">
          ${this.showTicks?d`
                <div class="swim-slider__ticks" aria-hidden="true">
                  ${this._ticks.map(t=>d`<div class="swim-slider__tick" style="left: ${t.left}"></div>`)}
                </div>
              `:""}
          <div class="swim-slider__inputs">
            <div class="swim-slider__track" part="track" aria-hidden="true"></div>
            ${this._fill?d`
                  <span
                    class="swim-slider__fill"
                    part="fill"
                    style="left: ${this._fill.left}; width: ${this._fill.width}"
                    aria-hidden="true"
                  ></span>
                `:""}
            ${this._values.map((t,o)=>{const i=this._thumbs[o],s=this._active[o],r=`${this.id}-${o}`,l=this.ariaLabel?`${this.ariaLabel}${this.multiple?` (thumb ${o+1})`:""}`:void 0;return d`
                <input
                  type="range"
                  class="swim-slider__input ${o%2===1?"swim-slider__input--odd":""} ${s?"swim-slider__input--active":""}"
                  id="${r}"
                  aria-valuemin="${this._min}"
                  aria-valuemax="${this._max}"
                  aria-valuenow="${t}"
                  aria-label="${l||void 0}"
                  .value="${String(t)}"
                  min="${this._min}"
                  max="${this._max}"
                  step="${this._step}"
                  ?disabled="${this.disabled}"
                  @input="${c=>this._onRangeInput(c,o)}"
                  @change="${this._onChange}"
                  @mouseenter="${()=>this._setActive(o,!0)}"
                  @mouseleave="${()=>this._setActive(o,!1)}"
                  @focus="${()=>this._setActive(o,!0)}"
                  @blur="${()=>this._setActive(o,!1)}"
                />
                <div
                  class="swim-slider__thumb ${s?"swim-slider__thumb--active":""}"
                  style="${i?`left: ${i.left}`:""}"
                  aria-hidden="true"
                  part="thumb"
                ></div>
              `})}
          </div>
        </div>
      </div>
    `}};ci.styles=[x,Da],ci.formAssociated=!0;let F=ci;Y([a({type:String})],F.prototype,"id",2);Y([a({type:Number})],F.prototype,"min",1);Y([a({type:Number})],F.prototype,"max",1);Y([a({type:Number})],F.prototype,"step",1);Y([a({type:String,reflect:!0})],F.prototype,"orientation",2);Y([a({type:Boolean,reflect:!0})],F.prototype,"filled",1);Y([a({type:Boolean,reflect:!0})],F.prototype,"multiple",1);Y([a({type:Boolean,reflect:!0})],F.prototype,"disabled",1);Y([a({type:Boolean,attribute:"show-ticks"})],F.prototype,"showTicks",1);Y([a({type:Number,attribute:"tick-step"})],F.prototype,"tickStep",1);Y([a({type:String,attribute:"aria-label"})],F.prototype,"ariaLabel",2);Y([a({type:String})],F.prototype,"value",1);Y([v()],F.prototype,"_values",2);Y([v()],F.prototype,"_active",2);customElements.get(Sn)||customElements.define(Sn,F);const qa=f`
  :host {
    overflow: hidden;
    box-sizing: border-box;
    min-height: 0;
  }
`,$a=[x,qa];function vs(n){const[e,t,o]=n;return`${e} ${t} ${o}`}function ot(n,e,t){const o=t.split(" ");return o.length===3?o:[n,e,t]}var Ra=Object.defineProperty,Ha=Object.getOwnPropertyDescriptor,pi=(n,e,t,o)=>{for(var i=o>1?void 0:o?Ha(e,t):e,s=n.length-1,r;s>=0;s--)(r=n[s])&&(i=(o?r(e,t,i):r(i))||i);return o&&i&&Ra(e,t,i),i};const ft="1 1 1e-9px",In="swim-split-area",no=class no extends _{constructor(){super(...arguments),this._areaBasis=ft,this.shouldAdjustMaxMin=!1,this.initialFlexParts=ot("1","1",ft),this.currentFlexParts=ot("1","1",ft)}get areaBasis(){return this._areaBasis}set areaBasis(e){this._areaBasis!==e&&(this._areaBasis=e||ft,this._applyBasis())}connectedCallback(){super.connectedCallback(),this._applyBasis()}updated(){this.style.flex=vs(this.currentFlexParts),this.shouldAdjustMaxMin&&this.currentFlexParts[2]?(this.style.minWidth=this.currentFlexParts[2],this.style.maxWidth=this.currentFlexParts[2]):(this.style.minWidth="",this.style.maxWidth="")}updateBasis(e){this.currentFlexParts[2]=e,this.requestUpdate()}_applyBasis(){const e=this._areaBasis||ft,[t,o,i]=ot("1","1",e);this.currentFlexParts=[t,o,i],this.initialFlexParts=[t,o,i],!this.minBasis&&o==="0"&&(this.minBasis=i),!this.maxBasis&&t==="0"&&(this.maxBasis=i),this.requestUpdate()}render(){return d`<slot></slot>`}};no.styles=$a;let Ge=no;pi([a({type:String,attribute:"area-basis"})],Ge.prototype,"areaBasis",1);pi([a({type:String,attribute:"min-basis"})],Ge.prototype,"minBasis",2);pi([a({type:String,attribute:"max-basis"})],Ge.prototype,"maxBasis",2);pi([a({type:Boolean,attribute:"should-adjust-max-min"})],Ge.prototype,"shouldAdjustMaxMin",2);customElements.get(In)||customElements.define(In,Ge);const Va=f`
  :host {
    position: relative;
    box-sizing: border-box;
    flex-shrink: 0;
  }

  .swim-split-handle__grip {
    line-height: 0;
    font-size: 32px;
    position: absolute;
    display: block;
    padding: 0;
    margin: 0;
    border: none;
    background: transparent;
    color: var(--grey-400);
    cursor: inherit;
  }

  .swim-split-handle__grip:hover {
    color: var(--grey-200);
  }

  .swim-split-handle__grip:focus {
    outline: none;
  }

  .swim-split-handle__grip:focus-visible {
    outline: 2px solid var(--blue-500);
    outline-offset: 2px;
  }

  :host([direction='row']) .swim-split-handle__grip {
    top: 50%;
    left: 50%;
    cursor: col-resize;
    transform: translate(-50%, -50%);
  }

  :host([direction='column']) .swim-split-handle__grip {
    left: 50%;
    cursor: row-resize;
    top: -3px;
    transform: translateX(-50%) rotate(270deg);
  }
`,Na=[x,Va];var tt=(n=>(n.Row="row",n.Column="column",n))(tt||{}),Ga=Object.defineProperty,Ua=Object.getOwnPropertyDescriptor,_s=(n,e,t,o)=>{for(var i=o>1?void 0:o?Ua(e,t):e,s=n.length-1,r;s>=0;s--)(r=n[s])&&(i=(o?r(e,t,i):r(i))||i);return o&&i&&Ga(e,t,i),i};const Yt="0 0 15px",zn="swim-split-handle",so=class so extends _{constructor(){super(...arguments),this._handleBasis=Yt,this.direction=tt.Row,this.currentFlexParts=ot("0","0",Yt),this._boundMouseUp=this._onMouseUp.bind(this),this._boundMouseMove=this._onMouseMove.bind(this)}get handleBasis(){return this._handleBasis}set handleBasis(e){this._handleBasis!==e&&(this._handleBasis=e||Yt,this.currentFlexParts=ot("0","0",this._handleBasis),this.requestUpdate())}connectedCallback(){super.connectedCallback(),this.currentFlexParts=ot("0","0",this._handleBasis||Yt)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("mouseup",this._boundMouseUp,!0),document.removeEventListener("mousemove",this._boundMouseMove,!0)}updated(){this.style.flex=vs(this.currentFlexParts)}_onMouseDown(e){e.preventDefault(),document.addEventListener("mouseup",this._boundMouseUp,!0),document.addEventListener("mousemove",this._boundMouseMove,!0),this.dispatchEvent(new CustomEvent("dragstart",{detail:e,bubbles:!0,composed:!0}))}_onMouseMove(e){this.dispatchEvent(new CustomEvent("drag",{detail:e,bubbles:!0,composed:!0}))}_onMouseUp(e){document.removeEventListener("mouseup",this._boundMouseUp,!0),document.removeEventListener("mousemove",this._boundMouseMove,!0),this.dispatchEvent(new CustomEvent("dragend",{detail:e,bubbles:!0,composed:!0}))}_onDblClick(e){this.dispatchEvent(new CustomEvent("dblclick",{detail:e,bubbles:!0,composed:!0}))}render(){return d`
      <button
        type="button"
        class="swim-split-handle__grip"
        aria-label="Resize split"
        @mousedown="${this._onMouseDown}"
        @dblclick="${this._onDblClick}"
      >
        <swim-icon font-icon="split-handle"></swim-icon>
      </button>
    `}};so.styles=Na;let Bt=so;_s([a({type:String,attribute:"handle-basis"})],Bt.prototype,"handleBasis",1);_s([a({type:String,reflect:!0})],Bt.prototype,"direction",2);customElements.get(zn)||customElements.define(zn,Bt);const Ya=f`
  :host {
    display: flex;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
  }

  :host([direction='row']) {
    flex-direction: row;
  }

  :host([direction='column']) {
    flex-direction: column;
  }

  slot {
    display: contents;
  }
`,Wa=[x,Ya];function at(n){const e=String(n).indexOf("calc")>-1;return String(n).indexOf("%")>-1&&!e}function ue(n){return typeof n=="string"?Number(n.replace(/%/g,"").replace(/px/g,"").trim()):n}function ws(n,e,t,o,i,s){let r=n?at(n)?ue(n):ue(n)/s:0,l=e?at(e)?ue(e):ue(e)/s:100;return r=Math.max(r,o==="0"?i:0),l=Math.min(l,t==="0"?i:100),[r,l]}function Tn(n,e,t){const[o,i,s]=n.currentFlexParts,r=at(s),l=ue(s),c=n.initialFlexParts[2],h=at(c)?ue(c):ue(c)/t,w=r?l*t:l;let g=w+e,m=g/t;const[b,I]=ws(n.minBasis,n.maxBasis,o,i,h,t);return m=Math.max(m,b),m=Math.min(m,I),g=m*t,n.updateBasis(r?m+"%":g+"px"),g-w}var Ja=Object.defineProperty,xs=(n,e,t,o)=>{for(var i=void 0,s=n.length-1,r;s>=0;s--)(r=n[s])&&(i=r(e,t,i)||i);return i&&Ja(e,t,i),i};const Bn="swim-split",ro=class ro extends _{constructor(){super(...arguments),this.direction=tt.Row,this._areas=[],this._handles=[],this._handleListeners=new Map,this._onSlotChange=()=>{this._collectAreasAndHandles(),this._removeHandleListeners(),this._attachHandleListeners()}}connectedCallback(){super.connectedCallback(),this.addEventListener("slotchange",this._onSlotChange)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("slotchange",this._onSlotChange),this._removeHandleListeners()}updated(e){e.has("direction")&&this._handles.forEach(t=>{t.direction=this.direction})}firstUpdated(){requestAnimationFrame(()=>{this._collectAreasAndHandles(),this._attachHandleListeners()})}_collectAreasAndHandles(){if(!this.slotEl)return;const e=this.slotEl.assignedElements({flatten:!0});this._areas=e.filter(t=>{var o;return((o=t.tagName)==null?void 0:o.toLowerCase())==="swim-split-area"}),this._handles=e.filter(t=>{var o;return((o=t.tagName)==null?void 0:o.toLowerCase())==="swim-split-handle"}),this._handles.forEach(t=>{t.direction=this.direction})}_attachHandleListeners(){this._handles.forEach(e=>{const t=i=>{const s=i.detail;s&&this._onDrag(s)},o=()=>this._onDblClick();this._handleListeners.set(e,{drag:t,dblclick:o}),e.addEventListener("drag",t),e.addEventListener("dblclick",o)})}_removeHandleListeners(){this._handles.forEach(e=>{const t=this._handleListeners.get(e);t&&(e.removeEventListener("drag",t.drag),e.removeEventListener("dblclick",t.dblclick),this._handleListeners.delete(e))})}_resize(e){const i=(this.direction===tt.Row?this.clientWidth:this.clientHeight)/100,s=this._areas;if(s.length===0)return;const[r,...l]=s;let c=e;c=Tn(r,c,i),l.forEach(h=>{c+=Tn(h,-c,i)})}_onDrag(e){const t=this.direction===tt.Row?e.movementX:e.movementY;this._resize(t)}_onDblClick(){const o=(this.direction===tt.Row?this.clientWidth:this.clientHeight)/100,s=this._areas[0];if(!s)return;const[r,l,c]=s.currentFlexParts,h=at(c),w=ue(c),m=(h?w*o:w)/o,b=s.initialFlexParts[2],I=at(b)?ue(b):ue(b)/o,[z,te]=ws(s.minBasis,s.maxBasis,r,l,I,o),he=m-z,ae=te-m,Ke=(he<ae?ae:-he)*o;this._resize(Ke)}render(){return d`<slot></slot>`}};ro.styles=Wa;let Lt=ro;xs([a({type:String,reflect:!0})],Lt.prototype,"direction");xs([$("slot")],Lt.prototype,"slotEl");customElements.get(Bn)||customElements.define(Bn,Lt);const Ka=f`
  ${x}

  @keyframes swim-progress-spinner--rotate {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  :host {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .swim-progress-spinner__container {
    display: inline-flex;
    border-radius: 100%;
    overflow: hidden;
    box-shadow: 0 0 10px 0 var(--spinner-color);
    position: relative;
  }

  .swim-progress-spinner__svg {
    display: block;
  }

  .swim-progress-spinner__circle {
    fill: transparent;
    transition: 0.1s stroke-dashoffset;
    transform: rotate(-90deg);
    transform-origin: 50% 50%;
    stroke: var(--spinner-color);
  }

  .swim-progress-spinner__icon-in-progress,
  .swim-progress-spinner__icon-complete,
  .swim-progress-spinner__icon-failure {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
  }

  /* Size and color for slotted or property-driven swim-icon in center */
  .swim-progress-spinner__icon-in-progress swim-icon,
  .swim-progress-spinner__icon-complete swim-icon,
  .swim-progress-spinner__icon-failure swim-icon {
    font-size: 40px;
    color: var(--spinner-color);
  }

  .swim-progress-spinner__icon-failure swim-icon {
    color: var(--color-error, var(--red-500));
  }

  .swim-progress-spinner__label {
    margin-top: var(--spacing-24, 24px);
  }

  .swim-progress-spinner__label h4 {
    font-weight: var(--font-weight-semibold);
    font-size: var(--font-size-2xl);
    line-height: 30px;
    text-align: center;
    color: var(--white);
    margin: 0;
  }

  /* Indeterminate: rotating circle */
  :host([mode='indeterminate']) .swim-progress-spinner__circle {
    animation: swim-progress-spinner--rotate 1s linear infinite;
  }
`;var et=(n=>(n.Indeterminate="indeterminate",n.Determinate="determinate",n))(et||{}),Ce=(n=>(n.Default="default",n.Icon="icon",n))(Ce||{}),ja=Object.defineProperty,Qa=Object.getOwnPropertyDescriptor,ee=(n,e,t,o)=>{for(var i=o>1?void 0:o?Qa(e,t):e,s=n.length-1,r;s>=0;s--)(r=n[s])&&(i=(o?r(e,t,i):r(i))||i);return o&&i&&ja(e,t,i),i};const Za=50,Xa=100,zi=100,Kt=zi/2,el=Kt*2*Math.PI,tl="cloud-upload",il="check",ol="x",Ln="swim-progress-spinner",ao=class ao extends _{constructor(){super(...arguments),this.mode=et.Indeterminate,this.color="var(--blue-500)",this.failStatusColor="var(--red-500)",this.appearance=Ce.Default,this.inProgressIconName="",this.completeIconName="",this.failIconName="",this._isFailure=!1,this._value=0,this._total=100,this._diameter=100,this._strokeWidth=3,this._boundSlotChange=()=>this.requestUpdate()}get isFailure(){return this._isFailure}set isFailure(e){this._isFailure=p(e)}get value(){return this._value}set value(e){const t=A(e,0);this._value!==t&&(this._value=t)}get total(){return this._total}set total(e){const t=A(e,100);this._total!==t&&(this._total=t)}get diameter(){return this._diameter}set diameter(e){const t=A(e,100);this._diameter!==t&&(this._diameter=t)}get strokeWidth(){return this._strokeWidth}set strokeWidth(e){const t=A(e,3);this._strokeWidth!==t&&(this._strokeWidth=t)}get circumference(){return el}get modeValue(){return this.mode===et.Determinate||this.isComplete?this.value:Za}get modeTotal(){return this.mode===et.Determinate||this.isComplete?this.total:Xa}get percentage(){return 100/this.modeTotal*this.modeValue}get isComplete(){return this.value>=this.total&&this.total>0}get spinnerColor(){return this.isComplete&&this.isFailure?this.failStatusColor:this.color}get strokeDasharray(){return`${this.circumference} ${this.circumference}`}get strokeDashoffset(){return this.circumference-this.percentage/100*this.circumference}hasSlotContent(e){var o;const t=(o=this.shadowRoot)==null?void 0:o.querySelector(`slot[name="${e}"]`);return!!(t!=null&&t.assignedNodes().length)}connectedCallback(){super.connectedCallback(),this.addEventListener("slotchange",this._boundSlotChange)}disconnectedCallback(){this.removeEventListener("slotchange",this._boundSlotChange),super.disconnectedCallback()}get effectiveInProgressIcon(){return this.hasSlotContent("in-progress-icon")?"":this.inProgressIconName||(this.appearance===Ce.Icon?tl:"")}get effectiveCompleteIcon(){return this.hasSlotContent("complete-icon")?"":this.completeIconName||(this.appearance===Ce.Icon?il:"")}get effectiveFailIcon(){return this.hasSlotContent("fail-icon")?"":this.failIconName||(this.appearance===Ce.Icon?ol:"")}render(){const e=this.appearance===Ce.Icon&&!this.isComplete&&(this.effectiveInProgressIcon||this.hasSlotContent("in-progress-icon")),t=this.appearance===Ce.Icon&&this.isComplete&&!this.isFailure&&(this.effectiveCompleteIcon||this.hasSlotContent("complete-icon")),o=this.appearance===Ce.Icon&&this.isComplete&&this.isFailure&&(this.effectiveFailIcon||this.hasSlotContent("fail-icon"));return d`
      <div
        class="swim-progress-spinner__container ${this.appearance===Ce.Icon?"swim-progress-spinner__container--icon":""}"
        part="container"
        style="--spinner-color: ${this.spinnerColor}"
        role="progressbar"
        aria-valuenow="${this.mode===et.Determinate?this.value:u}"
        aria-valuemin="0"
        aria-valuemax="${this.mode===et.Determinate?this.total:u}"
        aria-label="Progress"
      >
        <svg
          class="swim-progress-spinner__svg"
          viewBox="0 0 ${zi} ${zi}"
          width="${this.diameter}"
          height="${this.diameter}"
          aria-hidden="true"
          focusable="false"
        >
          <circle
            class="swim-progress-spinner__circle"
            stroke-width="${this.strokeWidth}"
            stroke-dasharray="${this.strokeDasharray}"
            stroke-dashoffset="${this.strokeDashoffset}"
            r="${Kt}"
            cx="${Kt}"
            cy="${Kt}"
          ></circle>
        </svg>

        ${e?d`
              <div class="swim-progress-spinner__icon-in-progress">
                ${this.hasSlotContent("in-progress-icon")?d`<slot name="in-progress-icon"></slot>`:d`<swim-icon font-icon="${this.effectiveInProgressIcon}"></swim-icon>`}
              </div>
            `:t?d`
              <div class="swim-progress-spinner__icon-complete">
                ${this.hasSlotContent("complete-icon")?d`<slot name="complete-icon"></slot>`:d`<swim-icon font-icon="${this.effectiveCompleteIcon}"></swim-icon>`}
              </div>
            `:o?d`
              <div class="swim-progress-spinner__icon-failure">
                ${this.hasSlotContent("fail-icon")?d`<slot name="fail-icon"></slot>`:d`<swim-icon font-icon="${this.effectiveFailIcon}"></swim-icon>`}
              </div>
            `:u}
      </div>

      ${this.spinnerLabel?d`
            <div class="swim-progress-spinner__label" part="label">
              ${!this.isComplete&&this.spinnerLabel.inProgressLabel?d`<h4>${this.spinnerLabel.inProgressLabel}</h4>`:this.isComplete&&!this.isFailure&&this.spinnerLabel.completeLabel?d`<h4>${this.spinnerLabel.completeLabel}</h4>`:this.isComplete&&this.isFailure&&this.spinnerLabel.failLabel?d`<h4>${this.spinnerLabel.failLabel}</h4>`:u}
            </div>
          `:u}
    `}};ao.styles=Ka;let R=ao;ee([a({type:String,reflect:!0})],R.prototype,"mode",2);ee([a({type:String})],R.prototype,"color",2);ee([a({attribute:"fail-status-color",type:String})],R.prototype,"failStatusColor",2);ee([a({type:String,reflect:!0})],R.prototype,"appearance",2);ee([a({type:String,attribute:"in-progress-icon-name"})],R.prototype,"inProgressIconName",2);ee([a({type:String,attribute:"complete-icon-name"})],R.prototype,"completeIconName",2);ee([a({type:String,attribute:"fail-icon-name"})],R.prototype,"failIconName",2);ee([a({type:Boolean,reflect:!0,attribute:"is-failure"})],R.prototype,"isFailure",1);ee([a({attribute:!1})],R.prototype,"spinnerLabel",2);ee([a({type:Number})],R.prototype,"value",1);ee([a({type:Number})],R.prototype,"total",1);ee([a({type:Number})],R.prototype,"diameter",1);ee([a({attribute:"stroke-width",type:Number})],R.prototype,"strokeWidth",1);customElements.get(Ln)||customElements.define(Ln,R);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class Ti extends Fi{constructor(e){if(super(e),this.it=u,e.type!==Le.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===u||e==null)return this._t=void 0,this.it=e;if(e===oe)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;const t=[e];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}}Ti.directiveName="unsafeHTML",Ti.resultType=1;const nl=Pi(Ti),sl=f`
  :host {
    display: inline-block;
  }

  .swim-tooltip__trigger {
    display: inline-block;
    cursor: inherit;
  }

  .swim-tooltip__panel {
    position: fixed;
    z-index: 5000;
    display: block;
    font-weight: normal;
    opacity: 0;
    max-width: 600px;
    overflow-wrap: anywhere;
    border-radius: var(--radius-4);
    pointer-events: auto;
  }

  .swim-tooltip__panel--animate {
    opacity: 1;
    transition: opacity 0.3s, transform 0.3s;
    transform: translate3d(0, 0, 0);
  }

  .swim-tooltip__panel--narrow {
    max-width: 300px;
    text-align: center;
  }

  /* Placement transform (initial offset before animate) */
  .swim-tooltip__panel--position-right {
    transform: translate3d(10px, 0, 0);
  }

  .swim-tooltip__panel--position-left {
    transform: translate3d(-10px, 0, 0);
  }

  .swim-tooltip__panel--position-top {
    transform: translate3d(0, -10px, 0);
  }

  .swim-tooltip__panel--position-bottom {
    transform: translate3d(0, 10px, 0);
  }

  .swim-tooltip__panel--animate.swim-tooltip__panel--position-right,
  .swim-tooltip__panel--animate.swim-tooltip__panel--position-left,
  .swim-tooltip__panel--animate.swim-tooltip__panel--position-top,
  .swim-tooltip__panel--animate.swim-tooltip__panel--position-bottom {
    transform: translate3d(0, 0, 0);
  }

  /* Caret */
  .swim-tooltip__caret {
    position: absolute;
    z-index: 5001;
    width: 0;
    height: 0;
  }

  .swim-tooltip__caret--position-left {
    border-top: 7px solid transparent;
    border-bottom: 7px solid transparent;
    border-left: 7px solid var(--swim-tooltip-caret-bg, var(--grey-200));
  }

  .swim-tooltip__caret--position-top {
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-top: 7px solid var(--swim-tooltip-caret-bg, var(--grey-200));
  }

  .swim-tooltip__caret--position-right {
    border-top: 7px solid transparent;
    border-bottom: 7px solid transparent;
    border-right: 7px solid var(--swim-tooltip-caret-bg, var(--grey-200));
  }

  .swim-tooltip__caret--position-bottom {
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-bottom: 7px solid var(--swim-tooltip-caret-bg, var(--grey-200));
  }

  /* Type: tooltip (compact) */
  .swim-tooltip__panel--type-tooltip {
    color: var(--grey-700);
    background: var(--grey-200);
    font-size: var(--font-size-xs, 12px);
    padding: var(--spacing-4, 4px);
    text-align: center;
  }

  /* Type: popover */
  .swim-tooltip__panel--type-popover {
    background: var(--grey-200);
    color: var(--grey-700);
    box-shadow: var(--shadow-2);
    font-size: 13px;
    padding: var(--spacing-10, 10px);
  }

  .swim-tooltip__content {
    display: block;
  }
`,rl=[x,sl];var D=(n=>(n.top="top",n.bottom="bottom",n.left="left",n.right="right",n))(D||{}),me=(n=>(n.top="top",n.bottom="bottom",n.left="left",n.right="right",n.center="center",n))(me||{}),ys=(n=>(n.popover="popover",n.tooltip="tooltip",n))(ys||{}),Ee=(n=>(n.all="all",n.focus="focus",n.click="click",n.mouseover="mouseover",n))(Ee||{});const be=7;function ti(n,e,t){return t===me.left?(n.left??0)-be:t===me.right?(n.left??0)+(n.width??0)-(e.width??0)+be:(n.left??0)+(n.width??0)/2-(e.width??0)/2}function Hi(n,e,t){return t===me.top?(n.top??0)-be:t===me.bottom?(n.top??0)+(n.height??0)-(e.height??0)+be:(n.top??0)+(n.height??0)/2-(e.height??0)/2}function On(n,e,t){let o=ti(n,e,t);return o+(e.width??0)>window.innerWidth&&(o=window.innerWidth-(e.width??0)),o}function Dn(n,e,t){let o=Hi(n,e,t);return o+(e.height??0)>window.innerHeight&&(o=window.innerHeight-(e.height??0)),o}function al(n,e,t,o,i){return t===D.right?ti(n,e,o)+(e.width??0)+i>window.innerWidth:t===D.left?ti(n,e,o)-i<0:t===D.top?(n.top??0)-(e.height??0)-i<0:t===D.bottom?Hi(n,e,o)+(e.height??0)+i>window.innerHeight:!1}function ll(n,e,t,o,i){return al(t,e,n,i,o)?n===D.right?D.left:n===D.left?D.right:n===D.top?D.bottom:D.top:n}function cl(n,e,t,o,i){let s=0,r=0;return n===D.right?(r=(t.left??0)+(t.width??0)+o,s=Dn(t,e,i)):n===D.left?(r=(t.left??0)-(e.width??0)-o,s=Dn(t,e,i)):n===D.top?(s=(t.top??0)-(e.height??0)-o,r=On(t,e,i)):(s=(t.top??0)+(t.height??0)+o,r=On(t,e,i)),{top:s,left:r}}function Mn(n,e,t,o){let i;o===me.left?i=(n.width??0)/2-(t.width??0)/2+be:o===me.right?i=(e.width??0)-(n.width??0)/2-(t.width??0)/2-be:i=(e.width??0)/2-(t.width??0)/2;const s=ti(n,e,o);return s+(e.width??0)>window.innerWidth&&(i+=s+(e.width??0)-window.innerWidth),i}function Pn(n,e,t,o){let i;o===me.top?i=(n.height??0)/2-(t.height??0)/2+be:o===me.bottom?i=(e.height??0)-(n.height??0)/2-(t.height??0)/2-be:i=(e.height??0)/2-(t.height??0)/2;const s=Hi(n,e,o);return s+(e.height??0)>window.innerHeight&&(i+=s+(e.height??0)-window.innerHeight),i}function dl(n,e,t,o,i){let s=0,r=0;return n===D.right?(r=-be,s=Pn(t,e,o,i)):n===D.left?(r=e.width??0,s=Pn(t,e,o,i)):n===D.top?(s=e.height??0,r=Mn(t,e,o,i)):(s=-be,r=Mn(t,e,o,i)),{top:s,left:r}}var hl=Object.defineProperty,ul=Object.getOwnPropertyDescriptor,M=(n,e,t,o)=>{for(var i=o>1?void 0:o?ul(e,t):e,s=n.length-1,r;s>=0;s--)(r=n[s])&&(i=(o?r(e,t,i):r(i))||i);return o&&i&&hl(e,t,i),i};const Fn="swim-tooltip",lo=class lo extends _{constructor(){super(...arguments),this.content="",this.placement=D.top,this.alignment=me.center,this.type=ys.popover,this.showEvent=Ee.all,this._spacing=10,this._showCaret=!0,this._disabled=!1,this._closeOnClickOutside=!0,this._closeOnMouseLeave=!0,this._hideTimeout=300,this._showTimeout=100,this.cssClass="",this._open=!1,this._panelTop=0,this._panelLeft=0,this._effectivePlacement=D.top,this._caretTop=0,this._caretLeft=0,this._animate=!1,this._triggerRef=null,this._panelRef=null,this._caretRef=null,this._boundDocumentClick=null,this._openFromClick=!1,this._tooltipId=`swim-tooltip-${Math.random().toString(36).slice(2,11)}`,this._throttledPosition=()=>{this._throttleTimeout==null&&(this._throttleTimeout=window.setTimeout(()=>{this._throttleTimeout=void 0,this._open&&this._position()},100))},this._panelForHideListeners=null,this._panelMouseEnterBound=()=>this._clearHideTimer(),this._panelMouseLeaveBound=e=>{var o;const t=e.relatedTarget;t&&((o=this._triggerRef)!=null&&o.contains(t))||this.hide()},this._onTriggerFocus=()=>{this._listensFocus&&this.show()},this._onTriggerBlur=()=>{this._listensFocus&&this.hide(!0)},this._onTriggerMouseEnter=()=>{this._listensHover&&this.show()},this._onTriggerMouseLeave=e=>{var i;const t=e.relatedTarget,o=this._panelRef??((i=this.shadowRoot)==null?void 0:i.querySelector(".swim-tooltip__panel"));o!=null&&o.contains(t)||(this._listensHover&&this.closeOnMouseLeave&&this.hide(),this._listensClick&&this.hide())},this._onPanelMouseLeave=()=>{this.closeOnMouseLeave&&this.hide()},this._onTriggerClick=()=>{if(this.showEvent===Ee.mouseover){this.hide(!0);return}this._listensClick&&(this._openFromClick?this.hide(!0):(this._openFromClick=!0,this.show(!0)))}}get spacing(){return this._spacing}set spacing(e){this._spacing=A(e,10)}get showCaret(){return this._showCaret}set showCaret(e){this._showCaret=p(e)}get disabled(){return this._disabled}set disabled(e){this._disabled=p(e)}get closeOnClickOutside(){return this._closeOnClickOutside}set closeOnClickOutside(e){this._closeOnClickOutside=p(e)}get closeOnMouseLeave(){return this._closeOnMouseLeave}set closeOnMouseLeave(e){this._closeOnMouseLeave=p(e)}get hideTimeout(){return this._hideTimeout}set hideTimeout(e){this._hideTimeout=A(e,300)}get showTimeout(){return this._showTimeout}set showTimeout(e){this._showTimeout=A(e,100)}connectedCallback(){super.connectedCallback(),window.addEventListener("resize",this._throttledPosition)}disconnectedCallback(){window.removeEventListener("resize",this._throttledPosition),this._throttleTimeout!=null&&(window.clearTimeout(this._throttleTimeout),this._throttleTimeout=void 0),this._clearShowTimer(),this._clearHideTimer(),this._removeDocumentClick(),this._removePanelHideListeners(),super.disconnectedCallback()}_hasContentSlot(){return!!this.querySelector('[slot="content"]')}get _listensFocus(){return this.showEvent===Ee.all||this.showEvent===Ee.focus}get _listensHover(){return this.showEvent===Ee.all||this.showEvent===Ee.mouseover}get _listensClick(){return this.showEvent===Ee.all||this.showEvent===Ee.click}show(e=!1){if(this._open||this.disabled)return;this._clearShowTimer(),this._clearHideTimer();const t=()=>{this._open||this.disabled||!(this._hasContentSlot||this.content!=null&&this.content!=="")||(this._open=!0,this._effectivePlacement=this.placement,requestAnimationFrame(()=>{this._position(),requestAnimationFrame(()=>{this._animate=!0,this._addHideListeners()})}),this.dispatchEvent(new CustomEvent("show",{detail:!0,bubbles:!0})))};e?t():this._showTimer=window.setTimeout(t,this.showTimeout)}hide(e=!1){if(!this._open)return;this._clearShowTimer(),this._clearHideTimer();const t=()=>{this._open&&(this._open=!1,this._animate=!1,this._openFromClick=!1,this._removeDocumentClick(),this._removePanelHideListeners(),this.dispatchEvent(new CustomEvent("hide",{detail:!0,bubbles:!0})))};e?t():this._hideTimer=window.setTimeout(t,this.hideTimeout)}_clearShowTimer(){this._showTimer!=null&&(window.clearTimeout(this._showTimer),this._showTimer=void 0)}_clearHideTimer(){this._hideTimer!=null&&(window.clearTimeout(this._hideTimer),this._hideTimer=void 0)}_removeDocumentClick(){this._boundDocumentClick&&(document.removeEventListener("click",this._boundDocumentClick,!0),this._boundDocumentClick=null)}_position(){var c,h,w;const e=this._triggerRef??((c=this.shadowRoot)==null?void 0:c.querySelector(".swim-tooltip__trigger")),t=this._panelRef??((h=this.shadowRoot)==null?void 0:h.querySelector(".swim-tooltip__panel")),o=this._caretRef??((w=this.shadowRoot)==null?void 0:w.querySelector(".swim-tooltip__caret"));if(!e||!t)return;const i=e.getBoundingClientRect();if(!i.height&&!i.width)return;const s=t.getBoundingClientRect();this._effectivePlacement=ll(this.placement,s,i,this.spacing,this.alignment);const{top:r,left:l}=cl(this._effectivePlacement,s,i,this.spacing,this.alignment);if(this._panelTop=r,this._panelLeft=l,this.showCaret&&o){const g=o.getBoundingClientRect(),m=dl(this._effectivePlacement,s,i,g,this.alignment);this._caretTop=m.top,this._caretLeft=m.left}}_removePanelHideListeners(){this._panelForHideListeners&&(this._panelForHideListeners.removeEventListener("mouseenter",this._panelMouseEnterBound),this._panelForHideListeners.removeEventListener("mouseleave",this._panelMouseLeaveBound),this._panelForHideListeners=null)}_addHideListeners(){var t;const e=this._panelRef??((t=this.shadowRoot)==null?void 0:t.querySelector(".swim-tooltip__panel"));e&&(this._removePanelHideListeners(),this._panelForHideListeners=e,e.addEventListener("mouseenter",this._panelMouseEnterBound),this.closeOnMouseLeave&&e.addEventListener("mouseleave",this._panelMouseLeaveBound),this.closeOnClickOutside&&(this._boundDocumentClick=o=>{var s;const i=o.target;e.contains(i)||(s=this._triggerRef)!=null&&s.contains(i)||this.hide(!0)},setTimeout(()=>document.addEventListener("click",this._boundDocumentClick,!0),0)))}firstUpdated(){var e,t,o;this._triggerRef=(e=this.shadowRoot)==null?void 0:e.querySelector(".swim-tooltip__trigger"),this._panelRef=(t=this.shadowRoot)==null?void 0:t.querySelector(".swim-tooltip__panel"),this._caretRef=(o=this.shadowRoot)==null?void 0:o.querySelector(".swim-tooltip__caret")}updated(e){this._open&&(e.has("placement")||e.has("alignment")||e.has("spacing"))&&this._position()}render(){const e=this._hasContentSlot(),t=e||this.content!=null&&this.content!=="",o=["swim-tooltip__panel",`swim-tooltip__panel--type-${this.type}`,`swim-tooltip__panel--position-${this._effectivePlacement}`,this._animate?"swim-tooltip__panel--animate":"",this.cssClass.includes("narrow")?"swim-tooltip__panel--narrow":""].filter(Boolean).join(" ");return d`
      <div
        part="trigger"
        class="swim-tooltip__trigger"
        aria-describedby="${this._open&&t?this._tooltipId:u}"
        aria-expanded="${this._listensClick?this._open?"true":"false":u}"
        @focusin="${this._onTriggerFocus}"
        @focusout="${this._onTriggerBlur}"
        @mouseenter="${this._onTriggerMouseEnter}"
        @mouseleave="${this._onTriggerMouseLeave}"
        @click="${this._onTriggerClick}"
      >
        <slot></slot>
      </div>

      ${this._open&&t?d`
            <div
              part="panel"
              id="${this._tooltipId}"
              class="${o}"
              style="top: ${this._panelTop}px; left: ${this._panelLeft}px;"
              role="tooltip"
              aria-hidden="false"
              @mouseenter="${()=>this._clearHideTimer()}"
              @mouseleave="${this._onPanelMouseLeave}"
            >
              ${this.showCaret?d`
                    <span
                      part="caret"
                      class="swim-tooltip__caret swim-tooltip__caret--position-${this._effectivePlacement}"
                      style="top: ${this._caretTop}px; left: ${this._caretLeft}px;"
                    ></span>
                  `:""}
              <div part="content" class="swim-tooltip__content">
                ${e?d`<slot name="content"></slot>`:d`${nl(this.content)}`}
              </div>
            </div>
          `:""}
    `}};lo.styles=rl;let L=lo;M([a({type:String})],L.prototype,"content",2);M([a({type:String,reflect:!0,attribute:"placement"})],L.prototype,"placement",2);M([a({type:String,reflect:!0,attribute:"alignment"})],L.prototype,"alignment",2);M([a({type:String,reflect:!0,attribute:"type"})],L.prototype,"type",2);M([a({type:String,attribute:"show-event"})],L.prototype,"showEvent",2);M([a({type:Number,attribute:"spacing"})],L.prototype,"spacing",1);M([a({type:Boolean,attribute:"show-caret",converter:{fromAttribute:n=>n!=="false",toAttribute:n=>n?"":"false"}})],L.prototype,"showCaret",1);M([a({type:Boolean,reflect:!0})],L.prototype,"disabled",1);M([a({type:Boolean,attribute:"close-on-click-outside"})],L.prototype,"closeOnClickOutside",1);M([a({type:Boolean,attribute:"close-on-mouse-leave"})],L.prototype,"closeOnMouseLeave",1);M([a({type:Number,attribute:"hide-timeout"})],L.prototype,"hideTimeout",1);M([a({type:Number,attribute:"show-timeout"})],L.prototype,"showTimeout",1);M([a({type:String,attribute:"css-class"})],L.prototype,"cssClass",2);M([v()],L.prototype,"_open",2);M([v()],L.prototype,"_panelTop",2);M([v()],L.prototype,"_panelLeft",2);M([v()],L.prototype,"_effectivePlacement",2);M([v()],L.prototype,"_caretTop",2);M([v()],L.prototype,"_caretLeft",2);M([v()],L.prototype,"_animate",2);customElements.get(Fn)||customElements.define(Fn,L);const pl=40,gl=2,ml=f`
  :host {
    --swim-navbar-bar-size: ${pl}px;
    --swim-navbar-bar-thickness: ${gl}px;
    display: inline-flex;
    align-items: center;
    min-height: 50px;
    position: relative;
    background-color: var(--grey-825);
    box-sizing: border-box;
  }

  .swim-navbar__nav-items {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }

  .swim-navbar__bar-track {
    min-height: var(--swim-navbar-bar-thickness);
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .swim-navbar__bar {
    position: absolute;
    width: var(--swim-navbar-bar-size);
    height: var(--swim-navbar-bar-thickness);
    background-color: var(--blue-500);
    transition: transform 300ms cubic-bezier(0.35, 0, 0.25, 1);
  }

  .swim-navbar__bar--bottom {
    bottom: 0;
  }

  .swim-navbar__bar--top {
    top: 0;
  }

  :host([bar-at-top]) .swim-navbar__bar-track {
    top: 0;
    bottom: auto;
  }
`,bl=f`
  :host {
    display: flex;
    font-size: 15pt;
    color: var(--grey-400);
    cursor: pointer;
    transition: color 0.2s ease-in-out;
    padding: var(--spacing-8) 10px var(--spacing-0) 10px;
    box-sizing: border-box;
  }

  :host(:focus) {
    outline: none;
  }

  :host(:focus-visible) {
    outline: 2px solid var(--blue-400);
    outline-offset: 2px;
    border-radius: var(--radius-2);
  }

  :host(:hover),
  :host(.swim-navbar-item--active) {
    color: var(--blue-400);
  }
`;var fl=Object.defineProperty,vl=Object.getOwnPropertyDescriptor,Vi=(n,e,t,o)=>{for(var i=vl(e,t),s=n.length-1,r;s>=0;s--)(r=n[s])&&(i=r(e,t,i)||i);return i&&fl(e,t,i),i};const qn="swim-navbar-item",co=class co extends _{constructor(){super(...arguments),this._active=0,this._total=0,this._index=0,this._clickBound=()=>this._handleClick()}get active(){return this._active}set active(e){const t=A(e,0);if(this._active!==t){const o=this._active;this._active=t,this.requestUpdate("active",o)}}get total(){return this._total}set total(e){this._total=A(e,0)}get index(){return this._index}set index(e){const t=A(e,0);if(this._index!==t){const o=this._index;this._index=t,this.requestUpdate("index",o)}}connectedCallback(){super.connectedCallback(),this.addEventListener("click",this._clickBound)}disconnectedCallback(){this.removeEventListener("click",this._clickBound),super.disconnectedCallback()}render(){const e=this._active===this._index;return d`
      <div
        class="swim-navbar-item ${e?"swim-navbar-item--active":""}"
        role="tab"
        aria-selected="${e}"
        tabindex="${e?0:-1}"
        @keydown="${this._handleKeyDown}"
      >
        <slot></slot>
      </div>
    `}setActive(){this._active!==this._index&&(this._active=this._index,this.requestUpdate(),this.dispatchEvent(new CustomEvent("active-change",{detail:this._index,bubbles:!0,composed:!0})))}_handleClick(){this.setActive()}_handleKeyDown(e){(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),this.setActive())}};co.styles=[x,bl];let Ue=co;Vi([a({type:Number})],Ue.prototype,"active");Vi([a({type:Number})],Ue.prototype,"total");Vi([a({type:Number})],Ue.prototype,"index");customElements.get(qn)||customElements.define(qn,Ue);var _l=Object.defineProperty,wl=Object.getOwnPropertyDescriptor,gi=(n,e,t,o)=>{for(var i=o>1?void 0:o?wl(e,t):e,s=n.length-1,r;s>=0;s--)(r=n[s])&&(i=(o?r(e,t,i):r(i))||i);return o&&i&&_l(e,t,i),i};const xl=40,$n="swim-navbar",ho=class ho extends _{constructor(){super(...arguments),this._barAtTop=!1,this._active=0,this._navItems=[],this._slotChangeBound=()=>this._syncFromSlot(),this._activeChangeBound=e=>this._onItemActiveChange(e)}get barAtTop(){return this._barAtTop}set barAtTop(e){this._barAtTop=p(e)}get active(){return this._active}set active(e){const t=A(e,0);t!==this._active&&!isNaN(t)&&t>=0&&(!this._navItems.length||t<this._navItems.length)&&(this._active=t,this._syncItems(),this.dispatchEvent(new CustomEvent("active-change",{detail:this._active,bubbles:!0,composed:!0})))}connectedCallback(){super.connectedCallback(),requestAnimationFrame(()=>this._syncFromSlot())}firstUpdated(){var t;this._syncFromSlot();const e=this._slotEl??((t=this.shadowRoot)==null?void 0:t.querySelector("slot"));e&&e.addEventListener("slotchange",this._slotChangeBound)}disconnectedCallback(){var t;const e=(t=this.shadowRoot)==null?void 0:t.querySelector("slot");e&&e.removeEventListener("slotchange",this._slotChangeBound),this._navItems.forEach(o=>{o.removeEventListener("active-change",this._activeChangeBound)}),super.disconnectedCallback()}goTo(e){const t=A(e,-1);if(t>=0&&t<this._navItems.length&&t!==this._active){const o=this._navItems[t];o&&o.setActive()}}_syncFromSlot(){var i;const e=this._slotEl??((i=this.shadowRoot)==null?void 0:i.querySelector("slot"));let t=(e==null?void 0:e.assignedElements({flatten:!0}))??[];t.length===0&&(t=Array.from(this.children));const o=t.filter(s=>s instanceof Ue);this._navItems.forEach(s=>{s.removeEventListener("active-change",this._activeChangeBound)}),this._navItems=o,o.forEach(s=>{s.addEventListener("active-change",this._activeChangeBound)}),this._syncItems()}_syncItems(){const e=this._active,t=this._navItems.length;this._navItems.forEach((o,i)=>{o.index=i,o.total=t,o.active=e})}_onItemActiveChange(e){const t=e.detail;typeof t!="number"||t===this._active||t>=0&&t<this._navItems.length&&(this._active=t,this._syncItems(),this.requestUpdate(),this.dispatchEvent(new CustomEvent("active-change",{detail:this._active,bubbles:!0,composed:!0})))}_getBarTransform(){const e=this._navItems.filter((t,o)=>o<this._active).length;return`translateX(${xl*e}px)`}render(){const e=this._barAtTop;return d`
      <div class="swim-navbar__nav-items" part="nav-items" role="tablist">
        <slot></slot>
      </div>
      <div class="swim-navbar__bar-track" part="bar-track">
        <div
          class="swim-navbar__bar ${e?"swim-navbar__bar--top":"swim-navbar__bar--bottom"}"
          part="bar"
          style="transform: ${this._getBarTransform()}"
        ></div>
      </div>
    `}};ho.styles=[x,ml];let Ye=ho;gi([$("slot")],Ye.prototype,"_slotEl",2);gi([a({type:Boolean,reflect:!0,attribute:"bar-at-top"})],Ye.prototype,"barAtTop",1);gi([a({type:Number})],Ye.prototype,"active",1);gi([v()],Ye.prototype,"_navItems",2);customElements.get($n)||customElements.define($n,Ye);const yl=[x,f`
    :host {
      display: block;
    }

    .swim-list__headers-container {
      padding-inline: var(--spacing-16);
      margin-inline: var(--spacing-16);
      display: grid;
      gap: var(--spacing-16);
      align-items: center;
    }

    .swim-list__headers-container--scrollable {
      margin-right: 1.75rem;
    }

    .swim-list__header-cell {
      color: var(--white);
      font-size: 14px;
      font-weight: var(--font-weight-bold);
      line-height: 22px;
    }

    .swim-list__divider {
      border-top: 1px solid var(--grey-600);
      border-bottom: 1px solid var(--grey-600);
      opacity: 0.75;
      margin: 0.75rem 0 0.5rem 0;
    }

    .swim-list__rows-container {
      overflow-y: auto;
      display: flex;
      flex-direction: column;
    }

    .swim-list__row {
      background-color: var(--grey-800);
      border: 1px solid var(--grey-600);
      border-radius: var(--radius-4);
      display: grid;
      align-items: center;
      height: 40px;
      margin: 0.25rem 1rem 0 1rem;
      padding-inline: var(--spacing-16);
      position: relative;
      gap: var(--spacing-16);
      box-sizing: border-box;
    }

    .swim-list__row::before {
      content: '';
      width: 3px;
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      border-top-left-radius: var(--radius-4);
      border-bottom-left-radius: var(--radius-4);
    }

    .swim-list__row--error::before {
      background-color: var(--red-500);
    }

    .swim-list__row--success::before {
      background-color: var(--green-500);
    }

    .swim-list__row--warning::before {
      background-color: var(--orange-400);
    }

    .swim-list__cell {
      color: var(--grey-050);
      font-size: var(--font-size-m);
      line-height: 20px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  `];var xt=(n=>(n.Error="error",n.Success="success",n.Warning="warning",n))(xt||{}),kl=Object.defineProperty,Cl=Object.getOwnPropertyDescriptor,Te=(n,e,t,o)=>{for(var i=o>1?void 0:o?Cl(e,t):e,s=n.length-1,r;s>=0;s--)(r=n[s])&&(i=(o?r(e,t,i):r(i))||i);return o&&i&&kl(e,t,i),i};const Rn=44,Hn="swim-list",uo=class uo extends _{constructor(){super(...arguments),this.columnLayout="",this.dataSource=[],this.defaultRowStatus=xt.Error,this.headerLabels=[],this.columns=[],this._hasScrollbar=!1,this._page=1,this._rowsContainer=null,this._scrollBound=e=>this._emitScrollChanges(e)}get height(){return this._height}set height(e){this._height=e===void 0?void 0:A(e)}connectedCallback(){super.connectedCallback()}firstUpdated(){var e;this._rowsContainer=((e=this.renderRoot)==null?void 0:e.querySelector(".swim-list__rows-container"))??null,this._rowsContainer&&(this._rowsContainer.addEventListener("scroll",this._scrollBound),requestAnimationFrame(()=>{var t;if(this._updateScrollbarState(),(t=this.paginationConfig)!=null&&t.index&&this.paginationConfig.index>1&&this.paginationConfig.pageSize>0){this._page=this.paginationConfig.index;const o=Rn*(this.paginationConfig.pageSize*(this._page-1));this._rowsContainer.scrollTo({top:o})}}))}disconnectedCallback(){this._rowsContainer&&(this._rowsContainer.removeEventListener("scroll",this._scrollBound),this._rowsContainer=null),super.disconnectedCallback()}updated(e){(e.has("dataSource")||e.has("height"))&&this._updateScrollbarState()}_updateScrollbarState(){this._rowsContainer&&(this._hasScrollbar=this._rowsContainer.scrollHeight>this._rowsContainer.clientHeight)}_emitScrollChanges(e){var s;const o=e.target.scrollTop;this.dispatchEvent(new CustomEvent("scroll",{detail:o,bubbles:!0}));const i=(s=this.paginationConfig)==null?void 0:s.pageSize;if(i){const r=Math.floor(o/Rn),l=Math.floor(r/i)+1;l!==this._page&&(this._page=l,this.dispatchEvent(new CustomEvent("page-change",{detail:l,bubbles:!0})))}}_getGridStyle(){const e=Math.max(this.headerLabels.length,this.columns.length,1);return this.columnLayout&&this.columnLayout.trim()?this.columnLayout.trim():`repeat(${e}, 1fr)`}_getRowStatus(e){const t=e.status;return t===xt.Error||t===xt.Success||t===xt.Warning?t:this.defaultRowStatus}_getCellValue(e,t,o){if(t==="$index")return`${o+1}.`;const i=e[t];return i==null?"":String(i)}render(){const e=this._getGridStyle(),t=Math.max(this.headerLabels.length,this.columns.length,1),o=this.headerLabels.length>=t?this.headerLabels.slice(0,t):[...this.headerLabels,...Array(t-this.headerLabels.length).fill("")];return d`
      <div
        class="swim-list__headers-container ${this._hasScrollbar?"swim-list__headers-container--scrollable":""}"
        style="grid-template-columns: ${e}"
      >
        ${o.map(i=>d`<span class="swim-list__header-cell">${i}</span>`)}
      </div>
      <hr class="swim-list__divider" />
      <div class="swim-list__rows-container" style=${this._height!==void 0?`height: ${this._height}px`:""}>
        ${this.dataSource.map((i,s)=>{const r=this._getRowStatus(i);return d`
            <div class="swim-list__row swim-list__row--${r}" style="grid-template-columns: ${e}">
              ${this.columns.map(l=>d` <span class="swim-list__cell">${this._getCellValue(i,l,s)}</span> `)}
            </div>
          `})}
      </div>
    `}};uo.styles=yl;let re=uo;Te([a({type:String,attribute:"column-layout"})],re.prototype,"columnLayout",2);Te([a({type:Array,attribute:!1})],re.prototype,"dataSource",2);Te([a({type:Number})],re.prototype,"height",1);Te([a({attribute:!1})],re.prototype,"paginationConfig",2);Te([a({type:String,attribute:"default-row-status",reflect:!0})],re.prototype,"defaultRowStatus",2);Te([a({type:Array,attribute:!1})],re.prototype,"headerLabels",2);Te([a({type:Array,attribute:!1})],re.prototype,"columns",2);Te([v()],re.prototype,"_hasScrollbar",2);Te([v()],re.prototype,"_page",2);customElements.get(Hn)||customElements.define(Hn,re);const El=[x,ct,f`
    :host {
      --swim-dialog-bg: var(--grey-800);
      --swim-dialog-header-color: var(--grey-100);
      --swim-dialog-body-color: var(--grey-200);
    }

    .swim-dialog {
      position: fixed;
      display: flex;
      align-items: center;
      justify-content: center;
      inset: 0;
      width: 100%;
      height: 100vh;
      pointer-events: none;
      z-index: var(--swim-dialog-z, 991);
    }

    /* Matches ngx-overlay: black at 80% opacity when active */
    .swim-dialog__backdrop {
      position: absolute;
      inset: 0;
      background-color: var(--black);
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.1s ease-in;
    }

    .swim-dialog.swim-dialog--open .swim-dialog__backdrop {
      opacity: 0.8;
    }

    .swim-dialog__content {
      pointer-events: auto;
      position: relative;
      border-radius: var(--radius-8);
      box-shadow: var(--shadow-3);
      background: var(--swim-dialog-bg);
      padding: 1.4rem;
      min-width: 250px;
      font-size: var(--font-size-m);
      color: var(--swim-dialog-body-color);
      animation-fill-mode: forwards;
      opacity: 0;
      transform: scale3d(1.2, 1.2, 1);
      transition: opacity 0.2s ease-out, transform 0.2s ease-out;
      z-index: calc(var(--swim-dialog-z, 991) + 1);
    }

    .swim-dialog.swim-dialog--open .swim-dialog__content {
      opacity: 1;
      transform: scale3d(1, 1, 1);
    }

    .swim-dialog__content--large,
    .swim-dialog__content--medium {
      padding: var(--spacing-0);
      width: calc(100vw - 120px);
      background-color: transparent;
    }

    .swim-dialog__content--large {
      height: calc(100vh - 120px);
      max-height: calc(100vh - 120px);
      border-radius: var(--radius-64);
      display: flex;
      flex-direction: column;
    }

    .swim-dialog__content--large .swim-dialog__body {
      flex: 1 1 auto;
      min-height: 0;
      max-height: none;
    }

    .swim-dialog__content--medium {
      height: auto;
      min-height: 340px;
      max-height: 75vh;
      max-width: 900px;
      border-radius: var(--radius-64);
      display: flex;
      flex-direction: column;
    }

    .swim-dialog__content--medium .swim-dialog__body {
      flex: 1 1 auto;
      min-height: 0;
      max-height: none;
    }

    .swim-dialog__close {
      position: absolute;
      font-size: var(--font-size-s);
      color: var(--grey-400);
      right: 1rem;
      top: 1rem;
      background: none;
      border: none;
      padding: 0.25rem;
      cursor: pointer;
      line-height: 1;
      border-radius: var(--radius-4);
    }

    .swim-dialog__close:hover,
    .swim-dialog__close:active {
      color: var(--white);
    }

    .swim-dialog__close:focus-visible {
      outline: 2px solid var(--blue-500);
      outline-offset: 2px;
    }

    .swim-dialog__header {
      margin: 0 0 1.4rem 0;
    }

    .swim-dialog__title,
    .swim-dialog__header h1,
    .swim-dialog__header h2 {
      font-size: 1.8rem;
      font-weight: 400;
      margin: 0 0 1.4rem 0;
      color: var(--swim-dialog-header-color);
    }

    .swim-dialog__content--medium .swim-dialog__header,
    .swim-dialog__content--large .swim-dialog__header {
      border-top-left-radius: var(--radius-64);
      border-top-right-radius: var(--radius-64);
    }

    .swim-dialog__body {
      margin: 0;
      max-height: calc(100vh - 12rem);
      min-height: 0;
    }

    .swim-dialog__footer {
      text-align: right;
      margin-top: 1.4rem;
    }

    .swim-dialog__footer .btn,
    .swim-dialog__footer swim-button {
      margin-left: var(--spacing-4);
    }

    /* Full screen variant (class="swim-dialog--full-screen" on host or wrapper) */
    :host(.swim-dialog--full-screen) .swim-dialog,
    .swim-dialog.swim-dialog--full-screen {
      width: 100vw;
      height: 100%;
      overflow-y: auto;
    }

    :host(.swim-dialog--full-screen) .swim-dialog__content,
    .swim-dialog.swim-dialog--full-screen .swim-dialog__content {
      box-shadow: none;
      width: 100%;
      min-height: 100vh;
    }

    :host(.swim-dialog--full-screen) .swim-dialog__close,
    .swim-dialog.swim-dialog--full-screen .swim-dialog__close {
      right: 1rem;
      top: 2rem;
    }

    /* Wizard / custom header-footer variant (class="wizard" on root) - style slotted header/footer */
    .swim-dialog.wizard .swim-dialog__content {
      padding: var(--spacing-0);
      background: var(--grey-725);
    }

    .swim-dialog.wizard .swim-dialog__body slot::slotted(.swim-dialog__header) {
      padding: 1.4rem;
      background: var(--grey-750);
      border-top-left-radius: var(--radius-16);
      border-top-right-radius: var(--radius-16);
      margin: 0;
      display: block;
    }

    .swim-dialog.wizard .swim-dialog__body slot::slotted(.swim-dialog__footer) {
      padding: 1.4rem;
      margin-top: 0;
      display: block;
    }
  `];var yt=(n=>(n.Regular="regular",n.Medium="medium",n.Large="large",n))(yt||{}),Al=Object.defineProperty,Sl=Object.getOwnPropertyDescriptor,W=(n,e,t,o)=>{for(var i=o>1?void 0:o?Sl(e,t):e,s=n.length-1,r;s>=0;s--)(r=n[s])&&(i=(o?r(e,t,i):r(i))||i);return o&&i&&Al(e,t,i),i};const Vn="swim-dialog",po=class po extends _{constructor(){super(...arguments),this.dialogTitle="",this.content="",this.class="",this.cssClass="",this.format=yt.Regular,this.showBackdrop=!0,this._closeButton=!0,this._visible=!1,this._zIndex=991,this._contentId=`swim-dialog-content-${Math.random().toString(36).slice(2,11)}`,this._titleId=`swim-dialog-title-${Math.random().toString(36).slice(2,11)}`,this._previousActiveElement=null}get title(){return this.dialogTitle}set title(e){e&&(this.dialogTitle=e)}get closeButton(){return this._closeButton}set closeButton(e){this._closeButton=p(e)}get visible(){return this._visible}set visible(e){const t=p(e);this._visible!==t&&(this._visible=t,t?(this._previousActiveElement=typeof document<"u"?document.activeElement:null,this.dispatchEvent(new CustomEvent("open",{bubbles:!0}))):(this._restoreFocus(),this.dispatchEvent(new CustomEvent("close",{detail:void 0,bubbles:!0}))))}get zIndex(){return this._zIndex}set zIndex(e){this._zIndex=A(e,991)}get _contentzIndex(){return this.zIndex+1}get _canClose(){return this.beforeClose?this.beforeClose():!0}_restoreFocus(){this._previousActiveElement&&typeof this._previousActiveElement.focus=="function"&&this._previousActiveElement.focus(),this._previousActiveElement=null}show(){this.visible=!0}hide(){this._canClose&&(this.visible=!1)}firstUpdated(){this.visible&&this._contentEl&&this._contentEl.focus({preventScroll:!0})}updated(e){e.has("visible")&&this.visible&&this._contentEl&&requestAnimationFrame(()=>{var t;(t=this._contentEl)==null||t.focus({preventScroll:!0})})}render(){if(!this.visible)return u;const e=this.format===yt.Regular||this.format==="regular",t=this.format===yt.Large||this.format==="large",o=this.format===yt.Medium||this.format==="medium",i=["swim-dialog__content",this.cssClass,t?"swim-dialog__content--large":"",o?"swim-dialog__content--medium":""].filter(Boolean).join(" "),s=this.class.includes("swim-dialog--full-screen"),r=["swim-dialog","swim-dialog--open",this.class,s?"swim-scroll":""].filter(Boolean).join(" ");return d`
      <div class="${r}" style="--swim-dialog-z: ${this.zIndex}" role="presentation">
        ${this.showBackdrop?d`<div class="swim-dialog__backdrop" aria-hidden="true"></div>`:u}
        <div
          part="content"
          class="${i}"
          style="z-index: ${this._contentzIndex}"
          tabindex="-1"
          role="dialog"
          aria-modal="true"
          aria-labelledby="${this.dialogTitle?this._titleId:u}"
          id="${this._contentId}"
        >
          ${e?d`
                ${this.closeButton?d`
                      <button
                        part="close-button"
                        type="button"
                        class="swim-dialog__close"
                        aria-label="Close dialog"
                        @click="${this.hide}"
                      >
                        <swim-icon font-icon="x"></swim-icon>
                      </button>
                    `:u}
                ${this.dialogTitle?d`
                      <div class="swim-dialog__header">
                        <h2 id="${this._titleId}" class="swim-dialog__title">${this.dialogTitle}</h2>
                      </div>
                    `:u}
                <div class="swim-dialog__body swim-scroll">
                  <slot></slot>
                  ${this.content?d`<div>${this.content}</div>`:u}
                </div>
              `:d`
                <div class="swim-dialog__body swim-scroll">
                  <slot></slot>
                  ${this.content?d`<div>${this.content}</div>`:u}
                </div>
              `}
        </div>
      </div>
    `}};po.styles=El;let q=po;W([a({type:String,attribute:"dialog-title"})],q.prototype,"dialogTitle",2);W([a({type:String})],q.prototype,"title",1);W([a({type:String})],q.prototype,"content",2);W([a({type:String})],q.prototype,"class",2);W([a({type:String,attribute:"css-class"})],q.prototype,"cssClass",2);W([a({type:String,reflect:!0})],q.prototype,"format",2);W([a({type:Boolean,attribute:"show-backdrop",reflect:!0,converter:{fromAttribute:n=>n===null?!0:n!=="false"&&n!=="0",toAttribute:n=>n?"":"false"}})],q.prototype,"showBackdrop",2);W([a({type:Boolean,attribute:"close-button"})],q.prototype,"closeButton",1);W([a({type:Boolean,reflect:!0})],q.prototype,"visible",1);W([a({type:Number})],q.prototype,"zIndex",1);W([a({attribute:!1})],q.prototype,"beforeClose",2);W([v()],q.prototype,"_contentId",2);W([v()],q.prototype,"_titleId",2);W([$(".swim-dialog__content")],q.prototype,"_contentEl",2);customElements.get(Vn)||customElements.define(Vn,q);const Il=[x,f`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      position: relative;
      overflow: hidden;
      --swim-format-dialog-bg: var(--grey-800);
      --swim-format-header-height-large: 90px;
      --swim-format-header-height-medium: 60px;
      --swim-format-footer-height: 4rem;
      --swim-format-body-padding: 2rem;
      --swim-format-border: 2px solid var(--grey-700);
    }

    .format-dialog-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      max-height: var(--swim-format-max-height, 75vh);
      background: var(--swim-format-dialog-bg);
      box-shadow: 0 0 100px rgba(0, 0, 0, 0.25);
      border-radius: var(--radius-16);
      overflow: hidden;
    }

    :host([format='large']) .format-dialog-container {
      --swim-format-max-height: calc(100vh - 7.25rem);
      --swim-format-header-height: var(--swim-format-header-height-large);
    }

    :host([format='medium']) .format-dialog-container {
      --swim-format-max-height: 75vh;
      --swim-format-header-height: var(--swim-format-header-height-medium);
      --swim-format-body-max-height: calc(var(--swim-format-max-height) - var(--swim-format-header-height));
    }

    .format-dialog-container__header {
      flex: 0 0 var(--swim-format-header-height, 90px);
      height: var(--swim-format-header-height, 90px);
      min-height: var(--swim-format-header-height, 90px);
      border-bottom: var(--swim-format-border);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 var(--swim-format-body-padding);
      padding-right: 2.5rem;
      gap: 1.5rem;
      overflow: visible;
    }

    /* Match ngx-large-format-dialog-header-title__wrapper: flex 0 0 20%, height 100%, justify-content center */
    .format-dialog-container__header-title {
      display: flex;
      flex-direction: column;
      gap: 2px;
      flex: 0 0 20%;
      height: 100%;
      min-width: 0;
      max-width: 50%;
      justify-content: center;
    }

    .format-dialog-container__header-title--with-subtitle {
      align-items: flex-start;
    }

    .format-dialog-container__header-title h1 {
      margin: 0;
      color: var(--white);
      font-size: var(--swim-format-title-size, 1.75rem);
      font-weight: 400;
      line-height: var(--swim-format-title-line, 2rem);
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }

    .format-dialog-container__header-title h4 {
      margin: 0;
      color: var(--grey-250);
      font-size: var(--font-size-m);
      line-height: 1.5;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }

    :host([format='medium']) .format-dialog-container__header-title h1 {
      --swim-format-title-size: 1.375rem;
      --swim-format-title-line: 1.625rem;
    }

    .format-dialog-container__header-action {
      flex: 0 0 auto;
      max-width: 50%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }

    .format-dialog-container__header-action__button {
      background: none;
      border: none;
      color: var(--grey-400);
      font-size: 0.8125rem;
      line-height: 1;
      padding: 0.25rem 0;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
    }

    .format-dialog-container__header-action__button swim-icon {
      flex-shrink: 0;
      font-size: 1em;
      line-height: 0;
    }

    .format-dialog-container__header-action__button:hover {
      color: var(--white);
    }

    .format-dialog-container__header-action__button:focus-visible {
      outline: 2px solid var(--blue-500);
      outline-offset: 2px;
    }

    .format-dialog-container__body {
      flex: 1 1 auto;
      min-height: 215px;
      padding: 0 var(--swim-format-body-padding);
      color: var(--grey-200);
    }

    :host([format='medium']) .format-dialog-container__body {
      max-height: var(--swim-format-body-max-height, auto);
    }

    .format-dialog-container__footer {
      flex: 0 0 var(--swim-format-footer-height);
      height: var(--swim-format-footer-height);
      min-height: var(--swim-format-footer-height);
      border-top: var(--swim-format-border);
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: var(--swim-format-footer-gap, 0.5rem);
      padding: 0.75rem 2rem;
      box-sizing: border-box;
    }
  `];var zl=Object.defineProperty,ut=(n,e,t,o)=>{for(var i=void 0,s=n.length-1,r;s>=0;s--)(r=n[s])&&(i=r(e,t,i)||i);return i&&zl(e,t,i),i};const Nn="swim-large-format-dialog-content",go=class go extends _{constructor(){super(...arguments),this.format="large",this.dialogTitle="",this.dialogSubtitle="",this.dialogActionTitle="Close",this.dialogDirtyActionTitle="Cancel",this.dirty=!1}_onCloseOrCancel(){this.dispatchEvent(new CustomEvent("close-or-cancel",{detail:this.dirty,bubbles:!0,composed:!0}))}render(){const e=["format-dialog-container__header-title","format-dialog-container__header-title--with-subtitle"].join(" ");return d`
      <main class="format-dialog-container">
        <header class="format-dialog-container__header">
          <div class="format-dialog-container__header-title ${e}">
            <h1>${this.dialogTitle}</h1>
            ${this.dialogSubtitle?d`<h4>${this.dialogSubtitle}</h4>`:u}
          </div>
          <div class="format-dialog-container__header-action">
            <button
              type="button"
              class="format-dialog-container__header-action__button"
              aria-label="${this.dirty?this.dialogDirtyActionTitle:this.dialogActionTitle}"
              @click="${this._onCloseOrCancel}"
            >
              <swim-icon font-icon="x"></swim-icon>
              ${this.dirty?this.dialogDirtyActionTitle:this.dialogActionTitle}
            </button>
          </div>
        </header>
        <section class="format-dialog-container__body swim-scroll">
          <slot></slot>
        </section>
        <footer class="format-dialog-container__footer">
          <slot name="footer"></slot>
        </footer>
      </main>
    `}};go.styles=[ct,Il];let Se=go;ut([a({type:String,reflect:!0})],Se.prototype,"format");ut([a({type:String,attribute:"dialog-title"})],Se.prototype,"dialogTitle");ut([a({type:String,attribute:"dialog-subtitle"})],Se.prototype,"dialogSubtitle");ut([a({type:String,attribute:"dialog-action-title"})],Se.prototype,"dialogActionTitle");ut([a({type:String,attribute:"dialog-dirty-action-title"})],Se.prototype,"dialogDirtyActionTitle");ut([a({type:Boolean,reflect:!0})],Se.prototype,"dirty");customElements.get(Nn)||customElements.define(Nn,Se);const Tl=[x,f`
    :host {
      --swim-format-footer-gap: 0.5rem;
    }

    .format-dialog-footer {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: var(--swim-format-footer-gap);
      width: 100%;
      height: 100%;
    }
  `];var Bl=Object.defineProperty,Ll=(n,e,t,o)=>{for(var i=void 0,s=n.length-1,r;s>=0;s--)(r=n[s])&&(i=r(e,t,i)||i);return i&&Bl(e,t,i),i};const Gn="swim-large-format-dialog-footer",mo=class mo extends _{constructor(){super(...arguments),this.format="large"}render(){return d` <div class="format-dialog-footer"><slot></slot></div> `}};mo.styles=Tl;let ii=mo;Ll([a({type:String,reflect:!0})],ii.prototype,"format");customElements.get(Gn)||customElements.define(Gn,ii);const Ol=f`
  :host {
    position: relative;
    display: block;
    max-width: 100%;
  }

  :host([autosize]) {
    display: inline-block;
  }

  /* ------------------------------------------------------------------ */
  /* Container                                                          */
  /* ------------------------------------------------------------------ */

  .swim-date-time__container {
    position: relative;
  }

  /* Ensure the inner swim-input leaves space for the calendar button */
  .swim-date-time__container swim-input {
    --swim-input-padding-right: 28px;
  }

  /* Override swim-input display when host is autosize */
  :host([autosize]) .swim-date-time__container swim-input {
    display: inline-block;
  }

  /* ------------------------------------------------------------------ */
  /* Calendar / clock button                                            */
  /* ------------------------------------------------------------------ */

  .swim-date-time__calendar-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    padding: 0;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--grey-200);
    background: transparent;
    border: none;
    cursor: pointer;
    z-index: 2;
    font-size: 1rem;
    line-height: 1;
  }

  .swim-date-time__calendar-btn:hover {
    color: var(--grey-050);
  }

  .swim-date-time__calendar-btn:disabled {
    color: var(--grey-400);
    cursor: not-allowed;
    pointer-events: none;
  }

  .swim-date-time__calendar-btn:focus-visible {
    outline: 2px solid var(--blue-500);
    outline-offset: 2px;
    border-radius: var(--radius-2);
  }

  /* No-label adjustment (button at top instead of center) */
  :host(:not([has-label])) .swim-date-time__calendar-btn {
    top: 0.5rem;
    transform: translateY(0);
  }

  /* Fill appearance */
  :host([appearance='fill']) .swim-date-time__calendar-btn {
    right: 10px;
  }

  /* Autosize: tweak vertical alignment */
  :host([autosize]) .swim-date-time__calendar-btn {
    transform: translateY(-25%);
  }

  :host([autosize][appearance='fill']) .swim-date-time__calendar-btn {
    transform: translateY(-15%);
  }

  :host([autosize][marginless]) .swim-date-time__calendar-btn {
    transform: translateY(-35%);
  }

  :host([autosize]:not([has-label])) .swim-date-time__calendar-btn {
    transform: translateY(0);
  }

  /* ------------------------------------------------------------------ */
  /* Hidden native picker (positioned off-screen but accessible)        */
  /* ------------------------------------------------------------------ */

  .swim-date-time__native-picker {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
    overflow: hidden;
    pointer-events: none;
    /* Place below the button so mobile sheet pickers still work */
    bottom: 0;
    right: 0;
  }

  /* ------------------------------------------------------------------ */
  /* Invalid / out-of-range state                                       */
  /* ------------------------------------------------------------------ */

  :host([date-invalid]) swim-input,
  :host([date-out-of-range]) swim-input {
    --swim-input-underline-color: var(--red-500);
    --swim-input-label-color: var(--red-500);
    --swim-input-hint-color: var(--red-500);
    --swim-input-caret-color: var(--red-500);
  }

  /* Force invalid styling on the inner input via attribute forwarding */
  :host([date-invalid]) swim-input,
  :host([date-out-of-range]) swim-input {
    color: inherit;
  }
`;var N=(n=>(n.date="date",n.time="time",n.datetime="datetime",n))(N||{}),Re=(n=>(n.HUMAN="human",n.TIMEZONE="timezone",n.LOCAL="local",n.CUSTOM="custom",n))(Re||{});const Dl=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],Ml=["January","February","March","April","May","June","July","August","September","October","November","December"],Pl=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],Fl=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],Un={L:"MM/DD/YYYY",l:"M/D/YYYY",LL:"MMMM D, YYYY",ll:"MMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",lll:"MMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A",llll:"ddd, MMM D, YYYY h:mm A",LT:"h:mm A",LTS:"h:mm:ss A"},P={shortDate:"l",shortTime:"LT",shortDateTime:"l LT",shortDateTimeSeconds:"l LTS",date:"ll",time:"LT",dateTime:"lll",dateTimeSeconds:"ll LTS",dateMonth:"MMM YYYY",dateYear:"YYYY",fullDate:"ddd, ll Z [(]zz[)]",fullTime:"LT Z [(]zz[)]",fullDateTime:"llll Z [(]zz[)]",fullDateMonth:"MMM YYYY Z [(]zz[)]",fullDateYear:"YYYY Z [(]zz[)]",localeDate:"L",localeDateTime:"L LT",localeTime:"LT",timezoneDate:"L Z",timezoneDateTime:"L LT Z",timezoneDateTimeSeconds:"L LTS Z",timezoneTime:"LT Z",timezoneDateMonth:"MMM YYYY Z",timezoneDateYear:"YYYY Z",locale:"LLL",shortLocale:"LL",fullLocale:"LLLL"};function G(n,e=2){return String(n).padStart(e,"0")}function ks(n,e){if(!e)return{year:n.getFullYear(),month:n.getMonth(),day:n.getDate(),hour:n.getHours(),minute:n.getMinutes(),second:n.getSeconds(),ms:n.getMilliseconds(),dow:n.getDay()};try{const o=new Intl.DateTimeFormat("en-US",{timeZone:e,year:"numeric",month:"numeric",day:"numeric",weekday:"short",hour:"numeric",minute:"numeric",second:"numeric",hour12:!1}).formatToParts(n),i=r=>{var l;return((l=o.find(c=>c.type===r))==null?void 0:l.value)??""},s={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};return{year:parseInt(i("year"),10),month:parseInt(i("month"),10)-1,day:parseInt(i("day"),10),hour:parseInt(i("hour"),10)%24,minute:parseInt(i("minute"),10),second:parseInt(i("second"),10),ms:n.getMilliseconds(),dow:s[i("weekday")]??0}}catch{return ks(n)}}function Yn(n,e){if(!e){const t=-n.getTimezoneOffset();return Wn(t)}try{const t=n.toLocaleString("en-US",{timeZone:"UTC"}),o=n.toLocaleString("en-US",{timeZone:e}),i=new Date(o).getTime()-new Date(t).getTime(),s=Math.round(i/6e4);return Wn(s)}catch{return"+00:00"}}function Wn(n){const e=n>=0?"+":"-",t=Math.abs(n);return`${e}${G(Math.floor(t/60))}:${G(t%60)}`}function ql(n,e){var t;try{return((t=new Intl.DateTimeFormat("en-US",{timeZone:e||void 0,timeZoneName:"short"}).formatToParts(n).find(i=>i.type==="timeZoneName"))==null?void 0:t.value)??""}catch{return""}}function $l(n){const e=["LLLL","llll","LLL","lll","LTS","LL","ll","LT","L","l"];let t=n;for(const o of e)Un[o]&&(t=t.split(o).join(Un[o]));return t}const Rl=/(MMMM|YYYY|dddd|MMM|ddd|SSS|MM|DD|HH|hh|mm|ss|YY|ZZ|zz|M|D|H|h|A|a|Z|z)/g;function Hl(n,e,t,o){switch(n){case"YYYY":return String(e.year);case"YY":return String(e.year).slice(-2);case"MMMM":return Ml[e.month];case"MMM":return Dl[e.month];case"MM":return G(e.month+1);case"M":return String(e.month+1);case"DD":return G(e.day);case"D":return String(e.day);case"dddd":return Fl[e.dow];case"ddd":return Pl[e.dow];case"HH":return G(e.hour);case"H":return String(e.hour);case"hh":return G(e.hour%12||12);case"h":return String(e.hour%12||12);case"mm":return G(e.minute);case"ss":return G(e.second);case"SSS":return G(e.ms,3);case"A":return e.hour>=12?"PM":"AM";case"a":return e.hour>=12?"pm":"am";case"Z":return Yn(t,o);case"ZZ":return Yn(t,o).replace(":","");case"zz":case"z":return ql(t,o);default:return n}}function Vl(n){return P[n]||n}function Nl(n,e,t){const o=Cs(t);let i=$l(e);const s=[];i=i.replace(/\[([^\]]*)\]/g,(c,h)=>(s.push(h),`\0${s.length-1}\0`));const r=ks(n,o);return i.replace(Rl,c=>Hl(c,r,n,o)).replace(/\x00(\d+)\x00/g,(c,h)=>s[parseInt(h,10)])}function it(n){if(n instanceof Date)return U(n)?n:null;if(!n||typeof n!="string")return null;const e=n.trim();if(!e)return null;const t=new Date(e);if(U(t))return t;const o=e.match(/^(\d{1,2})\/(\d{4})$/);if(o){const r=new Date(parseInt(o[2],10),parseInt(o[1],10)-1,1);if(U(r))return r}const i=e.match(/^(\d{4})$/);if(i){const r=new Date(parseInt(i[1],10),0,1);if(U(r))return r}const s=e.match(/^(\w{3,})\s+(\d{4})$/);if(s){const r=new Date(`${s[1]} 1, ${s[2]}`);if(U(r))return r}return null}function U(n){return n instanceof Date&&!isNaN(n.getTime())}function Jn(n,e){if(!e||!U(n))return n;const t=new Date(n),o=[["millisecond",()=>{}],["second",()=>t.setMilliseconds(0)],["minute",()=>{t.setMilliseconds(0),t.setSeconds(0)}],["hour",()=>{t.setMilliseconds(0),t.setSeconds(0),t.setMinutes(0)}],["date",()=>{t.setMilliseconds(0),t.setSeconds(0),t.setMinutes(0),t.setHours(0)}],["month",()=>{t.setMilliseconds(0),t.setSeconds(0),t.setMinutes(0),t.setHours(0),t.setDate(1)}],["year",()=>{t.setMilliseconds(0),t.setSeconds(0),t.setMinutes(0),t.setHours(0),t.setDate(1),t.setMonth(0)}]],i=o.findIndex(([s])=>s===e);return i>=0&&o[i][1](),t}function Gl(n,e,t){switch(n){case Re.HUMAN:case Re.TIMEZONE:switch(e){case N.date:return t==="month"?P.timezoneDateMonth:t==="year"?P.timezoneDateYear:P.timezoneDate;case N.time:return P.timezoneTime;default:return P.timezoneDateTime}case Re.LOCAL:switch(e){case N.date:return t==="month"?P.dateMonth:t==="year"?P.dateYear:P.localeDate;case N.time:return P.localeTime;default:return P.localeDateTime}case Re.CUSTOM:switch(e){case N.date:return t==="month"?P.dateMonth:t==="year"?P.dateYear:P.date;case N.time:return P.time;default:return P.dateTime}default:return P.localeDate}}function Cs(n){if(n)return n.toLowerCase()==="utc"?"UTC":n}function vt(n,e){if(!n||!U(n))return"";const t=n.getFullYear(),o=G(n.getMonth()+1),i=G(n.getDate()),s=G(n.getHours()),r=G(n.getMinutes()),l=G(n.getSeconds());switch(e){case"time":return`${s}:${r}:${l}`;case"datetime":case"datetime-local":return`${t}-${o}-${i}T${s}:${r}:${l}`;case"month":return`${t}-${o}`;default:return`${t}-${o}-${i}`}}function Kn(n,e,t){if(!U(n))return!1;const o=e?it(e):null,i=t?it(t):null;return!!(o&&U(o)&&n<o||i&&U(i)&&n>i)}var Ul=Object.defineProperty,Yl=Object.getOwnPropertyDescriptor,S=(n,e,t,o)=>{for(var i=o>1?void 0:o?Yl(e,t):e,s=n.length-1,r;s>=0;s--)(r=n[s])&&(i=(o?r(e,t,i):r(i))||i);return o&&i&&Ul(e,t,i),i};let Wl=0;const jn="swim-date-time",di=class di extends _{constructor(){super(),this.id=`swim-date-time-${++Wl}`,this.name="",this.label="",this.hint="",this.placeholder="",this.size="sm",this.appearance="legacy",this._disabled=!1,this._required=!1,this.requiredIndicator="*",this._autofocus=!1,this._autosize=!1,this._minWidth=60,this._marginless=!1,this._value=null,this._displayValue="",this._dateInvalid=!1,this._dateOutOfRange=!1,this._focused=!1,this._internals=this.attachInternals()}get disabled(){return this._disabled}set disabled(e){const t=this._disabled;this._disabled=p(e),this.requestUpdate("disabled",t)}get required(){return this._required}set required(e){const t=this._required;this._required=p(e),this.requestUpdate("required",t)}get autofocus(){return this._autofocus}set autofocus(e){this._autofocus=p(e)}get autosize(){return this._autosize}set autosize(e){const t=this._autosize;this._autosize=p(e),this.requestUpdate("autosize",t)}get minWidth(){return this._minWidth}set minWidth(e){this._minWidth=A(e)??60}set inputType(e){const t=this._inputType;this._inputType=e,this.requestUpdate("inputType",t)}get inputType(){return this._effectiveInputType}set displayMode(e){const t=this._displayMode;this._displayMode=e,this.requestUpdate("displayMode",t)}get displayMode(){return this._effectiveDisplayMode}get marginless(){return this._marginless}set marginless(e){const t=this._marginless;this._marginless=p(e),this.requestUpdate("marginless",t)}get value(){return this._value}set value(e){const t=this._value;if(typeof e=="string"&&(e=e.trim(),e||(e=null)),!e&&!this._value){this._value=null;return}if(e===this._value)return;let o=e instanceof Date&&U(e);if(typeof e=="string"){const i=it(e);i&&(e=i,o=!0)}if(o&&e instanceof Date&&this.precision&&(e=Jn(e,this.precision)),this._value=e,this._update(),this._internals){const i=this._value instanceof Date?this._value.toISOString():String(this._value??"");this._internals.setFormValue(i)}this.requestUpdate("value",t)}get _effectiveInputType(){return this._inputType?this._inputType:this.precision==="hour"||this.precision==="minute"?N.datetime:N.date}get _effectiveDisplayMode(){return this._displayMode?this._displayMode:this.timezone?Re.TIMEZONE:Re.LOCAL}get _effectiveFormat(){return this.format?Vl(this.format):Gl(this._effectiveDisplayMode,this._effectiveInputType,this.precision)}get _nativeInputType(){switch(this._effectiveInputType){case N.time:return"time";case N.datetime:return"datetime-local";default:return"date"}}get _iconName(){switch(this._effectiveInputType){case N.time:return"clock";case N.datetime:return"calendar-clock";default:return"calendar"}}connectedCallback(){super.connectedCallback(),this._update()}firstUpdated(){this.autofocus&&this._swimInput&&requestAnimationFrame(()=>{var e,t;(t=(e=this._swimInput)==null?void 0:e.focus)==null||t.call(e)})}updated(e){super.updated(e),this.label?this.setAttribute("has-label",""):this.removeAttribute("has-label"),this._dateInvalid?this.setAttribute("date-invalid",""):this.removeAttribute("date-invalid"),this._dateOutOfRange?this.setAttribute("date-out-of-range",""):this.removeAttribute("date-out-of-range"),this._focused?this.setAttribute("focused",""):this.removeAttribute("focused"),(e.has("format")||e.has("precision")||e.has("timezone")||e.has("displayMode")||e.has("inputType"))&&this._update(),(e.has("required")||e.has("minDate")||e.has("maxDate"))&&this._validate()}focus(e){var t,o;(o=(t=this._swimInput)==null?void 0:t.focus)==null||o.call(t,e)}render(){const e=this._value instanceof Date?vt(this._value,this._nativeInputType):"",t=this.minDate instanceof Date?vt(this.minDate,this._nativeInputType):typeof this.minDate=="string"?vt(it(this.minDate),this._nativeInputType):void 0,o=this.maxDate instanceof Date?vt(this.maxDate,this._nativeInputType):typeof this.maxDate=="string"?vt(it(this.maxDate),this._nativeInputType):void 0;return d`
      <div class="swim-date-time__container">
        <swim-input
          part="input"
          .id="${this.id+"-input"}"
          .name="${this.name}"
          .label="${this.label}"
          .hint="${this.hint}"
          .placeholder="${this.placeholder}"
          .size="${this.size}"
          .appearance="${this.appearance}"
          .disabled="${this.disabled}"
          .required="${this.required}"
          .requiredIndicator="${String(this.requiredIndicator)}"
          .value="${this._displayValue}"
          ?marginless="${this.marginless}"
          tabindex="${ce(this.tabindex)}"
          autocomplete="off"
          @input="${this._handleInput}"
          @focus="${this._handleFocus}"
          @blur="${this._handleBlur}"
          @keydown="${this._handleKeyDown}"
        ></swim-input>

        <button
          part="calendar-btn"
          class="swim-date-time__calendar-btn"
          type="button"
          ?disabled="${this.disabled}"
          @click="${this._openPicker}"
          title="Show date/time selector"
          aria-label="Open ${this._effectiveInputType} picker"
        >
          <swim-icon font-icon="${this._iconName}"></swim-icon>
        </button>

        <input
          class="swim-date-time__native-picker"
          type="${this._nativeInputType}"
          .value="${e}"
          min="${ce(t)}"
          max="${ce(o)}"
          tabindex="-1"
          aria-hidden="true"
          @change="${this._handleNativeChange}"
        />
      </div>
    `}_handleInput(e){e.stopPropagation();const o=e.target.value;this._displayValue=o;const i=it(o),s=this._value;if(i){const r=this.precision?Jn(i,this.precision):i;this._value=r,this._dateInvalid=!1}else o?(this._value=o,this._dateInvalid=!0):(this._value=null,this._dateInvalid=!1);this._dateOutOfRange=!this._dateInvalid&&this._value instanceof Date?Kn(this._value,this.minDate,this.maxDate):!1,this._updateFormValue(),this.dispatchEvent(new CustomEvent("input-change",{detail:this._value,bubbles:!0,composed:!0})),this._value!==s&&this.dispatchEvent(new CustomEvent("value-change",{detail:this._value,bubbles:!0,composed:!0})),!this._dateInvalid&&this._value!==s&&this.dispatchEvent(new CustomEvent("change",{detail:this._value,bubbles:!0,composed:!0}))}_handleFocus(e){e.stopPropagation(),this._focused=!0,this.dispatchEvent(new FocusEvent("focus",{bubbles:!0,composed:!0}))}_handleBlur(e){e.stopPropagation(),this._focused=!1,this._update(),!this._dateInvalid&&this._swimInput&&this._swimInput.value!==this._displayValue&&(this._swimInput.value=this._displayValue),this.dispatchEvent(new FocusEvent("blur",{bubbles:!0,composed:!0}))}_handleKeyDown(e){e.code==="ArrowDown"?(e.preventDefault(),this._openPicker()):e.code==="Escape"&&e.stopPropagation()}_openPicker(){var e,t;if(!this.disabled)try{(e=this._nativePicker)==null||e.showPicker()}catch{(t=this._nativePicker)==null||t.click()}}_handleNativeChange(e){e.stopPropagation();const o=e.target.value;if(!o)return;const i=new Date(this._nativeInputType==="time"?`1970-01-01T${o}`:o);if(U(i)){if(this._effectiveInputType===N.time&&this._value instanceof Date){const s=new Date(this._value);s.setHours(i.getHours(),i.getMinutes(),i.getSeconds()),this.value=s}else this.value=i;this._update(),this.dispatchEvent(new CustomEvent("change",{detail:this._value,bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("date-time-selected",{detail:this._value,bubbles:!0,composed:!0}))}}_update(){const e=this._value,t=e instanceof Date&&U(e);if(this._dateInvalid=!!e&&!t,this._displayValue=e?String(e):"",this._dateOutOfRange=!1,!t)return;const o=Cs(this.timezone);this._displayValue=Nl(e,this._effectiveFormat,o),this._dateOutOfRange=Kn(e,this.minDate,this.maxDate)}_validate(){let e={},t="";this._required&&!this._value?(e={valueMissing:!0},t="A value is required."):this._dateInvalid?(e={typeMismatch:!0},t="Invalid date."):this._dateOutOfRange&&(e={rangeOverflow:!0},t="Date is out of the allowed range."),t?this._internals.setValidity(e,t):this._internals.setValidity({})}_updateFormValue(){if(!this._internals)return;const e=this._value;e instanceof Date&&U(e)?this._internals.setFormValue(e.toISOString()):this._internals.setFormValue(String(e??"")),this._validate()}formResetCallback(){this._value=null,this._displayValue="",this._dateInvalid=!1,this._dateOutOfRange=!1,this._internals.setFormValue(""),this._internals.setValidity({}),this.requestUpdate()}formDisabledCallback(e){this.disabled=e}};di.styles=[x,Ol],di.formAssociated=!0;let k=di;S([$(".swim-date-time__native-picker")],k.prototype,"_nativePicker",2);S([$("swim-input")],k.prototype,"_swimInput",2);S([a({type:String})],k.prototype,"id",2);S([a({type:String})],k.prototype,"name",2);S([a({type:String})],k.prototype,"label",2);S([a({type:String})],k.prototype,"hint",2);S([a({type:String})],k.prototype,"placeholder",2);S([a({type:String,reflect:!0})],k.prototype,"size",2);S([a({type:String,reflect:!0})],k.prototype,"appearance",2);S([a({type:Boolean,reflect:!0})],k.prototype,"disabled",1);S([a({type:Boolean,reflect:!0})],k.prototype,"required",1);S([a({type:String,attribute:"required-indicator"})],k.prototype,"requiredIndicator",2);S([a({type:Boolean})],k.prototype,"autofocus",1);S([a({type:Boolean,reflect:!0})],k.prototype,"autosize",1);S([a({type:Number,attribute:"min-width"})],k.prototype,"minWidth",1);S([a({type:Number})],k.prototype,"tabindex",2);S([a({type:String,attribute:"input-type"})],k.prototype,"inputType",1);S([a({type:String})],k.prototype,"precision",2);S([a({type:String})],k.prototype,"timezone",2);S([a({type:String,attribute:"display-mode"})],k.prototype,"displayMode",1);S([a({type:String})],k.prototype,"format",2);S([a({type:Boolean,reflect:!0})],k.prototype,"marginless",1);S([a({attribute:"min-date"})],k.prototype,"minDate",2);S([a({attribute:"max-date"})],k.prototype,"maxDate",2);S([a({attribute:!1})],k.prototype,"value",1);S([v()],k.prototype,"_displayValue",2);S([v()],k.prototype,"_dateInvalid",2);S([v()],k.prototype,"_dateOutOfRange",2);S([v()],k.prototype,"_focused",2);customElements.get(jn)||customElements.define(jn,k);const Jl=[x,ct,f`
    :host {
      --swim-drawer-bg: var(--grey-800);
      display: block;
      box-sizing: border-box;
    }

    /* Root drawer: host is a full-viewport overlay wrapper */
    :host(.swim-drawer--root) {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: var(--swim-drawer-z, 998);
    }

    :host(.swim-drawer--root) .swim-drawer__backdrop {
      position: absolute;
      inset: 0;
      background-color: var(--black);
      opacity: 0;
      pointer-events: auto;
      transition: opacity 0.15s ease-out;
    }

    :host(.swim-drawer--root.swim-drawer--open) .swim-drawer__backdrop,
    :host(.swim-drawer--root.swim-drawer--closing) .swim-drawer__backdrop {
      opacity: 0.8;
    }

    /* Non-root: host is the panel container (position relative from parent) */
    :host(.swim-drawer--contained) {
      display: block;
      position: absolute;
      inset: 0;
      pointer-events: none;
    }

    /* Panel: the sliding drawer */
    .swim-drawer__panel {
      display: block;
      overflow-y: auto;
      overflow-x: hidden;
      text-align: left;
      background: var(--swim-drawer-bg);
      transition: transform 150ms ease-out;
      box-sizing: border-box;
      pointer-events: auto;
    }

    /* Left drawer: slides in from the left edge */
    :host(.swim-drawer--left) .swim-drawer__panel {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      min-width: 200px;
      width: 100%;
    }

    :host(.swim-drawer--left:not(.swim-drawer--open):not(.swim-drawer--closing)) .swim-drawer__panel {
      transform: translateX(-100%);
    }

    :host(.swim-drawer--left.swim-drawer--open) .swim-drawer__panel {
      transform: translateX(0);
    }

    :host(.swim-drawer--left.swim-drawer--closing) .swim-drawer__panel {
      transform: translateX(-100%);
    }

    /* Right drawer: slides in from the right edge */
    :host(.swim-drawer--right) .swim-drawer__panel {
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
      min-width: 200px;
      width: 100%;
    }

    :host(.swim-drawer--right:not(.swim-drawer--open):not(.swim-drawer--closing)) .swim-drawer__panel {
      transform: translateX(100%);
    }

    :host(.swim-drawer--right.swim-drawer--open) .swim-drawer__panel {
      transform: translateX(0);
    }

    :host(.swim-drawer--right.swim-drawer--closing) .swim-drawer__panel {
      transform: translateX(100%);
    }

    /* Bottom drawer: slides in from bottom */
    :host(.swim-drawer--bottom) .swim-drawer__panel {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      min-height: 150px;
      height: 100%;
    }

    :host(.swim-drawer--bottom:not(.swim-drawer--open):not(.swim-drawer--closing)) .swim-drawer__panel {
      transform: translateY(100%);
    }

    :host(.swim-drawer--bottom.swim-drawer--open) .swim-drawer__panel {
      transform: translateY(0);
    }

    :host(.swim-drawer--bottom.swim-drawer--closing) .swim-drawer__panel {
      transform: translateY(100%);
    }

    .swim-drawer__content {
      height: 100%;
      overflow: auto;
      padding: var(--spacing-16);
    }

    /* Focus visible for accessibility */
    .swim-drawer__panel:focus-visible {
      outline: 2px solid var(--blue-500);
      outline-offset: 2px;
    }
  `];var kt=(n=>(n.Left="left",n.Right="right",n.Bottom="bottom",n))(kt||{}),Kl=Object.defineProperty,jl=Object.getOwnPropertyDescriptor,xe=(n,e,t,o)=>{for(var i=o>1?void 0:o?jl(e,t):e,s=n.length-1,r;s>=0;s--)(r=n[s])&&(i=(o?r(e,t,i):r(i))||i);return o&&i&&Kl(e,t,i),i};const Qn="swim-drawer",bo=class bo extends _{constructor(){super(...arguments),this.cssClass="",this.direction=kt.Left,this._size=80,this._zIndex=998,this._closeOnOutsideClick=!0,this._isRoot=!0,this._open=!1,this._closing=!1,this._contentId=`swim-drawer-content-${Math.random().toString(36).slice(2,11)}`,this._previousActiveElement=null,this._backdropClickBound=()=>this._onBackdropClick(),this._keydownBound=e=>this._onKeydown(e),this._portalTarget=null}get size(){return this._size}set size(e){this._size=A(e,80)}get zIndex(){return this._zIndex}set zIndex(e){this._zIndex=A(e,998)}get closeOnOutsideClick(){return this._closeOnOutsideClick}set closeOnOutsideClick(e){this._closeOnOutsideClick=p(e)}get isRoot(){return this._isRoot}set isRoot(e){this._isRoot=p(e)}get open(){return this._open}set open(e){const t=p(e);this._open!==t&&(this._open=t,this.requestUpdate(),t?this._previousActiveElement=typeof document<"u"?document.activeElement:null:this._restoreFocus())}get _isLeft(){return this.direction===kt.Left||this.direction==="left"}get _isRight(){return this.direction===kt.Right||this.direction==="right"}get _isBottom(){return this.direction===kt.Bottom||this.direction==="bottom"}get _widthSize(){return(this._isLeft||this._isRight)&&this.size?`${this.size}%`:"100%"}get _heightSize(){return this._isBottom&&this.size?`${this.size}%`:"100%"}get _isVisible(){return this.open||this._closing}_restoreFocus(){this._previousActiveElement&&typeof this._previousActiveElement.focus=="function"&&this._previousActiveElement.focus(),this._previousActiveElement=null}_emitClose(){this.dispatchEvent(new CustomEvent("close",{detail:!0,bubbles:!0}))}_onBackdropClick(){this.closeOnOutsideClick&&this.isRoot&&this.hide()}_onKeydown(e){e.key==="Escape"&&this.open&&(e.preventDefault(),this.hide())}show(){this.isRoot&&this.parentElement&&this.parentElement!==document.body&&(this._portalTarget=this.parentElement,document.body.appendChild(this)),this.open=!0}hide(){this._closing||!this.open||(this._closing=!0,this._clearCloseTimeout(),this._closeTimeout=window.setTimeout(()=>{this._closeTimeout=void 0,this._closing=!1,this.open=!1,this._portalTarget&&this._portalTarget.isConnected&&this.parentElement===document.body&&this._portalTarget.appendChild(this),this._portalTarget=null,this._emitClose()},150))}connectedCallback(){super.connectedCallback(),document.addEventListener("keydown",this._keydownBound)}disconnectedCallback(){document.removeEventListener("keydown",this._keydownBound),this._clearCloseTimeout(),super.disconnectedCallback()}_clearCloseTimeout(){this._closeTimeout!==void 0&&(clearTimeout(this._closeTimeout),this._closeTimeout=void 0)}willUpdate(){const t=["swim-drawer",this._isLeft?"swim-drawer--left":this._isRight?"swim-drawer--right":"swim-drawer--bottom",this.isRoot?"swim-drawer--root":"swim-drawer--contained"];this.open&&!this._closing&&t.push("swim-drawer--open"),this._closing&&t.push("swim-drawer--closing"),this.cssClass&&t.push(...this.cssClass.trim().split(/\s+/).filter(Boolean)),this.className=t.join(" "),this.isRoot&&this.style.setProperty("--swim-drawer-z",String(this.zIndex))}firstUpdated(){this.open&&this._contentEl&&this._contentEl.focus({preventScroll:!0})}updated(e){e.has("open")&&this.open&&this._contentEl&&requestAnimationFrame(()=>{var t;(t=this._contentEl)==null||t.focus({preventScroll:!0})})}render(){return this._isVisible?d`
      ${this.isRoot?d` <div class="swim-drawer__backdrop" aria-hidden="true" @click="${this._backdropClickBound}"></div> `:u}
      <div
        class="swim-drawer__panel swim-scroll"
        style="width: ${this._widthSize}; height: ${this._heightSize}; z-index: ${this.zIndex};"
      >
        <div
          part="content"
          class="swim-drawer__content swim-scroll ${this.cssClass}"
          tabindex="-1"
          role="dialog"
          aria-modal="true"
          id="${this._contentId}"
        >
          <slot></slot>
        </div>
      </div>
    `:u}};bo.styles=Jl;let X=bo;xe([a({type:String,attribute:"css-class"})],X.prototype,"cssClass",2);xe([a({type:String,reflect:!0})],X.prototype,"direction",2);xe([a({type:Number})],X.prototype,"size",1);xe([a({type:Number})],X.prototype,"zIndex",1);xe([a({type:Boolean,attribute:"close-on-outside-click",reflect:!0})],X.prototype,"closeOnOutsideClick",1);xe([a({type:Boolean,attribute:"is-root",reflect:!0})],X.prototype,"isRoot",1);xe([a({type:Boolean,reflect:!0})],X.prototype,"open",1);xe([v()],X.prototype,"_closing",2);xe([v()],X.prototype,"_contentId",2);xe([$(".swim-drawer__content")],X.prototype,"_contentEl",2);customElements.get(Qn)||customElements.define(Qn,X);const Ql=["3d-rotate","action","action-close","action-maximize","action-maximize-inverse","action-minimize","action-outline","action-outline-small","add-circle","add-circle-filled","add-circle-medium","add-circle-thin","add-edge","add-new","add-node","advanced-pie","alert","app-store","app-workspaces","applet","applets","application","apps","area-chart","arrow-bold-circle-left","arrow-bold-circle-right","arrow-bold-down","arrow-bold-left","arrow-bold-right","arrow-bold-up","arrow-down","arrow-input","arrow-output","arrow-right","arrow-right-down-medium","arrow-right-medium","arrow-tail-left","arrow-tail-right","arrow-tail-solid-left","arrow-tail-solid-right","arrow-tail-subright","arrow-up","asset-outline","asset-outline-small","assets","attachment","automation","automation-alternate","back-arrow","back-arrow-filled","bars","bell","bell-alarm","bold","bolt","branch-node","branch-node-vert","broom","browser-size","bug","builder","builder-outline","button-push-outline","button-push-outline-large","button-push-outline-small","calendar","calendar-clock","calender-clock","cards","center-align","chart-area","chart-bar-bar","chart-bubble","chart-donut","chart-full-stacked-area","chart-heat","chart-horz-full-stack-bar","chart-number-card","chart-pie","chart-pie-grid","chart-scatter","chart-spider","chart-stacked-area","chart-vert-bar","chart-vert-bar2","chart-vert-stacked-bar","check","check-filled","check-filled-sm","check-square-filled","checklist","chevron-bold-down","chevron-bold-left","chevron-bold-right","chevron-bold-up","circle","circle-filled","circles","circuit-board","clipboard","clock","cloud-download","cloud-upload","code","cog","collapse","commandline","comments","component","component-create","condition","copy","copy-app","copy-filled","credit-card","dashboard","dashboard-outline","database","debug","devil","disable","document","documentation","domain","dots-horz","dots-vert","dots-vert-round","double-down","double-left","double-right","double-up","downgrade","downgrade-horizontal","download-outline","download-outline-large","download-outline-small","drag","edit","edit-app","edit-outline","edit-outline-large","edit-outline-small","email","enrich-small","escalate","events-outline","events-outline-small","expand","explore","export","export-filled","export-outline","export-outline-large","export-outline-small","eye","eye-disabled","eye-hidden","field-created-by","field-created-date","field-date","field-double-select","field-dynamic","field-edited-by","field-edited-date","field-grid","field-html","field-json","field-list","field-list-small","field-lists","field-multiselect","field-number","field-numeric","field-richtext","field-single-select","field-singleline","field-text","field-textarea","field-textual","field-users","filter","filter-bar","find-page","flame","folder","folder-closed-small","folder-open-small","folders","font","format-indent-decrease","format-indent-increase","formula","forward-arrow","forward-arrow-filled","full-align","gauge","gear","gear-small","gear-square","globe","graph","graph-alt1","grid-view","hand","handle","heat","helper","history","horz-bar-graph-grouped","horz-stacked-bar","html-code","icon-chart-bar-horizontal","icon-chart-horz-bar","import-outline","import-outline-large","import-outline-small","info-filled","info-filled-2","info-filled-small","ingest-small","inspect","integration","integrations","ip","italic","key","key-outline","key-outline-small","keyboard","keyboard-return","layer","left-align","library","line-chart","line-graph","linear-gauge","link","list","list-1","list-view","loading","locate-filled","locate-outline","locate-outline-large","location","lock","lock-sm","mail","mail-1","map","marketplace","menu","mfa","mic","minus","money","mouse-hold","multi-line","new-app","notation-arrow-down-left","notation-arrow-up","numbered-list","open","orchestration","paragraph","pause","pause-circle","percent-gauge","phone","photo","pie-chart","pin","plane","play","play-circle","playbook-outline","playbook-outline-small","plugin","plugin-outline","plugin-outline-small","plus","plus-bold","prev","printer","profile","profile-filled","promote","promote-horizontal","question","question-filled","question-filled-sm","radio-button","redo","redo-all","reference","reference-grid","reference-multi","reference-single","reference-tree","refresh","refresh-circle","refresh-small","remove","remove-edge","remove-node","remove-users","repeat","replace","reports","reports-outline","resize","right-align","rocket","rotate","rule-outline","runner","runs-outline","runs-outline-small","sankey","save","save-outline","save-outline-large","save-outline-small","screen","screen-1","search","section","select-all","select-user","select-users","sensor-outline","sensor-outline-small","server","shield","shrink","skip","slide-left","slide-right","sliders","smartphone","smiley-frown","snapshot","solution","sort-ascending","sort-descending","spaces","spaces-list","spaces-outline","spaces-outline-large","speedometer","split-handle","square","square-filled","star","star-filled","stars","stopwatch","superscript","swap","switch","system-diagnostics","system-diagnostics-2","table","tabs","tag-filled","tags-outline","target","task-outline","thumb-down-filled","thumb-down-outline","thumb-down-outline-large","thumb-up-filled","thumb-up-outline","thumb-up-outline-large","tracking-id","transfer","trash","tree","tree-collapse","tree-expand","trend-down","trend-level","trend-up","trending","underline","undo","undo-all","unlink","upload-outline","upload-outline-large","upload-outline-small","user","user-add","user-circle","user-groups","users","version","vert-bar-graph-grouped","vert-full-stack-bar","view-code","view-designer","view-split","wand","warning-filled","warning-filled-sm","warning-thin","web-api","webhook-outline","webhook-outline-large","webhook-outline-small","widget","worker","workflow","workflow-alternate","workflow-alternate-large","workflow-alternate-small","workspaces","workstation","wrench","x","x-filled","x-small"];function Zn(n){return new Promise(e=>setTimeout(e,n))}function Zl(n){return new Promise((e,t)=>setTimeout(()=>t(new Error("Failed")),n))}const ie=[{type:"Malware",date:"1/1/2025",origin:"China"},{type:"DDOS",date:"1/5/2025",origin:"China"},{type:"DDOS",date:"1/5/2025",origin:"Russia"},{type:"XSS",date:"1/6/2025",origin:"North Korea"},{type:"DDOS",date:"1/6/2025",origin:"North Korea"},{type:"Ransomware",date:"1/8/2025",origin:"China"},{type:"DDOS",date:"1/9/2025",origin:"China"},{type:"SQL injection",date:"1/10/2025",origin:"North Korea"},{type:"Malware",date:"1/11/2025",origin:"Russia"},{type:"DDOS",date:"1/11/2025",origin:"Russia"}],_t=["Attack Type","Date of Attack","Origin of Attack"],wt=["type","date","origin"],Xl=[{type:"Malware",date:"1/1/2025",origin:"China",status:"error"},{type:"DDOS",date:"1/5/2025",origin:"China",status:"warning"},{type:"DDOS",date:"1/5/2025",origin:"Russia",status:"warning"},{type:"XSS",date:"1/6/2025",origin:"North Korea",status:"success"},{type:"DDOS",date:"1/6/2025",origin:"North Korea",status:"warning"},{type:"Ransomware",date:"1/8/2025",origin:"China",status:"error"},{type:"DDOS",date:"1/9/2025",origin:"China",status:"warning"},{type:"SQL injection",date:"1/10/2025",origin:"North Korea",status:"success"},{type:"Malware",date:"1/11/2025",origin:"Russia",status:"error"},{type:"XSS",date:"1/11/2025",origin:"Russia",status:"success"}],Xn=[...ie,...ie,...ie,...ie,...ie,...ie,...ie,...ie,...ie],Es=["buttons","input","select","checkbox","radio","toggle","slider","tabs","button-group","button-toggle","card","progress-spinner","section","split","navbar","tooltip","list","dialog","scrollbars","icons"],As=new Set(Es),ec=Es[0],es=new Map;async function tc(n){const e=es.get(n);if(e)return e;const t=await fetch(`/lit-ui/sections/${n}.html`);if(!t.ok)throw new Error(`Failed to load section: ${n}`);const o=await t.text();return es.set(n,o),o}function Ei(){const n=window.location.hash.slice(1).toLowerCase();return As.has(n)?n:ec}async function Ai(n){const e=document.getElementById("page-sections");if(e)try{const t=await tc(n);e.innerHTML=t,sc()}catch(t){console.error("Failed to load section:",n,t),e.innerHTML=`<p class="section-desc">Failed to load section: ${n}</p>`}}function ic(){const n=document.getElementById("iconsPreview");if(!n)return;for(const t of Ql){const o=document.createElement("li");o.dataset.iconName=t;const i=document.createElement("swim-icon");i.setAttribute("font-icon",t);const s=document.createElement("span");s.className="icon-name",s.textContent=`ngx-icon ngx-${t}`,o.appendChild(i),o.appendChild(s),n.appendChild(o)}const e=document.getElementById("iconSearch");e&&(e.addEventListener("input",()=>{const t=e.value.trim().toLowerCase();n.querySelectorAll("li").forEach(o=>{const i=(o.dataset.iconName??"").toLowerCase();o.classList.toggle("icon-search-hidden",t.length>0&&!i.includes(t))})}),e.addEventListener("keydown",t=>{t.key==="Escape"&&(e.value="",n.querySelectorAll("li").forEach(o=>o.classList.remove("icon-search-hidden")),e.blur())}))}function oc(){const n=[{name:"Breach",value:"breach"},{name:"DDOS",value:"ddos"},{name:"Physical",value:"physical"}],e=[{name:"Apple",value:"apple"},{name:"Banana",value:"banana"},{name:"Orange",value:"orange"},{name:"Grape",value:"grape"},{name:"Mango",value:"mango"},{name:"Pineapple",value:"pineapple"},{name:"Strawberry",value:"strawberry"},{name:"Watermelon",value:"watermelon"}],t=document.getElementById("basicSelect");t&&(t.options=n);const o=document.getElementById("requiredSelect");o&&(o.options=n);const i=document.getElementById("legacySelect");i&&(i.options=e);const s=document.getElementById("fillSelect");s&&(s.options=e);const r=document.getElementById("smallSelect");r&&(r.options=e);const l=document.getElementById("mediumSelect");l&&(l.options=e);const c=document.getElementById("largeSelect");c&&(c.options=e);const h=[{name:"Red",value:"red"},{name:"Blue",value:"blue"},{name:"Green",value:"green"},{name:"Yellow",value:"yellow"},{name:"Purple",value:"purple"},{name:"Orange",value:"orange"},{name:"Pink",value:"pink"},{name:"Brown",value:"brown"}],w=document.getElementById("multiSelect");w&&(w.options=h);const g=[{name:"United States",value:"us"},{name:"United Kingdom",value:"uk"},{name:"Canada",value:"ca"},{name:"Australia",value:"au"},{name:"Germany",value:"de"},{name:"France",value:"fr"},{name:"Italy",value:"it"},{name:"Spain",value:"es"},{name:"Japan",value:"jp"},{name:"China",value:"cn"},{name:"India",value:"in"},{name:"Brazil",value:"br"},{name:"Mexico",value:"mx"},{name:"Argentina",value:"ar"},{name:"South Africa",value:"za"}],m=document.getElementById("filterableSelect");m&&(m.options=g);const b=document.getElementById("noFilterSelect");b&&(b.options=e);const I=document.getElementById("normalSelect");I&&(I.options=e);const z=document.getElementById("withValueSelect");z&&(z.options=[{name:"Option 1",value:"option1"},{name:"Option 2",value:"option2"},{name:"Option 3",value:"option3"}]);const te=document.getElementById("disabledSelect");te&&(te.options=e,te.value="apple");const he=document.getElementById("noClearSelect");he&&(he.options=e);const ae=[{name:"Technology",value:"tech"},{name:"Business",value:"business"},{name:"Science",value:"science"},{name:"Arts",value:"arts"},{name:"Sports",value:"sports"}],Je=document.getElementById("formSelect1");Je&&(Je.options=ae);const Ke=[{name:"Important",value:"important"},{name:"Urgent",value:"urgent"},{name:"Featured",value:"featured"},{name:"Archive",value:"archive"},{name:"Review",value:"review"}],pt=document.getElementById("formSelect2");pt&&(pt.options=Ke)}function nc(){const n=document.getElementById("listBasic");n&&(n.dataSource=ie,n.headerLabels=_t,n.columns=wt,n.defaultRowStatus="error");const e=document.getElementById("listColumnLayout");e&&(e.dataSource=ie,e.headerLabels=_t,e.columns=wt,e.columnLayout="3fr 2fr 1fr",e.defaultRowStatus="error");const t=document.getElementById("listPagination"),o=document.getElementById("listPaginationPage");t&&(t.dataSource=Xn,t.headerLabels=_t,t.columns=wt,t.columnLayout="1fr 1fr 1fr",t.height=400,t.paginationConfig={pageSize:10},t.defaultRowStatus="error",t.addEventListener("page-change",c=>{o&&(o.textContent=String(c.detail??1))}),o&&(o.textContent="1"));const i=document.getElementById("listPaginationPage5"),s=document.getElementById("listPaginationPage5Value");i&&(i.dataSource=Xn,i.headerLabels=["No.","Attack Type","Date of Attack","Origin of Attack"],i.columns=["$index","type","date","origin"],i.columnLayout="5rem 1fr 1fr 1fr",i.height=400,i.paginationConfig={index:5,pageSize:10},i.defaultRowStatus="error",i.addEventListener("page-change",c=>{s&&(s.textContent=String(c.detail??5))}),s&&(s.textContent="5"));const r=document.getElementById("listWithStatus");r&&(r.dataSource=Xl,r.headerLabels=_t,r.columns=wt);const l=document.getElementById("listNoStatus");l&&(l.dataSource=ie,l.headerLabels=_t,l.columns=wt,l.defaultRowStatus="error")}function sc(){const n=document.getElementById("successBtn");n&&n.addEventListener("click",()=>{n.promise=Zn(1e3)});const e=document.getElementById("failBtn");e&&e.addEventListener("click",()=>{e.promise=Zl(1e3)});const t=document.getElementById("slowBtn");t&&t.addEventListener("click",()=>{t.promise=Zn(5e3)});const o=document.getElementById("demoForm");if(o){const B=o.querySelector('swim-button[type="submit"]'),O=o.querySelector('swim-button[type="reset"]');B&&B.addEventListener("click",H=>{H.preventDefault(),o.requestSubmit()}),O&&O.addEventListener("click",H=>{H.preventDefault(),o.reset()}),o.addEventListener("submit",H=>{H.preventDefault();const V=document.getElementById("nameInput"),ye=document.getElementById("emailInput"),le=document.getElementById("ageInput"),Qe=(V==null?void 0:V.value)??"",Ze=(ye==null?void 0:ye.value)??"",Gt=(le==null?void 0:le.value)??"";console.log("Form submitted!",{name:Qe,email:Ze,age:Gt}),alert(`Form submitted!
Name: ${Qe}
Email: ${Ze}
Age: ${Gt}`)})}oc();const i=document.getElementById("selectableCardDemo"),s=document.getElementById("cardSelectedValue");i&&s&&i.addEventListener("select",B=>{s.textContent=String(B.detail??!1)});const r=document.getElementById("outlineCardDemo");r&&r.addEventListener("outline-click",()=>console.log("Outline clicked"));const l=document.getElementById("checkboxDemoEvent"),c=document.getElementById("checkboxDemoChecked"),h=document.getElementById("checkboxDemoEventName");l&&c&&h&&(l.addEventListener("checked-change",B=>{c.textContent=String(B.detail),h.textContent="checked-change"}),l.addEventListener("change",()=>{h.textContent="change"}),l.addEventListener("focus",()=>{h.textContent="focus"}),l.addEventListener("blur",()=>{h.textContent="blur"}),c.textContent=String(l.checked));const w=document.getElementById("radioSingleValue"),g=["radioSeasonSpring","radioSeasonSummer","radioSeasonFall","radioSeasonWinter"];g.forEach(B=>{const O=document.getElementById(B);O&&w&&O.addEventListener("change",H=>{const V=H.detail;g.forEach(ye=>{const le=document.getElementById(ye);le&&(le.checked=le.value===V)}),w.textContent=String(V??"")})});const m=document.getElementById("radioGroupDemo"),b=document.getElementById("radioGroupValue");m&&b&&(b.textContent=String(m.value??"—"),m.addEventListener("change",B=>{b.textContent=String(B.detail??"—")}));const I=document.getElementById("progressSpinnerWithLabel");I&&(I.spinnerLabel={inProgressLabel:"Loading...",completeLabel:"Complete!",failLabel:"Failed"});const z=document.getElementById("progressSpinnerConfigurable"),te=document.getElementById("progressSpinnerConfigurableCode"),he=["progressSpinnerValue","progressSpinnerTotal","progressSpinnerDiameter","progressSpinnerStrokeWidth","progressSpinnerColor","progressSpinnerMode","progressSpinnerCompleteStatus","progressSpinnerShowIcon"];function ae(){var qo;if(!z)return;const B=document.getElementById("progressSpinnerValue"),O=document.getElementById("progressSpinnerTotal"),H=document.getElementById("progressSpinnerDiameter"),V=document.getElementById("progressSpinnerStrokeWidth"),ye=document.getElementById("progressSpinnerColor"),le=document.getElementById("progressSpinnerMode"),Qe=document.getElementById("progressSpinnerCompleteStatus"),Ze=document.getElementById("progressSpinnerShowIcon"),Gt=(B==null?void 0:B.value)??"35",vi=(O==null?void 0:O.value)??"100",Lo=(H==null?void 0:H.value)??"100",Oo=(V==null?void 0:V.value)??"5",Do=(ye==null?void 0:ye.value)??"lime",Mo=(le==null?void 0:le.value)??"indeterminate",Ut=(Qe==null?void 0:Qe.value)??"success",Po=(Ze==null?void 0:Ze.checked)!==!1,Fo=Ut==="fail"||Ut==="success"?vi:Gt;if(z.value=Number(Fo),z.total=Number(vi),z.diameter=Number(Lo),z.strokeWidth=Number(Oo),z.color=Do,z.setAttribute("mode",Mo),z.isFailure=Ut==="fail",z.appearance=Po?"icon":"default",(qo=z.requestUpdate)==null||qo.call(z),te){const Ss=Ut==="fail"?`
  is-failure`:"";te.textContent=`<swim-progress-spinner
  mode="${Mo}"
  value="${Fo}"
  total="${vi}"
  diameter="${Lo}"
  stroke-width="${Oo}"
  color="${Do}"
  appearance="${Po?"icon":"default"}"${Ss}
  aria-label="...">
</swim-progress-spinner>`}}if(z){const B=document.getElementById("progressSpinnerMode");B&&B.addEventListener("change",()=>setTimeout(ae,0)),he.forEach(H=>{const V=document.getElementById(H);V&&V!==B&&(V.addEventListener("input",ae),V.addEventListener("change",ae))}),B&&B.addEventListener("input",ae);const O=document.getElementById("progressSpinnerShowIcon");O&&O.addEventListener("change",ae),ae()}const Je=document.getElementById("sliderDemoEvent"),Ke=document.getElementById("sliderDemoValue"),pt=document.getElementById("sliderDemoPercent");Je&&Ke&&pt&&Je.addEventListener("change",B=>{const O=B.detail;Ke.textContent=String((O==null?void 0:O.value)??""),pt.textContent=String((O==null?void 0:O.percent)??"")});const je=document.getElementById("toggleDemoEvent"),mi=document.getElementById("toggleDemoChecked"),Dt=document.getElementById("toggleDemoEventName");je&&mi&&Dt&&(je.addEventListener("change",()=>{mi.textContent=String(je.checked),Dt.textContent="change"}),je.addEventListener("focus",()=>{Dt.textContent="focus"}),je.addEventListener("blur",()=>{Dt.textContent="blur"}),mi.textContent=String(je.checked));const fo=document.getElementById("seasonToggleGroup"),vo=document.getElementById("seasonValue");fo&&vo&&fo.addEventListener("value-change",B=>{vo.textContent=String(B.detail??"")});const Mt=document.getElementById("disabledGroupDemo"),bi=document.getElementById("toggleGroupDisabledBtn");Mt&&bi&&bi.addEventListener("click",()=>{Mt.disabled=!Mt.disabled,bi.textContent=Mt.disabled?"Enable group":"Disable group"}),ic(),nc();const _o=document.getElementById("dialogContentOpen"),Pt=document.getElementById("dialogContentDemo");_o&&Pt&&(_o.addEventListener("click",()=>{Pt.visible=!0}),Pt.addEventListener("close",()=>{Pt.visible=!1}));const wo=document.getElementById("dialogComponentToggle"),gt=document.getElementById("dialogComponentDemo");wo&&gt&&(wo.addEventListener("click",()=>{gt.visible=!gt.visible}),gt.addEventListener("close",()=>{gt.visible=!1}));const xo=document.getElementById("dialogWizardOpen"),Ft=document.getElementById("dialogWizardDemo");xo&&Ft&&(xo.addEventListener("click",()=>{Ft.visible=!0}),Ft.addEventListener("close",()=>{Ft.visible=!1}));const Be=document.getElementById("dialogWizardTabs"),yo=document.getElementById("dialogWizardPrev"),ko=document.getElementById("dialogWizardNext");yo&&(Be!=null&&Be.prev)&&yo.addEventListener("click",()=>Be.prev()),ko&&(Be!=null&&Be.next)&&ko.addEventListener("click",()=>Be.next());const Co=document.getElementById("dialogFullScreenOpen"),qt=document.getElementById("dialogFullScreenDemo");Co&&qt&&(Co.addEventListener("click",()=>{qt.visible=!0}),qt.addEventListener("close",()=>{qt.visible=!1}));const Eo=document.getElementById("dialogLargeFormatOpen"),$t=document.getElementById("dialogLargeFormatDemo");Eo&&$t&&(Eo.addEventListener("click",()=>{$t.visible=!0}),$t.addEventListener("close-or-cancel",()=>{$t.visible=!1}));const Ao=document.getElementById("dialogMediumFormatOpen"),Rt=document.getElementById("dialogMediumFormatDemo");Ao&&Rt&&(Ao.addEventListener("click",()=>{Rt.visible=!0}),Rt.addEventListener("close-or-cancel",()=>{Rt.visible=!1}));const So=document.getElementById("dialogMediumContentOpen"),Ht=document.getElementById("dialogMediumContentDemo");So&&Ht&&(So.addEventListener("click",()=>{Ht.visible=!0}),Ht.addEventListener("close-or-cancel",()=>{Ht.visible=!1}));const Io=document.getElementById("dialogMediumFooterOpen"),Vt=document.getElementById("dialogMediumFooterDemo");Io&&Vt&&(Io.addEventListener("click",()=>{Vt.visible=!0}),Vt.addEventListener("close-or-cancel",()=>{Vt.visible=!1}));const zo=document.getElementById("dialogMediumFooterContentOpen"),Nt=document.getElementById("dialogMediumFooterContentDemo");zo&&Nt&&(zo.addEventListener("click",()=>{Nt.visible=!0}),Nt.addEventListener("close-or-cancel",()=>{Nt.visible=!1}));const To=document.getElementById("navbarGoToFourthBtn"),fi=document.getElementById("navbarTopDemo");To&&fi&&"goTo"in fi&&To.addEventListener("click",()=>fi.goTo(3));const Bo=document.getElementById("selectForm");Bo&&Bo.addEventListener("submit",B=>{B.preventDefault();const O=document.getElementById("formSelect1"),H=document.getElementById("formSelect2");console.log("Select Form submitted!"),alert(`Form submitted!
Category: ${O.value}
Tags: ${JSON.stringify(H.value)}`)})}async function rc(){document.querySelectorAll('.sub-nav-item[href^="#"]').forEach(r=>{r.addEventListener("click",l=>{const c=r.getAttribute("href");if(!c||c==="#")return;const h=c.slice(1).toLowerCase();As.has(h)&&(l.preventDefault(),window.location.hash!==c?window.location.hash=h:Ai(h))})}),window.addEventListener("hashchange",()=>{const r=Ei();n(r),Ai(r)});function n(r){const l=r??Ei();document.querySelectorAll(".sub-nav-item.active, .nav-item.active").forEach(c=>c.classList.remove("active")),document.querySelectorAll(`.sub-nav-item[href="#${l}"], .nav-item[href="#${l}"]`).forEach(c=>c.classList.add("active"))}const e=Ei();window.location.hash.slice(1).toLowerCase()!==e&&history.replaceState(null,"",`#${e}`),n(e),await Ai(e);const t=document.getElementById("navSearch"),o=document.querySelectorAll(".nav-item-container"),i=document.querySelectorAll(".sub-nav-item");function s(){if(!t)return;const r=t.value.trim().toLowerCase();i.forEach(l=>{var h;const c=((h=l.textContent)==null?void 0:h.trim().toLowerCase())??"";l.classList.toggle("nav-search-hidden",r.length>0&&!c.includes(r))}),o.forEach(l=>{var b;const c=l.querySelector(".nav-item-label"),h=((b=c==null?void 0:c.textContent)==null?void 0:b.trim().toLowerCase())??"",w=l.querySelectorAll(".sub-nav-item:not(.nav-search-hidden)").length,g=r.length===0||h.includes(r),m=w>0;l.classList.toggle("nav-search-hidden",r.length>0&&!g&&!m)})}t&&(t.addEventListener("input",s),t.addEventListener("keydown",r=>{r.key==="Escape"&&(t.value="",s(),t.blur())})),console.log("✨ @swimlane/lit-ui demo loaded successfully!")}document.addEventListener("DOMContentLoaded",()=>{const n=ct.styleSheet;n&&(document.adoptedStyleSheets=[...document.adoptedStyleSheets,n]),rc()});
