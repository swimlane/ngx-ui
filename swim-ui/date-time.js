/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ae = globalThis, xe = ae.ShadowRoot && (ae.ShadyCSS === void 0 || ae.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, $e = Symbol(), Te = /* @__PURE__ */ new WeakMap();
let et = class {
  constructor(e, t, i) {
    if (this._$cssResult$ = !0, i !== $e) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (xe && e === void 0) {
      const i = t !== void 0 && t.length === 1;
      i && (e = Te.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && Te.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const dt = (o) => new et(typeof o == "string" ? o : o + "", void 0, $e), I = (o, ...e) => {
  const t = o.length === 1 ? o[0] : e.reduce((i, n, r) => i + ((s) => {
    if (s._$cssResult$ === !0) return s.cssText;
    if (typeof s == "number") return s;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + s + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + o[r + 1], o[0]);
  return new et(t, o, $e);
}, ht = (o, e) => {
  if (xe) o.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const i = document.createElement("style"), n = ae.litNonce;
    n !== void 0 && i.setAttribute("nonce", n), i.textContent = t.cssText, o.appendChild(i);
  }
}, Ce = xe ? (o) => o : (o) => o instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const i of e.cssRules) t += i.cssText;
  return dt(t);
})(o) : o;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: ut, defineProperty: mt, getOwnPropertyDescriptor: bt, getOwnPropertyNames: pt, getOwnPropertySymbols: ft, getPrototypeOf: gt } = Object, U = globalThis, ze = U.trustedTypes, wt = ze ? ze.emptyScript : "", me = U.reactiveElementPolyfillSupport, X = (o, e) => o, le = { toAttribute(o, e) {
  switch (e) {
    case Boolean:
      o = o ? wt : null;
      break;
    case Object:
    case Array:
      o = o == null ? o : JSON.stringify(o);
  }
  return o;
}, fromAttribute(o, e) {
  let t = o;
  switch (e) {
    case Boolean:
      t = o !== null;
      break;
    case Number:
      t = o === null ? null : Number(o);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(o);
      } catch {
        t = null;
      }
  }
  return t;
} }, Me = (o, e) => !ut(o, e), Ye = { attribute: !0, type: String, converter: le, reflect: !1, useDefault: !1, hasChanged: Me };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), U.litPropertyMetadata ?? (U.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let Z = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = Ye) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const i = Symbol(), n = this.getPropertyDescriptor(e, i, t);
      n !== void 0 && mt(this.prototype, e, n);
    }
  }
  static getPropertyDescriptor(e, t, i) {
    const { get: n, set: r } = bt(this.prototype, e) ?? { get() {
      return this[t];
    }, set(s) {
      this[t] = s;
    } };
    return { get: n, set(s) {
      const a = n == null ? void 0 : n.call(this);
      r == null || r.call(this, s), this.requestUpdate(e, a, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Ye;
  }
  static _$Ei() {
    if (this.hasOwnProperty(X("elementProperties"))) return;
    const e = gt(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(X("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(X("properties"))) {
      const t = this.properties, i = [...pt(t), ...ft(t)];
      for (const n of i) this.createProperty(n, t[n]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [i, n] of t) this.elementProperties.set(i, n);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, i] of this.elementProperties) {
      const n = this._$Eu(t, i);
      n !== void 0 && this._$Eh.set(n, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const i = new Set(e.flat(1 / 0).reverse());
      for (const n of i) t.unshift(Ce(n));
    } else e !== void 0 && t.push(Ce(e));
    return t;
  }
  static _$Eu(e, t) {
    const i = t.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var e;
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (e = this.constructor.l) == null || e.forEach((t) => t(this));
  }
  addController(e) {
    var t;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(e), this.renderRoot !== void 0 && this.isConnected && ((t = e.hostConnected) == null || t.call(e));
  }
  removeController(e) {
    var t;
    (t = this._$EO) == null || t.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
    for (const i of t.keys()) this.hasOwnProperty(i) && (e.set(i, this[i]), delete this[i]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return ht(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$EO) == null || e.forEach((t) => {
      var i;
      return (i = t.hostConnected) == null ? void 0 : i.call(t);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$EO) == null || e.forEach((t) => {
      var i;
      return (i = t.hostDisconnected) == null ? void 0 : i.call(t);
    });
  }
  attributeChangedCallback(e, t, i) {
    this._$AK(e, i);
  }
  _$ET(e, t) {
    var r;
    const i = this.constructor.elementProperties.get(e), n = this.constructor._$Eu(e, i);
    if (n !== void 0 && i.reflect === !0) {
      const s = (((r = i.converter) == null ? void 0 : r.toAttribute) !== void 0 ? i.converter : le).toAttribute(t, i.type);
      this._$Em = e, s == null ? this.removeAttribute(n) : this.setAttribute(n, s), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var r, s;
    const i = this.constructor, n = i._$Eh.get(e);
    if (n !== void 0 && this._$Em !== n) {
      const a = i.getPropertyOptions(n), c = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((r = a.converter) == null ? void 0 : r.fromAttribute) !== void 0 ? a.converter : le;
      this._$Em = n;
      const d = c.fromAttribute(t, a.type);
      this[n] = d ?? ((s = this._$Ej) == null ? void 0 : s.get(n)) ?? d, this._$Em = null;
    }
  }
  requestUpdate(e, t, i) {
    var n;
    if (e !== void 0) {
      const r = this.constructor, s = this[e];
      if (i ?? (i = r.getPropertyOptions(e)), !((i.hasChanged ?? Me)(s, t) || i.useDefault && i.reflect && s === ((n = this._$Ej) == null ? void 0 : n.get(e)) && !this.hasAttribute(r._$Eu(e, i)))) return;
      this.C(e, t, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: i, reflect: n, wrapped: r }, s) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, s ?? t ?? this[e]), r !== !0 || s !== void 0) || (this._$AL.has(e) || (this.hasUpdated || i || (t = void 0), this._$AL.set(e, t)), n === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (t) {
      Promise.reject(t);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var i;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [r, s] of this._$Ep) this[r] = s;
        this._$Ep = void 0;
      }
      const n = this.constructor.elementProperties;
      if (n.size > 0) for (const [r, s] of n) {
        const { wrapped: a } = s, c = this[r];
        a !== !0 || this._$AL.has(r) || c === void 0 || this.C(r, void 0, s, c);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), (i = this._$EO) == null || i.forEach((n) => {
        var r;
        return (r = n.hostUpdate) == null ? void 0 : r.call(n);
      }), this.update(t)) : this._$EM();
    } catch (n) {
      throw e = !1, this._$EM(), n;
    }
    e && this._$AE(t);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var t;
    (t = this._$EO) == null || t.forEach((i) => {
      var n;
      return (n = i.hostUpdated) == null ? void 0 : n.call(i);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((t) => this._$ET(t, this[t]))), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
Z.elementStyles = [], Z.shadowRootOptions = { mode: "open" }, Z[X("elementProperties")] = /* @__PURE__ */ new Map(), Z[X("finalized")] = /* @__PURE__ */ new Map(), me == null || me({ ReactiveElement: Z }), (U.reactiveElementVersions ?? (U.reactiveElementVersions = [])).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ee = globalThis, ce = ee.trustedTypes, Oe = ce ? ce.createPolicy("lit-html", { createHTML: (o) => o }) : void 0, tt = "$lit$", L = `lit$${Math.random().toFixed(9).slice(2)}$`, it = "?" + L, _t = `<${it}>`, q = document, te = () => q.createComment(""), ie = (o) => o === null || typeof o != "object" && typeof o != "function", De = Array.isArray, vt = (o) => De(o) || typeof (o == null ? void 0 : o[Symbol.iterator]) == "function", be = `[ 	
\f\r]`, J = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Fe = /-->/g, Pe = />/g, V = RegExp(`>|${be}(?:([^\\s"'>=/]+)(${be}*=${be}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ie = /'/g, Le = /"/g, ot = /^(?:script|style|textarea|title)$/i, yt = (o) => (e, ...t) => ({ _$litType$: o, strings: e, values: t }), g = yt(1), z = Symbol.for("lit-noChange"), u = Symbol.for("lit-nothing"), Ue = /* @__PURE__ */ new WeakMap(), N = q.createTreeWalker(q, 129);
function nt(o, e) {
  if (!De(o) || !o.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Oe !== void 0 ? Oe.createHTML(e) : e;
}
const xt = (o, e) => {
  const t = o.length - 1, i = [];
  let n, r = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", s = J;
  for (let a = 0; a < t; a++) {
    const c = o[a];
    let d, w, b = -1, v = 0;
    for (; v < c.length && (s.lastIndex = v, w = s.exec(c), w !== null); ) v = s.lastIndex, s === J ? w[1] === "!--" ? s = Fe : w[1] !== void 0 ? s = Pe : w[2] !== void 0 ? (ot.test(w[2]) && (n = RegExp("</" + w[2], "g")), s = V) : w[3] !== void 0 && (s = V) : s === V ? w[0] === ">" ? (s = n ?? J, b = -1) : w[1] === void 0 ? b = -2 : (b = s.lastIndex - w[2].length, d = w[1], s = w[3] === void 0 ? V : w[3] === '"' ? Le : Ie) : s === Le || s === Ie ? s = V : s === Fe || s === Pe ? s = J : (s = V, n = void 0);
    const x = s === V && o[a + 1].startsWith("/>") ? " " : "";
    r += s === J ? c + _t : b >= 0 ? (i.push(d), c.slice(0, b) + tt + c.slice(b) + L + x) : c + L + (b === -2 ? a : x);
  }
  return [nt(o, r + (o[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class oe {
  constructor({ strings: e, _$litType$: t }, i) {
    let n;
    this.parts = [];
    let r = 0, s = 0;
    const a = e.length - 1, c = this.parts, [d, w] = xt(e, t);
    if (this.el = oe.createElement(d, i), N.currentNode = this.el.content, t === 2 || t === 3) {
      const b = this.el.content.firstChild;
      b.replaceWith(...b.childNodes);
    }
    for (; (n = N.nextNode()) !== null && c.length < a; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const b of n.getAttributeNames()) if (b.endsWith(tt)) {
          const v = w[s++], x = n.getAttribute(b).split(L), B = /([.?@])?(.*)/.exec(v);
          c.push({ type: 1, index: r, name: B[2], strings: x, ctor: B[1] === "." ? Mt : B[1] === "?" ? Dt : B[1] === "@" ? kt : ue }), n.removeAttribute(b);
        } else b.startsWith(L) && (c.push({ type: 6, index: r }), n.removeAttribute(b));
        if (ot.test(n.tagName)) {
          const b = n.textContent.split(L), v = b.length - 1;
          if (v > 0) {
            n.textContent = ce ? ce.emptyScript : "";
            for (let x = 0; x < v; x++) n.append(b[x], te()), N.nextNode(), c.push({ type: 2, index: ++r });
            n.append(b[v], te());
          }
        }
      } else if (n.nodeType === 8) if (n.data === it) c.push({ type: 2, index: r });
      else {
        let b = -1;
        for (; (b = n.data.indexOf(L, b + 1)) !== -1; ) c.push({ type: 7, index: r }), b += L.length - 1;
      }
      r++;
    }
  }
  static createElement(e, t) {
    const i = q.createElement("template");
    return i.innerHTML = e, i;
  }
}
function K(o, e, t = o, i) {
  var s, a;
  if (e === z) return e;
  let n = i !== void 0 ? (s = t._$Co) == null ? void 0 : s[i] : t._$Cl;
  const r = ie(e) ? void 0 : e._$litDirective$;
  return (n == null ? void 0 : n.constructor) !== r && ((a = n == null ? void 0 : n._$AO) == null || a.call(n, !1), r === void 0 ? n = void 0 : (n = new r(o), n._$AT(o, t, i)), i !== void 0 ? (t._$Co ?? (t._$Co = []))[i] = n : t._$Cl = n), n !== void 0 && (e = K(o, n._$AS(o, e.values), n, i)), e;
}
class $t {
  constructor(e, t) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: t }, parts: i } = this._$AD, n = ((e == null ? void 0 : e.creationScope) ?? q).importNode(t, !0);
    N.currentNode = n;
    let r = N.nextNode(), s = 0, a = 0, c = i[0];
    for (; c !== void 0; ) {
      if (s === c.index) {
        let d;
        c.type === 2 ? d = new ne(r, r.nextSibling, this, e) : c.type === 1 ? d = new c.ctor(r, c.name, c.strings, this, e) : c.type === 6 && (d = new At(r, this, e)), this._$AV.push(d), c = i[++a];
      }
      s !== (c == null ? void 0 : c.index) && (r = N.nextNode(), s++);
    }
    return N.currentNode = q, n;
  }
  p(e) {
    let t = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, t), t += i.strings.length - 2) : i._$AI(e[t])), t++;
  }
}
class ne {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, t, i, n) {
    this.type = 2, this._$AH = u, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = i, this.options = n, this._$Cv = (n == null ? void 0 : n.isConnected) ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const t = this._$AM;
    return t !== void 0 && (e == null ? void 0 : e.nodeType) === 11 && (e = t.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, t = this) {
    e = K(this, e, t), ie(e) ? e === u || e == null || e === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : e !== this._$AH && e !== z && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : vt(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== u && ie(this._$AH) ? this._$AA.nextSibling.data = e : this.T(q.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var r;
    const { values: t, _$litType$: i } = e, n = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = oe.createElement(nt(i.h, i.h[0]), this.options)), i);
    if (((r = this._$AH) == null ? void 0 : r._$AD) === n) this._$AH.p(t);
    else {
      const s = new $t(n, this), a = s.u(this.options);
      s.p(t), this.T(a), this._$AH = s;
    }
  }
  _$AC(e) {
    let t = Ue.get(e.strings);
    return t === void 0 && Ue.set(e.strings, t = new oe(e)), t;
  }
  k(e) {
    De(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let i, n = 0;
    for (const r of e) n === t.length ? t.push(i = new ne(this.O(te()), this.O(te()), this, this.options)) : i = t[n], i._$AI(r), n++;
    n < t.length && (this._$AR(i && i._$AB.nextSibling, n), t.length = n);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, t); e !== this._$AB; ) {
      const n = e.nextSibling;
      e.remove(), e = n;
    }
  }
  setConnected(e) {
    var t;
    this._$AM === void 0 && (this._$Cv = e, (t = this._$AP) == null || t.call(this, e));
  }
}
class ue {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, i, n, r) {
    this.type = 1, this._$AH = u, this._$AN = void 0, this.element = e, this.name = t, this._$AM = n, this.options = r, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = u;
  }
  _$AI(e, t = this, i, n) {
    const r = this.strings;
    let s = !1;
    if (r === void 0) e = K(this, e, t, 0), s = !ie(e) || e !== this._$AH && e !== z, s && (this._$AH = e);
    else {
      const a = e;
      let c, d;
      for (e = r[0], c = 0; c < r.length - 1; c++) d = K(this, a[i + c], t, c), d === z && (d = this._$AH[c]), s || (s = !ie(d) || d !== this._$AH[c]), d === u ? e = u : e !== u && (e += (d ?? "") + r[c + 1]), this._$AH[c] = d;
    }
    s && !n && this.j(e);
  }
  j(e) {
    e === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Mt extends ue {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === u ? void 0 : e;
  }
}
class Dt extends ue {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== u);
  }
}
class kt extends ue {
  constructor(e, t, i, n, r) {
    super(e, t, i, n, r), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = K(this, e, t, 0) ?? u) === z) return;
    const i = this._$AH, n = e === u && i !== u || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, r = e !== u && (i === u || n);
    n && this.element.removeEventListener(this.name, this, i), r && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t;
    typeof this._$AH == "function" ? this._$AH.call(((t = this.options) == null ? void 0 : t.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class At {
  constructor(e, t, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    K(this, e);
  }
}
const pe = ee.litHtmlPolyfillSupport;
pe == null || pe(oe, ne), (ee.litHtmlVersions ?? (ee.litHtmlVersions = [])).push("3.3.1");
const St = (o, e, t) => {
  const i = (t == null ? void 0 : t.renderBefore) ?? e;
  let n = i._$litPart$;
  if (n === void 0) {
    const r = (t == null ? void 0 : t.renderBefore) ?? null;
    i._$litPart$ = n = new ne(e.insertBefore(te(), r), r, void 0, t ?? {});
  }
  return n._$AI(o), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const R = globalThis;
let P = class extends Z {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var t;
    const e = super.createRenderRoot();
    return (t = this.renderOptions).renderBefore ?? (t.renderBefore = e.firstChild), e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = St(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var e;
    super.connectedCallback(), (e = this._$Do) == null || e.setConnected(!0);
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this._$Do) == null || e.setConnected(!1);
  }
  render() {
    return z;
  }
};
var Xe;
P._$litElement$ = !0, P.finalized = !0, (Xe = R.litElementHydrateSupport) == null || Xe.call(R, { LitElement: P });
const fe = R.litElementPolyfillSupport;
fe == null || fe({ LitElement: P });
(R.litElementVersions ?? (R.litElementVersions = [])).push("4.2.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Et = { attribute: !0, type: String, converter: le, reflect: !1, hasChanged: Me }, Tt = (o = Et, e, t) => {
  const { kind: i, metadata: n } = t;
  let r = globalThis.litPropertyMetadata.get(n);
  if (r === void 0 && globalThis.litPropertyMetadata.set(n, r = /* @__PURE__ */ new Map()), i === "setter" && ((o = Object.create(o)).wrapped = !0), r.set(t.name, o), i === "accessor") {
    const { name: s } = t;
    return { set(a) {
      const c = e.get.call(this);
      e.set.call(this, a), this.requestUpdate(s, c, o);
    }, init(a) {
      return a !== void 0 && this.C(s, void 0, o, a), a;
    } };
  }
  if (i === "setter") {
    const { name: s } = t;
    return function(a) {
      const c = this[s];
      e.call(this, a), this.requestUpdate(s, c, o);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function l(o) {
  return (e, t) => typeof t == "object" ? Tt(o, e, t) : ((i, n, r) => {
    const s = n.hasOwnProperty(r);
    return n.constructor.createProperty(r, i), s ? Object.getOwnPropertyDescriptor(n, r) : void 0;
  })(o, e, t);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function $(o) {
  return l({ ...o, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ct = (o, e, t) => (t.configurable = !0, t.enumerable = !0, Reflect.decorate && typeof e != "object" && Object.defineProperty(o, e, t), t);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function ke(o, e) {
  return (t, i, n) => {
    const r = (s) => {
      var a;
      return ((a = s.renderRoot) == null ? void 0 : a.querySelector(o)) ?? null;
    };
    return Ct(t, i, { get() {
      return r(this);
    } });
  };
}
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const O = (o) => o ?? u;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const j = { ATTRIBUTE: 1, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4 }, zt = (o) => (...e) => ({ _$litDirective$: o, values: e });
class Yt {
  constructor(e) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, t, i) {
    this._$Ct = e, this._$AM = t, this._$Ci = i;
  }
  _$AS(e, t) {
    return this.update(e, t);
  }
  update(e, t) {
    return this.render(...t);
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ot = (o) => o.strings === void 0, Ft = {}, Pt = (o, e = Ft) => o._$AH = e;
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const He = zt(class extends Yt {
  constructor(o) {
    if (super(o), o.type !== j.PROPERTY && o.type !== j.ATTRIBUTE && o.type !== j.BOOLEAN_ATTRIBUTE) throw Error("The `live` directive is not allowed on child or event bindings");
    if (!Ot(o)) throw Error("`live` bindings can only contain a single expression");
  }
  render(o) {
    return o;
  }
  update(o, [e]) {
    if (e === z || e === u) return e;
    const t = o.element, i = o.name;
    if (o.type === j.PROPERTY) {
      if (e === t[i]) return z;
    } else if (o.type === j.BOOLEAN_ATTRIBUTE) {
      if (!!e === t.hasAttribute(i)) return z;
    } else if (o.type === j.ATTRIBUTE && t.getAttribute(i) === e + "") return z;
    return Pt(o), e;
  }
}), se = I`
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
`;
I`
  * {
    box-sizing: border-box;
  }
`;
const It = I`
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
`, Lt = I`
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

  ${It}
`, Ut = (o) => `swim-icon ${o.trim().split(" ").map((t) => {
  const [i, n] = t.split(":");
  return i.length ? `${i} ${i}-${n}` : n;
}).join(" ")}`;
class Ht {
  constructor() {
    this._defaultFontSetClass = "lit", this._iconMap = /* @__PURE__ */ new Map();
  }
  setDefaultFontSetClass(e) {
    return this._defaultFontSetClass = e, this._defaultFontSetClass;
  }
  get(e, t) {
    return this.lookup(e, t).map((i) => Ut(i));
  }
  lookup(e, t) {
    const i = t ?? this._defaultFontSetClass;
    return (Array.isArray(e) ? e : [e]).reduce((n, r) => {
      const s = this._expandKeys(r, i).map((a) => {
        const c = this._iconMap.get(a);
        return c && c.length === 1 ? c[0] : a;
      }).join(" ");
      return n.concat(this._iconMap.get(s) || [s]);
    }, []);
  }
  add(e, t) {
    const i = this._expandKeys(e, this._defaultFontSetClass).join(" "), n = this.lookup(t);
    this._iconMap.set(i, n);
  }
  _expandKeys(e, t) {
    return e.split(" ").map((i) => i.includes(":") ? i : `${t}:${i}`);
  }
}
const Vt = new Ht();
var Nt = Object.defineProperty, re = (o, e, t, i) => {
  for (var n = void 0, r = o.length - 1, s; r >= 0; r--)
    (s = o[r]) && (n = s(e, t, n) || n);
  return n && Nt(e, t, n), n;
};
const Ve = "swim-icon", Ae = class Ae extends P {
  constructor() {
    super(...arguments), this.fontIcon = "", this.alt = "", this.fontSet = "lit", this.iconClass = "", this._cssClasses = [], this._iconClassTokensOnHost = [];
  }
  connectedCallback() {
    super.connectedCallback(), this._updateFontIcon();
  }
  updated(e) {
    super.updated(e), (e.has("fontIcon") || e.has("fontSet")) && this._updateFontIcon(), e.has("iconClass") && this._syncIconClassToHost();
  }
  _syncIconClassToHost() {
    var t;
    const e = (((t = this.iconClass) == null ? void 0 : t.trim()) ?? "").split(/\s+/).filter(Boolean);
    this._iconClassTokensOnHost.forEach((i) => this.classList.remove(i)), e.forEach((i) => this.classList.add(i)), this._iconClassTokensOnHost = e;
  }
  _parseFontIcon(e) {
    if (Array.isArray(e)) return e.filter(Boolean);
    if (typeof e != "string" || !e) return [];
    const t = e.trim();
    if (t.startsWith("["))
      try {
        const i = JSON.parse(t);
        return Array.isArray(i) ? i : [t];
      } catch {
        return [t];
      }
    return [t];
  }
  _updateFontIcon() {
    const e = this._parseFontIcon(this.fontIcon);
    if (e.length === 0) {
      this._cssClasses = [];
      return;
    }
    this._cssClasses = Vt.get(e, this.fontSet);
  }
  render() {
    var r;
    const e = this._cssClasses, t = !!this.alt, i = ((r = this.iconClass) == null ? void 0 : r.trim()) ?? "", n = i ? ` ${i}` : "";
    return !e || e.length === 0 ? g`
        <span
          part="icon"
          class="${i}"
          role="${t ? "img" : "presentation"}"
          aria-label="${t ? this.alt : u}"
          aria-hidden="${t ? "false" : "true"}"
        >
          <slot></slot>
        </span>
      ` : e.length === 1 ? g`
        <i
          part="icon"
          class="swim-icon__i ${e[0]}${n}"
          role="${t ? "img" : "presentation"}"
          aria-label="${t ? this.alt : u}"
          aria-hidden="${t ? "false" : "true"}"
        ></i>
      ` : g`
      <span
        class="swim-icon__stack"
        role="${t ? "img" : "presentation"}"
        aria-label="${t ? this.alt : u}"
        aria-hidden="${t ? "false" : "true"}"
      >
        ${e.map(
      (s, a) => g`<i part="icon icon-${a}" class="swim-icon__i swim-icon__i--${a} ${s}${n}"></i>`
    )}
      </span>
    `;
  }
};
Ae.styles = [se, Lt];
let H = Ae;
re([
  l({ type: String, attribute: "font-icon" })
], H.prototype, "fontIcon");
re([
  l({ type: String })
], H.prototype, "alt");
re([
  l({ type: String, attribute: "font-set" })
], H.prototype, "fontSet");
re([
  l({ type: String, attribute: "icon-class" })
], H.prototype, "iconClass");
re([
  $()
], H.prototype, "_cssClasses");
customElements.get(Ve) || customElements.define(Ve, H);
const st = I`
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
`, Rt = I`
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
`;
var F = /* @__PURE__ */ ((o) => (o.text = "text", o.password = "password", o.email = "email", o.number = "number", o.tel = "tel", o.url = "url", o.textarea = "textarea", o))(F || {}), rt = /* @__PURE__ */ ((o) => (o.legacy = "legacy", o.fill = "fill", o))(rt || {}), at = /* @__PURE__ */ ((o) => (o.sm = "sm", o.md = "md", o.lg = "lg", o))(at || {});
function k(o) {
  return o != null && `${o}` != "false";
}
function lt(o, e = null) {
  return isNaN(parseFloat(o)) || isNaN(Number(o)) ? e : Number(o);
}
var qt = Object.defineProperty, Bt = Object.getOwnPropertyDescriptor, _ = (o, e, t, i) => {
  for (var n = i > 1 ? void 0 : i ? Bt(e, t) : e, r = o.length - 1, s; r >= 0; r--)
    (s = o[r]) && (n = (i ? s(e, t, n) : s(n)) || n);
  return i && n && qt(e, t, n), n;
};
const Ne = "swim-input", de = class de extends P {
  constructor() {
    super(), this.type = F.text, this.label = "", this.placeholder = "", this.hint = "", this._value = "", this.name = "", this.id = `swim-input-${Math.random().toString(36).substr(2, 9)}`, this._disabled = !1, this._readonly = !1, this._required = !1, this._autofocus = !1, this.autocomplete = "off", this.appearance = rt.legacy, this.size = at.sm, this._withMargin = !0, this._withHint = !0, this._passwordToggleEnabled = !1, this.textareaRows = 3, this.requiredIndicator = "*", this._focused = !1, this._passwordVisible = !1, this._touched = !1, this._dirty = !1, this._invalid = !1, this._internals = this.attachInternals();
  }
  get value() {
    return this._value;
  }
  set value(e) {
    const t = this._value;
    this._value = e, this._internals.setFormValue(e), this.requestUpdate("value", t), this._updateActiveState();
  }
  get disabled() {
    return this._disabled;
  }
  set disabled(e) {
    this._disabled = k(e);
  }
  get readonly() {
    return this._readonly;
  }
  set readonly(e) {
    this._readonly = k(e);
  }
  get required() {
    return this._required;
  }
  set required(e) {
    this._required = k(e);
  }
  get autofocus() {
    return this._autofocus;
  }
  set autofocus(e) {
    this._autofocus = k(e);
  }
  get marginless() {
    return !this._withMargin;
  }
  set marginless(e) {
    this._withMargin = !k(e);
  }
  get withHint() {
    return this._withHint;
  }
  set withHint(e) {
    this._withHint = k(e);
  }
  get passwordToggleEnabled() {
    return this._passwordToggleEnabled;
  }
  set passwordToggleEnabled(e) {
    this._passwordToggleEnabled = k(e);
  }
  connectedCallback() {
    super.connectedCallback(), this._updateActiveState();
  }
  firstUpdated() {
    this.autofocus && this.inputElement && setTimeout(() => {
      this.inputElement.focus();
    });
  }
  /** Delegate focus to the internal input so form validation can focus invalid controls. */
  focus(e) {
    var t;
    (t = this.inputElement) == null || t.focus(e);
  }
  updated(e) {
    super.updated(e), e.has("value") && this._updateActiveState(), (e.has("required") || e.has("min") || e.has("max")) && this._validate();
  }
  render() {
    const e = this.type === F.textarea, t = this.type === F.password && this.passwordToggleEnabled && !this.disabled, i = this.type === F.number && !this.disabled, n = this._passwordVisible ? F.text : this.type;
    return g`
      <div class="input-wrap">
        <div class="input-flex-wrap">
          <slot name="prefix"></slot>
          <div class="input-flex-wrap-inner">
            <div class="input-box-wrap">
              ${e ? this._renderTextarea() : this._renderInput(n)}
              ${i ? g`
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
                  ` : u}
              ${t ? g`
                    <button
                      type="button"
                      class="password-toggle"
                      @click="${this._togglePassword}"
                      aria-label="Toggle password visibility"
                    >
                      <swim-icon font-icon="${this._passwordVisible ? "eye-disabled" : "eye"}"></swim-icon>
                    </button>
                  ` : u}
            </div>
            <label class="input-label" part="label" for="${this.id}">
              ${this.label} ${this.required ? g`<span>${this.requiredIndicator}</span>` : u}
            </label>
          </div>
          <slot name="suffix"></slot>
        </div>
        <div class="input-underline ${this.readonly ? "visibility-hidden" : ""}">
          <div class="underline-fill"></div>
        </div>
        <div class="input-hint ${this.withHint ? "" : "hidden"}">
          <slot name="hint">${this.hint}</slot>
        </div>
      </div>
    `;
  }
  _renderInput(e) {
    return g`
      <input
        part="input"
        class="input-box"
        type="${e}"
        id="${this.id}"
        name="${this.name}"
        .value="${He(this.value)}"
        placeholder="${this.placeholder}"
        ?disabled="${this.disabled}"
        ?readonly="${this.readonly}"
        ?required="${this.required}"
        min="${O(this.min)}"
        max="${O(this.max)}"
        minlength="${O(this.minlength)}"
        maxlength="${O(this.maxlength)}"
        tabindex="${O(this.tabindex)}"
        autocomplete="${this.autocomplete}"
        @input="${this._handleInput}"
        @change="${this._handleChange}"
        @focus="${this._handleFocus}"
        @blur="${this._handleBlur}"
      />
    `;
  }
  _renderTextarea() {
    return g`
      <textarea
        part="input"
        class="input-textarea swim-scroll"
        id="${this.id}"
        name="${this.name}"
        .value="${He(this.value)}"
        placeholder="${this.placeholder}"
        ?disabled="${this.disabled}"
        ?readonly="${this.readonly}"
        ?required="${this.required}"
        rows="${this.textareaRows}"
        minlength="${O(this.minlength)}"
        maxlength="${O(this.maxlength)}"
        tabindex="${O(this.tabindex)}"
        autocomplete="${this.autocomplete}"
        @input="${this._handleInput}"
        @change="${this._handleChange}"
        @focus="${this._handleFocus}"
        @blur="${this._handleBlur}"
      ></textarea>
    `;
  }
  _handleInput(e) {
    const t = e.target;
    this.value = t.value, this._dirty || (this._dirty = !0, this.setAttribute("dirty", "")), this.dispatchEvent(new Event("input", { bubbles: !0, composed: !0 }));
  }
  _handleChange(e) {
    this._validate(), this.dispatchEvent(new Event("change", { bubbles: !0, composed: !0 }));
  }
  _handleFocus(e) {
    this._focused = !0, this.setAttribute("focused", ""), this.dispatchEvent(new FocusEvent("focus", { bubbles: !0, composed: !0 }));
  }
  _handleBlur(e) {
    this._focused = !1, this.removeAttribute("focused"), this._touched || (this._touched = !0, this.setAttribute("touched", "")), this._validate(), this.dispatchEvent(new FocusEvent("blur", { bubbles: !0, composed: !0 }));
  }
  _togglePassword() {
    var e;
    this._passwordVisible = !this._passwordVisible, (e = this.inputElement) == null || e.focus();
  }
  _incrementValue(e) {
    e.preventDefault(), !this.disabled && (this._increment(), this._spinnerTimeout = window.setTimeout(() => {
      this._spinnerInterval = window.setInterval(() => this._increment(), 50);
    }, 500));
  }
  _decrementValue(e) {
    e.preventDefault(), !this.disabled && (this._decrement(), this._spinnerTimeout = window.setTimeout(() => {
      this._spinnerInterval = window.setInterval(() => this._decrement(), 50);
    }, 500));
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._stopSpinner();
  }
  _stopSpinner() {
    this._spinnerTimeout !== void 0 && (clearTimeout(this._spinnerTimeout), this._spinnerTimeout = void 0), this._spinnerInterval !== void 0 && (clearInterval(this._spinnerInterval), this._spinnerInterval = void 0);
  }
  _increment() {
    if (this.inputElement && this.type === F.number) {
      const e = this.inputElement, t = parseFloat(e.value) || 0;
      if (this.max !== void 0 && t >= this.max) return;
      const i = t + 1;
      this.value = i.toString(), this.dispatchEvent(new Event("change", { bubbles: !0, composed: !0 }));
    }
  }
  _decrement() {
    if (this.inputElement && this.type === F.number) {
      const e = this.inputElement, t = parseFloat(e.value) || 0;
      if (this.min !== void 0 && t <= this.min) return;
      const i = t - 1;
      this.value = i.toString(), this.dispatchEvent(new Event("change", { bubbles: !0, composed: !0 }));
    }
  }
  _validate() {
    let e = !0;
    if (this.required && !this.value && (e = !1), this.type === F.number && this.value) {
      const t = parseFloat(this.value);
      this.min !== void 0 && t < this.min && (e = !1), this.max !== void 0 && t > this.max && (e = !1);
    }
    return this.minlength && this.value.length < this.minlength && (e = !1), this.maxlength && this.value.length > this.maxlength && (e = !1), this.inputElement && (this.inputElement.validity.valid || (e = !1)), this._invalid = !e, this._invalid ? (this.setAttribute("invalid", ""), this._internals.setValidity({ customError: !0 }, "Invalid input")) : (this.removeAttribute("invalid"), this._internals.setValidity({})), e;
  }
  _updateActiveState() {
    const e = this.value && this.value.length > 0, t = !!this.placeholder;
    this._focused || e ? this.setAttribute("active", "") : this.removeAttribute("active"), t ? this.setAttribute("has-placeholder", "") : this.removeAttribute("has-placeholder"), this.label ? this.removeAttribute("no-label") : this.setAttribute("no-label", "");
  }
  // Form API
  formResetCallback() {
    this.value = "", this._touched = !1, this._dirty = !1, this.removeAttribute("touched"), this.removeAttribute("dirty");
  }
  formDisabledCallback(e) {
    this.disabled = e;
  }
};
de.styles = [se, st, Rt], de.formAssociated = !0;
let f = de;
_([
  ke(".input-box, .input-textarea")
], f.prototype, "inputElement", 2);
_([
  l({ type: String })
], f.prototype, "type", 2);
_([
  l({ type: String })
], f.prototype, "label", 2);
_([
  l({ type: String })
], f.prototype, "placeholder", 2);
_([
  l({ type: String })
], f.prototype, "hint", 2);
_([
  l({ type: String })
], f.prototype, "value", 1);
_([
  l({ type: String })
], f.prototype, "name", 2);
_([
  l({ type: String })
], f.prototype, "id", 2);
_([
  l({ type: Boolean, reflect: !0 })
], f.prototype, "disabled", 1);
_([
  l({ type: Boolean, reflect: !0 })
], f.prototype, "readonly", 1);
_([
  l({ type: Boolean, reflect: !0 })
], f.prototype, "required", 1);
_([
  l({ type: Boolean })
], f.prototype, "autofocus", 1);
_([
  l({ type: String })
], f.prototype, "autocomplete", 2);
_([
  l({ type: String, reflect: !0 })
], f.prototype, "appearance", 2);
_([
  l({ type: String, reflect: !0 })
], f.prototype, "size", 2);
_([
  l({ type: Boolean, reflect: !0, attribute: "marginless" })
], f.prototype, "marginless", 1);
_([
  l({ type: Boolean })
], f.prototype, "withHint", 1);
_([
  l({ type: Boolean, attribute: "password-toggle-enabled" })
], f.prototype, "passwordToggleEnabled", 1);
_([
  l({ type: Number })
], f.prototype, "min", 2);
_([
  l({ type: Number })
], f.prototype, "max", 2);
_([
  l({ type: Number })
], f.prototype, "minlength", 2);
_([
  l({ type: Number })
], f.prototype, "maxlength", 2);
_([
  l({ type: Number, attribute: "textarea-rows" })
], f.prototype, "textareaRows", 2);
_([
  l({ type: String, attribute: "required-indicator" })
], f.prototype, "requiredIndicator", 2);
_([
  l({ type: Number })
], f.prototype, "tabindex", 2);
_([
  $()
], f.prototype, "_focused", 2);
_([
  $()
], f.prototype, "_passwordVisible", 2);
_([
  $()
], f.prototype, "_touched", 2);
_([
  $()
], f.prototype, "_dirty", 2);
_([
  $()
], f.prototype, "_invalid", 2);
customElements.get(Ne) || customElements.define(Ne, f);
const jt = I`
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
`, Zt = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], Kt = ["S", "M", "T", "W", "T", "F", "S"];
function ve(o, e) {
  return o.getFullYear() === e.getFullYear() && o.getMonth() === e.getMonth() && o.getDate() === e.getDate();
}
function Wt(o, e) {
  return o.getFullYear() === e.getFullYear();
}
function Re(o, e) {
  return new Date(o, e + 1, 0).getDate();
}
function ge(o, e, t) {
  return {
    num: o.getDate(),
    dayOfWeek: o.getDay(),
    date: new Date(o),
    today: ve(o, t),
    prevMonth: o.getMonth() < e || o.getMonth() === 11 && e === 0,
    nextMonth: o.getMonth() > e || o.getMonth() === 0 && e === 11
  };
}
function T(o) {
  const e = /* @__PURE__ */ new Date(), t = o.getFullYear(), i = o.getMonth(), n = Re(t, i), r = new Date(t, i, 1).getDay(), s = [];
  if (r > 0) {
    const d = Re(t, i - 1);
    for (let w = r - 1; w >= 0; w--) {
      const b = new Date(t, i - 1, d - w);
      s.push(ge(b, i, e));
    }
  }
  for (let d = 1; d <= n; d++)
    s.push(ge(new Date(t, i, d), i, e));
  const a = s.length % 7;
  if (a > 0) {
    const d = 7 - a;
    for (let w = 1; w <= d; w++)
      s.push(ge(new Date(t, i + 1, w), i, e));
  }
  const c = [];
  for (let d = 0; d < s.length; d += 7)
    c.push(s.slice(d, d + 7));
  return c;
}
function qe(o) {
  return Math.floor(o / 20) * 20;
}
function we(o, e, t = "day") {
  if (!e) return !1;
  switch (t) {
    case "year":
      return o.getFullYear() < e.getFullYear();
    case "month":
      return o.getFullYear() < e.getFullYear() || o.getFullYear() === e.getFullYear() && o.getMonth() < e.getMonth();
    default:
      return new Date(o.getFullYear(), o.getMonth(), o.getDate()) < new Date(e.getFullYear(), e.getMonth(), e.getDate());
  }
}
function _e(o, e, t = "day") {
  if (!e) return !1;
  switch (t) {
    case "year":
      return o.getFullYear() > e.getFullYear();
    case "month":
      return o.getFullYear() > e.getFullYear() || o.getFullYear() === e.getFullYear() && o.getMonth() > e.getMonth();
    default:
      return new Date(o.getFullYear(), o.getMonth(), o.getDate()) > new Date(e.getFullYear(), e.getMonth(), e.getDate());
  }
}
var y = /* @__PURE__ */ ((o) => (o.date = "date", o.time = "time", o.datetime = "datetime", o))(y || {}), C = /* @__PURE__ */ ((o) => (o.HUMAN = "human", o.TIMEZONE = "timezone", o.LOCAL = "local", o.CUSTOM = "custom", o))(C || {});
const Jt = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], Gt = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
], Qt = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], Xt = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], Be = {
  L: "MM/DD/YYYY",
  l: "M/D/YYYY",
  LL: "MMMM D, YYYY",
  ll: "MMM D, YYYY",
  LLL: "MMMM D, YYYY h:mm A",
  lll: "MMM D, YYYY h:mm A",
  LLLL: "dddd, MMMM D, YYYY h:mm A",
  llll: "ddd, MMM D, YYYY h:mm A",
  LT: "h:mm A",
  LTS: "h:mm:ss A"
}, p = {
  shortDate: "l",
  shortTime: "LT",
  shortDateTime: "l LT",
  shortDateTimeSeconds: "l LTS",
  date: "ll",
  time: "LT",
  dateTime: "lll",
  dateTimeSeconds: "ll LTS",
  dateMonth: "MMM YYYY",
  dateYear: "YYYY",
  fullDate: "ddd, ll Z [(]zz[)]",
  fullTime: "LT Z [(]zz[)]",
  fullDateTime: "llll Z [(]zz[)]",
  fullDateMonth: "MMM YYYY Z [(]zz[)]",
  fullDateYear: "YYYY Z [(]zz[)]",
  localeDate: "L",
  localeDateTime: "L LT",
  localeTime: "LT",
  timezoneDate: "L Z",
  timezoneDateTime: "L LT Z",
  timezoneDateTimeSeconds: "L LTS Z",
  timezoneTime: "LT Z",
  timezoneDateMonth: "MMM YYYY Z",
  timezoneDateYear: "YYYY Z",
  locale: "LLL",
  shortLocale: "LL",
  fullLocale: "LLLL"
};
function A(o, e = 2) {
  return String(o).padStart(e, "0");
}
function ct(o, e) {
  if (!e)
    return {
      year: o.getFullYear(),
      month: o.getMonth(),
      day: o.getDate(),
      hour: o.getHours(),
      minute: o.getMinutes(),
      second: o.getSeconds(),
      ms: o.getMilliseconds(),
      dow: o.getDay()
    };
  try {
    const i = new Intl.DateTimeFormat("en-US", {
      timeZone: e,
      year: "numeric",
      month: "numeric",
      day: "numeric",
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: !1
    }).formatToParts(o), n = (s) => {
      var a;
      return ((a = i.find((c) => c.type === s)) == null ? void 0 : a.value) ?? "";
    }, r = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    return {
      year: parseInt(n("year"), 10),
      month: parseInt(n("month"), 10) - 1,
      day: parseInt(n("day"), 10),
      hour: parseInt(n("hour"), 10) % 24,
      minute: parseInt(n("minute"), 10),
      second: parseInt(n("second"), 10),
      ms: o.getMilliseconds(),
      dow: r[n("weekday")] ?? 0
    };
  } catch {
    return ct(o);
  }
}
function je(o, e) {
  if (!e) {
    const t = -o.getTimezoneOffset();
    return Ze(t);
  }
  try {
    const t = o.toLocaleString("en-US", { timeZone: "UTC" }), i = o.toLocaleString("en-US", { timeZone: e }), n = new Date(i).getTime() - new Date(t).getTime(), r = Math.round(n / 6e4);
    return Ze(r);
  } catch {
    return "+00:00";
  }
}
function Ze(o) {
  const e = o >= 0 ? "+" : "-", t = Math.abs(o);
  return `${e}${A(Math.floor(t / 60))}:${A(t % 60)}`;
}
function ei(o, e) {
  var t;
  try {
    return ((t = new Intl.DateTimeFormat("en-US", {
      timeZone: e || void 0,
      timeZoneName: "short"
    }).formatToParts(o).find((n) => n.type === "timeZoneName")) == null ? void 0 : t.value) ?? "";
  } catch {
    return "";
  }
}
function ti(o) {
  const e = ["LLLL", "llll", "LLL", "lll", "LTS", "LL", "ll", "LT", "L", "l"];
  let t = o;
  for (const i of e)
    Be[i] && (t = t.split(i).join(Be[i]));
  return t;
}
const ii = /(MMMM|YYYY|dddd|MMM|ddd|SSS|MM|DD|HH|hh|mm|ss|YY|ZZ|zz|M|D|H|h|A|a|Z|z)/g;
function oi(o, e, t, i) {
  switch (o) {
    case "YYYY":
      return String(e.year);
    case "YY":
      return String(e.year).slice(-2);
    case "MMMM":
      return Gt[e.month];
    case "MMM":
      return Jt[e.month];
    case "MM":
      return A(e.month + 1);
    case "M":
      return String(e.month + 1);
    case "DD":
      return A(e.day);
    case "D":
      return String(e.day);
    case "dddd":
      return Xt[e.dow];
    case "ddd":
      return Qt[e.dow];
    case "HH":
      return A(e.hour);
    case "H":
      return String(e.hour);
    case "hh":
      return A(e.hour % 12 || 12);
    case "h":
      return String(e.hour % 12 || 12);
    case "mm":
      return A(e.minute);
    case "ss":
      return A(e.second);
    case "SSS":
      return A(e.ms, 3);
    case "A":
      return e.hour >= 12 ? "PM" : "AM";
    case "a":
      return e.hour >= 12 ? "pm" : "am";
    case "Z":
      return je(t, i);
    case "ZZ":
      return je(t, i).replace(":", "");
    case "zz":
    case "z":
      return ei(t, i);
    default:
      return o;
  }
}
function ni(o) {
  return p[o] || o;
}
function G(o, e, t) {
  const i = ye(t);
  let n = ti(e);
  const r = [];
  let s = 0, a = "";
  for (; s < n.length; ) {
    const v = n.indexOf("[", s);
    if (v === -1) {
      a += n.slice(s);
      break;
    }
    a += n.slice(s, v);
    const x = n.indexOf("]", v + 1);
    if (x === -1) {
      a += n.slice(v);
      break;
    }
    r.push(n.slice(v + 1, x)), a += `\0${r.length - 1}\0`, s = x + 1;
  }
  n = a;
  const c = ct(o, i), d = n.replace(ii, (v) => oi(v, c, o, i));
  let w = "", b = 0;
  for (; b < d.length; ) {
    const v = d.indexOf("\0", b);
    if (v === -1) {
      w += d.slice(b);
      break;
    }
    w += d.slice(b, v);
    let x = v + 1;
    for (; x < d.length && d[x] >= "0" && d[x] <= "9"; ) x++;
    if (d[x] === "\0" && x > v + 1) {
      const B = parseInt(d.slice(v + 1, x), 10);
      w += r[B] ?? "", b = x + 1;
    } else
      w += d.slice(v, x || v + 1), b = x || v + 1;
  }
  return w;
}
function W(o) {
  if (o instanceof Date) return D(o) ? o : null;
  if (!o || typeof o != "string") return null;
  const e = o.trim();
  if (!e) return null;
  const t = new Date(e);
  if (D(t)) return t;
  const i = e.match(/^(\d{1,2})\/(\d{4})$/);
  if (i) {
    const s = new Date(parseInt(i[2], 10), parseInt(i[1], 10) - 1, 1);
    if (D(s)) return s;
  }
  const n = e.match(/^(\d{4})$/);
  if (n) {
    const s = new Date(parseInt(n[1], 10), 0, 1);
    if (D(s)) return s;
  }
  const r = e.match(/^(\w{3,})\s+(\d{4})$/);
  if (r) {
    const s = /* @__PURE__ */ new Date(`${r[1]} 1, ${r[2]}`);
    if (D(s)) return s;
  }
  return null;
}
function D(o) {
  return o instanceof Date && !isNaN(o.getTime());
}
function Ke(o, e) {
  if (!e || !D(o)) return o;
  const t = new Date(o), i = [
    ["millisecond", () => {
    }],
    ["second", () => t.setMilliseconds(0)],
    [
      "minute",
      () => {
        t.setMilliseconds(0), t.setSeconds(0);
      }
    ],
    [
      "hour",
      () => {
        t.setMilliseconds(0), t.setSeconds(0), t.setMinutes(0);
      }
    ],
    [
      "date",
      () => {
        t.setMilliseconds(0), t.setSeconds(0), t.setMinutes(0), t.setHours(0);
      }
    ],
    [
      "month",
      () => {
        t.setMilliseconds(0), t.setSeconds(0), t.setMinutes(0), t.setHours(0), t.setDate(1);
      }
    ],
    [
      "year",
      () => {
        t.setMilliseconds(0), t.setSeconds(0), t.setMinutes(0), t.setHours(0), t.setDate(1), t.setMonth(0);
      }
    ]
  ], n = i.findIndex(([r]) => r === e);
  return n >= 0 && i[n][1](), t;
}
function si(o, e, t) {
  switch (o) {
    case C.HUMAN:
    case C.TIMEZONE:
      switch (e) {
        case y.date:
          return t === "month" ? p.timezoneDateMonth : t === "year" ? p.timezoneDateYear : p.timezoneDate;
        case y.time:
          return p.timezoneTime;
        default:
          return p.timezoneDateTime;
      }
    case C.LOCAL:
      switch (e) {
        case y.date:
          return t === "month" ? p.dateMonth : t === "year" ? p.dateYear : p.localeDate;
        case y.time:
          return p.localeTime;
        default:
          return p.localeDateTime;
      }
    case C.CUSTOM:
      switch (e) {
        case y.date:
          return t === "month" ? p.dateMonth : t === "year" ? p.dateYear : p.date;
        case y.time:
          return p.time;
        default:
          return p.dateTime;
      }
    default:
      return p.localeDate;
  }
}
function wi(o, e, t) {
  switch (o) {
    case C.HUMAN:
    case C.TIMEZONE:
      switch (e) {
        case y.date:
          return t === "month" ? p.fullDateMonth : t === "year" ? p.fullDateYear : p.fullDate;
        case y.time:
          return p.fullTime;
        default:
          return p.fullDateTime;
      }
    case C.LOCAL:
      switch (e) {
        case y.date:
          return t === "month" ? p.dateMonth : t === "year" ? p.dateYear : p.localeDate;
        case y.time:
          return p.localeTime;
        default:
          return p.localeDateTime;
      }
    case C.CUSTOM:
      switch (e) {
        case y.date:
          return t === "month" ? p.dateMonth : t === "year" ? p.dateYear : p.date;
        case y.time:
          return p.time;
        default:
          return p.dateTime;
      }
    default:
      return p.localeDate;
  }
}
function ye(o) {
  if (o)
    return o.toLowerCase() === "utc" ? "UTC" : o;
}
function _i(o, e) {
  if (!o || !D(o)) return "";
  const t = o.getFullYear(), i = A(o.getMonth() + 1), n = A(o.getDate()), r = A(o.getHours()), s = A(o.getMinutes()), a = A(o.getSeconds());
  switch (e) {
    case "time":
      return `${r}:${s}:${a}`;
    case "datetime":
    case "datetime-local":
      return `${t}-${i}-${n}T${r}:${s}:${a}`;
    case "month":
      return `${t}-${i}`;
    default:
      return `${t}-${i}-${n}`;
  }
}
function We(o, e, t) {
  if (!D(o)) return !1;
  const i = e ? W(e) : null, n = t ? W(t) : null;
  return !!(i && D(i) && o < i || n && D(n) && o > n);
}
var ri = Object.defineProperty, ai = Object.getOwnPropertyDescriptor, Y = (o, e, t, i) => {
  for (var n = i > 1 ? void 0 : i ? ai(e, t) : e, r = o.length - 1, s; r >= 0; r--)
    (s = o[r]) && (n = (i ? s(e, t, n) : s(n)) || n);
  return i && n && ri(e, t, n), n;
};
const Je = "swim-calendar", Se = class Se extends P {
  constructor() {
    super(...arguments), this._value = null, this.disabled = !1, this._currentView = "date", this._focusDate = /* @__PURE__ */ new Date(), this._weeks = [], this._startYear = 0, this._currentDate = /* @__PURE__ */ new Date(), this._onDayKeyDown = (e) => {
      let t = !1;
      switch (e.code) {
        case "ArrowDown":
          this._moveFocus(1, "week"), t = !0;
          break;
        case "ArrowUp":
          this._moveFocus(-1, "week"), t = !0;
          break;
        case "ArrowLeft":
          this._moveFocus(-1, "day"), t = !0;
          break;
        case "ArrowRight":
          this._moveFocus(1, "day"), t = !0;
          break;
        case "PageUp":
          this._moveFocus(-1, e.altKey ? "year" : "month"), t = !0;
          break;
        case "PageDown":
          this._moveFocus(1, e.altKey ? "year" : "month"), t = !0;
          break;
        case "Home": {
          const i = new Date(this._focusDate);
          e.altKey ? i.setDate(1) : i.setDate(i.getDate() - i.getDay()), this._focusDate = i, this._weeks = T(this._focusDate), this.requestUpdate(), this.updateComplete.then(() => this.focusDay()), t = !0;
          break;
        }
        case "End": {
          const i = new Date(this._focusDate);
          e.altKey ? i.setMonth(i.getMonth() + 1, 0) : i.setDate(i.getDate() + (6 - i.getDay())), this._focusDate = i, this._weeks = T(this._focusDate), this.requestUpdate(), this.updateComplete.then(() => this.focusDay()), t = !0;
          break;
        }
        case "Enter":
          setTimeout(() => {
            this.dispatchEvent(new CustomEvent("day-key-enter", { bubbles: !0, composed: !0 }));
          }, 200);
          break;
      }
      t && (e.stopPropagation(), e.preventDefault());
    }, this._onMonthKeyDown = (e) => {
      let t = !1;
      switch (e.code) {
        case "ArrowDown":
          this._moveFocus(3, "month"), t = !0;
          break;
        case "ArrowUp":
          this._moveFocus(-3, "month"), t = !0;
          break;
        case "ArrowLeft":
          this._moveFocus(-1, "month"), t = !0;
          break;
        case "ArrowRight":
          this._moveFocus(1, "month"), t = !0;
          break;
        case "PageUp":
          this._moveFocus(-1, "year"), t = !0;
          break;
        case "PageDown":
          this._moveFocus(1, "year"), t = !0;
          break;
        case "Enter":
          setTimeout(() => {
            this.dispatchEvent(new CustomEvent("day-key-enter", { bubbles: !0, composed: !0 }));
          }, 200);
          break;
      }
      t && (e.stopPropagation(), e.preventDefault());
    }, this._onYearKeyDown = (e) => {
      let t = !1;
      switch (e.code) {
        case "ArrowDown":
          this._moveFocus(4, "year"), t = !0;
          break;
        case "ArrowUp":
          this._moveFocus(-4, "year"), t = !0;
          break;
        case "ArrowLeft":
          this._moveFocus(-1, "year"), t = !0;
          break;
        case "ArrowRight":
          this._moveFocus(1, "year"), t = !0;
          break;
        case "PageUp":
          this._moveFocus(-20, "year"), t = !0;
          break;
        case "PageDown":
          this._moveFocus(20, "year"), t = !0;
          break;
        case "Enter":
          setTimeout(() => {
            this.dispatchEvent(new CustomEvent("day-key-enter", { bubbles: !0, composed: !0 }));
          }, 200);
          break;
      }
      t && (e.stopPropagation(), e.preventDefault());
    };
  }
  get value() {
    return this._value;
  }
  set value(e) {
    const t = this._value;
    e && D(e) ? this._value = new Date(e) : this._value = null, this.requestUpdate("value", t);
  }
  set minView(e) {
    this._minView = e, this._validateView(), this.requestUpdate();
  }
  get minView() {
    return this._minView || "date";
  }
  // today, for highlighting
  // ---------------------------------------------------------------------------
  // Lifecycle
  // ---------------------------------------------------------------------------
  connectedCallback() {
    super.connectedCallback(), this._init();
  }
  updated(e) {
    super.updated(e), e.has("value") && this._value && (this._focusDate = new Date(this._value), this._weeks = T(this._focusDate), this._startYear = qe(this._focusDate.getFullYear()));
  }
  // ---------------------------------------------------------------------------
  // Public methods
  // ---------------------------------------------------------------------------
  /** Focus the active/focused day button. */
  focusDay() {
    var t;
    const e = (t = this.shadowRoot) == null ? void 0 : t.querySelector("button.focus");
    e == null || e.focus();
  }
  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------
  render() {
    switch (this._currentView) {
      case "month":
        return this._renderMonthView();
      case "year":
        return this._renderYearView();
      default:
        return this._renderDateView();
    }
  }
  _renderDateView() {
    const e = this._formatMonthYear(this._focusDate);
    return g`
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
        <div class="day-name-row">${Kt.map((t) => g`<div class="day-name text-center">${t}</div>`)}</div>
        <table class="day-container" role="grid">
          ${this._weeks.map(
      (t) => g`
              <tr class="day-row" role="row">
                ${t.map((i) => {
        if (!i.num)
          return g`<td class="day-cell text-center" role="gridcell"></td>`;
        const n = this._value ? ve(i.date, this._value) : !1, r = ve(i.date, this._focusDate), s = this.disabled || this._isDayDisabled(i.date), a = ["day"];
        return i.prevMonth && a.push("prev-month"), i.nextMonth && a.push("next-month"), i.today && a.push("today"), n && a.push("active"), r && !s && a.push("focus"), g`
                    <td class="day-cell text-center" role="gridcell">
                      <button
                        type="button"
                        class="${a.join(" ")}"
                        ?disabled="${s}"
                        tabindex="${r && !s ? 0 : -1}"
                        @click="${() => this._onDayClick(i)}"
                        @keydown="${this._onDayKeyDown}"
                      >
                        ${i.num}
                      </button>
                    </td>
                  `;
      })}
              </tr>
            `
    )}
        </table>
      </div>
    `;
  }
  _renderMonthView() {
    const e = String(this._focusDate.getFullYear());
    return g`
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
            ${Zt.map((t, i) => {
      const n = this._isMonthActive(i), r = this._isCurrentMonth(i), s = this._focusDate.getMonth() === i && Wt(this._focusDate, this._focusDate), a = this.disabled || this._isMonthDisabled(i), c = ["month"];
      return n && c.push("active"), r && c.push("current"), s && c.push("focus"), g`
                <td class="month-cell text-center" role="gridcell">
                  <button
                    type="button"
                    class="${c.join(" ")}"
                    ?disabled="${a}"
                    tabindex="${s && !a ? 0 : -1}"
                    @click="${() => this._onMonthClick(i)}"
                    @keydown="${this._onMonthKeyDown}"
                  >
                    ${t}
                  </button>
                </td>
              `;
    })}
          </tr>
        </table>
      </div>
    `;
  }
  _renderYearView() {
    const e = Array.from({ length: 20 }, (t, i) => this._startYear + i);
    return g`
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
            ${this._startYear} - ${this._startYear + 20}
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
            ${e.map((t) => {
      const i = this._isYearActive(t), n = t === this._currentDate.getFullYear(), r = t === this._focusDate.getFullYear(), s = this.disabled || this._isYearDisabled(t), a = ["year"];
      return i && a.push("active"), n && a.push("current"), r && a.push("focus"), g`
                <td class="year-cell text-center" role="gridcell">
                  <button
                    type="button"
                    class="${a.join(" ")}"
                    ?disabled="${s}"
                    tabindex="${r && !s ? 0 : -1}"
                    @click="${() => this._onYearClick(t)}"
                    @keydown="${this._onYearKeyDown}"
                  >
                    ${t}
                  </button>
                </td>
              `;
    })}
          </tr>
        </table>
      </div>
    `;
  }
  // ---------------------------------------------------------------------------
  // Internal helpers
  // ---------------------------------------------------------------------------
  _init() {
    this._value && (this._focusDate = new Date(this._value)), this._weeks = T(this._focusDate), this._currentDate = /* @__PURE__ */ new Date(), this._startYear = qe(this._focusDate.getFullYear()), this._validateView();
  }
  _validateView() {
    [
      "date",
      "month",
      "year"
      /* Year */
    ].indexOf(
      this._minView || "date"
      /* Date */
    ) < 0 && (this._minView = "date"), this._currentView = this._minView || "date";
  }
  _formatMonthYear(e) {
    return `${[
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ][e.getMonth()]} ${e.getFullYear()}`;
  }
  _resolveMin() {
    return this.minDate ? this.minDate instanceof Date ? this.minDate : W(this.minDate) : null;
  }
  _resolveMax() {
    return this.maxDate ? this.maxDate instanceof Date ? this.maxDate : W(this.maxDate) : null;
  }
  _isDayDisabled(e) {
    return we(e, this._resolveMin(), "day") || _e(e, this._resolveMax(), "day");
  }
  _isMonthDisabled(e) {
    const t = new Date(this._focusDate.getFullYear(), e, 1);
    return we(t, this._resolveMin(), "month") || _e(t, this._resolveMax(), "month");
  }
  _isYearDisabled(e) {
    const t = new Date(e, 0, 1);
    return we(t, this._resolveMin(), "year") || _e(t, this._resolveMax(), "year");
  }
  _isMonthActive(e) {
    return this._value ? this._value.getMonth() === e && this._value.getFullYear() === this._focusDate.getFullYear() : !1;
  }
  _isCurrentMonth(e) {
    return this._currentDate.getMonth() === e && this._currentDate.getFullYear() === this._focusDate.getFullYear();
  }
  _isYearActive(e) {
    return this._value ? this._value.getFullYear() === e : !1;
  }
  // ---------------------------------------------------------------------------
  // Navigation
  // ---------------------------------------------------------------------------
  _prevMonth() {
    const e = new Date(this._focusDate);
    e.setMonth(e.getMonth() - 1), this._focusDate = e, this._weeks = T(this._focusDate);
  }
  _nextMonth() {
    const e = new Date(this._focusDate);
    e.setMonth(e.getMonth() + 1), this._focusDate = e, this._weeks = T(this._focusDate);
  }
  _prevYear() {
    const e = new Date(this._focusDate);
    e.setFullYear(e.getFullYear() - 1), this._focusDate = e;
  }
  _nextYear() {
    const e = new Date(this._focusDate);
    e.setFullYear(e.getFullYear() + 1), this._focusDate = e;
  }
  _prevTwoDecades() {
    this._startYear -= 20;
  }
  _nextTwoDecades() {
    this._startYear += 20;
  }
  _changeViews() {
    this._currentView === "date" ? this._currentView = "month" : this._currentView === "month" ? this._currentView = "year" : this._currentView = this._minView || "date", this._weeks = T(this._focusDate);
  }
  // ---------------------------------------------------------------------------
  // Day interaction
  // ---------------------------------------------------------------------------
  _onDayClick(e) {
    this._focusDate = new Date(e.date), this._value = new Date(e.date), (e.prevMonth || e.nextMonth) && (this._weeks = T(this._focusDate)), this.requestUpdate(), this.dispatchEvent(new CustomEvent("change", { detail: this._value, bubbles: !0, composed: !0 }));
  }
  _onMonthClick(e) {
    const t = new Date(this._focusDate);
    t.setMonth(e), this._focusDate = t, this._value = new Date(t), (this._minView || "date") !== "month" && (this._currentView = "date", this._weeks = T(this._focusDate)), this.requestUpdate(), this.dispatchEvent(new CustomEvent("change", { detail: this._value, bubbles: !0, composed: !0 }));
  }
  _onYearClick(e) {
    const t = new Date(this._focusDate);
    t.setFullYear(e), this._focusDate = t, this._value = new Date(t), (this._minView || "date") !== "year" && (this._currentView = "month", this._weeks = T(this._focusDate)), this.requestUpdate(), this.dispatchEvent(new CustomEvent("change", { detail: this._value, bubbles: !0, composed: !0 }));
  }
  // ---------------------------------------------------------------------------
  // Keyboard navigation
  // ---------------------------------------------------------------------------
  _moveFocus(e, t) {
    const i = new Date(this._focusDate);
    switch (t) {
      case "day":
        i.setDate(i.getDate() + e);
        break;
      case "week":
        i.setDate(i.getDate() + e * 7);
        break;
      case "month":
        i.setMonth(i.getMonth() + e);
        break;
      case "year":
        i.setFullYear(i.getFullYear() + e);
        break;
    }
    this._focusDate = i, this._weeks = T(this._focusDate), this._focusDate.getFullYear() < this._startYear ? this._prevTwoDecades() : this._focusDate.getFullYear() > this._startYear + 20 && this._nextTwoDecades(), this.requestUpdate(), this.updateComplete.then(() => this.focusDay());
  }
};
Se.styles = [se, jt];
let E = Se;
Y([
  l({ attribute: !1 })
], E.prototype, "value", 1);
Y([
  l({ attribute: "min-date" })
], E.prototype, "minDate", 2);
Y([
  l({ attribute: "max-date" })
], E.prototype, "maxDate", 2);
Y([
  l({ type: Boolean, reflect: !0 })
], E.prototype, "disabled", 2);
Y([
  l({ type: String })
], E.prototype, "timezone", 2);
Y([
  l({ type: String, attribute: "min-view" })
], E.prototype, "minView", 1);
Y([
  $()
], E.prototype, "_currentView", 2);
Y([
  $()
], E.prototype, "_focusDate", 2);
Y([
  $()
], E.prototype, "_weeks", 2);
Y([
  $()
], E.prototype, "_startYear", 2);
customElements.get(Je) || customElements.define(Je, E);
const li = [
  se,
  st,
  I`
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
  `
];
var Q = /* @__PURE__ */ ((o) => (o.Regular = "regular", o.Medium = "medium", o.Large = "large", o))(Q || {}), ci = Object.defineProperty, di = Object.getOwnPropertyDescriptor, S = (o, e, t, i) => {
  for (var n = i > 1 ? void 0 : i ? di(e, t) : e, r = o.length - 1, s; r >= 0; r--)
    (s = o[r]) && (n = (i ? s(e, t, n) : s(n)) || n);
  return i && n && ci(e, t, n), n;
};
const Ge = "swim-dialog", Ee = class Ee extends P {
  constructor() {
    super(...arguments), this.dialogTitle = "", this.content = "", this.class = "", this.cssClass = "", this.format = Q.Regular, this.showBackdrop = !0, this._closeButton = !0, this._visible = !1, this._zIndex = 991, this._contentId = `swim-dialog-content-${Math.random().toString(36).slice(2, 11)}`, this._titleId = `swim-dialog-title-${Math.random().toString(36).slice(2, 11)}`, this._previousActiveElement = null;
  }
  get title() {
    return this.dialogTitle;
  }
  set title(e) {
    e && (this.dialogTitle = e);
  }
  get closeButton() {
    return this._closeButton;
  }
  set closeButton(e) {
    this._closeButton = k(e);
  }
  get visible() {
    return this._visible;
  }
  set visible(e) {
    const t = k(e);
    this._visible !== t && (this._visible = t, t ? (this._previousActiveElement = typeof document < "u" ? document.activeElement : null, this.dispatchEvent(new CustomEvent("open", { bubbles: !0 }))) : (this._restoreFocus(), this.dispatchEvent(new CustomEvent("close", { detail: void 0, bubbles: !0 }))));
  }
  get zIndex() {
    return this._zIndex;
  }
  set zIndex(e) {
    this._zIndex = lt(e, 991);
  }
  get _contentzIndex() {
    return this.zIndex + 1;
  }
  get _canClose() {
    return this.beforeClose ? this.beforeClose() : !0;
  }
  _restoreFocus() {
    this._previousActiveElement && typeof this._previousActiveElement.focus == "function" && this._previousActiveElement.focus(), this._previousActiveElement = null;
  }
  /** Show the dialog */
  show() {
    this.visible = !0;
  }
  /** Hide the dialog (respects beforeClose) */
  hide() {
    this._canClose && (this.visible = !1);
  }
  _onBackdropClick() {
    this.hide();
  }
  _onKeydown(e) {
    e.key === "Escape" && (e.stopPropagation(), this.hide());
  }
  firstUpdated() {
    this.visible && this._contentEl && this._contentEl.focus({ preventScroll: !0 });
  }
  updated(e) {
    e.has("visible") && this.visible && this._contentEl && requestAnimationFrame(() => {
      var t;
      (t = this._contentEl) == null || t.focus({ preventScroll: !0 });
    });
  }
  render() {
    if (!this.visible) return u;
    const e = this.format === Q.Regular || this.format === "regular", t = this.format === Q.Large || this.format === "large", i = this.format === Q.Medium || this.format === "medium", n = [
      "swim-dialog__content",
      this.cssClass,
      t ? "swim-dialog__content--large" : "",
      i ? "swim-dialog__content--medium" : ""
    ].filter(Boolean).join(" "), r = this.class.includes("swim-dialog--full-screen"), s = ["swim-dialog", "swim-dialog--open", this.class, r ? "swim-scroll" : ""].filter(Boolean).join(" ");
    return g`
      <div class="${s}" style="--swim-dialog-z: ${this.zIndex}" role="presentation">
        ${this.showBackdrop ? g`<div class="swim-dialog__backdrop" aria-hidden="true" @click="${this._onBackdropClick}"></div>` : u}
        <div
          part="content"
          class="${n}"
          style="z-index: ${this._contentzIndex}"
          tabindex="-1"
          role="dialog"
          aria-modal="true"
          aria-labelledby="${this.dialogTitle ? this._titleId : u}"
          id="${this._contentId}"
          @keydown="${this._onKeydown}"
        >
          ${e ? g`
                ${this.closeButton ? g`
                      <button
                        part="close-button"
                        type="button"
                        class="swim-dialog__close"
                        aria-label="Close dialog"
                        @click="${this.hide}"
                      >
                        <swim-icon font-icon="x"></swim-icon>
                      </button>
                    ` : u}
                ${this.dialogTitle ? g`
                      <div class="swim-dialog__header">
                        <h2 id="${this._titleId}" class="swim-dialog__title">${this.dialogTitle}</h2>
                      </div>
                    ` : u}
                <div class="swim-dialog__body swim-scroll">
                  <slot></slot>
                  ${this.content ? g`<div>${this.content}</div>` : u}
                </div>
              ` : g`
                <div class="swim-dialog__body swim-scroll">
                  <slot></slot>
                  ${this.content ? g`<div>${this.content}</div>` : u}
                </div>
              `}
        </div>
      </div>
    `;
  }
};
Ee.styles = li;
let M = Ee;
S([
  l({ type: String, attribute: "dialog-title" })
], M.prototype, "dialogTitle", 2);
S([
  l({ type: String })
], M.prototype, "title", 1);
S([
  l({ type: String })
], M.prototype, "content", 2);
S([
  l({ type: String })
], M.prototype, "class", 2);
S([
  l({ type: String, attribute: "css-class" })
], M.prototype, "cssClass", 2);
S([
  l({ type: String, reflect: !0 })
], M.prototype, "format", 2);
S([
  l({
    type: Boolean,
    attribute: "show-backdrop",
    reflect: !0,
    converter: {
      fromAttribute: (o) => o === null ? !0 : o !== "false" && o !== "0",
      toAttribute: (o) => o ? "" : "false"
    }
  })
], M.prototype, "showBackdrop", 2);
S([
  l({ type: Boolean, attribute: "close-button" })
], M.prototype, "closeButton", 1);
S([
  l({ type: Boolean, reflect: !0 })
], M.prototype, "visible", 1);
S([
  l({ type: Number })
], M.prototype, "zIndex", 1);
S([
  l({ attribute: !1 })
], M.prototype, "beforeClose", 2);
S([
  $()
], M.prototype, "_contentId", 2);
S([
  $()
], M.prototype, "_titleId", 2);
S([
  ke(".swim-dialog__content")
], M.prototype, "_contentEl", 2);
customElements.get(Ge) || customElements.define(Ge, M);
const hi = I`
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
`;
var ui = Object.defineProperty, mi = Object.getOwnPropertyDescriptor, m = (o, e, t, i) => {
  for (var n = i > 1 ? void 0 : i ? mi(e, t) : e, r = o.length - 1, s; r >= 0; r--)
    (s = o[r]) && (n = (i ? s(e, t, n) : s(n)) || n);
  return i && n && ui(e, t, n), n;
};
let bi = 0;
const Qe = "swim-date-time", he = class he extends P {
  // ---------------------------------------------------------------------------
  // Lifecycle
  // ---------------------------------------------------------------------------
  constructor() {
    super(), this.id = `swim-date-time-${++bi}`, this.name = "", this.label = "", this.hint = "", this.placeholder = "", this.size = "sm", this.appearance = "legacy", this._disabled = !1, this._required = !1, this.requiredIndicator = "*", this._autofocus = !1, this._autosize = !1, this._minWidth = 60, this._marginless = !1, this._value = null, this._displayValue = "", this._dateInvalid = !1, this._dateOutOfRange = !1, this._focused = !1, this._dialogOpen = !1, this._dialogModel = null, this._dialogHour = 12, this._dialogMinute = "00", this._dialogSecond = "00", this._dialogMillisecond = "000", this._dialogAmPm = "AM", this._modes = ["millisecond", "second", "minute", "hour", "date", "month", "year"], this._apply = () => {
      this._dialogModel && (this.value = this._dialogModel, this._update(), this.dispatchEvent(new CustomEvent("date-time-selected", { detail: this.value, bubbles: !0, composed: !0 })), this.dispatchEvent(new CustomEvent("change", { detail: this.value, bubbles: !0, composed: !0 }))), this._close();
    }, this._clear = () => {
      this.value = void 0, this._update(), this.dispatchEvent(new CustomEvent("date-time-selected", { detail: void 0, bubbles: !0, composed: !0 })), this.dispatchEvent(new CustomEvent("change", { detail: void 0, bubbles: !0, composed: !0 })), this._close();
    }, this._selectCurrent = () => {
      this._setDialogDate(/* @__PURE__ */ new Date());
    }, this._close = () => {
      this._dialogOpen = !1, this._update();
    }, this._onCalendarChange = (e) => {
      e.stopPropagation();
      const t = e.detail;
      t && D(t) && (this._dialogModel && this._showTime && t.setHours(
        this._dialogModel.getHours(),
        this._dialogModel.getMinutes(),
        this._dialogModel.getSeconds(),
        this._dialogModel.getMilliseconds()
      ), this._setDialogDate(t));
    }, this._onHourChange = (e) => {
      const t = +e.target.value % 12, i = this._dialogAmPm === "PM" ? 12 + t : t;
      if (this._dialogModel) {
        const n = new Date(this._dialogModel);
        n.setHours(i), this._setDialogDate(n);
      }
    }, this._onMinuteChange = (e) => {
      const t = +e.target.value;
      if (this._dialogModel) {
        const i = new Date(this._dialogModel);
        i.setMinutes(t), this._setDialogDate(i);
      }
    }, this._onSecondChange = (e) => {
      const t = +e.target.value;
      if (this._dialogModel) {
        const i = new Date(this._dialogModel);
        i.setSeconds(t), this._setDialogDate(i);
      }
    }, this._onMillisecondChange = (e) => {
      const t = +e.target.value;
      if (this._dialogModel) {
        const i = new Date(this._dialogModel);
        i.setMilliseconds(t), this._setDialogDate(i);
      }
    }, this._onDialogKeyDown = (e) => {
      e.code === "Escape" && (this._close(), e.stopPropagation(), e.preventDefault());
    }, this._internals = this.attachInternals();
  }
  get disabled() {
    return this._disabled;
  }
  set disabled(e) {
    const t = this._disabled;
    this._disabled = k(e), this.requestUpdate("disabled", t);
  }
  get required() {
    return this._required;
  }
  set required(e) {
    const t = this._required;
    this._required = k(e), this.requestUpdate("required", t);
  }
  get autofocus() {
    return this._autofocus;
  }
  set autofocus(e) {
    this._autofocus = k(e);
  }
  get autosize() {
    return this._autosize;
  }
  set autosize(e) {
    const t = this._autosize;
    this._autosize = k(e), this.requestUpdate("autosize", t);
  }
  get minWidth() {
    return this._minWidth;
  }
  set minWidth(e) {
    this._minWidth = lt(e) ?? 60;
  }
  set inputType(e) {
    const t = this._inputType;
    this._inputType = e, this.requestUpdate("inputType", t);
  }
  get inputType() {
    return this._effectiveInputType;
  }
  set displayMode(e) {
    const t = this._displayMode;
    this._displayMode = e, this.requestUpdate("displayMode", t);
  }
  get displayMode() {
    return this._effectiveDisplayMode;
  }
  get marginless() {
    return this._marginless;
  }
  set marginless(e) {
    const t = this._marginless;
    this._marginless = k(e), this.requestUpdate("marginless", t);
  }
  get value() {
    return this._value;
  }
  set value(e) {
    const t = this._value;
    if (typeof e == "string" && (e = e.trim(), e || (e = null)), !e && !this._value) {
      this._value = null;
      return;
    }
    if (e === this._value) return;
    let i = e instanceof Date && D(e);
    if (typeof e == "string") {
      const n = W(e);
      n && (e = n, i = !0);
    }
    if (i && e instanceof Date && this.precision && (e = Ke(e, this.precision)), this._value = e, this._update(), this._internals) {
      const n = this._value instanceof Date ? this._value.toISOString() : String(this._value ?? "");
      this._internals.setFormValue(n);
    }
    this.requestUpdate("value", t);
  }
  // ---------------------------------------------------------------------------
  // Computed helpers
  // ---------------------------------------------------------------------------
  get _effectiveInputType() {
    return this._inputType ? this._inputType : this.precision === "hour" || this.precision === "minute" ? y.datetime : y.date;
  }
  get _effectiveDisplayMode() {
    return this._displayMode ? this._displayMode : this.timezone ? C.TIMEZONE : C.LOCAL;
  }
  get _effectiveFormat() {
    return this.format ? ni(this.format) : si(
      this._effectiveDisplayMode,
      this._effectiveInputType,
      this.precision
    );
  }
  get _iconName() {
    switch (this._effectiveInputType) {
      case y.time:
        return "clock";
      case y.datetime:
        return "calendar-clock";
      default:
        return "calendar";
    }
  }
  get _showCalendar() {
    return this._effectiveInputType === y.date || this._effectiveInputType === y.datetime;
  }
  get _showTime() {
    return this._effectiveInputType === y.time || this._effectiveInputType === y.datetime;
  }
  connectedCallback() {
    super.connectedCallback(), this._update();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
  }
  firstUpdated() {
    this.autofocus && this._swimInput && requestAnimationFrame(() => {
      var e, t;
      (t = (e = this._swimInput) == null ? void 0 : e.focus) == null || t.call(e);
    });
  }
  updated(e) {
    super.updated(e), this.label ? this.setAttribute("has-label", "") : this.removeAttribute("has-label"), this._dateInvalid ? this.setAttribute("date-invalid", "") : this.removeAttribute("date-invalid"), this._dateOutOfRange ? this.setAttribute("date-out-of-range", "") : this.removeAttribute("date-out-of-range"), this._focused ? this.setAttribute("focused", "") : this.removeAttribute("focused"), (e.has("format") || e.has("precision") || e.has("timezone") || e.has("displayMode") || e.has("inputType")) && this._update(), (e.has("required") || e.has("minDate") || e.has("maxDate")) && this._validate();
  }
  /** Delegate focus to the inner input. */
  focus(e) {
    var t, i;
    (i = (t = this._swimInput) == null ? void 0 : t.focus) == null || i.call(t, e);
  }
  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------
  render() {
    return g`
      <div class="swim-date-time__container">
        <swim-input
          part="input"
          .id="${this.id + "-input"}"
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
          tabindex="${O(this.tabindex)}"
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
    `;
  }
  _renderDialog() {
    const e = this._getDialogHeaderText();
    return g`
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

          ${this._showCalendar ? g`
                <swim-calendar
                  .value="${this._dialogModel}"
                  .minDate="${this.minDate}"
                  .maxDate="${this.maxDate}"
                  .disabled="${this.disabled}"
                  min-view="${this._calendarMinView}"
                  @change="${this._onCalendarChange}"
                  @day-key-enter="${this._apply}"
                ></swim-calendar>
              ` : u}
          ${this._showTime ? this._renderTimeRow() : u}

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
    `;
  }
  _renderTimeRow() {
    const e = this._isTimeDisabled("hour"), t = this._isTimeDisabled("minute"), i = this._isTimeDisabled("second"), n = this._isTimeDisabled("millisecond");
    return g`
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
            ?disabled="${n}"
            @change="${this._onMillisecondChange}"
          />
          <div class="swim-date-time__time-hint">Millisecond</div>
        </div>
        <div class="swim-date-time__ampm-group">
          <button
            type="button"
            class="swim-date-time__ampm ${this._dialogAmPm === "AM" ? "selected" : ""}"
            ?disabled="${e}"
            @click="${() => this._onAmPmChange("AM")}"
          >
            AM
          </button>
          <button
            type="button"
            class="swim-date-time__ampm ${this._dialogAmPm === "PM" ? "selected" : ""}"
            ?disabled="${e}"
            @click="${() => this._onAmPmChange("PM")}"
          >
            PM
          </button>
        </div>
      </div>
    `;
  }
  // ---------------------------------------------------------------------------
  // Dialog helpers
  // ---------------------------------------------------------------------------
  get _calendarMinView() {
    return this.precision === "month" ? "month" : this.precision === "year" ? "year" : "date";
  }
  _getDialogHeaderText() {
    if (!this._dialogModel)
      return "No value";
    const e = this._effectiveInputType, t = ye(this.timezone);
    if (e === y.time)
      return G(this._dialogModel, "h:mm a", t);
    if (e === y.datetime) {
      const i = G(this._dialogModel, "ddd, MMM D YYYY", t), n = G(this._dialogModel, "h:mm a", t);
      return g`${i} <small>${n}</small>`;
    }
    return G(this._dialogModel, "ddd, MMM D YYYY", t);
  }
  _setDialogDate(e) {
    this._dialogModel = new Date(e);
    const t = this._dialogModel.getHours();
    this._dialogHour = t % 12 || 12, this._dialogMinute = String(this._dialogModel.getMinutes()).padStart(2, "0"), this._dialogSecond = String(this._dialogModel.getSeconds()).padStart(2, "0"), this._dialogMillisecond = String(this._dialogModel.getMilliseconds()).padStart(3, "0"), this._dialogAmPm = t >= 12 ? "PM" : "AM";
  }
  _isTimeDisabled(e) {
    return this.precision ? this._modes.indexOf(this.precision) > this._modes.indexOf(e) : !1;
  }
  _isCurrent() {
    if (!this._dialogModel) return !1;
    const e = /* @__PURE__ */ new Date(), t = this._effectiveInputType;
    return t === y.time ? e.getHours() === this._dialogModel.getHours() && e.getMinutes() === this._dialogModel.getMinutes() && e.getSeconds() === this._dialogModel.getSeconds() && e.getMilliseconds() === this._dialogModel.getMilliseconds() : t === y.datetime ? e.getFullYear() === this._dialogModel.getFullYear() && e.getMonth() === this._dialogModel.getMonth() && e.getDate() === this._dialogModel.getDate() && e.getHours() === this._dialogModel.getHours() && e.getMinutes() === this._dialogModel.getMinutes() && e.getSeconds() === this._dialogModel.getSeconds() && e.getMilliseconds() === this._dialogModel.getMilliseconds() : e.getFullYear() === this._dialogModel.getFullYear() && e.getMonth() === this._dialogModel.getMonth() && e.getDate() === this._dialogModel.getDate();
  }
  // ---------------------------------------------------------------------------
  // Dialog actions
  // ---------------------------------------------------------------------------
  _openPicker() {
    if (this.disabled || this._dialogOpen) return;
    const e = this._value instanceof Date && D(this._value) ? this._value : /* @__PURE__ */ new Date();
    this._setDialogDate(e), this._dialogOpen = !0;
  }
  _onAmPmChange(e) {
    if (!this._dialogModel) return;
    const t = new Date(this._dialogModel), i = t.getHours();
    e === "AM" && this._dialogAmPm === "PM" ? t.setHours(i - 12) : e === "PM" && this._dialogAmPm === "AM" && t.setHours(i + 12), this._setDialogDate(t);
  }
  // ---------------------------------------------------------------------------
  // Input event handlers
  // ---------------------------------------------------------------------------
  _handleInput(e) {
    e.stopPropagation();
    const i = e.target.value;
    this._displayValue = i;
    const n = W(i), r = this._value;
    if (n) {
      const s = this.precision ? Ke(n, this.precision) : n;
      this._value = s, this._dateInvalid = !1;
    } else i ? (this._value = i, this._dateInvalid = !0) : (this._value = null, this._dateInvalid = !1);
    this._dateOutOfRange = !this._dateInvalid && this._value instanceof Date ? We(this._value, this.minDate, this.maxDate) : !1, this._updateFormValue(), this.dispatchEvent(new CustomEvent("input-change", { detail: this._value, bubbles: !0, composed: !0 })), this._value !== r && this.dispatchEvent(new CustomEvent("value-change", { detail: this._value, bubbles: !0, composed: !0 })), !this._dateInvalid && this._value !== r && this.dispatchEvent(new CustomEvent("change", { detail: this._value, bubbles: !0, composed: !0 }));
  }
  _handleFocus(e) {
    e.stopPropagation(), this._focused = !0, this.dispatchEvent(new FocusEvent("focus", { bubbles: !0, composed: !0 }));
  }
  _handleBlur(e) {
    e.stopPropagation(), this._focused = !1, this._update(), !this._dateInvalid && this._swimInput && this._swimInput.value !== this._displayValue && (this._swimInput.value = this._displayValue), this.dispatchEvent(new FocusEvent("blur", { bubbles: !0, composed: !0 }));
  }
  _handleKeyDown(e) {
    e.code === "ArrowDown" ? (e.preventDefault(), this._openPicker()) : e.code === "Escape" && (this._dialogOpen && this._close(), e.stopPropagation());
  }
  // ---------------------------------------------------------------------------
  // Internal helpers
  // ---------------------------------------------------------------------------
  _update() {
    const e = this._value, t = e instanceof Date && D(e);
    if (this._dateInvalid = !!e && !t, this._displayValue = e ? String(e) : "", this._dateOutOfRange = !1, !t) return;
    const i = ye(this.timezone);
    this._displayValue = G(e, this._effectiveFormat, i), this._dateOutOfRange = We(e, this.minDate, this.maxDate);
  }
  _validate() {
    let e = {}, t = "";
    this._required && !this._value ? (e = { valueMissing: !0 }, t = "A value is required.") : this._dateInvalid ? (e = { typeMismatch: !0 }, t = "Invalid date.") : this._dateOutOfRange && (e = { rangeOverflow: !0 }, t = "Date is out of the allowed range."), t ? this._internals.setValidity(e, t) : this._internals.setValidity({});
  }
  _updateFormValue() {
    if (!this._internals) return;
    const e = this._value;
    e instanceof Date && D(e) ? this._internals.setFormValue(e.toISOString()) : this._internals.setFormValue(String(e ?? "")), this._validate();
  }
  // ---------------------------------------------------------------------------
  // Form callbacks
  // ---------------------------------------------------------------------------
  formResetCallback() {
    this._value = null, this._displayValue = "", this._dateInvalid = !1, this._dateOutOfRange = !1, this._internals.setFormValue(""), this._internals.setValidity({}), this.requestUpdate();
  }
  formDisabledCallback(e) {
    this.disabled = e;
  }
};
he.styles = [se, hi], he.formAssociated = !0;
let h = he;
m([
  ke("swim-input")
], h.prototype, "_swimInput", 2);
m([
  l({ type: String })
], h.prototype, "id", 2);
m([
  l({ type: String })
], h.prototype, "name", 2);
m([
  l({ type: String })
], h.prototype, "label", 2);
m([
  l({ type: String })
], h.prototype, "hint", 2);
m([
  l({ type: String })
], h.prototype, "placeholder", 2);
m([
  l({ type: String, reflect: !0 })
], h.prototype, "size", 2);
m([
  l({ type: String, reflect: !0 })
], h.prototype, "appearance", 2);
m([
  l({ type: Boolean, reflect: !0 })
], h.prototype, "disabled", 1);
m([
  l({ type: Boolean, reflect: !0 })
], h.prototype, "required", 1);
m([
  l({ type: String, attribute: "required-indicator" })
], h.prototype, "requiredIndicator", 2);
m([
  l({ type: Boolean })
], h.prototype, "autofocus", 1);
m([
  l({ type: Boolean, reflect: !0 })
], h.prototype, "autosize", 1);
m([
  l({ type: Number, attribute: "min-width" })
], h.prototype, "minWidth", 1);
m([
  l({ type: Number })
], h.prototype, "tabindex", 2);
m([
  l({ type: String, attribute: "input-type" })
], h.prototype, "inputType", 1);
m([
  l({ type: String })
], h.prototype, "precision", 2);
m([
  l({ type: String })
], h.prototype, "timezone", 2);
m([
  l({ type: String, attribute: "display-mode" })
], h.prototype, "displayMode", 1);
m([
  l({ type: String })
], h.prototype, "format", 2);
m([
  l({ type: Boolean, reflect: !0 })
], h.prototype, "marginless", 1);
m([
  l({ attribute: "min-date" })
], h.prototype, "minDate", 2);
m([
  l({ attribute: "max-date" })
], h.prototype, "maxDate", 2);
m([
  l({ attribute: !1 })
], h.prototype, "value", 1);
m([
  $()
], h.prototype, "_displayValue", 2);
m([
  $()
], h.prototype, "_dateInvalid", 2);
m([
  $()
], h.prototype, "_dateOutOfRange", 2);
m([
  $()
], h.prototype, "_focused", 2);
m([
  $()
], h.prototype, "_dialogOpen", 2);
m([
  $()
], h.prototype, "_dialogModel", 2);
m([
  $()
], h.prototype, "_dialogHour", 2);
m([
  $()
], h.prototype, "_dialogMinute", 2);
m([
  $()
], h.prototype, "_dialogSecond", 2);
m([
  $()
], h.prototype, "_dialogMillisecond", 2);
m([
  $()
], h.prototype, "_dialogAmPm", 2);
customElements.get(Qe) || customElements.define(Qe, h);
export {
  C as DateDisplayType,
  y as DateTimeType,
  h as SwimDateTime,
  G as formatDate,
  wi as getEffectiveDisplayFormat,
  si as getEffectiveInputFormat,
  We as isOutOfRange,
  D as isValidDate,
  ye as normalizeTimezone,
  W as parseDate,
  ni as resolveFormat,
  Ke as roundToPrecision,
  _i as toNativeInputValue
};
