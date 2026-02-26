(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function t(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(o){if(o.ep)return;o.ep=!0;const n=t(o);fetch(o.href,n)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Qt=globalThis,qi=Qt.ShadowRoot&&(Qt.ShadyCSS===void 0||Qt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ui=Symbol(),es=new WeakMap;let _n=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==Ui)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(qi&&e===void 0){const i=t!==void 0&&t.length===1;i&&(e=es.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&es.set(t,e))}return e}toString(){return this.cssText}};const Yn=s=>new _n(typeof s=="string"?s:s+"",void 0,Ui),w=(s,...e)=>{const t=s.length===1?s[0]:e.reduce((i,o,n)=>i+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+s[n+1],s[0]);return new _n(t,s,Ui)},qn=(s,e)=>{if(qi)s.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const i=document.createElement("style"),o=Qt.litNonce;o!==void 0&&i.setAttribute("nonce",o),i.textContent=t.cssText,s.appendChild(i)}},ts=qi?s=>s:s=>s instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return Yn(t)})(s):s;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Un,defineProperty:jn,getOwnPropertyDescriptor:Gn,getOwnPropertyNames:Wn,getOwnPropertySymbols:Kn,getPrototypeOf:Zn}=Object,Re=globalThis,is=Re.trustedTypes,Jn=is?is.emptyScript:"",Di=Re.reactiveElementPolyfillSupport,Dt=(s,e)=>s,oi={toAttribute(s,e){switch(e){case Boolean:s=s?Jn:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,e){let t=s;switch(e){case Boolean:t=s!==null;break;case Number:t=s===null?null:Number(s);break;case Object:case Array:try{t=JSON.parse(s)}catch{t=null}}return t}},ji=(s,e)=>!Un(s,e),os={attribute:!0,type:String,converter:oi,reflect:!1,useDefault:!1,hasChanged:ji};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),Re.litPropertyMetadata??(Re.litPropertyMetadata=new WeakMap);let st=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=os){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),o=this.getPropertyDescriptor(e,i,t);o!==void 0&&jn(this.prototype,e,o)}}static getPropertyDescriptor(e,t,i){const{get:o,set:n}=Gn(this.prototype,e)??{get(){return this[t]},set(r){this[t]=r}};return{get:o,set(r){const l=o==null?void 0:o.call(this);n==null||n.call(this,r),this.requestUpdate(e,l,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??os}static _$Ei(){if(this.hasOwnProperty(Dt("elementProperties")))return;const e=Zn(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(Dt("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Dt("properties"))){const t=this.properties,i=[...Wn(t),...Kn(t)];for(const o of i)this.createProperty(o,t[o])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[i,o]of t)this.elementProperties.set(i,o)}this._$Eh=new Map;for(const[t,i]of this.elementProperties){const o=this._$Eu(t,i);o!==void 0&&this._$Eh.set(o,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const o of i)t.unshift(ts(o))}else e!==void 0&&t.push(ts(e));return t}static _$Eu(e,t){const i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return qn(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var i;return(i=t.hostConnected)==null?void 0:i.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var i;return(i=t.hostDisconnected)==null?void 0:i.call(t)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){var n;const i=this.constructor.elementProperties.get(e),o=this.constructor._$Eu(e,i);if(o!==void 0&&i.reflect===!0){const r=(((n=i.converter)==null?void 0:n.toAttribute)!==void 0?i.converter:oi).toAttribute(t,i.type);this._$Em=e,r==null?this.removeAttribute(o):this.setAttribute(o,r),this._$Em=null}}_$AK(e,t){var n,r;const i=this.constructor,o=i._$Eh.get(e);if(o!==void 0&&this._$Em!==o){const l=i.getPropertyOptions(o),c=typeof l.converter=="function"?{fromAttribute:l.converter}:((n=l.converter)==null?void 0:n.fromAttribute)!==void 0?l.converter:oi;this._$Em=o;const h=c.fromAttribute(t,l.type);this[o]=h??((r=this._$Ej)==null?void 0:r.get(o))??h,this._$Em=null}}requestUpdate(e,t,i){var o;if(e!==void 0){const n=this.constructor,r=this[e];if(i??(i=n.getPropertyOptions(e)),!((i.hasChanged??ji)(r,t)||i.useDefault&&i.reflect&&r===((o=this._$Ej)==null?void 0:o.get(e))&&!this.hasAttribute(n._$Eu(e,i))))return;this.C(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:o,wrapped:n},r){i&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,r??t??this[e]),n!==!0||r!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),o===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[n,r]of this._$Ep)this[n]=r;this._$Ep=void 0}const o=this.constructor.elementProperties;if(o.size>0)for(const[n,r]of o){const{wrapped:l}=r,c=this[n];l!==!0||this._$AL.has(n)||c===void 0||this.C(n,void 0,r,c)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(i=this._$EO)==null||i.forEach(o=>{var n;return(n=o.hostUpdate)==null?void 0:n.call(o)}),this.update(t)):this._$EM()}catch(o){throw e=!1,this._$EM(),o}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(i=>{var o;return(o=i.hostUpdated)==null?void 0:o.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};st.elementStyles=[],st.shadowRootOptions={mode:"open"},st[Dt("elementProperties")]=new Map,st[Dt("finalized")]=new Map,Di==null||Di({ReactiveElement:st}),(Re.reactiveElementVersions??(Re.reactiveElementVersions=[])).push("2.1.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const At=globalThis,si=At.trustedTypes,ss=si?si.createPolicy("lit-html",{createHTML:s=>s}):void 0,vn="$lit$",Ne=`lit$${Math.random().toFixed(9).slice(2)}$`,wn="?"+Ne,Xn=`<${wn}>`,We=document,It=()=>We.createComment(""),Tt=s=>s===null||typeof s!="object"&&typeof s!="function",Gi=Array.isArray,Qn=s=>Gi(s)||typeof(s==null?void 0:s[Symbol.iterator])=="function",Ai=`[ 	
\f\r]`,wt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ns=/-->/g,rs=/>/g,Ye=RegExp(`>|${Ai}(?:([^\\s"'>=/]+)(${Ai}*=${Ai}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),as=/'/g,ls=/"/g,yn=/^(?:script|style|textarea|title)$/i,er=s=>(e,...t)=>({_$litType$:s,strings:e,values:t}),d=er(1),ae=Symbol.for("lit-noChange"),g=Symbol.for("lit-nothing"),cs=new WeakMap,Ue=We.createTreeWalker(We,129);function xn(s,e){if(!Gi(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return ss!==void 0?ss.createHTML(e):e}const tr=(s,e)=>{const t=s.length-1,i=[];let o,n=e===2?"<svg>":e===3?"<math>":"",r=wt;for(let l=0;l<t;l++){const c=s[l];let h,m,u=-1,p=0;for(;p<c.length&&(r.lastIndex=p,m=r.exec(c),m!==null);)p=r.lastIndex,r===wt?m[1]==="!--"?r=ns:m[1]!==void 0?r=rs:m[2]!==void 0?(yn.test(m[2])&&(o=RegExp("</"+m[2],"g")),r=Ye):m[3]!==void 0&&(r=Ye):r===Ye?m[0]===">"?(r=o??wt,u=-1):m[1]===void 0?u=-2:(u=r.lastIndex-m[2].length,h=m[1],r=m[3]===void 0?Ye:m[3]==='"'?ls:as):r===ls||r===as?r=Ye:r===ns||r===rs?r=wt:(r=Ye,o=void 0);const b=r===Ye&&s[l+1].startsWith("/>")?" ":"";n+=r===wt?c+Xn:u>=0?(i.push(h),c.slice(0,u)+vn+c.slice(u)+Ne+b):c+Ne+(u===-2?l:b)}return[xn(s,n+(s[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]};class zt{constructor({strings:e,_$litType$:t},i){let o;this.parts=[];let n=0,r=0;const l=e.length-1,c=this.parts,[h,m]=tr(e,t);if(this.el=zt.createElement(h,i),Ue.currentNode=this.el.content,t===2||t===3){const u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(o=Ue.nextNode())!==null&&c.length<l;){if(o.nodeType===1){if(o.hasAttributes())for(const u of o.getAttributeNames())if(u.endsWith(vn)){const p=m[r++],b=o.getAttribute(u).split(Ne),x=/([.?@])?(.*)/.exec(p);c.push({type:1,index:n,name:x[2],strings:b,ctor:x[1]==="."?or:x[1]==="?"?sr:x[1]==="@"?nr:vi}),o.removeAttribute(u)}else u.startsWith(Ne)&&(c.push({type:6,index:n}),o.removeAttribute(u));if(yn.test(o.tagName)){const u=o.textContent.split(Ne),p=u.length-1;if(p>0){o.textContent=si?si.emptyScript:"";for(let b=0;b<p;b++)o.append(u[b],It()),Ue.nextNode(),c.push({type:2,index:++n});o.append(u[p],It())}}}else if(o.nodeType===8)if(o.data===wn)c.push({type:2,index:n});else{let u=-1;for(;(u=o.data.indexOf(Ne,u+1))!==-1;)c.push({type:7,index:n}),u+=Ne.length-1}n++}}static createElement(e,t){const i=We.createElement("template");return i.innerHTML=e,i}}function dt(s,e,t=s,i){var r,l;if(e===ae)return e;let o=i!==void 0?(r=t._$Co)==null?void 0:r[i]:t._$Cl;const n=Tt(e)?void 0:e._$litDirective$;return(o==null?void 0:o.constructor)!==n&&((l=o==null?void 0:o._$AO)==null||l.call(o,!1),n===void 0?o=void 0:(o=new n(s),o._$AT(s,t,i)),i!==void 0?(t._$Co??(t._$Co=[]))[i]=o:t._$Cl=o),o!==void 0&&(e=dt(s,o._$AS(s,e.values),o,i)),e}let ir=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,o=((e==null?void 0:e.creationScope)??We).importNode(t,!0);Ue.currentNode=o;let n=Ue.nextNode(),r=0,l=0,c=i[0];for(;c!==void 0;){if(r===c.index){let h;c.type===2?h=new bt(n,n.nextSibling,this,e):c.type===1?h=new c.ctor(n,c.name,c.strings,this,e):c.type===6&&(h=new rr(n,this,e)),this._$AV.push(h),c=i[++l]}r!==(c==null?void 0:c.index)&&(n=Ue.nextNode(),r++)}return Ue.currentNode=We,o}p(e){let t=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}};class bt{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,i,o){this.type=2,this._$AH=g,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=o,this._$Cv=(o==null?void 0:o.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=dt(this,e,t),Tt(e)?e===g||e==null||e===""?(this._$AH!==g&&this._$AR(),this._$AH=g):e!==this._$AH&&e!==ae&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Qn(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==g&&Tt(this._$AH)?this._$AA.nextSibling.data=e:this.T(We.createTextNode(e)),this._$AH=e}$(e){var n;const{values:t,_$litType$:i}=e,o=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=zt.createElement(xn(i.h,i.h[0]),this.options)),i);if(((n=this._$AH)==null?void 0:n._$AD)===o)this._$AH.p(t);else{const r=new ir(o,this),l=r.u(this.options);r.p(t),this.T(l),this._$AH=r}}_$AC(e){let t=cs.get(e.strings);return t===void 0&&cs.set(e.strings,t=new zt(e)),t}k(e){Gi(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,o=0;for(const n of e)o===t.length?t.push(i=new bt(this.O(It()),this.O(It()),this,this.options)):i=t[o],i._$AI(n),o++;o<t.length&&(this._$AR(i&&i._$AB.nextSibling,o),t.length=o)}_$AR(e=this._$AA.nextSibling,t){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,t);e!==this._$AB;){const o=e.nextSibling;e.remove(),e=o}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}}class vi{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,o,n){this.type=1,this._$AH=g,this._$AN=void 0,this.element=e,this.name=t,this._$AM=o,this.options=n,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=g}_$AI(e,t=this,i,o){const n=this.strings;let r=!1;if(n===void 0)e=dt(this,e,t,0),r=!Tt(e)||e!==this._$AH&&e!==ae,r&&(this._$AH=e);else{const l=e;let c,h;for(e=n[0],c=0;c<n.length-1;c++)h=dt(this,l[i+c],t,c),h===ae&&(h=this._$AH[c]),r||(r=!Tt(h)||h!==this._$AH[c]),h===g?e=g:e!==g&&(e+=(h??"")+n[c+1]),this._$AH[c]=h}r&&!o&&this.j(e)}j(e){e===g?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class or extends vi{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===g?void 0:e}}class sr extends vi{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==g)}}class nr extends vi{constructor(e,t,i,o,n){super(e,t,i,o,n),this.type=5}_$AI(e,t=this){if((e=dt(this,e,t,0)??g)===ae)return;const i=this._$AH,o=e===g&&i!==g||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,n=e!==g&&(i===g||o);o&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}}class rr{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){dt(this,e)}}const ar={I:bt},Ii=At.litHtmlPolyfillSupport;Ii==null||Ii(zt,bt),(At.litHtmlVersions??(At.litHtmlVersions=[])).push("3.3.1");const lr=(s,e,t)=>{const i=(t==null?void 0:t.renderBefore)??e;let o=i._$litPart$;if(o===void 0){const n=(t==null?void 0:t.renderBefore)??null;i._$litPart$=o=new bt(e.insertBefore(It(),n),n,void 0,t??{})}return o._$AI(s),o};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ge=globalThis;let y=class extends st{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=lr(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return ae}};var fn;y._$litElement$=!0,y.finalized=!0,(fn=Ge.litElementHydrateSupport)==null||fn.call(Ge,{LitElement:y});const Ti=Ge.litElementPolyfillSupport;Ti==null||Ti({LitElement:y});(Ge.litElementVersions??(Ge.litElementVersions=[])).push("4.2.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const cr={attribute:!0,type:String,converter:oi,reflect:!1,hasChanged:ji},dr=(s=cr,e,t)=>{const{kind:i,metadata:o}=t;let n=globalThis.litPropertyMetadata.get(o);if(n===void 0&&globalThis.litPropertyMetadata.set(o,n=new Map),i==="setter"&&((s=Object.create(s)).wrapped=!0),n.set(t.name,s),i==="accessor"){const{name:r}=t;return{set(l){const c=e.get.call(this);e.set.call(this,l),this.requestUpdate(r,c,s)},init(l){return l!==void 0&&this.C(r,void 0,s,l),l}}}if(i==="setter"){const{name:r}=t;return function(l){const c=this[r];e.call(this,l),this.requestUpdate(r,c,s)}}throw Error("Unsupported decorator location: "+i)};function a(s){return(e,t)=>typeof t=="object"?dr(s,e,t):((i,o,n)=>{const r=o.hasOwnProperty(n);return o.constructor.createProperty(n,i),r?Object.getOwnPropertyDescriptor(o,n):void 0})(s,e,t)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function _(s){return a({...s,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const hr=(s,e,t)=>(t.configurable=!0,t.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(s,e,t),t);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function K(s,e){return(t,i,o)=>{const n=r=>{var l;return((l=r.renderRoot)==null?void 0:l.querySelector(s))??null};return hr(t,i,{get(){return n(this)}})}}const $=w`
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
    --color-success: #b0e53c;

    /* Shadows */
    --shadow-1: 0 1px 2px rgba(0, 0, 0, 0.3);
    --shadow-2: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    --shadow-3: 0 1px 8px 0 rgba(0, 0, 0, 0.2), 0 3px 4px 0 rgba(0, 0, 0, 0.14), 0 3px 3px -2px rgba(0, 0, 0, 0.12);
  }
`;w`
  * {
    box-sizing: border-box;
  }
`;const ur=w`
  :host {
    display: inline-block;
    cursor: pointer;
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
`;var be=(s=>(s.Active="active",s.InProgress="in-progress",s.Success="success",s.Fail="fail",s))(be||{});function f(s){return s!=null&&`${s}`!="false"}function T(s,e=null){return isNaN(parseFloat(s))||isNaN(Number(s))?e:Number(s)}const pr=w`
  .swim-icon.lit-3d-rotate::before {
    content: '\\ea02';
  }
  .swim-icon.lit-action-close::before {
    content: '\\ea03';
  }
  .swim-icon.lit-action-maximize-inverse::before {
    content: '\\ea04';
  }
  .swim-icon.lit-action-maximize::before {
    content: '\\ea05';
  }
  .swim-icon.lit-action-minimize::before {
    content: '\\ea06';
  }
  .swim-icon.lit-action-outline-small::before {
    content: '\\ea07';
  }
  .swim-icon.lit-action-outline::before {
    content: '\\ea08';
  }
  .swim-icon.lit-action::before {
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
  .swim-icon.lit-add-circle::before {
    content: '\\ea0d';
  }
  .swim-icon.lit-add-edge::before {
    content: '\\ea0e';
  }
  .swim-icon.lit-add-new::before {
    content: '\\ea0f';
  }
  .swim-icon.lit-add-node::before {
    content: '\\ea10';
  }
  .swim-icon.lit-advanced-pie::before {
    content: '\\ea11';
  }
  .swim-icon.lit-ai-agent::before {
    content: '\\ea12';
  }
  .swim-icon.lit-alert::before {
    content: '\\ea13';
  }
  .swim-icon.lit-app-store::before {
    content: '\\ea14';
  }
  .swim-icon.lit-app-workspaces::before {
    content: '\\ea15';
  }
  .swim-icon.lit-applet::before {
    content: '\\ea16';
  }
  .swim-icon.lit-applets::before {
    content: '\\ea17';
  }
  .swim-icon.lit-application::before {
    content: '\\ea18';
  }
  .swim-icon.lit-apps::before {
    content: '\\ea19';
  }
  .swim-icon.lit-area-chart::before {
    content: '\\ea1a';
  }
  .swim-icon.lit-arrow-bold-circle-left::before {
    content: '\\ea1b';
  }
  .swim-icon.lit-arrow-bold-circle-right::before {
    content: '\\ea1c';
  }
  .swim-icon.lit-arrow-bold-down::before {
    content: '\\ea1d';
  }
  .swim-icon.lit-arrow-bold-left::before {
    content: '\\ea1e';
  }
  .swim-icon.lit-arrow-bold-right::before {
    content: '\\ea1f';
  }
  .swim-icon.lit-arrow-bold-up::before {
    content: '\\ea20';
  }
  .swim-icon.lit-arrow-down::before {
    content: '\\ea21';
  }
  .swim-icon.lit-arrow-input::before {
    content: '\\ea22';
  }
  .swim-icon.lit-arrow-left::before {
    content: '\\ea23';
  }
  .swim-icon.lit-arrow-output::before {
    content: '\\ea24';
  }
  .swim-icon.lit-arrow-right-down-medium::before {
    content: '\\ea25';
  }
  .swim-icon.lit-arrow-right-medium::before {
    content: '\\ea26';
  }
  .swim-icon.lit-arrow-right::before {
    content: '\\ea27';
  }
  .swim-icon.lit-arrow-tail-left::before {
    content: '\\ea28';
  }
  .swim-icon.lit-arrow-tail-right::before {
    content: '\\ea29';
  }
  .swim-icon.lit-arrow-tail-solid-left::before {
    content: '\\ea2a';
  }
  .swim-icon.lit-arrow-tail-solid-right::before {
    content: '\\ea2b';
  }
  .swim-icon.lit-arrow-tail-subright::before {
    content: '\\ea2c';
  }
  .swim-icon.lit-arrow-up::before {
    content: '\\ea2d';
  }
  .swim-icon.lit-asset-outline-small::before {
    content: '\\ea2e';
  }
  .swim-icon.lit-asset-outline::before {
    content: '\\ea2f';
  }
  .swim-icon.lit-assets::before {
    content: '\\ea30';
  }
  .swim-icon.lit-attachment::before {
    content: '\\ea31';
  }
  .swim-icon.lit-automation-alternate::before {
    content: '\\ea32';
  }
  .swim-icon.lit-automation::before {
    content: '\\ea33';
  }
  .swim-icon.lit-back-arrow-filled::before {
    content: '\\ea34';
  }
  .swim-icon.lit-back-arrow::before {
    content: '\\ea35';
  }
  .swim-icon.lit-bars::before {
    content: '\\ea36';
  }
  .swim-icon.lit-bell-alarm::before {
    content: '\\ea37';
  }
  .swim-icon.lit-bell::before {
    content: '\\ea38';
  }
  .swim-icon.lit-bold::before {
    content: '\\ea39';
  }
  .swim-icon.lit-bolt::before {
    content: '\\ea3a';
  }
  .swim-icon.lit-branch-node-vert::before {
    content: '\\ea3b';
  }
  .swim-icon.lit-branch-node::before {
    content: '\\ea3c';
  }
  .swim-icon.lit-broom::before {
    content: '\\ea3d';
  }
  .swim-icon.lit-browser-size::before {
    content: '\\ea3e';
  }
  .swim-icon.lit-bug::before {
    content: '\\ea3f';
  }
  .swim-icon.lit-builder-outline::before {
    content: '\\ea40';
  }
  .swim-icon.lit-builder::before {
    content: '\\ea41';
  }
  .swim-icon.lit-button-push-outline-large::before {
    content: '\\ea42';
  }
  .swim-icon.lit-button-push-outline-small::before {
    content: '\\ea43';
  }
  .swim-icon.lit-button-push-outline::before {
    content: '\\ea44';
  }
  .swim-icon.lit-calendar-clock::before {
    content: '\\ea45';
  }
  .swim-icon.lit-calendar::before {
    content: '\\ea46';
  }
  .swim-icon.lit-calender-clock::before {
    content: '\\ea47';
  }
  .swim-icon.lit-cards::before {
    content: '\\ea48';
  }
  .swim-icon.lit-center-align::before {
    content: '\\ea49';
  }
  .swim-icon.lit-chart-area::before {
    content: '\\ea4a';
  }
  .swim-icon.lit-chart-bar-bar::before {
    content: '\\ea4b';
  }
  .swim-icon.lit-chart-bubble::before {
    content: '\\ea4c';
  }
  .swim-icon.lit-chart-donut::before {
    content: '\\ea4d';
  }
  .swim-icon.lit-chart-full-stacked-area::before {
    content: '\\ea4e';
  }
  .swim-icon.lit-chart-heat::before {
    content: '\\ea4f';
  }
  .swim-icon.lit-chart-horz-full-stack-bar::before {
    content: '\\ea50';
  }
  .swim-icon.lit-chart-number-card::before {
    content: '\\ea51';
  }
  .swim-icon.lit-chart-pie-grid::before {
    content: '\\ea52';
  }
  .swim-icon.lit-chart-pie::before {
    content: '\\ea53';
  }
  .swim-icon.lit-chart-scatter::before {
    content: '\\ea54';
  }
  .swim-icon.lit-chart-spider::before {
    content: '\\ea55';
  }
  .swim-icon.lit-chart-stacked-area::before {
    content: '\\ea56';
  }
  .swim-icon.lit-chart-vert-bar::before {
    content: '\\ea57';
  }
  .swim-icon.lit-chart-vert-bar2::before {
    content: '\\ea58';
  }
  .swim-icon.lit-chart-vert-stacked-bar::before {
    content: '\\ea59';
  }
  .swim-icon.lit-check-filled-sm::before {
    content: '\\ea5a';
  }
  .swim-icon.lit-check-filled::before {
    content: '\\ea5b';
  }
  .swim-icon.lit-check-square-filled::before {
    content: '\\ea5c';
  }
  .swim-icon.lit-check::before {
    content: '\\ea5d';
  }
  .swim-icon.lit-checklist::before {
    content: '\\ea5e';
  }
  .swim-icon.lit-chevron-bold-down::before {
    content: '\\ea5f';
  }
  .swim-icon.lit-chevron-bold-left::before {
    content: '\\ea60';
  }
  .swim-icon.lit-chevron-bold-right::before {
    content: '\\ea61';
  }
  .swim-icon.lit-chevron-bold-up::before {
    content: '\\ea62';
  }
  .swim-icon.lit-circle-filled::before {
    content: '\\ea63';
  }
  .swim-icon.lit-circle::before {
    content: '\\ea64';
  }
  .swim-icon.lit-circles::before {
    content: '\\ea65';
  }
  .swim-icon.lit-circuit-board::before {
    content: '\\ea66';
  }
  .swim-icon.lit-clipboard::before {
    content: '\\ea67';
  }
  .swim-icon.lit-clock::before {
    content: '\\ea68';
  }
  .swim-icon.lit-cloud-download::before {
    content: '\\ea69';
  }
  .swim-icon.lit-cloud-upload::before {
    content: '\\ea6a';
  }
  .swim-icon.lit-code::before {
    content: '\\ea6b';
  }
  .swim-icon.lit-cog::before {
    content: '\\ea6c';
  }
  .swim-icon.lit-collapse::before {
    content: '\\ea6d';
  }
  .swim-icon.lit-commandline::before {
    content: '\\ea6e';
  }
  .swim-icon.lit-comments::before {
    content: '\\ea6f';
  }
  .swim-icon.lit-component-create::before {
    content: '\\ea70';
  }
  .swim-icon.lit-component::before {
    content: '\\ea71';
  }
  .swim-icon.lit-condition::before {
    content: '\\ea72';
  }
  .swim-icon.lit-copy-app::before {
    content: '\\ea73';
  }
  .swim-icon.lit-copy-filled::before {
    content: '\\ea74';
  }
  .swim-icon.lit-copy::before {
    content: '\\ea75';
  }
  .swim-icon.lit-credit-card::before {
    content: '\\ea76';
  }
  .swim-icon.lit-dashboard-outline::before {
    content: '\\ea77';
  }
  .swim-icon.lit-dashboard::before {
    content: '\\ea78';
  }
  .swim-icon.lit-database::before {
    content: '\\ea79';
  }
  .swim-icon.lit-debug::before {
    content: '\\ea7a';
  }
  .swim-icon.lit-devil::before {
    content: '\\ea7b';
  }
  .swim-icon.lit-disable::before {
    content: '\\ea7c';
  }
  .swim-icon.lit-document::before {
    content: '\\ea7d';
  }
  .swim-icon.lit-documentation::before {
    content: '\\ea7e';
  }
  .swim-icon.lit-domain::before {
    content: '\\ea7f';
  }
  .swim-icon.lit-dots-horz::before {
    content: '\\ea80';
  }
  .swim-icon.lit-dots-vert-round::before {
    content: '\\ea81';
  }
  .swim-icon.lit-dots-vert::before {
    content: '\\ea82';
  }
  .swim-icon.lit-double-down::before {
    content: '\\ea83';
  }
  .swim-icon.lit-double-left::before {
    content: '\\ea84';
  }
  .swim-icon.lit-double-right::before {
    content: '\\ea85';
  }
  .swim-icon.lit-double-up::before {
    content: '\\ea86';
  }
  .swim-icon.lit-downgrade-horizontal::before {
    content: '\\ea87';
  }
  .swim-icon.lit-downgrade::before {
    content: '\\ea88';
  }
  .swim-icon.lit-download-outline-large::before {
    content: '\\ea89';
  }
  .swim-icon.lit-download-outline-small::before {
    content: '\\ea8a';
  }
  .swim-icon.lit-download-outline::before {
    content: '\\ea8b';
  }
  .swim-icon.lit-drag::before {
    content: '\\ea8c';
  }
  .swim-icon.lit-edit-app::before {
    content: '\\ea8d';
  }
  .swim-icon.lit-edit-outline-large::before {
    content: '\\ea8e';
  }
  .swim-icon.lit-edit-outline-small::before {
    content: '\\ea8f';
  }
  .swim-icon.lit-edit-outline::before {
    content: '\\ea90';
  }
  .swim-icon.lit-edit::before {
    content: '\\ea91';
  }
  .swim-icon.lit-email::before {
    content: '\\ea92';
  }
  .swim-icon.lit-enrich-small::before {
    content: '\\ea93';
  }
  .swim-icon.lit-escalate::before {
    content: '\\ea94';
  }
  .swim-icon.lit-events-outline-small::before {
    content: '\\ea95';
  }
  .swim-icon.lit-events-outline::before {
    content: '\\ea96';
  }
  .swim-icon.lit-expand::before {
    content: '\\ea97';
  }
  .swim-icon.lit-explore::before {
    content: '\\ea98';
  }
  .swim-icon.lit-export-filled::before {
    content: '\\ea99';
  }
  .swim-icon.lit-export-outline-large::before {
    content: '\\ea9a';
  }
  .swim-icon.lit-export-outline-small::before {
    content: '\\ea9b';
  }
  .swim-icon.lit-export-outline::before {
    content: '\\ea9c';
  }
  .swim-icon.lit-export::before {
    content: '\\ea9d';
  }
  .swim-icon.lit-eye-disabled::before {
    content: '\\ea9e';
  }
  .swim-icon.lit-eye-hidden::before {
    content: '\\ea9f';
  }
  .swim-icon.lit-eye::before {
    content: '\\eaa0';
  }
  .swim-icon.lit-field-created-by::before {
    content: '\\eaa1';
  }
  .swim-icon.lit-field-created-date::before {
    content: '\\eaa2';
  }
  .swim-icon.lit-field-date::before {
    content: '\\eaa3';
  }
  .swim-icon.lit-field-double-select::before {
    content: '\\eaa4';
  }
  .swim-icon.lit-field-dynamic::before {
    content: '\\eaa5';
  }
  .swim-icon.lit-field-edited-by::before {
    content: '\\eaa6';
  }
  .swim-icon.lit-field-edited-date::before {
    content: '\\eaa7';
  }
  .swim-icon.lit-field-grid::before {
    content: '\\eaa8';
  }
  .swim-icon.lit-field-html::before {
    content: '\\eaa9';
  }
  .swim-icon.lit-field-json::before {
    content: '\\eaaa';
  }
  .swim-icon.lit-field-list-small::before {
    content: '\\eaab';
  }
  .swim-icon.lit-field-list::before {
    content: '\\eaac';
  }
  .swim-icon.lit-field-lists::before {
    content: '\\eaad';
  }
  .swim-icon.lit-field-multiselect::before {
    content: '\\eaae';
  }
  .swim-icon.lit-field-number::before {
    content: '\\eaaf';
  }
  .swim-icon.lit-field-numeric::before {
    content: '\\eab0';
  }
  .swim-icon.lit-field-richtext::before {
    content: '\\eab1';
  }
  .swim-icon.lit-field-single-select::before {
    content: '\\eab2';
  }
  .swim-icon.lit-field-singleline::before {
    content: '\\eab3';
  }
  .swim-icon.lit-field-text::before {
    content: '\\eab4';
  }
  .swim-icon.lit-field-textarea::before {
    content: '\\eab5';
  }
  .swim-icon.lit-field-textual::before {
    content: '\\eab6';
  }
  .swim-icon.lit-field-users::before {
    content: '\\eab7';
  }
  .swim-icon.lit-filter-bar::before {
    content: '\\eab8';
  }
  .swim-icon.lit-filter::before {
    content: '\\eab9';
  }
  .swim-icon.lit-find-page::before {
    content: '\\eaba';
  }
  .swim-icon.lit-flame::before {
    content: '\\eabb';
  }
  .swim-icon.lit-folder-closed-small::before {
    content: '\\eabc';
  }
  .swim-icon.lit-folder-open-small::before {
    content: '\\eabd';
  }
  .swim-icon.lit-folder::before {
    content: '\\eabe';
  }
  .swim-icon.lit-folders::before {
    content: '\\eabf';
  }
  .swim-icon.lit-font::before {
    content: '\\eac0';
  }
  .swim-icon.lit-format-indent-decrease::before {
    content: '\\eac1';
  }
  .swim-icon.lit-format-indent-increase::before {
    content: '\\eac2';
  }
  .swim-icon.lit-formula::before {
    content: '\\eac3';
  }
  .swim-icon.lit-forward-arrow-filled::before {
    content: '\\eac4';
  }
  .swim-icon.lit-forward-arrow::before {
    content: '\\eac5';
  }
  .swim-icon.lit-full-align::before {
    content: '\\eac6';
  }
  .swim-icon.lit-gauge::before {
    content: '\\eac7';
  }
  .swim-icon.lit-gear-small::before {
    content: '\\eac8';
  }
  .swim-icon.lit-gear-square::before {
    content: '\\eac9';
  }
  .swim-icon.lit-gear::before {
    content: '\\eaca';
  }
  .swim-icon.lit-globe::before {
    content: '\\eacb';
  }
  .swim-icon.lit-graph-alt1::before {
    content: '\\eacc';
  }
  .swim-icon.lit-graph::before {
    content: '\\eacd';
  }
  .swim-icon.lit-grid-view::before {
    content: '\\eace';
  }
  .swim-icon.lit-hand::before {
    content: '\\eacf';
  }
  .swim-icon.lit-handle::before {
    content: '\\ead0';
  }
  .swim-icon.lit-heat::before {
    content: '\\ead1';
  }
  .swim-icon.lit-helper::before {
    content: '\\ead2';
  }
  .swim-icon.lit-history::before {
    content: '\\ead3';
  }
  .swim-icon.lit-horz-bar-graph-grouped::before {
    content: '\\ead4';
  }
  .swim-icon.lit-horz-stacked-bar::before {
    content: '\\ead5';
  }
  .swim-icon.lit-html-code::before {
    content: '\\ead6';
  }
  .swim-icon.lit-icon-chart-bar-horizontal::before {
    content: '\\ead7';
  }
  .swim-icon.lit-icon-chart-horz-bar::before {
    content: '\\ead8';
  }
  .swim-icon.lit-import-outline-large::before {
    content: '\\ead9';
  }
  .swim-icon.lit-import-outline-small::before {
    content: '\\eada';
  }
  .swim-icon.lit-import-outline::before {
    content: '\\eadb';
  }
  .swim-icon.lit-info-filled-2::before {
    content: '\\eadc';
  }
  .swim-icon.lit-info-filled-small::before {
    content: '\\eadd';
  }
  .swim-icon.lit-info-filled::before {
    content: '\\eade';
  }
  .swim-icon.lit-ingest-small::before {
    content: '\\eadf';
  }
  .swim-icon.lit-inspect::before {
    content: '\\eae0';
  }
  .swim-icon.lit-integration::before {
    content: '\\eae1';
  }
  .swim-icon.lit-integrations::before {
    content: '\\eae2';
  }
  .swim-icon.lit-ip::before {
    content: '\\eae3';
  }
  .swim-icon.lit-italic::before {
    content: '\\eae4';
  }
  .swim-icon.lit-key-outline-small::before {
    content: '\\eae5';
  }
  .swim-icon.lit-key-outline::before {
    content: '\\eae6';
  }
  .swim-icon.lit-key::before {
    content: '\\eae7';
  }
  .swim-icon.lit-keyboard-return::before {
    content: '\\eae8';
  }
  .swim-icon.lit-keyboard::before {
    content: '\\eae9';
  }
  .swim-icon.lit-layer::before {
    content: '\\eaea';
  }
  .swim-icon.lit-left-align::before {
    content: '\\eaeb';
  }
  .swim-icon.lit-library::before {
    content: '\\eaec';
  }
  .swim-icon.lit-line-chart::before {
    content: '\\eaed';
  }
  .swim-icon.lit-line-graph::before {
    content: '\\eaee';
  }
  .swim-icon.lit-linear-gauge::before {
    content: '\\eaef';
  }
  .swim-icon.lit-link::before {
    content: '\\eaf0';
  }
  .swim-icon.lit-list-1::before {
    content: '\\eaf1';
  }
  .swim-icon.lit-list-view::before {
    content: '\\eaf2';
  }
  .swim-icon.lit-list::before {
    content: '\\eaf3';
  }
  .swim-icon.lit-loading::before {
    content: '\\eaf4';
  }
  .swim-icon.lit-locate-filled::before {
    content: '\\eaf5';
  }
  .swim-icon.lit-locate-outline-large::before {
    content: '\\eaf6';
  }
  .swim-icon.lit-locate-outline::before {
    content: '\\eaf7';
  }
  .swim-icon.lit-location::before {
    content: '\\eaf8';
  }
  .swim-icon.lit-lock-sm::before {
    content: '\\eaf9';
  }
  .swim-icon.lit-lock::before {
    content: '\\eafa';
  }
  .swim-icon.lit-mail-1::before {
    content: '\\eafb';
  }
  .swim-icon.lit-mail::before {
    content: '\\eafc';
  }
  .swim-icon.lit-map::before {
    content: '\\eafd';
  }
  .swim-icon.lit-marketplace::before {
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
  .swim-icon.lit-minus::before {
    content: '\\eb02';
  }
  .swim-icon.lit-money::before {
    content: '\\eb03';
  }
  .swim-icon.lit-mouse-hold::before {
    content: '\\eb04';
  }
  .swim-icon.lit-multi-line::before {
    content: '\\eb05';
  }
  .swim-icon.lit-new-app::before {
    content: '\\eb06';
  }
  .swim-icon.lit-notation-arrow-down-left::before {
    content: '\\eb07';
  }
  .swim-icon.lit-notation-arrow-up::before {
    content: '\\eb08';
  }
  .swim-icon.lit-numbered-list::before {
    content: '\\eb09';
  }
  .swim-icon.lit-open::before {
    content: '\\eb0a';
  }
  .swim-icon.lit-orchestration::before {
    content: '\\eb0b';
  }
  .swim-icon.lit-paragraph::before {
    content: '\\eb0c';
  }
  .swim-icon.lit-pause-circle::before {
    content: '\\eb0d';
  }
  .swim-icon.lit-pause::before {
    content: '\\eb0e';
  }
  .swim-icon.lit-percent-gauge::before {
    content: '\\eb0f';
  }
  .swim-icon.lit-phone::before {
    content: '\\eb10';
  }
  .swim-icon.lit-photo::before {
    content: '\\eb11';
  }
  .swim-icon.lit-pie-chart::before {
    content: '\\eb12';
  }
  .swim-icon.lit-pin::before {
    content: '\\eb13';
  }
  .swim-icon.lit-plane::before {
    content: '\\eb14';
  }
  .swim-icon.lit-play-circle::before {
    content: '\\eb15';
  }
  .swim-icon.lit-play::before {
    content: '\\eb16';
  }
  .swim-icon.lit-playbook-outline-small::before {
    content: '\\eb17';
  }
  .swim-icon.lit-playbook-outline::before {
    content: '\\eb18';
  }
  .swim-icon.lit-plugin-outline-small::before {
    content: '\\eb19';
  }
  .swim-icon.lit-plugin-outline::before {
    content: '\\eb1a';
  }
  .swim-icon.lit-plugin::before {
    content: '\\eb1b';
  }
  .swim-icon.lit-plus-bold::before {
    content: '\\eb1c';
  }
  .swim-icon.lit-plus::before {
    content: '\\eb1d';
  }
  .swim-icon.lit-prev::before {
    content: '\\eb1e';
  }
  .swim-icon.lit-printer::before {
    content: '\\eb1f';
  }
  .swim-icon.lit-profile-filled::before {
    content: '\\eb20';
  }
  .swim-icon.lit-profile::before {
    content: '\\eb21';
  }
  .swim-icon.lit-promote-horizontal::before {
    content: '\\eb22';
  }
  .swim-icon.lit-promote::before {
    content: '\\eb23';
  }
  .swim-icon.lit-question-filled-sm::before {
    content: '\\eb24';
  }
  .swim-icon.lit-question-filled::before {
    content: '\\eb25';
  }
  .swim-icon.lit-question::before {
    content: '\\eb26';
  }
  .swim-icon.lit-radio-button::before {
    content: '\\eb27';
  }
  .swim-icon.lit-redo-all::before {
    content: '\\eb28';
  }
  .swim-icon.lit-redo::before {
    content: '\\eb29';
  }
  .swim-icon.lit-reference-grid::before {
    content: '\\eb2a';
  }
  .swim-icon.lit-reference-multi::before {
    content: '\\eb2b';
  }
  .swim-icon.lit-reference-single::before {
    content: '\\eb2c';
  }
  .swim-icon.lit-reference-tree::before {
    content: '\\eb2d';
  }
  .swim-icon.lit-reference::before {
    content: '\\eb2e';
  }
  .swim-icon.lit-refresh-circle::before {
    content: '\\eb2f';
  }
  .swim-icon.lit-refresh-small::before {
    content: '\\eb30';
  }
  .swim-icon.lit-refresh::before {
    content: '\\eb31';
  }
  .swim-icon.lit-remove-edge::before {
    content: '\\eb32';
  }
  .swim-icon.lit-remove-node::before {
    content: '\\eb33';
  }
  .swim-icon.lit-remove-users::before {
    content: '\\eb34';
  }
  .swim-icon.lit-remove::before {
    content: '\\eb35';
  }
  .swim-icon.lit-repeat::before {
    content: '\\eb36';
  }
  .swim-icon.lit-replace::before {
    content: '\\eb37';
  }
  .swim-icon.lit-reports-outline::before {
    content: '\\eb38';
  }
  .swim-icon.lit-reports::before {
    content: '\\eb39';
  }
  .swim-icon.lit-resize::before {
    content: '\\eb3a';
  }
  .swim-icon.lit-right-align::before {
    content: '\\eb3b';
  }
  .swim-icon.lit-rocket::before {
    content: '\\eb3c';
  }
  .swim-icon.lit-rotate::before {
    content: '\\eb3d';
  }
  .swim-icon.lit-rule-outline::before {
    content: '\\eb3e';
  }
  .swim-icon.lit-runner::before {
    content: '\\eb3f';
  }
  .swim-icon.lit-runs-outline-small::before {
    content: '\\eb40';
  }
  .swim-icon.lit-runs-outline::before {
    content: '\\eb41';
  }
  .swim-icon.lit-sankey::before {
    content: '\\eb42';
  }
  .swim-icon.lit-save-outline-large::before {
    content: '\\eb43';
  }
  .swim-icon.lit-save-outline-small::before {
    content: '\\eb44';
  }
  .swim-icon.lit-save-outline::before {
    content: '\\eb45';
  }
  .swim-icon.lit-save::before {
    content: '\\eb46';
  }
  .swim-icon.lit-screen-1::before {
    content: '\\eb47';
  }
  .swim-icon.lit-screen::before {
    content: '\\eb48';
  }
  .swim-icon.lit-search::before {
    content: '\\eb49';
  }
  .swim-icon.lit-section::before {
    content: '\\eb4a';
  }
  .swim-icon.lit-select-all::before {
    content: '\\eb4b';
  }
  .swim-icon.lit-select-user::before {
    content: '\\eb4c';
  }
  .swim-icon.lit-select-users::before {
    content: '\\eb4d';
  }
  .swim-icon.lit-sensor-outline-small::before {
    content: '\\eb4e';
  }
  .swim-icon.lit-sensor-outline::before {
    content: '\\eb4f';
  }
  .swim-icon.lit-server::before {
    content: '\\eb50';
  }
  .swim-icon.lit-shield::before {
    content: '\\eb51';
  }
  .swim-icon.lit-shrink::before {
    content: '\\eb52';
  }
  .swim-icon.lit-skip::before {
    content: '\\eb53';
  }
  .swim-icon.lit-slide-left::before {
    content: '\\eb54';
  }
  .swim-icon.lit-slide-right::before {
    content: '\\eb55';
  }
  .swim-icon.lit-sliders::before {
    content: '\\eb56';
  }
  .swim-icon.lit-smartphone::before {
    content: '\\eb57';
  }
  .swim-icon.lit-smiley-frown::before {
    content: '\\eb58';
  }
  .swim-icon.lit-snapshot::before {
    content: '\\eb59';
  }
  .swim-icon.lit-solution::before {
    content: '\\eb5a';
  }
  .swim-icon.lit-sort-ascending::before {
    content: '\\eb5b';
  }
  .swim-icon.lit-sort-descending::before {
    content: '\\eb5c';
  }
  .swim-icon.lit-spaces-list::before {
    content: '\\eb5d';
  }
  .swim-icon.lit-spaces-outline-large::before {
    content: '\\eb5e';
  }
  .swim-icon.lit-spaces-outline::before {
    content: '\\eb5f';
  }
  .swim-icon.lit-spaces::before {
    content: '\\eb60';
  }
  .swim-icon.lit-speedometer::before {
    content: '\\eb61';
  }
  .swim-icon.lit-split-handle::before {
    content: '\\eb62';
  }
  .swim-icon.lit-square-filled::before {
    content: '\\eb63';
  }
  .swim-icon.lit-square::before {
    content: '\\eb64';
  }
  .swim-icon.lit-star-filled::before {
    content: '\\eb65';
  }
  .swim-icon.lit-star::before {
    content: '\\eb66';
  }
  .swim-icon.lit-stars::before {
    content: '\\eb67';
  }
  .swim-icon.lit-stopwatch::before {
    content: '\\eb68';
  }
  .swim-icon.lit-superscript::before {
    content: '\\eb69';
  }
  .swim-icon.lit-swap::before {
    content: '\\eb6a';
  }
  .swim-icon.lit-switch::before {
    content: '\\eb6b';
  }
  .swim-icon.lit-system-diagnostics-2::before {
    content: '\\eb6c';
  }
  .swim-icon.lit-system-diagnostics::before {
    content: '\\eb6d';
  }
  .swim-icon.lit-table::before {
    content: '\\eb6e';
  }
  .swim-icon.lit-tabs::before {
    content: '\\eb6f';
  }
  .swim-icon.lit-tag-filled::before {
    content: '\\eb70';
  }
  .swim-icon.lit-tags-outline::before {
    content: '\\eb71';
  }
  .swim-icon.lit-target::before {
    content: '\\eb72';
  }
  .swim-icon.lit-task-outline::before {
    content: '\\eb73';
  }
  .swim-icon.lit-thumb-down-filled::before {
    content: '\\eb74';
  }
  .swim-icon.lit-thumb-down-outline-large::before {
    content: '\\eb75';
  }
  .swim-icon.lit-thumb-down-outline::before {
    content: '\\eb76';
  }
  .swim-icon.lit-thumb-up-filled::before {
    content: '\\eb77';
  }
  .swim-icon.lit-thumb-up-outline-large::before {
    content: '\\eb78';
  }
  .swim-icon.lit-thumb-up-outline::before {
    content: '\\eb79';
  }
  .swim-icon.lit-tracking-id::before {
    content: '\\eb7a';
  }
  .swim-icon.lit-transfer::before {
    content: '\\eb7b';
  }
  .swim-icon.lit-trash::before {
    content: '\\eb7c';
  }
  .swim-icon.lit-tree-collapse::before {
    content: '\\eb7d';
  }
  .swim-icon.lit-tree-expand::before {
    content: '\\eb7e';
  }
  .swim-icon.lit-tree::before {
    content: '\\eb7f';
  }
  .swim-icon.lit-trend-down::before {
    content: '\\eb80';
  }
  .swim-icon.lit-trend-level::before {
    content: '\\eb81';
  }
  .swim-icon.lit-trend-up::before {
    content: '\\eb82';
  }
  .swim-icon.lit-trending::before {
    content: '\\eb83';
  }
  .swim-icon.lit-underline::before {
    content: '\\eb84';
  }
  .swim-icon.lit-undo-all::before {
    content: '\\eb85';
  }
  .swim-icon.lit-undo::before {
    content: '\\eb86';
  }
  .swim-icon.lit-unlink::before {
    content: '\\eb87';
  }
  .swim-icon.lit-upload-outline-large::before {
    content: '\\eb88';
  }
  .swim-icon.lit-upload-outline-small::before {
    content: '\\eb89';
  }
  .swim-icon.lit-upload-outline::before {
    content: '\\eb8a';
  }
  .swim-icon.lit-user-add::before {
    content: '\\eb8b';
  }
  .swim-icon.lit-user-circle::before {
    content: '\\eb8c';
  }
  .swim-icon.lit-user-groups::before {
    content: '\\eb8d';
  }
  .swim-icon.lit-user::before {
    content: '\\eb8e';
  }
  .swim-icon.lit-users::before {
    content: '\\eb8f';
  }
  .swim-icon.lit-version::before {
    content: '\\eb90';
  }
  .swim-icon.lit-vert-bar-graph-grouped::before {
    content: '\\eb91';
  }
  .swim-icon.lit-vert-full-stack-bar::before {
    content: '\\eb92';
  }
  .swim-icon.lit-view-code::before {
    content: '\\eb93';
  }
  .swim-icon.lit-view-designer::before {
    content: '\\eb94';
  }
  .swim-icon.lit-view-split::before {
    content: '\\eb95';
  }
  .swim-icon.lit-wand::before {
    content: '\\eb96';
  }
  .swim-icon.lit-warning-filled-sm::before {
    content: '\\eb97';
  }
  .swim-icon.lit-warning-filled::before {
    content: '\\eb98';
  }
  .swim-icon.lit-warning-thin::before {
    content: '\\eb99';
  }
  .swim-icon.lit-web-api::before {
    content: '\\eb9a';
  }
  .swim-icon.lit-webhook-outline-large::before {
    content: '\\eb9b';
  }
  .swim-icon.lit-webhook-outline-small::before {
    content: '\\eb9c';
  }
  .swim-icon.lit-webhook-outline::before {
    content: '\\eb9d';
  }
  .swim-icon.lit-widget::before {
    content: '\\eb9e';
  }
  .swim-icon.lit-worker::before {
    content: '\\eb9f';
  }
  .swim-icon.lit-workflow-alternate-large::before {
    content: '\\eba0';
  }
  .swim-icon.lit-workflow-alternate-small::before {
    content: '\\eba1';
  }
  .swim-icon.lit-workflow-alternate::before {
    content: '\\eba2';
  }
  .swim-icon.lit-workflow::before {
    content: '\\eba3';
  }
  .swim-icon.lit-workspaces::before {
    content: '\\eba4';
  }
  .swim-icon.lit-workstation::before {
    content: '\\eba5';
  }
  .swim-icon.lit-wrench::before {
    content: '\\eba6';
  }
  .swim-icon.lit-x-filled::before {
    content: '\\eba7';
  }
  .swim-icon.lit-x-small::before {
    content: '\\eba8';
  }
  .swim-icon.lit-x::before {
    content: '\\eba9';
  }
  .swim-icon.lit-maximize::before {
    content: '\\ebaa';
  }
  .swim-icon.lit-minimize::before {
    content: '\\ebab';
  }
`,mr=w`
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

  /* Modifier: badge overlay (small icon at top-right), match lit-ui icons-effects */
  .icon-fx-badge {
    font-size: 0.25em !important;
    position: relative;
    top: -0.5em;
    left: 0.5em;
    width: auto;
    height: auto;
  }

  /* Modifier: red color for overlay icon (match lit-ui) */
  .text-red {
    color: var(--red-500);
  }

  /* Font icon base (glyphs in icon-font-glyphs.ts); uses same font as ngx-ui ('ngx-icon'). */
  .swim-icon,
  .swim-icon__i.swim-icon {
    display: inline-block;
    align-items: center;
    justify-content: center;
    width: 1em;
    height: 1em;
    font: normal normal normal 1em/1 'ngx-icon';
    font-family: 'ngx-icon', sans-serif;
    flex-shrink: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Center the glyph regardless of font metrics (fixes vertical misalignment) */
  .swim-icon::before,
  .swim-icon__i.swim-icon::before {
    display: block;
    line-height: 1;
  }

  [class^='icon-']:before,
  [class*='icon-']:before {
    line-height: 1;
    font: normal normal normal 1em/1 'ngx-icon';
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

  ${pr}
`,br=s=>`swim-icon ${s.trim().split(" ").map(t=>{const[i,o]=t.split(":");return i.length?`${i} ${i}-${o}`:o}).join(" ")}`;class gr{constructor(){this._defaultFontSetClass="lit",this._iconMap=new Map}setDefaultFontSetClass(e){return this._defaultFontSetClass=e,this._defaultFontSetClass}get(e,t){return this.lookup(e,t).map(i=>br(i))}lookup(e,t){const i=t??this._defaultFontSetClass;return(Array.isArray(e)?e:[e]).reduce((o,n)=>{const r=this._expandKeys(n,i).map(l=>{const c=this._iconMap.get(l);return c&&c.length===1?c[0]:l}).join(" ");return o.concat(this._iconMap.get(r)||[r])},[])}add(e,t){const i=this._expandKeys(e,this._defaultFontSetClass).join(" "),o=this.lookup(t);this._iconMap.set(i,o)}_expandKeys(e,t){return e.split(" ").map(i=>i.includes(":")?i:`${t}:${i}`)}}const fr=new gr;var _r=Object.defineProperty,Bt=(s,e,t,i)=>{for(var o=void 0,n=s.length-1,r;n>=0;n--)(r=s[n])&&(o=r(e,t,o)||o);return o&&_r(e,t,o),o};const ds="swim-icon",io=class io extends y{constructor(){super(...arguments),this.fontIcon="",this.alt="",this.fontSet="lit",this.iconClass="",this._cssClasses=[],this._iconClassTokensOnHost=[]}connectedCallback(){super.connectedCallback(),this._updateFontIcon()}updated(e){super.updated(e),(e.has("fontIcon")||e.has("fontSet"))&&this._updateFontIcon(),e.has("iconClass")&&this._syncIconClassToHost()}_syncIconClassToHost(){var t;const e=(((t=this.iconClass)==null?void 0:t.trim())??"").split(/\s+/).filter(Boolean);this._iconClassTokensOnHost.forEach(i=>this.classList.remove(i)),e.forEach(i=>this.classList.add(i)),this._iconClassTokensOnHost=e}_parseFontIcon(e){if(Array.isArray(e))return e.filter(Boolean);if(typeof e!="string"||!e)return[];const t=e.trim();if(t.startsWith("["))try{const i=JSON.parse(t);return Array.isArray(i)?i:[t]}catch{return[t]}return[t]}_updateFontIcon(){const e=this._parseFontIcon(this.fontIcon);if(e.length===0){this._cssClasses=[];return}this._cssClasses=fr.get(e,this.fontSet)}render(){var n;const e=this._cssClasses,t=!!this.alt,i=((n=this.iconClass)==null?void 0:n.trim())??"",o=i?` ${i}`:"";return!e||e.length===0?d`
        <span
          part="icon"
          class="${i}"
          role="${t?"img":"presentation"}"
          aria-label="${t?this.alt:g}"
          aria-hidden="${t?"false":"true"}"
        >
          <slot></slot>
        </span>
      `:e.length===1?d`
        <i
          part="icon"
          class="swim-icon__i ${e[0]}${o}"
          role="${t?"img":"presentation"}"
          aria-label="${t?this.alt:g}"
          aria-hidden="${t?"false":"true"}"
        ></i>
      `:d`
      <span
        class="swim-icon__stack"
        role="${t?"img":"presentation"}"
        aria-label="${t?this.alt:g}"
        aria-hidden="${t?"false":"true"}"
      >
        ${e.map((r,l)=>d`<i part="icon icon-${l}" class="swim-icon__i swim-icon__i--${l} ${r}${o}"></i>`)}
      </span>
    `}};io.styles=[$,mr];let Ve=io;Bt([a({type:String,attribute:"font-icon"})],Ve.prototype,"fontIcon");Bt([a({type:String})],Ve.prototype,"alt");Bt([a({type:String,attribute:"font-set"})],Ve.prototype,"fontSet");Bt([a({type:String,attribute:"icon-class"})],Ve.prototype,"iconClass");Bt([_()],Ve.prototype,"_cssClasses");customElements.get(ds)||customElements.define(ds,Ve);var vr=Object.defineProperty,wr=Object.getOwnPropertyDescriptor,we=(s,e,t,i)=>{for(var o=i>1?void 0:i?wr(e,t):e,n=s.length-1,r;n>=0;n--)(r=s[n])&&(o=(i?r(e,t,o):r(o))||o);return i&&o&&vr(e,t,o),o};const hs="swim-button",di=class di extends y{constructor(){super(),this.variant="default",this.size="medium",this._disabled=!1,this._state=be.Active,this.type="button",this._inProgress=!1,this._success=!1,this._fail=!1,this._internals=this.attachInternals()}get disabled(){return this._disabled}set disabled(e){this._disabled=f(e)}get state(){return this._state}set state(e){this._state=e,this._updateStateFlags()}get timeout(){return this._timeout}set timeout(e){this._timeout=e===void 0?void 0:T(e)}get promise(){return this._promise}set promise(e){this._promise=e,this._handlePromise()}connectedCallback(){super.connectedCallback(),this._updateState()}disconnectedCallback(){super.disconnectedCallback(),this._clearTimer()}render(){return d`
      <button part="button" type="button" ?disabled="${this.disabled}" @click="${this._handleClick}">
        <span class="content">
          <slot></slot>
        </span>
        <span class="state-icon">${this._renderStateIcon()}</span>
      </button>
    `}_renderStateIcon(){return this._inProgress?d`<swim-icon class="state-icon" font-icon="loading"></swim-icon>`:this._success?d`<swim-icon class="state-icon" font-icon="check"></swim-icon>`:this._fail?d`<swim-icon class="state-icon" font-icon="x"></swim-icon>`:g}_handleClick(e){if(this.disabled){e.stopPropagation(),e.preventDefault();return}const t=this._internals.form;t&&(this.type==="submit"?t.requestSubmit():this.type==="reset"&&t.reset())}_updateStateFlags(){this._inProgress=this._state===be.InProgress,this._success=this._state===be.Success,this._fail=this._state===be.Fail}_updateState(){this._state||(this.state=be.Active)}_scheduleReturnToActive(){const e=this.timeout??3e3;e<=0||(this._clearTimer(),this._timer=window.setTimeout(()=>{this.state=be.Active},e))}_handlePromise(){this._promise&&(this.state=be.InProgress,this._promise.then(()=>{this.state=be.Success,this._scheduleReturnToActive()}).catch(()=>{this.state=be.Fail,this._scheduleReturnToActive()}))}_clearTimer(){this._timer!==void 0&&(clearTimeout(this._timer),this._timer=void 0)}};di.styles=[$,ur],di.formAssociated=!0;let Q=di;we([a({type:String,reflect:!0})],Q.prototype,"variant",2);we([a({type:String,reflect:!0})],Q.prototype,"size",2);we([a({type:Boolean,reflect:!0})],Q.prototype,"disabled",1);we([a({type:String,reflect:!0})],Q.prototype,"state",1);we([a({type:String})],Q.prototype,"type",2);we([a({type:Number})],Q.prototype,"timeout",1);we([a({attribute:!1})],Q.prototype,"promise",1);we([_()],Q.prototype,"_inProgress",2);we([_()],Q.prototype,"_success",2);we([_()],Q.prototype,"_fail",2);customElements.get(hs)||customElements.define(hs,Q);const yr=w`
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
`;var kn=(s=>(s.Horizontal="horizontal",s.Vertical="vertical",s))(kn||{}),$n=(s=>(s.Contained="contained",s.Text="text",s))($n||{}),En=(s=>(s.Default="default",s.Primary="primary",s))(En||{}),xr=Object.defineProperty,Wi=(s,e,t,i)=>{for(var o=void 0,n=s.length-1,r;n>=0;n--)(r=s[n])&&(o=r(e,t,o)||o);return o&&xr(e,t,o),o};const us="swim-button-group",oo=class oo extends y{constructor(){super(...arguments),this.orientation=kn.Horizontal,this.variant=$n.Contained,this.buttonGroupStyle=En.Default}render(){return d`<slot></slot>`}};oo.styles=[$,yr];let ht=oo;Wi([a({type:String,reflect:!0})],ht.prototype,"orientation");Wi([a({type:String,reflect:!0})],ht.prototype,"variant");Wi([a({attribute:"button-group-style",type:String,reflect:!0})],ht.prototype,"buttonGroupStyle");customElements.get(us)||customElements.define(us,ht);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Fe={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4},Ki=s=>(...e)=>({_$litDirective$:s,values:e});class Zi{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{I:kr}=ar,$r=s=>s.strings===void 0,ps=()=>document.createComment(""),yt=(s,e,t)=>{var n;const i=s._$AA.parentNode,o=e===void 0?s._$AB:e._$AA;if(t===void 0){const r=i.insertBefore(ps(),o),l=i.insertBefore(ps(),o);t=new kr(r,l,s,s.options)}else{const r=t._$AB.nextSibling,l=t._$AM,c=l!==s;if(c){let h;(n=t._$AQ)==null||n.call(t,s),t._$AM=s,t._$AP!==void 0&&(h=s._$AU)!==l._$AU&&t._$AP(h)}if(r!==o||c){let h=t._$AA;for(;h!==r;){const m=h.nextSibling;i.insertBefore(h,o),h=m}}}return t},qe=(s,e,t=s)=>(s._$AI(e,t),s),Er={},Cn=(s,e=Er)=>s._$AH=e,Cr=s=>s._$AH,zi=s=>{s._$AR(),s._$AA.remove()};/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ms=Ki(class extends Zi{constructor(s){if(super(s),s.type!==Fe.PROPERTY&&s.type!==Fe.ATTRIBUTE&&s.type!==Fe.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!$r(s))throw Error("`live` bindings can only contain a single expression")}render(s){return s}update(s,[e]){if(e===ae||e===g)return e;const t=s.element,i=s.name;if(s.type===Fe.PROPERTY){if(e===t[i])return ae}else if(s.type===Fe.BOOLEAN_ATTRIBUTE){if(!!e===t.hasAttribute(i))return ae}else if(s.type===Fe.ATTRIBUTE&&t.getAttribute(i)===e+"")return ae;return Cn(s),e}});/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Se=s=>s??g,gt=w`
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
`,Sr=w`
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
`;var De=(s=>(s.text="text",s.password="password",s.email="email",s.number="number",s.tel="tel",s.url="url",s.textarea="textarea",s))(De||{}),Ji=(s=>(s.legacy="legacy",s.fill="fill",s))(Ji||{}),Xi=(s=>(s.sm="sm",s.md="md",s.lg="lg",s))(Xi||{}),Dr=Object.defineProperty,Ar=Object.getOwnPropertyDescriptor,A=(s,e,t,i)=>{for(var o=i>1?void 0:i?Ar(e,t):e,n=s.length-1,r;n>=0;n--)(r=s[n])&&(o=(i?r(e,t,o):r(o))||o);return i&&o&&Dr(e,t,o),o};const bs="swim-input",hi=class hi extends y{constructor(){super(),this.type=De.text,this.label="",this.placeholder="",this.hint="",this._value="",this.name="",this.id=`swim-input-${Math.random().toString(36).substr(2,9)}`,this._disabled=!1,this._readonly=!1,this._required=!1,this._autofocus=!1,this.autocomplete="off",this.appearance=Ji.legacy,this.size=Xi.sm,this._withMargin=!0,this._withHint=!0,this._passwordToggleEnabled=!1,this.textareaRows=3,this.requiredIndicator="*",this._focused=!1,this._passwordVisible=!1,this._touched=!1,this._dirty=!1,this._invalid=!1,this._internals=this.attachInternals()}get value(){return this._value}set value(e){const t=this._value;this._value=e,this._internals.setFormValue(e),this.requestUpdate("value",t),this._updateActiveState()}get disabled(){return this._disabled}set disabled(e){this._disabled=f(e)}get readonly(){return this._readonly}set readonly(e){this._readonly=f(e)}get required(){return this._required}set required(e){this._required=f(e)}get autofocus(){return this._autofocus}set autofocus(e){this._autofocus=f(e)}get marginless(){return!this._withMargin}set marginless(e){this._withMargin=!f(e)}get withHint(){return this._withHint}set withHint(e){this._withHint=f(e)}get passwordToggleEnabled(){return this._passwordToggleEnabled}set passwordToggleEnabled(e){this._passwordToggleEnabled=f(e)}connectedCallback(){super.connectedCallback(),this._updateActiveState()}firstUpdated(){this.autofocus&&this.inputElement&&setTimeout(()=>{this.inputElement.focus()})}focus(e){var t;(t=this.inputElement)==null||t.focus(e)}updated(e){super.updated(e),e.has("value")&&this._updateActiveState(),(e.has("required")||e.has("min")||e.has("max"))&&this._validate()}render(){const e=this.type===De.textarea,t=this.type===De.password&&this.passwordToggleEnabled&&!this.disabled,i=this.type===De.number&&!this.disabled,o=this._passwordVisible?De.text:this.type;return d`
      <div class="input-wrap">
        <div class="input-flex-wrap">
          <slot name="prefix"></slot>
          <div class="input-flex-wrap-inner">
            <div class="input-box-wrap">
              ${e?this._renderTextarea():this._renderInput(o)}
              ${i?d`
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
              ${t?d`
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
              ${this.label} ${this.required?d`<span>${this.requiredIndicator}</span>`:g}
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
        .value="${ms(this.value)}"
        placeholder="${this.placeholder}"
        ?disabled="${this.disabled}"
        ?readonly="${this.readonly}"
        ?required="${this.required}"
        min="${Se(this.min)}"
        max="${Se(this.max)}"
        minlength="${Se(this.minlength)}"
        maxlength="${Se(this.maxlength)}"
        tabindex="${Se(this.tabindex)}"
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
        .value="${ms(this.value)}"
        placeholder="${this.placeholder}"
        ?disabled="${this.disabled}"
        ?readonly="${this.readonly}"
        ?required="${this.required}"
        rows="${this.textareaRows}"
        minlength="${Se(this.minlength)}"
        maxlength="${Se(this.maxlength)}"
        tabindex="${Se(this.tabindex)}"
        autocomplete="${this.autocomplete}"
        @input="${this._handleInput}"
        @change="${this._handleChange}"
        @focus="${this._handleFocus}"
        @blur="${this._handleBlur}"
      ></textarea>
    `}_handleInput(e){const t=e.target;this.value=t.value,this._dirty||(this._dirty=!0,this.setAttribute("dirty","")),this.dispatchEvent(new Event("input",{bubbles:!0,composed:!0}))}_handleChange(e){this._validate(),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}_handleFocus(e){this._focused=!0,this.setAttribute("focused",""),this.dispatchEvent(new FocusEvent("focus",{bubbles:!0,composed:!0}))}_handleBlur(e){this._focused=!1,this.removeAttribute("focused"),this._touched||(this._touched=!0,this.setAttribute("touched","")),this._validate(),this.dispatchEvent(new FocusEvent("blur",{bubbles:!0,composed:!0}))}_togglePassword(){var e;this._passwordVisible=!this._passwordVisible,(e=this.inputElement)==null||e.focus()}_incrementValue(e){e.preventDefault(),!this.disabled&&(this._increment(),this._spinnerTimeout=window.setTimeout(()=>{this._spinnerInterval=window.setInterval(()=>this._increment(),50)},500))}_decrementValue(e){e.preventDefault(),!this.disabled&&(this._decrement(),this._spinnerTimeout=window.setTimeout(()=>{this._spinnerInterval=window.setInterval(()=>this._decrement(),50)},500))}disconnectedCallback(){super.disconnectedCallback(),this._stopSpinner()}_stopSpinner(){this._spinnerTimeout!==void 0&&(clearTimeout(this._spinnerTimeout),this._spinnerTimeout=void 0),this._spinnerInterval!==void 0&&(clearInterval(this._spinnerInterval),this._spinnerInterval=void 0)}_increment(){if(this.inputElement&&this.type===De.number){const e=this.inputElement,t=parseFloat(e.value)||0;if(this.max!==void 0&&t>=this.max)return;const i=t+1;this.value=i.toString(),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}}_decrement(){if(this.inputElement&&this.type===De.number){const e=this.inputElement,t=parseFloat(e.value)||0;if(this.min!==void 0&&t<=this.min)return;const i=t-1;this.value=i.toString(),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}}_validate(){let e=!0;if(this.required&&!this.value&&(e=!1),this.type===De.number&&this.value){const t=parseFloat(this.value);this.min!==void 0&&t<this.min&&(e=!1),this.max!==void 0&&t>this.max&&(e=!1)}return this.minlength&&this.value.length<this.minlength&&(e=!1),this.maxlength&&this.value.length>this.maxlength&&(e=!1),this.inputElement&&(this.inputElement.validity.valid||(e=!1)),this._invalid=!e,this._invalid?(this.setAttribute("invalid",""),this._internals.setValidity({customError:!0},"Invalid input")):(this.removeAttribute("invalid"),this._internals.setValidity({})),e}_updateActiveState(){const e=this.value&&this.value.length>0,t=!!this.placeholder;this._focused||e?this.setAttribute("active",""):this.removeAttribute("active"),t?this.setAttribute("has-placeholder",""):this.removeAttribute("has-placeholder"),this.label?this.removeAttribute("no-label"):this.setAttribute("no-label","")}formResetCallback(){this.value="",this._touched=!1,this._dirty=!1,this.removeAttribute("touched"),this.removeAttribute("dirty")}formDisabledCallback(e){this.disabled=e}};hi.styles=[$,gt,Sr],hi.formAssociated=!0;let S=hi;A([K(".input-box, .input-textarea")],S.prototype,"inputElement",2);A([a({type:String})],S.prototype,"type",2);A([a({type:String})],S.prototype,"label",2);A([a({type:String})],S.prototype,"placeholder",2);A([a({type:String})],S.prototype,"hint",2);A([a({type:String})],S.prototype,"value",1);A([a({type:String})],S.prototype,"name",2);A([a({type:String})],S.prototype,"id",2);A([a({type:Boolean,reflect:!0})],S.prototype,"disabled",1);A([a({type:Boolean,reflect:!0})],S.prototype,"readonly",1);A([a({type:Boolean,reflect:!0})],S.prototype,"required",1);A([a({type:Boolean})],S.prototype,"autofocus",1);A([a({type:String})],S.prototype,"autocomplete",2);A([a({type:String,reflect:!0})],S.prototype,"appearance",2);A([a({type:String,reflect:!0})],S.prototype,"size",2);A([a({type:Boolean,reflect:!0,attribute:"marginless"})],S.prototype,"marginless",1);A([a({type:Boolean})],S.prototype,"withHint",1);A([a({type:Boolean,attribute:"password-toggle-enabled"})],S.prototype,"passwordToggleEnabled",1);A([a({type:Number})],S.prototype,"min",2);A([a({type:Number})],S.prototype,"max",2);A([a({type:Number})],S.prototype,"minlength",2);A([a({type:Number})],S.prototype,"maxlength",2);A([a({type:Number,attribute:"textarea-rows"})],S.prototype,"textareaRows",2);A([a({type:String,attribute:"required-indicator"})],S.prototype,"requiredIndicator",2);A([a({type:Number})],S.prototype,"tabindex",2);A([_()],S.prototype,"_focused",2);A([_()],S.prototype,"_passwordVisible",2);A([_()],S.prototype,"_touched",2);A([_()],S.prototype,"_dirty",2);A([_()],S.prototype,"_invalid",2);customElements.get(bs)||customElements.define(bs,S);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const gs=(s,e,t)=>{const i=new Map;for(let o=e;o<=t;o++)i.set(s[o],o);return i},Ir=Ki(class extends Zi{constructor(s){if(super(s),s.type!==Fe.CHILD)throw Error("repeat() can only be used in text expressions")}dt(s,e,t){let i;t===void 0?t=e:e!==void 0&&(i=e);const o=[],n=[];let r=0;for(const l of s)o[r]=i?i(l,r):r,n[r]=t(l,r),r++;return{values:n,keys:o}}render(s,e,t){return this.dt(s,e,t).values}update(s,[e,t,i]){const o=Cr(s),{values:n,keys:r}=this.dt(e,t,i);if(!Array.isArray(o))return this.ut=r,n;const l=this.ut??(this.ut=[]),c=[];let h,m,u=0,p=o.length-1,b=0,x=n.length-1;for(;u<=p&&b<=x;)if(o[u]===null)u++;else if(o[p]===null)p--;else if(l[u]===r[b])c[b]=qe(o[u],n[b]),u++,b++;else if(l[p]===r[x])c[x]=qe(o[p],n[x]),p--,x--;else if(l[u]===r[x])c[x]=qe(o[u],n[x]),yt(s,c[x+1],o[u]),u++,x--;else if(l[p]===r[b])c[b]=qe(o[p],n[b]),yt(s,o[u],o[p]),p--,b++;else if(h===void 0&&(h=gs(r,b,x),m=gs(l,u,p)),h.has(l[u]))if(h.has(l[p])){const B=m.get(r[b]),H=B!==void 0?o[B]:null;if(H===null){const M=yt(s,o[u]);qe(M,n[b]),c[b]=M}else c[b]=qe(H,n[b]),yt(s,o[u],H),o[B]=null;b++}else zi(o[p]),p--;else zi(o[u]),u++;for(;b<=x;){const B=yt(s,c[x+1]);qe(B,n[b]),c[b++]=B}for(;u<=p;){const B=o[u++];B!==null&&zi(B)}return this.ut=r,Cn(s,c),ae}}),Tr=w`
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
    margin-right: var(--spacing-8);
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
`;var zr=Object.defineProperty,Mr=Object.getOwnPropertyDescriptor,wi=(s,e,t,i)=>{for(var o=i>1?void 0:i?Mr(e,t):e,n=s.length-1,r;n>=0;n--)(r=s[n])&&(o=(i?r(e,t,o):r(o))||o);return i&&o&&zr(e,t,o),o};const fs="swim-option";class Pt extends y{constructor(){super(...arguments),this.name="",this._disabled=!1,this._hidden=!1}get disabled(){return this._disabled}set disabled(e){this._disabled=f(e)}get hidden(){return this._hidden}set hidden(e){this._hidden=f(e)}createRenderRoot(){return this}render(){return d``}connectedCallback(){super.connectedCallback(),this.style.display="none",this._notifyParent()}disconnectedCallback(){super.disconnectedCallback(),this._notifyParent()}updated(){this._notifyParent()}_notifyParent(){const e=this.closest("swim-select");e&&typeof e._onSlottedOptionsChange=="function"&&e._onSlottedOptionsChange()}}wi([a({type:String})],Pt.prototype,"name",2);wi([a()],Pt.prototype,"value",2);wi([a({type:Boolean,reflect:!0})],Pt.prototype,"disabled",1);wi([a({type:Boolean,reflect:!0})],Pt.prototype,"hidden",1);customElements.get(fs)||customElements.define(fs,Pt);var Lr=Object.defineProperty,Or=Object.getOwnPropertyDescriptor,z=(s,e,t,i)=>{for(var o=i>1?void 0:i?Or(e,t):e,n=s.length-1,r;n>=0;n--)(r=s[n])&&(o=(i?r(e,t,o):r(o))||o);return i&&o&&Lr(e,t,o),o};const _s="swim-select",ui=class ui extends y{constructor(){super(),this.label="",this.placeholder="Select...",this.hint="",this.emptyPlaceholder="No options available",this.filterPlaceholder="Filter options...",this.options=[],this._value=[],this.name="",this.id=`swim-select-${Math.random().toString(36).substr(2,9)}`,this._disabled=!1,this._required=!1,this.appearance=Ji.legacy,this.size=Xi.sm,this._withMargin=!0,this._withHint=!0,this._filterable=!0,this._multiple=!1,this._allowClear=!0,this.requiredIndicator="*",this._slottedOptions=[],this._open=!1,this._focused=!1,this._touched=!1,this._invalid=!1,this._filterQuery="",this._focusedIndex=-1,this._internals=this.attachInternals()}get value(){return this.multiple?this._value:this._value[0]??null}set value(e){const t=this._value;this.multiple?this._value=Array.isArray(e)?e:e?[e]:[]:this._value=e?[e]:[],this._internals.setFormValue(this.multiple?JSON.stringify(this._value):this._value[0]??""),this.requestUpdate("value",t),this._updateActiveState()}get disabled(){return this._disabled}set disabled(e){this._disabled=f(e)}get required(){return this._required}set required(e){this._required=f(e)}get marginless(){return!this._withMargin}set marginless(e){this._withMargin=!f(e)}get withHint(){return this._withHint}set withHint(e){this._withHint=f(e)}get filterable(){return this._filterable}set filterable(e){this._filterable=f(e)}get multiple(){return this._multiple}set multiple(e){this._multiple=f(e)}get allowClear(){return this._allowClear}set allowClear(e){this._allowClear=f(e)}get _allOptions(){return this.options.length>0&&this._slottedOptions.length>0?[...this.options,...this._slottedOptions]:this.options.length>0?this.options:this._slottedOptions}connectedCallback(){super.connectedCallback(),this._collectSlottedOptions(),this._setupChildObserver(),this._updateActiveState()}disconnectedCallback(){var e;super.disconnectedCallback(),this._removeClickOutsideListener(),(e=this._childObserver)==null||e.disconnect()}_onSlottedOptionsChange(){this._collectSlottedOptions()}_collectSlottedOptions(){const e=Array.from(this.querySelectorAll(":scope > swim-option"));this._slottedOptions=e.filter(t=>!t.hasAttribute("hidden")).map(t=>{const i=t.getAttribute("name")||"",o=t.getAttribute("value");return{name:i,value:o!==null?o:i,disabled:t.hasAttribute("disabled")}})}_setupChildObserver(){this._childObserver=new MutationObserver(()=>{this._collectSlottedOptions()}),this._childObserver.observe(this,{childList:!0,subtree:!1})}updated(e){super.updated(e),e.has("value")&&(this._updateActiveState(),this._validate()),e.has("_open")&&(this._open?(this.setAttribute("open",""),this._addClickOutsideListener(),setTimeout(()=>{this.filterable&&this.filterInput&&this.filterInput.focus()},100)):(this.removeAttribute("open"),this._removeClickOutsideListener(),this._filterQuery="",this._focusedIndex=-1))}render(){const e=this._value.length>0,t=this._getFilteredOptions(),i=this.allowClear&&e&&!this.disabled;return d`
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
                  ${i?d`
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
                    @click="${this._handleToggle}"
                  >
                    <swim-icon font-icon="chevron-bold-down"></swim-icon>
                  </button>
                </div>
              </div>
              <label class="select-label" for="${this.id}">
                ${this.label} ${this.required?d`<span>${this.requiredIndicator}</span>`:g}
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
                    `:g}
                ${t.length>0?d`
                      <ul class="select-options">
                        ${Ir(t,o=>this._getOptionValue(o),(o,n)=>this._renderOption(o,n))}
                      </ul>
                    `:d` <div class="select-empty">${this.emptyPlaceholder}</div> `}
              </div>
            `:g}
      </div>
    `}_renderValue(){if(this._value.length===0)return d`<span class="select-placeholder">${this.placeholder}</span>`;if(this.multiple)return d`
        ${this._value.map(e=>{const t=this._allOptions.find(i=>this._getOptionValue(i)===e);return this._renderChip(t||{name:e,value:e})})}
      `;{const e=this._allOptions.find(t=>this._getOptionValue(t)===this._value[0]);return d`${(e==null?void 0:e.name)||this._value[0]}`}}_renderChip(e){return d`
      <div class="select-chip">
        <span class="select-chip-label">${e.name}</span>
        ${this.disabled?g:d`
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
    `}_renderOption(e,t){const i=this._getOptionValue(e),o=this._isSelected(i),n=t===this._focusedIndex;return d`
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
        ${e.name}
      </li>
    `}_handleInputClick(e){this.disabled||this._toggleDropdown()}_handleToggle(e){e.stopPropagation(),this.disabled||this._toggleDropdown()}_handleClear(e){e.stopPropagation(),this.value=this.multiple?[]:null,this._dispatchChange(),this._validate()}_handleFocus(){this._focused=!0,this.setAttribute("focused","")}_handleBlur(){this._focused=!1,this.removeAttribute("focused"),this._touched||(this._touched=!0,this.setAttribute("touched","")),this._validate()}_handleKeyDown(e){switch(e.key){case"Enter":case" ":this._open||(e.preventDefault(),this._toggleDropdown());break;case"Escape":this._open&&(e.preventDefault(),this._closeDropdown());break;case"ArrowDown":e.preventDefault(),this._open?this._moveFocus(1):this._openDropdown();break;case"ArrowUp":e.preventDefault(),this._open&&this._moveFocus(-1);break}}_handleFilterInput(e){const t=e.target;this._filterQuery=t.value,this._focusedIndex=0}_handleFilterKeyDown(e){var t;switch(e.key){case"ArrowDown":e.preventDefault(),this._moveFocus(1);break;case"ArrowUp":e.preventDefault(),this._moveFocus(-1);break;case"Enter":e.preventDefault();const i=this._getFilteredOptions();i[this._focusedIndex]&&this._handleOptionClick(i[this._focusedIndex]);break;case"Escape":e.preventDefault(),this._closeDropdown(),(t=this.selectInput)==null||t.focus();break}}_handleOptionClick(e){if(e.disabled)return;const t=this._getOptionValue(e);if(this.multiple){const i=[...this._value],o=i.indexOf(t);o>-1?i.splice(o,1):i.push(t),this.value=i}else this.value=t,this._closeDropdown();this._dispatchChange(),this._validate()}_removeChip(e,t){e.stopPropagation();const i=this._getOptionValue(t),o=this._value.filter(n=>n!==i);this.value=o,this._dispatchChange(),this._validate()}_toggleDropdown(){this._open?this._closeDropdown():this._openDropdown()}_openDropdown(){this.disabled||(this._open=!0,this._focusedIndex=0,this.dispatchEvent(new Event("open",{bubbles:!0,composed:!0})))}_closeDropdown(){this._open=!1,this.dispatchEvent(new Event("close",{bubbles:!0,composed:!0}))}_moveFocus(e){const i=this._getFilteredOptions().length-1;let o=this._focusedIndex+e;o<0?o=i:o>i&&(o=0),this._focusedIndex=o}_getFilteredOptions(){if(!this._filterQuery)return this._allOptions;const e=this._filterQuery.toLowerCase();return this._allOptions.filter(t=>t.name.toLowerCase().includes(e))}_getOptionValue(e){return e.value!==void 0?e.value:e.name}_isSelected(e){return this._value.includes(e)}_dispatchChange(){this.dispatchEvent(new CustomEvent("change",{detail:{value:this.value},bubbles:!0,composed:!0}))}_validate(){let e=!0;return this.required&&this._value.length===0&&(e=!1),this._invalid=!e,this._invalid?(this.setAttribute("invalid",""),this._internals.setValidity({valueMissing:!0},"Please select an option")):(this.removeAttribute("invalid"),this._internals.setValidity({})),e}_updateActiveState(){const e=this._value.length>0,t=!!this.placeholder;this._focused||e||this._open?this.setAttribute("active",""):this.removeAttribute("active"),t?this.setAttribute("has-placeholder",""):this.removeAttribute("has-placeholder"),this.label?this.removeAttribute("no-label"):this.setAttribute("no-label","")}_addClickOutsideListener(){this._clickOutsideListener=e=>{this.contains(e.target)||this._closeDropdown()},setTimeout(()=>{document.addEventListener("click",this._clickOutsideListener)},0)}_removeClickOutsideListener(){this._clickOutsideListener&&(document.removeEventListener("click",this._clickOutsideListener),this._clickOutsideListener=void 0)}formResetCallback(){this.value=this.multiple?[]:null,this._touched=!1,this.removeAttribute("touched")}formDisabledCallback(e){this.disabled=e}};ui.styles=[$,gt,Tr],ui.formAssociated=!0;let D=ui;z([K(".select-input")],D.prototype,"selectInput",2);z([K(".select-filter-input")],D.prototype,"filterInput",2);z([a({type:String})],D.prototype,"label",2);z([a({type:String})],D.prototype,"placeholder",2);z([a({type:String})],D.prototype,"hint",2);z([a({type:String,attribute:"empty-placeholder"})],D.prototype,"emptyPlaceholder",2);z([a({type:String,attribute:"filter-placeholder"})],D.prototype,"filterPlaceholder",2);z([a({type:Array})],D.prototype,"options",2);z([a()],D.prototype,"value",1);z([a({type:String})],D.prototype,"name",2);z([a({type:String})],D.prototype,"id",2);z([a({type:Boolean,reflect:!0})],D.prototype,"disabled",1);z([a({type:Boolean,reflect:!0})],D.prototype,"required",1);z([a({type:String,reflect:!0})],D.prototype,"appearance",2);z([a({type:String,reflect:!0})],D.prototype,"size",2);z([a({type:Boolean,reflect:!0,attribute:"marginless"})],D.prototype,"marginless",1);z([a({type:Boolean})],D.prototype,"withHint",1);z([a({type:Boolean})],D.prototype,"filterable",1);z([a({type:Boolean,reflect:!0})],D.prototype,"multiple",1);z([a({type:Boolean,attribute:"allow-clear"})],D.prototype,"allowClear",1);z([a({type:String,attribute:"required-indicator"})],D.prototype,"requiredIndicator",2);z([_()],D.prototype,"_slottedOptions",2);z([_()],D.prototype,"_open",2);z([_()],D.prototype,"_focused",2);z([_()],D.prototype,"_touched",2);z([_()],D.prototype,"_invalid",2);z([_()],D.prototype,"_filterQuery",2);z([_()],D.prototype,"_focusedIndex",2);customElements.get(_s)||customElements.define(_s,D);const Br=w`
  :host {
    display: block;
  }

  .swim-tab__panel {
    display: block;
  }

  .swim-tab__panel[hidden] {
    display: none;
  }
`;var Pr=Object.defineProperty,Fr=Object.getOwnPropertyDescriptor,Qe=(s,e,t,i)=>{for(var o=i>1?void 0:i?Fr(e,t):e,n=s.length-1,r;n>=0;n--)(r=s[n])&&(o=(i?r(e,t,o):r(o))||o);return i&&o&&Pr(e,t,o),o};let Nr=0;const vs="swim-tab",so=class so extends y{constructor(){super(...arguments),this._instanceId=++Nr,this._generatedPanelId=`tab-panel-${this._instanceId}`,this._generatedTabId=`tab-${this._instanceId}`,this.tabId=this._generatedTabId,this.label="",this.tabTitle="",this._active=!1,this._disabled=!1}get id(){return this._id??this._generatedPanelId}set id(e){this._id=e||this._generatedPanelId}get title(){return this.label}set title(e){this.label=e}get active(){return this._active}set active(e){const t=f(e);if(this._active!==t){const i=this._active;this._active=t,this.requestUpdate("active",i),this.dispatchEvent(new CustomEvent("swim-tab-active-change",{bubbles:!0,composed:!0}))}}get disabled(){return this._disabled}set disabled(e){this._disabled=f(e)}connectedCallback(){super.connectedCallback(),this.hasAttribute("tab-id")||(this.tabId=this._generatedTabId)}render(){return d`
      <div
        class="swim-tab__panel"
        role="tabpanel"
        id="${this.id}"
        aria-labelledby="${this.tabId}"
        ?hidden="${!this.active}"
      >
        <slot></slot>
      </div>
    `}};so.styles=[$,Br];let pe=so;Qe([a({type:String})],pe.prototype,"id",1);Qe([a({type:String,attribute:"tab-id"})],pe.prototype,"tabId",2);Qe([a({type:String})],pe.prototype,"label",2);Qe([a({type:String,attribute:"tab-title"})],pe.prototype,"tabTitle",2);Qe([a({type:String})],pe.prototype,"title",1);Qe([a({type:Boolean,reflect:!0})],pe.prototype,"active",1);Qe([a({type:Boolean,reflect:!0})],pe.prototype,"disabled",1);customElements.get(vs)||customElements.define(vs,pe);const Rr=w`
  :host {
    display: block;
    margin-bottom: 2em;
  }

  .swim-tabs {
    display: block;
  }

  /* Tab list – horizontal by default, responsive to container */
  .swim-tabs__list {
    display: flex;
    flex-wrap: wrap;
    border-bottom: solid 2px var(--grey-700);
  }

  .swim-tabs__tab {
    flex: 0 1 auto;
    min-width: 0;
    max-width: 100%;
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
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
    flex: 0 1 var(--swim-tabs-list-width, 160px);
    min-width: var(--swim-tabs-list-min-width, 120px);
    max-width: var(--swim-tabs-list-max-width, 320px);
    border: none;
    overflow: hidden;
  }

  :host([vertical]) .swim-tabs__tab {
    height: 53px;
    width: 100%;
    min-width: 0;
    text-align: left;
    font-size: var(--font-size-s);
    line-height: 45px;
    border: none !important;
    border-bottom: 1px solid var(--grey-700) !important;
    padding-left: 19px;
    font-weight: var(--font-weight-semibold);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
`;var Sn=(s=>(s.Legacy="legacy",s.Light="light",s))(Sn||{}),Vr=Object.defineProperty,Hr=Object.getOwnPropertyDescriptor,yi=(s,e,t,i)=>{for(var o=i>1?void 0:i?Hr(e,t):e,n=s.length-1,r;n>=0;n--)(r=s[n])&&(o=(i?r(e,t,o):r(o))||o);return i&&o&&Vr(e,t,o),o};const ws="swim-tabs",no=class no extends y{constructor(){super(...arguments),this._vertical=!1,this.appearance=Sn.Legacy,this._tabs=[],this._slotChangeBound=()=>this._syncTabs(),this._tabActiveChangeBound=()=>this.requestUpdate()}get vertical(){return this._vertical}set vertical(e){this._vertical=f(e)}connectedCallback(){super.connectedCallback()}firstUpdated(){this._syncTabs(),this._listenToTabChanges();const e=this.slotEl;e&&e.addEventListener("slotchange",this._slotChangeBound)}disconnectedCallback(){var t;const e=(t=this.shadowRoot)==null?void 0:t.querySelector("slot");e&&e.removeEventListener("slotchange",this._slotChangeBound),this._tabs.forEach(i=>i.removeEventListener("swim-tab-active-change",this._tabActiveChangeBound)),super.disconnectedCallback()}_listenToTabChanges(){this._tabs.forEach(e=>e.addEventListener("swim-tab-active-change",this._tabActiveChangeBound))}_syncTabs(){var n;const e=(n=this.shadowRoot)==null?void 0:n.querySelector("slot"),i=((e==null?void 0:e.assignedElements({flatten:!0}))??[]).filter(r=>r instanceof pe);this._tabs.forEach(r=>r.removeEventListener("swim-tab-active-change",this._tabActiveChangeBound)),this._tabs=i,this._listenToTabChanges();const o=i.filter(r=>r.active);o.length>1?console.error('swim-tabs: Multiple active tabs set "active".'):o.length===0&&i.length>0&&(i[0].active=!0)}_tabClicked(e){e.disabled||(this._tabs.forEach(t=>t.active=t===e),e.active=!0,this.dispatchEvent(new CustomEvent("select-tab",{detail:{tab:e},bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("select",{detail:{tab:e},bubbles:!0,composed:!0})))}_move(e){const t=this._tabs,i=t.findIndex(o=>o.active);for(let o=i+e;o>=0&&o<t.length;o+=e){const n=t[o];if(n&&!n.disabled){this._tabClicked(n);return}}}prev(){this._move(-1)}next(){this._move(1)}_handleKeyDown(e){const t=this.vertical,i=e.key;t&&(i==="ArrowUp"||i==="ArrowDown")?(e.preventDefault(),this._move(i==="ArrowDown"?1:-1)):!t&&(i==="ArrowLeft"||i==="ArrowRight")&&(e.preventDefault(),this._move(i==="ArrowRight"?1:-1))}render(){const e=this._tabs;return d`
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
                title="${t.tabTitle||t.label}"
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
    `}};no.styles=[$,Rr];let Ke=no;yi([K("slot")],Ke.prototype,"slotEl",2);yi([a({type:Boolean,reflect:!0})],Ke.prototype,"vertical",1);yi([a({type:String,reflect:!0})],Ke.prototype,"appearance",2);yi([_()],Ke.prototype,"_tabs",2);customElements.get(ws)||customElements.define(ws,Ke);const Yr=w`
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
`;var qr=Object.defineProperty,Ur=Object.getOwnPropertyDescriptor,ft=(s,e,t,i)=>{for(var o=i>1?void 0:i?Ur(e,t):e,n=s.length-1,r;n>=0;n--)(r=s[n])&&(o=(i?r(e,t,o):r(o))||o);return i&&o&&qr(e,t,o),o};let jr=0;const ys="swim-button-toggle",ro=class ro extends y{constructor(){super(...arguments),this._uniqueId=`swim-button-toggle-${++jr}`,this.name=this._uniqueId,this.value=!1,this._checked=!1,this._disabled=!1}get id(){return this._id??this._uniqueId}set id(e){this._id=e}get checked(){return this._checked}set checked(e){const t=f(e);this._checked!==t&&(this._checked=t,this.requestUpdate("checked"))}get disabled(){return this._disabled}set disabled(e){this._disabled=f(e)}render(){return d`
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
    `}_handleClick(e){e.preventDefault(),e.stopPropagation(),!(this.disabled||this.checked)&&(this._checked=!0,this.dispatchEvent(new CustomEvent("value-change",{detail:this.value,bubbles:!0,composed:!0})))}};ro.styles=[$,Yr];let ze=ro;ft([a({type:String})],ze.prototype,"id",1);ft([a({type:String})],ze.prototype,"name",2);ft([a()],ze.prototype,"value",2);ft([a({type:Boolean,reflect:!0})],ze.prototype,"checked",1);ft([_()],ze.prototype,"_checked",2);ft([a({type:Boolean,reflect:!0})],ze.prototype,"disabled",1);customElements.get(ys)||customElements.define(ys,ze);const Gr=w`
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
`;var Wr=Object.defineProperty,Kr=Object.getOwnPropertyDescriptor,et=(s,e,t,i)=>{for(var o=i>1?void 0:i?Kr(e,t):e,n=s.length-1,r;n>=0;n--)(r=s[n])&&(o=(i?r(e,t,o):r(o))||o);return i&&o&&Wr(e,t,o),o};let Zr=0;const xs="swim-button-toggle-group",pi=class pi extends y{constructor(){var e;super(),this._uniqueId=`swim-button-toggle-group-${++Zr}`,this._animationHolderLeft=0,this._animationHolderWidth=0,this.label="",this._value=void 0,this._disabled=!1,this._slotChangeBound=()=>this._onSlotChange(),this._slotForCleanup=null,this._internals=((e=this.attachInternals)==null?void 0:e.call(this))??{},this.setAttribute("role","group"),this._boundValueChange=this._onValueChangeEvent.bind(this)}get id(){return this._id??this._uniqueId}set id(e){this._id=e}get value(){return this._value}set value(e){this._value!==e&&(this._value=e,this._internals.setFormValue(e!=null?String(e):""),this._syncSelection())}get disabled(){return this._disabled}set disabled(e){this._disabled=f(e),this._syncDisabled()}connectedCallback(){super.connectedCallback(),this.addEventListener("value-change",this._boundValueChange),this._internals.setFormValue&&this._internals.setFormValue(this._value!=null?String(this._value):"")}disconnectedCallback(){this._slotForCleanup&&(this._slotForCleanup.removeEventListener("slotchange",this._slotChangeBound),this._slotForCleanup=null),this.removeEventListener("value-change",this._boundValueChange),super.disconnectedCallback()}firstUpdated(e){super.firstUpdated(e);const t=this._slot;t&&(this._slotForCleanup=t,t.addEventListener("slotchange",this._slotChangeBound)),this._onSlotChange()}updated(e){super.updated(e),(e.has("value")||e.has("disabled"))&&(this._syncSelection(),this._syncDisabled())}_getToggles(){const e=this._slot;return e?e.assignedElements({flatten:!0}).filter(i=>i instanceof HTMLElement&&i.tagName==="SWIM-BUTTON-TOGGLE"):[]}_onSlotChange(){this._syncSelection(),this._syncDisabled(),requestAnimationFrame(()=>this._calcAnimationDimensions())}_syncSelection(){const e=this._getToggles(),t=this._value;e.forEach(i=>{i.checked=i.value!==void 0&&i.value===t}),requestAnimationFrame(()=>this._calcAnimationDimensions())}_syncDisabled(){this._getToggles().forEach(t=>{t.disabled=this._disabled})}_calcAnimationDimensions(){const e=this._getToggles();if(!e.length||this._disabled){this._animationHolderLeft=0,this._animationHolderWidth=0;return}const t=e.findIndex(l=>l.value!==void 0&&l.value===this._value);if(t<0){this._animationHolderLeft=0,this._animationHolderWidth=0;return}let i=0;for(let l=0;l<t;l++)i+=e[l].offsetWidth??0;i+=t*2+2;const n=e[t],r=Math.max(0,((n==null?void 0:n.offsetWidth)??0)-4);this._animationHolderLeft=i,this._animationHolderWidth=r}_onValueChangeEvent(e){const i=e.detail;this._value!==i&&(this._value=i,this._internals.setFormValue(i!=null?String(i):""),this._syncSelection(),this.dispatchEvent(new CustomEvent("value-change",{detail:i,bubbles:!0,composed:!0})))}render(){return d`
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
    `}};pi.styles=[$,Gr],pi.formAssociated=!0;let fe=pi;et([K("slot")],fe.prototype,"_slot",2);et([_()],fe.prototype,"_animationHolderLeft",2);et([_()],fe.prototype,"_animationHolderWidth",2);et([a({type:String})],fe.prototype,"id",1);et([a({type:String})],fe.prototype,"label",2);et([a()],fe.prototype,"value",1);et([a({type:Boolean,reflect:!0})],fe.prototype,"disabled",1);customElements.get(xs)||customElements.define(xs,fe);const ni=4,Mi=3,ks=25,Jr=30,Xr=15,$s=27,Qr=w`
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
    border: ${Mi}px solid var(--blue-400);
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
    border: ${Mi}px solid var(--blue-400);
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
    height: ${Mi}px;
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
`,ea=w`
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
    margin-left: ${ks}px;
  }

  :host([orientation='horizontal']) .swim-card__accent {
    position: absolute;
    width: ${ni}px;
    min-width: ${ni}px;
    right: 0;
    height: 100%;
    border-radius: var(--radius-0) var(--radius-2) var(--radius-2) var(--radius-0);
  }

  :host([orientation='horizontal']) ::slotted(swim-card-header) {
    display: flex;
    align-items: center;
    padding: var(--spacing-0) ${ks}px;
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
    padding: var(--spacing-0) ${Jr}px;
  }

  :host([orientation='horizontal']) .swim-card__outline,
  :host([orientation='horizontal']) .swim-card__outline-text {
    top: -5px;
    right: -5px;
    left: -5px;
    bottom: -5px;
  }
`,ta=w`
  :host([orientation='vertical']) {
    position: relative;
    flex-direction: column;
    min-width: 347px;
    max-width: 850px;
    height: 418px;
    color: var(--grey-350);
  }

  :host([orientation='vertical']) .swim-card__status {
    margin: ${Xr}px auto var(--spacing-0) auto;
  }

  :host([orientation='vertical']) .swim-card__accent {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: ${ni}px;
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
    padding-left: ${$s}px;
    padding-right: ${$s}px;
  }

  :host([orientation='vertical']) ::slotted(swim-card-footer) {
    position: relative;
    width: 100%;
    flex-shrink: 0;
    height: 50px;
    padding: var(--spacing-20) var(--spacing-0);
    margin-top: 15px;
    margin-bottom: ${ni}px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`,ia=[$,Qr,ea,ta];var lt=(s=>(s.Success="success",s.Error="error",s.Disabled="disabled",s))(lt||{}),Dn=(s=>(s.Horizontal="horizontal",s.Vertical="vertical",s))(Dn||{}),An=(s=>(s.Normal="normal",s.Flat="flat",s))(An||{});const oa=w`
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
`;var sa=Object.defineProperty,na=Object.getOwnPropertyDescriptor,Le=(s,e,t,i)=>{for(var o=i>1?void 0:i?na(e,t):e,n=s.length-1,r;n>=0;n--)(r=s[n])&&(o=(i?r(e,t,o):r(o))||o);return i&&o&&sa(e,t,o),o};let ra=0;const Es="swim-checkbox",mi=class mi extends y{constructor(){super(),this.id=`swim-checkbox-${++ra}`,this.name="",this.diameter="18px",this._checked=!1,this._indeterminate=!1,this._tabindex=0,this._disabled=!1,this._round=!1,this._internals=this.attachInternals()}get checked(){return this._checked}set checked(e){const t=f(e);this._checked!==t&&(this._checked=t,this._syncFormValue(),this.dispatchEvent(new CustomEvent("checked-change",{detail:this._checked,bubbles:!0,composed:!0})))}get indeterminate(){return this._indeterminate}set indeterminate(e){const t=f(e);this._indeterminate!==t&&(this._indeterminate=t,this.dispatchEvent(new CustomEvent("indeterminate-change",{detail:this._indeterminate,bubbles:!0,composed:!0})))}get tabindex(){return this._tabindex}set tabindex(e){this._tabindex=T(e,0)}get disabled(){return this._disabled}set disabled(e){this._disabled=f(e)}get round(){return this._round}set round(e){this._round=f(e)}connectedCallback(){super.connectedCallback(),this._syncFormValue()}updated(e){super.updated(e),(e.has("checked")||e.has("_checked"))&&this._syncFormValue()}focus(e){var t;(t=this._roving)==null||t.focus(e)}_syncFormValue(){this._internals.setFormValue(this._checked?"on":"")}_onClick(e){e.preventDefault(),!this.disabled&&this._toggle()}_onKeydown(e){e.key!==" "||this.disabled||(e.stopPropagation(),e.preventDefault(),this._toggle())}_toggle(){this.checked=!this.checked,this._emitChange()}_emitChange(){this.dispatchEvent(new CustomEvent("change",{detail:{stopPropagation:()=>{},timeStamp:Date.now(),target:{checked:this._checked}},bubbles:!0,composed:!0}))}_onFocus(e){this.dispatchEvent(new FocusEvent("focus",{...e,bubbles:!0,composed:!0}))}_onBlur(e){this.dispatchEvent(new FocusEvent("blur",{...e,bubbles:!0,composed:!0}))}render(){const e=`${this.id}-content`;return d`
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
    `}};mi.styles=[$,oa],mi.formAssociated=!0;let le=mi;Le([K(".swim-checkbox__roving")],le.prototype,"_roving",2);Le([a({type:String})],le.prototype,"id",2);Le([a({type:String})],le.prototype,"name",2);Le([a({type:String})],le.prototype,"diameter",2);Le([a({type:Boolean,reflect:!0,attribute:"checked"})],le.prototype,"checked",1);Le([a({type:Boolean,reflect:!0})],le.prototype,"indeterminate",1);Le([a({type:Number})],le.prototype,"tabindex",1);Le([a({type:Boolean,reflect:!0})],le.prototype,"disabled",1);Le([a({type:Boolean,reflect:!0})],le.prototype,"round",1);customElements.get(Es)||customElements.define(Es,le);var aa=Object.defineProperty,la=Object.getOwnPropertyDescriptor,ye=(s,e,t,i)=>{for(var o=i>1?void 0:i?la(e,t):e,n=s.length-1,r;n>=0;n--)(r=s[n])&&(o=(i?r(e,t,o):r(o))||o);return i&&o&&aa(e,t,o),o};const Cs="swim-card",ao=class ao extends y{constructor(){super(...arguments),this._disabled=!1,this.orientation=Dn.Horizontal,this.statusTooltip="",this._selectable=!1,this._selected=!1,this._error=!1,this.outlineText="",this.appearance=An.Normal,this._hideAccent=!1}get disabled(){return this._disabled}set disabled(e){this._disabled=f(e)}get selectable(){return this._selectable}set selectable(e){this._selectable=f(e)}get selected(){return this._selected}set selected(e){this._selected=f(e)}get error(){return this._error}set error(e){this._error=f(e)}get hideAccent(){return this._hideAccent}set hideAccent(e){this._hideAccent=f(e)}_onOutlineClick(e){e.stopPropagation(),this.dispatchEvent(new CustomEvent("outline-click",{bubbles:!0,composed:!0}))}_onSelectChange(e){var i,o;e.stopPropagation();const t=((o=(i=e.detail)==null?void 0:i.target)==null?void 0:o.checked)??!1;this.selected=t,this.dispatchEvent(new CustomEvent("select",{detail:this.selected,bubbles:!0,composed:!0}))}_onCheckboxClick(e){e.stopPropagation()}render(){const e=this.selected&&!this.outlineText&&!this.error,t=this.error&&!this.outlineText,i=!!this.outlineText,o=!!this.status,n=this.status===lt.Success?"swim-card__status--success":this.status===lt.Error?"swim-card__status--error":"";return d`
      ${e?d`<div class="swim-card__outline" aria-hidden="true"></div>`:g}
      ${t?d`<div class="swim-card__outline swim-card__outline--error" aria-hidden="true"></div>`:g}
      ${i?d`
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
      ${o?d`
            <div
              class="swim-card__status ${n}"
              title="${this.statusTooltip}"
              role="status"
              aria-label="${this.statusTooltip||this.status||""}"
            ></div>
          `:g}
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
          `:g}

      <slot></slot>

      ${this.hideAccent?g:d`<div class="swim-card__accent" aria-hidden="true"></div>`}
    `}};ao.styles=ia;let ee=ao;ye([a({type:Boolean,reflect:!0})],ee.prototype,"disabled",1);ye([a({type:String,reflect:!0})],ee.prototype,"orientation",2);ye([a({type:String,reflect:!0})],ee.prototype,"status",2);ye([a({type:String,attribute:"status-tooltip"})],ee.prototype,"statusTooltip",2);ye([a({type:Boolean,reflect:!0})],ee.prototype,"selectable",1);ye([a({type:Boolean,reflect:!0})],ee.prototype,"selected",1);ye([a({type:Boolean,reflect:!0})],ee.prototype,"error",1);ye([a({type:String,attribute:"outline-text"})],ee.prototype,"outlineText",2);ye([a({type:String,reflect:!0})],ee.prototype,"appearance",2);ye([a({type:Boolean,attribute:"hide-accent"})],ee.prototype,"hideAccent",1);customElements.get(Cs)||customElements.define(Cs,ee);const Ss=25,ca=w`
  :host {
    display: flex;
    align-items: center;
    padding: var(--spacing-0) ${Ss}px;
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
    margin-left: ${Ss}px;
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
`,da=[$,ca];var ha=Object.defineProperty,In=(s,e,t,i)=>{for(var o=void 0,n=s.length-1,r;n>=0;n--)(r=s[n])&&(o=r(e,t,o)||o);return o&&ha(e,t,o),o};const Ds="swim-card-header",lo=class lo extends y{constructor(){super(...arguments),this.label="",this.orientation="horizontal"}render(){return d`
      <slot name="avatar"></slot>
      <div class="swim-card-header__title-group">
        <slot></slot>
        ${this.label?d`<div class="swim-card-header__label">${this.label}</div>`:g}
        <slot name="tag"></slot>
        <slot name="title"></slot>
        <slot name="subtitle"></slot>
      </div>
    `}};lo.styles=da;let Mt=lo;In([a({type:String})],Mt.prototype,"label");In([a({type:String,reflect:!0})],Mt.prototype,"orientation");customElements.get(Ds)||customElements.define(Ds,Mt);const ua=w`
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
`,pa=[$,ua];var ma=Object.defineProperty,ba=(s,e,t,i)=>{for(var o=void 0,n=s.length-1,r;n>=0;n--)(r=s[n])&&(o=r(e,t,o)||o);return o&&ma(e,t,o),o};const As="swim-card-footer",co=class co extends y{constructor(){super(...arguments),this.label=""}render(){return d`
      ${this.label?d`<div class="swim-card-footer__label">${this.label}</div>`:g}
      <slot></slot>
    `}};co.styles=pa;let ri=co;ba([a({type:String})],ri.prototype,"label");customElements.get(As)||customElements.define(As,ri);const ga=3,fa=w`
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
    border: ${ga}px solid transparent;
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
`,_a=[$,fa];var va=Object.defineProperty,Qi=(s,e,t,i)=>{for(var o=void 0,n=s.length-1,r;n>=0;n--)(r=s[n])&&(o=r(e,t,o)||o);return o&&va(e,t,o),o};const Is="swim-card-avatar",ho=class ho extends y{constructor(){super(...arguments),this.src="",this.removeImageBackground=!1}render(){const e=this.status===lt.Success?"swim-card-avatar__avatar--success":this.status===lt.Error?"swim-card-avatar__avatar--error":this.status===lt.Disabled?"swim-card-avatar__avatar--disabled":"";return d`
      <div
        class="swim-card-avatar__avatar ${e}"
        role="${this.status?"status":"presentation"}"
        aria-label="${this.status||""}"
      >
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
    `}};ho.styles=_a;let ut=ho;Qi([a({type:String})],ut.prototype,"src");Qi([a({type:String,reflect:!0})],ut.prototype,"status");Qi([a({type:Boolean,attribute:"remove-image-background"})],ut.prototype,"removeImageBackground");customElements.get(Is)||customElements.define(Is,ut);const wa=w`
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
`,ya=[$,wa];var Tn=(s=>(s.Small="small",s.Medium="medium",s.Large="large",s))(Tn||{}),xa=Object.defineProperty,ka=(s,e,t,i)=>{for(var o=void 0,n=s.length-1,r;n>=0;n--)(r=s[n])&&(o=r(e,t,o)||o);return o&&xa(e,t,o),o};const Ts="swim-card-placeholder",uo=class uo extends y{constructor(){super(...arguments),this.size=Tn.Medium}render(){return d``}};uo.styles=ya;let ai=uo;ka([a({type:String,reflect:!0})],ai.prototype,"size");customElements.get(Ts)||customElements.define(Ts,ai);const $a=27,Ea=w`
  :host {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    gap: var(--spacing-8);
    padding: var(--spacing-16) ${$a}px;
    box-sizing: border-box;
    overflow: auto;
    line-height: 1.5;
  }

  ::slotted(*) {
    width: 100%;
  }
`,Ca=[$,Ea],zs="swim-card-body",po=class po extends y{render(){return d`<slot></slot>`}};po.styles=Ca;let Fi=po;customElements.get(zs)||customElements.define(zs,Fi);const Sa=w`
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
`,Da=w`
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
`;var Aa=Object.defineProperty,Ia=Object.getOwnPropertyDescriptor,xe=(s,e,t,i)=>{for(var o=i>1?void 0:i?Ia(e,t):e,n=s.length-1,r;n>=0;n--)(r=s[n])&&(o=(i?r(e,t,o):r(o))||o);return i&&o&&Aa(e,t,o),o};let Ta=0;const Ms="swim-radio",mo=class mo extends y{constructor(){super(...arguments),this.id=`swim-radio-${++Ta}`,this.name="",this.radioId="",this._tabindex=0,this._checked=!1,this.value="",this._disabled=!1,this.groupDisabled=!1,this.isInGroup=!1}get tabindex(){return this._tabindex}set tabindex(e){this._tabindex=T(e,0)}get checked(){return this._checked}set checked(e){const t=f(e);this._checked!==t&&(this._checked=t)}get disabled(){return this._disabled||this.groupDisabled}set disabled(e){this._disabled=f(e)}get _effectiveTabindex(){return this.disabled||this.isInGroup?-1:this._tabindex}get _inputId(){return this.radioId||`${this.id}-radio`}focus(e){var t;(t=this._roving)==null||t.focus(e)}_onClick(e){e.preventDefault(),!this.disabled&&this._select()}_onKeydown(e){e.key!==" "||this.disabled||(e.stopPropagation(),e.preventDefault(),this._select())}_select(){if(this.isInGroup){if(this._checked)return;this.checked=!0}else this.checked=!this._checked;this._checked&&this.dispatchEvent(new CustomEvent("change",{detail:this.value,bubbles:!0,composed:!0}))}_onInputChange(e){this.checked=!0,this.dispatchEvent(new CustomEvent("change",{detail:this.value,bubbles:!0,composed:!0}))}_onFocus(e){this.dispatchEvent(new FocusEvent("focus",{...e,bubbles:!0,composed:!0}))}_onBlur(e){this.dispatchEvent(new FocusEvent("blur",{...e,bubbles:!0,composed:!0}))}render(){const e=`${this.id}-content`;return d`
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
    `}};mo.styles=[$,Sa];let te=mo;xe([K(".swim-radio__roving")],te.prototype,"_roving",2);xe([a({type:String})],te.prototype,"id",2);xe([a({type:String})],te.prototype,"name",2);xe([a({type:String,attribute:"radio-id"})],te.prototype,"radioId",2);xe([a({type:Number})],te.prototype,"tabindex",1);xe([a({type:Boolean,reflect:!0})],te.prototype,"checked",1);xe([a({type:String})],te.prototype,"value",2);xe([a({type:Boolean,reflect:!0})],te.prototype,"disabled",1);xe([a({type:Boolean,attribute:!1})],te.prototype,"groupDisabled",2);xe([a({type:Boolean,attribute:!1})],te.prototype,"isInGroup",2);customElements.get(Ms)||customElements.define(Ms,te);var za=Object.defineProperty,Ma=Object.getOwnPropertyDescriptor,He=(s,e,t,i)=>{for(var o=i>1?void 0:i?Ma(e,t):e,n=s.length-1,r;n>=0;n--)(r=s[n])&&(o=(i?r(e,t,o):r(o))||o);return i&&o&&za(e,t,o),o};let La=0;function Oa(s,e){return(s%e+e)%e}const Ls="swim-radio-group",bi=class bi extends y{constructor(){super(),this.id=`swim-radio-group-${++La}`,this._disabled=!1,this._value="",this.name="",this._focusIndex=-1,this._tabindex=0,this._radios=[],this._changeHandler=e=>this._onRadioChange(e),this._slotChangeBound=()=>this._syncRadios(),this._onGroupFocus=e=>{if(e.target!==this._slotWrapper)return;const t=this._radios.find(i=>i.checked);t?(this._focusIndex=this._radios.indexOf(t),this._focusOn(this._focusIndex)):this._focusFirst()},this._onGroupBlur=()=>{this.dispatchEvent(new FocusEvent("blur",{bubbles:!0,composed:!0}))},this._internals=this.attachInternals()}get disabled(){return this._disabled}set disabled(e){this._disabled=f(e),this._updateRadioDisabledState()}get value(){return this._value}set value(e){var t;this._value!==e&&(this._value=e,this._updateSelectedFromValue(),(t=this._internals)==null||t.setFormValue(String(this._value)))}get focusIndex(){return this._focusIndex}set focusIndex(e){this._focusIndex=T(e,-1),this._focusOn(this._focusIndex)}get tabindex(){return this.disabled?-1:this._tabindex}set tabindex(e){this._tabindex=T(e,0)}connectedCallback(){super.connectedCallback(),this.addEventListener("change",this._changeHandler),this.addEventListener("focus",this._onGroupFocus),this.addEventListener("blur",this._onGroupBlur)}disconnectedCallback(){var e;(e=this._slot)==null||e.removeEventListener("slotchange",this._slotChangeBound),this.removeEventListener("change",this._changeHandler),this.removeEventListener("focus",this._onGroupFocus),this.removeEventListener("blur",this._onGroupBlur),super.disconnectedCallback()}firstUpdated(){var e;(e=this._slot)==null||e.addEventListener("slotchange",this._slotChangeBound),this._syncRadios()}updated(e){super.updated(e),(e.has("value")||e.has("name")||e.has("disabled"))&&(this._updateSelectedFromValue(),this._updateRadioDisabledState(),this._updateRadioNames())}_syncRadios(){var i;const e=this._slot,t=((i=e==null?void 0:e.assignedElements)==null?void 0:i.call(e))??[];this._radios=t.filter(o=>{var n;return o instanceof HTMLElement&&((n=o.tagName)==null?void 0:n.toLowerCase())==="swim-radio"}),this._updateRadioNames(),this._updateRadioDisabledState(),this._updateSelectedFromValue()}_updateRadioNames(){const e=this.name||this.id;this._radios.forEach(t=>{t.name=e,t.isInGroup=!0})}_updateRadioDisabledState(){this._radios.forEach(e=>{e.groupDisabled=this._disabled})}_updateSelectedFromValue(){this._radios.forEach(e=>{e.checked=this._value===e.value})}_onRadioChange(e){var o;const t=e.target;if(!t||((o=t.tagName)==null?void 0:o.toLowerCase())!=="swim-radio")return;const i=e.detail;this._value!==i&&(this._value=i,this._updateSelectedFromValue(),this._internals.setFormValue(String(this._value)),this.dispatchEvent(new CustomEvent("change",{detail:this._value,bubbles:!0,composed:!0})))}_focusFirst(){if(!(this.disabled||!this._radios.length)){for(let e=0;e<this._radios.length;e++)if(!this._radios[e].disabled){this._focusIndex=e,this._focusOn(e);return}}}_focusOn(e){this.disabled||e<0||e>=this._radios.length||this._radios[e].focus()}_selectIndex(e){if(this.disabled||e<0||e>=this._radios.length)return;const t=this._radios[e];t.disabled||(this.value=t.value)}_focusIn(e){if(this.disabled||!this._radios.length)return;const t=this._radios.length;for(let i=1;i<=t;i++){const o=Oa(this._focusIndex+e*i,t);if(!this._radios[o].disabled){this._focusIndex=o,this._focusOn(o);return}}}_onKeydown(e){switch(e.key){case"ArrowLeft":case"ArrowUp":e.preventDefault(),e.stopPropagation(),this._focusIn(-1),this._selectIndex(this._focusIndex);break;case"ArrowRight":case"ArrowDown":e.preventDefault(),e.stopPropagation(),this._focusIn(1),this._selectIndex(this._focusIndex);break}}render(){return d`
      <div
        class="swim-radio-group__slot"
        role="radiogroup"
        tabindex="${this.tabindex}"
        aria-disabled="${this.disabled?"true":"false"}"
        @keydown="${this._onKeydown}"
      >
        <slot></slot>
      </div>
    `}};bi.styles=[$,Da],bi.formAssociated=!0;let me=bi;He([K("slot")],me.prototype,"_slot",2);He([K(".swim-radio-group__slot")],me.prototype,"_slotWrapper",2);He([a({type:String})],me.prototype,"id",2);He([a({type:Boolean,reflect:!0})],me.prototype,"disabled",1);He([a({type:String})],me.prototype,"value",1);He([a({type:String})],me.prototype,"name",2);He([a({type:Number})],me.prototype,"focusIndex",1);He([a({type:Number})],me.prototype,"tabindex",1);customElements.get(Ls)||customElements.define(Ls,me);const Ba=w`
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
`;var Pa=Object.defineProperty,Fa=Object.getOwnPropertyDescriptor,Oe=(s,e,t,i)=>{for(var o=i>1?void 0:i?Fa(e,t):e,n=s.length-1,r;n>=0;n--)(r=s[n])&&(o=(i?r(e,t,o):r(o))||o);return i&&o&&Pa(e,t,o),o};const Na={fromAttribute:s=>s!=="false"&&s!=="",toAttribute:s=>s?"true":"false"};let Ra=0;const Os="swim-toggle",gi=class gi extends y{constructor(){super(),this.id=`swim-toggle-${++Ra}`,this.name="",this.label="",this._checked=!1,this._disabled=!1,this._required=!1,this._showIcons=!0,this._tabindex=0,this._internals=this.attachInternals()}get checked(){return this._checked}set checked(e){const t=f(e);this._checked!==t&&(this._checked=t,this._syncFormValue())}get disabled(){return this._disabled}set disabled(e){this._disabled=f(e)}get required(){return this._required}set required(e){this._required=f(e)}get showIcons(){return this._showIcons}set showIcons(e){this._showIcons=e!=null?f(e):!0}get tabindex(){return this._tabindex}set tabindex(e){this._tabindex=T(e,0)}connectedCallback(){super.connectedCallback(),this._syncFormValue()}updated(e){super.updated(e),(e.has("checked")||e.has("_checked"))&&this._syncFormValue()}focus(e){var t;(t=this._roving)==null||t.focus(e)}_syncFormValue(){var t;this._internals.setFormValue(this._checked?"on":""),this.required&&!this._checked?this._internals.setValidity({valueMissing:!0},"This field is required"):this._internals.setValidity({});const e=(t=this.shadowRoot)==null?void 0:t.querySelector(".swim-toggle__input");e&&(e.checked=this._checked,e.required=this.required)}_onClick(e){e.preventDefault(),!this.disabled&&this._toggle()}_onKeydown(e){e.key!==" "&&e.key!=="Enter"||(e.preventDefault(),!this.disabled&&this._toggle())}_toggle(){this.checked=!this.checked,this._emitChange()}_emitChange(){this.dispatchEvent(new CustomEvent("change",{detail:{stopPropagation:()=>{},timeStamp:Date.now(),target:{checked:this._checked}},bubbles:!0,composed:!0}))}_onFocus(e){this.dispatchEvent(new FocusEvent("focus",{...e,bubbles:!0,composed:!0}))}_onBlur(e){this.dispatchEvent(new FocusEvent("blur",{...e,bubbles:!0,composed:!0}))}_onInputChange(e){const t=e.target;this._checked!==t.checked&&(this._checked=t.checked,this.requestUpdate(),this._syncFormValue(),this._emitChange())}render(){const e=`${this.id}-text`;return d`
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
    `}};gi.styles=[$,Ba],gi.formAssociated=!0;let ce=gi;Oe([K(".swim-toggle__roving")],ce.prototype,"_roving",2);Oe([a({type:String})],ce.prototype,"id",2);Oe([a({type:String})],ce.prototype,"name",2);Oe([a({type:String})],ce.prototype,"label",2);Oe([a({type:Boolean,reflect:!0,attribute:"checked"})],ce.prototype,"checked",1);Oe([a({type:Boolean,reflect:!0})],ce.prototype,"disabled",1);Oe([a({type:Boolean,reflect:!0})],ce.prototype,"required",1);Oe([a({type:Boolean,attribute:"show-icons",converter:Na})],ce.prototype,"showIcons",1);Oe([a({type:Number})],ce.prototype,"tabindex",1);customElements.get(Os)||customElements.define(Os,ce);const Va=w`
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
    font-size: var(--font-size-xs);
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .swim-section__toggle swim-icon {
    display: block;
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
`,Ha=[$,Va];var zn=(s=>(s.Legacy="legacy",s.Outline="outline",s.Light="light",s.Minimal="minimal",s))(zn||{}),ei=(s=>(s.Left="left",s.Right="right",s.None="none",s))(ei||{}),Ya=Object.defineProperty,qa=Object.getOwnPropertyDescriptor,ke=(s,e,t,i)=>{for(var o=i>1?void 0:i?qa(e,t):e,n=s.length-1,r;n>=0;n--)(r=s[n])&&(o=(i?r(e,t,o):r(o))||o);return i&&o&&Ya(e,t,o),o};const Ua={fromAttribute:s=>s!=="false"&&s!=="",toAttribute:s=>s?"true":"false"},Mn={fromAttribute:s=>s!==null&&s!=="false",toAttribute:s=>s?"true":"false"};let Bs=0;const Ps="swim-section",bo=class bo extends y{constructor(){super(...arguments),this._id=`section-${++Bs}`,this._sectionCollapsed=!1,this._sectionCollapsible=!0,this._headerToggle=!1,this.sectionTitle="",this.padding="1.8em",this.appearance=zn.Legacy,this.togglePosition=ei.Left,this._hasHeaderSlot=!1,this._headerSlotChangeBound=()=>this._checkHeaderSlot()}get id(){return this._id}set id(e){this._id=e||`section-${++Bs}`}get sectionCollapsed(){return this._sectionCollapsed}set sectionCollapsed(e){const t=e!=null?f(e):!1;this._sectionCollapsed!==t&&(this._sectionCollapsed=t)}get sectionCollapsible(){return this._sectionCollapsible}set sectionCollapsible(e){const t=e!=null?f(e):!0;this._sectionCollapsible!==t&&(this._sectionCollapsible=t)}get headerToggle(){return this._headerToggle}set headerToggle(e){const t=e!=null?f(e):!1;this._headerToggle!==t&&(this._headerToggle=t)}get _contentId(){return`${this.id}-content`}firstUpdated(){var t,i;this._checkHeaderSlot();const e=((i=(t=this.renderRoot)==null?void 0:t.querySelector)==null?void 0:i.call(t,'slot[name="header"]'))??this._headerSlot;e&&(this._headerSlotForCleanup=e,e.addEventListener("slotchange",this._headerSlotChangeBound))}disconnectedCallback(){this._headerSlotForCleanup&&(this._headerSlotForCleanup.removeEventListener("slotchange",this._headerSlotChangeBound),this._headerSlotForCleanup=void 0),super.disconnectedCallback()}_checkHeaderSlot(){var t,i;const e=((i=(t=this.renderRoot)==null?void 0:t.querySelector)==null?void 0:i.call(t,'slot[name="header"]'))??this._headerSlot;if(e){const n=e.assignedNodes({flatten:!0}).some(r=>{var l;return r.nodeType===Node.ELEMENT_NODE||r.nodeType===Node.TEXT_NODE&&(((l=r.textContent)==null?void 0:l.trim())??"").length>0});this._hasHeaderSlot!==n&&(this._hasHeaderSlot=n)}}_headerIsEmpty(){var e;return!((e=this.sectionTitle)!=null&&e.trim())&&!this._hasHeaderSlot}_onToggle(e){if(e==null||e.stopPropagation(),!this.sectionCollapsible)return;const t=!this.sectionCollapsed;this.sectionCollapsed=t,this.dispatchEvent(new CustomEvent("toggle",{detail:t,bubbles:!0,composed:!0}))}_onHeaderKeydown(e){e.key!==" "&&e.key!=="Enter"||!this.headerToggle||!this.sectionCollapsible||(e.preventDefault(),this._onToggle(e))}_onHeaderClick(){this.headerToggle&&this.sectionCollapsible&&this._onToggle()}render(){var r;const e=this.sectionCollapsible,t=e&&this.togglePosition!==ei.None,i=this.togglePosition===ei.Right,o=["swim-section__header",this.sectionCollapsed?"swim-section__header--collapsed":"",e?"swim-section__header--collapsible":"",this.headerToggle?"swim-section__header--header-toggle":"",i?"swim-section__header--toggle-right":""].filter(Boolean).join(" "),n=this._headerIsEmpty();return d`
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
          ${t&&!n?d`
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
            ${(r=this.sectionTitle)!=null&&r.trim()?d`<h1 class="swim-section__header-title">${this.sectionTitle}</h1>`:g}
            <slot name="header"></slot>
          </div>
        </header>
        ${this.sectionCollapsed?g:d`
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
    `}};bo.styles=Ha;let ie=bo;ke([a({type:String,reflect:!0})],ie.prototype,"id",1);ke([a({reflect:!0,attribute:"section-collapsed",converter:Mn})],ie.prototype,"sectionCollapsed",1);ke([a({reflect:!0,attribute:"section-collapsible",converter:Ua})],ie.prototype,"sectionCollapsible",1);ke([a({reflect:!0,attribute:"header-toggle",converter:Mn})],ie.prototype,"headerToggle",1);ke([a({type:String,reflect:!0,attribute:"section-title"})],ie.prototype,"sectionTitle",2);ke([a({type:String})],ie.prototype,"padding",2);ke([a({type:String,reflect:!0})],ie.prototype,"appearance",2);ke([a({type:String,reflect:!0,attribute:"toggle-position"})],ie.prototype,"togglePosition",2);ke([_()],ie.prototype,"_hasHeaderSlot",2);ke([K('slot[name="header"]')],ie.prototype,"_headerSlot",2);customElements.get(Ps)||customElements.define(Ps,ie);const ja=w`
  :host {
    display: contents;
  }
`,Fs="swim-section-header",go=class go extends y{render(){return d`<slot></slot>`}};go.styles=ja;let Ni=go;customElements.get(Fs)||customElements.define(Fs,Ni);const Ga=2,Wa=4,Ka=16,Za=w`
  :host {
    --slider-track-height: ${Ga}px;
    --slider-fill-height: ${Wa}px;
    --slider-thumb-size: ${Ka}px;
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
`;var Ja=Object.defineProperty,Xa=Object.getOwnPropertyDescriptor,J=(s,e,t,i)=>{for(var o=i>1?void 0:i?Xa(e,t):e,n=s.length-1,r;n>=0;n--)(r=s[n])&&(o=(i?r(e,t,o):r(o))||o);return i&&o&&Ja(e,t,o),o};let Qa=0;const Ns="swim-slider",fi=class fi extends y{constructor(){super(),this.id=`swim-slider-${++Qa}`,this._min=0,this._max=100,this._step=1,this.orientation="horizontal",this._filled=!1,this._multiple=!1,this._disabled=!1,this._showTicks=!1,this.ariaLabel="",this._values=[0],this._active=[],this._internals=this.attachInternals()}get min(){return this._min}set min(e){this._min=T(e,0)}get max(){return this._max}set max(e){this._max=T(e,100)}get step(){return this._step}set step(e){this._step=T(e,1)}get filled(){return this._filled}set filled(e){this._filled=f(e)}get multiple(){return this._multiple}set multiple(e){this._multiple=f(e)}get disabled(){return this._disabled}set disabled(e){this._disabled=f(e)}get showTicks(){return this._showTicks}set showTicks(e){this._showTicks=f(e)}get tickStep(){return this._tickStep??this._step}set tickStep(e){this._tickStep=e!=null?T(e,this._step):void 0}get value(){return this._values.length?this.multiple?[...this._values].sort((e,t)=>e-t).join(","):String(this._values[0]):String(this._min)}set value(e){const t=e!=null?String(e):"",o=(t?t.split(",").map(r=>T(r.trim(),this._min)):[this._min]).map(r=>Math.max(this._min,Math.min(this._max,r)));let n;this.multiple?n=o.length>=2?o:o.length===1?[o[0],this._max]:[this._min,this._max]:n=o.slice(0,1),(n.length!==this._values.length||n.some((r,l)=>r!==this._values[l]))&&(this._values=n,this._syncFormValue())}connectedCallback(){super.connectedCallback(),(this._values.length===0||this._values.length===1&&this._values[0]===0&&this._min!==0)&&(this._values=this.multiple?[this._min,this._max]:[this._min],this._syncFormValue())}updated(e){super.updated(e),(e.has("value")||e.has("min")||e.has("max"))&&this._syncFormValue()}_syncFormValue(){this._internals.setFormValue(this.value)}get _percents(){const e=this._max-this._min||1;return this._values.map(t=>Math.round(100*(Math.max(this._min,Math.min(this._max,t))-this._min)/e))}get _thumbs(){return this._percents.map(e=>({left:`calc(${e}% - ${e/100}em)`}))}get _fill(){if(!this.filled)return null;const e=this._percents,t=this.multiple?Math.min(...e):0,o=(this.multiple?Math.max(...e):e[0])-t;return{left:`${t}%`,width:`${o}%`}}get _tickStepValue(){return this._tickStep??this._step}get _ticks(){if(!this.showTicks)return[];const e=this._tickStepValue,t=[];let i=this._min;for(;i<=this._max;)t.push(i),i+=e;const o=this._max-this._min||1;return t.map(n=>{const r=100*(n-this._min)/o;return{left:`calc(${r}% - ${r/100-.5}em)`}})}_setValue(e,t){const i=T(e,this._min),o=Math.max(this._min,Math.min(this._max,i));if(this._values[t]!==o){const n=[...this._values];n[t]=o,this._values=n,this._syncFormValue(),this._emitChange()}}_onChange(e){this._emitChange()}_emitChange(){const e=this.value,t=this.multiple?this._percents.join(","):String(this._percents[0]);this.dispatchEvent(new CustomEvent("change",{detail:{value:this.multiple?e:Number(e),percent:t},bubbles:!0,composed:!0}))}_setActive(e,t){const i=[...this._active];i[e]=t,this._active=i}_ensureValuesLength(){this.multiple&&this._values.length<2?this._values=[this._min,this._max]:!this.multiple&&this._values.length>1&&(this._values=[this._values[0]])}willUpdate(e){this._ensureValuesLength()}firstUpdated(){this._ensureValuesLength()}_onRangeInput(e,t){const i=e.target.value;this._setValue(Number(i),t)}render(){const e=this.orientation==="vertical";return d`
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
            ${this._values.map((t,i)=>{const o=this._thumbs[i],n=this._active[i],r=`${this.id}-${i}`,l=this.ariaLabel?`${this.ariaLabel}${this.multiple?` (thumb ${i+1})`:""}`:void 0;return d`
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
    `}};fi.styles=[$,Za],fi.formAssociated=!0;let j=fi;J([a({type:String})],j.prototype,"id",2);J([a({type:Number})],j.prototype,"min",1);J([a({type:Number})],j.prototype,"max",1);J([a({type:Number})],j.prototype,"step",1);J([a({type:String,reflect:!0})],j.prototype,"orientation",2);J([a({type:Boolean,reflect:!0})],j.prototype,"filled",1);J([a({type:Boolean,reflect:!0})],j.prototype,"multiple",1);J([a({type:Boolean,reflect:!0})],j.prototype,"disabled",1);J([a({type:Boolean,attribute:"show-ticks"})],j.prototype,"showTicks",1);J([a({type:Number,attribute:"tick-step"})],j.prototype,"tickStep",1);J([a({type:String,attribute:"aria-label"})],j.prototype,"ariaLabel",2);J([a({type:String})],j.prototype,"value",1);J([_()],j.prototype,"_values",2);J([_()],j.prototype,"_active",2);customElements.get(Ns)||customElements.define(Ns,j);const el=w`
  :host {
    overflow: hidden;
    box-sizing: border-box;
    min-height: 0;
  }
`,tl=[$,el];function Ln(s){const[e,t,i]=s;return`${e} ${t} ${i}`}function ct(s,e,t){const i=t.split(" ");return i.length===3?i:[s,e,t]}var il=Object.defineProperty,ol=Object.getOwnPropertyDescriptor,xi=(s,e,t,i)=>{for(var o=i>1?void 0:i?ol(e,t):e,n=s.length-1,r;n>=0;n--)(r=s[n])&&(o=(i?r(e,t,o):r(o))||o);return i&&o&&il(e,t,o),o};const xt="1 1 1e-9px",Rs="swim-split-area",fo=class fo extends y{constructor(){super(...arguments),this._areaBasis=xt,this.shouldAdjustMaxMin=!1,this.initialFlexParts=ct("1","1",xt),this.currentFlexParts=ct("1","1",xt)}get areaBasis(){return this._areaBasis}set areaBasis(e){this._areaBasis!==e&&(this._areaBasis=e||xt,this._applyBasis())}connectedCallback(){super.connectedCallback(),this._applyBasis()}updated(){this.style.flex=Ln(this.currentFlexParts),this.shouldAdjustMaxMin&&this.currentFlexParts[2]?(this.style.minWidth=this.currentFlexParts[2],this.style.maxWidth=this.currentFlexParts[2]):(this.style.minWidth="",this.style.maxWidth="")}updateBasis(e){this.currentFlexParts[2]=e,this.requestUpdate()}_applyBasis(){const e=this._areaBasis||xt,[t,i,o]=ct("1","1",e);this.currentFlexParts=[t,i,o],this.initialFlexParts=[t,i,o],!this.minBasis&&i==="0"&&(this.minBasis=o),!this.maxBasis&&t==="0"&&(this.maxBasis=o),this.requestUpdate()}render(){return d`<slot></slot>`}};fo.styles=tl;let Ze=fo;xi([a({type:String,attribute:"area-basis"})],Ze.prototype,"areaBasis",1);xi([a({type:String,attribute:"min-basis"})],Ze.prototype,"minBasis",2);xi([a({type:String,attribute:"max-basis"})],Ze.prototype,"maxBasis",2);xi([a({type:Boolean,attribute:"should-adjust-max-min"})],Ze.prototype,"shouldAdjustMaxMin",2);customElements.get(Rs)||customElements.define(Rs,Ze);const sl=w`
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
`,nl=[$,sl];var rt=(s=>(s.Row="row",s.Column="column",s))(rt||{}),rl=Object.defineProperty,al=Object.getOwnPropertyDescriptor,On=(s,e,t,i)=>{for(var o=i>1?void 0:i?al(e,t):e,n=s.length-1,r;n>=0;n--)(r=s[n])&&(o=(i?r(e,t,o):r(o))||o);return i&&o&&rl(e,t,o),o};const Zt="0 0 15px",Vs="swim-split-handle",_o=class _o extends y{constructor(){super(...arguments),this._handleBasis=Zt,this.direction=rt.Row,this.currentFlexParts=ct("0","0",Zt),this._boundMouseUp=this._onMouseUp.bind(this),this._boundMouseMove=this._onMouseMove.bind(this)}get handleBasis(){return this._handleBasis}set handleBasis(e){this._handleBasis!==e&&(this._handleBasis=e||Zt,this.currentFlexParts=ct("0","0",this._handleBasis),this.requestUpdate())}connectedCallback(){super.connectedCallback(),this.currentFlexParts=ct("0","0",this._handleBasis||Zt)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("mouseup",this._boundMouseUp,!0),document.removeEventListener("mousemove",this._boundMouseMove,!0)}updated(){this.style.flex=Ln(this.currentFlexParts)}_onMouseDown(e){e.preventDefault(),document.addEventListener("mouseup",this._boundMouseUp,!0),document.addEventListener("mousemove",this._boundMouseMove,!0),this.dispatchEvent(new CustomEvent("dragstart",{detail:e,bubbles:!0,composed:!0}))}_onMouseMove(e){this.dispatchEvent(new CustomEvent("drag",{detail:e,bubbles:!0,composed:!0}))}_onMouseUp(e){document.removeEventListener("mouseup",this._boundMouseUp,!0),document.removeEventListener("mousemove",this._boundMouseMove,!0),this.dispatchEvent(new CustomEvent("dragend",{detail:e,bubbles:!0,composed:!0}))}_onDblClick(e){this.dispatchEvent(new CustomEvent("dblclick",{detail:e,bubbles:!0,composed:!0}))}render(){return d`
      <button
        type="button"
        class="swim-split-handle__grip"
        aria-label="Resize split"
        @mousedown="${this._onMouseDown}"
        @dblclick="${this._onDblClick}"
      >
        <swim-icon font-icon="split-handle"></swim-icon>
      </button>
    `}};_o.styles=nl;let Lt=_o;On([a({type:String,attribute:"handle-basis"})],Lt.prototype,"handleBasis",1);On([a({type:String,reflect:!0})],Lt.prototype,"direction",2);customElements.get(Vs)||customElements.define(Vs,Lt);const ll=w`
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
`,cl=[$,ll];function pt(s){const e=String(s).indexOf("calc")>-1;return String(s).indexOf("%")>-1&&!e}function ge(s){return typeof s=="string"?Number(s.replace(/%/g,"").replace(/px/g,"").trim()):s}function Bn(s,e,t,i,o,n){let r=s?pt(s)?ge(s):ge(s)/n:0,l=e?pt(e)?ge(e):ge(e)/n:100;return r=Math.max(r,i==="0"?o:0),l=Math.min(l,t==="0"?o:100),[r,l]}function Hs(s,e,t){const[i,o,n]=s.currentFlexParts,r=pt(n),l=ge(n),c=s.initialFlexParts[2],h=pt(c)?ge(c):ge(c)/t,m=r?l*t:l;let u=m+e,p=u/t;const[b,x]=Bn(s.minBasis,s.maxBasis,i,o,h,t);return p=Math.max(p,b),p=Math.min(p,x),u=p*t,s.updateBasis(r?p+"%":u+"px"),u-m}var dl=Object.defineProperty,Pn=(s,e,t,i)=>{for(var o=void 0,n=s.length-1,r;n>=0;n--)(r=s[n])&&(o=r(e,t,o)||o);return o&&dl(e,t,o),o};const Ys="swim-split",vo=class vo extends y{constructor(){super(...arguments),this.direction=rt.Row,this._areas=[],this._handles=[],this._handleListeners=new Map,this._onSlotChange=()=>{this._collectAreasAndHandles(),this._removeHandleListeners(),this._attachHandleListeners()}}connectedCallback(){super.connectedCallback(),this.addEventListener("slotchange",this._onSlotChange)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("slotchange",this._onSlotChange),this._removeHandleListeners()}updated(e){e.has("direction")&&this._handles.forEach(t=>{t.direction=this.direction})}firstUpdated(){requestAnimationFrame(()=>{this._collectAreasAndHandles(),this._attachHandleListeners()})}_collectAreasAndHandles(){if(!this.slotEl)return;const e=this.slotEl.assignedElements({flatten:!0});this._areas=e.filter(t=>{var i;return((i=t.tagName)==null?void 0:i.toLowerCase())==="swim-split-area"}),this._handles=e.filter(t=>{var i;return((i=t.tagName)==null?void 0:i.toLowerCase())==="swim-split-handle"}),this._handles.forEach(t=>{t.direction=this.direction})}_attachHandleListeners(){this._handles.forEach(e=>{const t=o=>{const n=o.detail;n&&this._onDrag(n)},i=()=>this._onDblClick();this._handleListeners.set(e,{drag:t,dblclick:i}),e.addEventListener("drag",t),e.addEventListener("dblclick",i)})}_removeHandleListeners(){this._handles.forEach(e=>{const t=this._handleListeners.get(e);t&&(e.removeEventListener("drag",t.drag),e.removeEventListener("dblclick",t.dblclick),this._handleListeners.delete(e))})}_resize(e){const o=(this.direction===rt.Row?this.clientWidth:this.clientHeight)/100,n=this._areas;if(n.length===0)return;const[r,...l]=n;let c=e;c=Hs(r,c,o),l.forEach(h=>{c+=Hs(h,-c,o)})}_onDrag(e){const t=this.direction===rt.Row?e.movementX:e.movementY;this._resize(t)}_onDblClick(){const i=(this.direction===rt.Row?this.clientWidth:this.clientHeight)/100,n=this._areas[0];if(!n)return;const[r,l,c]=n.currentFlexParts,h=pt(c),m=ge(c),p=(h?m*i:m)/i,b=n.initialFlexParts[2],x=pt(b)?ge(b):ge(b)/i,[B,H]=Bn(n.minBasis,n.maxBasis,r,l,x,i),M=p-B,L=H-p,F=(M<L?L:-M)*i;this._resize(F)}render(){return d`<slot></slot>`}};vo.styles=cl;let Ot=vo;Pn([a({type:String,reflect:!0})],Ot.prototype,"direction");Pn([K("slot")],Ot.prototype,"slotEl");customElements.get(Ys)||customElements.define(Ys,Ot);const hl=w`
  ${$}

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
`;var nt=(s=>(s.Indeterminate="indeterminate",s.Determinate="determinate",s))(nt||{}),Ae=(s=>(s.Default="default",s.Icon="icon",s))(Ae||{}),ul=Object.defineProperty,pl=Object.getOwnPropertyDescriptor,ne=(s,e,t,i)=>{for(var o=i>1?void 0:i?pl(e,t):e,n=s.length-1,r;n>=0;n--)(r=s[n])&&(o=(i?r(e,t,o):r(o))||o);return i&&o&&ul(e,t,o),o};const ml=50,bl=100,Ri=100,ti=Ri/2,gl=ti*2*Math.PI,fl="cloud-upload",_l="check",vl="x",qs="swim-progress-spinner",wo=class wo extends y{constructor(){super(...arguments),this.mode=nt.Indeterminate,this.color="var(--blue-500)",this.failStatusColor="var(--red-500)",this.appearance=Ae.Default,this.inProgressIconName="",this.completeIconName="",this.failIconName="",this._isFailure=!1,this._value=0,this._total=100,this._diameter=100,this._strokeWidth=3,this._boundSlotChange=()=>this.requestUpdate()}get isFailure(){return this._isFailure}set isFailure(e){this._isFailure=f(e)}get value(){return this._value}set value(e){const t=T(e,0);this._value!==t&&(this._value=t)}get total(){return this._total}set total(e){const t=T(e,100);this._total!==t&&(this._total=t)}get diameter(){return this._diameter}set diameter(e){const t=T(e,100);this._diameter!==t&&(this._diameter=t)}get strokeWidth(){return this._strokeWidth}set strokeWidth(e){const t=T(e,3);this._strokeWidth!==t&&(this._strokeWidth=t)}get circumference(){return gl}get modeValue(){return this.mode===nt.Determinate||this.isComplete?this.value:ml}get modeTotal(){return this.mode===nt.Determinate||this.isComplete?this.total:bl}get percentage(){return 100/this.modeTotal*this.modeValue}get isComplete(){return this.value>=this.total&&this.total>0}get spinnerColor(){return this.isComplete&&this.isFailure?this.failStatusColor:this.color}get strokeDasharray(){return`${this.circumference} ${this.circumference}`}get strokeDashoffset(){return this.circumference-this.percentage/100*this.circumference}hasSlotContent(e){var i;const t=(i=this.shadowRoot)==null?void 0:i.querySelector(`slot[name="${e}"]`);return!!(t!=null&&t.assignedNodes().length)}connectedCallback(){super.connectedCallback(),this.addEventListener("slotchange",this._boundSlotChange)}disconnectedCallback(){this.removeEventListener("slotchange",this._boundSlotChange),super.disconnectedCallback()}get effectiveInProgressIcon(){return this.hasSlotContent("in-progress-icon")?"":this.inProgressIconName||(this.appearance===Ae.Icon?fl:"")}get effectiveCompleteIcon(){return this.hasSlotContent("complete-icon")?"":this.completeIconName||(this.appearance===Ae.Icon?_l:"")}get effectiveFailIcon(){return this.hasSlotContent("fail-icon")?"":this.failIconName||(this.appearance===Ae.Icon?vl:"")}render(){const e=this.appearance===Ae.Icon&&!this.isComplete&&(this.effectiveInProgressIcon||this.hasSlotContent("in-progress-icon")),t=this.appearance===Ae.Icon&&this.isComplete&&!this.isFailure&&(this.effectiveCompleteIcon||this.hasSlotContent("complete-icon")),i=this.appearance===Ae.Icon&&this.isComplete&&this.isFailure&&(this.effectiveFailIcon||this.hasSlotContent("fail-icon"));return d`
      <div
        class="swim-progress-spinner__container ${this.appearance===Ae.Icon?"swim-progress-spinner__container--icon":""}"
        part="container"
        style="--spinner-color: ${this.spinnerColor}"
        role="progressbar"
        aria-valuenow="${this.mode===nt.Determinate?this.value:g}"
        aria-valuemin="0"
        aria-valuemax="${this.mode===nt.Determinate?this.total:g}"
        aria-label="Progress"
      >
        <svg
          class="swim-progress-spinner__svg"
          viewBox="0 0 ${Ri} ${Ri}"
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
            r="${ti}"
            cx="${ti}"
            cy="${ti}"
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
            `:i?d`
              <div class="swim-progress-spinner__icon-failure">
                ${this.hasSlotContent("fail-icon")?d`<slot name="fail-icon"></slot>`:d`<swim-icon font-icon="${this.effectiveFailIcon}"></swim-icon>`}
              </div>
            `:g}
      </div>

      ${this.spinnerLabel?d`
            <div class="swim-progress-spinner__label" part="label">
              ${!this.isComplete&&this.spinnerLabel.inProgressLabel?d`<h4>${this.spinnerLabel.inProgressLabel}</h4>`:this.isComplete&&!this.isFailure&&this.spinnerLabel.completeLabel?d`<h4>${this.spinnerLabel.completeLabel}</h4>`:this.isComplete&&this.isFailure&&this.spinnerLabel.failLabel?d`<h4>${this.spinnerLabel.failLabel}</h4>`:g}
            </div>
          `:g}
    `}};wo.styles=hl;let W=wo;ne([a({type:String,reflect:!0})],W.prototype,"mode",2);ne([a({type:String})],W.prototype,"color",2);ne([a({attribute:"fail-status-color",type:String})],W.prototype,"failStatusColor",2);ne([a({type:String,reflect:!0})],W.prototype,"appearance",2);ne([a({type:String,attribute:"in-progress-icon-name"})],W.prototype,"inProgressIconName",2);ne([a({type:String,attribute:"complete-icon-name"})],W.prototype,"completeIconName",2);ne([a({type:String,attribute:"fail-icon-name"})],W.prototype,"failIconName",2);ne([a({type:Boolean,reflect:!0,attribute:"is-failure"})],W.prototype,"isFailure",1);ne([a({attribute:!1})],W.prototype,"spinnerLabel",2);ne([a({type:Number})],W.prototype,"value",1);ne([a({type:Number})],W.prototype,"total",1);ne([a({type:Number})],W.prototype,"diameter",1);ne([a({attribute:"stroke-width",type:Number})],W.prototype,"strokeWidth",1);customElements.get(qs)||customElements.define(qs,W);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class Vi extends Zi{constructor(e){if(super(e),this.it=g,e.type!==Fe.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===g||e==null)return this._t=void 0,this.it=e;if(e===ae)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;const t=[e];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}}Vi.directiveName="unsafeHTML",Vi.resultType=1;const wl=Ki(Vi),yl=w`
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
`,xl=[$,yl];var N=(s=>(s.top="top",s.bottom="bottom",s.left="left",s.right="right",s))(N||{}),_e=(s=>(s.top="top",s.bottom="bottom",s.left="left",s.right="right",s.center="center",s))(_e||{}),Fn=(s=>(s.popover="popover",s.tooltip="tooltip",s))(Fn||{}),Ie=(s=>(s.all="all",s.focus="focus",s.click="click",s.mouseover="mouseover",s))(Ie||{});const ve=7;function li(s,e,t){return t===_e.left?(s.left??0)-ve:t===_e.right?(s.left??0)+(s.width??0)-(e.width??0)+ve:(s.left??0)+(s.width??0)/2-(e.width??0)/2}function eo(s,e,t){return t===_e.top?(s.top??0)-ve:t===_e.bottom?(s.top??0)+(s.height??0)-(e.height??0)+ve:(s.top??0)+(s.height??0)/2-(e.height??0)/2}function Us(s,e,t){let i=li(s,e,t);return i+(e.width??0)>window.innerWidth&&(i=window.innerWidth-(e.width??0)),i}function js(s,e,t){let i=eo(s,e,t);return i+(e.height??0)>window.innerHeight&&(i=window.innerHeight-(e.height??0)),i}function kl(s,e,t,i,o){return t===N.right?li(s,e,i)+(e.width??0)+o>window.innerWidth:t===N.left?li(s,e,i)-o<0:t===N.top?(s.top??0)-(e.height??0)-o<0:t===N.bottom?eo(s,e,i)+(e.height??0)+o>window.innerHeight:!1}function $l(s,e,t,i,o){return kl(t,e,s,o,i)?s===N.right?N.left:s===N.left?N.right:s===N.top?N.bottom:N.top:s}function El(s,e,t,i,o){let n=0,r=0;return s===N.right?(r=(t.left??0)+(t.width??0)+i,n=js(t,e,o)):s===N.left?(r=(t.left??0)-(e.width??0)-i,n=js(t,e,o)):s===N.top?(n=(t.top??0)-(e.height??0)-i,r=Us(t,e,o)):(n=(t.top??0)+(t.height??0)+i,r=Us(t,e,o)),{top:n,left:r}}function Gs(s,e,t,i){let o;i===_e.left?o=(s.width??0)/2-(t.width??0)/2+ve:i===_e.right?o=(e.width??0)-(s.width??0)/2-(t.width??0)/2-ve:o=(e.width??0)/2-(t.width??0)/2;const n=li(s,e,i);return n+(e.width??0)>window.innerWidth&&(o+=n+(e.width??0)-window.innerWidth),o}function Ws(s,e,t,i){let o;i===_e.top?o=(s.height??0)/2-(t.height??0)/2+ve:i===_e.bottom?o=(e.height??0)-(s.height??0)/2-(t.height??0)/2-ve:o=(e.height??0)/2-(t.height??0)/2;const n=eo(s,e,i);return n+(e.height??0)>window.innerHeight&&(o+=n+(e.height??0)-window.innerHeight),o}function Cl(s,e,t,i,o){let n=0,r=0;return s===N.right?(r=-ve,n=Ws(t,e,i,o)):s===N.left?(r=e.width??0,n=Ws(t,e,i,o)):s===N.top?(n=e.height??0,r=Gs(t,e,i,o)):(n=-ve,r=Gs(t,e,i,o)),{top:n,left:r}}var Sl=Object.defineProperty,Dl=Object.getOwnPropertyDescriptor,R=(s,e,t,i)=>{for(var o=i>1?void 0:i?Dl(e,t):e,n=s.length-1,r;n>=0;n--)(r=s[n])&&(o=(i?r(e,t,o):r(o))||o);return i&&o&&Sl(e,t,o),o};const Ks="swim-tooltip",yo=class yo extends y{constructor(){super(...arguments),this.content="",this.placement=N.top,this.alignment=_e.center,this.type=Fn.popover,this.showEvent=Ie.all,this._spacing=10,this._showCaret=!0,this._disabled=!1,this._closeOnClickOutside=!0,this._closeOnMouseLeave=!0,this._hideTimeout=300,this._showTimeout=100,this.cssClass="",this._open=!1,this._panelTop=0,this._panelLeft=0,this._effectivePlacement=N.top,this._caretTop=0,this._caretLeft=0,this._animate=!1,this._triggerRef=null,this._panelRef=null,this._caretRef=null,this._boundDocumentClick=null,this._openFromClick=!1,this._tooltipId=`swim-tooltip-${Math.random().toString(36).slice(2,11)}`,this._throttledPosition=()=>{this._throttleTimeout==null&&(this._throttleTimeout=window.setTimeout(()=>{this._throttleTimeout=void 0,this._open&&this._position()},100))},this._panelForHideListeners=null,this._panelMouseEnterBound=()=>this._clearHideTimer(),this._panelMouseLeaveBound=e=>{var i;const t=e.relatedTarget;t&&((i=this._triggerRef)!=null&&i.contains(t))||this.hide()},this._onTriggerFocus=()=>{this._listensFocus&&this.show()},this._onTriggerBlur=()=>{this._listensFocus&&this.hide(!0)},this._onTriggerMouseEnter=()=>{this._listensHover&&this.show()},this._onTriggerMouseLeave=e=>{var o;const t=e.relatedTarget,i=this._panelRef??((o=this.shadowRoot)==null?void 0:o.querySelector(".swim-tooltip__panel"));i!=null&&i.contains(t)||(this._listensHover&&this.closeOnMouseLeave&&this.hide(),this._listensClick&&this.hide())},this._onPanelMouseLeave=()=>{this.closeOnMouseLeave&&this.hide()},this._onTriggerClick=()=>{if(this.showEvent===Ie.mouseover){this.hide(!0);return}this._listensClick&&(this._openFromClick?this.hide(!0):(this._openFromClick=!0,this.show(!0)))}}get spacing(){return this._spacing}set spacing(e){this._spacing=T(e,10)}get showCaret(){return this._showCaret}set showCaret(e){this._showCaret=f(e)}get disabled(){return this._disabled}set disabled(e){this._disabled=f(e)}get closeOnClickOutside(){return this._closeOnClickOutside}set closeOnClickOutside(e){this._closeOnClickOutside=f(e)}get closeOnMouseLeave(){return this._closeOnMouseLeave}set closeOnMouseLeave(e){this._closeOnMouseLeave=f(e)}get hideTimeout(){return this._hideTimeout}set hideTimeout(e){this._hideTimeout=T(e,300)}get showTimeout(){return this._showTimeout}set showTimeout(e){this._showTimeout=T(e,100)}connectedCallback(){super.connectedCallback(),window.addEventListener("resize",this._throttledPosition)}disconnectedCallback(){window.removeEventListener("resize",this._throttledPosition),this._throttleTimeout!=null&&(window.clearTimeout(this._throttleTimeout),this._throttleTimeout=void 0),this._clearShowTimer(),this._clearHideTimer(),this._removeDocumentClick(),this._removePanelHideListeners(),super.disconnectedCallback()}_hasContentSlot(){return!!this.querySelector('[slot="content"]')}get _listensFocus(){return this.showEvent===Ie.all||this.showEvent===Ie.focus}get _listensHover(){return this.showEvent===Ie.all||this.showEvent===Ie.mouseover}get _listensClick(){return this.showEvent===Ie.all||this.showEvent===Ie.click}show(e=!1){if(this._open||this.disabled)return;this._clearShowTimer(),this._clearHideTimer();const t=()=>{this._open||this.disabled||!(this._hasContentSlot||this.content!=null&&this.content!=="")||(this._open=!0,this._effectivePlacement=this.placement,requestAnimationFrame(()=>{this._position(),requestAnimationFrame(()=>{this._animate=!0,this._addHideListeners()})}),this.dispatchEvent(new CustomEvent("show",{detail:!0,bubbles:!0})))};e?t():this._showTimer=window.setTimeout(t,this.showTimeout)}hide(e=!1){if(!this._open)return;this._clearShowTimer(),this._clearHideTimer();const t=()=>{this._open&&(this._open=!1,this._animate=!1,this._openFromClick=!1,this._removeDocumentClick(),this._removePanelHideListeners(),this.dispatchEvent(new CustomEvent("hide",{detail:!0,bubbles:!0})))};e?t():this._hideTimer=window.setTimeout(t,this.hideTimeout)}_clearShowTimer(){this._showTimer!=null&&(window.clearTimeout(this._showTimer),this._showTimer=void 0)}_clearHideTimer(){this._hideTimer!=null&&(window.clearTimeout(this._hideTimer),this._hideTimer=void 0)}_removeDocumentClick(){this._boundDocumentClick&&(document.removeEventListener("click",this._boundDocumentClick,!0),this._boundDocumentClick=null)}_position(){var c,h,m;const e=this._triggerRef??((c=this.shadowRoot)==null?void 0:c.querySelector(".swim-tooltip__trigger")),t=this._panelRef??((h=this.shadowRoot)==null?void 0:h.querySelector(".swim-tooltip__panel")),i=this._caretRef??((m=this.shadowRoot)==null?void 0:m.querySelector(".swim-tooltip__caret"));if(!e||!t)return;const o=e.getBoundingClientRect();if(!o.height&&!o.width)return;const n=t.getBoundingClientRect();this._effectivePlacement=$l(this.placement,n,o,this.spacing,this.alignment);const{top:r,left:l}=El(this._effectivePlacement,n,o,this.spacing,this.alignment);if(this._panelTop=r,this._panelLeft=l,this.showCaret&&i){const u=i.getBoundingClientRect(),p=Cl(this._effectivePlacement,n,o,u,this.alignment);this._caretTop=p.top,this._caretLeft=p.left}}_removePanelHideListeners(){this._panelForHideListeners&&(this._panelForHideListeners.removeEventListener("mouseenter",this._panelMouseEnterBound),this._panelForHideListeners.removeEventListener("mouseleave",this._panelMouseLeaveBound),this._panelForHideListeners=null)}_addHideListeners(){var t;const e=this._panelRef??((t=this.shadowRoot)==null?void 0:t.querySelector(".swim-tooltip__panel"));e&&(this._removePanelHideListeners(),this._panelForHideListeners=e,e.addEventListener("mouseenter",this._panelMouseEnterBound),this.closeOnMouseLeave&&e.addEventListener("mouseleave",this._panelMouseLeaveBound),this.closeOnClickOutside&&(this._boundDocumentClick=i=>{var n;const o=i.target;e.contains(o)||(n=this._triggerRef)!=null&&n.contains(o)||this.hide(!0)},setTimeout(()=>document.addEventListener("click",this._boundDocumentClick,!0),0)))}firstUpdated(){var e,t,i;this._triggerRef=(e=this.shadowRoot)==null?void 0:e.querySelector(".swim-tooltip__trigger"),this._panelRef=(t=this.shadowRoot)==null?void 0:t.querySelector(".swim-tooltip__panel"),this._caretRef=(i=this.shadowRoot)==null?void 0:i.querySelector(".swim-tooltip__caret")}updated(e){this._open&&(e.has("placement")||e.has("alignment")||e.has("spacing"))&&this._position()}render(){const e=this._hasContentSlot(),t=e||this.content!=null&&this.content!=="",i=["swim-tooltip__panel",`swim-tooltip__panel--type-${this.type}`,`swim-tooltip__panel--position-${this._effectivePlacement}`,this._animate?"swim-tooltip__panel--animate":"",this.cssClass.includes("narrow")?"swim-tooltip__panel--narrow":""].filter(Boolean).join(" ");return d`
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

      ${this._open&&t?d`
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
              ${this.showCaret?d`
                    <span
                      part="caret"
                      class="swim-tooltip__caret swim-tooltip__caret--position-${this._effectivePlacement}"
                      style="top: ${this._caretTop}px; left: ${this._caretLeft}px;"
                    ></span>
                  `:""}
              <div part="content" class="swim-tooltip__content">
                ${e?d`<slot name="content"></slot>`:d`${wl(this.content)}`}
              </div>
            </div>
          `:""}
    `}};yo.styles=xl;let P=yo;R([a({type:String})],P.prototype,"content",2);R([a({type:String,reflect:!0,attribute:"placement"})],P.prototype,"placement",2);R([a({type:String,reflect:!0,attribute:"alignment"})],P.prototype,"alignment",2);R([a({type:String,reflect:!0,attribute:"type"})],P.prototype,"type",2);R([a({type:String,attribute:"show-event"})],P.prototype,"showEvent",2);R([a({type:Number,attribute:"spacing"})],P.prototype,"spacing",1);R([a({type:Boolean,attribute:"show-caret",converter:{fromAttribute:s=>s!=="false",toAttribute:s=>s?"":"false"}})],P.prototype,"showCaret",1);R([a({type:Boolean,reflect:!0})],P.prototype,"disabled",1);R([a({type:Boolean,attribute:"close-on-click-outside"})],P.prototype,"closeOnClickOutside",1);R([a({type:Boolean,attribute:"close-on-mouse-leave"})],P.prototype,"closeOnMouseLeave",1);R([a({type:Number,attribute:"hide-timeout"})],P.prototype,"hideTimeout",1);R([a({type:Number,attribute:"show-timeout"})],P.prototype,"showTimeout",1);R([a({type:String,attribute:"css-class"})],P.prototype,"cssClass",2);R([_()],P.prototype,"_open",2);R([_()],P.prototype,"_panelTop",2);R([_()],P.prototype,"_panelLeft",2);R([_()],P.prototype,"_effectivePlacement",2);R([_()],P.prototype,"_caretTop",2);R([_()],P.prototype,"_caretLeft",2);R([_()],P.prototype,"_animate",2);customElements.get(Ks)||customElements.define(Ks,P);const Al=40,Il=2,Tl=w`
  :host {
    --swim-navbar-bar-size: ${Al}px;
    --swim-navbar-bar-thickness: ${Il}px;
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
`,zl=w`
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
`;var Ml=Object.defineProperty,Ll=Object.getOwnPropertyDescriptor,to=(s,e,t,i)=>{for(var o=Ll(e,t),n=s.length-1,r;n>=0;n--)(r=s[n])&&(o=r(e,t,o)||o);return o&&Ml(e,t,o),o};const Zs="swim-navbar-item",xo=class xo extends y{constructor(){super(...arguments),this._active=0,this._total=0,this._index=0,this._clickBound=()=>this._handleClick()}get active(){return this._active}set active(e){const t=T(e,0);if(this._active!==t){const i=this._active;this._active=t,this.requestUpdate("active",i)}}get total(){return this._total}set total(e){this._total=T(e,0)}get index(){return this._index}set index(e){const t=T(e,0);if(this._index!==t){const i=this._index;this._index=t,this.requestUpdate("index",i)}}connectedCallback(){super.connectedCallback(),this.addEventListener("click",this._clickBound)}disconnectedCallback(){this.removeEventListener("click",this._clickBound),super.disconnectedCallback()}render(){const e=this._active===this._index;return d`
      <div
        class="swim-navbar-item ${e?"swim-navbar-item--active":""}"
        role="tab"
        aria-selected="${e}"
        tabindex="${e?0:-1}"
        @keydown="${this._handleKeyDown}"
      >
        <slot></slot>
      </div>
    `}setActive(){this._active!==this._index&&(this._active=this._index,this.requestUpdate(),this.dispatchEvent(new CustomEvent("active-change",{detail:this._index,bubbles:!0,composed:!0})))}_handleClick(){this.setActive()}_handleKeyDown(e){(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),this.setActive())}};xo.styles=[$,zl];let Je=xo;to([a({type:Number})],Je.prototype,"active");to([a({type:Number})],Je.prototype,"total");to([a({type:Number})],Je.prototype,"index");customElements.get(Zs)||customElements.define(Zs,Je);var Ol=Object.defineProperty,Bl=Object.getOwnPropertyDescriptor,ki=(s,e,t,i)=>{for(var o=i>1?void 0:i?Bl(e,t):e,n=s.length-1,r;n>=0;n--)(r=s[n])&&(o=(i?r(e,t,o):r(o))||o);return i&&o&&Ol(e,t,o),o};const Pl=40,Js="swim-navbar",ko=class ko extends y{constructor(){super(...arguments),this._barAtTop=!1,this._active=0,this._navItems=[],this._slotChangeBound=()=>this._syncFromSlot(),this._activeChangeBound=e=>this._onItemActiveChange(e)}get barAtTop(){return this._barAtTop}set barAtTop(e){this._barAtTop=f(e)}get active(){return this._active}set active(e){const t=T(e,0);t!==this._active&&!isNaN(t)&&t>=0&&(!this._navItems.length||t<this._navItems.length)&&(this._active=t,this._syncItems(),this.dispatchEvent(new CustomEvent("active-change",{detail:this._active,bubbles:!0,composed:!0})))}connectedCallback(){super.connectedCallback(),requestAnimationFrame(()=>this._syncFromSlot())}firstUpdated(){var t;this._syncFromSlot();const e=this._slotEl??((t=this.shadowRoot)==null?void 0:t.querySelector("slot"));e&&e.addEventListener("slotchange",this._slotChangeBound)}disconnectedCallback(){var t;const e=(t=this.shadowRoot)==null?void 0:t.querySelector("slot");e&&e.removeEventListener("slotchange",this._slotChangeBound),this._navItems.forEach(i=>{i.removeEventListener("active-change",this._activeChangeBound)}),super.disconnectedCallback()}goTo(e){const t=T(e,-1);if(t>=0&&t<this._navItems.length&&t!==this._active){const i=this._navItems[t];i&&i.setActive()}}_syncFromSlot(){var o;const e=this._slotEl??((o=this.shadowRoot)==null?void 0:o.querySelector("slot"));let t=(e==null?void 0:e.assignedElements({flatten:!0}))??[];t.length===0&&(t=Array.from(this.children));const i=t.filter(n=>n instanceof Je);this._navItems.forEach(n=>{n.removeEventListener("active-change",this._activeChangeBound)}),this._navItems=i,i.forEach(n=>{n.addEventListener("active-change",this._activeChangeBound)}),this._syncItems()}_syncItems(){const e=this._active,t=this._navItems.length;this._navItems.forEach((i,o)=>{i.index=o,i.total=t,i.active=e})}_onItemActiveChange(e){const t=e.detail;typeof t!="number"||t===this._active||t>=0&&t<this._navItems.length&&(this._active=t,this._syncItems(),this.requestUpdate(),this.dispatchEvent(new CustomEvent("active-change",{detail:this._active,bubbles:!0,composed:!0})))}_getBarTransform(){const e=this._navItems.filter((t,i)=>i<this._active).length;return`translateX(${Pl*e}px)`}render(){const e=this._barAtTop;return d`
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
    `}};ko.styles=[$,Tl];let Xe=ko;ki([K("slot")],Xe.prototype,"_slotEl",2);ki([a({type:Boolean,reflect:!0,attribute:"bar-at-top"})],Xe.prototype,"barAtTop",1);ki([a({type:Number})],Xe.prototype,"active",1);ki([_()],Xe.prototype,"_navItems",2);customElements.get(Js)||customElements.define(Js,Xe);const Fl=[$,w`
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
  `];var Ct=(s=>(s.Error="error",s.Success="success",s.Warning="warning",s))(Ct||{}),Nl=Object.defineProperty,Rl=Object.getOwnPropertyDescriptor,Be=(s,e,t,i)=>{for(var o=i>1?void 0:i?Rl(e,t):e,n=s.length-1,r;n>=0;n--)(r=s[n])&&(o=(i?r(e,t,o):r(o))||o);return i&&o&&Nl(e,t,o),o};const Xs=44,Qs="swim-list",$o=class $o extends y{constructor(){super(...arguments),this.columnLayout="",this.dataSource=[],this.defaultRowStatus=Ct.Error,this.headerLabels=[],this.columns=[],this._hasScrollbar=!1,this._page=1,this._rowsContainer=null,this._scrollBound=e=>this._emitScrollChanges(e)}get height(){return this._height}set height(e){this._height=e===void 0?void 0:T(e)}connectedCallback(){super.connectedCallback()}firstUpdated(){var e;this._rowsContainer=((e=this.renderRoot)==null?void 0:e.querySelector(".swim-list__rows-container"))??null,this._rowsContainer&&(this._rowsContainer.addEventListener("scroll",this._scrollBound),requestAnimationFrame(()=>{var t;if(this._updateScrollbarState(),(t=this.paginationConfig)!=null&&t.index&&this.paginationConfig.index>1&&this.paginationConfig.pageSize>0){this._page=this.paginationConfig.index;const i=Xs*(this.paginationConfig.pageSize*(this._page-1));this._rowsContainer.scrollTo({top:i})}}))}disconnectedCallback(){this._rowsContainer&&(this._rowsContainer.removeEventListener("scroll",this._scrollBound),this._rowsContainer=null),super.disconnectedCallback()}updated(e){(e.has("dataSource")||e.has("height"))&&this._updateScrollbarState()}_updateScrollbarState(){this._rowsContainer&&(this._hasScrollbar=this._rowsContainer.scrollHeight>this._rowsContainer.clientHeight)}_emitScrollChanges(e){var n;const i=e.target.scrollTop;this.dispatchEvent(new CustomEvent("scroll",{detail:i,bubbles:!0}));const o=(n=this.paginationConfig)==null?void 0:n.pageSize;if(o){const r=Math.floor(i/Xs),l=Math.floor(r/o)+1;l!==this._page&&(this._page=l,this.dispatchEvent(new CustomEvent("page-change",{detail:l,bubbles:!0})))}}_getGridStyle(){const e=Math.max(this.headerLabels.length,this.columns.length,1);return this.columnLayout&&this.columnLayout.trim()?this.columnLayout.trim():`repeat(${e}, 1fr)`}_getRowStatus(e){const t=e.status;return t===Ct.Error||t===Ct.Success||t===Ct.Warning?t:this.defaultRowStatus}_getCellValue(e,t,i){if(t==="$index")return`${i+1}.`;const o=e[t];return o==null?"":String(o)}render(){const e=this._getGridStyle(),t=Math.max(this.headerLabels.length,this.columns.length,1),i=this.headerLabels.length>=t?this.headerLabels.slice(0,t):[...this.headerLabels,...Array(t-this.headerLabels.length).fill("")];return d`
      <div
        class="swim-list__headers-container ${this._hasScrollbar?"swim-list__headers-container--scrollable":""}"
        style="grid-template-columns: ${e}"
      >
        ${i.map(o=>d`<span class="swim-list__header-cell">${o}</span>`)}
      </div>
      <hr class="swim-list__divider" />
      <div class="swim-list__rows-container" style=${this._height!==void 0?`height: ${this._height}px`:""}>
        ${this.dataSource.map((o,n)=>{const r=this._getRowStatus(o);return d`
            <div class="swim-list__row swim-list__row--${r}" style="grid-template-columns: ${e}">
              ${this.columns.map(l=>d` <span class="swim-list__cell">${this._getCellValue(o,l,n)}</span> `)}
            </div>
          `})}
      </div>
    `}};$o.styles=Fl;let de=$o;Be([a({type:String,attribute:"column-layout"})],de.prototype,"columnLayout",2);Be([a({type:Array,attribute:!1})],de.prototype,"dataSource",2);Be([a({type:Number})],de.prototype,"height",1);Be([a({attribute:!1})],de.prototype,"paginationConfig",2);Be([a({type:String,attribute:"default-row-status",reflect:!0})],de.prototype,"defaultRowStatus",2);Be([a({type:Array,attribute:!1})],de.prototype,"headerLabels",2);Be([a({type:Array,attribute:!1})],de.prototype,"columns",2);Be([_()],de.prototype,"_hasScrollbar",2);Be([_()],de.prototype,"_page",2);customElements.get(Qs)||customElements.define(Qs,de);const Vl=[$,gt,w`
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
      font-size: var(--font-size-3xl);
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
  `];var St=(s=>(s.Regular="regular",s.Medium="medium",s.Large="large",s))(St||{}),Hl=Object.defineProperty,Yl=Object.getOwnPropertyDescriptor,X=(s,e,t,i)=>{for(var o=i>1?void 0:i?Yl(e,t):e,n=s.length-1,r;n>=0;n--)(r=s[n])&&(o=(i?r(e,t,o):r(o))||o);return i&&o&&Hl(e,t,o),o};const en="swim-dialog",Eo=class Eo extends y{constructor(){super(...arguments),this.dialogTitle="",this.content="",this.class="",this.cssClass="",this.format=St.Regular,this.showBackdrop=!0,this._closeButton=!0,this._visible=!1,this._zIndex=991,this._contentId=`swim-dialog-content-${Math.random().toString(36).slice(2,11)}`,this._titleId=`swim-dialog-title-${Math.random().toString(36).slice(2,11)}`,this._previousActiveElement=null}get title(){return this.dialogTitle}set title(e){e&&(this.dialogTitle=e)}get closeButton(){return this._closeButton}set closeButton(e){this._closeButton=f(e)}get visible(){return this._visible}set visible(e){const t=f(e);this._visible!==t&&(this._visible=t,t?(this._previousActiveElement=typeof document<"u"?document.activeElement:null,this.dispatchEvent(new CustomEvent("open",{bubbles:!0}))):(this._restoreFocus(),this.dispatchEvent(new CustomEvent("close",{detail:void 0,bubbles:!0}))))}get zIndex(){return this._zIndex}set zIndex(e){this._zIndex=T(e,991)}get _contentzIndex(){return this.zIndex+1}get _canClose(){return this.beforeClose?this.beforeClose():!0}_restoreFocus(){this._previousActiveElement&&typeof this._previousActiveElement.focus=="function"&&this._previousActiveElement.focus(),this._previousActiveElement=null}show(){this.visible=!0}hide(){this._canClose&&(this.visible=!1)}_onBackdropClick(){this.hide()}_onKeydown(e){e.key==="Escape"&&(e.stopPropagation(),this.hide())}firstUpdated(){this.visible&&this._contentEl&&this._contentEl.focus({preventScroll:!0})}updated(e){e.has("visible")&&this.visible&&this._contentEl&&requestAnimationFrame(()=>{var t;(t=this._contentEl)==null||t.focus({preventScroll:!0})})}render(){if(!this.visible)return g;const e=this.format===St.Regular||this.format==="regular",t=this.format===St.Large||this.format==="large",i=this.format===St.Medium||this.format==="medium",o=["swim-dialog__content",this.cssClass,t?"swim-dialog__content--large":"",i?"swim-dialog__content--medium":""].filter(Boolean).join(" "),n=this.class.includes("swim-dialog--full-screen"),r=["swim-dialog","swim-dialog--open",this.class,n?"swim-scroll":""].filter(Boolean).join(" ");return d`
      <div class="${r}" style="--swim-dialog-z: ${this.zIndex}" role="presentation">
        ${this.showBackdrop?d`<div class="swim-dialog__backdrop" aria-hidden="true" @click="${this._onBackdropClick}"></div>`:g}
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
                    `:g}
                ${this.dialogTitle?d`
                      <div class="swim-dialog__header">
                        <h2 id="${this._titleId}" class="swim-dialog__title">${this.dialogTitle}</h2>
                      </div>
                    `:g}
                <div class="swim-dialog__body swim-scroll">
                  <slot></slot>
                  ${this.content?d`<div>${this.content}</div>`:g}
                </div>
              `:d`
                <div class="swim-dialog__body swim-scroll">
                  <slot></slot>
                  ${this.content?d`<div>${this.content}</div>`:g}
                </div>
              `}
        </div>
      </div>
    `}};Eo.styles=Vl;let G=Eo;X([a({type:String,attribute:"dialog-title"})],G.prototype,"dialogTitle",2);X([a({type:String})],G.prototype,"title",1);X([a({type:String})],G.prototype,"content",2);X([a({type:String})],G.prototype,"class",2);X([a({type:String,attribute:"css-class"})],G.prototype,"cssClass",2);X([a({type:String,reflect:!0})],G.prototype,"format",2);X([a({type:Boolean,attribute:"show-backdrop",reflect:!0,converter:{fromAttribute:s=>s===null?!0:s!=="false"&&s!=="0",toAttribute:s=>s?"":"false"}})],G.prototype,"showBackdrop",2);X([a({type:Boolean,attribute:"close-button"})],G.prototype,"closeButton",1);X([a({type:Boolean,reflect:!0})],G.prototype,"visible",1);X([a({type:Number})],G.prototype,"zIndex",1);X([a({attribute:!1})],G.prototype,"beforeClose",2);X([_()],G.prototype,"_contentId",2);X([_()],G.prototype,"_titleId",2);X([K(".swim-dialog__content")],G.prototype,"_contentEl",2);customElements.get(en)||customElements.define(en,G);const ql=[$,w`
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
      font-size: var(--font-size-s);
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
  `];var Ul=Object.defineProperty,_t=(s,e,t,i)=>{for(var o=void 0,n=s.length-1,r;n>=0;n--)(r=s[n])&&(o=r(e,t,o)||o);return o&&Ul(e,t,o),o};const tn="swim-large-format-dialog-content",Co=class Co extends y{constructor(){super(...arguments),this.format="large",this.dialogTitle="",this.dialogSubtitle="",this.dialogActionTitle="Close",this.dialogDirtyActionTitle="Cancel",this.dirty=!1}_onCloseOrCancel(){this.dispatchEvent(new CustomEvent("close-or-cancel",{detail:this.dirty,bubbles:!0,composed:!0}))}render(){const e=["format-dialog-container__header-title","format-dialog-container__header-title--with-subtitle"].join(" ");return d`
      <main class="format-dialog-container">
        <header class="format-dialog-container__header">
          <div class="format-dialog-container__header-title ${e}">
            <h1>${this.dialogTitle}</h1>
            ${this.dialogSubtitle?d`<h4>${this.dialogSubtitle}</h4>`:g}
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
    `}};Co.styles=[gt,ql];let Me=Co;_t([a({type:String,reflect:!0})],Me.prototype,"format");_t([a({type:String,attribute:"dialog-title"})],Me.prototype,"dialogTitle");_t([a({type:String,attribute:"dialog-subtitle"})],Me.prototype,"dialogSubtitle");_t([a({type:String,attribute:"dialog-action-title"})],Me.prototype,"dialogActionTitle");_t([a({type:String,attribute:"dialog-dirty-action-title"})],Me.prototype,"dialogDirtyActionTitle");_t([a({type:Boolean,reflect:!0})],Me.prototype,"dirty");customElements.get(tn)||customElements.define(tn,Me);const jl=[$,w`
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
  `];var Gl=Object.defineProperty,Wl=(s,e,t,i)=>{for(var o=void 0,n=s.length-1,r;n>=0;n--)(r=s[n])&&(o=r(e,t,o)||o);return o&&Gl(e,t,o),o};const on="swim-large-format-dialog-footer",So=class So extends y{constructor(){super(...arguments),this.format="large"}render(){return d` <div class="format-dialog-footer"><slot></slot></div> `}};So.styles=jl;let ci=So;Wl([a({type:String,reflect:!0})],ci.prototype,"format");customElements.get(on)||customElements.define(on,ci);const Kl=w`
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
`,Zl=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],Jl=["S","M","T","W","T","F","S"];function Hi(s,e){return s.getFullYear()===e.getFullYear()&&s.getMonth()===e.getMonth()&&s.getDate()===e.getDate()}function Xl(s,e){return s.getFullYear()===e.getFullYear()}function sn(s,e){return new Date(s,e+1,0).getDate()}function Li(s,e,t){return{num:s.getDate(),dayOfWeek:s.getDay(),date:new Date(s),today:Hi(s,t),prevMonth:s.getMonth()<e||s.getMonth()===11&&e===0,nextMonth:s.getMonth()>e||s.getMonth()===0&&e===11}}function ue(s){const e=new Date,t=s.getFullYear(),i=s.getMonth(),o=sn(t,i),n=new Date(t,i,1).getDay(),r=[];if(n>0){const h=sn(t,i-1);for(let m=n-1;m>=0;m--){const u=new Date(t,i-1,h-m);r.push(Li(u,i,e))}}for(let h=1;h<=o;h++)r.push(Li(new Date(t,i,h),i,e));const l=r.length%7;if(l>0){const h=7-l;for(let m=1;m<=h;m++)r.push(Li(new Date(t,i+1,m),i,e))}const c=[];for(let h=0;h<r.length;h+=7)c.push(r.slice(h,h+7));return c}function nn(s){return Math.floor(s/20)*20}function Oi(s,e,t="day"){if(!e)return!1;switch(t){case"year":return s.getFullYear()<e.getFullYear();case"month":return s.getFullYear()<e.getFullYear()||s.getFullYear()===e.getFullYear()&&s.getMonth()<e.getMonth();default:return new Date(s.getFullYear(),s.getMonth(),s.getDate())<new Date(e.getFullYear(),e.getMonth(),e.getDate())}}function Bi(s,e,t="day"){if(!e)return!1;switch(t){case"year":return s.getFullYear()>e.getFullYear();case"month":return s.getFullYear()>e.getFullYear()||s.getFullYear()===e.getFullYear()&&s.getMonth()>e.getMonth();default:return new Date(s.getFullYear(),s.getMonth(),s.getDate())>new Date(e.getFullYear(),e.getMonth(),e.getDate())}}var V=(s=>(s.date="date",s.time="time",s.datetime="datetime",s))(V||{}),je=(s=>(s.HUMAN="human",s.TIMEZONE="timezone",s.LOCAL="local",s.CUSTOM="custom",s))(je||{});const Ql=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],ec=["January","February","March","April","May","June","July","August","September","October","November","December"],tc=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],ic=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],rn={L:"MM/DD/YYYY",l:"M/D/YYYY",LL:"MMMM D, YYYY",ll:"MMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",lll:"MMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A",llll:"ddd, MMM D, YYYY h:mm A",LT:"h:mm A",LTS:"h:mm:ss A"},U={shortDate:"l",shortTime:"LT",shortDateTime:"l LT",shortDateTimeSeconds:"l LTS",date:"ll",time:"LT",dateTime:"lll",dateTimeSeconds:"ll LTS",dateMonth:"MMM YYYY",dateYear:"YYYY",fullDate:"ddd, ll Z [(]zz[)]",fullTime:"LT Z [(]zz[)]",fullDateTime:"llll Z [(]zz[)]",fullDateMonth:"MMM YYYY Z [(]zz[)]",fullDateYear:"YYYY Z [(]zz[)]",localeDate:"L",localeDateTime:"L LT",localeTime:"LT",timezoneDate:"L Z",timezoneDateTime:"L LT Z",timezoneDateTimeSeconds:"L LTS Z",timezoneTime:"LT Z",timezoneDateMonth:"MMM YYYY Z",timezoneDateYear:"YYYY Z",locale:"LLL",shortLocale:"LL",fullLocale:"LLLL"};function Te(s,e=2){return String(s).padStart(e,"0")}function Nn(s,e){if(!e)return{year:s.getFullYear(),month:s.getMonth(),day:s.getDate(),hour:s.getHours(),minute:s.getMinutes(),second:s.getSeconds(),ms:s.getMilliseconds(),dow:s.getDay()};try{const i=new Intl.DateTimeFormat("en-US",{timeZone:e,year:"numeric",month:"numeric",day:"numeric",weekday:"short",hour:"numeric",minute:"numeric",second:"numeric",hour12:!1}).formatToParts(s),o=r=>{var l;return((l=i.find(c=>c.type===r))==null?void 0:l.value)??""},n={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};return{year:parseInt(o("year"),10),month:parseInt(o("month"),10)-1,day:parseInt(o("day"),10),hour:parseInt(o("hour"),10)%24,minute:parseInt(o("minute"),10),second:parseInt(o("second"),10),ms:s.getMilliseconds(),dow:n[o("weekday")]??0}}catch{return Nn(s)}}function an(s,e){if(!e){const t=-s.getTimezoneOffset();return ln(t)}try{const t=s.toLocaleString("en-US",{timeZone:"UTC"}),i=s.toLocaleString("en-US",{timeZone:e}),o=new Date(i).getTime()-new Date(t).getTime(),n=Math.round(o/6e4);return ln(n)}catch{return"+00:00"}}function ln(s){const e=s>=0?"+":"-",t=Math.abs(s);return`${e}${Te(Math.floor(t/60))}:${Te(t%60)}`}function oc(s,e){var t;try{return((t=new Intl.DateTimeFormat("en-US",{timeZone:e||void 0,timeZoneName:"short"}).formatToParts(s).find(o=>o.type==="timeZoneName"))==null?void 0:t.value)??""}catch{return""}}function sc(s){const e=["LLLL","llll","LLL","lll","LTS","LL","ll","LT","L","l"];let t=s;for(const i of e)rn[i]&&(t=t.split(i).join(rn[i]));return t}const nc=/(MMMM|YYYY|dddd|MMM|ddd|SSS|MM|DD|HH|hh|mm|ss|YY|ZZ|zz|M|D|H|h|A|a|Z|z)/g;function rc(s,e,t,i){switch(s){case"YYYY":return String(e.year);case"YY":return String(e.year).slice(-2);case"MMMM":return ec[e.month];case"MMM":return Ql[e.month];case"MM":return Te(e.month+1);case"M":return String(e.month+1);case"DD":return Te(e.day);case"D":return String(e.day);case"dddd":return ic[e.dow];case"ddd":return tc[e.dow];case"HH":return Te(e.hour);case"H":return String(e.hour);case"hh":return Te(e.hour%12||12);case"h":return String(e.hour%12||12);case"mm":return Te(e.minute);case"ss":return Te(e.second);case"SSS":return Te(e.ms,3);case"A":return e.hour>=12?"PM":"AM";case"a":return e.hour>=12?"pm":"am";case"Z":return an(t,i);case"ZZ":return an(t,i).replace(":","");case"zz":case"z":return oc(t,i);default:return s}}function ac(s){return U[s]||s}function kt(s,e,t){const i=Yi(t);let o=sc(e);const n=[];let r=0,l="";for(;r<o.length;){const p=o.indexOf("[",r);if(p===-1){l+=o.slice(r);break}l+=o.slice(r,p);const b=o.indexOf("]",p+1);if(b===-1){l+=o.slice(p);break}n.push(o.slice(p+1,b)),l+=`\0${n.length-1}\0`,r=b+1}o=l;const c=Nn(s,i),h=o.replace(nc,p=>rc(p,c,s,i));let m="",u=0;for(;u<h.length;){const p=h.indexOf("\0",u);if(p===-1){m+=h.slice(u);break}m+=h.slice(u,p);let b=p+1;for(;b<h.length&&h[b]>="0"&&h[b]<="9";)b++;if(h[b]==="\0"&&b>p+1){const x=parseInt(h.slice(p+1,b),10);m+=n[x]??"",u=b+1}else m+=h.slice(p,b||p+1),u=b||p+1}return m}function mt(s){if(s instanceof Date)return Z(s)?s:null;if(!s||typeof s!="string")return null;const e=s.trim();if(!e)return null;const t=new Date(e);if(Z(t))return t;const i=e.match(/^(\d{1,2})\/(\d{4})$/);if(i){const r=new Date(parseInt(i[2],10),parseInt(i[1],10)-1,1);if(Z(r))return r}const o=e.match(/^(\d{4})$/);if(o){const r=new Date(parseInt(o[1],10),0,1);if(Z(r))return r}const n=e.match(/^(\w{3,})\s+(\d{4})$/);if(n){const r=new Date(`${n[1]} 1, ${n[2]}`);if(Z(r))return r}return null}function Z(s){return s instanceof Date&&!isNaN(s.getTime())}function cn(s,e){if(!e||!Z(s))return s;const t=new Date(s),i=[["millisecond",()=>{}],["second",()=>t.setMilliseconds(0)],["minute",()=>{t.setMilliseconds(0),t.setSeconds(0)}],["hour",()=>{t.setMilliseconds(0),t.setSeconds(0),t.setMinutes(0)}],["date",()=>{t.setMilliseconds(0),t.setSeconds(0),t.setMinutes(0),t.setHours(0)}],["month",()=>{t.setMilliseconds(0),t.setSeconds(0),t.setMinutes(0),t.setHours(0),t.setDate(1)}],["year",()=>{t.setMilliseconds(0),t.setSeconds(0),t.setMinutes(0),t.setHours(0),t.setDate(1),t.setMonth(0)}]],o=i.findIndex(([n])=>n===e);return o>=0&&i[o][1](),t}function lc(s,e,t){switch(s){case je.HUMAN:case je.TIMEZONE:switch(e){case V.date:return t==="month"?U.timezoneDateMonth:t==="year"?U.timezoneDateYear:U.timezoneDate;case V.time:return U.timezoneTime;default:return U.timezoneDateTime}case je.LOCAL:switch(e){case V.date:return t==="month"?U.dateMonth:t==="year"?U.dateYear:U.localeDate;case V.time:return U.localeTime;default:return U.localeDateTime}case je.CUSTOM:switch(e){case V.date:return t==="month"?U.dateMonth:t==="year"?U.dateYear:U.date;case V.time:return U.time;default:return U.dateTime}default:return U.localeDate}}function Yi(s){if(s)return s.toLowerCase()==="utc"?"UTC":s}function dn(s,e,t){if(!Z(s))return!1;const i=e?mt(e):null,o=t?mt(t):null;return!!(i&&Z(i)&&s<i||o&&Z(o)&&s>o)}var cc=Object.defineProperty,dc=Object.getOwnPropertyDescriptor,$e=(s,e,t,i)=>{for(var o=i>1?void 0:i?dc(e,t):e,n=s.length-1,r;n>=0;n--)(r=s[n])&&(o=(i?r(e,t,o):r(o))||o);return i&&o&&cc(e,t,o),o};const hn="swim-calendar",Do=class Do extends y{constructor(){super(...arguments),this._value=null,this.disabled=!1,this._currentView="date",this._focusDate=new Date,this._weeks=[],this._startYear=0,this._currentDate=new Date,this._onDayKeyDown=e=>{let t=!1;switch(e.code){case"ArrowDown":this._moveFocus(1,"week"),t=!0;break;case"ArrowUp":this._moveFocus(-1,"week"),t=!0;break;case"ArrowLeft":this._moveFocus(-1,"day"),t=!0;break;case"ArrowRight":this._moveFocus(1,"day"),t=!0;break;case"PageUp":this._moveFocus(-1,e.altKey?"year":"month"),t=!0;break;case"PageDown":this._moveFocus(1,e.altKey?"year":"month"),t=!0;break;case"Home":{const i=new Date(this._focusDate);e.altKey?i.setDate(1):i.setDate(i.getDate()-i.getDay()),this._focusDate=i,this._weeks=ue(this._focusDate),this.requestUpdate(),this.updateComplete.then(()=>this.focusDay()),t=!0;break}case"End":{const i=new Date(this._focusDate);e.altKey?i.setMonth(i.getMonth()+1,0):i.setDate(i.getDate()+(6-i.getDay())),this._focusDate=i,this._weeks=ue(this._focusDate),this.requestUpdate(),this.updateComplete.then(()=>this.focusDay()),t=!0;break}case"Enter":setTimeout(()=>{this.dispatchEvent(new CustomEvent("day-key-enter",{bubbles:!0,composed:!0}))},200);break}t&&(e.stopPropagation(),e.preventDefault())},this._onMonthKeyDown=e=>{let t=!1;switch(e.code){case"ArrowDown":this._moveFocus(3,"month"),t=!0;break;case"ArrowUp":this._moveFocus(-3,"month"),t=!0;break;case"ArrowLeft":this._moveFocus(-1,"month"),t=!0;break;case"ArrowRight":this._moveFocus(1,"month"),t=!0;break;case"PageUp":this._moveFocus(-1,"year"),t=!0;break;case"PageDown":this._moveFocus(1,"year"),t=!0;break;case"Enter":setTimeout(()=>{this.dispatchEvent(new CustomEvent("day-key-enter",{bubbles:!0,composed:!0}))},200);break}t&&(e.stopPropagation(),e.preventDefault())},this._onYearKeyDown=e=>{let t=!1;switch(e.code){case"ArrowDown":this._moveFocus(4,"year"),t=!0;break;case"ArrowUp":this._moveFocus(-4,"year"),t=!0;break;case"ArrowLeft":this._moveFocus(-1,"year"),t=!0;break;case"ArrowRight":this._moveFocus(1,"year"),t=!0;break;case"PageUp":this._moveFocus(-20,"year"),t=!0;break;case"PageDown":this._moveFocus(20,"year"),t=!0;break;case"Enter":setTimeout(()=>{this.dispatchEvent(new CustomEvent("day-key-enter",{bubbles:!0,composed:!0}))},200);break}t&&(e.stopPropagation(),e.preventDefault())}}get value(){return this._value}set value(e){const t=this._value;e&&Z(e)?this._value=new Date(e):this._value=null,this.requestUpdate("value",t)}set minView(e){this._minView=e,this._validateView(),this.requestUpdate()}get minView(){return this._minView||"date"}connectedCallback(){super.connectedCallback(),this._init()}updated(e){super.updated(e),e.has("value")&&this._value&&(this._focusDate=new Date(this._value),this._weeks=ue(this._focusDate),this._startYear=nn(this._focusDate.getFullYear()))}focusDay(){var t;const e=(t=this.shadowRoot)==null?void 0:t.querySelector("button.focus");e==null||e.focus()}render(){switch(this._currentView){case"month":return this._renderMonthView();case"year":return this._renderYearView();default:return this._renderDateView()}}_renderDateView(){const e=this._formatMonthYear(this._focusDate);return d`
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
        <div class="day-name-row">${Jl.map(t=>d`<div class="day-name text-center">${t}</div>`)}</div>
        <table class="day-container" role="grid">
          ${this._weeks.map(t=>d`
              <tr class="day-row" role="row">
                ${t.map(i=>{if(!i.num)return d`<td class="day-cell text-center" role="gridcell"></td>`;const o=this._value?Hi(i.date,this._value):!1,n=Hi(i.date,this._focusDate),r=this.disabled||this._isDayDisabled(i.date),l=["day"];return i.prevMonth&&l.push("prev-month"),i.nextMonth&&l.push("next-month"),i.today&&l.push("today"),o&&l.push("active"),n&&!r&&l.push("focus"),d`
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
    `}_renderMonthView(){const e=String(this._focusDate.getFullYear());return d`
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
            ${Zl.map((t,i)=>{const o=this._isMonthActive(i),n=this._isCurrentMonth(i),r=this._focusDate.getMonth()===i&&Xl(this._focusDate,this._focusDate),l=this.disabled||this._isMonthDisabled(i),c=["month"];return o&&c.push("active"),n&&c.push("current"),r&&c.push("focus"),d`
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
    `}_renderYearView(){const e=Array.from({length:20},(t,i)=>this._startYear+i);return d`
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
            ${e.map(t=>{const i=this._isYearActive(t),o=t===this._currentDate.getFullYear(),n=t===this._focusDate.getFullYear(),r=this.disabled||this._isYearDisabled(t),l=["year"];return i&&l.push("active"),o&&l.push("current"),n&&l.push("focus"),d`
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
    `}_init(){this._value&&(this._focusDate=new Date(this._value)),this._weeks=ue(this._focusDate),this._currentDate=new Date,this._startYear=nn(this._focusDate.getFullYear()),this._validateView()}_validateView(){["date","month","year"].indexOf(this._minView||"date")<0&&(this._minView="date"),this._currentView=this._minView||"date"}_formatMonthYear(e){return`${["January","February","March","April","May","June","July","August","September","October","November","December"][e.getMonth()]} ${e.getFullYear()}`}_resolveMin(){return this.minDate?this.minDate instanceof Date?this.minDate:mt(this.minDate):null}_resolveMax(){return this.maxDate?this.maxDate instanceof Date?this.maxDate:mt(this.maxDate):null}_isDayDisabled(e){return Oi(e,this._resolveMin(),"day")||Bi(e,this._resolveMax(),"day")}_isMonthDisabled(e){const t=new Date(this._focusDate.getFullYear(),e,1);return Oi(t,this._resolveMin(),"month")||Bi(t,this._resolveMax(),"month")}_isYearDisabled(e){const t=new Date(e,0,1);return Oi(t,this._resolveMin(),"year")||Bi(t,this._resolveMax(),"year")}_isMonthActive(e){return this._value?this._value.getMonth()===e&&this._value.getFullYear()===this._focusDate.getFullYear():!1}_isCurrentMonth(e){return this._currentDate.getMonth()===e&&this._currentDate.getFullYear()===this._focusDate.getFullYear()}_isYearActive(e){return this._value?this._value.getFullYear()===e:!1}_prevMonth(){const e=new Date(this._focusDate);e.setMonth(e.getMonth()-1),this._focusDate=e,this._weeks=ue(this._focusDate)}_nextMonth(){const e=new Date(this._focusDate);e.setMonth(e.getMonth()+1),this._focusDate=e,this._weeks=ue(this._focusDate)}_prevYear(){const e=new Date(this._focusDate);e.setFullYear(e.getFullYear()-1),this._focusDate=e}_nextYear(){const e=new Date(this._focusDate);e.setFullYear(e.getFullYear()+1),this._focusDate=e}_prevTwoDecades(){this._startYear-=20}_nextTwoDecades(){this._startYear+=20}_changeViews(){this._currentView==="date"?this._currentView="month":this._currentView==="month"?this._currentView="year":this._currentView=this._minView||"date",this._weeks=ue(this._focusDate)}_onDayClick(e){this._focusDate=new Date(e.date),this._value=new Date(e.date),(e.prevMonth||e.nextMonth)&&(this._weeks=ue(this._focusDate)),this.requestUpdate(),this.dispatchEvent(new CustomEvent("change",{detail:this._value,bubbles:!0,composed:!0}))}_onMonthClick(e){const t=new Date(this._focusDate);t.setMonth(e),this._focusDate=t,this._value=new Date(t),(this._minView||"date")!=="month"&&(this._currentView="date",this._weeks=ue(this._focusDate)),this.requestUpdate(),this.dispatchEvent(new CustomEvent("change",{detail:this._value,bubbles:!0,composed:!0}))}_onYearClick(e){const t=new Date(this._focusDate);t.setFullYear(e),this._focusDate=t,this._value=new Date(t),(this._minView||"date")!=="year"&&(this._currentView="month",this._weeks=ue(this._focusDate)),this.requestUpdate(),this.dispatchEvent(new CustomEvent("change",{detail:this._value,bubbles:!0,composed:!0}))}_moveFocus(e,t){const i=new Date(this._focusDate);switch(t){case"day":i.setDate(i.getDate()+e);break;case"week":i.setDate(i.getDate()+e*7);break;case"month":i.setMonth(i.getMonth()+e);break;case"year":i.setFullYear(i.getFullYear()+e);break}this._focusDate=i,this._weeks=ue(this._focusDate),this._focusDate.getFullYear()<this._startYear?this._prevTwoDecades():this._focusDate.getFullYear()>this._startYear+20&&this._nextTwoDecades(),this.requestUpdate(),this.updateComplete.then(()=>this.focusDay())}};Do.styles=[$,Kl];let oe=Do;$e([a({attribute:!1})],oe.prototype,"value",1);$e([a({attribute:"min-date"})],oe.prototype,"minDate",2);$e([a({attribute:"max-date"})],oe.prototype,"maxDate",2);$e([a({type:Boolean,reflect:!0})],oe.prototype,"disabled",2);$e([a({type:String})],oe.prototype,"timezone",2);$e([a({type:String,attribute:"min-view"})],oe.prototype,"minView",1);$e([_()],oe.prototype,"_currentView",2);$e([_()],oe.prototype,"_focusDate",2);$e([_()],oe.prototype,"_weeks",2);$e([_()],oe.prototype,"_startYear",2);customElements.get(hn)||customElements.define(hn,oe);const hc=w`
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
`;var uc=Object.defineProperty,pc=Object.getOwnPropertyDescriptor,E=(s,e,t,i)=>{for(var o=i>1?void 0:i?pc(e,t):e,n=s.length-1,r;n>=0;n--)(r=s[n])&&(o=(i?r(e,t,o):r(o))||o);return i&&o&&uc(e,t,o),o};let mc=0;const un="swim-date-time",_i=class _i extends y{constructor(){super(),this.id=`swim-date-time-${++mc}`,this.name="",this.label="",this.hint="",this.placeholder="",this.size="sm",this.appearance="legacy",this._disabled=!1,this._required=!1,this.requiredIndicator="*",this._autofocus=!1,this._autosize=!1,this._minWidth=60,this._marginless=!1,this._value=null,this._displayValue="",this._dateInvalid=!1,this._dateOutOfRange=!1,this._focused=!1,this._dialogOpen=!1,this._dialogModel=null,this._dialogHour=12,this._dialogMinute="00",this._dialogSecond="00",this._dialogMillisecond="000",this._dialogAmPm="AM",this._modes=["millisecond","second","minute","hour","date","month","year"],this._apply=()=>{this._dialogModel&&(this.value=this._dialogModel,this._update(),this.dispatchEvent(new CustomEvent("date-time-selected",{detail:this.value,bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("change",{detail:this.value,bubbles:!0,composed:!0}))),this._close()},this._clear=()=>{this.value=void 0,this._update(),this.dispatchEvent(new CustomEvent("date-time-selected",{detail:void 0,bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("change",{detail:void 0,bubbles:!0,composed:!0})),this._close()},this._selectCurrent=()=>{this._setDialogDate(new Date)},this._close=()=>{this._dialogOpen=!1,this._update()},this._onCalendarChange=e=>{e.stopPropagation();const t=e.detail;t&&Z(t)&&(this._dialogModel&&this._showTime&&t.setHours(this._dialogModel.getHours(),this._dialogModel.getMinutes(),this._dialogModel.getSeconds(),this._dialogModel.getMilliseconds()),this._setDialogDate(t))},this._onHourChange=e=>{const t=+e.target.value%12,i=this._dialogAmPm==="PM"?12+t:t;if(this._dialogModel){const o=new Date(this._dialogModel);o.setHours(i),this._setDialogDate(o)}},this._onMinuteChange=e=>{const t=+e.target.value;if(this._dialogModel){const i=new Date(this._dialogModel);i.setMinutes(t),this._setDialogDate(i)}},this._onSecondChange=e=>{const t=+e.target.value;if(this._dialogModel){const i=new Date(this._dialogModel);i.setSeconds(t),this._setDialogDate(i)}},this._onMillisecondChange=e=>{const t=+e.target.value;if(this._dialogModel){const i=new Date(this._dialogModel);i.setMilliseconds(t),this._setDialogDate(i)}},this._onDialogKeyDown=e=>{e.code==="Escape"&&(this._close(),e.stopPropagation(),e.preventDefault())},this._internals=this.attachInternals()}get disabled(){return this._disabled}set disabled(e){const t=this._disabled;this._disabled=f(e),this.requestUpdate("disabled",t)}get required(){return this._required}set required(e){const t=this._required;this._required=f(e),this.requestUpdate("required",t)}get autofocus(){return this._autofocus}set autofocus(e){this._autofocus=f(e)}get autosize(){return this._autosize}set autosize(e){const t=this._autosize;this._autosize=f(e),this.requestUpdate("autosize",t)}get minWidth(){return this._minWidth}set minWidth(e){this._minWidth=T(e)??60}set inputType(e){const t=this._inputType;this._inputType=e,this.requestUpdate("inputType",t)}get inputType(){return this._effectiveInputType}set displayMode(e){const t=this._displayMode;this._displayMode=e,this.requestUpdate("displayMode",t)}get displayMode(){return this._effectiveDisplayMode}get marginless(){return this._marginless}set marginless(e){const t=this._marginless;this._marginless=f(e),this.requestUpdate("marginless",t)}get value(){return this._value}set value(e){const t=this._value;if(typeof e=="string"&&(e=e.trim(),e||(e=null)),!e&&!this._value){this._value=null;return}if(e===this._value)return;let i=e instanceof Date&&Z(e);if(typeof e=="string"){const o=mt(e);o&&(e=o,i=!0)}if(i&&e instanceof Date&&this.precision&&(e=cn(e,this.precision)),this._value=e,this._update(),this._internals){const o=this._value instanceof Date?this._value.toISOString():String(this._value??"");this._internals.setFormValue(o)}this.requestUpdate("value",t)}get _effectiveInputType(){return this._inputType?this._inputType:this.precision==="hour"||this.precision==="minute"?V.datetime:V.date}get _effectiveDisplayMode(){return this._displayMode?this._displayMode:this.timezone?je.TIMEZONE:je.LOCAL}get _effectiveFormat(){return this.format?ac(this.format):lc(this._effectiveDisplayMode,this._effectiveInputType,this.precision)}get _iconName(){switch(this._effectiveInputType){case V.time:return"clock";case V.datetime:return"calendar-clock";default:return"calendar"}}get _showCalendar(){return this._effectiveInputType===V.date||this._effectiveInputType===V.datetime}get _showTime(){return this._effectiveInputType===V.time||this._effectiveInputType===V.datetime}connectedCallback(){super.connectedCallback(),this._update()}disconnectedCallback(){super.disconnectedCallback()}firstUpdated(){this.autofocus&&this._swimInput&&requestAnimationFrame(()=>{var e,t;(t=(e=this._swimInput)==null?void 0:e.focus)==null||t.call(e)})}updated(e){super.updated(e),this.label?this.setAttribute("has-label",""):this.removeAttribute("has-label"),this._dateInvalid?this.setAttribute("date-invalid",""):this.removeAttribute("date-invalid"),this._dateOutOfRange?this.setAttribute("date-out-of-range",""):this.removeAttribute("date-out-of-range"),this._focused?this.setAttribute("focused",""):this.removeAttribute("focused"),(e.has("format")||e.has("precision")||e.has("timezone")||e.has("displayMode")||e.has("inputType"))&&this._update(),(e.has("required")||e.has("minDate")||e.has("maxDate"))&&this._validate()}focus(e){var t,i;(i=(t=this._swimInput)==null?void 0:t.focus)==null||i.call(t,e)}render(){return d`
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
          tabindex="${Se(this.tabindex)}"
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
    `}_renderDialog(){const e=this._getDialogHeaderText();return d`
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

          ${this._showCalendar?d`
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
    `}_renderTimeRow(){const e=this._isTimeDisabled("hour"),t=this._isTimeDisabled("minute"),i=this._isTimeDisabled("second"),o=this._isTimeDisabled("millisecond");return d`
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
    `}get _calendarMinView(){return this.precision==="month"?"month":this.precision==="year"?"year":"date"}_getDialogHeaderText(){if(!this._dialogModel)return"No value";const e=this._effectiveInputType,t=Yi(this.timezone);if(e===V.time)return kt(this._dialogModel,"h:mm a",t);if(e===V.datetime){const i=kt(this._dialogModel,"ddd, MMM D YYYY",t),o=kt(this._dialogModel,"h:mm a",t);return d`${i} <small>${o}</small>`}return kt(this._dialogModel,"ddd, MMM D YYYY",t)}_setDialogDate(e){this._dialogModel=new Date(e);const t=this._dialogModel.getHours();this._dialogHour=t%12||12,this._dialogMinute=String(this._dialogModel.getMinutes()).padStart(2,"0"),this._dialogSecond=String(this._dialogModel.getSeconds()).padStart(2,"0"),this._dialogMillisecond=String(this._dialogModel.getMilliseconds()).padStart(3,"0"),this._dialogAmPm=t>=12?"PM":"AM"}_isTimeDisabled(e){return this.precision?this._modes.indexOf(this.precision)>this._modes.indexOf(e):!1}_isCurrent(){if(!this._dialogModel)return!1;const e=new Date,t=this._effectiveInputType;return t===V.time?e.getHours()===this._dialogModel.getHours()&&e.getMinutes()===this._dialogModel.getMinutes()&&e.getSeconds()===this._dialogModel.getSeconds()&&e.getMilliseconds()===this._dialogModel.getMilliseconds():t===V.datetime?e.getFullYear()===this._dialogModel.getFullYear()&&e.getMonth()===this._dialogModel.getMonth()&&e.getDate()===this._dialogModel.getDate()&&e.getHours()===this._dialogModel.getHours()&&e.getMinutes()===this._dialogModel.getMinutes()&&e.getSeconds()===this._dialogModel.getSeconds()&&e.getMilliseconds()===this._dialogModel.getMilliseconds():e.getFullYear()===this._dialogModel.getFullYear()&&e.getMonth()===this._dialogModel.getMonth()&&e.getDate()===this._dialogModel.getDate()}_openPicker(){if(this.disabled||this._dialogOpen)return;const e=this._value instanceof Date&&Z(this._value)?this._value:new Date;this._setDialogDate(e),this._dialogOpen=!0}_onAmPmChange(e){if(!this._dialogModel)return;const t=new Date(this._dialogModel),i=t.getHours();e==="AM"&&this._dialogAmPm==="PM"?t.setHours(i-12):e==="PM"&&this._dialogAmPm==="AM"&&t.setHours(i+12),this._setDialogDate(t)}_handleInput(e){e.stopPropagation();const i=e.target.value;this._displayValue=i;const o=mt(i),n=this._value;if(o){const r=this.precision?cn(o,this.precision):o;this._value=r,this._dateInvalid=!1}else i?(this._value=i,this._dateInvalid=!0):(this._value=null,this._dateInvalid=!1);this._dateOutOfRange=!this._dateInvalid&&this._value instanceof Date?dn(this._value,this.minDate,this.maxDate):!1,this._updateFormValue(),this.dispatchEvent(new CustomEvent("input-change",{detail:this._value,bubbles:!0,composed:!0})),this._value!==n&&this.dispatchEvent(new CustomEvent("value-change",{detail:this._value,bubbles:!0,composed:!0})),!this._dateInvalid&&this._value!==n&&this.dispatchEvent(new CustomEvent("change",{detail:this._value,bubbles:!0,composed:!0}))}_handleFocus(e){e.stopPropagation(),this._focused=!0,this.dispatchEvent(new FocusEvent("focus",{bubbles:!0,composed:!0}))}_handleBlur(e){e.stopPropagation(),this._focused=!1,this._update(),!this._dateInvalid&&this._swimInput&&this._swimInput.value!==this._displayValue&&(this._swimInput.value=this._displayValue),this.dispatchEvent(new FocusEvent("blur",{bubbles:!0,composed:!0}))}_handleKeyDown(e){e.code==="ArrowDown"?(e.preventDefault(),this._openPicker()):e.code==="Escape"&&(this._dialogOpen&&this._close(),e.stopPropagation())}_update(){const e=this._value,t=e instanceof Date&&Z(e);if(this._dateInvalid=!!e&&!t,this._displayValue=e?String(e):"",this._dateOutOfRange=!1,!t)return;const i=Yi(this.timezone);this._displayValue=kt(e,this._effectiveFormat,i),this._dateOutOfRange=dn(e,this.minDate,this.maxDate)}_validate(){let e={},t="";this._required&&!this._value?(e={valueMissing:!0},t="A value is required."):this._dateInvalid?(e={typeMismatch:!0},t="Invalid date."):this._dateOutOfRange&&(e={rangeOverflow:!0},t="Date is out of the allowed range."),t?this._internals.setValidity(e,t):this._internals.setValidity({})}_updateFormValue(){if(!this._internals)return;const e=this._value;e instanceof Date&&Z(e)?this._internals.setFormValue(e.toISOString()):this._internals.setFormValue(String(e??"")),this._validate()}formResetCallback(){this._value=null,this._displayValue="",this._dateInvalid=!1,this._dateOutOfRange=!1,this._internals.setFormValue(""),this._internals.setValidity({}),this.requestUpdate()}formDisabledCallback(e){this.disabled=e}};_i.styles=[$,hc],_i.formAssociated=!0;let k=_i;E([K("swim-input")],k.prototype,"_swimInput",2);E([a({type:String})],k.prototype,"id",2);E([a({type:String})],k.prototype,"name",2);E([a({type:String})],k.prototype,"label",2);E([a({type:String})],k.prototype,"hint",2);E([a({type:String})],k.prototype,"placeholder",2);E([a({type:String,reflect:!0})],k.prototype,"size",2);E([a({type:String,reflect:!0})],k.prototype,"appearance",2);E([a({type:Boolean,reflect:!0})],k.prototype,"disabled",1);E([a({type:Boolean,reflect:!0})],k.prototype,"required",1);E([a({type:String,attribute:"required-indicator"})],k.prototype,"requiredIndicator",2);E([a({type:Boolean})],k.prototype,"autofocus",1);E([a({type:Boolean,reflect:!0})],k.prototype,"autosize",1);E([a({type:Number,attribute:"min-width"})],k.prototype,"minWidth",1);E([a({type:Number})],k.prototype,"tabindex",2);E([a({type:String,attribute:"input-type"})],k.prototype,"inputType",1);E([a({type:String})],k.prototype,"precision",2);E([a({type:String})],k.prototype,"timezone",2);E([a({type:String,attribute:"display-mode"})],k.prototype,"displayMode",1);E([a({type:String})],k.prototype,"format",2);E([a({type:Boolean,reflect:!0})],k.prototype,"marginless",1);E([a({attribute:"min-date"})],k.prototype,"minDate",2);E([a({attribute:"max-date"})],k.prototype,"maxDate",2);E([a({attribute:!1})],k.prototype,"value",1);E([_()],k.prototype,"_displayValue",2);E([_()],k.prototype,"_dateInvalid",2);E([_()],k.prototype,"_dateOutOfRange",2);E([_()],k.prototype,"_focused",2);E([_()],k.prototype,"_dialogOpen",2);E([_()],k.prototype,"_dialogModel",2);E([_()],k.prototype,"_dialogHour",2);E([_()],k.prototype,"_dialogMinute",2);E([_()],k.prototype,"_dialogSecond",2);E([_()],k.prototype,"_dialogMillisecond",2);E([_()],k.prototype,"_dialogAmPm",2);customElements.get(un)||customElements.define(un,k);const bc=[$,gt,w`
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
  `];var at=(s=>(s.Left="left",s.Right="right",s.Bottom="bottom",s))(at||{}),gc=Object.defineProperty,fc=Object.getOwnPropertyDescriptor,Ee=(s,e,t,i)=>{for(var o=i>1?void 0:i?fc(e,t):e,n=s.length-1,r;n>=0;n--)(r=s[n])&&(o=(i?r(e,t,o):r(o))||o);return i&&o&&gc(e,t,o),o};const pn="swim-drawer",Ao=class Ao extends y{constructor(){super(...arguments),this.cssClass="",this.direction=at.Left,this._size=80,this._zIndex=998,this._closeOnOutsideClick=!0,this._isRoot=!0,this._open=!1,this._closing=!1,this._contentId=`swim-drawer-content-${Math.random().toString(36).slice(2,11)}`,this._previousActiveElement=null,this._backdropClickBound=()=>this._onBackdropClick(),this._keydownBound=e=>this._onKeydown(e),this._portalTarget=null}get size(){return this._size}set size(e){this._size=T(e,80)}get zIndex(){return this._zIndex}set zIndex(e){this._zIndex=T(e,998)}get closeOnOutsideClick(){return this._closeOnOutsideClick}set closeOnOutsideClick(e){this._closeOnOutsideClick=f(e)}get isRoot(){return this._isRoot}set isRoot(e){this._isRoot=f(e)}get open(){return this._open}set open(e){const t=f(e);this._open!==t&&(this._open=t,this.requestUpdate(),t?this._previousActiveElement=typeof document<"u"?document.activeElement:null:this._restoreFocus())}get _isLeft(){return this.direction===at.Left||this.direction==="left"}get _isRight(){return this.direction===at.Right||this.direction==="right"}get _isBottom(){return this.direction===at.Bottom||this.direction==="bottom"}get _widthSize(){return(this._isLeft||this._isRight)&&this.size?`${this.size}%`:"100%"}get _heightSize(){return this._isBottom&&this.size?`${this.size}%`:"100%"}get _isVisible(){return this.open||this._closing}_restoreFocus(){this._previousActiveElement&&typeof this._previousActiveElement.focus=="function"&&this._previousActiveElement.focus(),this._previousActiveElement=null}_emitClose(){this.dispatchEvent(new CustomEvent("close",{detail:!0,bubbles:!0}))}_onBackdropClick(){this.closeOnOutsideClick&&this.isRoot&&this.hide()}_onKeydown(e){e.key==="Escape"&&this.open&&(e.preventDefault(),this.hide())}show(){this.isRoot&&this.parentElement&&this.parentElement!==document.body&&(this._portalTarget=this.parentElement,document.body.appendChild(this)),this.open=!0}hide(){this._closing||!this.open||(this._closing=!0,this._clearCloseTimeout(),this._closeTimeout=window.setTimeout(()=>{this._closeTimeout=void 0,this._closing=!1,this.open=!1,this._portalTarget&&this._portalTarget.isConnected&&this.parentElement===document.body&&this._portalTarget.appendChild(this),this._portalTarget=null,this._emitClose()},150))}connectedCallback(){super.connectedCallback(),document.addEventListener("keydown",this._keydownBound)}disconnectedCallback(){document.removeEventListener("keydown",this._keydownBound),this._clearCloseTimeout(),super.disconnectedCallback()}_clearCloseTimeout(){this._closeTimeout!==void 0&&(clearTimeout(this._closeTimeout),this._closeTimeout=void 0)}willUpdate(){const t=["swim-drawer",this._isLeft?"swim-drawer--left":this._isRight?"swim-drawer--right":"swim-drawer--bottom",this.isRoot?"swim-drawer--root":"swim-drawer--contained"];this.open&&!this._closing&&t.push("swim-drawer--open"),this._closing&&t.push("swim-drawer--closing"),this.cssClass&&t.push(...this.cssClass.trim().split(/\s+/).filter(Boolean)),this.className=t.join(" "),this.isRoot&&this.style.setProperty("--swim-drawer-z",String(this.zIndex))}firstUpdated(){this.open&&this._contentEl&&this._contentEl.focus({preventScroll:!0})}updated(e){e.has("open")&&this.open&&this._contentEl&&requestAnimationFrame(()=>{var t;(t=this._contentEl)==null||t.focus({preventScroll:!0})})}render(){return this._isVisible?d`
      ${this.isRoot?d` <div class="swim-drawer__backdrop" aria-hidden="true" @click="${this._backdropClickBound}"></div> `:g}
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
    `:g}};Ao.styles=bc;let se=Ao;Ee([a({type:String,attribute:"css-class"})],se.prototype,"cssClass",2);Ee([a({type:String,reflect:!0})],se.prototype,"direction",2);Ee([a({type:Number})],se.prototype,"size",1);Ee([a({type:Number})],se.prototype,"zIndex",1);Ee([a({type:Boolean,attribute:"close-on-outside-click",reflect:!0,converter:{fromAttribute:s=>s!==null&&s!=="false"&&s!=="0",toAttribute:s=>s?"":"false"}})],se.prototype,"closeOnOutsideClick",1);Ee([a({type:Boolean,attribute:"is-root",reflect:!0,converter:{fromAttribute:s=>s!==null&&s!=="false"&&s!=="0",toAttribute:s=>s?"":"false"}})],se.prototype,"isRoot",1);Ee([a({type:Boolean,reflect:!0})],se.prototype,"open",1);Ee([_()],se.prototype,"_closing",2);Ee([_()],se.prototype,"_contentId",2);Ee([K(".swim-drawer__content")],se.prototype,"_contentEl",2);customElements.get(pn)||customElements.define(pn,se);const _c=["3d-rotate","action","action-close","action-maximize","action-maximize-inverse","action-minimize","action-outline","action-outline-small","add-circle","add-circle-filled","add-circle-medium","add-circle-thin","add-edge","add-new","add-node","advanced-pie","ai-agent","alert","app-store","app-workspaces","applet","applets","application","apps","area-chart","arrow-bold-circle-left","arrow-bold-circle-right","arrow-bold-down","arrow-bold-left","arrow-bold-right","arrow-bold-up","arrow-down","arrow-input","arrow-left","arrow-output","arrow-right","arrow-right-down-medium","arrow-right-medium","arrow-tail-left","arrow-tail-right","arrow-tail-solid-left","arrow-tail-solid-right","arrow-tail-subright","arrow-up","asset-outline","asset-outline-small","assets","attachment","automation","automation-alternate","back-arrow","back-arrow-filled","bars","bell","bell-alarm","bold","bolt","branch-node","branch-node-vert","broom","browser-size","bug","builder","builder-outline","button-push-outline","button-push-outline-large","button-push-outline-small","calendar","calendar-clock","calender-clock","cards","center-align","chart-area","chart-bar-bar","chart-bubble","chart-donut","chart-full-stacked-area","chart-heat","chart-horz-full-stack-bar","chart-number-card","chart-pie","chart-pie-grid","chart-scatter","chart-spider","chart-stacked-area","chart-vert-bar","chart-vert-bar2","chart-vert-stacked-bar","check","check-filled","check-filled-sm","check-square-filled","checklist","chevron-bold-down","chevron-bold-left","chevron-bold-right","chevron-bold-up","circle","circle-filled","circles","circuit-board","clipboard","clock","cloud-download","cloud-upload","code","cog","collapse","commandline","comments","component","component-create","condition","copy","copy-app","copy-filled","credit-card","dashboard","dashboard-outline","database","debug","devil","disable","document","documentation","domain","dots-horz","dots-vert","dots-vert-round","double-down","double-left","double-right","double-up","downgrade","downgrade-horizontal","download-outline","download-outline-large","download-outline-small","drag","edit","edit-app","edit-outline","edit-outline-large","edit-outline-small","email","enrich-small","escalate","events-outline","events-outline-small","expand","explore","export","export-filled","export-outline","export-outline-large","export-outline-small","eye","eye-disabled","eye-hidden","field-created-by","field-created-date","field-date","field-double-select","field-dynamic","field-edited-by","field-edited-date","field-grid","field-html","field-json","field-list","field-list-small","field-lists","field-multiselect","field-number","field-numeric","field-richtext","field-single-select","field-singleline","field-text","field-textarea","field-textual","field-users","filter","filter-bar","find-page","flame","folder","folder-closed-small","folder-open-small","folders","font","format-indent-decrease","format-indent-increase","formula","forward-arrow","forward-arrow-filled","full-align","gauge","gear","gear-small","gear-square","globe","graph","graph-alt1","grid-view","hand","handle","heat","helper","history","horz-bar-graph-grouped","horz-stacked-bar","html-code","icon-chart-bar-horizontal","icon-chart-horz-bar","import-outline","import-outline-large","import-outline-small","info-filled","info-filled-2","info-filled-small","ingest-small","inspect","integration","integrations","ip","italic","key","key-outline","key-outline-small","keyboard","keyboard-return","layer","left-align","library","line-chart","line-graph","linear-gauge","link","list","list-1","list-view","loading","locate-filled","locate-outline","locate-outline-large","location","lock","lock-sm","mail","mail-1","map","marketplace","maximize","menu","mfa","mic","minimize","minus","money","mouse-hold","multi-line","new-app","notation-arrow-down-left","notation-arrow-up","numbered-list","open","orchestration","paragraph","pause","pause-circle","percent-gauge","phone","photo","pie-chart","pin","plane","play","play-circle","playbook-outline","playbook-outline-small","plugin","plugin-outline","plugin-outline-small","plus","plus-bold","prev","printer","profile","profile-filled","promote","promote-horizontal","question","question-filled","question-filled-sm","radio-button","redo","redo-all","reference","reference-grid","reference-multi","reference-single","reference-tree","refresh","refresh-circle","refresh-small","remove","remove-edge","remove-node","remove-users","repeat","replace","reports","reports-outline","resize","right-align","rocket","rotate","rule-outline","runner","runs-outline","runs-outline-small","sankey","save","save-outline","save-outline-large","save-outline-small","screen","screen-1","search","section","select-all","select-user","select-users","sensor-outline","sensor-outline-small","server","shield","shrink","skip","slide-left","slide-right","sliders","smartphone","smiley-frown","snapshot","solution","sort-ascending","sort-descending","spaces","spaces-list","spaces-outline","spaces-outline-large","speedometer","split-handle","square","square-filled","star","star-filled","stars","stopwatch","superscript","swap","switch","system-diagnostics","system-diagnostics-2","table","tabs","tag-filled","tags-outline","target","task-outline","thumb-down-filled","thumb-down-outline","thumb-down-outline-large","thumb-up-filled","thumb-up-outline","thumb-up-outline-large","tracking-id","transfer","trash","tree","tree-collapse","tree-expand","trend-down","trend-level","trend-up","trending","underline","undo","undo-all","unlink","upload-outline","upload-outline-large","upload-outline-small","user","user-add","user-circle","user-groups","users","version","vert-bar-graph-grouped","vert-full-stack-bar","view-code","view-designer","view-split","wand","warning-filled","warning-filled-sm","warning-thin","web-api","webhook-outline","webhook-outline-large","webhook-outline-small","widget","worker","workflow","workflow-alternate","workflow-alternate-large","workflow-alternate-small","workspaces","workstation","wrench","x","x-filled","x-small"];function Jt(s){const{direction:e=at.Left,size:t=80,zIndex:i=998,closeOnOutsideClick:o=!0,isRoot:n=!0,parentContainer:r,content:l,cssClass:c=""}=s,h=document.createElement("swim-drawer");if(h.direction=e,h.size=t,h.zIndex=i,h.closeOnOutsideClick=o,h.isRoot=n,h.cssClass=c,l)if(typeof l=="string"){const p=document.createElement("div");for(p.innerHTML=l;p.firstChild;)h.appendChild(p.firstChild)}else if(l instanceof DocumentFragment)for(;l.firstChild;)h.appendChild(l.firstChild);else h.appendChild(l);(n?document.body:r??document.body).appendChild(h);const u=()=>{h.hide()};return h.addEventListener("close",()=>{h.parentNode&&h.parentNode.removeChild(h)},{once:!0}),h.show(),{close:u,drawer:h}}function mn(s){return new Promise(e=>setTimeout(e,s))}function vc(s){return new Promise((e,t)=>setTimeout(()=>t(new Error("Failed")),s))}const re=[{type:"Malware",date:"1/1/2025",origin:"China"},{type:"DDOS",date:"1/5/2025",origin:"China"},{type:"DDOS",date:"1/5/2025",origin:"Russia"},{type:"XSS",date:"1/6/2025",origin:"North Korea"},{type:"DDOS",date:"1/6/2025",origin:"North Korea"},{type:"Ransomware",date:"1/8/2025",origin:"China"},{type:"DDOS",date:"1/9/2025",origin:"China"},{type:"SQL injection",date:"1/10/2025",origin:"North Korea"},{type:"Malware",date:"1/11/2025",origin:"Russia"},{type:"DDOS",date:"1/11/2025",origin:"Russia"}],$t=["Attack Type","Date of Attack","Origin of Attack"],Et=["type","date","origin"],wc=[{type:"Malware",date:"1/1/2025",origin:"China",status:"error"},{type:"DDOS",date:"1/5/2025",origin:"China",status:"warning"},{type:"DDOS",date:"1/5/2025",origin:"Russia",status:"warning"},{type:"XSS",date:"1/6/2025",origin:"North Korea",status:"success"},{type:"DDOS",date:"1/6/2025",origin:"North Korea",status:"warning"},{type:"Ransomware",date:"1/8/2025",origin:"China",status:"error"},{type:"DDOS",date:"1/9/2025",origin:"China",status:"warning"},{type:"SQL injection",date:"1/10/2025",origin:"North Korea",status:"success"},{type:"Malware",date:"1/11/2025",origin:"Russia",status:"error"},{type:"XSS",date:"1/11/2025",origin:"Russia",status:"success"}],bn=[...re,...re,...re,...re,...re,...re,...re,...re,...re],Rn=["buttons","input","select","datetime","checkbox","radio","toggle","slider","tabs","button-group","button-toggle","card","progress-spinner","section","split","navbar","tooltip","list","dialog","drawer","scrollbars","icons"],Vn=new Set([...Rn,"datetime","drawer"]),yc=Rn[0],gn=new Map;let ii=null;function xc(){const s=window.location.pathname;return s.endsWith("/")?s:s+"/"}async function kc(s){const e=gn.get(s);if(e)return e;const i=`${xc()}sections/${s}.html`,o=await fetch(i);if(!o.ok)throw new Error(`Failed to load section: ${s}`);const n=await o.text();return gn.set(s,n),n}function Pi(){const s=window.location.hash.slice(1).toLowerCase();return Vn.has(s)?s:yc}async function Xt(s){const e=document.getElementById("page-sections");if(e){ii!==null&&(clearInterval(ii),ii=null);try{const t=await kc(s);e.innerHTML=t,Ac()}catch(t){console.error("Failed to load section:",s,t),e.innerHTML=`<p class="section-desc">Failed to load section: ${s}</p>`}}}function $c(){var u,p,b,x,B,H,M,L,C,F;const s=v=>document.getElementById(v),e=document.getElementById("drawerOpenLeft"),t=document.getElementById("drawerOpenBottom");e&&s("drawerDefaultLeft")&&e.addEventListener("click",()=>s("drawerDefaultLeft").show()),t&&s("drawerDefaultBottom")&&t.addEventListener("click",()=>s("drawerDefaultBottom").show()),(u=s("drawerDefaultLeft"))==null||u.addEventListener("close",()=>{const v=s("drawerDefaultLeft");v&&(v.open=!1)}),(p=s("drawerDefaultBottom"))==null||p.addEventListener("close",()=>{const v=s("drawerDefaultBottom");v&&(v.open=!1)});const i=document.getElementById("drawerOpenDetails"),o=document.getElementById("drawerOpenDetailsBottom");if(i||o){const v=`
      <div class="drawer-demo-toolbar">Details</div>
      <div class="drawer-demo-section">
        <h1>Nested Drawer Content</h1>
        <p>This drawer was opened programmatically via openDrawer().</p>
      </div>
    `;i==null||i.addEventListener("click",()=>Jt({direction:"left",size:50,content:v})),o==null||o.addEventListener("click",()=>Jt({direction:"bottom",size:40,content:v}))}const n=document.getElementById("drawerNoCloseOpenLeft"),r=document.getElementById("drawerNoCloseOpenBottom");n&&s("drawerNoCloseLeft")&&n.addEventListener("click",()=>s("drawerNoCloseLeft").show()),r&&s("drawerNoCloseBottom")&&r.addEventListener("click",()=>s("drawerNoCloseBottom").show()),(b=document.getElementById("drawerNoCloseBtnLeft"))==null||b.addEventListener("click",()=>{var v;return(v=s("drawerNoCloseLeft"))==null?void 0:v.hide()}),(x=document.getElementById("drawerNoCloseBtnBottom"))==null||x.addEventListener("click",()=>{var v;return(v=s("drawerNoCloseBottom"))==null?void 0:v.hide()}),(B=s("drawerNoCloseLeft"))==null||B.addEventListener("close",()=>{const v=s("drawerNoCloseLeft");v&&(v.open=!1)}),(H=s("drawerNoCloseBottom"))==null||H.addEventListener("close",()=>{const v=s("drawerNoCloseBottom");v&&(v.open=!1)});const l=document.getElementById("drawerContainerOpenLeft"),c=document.getElementById("drawerContainerOpenBottom");l&&s("drawerContainerLeft")&&l.addEventListener("click",()=>s("drawerContainerLeft").show()),c&&s("drawerContainerBottom")&&c.addEventListener("click",()=>s("drawerContainerBottom").show()),(M=document.getElementById("drawerContainerBtnLeft"))==null||M.addEventListener("click",()=>{var v;return(v=s("drawerContainerLeft"))==null?void 0:v.hide()}),(L=document.getElementById("drawerContainerBtnBottom"))==null||L.addEventListener("click",()=>{var v;return(v=s("drawerContainerBottom"))==null?void 0:v.hide()}),(C=s("drawerContainerLeft"))==null||C.addEventListener("close",()=>{const v=s("drawerContainerLeft");v&&(v.open=!1)}),(F=s("drawerContainerBottom"))==null||F.addEventListener("close",()=>{const v=s("drawerContainerBottom");v&&(v.open=!1)});const h=document.getElementById("drawerImperativeLeft"),m=document.getElementById("drawerImperativeBottom");if(h||m){const v=`
      <div class="drawer-demo-toolbar">Alert Everyone!</div>
      <div class="drawer-demo-section">
        <h1>Attack Type: Malware</h1>
        <p>Opened via openDrawer().</p>
      </div>
    `;h==null||h.addEventListener("click",()=>Jt({direction:"left",size:70,content:v})),m==null||m.addEventListener("click",()=>Jt({direction:"bottom",content:v}))}}function Ec(){const s=document.getElementById("iconsPreview");if(!s)return;for(const t of _c){const i=document.createElement("li");i.dataset.iconName=t;const o=document.createElement("swim-icon");o.setAttribute("font-icon",t);const n=document.createElement("span");n.className="icon-name",n.textContent=t,i.appendChild(o),i.appendChild(n),s.appendChild(i)}const e=document.getElementById("iconSearch");e&&(e.addEventListener("input",()=>{const t=e.value.trim().toLowerCase();s.querySelectorAll("li").forEach(i=>{const o=(i.dataset.iconName??"").toLowerCase();i.classList.toggle("icon-search-hidden",t.length>0&&!o.includes(t))})}),e.addEventListener("keydown",t=>{t.key==="Escape"&&(e.value="",s.querySelectorAll("li").forEach(i=>i.classList.remove("icon-search-hidden")),e.blur())}))}function Cc(){const s=[{name:"Breach",value:"breach"},{name:"DDOS",value:"ddos"},{name:"Physical",value:"physical"}],e=[{name:"Apple",value:"apple"},{name:"Banana",value:"banana"},{name:"Orange",value:"orange"},{name:"Grape",value:"grape"},{name:"Mango",value:"mango"},{name:"Pineapple",value:"pineapple"},{name:"Strawberry",value:"strawberry"},{name:"Watermelon",value:"watermelon"}],t=document.getElementById("basicSelect");t&&(t.options=s);const i=document.getElementById("requiredSelect");i&&(i.options=s);const o=document.getElementById("legacySelect");o&&(o.options=e);const n=document.getElementById("fillSelect");n&&(n.options=e);const r=document.getElementById("smallSelect");r&&(r.options=e);const l=document.getElementById("mediumSelect");l&&(l.options=e);const c=document.getElementById("largeSelect");c&&(c.options=e);const h=[{name:"Red",value:"red"},{name:"Blue",value:"blue"},{name:"Green",value:"green"},{name:"Yellow",value:"yellow"},{name:"Purple",value:"purple"},{name:"Orange",value:"orange"},{name:"Pink",value:"pink"},{name:"Brown",value:"brown"}],m=document.getElementById("multiSelect");m&&(m.options=h);const u=[{name:"United States",value:"us"},{name:"United Kingdom",value:"uk"},{name:"Canada",value:"ca"},{name:"Australia",value:"au"},{name:"Germany",value:"de"},{name:"France",value:"fr"},{name:"Italy",value:"it"},{name:"Spain",value:"es"},{name:"Japan",value:"jp"},{name:"China",value:"cn"},{name:"India",value:"in"},{name:"Brazil",value:"br"},{name:"Mexico",value:"mx"},{name:"Argentina",value:"ar"},{name:"South Africa",value:"za"}],p=document.getElementById("filterableSelect");p&&(p.options=u);const b=document.getElementById("noFilterSelect");b&&(b.options=e);const x=document.getElementById("normalSelect");x&&(x.options=e);const B=document.getElementById("withValueSelect");B&&(B.options=[{name:"Option 1",value:"option1"},{name:"Option 2",value:"option2"},{name:"Option 3",value:"option3"}]);const H=document.getElementById("disabledSelect");H&&(H.options=e,H.value="apple");const M=document.getElementById("noClearSelect");M&&(M.options=e);const L=[{name:"Technology",value:"tech"},{name:"Business",value:"business"},{name:"Science",value:"science"},{name:"Arts",value:"arts"},{name:"Sports",value:"sports"}],C=document.getElementById("formSelect1");C&&(C.options=L);const F=[{name:"Important",value:"important"},{name:"Urgent",value:"urgent"},{name:"Featured",value:"featured"},{name:"Archive",value:"archive"},{name:"Review",value:"review"}],v=document.getElementById("formSelect2");v&&(v.options=F)}function Sc(){const s="2011-03-11T05:46:24Z",e="1969-07-20T20:17:43Z",t=new Date("10/10/2016 2:35 PM"),i=document.getElementById("dateInput1"),o=document.getElementById("dateInput1Value");i&&(i.value=new Date("10/10/2016"),i.addEventListener("change",L=>{const C=L.detail;o&&(o.textContent=JSON.stringify(C))}));const n=document.getElementById("dateInput2");n&&(n.value=new Date("10/10/2016"));const r=document.getElementById("dateInput3"),l=document.getElementById("dateInput3Value");r&&(r.value=new Date("10/10/2016"),r.addEventListener("change",L=>{const C=L.detail;l&&(l.textContent=JSON.stringify(C))}));const c=document.getElementById("dateInput4");c&&(c.value=new Date("10/10/2016"));const h=document.getElementById("dateTimeInput"),m=document.getElementById("dateTimeInputValue");h&&(h.value=new Date(e),h.addEventListener("change",L=>{const C=L.detail;m&&(m.textContent=JSON.stringify(C))}));const u=new Date(s),p=document.getElementById("tzValue");["tzLocal","tzUtc","tzJst"].forEach(L=>{const C=document.getElementById(L);C&&(C.value=u,C.addEventListener("change",F=>{const v=F.detail;p&&(p.textContent=JSON.stringify(v))}))});const b=new Date(e),x=document.getElementById("timeInputValue");["timeInput1","timeInputTz","timeInputUtc","timeInputJst"].forEach(L=>{const C=document.getElementById(L);C&&(C.value=b,C.addEventListener("change",F=>{const v=F.detail;x&&(x.textContent=JSON.stringify(v))}))});const B=document.getElementById("precisionValue");["precisionYear","precisionMonth","precisionHour","precisionMinute"].forEach(L=>{const C=document.getElementById(L);C&&(C.value=b,C.addEventListener("change",F=>{const v=F.detail;B&&(B.textContent=JSON.stringify(v))}))});const H=document.getElementById("autosizeValue");["autosizeYear","autosizeMonth","autosizeHour","autosizeMinute","autosizeNoMargin"].forEach(L=>{const C=document.getElementById(L);C&&(C.value=t,C.addEventListener("change",F=>{const v=F.detail;H&&(H.textContent=JSON.stringify(v))}))}),["appFilled","appFilledFill","appRequired","appRequiredFill","appTime","appTimeFill","appDateTime","appDateTimeFill","appDisabled","appDisabledFill"].forEach(L=>{const C=document.getElementById(L);C&&(C.value=t)})}function Dc(){const s=document.getElementById("listBasic");s&&(s.dataSource=re,s.headerLabels=$t,s.columns=Et,s.defaultRowStatus="error");const e=document.getElementById("listColumnLayout");e&&(e.dataSource=re,e.headerLabels=$t,e.columns=Et,e.columnLayout="3fr 2fr 1fr",e.defaultRowStatus="error");const t=document.getElementById("listPagination"),i=document.getElementById("listPaginationPage");t&&(t.dataSource=bn,t.headerLabels=$t,t.columns=Et,t.columnLayout="1fr 1fr 1fr",t.height=400,t.paginationConfig={pageSize:10},t.defaultRowStatus="error",t.addEventListener("page-change",c=>{i&&(i.textContent=String(c.detail??1))}),i&&(i.textContent="1"));const o=document.getElementById("listPaginationPage5"),n=document.getElementById("listPaginationPage5Value");o&&(o.dataSource=bn,o.headerLabels=["No.","Attack Type","Date of Attack","Origin of Attack"],o.columns=["$index","type","date","origin"],o.columnLayout="5rem 1fr 1fr 1fr",o.height=400,o.paginationConfig={index:5,pageSize:10},o.defaultRowStatus="error",o.addEventListener("page-change",c=>{n&&(n.textContent=String(c.detail??5))}),n&&(n.textContent="5"));const r=document.getElementById("listWithStatus");r&&(r.dataSource=wc,r.headerLabels=$t,r.columns=Et);const l=document.getElementById("listNoStatus");l&&(l.dataSource=re,l.headerLabels=$t,l.columns=Et,l.defaultRowStatus="error")}function Ac(){const s=document.getElementById("successBtn");s&&s.addEventListener("click",()=>{s.promise=mn(1e3)});const e=document.getElementById("failBtn");e&&e.addEventListener("click",()=>{e.promise=vc(1e3)});const t=document.getElementById("slowBtn");t&&t.addEventListener("click",()=>{t.promise=mn(5e3)});const i=document.getElementById("cyclingStateBtn"),o=document.getElementById("cyclingStateLabel");if(i&&o){const I=["active","in-progress","success","fail"];let O=0;const Y=()=>{const q=I[O];i.setAttribute("state",q),o.textContent=q,O=(O+1)%I.length};Y(),ii=setInterval(Y,2e3)}const n=document.getElementById("demoForm");if(n){const I=n.querySelector('swim-button[type="submit"]'),O=n.querySelector('swim-button[type="reset"]');I&&I.addEventListener("click",Y=>{Y.preventDefault(),n.requestSubmit()}),O&&O.addEventListener("click",Y=>{Y.preventDefault(),n.reset()}),n.addEventListener("submit",Y=>{Y.preventDefault();const q=document.getElementById("nameInput"),Ce=document.getElementById("emailInput"),he=document.getElementById("ageInput"),it=(q==null?void 0:q.value)??"",ot=(Ce==null?void 0:Ce.value)??"",Wt=(he==null?void 0:he.value)??"";console.log("Form submitted!",{name:it,email:ot,age:Wt}),alert(`Form submitted!
Name: ${it}
Email: ${ot}
Age: ${Wt}`)})}Cc(),Sc();const r=document.getElementById("selectableCardDemo"),l=document.getElementById("cardSelectedValue");r&&l&&r.addEventListener("select",I=>{l.textContent=String(I.detail??!1)});const c=document.getElementById("outlineCardDemo");c&&c.addEventListener("outline-click",()=>console.log("Outline clicked"));const h=document.getElementById("checkboxDemoEvent"),m=document.getElementById("checkboxDemoChecked"),u=document.getElementById("checkboxDemoEventName");h&&m&&u&&(h.addEventListener("checked-change",I=>{m.textContent=String(I.detail),u.textContent="checked-change"}),h.addEventListener("change",()=>{u.textContent="change"}),h.addEventListener("focus",()=>{u.textContent="focus"}),h.addEventListener("blur",()=>{u.textContent="blur"}),m.textContent=String(h.checked));const p=document.getElementById("radioSingleValue"),b=["radioSeasonSpring","radioSeasonSummer","radioSeasonFall","radioSeasonWinter"];b.forEach(I=>{const O=document.getElementById(I);O&&p&&O.addEventListener("change",Y=>{const q=Y.detail;b.forEach(Ce=>{const he=document.getElementById(Ce);he&&(he.checked=he.value===q)}),p.textContent=String(q??"")})});const x=document.getElementById("radioGroupDemo"),B=document.getElementById("radioGroupValue");x&&B&&(B.textContent=String(x.value??"—"),x.addEventListener("change",I=>{B.textContent=String(I.detail??"—")}));const H=document.getElementById("progressSpinnerWithLabel");H&&(H.spinnerLabel={inProgressLabel:"Loading...",completeLabel:"Complete!",failLabel:"Failed"});const M=document.getElementById("progressSpinnerConfigurable"),L=document.getElementById("progressSpinnerConfigurableCode"),C=["progressSpinnerValue","progressSpinnerTotal","progressSpinnerDiameter","progressSpinnerStrokeWidth","progressSpinnerColor","progressSpinnerMode","progressSpinnerCompleteStatus","progressSpinnerShowIcon"];function F(){var Qo;if(!M)return;const I=document.getElementById("progressSpinnerValue"),O=document.getElementById("progressSpinnerTotal"),Y=document.getElementById("progressSpinnerDiameter"),q=document.getElementById("progressSpinnerStrokeWidth"),Ce=document.getElementById("progressSpinnerColor"),he=document.getElementById("progressSpinnerMode"),it=document.getElementById("progressSpinnerCompleteStatus"),ot=document.getElementById("progressSpinnerShowIcon"),Wt=(I==null?void 0:I.value)??"35",Si=(O==null?void 0:O.value)??"100",Go=(Y==null?void 0:Y.value)??"100",Wo=(q==null?void 0:q.value)??"5",Ko=(Ce==null?void 0:Ce.value)??"lime",Zo=(he==null?void 0:he.value)??"indeterminate",Kt=(it==null?void 0:it.value)??"success",Jo=(ot==null?void 0:ot.checked)!==!1,Xo=Kt==="fail"||Kt==="success"?Si:Wt;if(M.value=Number(Xo),M.total=Number(Si),M.diameter=Number(Go),M.strokeWidth=Number(Wo),M.color=Ko,M.setAttribute("mode",Zo),M.isFailure=Kt==="fail",M.appearance=Jo?"icon":"default",(Qo=M.requestUpdate)==null||Qo.call(M),L){const Hn=Kt==="fail"?`
  is-failure`:"";L.textContent=`<swim-progress-spinner
  mode="${Zo}"
  value="${Xo}"
  total="${Si}"
  diameter="${Go}"
  stroke-width="${Wo}"
  color="${Ko}"
  appearance="${Jo?"icon":"default"}"${Hn}
  aria-label="...">
</swim-progress-spinner>`}}if(M){const I=document.getElementById("progressSpinnerMode");I&&I.addEventListener("change",()=>setTimeout(F,0)),C.forEach(Y=>{const q=document.getElementById(Y);q&&q!==I&&(q.addEventListener("input",F),q.addEventListener("change",F))}),I&&I.addEventListener("input",F);const O=document.getElementById("progressSpinnerShowIcon");O&&O.addEventListener("change",F),F()}const v=document.getElementById("sliderDemoEvent"),Io=document.getElementById("sliderDemoValue"),To=document.getElementById("sliderDemoPercent");v&&Io&&To&&v.addEventListener("change",I=>{const O=I.detail;Io.textContent=String((O==null?void 0:O.value)??""),To.textContent=String((O==null?void 0:O.percent)??"")});const tt=document.getElementById("toggleDemoEvent"),$i=document.getElementById("toggleDemoChecked"),Ft=document.getElementById("toggleDemoEventName");tt&&$i&&Ft&&(tt.addEventListener("change",()=>{$i.textContent=String(tt.checked),Ft.textContent="change"}),tt.addEventListener("focus",()=>{Ft.textContent="focus"}),tt.addEventListener("blur",()=>{Ft.textContent="blur"}),$i.textContent=String(tt.checked));const zo=document.getElementById("seasonToggleGroup"),Mo=document.getElementById("seasonValue");zo&&Mo&&zo.addEventListener("value-change",I=>{Mo.textContent=String(I.detail??"")});const Nt=document.getElementById("disabledGroupDemo"),Ei=document.getElementById("toggleGroupDisabledBtn");Nt&&Ei&&Ei.addEventListener("click",()=>{Nt.disabled=!Nt.disabled,Ei.textContent=Nt.disabled?"Enable group":"Disable group"}),Ec(),Dc();const Lo=document.getElementById("dialogContentOpen"),Rt=document.getElementById("dialogContentDemo");Lo&&Rt&&(Lo.addEventListener("click",()=>{Rt.visible=!0}),Rt.addEventListener("close",()=>{Rt.visible=!1}));const Oo=document.getElementById("dialogComponentToggle"),vt=document.getElementById("dialogComponentDemo");Oo&&vt&&(Oo.addEventListener("click",()=>{vt.visible=!vt.visible}),vt.addEventListener("close",()=>{vt.visible=!1}));const Bo=document.getElementById("dialogWizardOpen"),Vt=document.getElementById("dialogWizardDemo");Bo&&Vt&&(Bo.addEventListener("click",()=>{Vt.visible=!0}),Vt.addEventListener("close",()=>{Vt.visible=!1}));const Pe=document.getElementById("dialogWizardTabs"),Po=document.getElementById("dialogWizardPrev"),Fo=document.getElementById("dialogWizardNext");Po&&(Pe!=null&&Pe.prev)&&Po.addEventListener("click",()=>Pe.prev()),Fo&&(Pe!=null&&Pe.next)&&Fo.addEventListener("click",()=>Pe.next());const No=document.getElementById("dialogFullScreenOpen"),Ht=document.getElementById("dialogFullScreenDemo");No&&Ht&&(No.addEventListener("click",()=>{Ht.visible=!0}),Ht.addEventListener("close",()=>{Ht.visible=!1}));const Ro=document.getElementById("dialogLargeFormatOpen"),Yt=document.getElementById("dialogLargeFormatDemo");Ro&&Yt&&(Ro.addEventListener("click",()=>{Yt.visible=!0}),Yt.addEventListener("close-or-cancel",()=>{Yt.visible=!1}));const Vo=document.getElementById("dialogMediumFormatOpen"),qt=document.getElementById("dialogMediumFormatDemo");Vo&&qt&&(Vo.addEventListener("click",()=>{qt.visible=!0}),qt.addEventListener("close-or-cancel",()=>{qt.visible=!1}));const Ho=document.getElementById("dialogMediumContentOpen"),Ut=document.getElementById("dialogMediumContentDemo");Ho&&Ut&&(Ho.addEventListener("click",()=>{Ut.visible=!0}),Ut.addEventListener("close-or-cancel",()=>{Ut.visible=!1}));const Yo=document.getElementById("dialogMediumFooterOpen"),jt=document.getElementById("dialogMediumFooterDemo");Yo&&jt&&(Yo.addEventListener("click",()=>{jt.visible=!0}),jt.addEventListener("close-or-cancel",()=>{jt.visible=!1}));const qo=document.getElementById("dialogMediumFooterContentOpen"),Gt=document.getElementById("dialogMediumFooterContentDemo");qo&&Gt&&(qo.addEventListener("click",()=>{Gt.visible=!0}),Gt.addEventListener("close-or-cancel",()=>{Gt.visible=!1})),$c();const Uo=document.getElementById("navbarGoToFourthBtn"),Ci=document.getElementById("navbarTopDemo");Uo&&Ci&&"goTo"in Ci&&Uo.addEventListener("click",()=>Ci.goTo(3));const jo=document.getElementById("selectForm");jo&&jo.addEventListener("submit",I=>{I.preventDefault();const O=document.getElementById("formSelect1"),Y=document.getElementById("formSelect2");console.log("Select Form submitted!"),alert(`Form submitted!
Category: ${O.value}
Tags: ${JSON.stringify(Y.value)}`)})}async function Ic(){const s=document.querySelector(".navigation");s&&s.addEventListener("click",async l=>{var p,b;const c=(b=(p=l.target)==null?void 0:p.closest)==null?void 0:b.call(p,'a.sub-nav-item[href^="#"]');if(!c)return;const h=c.getAttribute("href");if(!h||h==="#")return;const m=h.slice(1).toLowerCase();if(!Vn.has(m))return;l.preventDefault(),l.stopPropagation(),window.location.hash.slice(1).toLowerCase()!==m?(await Xt(m),history.replaceState(null,"","#"+m),e(m)):Xt(m)}),window.addEventListener("hashchange",()=>{const l=Pi();e(l),Xt(l)});function e(l){const c=l??Pi();document.querySelectorAll(".sub-nav-item.active, .nav-item.active").forEach(h=>h.classList.remove("active")),document.querySelectorAll(`.sub-nav-item[href="#${c}"], .nav-item[href="#${c}"]`).forEach(h=>h.classList.add("active"))}const t=Pi();window.location.hash.slice(1).toLowerCase()!==t&&history.replaceState(null,"",`#${t}`),e(t),await Xt(t);const i=document.getElementById("navSearch"),o=document.querySelectorAll(".nav-item-container"),n=document.querySelectorAll(".sub-nav-item");function r(){if(!i)return;const l=i.value.trim().toLowerCase();n.forEach(c=>{var m;const h=((m=c.textContent)==null?void 0:m.trim().toLowerCase())??"";c.classList.toggle("nav-search-hidden",l.length>0&&!h.includes(l))}),o.forEach(c=>{var x;const h=c.querySelector(".nav-item-label"),m=((x=h==null?void 0:h.textContent)==null?void 0:x.trim().toLowerCase())??"",u=c.querySelectorAll(".sub-nav-item:not(.nav-search-hidden)").length,p=l.length===0||m.includes(l),b=u>0;c.classList.toggle("nav-search-hidden",l.length>0&&!p&&!b)})}i&&(i.addEventListener("input",r),i.addEventListener("keydown",l=>{l.key==="Escape"&&(i.value="",r(),i.blur())})),console.log("✨ @swimlane/lit-ui demo loaded successfully!")}document.addEventListener("DOMContentLoaded",()=>{const s=gt.styleSheet;s&&(document.adoptedStyleSheets=[...document.adoptedStyleSheets,s]),Ic()});
