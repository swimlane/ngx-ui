(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function t(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(o){if(o.ep)return;o.ep=!0;const n=t(o);fetch(o.href,n)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const mi=globalThis,go=mi.ShadowRoot&&(mi.ShadyCSS===void 0||mi.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,bo=Symbol(),Ms=new WeakMap;let or=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==bo)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(go&&e===void 0){const i=t!==void 0&&t.length===1;i&&(e=Ms.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&Ms.set(t,e))}return e}toString(){return this.cssText}};const sr=s=>new or(typeof s=="string"?s:s+"",void 0,bo),k=(s,...e)=>{const t=s.length===1?s[0]:e.reduce((i,o,n)=>i+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+s[n+1],s[0]);return new or(t,s,bo)},Ar=(s,e)=>{if(go)s.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const i=document.createElement("style"),o=mi.litNonce;o!==void 0&&i.setAttribute("nonce",o),i.textContent=t.cssText,s.appendChild(i)}},Os=go?s=>s:s=>s instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return sr(t)})(s):s;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:zr,defineProperty:Lr,getOwnPropertyDescriptor:Mr,getOwnPropertyNames:Or,getOwnPropertySymbols:Br,getPrototypeOf:Pr}=Object,Ke=globalThis,Bs=Ke.trustedTypes,Fr=Bs?Bs.emptyScript:"",Ki=Ke.reactiveElementPolyfillSupport,Ht=(s,e)=>s,wi={toAttribute(s,e){switch(e){case Boolean:s=s?Fr:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,e){let t=s;switch(e){case Boolean:t=s!==null;break;case Number:t=s===null?null:Number(s);break;case Object:case Array:try{t=JSON.parse(s)}catch{t=null}}return t}},_o=(s,e)=>!zr(s,e),Ps={attribute:!0,type:String,converter:wi,reflect:!1,useDefault:!1,hasChanged:_o};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),Ke.litPropertyMetadata??(Ke.litPropertyMetadata=new WeakMap);let gt=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=Ps){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),o=this.getPropertyDescriptor(e,i,t);o!==void 0&&Lr(this.prototype,e,o)}}static getPropertyDescriptor(e,t,i){const{get:o,set:n}=Mr(this.prototype,e)??{get(){return this[t]},set(r){this[t]=r}};return{get:o,set(r){const l=o==null?void 0:o.call(this);n==null||n.call(this,r),this.requestUpdate(e,l,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Ps}static _$Ei(){if(this.hasOwnProperty(Ht("elementProperties")))return;const e=Pr(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(Ht("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Ht("properties"))){const t=this.properties,i=[...Or(t),...Br(t)];for(const o of i)this.createProperty(o,t[o])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[i,o]of t)this.elementProperties.set(i,o)}this._$Eh=new Map;for(const[t,i]of this.elementProperties){const o=this._$Eu(t,i);o!==void 0&&this._$Eh.set(o,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const o of i)t.unshift(Os(o))}else e!==void 0&&t.push(Os(e));return t}static _$Eu(e,t){const i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ar(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var i;return(i=t.hostConnected)==null?void 0:i.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var i;return(i=t.hostDisconnected)==null?void 0:i.call(t)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){var n;const i=this.constructor.elementProperties.get(e),o=this.constructor._$Eu(e,i);if(o!==void 0&&i.reflect===!0){const r=(((n=i.converter)==null?void 0:n.toAttribute)!==void 0?i.converter:wi).toAttribute(t,i.type);this._$Em=e,r==null?this.removeAttribute(o):this.setAttribute(o,r),this._$Em=null}}_$AK(e,t){var n,r;const i=this.constructor,o=i._$Eh.get(e);if(o!==void 0&&this._$Em!==o){const l=i.getPropertyOptions(o),c=typeof l.converter=="function"?{fromAttribute:l.converter}:((n=l.converter)==null?void 0:n.fromAttribute)!==void 0?l.converter:wi;this._$Em=o;const d=c.fromAttribute(t,l.type);this[o]=d??((r=this._$Ej)==null?void 0:r.get(o))??d,this._$Em=null}}requestUpdate(e,t,i,o=!1,n){var r;if(e!==void 0){const l=this.constructor;if(o===!1&&(n=this[e]),i??(i=l.getPropertyOptions(e)),!((i.hasChanged??_o)(n,t)||i.useDefault&&i.reflect&&n===((r=this._$Ej)==null?void 0:r.get(e))&&!this.hasAttribute(l._$Eu(e,i))))return;this.C(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:o,wrapped:n},r){i&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,r??t??this[e]),n!==!0||r!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),o===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[n,r]of this._$Ep)this[n]=r;this._$Ep=void 0}const o=this.constructor.elementProperties;if(o.size>0)for(const[n,r]of o){const{wrapped:l}=r,c=this[n];l!==!0||this._$AL.has(n)||c===void 0||this.C(n,void 0,r,c)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(i=this._$EO)==null||i.forEach(o=>{var n;return(n=o.hostUpdate)==null?void 0:n.call(o)}),this.update(t)):this._$EM()}catch(o){throw e=!1,this._$EM(),o}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(i=>{var o;return(o=i.hostUpdated)==null?void 0:o.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};gt.elementStyles=[],gt.shadowRootOptions={mode:"open"},gt[Ht("elementProperties")]=new Map,gt[Ht("finalized")]=new Map,Ki==null||Ki({ReactiveElement:gt}),(Ke.reactiveElementVersions??(Ke.reactiveElementVersions=[])).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Yt=globalThis,Fs=s=>s,vi=Yt.trustedTypes,Rs=vi?vi.createPolicy("lit-html",{createHTML:s=>s}):void 0,nr="$lit$",We=`lit$${Math.random().toFixed(9).slice(2)}$`,rr="?"+We,Rr=`<${rr}>`,nt=document,qt=()=>nt.createComment(""),Ut=s=>s===null||typeof s!="object"&&typeof s!="function",wo=Array.isArray,Nr=s=>wo(s)||typeof(s==null?void 0:s[Symbol.iterator])=="function",Zi=`[ 	
\f\r]`,Ot=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ns=/-->/g,Vs=/>/g,tt=RegExp(`>|${Zi}(?:([^\\s"'>=/]+)(${Zi}*=${Zi}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Hs=/'/g,Ys=/"/g,ar=/^(?:script|style|textarea|title)$/i,Vr=s=>(e,...t)=>({_$litType$:s,strings:e,values:t}),h=Vr(1),ue=Symbol.for("lit-noChange"),g=Symbol.for("lit-nothing"),qs=new WeakMap,ot=nt.createTreeWalker(nt,129);function lr(s,e){if(!wo(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return Rs!==void 0?Rs.createHTML(e):e}const Hr=(s,e)=>{const t=s.length-1,i=[];let o,n=e===2?"<svg>":e===3?"<math>":"",r=Ot;for(let l=0;l<t;l++){const c=s[l];let d,m,u=-1,p=0;for(;p<c.length&&(r.lastIndex=p,m=r.exec(c),m!==null);)p=r.lastIndex,r===Ot?m[1]==="!--"?r=Ns:m[1]!==void 0?r=Vs:m[2]!==void 0?(ar.test(m[2])&&(o=RegExp("</"+m[2],"g")),r=tt):m[3]!==void 0&&(r=tt):r===tt?m[0]===">"?(r=o??Ot,u=-1):m[1]===void 0?u=-2:(u=r.lastIndex-m[2].length,d=m[1],r=m[3]===void 0?tt:m[3]==='"'?Ys:Hs):r===Ys||r===Hs?r=tt:r===Ns||r===Vs?r=Ot:(r=tt,o=void 0);const f=r===tt&&s[l+1].startsWith("/>")?" ":"";n+=r===Ot?c+Rr:u>=0?(i.push(d),c.slice(0,u)+nr+c.slice(u)+We+f):c+We+(u===-2?l:f)}return[lr(s,n+(s[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]};class jt{constructor({strings:e,_$litType$:t},i){let o;this.parts=[];let n=0,r=0;const l=e.length-1,c=this.parts,[d,m]=Hr(e,t);if(this.el=jt.createElement(d,i),ot.currentNode=this.el.content,t===2||t===3){const u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(o=ot.nextNode())!==null&&c.length<l;){if(o.nodeType===1){if(o.hasAttributes())for(const u of o.getAttributeNames())if(u.endsWith(nr)){const p=m[r++],f=o.getAttribute(u).split(We),x=/([.?@])?(.*)/.exec(p);c.push({type:1,index:n,name:x[2],strings:f,ctor:x[1]==="."?qr:x[1]==="?"?Ur:x[1]==="@"?jr:Oi}),o.removeAttribute(u)}else u.startsWith(We)&&(c.push({type:6,index:n}),o.removeAttribute(u));if(ar.test(o.tagName)){const u=o.textContent.split(We),p=u.length-1;if(p>0){o.textContent=vi?vi.emptyScript:"";for(let f=0;f<p;f++)o.append(u[f],qt()),ot.nextNode(),c.push({type:2,index:++n});o.append(u[p],qt())}}}else if(o.nodeType===8)if(o.data===rr)c.push({type:2,index:n});else{let u=-1;for(;(u=o.data.indexOf(We,u+1))!==-1;)c.push({type:7,index:n}),u+=We.length-1}n++}}static createElement(e,t){const i=nt.createElement("template");return i.innerHTML=e,i}}function xt(s,e,t=s,i){var r,l;if(e===ue)return e;let o=i!==void 0?(r=t._$Co)==null?void 0:r[i]:t._$Cl;const n=Ut(e)?void 0:e._$litDirective$;return(o==null?void 0:o.constructor)!==n&&((l=o==null?void 0:o._$AO)==null||l.call(o,!1),n===void 0?o=void 0:(o=new n(s),o._$AT(s,t,i)),i!==void 0?(t._$Co??(t._$Co=[]))[i]=o:t._$Cl=o),o!==void 0&&(e=xt(s,o._$AS(s,e.values),o,i)),e}class Yr{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,o=((e==null?void 0:e.creationScope)??nt).importNode(t,!0);ot.currentNode=o;let n=ot.nextNode(),r=0,l=0,c=i[0];for(;c!==void 0;){if(r===c.index){let d;c.type===2?d=new Ct(n,n.nextSibling,this,e):c.type===1?d=new c.ctor(n,c.name,c.strings,this,e):c.type===6&&(d=new Gr(n,this,e)),this._$AV.push(d),c=i[++l]}r!==(c==null?void 0:c.index)&&(n=ot.nextNode(),r++)}return ot.currentNode=nt,o}p(e){let t=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class Ct{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,i,o){this.type=2,this._$AH=g,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=o,this._$Cv=(o==null?void 0:o.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=xt(this,e,t),Ut(e)?e===g||e==null||e===""?(this._$AH!==g&&this._$AR(),this._$AH=g):e!==this._$AH&&e!==ue&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Nr(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==g&&Ut(this._$AH)?this._$AA.nextSibling.data=e:this.T(nt.createTextNode(e)),this._$AH=e}$(e){var n;const{values:t,_$litType$:i}=e,o=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=jt.createElement(lr(i.h,i.h[0]),this.options)),i);if(((n=this._$AH)==null?void 0:n._$AD)===o)this._$AH.p(t);else{const r=new Yr(o,this),l=r.u(this.options);r.p(t),this.T(l),this._$AH=r}}_$AC(e){let t=qs.get(e.strings);return t===void 0&&qs.set(e.strings,t=new jt(e)),t}k(e){wo(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,o=0;for(const n of e)o===t.length?t.push(i=new Ct(this.O(qt()),this.O(qt()),this,this.options)):i=t[o],i._$AI(n),o++;o<t.length&&(this._$AR(i&&i._$AB.nextSibling,o),t.length=o)}_$AR(e=this._$AA.nextSibling,t){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,t);e!==this._$AB;){const o=Fs(e).nextSibling;Fs(e).remove(),e=o}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}}class Oi{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,o,n){this.type=1,this._$AH=g,this._$AN=void 0,this.element=e,this.name=t,this._$AM=o,this.options=n,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=g}_$AI(e,t=this,i,o){const n=this.strings;let r=!1;if(n===void 0)e=xt(this,e,t,0),r=!Ut(e)||e!==this._$AH&&e!==ue,r&&(this._$AH=e);else{const l=e;let c,d;for(e=n[0],c=0;c<n.length-1;c++)d=xt(this,l[i+c],t,c),d===ue&&(d=this._$AH[c]),r||(r=!Ut(d)||d!==this._$AH[c]),d===g?e=g:e!==g&&(e+=(d??"")+n[c+1]),this._$AH[c]=d}r&&!o&&this.j(e)}j(e){e===g?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class qr extends Oi{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===g?void 0:e}}class Ur extends Oi{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==g)}}class jr extends Oi{constructor(e,t,i,o,n){super(e,t,i,o,n),this.type=5}_$AI(e,t=this){if((e=xt(this,e,t,0)??g)===ue)return;const i=this._$AH,o=e===g&&i!==g||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,n=e!==g&&(i===g||o);o&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}}class Gr{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){xt(this,e)}}const Wr={I:Ct},Ji=Yt.litHtmlPolyfillSupport;Ji==null||Ji(jt,Ct),(Yt.litHtmlVersions??(Yt.litHtmlVersions=[])).push("3.3.2");const Kr=(s,e,t)=>{const i=(t==null?void 0:t.renderBefore)??e;let o=i._$litPart$;if(o===void 0){const n=(t==null?void 0:t.renderBefore)??null;i._$litPart$=o=new Ct(e.insertBefore(qt(),n),n,void 0,t??{})}return o._$AI(s),o};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const st=globalThis;let $=class extends gt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Kr(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return ue}};var ir;$._$litElement$=!0,$.finalized=!0,(ir=st.litElementHydrateSupport)==null||ir.call(st,{LitElement:$});const Xi=st.litElementPolyfillSupport;Xi==null||Xi({LitElement:$});(st.litElementVersions??(st.litElementVersions=[])).push("4.2.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Zr={attribute:!0,type:String,converter:wi,reflect:!1,hasChanged:_o},Jr=(s=Zr,e,t)=>{const{kind:i,metadata:o}=t;let n=globalThis.litPropertyMetadata.get(o);if(n===void 0&&globalThis.litPropertyMetadata.set(o,n=new Map),i==="setter"&&((s=Object.create(s)).wrapped=!0),n.set(t.name,s),i==="accessor"){const{name:r}=t;return{set(l){const c=e.get.call(this);e.set.call(this,l),this.requestUpdate(r,c,s,!0,l)},init(l){return l!==void 0&&this.C(r,void 0,s,l),l}}}if(i==="setter"){const{name:r}=t;return function(l){const c=this[r];e.call(this,l),this.requestUpdate(r,c,s,!0,l)}}throw Error("Unsupported decorator location: "+i)};function a(s){return(e,t)=>typeof t=="object"?Jr(s,e,t):((i,o,n)=>{const r=o.hasOwnProperty(n);return o.constructor.createProperty(n,i),r?Object.getOwnPropertyDescriptor(o,n):void 0})(s,e,t)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function _(s){return a({...s,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Xr=(s,e,t)=>(t.configurable=!0,t.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(s,e,t),t);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ee(s,e){return(t,i,o)=>{const n=r=>{var l;return((l=r.renderRoot)==null?void 0:l.querySelector(s))??null};return Xr(t,i,{get(){return n(this)}})}}const D=k`
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
    --grey-350-rgb: 129, 143, 169;
    --grey-400: rgb(114, 129, 159);
    --grey-450: rgb(100, 116, 147);
    --grey-500: rgb(90, 104, 132);
    --grey-550: rgb(80, 92, 117);
    --grey-550-rgb: 80, 92, 117;
    --grey-600: rgb(69, 80, 102);
    --grey-650: rgb(59, 68, 87);
    --grey-650-rgb: 59, 68, 87;
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

    /* Spacing — aligned with ngx-ui layouts/_vars.scss */
    --spacing-0: 0px;
    --spacing-2: 2px;
    --spacing-4: 4px;
    --spacing-6: 6px;
    --spacing-8: 8px;
    --spacing-10: 10px;
    --spacing-12: 12px;
    --spacing-14: 14px;
    --spacing-16: 16px;
    --spacing-18: 18px;
    --spacing-20: 20px;
    --spacing-24: 24px;
    --spacing-30: 30px;
    --spacing-36: 36px;
    --spacing-40: 40px;
    --spacing-48: 48px;

    /* Border radius — aligned with ngx-ui layouts/_vars.scss */
    --radius-0: 0px;
    --radius-2: 2px;
    --radius-4: 4px;
    --radius-6: 6px;
    --radius-8: 8px;
    --radius-12: 12px;
    --radius-16: 16px;
    --radius-24: 24px;
    --radius-32: 32px;
    --radius-64: 64px;
    --radius-1000: 1000px;

    /* Semantic colors */
    --color-error: var(--red-500);
    --color-success: #b0e53c;

    /* Shadows — aligned with ngx-ui shadow-variables.scss (Material-style key/penumbra/ambient) */
    --shadow-1: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12);
    --shadow-2: 0 1px 5px 0 rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12);
    --shadow-3: 0 1px 8px 0 rgba(0, 0, 0, 0.2), 0 3px 4px 0 rgba(0, 0, 0, 0.14), 0 3px 3px -2px rgba(0, 0, 0, 0.12);

    /* Modal / large-format surface (ngx gradient-variables $bg-linear-3) */
    --bg-linear-3: linear-gradient(180deg, #252a37 0%, #212631 100%);
    /* Figma modal panel (filter: dy=2, stdDeviation=3.5, alpha 0.2) */
    --shadow-dialog-panel: 0 2px 7px rgba(0, 0, 0, 0.2);
    /* Diffuse halo (ngx large-format legacy); override with --shadow-dialog-panel for Figma parity */
    --shadow-dialog-glow: 0 0 100px rgba(0, 0, 0, 0.25);
  }
`;k`
  * {
    box-sizing: border-box;
  }
`;const Qr=k`
  :host {
    display: inline-block;
    cursor: pointer;
    /* Allow constrained layouts (flex/grid) to shrink below label intrinsic width so ellipsis can apply */
    min-width: 0;

    /* Private fallbacks — overridden per [variant] with higher specificity */
    --_swim-fallback-bg: var(--grey-600);
    --_swim-fallback-hover-bg: var(--grey-700);
    --_swim-fallback-border-color: transparent;
    --_swim-fallback-hover-border-color: transparent;
    --_swim-fallback-color: var(--white);
    --_swim-fallback-hover-color: var(--white);
    --_swim-fallback-shadow: var(--shadow-1);
    --_swim-fallback-outline: var(--grey-600);

    /* Slotted nodes (e.g. swim-icon) inherit color from this host, not from the shadow button. */
    color: var(--swim-button-color, var(--_swim-fallback-color));
  }

  :host([variant='primary']:not([bordered])) {
    --_swim-fallback-bg: var(--blue-400);
    --_swim-fallback-hover-bg: var(--blue-500);
    --_swim-fallback-border-color: var(--blue-400);
    --_swim-fallback-hover-border-color: var(--blue-500);
    --_swim-fallback-color: var(--white);
    --_swim-fallback-hover-color: var(--white);
    --_swim-fallback-outline: var(--blue-500);
  }

  :host([variant='primary'][bordered]) {
    --_swim-fallback-bg: transparent;
    --_swim-fallback-hover-bg: var(--blue-500);
    --_swim-fallback-border-color: var(--blue-400);
    --_swim-fallback-hover-border-color: var(--blue-200);
    --_swim-fallback-color: var(--blue-400);
    --_swim-fallback-hover-color: var(--blue-200);
    --_swim-fallback-shadow: none;
    --_swim-fallback-outline: var(--blue-400);
  }

  :host([variant='bordered']) {
    --_swim-fallback-bg: transparent;
    --_swim-fallback-hover-bg: transparent;
    --_swim-fallback-border-color: var(--blue-400);
    --_swim-fallback-hover-border-color: var(--blue-200);
    --_swim-fallback-color: var(--blue-400);
    --_swim-fallback-hover-color: var(--blue-200);
    --_swim-fallback-shadow: none;
    --_swim-fallback-outline: var(--blue-400);
  }

  :host([variant='warning']) {
    --_swim-fallback-bg: var(--orange-400);
    --_swim-fallback-hover-bg: var(--orange-500);
    --_swim-fallback-border-color: transparent;
    --_swim-fallback-hover-border-color: transparent;
    --_swim-fallback-color: var(--grey-900);
    --_swim-fallback-hover-color: var(--grey-900);
    --_swim-fallback-outline: var(--orange-500);
  }

  :host([variant='danger']) {
    --_swim-fallback-bg: var(--red-400);
    --_swim-fallback-hover-bg: var(--red-500);
    --_swim-fallback-border-color: transparent;
    --_swim-fallback-hover-border-color: transparent;
    --_swim-fallback-color: var(--white);
    --_swim-fallback-hover-color: var(--white);
    --_swim-fallback-outline: var(--red-400);
  }

  :host([variant='link']) {
    --_swim-fallback-bg: transparent;
    --_swim-fallback-hover-bg: transparent;
    --_swim-fallback-border-color: transparent;
    --_swim-fallback-hover-border-color: transparent;
    --_swim-fallback-color: var(--white);
    --_swim-fallback-hover-color: var(--white);
    --_swim-fallback-shadow: none;
    --_swim-fallback-outline: var(--grey-600);
  }

  :host(:not([disabled]):hover) {
    color: var(--swim-button-hover-color, var(--_swim-fallback-hover-color));
  }

  :host([disabled]) {
    pointer-events: none;
    cursor: not-allowed;
  }

  :host([disabled]) button {
    opacity: 0.6;
    cursor: not-allowed;
  }

  button {
    box-sizing: border-box;
    color: var(--swim-button-color, var(--_swim-fallback-color));
    display: inline-grid;
    grid-template-columns: auto;
    grid-template-rows: auto;
    justify-items: stretch;
    align-items: center;
    padding: var(--swim-button-padding, 0.35em 0.55em);
    position: relative;
    text-align: center;
    text-decoration: none;
    user-select: none;
    font: inherit;
    font-size: var(--font-size-m);
    font-weight: var(--swim-button-font-weight, var(--font-weight-bold));
    outline: none;
    line-height: var(--font-line-height-100);
    outline-offset: 2px;
    cursor: inherit;
    width: 100%;
    min-width: 0;

    background: var(--swim-button-background, var(--_swim-fallback-bg));
    border-width: var(--swim-button-border-width, 1px);
    border-style: var(--swim-button-border-style, solid);
    border-color: var(--swim-button-border-color, var(--_swim-fallback-border-color));
    border-radius: var(--radius-4);
    box-shadow: var(--swim-button-shadow, var(--_swim-fallback-shadow));
    transition: background-color 200ms, box-shadow 200ms;
    text-shadow: 1px 1px rgba(0, 0, 0, 0.07);
  }

  button:focus,
  button:focus-within {
    outline: none;
  }

  button:focus-visible {
    outline: 2px solid var(--swim-button-outline-color, var(--_swim-fallback-outline));
  }

  /* One hover layer so generic grey hover never leaks into bordered / link / etc. */
  :host(:not([disabled])) button:hover {
    cursor: pointer;
    background: var(--swim-button-hover-background, var(--_swim-fallback-hover-bg));
    border-color: var(--swim-button-hover-border-color, var(--_swim-fallback-hover-border-color));
    color: var(--swim-button-hover-color, var(--_swim-fallback-hover-color));
    outline-color: var(
      --swim-button-hover-outline-color,
      var(--swim-button-hover-background, var(--_swim-fallback-hover-bg))
    );
  }

  /* Size variants */
  :host([size='small']) button {
    font-size: var(--font-size-xxs);
  }

  :host([size='large']) button {
    font-size: 1.3em;
  }

  /* Slotted swim-icon: 1em sizing + vertical center with label text (flex on .content). */
  slot::slotted(swim-icon) {
    font-size: inherit;
    flex-shrink: 0;
    align-self: center;
    line-height: 1;
  }

  /* Button content and state icon: same grid cell so intrinsic width is max(label, state) */
  .content {
    grid-area: 1 / 1;
    min-width: 0;
    max-width: 100%;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    white-space: normal;
    overflow: visible;
    text-overflow: clip;
    word-wrap: break-word;
    overflow-wrap: break-word;
    transition: opacity 0.25s ease-out;
  }

  /* Single-line + ellipsis: wrap-text="false" (wrap-text attribute omitted when wrapping is on) */
  :host([wrap-text='false']) .content {
    flex-wrap: nowrap;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: normal;
    overflow-wrap: normal;
  }

  .state-icon {
    grid-area: 1 / 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    justify-self: center;
    width: max-content;
    box-sizing: border-box;
    opacity: 0;
    pointer-events: none;
  }

  .state-icon-group {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.35em;
    box-sizing: border-box;
    padding: 0 0.35em;
  }

  .state-loading-text {
    white-space: nowrap;
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
    /* Loading + host disabled: UA button:disabled grays out inherited color (hurts loading-text).
 Re-apply variant foreground; !important aligns with ngx-ui .in-progress vs. UA.
 Override with --swim-button-in-progress-color on :host. */
    color: var(--swim-button-in-progress-color, var(--swim-button-color, var(--_swim-fallback-color))) !important;
  }

  :host([state='in-progress']) .content {
    opacity: 0;
  }

  :host([state='in-progress']) .state-icon {
    opacity: 1;
  }

  /* Loading glyph: same var chain as in-progress button color (explicit so it does not rely on currentColor / stale builds). */
  :host([state='in-progress']) swim-icon.icon {
    color: var(
      --swim-button-loading-icon-color,
      var(--swim-button-in-progress-color, var(--swim-button-color, var(--_swim-fallback-color)))
    );
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

  /* Loading swim-icon sizing (color set on :host([state='in-progress']) swim-icon.icon) */
  .icon {
    height: 1em;
    width: 1em;
    font-weight: var(--font-weight-bold);
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
`;var xe=(s=>(s.Active="active",s.InProgress="in-progress",s.Success="success",s.Fail="fail",s))(xe||{});function b(s){return s!=null&&`${s}`!="false"}function F(s,e=null){return isNaN(parseFloat(s))||isNaN(Number(s))?e:Number(s)}const ce={fromAttribute:s=>s!=="false",toAttribute:s=>s?null:"false"},w={fromAttribute:s=>s!==null&&s!=="false"&&s!=="0",toAttribute:s=>s?"":null},cr="swim-ui-icon",ea=k`
  .swim-icon.lit-3d-rotate::before {
    content: '\\ea01';
  }
  .swim-icon.lit-action::before {
    content: '\\ea02';
  }
  .swim-icon.lit-action-close::before {
    content: '\\ea03';
  }
  .swim-icon.lit-action-maximize::before {
    content: '\\ea04';
  }
  .swim-icon.lit-action-maximize-inverse::before {
    content: '\\ea05';
  }
  .swim-icon.lit-action-minimize::before {
    content: '\\ea06';
  }
  .swim-icon.lit-action-outline::before {
    content: '\\ea07';
  }
  .swim-icon.lit-action-outline-small::before {
    content: '\\ea08';
  }
  .swim-icon.lit-add-circle::before {
    content: '\\ea09';
  }
  .swim-icon.lit-add-circle-filled::before {
    content: '\\ea0a';
  }
  .swim-icon.lit-add-circle-medium::before {
    content: '\\ea0b';
  }
  .swim-icon.lit-add-circle-thin::before {
    content: '\\ea0c';
  }
  .swim-icon.lit-add-edge::before {
    content: '\\ea0d';
  }
  .swim-icon.lit-add-new::before {
    content: '\\ea0e';
  }
  .swim-icon.lit-add-node::before {
    content: '\\ea0f';
  }
  .swim-icon.lit-advanced-pie::before {
    content: '\\ea10';
  }
  .swim-icon.lit-ai-agent::before {
    content: '\\ea11';
  }
  .swim-icon.lit-alert::before {
    content: '\\ea12';
  }
  .swim-icon.lit-app-store::before {
    content: '\\ea13';
  }
  .swim-icon.lit-app-workspaces::before {
    content: '\\ea14';
  }
  .swim-icon.lit-applet::before {
    content: '\\ea15';
  }
  .swim-icon.lit-applets::before {
    content: '\\ea16';
  }
  .swim-icon.lit-application::before {
    content: '\\ea17';
  }
  .swim-icon.lit-apps::before {
    content: '\\ea18';
  }
  .swim-icon.lit-area-chart::before {
    content: '\\ea19';
  }
  .swim-icon.lit-arrow-bold-circle-left::before {
    content: '\\ea1a';
  }
  .swim-icon.lit-arrow-bold-circle-right::before {
    content: '\\ea1b';
  }
  .swim-icon.lit-arrow-bold-down::before {
    content: '\\ea1c';
  }
  .swim-icon.lit-arrow-bold-left::before {
    content: '\\ea1d';
  }
  .swim-icon.lit-arrow-bold-right::before {
    content: '\\ea1e';
  }
  .swim-icon.lit-arrow-bold-up::before {
    content: '\\ea1f';
  }
  .swim-icon.lit-arrow-down::before {
    content: '\\ea20';
  }
  .swim-icon.lit-arrow-input::before {
    content: '\\ea21';
  }
  .swim-icon.lit-arrow-left::before {
    content: '\\ea22';
  }
  .swim-icon.lit-arrow-output::before {
    content: '\\ea23';
  }
  .swim-icon.lit-arrow-right::before {
    content: '\\ea24';
  }
  .swim-icon.lit-arrow-right-down-medium::before {
    content: '\\ea25';
  }
  .swim-icon.lit-arrow-right-medium::before {
    content: '\\ea26';
  }
  .swim-icon.lit-arrow-tail-left::before {
    content: '\\ea27';
  }
  .swim-icon.lit-arrow-tail-right::before {
    content: '\\ea28';
  }
  .swim-icon.lit-arrow-tail-solid-left::before {
    content: '\\ea29';
  }
  .swim-icon.lit-arrow-tail-solid-right::before {
    content: '\\ea2a';
  }
  .swim-icon.lit-arrow-tail-subright::before {
    content: '\\ea2b';
  }
  .swim-icon.lit-arrow-up::before {
    content: '\\ea2c';
  }
  .swim-icon.lit-asset-outline::before {
    content: '\\ea2d';
  }
  .swim-icon.lit-asset-outline-small::before {
    content: '\\ea2e';
  }
  .swim-icon.lit-assets::before {
    content: '\\ea2f';
  }
  .swim-icon.lit-attachment::before {
    content: '\\ea30';
  }
  .swim-icon.lit-automation::before {
    content: '\\ea31';
  }
  .swim-icon.lit-automation-alternate::before {
    content: '\\ea32';
  }
  .swim-icon.lit-back-arrow::before {
    content: '\\ea33';
  }
  .swim-icon.lit-back-arrow-filled::before {
    content: '\\ea34';
  }
  .swim-icon.lit-bars::before {
    content: '\\ea35';
  }
  .swim-icon.lit-bell::before {
    content: '\\ea36';
  }
  .swim-icon.lit-bell-alarm::before {
    content: '\\ea37';
  }
  .swim-icon.lit-bold::before {
    content: '\\ea38';
  }
  .swim-icon.lit-bolt::before {
    content: '\\ea39';
  }
  .swim-icon.lit-branch-node::before {
    content: '\\ea3a';
  }
  .swim-icon.lit-branch-node-vert::before {
    content: '\\ea3b';
  }
  .swim-icon.lit-broom::before {
    content: '\\ea3c';
  }
  .swim-icon.lit-browser-size::before {
    content: '\\ea3d';
  }
  .swim-icon.lit-bug::before {
    content: '\\ea3e';
  }
  .swim-icon.lit-builder::before {
    content: '\\ea3f';
  }
  .swim-icon.lit-builder-outline::before {
    content: '\\ea40';
  }
  .swim-icon.lit-button-push-outline::before {
    content: '\\ea41';
  }
  .swim-icon.lit-button-push-outline-large::before {
    content: '\\ea42';
  }
  .swim-icon.lit-button-push-outline-small::before {
    content: '\\ea43';
  }
  .swim-icon.lit-calendar::before {
    content: '\\ea44';
  }
  .swim-icon.lit-calendar-clock::before {
    content: '\\ea45';
  }
  .swim-icon.lit-calender-clock::before {
    content: '\\ea46';
  }
  .swim-icon.lit-cards::before {
    content: '\\ea47';
  }
  .swim-icon.lit-center-align::before {
    content: '\\ea48';
  }
  .swim-icon.lit-chart-area::before {
    content: '\\ea49';
  }
  .swim-icon.lit-chart-bar-bar::before {
    content: '\\ea4a';
  }
  .swim-icon.lit-chart-bubble::before {
    content: '\\ea4b';
  }
  .swim-icon.lit-chart-donut::before {
    content: '\\ea4c';
  }
  .swim-icon.lit-chart-full-stacked-area::before {
    content: '\\ea4d';
  }
  .swim-icon.lit-chart-heat::before {
    content: '\\ea4e';
  }
  .swim-icon.lit-chart-horz-full-stack-bar::before {
    content: '\\ea4f';
  }
  .swim-icon.lit-chart-number-card::before {
    content: '\\ea50';
  }
  .swim-icon.lit-chart-pie::before {
    content: '\\ea51';
  }
  .swim-icon.lit-chart-pie-grid::before {
    content: '\\ea52';
  }
  .swim-icon.lit-chart-scatter::before {
    content: '\\ea53';
  }
  .swim-icon.lit-chart-spider::before {
    content: '\\ea54';
  }
  .swim-icon.lit-chart-stacked-area::before {
    content: '\\ea55';
  }
  .swim-icon.lit-chart-vert-bar::before {
    content: '\\ea56';
  }
  .swim-icon.lit-chart-vert-bar2::before {
    content: '\\ea57';
  }
  .swim-icon.lit-chart-vert-stacked-bar::before {
    content: '\\ea58';
  }
  .swim-icon.lit-check::before {
    content: '\\ea59';
  }
  .swim-icon.lit-check-filled::before {
    content: '\\ea5a';
  }
  .swim-icon.lit-check-filled-sm::before {
    content: '\\ea5b';
  }
  .swim-icon.lit-check-square-filled::before {
    content: '\\ea5c';
  }
  .swim-icon.lit-checklist::before {
    content: '\\ea5d';
  }
  .swim-icon.lit-chevron-bold-down::before {
    content: '\\ea5e';
  }
  .swim-icon.lit-chevron-bold-left::before {
    content: '\\ea5f';
  }
  .swim-icon.lit-chevron-bold-right::before {
    content: '\\ea60';
  }
  .swim-icon.lit-chevron-bold-up::before {
    content: '\\ea61';
  }
  .swim-icon.lit-circle::before {
    content: '\\ea62';
  }
  .swim-icon.lit-circle-filled::before {
    content: '\\ea63';
  }
  .swim-icon.lit-circles::before {
    content: '\\ea64';
  }
  .swim-icon.lit-circuit-board::before {
    content: '\\ea65';
  }
  .swim-icon.lit-clipboard::before {
    content: '\\ea66';
  }
  .swim-icon.lit-clock::before {
    content: '\\ea67';
  }
  .swim-icon.lit-cloud-download::before {
    content: '\\ea68';
  }
  .swim-icon.lit-cloud-upload::before {
    content: '\\ea69';
  }
  .swim-icon.lit-code::before {
    content: '\\ea6a';
  }
  .swim-icon.lit-cog::before {
    content: '\\ea6b';
  }
  .swim-icon.lit-collapse::before {
    content: '\\ea6c';
  }
  .swim-icon.lit-commandline::before {
    content: '\\ea6d';
  }
  .swim-icon.lit-comments::before {
    content: '\\ea6e';
  }
  .swim-icon.lit-component::before {
    content: '\\ea6f';
  }
  .swim-icon.lit-component-create::before {
    content: '\\ea70';
  }
  .swim-icon.lit-condition::before {
    content: '\\ea71';
  }
  .swim-icon.lit-copy::before {
    content: '\\ea72';
  }
  .swim-icon.lit-copy-app::before {
    content: '\\ea73';
  }
  .swim-icon.lit-copy-filled::before {
    content: '\\ea74';
  }
  .swim-icon.lit-credit-card::before {
    content: '\\ea75';
  }
  .swim-icon.lit-dashboard::before {
    content: '\\ea76';
  }
  .swim-icon.lit-dashboard-outline::before {
    content: '\\ea77';
  }
  .swim-icon.lit-database::before {
    content: '\\ea78';
  }
  .swim-icon.lit-debug::before {
    content: '\\ea79';
  }
  .swim-icon.lit-devil::before {
    content: '\\ea7a';
  }
  .swim-icon.lit-disable::before {
    content: '\\ea7b';
  }
  .swim-icon.lit-document::before {
    content: '\\ea7c';
  }
  .swim-icon.lit-documentation::before {
    content: '\\ea7d';
  }
  .swim-icon.lit-domain::before {
    content: '\\ea7e';
  }
  .swim-icon.lit-dots-horz::before {
    content: '\\ea7f';
  }
  .swim-icon.lit-dots-vert::before {
    content: '\\ea80';
  }
  .swim-icon.lit-dots-vert-round::before {
    content: '\\ea81';
  }
  .swim-icon.lit-double-down::before {
    content: '\\ea82';
  }
  .swim-icon.lit-double-left::before {
    content: '\\ea83';
  }
  .swim-icon.lit-double-right::before {
    content: '\\ea84';
  }
  .swim-icon.lit-double-up::before {
    content: '\\ea85';
  }
  .swim-icon.lit-downgrade::before {
    content: '\\ea86';
  }
  .swim-icon.lit-downgrade-horizontal::before {
    content: '\\ea87';
  }
  .swim-icon.lit-download-outline::before {
    content: '\\ea88';
  }
  .swim-icon.lit-download-outline-large::before {
    content: '\\ea89';
  }
  .swim-icon.lit-download-outline-small::before {
    content: '\\ea8a';
  }
  .swim-icon.lit-drag::before {
    content: '\\ea8b';
  }
  .swim-icon.lit-edit::before {
    content: '\\ea8c';
  }
  .swim-icon.lit-edit-app::before {
    content: '\\ea8d';
  }
  .swim-icon.lit-edit-outline::before {
    content: '\\ea8e';
  }
  .swim-icon.lit-edit-outline-large::before {
    content: '\\ea8f';
  }
  .swim-icon.lit-edit-outline-small::before {
    content: '\\ea90';
  }
  .swim-icon.lit-email::before {
    content: '\\ea91';
  }
  .swim-icon.lit-enrich-small::before {
    content: '\\ea92';
  }
  .swim-icon.lit-escalate::before {
    content: '\\ea93';
  }
  .swim-icon.lit-events-outline::before {
    content: '\\ea94';
  }
  .swim-icon.lit-events-outline-small::before {
    content: '\\ea95';
  }
  .swim-icon.lit-expand::before {
    content: '\\ea96';
  }
  .swim-icon.lit-explore::before {
    content: '\\ea97';
  }
  .swim-icon.lit-export::before {
    content: '\\ea98';
  }
  .swim-icon.lit-export-filled::before {
    content: '\\ea99';
  }
  .swim-icon.lit-export-outline::before {
    content: '\\ea9a';
  }
  .swim-icon.lit-export-outline-large::before {
    content: '\\ea9b';
  }
  .swim-icon.lit-export-outline-small::before {
    content: '\\ea9c';
  }
  .swim-icon.lit-eye::before {
    content: '\\ea9d';
  }
  .swim-icon.lit-eye-disabled::before {
    content: '\\ea9e';
  }
  .swim-icon.lit-eye-hidden::before {
    content: '\\ea9f';
  }
  .swim-icon.lit-field-created-by::before {
    content: '\\eaa0';
  }
  .swim-icon.lit-field-created-date::before {
    content: '\\eaa1';
  }
  .swim-icon.lit-field-date::before {
    content: '\\eaa2';
  }
  .swim-icon.lit-field-double-select::before {
    content: '\\eaa3';
  }
  .swim-icon.lit-field-dynamic::before {
    content: '\\eaa4';
  }
  .swim-icon.lit-field-edited-by::before {
    content: '\\eaa5';
  }
  .swim-icon.lit-field-edited-date::before {
    content: '\\eaa6';
  }
  .swim-icon.lit-field-grid::before {
    content: '\\eaa7';
  }
  .swim-icon.lit-field-html::before {
    content: '\\eaa8';
  }
  .swim-icon.lit-field-json::before {
    content: '\\eaa9';
  }
  .swim-icon.lit-field-list::before {
    content: '\\eaaa';
  }
  .swim-icon.lit-field-list-small::before {
    content: '\\eaab';
  }
  .swim-icon.lit-field-lists::before {
    content: '\\eaac';
  }
  .swim-icon.lit-field-multiselect::before {
    content: '\\eaad';
  }
  .swim-icon.lit-field-number::before {
    content: '\\eaae';
  }
  .swim-icon.lit-field-numeric::before {
    content: '\\eaaf';
  }
  .swim-icon.lit-field-richtext::before {
    content: '\\eab0';
  }
  .swim-icon.lit-field-single-select::before {
    content: '\\eab1';
  }
  .swim-icon.lit-field-singleline::before {
    content: '\\eab2';
  }
  .swim-icon.lit-field-text::before {
    content: '\\eab3';
  }
  .swim-icon.lit-field-textarea::before {
    content: '\\eab4';
  }
  .swim-icon.lit-field-textual::before {
    content: '\\eab5';
  }
  .swim-icon.lit-field-users::before {
    content: '\\eab6';
  }
  .swim-icon.lit-filter::before {
    content: '\\eab7';
  }
  .swim-icon.lit-filter-bar::before {
    content: '\\eab8';
  }
  .swim-icon.lit-find-page::before {
    content: '\\eab9';
  }
  .swim-icon.lit-flame::before {
    content: '\\eaba';
  }
  .swim-icon.lit-folder::before {
    content: '\\eabb';
  }
  .swim-icon.lit-folder-closed-small::before {
    content: '\\eabc';
  }
  .swim-icon.lit-folder-open-small::before {
    content: '\\eabd';
  }
  .swim-icon.lit-folders::before {
    content: '\\eabe';
  }
  .swim-icon.lit-font::before {
    content: '\\eabf';
  }
  .swim-icon.lit-format-indent-decrease::before {
    content: '\\eac0';
  }
  .swim-icon.lit-format-indent-increase::before {
    content: '\\eac1';
  }
  .swim-icon.lit-formula::before {
    content: '\\eac2';
  }
  .swim-icon.lit-forward-arrow::before {
    content: '\\eac3';
  }
  .swim-icon.lit-forward-arrow-filled::before {
    content: '\\eac4';
  }
  .swim-icon.lit-full-align::before {
    content: '\\eac5';
  }
  .swim-icon.lit-gauge::before {
    content: '\\eac6';
  }
  .swim-icon.lit-gear::before {
    content: '\\eac7';
  }
  .swim-icon.lit-gear-small::before {
    content: '\\eac8';
  }
  .swim-icon.lit-gear-square::before {
    content: '\\eac9';
  }
  .swim-icon.lit-globe::before {
    content: '\\eaca';
  }
  .swim-icon.lit-graph::before {
    content: '\\eacb';
  }
  .swim-icon.lit-graph-alt1::before {
    content: '\\eacc';
  }
  .swim-icon.lit-grid-view::before {
    content: '\\eacd';
  }
  .swim-icon.lit-hand::before {
    content: '\\eace';
  }
  .swim-icon.lit-handle::before {
    content: '\\eacf';
  }
  .swim-icon.lit-heat::before {
    content: '\\ead0';
  }
  .swim-icon.lit-helper::before {
    content: '\\ead1';
  }
  .swim-icon.lit-history::before {
    content: '\\ead2';
  }
  .swim-icon.lit-horz-bar-graph-grouped::before {
    content: '\\ead3';
  }
  .swim-icon.lit-horz-stacked-bar::before {
    content: '\\ead4';
  }
  .swim-icon.lit-html-code::before {
    content: '\\ead5';
  }
  .swim-icon.lit-icon-chart-bar-horizontal::before {
    content: '\\ead6';
  }
  .swim-icon.lit-icon-chart-horz-bar::before {
    content: '\\ead7';
  }
  .swim-icon.lit-import-outline::before {
    content: '\\ead8';
  }
  .swim-icon.lit-import-outline-large::before {
    content: '\\ead9';
  }
  .swim-icon.lit-import-outline-small::before {
    content: '\\eada';
  }
  .swim-icon.lit-info-filled::before {
    content: '\\eadb';
  }
  .swim-icon.lit-info-filled-2::before {
    content: '\\eadc';
  }
  .swim-icon.lit-info-filled-small::before {
    content: '\\eadd';
  }
  .swim-icon.lit-ingest-small::before {
    content: '\\eade';
  }
  .swim-icon.lit-inspect::before {
    content: '\\eadf';
  }
  .swim-icon.lit-integration::before {
    content: '\\eae0';
  }
  .swim-icon.lit-integrations::before {
    content: '\\eae1';
  }
  .swim-icon.lit-ip::before {
    content: '\\eae2';
  }
  .swim-icon.lit-italic::before {
    content: '\\eae3';
  }
  .swim-icon.lit-key::before {
    content: '\\eae4';
  }
  .swim-icon.lit-key-outline::before {
    content: '\\eae5';
  }
  .swim-icon.lit-key-outline-small::before {
    content: '\\eae6';
  }
  .swim-icon.lit-keyboard::before {
    content: '\\eae7';
  }
  .swim-icon.lit-keyboard-return::before {
    content: '\\eae8';
  }
  .swim-icon.lit-layer::before {
    content: '\\eae9';
  }
  .swim-icon.lit-left-align::before {
    content: '\\eaea';
  }
  .swim-icon.lit-library::before {
    content: '\\eaeb';
  }
  .swim-icon.lit-line-chart::before {
    content: '\\eaec';
  }
  .swim-icon.lit-line-graph::before {
    content: '\\eaed';
  }
  .swim-icon.lit-linear-gauge::before {
    content: '\\eaee';
  }
  .swim-icon.lit-link::before {
    content: '\\eaef';
  }
  .swim-icon.lit-list::before {
    content: '\\eaf0';
  }
  .swim-icon.lit-list-1::before {
    content: '\\eaf1';
  }
  .swim-icon.lit-list-view::before {
    content: '\\eaf2';
  }
  .swim-icon.lit-loading::before {
    content: '\\eaf3';
  }
  .swim-icon.lit-locate-filled::before {
    content: '\\eaf4';
  }
  .swim-icon.lit-locate-outline::before {
    content: '\\eaf5';
  }
  .swim-icon.lit-locate-outline-large::before {
    content: '\\eaf6';
  }
  .swim-icon.lit-location::before {
    content: '\\eaf7';
  }
  .swim-icon.lit-lock::before {
    content: '\\eaf8';
  }
  .swim-icon.lit-lock-sm::before {
    content: '\\eaf9';
  }
  .swim-icon.lit-mail::before {
    content: '\\eafa';
  }
  .swim-icon.lit-mail-1::before {
    content: '\\eafb';
  }
  .swim-icon.lit-map::before {
    content: '\\eafc';
  }
  .swim-icon.lit-marketplace::before {
    content: '\\eafd';
  }
  .swim-icon.lit-maximize::before {
    content: '\\eafe';
  }
  .swim-icon.lit-menu::before {
    content: '\\eaff';
  }
  .swim-icon.lit-mfa::before {
    content: '\\eb00';
  }
  .swim-icon.lit-mic::before {
    content: '\\eb01';
  }
  .swim-icon.lit-minimize::before {
    content: '\\eb02';
  }
  .swim-icon.lit-minus::before {
    content: '\\eb03';
  }
  .swim-icon.lit-money::before {
    content: '\\eb04';
  }
  .swim-icon.lit-mouse-hold::before {
    content: '\\eb05';
  }
  .swim-icon.lit-multi-line::before {
    content: '\\eb06';
  }
  .swim-icon.lit-new-app::before {
    content: '\\eb07';
  }
  .swim-icon.lit-notation-arrow-down-left::before {
    content: '\\eb08';
  }
  .swim-icon.lit-notation-arrow-up::before {
    content: '\\eb09';
  }
  .swim-icon.lit-numbered-list::before {
    content: '\\eb0a';
  }
  .swim-icon.lit-open::before {
    content: '\\eb0b';
  }
  .swim-icon.lit-orchestration::before {
    content: '\\eb0c';
  }
  .swim-icon.lit-panel-collapse::before {
    content: '\\eb0d';
  }
  .swim-icon.lit-panel-expand::before {
    content: '\\eb0e';
  }
  .swim-icon.lit-paragraph::before {
    content: '\\eb0f';
  }
  .swim-icon.lit-pause::before {
    content: '\\eb10';
  }
  .swim-icon.lit-pause-circle::before {
    content: '\\eb11';
  }
  .swim-icon.lit-percent-gauge::before {
    content: '\\eb12';
  }
  .swim-icon.lit-phone::before {
    content: '\\eb13';
  }
  .swim-icon.lit-photo::before {
    content: '\\eb14';
  }
  .swim-icon.lit-pie-chart::before {
    content: '\\eb15';
  }
  .swim-icon.lit-pin::before {
    content: '\\eb16';
  }
  .swim-icon.lit-plane::before {
    content: '\\eb17';
  }
  .swim-icon.lit-play::before {
    content: '\\eb18';
  }
  .swim-icon.lit-play-circle::before {
    content: '\\eb19';
  }
  .swim-icon.lit-playbook-outline::before {
    content: '\\eb1a';
  }
  .swim-icon.lit-playbook-outline-small::before {
    content: '\\eb1b';
  }
  .swim-icon.lit-plugin::before {
    content: '\\eb1c';
  }
  .swim-icon.lit-plugin-outline::before {
    content: '\\eb1d';
  }
  .swim-icon.lit-plugin-outline-small::before {
    content: '\\eb1e';
  }
  .swim-icon.lit-plus::before {
    content: '\\eb1f';
  }
  .swim-icon.lit-plus-bold::before {
    content: '\\eb20';
  }
  .swim-icon.lit-prev::before {
    content: '\\eb21';
  }
  .swim-icon.lit-printer::before {
    content: '\\eb22';
  }
  .swim-icon.lit-profile::before {
    content: '\\eb23';
  }
  .swim-icon.lit-profile-filled::before {
    content: '\\eb24';
  }
  .swim-icon.lit-promote::before {
    content: '\\eb25';
  }
  .swim-icon.lit-promote-horizontal::before {
    content: '\\eb26';
  }
  .swim-icon.lit-question::before {
    content: '\\eb27';
  }
  .swim-icon.lit-question-filled::before {
    content: '\\eb28';
  }
  .swim-icon.lit-question-filled-sm::before {
    content: '\\eb29';
  }
  .swim-icon.lit-radio-button::before {
    content: '\\eb2a';
  }
  .swim-icon.lit-redo::before {
    content: '\\eb2b';
  }
  .swim-icon.lit-redo-all::before {
    content: '\\eb2c';
  }
  .swim-icon.lit-reference::before {
    content: '\\eb2d';
  }
  .swim-icon.lit-reference-grid::before {
    content: '\\eb2e';
  }
  .swim-icon.lit-reference-multi::before {
    content: '\\eb2f';
  }
  .swim-icon.lit-reference-single::before {
    content: '\\eb30';
  }
  .swim-icon.lit-reference-tree::before {
    content: '\\eb31';
  }
  .swim-icon.lit-refresh::before {
    content: '\\eb32';
  }
  .swim-icon.lit-refresh-circle::before {
    content: '\\eb33';
  }
  .swim-icon.lit-refresh-small::before {
    content: '\\eb34';
  }
  .swim-icon.lit-remove::before {
    content: '\\eb35';
  }
  .swim-icon.lit-remove-edge::before {
    content: '\\eb36';
  }
  .swim-icon.lit-remove-node::before {
    content: '\\eb37';
  }
  .swim-icon.lit-remove-users::before {
    content: '\\eb38';
  }
  .swim-icon.lit-repeat::before {
    content: '\\eb39';
  }
  .swim-icon.lit-replace::before {
    content: '\\eb3a';
  }
  .swim-icon.lit-reports::before {
    content: '\\eb3b';
  }
  .swim-icon.lit-reports-outline::before {
    content: '\\eb3c';
  }
  .swim-icon.lit-resize::before {
    content: '\\eb3d';
  }
  .swim-icon.lit-right-align::before {
    content: '\\eb3e';
  }
  .swim-icon.lit-rocket::before {
    content: '\\eb3f';
  }
  .swim-icon.lit-rotate::before {
    content: '\\eb40';
  }
  .swim-icon.lit-rule-outline::before {
    content: '\\eb41';
  }
  .swim-icon.lit-runner::before {
    content: '\\eb42';
  }
  .swim-icon.lit-runs-outline::before {
    content: '\\eb43';
  }
  .swim-icon.lit-runs-outline-small::before {
    content: '\\eb44';
  }
  .swim-icon.lit-sankey::before {
    content: '\\eb45';
  }
  .swim-icon.lit-save::before {
    content: '\\eb46';
  }
  .swim-icon.lit-save-outline::before {
    content: '\\eb47';
  }
  .swim-icon.lit-save-outline-large::before {
    content: '\\eb48';
  }
  .swim-icon.lit-save-outline-small::before {
    content: '\\eb49';
  }
  .swim-icon.lit-screen::before {
    content: '\\eb4a';
  }
  .swim-icon.lit-screen-1::before {
    content: '\\eb4b';
  }
  .swim-icon.lit-search::before {
    content: '\\eb4c';
  }
  .swim-icon.lit-section::before {
    content: '\\eb4d';
  }
  .swim-icon.lit-select-all::before {
    content: '\\eb4e';
  }
  .swim-icon.lit-select-user::before {
    content: '\\eb4f';
  }
  .swim-icon.lit-select-users::before {
    content: '\\eb50';
  }
  .swim-icon.lit-sensor-outline::before {
    content: '\\eb51';
  }
  .swim-icon.lit-sensor-outline-small::before {
    content: '\\eb52';
  }
  .swim-icon.lit-server::before {
    content: '\\eb53';
  }
  .swim-icon.lit-shield::before {
    content: '\\eb54';
  }
  .swim-icon.lit-shrink::before {
    content: '\\eb55';
  }
  .swim-icon.lit-skip::before {
    content: '\\eb56';
  }
  .swim-icon.lit-slide-left::before {
    content: '\\eb57';
  }
  .swim-icon.lit-slide-right::before {
    content: '\\eb58';
  }
  .swim-icon.lit-sliders::before {
    content: '\\eb59';
  }
  .swim-icon.lit-smartphone::before {
    content: '\\eb5a';
  }
  .swim-icon.lit-smiley-frown::before {
    content: '\\eb5b';
  }
  .swim-icon.lit-snapshot::before {
    content: '\\eb5c';
  }
  .swim-icon.lit-solution::before {
    content: '\\eb5d';
  }
  .swim-icon.lit-sort-ascending::before {
    content: '\\eb5e';
  }
  .swim-icon.lit-sort-descending::before {
    content: '\\eb5f';
  }
  .swim-icon.lit-spaces::before {
    content: '\\eb60';
  }
  .swim-icon.lit-spaces-list::before {
    content: '\\eb61';
  }
  .swim-icon.lit-spaces-outline::before {
    content: '\\eb62';
  }
  .swim-icon.lit-spaces-outline-large::before {
    content: '\\eb63';
  }
  .swim-icon.lit-speedometer::before {
    content: '\\eb64';
  }
  .swim-icon.lit-split-handle::before {
    content: '\\eb65';
  }
  .swim-icon.lit-square::before {
    content: '\\eb66';
  }
  .swim-icon.lit-square-filled::before {
    content: '\\eb67';
  }
  .swim-icon.lit-star::before {
    content: '\\eb68';
  }
  .swim-icon.lit-star-filled::before {
    content: '\\eb69';
  }
  .swim-icon.lit-stars::before {
    content: '\\eb6a';
  }
  .swim-icon.lit-stopwatch::before {
    content: '\\eb6b';
  }
  .swim-icon.lit-superscript::before {
    content: '\\eb6c';
  }
  .swim-icon.lit-swap::before {
    content: '\\eb6d';
  }
  .swim-icon.lit-switch::before {
    content: '\\eb6e';
  }
  .swim-icon.lit-system-diagnostics::before {
    content: '\\eb6f';
  }
  .swim-icon.lit-system-diagnostics-2::before {
    content: '\\eb70';
  }
  .swim-icon.lit-table::before {
    content: '\\eb71';
  }
  .swim-icon.lit-tabs::before {
    content: '\\eb72';
  }
  .swim-icon.lit-tag-filled::before {
    content: '\\eb73';
  }
  .swim-icon.lit-tags-outline::before {
    content: '\\eb74';
  }
  .swim-icon.lit-target::before {
    content: '\\eb75';
  }
  .swim-icon.lit-task-outline::before {
    content: '\\eb76';
  }
  .swim-icon.lit-thumb-down-filled::before {
    content: '\\eb77';
  }
  .swim-icon.lit-thumb-down-outline::before {
    content: '\\eb78';
  }
  .swim-icon.lit-thumb-down-outline-large::before {
    content: '\\eb79';
  }
  .swim-icon.lit-thumb-up-filled::before {
    content: '\\eb7a';
  }
  .swim-icon.lit-thumb-up-outline::before {
    content: '\\eb7b';
  }
  .swim-icon.lit-thumb-up-outline-large::before {
    content: '\\eb7c';
  }
  .swim-icon.lit-tracking-id::before {
    content: '\\eb7d';
  }
  .swim-icon.lit-transfer::before {
    content: '\\eb7e';
  }
  .swim-icon.lit-trash::before {
    content: '\\eb7f';
  }
  .swim-icon.lit-tree::before {
    content: '\\eb80';
  }
  .swim-icon.lit-tree-collapse::before {
    content: '\\eb81';
  }
  .swim-icon.lit-tree-expand::before {
    content: '\\eb82';
  }
  .swim-icon.lit-trend-down::before {
    content: '\\eb83';
  }
  .swim-icon.lit-trend-level::before {
    content: '\\eb84';
  }
  .swim-icon.lit-trend-up::before {
    content: '\\eb85';
  }
  .swim-icon.lit-trending::before {
    content: '\\eb86';
  }
  .swim-icon.lit-underline::before {
    content: '\\eb87';
  }
  .swim-icon.lit-undo::before {
    content: '\\eb88';
  }
  .swim-icon.lit-undo-all::before {
    content: '\\eb89';
  }
  .swim-icon.lit-unlink::before {
    content: '\\eb8a';
  }
  .swim-icon.lit-upload-outline::before {
    content: '\\eb8b';
  }
  .swim-icon.lit-upload-outline-large::before {
    content: '\\eb8c';
  }
  .swim-icon.lit-upload-outline-small::before {
    content: '\\eb8d';
  }
  .swim-icon.lit-user::before {
    content: '\\eb8e';
  }
  .swim-icon.lit-user-add::before {
    content: '\\eb8f';
  }
  .swim-icon.lit-user-circle::before {
    content: '\\eb90';
  }
  .swim-icon.lit-user-groups::before {
    content: '\\eb91';
  }
  .swim-icon.lit-users::before {
    content: '\\eb92';
  }
  .swim-icon.lit-version::before {
    content: '\\eb93';
  }
  .swim-icon.lit-vert-bar-graph-grouped::before {
    content: '\\eb94';
  }
  .swim-icon.lit-vert-full-stack-bar::before {
    content: '\\eb95';
  }
  .swim-icon.lit-view-code::before {
    content: '\\eb96';
  }
  .swim-icon.lit-view-designer::before {
    content: '\\eb97';
  }
  .swim-icon.lit-view-split::before {
    content: '\\eb98';
  }
  .swim-icon.lit-wand::before {
    content: '\\eb99';
  }
  .swim-icon.lit-warning-filled::before {
    content: '\\eb9a';
  }
  .swim-icon.lit-warning-filled-sm::before {
    content: '\\eb9b';
  }
  .swim-icon.lit-warning-thin::before {
    content: '\\eb9c';
  }
  .swim-icon.lit-web-api::before {
    content: '\\eb9d';
  }
  .swim-icon.lit-webhook-outline::before {
    content: '\\eb9e';
  }
  .swim-icon.lit-webhook-outline-large::before {
    content: '\\eb9f';
  }
  .swim-icon.lit-webhook-outline-small::before {
    content: '\\eba0';
  }
  .swim-icon.lit-widget::before {
    content: '\\eba1';
  }
  .swim-icon.lit-worker::before {
    content: '\\eba2';
  }
  .swim-icon.lit-workflow::before {
    content: '\\eba3';
  }
  .swim-icon.lit-workflow-alternate::before {
    content: '\\eba4';
  }
  .swim-icon.lit-workflow-alternate-large::before {
    content: '\\eba5';
  }
  .swim-icon.lit-workflow-alternate-small::before {
    content: '\\eba6';
  }
  .swim-icon.lit-workspaces::before {
    content: '\\eba7';
  }
  .swim-icon.lit-workstation::before {
    content: '\\eba8';
  }
  .swim-icon.lit-wrench::before {
    content: '\\eba9';
  }
  .swim-icon.lit-x::before {
    content: '\\ebaa';
  }
  .swim-icon.lit-x-filled::before {
    content: '\\ebab';
  }
  .swim-icon.lit-x-small::before {
    content: '\\ebac';
  }
`,Qi=sr(`'${cr}'`),ta=k`
  :host {
    /* inline-flex keeps the host box tight to the glyph and centers the shadow icon in contexts
       (e.g. swim-button) where inherited line-height would otherwise grow the line box asymmetrically */
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: middle;
    line-height: 1;
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
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: inherit;
    line-height: 1em;
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

  /* Modifier: badge overlay (small icon at top-right), match swim-ui icons-effects */
  .icon-fx-badge {
    font-size: 0.25em !important;
    position: relative;
    top: -0.5em;
    left: 0.5em;
    width: auto;
    height: auto;
  }

  /* Modifier: red color for overlay icon (match swim-ui) */
  .text-red {
    color: var(--red-500);
  }

  /* Font icon base (glyphs in icon-font-glyphs.ts); same codepoints as ngx-ui icon font. */
  .swim-icon,
  .swim-icon__i.swim-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1em;
    height: 1em;
    font: normal normal normal 1em/1 ${Qi};
    font-family: ${Qi}, sans-serif;
    flex-shrink: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Center the glyph in the em box; many icon glyphs sit high with display:block alone */
  .swim-icon::before,
  .swim-icon__i.swim-icon::before {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    line-height: 1;
  }

  [class^='icon-']:before,
  [class*='icon-']:before {
    line-height: 1;
    font: normal normal normal 1em/1 ${Qi};
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

  ${ea}
`,ao="data-swim-ui-icon-font-face";let eo=!1;function ia(){if(typeof document>"u"||document.head.querySelector(`style[${ao}]`))return;const s=new URL("/ngx-ui/swim-ui/assets/swim-ui-icon-PORrMUGe.woff2",import.meta.url).href,e=document.createElement("style");e.setAttribute(ao,""),e.textContent=`@font-face{font-family:'${cr}';src:url('${s}') format('woff2');font-weight:normal;font-style:normal;font-display:block;}`,document.head.appendChild(e)}function oa(){typeof document>"u"||document.head.querySelector(`style[${ao}]`)||eo||(eo=!0,queueMicrotask(()=>{eo=!1,ia()}))}const sa=s=>`swim-icon ${s.trim().split(" ").map(t=>{const[i,o]=t.split(":");return i.length?`${i} ${i}-${o}`:o}).join(" ")}`;class na{constructor(){this._defaultFontSetClass="lit",this._iconMap=new Map}setDefaultFontSetClass(e){return this._defaultFontSetClass=e,this._defaultFontSetClass}get(e,t){return this.lookup(e,t).map(i=>sa(i))}lookup(e,t){const i=t??this._defaultFontSetClass;return(Array.isArray(e)?e:[e]).reduce((o,n)=>{const r=this._expandKeys(n,i).map(l=>{const c=this._iconMap.get(l);return c&&c.length===1?c[0]:l}).join(" ");return o.concat(this._iconMap.get(r)||[r])},[])}add(e,t){const i=this._expandKeys(e,this._defaultFontSetClass).join(" "),o=this.lookup(t);this._iconMap.set(i,o)}_expandKeys(e,t){return e.split(" ").map(i=>i.includes(":")?i:`${t}:${i}`)}}const ra=new na;var aa=Object.defineProperty,Xt=(s,e,t,i)=>{for(var o=void 0,n=s.length-1,r;n>=0;n--)(r=s[n])&&(o=r(e,t,o)||o);return o&&aa(e,t,o),o};oa();const Us="swim-icon",To=class To extends ${constructor(){super(...arguments),this.fontIcon="",this.alt="",this.fontSet="lit",this.iconClass="",this._cssClasses=[],this._iconClassTokensOnHost=[]}connectedCallback(){super.connectedCallback(),this._updateFontIcon()}updated(e){super.updated(e),(e.has("fontIcon")||e.has("fontSet"))&&this._updateFontIcon(),e.has("iconClass")&&this._syncIconClassToHost()}_syncIconClassToHost(){var t;const e=(((t=this.iconClass)==null?void 0:t.trim())??"").split(/\s+/).filter(Boolean);this._iconClassTokensOnHost.forEach(i=>this.classList.remove(i)),e.forEach(i=>this.classList.add(i)),this._iconClassTokensOnHost=e}_parseFontIcon(e){if(Array.isArray(e))return e.filter(Boolean);if(typeof e!="string"||!e)return[];const t=e.trim();if(t.startsWith("["))try{const i=JSON.parse(t);return Array.isArray(i)?i:[t]}catch{return[t]}return[t]}_updateFontIcon(){const e=this._parseFontIcon(this.fontIcon);if(e.length===0){this._cssClasses=[];return}this._cssClasses=ra.get(e,this.fontSet)}render(){var n;const e=this._cssClasses,t=!!this.alt,i=((n=this.iconClass)==null?void 0:n.trim())??"",o=i?` ${i}`:"";return!e||e.length===0?h`
        <span
          part="icon"
          class="${i}"
          role="${t?"img":"presentation"}"
          aria-label="${t?this.alt:g}"
          aria-hidden="${t?"false":"true"}"
        >
          <slot></slot>
        </span>
      `:e.length===1?h`
        <i
          part="icon"
          class="swim-icon__i ${e[0]}${o}"
          role="${t?"img":"presentation"}"
          aria-label="${t?this.alt:g}"
          aria-hidden="${t?"false":"true"}"
        ></i>
      `:h`
      <span
        class="swim-icon__stack"
        role="${t?"img":"presentation"}"
        aria-label="${t?this.alt:g}"
        aria-hidden="${t?"false":"true"}"
      >
        ${e.map((r,l)=>h`<i part="icon icon-${l}" class="swim-icon__i swim-icon__i--${l} ${r}${o}"></i>`)}
      </span>
    `}};To.styles=[D,ta];let Ze=To;Xt([a({type:String,attribute:"font-icon"})],Ze.prototype,"fontIcon");Xt([a({type:String})],Ze.prototype,"alt");Xt([a({type:String,attribute:"font-set"})],Ze.prototype,"fontSet");Xt([a({type:String,attribute:"icon-class"})],Ze.prototype,"iconClass");Xt([_()],Ze.prototype,"_cssClasses");customElements.get(Us)||customElements.define(Us,Ze);var la=Object.defineProperty,ca=Object.getOwnPropertyDescriptor,ge=(s,e,t,i)=>{for(var o=i>1?void 0:i?ca(e,t):e,n=s.length-1,r;n>=0;n--)(r=s[n])&&(o=(i?r(e,t,o):r(o))||o);return i&&o&&la(e,t,o),o};const js="swim-button",Ci=class Ci extends ${constructor(){super(),this.variant="default",this.size="medium",this._disabled=!1,this._state=xe.Active,this.type="button",this.loadingText="",this.wrapText=!0,this._inProgress=!1,this._success=!1,this._fail=!1,this._internals=this.attachInternals()}get disabled(){return this._disabled}set disabled(e){this._disabled=b(e)}get state(){return this._state}set state(e){this._state=e,this._updateStateFlags()}get timeout(){return this._timeout}set timeout(e){this._timeout=e===void 0?void 0:F(e)}get promise(){return this._promise}set promise(e){this._promise=e,this._handlePromise()}connectedCallback(){super.connectedCallback(),this._updateState()}disconnectedCallback(){super.disconnectedCallback(),this._clearTimer()}render(){return h`
      <button
        part="button"
        type="button"
        ?disabled="${this.disabled}"
        ?aria-busy="${this._inProgress}"
        @click="${this._handleClick}"
      >
        <span class="content" ?aria-hidden="${this._inProgress||this._success||this._fail}">
          <slot></slot>
        </span>
        <span class="state-icon">${this._renderStateIcon()}</span>
      </button>
    `}_renderStateIcon(){return this._inProgress?h`
        <span class="state-icon-group">
          <swim-icon class="icon" font-icon="loading"></swim-icon>
          ${this.loadingText?h`<span class="state-loading-text">${this.loadingText}</span>`:g}
        </span>
      `:this._success?h`<swim-icon class="state-icon" font-icon="check"></swim-icon>`:this._fail?h`<swim-icon class="state-icon" font-icon="x"></swim-icon>`:g}_handleClick(e){if(this.disabled){e.stopPropagation(),e.preventDefault();return}const t=this._internals.form;t&&(this.type==="submit"?t.requestSubmit():this.type==="reset"&&t.reset())}_updateStateFlags(){this._inProgress=this._state===xe.InProgress,this._success=this._state===xe.Success,this._fail=this._state===xe.Fail}_updateState(){this._state||(this.state=xe.Active)}_scheduleReturnToActive(){const e=this.timeout??3e3;e<=0||(this._clearTimer(),this._timer=window.setTimeout(()=>{this.state=xe.Active},e))}_handlePromise(){this._promise&&(this.state=xe.InProgress,this._promise.then(()=>{this.state=xe.Success,this._scheduleReturnToActive()}).catch(()=>{this.state=xe.Fail,this._scheduleReturnToActive()}))}_clearTimer(){this._timer!==void 0&&(clearTimeout(this._timer),this._timer=void 0)}};Ci.styles=[D,Qr],Ci.formAssociated=!0;let ie=Ci;ge([a({type:String,reflect:!0})],ie.prototype,"variant",2);ge([a({type:String,reflect:!0})],ie.prototype,"size",2);ge([a({type:Boolean,reflect:!0,converter:w})],ie.prototype,"disabled",1);ge([a({type:String,reflect:!0})],ie.prototype,"state",1);ge([a({type:String})],ie.prototype,"type",2);ge([a({type:Number})],ie.prototype,"timeout",1);ge([a({type:String,attribute:"loading-text"})],ie.prototype,"loadingText",2);ge([a({type:Boolean,reflect:!0,attribute:"wrap-text",converter:ce})],ie.prototype,"wrapText",2);ge([a({attribute:!1})],ie.prototype,"promise",1);ge([_()],ie.prototype,"_inProgress",2);ge([_()],ie.prototype,"_success",2);ge([_()],ie.prototype,"_fail",2);customElements.get(js)||customElements.define(js,ie);const da=k`
  :host {
    display: inline-flex;
    position: relative;
    box-sizing: border-box;

    /* Default colors - slotted swim-button inherits via --swim-button-* */
    --swim-button-background: var(--grey-600);
    --swim-button-border-color: var(--grey-600);
    --swim-button-color: var(--white);
    --swim-button-hover-background: var(--grey-700);
  }

  :host([button-group-style='primary']) {
    --swim-button-background: var(--blue-400);
    --swim-button-border-color: var(--blue-400);
    --swim-button-color: var(--white);
    --swim-button-hover-background: var(--blue-500);
  }

  /* Contained group: slotted buttons use group colors and no individual shadow */
  :host([variant='contained']) {
    --swim-button-shadow: none;
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
`;var dr=(s=>(s.Horizontal="horizontal",s.Vertical="vertical",s))(dr||{}),hr=(s=>(s.Contained="contained",s.Text="text",s))(hr||{}),ur=(s=>(s.Default="default",s.Primary="primary",s))(ur||{}),ha=Object.defineProperty,vo=(s,e,t,i)=>{for(var o=void 0,n=s.length-1,r;n>=0;n--)(r=s[n])&&(o=r(e,t,o)||o);return o&&ha(e,t,o),o};const Gs="swim-button-group",Io=class Io extends ${constructor(){super(...arguments),this.orientation=dr.Horizontal,this.variant=hr.Contained,this.buttonGroupStyle=ur.Default}render(){return h`<slot></slot>`}};Io.styles=[D,da];let kt=Io;vo([a({type:String,reflect:!0})],kt.prototype,"orientation");vo([a({type:String,reflect:!0})],kt.prototype,"variant");vo([a({attribute:"button-group-style",type:String,reflect:!0})],kt.prototype,"buttonGroupStyle");customElements.get(Gs)||customElements.define(Gs,kt);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ge={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4},yo=s=>(...e)=>({_$litDirective$:s,values:e});let xo=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{I:ua}=Wr,Ws=s=>s,pa=s=>s.strings===void 0,Ks=()=>document.createComment(""),Bt=(s,e,t)=>{var n;const i=s._$AA.parentNode,o=e===void 0?s._$AB:e._$AA;if(t===void 0){const r=i.insertBefore(Ks(),o),l=i.insertBefore(Ks(),o);t=new ua(r,l,s,s.options)}else{const r=t._$AB.nextSibling,l=t._$AM,c=l!==s;if(c){let d;(n=t._$AQ)==null||n.call(t,s),t._$AM=s,t._$AP!==void 0&&(d=s._$AU)!==l._$AU&&t._$AP(d)}if(r!==o||c){let d=t._$AA;for(;d!==r;){const m=Ws(d).nextSibling;Ws(i).insertBefore(d,o),d=m}}}return t},it=(s,e,t=s)=>(s._$AI(e,t),s),ma={},pr=(s,e=ma)=>s._$AH=e,fa=s=>s._$AH,to=s=>{s._$AR(),s._$AA.remove()};/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Zs=yo(class extends xo{constructor(s){if(super(s),s.type!==Ge.PROPERTY&&s.type!==Ge.ATTRIBUTE&&s.type!==Ge.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!pa(s))throw Error("`live` bindings can only contain a single expression")}render(s){return s}update(s,[e]){if(e===ue||e===g)return e;const t=s.element,i=s.name;if(s.type===Ge.PROPERTY){if(e===t[i])return ue}else if(s.type===Ge.BOOLEAN_ATTRIBUTE){if(!!e===t.hasAttribute(i))return ue}else if(s.type===Ge.ATTRIBUTE&&t.getAttribute(i)===e+"")return ue;return pr(s),e}});/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ke=s=>s??g,St=k`
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
`,ga=k`
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
    font-size: var(--font-size-xs);
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
    font-size: var(--font-size-s);
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
`;var Pe=(s=>(s.text="text",s.password="password",s.email="email",s.number="number",s.tel="tel",s.url="url",s.textarea="textarea",s))(Pe||{}),ko=(s=>(s.legacy="legacy",s.fill="fill",s))(ko||{}),$o=(s=>(s.sm="sm",s.md="md",s.lg="lg",s))($o||{}),ba=Object.defineProperty,_a=Object.getOwnPropertyDescriptor,B=(s,e,t,i)=>{for(var o=i>1?void 0:i?_a(e,t):e,n=s.length-1,r;n>=0;n--)(r=s[n])&&(o=(i?r(e,t,o):r(o))||o);return i&&o&&ba(e,t,o),o};const Js="swim-input",Si=class Si extends ${constructor(){super(),this.type=Pe.text,this.label="",this.placeholder="",this.hint="",this._value="",this.name="",this.id=`swim-input-${Math.random().toString(36).substr(2,9)}`,this._disabled=!1,this._readonly=!1,this._required=!1,this._autofocus=!1,this.autocomplete="off",this.appearance=ko.legacy,this.size=$o.sm,this._withMargin=!0,this._withHint=!0,this._passwordToggleEnabled=!1,this.textareaRows=3,this.requiredIndicator="*",this._focused=!1,this._passwordVisible=!1,this._touched=!1,this._dirty=!1,this._invalid=!1,this._internals=this.attachInternals()}get value(){return this._value}set value(e){const t=this._value;this._value=e,this._internals.setFormValue(e),this.requestUpdate("value",t),this._updateActiveState()}get disabled(){return this._disabled}set disabled(e){this._disabled=b(e)}get readonly(){return this._readonly}set readonly(e){this._readonly=b(e)}get required(){return this._required}set required(e){this._required=b(e)}get autofocus(){return this._autofocus}set autofocus(e){this._autofocus=b(e)}get marginless(){return!this._withMargin}set marginless(e){this._withMargin=!b(e)}get withHint(){return this._withHint}set withHint(e){this._withHint=b(e)}get passwordToggleEnabled(){return this._passwordToggleEnabled}set passwordToggleEnabled(e){this._passwordToggleEnabled=b(e)}connectedCallback(){super.connectedCallback(),this._updateActiveState()}firstUpdated(){this.autofocus&&this.inputElement&&setTimeout(()=>{this.inputElement.focus()})}focus(e){const t=this.inputElement;if(t){t.focus(e);return}this.updateComplete.then(()=>{var i;return(i=this.inputElement)==null?void 0:i.focus(e)})}blur(){const e=this.inputElement;if(e){e.blur();return}this.updateComplete.then(()=>{var t;return(t=this.inputElement)==null?void 0:t.blur()})}updated(e){super.updated(e),e.has("value")&&this._updateActiveState(),(e.has("required")||e.has("min")||e.has("max"))&&this._validate()}render(){const e=this.type===Pe.textarea,t=this.type===Pe.password&&this.passwordToggleEnabled&&!this.disabled,i=this.type===Pe.number&&!this.disabled,o=this._passwordVisible?Pe.text:this.type;return h`
      <div class="input-wrap">
        <div class="input-flex-wrap">
          <slot name="prefix"></slot>
          <div class="input-flex-wrap-inner">
            <div class="input-box-wrap">
              ${e?this._renderTextarea():this._renderInput(o)}
              ${i?h`
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
                  `:g}
              ${t?h`
                    <button
                      type="button"
                      class="password-toggle"
                      @click="${this._togglePassword}"
                      aria-label="Toggle password visibility"
                    >
                      <swim-icon font-icon="${this._passwordVisible?"eye-disabled":"eye"}"></swim-icon>
                    </button>
                  `:g}
            </div>
            <label class="input-label" part="label" for="${this.id}">
              ${this.label} ${this.required?h`<span>${this.requiredIndicator}</span>`:g}
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
    `}_renderInput(e){return h`
      <input
        part="input"
        class="input-box"
        type="${e}"
        id="${this.id}"
        name="${this.name}"
        .value="${Zs(this.value)}"
        placeholder="${this.placeholder}"
        ?disabled="${this.disabled}"
        ?readonly="${this.readonly}"
        ?required="${this.required}"
        min="${ke(this.min)}"
        max="${ke(this.max)}"
        minlength="${ke(this.minlength)}"
        maxlength="${ke(this.maxlength)}"
        tabindex="${ke(this.tabindex)}"
        autocomplete="${this.autocomplete}"
        @input="${this._handleInput}"
        @change="${this._handleChange}"
        @focus="${this._handleFocus}"
        @blur="${this._handleBlur}"
      />
    `}_renderTextarea(){return h`
      <textarea
        part="input"
        class="input-textarea swim-scroll"
        id="${this.id}"
        name="${this.name}"
        .value="${Zs(this.value)}"
        placeholder="${this.placeholder}"
        ?disabled="${this.disabled}"
        ?readonly="${this.readonly}"
        ?required="${this.required}"
        rows="${this.textareaRows}"
        minlength="${ke(this.minlength)}"
        maxlength="${ke(this.maxlength)}"
        tabindex="${ke(this.tabindex)}"
        autocomplete="${this.autocomplete}"
        @input="${this._handleInput}"
        @change="${this._handleChange}"
        @focus="${this._handleFocus}"
        @blur="${this._handleBlur}"
      ></textarea>
    `}_handleInput(e){const t=e.target;this.value=t.value,this._dirty||(this._dirty=!0,this.setAttribute("dirty","")),this.dispatchEvent(new Event("input",{bubbles:!1,composed:!1}))}_handleChange(e){this._validate(),this.dispatchEvent(new Event("change",{bubbles:!1,composed:!1}))}_handleFocus(e){this._focused=!0,this.setAttribute("focused",""),this.dispatchEvent(new FocusEvent("focus",{bubbles:!1,composed:!1}))}_handleBlur(e){this._focused=!1,this.removeAttribute("focused"),this._touched||(this._touched=!0,this.setAttribute("touched","")),this._validate(),this.dispatchEvent(new FocusEvent("blur",{bubbles:!1,composed:!1}))}_togglePassword(){var e;this._passwordVisible=!this._passwordVisible,(e=this.inputElement)==null||e.focus()}_incrementValue(e){e.preventDefault(),!this.disabled&&(this._increment(),this._spinnerTimeout=window.setTimeout(()=>{this._spinnerInterval=window.setInterval(()=>this._increment(),50)},500))}_decrementValue(e){e.preventDefault(),!this.disabled&&(this._decrement(),this._spinnerTimeout=window.setTimeout(()=>{this._spinnerInterval=window.setInterval(()=>this._decrement(),50)},500))}disconnectedCallback(){super.disconnectedCallback(),this._stopSpinner()}_stopSpinner(){this._spinnerTimeout!==void 0&&(clearTimeout(this._spinnerTimeout),this._spinnerTimeout=void 0),this._spinnerInterval!==void 0&&(clearInterval(this._spinnerInterval),this._spinnerInterval=void 0)}_increment(){if(this.inputElement&&this.type===Pe.number){const e=this.inputElement,t=parseFloat(e.value)||0;if(this.max!==void 0&&t>=this.max)return;const i=t+1;this.value=i.toString(),this.dispatchEvent(new Event("change",{bubbles:!1,composed:!1}))}}_decrement(){if(this.inputElement&&this.type===Pe.number){const e=this.inputElement,t=parseFloat(e.value)||0;if(this.min!==void 0&&t<=this.min)return;const i=t-1;this.value=i.toString(),this.dispatchEvent(new Event("change",{bubbles:!1,composed:!1}))}}_validate(){let e=!0;if(this.required&&!this.value&&(e=!1),this.type===Pe.number&&this.value){const t=parseFloat(this.value);this.min!==void 0&&t<this.min&&(e=!1),this.max!==void 0&&t>this.max&&(e=!1)}return this.minlength&&this.value.length<this.minlength&&(e=!1),this.maxlength&&this.value.length>this.maxlength&&(e=!1),this.inputElement&&(this.inputElement.validity.valid||(e=!1)),this._invalid=!e,this._invalid?(this.setAttribute("invalid",""),this._internals.setValidity({customError:!0},"Invalid input")):(this.removeAttribute("invalid"),this._internals.setValidity({})),e}_updateActiveState(){const e=this.value&&this.value.length>0,t=!!this.placeholder;this._focused||e?this.setAttribute("active",""):this.removeAttribute("active"),t?this.setAttribute("has-placeholder",""):this.removeAttribute("has-placeholder"),this.label?this.removeAttribute("no-label"):this.setAttribute("no-label","")}formResetCallback(){this.value="",this._touched=!1,this._dirty=!1,this.removeAttribute("touched"),this.removeAttribute("dirty")}formDisabledCallback(e){this.disabled=e}};Si.styles=[D,St,ga],Si.formAssociated=!0;let L=Si;B([ee(".input-box, .input-textarea")],L.prototype,"inputElement",2);B([a({type:String})],L.prototype,"type",2);B([a({type:String})],L.prototype,"label",2);B([a({type:String})],L.prototype,"placeholder",2);B([a({type:String})],L.prototype,"hint",2);B([a({type:String})],L.prototype,"value",1);B([a({type:String})],L.prototype,"name",2);B([a({type:String})],L.prototype,"id",2);B([a({type:Boolean,reflect:!0,converter:w})],L.prototype,"disabled",1);B([a({type:Boolean,reflect:!0,converter:w})],L.prototype,"readonly",1);B([a({type:Boolean,reflect:!0,converter:w})],L.prototype,"required",1);B([a({type:Boolean,converter:w})],L.prototype,"autofocus",1);B([a({type:String})],L.prototype,"autocomplete",2);B([a({type:String,reflect:!0})],L.prototype,"appearance",2);B([a({type:String,reflect:!0})],L.prototype,"size",2);B([a({type:Boolean,reflect:!0,attribute:"marginless",converter:w})],L.prototype,"marginless",1);B([a({type:Boolean,converter:ce})],L.prototype,"withHint",1);B([a({type:Boolean,attribute:"password-toggle-enabled",converter:w})],L.prototype,"passwordToggleEnabled",1);B([a({type:Number})],L.prototype,"min",2);B([a({type:Number})],L.prototype,"max",2);B([a({type:Number})],L.prototype,"minlength",2);B([a({type:Number})],L.prototype,"maxlength",2);B([a({type:Number,attribute:"textarea-rows"})],L.prototype,"textareaRows",2);B([a({type:String,attribute:"required-indicator"})],L.prototype,"requiredIndicator",2);B([a({type:Number})],L.prototype,"tabindex",2);B([_()],L.prototype,"_focused",2);B([_()],L.prototype,"_passwordVisible",2);B([_()],L.prototype,"_touched",2);B([_()],L.prototype,"_dirty",2);B([_()],L.prototype,"_invalid",2);customElements.get(Js)||customElements.define(Js,L);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Xs=(s,e,t)=>{const i=new Map;for(let o=e;o<=t;o++)i.set(s[o],o);return i},mr=yo(class extends xo{constructor(s){if(super(s),s.type!==Ge.CHILD)throw Error("repeat() can only be used in text expressions")}dt(s,e,t){let i;t===void 0?t=e:e!==void 0&&(i=e);const o=[],n=[];let r=0;for(const l of s)o[r]=i?i(l,r):r,n[r]=t(l,r),r++;return{values:n,keys:o}}render(s,e,t){return this.dt(s,e,t).values}update(s,[e,t,i]){const o=fa(s),{values:n,keys:r}=this.dt(e,t,i);if(!Array.isArray(o))return this.ut=r,n;const l=this.ut??(this.ut=[]),c=[];let d,m,u=0,p=o.length-1,f=0,x=n.length-1;for(;u<=p&&f<=x;)if(o[u]===null)u++;else if(o[p]===null)p--;else if(l[u]===r[f])c[f]=it(o[u],n[f]),u++,f++;else if(l[p]===r[x])c[x]=it(o[p],n[x]),p--,x--;else if(l[u]===r[x])c[x]=it(o[u],n[x]),Bt(s,c[x+1],o[u]),u++,x--;else if(l[p]===r[f])c[f]=it(o[p],n[f]),Bt(s,o[u],o[p]),p--,f++;else if(d===void 0&&(d=Xs(r,f,x),m=Xs(l,u,p)),d.has(l[u]))if(d.has(l[p])){const P=m.get(r[f]),G=P!==void 0?o[P]:null;if(G===null){const R=Bt(s,o[u]);it(R,n[f]),c[f]=R}else c[f]=it(G,n[f]),Bt(s,o[u],G),o[P]=null;f++}else to(o[p]),p--;else to(o[u]),u++;for(;f<=x;){const P=Bt(s,c[x+1]);it(P,n[f]),c[f++]=P}for(;u<=p;){const P=o[u++];P!==null&&to(P)}return this.ut=r,pr(s,c),ue}}),wa=k`
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

  :host([focused]:not([invalid]):not([disabled])) .select-label {
    color: var(--blue-500) !important;
  }

  :host([invalid][touched]:not([disabled])) .select-underline {
    background-color: var(--red-500) !important;
  }

  :host([invalid][touched]:not([disabled])) .underline-fill {
    background-color: var(--red-500) !important;
  }

  :host([invalid][touched]:not([disabled])) .select-label,
  :host([invalid][touched]:not([disabled])) .select-hint {
    color: var(--red-500);
  }

  :host([disabled]) .select-input {
    cursor: not-allowed;
    color: var(--grey-400);
    user-select: none;
    pointer-events: none;
  }

  :host([disabled]) .select-label {
    color: var(--grey-450);
  }

  :host([disabled]) .select-placeholder {
    color: var(--grey-450);
  }

  :host([disabled]) .select-controls {
    color: var(--grey-500);
  }

  :host([disabled]) .select-underline {
    background-color: var(--grey-700);
  }

  :host([disabled]) .underline-fill {
    width: 0 !important;
  }

  :host([disabled]) .select-hint {
    color: var(--grey-450);
  }

  :host([disabled]) .select-chip {
    background: var(--grey-650);
    color: var(--grey-300);
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
    margin-right: var(--spacing-8);
  }

  :host([open]:not([disabled])) .select-caret {
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
    font-size: var(--font-size-xs);
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

  :host([focused]:not([disabled])) .underline-fill,
  :host([open]:not([disabled])) .underline-fill {
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

  .select-filter-input:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }

  .select-filter--loading .select-filter-input {
    opacity: 0.85;
    cursor: wait;
  }

  .select-filter--loading {
    position: relative;
  }

  .select-options {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .select-options--grouped .select-option {
    padding-left: 25px;
  }

  .select-option-group {
    list-style: none;
    margin: 0;
    padding: 0;
    pointer-events: none;
  }

  .select-option-group-label {
    display: block;
    padding: 7px 15px;
    font-size: var(--font-size-m);
    font-weight: var(--font-weight-semibold);
    line-height: var(--font-line-height-100);
    color: var(--grey-300);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
    padding: 4px 0 0 0;
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
`,va=new Set(["name","value","title","label","description","disabled","group"]);function lo(s,e,t){return e?s.toLowerCase().includes(e.toLowerCase()):!0}function fr(s,e,t,i){if(s==null||i>2)return!1;if(typeof s=="number"||typeof s=="boolean")return lo(String(s),e);if(typeof s=="string")return lo(s,e);if(typeof s=="object"&&!Array.isArray(s)){const o=Object.getOwnPropertyNames(s);for(const n of o)if(fr(s[n],e,t,i+1))return!0}return!1}function ya(s,e,t){const i=e.trim();if(!i)return!0;const o=i.toLowerCase(),n=[s.name,s.title,s.label,s.description,s.value,s.group].filter(r=>r!=null).map(r=>typeof r=="string"?r:String(r));for(const r of n)if(lo(r,o))return!0;for(const r of Object.keys(s))if(!va.has(r)&&fr(s[r],o,t.filterCaseSensitive,0))return!0;return!1}var xa=Object.defineProperty,ka=Object.getOwnPropertyDescriptor,Xe=(s,e,t,i)=>{for(var o=i>1?void 0:i?ka(e,t):e,n=s.length-1,r;n>=0;n--)(r=s[n])&&(o=(i?r(e,t,o):r(o))||o);return i&&o&&xa(e,t,o),o};const Qs="swim-option";class He extends ${constructor(){super(...arguments),this.name="",this.label="",this.title="",this.description="",this.group="",this._disabled=!1,this._hidden=!1}get disabled(){return this._disabled}set disabled(e){this._disabled=b(e)}get hidden(){return this._hidden}set hidden(e){this._hidden=b(e)}createRenderRoot(){return this}render(){return h``}connectedCallback(){super.connectedCallback(),this.style.display="none",this._notifyParent()}disconnectedCallback(){super.disconnectedCallback(),this._notifyParent()}updated(){this._notifyParent()}_notifyParent(){const e=this.closest("swim-select");e&&typeof e._onSlottedOptionsChange=="function"&&e._onSlottedOptionsChange()}}Xe([a({type:String})],He.prototype,"name",2);Xe([a()],He.prototype,"value",2);Xe([a({type:String})],He.prototype,"label",2);Xe([a({type:String})],He.prototype,"title",2);Xe([a({type:String})],He.prototype,"description",2);Xe([a({type:String})],He.prototype,"group",2);Xe([a({type:Boolean,reflect:!0,converter:w})],He.prototype,"disabled",1);Xe([a({type:Boolean,reflect:!0,converter:w})],He.prototype,"hidden",1);customElements.get(Qs)||customElements.define(Qs,He);var $a=Object.defineProperty,Ea=Object.getOwnPropertyDescriptor,S=(s,e,t,i)=>{for(var o=i>1?void 0:i?Ea(e,t):e,n=s.length-1,r;n>=0;n--)(r=s[n])&&(o=(i?r(e,t,o):r(o))||o);return i&&o&&$a(e,t,o),o};const en="swim-select",di=typeof HTMLElement<"u"&&typeof HTMLElement.prototype.showPopover=="function",Di=class Di extends ${constructor(){super(),this.label="",this.placeholder="Select...",this.hint="",this.emptyPlaceholder="No options available",this.filterPlaceholder="Filter options...",this.filterEmptyPlaceholder="No matches",this.filterSearchingPlaceholder="Searching…",this._asyncFilter=!1,this.filterDebounceMs=500,this.filterMinLength=2,this.dropdownAlign="start",this._loading=!1,this.options=[],this._value=[],this.name="",this.id=`swim-select-${Math.random().toString(36).substr(2,9)}`,this._disabled=!1,this._required=!1,this.appearance=ko.legacy,this.size=$o.sm,this._withMargin=!0,this._withHint=!0,this._filterable=!0,this._grouped=!1,this._multiple=!1,this._allowClear=!0,this.requiredIndicator="*",this._slottedOptions=[],this._hasSlottedHint=!1,this._open=!1,this._focused=!1,this._touched=!1,this._invalid=!1,this._filterQuery="",this._focusedIndex=-1,this._internals=this.attachInternals()}get asyncFilter(){return this._asyncFilter}set asyncFilter(e){this._asyncFilter=b(e)}get loading(){return this._loading}set loading(e){this._loading=b(e)}get value(){return this.multiple?this._value:this._value[0]??null}set value(e){const t=this._value;this.multiple?this._value=Array.isArray(e)?e:e?[e]:[]:this._value=e?[e]:[],this._internals.setFormValue(this.multiple?JSON.stringify(this._value):this._value[0]??""),this.requestUpdate("value",t),this._updateActiveState()}get disabled(){return this._disabled}set disabled(e){this._disabled=b(e)}get required(){return this._required}set required(e){this._required=b(e)}get marginless(){return!this._withMargin}set marginless(e){this._withMargin=!b(e)}get withHint(){return this._withHint}set withHint(e){this._withHint=b(e)}get filterable(){return this._filterable}set filterable(e){this._filterable=b(e)}get grouped(){return this._grouped}set grouped(e){this._grouped=b(e)}get multiple(){return this._multiple}set multiple(e){this._multiple=b(e)}get allowClear(){return this._allowClear}set allowClear(e){this._allowClear=b(e)}get _allOptions(){return this.options.length>0&&this._slottedOptions.length>0?[...this.options,...this._slottedOptions]:this.options.length>0?this.options:this._slottedOptions}connectedCallback(){super.connectedCallback(),this._collectSlottedOptions(),this._syncSlottedHintPresence(),this._setupChildObserver(),this._updateActiveState()}disconnectedCallback(){var t,i;const e=(t=this.shadowRoot)==null?void 0:t.querySelector(".select-dropdown");this._teardownDropdownTopLayer(e),super.disconnectedCallback(),this._removeClickOutsideListener(),(i=this._childObserver)==null||i.disconnect(),this._filterDebounceTimer!==void 0&&(clearTimeout(this._filterDebounceTimer),this._filterDebounceTimer=void 0)}_onSlottedOptionsChange(){this._collectSlottedOptions()}_collectSlottedOptions(){const e=Array.from(this.querySelectorAll(":scope > swim-option"));this._slottedOptions=e.filter(t=>!t.hasAttribute("hidden")).map(t=>{const i=t.getAttribute("name")||"",o=t.getAttribute("value"),n=t.getAttribute("group");return{name:i,value:o!==null?o:i,disabled:t.hasAttribute("disabled"),...n!=null&&n.trim()!==""?{group:n.trim()}:{}}})}_syncSlottedHintPresence(){const e=Array.from(this.children).some(t=>t.slot==="hint");e!==this._hasSlottedHint&&(this._hasSlottedHint=e)}_setupChildObserver(){this._childObserver=new MutationObserver(()=>{this._collectSlottedOptions(),this._syncSlottedHintPresence()}),this._childObserver.observe(this,{childList:!0,subtree:!1,attributes:!0,attributeFilter:["slot"]})}updated(e){super.updated(e),e.has("disabled")&&(this.disabled&&(this._focused=!1,this.removeAttribute("focused"),this._open&&this._closeDropdown()),this._updateActiveState()),e.has("value")&&(this._updateActiveState(),this._validate()),e.has("loading")&&e.get("loading")===!0&&!this.loading&&this._open&&this.filterable&&!this.disabled&&this.updateComplete.then(()=>{this.filterInput&&document.activeElement!==this.filterInput&&this.filterInput.focus({preventScroll:!0})}),e.has("_open")&&(this._open?(this.setAttribute("open",""),this._addClickOutsideListener(),this.updateComplete.then(()=>this._layoutOpenDropdownPanel()),setTimeout(()=>{this.filterable&&this.filterInput&&!this.disabled&&this.filterInput.focus()},100)):(this.removeAttribute("open"),this._removeClickOutsideListener(),this._filterQuery="",this._focusedIndex=-1,this._filterDebounceTimer!==void 0&&(clearTimeout(this._filterDebounceTimer),this._filterDebounceTimer=void 0))),this._open&&(e.has("options")||e.has("loading"))&&!e.has("_open")&&this.updateComplete.then(()=>this._layoutOpenDropdownPanel())}render(){const e=this._value.length>0,t=this._getFilteredOptions(),i=this.allowClear&&e&&!this.disabled,o=t.length>0&&!this.loading,n=this.withHint&&(this.hint.trim()!==""||this._hasSlottedHint);return h`
      <div class="select-wrap">
        <div class="select-flex-wrap">
          <div class="select-flex-wrap-inner">
            <div class="select-input-wrap">
              <div
                class="select-input"
                part="select"
                role="combobox"
                aria-disabled="${this.disabled?"true":g}"
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
                  ${i?h`
                        <button
                          type="button"
                          class="select-clear"
                          aria-label="Clear selection"
                          @click="${this._handleClear}"
                        >
                          <swim-icon font-icon="x"></swim-icon>
                        </button>
                      `:g}
                  <button
                    type="button"
                    class="select-caret"
                    aria-label="Toggle dropdown"
                    ?disabled="${this.disabled}"
                    @click="${this._handleToggle}"
                  >
                    <swim-icon font-icon="chevron-bold-down"></swim-icon>
                  </button>
                </div>
              </div>
              <label class="select-label" for="${this.id}">
                ${this.label} ${this.required?h`<span>${this.requiredIndicator}</span>`:g}
              </label>
            </div>
          </div>
        </div>
        <div class="select-underline">
          <div class="underline-fill"></div>
        </div>
        ${n?h`
              <div class="select-hint">
                <slot name="hint">${this.hint}</slot>
              </div>
            `:g}
        ${this._open?h`
              <div
                class="select-dropdown swim-scroll"
                part="dropdown"
                role="listbox"
                id="${this.id}-listbox"
                popover="${di?"manual":g}"
              >
                ${this.filterable?h`
                      <div
                        class="select-filter ${this.loading?"select-filter--loading":""}"
                        aria-busy="${this.loading}"
                      >
                        <input
                          type="text"
                          class="select-filter-input"
                          placeholder="${this.filterPlaceholder}"
                          ?disabled="${this.disabled}"
                          ?readonly="${this.loading}"
                          .value="${this._filterQuery}"
                          @input="${this._handleFilterInput}"
                          @keydown="${this._handleFilterKeyDown}"
                        />
                      </div>
                    `:g}
                ${o?h`
                      <ul
                        class="select-options ${this.grouped&&this._listHasGroupHeadings(t)?"select-options--grouped":""}"
                      >
                        ${this.grouped?this._renderGroupedOptionRows(t):mr(t,r=>this._getOptionValue(r),(r,l)=>this._renderOption(r,l))}
                      </ul>
                    `:h`<div class="select-empty">${this._emptyDropdownMessage()}</div>`}
              </div>
            `:g}
      </div>
    `}_renderValue(){if(this._value.length===0)return h`<span class="select-placeholder">${this.placeholder}</span>`;if(this.multiple)return h`
        ${this._value.map(e=>{const t=this._allOptions.find(i=>this._getOptionValue(i)===e);return this._renderChip(t||{name:e,value:e})})}
      `;{const e=this._allOptions.find(i=>this._getOptionValue(i)===this._value[0]),t=e?this._getOptionLabel(e):String(this._value[0]);return h`${t}`}}_getOptionLabel(e){const t=e.title??e.label;return t!=null&&String(t).length>0?String(t):e.name}_groupHeading(e){const t=e.group;return t!=null&&String(t).trim()!==""?String(t).trim():""}_listHasGroupHeadings(e){return e.some(t=>this._groupHeading(t).length>0)}_renderGroupedOptionRows(e){let t="";const i=[];for(let o=0;o<e.length;o++){const n=e[o],r=this._groupHeading(n);r?r!==t&&(i.push(h`
            <li class="select-option-group" role="presentation">
              <span class="select-option-group-label">${r}</span>
            </li>
          `),t=r):t="",i.push(this._renderOption(n,o))}return i}_emptyDropdownMessage(){return this.loading?this.filterSearchingPlaceholder:this.asyncFilter&&this._filterQuery.trim().length<this.filterMinLength?this.emptyPlaceholder:this._allOptions.length===0?this.asyncFilter&&this._filterQuery.trim().length>0?this.filterEmptyPlaceholder:this.emptyPlaceholder:this.filterEmptyPlaceholder}_renderChip(e){const t=this._getOptionLabel(e);return h`
      <div class="select-chip">
        <span class="select-chip-label">${t}</span>
        ${this.disabled?g:h`
              <button
                type="button"
                class="select-chip-remove"
                aria-label="Remove ${t}"
                @click="${i=>this._removeChip(i,e)}"
              >
                <swim-icon font-icon="x"></swim-icon>
              </button>
            `}
      </div>
    `}_renderOption(e,t){const i=this._getOptionValue(e),o=this._isSelected(i),n=t===this._focusedIndex;return h`
      <li
        class="select-option"
        role="option"
        ?selected="${o}"
        ?focused="${n}"
        ?disabled="${e.disabled}"
        aria-selected="${o}"
        @click="${()=>this._handleOptionClick(e)}"
        @mouseenter="${()=>this._focusedIndex=t}"
      >
        ${this._getOptionLabel(e)}
      </li>
    `}_handleInputClick(e){this.disabled||this._toggleDropdown()}_handleToggle(e){e.stopPropagation(),this.disabled||this._toggleDropdown()}_handleClear(e){e.stopPropagation(),this.value=this.multiple?[]:null,this._dispatchChange(),this._validate()}_handleFocus(){this.disabled||(this._focused=!0,this.setAttribute("focused",""))}_handleBlur(){this._focused=!1,this.removeAttribute("focused"),this._touched||(this._touched=!0,this.setAttribute("touched","")),this._validate()}_handleKeyDown(e){if(!this.disabled)switch(e.key){case"Enter":case" ":this._open||(e.preventDefault(),this._toggleDropdown());break;case"Escape":this._open&&(e.preventDefault(),this._closeDropdown());break;case"ArrowDown":e.preventDefault(),this._open?this._moveFocus(1):this._openDropdown();break;case"ArrowUp":e.preventDefault(),this._open&&this._moveFocus(-1);break}}_emitFilterChange(e){this.dispatchEvent(new CustomEvent("filter-change",{detail:{query:e},bubbles:!1,composed:!1}))}_handleFilterInput(e){const t=e.target;if(this._filterQuery=t.value,this._focusedIndex=0,this.asyncFilter){this._filterDebounceTimer!==void 0&&(clearTimeout(this._filterDebounceTimer),this._filterDebounceTimer=void 0);const i=this._filterQuery.trim();if(i.length<this.filterMinLength){this._emitFilterChange("");return}this._filterDebounceTimer=window.setTimeout(()=>{this._filterDebounceTimer=void 0,this._emitFilterChange(i)},this.filterDebounceMs)}}_handleFilterKeyDown(e){var t;switch(e.key){case"ArrowDown":e.preventDefault(),this._moveFocus(1);break;case"ArrowUp":e.preventDefault(),this._moveFocus(-1);break;case"Enter":e.preventDefault();const i=this._getFilteredOptions();i[this._focusedIndex]&&this._handleOptionClick(i[this._focusedIndex]);break;case"Escape":e.preventDefault(),this._closeDropdown(),(t=this.selectInput)==null||t.focus();break}}_handleOptionClick(e){if(e.disabled)return;const t=this._getOptionValue(e);if(this.multiple){const i=[...this._value],o=i.indexOf(t);o>-1?i.splice(o,1):i.push(t),this.value=i}else this.value=t,this._closeDropdown();this._dispatchChange(),this._validate()}_removeChip(e,t){e.stopPropagation();const i=this._getOptionValue(t),o=this._value.filter(n=>n!==i);this.value=o,this._dispatchChange(),this._validate()}_toggleDropdown(){this._open?this._closeDropdown():this._openDropdown()}_openDropdown(){this.disabled||(this._open=!0,this._focusedIndex=0,this.dispatchEvent(new Event("dropdown-open",{bubbles:!1,composed:!1})))}_closeDropdown(){var t;const e=(t=this.shadowRoot)==null?void 0:t.querySelector(".select-dropdown");this._teardownDropdownTopLayer(e),this._open=!1,this.dispatchEvent(new Event("dropdown-close",{bubbles:!1,composed:!1}))}_moveFocus(e){const i=this._getFilteredOptions().length-1;let o=this._focusedIndex+e;o<0?o=i:o>i&&(o=0),this._focusedIndex=o}_getFilteredOptions(){return this.asyncFilter?this._allOptions:this._filterQuery.trim()?this._allOptions.filter(e=>ya(e,this._filterQuery,{filterCaseSensitive:!1})):this._allOptions}_getOptionValue(e){return e.value!==void 0?e.value:e.name}_isSelected(e){return this._value.includes(e)}_dispatchChange(){this.dispatchEvent(new CustomEvent("change",{detail:{value:this.value},bubbles:!1,composed:!1}))}_validate(){let e=!0;return this.required&&this._value.length===0&&(e=!1),this._invalid=!e,this._invalid?(this.setAttribute("invalid",""),this._internals.setValidity({valueMissing:!0},"Please select an option")):(this.removeAttribute("invalid"),this._internals.setValidity({})),e}_updateActiveState(){const e=this._value.length>0,t=!!this.placeholder;this._focused||e||this._open?this.setAttribute("active",""):this.removeAttribute("active"),t?this.setAttribute("has-placeholder",""):this.removeAttribute("has-placeholder"),this.label?this.removeAttribute("no-label"):this.setAttribute("no-label","")}_addClickOutsideListener(){this._clickOutsideListener=e=>{e.composedPath().includes(this)||this._closeDropdown()},setTimeout(()=>{document.addEventListener("click",this._clickOutsideListener)},0)}_removeClickOutsideListener(){this._clickOutsideListener&&(document.removeEventListener("click",this._clickOutsideListener),this._clickOutsideListener=void 0)}_layoutOpenDropdownPanel(){var t;if(!this._open||!di)return;const e=(t=this.shadowRoot)==null?void 0:t.querySelector(".select-dropdown");if(!(!e||!this.selectInput||typeof e.showPopover!="function")){this._applyDropdownPanelGeometry(e,this.selectInput);try{e.showPopover()}catch{}this._addDropdownScrollListener()}}_applyDropdownPanelGeometry(e,t){const i=t.getBoundingClientRect(),o=this.getBoundingClientRect(),n=8,r=Math.min(300,Math.max(0,window.innerHeight-i.bottom-n-8)),l=this.dropdownAlign==="center",c=l?o.width:i.width;let d=l?o.left:i.left;l&&(d=Math.min(Math.max(d,8),window.innerWidth-c-8)),e.style.setProperty("inset","auto"),e.style.setProperty("margin","0"),e.style.setProperty("height","auto"),e.style.setProperty("position","fixed"),e.style.setProperty("left",`${d}px`),e.style.setProperty("top",`${i.bottom+n}px`),e.style.setProperty("width",`${c}px`),e.style.setProperty("max-height",`${r}px`),e.style.setProperty("z-index","2147483646"),e.style.setProperty("animation","none"),e.style.setProperty("transform","none")}_clearDropdownPanelGeometry(e){["inset","margin","height","position","left","top","width","max-height","z-index","animation","transform"].forEach(t=>e.style.removeProperty(t))}_teardownDropdownTopLayer(e){var t;if(this._removeDropdownScrollListener(),!(!e||!di)){try{(t=e.hidePopover)==null||t.call(e)}catch{}this._clearDropdownPanelGeometry(e)}}_addDropdownScrollListener(){!di||this._dropdownScrollOrResizeListener||(this._dropdownScrollOrResizeListener=()=>{var t;if(!this._open)return;const e=(t=this.shadowRoot)==null?void 0:t.querySelector(".select-dropdown");e&&this.selectInput&&this._applyDropdownPanelGeometry(e,this.selectInput)},window.addEventListener("scroll",this._dropdownScrollOrResizeListener,!0),window.addEventListener("resize",this._dropdownScrollOrResizeListener))}_removeDropdownScrollListener(){this._dropdownScrollOrResizeListener&&(window.removeEventListener("scroll",this._dropdownScrollOrResizeListener,!0),window.removeEventListener("resize",this._dropdownScrollOrResizeListener),this._dropdownScrollOrResizeListener=void 0)}formResetCallback(){this.value=this.multiple?[]:null,this._touched=!1,this.removeAttribute("touched")}formDisabledCallback(e){this.disabled=e}};Di.styles=[D,St,wa],Di.formAssociated=!0;let E=Di;S([ee(".select-input")],E.prototype,"selectInput",2);S([ee(".select-filter-input")],E.prototype,"filterInput",2);S([a({type:String})],E.prototype,"label",2);S([a({type:String})],E.prototype,"placeholder",2);S([a({type:String})],E.prototype,"hint",2);S([a({type:String,attribute:"empty-placeholder"})],E.prototype,"emptyPlaceholder",2);S([a({type:String,attribute:"filter-placeholder"})],E.prototype,"filterPlaceholder",2);S([a({type:String,attribute:"filter-empty-placeholder"})],E.prototype,"filterEmptyPlaceholder",2);S([a({type:String,attribute:"filter-searching-placeholder"})],E.prototype,"filterSearchingPlaceholder",2);S([a({type:Boolean,attribute:"async-filter",converter:w})],E.prototype,"asyncFilter",1);S([a({type:Number,attribute:"filter-debounce-ms"})],E.prototype,"filterDebounceMs",2);S([a({type:Number,attribute:"filter-min-length"})],E.prototype,"filterMinLength",2);S([a({type:String,attribute:"dropdown-align"})],E.prototype,"dropdownAlign",2);S([a({type:Boolean,reflect:!0,converter:w})],E.prototype,"loading",1);S([a({type:Array})],E.prototype,"options",2);S([a()],E.prototype,"value",1);S([a({type:String})],E.prototype,"name",2);S([a({type:String})],E.prototype,"id",2);S([a({type:Boolean,reflect:!0,converter:w})],E.prototype,"disabled",1);S([a({type:Boolean,reflect:!0,converter:w})],E.prototype,"required",1);S([a({type:String,reflect:!0})],E.prototype,"appearance",2);S([a({type:String,reflect:!0})],E.prototype,"size",2);S([a({type:Boolean,reflect:!0,attribute:"marginless",converter:w})],E.prototype,"marginless",1);S([a({type:Boolean,converter:ce})],E.prototype,"withHint",1);S([a({type:Boolean,converter:ce})],E.prototype,"filterable",1);S([a({type:Boolean,reflect:!0,converter:w})],E.prototype,"grouped",1);S([a({type:Boolean,reflect:!0,converter:w})],E.prototype,"multiple",1);S([a({type:Boolean,attribute:"allow-clear",converter:ce})],E.prototype,"allowClear",1);S([a({type:String,attribute:"required-indicator"})],E.prototype,"requiredIndicator",2);S([_()],E.prototype,"_slottedOptions",2);S([_()],E.prototype,"_hasSlottedHint",2);S([_()],E.prototype,"_open",2);S([_()],E.prototype,"_focused",2);S([_()],E.prototype,"_touched",2);S([_()],E.prototype,"_invalid",2);S([_()],E.prototype,"_filterQuery",2);S([_()],E.prototype,"_focusedIndex",2);customElements.get(en)||customElements.define(en,E);const Ca=k`
  :host {
    display: block;
  }

  .swim-tab__panel {
    display: block;
  }

  .swim-tab__panel[hidden] {
    display: none;
  }
`;var Sa=Object.defineProperty,Da=Object.getOwnPropertyDescriptor,Dt=(s,e,t,i)=>{for(var o=i>1?void 0:i?Da(e,t):e,n=s.length-1,r;n>=0;n--)(r=s[n])&&(o=(i?r(e,t,o):r(o))||o);return i&&o&&Sa(e,t,o),o};let Ta=0;const tn="swim-tab",Ao=class Ao extends ${constructor(){super(...arguments),this._instanceId=++Ta,this._generatedPanelId=`tab-panel-${this._instanceId}`,this._generatedTabId=`tab-${this._instanceId}`,this.tabId=this._generatedTabId,this.label="",this._active=!1,this._disabled=!1}get id(){return this._id??this._generatedPanelId}set id(e){this._id=e||this._generatedPanelId}get title(){return this.label}set title(e){this.label=e}get active(){return this._active}set active(e){const t=b(e);if(this._active!==t){const i=this._active;this._active=t,this.requestUpdate("active",i),this.dispatchEvent(new CustomEvent("swim-tab-active-change",{bubbles:!1,composed:!1}))}}get disabled(){return this._disabled}set disabled(e){this._disabled=b(e)}connectedCallback(){super.connectedCallback(),this.hasAttribute("tab-id")||(this.tabId=this._generatedTabId)}render(){return h`
      <div
        class="swim-tab__panel"
        role="tabpanel"
        id="${this.id}"
        aria-labelledby="${this.tabId}"
        ?hidden="${!this.active}"
      >
        <slot></slot>
      </div>
    `}};Ao.styles=[D,Ca];let Ee=Ao;Dt([a({type:String})],Ee.prototype,"id",1);Dt([a({type:String,attribute:"tab-id"})],Ee.prototype,"tabId",2);Dt([a({type:String})],Ee.prototype,"label",2);Dt([a({type:String})],Ee.prototype,"title",1);Dt([a({type:Boolean,reflect:!0,converter:w})],Ee.prototype,"active",1);Dt([a({type:Boolean,reflect:!0,converter:w})],Ee.prototype,"disabled",1);customElements.get(tn)||customElements.define(tn,Ee);const Ia=k`
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
    font-size: var(--font-size-s);
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
    font-size: var(--font-size-s);
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
`;var gr=(s=>(s.Legacy="legacy",s.Light="light",s))(gr||{}),Aa=Object.defineProperty,za=Object.getOwnPropertyDescriptor,Bi=(s,e,t,i)=>{for(var o=i>1?void 0:i?za(e,t):e,n=s.length-1,r;n>=0;n--)(r=s[n])&&(o=(i?r(e,t,o):r(o))||o);return i&&o&&Aa(e,t,o),o};const on="swim-tabs",zo=class zo extends ${constructor(){super(...arguments),this._vertical=!1,this.appearance=gr.Legacy,this._tabs=[],this._slotChangeBound=()=>this._syncTabs(),this._tabActiveChangeBound=()=>this.requestUpdate()}get vertical(){return this._vertical}set vertical(e){this._vertical=b(e)}connectedCallback(){super.connectedCallback()}firstUpdated(){this._syncTabs(),this._listenToTabChanges();const e=this.slotEl;e&&e.addEventListener("slotchange",this._slotChangeBound)}disconnectedCallback(){var t;const e=(t=this.shadowRoot)==null?void 0:t.querySelector("slot");e&&e.removeEventListener("slotchange",this._slotChangeBound),this._tabs.forEach(i=>i.removeEventListener("swim-tab-active-change",this._tabActiveChangeBound)),super.disconnectedCallback()}_listenToTabChanges(){this._tabs.forEach(e=>e.addEventListener("swim-tab-active-change",this._tabActiveChangeBound))}_syncTabs(){var n;const e=(n=this.shadowRoot)==null?void 0:n.querySelector("slot"),i=((e==null?void 0:e.assignedElements({flatten:!0}))??[]).filter(r=>r instanceof Ee);this._tabs.forEach(r=>r.removeEventListener("swim-tab-active-change",this._tabActiveChangeBound)),this._tabs=i,this._listenToTabChanges();const o=i.filter(r=>r.active);o.length>1?console.error('swim-tabs: Multiple active tabs set "active".'):o.length===0&&i.length>0&&(i[0].active=!0)}_tabClicked(e){e.disabled||(this._tabs.forEach(t=>t.active=t===e),e.active=!0,this.dispatchEvent(new CustomEvent("select-tab",{detail:{tab:e},bubbles:!1,composed:!1})),this.dispatchEvent(new CustomEvent("select",{detail:{tab:e},bubbles:!1,composed:!1})))}_move(e){const t=this._tabs,i=t.findIndex(o=>o.active);for(let o=i+e;o>=0&&o<t.length;o+=e){const n=t[o];if(n&&!n.disabled){this._tabClicked(n);return}}}prev(){this._move(-1)}next(){this._move(1)}_handleKeyDown(e){const t=this.vertical,i=e.key;t&&(i==="ArrowUp"||i==="ArrowDown")?(e.preventDefault(),this._move(i==="ArrowDown"?1:-1)):!t&&(i==="ArrowLeft"||i==="ArrowRight")&&(e.preventDefault(),this._move(i==="ArrowRight"?1:-1))}render(){const e=this._tabs;return h`
      <section class="swim-tabs">
        <div class="swim-tabs__list" part="tablist" role="tablist" @keydown="${this._handleKeyDown}">
          ${e.map(t=>h`
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
    `}};zo.styles=[D,Ia];let rt=zo;Bi([ee("slot")],rt.prototype,"slotEl",2);Bi([a({type:Boolean,reflect:!0,converter:w})],rt.prototype,"vertical",1);Bi([a({type:String,reflect:!0})],rt.prototype,"appearance",2);Bi([_()],rt.prototype,"_tabs",2);customElements.get(on)||customElements.define(on,rt);const La=k`
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
    background: rgba(var(--grey-650-rgb), 0.1);
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
`;var Ma=Object.defineProperty,Oa=Object.getOwnPropertyDescriptor,Tt=(s,e,t,i)=>{for(var o=i>1?void 0:i?Oa(e,t):e,n=s.length-1,r;n>=0;n--)(r=s[n])&&(o=(i?r(e,t,o):r(o))||o);return i&&o&&Ma(e,t,o),o};let Ba=0;const sn="swim-button-toggle",Lo=class Lo extends ${constructor(){super(...arguments),this._uniqueId=`swim-button-toggle-${++Ba}`,this.name=this._uniqueId,this.value=!1,this._checked=!1,this._disabled=!1}get id(){return this._id??this._uniqueId}set id(e){this._id=e}get checked(){return this._checked}set checked(e){const t=b(e);this._checked!==t&&(this._checked=t,this.requestUpdate("checked"))}get disabled(){return this._disabled}set disabled(e){this._disabled=b(e)}render(){return h`
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
    `}_handleClick(e){e.preventDefault(),e.stopPropagation(),!(this.disabled||this.checked)&&(this._checked=!0,this.dispatchEvent(new CustomEvent("value-change",{detail:this.value,bubbles:!0,composed:!0})))}};Lo.styles=[D,La];let Ve=Lo;Tt([a({type:String})],Ve.prototype,"id",1);Tt([a({type:String})],Ve.prototype,"name",2);Tt([a()],Ve.prototype,"value",2);Tt([a({type:Boolean,reflect:!0,converter:w})],Ve.prototype,"checked",1);Tt([_()],Ve.prototype,"_checked",2);Tt([a({type:Boolean,reflect:!0,converter:w})],Ve.prototype,"disabled",1);customElements.get(sn)||customElements.define(sn,Ve);const Pa=k`
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
    font-size: var(--font-size-xs);
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
`;var Fa=Object.defineProperty,Ra=Object.getOwnPropertyDescriptor,dt=(s,e,t,i)=>{for(var o=i>1?void 0:i?Ra(e,t):e,n=s.length-1,r;n>=0;n--)(r=s[n])&&(o=(i?r(e,t,o):r(o))||o);return i&&o&&Fa(e,t,o),o};let Na=0;const nn="swim-button-toggle-group",Ti=class Ti extends ${constructor(){var e;super(),this._uniqueId=`swim-button-toggle-group-${++Na}`,this._animationHolderLeft=0,this._animationHolderWidth=0,this.label="",this._value=void 0,this._disabled=!1,this._slotChangeBound=()=>this._onSlotChange(),this._slotForCleanup=null,this._internals=((e=this.attachInternals)==null?void 0:e.call(this))??{},this.setAttribute("role","group"),this._boundValueChange=this._onValueChangeEvent.bind(this)}get id(){return this._id??this._uniqueId}set id(e){this._id=e}get value(){return this._value}set value(e){this._value!==e&&(this._value=e,this._internals.setFormValue(e!=null?String(e):""),this._syncSelection())}get disabled(){return this._disabled}set disabled(e){this._disabled=b(e),this._syncDisabled()}connectedCallback(){super.connectedCallback(),this.addEventListener("value-change",this._boundValueChange),this._internals.setFormValue&&this._internals.setFormValue(this._value!=null?String(this._value):"")}disconnectedCallback(){this._slotForCleanup&&(this._slotForCleanup.removeEventListener("slotchange",this._slotChangeBound),this._slotForCleanup=null),this.removeEventListener("value-change",this._boundValueChange),super.disconnectedCallback()}firstUpdated(e){super.firstUpdated(e);const t=this._slot;t&&(this._slotForCleanup=t,t.addEventListener("slotchange",this._slotChangeBound)),this._onSlotChange()}updated(e){super.updated(e),(e.has("value")||e.has("disabled"))&&(this._syncSelection(),this._syncDisabled())}_getToggles(){const e=this._slot;return e?e.assignedElements({flatten:!0}).filter(i=>i instanceof HTMLElement&&i.tagName==="SWIM-BUTTON-TOGGLE"):[]}_onSlotChange(){this._syncSelection(),this._syncDisabled(),requestAnimationFrame(()=>this._calcAnimationDimensions())}_syncSelection(){const e=this._getToggles(),t=this._value;e.forEach(i=>{i.checked=i.value!==void 0&&i.value===t}),requestAnimationFrame(()=>this._calcAnimationDimensions())}_syncDisabled(){this._getToggles().forEach(t=>{t.disabled=this._disabled})}_calcAnimationDimensions(){const e=this._getToggles();if(!e.length||this._disabled){this._animationHolderLeft=0,this._animationHolderWidth=0;return}const t=e.findIndex(l=>l.value!==void 0&&l.value===this._value);if(t<0){this._animationHolderLeft=0,this._animationHolderWidth=0;return}let i=0;for(let l=0;l<t;l++)i+=e[l].offsetWidth??0;i+=t*2+2;const n=e[t],r=Math.max(0,((n==null?void 0:n.offsetWidth)??0)-4);this._animationHolderLeft=i,this._animationHolderWidth=r}_onValueChangeEvent(e){const i=e.detail;this._value!==i&&(this._value=i,this._internals.setFormValue(i!=null?String(i):""),this._syncSelection(),this.dispatchEvent(new CustomEvent("value-change",{detail:i,bubbles:!1,composed:!1})))}render(){return h`
      <div class="swim-button-toggle-group__container" id="${this.id}">
        ${this.label?h`<label class="swim-button-toggle-group__container__label" for="${this.id}-toggles"
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
    `}};Ti.styles=[D,Pa],Ti.formAssociated=!0;let Ce=Ti;dt([ee("slot")],Ce.prototype,"_slot",2);dt([_()],Ce.prototype,"_animationHolderLeft",2);dt([_()],Ce.prototype,"_animationHolderWidth",2);dt([a({type:String})],Ce.prototype,"id",1);dt([a({type:String})],Ce.prototype,"label",2);dt([a()],Ce.prototype,"value",1);dt([a({type:Boolean,reflect:!0,converter:w})],Ce.prototype,"disabled",1);customElements.get(nn)||customElements.define(nn,Ce);const yi=4,io=3,rn=25,Va=30,Ha=15,an=27,Ya=k`
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
    color: var(--grey-050);
    font-size: var(--font-size-m);
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
    background-color: var(--color-success);
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
    border: ${io}px solid var(--blue-400);
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
    border: ${io}px solid var(--blue-400);
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
    height: ${io}px;
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
`,qa=k`
  :host([orientation='horizontal']) {
    position: relative;
    width: 100%;
    min-width: var(--swim-card-min-width, 500px);
    min-height: 80px;
    transition: all 0.2s ease-in-out;
    animation: 0.2s ease-in-out cardSlideIn;
  }

  :host([orientation='horizontal']) .swim-card__status {
    position: absolute;
    left: 10px;
    top: 10px;
  }

  :host([orientation='horizontal']) .swim-card__select {
    margin-left: ${rn}px;
  }

  :host([orientation='horizontal']) .swim-card__accent {
    position: absolute;
    width: ${yi}px;
    min-width: ${yi}px;
    right: 0;
    height: 100%;
    border-radius: var(--radius-0) var(--radius-2) var(--radius-2) var(--radius-0);
  }

  :host([orientation='horizontal']) ::slotted(swim-card-header) {
    display: flex;
    align-items: center;
    padding: var(--spacing-0) ${rn}px;
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
    padding: var(--spacing-0) ${Va}px;
  }

  :host([orientation='horizontal']) .swim-card__outline,
  :host([orientation='horizontal']) .swim-card__outline-text {
    top: -5px;
    right: -5px;
    left: -5px;
    bottom: -5px;
  }
`,Ua=k`
  :host([orientation='vertical']) {
    position: relative;
    flex-direction: column;
    min-width: 347px;
    max-width: 850px;
    height: 418px;
    color: var(--grey-350);
  }

  :host([orientation='vertical']) .swim-card__status {
    margin: ${Ha}px auto var(--spacing-0) auto;
  }

  :host([orientation='vertical']) .swim-card__accent {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: ${yi}px;
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
    padding-left: ${an}px;
    padding-right: ${an}px;
  }

  :host([orientation='vertical']) ::slotted(swim-card-footer) {
    position: relative;
    width: 100%;
    flex-shrink: 0;
    height: 50px;
    padding: var(--spacing-20) var(--spacing-0);
    margin-top: 15px;
    margin-bottom: ${yi}px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`,ja=[D,Ya,qa,Ua];var vt=(s=>(s.Success="success",s.Error="error",s.Disabled="disabled",s))(vt||{}),br=(s=>(s.Horizontal="horizontal",s.Vertical="vertical",s))(br||{}),_r=(s=>(s.Normal="normal",s.Flat="flat",s))(_r||{});const Ga=k`
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
`;var Wa=Object.defineProperty,Ka=Object.getOwnPropertyDescriptor,Ye=(s,e,t,i)=>{for(var o=i>1?void 0:i?Ka(e,t):e,n=s.length-1,r;n>=0;n--)(r=s[n])&&(o=(i?r(e,t,o):r(o))||o);return i&&o&&Wa(e,t,o),o};let Za=0;const ln="swim-checkbox",Ii=class Ii extends ${constructor(){super(),this.id=`swim-checkbox-${++Za}`,this.name="",this.diameter="18px",this._checked=!1,this._indeterminate=!1,this._tabindex=0,this._disabled=!1,this._round=!1,this._internals=this.attachInternals()}get checked(){return this._checked}set checked(e){const t=b(e);this._checked!==t&&(this._checked=t,this._syncFormValue(),this.dispatchEvent(new CustomEvent("checked-change",{detail:this._checked,bubbles:!1,composed:!1})))}get indeterminate(){return this._indeterminate}set indeterminate(e){const t=b(e);this._indeterminate!==t&&(this._indeterminate=t,this.dispatchEvent(new CustomEvent("indeterminate-change",{detail:this._indeterminate,bubbles:!1,composed:!1})))}get tabindex(){return this._tabindex}set tabindex(e){this._tabindex=F(e,0)}get disabled(){return this._disabled}set disabled(e){this._disabled=b(e)}get round(){return this._round}set round(e){this._round=b(e)}connectedCallback(){super.connectedCallback(),this._syncFormValue()}updated(e){super.updated(e),(e.has("checked")||e.has("_checked"))&&this._syncFormValue()}focus(e){var t;(t=this._roving)==null||t.focus(e)}_syncFormValue(){this._internals.setFormValue(this._checked?"on":"")}_onClick(e){e.preventDefault(),!this.disabled&&this._toggle()}_onKeydown(e){e.key!==" "||this.disabled||(e.stopPropagation(),e.preventDefault(),this._toggle())}_toggle(){this.checked=!this.checked,this._emitChange()}_emitChange(){this.dispatchEvent(new CustomEvent("change",{detail:{stopPropagation:()=>{},timeStamp:Date.now(),target:{checked:this._checked}},bubbles:!1,composed:!1}))}_onFocus(e){this.dispatchEvent(new FocusEvent("focus",{...e,bubbles:!1,composed:!1}))}_onBlur(e){this.dispatchEvent(new FocusEvent("blur",{...e,bubbles:!1,composed:!1}))}render(){const e=`${this.id}-content`;return h`
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
    `}};Ii.styles=[D,Ga],Ii.formAssociated=!0;let pe=Ii;Ye([ee(".swim-checkbox__roving")],pe.prototype,"_roving",2);Ye([a({type:String})],pe.prototype,"id",2);Ye([a({type:String})],pe.prototype,"name",2);Ye([a({type:String})],pe.prototype,"diameter",2);Ye([a({type:Boolean,reflect:!0,attribute:"checked",converter:w})],pe.prototype,"checked",1);Ye([a({type:Boolean,reflect:!0,converter:w})],pe.prototype,"indeterminate",1);Ye([a({type:Number})],pe.prototype,"tabindex",1);Ye([a({type:Boolean,reflect:!0,converter:w})],pe.prototype,"disabled",1);Ye([a({type:Boolean,reflect:!0,converter:w})],pe.prototype,"round",1);customElements.get(ln)||customElements.define(ln,pe);var Ja=Object.defineProperty,Xa=Object.getOwnPropertyDescriptor,Ie=(s,e,t,i)=>{for(var o=i>1?void 0:i?Xa(e,t):e,n=s.length-1,r;n>=0;n--)(r=s[n])&&(o=(i?r(e,t,o):r(o))||o);return i&&o&&Ja(e,t,o),o};const cn="swim-card",Mo=class Mo extends ${constructor(){super(...arguments),this._disabled=!1,this.orientation=br.Horizontal,this.statusTooltip="",this._selectable=!1,this._selected=!1,this._error=!1,this.outlineText="",this.appearance=_r.Normal,this._hideAccent=!1}get disabled(){return this._disabled}set disabled(e){this._disabled=b(e)}get selectable(){return this._selectable}set selectable(e){this._selectable=b(e)}get selected(){return this._selected}set selected(e){this._selected=b(e)}get error(){return this._error}set error(e){this._error=b(e)}get hideAccent(){return this._hideAccent}set hideAccent(e){this._hideAccent=b(e)}_onOutlineClick(e){e.stopPropagation(),this.dispatchEvent(new CustomEvent("outline-click",{bubbles:!1,composed:!1}))}_onSelectChange(e){var i,o;e.stopPropagation();const t=((o=(i=e.detail)==null?void 0:i.target)==null?void 0:o.checked)??!1;this.selected=t,this.dispatchEvent(new CustomEvent("select",{detail:this.selected,bubbles:!1,composed:!1}))}_onCheckboxClick(e){e.stopPropagation()}render(){const e=this.selected&&!this.outlineText&&!this.error,t=this.error&&!this.outlineText,i=!!this.outlineText,o=!!this.status,n=this.status===vt.Success?"swim-card__status--success":this.status===vt.Error?"swim-card__status--error":"";return h`
      ${e?h`<div class="swim-card__outline" aria-hidden="true"></div>`:g}
      ${t?h`<div class="swim-card__outline swim-card__outline--error" aria-hidden="true"></div>`:g}
      ${i?h`
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
          `:g}
      ${o?h`
            <div
              class="swim-card__status ${n}"
              title="${this.statusTooltip}"
              role="status"
              aria-label="${this.statusTooltip||this.status||""}"
            ></div>
          `:g}
      ${this.selectable?h`
            <div class="swim-card__select" @click="${this._onCheckboxClick}">
              <swim-checkbox
                round
                .checked="${this.selected}"
                ?disabled="${this.disabled}"
                aria-label="Select card"
                @change="${this._onSelectChange}"
              ></swim-checkbox>
            </div>
          `:g}

      <slot></slot>

      ${this.hideAccent?g:h`<div class="swim-card__accent" aria-hidden="true"></div>`}
    `}};Mo.styles=ja;let se=Mo;Ie([a({type:Boolean,reflect:!0,converter:w})],se.prototype,"disabled",1);Ie([a({type:String,reflect:!0})],se.prototype,"orientation",2);Ie([a({type:String,reflect:!0})],se.prototype,"status",2);Ie([a({type:String,attribute:"status-tooltip"})],se.prototype,"statusTooltip",2);Ie([a({type:Boolean,reflect:!0,converter:w})],se.prototype,"selectable",1);Ie([a({type:Boolean,reflect:!0,converter:w})],se.prototype,"selected",1);Ie([a({type:Boolean,reflect:!0,converter:w})],se.prototype,"error",1);Ie([a({type:String,attribute:"outline-text"})],se.prototype,"outlineText",2);Ie([a({type:String,reflect:!0})],se.prototype,"appearance",2);Ie([a({type:Boolean,attribute:"hide-accent",converter:w})],se.prototype,"hideAccent",1);customElements.get(cn)||customElements.define(cn,se);const dn=25,Qa=k`
  :host {
    display: flex;
    align-items: center;
    padding: var(--spacing-0) ${dn}px;
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
    margin-left: ${dn}px;
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
    font-size: var(--font-size-xl);
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
    color: var(--color-success);
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
`,el=[D,Qa];var tl=Object.defineProperty,wr=(s,e,t,i)=>{for(var o=void 0,n=s.length-1,r;n>=0;n--)(r=s[n])&&(o=r(e,t,o)||o);return o&&tl(e,t,o),o};const hn="swim-card-header",Oo=class Oo extends ${constructor(){super(...arguments),this.label="",this.orientation="horizontal"}render(){return h`
      <slot name="avatar"></slot>
      <div class="swim-card-header__title-group">
        <slot></slot>
        ${this.label?h`<div class="swim-card-header__label">${this.label}</div>`:g}
        <slot name="tag"></slot>
        <slot name="title"></slot>
        <slot name="subtitle"></slot>
      </div>
    `}};Oo.styles=el;let Gt=Oo;wr([a({type:String})],Gt.prototype,"label");wr([a({type:String,reflect:!0})],Gt.prototype,"orientation");customElements.get(hn)||customElements.define(hn,Gt);const il=k`
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
`,ol=[D,il];var sl=Object.defineProperty,nl=(s,e,t,i)=>{for(var o=void 0,n=s.length-1,r;n>=0;n--)(r=s[n])&&(o=r(e,t,o)||o);return o&&sl(e,t,o),o};const un="swim-card-footer",Bo=class Bo extends ${constructor(){super(...arguments),this.label=""}render(){return h`
      ${this.label?h`<div class="swim-card-footer__label">${this.label}</div>`:g}
      <slot></slot>
    `}};Bo.styles=ol;let xi=Bo;nl([a({type:String})],xi.prototype,"label");customElements.get(un)||customElements.define(un,xi);const rl=3,al=k`
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

  /* Avatar circle border reflects status: success (green), error (red), disabled (grey) */
  .swim-card-avatar__avatar--success {
    border-color: var(--color-success);
  }

  .swim-card-avatar__avatar--error {
    border-color: var(--color-error);
  }

  .swim-card-avatar__avatar--disabled {
    border-color: var(--grey-500);
  }

  .swim-card-avatar__inner {
    display: flex;
    height: 100%;
    width: 100%;
    border: ${rl}px solid transparent;
    border-radius: 100%;
    overflow: hidden;
    position: relative;
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
`,ll=[D,al];var cl=Object.defineProperty,Eo=(s,e,t,i)=>{for(var o=void 0,n=s.length-1,r;n>=0;n--)(r=s[n])&&(o=r(e,t,o)||o);return o&&cl(e,t,o),o};const pn="swim-card-avatar",Po=class Po extends ${constructor(){super(...arguments),this.src="",this.removeImageBackground=!1}render(){const e=this.status===vt.Success?"swim-card-avatar__avatar--success":this.status===vt.Error?"swim-card-avatar__avatar--error":this.status===vt.Disabled?"swim-card-avatar__avatar--disabled":"";return h`
      <div
        class="swim-card-avatar__avatar ${e}"
        role="${this.status?"status":"presentation"}"
        aria-label="${this.status||""}"
      >
        <div class="swim-card-avatar__inner">
          ${this.src?h`
                <img
                  class="swim-card-avatar__img ${this.removeImageBackground?"swim-card-avatar__img--no-bg":""}"
                  src="${this.src}"
                  alt=""
                  draggable="false"
                  loading="lazy"
                />
              `:h`<span class="swim-card-avatar__content"><slot></slot></span>`}
        </div>
      </div>
    `}};Po.styles=ll;let $t=Po;Eo([a({type:String})],$t.prototype,"src");Eo([a({type:String,reflect:!0})],$t.prototype,"status");Eo([a({type:Boolean,attribute:"remove-image-background",converter:w})],$t.prototype,"removeImageBackground");customElements.get(pn)||customElements.define(pn,$t);const dl=k`
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
`,hl=[D,dl];var vr=(s=>(s.Small="small",s.Medium="medium",s.Large="large",s))(vr||{}),ul=Object.defineProperty,pl=(s,e,t,i)=>{for(var o=void 0,n=s.length-1,r;n>=0;n--)(r=s[n])&&(o=r(e,t,o)||o);return o&&ul(e,t,o),o};const mn="swim-card-placeholder",Fo=class Fo extends ${constructor(){super(...arguments),this.size=vr.Medium}render(){return h``}};Fo.styles=hl;let ki=Fo;pl([a({type:String,reflect:!0})],ki.prototype,"size");customElements.get(mn)||customElements.define(mn,ki);const ml=27,fl=k`
  :host {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    gap: var(--spacing-8);
    padding: var(--spacing-16) ${ml}px;
    box-sizing: border-box;
    overflow: auto;
    line-height: 1.5;
  }

  ::slotted(*) {
    width: 100%;
  }
`,gl=[D,fl],fn="swim-card-body",Ro=class Ro extends ${render(){return h`<slot></slot>`}};Ro.styles=gl;let co=Ro;customElements.get(fn)||customElements.define(fn,co);const bl=k`
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
`,_l=k`
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
`;var wl=Object.defineProperty,vl=Object.getOwnPropertyDescriptor,Ae=(s,e,t,i)=>{for(var o=i>1?void 0:i?vl(e,t):e,n=s.length-1,r;n>=0;n--)(r=s[n])&&(o=(i?r(e,t,o):r(o))||o);return i&&o&&wl(e,t,o),o};let yl=0;const gn="swim-radio",No=class No extends ${constructor(){super(...arguments),this.id=`swim-radio-${++yl}`,this.name="",this.radioId="",this._tabindex=0,this._checked=!1,this.value="",this._disabled=!1,this.groupDisabled=!1,this.isInGroup=!1}get tabindex(){return this._tabindex}set tabindex(e){this._tabindex=F(e,0)}get checked(){return this._checked}set checked(e){const t=b(e);this._checked!==t&&(this._checked=t)}get disabled(){return this._disabled||this.groupDisabled}set disabled(e){this._disabled=b(e)}get _effectiveTabindex(){return this.disabled||this.isInGroup?-1:this._tabindex}get _inputId(){return this.radioId||`${this.id}-radio`}focus(e){var t;(t=this._roving)==null||t.focus(e)}_onClick(e){e.preventDefault(),!this.disabled&&this._select()}_onKeydown(e){e.key!==" "||this.disabled||(e.stopPropagation(),e.preventDefault(),this._select())}_select(){if(this.isInGroup){if(this._checked)return;this.checked=!0}else this.checked=!this._checked;this._checked&&this.dispatchEvent(new CustomEvent("change",{detail:this.value,bubbles:!0,composed:!0}))}_onInputChange(e){this.checked=!0,this.dispatchEvent(new CustomEvent("change",{detail:this.value,bubbles:!0,composed:!0}))}_onFocus(e){this.dispatchEvent(new FocusEvent("focus",{...e,bubbles:!1,composed:!1}))}_onBlur(e){this.dispatchEvent(new FocusEvent("blur",{...e,bubbles:!1,composed:!1}))}render(){const e=`${this.id}-content`;return h`
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
    `}};No.styles=[D,bl];let ne=No;Ae([ee(".swim-radio__roving")],ne.prototype,"_roving",2);Ae([a({type:String})],ne.prototype,"id",2);Ae([a({type:String})],ne.prototype,"name",2);Ae([a({type:String,attribute:"radio-id"})],ne.prototype,"radioId",2);Ae([a({type:Number})],ne.prototype,"tabindex",1);Ae([a({type:Boolean,reflect:!0,converter:w})],ne.prototype,"checked",1);Ae([a({type:String})],ne.prototype,"value",2);Ae([a({type:Boolean,reflect:!0,converter:w})],ne.prototype,"disabled",1);Ae([a({type:Boolean,attribute:!1})],ne.prototype,"groupDisabled",2);Ae([a({type:Boolean,attribute:!1})],ne.prototype,"isInGroup",2);customElements.get(gn)||customElements.define(gn,ne);var xl=Object.defineProperty,kl=Object.getOwnPropertyDescriptor,Qe=(s,e,t,i)=>{for(var o=i>1?void 0:i?kl(e,t):e,n=s.length-1,r;n>=0;n--)(r=s[n])&&(o=(i?r(e,t,o):r(o))||o);return i&&o&&xl(e,t,o),o};let $l=0;function El(s,e){return(s%e+e)%e}const bn="swim-radio-group",Ai=class Ai extends ${constructor(){super(),this.id=`swim-radio-group-${++$l}`,this._disabled=!1,this._value="",this.name="",this._focusIndex=-1,this._tabindex=0,this._radios=[],this._changeHandler=e=>this._onRadioChange(e),this._slotChangeBound=()=>this._syncRadios(),this._onGroupFocus=e=>{if(e.target!==this._slotWrapper)return;const t=this._radios.find(i=>i.checked);t?(this._focusIndex=this._radios.indexOf(t),this._focusOn(this._focusIndex)):this._focusFirst()},this._onGroupBlur=()=>{this.dispatchEvent(new FocusEvent("blur",{bubbles:!1,composed:!1}))},this._internals=this.attachInternals()}get disabled(){return this._disabled}set disabled(e){this._disabled=b(e),this._updateRadioDisabledState()}get value(){return this._value}set value(e){var t;this._value!==e&&(this._value=e,this._updateSelectedFromValue(),(t=this._internals)==null||t.setFormValue(String(this._value)))}get focusIndex(){return this._focusIndex}set focusIndex(e){this._focusIndex=F(e,-1),this._focusOn(this._focusIndex)}get tabindex(){return this.disabled?-1:this._tabindex}set tabindex(e){this._tabindex=F(e,0)}connectedCallback(){super.connectedCallback(),this.addEventListener("change",this._changeHandler),this.addEventListener("focus",this._onGroupFocus),this.addEventListener("blur",this._onGroupBlur)}disconnectedCallback(){var e;(e=this._slot)==null||e.removeEventListener("slotchange",this._slotChangeBound),this.removeEventListener("change",this._changeHandler),this.removeEventListener("focus",this._onGroupFocus),this.removeEventListener("blur",this._onGroupBlur),super.disconnectedCallback()}firstUpdated(){var e;(e=this._slot)==null||e.addEventListener("slotchange",this._slotChangeBound),this._syncRadios()}updated(e){super.updated(e),(e.has("value")||e.has("name")||e.has("disabled"))&&(this._updateSelectedFromValue(),this._updateRadioDisabledState(),this._updateRadioNames())}_syncRadios(){var i;const e=this._slot,t=((i=e==null?void 0:e.assignedElements)==null?void 0:i.call(e))??[];this._radios=t.filter(o=>{var n;return o instanceof HTMLElement&&((n=o.tagName)==null?void 0:n.toLowerCase())==="swim-radio"}),this._updateRadioNames(),this._updateRadioDisabledState(),this._updateSelectedFromValue()}_updateRadioNames(){const e=this.name||this.id;this._radios.forEach(t=>{t.name=e,t.isInGroup=!0})}_updateRadioDisabledState(){this._radios.forEach(e=>{e.groupDisabled=this._disabled})}_updateSelectedFromValue(){this._radios.forEach(e=>{e.checked=this._value===e.value})}_onRadioChange(e){var o;const t=e.target;if(!t||((o=t.tagName)==null?void 0:o.toLowerCase())!=="swim-radio")return;const i=e.detail;this._value!==i&&(this._value=i,this._updateSelectedFromValue(),this._internals.setFormValue(String(this._value)),this.dispatchEvent(new CustomEvent("change",{detail:this._value,bubbles:!1,composed:!1})))}_focusFirst(){if(!(this.disabled||!this._radios.length)){for(let e=0;e<this._radios.length;e++)if(!this._radios[e].disabled){this._focusIndex=e,this._focusOn(e);return}}}_focusOn(e){this.disabled||e<0||e>=this._radios.length||this._radios[e].focus()}_selectIndex(e){if(this.disabled||e<0||e>=this._radios.length)return;const t=this._radios[e];t.disabled||(this.value=t.value)}_focusIn(e){if(this.disabled||!this._radios.length)return;const t=this._radios.length;for(let i=1;i<=t;i++){const o=El(this._focusIndex+e*i,t);if(!this._radios[o].disabled){this._focusIndex=o,this._focusOn(o);return}}}_onKeydown(e){switch(e.key){case"ArrowLeft":case"ArrowUp":e.preventDefault(),e.stopPropagation(),this._focusIn(-1),this._selectIndex(this._focusIndex);break;case"ArrowRight":case"ArrowDown":e.preventDefault(),e.stopPropagation(),this._focusIn(1),this._selectIndex(this._focusIndex);break}}render(){return h`
      <div
        class="swim-radio-group__slot"
        role="radiogroup"
        tabindex="${this.tabindex}"
        aria-disabled="${this.disabled?"true":"false"}"
        @keydown="${this._onKeydown}"
      >
        <slot></slot>
      </div>
    `}};Ai.styles=[D,_l],Ai.formAssociated=!0;let ve=Ai;Qe([ee("slot")],ve.prototype,"_slot",2);Qe([ee(".swim-radio-group__slot")],ve.prototype,"_slotWrapper",2);Qe([a({type:String})],ve.prototype,"id",2);Qe([a({type:Boolean,reflect:!0,converter:w})],ve.prototype,"disabled",1);Qe([a({type:String})],ve.prototype,"value",1);Qe([a({type:String})],ve.prototype,"name",2);Qe([a({type:Number})],ve.prototype,"focusIndex",1);Qe([a({type:Number})],ve.prototype,"tabindex",1);customElements.get(bn)||customElements.define(bn,ve);const Cl=k`
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
    font-size: var(--font-size-xxs);
    padding: 2.5px 3.5px;
  }

  .swim-toggle__icon--off swim-icon {
    opacity: 0.7;
    color: var(--grey-400);
    font-size: var(--font-size-xxs);
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
`;var Sl=Object.defineProperty,Dl=Object.getOwnPropertyDescriptor,qe=(s,e,t,i)=>{for(var o=i>1?void 0:i?Dl(e,t):e,n=s.length-1,r;n>=0;n--)(r=s[n])&&(o=(i?r(e,t,o):r(o))||o);return i&&o&&Sl(e,t,o),o};let Tl=0;const _n="swim-toggle",zi=class zi extends ${constructor(){super(),this.id=`swim-toggle-${++Tl}`,this.name="",this.label="",this._checked=!1,this._disabled=!1,this._required=!1,this._showIcons=!0,this._tabindex=0,this._internals=this.attachInternals()}get checked(){return this._checked}set checked(e){const t=b(e);this._checked!==t&&(this._checked=t,this._syncFormValue())}get disabled(){return this._disabled}set disabled(e){this._disabled=b(e)}get required(){return this._required}set required(e){this._required=b(e)}get showIcons(){return this._showIcons}set showIcons(e){this._showIcons=e!=null?b(e):!0}get tabindex(){return this._tabindex}set tabindex(e){this._tabindex=F(e,0)}connectedCallback(){super.connectedCallback(),this._syncFormValue()}updated(e){super.updated(e),(e.has("checked")||e.has("_checked"))&&this._syncFormValue()}focus(e){var t;(t=this._roving)==null||t.focus(e)}_syncFormValue(){var t;this._internals.setFormValue(this._checked?"on":""),this.required&&!this._checked?this._internals.setValidity({valueMissing:!0},"This field is required"):this._internals.setValidity({});const e=(t=this.shadowRoot)==null?void 0:t.querySelector(".swim-toggle__input");e&&(e.checked=this._checked,e.required=this.required)}_onClick(e){e.preventDefault(),!this.disabled&&this._toggle()}_onKeydown(e){e.key!==" "&&e.key!=="Enter"||(e.preventDefault(),!this.disabled&&this._toggle())}_toggle(){this.checked=!this.checked,this._emitChange()}_emitChange(){this.dispatchEvent(new CustomEvent("change",{detail:{stopPropagation:()=>{},timeStamp:Date.now(),target:{checked:this._checked}},bubbles:!1,composed:!1}))}_onFocus(e){this.dispatchEvent(new FocusEvent("focus",{...e,bubbles:!1,composed:!1}))}_onBlur(e){this.dispatchEvent(new FocusEvent("blur",{...e,bubbles:!1,composed:!1}))}_onInputChange(e){const t=e.target;this._checked!==t.checked&&(this._checked=t.checked,this.requestUpdate(),this._syncFormValue(),this._emitChange())}render(){const e=`${this.id}-text`;return h`
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
          ${this.showIcons?this._checked?h`<span class="swim-toggle__icon swim-toggle__icon--on" aria-hidden="true"
                  ><swim-icon font-icon="check"></swim-icon
                ></span>`:h`<span class="swim-toggle__icon swim-toggle__icon--off" aria-hidden="true"
                  ><swim-icon font-icon="x"></swim-icon
                ></span>`:""}
        </div>
        <label class="swim-toggle__text" part="text" id="${e}" for="${this.id}">
          ${this.label?h`<span>${this.label}</span>`:""}
          <slot></slot>
        </label>
      </div>
    `}};zi.styles=[D,Cl],zi.formAssociated=!0;let me=zi;qe([ee(".swim-toggle__roving")],me.prototype,"_roving",2);qe([a({type:String})],me.prototype,"id",2);qe([a({type:String})],me.prototype,"name",2);qe([a({type:String})],me.prototype,"label",2);qe([a({type:Boolean,reflect:!0,attribute:"checked",converter:w})],me.prototype,"checked",1);qe([a({type:Boolean,reflect:!0,converter:w})],me.prototype,"disabled",1);qe([a({type:Boolean,reflect:!0,converter:w})],me.prototype,"required",1);qe([a({type:Boolean,attribute:"show-icons",converter:ce})],me.prototype,"showIcons",1);qe([a({type:Number})],me.prototype,"tabindex",1);customElements.get(_n)||customElements.define(_n,me);const Il=k`
  :host {
    display: block;
    width: 100%;
    margin-bottom: 2em;
    box-sizing: border-box;

    --_swim-fallback-background: var(--grey-825);
    --_swim-fallback-header-background: var(--grey-775);
    --_swim-fallback-header-hover-background: var(--grey-750);
    --_swim-fallback-content-background: transparent;

    background: var(--swim-section-background, var(--_swim-fallback-background));
    border-radius: var(--radius-8);
  }

  :host([appearance='minimal']) {
    --_swim-fallback-background: transparent;
    --_swim-fallback-header-background: transparent;
    --_swim-fallback-header-hover-background: transparent;
    --_swim-fallback-content-background: transparent;
  }

  :host([appearance='outline']) {
    --_swim-fallback-header-background: transparent;
    --_swim-fallback-header-hover-background: var(--grey-750);
    --_swim-fallback-content-background: transparent;
  }

  :host([appearance='light']) {
    --_swim-fallback-header-background: var(--grey-700);
    --_swim-fallback-header-hover-background: var(--grey-725);
    --_swim-fallback-content-background: var(--grey-775);
  }

  .swim-section__inner {
    display: block;
    width: 100%;
  }

  .swim-section__header {
    background: var(--swim-section-header-background, var(--_swim-fallback-header-background));
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
    font-size: var(--font-size-m);
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
    flex: 0 0 28px;
    width: 28px;
    align-self: stretch;
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
    font-size: var(--font-size-xs);
    line-height: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .swim-section__toggle swim-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: var(--font-size-xs);
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
    font-size: var(--font-size-m);
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

  .swim-section__header.swim-section__header--collapsible:not(.swim-section__header--empty) {
    transition: background-color 200ms ease;
  }

  /* Full-row hover when user can collapse via header click or chevron (not when collapsible but no UI control) */
  .swim-section__header.swim-section__header--collapsible:hover:not(.swim-section__header--empty):is(.swim-section__header--header-toggle, :has(.swim-section__toggle)) {
    background: var(--swim-section-header-hover-background, var(--_swim-fallback-header-hover-background));
  }

  .swim-section__header.swim-section__header--header-toggle {
    cursor: pointer;
  }

  .swim-section__header.swim-section__header--header-toggle:focus-visible {
    outline: 2px solid var(--blue-200);
    border-radius: var(--radius-2);
    outline-offset: 1px;
  }

  .swim-section__header.swim-section__header--toggle-right {
    flex-direction: row-reverse;
  }

  .swim-section__header.swim-section__header--toggle-right.swim-section__header--collapsible {
    padding: var(--spacing-0) var(--spacing-20) var(--spacing-0) var(--spacing-16);
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
    background: var(--swim-section-content-background, var(--_swim-fallback-content-background));
  }

  /* Appearance: outline */
  :host([appearance='outline']) .swim-section__header,
  :host([appearance='outline']) .swim-section__content {
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
    border-radius: var(--radius-8) var(--radius-8) var(--radius-0) var(--radius-0);
  }

  :host([appearance='light']) .swim-section__header.swim-section__header--collapsed {
    border-radius: var(--radius-8);
  }

  :host([appearance='light']) .swim-section__content {
    border-radius: var(--radius-0) var(--radius-0) var(--radius-8) var(--radius-8);
  }
`,Al=[D,Il];var yr=(s=>(s.Legacy="legacy",s.Outline="outline",s.Light="light",s.Minimal="minimal",s))(yr||{}),fi=(s=>(s.Left="left",s.Right="right",s.None="none",s))(fi||{}),zl=Object.defineProperty,Ll=Object.getOwnPropertyDescriptor,ze=(s,e,t,i)=>{for(var o=i>1?void 0:i?Ll(e,t):e,n=s.length-1,r;n>=0;n--)(r=s[n])&&(o=(i?r(e,t,o):r(o))||o);return i&&o&&zl(e,t,o),o};let wn=0;const vn="swim-section",Vo=class Vo extends ${constructor(){super(...arguments),this._id=`section-${++wn}`,this._sectionCollapsed=!1,this._sectionCollapsible=!0,this._headerToggle=!1,this.sectionTitle="",this.padding="1.8em",this.appearance=yr.Legacy,this.togglePosition=fi.Left,this._hasHeaderSlot=!1,this._headerSlotChangeBound=()=>this._checkHeaderSlot()}get id(){return this._id}set id(e){this._id=e||`section-${++wn}`}get sectionCollapsed(){return this._sectionCollapsed}set sectionCollapsed(e){const t=e!=null?b(e):!1;this._sectionCollapsed!==t&&(this._sectionCollapsed=t)}get sectionCollapsible(){return this._sectionCollapsible}set sectionCollapsible(e){const t=e!=null?b(e):!0;this._sectionCollapsible!==t&&(this._sectionCollapsible=t)}get headerToggle(){return this._headerToggle}set headerToggle(e){const t=e!=null?b(e):!1;this._headerToggle!==t&&(this._headerToggle=t)}get _contentId(){return`${this.id}-content`}firstUpdated(){var t,i;this._checkHeaderSlot();const e=((i=(t=this.renderRoot)==null?void 0:t.querySelector)==null?void 0:i.call(t,'slot[name="header"]'))??this._headerSlot;e&&(this._headerSlotForCleanup=e,e.addEventListener("slotchange",this._headerSlotChangeBound))}disconnectedCallback(){this._headerSlotForCleanup&&(this._headerSlotForCleanup.removeEventListener("slotchange",this._headerSlotChangeBound),this._headerSlotForCleanup=void 0),super.disconnectedCallback()}_checkHeaderSlot(){var t,i;const e=((i=(t=this.renderRoot)==null?void 0:t.querySelector)==null?void 0:i.call(t,'slot[name="header"]'))??this._headerSlot;if(e){const n=e.assignedNodes({flatten:!0}).some(r=>{var l;return r.nodeType===Node.ELEMENT_NODE||r.nodeType===Node.TEXT_NODE&&(((l=r.textContent)==null?void 0:l.trim())??"").length>0});this._hasHeaderSlot!==n&&(this._hasHeaderSlot=n)}}_headerIsEmpty(){var e;return!((e=this.sectionTitle)!=null&&e.trim())&&!this._hasHeaderSlot}_onToggle(e){if(e==null||e.stopPropagation(),!this.sectionCollapsible)return;const t=!this.sectionCollapsed;this.sectionCollapsed=t,this.dispatchEvent(new CustomEvent("toggle",{detail:t,bubbles:!1,composed:!1}))}_onHeaderKeydown(e){e.key!==" "&&e.key!=="Enter"||!this.headerToggle||!this.sectionCollapsible||(e.preventDefault(),this._onToggle(e))}_onHeaderClick(){this.headerToggle&&this.sectionCollapsible&&this._onToggle()}render(){var r;const e=this.sectionCollapsible,t=e&&this.togglePosition!==fi.None,i=this.togglePosition===fi.Right,o=["swim-section__header",this.sectionCollapsed?"swim-section__header--collapsed":"",e?"swim-section__header--collapsible":"",this.headerToggle?"swim-section__header--header-toggle":"",i?"swim-section__header--toggle-right":""].filter(Boolean).join(" "),n=this._headerIsEmpty();return h`
      <div class="swim-section__inner">
        <header
          class="${o}${n?" swim-section__header--empty":""}"
          role="${this.headerToggle&&e&&!n?"button":"presentation"}"
          tabindex="${this.headerToggle&&e&&!n?0:-1}"
          aria-expanded="${n?void 0:this.sectionCollapsed?"false":"true"}"
          aria-controls="${this._contentId}"
          @click="${this._onHeaderClick}"
          @keydown="${this._onHeaderKeydown}"
        >
          ${t&&!n?h`
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
              `:g}
          <div class="swim-section__header-content">
            ${(r=this.sectionTitle)!=null&&r.trim()?h`<h1 class="swim-section__header-title">${this.sectionTitle}</h1>`:g}
            <slot name="header"></slot>
          </div>
        </header>
        ${this.sectionCollapsed?g:h`
              <div
                id="${this._contentId}"
                class="swim-section__content"
                style="padding: ${this.padding}"
                role="region"
                aria-labelledby="${n?"":void 0}"
              >
                <slot></slot>
              </div>
            `}
      </div>
    `}};Vo.styles=Al;let re=Vo;ze([a({type:String,reflect:!0})],re.prototype,"id",1);ze([a({reflect:!0,attribute:"section-collapsed",converter:w})],re.prototype,"sectionCollapsed",1);ze([a({reflect:!0,attribute:"section-collapsible",converter:ce})],re.prototype,"sectionCollapsible",1);ze([a({reflect:!0,attribute:"header-toggle",converter:w})],re.prototype,"headerToggle",1);ze([a({type:String,reflect:!0,attribute:"section-title"})],re.prototype,"sectionTitle",2);ze([a({type:String})],re.prototype,"padding",2);ze([a({type:String,reflect:!0})],re.prototype,"appearance",2);ze([a({type:String,reflect:!0,attribute:"toggle-position"})],re.prototype,"togglePosition",2);ze([_()],re.prototype,"_hasHeaderSlot",2);ze([ee('slot[name="header"]')],re.prototype,"_headerSlot",2);customElements.get(vn)||customElements.define(vn,re);const Ml=k`
  :host {
    display: contents;
  }
`,yn="swim-section-header",Ho=class Ho extends ${render(){return h`<slot></slot>`}};Ho.styles=Ml;let ho=Ho;customElements.get(yn)||customElements.define(yn,ho);const Ol=2,Bl=4,Pl=16,Fl=k`
  :host {
    --slider-track-height: ${Ol}px;
    --slider-fill-height: ${Bl}px;
    --slider-thumb-size: ${Pl}px;
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
`;var Rl=Object.defineProperty,Nl=Object.getOwnPropertyDescriptor,oe=(s,e,t,i)=>{for(var o=i>1?void 0:i?Nl(e,t):e,n=s.length-1,r;n>=0;n--)(r=s[n])&&(o=(i?r(e,t,o):r(o))||o);return i&&o&&Rl(e,t,o),o};let Vl=0;const xn="swim-slider",Li=class Li extends ${constructor(){super(),this.id=`swim-slider-${++Vl}`,this._min=0,this._max=100,this._step=1,this.orientation="horizontal",this._filled=!1,this._multiple=!1,this._disabled=!1,this._showTicks=!1,this.ariaLabel="",this._values=[0],this._active=[],this._internals=this.attachInternals()}get min(){return this._min}set min(e){this._min=F(e,0)}get max(){return this._max}set max(e){this._max=F(e,100)}get step(){return this._step}set step(e){this._step=F(e,1)}get filled(){return this._filled}set filled(e){this._filled=b(e)}get multiple(){return this._multiple}set multiple(e){this._multiple=b(e)}get disabled(){return this._disabled}set disabled(e){this._disabled=b(e)}get showTicks(){return this._showTicks}set showTicks(e){this._showTicks=b(e)}get tickStep(){return this._tickStep??this._step}set tickStep(e){this._tickStep=e!=null?F(e,this._step):void 0}get value(){return this._values.length?this.multiple?[...this._values].sort((e,t)=>e-t).join(","):String(this._values[0]):String(this._min)}set value(e){const t=e!=null?String(e):"",o=(t?t.split(",").map(r=>F(r.trim(),this._min)):[this._min]).map(r=>Math.max(this._min,Math.min(this._max,r)));let n;this.multiple?n=o.length>=2?o:o.length===1?[o[0],this._max]:[this._min,this._max]:n=o.slice(0,1),(n.length!==this._values.length||n.some((r,l)=>r!==this._values[l]))&&(this._values=n,this._syncFormValue())}connectedCallback(){super.connectedCallback(),(this._values.length===0||this._values.length===1&&this._values[0]===0&&this._min!==0)&&(this._values=this.multiple?[this._min,this._max]:[this._min],this._syncFormValue())}updated(e){super.updated(e),(e.has("value")||e.has("min")||e.has("max"))&&this._syncFormValue()}_syncFormValue(){this._internals.setFormValue(this.value)}get _percents(){const e=this._max-this._min||1;return this._values.map(t=>Math.round(100*(Math.max(this._min,Math.min(this._max,t))-this._min)/e))}get _thumbs(){return this._percents.map(e=>({left:`calc(${e}% - ${e/100}em)`}))}get _fill(){if(!this.filled)return null;const e=this._percents,t=this.multiple?Math.min(...e):0,o=(this.multiple?Math.max(...e):e[0])-t;return{left:`${t}%`,width:`${o}%`}}get _tickStepValue(){return this._tickStep??this._step}get _ticks(){if(!this.showTicks)return[];const e=this._tickStepValue,t=[];let i=this._min;for(;i<=this._max;)t.push(i),i+=e;const o=this._max-this._min||1;return t.map(n=>{const r=100*(n-this._min)/o;return{left:`calc(${r}% - ${r/100-.5}em)`}})}_setValue(e,t){const i=F(e,this._min),o=Math.max(this._min,Math.min(this._max,i));if(this._values[t]!==o){const n=[...this._values];n[t]=o,this._values=n,this._syncFormValue(),this._emitChange()}}_onChange(e){this._emitChange()}_emitChange(){const e=this.value,t=this.multiple?this._percents.join(","):String(this._percents[0]);this.dispatchEvent(new CustomEvent("change",{detail:{value:this.multiple?e:Number(e),percent:t},bubbles:!1,composed:!1}))}_setActive(e,t){const i=[...this._active];i[e]=t,this._active=i}_ensureValuesLength(){this.multiple&&this._values.length<2?this._values=[this._min,this._max]:!this.multiple&&this._values.length>1&&(this._values=[this._values[0]])}willUpdate(e){this._ensureValuesLength()}firstUpdated(){this._ensureValuesLength()}_onRangeInput(e,t){const i=e.target.value;this._setValue(Number(i),t)}render(){const e=this.orientation==="vertical";return h`
      <div
        class="swim-slider ${e?"swim-slider--vertical":""} ${this.filled?"swim-slider--filled":""} ${this.multiple?"swim-slider--multiple":""}"
        role="group"
        aria-label="${this.ariaLabel||void 0}"
      >
        <div class="swim-slider__inner">
          ${this.showTicks?h`
                <div class="swim-slider__ticks" aria-hidden="true">
                  ${this._ticks.map(t=>h`<div class="swim-slider__tick" style="left: ${t.left}"></div>`)}
                </div>
              `:""}
          <div class="swim-slider__inputs">
            <div class="swim-slider__track" part="track" aria-hidden="true"></div>
            ${this._fill?h`
                  <span
                    class="swim-slider__fill"
                    part="fill"
                    style="left: ${this._fill.left}; width: ${this._fill.width}"
                    aria-hidden="true"
                  ></span>
                `:""}
            ${this._values.map((t,i)=>{const o=this._thumbs[i],n=this._active[i],r=`${this.id}-${i}`,l=this.ariaLabel?`${this.ariaLabel}${this.multiple?` (thumb ${i+1})`:""}`:void 0;return h`
                <input
                  type="range"
                  class="swim-slider__input ${i%2===1?"swim-slider__input--odd":""} ${n?"swim-slider__input--active":""}"
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
                  @input="${c=>this._onRangeInput(c,i)}"
                  @change="${this._onChange}"
                  @mouseenter="${()=>this._setActive(i,!0)}"
                  @mouseleave="${()=>this._setActive(i,!1)}"
                  @focus="${()=>this._setActive(i,!0)}"
                  @blur="${()=>this._setActive(i,!1)}"
                />
                <div
                  class="swim-slider__thumb ${n?"swim-slider__thumb--active":""}"
                  style="${o?`left: ${o.left}`:""}"
                  aria-hidden="true"
                  part="thumb"
                ></div>
              `})}
          </div>
        </div>
      </div>
    `}};Li.styles=[D,Fl],Li.formAssociated=!0;let J=Li;oe([a({type:String})],J.prototype,"id",2);oe([a({type:Number})],J.prototype,"min",1);oe([a({type:Number})],J.prototype,"max",1);oe([a({type:Number})],J.prototype,"step",1);oe([a({type:String,reflect:!0})],J.prototype,"orientation",2);oe([a({type:Boolean,reflect:!0,converter:w})],J.prototype,"filled",1);oe([a({type:Boolean,reflect:!0,converter:w})],J.prototype,"multiple",1);oe([a({type:Boolean,reflect:!0,converter:w})],J.prototype,"disabled",1);oe([a({type:Boolean,attribute:"show-ticks",converter:w})],J.prototype,"showTicks",1);oe([a({type:Number,attribute:"tick-step"})],J.prototype,"tickStep",1);oe([a({type:String,attribute:"aria-label"})],J.prototype,"ariaLabel",2);oe([a({type:String})],J.prototype,"value",1);oe([_()],J.prototype,"_values",2);oe([_()],J.prototype,"_active",2);customElements.get(xn)||customElements.define(xn,J);const Hl=k`
  :host {
    overflow: hidden;
    box-sizing: border-box;
    min-height: 0;
  }
`,Yl=[D,Hl];function xr(s){const[e,t,i]=s;return`${e} ${t} ${i}`}function yt(s,e,t){const i=t.split(" ");return i.length===3?i:[s,e,t]}var ql=Object.defineProperty,Ul=Object.getOwnPropertyDescriptor,Pi=(s,e,t,i)=>{for(var o=i>1?void 0:i?Ul(e,t):e,n=s.length-1,r;n>=0;n--)(r=s[n])&&(o=(i?r(e,t,o):r(o))||o);return i&&o&&ql(e,t,o),o};const Pt="1 1 1e-9px",kn="swim-split-area",Yo=class Yo extends ${constructor(){super(...arguments),this._areaBasis=Pt,this.shouldAdjustMaxMin=!1,this.initialFlexParts=yt("1","1",Pt),this.currentFlexParts=yt("1","1",Pt)}get areaBasis(){return this._areaBasis}set areaBasis(e){this._areaBasis!==e&&(this._areaBasis=e||Pt,this._applyBasis())}connectedCallback(){super.connectedCallback(),this._applyBasis()}updated(){this.style.flex=xr(this.currentFlexParts),this.shouldAdjustMaxMin&&this.currentFlexParts[2]?(this.style.minWidth=this.currentFlexParts[2],this.style.maxWidth=this.currentFlexParts[2]):(this.style.minWidth="",this.style.maxWidth="")}updateBasis(e){this.currentFlexParts[2]=e,this.requestUpdate()}_applyBasis(){const e=this._areaBasis||Pt,[t,i,o]=yt("1","1",e);this.currentFlexParts=[t,i,o],this.initialFlexParts=[t,i,o],!this.minBasis&&i==="0"&&(this.minBasis=o),!this.maxBasis&&t==="0"&&(this.maxBasis=o),this.requestUpdate()}render(){return h`<slot></slot>`}};Yo.styles=Yl;let at=Yo;Pi([a({type:String,attribute:"area-basis"})],at.prototype,"areaBasis",1);Pi([a({type:String,attribute:"min-basis"})],at.prototype,"minBasis",2);Pi([a({type:String,attribute:"max-basis"})],at.prototype,"maxBasis",2);Pi([a({type:Boolean,attribute:"should-adjust-max-min",converter:w})],at.prototype,"shouldAdjustMaxMin",2);customElements.get(kn)||customElements.define(kn,at);const jl=k`
  :host {
    position: relative;
    box-sizing: border-box;
    flex-shrink: 0;
  }

  .swim-split-handle__grip {
    line-height: 0;
    font-size: var(--font-size-4xl);
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
`,Gl=[D,jl];var _t=(s=>(s.Row="row",s.Column="column",s))(_t||{}),Wl=Object.defineProperty,Kl=Object.getOwnPropertyDescriptor,kr=(s,e,t,i)=>{for(var o=i>1?void 0:i?Kl(e,t):e,n=s.length-1,r;n>=0;n--)(r=s[n])&&(o=(i?r(e,t,o):r(o))||o);return i&&o&&Wl(e,t,o),o};const hi="0 0 15px",$n="swim-split-handle",qo=class qo extends ${constructor(){super(...arguments),this._handleBasis=hi,this.direction=_t.Row,this.currentFlexParts=yt("0","0",hi),this._boundMouseUp=this._onMouseUp.bind(this),this._boundMouseMove=this._onMouseMove.bind(this)}get handleBasis(){return this._handleBasis}set handleBasis(e){this._handleBasis!==e&&(this._handleBasis=e||hi,this.currentFlexParts=yt("0","0",this._handleBasis),this.requestUpdate())}connectedCallback(){super.connectedCallback(),this.currentFlexParts=yt("0","0",this._handleBasis||hi)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("mouseup",this._boundMouseUp,!0),document.removeEventListener("mousemove",this._boundMouseMove,!0)}updated(){this.style.flex=xr(this.currentFlexParts)}_onMouseDown(e){e.preventDefault(),document.addEventListener("mouseup",this._boundMouseUp,!0),document.addEventListener("mousemove",this._boundMouseMove,!0),this.dispatchEvent(new CustomEvent("dragstart",{detail:e,bubbles:!1,composed:!1}))}_onMouseMove(e){this.dispatchEvent(new CustomEvent("drag",{detail:e,bubbles:!1,composed:!1}))}_onMouseUp(e){document.removeEventListener("mouseup",this._boundMouseUp,!0),document.removeEventListener("mousemove",this._boundMouseMove,!0),this.dispatchEvent(new CustomEvent("dragend",{detail:e,bubbles:!1,composed:!1}))}_onDblClick(e){this.dispatchEvent(new CustomEvent("dblclick",{detail:e,bubbles:!1,composed:!1}))}render(){return h`
      <button
        type="button"
        class="swim-split-handle__grip"
        aria-label="Resize split"
        @mousedown="${this._onMouseDown}"
        @dblclick="${this._onDblClick}"
      >
        <swim-icon font-icon="split-handle"></swim-icon>
      </button>
    `}};qo.styles=Gl;let Wt=qo;kr([a({type:String,attribute:"handle-basis"})],Wt.prototype,"handleBasis",1);kr([a({type:String,reflect:!0})],Wt.prototype,"direction",2);customElements.get($n)||customElements.define($n,Wt);const Zl=k`
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
`,Jl=[D,Zl];function Et(s){const e=String(s).indexOf("calc")>-1;return String(s).indexOf("%")>-1&&!e}function $e(s){return typeof s=="string"?Number(s.replace(/%/g,"").replace(/px/g,"").trim()):s}function $r(s,e,t,i,o,n){let r=s?Et(s)?$e(s):$e(s)/n:0,l=e?Et(e)?$e(e):$e(e)/n:100;return r=Math.max(r,i==="0"?o:0),l=Math.min(l,t==="0"?o:100),[r,l]}function En(s,e,t){const[i,o,n]=s.currentFlexParts,r=Et(n),l=$e(n),c=s.initialFlexParts[2],d=Et(c)?$e(c):$e(c)/t,m=r?l*t:l;let u=m+e,p=u/t;const[f,x]=$r(s.minBasis,s.maxBasis,i,o,d,t);return p=Math.max(p,f),p=Math.min(p,x),u=p*t,s.updateBasis(r?p+"%":u+"px"),u-m}var Xl=Object.defineProperty,Er=(s,e,t,i)=>{for(var o=void 0,n=s.length-1,r;n>=0;n--)(r=s[n])&&(o=r(e,t,o)||o);return o&&Xl(e,t,o),o};const Cn="swim-split",Uo=class Uo extends ${constructor(){super(...arguments),this.direction=_t.Row,this._areas=[],this._handles=[],this._handleListeners=new Map,this._onSlotChange=()=>{this._collectAreasAndHandles(),this._removeHandleListeners(),this._attachHandleListeners()}}connectedCallback(){super.connectedCallback(),this.addEventListener("slotchange",this._onSlotChange)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("slotchange",this._onSlotChange),this._removeHandleListeners()}updated(e){e.has("direction")&&this._handles.forEach(t=>{t.direction=this.direction})}firstUpdated(){requestAnimationFrame(()=>{this._collectAreasAndHandles(),this._attachHandleListeners()})}_collectAreasAndHandles(){if(!this.slotEl)return;const e=this.slotEl.assignedElements({flatten:!0});this._areas=e.filter(t=>{var i;return((i=t.tagName)==null?void 0:i.toLowerCase())==="swim-split-area"}),this._handles=e.filter(t=>{var i;return((i=t.tagName)==null?void 0:i.toLowerCase())==="swim-split-handle"}),this._handles.forEach(t=>{t.direction=this.direction})}_attachHandleListeners(){this._handles.forEach(e=>{const t=o=>{const n=o.detail;n&&this._onDrag(n)},i=()=>this._onDblClick();this._handleListeners.set(e,{drag:t,dblclick:i}),e.addEventListener("drag",t),e.addEventListener("dblclick",i)})}_removeHandleListeners(){this._handles.forEach(e=>{const t=this._handleListeners.get(e);t&&(e.removeEventListener("drag",t.drag),e.removeEventListener("dblclick",t.dblclick),this._handleListeners.delete(e))})}_resize(e){const o=(this.direction===_t.Row?this.clientWidth:this.clientHeight)/100,n=this._areas;if(n.length===0)return;const[r,...l]=n;let c=e;c=En(r,c,o),l.forEach(d=>{c+=En(d,-c,o)})}_onDrag(e){const t=this.direction===_t.Row?e.movementX:e.movementY;this._resize(t)}_onDblClick(){const i=(this.direction===_t.Row?this.clientWidth:this.clientHeight)/100,n=this._areas[0];if(!n)return;const[r,l,c]=n.currentFlexParts,d=Et(c),m=$e(c),p=(d?m*i:m)/i,f=n.initialFlexParts[2],x=Et(f)?$e(f):$e(f)/i,[P,G]=$r(n.minBasis,n.maxBasis,r,l,x,i),R=p-P,O=G-p,H=(R<O?O:-R)*i;this._resize(H)}render(){return h`<slot></slot>`}};Uo.styles=Jl;let Kt=Uo;Er([a({type:String,reflect:!0})],Kt.prototype,"direction");Er([ee("slot")],Kt.prototype,"slotEl");customElements.get(Cn)||customElements.define(Cn,Kt);const Ql=k`
  ${D}

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
    font-size: var(--font-size-5xl);
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
`;var bt=(s=>(s.Indeterminate="indeterminate",s.Determinate="determinate",s))(bt||{}),Fe=(s=>(s.Default="default",s.Icon="icon",s))(Fe||{}),ec=Object.defineProperty,tc=Object.getOwnPropertyDescriptor,de=(s,e,t,i)=>{for(var o=i>1?void 0:i?tc(e,t):e,n=s.length-1,r;n>=0;n--)(r=s[n])&&(o=(i?r(e,t,o):r(o))||o);return i&&o&&ec(e,t,o),o};const ic=50,oc=100,uo=100,gi=uo/2,sc=gi*2*Math.PI,nc="cloud-upload",rc="check",ac="x",Sn="swim-progress-spinner",jo=class jo extends ${constructor(){super(...arguments),this.mode=bt.Indeterminate,this.color="var(--blue-500)",this.failStatusColor="var(--red-500)",this.appearance=Fe.Default,this.inProgressIconName="",this.completeIconName="",this.failIconName="",this._isFailure=!1,this._value=0,this._total=100,this._diameter=100,this._strokeWidth=3,this._boundSlotChange=()=>this.requestUpdate()}get isFailure(){return this._isFailure}set isFailure(e){this._isFailure=b(e)}get value(){return this._value}set value(e){const t=F(e,0);this._value!==t&&(this._value=t)}get total(){return this._total}set total(e){const t=F(e,100);this._total!==t&&(this._total=t)}get diameter(){return this._diameter}set diameter(e){const t=F(e,100);this._diameter!==t&&(this._diameter=t)}get strokeWidth(){return this._strokeWidth}set strokeWidth(e){const t=F(e,3);this._strokeWidth!==t&&(this._strokeWidth=t)}get circumference(){return sc}get modeValue(){return this.mode===bt.Determinate||this.isComplete?this.value:ic}get modeTotal(){return this.mode===bt.Determinate||this.isComplete?this.total:oc}get percentage(){return 100/this.modeTotal*this.modeValue}get isComplete(){return this.value>=this.total&&this.total>0}get spinnerColor(){return this.isComplete&&this.isFailure?this.failStatusColor:this.color}get strokeDasharray(){return`${this.circumference} ${this.circumference}`}get strokeDashoffset(){return this.circumference-this.percentage/100*this.circumference}hasSlotContent(e){var i;const t=(i=this.shadowRoot)==null?void 0:i.querySelector(`slot[name="${e}"]`);return!!(t!=null&&t.assignedNodes().length)}connectedCallback(){super.connectedCallback(),this.addEventListener("slotchange",this._boundSlotChange)}disconnectedCallback(){this.removeEventListener("slotchange",this._boundSlotChange),super.disconnectedCallback()}get effectiveInProgressIcon(){return this.hasSlotContent("in-progress-icon")?"":this.inProgressIconName||(this.appearance===Fe.Icon?nc:"")}get effectiveCompleteIcon(){return this.hasSlotContent("complete-icon")?"":this.completeIconName||(this.appearance===Fe.Icon?rc:"")}get effectiveFailIcon(){return this.hasSlotContent("fail-icon")?"":this.failIconName||(this.appearance===Fe.Icon?ac:"")}render(){const e=this.appearance===Fe.Icon&&!this.isComplete&&(this.effectiveInProgressIcon||this.hasSlotContent("in-progress-icon")),t=this.appearance===Fe.Icon&&this.isComplete&&!this.isFailure&&(this.effectiveCompleteIcon||this.hasSlotContent("complete-icon")),i=this.appearance===Fe.Icon&&this.isComplete&&this.isFailure&&(this.effectiveFailIcon||this.hasSlotContent("fail-icon"));return h`
      <div
        class="swim-progress-spinner__container ${this.appearance===Fe.Icon?"swim-progress-spinner__container--icon":""}"
        part="container"
        style="--spinner-color: ${this.spinnerColor}"
        role="progressbar"
        aria-valuenow="${this.mode===bt.Determinate?this.value:g}"
        aria-valuemin="0"
        aria-valuemax="${this.mode===bt.Determinate?this.total:g}"
        aria-label="Progress"
      >
        <svg
          class="swim-progress-spinner__svg"
          viewBox="0 0 ${uo} ${uo}"
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
            r="${gi}"
            cx="${gi}"
            cy="${gi}"
          ></circle>
        </svg>

        ${e?h`
              <div class="swim-progress-spinner__icon-in-progress">
                ${this.hasSlotContent("in-progress-icon")?h`<slot name="in-progress-icon"></slot>`:h`<swim-icon font-icon="${this.effectiveInProgressIcon}"></swim-icon>`}
              </div>
            `:t?h`
              <div class="swim-progress-spinner__icon-complete">
                ${this.hasSlotContent("complete-icon")?h`<slot name="complete-icon"></slot>`:h`<swim-icon font-icon="${this.effectiveCompleteIcon}"></swim-icon>`}
              </div>
            `:i?h`
              <div class="swim-progress-spinner__icon-failure">
                ${this.hasSlotContent("fail-icon")?h`<slot name="fail-icon"></slot>`:h`<swim-icon font-icon="${this.effectiveFailIcon}"></swim-icon>`}
              </div>
            `:g}
      </div>

      ${this.spinnerLabel?h`
            <div class="swim-progress-spinner__label" part="label">
              ${!this.isComplete&&this.spinnerLabel.inProgressLabel?h`<h4>${this.spinnerLabel.inProgressLabel}</h4>`:this.isComplete&&!this.isFailure&&this.spinnerLabel.completeLabel?h`<h4>${this.spinnerLabel.completeLabel}</h4>`:this.isComplete&&this.isFailure&&this.spinnerLabel.failLabel?h`<h4>${this.spinnerLabel.failLabel}</h4>`:g}
            </div>
          `:g}
    `}};jo.styles=Ql;let Q=jo;de([a({type:String,reflect:!0})],Q.prototype,"mode",2);de([a({type:String})],Q.prototype,"color",2);de([a({attribute:"fail-status-color",type:String})],Q.prototype,"failStatusColor",2);de([a({type:String,reflect:!0})],Q.prototype,"appearance",2);de([a({type:String,attribute:"in-progress-icon-name"})],Q.prototype,"inProgressIconName",2);de([a({type:String,attribute:"complete-icon-name"})],Q.prototype,"completeIconName",2);de([a({type:String,attribute:"fail-icon-name"})],Q.prototype,"failIconName",2);de([a({type:Boolean,reflect:!0,attribute:"is-failure",converter:w})],Q.prototype,"isFailure",1);de([a({attribute:!1})],Q.prototype,"spinnerLabel",2);de([a({type:Number})],Q.prototype,"value",1);de([a({type:Number})],Q.prototype,"total",1);de([a({type:Number})],Q.prototype,"diameter",1);de([a({attribute:"stroke-width",type:Number})],Q.prototype,"strokeWidth",1);customElements.get(Sn)||customElements.define(Sn,Q);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class po extends xo{constructor(e){if(super(e),this.it=g,e.type!==Ge.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===g||e==null)return this._t=void 0,this.it=e;if(e===ue)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;const t=[e];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}}po.directiveName="unsafeHTML",po.resultType=1;const lc=yo(po),cc=k`
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
    font-size: var(--font-size-xs);
    padding: var(--spacing-4, 4px);
    text-align: center;
  }

  /* Type: popover */
  .swim-tooltip__panel--type-popover {
    background: var(--grey-200);
    color: var(--grey-700);
    box-shadow: var(--shadow-2);
    font-size: var(--font-size-s);
    padding: var(--spacing-10, 10px);
  }

  .swim-tooltip__content {
    display: block;
  }
`,dc=[D,cc];var j=(s=>(s.top="top",s.bottom="bottom",s.left="left",s.right="right",s))(j||{}),Se=(s=>(s.top="top",s.bottom="bottom",s.left="left",s.right="right",s.center="center",s))(Se||{}),Co=(s=>(s.popover="popover",s.tooltip="tooltip",s))(Co||{}),Re=(s=>(s.all="all",s.focus="focus",s.click="click",s.mouseover="mouseover",s))(Re||{});const De=7;function $i(s,e,t){return t===Se.left?(s.left??0)-De:t===Se.right?(s.left??0)+(s.width??0)-(e.width??0)+De:(s.left??0)+(s.width??0)/2-(e.width??0)/2}function So(s,e,t){return t===Se.top?(s.top??0)-De:t===Se.bottom?(s.top??0)+(s.height??0)-(e.height??0)+De:(s.top??0)+(s.height??0)/2-(e.height??0)/2}function Dn(s,e,t){let i=$i(s,e,t);return i+(e.width??0)>window.innerWidth&&(i=window.innerWidth-(e.width??0)),i}function Tn(s,e,t){let i=So(s,e,t);return i+(e.height??0)>window.innerHeight&&(i=window.innerHeight-(e.height??0)),i}function hc(s,e,t,i,o){return t===j.right?$i(s,e,i)+(e.width??0)+o>window.innerWidth:t===j.left?$i(s,e,i)-o<0:t===j.top?(s.top??0)-(e.height??0)-o<0:t===j.bottom?So(s,e,i)+(e.height??0)+o>window.innerHeight:!1}function uc(s,e,t,i,o){return hc(t,e,s,o,i)?s===j.right?j.left:s===j.left?j.right:s===j.top?j.bottom:j.top:s}function pc(s,e,t,i,o){let n=0,r=0;return s===j.right?(r=(t.left??0)+(t.width??0)+i,n=Tn(t,e,o)):s===j.left?(r=(t.left??0)-(e.width??0)-i,n=Tn(t,e,o)):s===j.top?(n=(t.top??0)-(e.height??0)-i,r=Dn(t,e,o)):(n=(t.top??0)+(t.height??0)+i,r=Dn(t,e,o)),{top:n,left:r}}function In(s,e,t,i){let o;i===Se.left?o=(s.width??0)/2-(t.width??0)/2+De:i===Se.right?o=(e.width??0)-(s.width??0)/2-(t.width??0)/2-De:o=(e.width??0)/2-(t.width??0)/2;const n=$i(s,e,i);return n+(e.width??0)>window.innerWidth&&(o+=n+(e.width??0)-window.innerWidth),o}function An(s,e,t,i){let o;i===Se.top?o=(s.height??0)/2-(t.height??0)/2+De:i===Se.bottom?o=(e.height??0)-(s.height??0)/2-(t.height??0)/2-De:o=(e.height??0)/2-(t.height??0)/2;const n=So(s,e,i);return n+(e.height??0)>window.innerHeight&&(o+=n+(e.height??0)-window.innerHeight),o}function mc(s,e,t,i,o){let n=0,r=0;return s===j.right?(r=-De,n=An(t,e,i,o)):s===j.left?(r=e.width??0,n=An(t,e,i,o)):s===j.top?(n=e.height??0,r=In(t,e,i,o)):(n=-De,r=In(t,e,i,o)),{top:n,left:r}}var fc=Object.defineProperty,gc=Object.getOwnPropertyDescriptor,W=(s,e,t,i)=>{for(var o=i>1?void 0:i?gc(e,t):e,n=s.length-1,r;n>=0;n--)(r=s[n])&&(o=(i?r(e,t,o):r(o))||o);return i&&o&&fc(e,t,o),o};const zn="swim-tooltip",Go=class Go extends ${constructor(){super(...arguments),this.content="",this.placement=j.top,this.alignment=Se.center,this.type=Co.popover,this.showEvent=Re.all,this._spacing=10,this._showCaret=!0,this._disabled=!1,this._closeOnClickOutside=!0,this._closeOnMouseLeave=!0,this._hideTimeout=300,this._showTimeout=100,this.cssClass="",this._open=!1,this._panelTop=0,this._panelLeft=0,this._effectivePlacement=j.top,this._caretTop=0,this._caretLeft=0,this._animate=!1,this._triggerRef=null,this._panelRef=null,this._caretRef=null,this._boundDocumentClick=null,this._openFromClick=!1,this._tooltipId=`swim-tooltip-${Math.random().toString(36).slice(2,11)}`,this._throttledPosition=()=>{this._throttleTimeout==null&&(this._throttleTimeout=window.setTimeout(()=>{this._throttleTimeout=void 0,this._open&&this._position()},100))},this._panelForHideListeners=null,this._panelMouseEnterBound=()=>this._clearHideTimer(),this._panelMouseLeaveBound=e=>{var i;const t=e.relatedTarget;t&&((i=this._triggerRef)!=null&&i.contains(t))||this.hide()},this._onTriggerFocus=()=>{this._listensFocus&&this.show()},this._onTriggerBlur=()=>{this._listensFocus&&this.hide(!0)},this._onTriggerMouseEnter=()=>{this._listensHover&&this.show()},this._onTriggerMouseLeave=e=>{var o;const t=e.relatedTarget,i=this._panelRef??((o=this.shadowRoot)==null?void 0:o.querySelector(".swim-tooltip__panel"));i!=null&&i.contains(t)||(this._listensHover&&this.closeOnMouseLeave&&this.hide(),this._listensClick&&this.hide())},this._onPanelMouseLeave=()=>{this.closeOnMouseLeave&&this.hide()},this._onTriggerClick=()=>{if(this.showEvent===Re.mouseover){this.hide(!0);return}this._listensClick&&(this._openFromClick?this.hide(!0):(this._openFromClick=!0,this.show(!0)))}}get spacing(){return this._spacing}set spacing(e){this._spacing=F(e,10)}get showCaret(){return this._showCaret}set showCaret(e){this._showCaret=b(e)}get disabled(){return this._disabled}set disabled(e){this._disabled=b(e)}get closeOnClickOutside(){return this._closeOnClickOutside}set closeOnClickOutside(e){this._closeOnClickOutside=b(e)}get closeOnMouseLeave(){return this._closeOnMouseLeave}set closeOnMouseLeave(e){this._closeOnMouseLeave=b(e)}get hideTimeout(){return this._hideTimeout}set hideTimeout(e){this._hideTimeout=F(e,300)}get showTimeout(){return this._showTimeout}set showTimeout(e){this._showTimeout=F(e,100)}connectedCallback(){super.connectedCallback(),window.addEventListener("resize",this._throttledPosition)}disconnectedCallback(){window.removeEventListener("resize",this._throttledPosition),this._throttleTimeout!=null&&(window.clearTimeout(this._throttleTimeout),this._throttleTimeout=void 0),this._clearShowTimer(),this._clearHideTimer(),this._removeDocumentClick(),this._removePanelHideListeners(),super.disconnectedCallback()}_hasContentSlot(){return!!this.querySelector('[slot="content"]')}get _listensFocus(){return this.showEvent===Re.all||this.showEvent===Re.focus}get _listensHover(){return this.showEvent===Re.all||this.showEvent===Re.mouseover}get _listensClick(){return this.showEvent===Re.all||this.showEvent===Re.click}show(e=!1){if(this._open||this.disabled)return;this._clearShowTimer(),this._clearHideTimer();const t=()=>{this._open||this.disabled||!(this._hasContentSlot||this.content!=null&&this.content!=="")||(this._open=!0,this._effectivePlacement=this.placement,requestAnimationFrame(()=>{this._position(),requestAnimationFrame(()=>{this._animate=!0,this._addHideListeners()})}),this.dispatchEvent(new CustomEvent("show",{detail:!0,bubbles:!1,composed:!1})))};e?t():this._showTimer=window.setTimeout(t,this.showTimeout)}hide(e=!1){if(!this._open)return;this._clearShowTimer(),this._clearHideTimer();const t=()=>{this._open&&(this._open=!1,this._animate=!1,this._openFromClick=!1,this._removeDocumentClick(),this._removePanelHideListeners(),this.dispatchEvent(new CustomEvent("hide",{detail:!0,bubbles:!1,composed:!1})))};e?t():this._hideTimer=window.setTimeout(t,this.hideTimeout)}_clearShowTimer(){this._showTimer!=null&&(window.clearTimeout(this._showTimer),this._showTimer=void 0)}_clearHideTimer(){this._hideTimer!=null&&(window.clearTimeout(this._hideTimer),this._hideTimer=void 0)}_removeDocumentClick(){this._boundDocumentClick&&(document.removeEventListener("click",this._boundDocumentClick,!0),this._boundDocumentClick=null)}_position(){var c,d,m;const e=this._triggerRef??((c=this.shadowRoot)==null?void 0:c.querySelector(".swim-tooltip__trigger")),t=this._panelRef??((d=this.shadowRoot)==null?void 0:d.querySelector(".swim-tooltip__panel")),i=this._caretRef??((m=this.shadowRoot)==null?void 0:m.querySelector(".swim-tooltip__caret"));if(!e||!t)return;const o=e.getBoundingClientRect();if(!o.height&&!o.width)return;const n=t.getBoundingClientRect();this._effectivePlacement=uc(this.placement,n,o,this.spacing,this.alignment);const{top:r,left:l}=pc(this._effectivePlacement,n,o,this.spacing,this.alignment);if(this._panelTop=r,this._panelLeft=l,this.showCaret&&i){const u=i.getBoundingClientRect(),p=mc(this._effectivePlacement,n,o,u,this.alignment);this._caretTop=p.top,this._caretLeft=p.left}}_removePanelHideListeners(){this._panelForHideListeners&&(this._panelForHideListeners.removeEventListener("mouseenter",this._panelMouseEnterBound),this._panelForHideListeners.removeEventListener("mouseleave",this._panelMouseLeaveBound),this._panelForHideListeners=null)}_addHideListeners(){var t;const e=this._panelRef??((t=this.shadowRoot)==null?void 0:t.querySelector(".swim-tooltip__panel"));e&&(this._removePanelHideListeners(),this._panelForHideListeners=e,e.addEventListener("mouseenter",this._panelMouseEnterBound),this.closeOnMouseLeave&&e.addEventListener("mouseleave",this._panelMouseLeaveBound),this.closeOnClickOutside&&(this._boundDocumentClick=i=>{var n;const o=i.target;e.contains(o)||(n=this._triggerRef)!=null&&n.contains(o)||this.hide(!0)},setTimeout(()=>document.addEventListener("click",this._boundDocumentClick,!0),0)))}firstUpdated(){var e,t,i;this._triggerRef=(e=this.shadowRoot)==null?void 0:e.querySelector(".swim-tooltip__trigger"),this._panelRef=(t=this.shadowRoot)==null?void 0:t.querySelector(".swim-tooltip__panel"),this._caretRef=(i=this.shadowRoot)==null?void 0:i.querySelector(".swim-tooltip__caret")}updated(e){this._open&&(e.has("placement")||e.has("alignment")||e.has("spacing"))&&this._position()}render(){const e=this._hasContentSlot(),t=e||this.content!=null&&this.content!=="",i=["swim-tooltip__panel",`swim-tooltip__panel--type-${this.type}`,`swim-tooltip__panel--position-${this._effectivePlacement}`,this._animate?"swim-tooltip__panel--animate":"",this.cssClass.includes("narrow")?"swim-tooltip__panel--narrow":""].filter(Boolean).join(" ");return h`
      <div
        part="trigger"
        class="swim-tooltip__trigger"
        aria-describedby="${this._open&&t?this._tooltipId:g}"
        aria-expanded="${this._listensClick?this._open?"true":"false":g}"
        @focusin="${this._onTriggerFocus}"
        @focusout="${this._onTriggerBlur}"
        @mouseenter="${this._onTriggerMouseEnter}"
        @mouseleave="${this._onTriggerMouseLeave}"
        @click="${this._onTriggerClick}"
      >
        <slot></slot>
      </div>

      ${this._open&&t?h`
            <div
              part="panel"
              id="${this._tooltipId}"
              class="${i}"
              style="top: ${this._panelTop}px; left: ${this._panelLeft}px;"
              role="tooltip"
              aria-hidden="false"
              @mouseenter="${()=>this._clearHideTimer()}"
              @mouseleave="${this._onPanelMouseLeave}"
            >
              ${this.showCaret?h`
                    <span
                      part="caret"
                      class="swim-tooltip__caret swim-tooltip__caret--position-${this._effectivePlacement}"
                      style="top: ${this._caretTop}px; left: ${this._caretLeft}px;"
                    ></span>
                  `:""}
              <div part="content" class="swim-tooltip__content">
                ${e?h`<slot name="content"></slot>`:h`${lc(this.content)}`}
              </div>
            </div>
          `:""}
    `}};Go.styles=dc;let V=Go;W([a({type:String})],V.prototype,"content",2);W([a({type:String,reflect:!0,attribute:"placement"})],V.prototype,"placement",2);W([a({type:String,reflect:!0,attribute:"alignment"})],V.prototype,"alignment",2);W([a({type:String,reflect:!0,attribute:"type"})],V.prototype,"type",2);W([a({type:String,attribute:"show-event"})],V.prototype,"showEvent",2);W([a({type:Number,attribute:"spacing"})],V.prototype,"spacing",1);W([a({type:Boolean,attribute:"show-caret",converter:ce})],V.prototype,"showCaret",1);W([a({type:Boolean,reflect:!0,converter:w})],V.prototype,"disabled",1);W([a({type:Boolean,attribute:"close-on-click-outside",converter:ce})],V.prototype,"closeOnClickOutside",1);W([a({type:Boolean,attribute:"close-on-mouse-leave",converter:ce})],V.prototype,"closeOnMouseLeave",1);W([a({type:Number,attribute:"hide-timeout"})],V.prototype,"hideTimeout",1);W([a({type:Number,attribute:"show-timeout"})],V.prototype,"showTimeout",1);W([a({type:String,attribute:"css-class"})],V.prototype,"cssClass",2);W([_()],V.prototype,"_open",2);W([_()],V.prototype,"_panelTop",2);W([_()],V.prototype,"_panelLeft",2);W([_()],V.prototype,"_effectivePlacement",2);W([_()],V.prototype,"_caretTop",2);W([_()],V.prototype,"_caretLeft",2);W([_()],V.prototype,"_animate",2);customElements.get(zn)||customElements.define(zn,V);const bc=40,_c=2,wc=k`
  :host {
    --swim-navbar-bar-size: ${bc}px;
    --swim-navbar-bar-thickness: ${_c}px;
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
`,vc=k`
  :host {
    display: flex;
    font-size: var(--font-size-xl);
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
`;var yc=Object.defineProperty,xc=Object.getOwnPropertyDescriptor,Do=(s,e,t,i)=>{for(var o=xc(e,t),n=s.length-1,r;n>=0;n--)(r=s[n])&&(o=r(e,t,o)||o);return o&&yc(e,t,o),o};const Ln="swim-navbar-item",Wo=class Wo extends ${constructor(){super(...arguments),this._active=0,this._total=0,this._index=0,this._clickBound=()=>this._handleClick()}get active(){return this._active}set active(e){const t=F(e,0);if(this._active!==t){const i=this._active;this._active=t,this.requestUpdate("active",i)}}get total(){return this._total}set total(e){this._total=F(e,0)}get index(){return this._index}set index(e){const t=F(e,0);if(this._index!==t){const i=this._index;this._index=t,this.requestUpdate("index",i)}}connectedCallback(){super.connectedCallback(),this.addEventListener("click",this._clickBound)}disconnectedCallback(){this.removeEventListener("click",this._clickBound),super.disconnectedCallback()}render(){const e=this._active===this._index;return h`
      <div
        class="swim-navbar-item ${e?"swim-navbar-item--active":""}"
        role="tab"
        aria-selected="${e}"
        tabindex="${e?0:-1}"
        @keydown="${this._handleKeyDown}"
      >
        <slot></slot>
      </div>
    `}setActive(){this._active!==this._index&&(this._active=this._index,this.requestUpdate(),this.dispatchEvent(new CustomEvent("active-change",{detail:this._index,bubbles:!1,composed:!1})))}_handleClick(){this.setActive()}_handleKeyDown(e){(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),this.setActive())}};Wo.styles=[D,vc];let lt=Wo;Do([a({type:Number})],lt.prototype,"active");Do([a({type:Number})],lt.prototype,"total");Do([a({type:Number})],lt.prototype,"index");customElements.get(Ln)||customElements.define(Ln,lt);var kc=Object.defineProperty,$c=Object.getOwnPropertyDescriptor,Fi=(s,e,t,i)=>{for(var o=i>1?void 0:i?$c(e,t):e,n=s.length-1,r;n>=0;n--)(r=s[n])&&(o=(i?r(e,t,o):r(o))||o);return i&&o&&kc(e,t,o),o};const Ec=40,Mn="swim-navbar",Ko=class Ko extends ${constructor(){super(...arguments),this._barAtTop=!1,this._active=0,this._navItems=[],this._slotChangeBound=()=>this._syncFromSlot(),this._activeChangeBound=e=>this._onItemActiveChange(e)}get barAtTop(){return this._barAtTop}set barAtTop(e){this._barAtTop=b(e)}get active(){return this._active}set active(e){const t=F(e,0);t!==this._active&&!isNaN(t)&&t>=0&&(!this._navItems.length||t<this._navItems.length)&&(this._active=t,this._syncItems(),this.dispatchEvent(new CustomEvent("active-change",{detail:this._active,bubbles:!1,composed:!1})))}connectedCallback(){super.connectedCallback(),requestAnimationFrame(()=>this._syncFromSlot())}firstUpdated(){var t;this._syncFromSlot();const e=this._slotEl??((t=this.shadowRoot)==null?void 0:t.querySelector("slot"));e&&e.addEventListener("slotchange",this._slotChangeBound)}disconnectedCallback(){var t;const e=(t=this.shadowRoot)==null?void 0:t.querySelector("slot");e&&e.removeEventListener("slotchange",this._slotChangeBound),this._navItems.forEach(i=>{i.removeEventListener("active-change",this._activeChangeBound)}),super.disconnectedCallback()}goTo(e){const t=F(e,-1);if(t>=0&&t<this._navItems.length&&t!==this._active){const i=this._navItems[t];i&&i.setActive()}}_syncFromSlot(){var o;const e=this._slotEl??((o=this.shadowRoot)==null?void 0:o.querySelector("slot"));let t=(e==null?void 0:e.assignedElements({flatten:!0}))??[];t.length===0&&(t=Array.from(this.children));const i=t.filter(n=>n instanceof lt);this._navItems.forEach(n=>{n.removeEventListener("active-change",this._activeChangeBound)}),this._navItems=i,i.forEach(n=>{n.addEventListener("active-change",this._activeChangeBound)}),this._syncItems()}_syncItems(){const e=this._active,t=this._navItems.length;this._navItems.forEach((i,o)=>{i.index=o,i.total=t,i.active=e})}_onItemActiveChange(e){const t=e.detail;typeof t!="number"||t===this._active||t>=0&&t<this._navItems.length&&(this._active=t,this._syncItems(),this.requestUpdate(),this.dispatchEvent(new CustomEvent("active-change",{detail:this._active,bubbles:!1,composed:!1})))}_getBarTransform(){const e=this._navItems.filter((t,i)=>i<this._active).length;return`translateX(${Ec*e}px)`}render(){const e=this._barAtTop;return h`
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
    `}};Ko.styles=[D,wc];let ct=Ko;Fi([ee("slot")],ct.prototype,"_slotEl",2);Fi([a({type:Boolean,reflect:!0,attribute:"bar-at-top",converter:w})],ct.prototype,"barAtTop",1);Fi([a({type:Number})],ct.prototype,"active",1);Fi([_()],ct.prototype,"_navItems",2);customElements.get(Mn)||customElements.define(Mn,ct);const Cc=[D,k`
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
      font-size: var(--font-size-s);
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
  `];var Nt=(s=>(s.Error="error",s.Success="success",s.Warning="warning",s))(Nt||{}),Sc=Object.defineProperty,Dc=Object.getOwnPropertyDescriptor,Ue=(s,e,t,i)=>{for(var o=i>1?void 0:i?Dc(e,t):e,n=s.length-1,r;n>=0;n--)(r=s[n])&&(o=(i?r(e,t,o):r(o))||o);return i&&o&&Sc(e,t,o),o};const On=44,Bn="swim-list",Zo=class Zo extends ${constructor(){super(...arguments),this.columnLayout="",this.dataSource=[],this.defaultRowStatus=Nt.Error,this.headerLabels=[],this.columns=[],this._hasScrollbar=!1,this._page=1,this._rowsContainer=null,this._scrollBound=e=>this._emitScrollChanges(e)}get height(){return this._height}set height(e){this._height=e===void 0?void 0:F(e)}connectedCallback(){super.connectedCallback()}firstUpdated(){var e;this._rowsContainer=((e=this.renderRoot)==null?void 0:e.querySelector(".swim-list__rows-container"))??null,this._rowsContainer&&(this._rowsContainer.addEventListener("scroll",this._scrollBound),requestAnimationFrame(()=>{var t;if(this._updateScrollbarState(),(t=this.paginationConfig)!=null&&t.index&&this.paginationConfig.index>1&&this.paginationConfig.pageSize>0){this._page=this.paginationConfig.index;const i=On*(this.paginationConfig.pageSize*(this._page-1));this._rowsContainer.scrollTo({top:i})}}))}disconnectedCallback(){this._rowsContainer&&(this._rowsContainer.removeEventListener("scroll",this._scrollBound),this._rowsContainer=null),super.disconnectedCallback()}updated(e){(e.has("dataSource")||e.has("height"))&&this._updateScrollbarState()}_updateScrollbarState(){this._rowsContainer&&(this._hasScrollbar=this._rowsContainer.scrollHeight>this._rowsContainer.clientHeight)}_emitScrollChanges(e){var n;const i=e.target.scrollTop;this.dispatchEvent(new CustomEvent("scroll",{detail:i,bubbles:!1,composed:!1}));const o=(n=this.paginationConfig)==null?void 0:n.pageSize;if(o){const r=Math.floor(i/On),l=Math.floor(r/o)+1;l!==this._page&&(this._page=l,this.dispatchEvent(new CustomEvent("page-change",{detail:l,bubbles:!1,composed:!1})))}}_getGridStyle(){const e=Math.max(this.headerLabels.length,this.columns.length,1);return this.columnLayout&&this.columnLayout.trim()?this.columnLayout.trim():`repeat(${e}, 1fr)`}_getRowStatus(e){const t=e.status;return t===Nt.Error||t===Nt.Success||t===Nt.Warning?t:this.defaultRowStatus}_getCellValue(e,t,i){if(t==="$index")return`${i+1}.`;const o=e[t];return o==null?"":String(o)}render(){const e=this._getGridStyle(),t=Math.max(this.headerLabels.length,this.columns.length,1),i=this.headerLabels.length>=t?this.headerLabels.slice(0,t):[...this.headerLabels,...Array(t-this.headerLabels.length).fill("")];return h`
      <div
        class="swim-list__headers-container ${this._hasScrollbar?"swim-list__headers-container--scrollable":""}"
        style="grid-template-columns: ${e}"
      >
        ${i.map(o=>h`<span class="swim-list__header-cell">${o}</span>`)}
      </div>
      <hr class="swim-list__divider" />
      <div class="swim-list__rows-container" style=${this._height!==void 0?`height: ${this._height}px`:""}>
        ${this.dataSource.map((o,n)=>{const r=this._getRowStatus(o);return h`
            <div class="swim-list__row swim-list__row--${r}" style="grid-template-columns: ${e}">
              ${this.columns.map(l=>h` <span class="swim-list__cell">${this._getCellValue(o,l,n)}</span> `)}
            </div>
          `})}
      </div>
    `}};Zo.styles=Cc;let fe=Zo;Ue([a({type:String,attribute:"column-layout"})],fe.prototype,"columnLayout",2);Ue([a({type:Array,attribute:!1})],fe.prototype,"dataSource",2);Ue([a({type:Number})],fe.prototype,"height",1);Ue([a({attribute:!1})],fe.prototype,"paginationConfig",2);Ue([a({type:String,attribute:"default-row-status",reflect:!0})],fe.prototype,"defaultRowStatus",2);Ue([a({type:Array,attribute:!1})],fe.prototype,"headerLabels",2);Ue([a({type:Array,attribute:!1})],fe.prototype,"columns",2);Ue([_()],fe.prototype,"_hasScrollbar",2);Ue([_()],fe.prototype,"_page",2);customElements.get(Bn)||customElements.define(Bn,fe);const Tc=[D,St,k`
    :host {
      outline: none;
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

    .swim-dialog.swim-dialog--open {
      pointer-events: auto;
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
      pointer-events: auto;
      cursor: default;
    }

    /* ngx-dialog visibilityTransition void=>*: 0.2s ease-out, opacity 0→1, scale3d(1.2)→(1) */
    @keyframes swim-dialog-content-enter {
      from {
        opacity: 0;
        transform: scale3d(1.2, 1.2, 1.2);
      }
      to {
        opacity: 1;
        transform: scale3d(1, 1, 1);
      }
    }

    .swim-dialog__content {
      outline: none;
      pointer-events: auto;
      position: relative;
      border-radius: var(--radius-8);
      border: var(--swim-dialog-border, none);
      box-shadow: var(--swim-dialog-box-shadow, var(--shadow-dialog-panel));
      background: var(--swim-dialog-bg, var(--grey-725));
      padding: 1.4rem;
      min-width: 250px;
      font-size: var(--font-size-m);
      color: var(--swim-dialog-body-color, var(--grey-200));
      z-index: calc(var(--swim-dialog-z, 991) + 1);
    }

    .swim-dialog.swim-dialog--open .swim-dialog__content {
      animation: swim-dialog-content-enter 0.2s ease-out forwards;
    }

    @media (prefers-reduced-motion: reduce) {
      .swim-dialog.swim-dialog--open .swim-dialog__content {
        animation: none;
        opacity: 1;
        transform: none;
      }
    }

    .swim-dialog__content--large,
    .swim-dialog__content--medium {
      padding: var(--spacing-0);
      width: calc(100vw - 120px);
      background: transparent;
      border: none;
      box-shadow: none;
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
      text-align: var(--swim-dialog-header-text-align, start);
    }

    .swim-dialog__title,
    .swim-dialog__header h1,
    .swim-dialog__header h2 {
      font-size: var(--font-size-3xl);
      font-weight: 400;
      margin: 0 0 1.4rem 0;
      color: var(--swim-dialog-header-color, var(--grey-050));
      text-align: inherit;
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
      width: 100%;
      height: 100%;
      height: 100dvh; /* avoid scroll from 100vh vs visible area */
      align-items: stretch;
      justify-content: flex-start;
      overflow-x: hidden;
      overflow-y: auto;
    }

    :host(.swim-dialog--full-screen) .swim-dialog__content,
    .swim-dialog.swim-dialog--full-screen .swim-dialog__content {
      box-shadow: none;
      border: none;
      box-sizing: border-box;
      width: 100%;
      min-height: 100%;
    }

    :host(.swim-dialog--full-screen) .swim-dialog__body,
    .swim-dialog.swim-dialog--full-screen .swim-dialog__body {
      max-height: none;
      overflow: visible;
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
  `];var Vt=(s=>(s.Regular="regular",s.Medium="medium",s.Large="large",s))(Vt||{}),Ic=Object.defineProperty,Ac=Object.getOwnPropertyDescriptor,te=(s,e,t,i)=>{for(var o=i>1?void 0:i?Ac(e,t):e,n=s.length-1,r;n>=0;n--)(r=s[n])&&(o=(i?r(e,t,o):r(o))||o);return i&&o&&Ic(e,t,o),o};const Pn="swim-dialog",Jo=class Jo extends ${constructor(){super(...arguments),this.dialogTitle="",this.content="",this.class="",this.cssClass="",this.format=Vt.Regular,this.showBackdrop=!0,this._closeButton=!0,this._closeOnBlur=!0,this._closeOnEscape=!0,this._visible=!1,this._zIndex=991,this._contentId=`swim-dialog-content-${Math.random().toString(36).slice(2,11)}`,this._titleId=`swim-dialog-title-${Math.random().toString(36).slice(2,11)}`,this._previousActiveElement=null}get title(){return this.dialogTitle}set title(e){e&&(this.dialogTitle=e)}get closeButton(){return this._closeButton}set closeButton(e){this._closeButton=b(e)}get closeOnBlur(){return this._closeOnBlur}set closeOnBlur(e){this._closeOnBlur=b(e)}get closeOnEscape(){return this._closeOnEscape}set closeOnEscape(e){this._closeOnEscape=b(e)}get visible(){return this._visible}set visible(e){const t=b(e);this._visible!==t&&(this._visible=t,t?(this._previousActiveElement=typeof document<"u"?document.activeElement:null,this.dispatchEvent(new CustomEvent("open",{bubbles:!1,composed:!1}))):(this._restoreFocus(),this.dispatchEvent(new CustomEvent("close",{detail:void 0,bubbles:!1,composed:!1}))))}get zIndex(){return this._zIndex}set zIndex(e){this._zIndex=F(e,991)}get _contentzIndex(){return this.zIndex+1}get _canClose(){return this.beforeClose?this.beforeClose():!0}_restoreFocus(){this._previousActiveElement&&typeof this._previousActiveElement.focus=="function"&&this._previousActiveElement.focus(),this._previousActiveElement=null}show(){this.visible=!0}hide(){this._canClose&&(this.visible=!1)}_onBackdropClick(){this.closeOnBlur&&this.hide()}_onKeydown(e){if(e.key==="Escape"){if(!this.closeOnEscape)return;e.stopPropagation(),this.hide()}}_syncCloseButtonCustomProperty(){this.closeButton?this.style.removeProperty("--swim-dialog-header-action-display"):this.style.setProperty("--swim-dialog-header-action-display","none")}connectedCallback(){super.connectedCallback(),this._syncCloseButtonCustomProperty()}disconnectedCallback(){this.style.removeProperty("--swim-dialog-header-action-display"),super.disconnectedCallback()}updated(e){e.has("closeButton")&&this._syncCloseButtonCustomProperty(),e.has("visible")&&this.visible&&this._contentEl&&requestAnimationFrame(()=>{var t;(t=this._contentEl)==null||t.focus({preventScroll:!0})})}render(){if(!this.visible)return g;const e=this.format===Vt.Regular||this.format==="regular",t=this.format===Vt.Large||this.format==="large",i=this.format===Vt.Medium||this.format==="medium",o=["swim-dialog__content",this.cssClass,t?"swim-dialog__content--large":"",i?"swim-dialog__content--medium":""].filter(Boolean).join(" "),n=this.class.includes("swim-dialog--full-screen"),r=["swim-dialog","swim-dialog--open",this.class,n?"swim-scroll":""].filter(Boolean).join(" ");return h`
      <div class="${r}" style="--swim-dialog-z: ${this.zIndex}" role="presentation">
        ${this.showBackdrop?h`<div class="swim-dialog__backdrop" aria-hidden="true" @click="${this._onBackdropClick}"></div>`:g}
        <div
          part="content"
          class="${o}"
          style="z-index: ${this._contentzIndex}"
          tabindex="-1"
          role="dialog"
          aria-modal="true"
          aria-labelledby="${this.dialogTitle?this._titleId:g}"
          id="${this._contentId}"
          @keydown="${this._onKeydown}"
        >
          ${e?h`
                ${this.closeButton?h`
                      <button
                        part="close-button"
                        type="button"
                        class="swim-dialog__close"
                        aria-label="Close dialog"
                        @click="${this.hide}"
                      >
                        <swim-icon font-icon="x"></swim-icon>
                      </button>
                    `:g}
                ${this.dialogTitle?h`
                      <div class="swim-dialog__header" part="header">
                        <h2 id="${this._titleId}" class="swim-dialog__title">${this.dialogTitle}</h2>
                      </div>
                    `:g}
                <div class="swim-dialog__body swim-scroll">
                  <slot></slot>
                  ${this.content?h`<div>${this.content}</div>`:g}
                </div>
              `:h`
                <div class="swim-dialog__body swim-scroll">
                  <slot></slot>
                  ${this.content?h`<div>${this.content}</div>`:g}
                </div>
              `}
        </div>
      </div>
    `}};Jo.styles=Tc;let K=Jo;te([a({type:String,attribute:"dialog-title"})],K.prototype,"dialogTitle",2);te([a({type:String})],K.prototype,"title",1);te([a({type:String})],K.prototype,"content",2);te([a({type:String})],K.prototype,"class",2);te([a({type:String,attribute:"css-class"})],K.prototype,"cssClass",2);te([a({type:String,reflect:!0})],K.prototype,"format",2);te([a({type:Boolean,attribute:"show-backdrop",reflect:!0,converter:{fromAttribute:s=>s===null?!0:s!=="false"&&s!=="0",toAttribute:s=>s?"":"false"}})],K.prototype,"showBackdrop",2);te([a({type:Boolean,attribute:"close-button",converter:ce})],K.prototype,"closeButton",1);te([a({type:Boolean,attribute:"close-on-blur",converter:ce})],K.prototype,"closeOnBlur",1);te([a({type:Boolean,attribute:"close-on-escape",converter:ce})],K.prototype,"closeOnEscape",1);te([a({type:Boolean,reflect:!0,converter:w})],K.prototype,"visible",1);te([a({type:Number})],K.prototype,"zIndex",1);te([a({attribute:!1})],K.prototype,"beforeClose",2);te([_()],K.prototype,"_contentId",2);te([_()],K.prototype,"_titleId",2);te([ee(".swim-dialog__content")],K.prototype,"_contentEl",2);customElements.get(Pn)||customElements.define(Pn,K);const zc=[D,k`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      position: relative;
      overflow: hidden;
    }

    .format-dialog-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      max-height: var(--swim-format-max-height, 75vh);
      background: var(--swim-format-dialog-bg, var(--grey-725));
      box-shadow: var(--swim-format-dialog-shadow, var(--shadow-dialog-panel));
      border-radius: var(--swim-format-border-radius, var(--radius-16, 16px));
      overflow: hidden;
    }

    :host([format='large']) .format-dialog-container {
      max-height: var(--swim-format-max-height, calc(100vh - 7.25rem));
    }

    :host([format='medium']) .format-dialog-container {
      max-height: var(--swim-format-max-height, 75vh);
      --swim-format-body-max-height-internal: calc(
        var(--swim-format-max-height, 75vh) -
          var(--swim-format-header-height, var(--swim-format-header-height-medium, 60px))
      );
    }

    .format-dialog-container__header {
      border-bottom: var(--swim-format-divider, var(--spacing-2, 2px) solid var(--grey-700));
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 var(--swim-format-header-padding-x, var(--spacing-32, 2rem));
      padding-right: var(--swim-format-header-padding-end, var(--spacing-40, 2.5rem));
      gap: var(--swim-format-header-gap, var(--spacing-24, 1.5rem));
      overflow: visible;
    }

    :host([format='large']) .format-dialog-container__header {
      flex: 0 0 var(--swim-format-header-height, var(--swim-format-header-height-large, 90px));
      height: var(--swim-format-header-height, var(--swim-format-header-height-large, 90px));
      min-height: var(--swim-format-header-height, var(--swim-format-header-height-large, 90px));
    }

    :host([format='medium']) .format-dialog-container__header {
      flex: 0 0 var(--swim-format-header-height, var(--swim-format-header-height-medium, 60px));
      height: var(--swim-format-header-height, var(--swim-format-header-height-medium, 60px));
      min-height: var(--swim-format-header-height, var(--swim-format-header-height-medium, 60px));
    }

    /* Match ngx-large-format-dialog-header-title__wrapper: flex 0 0 20%, height 100%, justify-content center */
    .format-dialog-container__header-title {
      display: flex;
      flex-direction: column;
      gap: var(--swim-format-header-title-stack-gap, var(--spacing-2, 2px));
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
      font-size: var(--swim-format-title-size, 1.375rem);
      line-height: var(--swim-format-title-line, 1.625rem);
    }

    .format-dialog-container__header-action {
      flex: 0 0 auto;
      max-width: 50%;
      display: var(--swim-dialog-header-action-display, flex);
      align-items: center;
      justify-content: flex-end;
    }

    .format-dialog-container__header-action__button {
      background: none;
      border: none;
      color: var(--grey-400);
      font-size: var(--font-size-s);
      line-height: 1;
      padding: 0.25rem 0;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: var(--swim-format-header-close-gap, var(--spacing-8, 0.5rem));
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
      outline: var(--swim-format-header-close-outline-width, var(--spacing-2, 2px)) solid var(--blue-500);
      outline-offset: var(--swim-format-header-close-outline-width, var(--spacing-2, 2px));
    }

    .format-dialog-container__body {
      flex: 1 1 auto;
      min-height: var(--swim-format-body-min-height, 215px);
      padding: var(--swim-format-body-padding, var(--spacing-32, 2rem));
      color: var(--grey-200);
    }

    :host([format='medium']) .format-dialog-container__body {
      max-height: var(--swim-format-body-max-height, var(--swim-format-body-max-height-internal, auto));
    }

    .format-dialog-container__footer {
      flex: 0 0 var(--swim-format-footer-height, calc(var(--spacing-48, 48px) + var(--spacing-16, 16px)));
      height: var(--swim-format-footer-height, calc(var(--spacing-48, 48px) + var(--spacing-16, 16px)));
      min-height: var(--swim-format-footer-height, calc(var(--spacing-48, 48px) + var(--spacing-16, 16px)));
      border-top: var(--swim-format-divider, var(--spacing-2, 2px) solid var(--grey-700));
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: var(--swim-format-footer-gap, var(--spacing-8, 0.5rem));
      padding: var(--swim-format-footer-padding-y, var(--spacing-12, 0.75rem))
        var(--swim-format-footer-padding-x, var(--spacing-32, 2rem));
      box-sizing: border-box;
    }

    .format-dialog-container__footer--hidden {
      display: none;
      flex: 0 0 0;
      height: 0;
      min-height: 0;
      padding: 0;
      border-top: none;
      overflow: hidden;
    }

    /* Slotted footer host must span the row so inner justify-content (align) can take effect (ngx parity). */
    .format-dialog-container__footer ::slotted(*) {
      flex: 1 1 auto;
      min-width: 0;
      align-self: stretch;
    }
  `];var Lc=Object.defineProperty,ht=(s,e,t,i)=>{for(var o=void 0,n=s.length-1,r;n>=0;n--)(r=s[n])&&(o=r(e,t,o)||o);return o&&Lc(e,t,o),o};const Fn="swim-large-format-dialog-content",Xo=class Xo extends ${constructor(){super(...arguments),this.format="large",this.dialogTitle="",this.dialogSubtitle="",this.dialogActionTitle="Close",this.dialogDirtyActionTitle="Cancel",this.dirty=!1,this._hasFooterSlot=!1,this._onFooterSlotChange=()=>{this._syncFooterSlotVisibility()}}_onCloseOrCancel(){this.dispatchEvent(new CustomEvent("close-or-cancel",{detail:this.dirty,bubbles:!1,composed:!1}))}firstUpdated(){this._syncFooterSlotVisibility()}_syncFooterSlotVisibility(){var o,n;const e=(n=(o=this.renderRoot)==null?void 0:o.querySelector)==null?void 0:n.call(o,'slot[name="footer"]');if(!e)return;const i=e.assignedNodes({flatten:!0}).some(r=>{var l;return r.nodeType===Node.ELEMENT_NODE||r.nodeType===Node.TEXT_NODE&&(((l=r.textContent)==null?void 0:l.trim())??"").length>0});this._hasFooterSlot!==i&&(this._hasFooterSlot=i)}render(){const e=["format-dialog-container__header-title","format-dialog-container__header-title--with-subtitle"].join(" "),t=["format-dialog-container__footer",this._hasFooterSlot?"":"format-dialog-container__footer--hidden"].filter(Boolean).join(" ");return h`
      <main class="format-dialog-container">
        <header class="format-dialog-container__header">
          <div class="format-dialog-container__header-title ${e}">
            <h1>${this.dialogTitle}</h1>
            ${this.dialogSubtitle?h`<h4>${this.dialogSubtitle}</h4>`:g}
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
        <footer class="${t}">
          <slot name="footer" @slotchange="${this._onFooterSlotChange}"></slot>
        </footer>
      </main>
    `}};Xo.styles=[St,zc];let Te=Xo;ht([a({type:String,reflect:!0})],Te.prototype,"format");ht([a({type:String,attribute:"dialog-title"})],Te.prototype,"dialogTitle");ht([a({type:String,attribute:"dialog-subtitle"})],Te.prototype,"dialogSubtitle");ht([a({type:String,attribute:"dialog-action-title"})],Te.prototype,"dialogActionTitle");ht([a({type:String,attribute:"dialog-dirty-action-title"})],Te.prototype,"dialogDirtyActionTitle");ht([a({type:Boolean,reflect:!0,converter:w})],Te.prototype,"dirty");ht([_()],Te.prototype,"_hasFooterSlot");customElements.get(Fn)||customElements.define(Fn,Te);const Mc=[D,k`
    :host {
      display: block;
      box-sizing: border-box;
      width: 100%;
    }

    .format-dialog-footer {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: var(--swim-format-footer-gap, var(--spacing-8, 0.5rem));
      width: 100%;
      height: 100%;
    }

    :host([align='start']) .format-dialog-footer {
      justify-content: flex-start;
    }

    :host([align='end']) .format-dialog-footer {
      justify-content: flex-end;
    }

    :host([align='center']) .format-dialog-footer {
      justify-content: center;
    }

    :host([align='space-between']) .format-dialog-footer {
      justify-content: space-between;
    }

    :host([align='space-around']) .format-dialog-footer {
      justify-content: space-around;
    }

    :host([align='space-evenly']) .format-dialog-footer {
      justify-content: space-evenly;
    }
  `];var Oc=Object.defineProperty,Cr=(s,e,t,i)=>{for(var o=void 0,n=s.length-1,r;n>=0;n--)(r=s[n])&&(o=r(e,t,o)||o);return o&&Oc(e,t,o),o};const Rn="swim-large-format-dialog-footer",Qo=class Qo extends ${constructor(){super(...arguments),this.format="large",this.align="center"}render(){return h` <div class="format-dialog-footer"><slot></slot></div> `}};Qo.styles=Mc;let Zt=Qo;Cr([a({type:String,reflect:!0})],Zt.prototype,"format");Cr([a({type:String,reflect:!0})],Zt.prototype,"align");customElements.get(Rn)||customElements.define(Rn,Zt);const Bc=k`
  :host {
    position: relative;
    font-size: var(--font-size-m);
    background: var(--grey-800);
    display: inline-block;
    border: 1px solid var(--grey-700);
    width: 270px;
    padding: 0.5rem 0;
    border-radius: var(--radius-6);
    box-sizing: border-box;
    color: var(--grey-050);
  }

  :host(:focus) {
    outline: none;
  }

  /* ------------------------------------------------------------------ */
  /* Title row (navigation)                                              */
  /* ------------------------------------------------------------------ */

  .title-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--grey-800);
    color: var(--grey-050);
    padding: 0.69rem 0;
    font-weight: var(--font-weight-semibold);
    line-height: 1;
  }

  .title-row .title {
    color: var(--blue-400);
    min-width: 100px;
    padding: 4px 8px;
    cursor: pointer;
    border-radius: var(--radius-4);
    background: none;
    border: none;
    font: inherit;
    font-weight: var(--font-weight-semibold);
    font-size: inherit;
  }

  .title-row .title:hover {
    background: var(--grey-750);
  }

  .title-row .prev-month,
  .title-row .next-month {
    color: var(--grey-350);
    font-size: var(--font-size-xxs);
    border-radius: var(--radius-4);
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px 8px;
    line-height: 1;
  }

  .title-row .prev-month:hover,
  .title-row .next-month:hover {
    color: var(--grey-050);
  }

  .title-row .prev-month:disabled,
  .title-row .next-month:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  button {
    outline: 0px var(--blue-200);
  }

  button:focus-visible {
    outline: 2px solid var(--blue-200);
    outline-offset: 1px;
  }

  /* ------------------------------------------------------------------ */
  /* Day names row                                                       */
  /* ------------------------------------------------------------------ */

  .day-name-row {
    color: var(--grey-350);
    font-weight: var(--font-weight-semibold);
    display: flex;
  }

  .day-name {
    flex: 1 0 30px;
    margin: 0.1rem 0.2rem;
    line-height: 1.8rem;
    text-align: center;
    width: 1.8rem;
    height: 1.8rem;
  }

  /* ------------------------------------------------------------------ */
  /* Day grid                                                            */
  /* ------------------------------------------------------------------ */

  .day-container {
    margin-top: 0;
    width: 100%;
    border-collapse: collapse;
  }

  .day-row {
    display: flex;
  }

  .day-cell {
    flex: 1 0 30px;
    margin: 0.1rem 0.2rem;
    line-height: 1.8rem;
    text-align: center;
    width: 1.8rem;
    height: 1.8rem;
    padding: 0;
  }

  .day {
    color: var(--grey-050);
    height: 100%;
    width: 100%;
    max-height: 30px;
    max-width: 30px;
    line-height: 1.8rem;
    border-radius: 50%;
    text-align: center;
    transition: background 200ms;
    padding: 0;
    border: none;
    background: none;
    cursor: pointer;
    font: inherit;
    font-size: inherit;
  }

  .day.prev-month,
  .day.next-month {
    color: var(--grey-350);
    opacity: 0.2;
  }

  .day.today {
    background: var(--grey-750);
  }

  .day.active {
    background: var(--blue-400);
    color: var(--grey-050);
  }

  .day:hover:not(.active):not([disabled]) {
    background: var(--blue-400);
    color: var(--grey-050);
    opacity: 1;
  }

  .day:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  .day.focus:not([disabled]) {
    outline: 2px solid var(--blue-200);
    outline-offset: 1px;
  }

  /* ------------------------------------------------------------------ */
  /* Month grid                                                          */
  /* ------------------------------------------------------------------ */

  .months-container {
    margin: 0.5rem;
    color: var(--grey-050);
    width: calc(100% - 1rem);
    border-collapse: collapse;
  }

  .months-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    border: 1px solid var(--grey-700);
  }

  .month-cell {
    padding: 0;
    border: 1px solid var(--grey-700);
  }

  .month {
    grid-auto-rows: auto;
    text-transform: uppercase;
    text-align: center;
    font-size: var(--font-size-s);
    width: 100%;
    padding: 0.75rem;
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    font: inherit;
    font-size: var(--font-size-s);
    text-transform: uppercase;
  }

  .month.active {
    background-color: var(--blue-400);
  }

  .month.current:not(.active) {
    background-color: var(--grey-750);
  }

  .month:hover:not(.active):not([disabled]) {
    background: var(--blue-400);
    color: var(--grey-050);
    opacity: 1;
  }

  .month:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  /* ------------------------------------------------------------------ */
  /* Year grid                                                           */
  /* ------------------------------------------------------------------ */

  .years-container {
    margin: 0.5rem;
    color: var(--grey-050);
    width: calc(100% - 1rem);
    border-collapse: collapse;
  }

  .years-row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    border: 1px solid var(--grey-700);
  }

  .year-cell {
    padding: 0;
    border: 1px solid var(--grey-700);
  }

  .year {
    grid-auto-rows: auto;
    text-transform: uppercase;
    text-align: center;
    font-size: var(--font-size-s);
    width: 100%;
    padding: 0.475rem;
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    font: inherit;
    font-size: var(--font-size-s);
  }

  .year.active {
    background-color: var(--blue-400);
  }

  .year.current:not(.active) {
    background-color: var(--grey-750);
  }

  .year:hover:not(.active):not([disabled]) {
    background: var(--blue-400);
    color: var(--grey-050);
    opacity: 1;
  }

  .year:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`,Pc=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],Fc=["S","M","T","W","T","F","S"];function mo(s,e){return s.getFullYear()===e.getFullYear()&&s.getMonth()===e.getMonth()&&s.getDate()===e.getDate()}function Rc(s,e){return s.getFullYear()===e.getFullYear()}function Nn(s,e){return new Date(s,e+1,0).getDate()}function oo(s,e,t){return{num:s.getDate(),dayOfWeek:s.getDay(),date:new Date(s),today:mo(s,t),prevMonth:s.getMonth()<e||s.getMonth()===11&&e===0,nextMonth:s.getMonth()>e||s.getMonth()===0&&e===11}}function _e(s){const e=new Date,t=s.getFullYear(),i=s.getMonth(),o=Nn(t,i),n=new Date(t,i,1).getDay(),r=[];if(n>0){const d=Nn(t,i-1);for(let m=n-1;m>=0;m--){const u=new Date(t,i-1,d-m);r.push(oo(u,i,e))}}for(let d=1;d<=o;d++)r.push(oo(new Date(t,i,d),i,e));const l=r.length%7;if(l>0){const d=7-l;for(let m=1;m<=d;m++)r.push(oo(new Date(t,i+1,m),i,e))}const c=[];for(let d=0;d<r.length;d+=7)c.push(r.slice(d,d+7));return c}function Vn(s){return Math.floor(s/20)*20}function so(s,e,t="day"){if(!e)return!1;switch(t){case"year":return s.getFullYear()<e.getFullYear();case"month":return s.getFullYear()<e.getFullYear()||s.getFullYear()===e.getFullYear()&&s.getMonth()<e.getMonth();default:return new Date(s.getFullYear(),s.getMonth(),s.getDate())<new Date(e.getFullYear(),e.getMonth(),e.getDate())}}function no(s,e,t="day"){if(!e)return!1;switch(t){case"year":return s.getFullYear()>e.getFullYear();case"month":return s.getFullYear()>e.getFullYear()||s.getFullYear()===e.getFullYear()&&s.getMonth()>e.getMonth();default:return new Date(s.getFullYear(),s.getMonth(),s.getDate())>new Date(e.getFullYear(),e.getMonth(),e.getDate())}}var M=(s=>(s.date="date",s.time="time",s.datetime="datetime",s))(M||{}),Y=(s=>(s.HUMAN="human",s.TIMEZONE="timezone",s.LOCAL="local",s.CUSTOM="custom",s))(Y||{});const Nc=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],Vc=["January","February","March","April","May","June","July","August","September","October","November","December"],Hc=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],Yc=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],Hn={L:"MM/DD/YYYY",l:"M/D/YYYY",LL:"MMMM D, YYYY",ll:"MMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",lll:"MMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A",llll:"ddd, MMM D, YYYY h:mm A",LT:"h:mm A",LTS:"h:mm:ss A"},z={shortDate:"l",shortTime:"LT",shortDateTime:"l LT",shortDateTimeSeconds:"l LTS",date:"ll",time:"LT",dateTime:"lll",dateTimeSeconds:"ll LTS",dateMonth:"MMM YYYY",dateYear:"YYYY",fullDate:"ddd, ll Z [(]zz[)]",fullTime:"LT Z [(]zz[)]",fullDateTime:"llll Z [(]zz[)]",fullDateMonth:"MMM YYYY Z [(]zz[)]",fullDateYear:"YYYY Z [(]zz[)]",localeDate:"L",localeDateTime:"L LT",localeTime:"LT",timezoneDate:"L Z",timezoneDateTime:"L LT Z",timezoneDateTimeSeconds:"L LTS Z",timezoneTime:"LT Z",timezoneDateMonth:"MMM YYYY Z",timezoneDateYear:"YYYY Z",locale:"LLL",shortLocale:"LL",fullLocale:"LLLL"};function Ne(s,e=2){return String(s).padStart(e,"0")}function Sr(s,e){if(!e)return{year:s.getFullYear(),month:s.getMonth(),day:s.getDate(),hour:s.getHours(),minute:s.getMinutes(),second:s.getSeconds(),ms:s.getMilliseconds(),dow:s.getDay()};try{const i=new Intl.DateTimeFormat("en-US",{timeZone:e,year:"numeric",month:"numeric",day:"numeric",weekday:"short",hour:"numeric",minute:"numeric",second:"numeric",hour12:!1}).formatToParts(s),o=r=>{var l;return((l=i.find(c=>c.type===r))==null?void 0:l.value)??""},n={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};return{year:parseInt(o("year"),10),month:parseInt(o("month"),10)-1,day:parseInt(o("day"),10),hour:parseInt(o("hour"),10)%24,minute:parseInt(o("minute"),10),second:parseInt(o("second"),10),ms:s.getMilliseconds(),dow:n[o("weekday")]??0}}catch{return Sr(s)}}function Yn(s,e){if(!e){const t=-s.getTimezoneOffset();return qn(t)}try{const t=s.toLocaleString("en-US",{timeZone:"UTC"}),i=s.toLocaleString("en-US",{timeZone:e}),o=new Date(i).getTime()-new Date(t).getTime(),n=Math.round(o/6e4);return qn(n)}catch{return"+00:00"}}function qn(s){const e=s>=0?"+":"-",t=Math.abs(s);return`${e}${Ne(Math.floor(t/60))}:${Ne(t%60)}`}function qc(s,e){var t;try{return((t=new Intl.DateTimeFormat("en-US",{timeZone:e||void 0,timeZoneName:"short"}).formatToParts(s).find(o=>o.type==="timeZoneName"))==null?void 0:t.value)??""}catch{return""}}function Uc(s){const e=["LLLL","llll","LLL","lll","LTS","LL","ll","LT","L","l"];let t=s;for(const i of e)Hn[i]&&(t=t.split(i).join(Hn[i]));return t}const jc=/(MMMM|YYYY|dddd|MMM|ddd|SSS|MM|DD|HH|hh|mm|ss|YY|ZZ|zz|M|D|H|h|A|a|Z|z)/g;function Gc(s,e,t,i){switch(s){case"YYYY":return String(e.year);case"YY":return String(e.year).slice(-2);case"MMMM":return Vc[e.month];case"MMM":return Nc[e.month];case"MM":return Ne(e.month+1);case"M":return String(e.month+1);case"DD":return Ne(e.day);case"D":return String(e.day);case"dddd":return Yc[e.dow];case"ddd":return Hc[e.dow];case"HH":return Ne(e.hour);case"H":return String(e.hour);case"hh":return Ne(e.hour%12||12);case"h":return String(e.hour%12||12);case"mm":return Ne(e.minute);case"ss":return Ne(e.second);case"SSS":return Ne(e.ms,3);case"A":return e.hour>=12?"PM":"AM";case"a":return e.hour>=12?"pm":"am";case"Z":return Yn(t,i);case"ZZ":return Yn(t,i).replace(":","");case"zz":case"z":return qc(t,i);default:return s}}function bi(s){return z[s]||s}function we(s,e,t){const i=Jt(t);let o=Uc(e);const n=[];let r=0,l="";for(;r<o.length;){const p=o.indexOf("[",r);if(p===-1){l+=o.slice(r);break}l+=o.slice(r,p);const f=o.indexOf("]",p+1);if(f===-1){l+=o.slice(p);break}n.push(o.slice(p+1,f)),l+=`\0${n.length-1}\0`,r=f+1}o=l;const c=Sr(s,i),d=o.replace(jc,p=>Gc(p,c,s,i));let m="",u=0;for(;u<d.length;){const p=d.indexOf("\0",u);if(p===-1){m+=d.slice(u);break}m+=d.slice(u,p);let f=p+1;for(;f<d.length&&d[f]>="0"&&d[f]<="9";)f++;if(d[f]==="\0"&&f>p+1){const x=parseInt(d.slice(p+1,f),10);m+=n[x]??"",u=f+1}else m+=d.slice(p,f||p+1),u=f||p+1}return m}function Je(s){if(s instanceof Date)return X(s)?s:null;if(!s||typeof s!="string")return null;const e=s.trim();if(!e)return null;const t=new Date(e);if(X(t))return t;const i=e.match(/^(\d{1,2})\/(\d{4})$/);if(i){const r=new Date(parseInt(i[2],10),parseInt(i[1],10)-1,1);if(X(r))return r}const o=e.match(/^(\d{4})$/);if(o){const r=new Date(parseInt(o[1],10),0,1);if(X(r))return r}const n=e.match(/^(\w{3,})\s+(\d{4})$/);if(n){const r=new Date(`${n[1]} 1, ${n[2]}`);if(X(r))return r}return null}function X(s){return s instanceof Date&&!isNaN(s.getTime())}function fo(s,e){if(!e||!X(s))return s;const t=new Date(s),i=[["millisecond",()=>{}],["second",()=>t.setMilliseconds(0)],["minute",()=>{t.setMilliseconds(0),t.setSeconds(0)}],["hour",()=>{t.setMilliseconds(0),t.setSeconds(0),t.setMinutes(0)}],["date",()=>{t.setMilliseconds(0),t.setSeconds(0),t.setMinutes(0),t.setHours(0)}],["month",()=>{t.setMilliseconds(0),t.setSeconds(0),t.setMinutes(0),t.setHours(0),t.setDate(1)}],["year",()=>{t.setMilliseconds(0),t.setSeconds(0),t.setMinutes(0),t.setHours(0),t.setDate(1),t.setMonth(0)}]],o=i.findIndex(([n])=>n===e);return o>=0&&i[o][1](),t}function Dr(s,e,t){switch(s){case Y.HUMAN:case Y.TIMEZONE:switch(e){case M.date:return t==="month"?z.timezoneDateMonth:t==="year"?z.timezoneDateYear:z.timezoneDate;case M.time:return z.timezoneTime;default:return z.timezoneDateTime}case Y.LOCAL:switch(e){case M.date:return t==="month"?z.dateMonth:t==="year"?z.dateYear:z.localeDate;case M.time:return z.localeTime;default:return z.localeDateTime}case Y.CUSTOM:switch(e){case M.date:return t==="month"?z.dateMonth:t==="year"?z.dateYear:z.date;case M.time:return z.time;default:return z.dateTime}default:return z.localeDate}}function Wc(s,e,t){switch(s){case Y.HUMAN:case Y.TIMEZONE:switch(e){case M.date:return t==="month"?z.fullDateMonth:t==="year"?z.fullDateYear:z.fullDate;case M.time:return z.fullTime;default:return z.fullDateTime}case Y.LOCAL:switch(e){case M.date:return t==="month"?z.dateMonth:t==="year"?z.dateYear:z.localeDate;case M.time:return z.localeTime;default:return z.localeDateTime}case Y.CUSTOM:switch(e){case M.date:return t==="month"?z.dateMonth:t==="year"?z.dateYear:z.date;case M.time:return z.time;default:return z.dateTime}default:return z.localeDate}}function Jt(s){if(s)return s.toLowerCase()==="utc"?"UTC":s}function Un(s,e,t){if(!X(s))return!1;const i=e?Je(e):null,o=t?Je(t):null;return!!(i&&X(i)&&s<i||o&&X(o)&&s>o)}var Kc=Object.defineProperty,Zc=Object.getOwnPropertyDescriptor,Le=(s,e,t,i)=>{for(var o=i>1?void 0:i?Zc(e,t):e,n=s.length-1,r;n>=0;n--)(r=s[n])&&(o=(i?r(e,t,o):r(o))||o);return i&&o&&Kc(e,t,o),o};const jn="swim-calendar",es=class es extends ${constructor(){super(...arguments),this._value=null,this.disabled=!1,this._currentView="date",this._focusDate=new Date,this._weeks=[],this._startYear=0,this._currentDate=new Date,this._onDayKeyDown=e=>{let t=!1;switch(e.code){case"ArrowDown":this._moveFocus(1,"week"),t=!0;break;case"ArrowUp":this._moveFocus(-1,"week"),t=!0;break;case"ArrowLeft":this._moveFocus(-1,"day"),t=!0;break;case"ArrowRight":this._moveFocus(1,"day"),t=!0;break;case"PageUp":this._moveFocus(-1,e.altKey?"year":"month"),t=!0;break;case"PageDown":this._moveFocus(1,e.altKey?"year":"month"),t=!0;break;case"Home":{const i=new Date(this._focusDate);e.altKey?i.setDate(1):i.setDate(i.getDate()-i.getDay()),this._focusDate=i,this._weeks=_e(this._focusDate),this.requestUpdate(),this.updateComplete.then(()=>this.focusDay()),t=!0;break}case"End":{const i=new Date(this._focusDate);e.altKey?i.setMonth(i.getMonth()+1,0):i.setDate(i.getDate()+(6-i.getDay())),this._focusDate=i,this._weeks=_e(this._focusDate),this.requestUpdate(),this.updateComplete.then(()=>this.focusDay()),t=!0;break}case"Enter":setTimeout(()=>{this.dispatchEvent(new CustomEvent("day-key-enter",{bubbles:!1,composed:!1}))},200);break}t&&(e.stopPropagation(),e.preventDefault())},this._onMonthKeyDown=e=>{let t=!1;switch(e.code){case"ArrowDown":this._moveFocus(3,"month"),t=!0;break;case"ArrowUp":this._moveFocus(-3,"month"),t=!0;break;case"ArrowLeft":this._moveFocus(-1,"month"),t=!0;break;case"ArrowRight":this._moveFocus(1,"month"),t=!0;break;case"PageUp":this._moveFocus(-1,"year"),t=!0;break;case"PageDown":this._moveFocus(1,"year"),t=!0;break;case"Enter":setTimeout(()=>{this.dispatchEvent(new CustomEvent("day-key-enter",{bubbles:!1,composed:!1}))},200);break}t&&(e.stopPropagation(),e.preventDefault())},this._onYearKeyDown=e=>{let t=!1;switch(e.code){case"ArrowDown":this._moveFocus(4,"year"),t=!0;break;case"ArrowUp":this._moveFocus(-4,"year"),t=!0;break;case"ArrowLeft":this._moveFocus(-1,"year"),t=!0;break;case"ArrowRight":this._moveFocus(1,"year"),t=!0;break;case"PageUp":this._moveFocus(-20,"year"),t=!0;break;case"PageDown":this._moveFocus(20,"year"),t=!0;break;case"Enter":setTimeout(()=>{this.dispatchEvent(new CustomEvent("day-key-enter",{bubbles:!1,composed:!1}))},200);break}t&&(e.stopPropagation(),e.preventDefault())}}get value(){return this._value}set value(e){const t=this._value;e&&X(e)?this._value=new Date(e):this._value=null,this.requestUpdate("value",t)}set minView(e){this._minView=e,this._validateView(),this.requestUpdate()}get minView(){return this._minView||"date"}connectedCallback(){super.connectedCallback(),this._init()}updated(e){super.updated(e),e.has("value")&&this._value&&(this._focusDate=new Date(this._value),this._weeks=_e(this._focusDate),this._startYear=Vn(this._focusDate.getFullYear()))}focusDay(){var t;const e=(t=this.shadowRoot)==null?void 0:t.querySelector("button.focus");e==null||e.focus()}render(){switch(this._currentView){case"month":return this._renderMonthView();case"year":return this._renderYearView();default:return this._renderDateView()}}_renderDateView(){const e=this._formatMonthYear(this._focusDate);return h`
      <div class="text-center">
        <div class="title-row">
          <button
            type="button"
            class="prev-month"
            ?disabled="${this.disabled}"
            title="Previous Month"
            @click="${this._prevMonth}"
          >
            <swim-icon font-icon="arrow-left"></swim-icon>
          </button>
          <button type="button" class="title" @click="${this._changeViews}">${e}</button>
          <button
            type="button"
            class="next-month"
            ?disabled="${this.disabled}"
            title="Next Month"
            @click="${this._nextMonth}"
          >
            <swim-icon font-icon="arrow-right"></swim-icon>
          </button>
        </div>
        <div class="day-name-row">${Fc.map(t=>h`<div class="day-name text-center">${t}</div>`)}</div>
        <table class="day-container" role="grid">
          ${this._weeks.map(t=>h`
              <tr class="day-row" role="row">
                ${t.map(i=>{if(!i.num)return h`<td class="day-cell text-center" role="gridcell"></td>`;const o=this._value?mo(i.date,this._value):!1,n=mo(i.date,this._focusDate),r=this.disabled||this._isDayDisabled(i.date),l=["day"];return i.prevMonth&&l.push("prev-month"),i.nextMonth&&l.push("next-month"),i.today&&l.push("today"),o&&l.push("active"),n&&!r&&l.push("focus"),h`
                    <td class="day-cell text-center" role="gridcell">
                      <button
                        type="button"
                        class="${l.join(" ")}"
                        ?disabled="${r}"
                        tabindex="${n&&!r?0:-1}"
                        @click="${()=>this._onDayClick(i)}"
                        @keydown="${this._onDayKeyDown}"
                      >
                        ${i.num}
                      </button>
                    </td>
                  `})}
              </tr>
            `)}
        </table>
      </div>
    `}_renderMonthView(){const e=String(this._focusDate.getFullYear());return h`
      <div class="text-center">
        <div class="title-row">
          <button
            type="button"
            class="prev-month"
            ?disabled="${this.disabled}"
            title="Previous Year"
            @click="${this._prevYear}"
          >
            <swim-icon font-icon="arrow-left"></swim-icon>
          </button>
          <button type="button" class="title" @click="${this._changeViews}">${e}</button>
          <button
            type="button"
            class="next-month"
            ?disabled="${this.disabled}"
            title="Next Year"
            @click="${this._nextYear}"
          >
            <swim-icon font-icon="arrow-right"></swim-icon>
          </button>
        </div>
        <table class="months-container" role="grid">
          <tr class="months-row" role="row">
            ${Pc.map((t,i)=>{const o=this._isMonthActive(i),n=this._isCurrentMonth(i),r=this._focusDate.getMonth()===i&&Rc(this._focusDate,this._focusDate),l=this.disabled||this._isMonthDisabled(i),c=["month"];return o&&c.push("active"),n&&c.push("current"),r&&c.push("focus"),h`
                <td class="month-cell text-center" role="gridcell">
                  <button
                    type="button"
                    class="${c.join(" ")}"
                    ?disabled="${l}"
                    tabindex="${r&&!l?0:-1}"
                    @click="${()=>this._onMonthClick(i)}"
                    @keydown="${this._onMonthKeyDown}"
                  >
                    ${t}
                  </button>
                </td>
              `})}
          </tr>
        </table>
      </div>
    `}_renderYearView(){const e=Array.from({length:20},(t,i)=>this._startYear+i);return h`
      <div class="text-center">
        <div class="title-row">
          <button
            type="button"
            class="prev-month"
            ?disabled="${this.disabled}"
            title="Previous Two Decades"
            @click="${this._prevTwoDecades}"
          >
            <swim-icon font-icon="arrow-left"></swim-icon>
          </button>
          <button type="button" class="title" @click="${this._changeViews}">
            ${this._startYear} - ${this._startYear+20}
          </button>
          <button
            type="button"
            class="next-month"
            ?disabled="${this.disabled}"
            title="Next Two Decades"
            @click="${this._nextTwoDecades}"
          >
            <swim-icon font-icon="arrow-right"></swim-icon>
          </button>
        </div>
        <table class="years-container" role="grid">
          <tr class="years-row" role="row">
            ${e.map(t=>{const i=this._isYearActive(t),o=t===this._currentDate.getFullYear(),n=t===this._focusDate.getFullYear(),r=this.disabled||this._isYearDisabled(t),l=["year"];return i&&l.push("active"),o&&l.push("current"),n&&l.push("focus"),h`
                <td class="year-cell text-center" role="gridcell">
                  <button
                    type="button"
                    class="${l.join(" ")}"
                    ?disabled="${r}"
                    tabindex="${n&&!r?0:-1}"
                    @click="${()=>this._onYearClick(t)}"
                    @keydown="${this._onYearKeyDown}"
                  >
                    ${t}
                  </button>
                </td>
              `})}
          </tr>
        </table>
      </div>
    `}_init(){this._value&&(this._focusDate=new Date(this._value)),this._weeks=_e(this._focusDate),this._currentDate=new Date,this._startYear=Vn(this._focusDate.getFullYear()),this._validateView()}_validateView(){["date","month","year"].indexOf(this._minView||"date")<0&&(this._minView="date"),this._currentView=this._minView||"date"}_formatMonthYear(e){return`${["January","February","March","April","May","June","July","August","September","October","November","December"][e.getMonth()]} ${e.getFullYear()}`}_resolveMin(){return this.minDate?this.minDate instanceof Date?this.minDate:Je(this.minDate):null}_resolveMax(){return this.maxDate?this.maxDate instanceof Date?this.maxDate:Je(this.maxDate):null}_isDayDisabled(e){return so(e,this._resolveMin(),"day")||no(e,this._resolveMax(),"day")}_isMonthDisabled(e){const t=new Date(this._focusDate.getFullYear(),e,1);return so(t,this._resolveMin(),"month")||no(t,this._resolveMax(),"month")}_isYearDisabled(e){const t=new Date(e,0,1);return so(t,this._resolveMin(),"year")||no(t,this._resolveMax(),"year")}_isMonthActive(e){return this._value?this._value.getMonth()===e&&this._value.getFullYear()===this._focusDate.getFullYear():!1}_isCurrentMonth(e){return this._currentDate.getMonth()===e&&this._currentDate.getFullYear()===this._focusDate.getFullYear()}_isYearActive(e){return this._value?this._value.getFullYear()===e:!1}_prevMonth(){const e=new Date(this._focusDate);e.setMonth(e.getMonth()-1),this._focusDate=e,this._weeks=_e(this._focusDate)}_nextMonth(){const e=new Date(this._focusDate);e.setMonth(e.getMonth()+1),this._focusDate=e,this._weeks=_e(this._focusDate)}_prevYear(){const e=new Date(this._focusDate);e.setFullYear(e.getFullYear()-1),this._focusDate=e}_nextYear(){const e=new Date(this._focusDate);e.setFullYear(e.getFullYear()+1),this._focusDate=e}_prevTwoDecades(){this._startYear-=20}_nextTwoDecades(){this._startYear+=20}_changeViews(){this._currentView==="date"?this._currentView="month":this._currentView==="month"?this._currentView="year":this._currentView=this._minView||"date",this._weeks=_e(this._focusDate)}_onDayClick(e){this._focusDate=new Date(e.date),this._value=new Date(e.date),(e.prevMonth||e.nextMonth)&&(this._weeks=_e(this._focusDate)),this.requestUpdate(),this.dispatchEvent(new CustomEvent("change",{detail:this._value,bubbles:!1,composed:!1}))}_onMonthClick(e){const t=new Date(this._focusDate);t.setMonth(e),this._focusDate=t,this._value=new Date(t),(this._minView||"date")!=="month"&&(this._currentView="date",this._weeks=_e(this._focusDate)),this.requestUpdate(),this.dispatchEvent(new CustomEvent("change",{detail:this._value,bubbles:!1,composed:!1}))}_onYearClick(e){const t=new Date(this._focusDate);t.setFullYear(e),this._focusDate=t,this._value=new Date(t),(this._minView||"date")!=="year"&&(this._currentView="month",this._weeks=_e(this._focusDate)),this.requestUpdate(),this.dispatchEvent(new CustomEvent("change",{detail:this._value,bubbles:!1,composed:!1}))}_moveFocus(e,t){const i=new Date(this._focusDate);switch(t){case"day":i.setDate(i.getDate()+e);break;case"week":i.setDate(i.getDate()+e*7);break;case"month":i.setMonth(i.getMonth()+e);break;case"year":i.setFullYear(i.getFullYear()+e);break}this._focusDate=i,this._weeks=_e(this._focusDate),this._focusDate.getFullYear()<this._startYear?this._prevTwoDecades():this._focusDate.getFullYear()>this._startYear+20&&this._nextTwoDecades(),this.requestUpdate(),this.updateComplete.then(()=>this.focusDay())}};es.styles=[D,Bc];let ae=es;Le([a({attribute:!1})],ae.prototype,"value",1);Le([a({attribute:"min-date"})],ae.prototype,"minDate",2);Le([a({attribute:"max-date"})],ae.prototype,"maxDate",2);Le([a({type:Boolean,reflect:!0,converter:w})],ae.prototype,"disabled",2);Le([a({type:String})],ae.prototype,"timezone",2);Le([a({type:String,attribute:"min-view"})],ae.prototype,"minView",1);Le([_()],ae.prototype,"_currentView",2);Le([_()],ae.prototype,"_focusDate",2);Le([_()],ae.prototype,"_weeks",2);Le([_()],ae.prototype,"_startYear",2);customElements.get(jn)||customElements.define(jn,ae);const Jc=k`
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
    font-size: var(--font-size-m);
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

  /* ------------------------------------------------------------------ */
  /* Dialog: override swim-dialog content padding                        */
  /* ------------------------------------------------------------------ */

  swim-dialog::part(content) {
    padding: 0 !important;
    width: auto;
    min-width: auto;
    background: transparent;
    box-shadow: none;
    border-radius: 0;
  }

  .swim-date-time__dialog {
    padding: 0;
    width: auto;
  }

  /* ------------------------------------------------------------------ */
  /* Selected header                                                     */
  /* ------------------------------------------------------------------ */

  .swim-date-time__dialog-header {
    border-top: 1px solid var(--grey-700);
    border-left: 1px solid var(--grey-700);
    border-right: 1px solid var(--grey-700);
    border-top-left-radius: var(--radius-6);
    border-top-right-radius: var(--radius-6);
    padding: 4px 20px;
    background: var(--grey-800);
    color: var(--grey-100);
    text-align: center;
  }

  .swim-date-time__dialog-header h1 {
    font-size: 1.2rem;
    white-space: nowrap;
    margin: 0.5rem 0;
    font-weight: normal;
  }

  .swim-date-time__dialog-header h1 small {
    color: var(--grey-100);
  }

  /* ------------------------------------------------------------------ */
  /* Calendar inside dialog                                              */
  /* ------------------------------------------------------------------ */

  .swim-date-time__dialog swim-calendar {
    box-shadow: none;
    border-radius: 0;
    border: none;
    border-left: 1px solid var(--grey-700);
    border-right: 1px solid var(--grey-700);
    border-bottom: 1px solid var(--grey-700);
    display: block;
    width: auto;
  }

  /* ------------------------------------------------------------------ */
  /* Time row                                                            */
  /* ------------------------------------------------------------------ */

  .swim-date-time__time-row {
    background: var(--grey-800);
    border-left: 1px solid var(--grey-700);
    border-right: 1px solid var(--grey-700);
    border-bottom: 1px solid var(--grey-700);
    padding: 8px 16px;
    margin-top: 0;
    height: 94px;
    flex-direction: row;
    box-sizing: border-box;
    display: flex;
    place-content: stretch center;
    align-items: baseline;
    justify-content: space-between;
  }

  .swim-date-time__time-row > * {
    flex: 0 0 calc(15% - 6px);
  }

  .swim-date-time__time-input {
    width: 42px;
    padding: 4px 2px;
    text-align: center;
    background: transparent;
    border: none;
    border-bottom: 1px solid var(--grey-400);
    color: var(--grey-050);
    font-size: var(--font-size-m);
    font-family: inherit;
    outline: none;
  }

  .swim-date-time__time-input:focus {
    border-bottom-color: var(--blue-400);
  }

  .swim-date-time__time-input:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .swim-date-time__time-input--ms {
    width: 55px;
  }

  .swim-date-time__time-hint {
    font-size: var(--font-size-xxs);
    color: var(--grey-400);
    text-align: center;
    margin-top: 2px;
  }

  .swim-date-time__time-field {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .swim-date-time__ampm-group {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .swim-date-time__ampm {
    background: none;
    border: none;
    color: var(--grey-500);
    cursor: pointer;
    padding: 2px 6px;
    font-size: var(--font-size-s);
    font-family: inherit;
    border-radius: var(--radius-2);
  }

  .swim-date-time__ampm:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .swim-date-time__ampm.selected {
    color: var(--white);
    background-color: rgba(var(--grey-350-rgb), 0.2);
  }

  /* ------------------------------------------------------------------ */
  /* Dialog footer (Current / Clear / Apply)                            */
  /* ------------------------------------------------------------------ */

  .swim-date-time__dialog-footer {
    background: var(--grey-800);
    border: 1px solid var(--grey-700);
    border-bottom-left-radius: var(--radius-6);
    border-bottom-right-radius: var(--radius-6);
    border-top: 0;
    padding: 0.5rem 0;
    flex-direction: row;
    box-sizing: border-box;
    display: flex;
    align-items: center;
  }

  .swim-date-time__dialog-footer > * {
    flex: 1 1 50%;
  }

  .swim-date-time__dialog-footer .text-left {
    text-align: left;
  }

  .swim-date-time__dialog-footer .text-right {
    text-align: right;
  }

  .swim-date-time__footer-btn {
    font-size: var(--font-size-m);
    color: var(--grey-400);
    margin: 0;
    padding: 0;
    background: none;
    border: none;
    cursor: pointer;
    font-family: inherit;
  }

  .swim-date-time__footer-btn:hover {
    color: var(--grey-200);
  }

  .swim-date-time__footer-btn--current {
    margin-left: 16px;
    opacity: 1;
    transition: opacity 200ms;
  }

  .swim-date-time__footer-btn--current[hidden] {
    display: inline-block !important;
    opacity: 0;
    pointer-events: none;
  }

  .swim-date-time__footer-btn--apply {
    margin-right: 16px;
    color: var(--blue-400);
  }

  .swim-date-time__footer-btn--apply:hover {
    color: var(--blue-300);
  }

  .swim-date-time__footer-btn--clear {
    margin-right: 16px;
  }
`;var Xc=Object.defineProperty,Qc=Object.getOwnPropertyDescriptor,I=(s,e,t,i)=>{for(var o=i>1?void 0:i?Qc(e,t):e,n=s.length-1,r;n>=0;n--)(r=s[n])&&(o=(i?r(e,t,o):r(o))||o);return i&&o&&Xc(e,t,o),o};let ed=0;const Gn="swim-date-time",Mi=class Mi extends ${constructor(){super(),this.id=`swim-date-time-${++ed}`,this.name="",this.label="",this.hint="",this.placeholder="",this.size="sm",this.appearance="legacy",this._disabled=!1,this._required=!1,this.requiredIndicator="*",this._autofocus=!1,this._autosize=!1,this._minWidth=60,this._marginless=!1,this._value=null,this._displayValue="",this._dateInvalid=!1,this._dateOutOfRange=!1,this._focused=!1,this._dialogOpen=!1,this._dialogModel=null,this._dialogHour=12,this._dialogMinute="00",this._dialogSecond="00",this._dialogMillisecond="000",this._dialogAmPm="AM",this._modes=["millisecond","second","minute","hour","date","month","year"],this._apply=()=>{this._dialogModel&&(this.value=this._dialogModel,this._update(),this.dispatchEvent(new CustomEvent("date-time-selected",{detail:this.value,bubbles:!1,composed:!1})),this.dispatchEvent(new CustomEvent("change",{detail:this.value,bubbles:!1,composed:!1}))),this._close()},this._clear=()=>{this.value=void 0,this._update(),this.dispatchEvent(new CustomEvent("date-time-selected",{detail:void 0,bubbles:!1,composed:!1})),this.dispatchEvent(new CustomEvent("change",{detail:void 0,bubbles:!1,composed:!1})),this._close()},this._selectCurrent=()=>{this._setDialogDate(new Date)},this._close=()=>{this._dialogOpen=!1,this._update()},this._onCalendarChange=e=>{e.stopPropagation();const t=e.detail;t&&X(t)&&(this._dialogModel&&this._showTime&&t.setHours(this._dialogModel.getHours(),this._dialogModel.getMinutes(),this._dialogModel.getSeconds(),this._dialogModel.getMilliseconds()),this._setDialogDate(t))},this._onHourChange=e=>{const t=+e.target.value%12,i=this._dialogAmPm==="PM"?12+t:t;if(this._dialogModel){const o=new Date(this._dialogModel);o.setHours(i),this._setDialogDate(o)}},this._onMinuteChange=e=>{const t=+e.target.value;if(this._dialogModel){const i=new Date(this._dialogModel);i.setMinutes(t),this._setDialogDate(i)}},this._onSecondChange=e=>{const t=+e.target.value;if(this._dialogModel){const i=new Date(this._dialogModel);i.setSeconds(t),this._setDialogDate(i)}},this._onMillisecondChange=e=>{const t=+e.target.value;if(this._dialogModel){const i=new Date(this._dialogModel);i.setMilliseconds(t),this._setDialogDate(i)}},this._onDialogKeyDown=e=>{e.code==="Escape"&&(this._close(),e.stopPropagation(),e.preventDefault())},this._internals=this.attachInternals()}get disabled(){return this._disabled}set disabled(e){const t=this._disabled;this._disabled=b(e),this.requestUpdate("disabled",t)}get required(){return this._required}set required(e){const t=this._required;this._required=b(e),this.requestUpdate("required",t)}get autofocus(){return this._autofocus}set autofocus(e){this._autofocus=b(e)}get autosize(){return this._autosize}set autosize(e){const t=this._autosize;this._autosize=b(e),this.requestUpdate("autosize",t)}get minWidth(){return this._minWidth}set minWidth(e){this._minWidth=F(e)??60}set inputType(e){const t=this._inputType;this._inputType=e,this.requestUpdate("inputType",t)}get inputType(){return this._effectiveInputType}set displayMode(e){const t=this._displayMode;this._displayMode=e,this.requestUpdate("displayMode",t)}get displayMode(){return this._effectiveDisplayMode}get marginless(){return this._marginless}set marginless(e){const t=this._marginless;this._marginless=b(e),this.requestUpdate("marginless",t)}get value(){return this._value}set value(e){const t=this._value;if(typeof e=="string"&&(e=e.trim(),e||(e=null)),!e&&!this._value){this._value=null;return}if(e===this._value)return;let i=e instanceof Date&&X(e);if(typeof e=="string"){const o=Je(e);o&&(e=o,i=!0)}if(i&&e instanceof Date&&this.precision&&(e=fo(e,this.precision)),this._value=e,this._update(),this._internals){const o=this._value instanceof Date?this._value.toISOString():String(this._value??"");this._internals.setFormValue(o)}this.requestUpdate("value",t)}get _effectiveInputType(){return this._inputType?this._inputType:this.precision==="hour"||this.precision==="minute"?M.datetime:M.date}get _effectiveDisplayMode(){return this._displayMode?this._displayMode:this.timezone?Y.TIMEZONE:Y.LOCAL}get _effectiveFormat(){return this.format?bi(this.format):Dr(this._effectiveDisplayMode,this._effectiveInputType,this.precision)}get _iconName(){switch(this._effectiveInputType){case M.time:return"clock";case M.datetime:return"calendar-clock";default:return"calendar"}}get _showCalendar(){return this._effectiveInputType===M.date||this._effectiveInputType===M.datetime}get _showTime(){return this._effectiveInputType===M.time||this._effectiveInputType===M.datetime}connectedCallback(){super.connectedCallback(),this._update()}disconnectedCallback(){super.disconnectedCallback()}firstUpdated(){this.autofocus&&this._swimInput&&requestAnimationFrame(()=>{var e,t;(t=(e=this._swimInput)==null?void 0:e.focus)==null||t.call(e)})}updated(e){super.updated(e),this.label?this.setAttribute("has-label",""):this.removeAttribute("has-label"),this._dateInvalid?this.setAttribute("date-invalid",""):this.removeAttribute("date-invalid"),this._dateOutOfRange?this.setAttribute("date-out-of-range",""):this.removeAttribute("date-out-of-range"),this._focused?this.setAttribute("focused",""):this.removeAttribute("focused"),(e.has("format")||e.has("precision")||e.has("timezone")||e.has("displayMode")||e.has("inputType"))&&this._update(),(e.has("required")||e.has("minDate")||e.has("maxDate"))&&this._validate()}focus(e){var t,i;(i=(t=this._swimInput)==null?void 0:t.focus)==null||i.call(t,e)}render(){return h`
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
          tabindex="${ke(this.tabindex)}"
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
      </div>

      ${this._renderDialog()}
    `}_renderDialog(){const e=this._getDialogHeaderText();return h`
      <swim-dialog
        css-class="ngx-date-time-dialog"
        .closeButton="${!1}"
        .visible="${this._dialogOpen}"
        @close="${this._close}"
      >
        <div class="swim-date-time__dialog" @keydown="${this._onDialogKeyDown}">
          <div class="swim-date-time__dialog-header">
            <h1>${e}</h1>
          </div>

          ${this._showCalendar?h`
                <swim-calendar
                  .value="${this._dialogModel}"
                  .minDate="${this.minDate}"
                  .maxDate="${this.maxDate}"
                  .disabled="${this.disabled}"
                  min-view="${this._calendarMinView}"
                  @change="${this._onCalendarChange}"
                  @day-key-enter="${this._apply}"
                ></swim-calendar>
              `:g}
          ${this._showTime?this._renderTimeRow():g}

          <nav role="navigation" class="swim-date-time__dialog-footer">
            <div class="text-left">
              <button
                type="button"
                class="swim-date-time__footer-btn swim-date-time__footer-btn--current"
                ?hidden="${this._isCurrent()}"
                @click="${this._selectCurrent}"
              >
                Current
              </button>
            </div>
            <div class="text-right">
              <button
                type="button"
                class="swim-date-time__footer-btn swim-date-time__footer-btn--clear"
                @click="${this._clear}"
              >
                Clear
              </button>
              <button
                type="button"
                class="swim-date-time__footer-btn swim-date-time__footer-btn--apply"
                @click="${this._apply}"
              >
                Apply
              </button>
            </div>
          </nav>
        </div>
      </swim-dialog>
    `}_renderTimeRow(){const e=this._isTimeDisabled("hour"),t=this._isTimeDisabled("minute"),i=this._isTimeDisabled("second"),o=this._isTimeDisabled("millisecond");return h`
      <div class="swim-date-time__time-row">
        <div class="swim-date-time__time-field">
          <input
            type="number"
            class="swim-date-time__time-input"
            .value="${String(this._dialogHour)}"
            min="1"
            max="12"
            ?disabled="${e}"
            @change="${this._onHourChange}"
          />
          <div class="swim-date-time__time-hint">Hour</div>
        </div>
        <div class="swim-date-time__time-field">
          <input
            type="number"
            class="swim-date-time__time-input"
            .value="${this._dialogMinute}"
            min="0"
            max="59"
            ?disabled="${t}"
            @change="${this._onMinuteChange}"
          />
          <div class="swim-date-time__time-hint">Minute</div>
        </div>
        <div class="swim-date-time__time-field">
          <input
            type="number"
            class="swim-date-time__time-input"
            .value="${this._dialogSecond}"
            min="0"
            max="59"
            ?disabled="${i}"
            @change="${this._onSecondChange}"
          />
          <div class="swim-date-time__time-hint">Second</div>
        </div>
        <div class="swim-date-time__time-field">
          <input
            type="number"
            class="swim-date-time__time-input swim-date-time__time-input--ms"
            .value="${this._dialogMillisecond}"
            min="0"
            max="999"
            ?disabled="${o}"
            @change="${this._onMillisecondChange}"
          />
          <div class="swim-date-time__time-hint">Millisecond</div>
        </div>
        <div class="swim-date-time__ampm-group">
          <button
            type="button"
            class="swim-date-time__ampm ${this._dialogAmPm==="AM"?"selected":""}"
            ?disabled="${e}"
            @click="${()=>this._onAmPmChange("AM")}"
          >
            AM
          </button>
          <button
            type="button"
            class="swim-date-time__ampm ${this._dialogAmPm==="PM"?"selected":""}"
            ?disabled="${e}"
            @click="${()=>this._onAmPmChange("PM")}"
          >
            PM
          </button>
        </div>
      </div>
    `}get _calendarMinView(){return this.precision==="month"?"month":this.precision==="year"?"year":"date"}_getDialogHeaderText(){if(!this._dialogModel)return"No value";const e=this._effectiveInputType,t=Jt(this.timezone);if(e===M.time)return we(this._dialogModel,"h:mm a",t);if(e===M.datetime){const i=we(this._dialogModel,"ddd, MMM D YYYY",t),o=we(this._dialogModel,"h:mm a",t);return h`${i} <small>${o}</small>`}return we(this._dialogModel,"ddd, MMM D YYYY",t)}_setDialogDate(e){this._dialogModel=new Date(e);const t=this._dialogModel.getHours();this._dialogHour=t%12||12,this._dialogMinute=String(this._dialogModel.getMinutes()).padStart(2,"0"),this._dialogSecond=String(this._dialogModel.getSeconds()).padStart(2,"0"),this._dialogMillisecond=String(this._dialogModel.getMilliseconds()).padStart(3,"0"),this._dialogAmPm=t>=12?"PM":"AM"}_isTimeDisabled(e){return this.precision?this._modes.indexOf(this.precision)>this._modes.indexOf(e):!1}_isCurrent(){if(!this._dialogModel)return!1;const e=new Date,t=this._effectiveInputType;return t===M.time?e.getHours()===this._dialogModel.getHours()&&e.getMinutes()===this._dialogModel.getMinutes()&&e.getSeconds()===this._dialogModel.getSeconds()&&e.getMilliseconds()===this._dialogModel.getMilliseconds():t===M.datetime?e.getFullYear()===this._dialogModel.getFullYear()&&e.getMonth()===this._dialogModel.getMonth()&&e.getDate()===this._dialogModel.getDate()&&e.getHours()===this._dialogModel.getHours()&&e.getMinutes()===this._dialogModel.getMinutes()&&e.getSeconds()===this._dialogModel.getSeconds()&&e.getMilliseconds()===this._dialogModel.getMilliseconds():e.getFullYear()===this._dialogModel.getFullYear()&&e.getMonth()===this._dialogModel.getMonth()&&e.getDate()===this._dialogModel.getDate()}_openPicker(){if(this.disabled||this._dialogOpen)return;const e=this._value instanceof Date&&X(this._value)?this._value:new Date;this._setDialogDate(e),this._dialogOpen=!0}_onAmPmChange(e){if(!this._dialogModel)return;const t=new Date(this._dialogModel),i=t.getHours();e==="AM"&&this._dialogAmPm==="PM"?t.setHours(i-12):e==="PM"&&this._dialogAmPm==="AM"&&t.setHours(i+12),this._setDialogDate(t)}_handleInput(e){e.stopPropagation();const i=e.target.value;this._displayValue=i;const o=Je(i),n=this._value;if(o){const r=this.precision?fo(o,this.precision):o;this._value=r,this._dateInvalid=!1}else i?(this._value=i,this._dateInvalid=!0):(this._value=null,this._dateInvalid=!1);this._dateOutOfRange=!this._dateInvalid&&this._value instanceof Date?Un(this._value,this.minDate,this.maxDate):!1,this._updateFormValue(),this.dispatchEvent(new CustomEvent("input-change",{detail:this._value,bubbles:!1,composed:!1})),this._value!==n&&this.dispatchEvent(new CustomEvent("value-change",{detail:this._value,bubbles:!1,composed:!1})),!this._dateInvalid&&this._value!==n&&this.dispatchEvent(new CustomEvent("change",{detail:this._value,bubbles:!1,composed:!1}))}_handleFocus(e){e.stopPropagation(),this._focused=!0,this.dispatchEvent(new FocusEvent("focus",{bubbles:!1,composed:!1}))}_handleBlur(e){e.stopPropagation(),this._focused=!1,this._update(),!this._dateInvalid&&this._swimInput&&this._swimInput.value!==this._displayValue&&(this._swimInput.value=this._displayValue),this.dispatchEvent(new FocusEvent("blur",{bubbles:!1,composed:!1}))}_handleKeyDown(e){e.code==="ArrowDown"?(e.preventDefault(),this._openPicker()):e.code==="Escape"&&(this._dialogOpen&&this._close(),e.stopPropagation())}_update(){const e=this._value,t=e instanceof Date&&X(e);if(this._dateInvalid=!!e&&!t,this._displayValue=e?String(e):"",this._dateOutOfRange=!1,!t)return;const i=Jt(this.timezone);this._displayValue=we(e,this._effectiveFormat,i),this._dateOutOfRange=Un(e,this.minDate,this.maxDate)}_validate(){let e={},t="";this._required&&!this._value?(e={valueMissing:!0},t="A value is required."):this._dateInvalid?(e={typeMismatch:!0},t="Invalid date."):this._dateOutOfRange&&(e={rangeOverflow:!0},t="Date is out of the allowed range."),t?this._internals.setValidity(e,t):this._internals.setValidity({})}_updateFormValue(){if(!this._internals)return;const e=this._value;e instanceof Date&&X(e)?this._internals.setFormValue(e.toISOString()):this._internals.setFormValue(String(e??"")),this._validate()}formResetCallback(){this._value=null,this._displayValue="",this._dateInvalid=!1,this._dateOutOfRange=!1,this._internals.setFormValue(""),this._internals.setValidity({}),this.requestUpdate()}formDisabledCallback(e){this.disabled=e}};Mi.styles=[D,Jc],Mi.formAssociated=!0;let C=Mi;I([ee("swim-input")],C.prototype,"_swimInput",2);I([a({type:String})],C.prototype,"id",2);I([a({type:String})],C.prototype,"name",2);I([a({type:String})],C.prototype,"label",2);I([a({type:String})],C.prototype,"hint",2);I([a({type:String})],C.prototype,"placeholder",2);I([a({type:String,reflect:!0})],C.prototype,"size",2);I([a({type:String,reflect:!0})],C.prototype,"appearance",2);I([a({type:Boolean,reflect:!0,converter:w})],C.prototype,"disabled",1);I([a({type:Boolean,reflect:!0,converter:w})],C.prototype,"required",1);I([a({type:String,attribute:"required-indicator"})],C.prototype,"requiredIndicator",2);I([a({type:Boolean,converter:w})],C.prototype,"autofocus",1);I([a({type:Boolean,reflect:!0,converter:w})],C.prototype,"autosize",1);I([a({type:Number,attribute:"min-width"})],C.prototype,"minWidth",1);I([a({type:Number})],C.prototype,"tabindex",2);I([a({type:String,attribute:"input-type"})],C.prototype,"inputType",1);I([a({type:String})],C.prototype,"precision",2);I([a({type:String})],C.prototype,"timezone",2);I([a({type:String,attribute:"display-mode"})],C.prototype,"displayMode",1);I([a({type:String})],C.prototype,"format",2);I([a({type:Boolean,reflect:!0,converter:w})],C.prototype,"marginless",1);I([a({attribute:"min-date"})],C.prototype,"minDate",2);I([a({attribute:"max-date"})],C.prototype,"maxDate",2);I([a({attribute:!1})],C.prototype,"value",1);I([_()],C.prototype,"_displayValue",2);I([_()],C.prototype,"_dateInvalid",2);I([_()],C.prototype,"_dateOutOfRange",2);I([_()],C.prototype,"_focused",2);I([_()],C.prototype,"_dialogOpen",2);I([_()],C.prototype,"_dialogModel",2);I([_()],C.prototype,"_dialogHour",2);I([_()],C.prototype,"_dialogMinute",2);I([_()],C.prototype,"_dialogSecond",2);I([_()],C.prototype,"_dialogMillisecond",2);I([_()],C.prototype,"_dialogAmPm",2);customElements.get(Gn)||customElements.define(Gn,C);const td=k`
  :host {
    display: inline;
    vertical-align: baseline;
  }

  .swim-date-display__root {
    display: inline;
  }

  .swim-date-display__time {
    display: inline;
    margin: 0;
    padding: 0;
    font: inherit;
    color: inherit;
    border: none;
    background: transparent;
    text-align: inherit;
  }

  :host([invalid]) .swim-date-display__time {
    color: var(--red-500);
  }

  .swim-date-display__time--popup {
    text-decoration-line: underline;
    text-decoration-style: dashed;
    text-decoration-thickness: from-font;
    cursor: copy;
    color: inherit;
  }

  .swim-date-display__time--clickable {
    cursor: pointer;
  }

  .swim-date-display__time--clickable:active {
    transform: translate(1px, 1px);
    color: var(--grey-600);
  }

  .swim-date-display__time--clickable:focus-visible {
    outline: 2px solid var(--blue-500);
    outline-offset: 2px;
    border-radius: var(--radius-2);
  }

  swim-tooltip {
    display: inline;
  }

  /* Tooltip panel content (swim-tooltip exposes part="content") */
  swim-tooltip::part(content) {
    padding: var(--spacing-2);
  }

  .swim-date-display__zone-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--spacing-2);
    font-weight: var(--font-weight-bold);
    font-size: var(--font-size-m);
    color: var(--grey-800);
    margin-bottom: var(--spacing-2);
  }

  .swim-date-display__zone-row:last-child {
    margin-bottom: 0;
  }

  .swim-date-display__zone-label {
    flex: 1 1 auto;
    min-width: 0;
  }

  .swim-date-display__copy-btn {
    flex: 0 0 auto;
    text-transform: uppercase;
    font-size: var(--font-size-xs);
    line-height: 1.25;
    min-width: 4.5rem;
    width: 30px;
    --swim-button-background: var(--grey-200);
    --swim-button-hover-background: var(--white);
    --swim-button-border-color: var(--grey-400);
    --swim-button-hover-border-color: var(--grey-350);
    --swim-button-color: var(--grey-700);
    --swim-button-hover-color: var(--grey-800);
    --swim-button-outline-color: var(--blue-500);
    --swim-button-hover-outline-color: var(--blue-500);
    --swim-button-shadow: none;
  }
`;var id=Object.defineProperty,od=Object.getOwnPropertyDescriptor,q=(s,e,t,i)=>{for(var o=i>1?void 0:i?od(e,t):e,n=s.length-1,r;n>=0;n--)(r=s[n])&&(o=(i?r(e,t,o):r(o))||o);return i&&o&&id(e,t,o),o};const Wn="swim-date-display",Ei=Symbol("swim-date-display-clickable-auto");function Kn(){try{return Intl.DateTimeFormat().resolvedOptions().timeZone||"UTC"}catch{return"UTC"}}function sd(s){const e=Math.round((s.getTime()-Date.now())/1e3),t=new Intl.RelativeTimeFormat("en",{numeric:"auto"}),i=Math.round(e/60);if(Math.abs(e)<60)return t.format(e,"second");const o=Math.round(i/60);if(Math.abs(i)<60)return t.format(i,"minute");const n=Math.round(o/24);if(Math.abs(o)<24)return t.format(o,"hour");const r=Math.round(n/7);if(Math.abs(n)<7)return t.format(n,"day");if(Math.abs(r)<5)return t.format(r,"week");const l=Math.round(n/30);if(Math.abs(l)<12)return t.format(l,"month");const c=Math.round(n/365);return t.format(c,"year")}function nd(s){return s==null?null:s instanceof Date?X(s)?s:null:Je(s)}function Zn(s){const e=(s??"").toLowerCase();return e===Y.HUMAN?Y.HUMAN:e===Y.LOCAL?Y.LOCAL:e===Y.CUSTOM?Y.CUSTOM:Y.TIMEZONE}function rd(s){const e=(s??"").toLowerCase();return e===M.date?M.date:e===M.time?M.time:M.datetime}const ts=class ts extends ${constructor(){super(...arguments),this.timezone="",this.defaultInputTimeZone="",this.mode=Y.TIMEZONE,this.type=M.datetime,this.format="",this.tooltipFormat="",this.clipFormat="",this._timezones={UTC:"Etc/UTC",Local:""},this._tooltipDisabled=!1,this.tooltipCssClass="date-tip-tooltip swim-date-display-tip",this.tooltipPlacement=j.top,this.defaultCopyKey="Local",this.invalidDateMessage="Invalid date",this.clickable=Ei,this._displayText="",this._dateInvalid=!0,this._utcDatetimeAttr="",this._zoneList=[],this._rawDatetimeEcho="",this._titleValue="",this._zoneValues={}}get timezones(){return this._timezones}set timezones(e){e&&typeof e=="object"&&!Array.isArray(e)&&(this._timezones=e)}get tooltipDisabled(){return this._tooltipDisabled}set tooltipDisabled(e){this._tooltipDisabled=b(e)}connectedCallback(){super.connectedCallback(),this._recompute()}willUpdate(e){(e.has("datetime")||e.has("precision")||e.has("timezone")||e.has("defaultInputTimeZone")||e.has("mode")||e.has("type")||e.has("format")||e.has("tooltipFormat")||e.has("clipFormat")||e.has("timezones"))&&this._recompute()}_effectiveTimezone(){return Jt(this.timezone)||Kn()}_recompute(){if(this._rawDatetimeEcho=typeof this.datetime=="string"?this.datetime:"",this._zoneValues={},this._zoneList=[],this._utcDatetimeAttr="",this._titleValue="",this._dateInvalid=!0,this._displayText="",this.datetime==null||this.datetime==="")return;const e=nd(this.datetime);if(!e){this._dateInvalid=!0,this._rawDatetimeEcho=String(this.datetime);return}const t=this.precision?fo(e,this.precision):e,i=Zn(this.mode),o=rd(this.type),n=this.format&&bi(this.format)||Wc(i,o,this.precision),r=this.tooltipFormat&&bi(this.tooltipFormat)||n,l=this.clipFormat&&bi(this.clipFormat)||Dr(i,o,this.precision),c=this._effectiveTimezone();if(this._dateInvalid=!1,i===Y.LOCAL){this._utcDatetimeAttr=we(t,"YYYY-MM-DD[T]HH:mm:ss.SSS",void 0),this._displayText=we(t,n,c);return}this._utcDatetimeAttr=t.toISOString(),i===Y.HUMAN?this._displayText=sd(t):this._displayText=we(t,n,c),this._zoneValues=this._buildZoneValues(t,r,l),this._zoneList=Object.keys(this.timezones).map(d=>this._zoneValues[d]).filter(d=>!!d),this._titleValue=Object.keys(this.timezones).map(d=>{const m=this._zoneValues[d];return m?`${m.display} [${d}]`:""}).filter(Boolean).join(`
`)}_buildZoneValues(e,t,i){const o={};for(const n of Object.keys(this.timezones)){const r=this.timezones[n],l=Jt(r)||Kn();o[n]={key:n,clip:we(e,i,l),display:we(e,t,l)}}return o}get _displayMode(){return Zn(this.mode)}get _hasPopup(){return!this._dateInvalid&&this._displayMode!==Y.LOCAL}get _showTooltipPanel(){return this._hasPopup&&!this.tooltipDisabled}_effectiveClickable(){if(this.clickable!==Ei)return b(this.clickable);const e=this._zoneValues[this.defaultCopyKey];return!!this.defaultCopyKey&&!!(e!=null&&e.clip)}_onTimeActivate(e){!this._effectiveClickable()||this._dateInvalid||(e.preventDefault(),e.stopPropagation(),this._copyRow(this.defaultCopyKey))}_onTimeKeyDown(e){!this._effectiveClickable()||this._dateInvalid||(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),this._copyRow(this.defaultCopyKey))}async _copyRow(e){const t=this._zoneValues[e];if(t!=null&&t.clip){try{await navigator.clipboard.writeText(t.clip)}catch{}this.dispatchEvent(new CustomEvent("date-copied",{detail:{key:e,clip:t.clip,message:`${e} date copied to clipboard`},bubbles:!0,composed:!0}))}}render(){const e=this._dateInvalid,t=this._showTooltipPanel,i=this._hasPopup&&!e,o=this._effectiveClickable()&&!e,n=this.tooltipDisabled&&i&&this._titleValue?this._titleValue:"",r=["swim-date-display__time",i?"swim-date-display__time--popup":"",o?"swim-date-display__time--clickable":""].filter(Boolean).join(" "),l=h`
      <time
        class="${r}"
        datetime="${ke(e||!this._utcDatetimeAttr?void 0:this._utcDatetimeAttr)}"
        title="${n}"
        tabindex="${o?0:g}"
        role="${o?"button":g}"
        aria-invalid="${e?"true":"false"}"
        @click="${this._onTimeActivate}"
        @keydown="${this._onTimeKeyDown}"
      >
        ${e?h`${this.invalidDateMessage} &quot;${this._rawDatetimeEcho}&quot;`:this._displayText}
      </time>
    `;return h`
      <div class="swim-date-display__root">
        ${t?h`
              <swim-tooltip
                type="${Co.popover}"
                placement="${this.tooltipPlacement}"
                css-class="${this.tooltipCssClass}"
                show-timeout="400"
                show-caret="true"
              >
                ${l}
                <div slot="content" class="swim-date-display__tooltip-body">
                  ${mr(this._zoneList,c=>c.key,c=>h`
                      <div class="swim-date-display__zone-row">
                        <span class="swim-date-display__zone-label">${c.display}</span>
                        <swim-button
                          class="swim-date-display__copy-btn"
                          variant="bordered"
                          size="small"
                          type="button"
                          @click="${d=>{d.stopPropagation(),this._copyRow(c.key)}}"
                        >
                          <swim-icon font-icon="copy"></swim-icon>
                          ${c.key}
                        </swim-button>
                      </div>
                    `)}
                </div>
              </swim-tooltip>
            `:l}
      </div>
    `}updated(e){super.updated(e),this.toggleAttribute("invalid",this._dateInvalid)}};ts.styles=[D,td];let N=ts;q([a({attribute:"datetime"})],N.prototype,"datetime",2);q([a({type:String})],N.prototype,"precision",2);q([a({type:String,reflect:!0})],N.prototype,"timezone",2);q([a({type:String,attribute:"default-input-time-zone"})],N.prototype,"defaultInputTimeZone",2);q([a({type:String,reflect:!0})],N.prototype,"mode",2);q([a({type:String,reflect:!0})],N.prototype,"type",2);q([a({type:String})],N.prototype,"format",2);q([a({type:String,attribute:"tooltip-format"})],N.prototype,"tooltipFormat",2);q([a({type:String,attribute:"clip-format"})],N.prototype,"clipFormat",2);q([a({type:Object,attribute:"timezones"})],N.prototype,"timezones",1);q([a({type:Boolean,reflect:!0,attribute:"tooltip-disabled",converter:w})],N.prototype,"tooltipDisabled",1);q([a({type:String,attribute:"tooltip-css-class"})],N.prototype,"tooltipCssClass",2);q([a({type:String,attribute:"tooltip-placement"})],N.prototype,"tooltipPlacement",2);q([a({type:String,attribute:"default-copy-key"})],N.prototype,"defaultCopyKey",2);q([a({type:String,attribute:"invalid-date-message"})],N.prototype,"invalidDateMessage",2);q([a({attribute:"clickable",reflect:!0,converter:{fromAttribute(s){return s===null?Ei:s!=="false"},toAttribute(s){return s===Ei?null:s?"":"false"}}})],N.prototype,"clickable",2);q([_()],N.prototype,"_displayText",2);q([_()],N.prototype,"_dateInvalid",2);q([_()],N.prototype,"_utcDatetimeAttr",2);q([_()],N.prototype,"_zoneList",2);q([_()],N.prototype,"_rawDatetimeEcho",2);q([_()],N.prototype,"_titleValue",2);customElements.get(Wn)||customElements.define(Wn,N);const ad=[D,St,k`
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
      box-sizing: border-box;
      height: 100%;
      overflow: auto;
      padding: var(--spacing-16);
    }

    /* Focus visible for accessibility */
    .swim-drawer__panel:focus-visible {
      outline: 2px solid var(--blue-500);
      outline-offset: 2px;
    }
  `];var wt=(s=>(s.Left="left",s.Right="right",s.Bottom="bottom",s))(wt||{}),ld=Object.defineProperty,cd=Object.getOwnPropertyDescriptor,Me=(s,e,t,i)=>{for(var o=i>1?void 0:i?cd(e,t):e,n=s.length-1,r;n>=0;n--)(r=s[n])&&(o=(i?r(e,t,o):r(o))||o);return i&&o&&ld(e,t,o),o};const Jn="swim-drawer",is=class is extends ${constructor(){super(...arguments),this.cssClass="",this.direction=wt.Left,this._size=80,this._zIndex=998,this._closeOnOutsideClick=!0,this._isRoot=!0,this._open=!1,this._closing=!1,this._contentId=`swim-drawer-content-${Math.random().toString(36).slice(2,11)}`,this._previousActiveElement=null,this._backdropClickBound=()=>this._onBackdropClick(),this._keydownBound=e=>this._onKeydown(e),this._portalTarget=null}get size(){return this._size}set size(e){this._size=F(e,80)}get zIndex(){return this._zIndex}set zIndex(e){this._zIndex=F(e,998)}get closeOnOutsideClick(){return this._closeOnOutsideClick}set closeOnOutsideClick(e){this._closeOnOutsideClick=b(e)}get isRoot(){return this._isRoot}set isRoot(e){this._isRoot=b(e)}get open(){return this._open}set open(e){const t=b(e);this._open!==t&&(this._open=t,this.requestUpdate(),t?this._previousActiveElement=typeof document<"u"?document.activeElement:null:this._restoreFocus())}get _isLeft(){return this.direction===wt.Left||this.direction==="left"}get _isRight(){return this.direction===wt.Right||this.direction==="right"}get _isBottom(){return this.direction===wt.Bottom||this.direction==="bottom"}get _widthSize(){return(this._isLeft||this._isRight)&&this.size?`${this.size}%`:"100%"}get _heightSize(){return this._isBottom&&this.size?`${this.size}%`:"100%"}get _isVisible(){return this.open||this._closing}_restoreFocus(){this._previousActiveElement&&typeof this._previousActiveElement.focus=="function"&&this._previousActiveElement.focus(),this._previousActiveElement=null}_emitClose(){this.dispatchEvent(new CustomEvent("close",{detail:!0,bubbles:!1,composed:!1}))}_onBackdropClick(){this.closeOnOutsideClick&&this.isRoot&&this.hide()}_onKeydown(e){e.key==="Escape"&&this.open&&(e.preventDefault(),this.hide())}show(){this.isRoot&&this.parentElement&&this.parentElement!==document.body&&(this._portalTarget=this.parentElement,document.body.appendChild(this)),this.open=!0}hide(){this._closing||!this.open||(this._closing=!0,this._clearCloseTimeout(),this._closeTimeout=window.setTimeout(()=>{this._closeTimeout=void 0,this._closing=!1,this.open=!1,this._portalTarget&&this._portalTarget.isConnected&&this.parentElement===document.body&&this._portalTarget.appendChild(this),this._portalTarget=null,this._emitClose()},150))}connectedCallback(){super.connectedCallback(),document.addEventListener("keydown",this._keydownBound)}disconnectedCallback(){document.removeEventListener("keydown",this._keydownBound),this._clearCloseTimeout(),super.disconnectedCallback()}_clearCloseTimeout(){this._closeTimeout!==void 0&&(clearTimeout(this._closeTimeout),this._closeTimeout=void 0)}willUpdate(){const t=["swim-drawer",this._isLeft?"swim-drawer--left":this._isRight?"swim-drawer--right":"swim-drawer--bottom",this.isRoot?"swim-drawer--root":"swim-drawer--contained"];this.open&&!this._closing&&t.push("swim-drawer--open"),this._closing&&t.push("swim-drawer--closing"),this.cssClass&&t.push(...this.cssClass.trim().split(/\s+/).filter(Boolean)),this.className=t.join(" "),this.isRoot&&this.style.setProperty("--swim-drawer-z",String(this.zIndex))}firstUpdated(){this.open&&this._contentEl&&this._contentEl.focus({preventScroll:!0})}updated(e){e.has("open")&&this.open&&this._contentEl&&requestAnimationFrame(()=>{var t;(t=this._contentEl)==null||t.focus({preventScroll:!0})})}render(){return this._isVisible?h`
      ${this.isRoot?h` <div class="swim-drawer__backdrop" aria-hidden="true" @click="${this._backdropClickBound}"></div> `:g}
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
    `:g}};is.styles=ad;let le=is;Me([a({type:String,attribute:"css-class"})],le.prototype,"cssClass",2);Me([a({type:String,reflect:!0})],le.prototype,"direction",2);Me([a({type:Number})],le.prototype,"size",1);Me([a({type:Number})],le.prototype,"zIndex",1);Me([a({type:Boolean,attribute:"close-on-outside-click",reflect:!0,converter:{fromAttribute:s=>s!==null&&s!=="false"&&s!=="0",toAttribute:s=>s?"":"false"}})],le.prototype,"closeOnOutsideClick",1);Me([a({type:Boolean,attribute:"is-root",reflect:!0,converter:{fromAttribute:s=>s!==null&&s!=="false"&&s!=="0",toAttribute:s=>s?"":"false"}})],le.prototype,"isRoot",1);Me([a({type:Boolean,reflect:!0,converter:w})],le.prototype,"open",1);Me([_()],le.prototype,"_closing",2);Me([_()],le.prototype,"_contentId",2);Me([ee(".swim-drawer__content")],le.prototype,"_contentEl",2);customElements.get(Jn)||customElements.define(Jn,le);const dd=["3d-rotate","action","action-close","action-maximize","action-maximize-inverse","action-minimize","action-outline","action-outline-small","add-circle","add-circle-filled","add-circle-medium","add-circle-thin","add-edge","add-new","add-node","advanced-pie","ai-agent","alert","app-store","app-workspaces","applet","applets","application","apps","area-chart","arrow-bold-circle-left","arrow-bold-circle-right","arrow-bold-down","arrow-bold-left","arrow-bold-right","arrow-bold-up","arrow-down","arrow-input","arrow-left","arrow-output","arrow-right","arrow-right-down-medium","arrow-right-medium","arrow-tail-left","arrow-tail-right","arrow-tail-solid-left","arrow-tail-solid-right","arrow-tail-subright","arrow-up","asset-outline","asset-outline-small","assets","attachment","automation","automation-alternate","back-arrow","back-arrow-filled","bars","bell","bell-alarm","bold","bolt","branch-node","branch-node-vert","broom","browser-size","bug","builder","builder-outline","button-push-outline","button-push-outline-large","button-push-outline-small","calendar","calendar-clock","calender-clock","cards","center-align","chart-area","chart-bar-bar","chart-bubble","chart-donut","chart-full-stacked-area","chart-heat","chart-horz-full-stack-bar","chart-number-card","chart-pie","chart-pie-grid","chart-scatter","chart-spider","chart-stacked-area","chart-vert-bar","chart-vert-bar2","chart-vert-stacked-bar","check","check-filled","check-filled-sm","check-square-filled","checklist","chevron-bold-down","chevron-bold-left","chevron-bold-right","chevron-bold-up","circle","circle-filled","circles","circuit-board","clipboard","clock","cloud-download","cloud-upload","code","cog","collapse","commandline","comments","component","component-create","condition","copy","copy-app","copy-filled","credit-card","dashboard","dashboard-outline","database","debug","devil","disable","document","documentation","domain","dots-horz","dots-vert","dots-vert-round","double-down","double-left","double-right","double-up","downgrade","downgrade-horizontal","download-outline","download-outline-large","download-outline-small","drag","edit","edit-app","edit-outline","edit-outline-large","edit-outline-small","email","enrich-small","escalate","events-outline","events-outline-small","expand","explore","export","export-filled","export-outline","export-outline-large","export-outline-small","eye","eye-disabled","eye-hidden","field-created-by","field-created-date","field-date","field-double-select","field-dynamic","field-edited-by","field-edited-date","field-grid","field-html","field-json","field-list","field-list-small","field-lists","field-multiselect","field-number","field-numeric","field-richtext","field-single-select","field-singleline","field-text","field-textarea","field-textual","field-users","filter","filter-bar","find-page","flame","folder","folder-closed-small","folder-open-small","folders","font","format-indent-decrease","format-indent-increase","formula","forward-arrow","forward-arrow-filled","full-align","gauge","gear","gear-small","gear-square","globe","graph","graph-alt1","grid-view","hand","handle","heat","helper","history","horz-bar-graph-grouped","horz-stacked-bar","html-code","icon-chart-bar-horizontal","icon-chart-horz-bar","import-outline","import-outline-large","import-outline-small","info-filled","info-filled-2","info-filled-small","ingest-small","inspect","integration","integrations","ip","italic","key","key-outline","key-outline-small","keyboard","keyboard-return","layer","left-align","library","line-chart","line-graph","linear-gauge","link","list","list-1","list-view","loading","locate-filled","locate-outline","locate-outline-large","location","lock","lock-sm","mail","mail-1","map","marketplace","maximize","menu","mfa","mic","minimize","minus","money","mouse-hold","multi-line","new-app","notation-arrow-down-left","notation-arrow-up","numbered-list","open","orchestration","paragraph","pause","pause-circle","percent-gauge","phone","photo","pie-chart","pin","plane","play","play-circle","playbook-outline","playbook-outline-small","plugin","plugin-outline","plugin-outline-small","plus","plus-bold","prev","printer","profile","profile-filled","promote","promote-horizontal","question","question-filled","question-filled-sm","radio-button","redo","redo-all","reference","reference-grid","reference-multi","reference-single","reference-tree","refresh","refresh-circle","refresh-small","remove","remove-edge","remove-node","remove-users","repeat","replace","reports","reports-outline","resize","right-align","rocket","rotate","rule-outline","runner","runs-outline","runs-outline-small","sankey","save","save-outline","save-outline-large","save-outline-small","screen","screen-1","search","section","select-all","select-user","select-users","sensor-outline","sensor-outline-small","server","shield","shrink","skip","slide-left","slide-right","sliders","smartphone","smiley-frown","snapshot","solution","sort-ascending","sort-descending","spaces","spaces-list","spaces-outline","spaces-outline-large","speedometer","split-handle","square","square-filled","star","star-filled","stars","stopwatch","superscript","swap","switch","system-diagnostics","system-diagnostics-2","table","tabs","tag-filled","tags-outline","target","task-outline","thumb-down-filled","thumb-down-outline","thumb-down-outline-large","thumb-up-filled","thumb-up-outline","thumb-up-outline-large","tracking-id","transfer","trash","tree","tree-collapse","tree-expand","trend-down","trend-level","trend-up","trending","underline","undo","undo-all","unlink","upload-outline","upload-outline-large","upload-outline-small","user","user-add","user-circle","user-groups","users","version","vert-bar-graph-grouped","vert-full-stack-bar","view-code","view-designer","view-split","wand","warning-filled","warning-filled-sm","warning-thin","web-api","webhook-outline","webhook-outline-large","webhook-outline-small","widget","worker","workflow","workflow-alternate","workflow-alternate-large","workflow-alternate-small","workspaces","workstation","wrench","x","x-filled","x-small"];function ui(s){const{direction:e=wt.Left,size:t=80,zIndex:i=998,closeOnOutsideClick:o=!0,isRoot:n=!0,parentContainer:r,content:l,cssClass:c=""}=s,d=document.createElement("swim-drawer");if(d.direction=e,d.size=t,d.zIndex=i,d.closeOnOutsideClick=o,d.isRoot=n,d.cssClass=c,l)if(typeof l=="string"){const p=document.createElement("div");for(p.innerHTML=l;p.firstChild;)d.appendChild(p.firstChild)}else if(l instanceof DocumentFragment)for(;l.firstChild;)d.appendChild(l.firstChild);else d.appendChild(l);(n?document.body:r??document.body).appendChild(d);const u=()=>{d.hide()};return d.addEventListener("close",()=>{d.parentNode&&d.parentNode.removeChild(d)},{once:!0}),d.show(),{close:u,drawer:d}}function Xn(s){return new Promise(e=>setTimeout(e,s))}function hd(s){return new Promise((e,t)=>setTimeout(()=>t(new Error("Failed")),s))}const he=[{type:"Malware",date:"1/1/2025",origin:"China"},{type:"DDOS",date:"1/5/2025",origin:"China"},{type:"DDOS",date:"1/5/2025",origin:"Russia"},{type:"XSS",date:"1/6/2025",origin:"North Korea"},{type:"DDOS",date:"1/6/2025",origin:"North Korea"},{type:"Ransomware",date:"1/8/2025",origin:"China"},{type:"DDOS",date:"1/9/2025",origin:"China"},{type:"SQL injection",date:"1/10/2025",origin:"North Korea"},{type:"Malware",date:"1/11/2025",origin:"Russia"},{type:"DDOS",date:"1/11/2025",origin:"Russia"}],Ft=["Attack Type","Date of Attack","Origin of Attack"],Rt=["type","date","origin"],ud=[{type:"Malware",date:"1/1/2025",origin:"China",status:"error"},{type:"DDOS",date:"1/5/2025",origin:"China",status:"warning"},{type:"DDOS",date:"1/5/2025",origin:"Russia",status:"warning"},{type:"XSS",date:"1/6/2025",origin:"North Korea",status:"success"},{type:"DDOS",date:"1/6/2025",origin:"North Korea",status:"warning"},{type:"Ransomware",date:"1/8/2025",origin:"China",status:"error"},{type:"DDOS",date:"1/9/2025",origin:"China",status:"warning"},{type:"SQL injection",date:"1/10/2025",origin:"North Korea",status:"success"},{type:"Malware",date:"1/11/2025",origin:"Russia",status:"error"},{type:"XSS",date:"1/11/2025",origin:"Russia",status:"success"}],Qn=[...he,...he,...he,...he,...he,...he,...he,...he,...he];function pd(){var m;const s=document.getElementById("eventBubblingMatrixRoot");if(!s)return;const e=document.getElementById("eventBubblingMatrixLog"),t=[],i=100,o=u=>{t.push(`${new Date().toISOString().slice(11,23)} ${u}`),t.length>i&&t.splice(0,t.length-i),e&&(e.textContent=t.join(`
`))};(m=document.getElementById("matrixClearLog"))==null||m.addEventListener("click",()=>{t.length=0,e&&(e.textContent=""),o("(log cleared)")});const n=["change","checked-change"],r=(u,p,f)=>{for(const x of n)p.addEventListener(x,P=>{var O;const G=P.target,R=((O=G==null?void 0:G.tagName)==null?void 0:O.toLowerCase())??"?";o(`${u} | ${f} | type=${P.type} bubbles=${P.bubbles} composed=${P.composed} target=${R}`)},!1)},l=document.getElementById("matrixCbLight"),c=s.querySelector(".matrix-wrap-light");l&&c&&(r("light",l,"onCheckbox"),r("light",c,"onWrapper(parent)"),r("light",document,"onDocument"));const d=document.getElementById("matrixShadowMount");if(d&&!d.querySelector("[data-matrix-shadow-demo]")){const u=document.createElement("div");u.dataset.matrixShadowDemo="",u.setAttribute("style","padding:1rem;background:var(--grey-800);border-radius:4px;border:1px solid var(--grey-600)");const p=document.createElement("div");p.style.cssText="font-size:0.875rem;color:var(--grey-300);margin-bottom:0.5rem",p.textContent="Shadow host (open shadow contains swim-checkbox below)",u.appendChild(p);const f=u.attachShadow({mode:"open"}),x=document.createElement("swim-checkbox");x.id="matrixCbShadow",x.setAttribute("label","Toggle (inside shadow)"),f.appendChild(x),d.appendChild(u),r("shadow",x,"onCheckbox"),r("shadow",u,"onShadowHost(light parent)"),r("shadow",document,"onDocument")}o("Toggle a checkbox above. Expect: events on the checkbox and wrapper; document only sees the light-DOM case (events do not bubble from the host). Shadow case: document does not receive events from inside the nested shadow root.")}const md=["home","buttons","input","select","datetime","date-display","checkbox","radio","toggle","slider","tabs","button-group","button-toggle","card","progress-spinner","section","split","navbar","tooltip","list","dialog","drawer","scrollbars","icons","event-bubbling-matrix"],Tr=new Set([...md,"datetime","drawer"]),fd="home",er=new Map;let _i=null;function gd(){const s=window.location.pathname;return s.endsWith("/")?s:s+"/"}async function bd(s){const e=er.get(s);if(e)return e;const i=`${gd()}sections/${s}.html`,o=await fetch(i);if(!o.ok)throw new Error(`Failed to load section: ${s}`);const n=await o.text();return er.set(s,n),n}function ro(){const s=window.location.hash.slice(1).toLowerCase();return Tr.has(s)?s:fd}async function pi(s){const e=document.getElementById("page-sections");if(e){_i!==null&&(clearInterval(_i),_i=null);try{const t=await bd(s);e.innerHTML=t,$d()}catch(t){console.error("Failed to load section:",s,t),e.innerHTML=`<p class="section-desc">Failed to load section: ${s}</p>`}}}function _d(){var u,p,f,x,P,G,R,O,A,H;const s=v=>document.getElementById(v),e=document.getElementById("drawerOpenLeft"),t=document.getElementById("drawerOpenBottom");e&&s("drawerDefaultLeft")&&e.addEventListener("click",()=>s("drawerDefaultLeft").show()),t&&s("drawerDefaultBottom")&&t.addEventListener("click",()=>s("drawerDefaultBottom").show()),(u=s("drawerDefaultLeft"))==null||u.addEventListener("close",()=>{const v=s("drawerDefaultLeft");v&&(v.open=!1)}),(p=s("drawerDefaultBottom"))==null||p.addEventListener("close",()=>{const v=s("drawerDefaultBottom");v&&(v.open=!1)});const i=document.getElementById("drawerOpenDetails"),o=document.getElementById("drawerOpenDetailsBottom");if(i||o){const v=`
      <div class="drawer-demo-toolbar">Details</div>
      <div class="drawer-demo-section">
        <h1>Nested Drawer Content</h1>
        <p>This drawer was opened programmatically via openDrawer().</p>
      </div>
    `;i==null||i.addEventListener("click",()=>ui({direction:"left",size:50,content:v})),o==null||o.addEventListener("click",()=>ui({direction:"bottom",size:40,content:v}))}const n=document.getElementById("drawerNoCloseOpenLeft"),r=document.getElementById("drawerNoCloseOpenBottom");n&&s("drawerNoCloseLeft")&&n.addEventListener("click",()=>s("drawerNoCloseLeft").show()),r&&s("drawerNoCloseBottom")&&r.addEventListener("click",()=>s("drawerNoCloseBottom").show()),(f=document.getElementById("drawerNoCloseBtnLeft"))==null||f.addEventListener("click",()=>{var v;return(v=s("drawerNoCloseLeft"))==null?void 0:v.hide()}),(x=document.getElementById("drawerNoCloseBtnBottom"))==null||x.addEventListener("click",()=>{var v;return(v=s("drawerNoCloseBottom"))==null?void 0:v.hide()}),(P=s("drawerNoCloseLeft"))==null||P.addEventListener("close",()=>{const v=s("drawerNoCloseLeft");v&&(v.open=!1)}),(G=s("drawerNoCloseBottom"))==null||G.addEventListener("close",()=>{const v=s("drawerNoCloseBottom");v&&(v.open=!1)});const l=document.getElementById("drawerContainerOpenLeft"),c=document.getElementById("drawerContainerOpenBottom");l&&s("drawerContainerLeft")&&l.addEventListener("click",()=>s("drawerContainerLeft").show()),c&&s("drawerContainerBottom")&&c.addEventListener("click",()=>s("drawerContainerBottom").show()),(R=document.getElementById("drawerContainerBtnLeft"))==null||R.addEventListener("click",()=>{var v;return(v=s("drawerContainerLeft"))==null?void 0:v.hide()}),(O=document.getElementById("drawerContainerBtnBottom"))==null||O.addEventListener("click",()=>{var v;return(v=s("drawerContainerBottom"))==null?void 0:v.hide()}),(A=s("drawerContainerLeft"))==null||A.addEventListener("close",()=>{const v=s("drawerContainerLeft");v&&(v.open=!1)}),(H=s("drawerContainerBottom"))==null||H.addEventListener("close",()=>{const v=s("drawerContainerBottom");v&&(v.open=!1)});const d=document.getElementById("drawerImperativeLeft"),m=document.getElementById("drawerImperativeBottom");if(d||m){const v=`
      <div class="drawer-demo-toolbar">Alert Everyone!</div>
      <div class="drawer-demo-section">
        <h1>Attack Type: Malware</h1>
        <p>Opened via openDrawer().</p>
      </div>
    `;d==null||d.addEventListener("click",()=>ui({direction:"left",size:70,content:v})),m==null||m.addEventListener("click",()=>ui({direction:"bottom",content:v}))}}function wd(){const s=document.getElementById("iconsPreview");if(!s)return;for(const t of dd){const i=document.createElement("li");i.dataset.iconName=t;const o=document.createElement("swim-icon");o.setAttribute("font-icon",t);const n=document.createElement("span");n.className="icon-name",n.textContent=t,i.appendChild(o),i.appendChild(n),s.appendChild(i)}const e=document.getElementById("iconSearch");e&&(e.addEventListener("input",()=>{const t=e.value.trim().toLowerCase();s.querySelectorAll("li").forEach(i=>{const o=(i.dataset.iconName??"").toLowerCase();i.classList.toggle("icon-search-hidden",t.length>0&&!o.includes(t))})}),e.addEventListener("keydown",t=>{t.key==="Escape"&&(e.value="",s.querySelectorAll("li").forEach(i=>i.classList.remove("icon-search-hidden")),e.blur())}))}function tr(s,e){const t=document.getElementById(s),i=e?document.getElementById(e):null;if(!t)return;t.options=[];let o=0;t.addEventListener("filter-change",async n=>{var c;const r=(((c=n.detail)==null?void 0:c.query)??"").trim();if(!r){t.options=[],t.loading=!1;return}const l=++o;t.loading=!0;try{const d=await fetch(`https://api.github.com/search/users?q=${encodeURIComponent(r)}&per_page=15`,{headers:{Accept:"application/vnd.github+json"}});if(!d.ok)throw new Error(`GitHub API ${d.status}`);const m=await d.json();if(l!==o)return;t.options=(m.items??[]).map(u=>({name:u.login,value:u.login,title:u.login,description:u.type==="Organization"?"Organization":"User"}))}catch(d){console.error("GitHub user search failed",d),l===o&&(t.options=[])}finally{l===o&&(t.loading=!1)}}),t.addEventListener("change",()=>{i&&(i.textContent=t.value!=null&&t.value!==""?String(t.value):"—")})}function vd(){const s=[{name:"Breach",value:"breach"},{name:"DDOS",value:"ddos"},{name:"Physical",value:"physical"}],e=[{name:"Apple",value:"apple"},{name:"Banana",value:"banana"},{name:"Orange",value:"orange"},{name:"Grape",value:"grape"},{name:"Mango",value:"mango"},{name:"Pineapple",value:"pineapple"},{name:"Strawberry",value:"strawberry"},{name:"Watermelon",value:"watermelon"}],t=document.getElementById("basicSelect");t&&(t.options=s);const i=[{name:"Apples",value:"apples",group:"Produce"},{name:"Carrots",value:"carrots",group:"Produce"},{name:"Spinach",value:"spinach",group:"Produce"},{name:"Milk",value:"milk",group:"Dairy"},{name:"Cheddar",value:"cheddar",group:"Dairy"},{name:"Yogurt",value:"yogurt",group:"Dairy"},{name:"Chips",value:"chips",group:"Pantry"},{name:"Rice",value:"rice",group:"Pantry"}],o=document.getElementById("groupedSelectProgrammatic");o&&(o.options=i);const n=document.getElementById("groupedSelectFlat");n&&(n.options=i);const r=document.getElementById("groupedSelectMulti");r&&(r.options=[{name:"Drill",value:"drill",group:"Power tools"},{name:"Sander",value:"sander",group:"Power tools"},{name:"Hammer",value:"hammer",group:"Hand tools"},{name:"Wrench",value:"wrench",group:"Hand tools"}]);const l=document.getElementById("requiredSelect");l&&(l.options=s);const c=document.getElementById("singleSelectDisabled");c&&(c.options=s,c.value="breach");const d=document.getElementById("legacySelect");d&&(d.options=e);const m=document.getElementById("fillSelect");m&&(m.options=e);const u=document.getElementById("smallSelect");u&&(u.options=e);const p=document.getElementById("mediumSelect");p&&(p.options=e);const f=document.getElementById("largeSelect");f&&(f.options=e);const x=[{name:"Red",value:"red"},{name:"Blue",value:"blue"},{name:"Green",value:"green"},{name:"Yellow",value:"yellow"},{name:"Purple",value:"purple"},{name:"Orange",value:"orange"},{name:"Pink",value:"pink"},{name:"Brown",value:"brown"}],P=document.getElementById("multiSelect");P&&(P.options=x);const G=[{name:"United States",value:"us"},{name:"United Kingdom",value:"uk"},{name:"Canada",value:"ca"},{name:"Australia",value:"au"},{name:"Germany",value:"de"},{name:"France",value:"fr"},{name:"Italy",value:"it"},{name:"Spain",value:"es"},{name:"Japan",value:"jp"},{name:"China",value:"cn"},{name:"India",value:"in"},{name:"Brazil",value:"br"},{name:"Mexico",value:"mx"},{name:"Argentina",value:"ar"},{name:"South Africa",value:"za"}],R=document.getElementById("filterableSelect");R&&(R.options=G),tr("githubUserSelect","githubUserSelectValue"),tr("dialogMediumGithubUserSelect","dialogMediumGithubUserSelectValue");const O=document.getElementById("noFilterSelect");O&&(O.options=e);const A=document.getElementById("normalSelect");A&&(A.options=e);const H=document.getElementById("withValueSelect");H&&(H.options=[{name:"Option 1",value:"option1"},{name:"Option 2",value:"option2"},{name:"Option 3",value:"option3"}]);const v=document.getElementById("disabledSelect");v&&(v.options=e,v.value="apple");const It=document.getElementById("noClearSelect");It&&(It.options=e);const Qt=[{name:"Technology",value:"tech"},{name:"Business",value:"business"},{name:"Science",value:"science"},{name:"Arts",value:"arts"},{name:"Sports",value:"sports"}],Oe=document.getElementById("formSelect1");Oe&&(Oe.options=Qt);const At=[{name:"Important",value:"important"},{name:"Urgent",value:"urgent"},{name:"Featured",value:"featured"},{name:"Archive",value:"archive"},{name:"Review",value:"review"}],et=document.getElementById("formSelect2");et&&(et.options=At)}function yd(){const s=document.getElementById("dateDisplayTimezonesCustom");s&&(s.timezones={Local:"",GMT:"Etc/UTC",Tokyo:"Asia/Tokyo"});const e=document.getElementById("dateDisplayLocalString"),t=Je("2011-03-11T05:46:24Z");if(e&&t){const n=Intl.DateTimeFormat().resolvedOptions().timeZone;e.textContent=JSON.stringify(we(t,"MMMM D, YYYY h:mm:ss A",n))}const i=document.getElementById("dateDisplayCopyLog"),o=document.getElementById("dateDisplayDemoRoot");i&&o&&o.addEventListener("date-copied",n=>{const r=n.detail;i.textContent=(r==null?void 0:r.message)??"—"})}function xd(){const s="2011-03-11T05:46:24Z",e="1969-07-20T20:17:43Z",t=new Date("10/10/2016 2:35 PM"),i=document.getElementById("dateInput1"),o=document.getElementById("dateInput1Value");i&&(i.value=new Date("10/10/2016"),i.addEventListener("change",O=>{const A=O.detail;o&&(o.textContent=JSON.stringify(A))}));const n=document.getElementById("dateInput2");n&&(n.value=new Date("10/10/2016"));const r=document.getElementById("dateInput3"),l=document.getElementById("dateInput3Value");r&&(r.value=new Date("10/10/2016"),r.addEventListener("change",O=>{const A=O.detail;l&&(l.textContent=JSON.stringify(A))}));const c=document.getElementById("dateInput4");c&&(c.value=new Date("10/10/2016"));const d=document.getElementById("dateTimeInput"),m=document.getElementById("dateTimeInputValue");d&&(d.value=new Date(e),d.addEventListener("change",O=>{const A=O.detail;m&&(m.textContent=JSON.stringify(A))}));const u=new Date(s),p=document.getElementById("tzValue");["tzLocal","tzUtc","tzJst"].forEach(O=>{const A=document.getElementById(O);A&&(A.value=u,A.addEventListener("change",H=>{const v=H.detail;p&&(p.textContent=JSON.stringify(v))}))});const f=new Date(e),x=document.getElementById("timeInputValue");["timeInput1","timeInputTz","timeInputUtc","timeInputJst"].forEach(O=>{const A=document.getElementById(O);A&&(A.value=f,A.addEventListener("change",H=>{const v=H.detail;x&&(x.textContent=JSON.stringify(v))}))});const P=document.getElementById("precisionValue");["precisionYear","precisionMonth","precisionHour","precisionMinute"].forEach(O=>{const A=document.getElementById(O);A&&(A.value=f,A.addEventListener("change",H=>{const v=H.detail;P&&(P.textContent=JSON.stringify(v))}))});const G=document.getElementById("autosizeValue");["autosizeYear","autosizeMonth","autosizeHour","autosizeMinute","autosizeNoMargin"].forEach(O=>{const A=document.getElementById(O);A&&(A.value=t,A.addEventListener("change",H=>{const v=H.detail;G&&(G.textContent=JSON.stringify(v))}))}),["appFilled","appFilledFill","appRequired","appRequiredFill","appTime","appTimeFill","appDateTime","appDateTimeFill","appDisabled","appDisabledFill"].forEach(O=>{const A=document.getElementById(O);A&&(A.value=t)})}function kd(){const s=document.getElementById("listBasic");s&&(s.dataSource=he,s.headerLabels=Ft,s.columns=Rt,s.defaultRowStatus="error");const e=document.getElementById("listColumnLayout");e&&(e.dataSource=he,e.headerLabels=Ft,e.columns=Rt,e.columnLayout="3fr 2fr 1fr",e.defaultRowStatus="error");const t=document.getElementById("listPagination"),i=document.getElementById("listPaginationPage");t&&(t.dataSource=Qn,t.headerLabels=Ft,t.columns=Rt,t.columnLayout="1fr 1fr 1fr",t.height=400,t.paginationConfig={pageSize:10},t.defaultRowStatus="error",t.addEventListener("page-change",c=>{i&&(i.textContent=String(c.detail??1))}),i&&(i.textContent="1"));const o=document.getElementById("listPaginationPage5"),n=document.getElementById("listPaginationPage5Value");o&&(o.dataSource=Qn,o.headerLabels=["No.","Attack Type","Date of Attack","Origin of Attack"],o.columns=["$index","type","date","origin"],o.columnLayout="5rem 1fr 1fr 1fr",o.height=400,o.paginationConfig={index:5,pageSize:10},o.defaultRowStatus="error",o.addEventListener("page-change",c=>{n&&(n.textContent=String(c.detail??5))}),n&&(n.textContent="5"));const r=document.getElementById("listWithStatus");r&&(r.dataSource=ud,r.headerLabels=Ft,r.columns=Rt);const l=document.getElementById("listNoStatus");l&&(l.dataSource=he,l.headerLabels=Ft,l.columns=Rt,l.defaultRowStatus="error")}function $d(){var ks,$s,Es,Cs;pd();const s=document.getElementById("successBtn");s&&s.addEventListener("click",()=>{s.promise=Xn(1e3)});const e=document.getElementById("failBtn");e&&e.addEventListener("click",()=>{e.promise=hd(1e3)});const t=document.getElementById("slowBtn");t&&t.addEventListener("click",()=>{t.promise=Xn(5e3)});const i=document.getElementById("cyclingStateBtn"),o=document.getElementById("cyclingStateLabel");if(i&&o){const y=["active","in-progress","success","fail"];let T=0;const U=()=>{const Z=y[T];i.setAttribute("state",Z),o.textContent=Z,T=(T+1)%y.length};U(),_i=setInterval(U,2e3)}const n=document.getElementById("demoForm");if(n){const y=n.querySelector('swim-button[type="submit"]'),T=n.querySelector('swim-button[type="reset"]');y&&y.addEventListener("click",U=>{U.preventDefault(),n.requestSubmit()}),T&&T.addEventListener("click",U=>{U.preventDefault(),n.reset()}),n.addEventListener("submit",U=>{U.preventDefault();const Z=document.getElementById("nameInput"),Be=document.getElementById("emailInput"),be=document.getElementById("ageInput"),mt=(Z==null?void 0:Z.value)??"",ft=(Be==null?void 0:Be.value)??"",li=(be==null?void 0:be.value)??"";console.log("Form submitted!",{name:mt,email:ft,age:li}),alert(`Form submitted!
Name: ${mt}
Email: ${ft}
Age: ${li}`)})}vd(),xd(),yd();const r=document.getElementById("selectableCardDemo"),l=document.getElementById("cardSelectedValue");r&&l&&r.addEventListener("select",y=>{l.textContent=String(y.detail??!1)});const c=document.getElementById("outlineCardDemo");c&&c.addEventListener("outline-click",()=>console.log("Outline clicked"));const d=document.getElementById("checkboxDemoEvent"),m=document.getElementById("checkboxDemoChecked"),u=document.getElementById("checkboxDemoEventName");d&&m&&u&&(d.addEventListener("checked-change",y=>{m.textContent=String(y.detail),u.textContent="checked-change"}),d.addEventListener("change",()=>{u.textContent="change"}),d.addEventListener("focus",()=>{u.textContent="focus"}),d.addEventListener("blur",()=>{u.textContent="blur"}),m.textContent=String(d.checked));const p=document.getElementById("radioSingleValue"),f=["radioSeasonSpring","radioSeasonSummer","radioSeasonFall","radioSeasonWinter"];f.forEach(y=>{const T=document.getElementById(y);T&&p&&T.addEventListener("change",U=>{const Z=U.detail;f.forEach(Be=>{const be=document.getElementById(Be);be&&(be.checked=be.value===Z)}),p.textContent=String(Z??"")})});const x=document.getElementById("radioGroupDemo"),P=document.getElementById("radioGroupValue");x&&P&&(P.textContent=String(x.value??"—"),x.addEventListener("change",y=>{P.textContent=String(y.detail??"—")}));const G=document.getElementById("progressSpinnerWithLabel");G&&(G.spinnerLabel={inProgressLabel:"Loading...",completeLabel:"Complete!",failLabel:"Failed"});const R=document.getElementById("progressSpinnerConfigurable"),O=document.getElementById("progressSpinnerConfigurableCode"),A=["progressSpinnerValue","progressSpinnerTotal","progressSpinnerDiameter","progressSpinnerStrokeWidth","progressSpinnerColor","progressSpinnerMode","progressSpinnerCompleteStatus","progressSpinnerShowIcon"];function H(){var Ls;if(!R)return;const y=document.getElementById("progressSpinnerValue"),T=document.getElementById("progressSpinnerTotal"),U=document.getElementById("progressSpinnerDiameter"),Z=document.getElementById("progressSpinnerStrokeWidth"),Be=document.getElementById("progressSpinnerColor"),be=document.getElementById("progressSpinnerMode"),mt=document.getElementById("progressSpinnerCompleteStatus"),ft=document.getElementById("progressSpinnerShowIcon"),li=(y==null?void 0:y.value)??"35",Wi=(T==null?void 0:T.value)??"100",Ss=(U==null?void 0:U.value)??"100",Ds=(Z==null?void 0:Z.value)??"5",Ts=(Be==null?void 0:Be.value)??"lime",Is=(be==null?void 0:be.value)??"indeterminate",ci=(mt==null?void 0:mt.value)??"success",As=(ft==null?void 0:ft.checked)!==!1,zs=ci==="fail"||ci==="success"?Wi:li;if(R.value=Number(zs),R.total=Number(Wi),R.diameter=Number(Ss),R.strokeWidth=Number(Ds),R.color=Ts,R.setAttribute("mode",Is),R.isFailure=ci==="fail",R.appearance=As?"icon":"default",(Ls=R.requestUpdate)==null||Ls.call(R),O){const Ir=ci==="fail"?`
  is-failure`:"";O.textContent=`<swim-progress-spinner
  mode="${Is}"
  value="${zs}"
  total="${Wi}"
  diameter="${Ss}"
  stroke-width="${Ds}"
  color="${Ts}"
  appearance="${As?"icon":"default"}"${Ir}
  aria-label="...">
</swim-progress-spinner>`}}if(R){const y=document.getElementById("progressSpinnerMode");y&&y.addEventListener("change",()=>setTimeout(H,0)),A.forEach(U=>{const Z=document.getElementById(U);Z&&Z!==y&&(Z.addEventListener("input",H),Z.addEventListener("change",H))}),y&&y.addEventListener("input",H);const T=document.getElementById("progressSpinnerShowIcon");T&&T.addEventListener("change",H),H()}const v=document.getElementById("sliderDemoEvent"),It=document.getElementById("sliderDemoValue"),Qt=document.getElementById("sliderDemoPercent");v&&It&&Qt&&v.addEventListener("change",y=>{const T=y.detail;It.textContent=String((T==null?void 0:T.value)??""),Qt.textContent=String((T==null?void 0:T.percent)??"")});const Oe=document.getElementById("toggleDemoEvent"),At=document.getElementById("toggleDemoChecked"),et=document.getElementById("toggleDemoEventName");Oe&&At&&et&&(Oe.addEventListener("change",()=>{At.textContent=String(Oe.checked),et.textContent="change"}),Oe.addEventListener("focus",()=>{et.textContent="focus"}),Oe.addEventListener("blur",()=>{et.textContent="blur"}),At.textContent=String(Oe.checked));const os=document.getElementById("seasonToggleGroup"),ss=document.getElementById("seasonValue");os&&ss&&os.addEventListener("value-change",y=>{ss.textContent=String(y.detail??"")});const ei=document.getElementById("disabledGroupDemo"),Ri=document.getElementById("toggleGroupDisabledBtn");ei&&Ri&&Ri.addEventListener("click",()=>{ei.disabled=!ei.disabled,Ri.textContent=ei.disabled?"Enable group":"Disable group"}),wd(),kd();const ut=y=>{var T;(T=y.querySelector("swim-large-format-dialog-content"))==null||T.addEventListener("close-or-cancel",()=>{y.visible=!1})},ye=document.getElementById("dialogEventsDemo"),zt=document.getElementById("dialogEventsLog"),ns=document.getElementById("dialogEventsLargeContent"),pt=[],rs=50,Ni=y=>{const T=new Date().toISOString().slice(11,23);pt.push(`${T} ${y}`),pt.length>rs&&pt.splice(0,pt.length-rs),zt&&(zt.textContent=pt.join(`
`))};ye&&zt&&(ye.addEventListener("open",y=>{Ni(`swim-dialog open (bubbles=${y.bubbles}, composed=${y.composed})`)}),ye.addEventListener("close",y=>{Ni(`swim-dialog close (bubbles=${y.bubbles}, composed=${y.composed})`),ye.visible=!1})),ns&&ns.addEventListener("close-or-cancel",y=>{const T=y.detail;Ni(`swim-large-format-dialog-content close-or-cancel (detail dirty=${T})`),ye&&(ye.visible=!1)}),(ks=document.getElementById("dialogEventsOpen"))==null||ks.addEventListener("click",()=>{ye&&(ye.visible=!0)}),($s=document.getElementById("dialogEventsClearLog"))==null||$s.addEventListener("click",()=>{pt.length=0,zt&&(zt.textContent="(log cleared)")}),(Es=document.getElementById("dialogEventsFooterClose"))==null||Es.addEventListener("click",()=>{ye&&(ye.visible=!1)});const as=document.getElementById("dialogContentOpen"),ti=document.getElementById("dialogContentDemo");as&&ti&&(as.addEventListener("click",()=>{ti.visible=!0}),ti.addEventListener("close",()=>{ti.visible=!1}));const ls=document.getElementById("dialogDismissBackdropOpen"),ii=document.getElementById("dialogDismissBackdropDemo");ls&&ii&&(ls.addEventListener("click",()=>{ii.visible=!0}),ii.addEventListener("close",()=>{ii.visible=!1}));const cs=document.getElementById("dialogComponentToggle"),Lt=document.getElementById("dialogComponentDemo");cs&&Lt&&(cs.addEventListener("click",()=>{Lt.visible=!Lt.visible}),Lt.addEventListener("close",()=>{Lt.visible=!1}));const ds=document.getElementById("dialogWizardOpen"),oi=document.getElementById("dialogWizardDemo");ds&&oi&&(ds.addEventListener("click",()=>{oi.visible=!0}),oi.addEventListener("close",()=>{oi.visible=!1}));const je=document.getElementById("dialogWizardTabs"),hs=document.getElementById("dialogWizardPrev"),us=document.getElementById("dialogWizardNext");hs&&(je!=null&&je.prev)&&hs.addEventListener("click",()=>je.prev()),us&&(je!=null&&je.next)&&us.addEventListener("click",()=>je.next());const ps=document.getElementById("dialogFullScreenOpen"),si=document.getElementById("dialogFullScreenDemo");ps&&si&&(ps.addEventListener("click",()=>{si.visible=!0}),si.addEventListener("close",()=>{si.visible=!1}));const ms=document.getElementById("dialogLargeFormatOpen"),Vi=document.getElementById("dialogLargeFormatDemo");ms&&Vi&&(ms.addEventListener("click",()=>{Vi.visible=!0}),ut(Vi));const fs=document.getElementById("dialogThemeVarsLargeOpen"),Mt=document.getElementById("dialogThemeVarsLargeDemo");if(fs&&Mt){const y=()=>{Mt.visible=!1};fs.addEventListener("click",()=>{Mt.visible=!0}),(Cs=Mt.querySelector("swim-large-format-dialog-content"))==null||Cs.addEventListener("close-or-cancel",y),Mt.addEventListener("close",y)}const gs=document.getElementById("dialogThemeVarsRegularOpen"),ni=document.getElementById("dialogThemeVarsRegularDemo");gs&&ni&&(gs.addEventListener("click",()=>{ni.visible=!0}),ni.addEventListener("close",()=>{ni.visible=!1}));const ri=document.getElementById("dialogFooterAlignDemo"),Hi=document.getElementById("dialogFooterAlignFooter"),ai=(y,T)=>{const U=document.getElementById(y);!U||!ri||!Hi||U.addEventListener("click",()=>{Hi.setAttribute("align",T),Hi.align=T,ri.visible=!0})};ai("dialogFooterAlignOpenStart","start"),ai("dialogFooterAlignOpenCenter","center"),ai("dialogFooterAlignOpenEnd","end"),ai("dialogFooterAlignOpenBetween","space-between"),ri&&ut(ri);const bs=document.getElementById("dialogMediumFormatOpen"),Yi=document.getElementById("dialogMediumFormatDemo");bs&&Yi&&(bs.addEventListener("click",()=>{Yi.visible=!0}),ut(Yi));const _s=document.getElementById("dialogMediumContentOpen"),qi=document.getElementById("dialogMediumContentDemo");_s&&qi&&(_s.addEventListener("click",()=>{qi.visible=!0}),ut(qi));const ws=document.getElementById("dialogMediumFooterOpen"),Ui=document.getElementById("dialogMediumFooterDemo");ws&&Ui&&(ws.addEventListener("click",()=>{Ui.visible=!0}),ut(Ui));const vs=document.getElementById("dialogMediumFooterContentOpen"),ji=document.getElementById("dialogMediumFooterContentDemo");vs&&ji&&(vs.addEventListener("click",()=>{ji.visible=!0}),ut(ji)),_d();const ys=document.getElementById("navbarGoToFourthBtn"),Gi=document.getElementById("navbarTopDemo");ys&&Gi&&"goTo"in Gi&&ys.addEventListener("click",()=>Gi.goTo(3));const xs=document.getElementById("selectForm");xs&&xs.addEventListener("submit",y=>{y.preventDefault();const T=document.getElementById("formSelect1"),U=document.getElementById("formSelect2");console.log("Select Form submitted!"),alert(`Form submitted!
Category: ${T.value}
Tags: ${JSON.stringify(U.value)}`)})}async function Ed(){const s=document.querySelector(".navigation");s&&s.addEventListener("click",async l=>{var p,f;const c=(f=(p=l.target)==null?void 0:p.closest)==null?void 0:f.call(p,'a.sub-nav-item[href^="#"]');if(!c)return;const d=c.getAttribute("href");if(!d||d==="#")return;const m=d.slice(1).toLowerCase();if(!Tr.has(m))return;l.preventDefault(),l.stopPropagation(),window.location.hash.slice(1).toLowerCase()!==m?(await pi(m),history.replaceState(null,"","#"+m),e(m)):pi(m)}),window.addEventListener("hashchange",()=>{const l=ro();e(l),pi(l)});function e(l){const c=l??ro();document.querySelectorAll(".sub-nav-item.active, .nav-item.active").forEach(d=>d.classList.remove("active")),document.querySelectorAll(`.sub-nav-item[href="#${c}"], .nav-item[href="#${c}"]`).forEach(d=>d.classList.add("active"))}const t=ro();window.location.hash.slice(1).toLowerCase()!==t&&history.replaceState(null,"",`#${t}`),e(t),await pi(t);const i=document.getElementById("navSearch"),o=document.querySelectorAll(".nav-item-container"),n=document.querySelectorAll(".sub-nav-item");function r(){if(!i)return;const l=i.value.trim().toLowerCase();n.forEach(c=>{var m;const d=((m=c.textContent)==null?void 0:m.trim().toLowerCase())??"";c.classList.toggle("nav-search-hidden",l.length>0&&!d.includes(l))}),o.forEach(c=>{var x;const d=c.querySelector(".nav-item-label"),m=((x=d==null?void 0:d.textContent)==null?void 0:x.trim().toLowerCase())??"",u=c.querySelectorAll(".sub-nav-item:not(.nav-search-hidden)").length,p=l.length===0||m.includes(l),f=u>0;c.classList.toggle("nav-search-hidden",l.length>0&&!p&&!f)})}i&&(i.addEventListener("input",r),i.addEventListener("keydown",l=>{l.key==="Escape"&&(i.value="",r(),i.blur())})),console.log("✨ @swimlane/swim-ui demo loaded successfully!")}document.addEventListener("DOMContentLoaded",()=>{const s=St.styleSheet;s&&(document.adoptedStyleSheets=[...document.adoptedStyleSheets,s]),Ed()});
