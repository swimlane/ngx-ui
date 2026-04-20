/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const N = globalThis, Z = N.ShadowRoot && (N.ShadyCSS === void 0 || N.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, J = Symbol(), st = /* @__PURE__ */ new WeakMap();
let _t = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== J) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Z && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = st.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && st.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const At = (r) => new _t(typeof r == "string" ? r : r + "", void 0, J), B = (r, ...t) => {
  const e = r.length === 1 ? r[0] : t.reduce((s, i, n) => s + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + r[n + 1], r[0]);
  return new _t(e, r, J);
}, xt = (r, t) => {
  if (Z) r.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), i = N.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = e.cssText, r.appendChild(s);
  }
}, it = Z ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return At(e);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Et, defineProperty: St, getOwnPropertyDescriptor: Ct, getOwnPropertyNames: Pt, getOwnPropertySymbols: Ot, getPrototypeOf: Tt } = Object, $ = globalThis, rt = $.trustedTypes, Ut = rt ? rt.emptyScript : "", q = $.reactiveElementPolyfillSupport, T = (r, t) => r, D = { toAttribute(r, t) {
  switch (t) {
    case Boolean:
      r = r ? Ut : null;
      break;
    case Object:
    case Array:
      r = r == null ? r : JSON.stringify(r);
  }
  return r;
}, fromAttribute(r, t) {
  let e = r;
  switch (t) {
    case Boolean:
      e = r !== null;
      break;
    case Number:
      e = r === null ? null : Number(r);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(r);
      } catch {
        e = null;
      }
  }
  return e;
} }, Q = (r, t) => !Et(r, t), nt = { attribute: !0, type: String, converter: D, reflect: !1, useDefault: !1, hasChanged: Q };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), $.litPropertyMetadata ?? ($.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let x = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = nt) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(t, s, e);
      i !== void 0 && St(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: i, set: n } = Ct(this.prototype, t) ?? { get() {
      return this[e];
    }, set(o) {
      this[e] = o;
    } };
    return { get: i, set(o) {
      const l = i == null ? void 0 : i.call(this);
      n == null || n.call(this, o), this.requestUpdate(t, l, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? nt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(T("elementProperties"))) return;
    const t = Tt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(T("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(T("properties"))) {
      const e = this.properties, s = [...Pt(e), ...Ot(e)];
      for (const i of s) this.createProperty(i, e[i]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [s, i] of e) this.elementProperties.set(s, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, s] of this.elementProperties) {
      const i = this._$Eu(e, s);
      i !== void 0 && this._$Eh.set(i, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const i of s) e.unshift(it(i));
    } else t !== void 0 && e.push(it(t));
    return e;
  }
  static _$Eu(t, e) {
    const s = e.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((e) => e(this));
  }
  addController(t) {
    var e;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && ((e = t.hostConnected) == null || e.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$EO) == null || e.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const s of e.keys()) this.hasOwnProperty(s) && (t.set(s, this[s]), delete this[s]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return xt(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((e) => {
      var s;
      return (s = e.hostConnected) == null ? void 0 : s.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((e) => {
      var s;
      return (s = e.hostDisconnected) == null ? void 0 : s.call(e);
    });
  }
  attributeChangedCallback(t, e, s) {
    this._$AK(t, s);
  }
  _$ET(t, e) {
    var n;
    const s = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, s);
    if (i !== void 0 && s.reflect === !0) {
      const o = (((n = s.converter) == null ? void 0 : n.toAttribute) !== void 0 ? s.converter : D).toAttribute(e, s.type);
      this._$Em = t, o == null ? this.removeAttribute(i) : this.setAttribute(i, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var n, o;
    const s = this.constructor, i = s._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const l = s.getPropertyOptions(i), a = typeof l.converter == "function" ? { fromAttribute: l.converter } : ((n = l.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? l.converter : D;
      this._$Em = i;
      const c = a.fromAttribute(e, l.type);
      this[i] = c ?? ((o = this._$Ej) == null ? void 0 : o.get(i)) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, e, s, i = !1, n) {
    var o;
    if (t !== void 0) {
      const l = this.constructor;
      if (i === !1 && (n = this[t]), s ?? (s = l.getPropertyOptions(t)), !((s.hasChanged ?? Q)(n, e) || s.useDefault && s.reflect && n === ((o = this._$Ej) == null ? void 0 : o.get(t)) && !this.hasAttribute(l._$Eu(t, s)))) return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: s, reflect: i, wrapped: n }, o) {
    s && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, o ?? e ?? this[t]), n !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (e = void 0), this._$AL.set(t, e)), i === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var s;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [n, o] of this._$Ep) this[n] = o;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [n, o] of i) {
        const { wrapped: l } = o, a = this[n];
        l !== !0 || this._$AL.has(n) || a === void 0 || this.C(n, void 0, o, a);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (s = this._$EO) == null || s.forEach((i) => {
        var n;
        return (n = i.hostUpdate) == null ? void 0 : n.call(i);
      }), this.update(e)) : this._$EM();
    } catch (i) {
      throw t = !1, this._$EM(), i;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$EO) == null || e.forEach((s) => {
      var i;
      return (i = s.hostUpdated) == null ? void 0 : i.call(s);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
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
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((e) => this._$ET(e, this[e]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
x.elementStyles = [], x.shadowRootOptions = { mode: "open" }, x[T("elementProperties")] = /* @__PURE__ */ new Map(), x[T("finalized")] = /* @__PURE__ */ new Map(), q == null || q({ ReactiveElement: x }), ($.reactiveElementVersions ?? ($.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const U = globalThis, ot = (r) => r, I = U.trustedTypes, at = I ? I.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, ft = "$lit$", f = `lit$${Math.random().toFixed(9).slice(2)}$`, $t = "?" + f, Mt = `<${$t}>`, w = document, M = () => w.createComment(""), k = (r) => r === null || typeof r != "object" && typeof r != "function", X = Array.isArray, kt = (r) => X(r) || typeof (r == null ? void 0 : r[Symbol.iterator]) == "function", V = `[ 	
\f\r]`, O = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, lt = /-->/g, ht = />/g, m = RegExp(`>|${V}(?:([^\\s"'>=/]+)(${V}*=${V}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ct = /'/g, dt = /"/g, mt = /^(?:script|style|textarea|title)$/i, Rt = (r) => (t, ...e) => ({ _$litType$: r, strings: t, values: e }), G = Rt(1), S = Symbol.for("lit-noChange"), d = Symbol.for("lit-nothing"), pt = /* @__PURE__ */ new WeakMap(), v = w.createTreeWalker(w, 129);
function vt(r, t) {
  if (!X(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return at !== void 0 ? at.createHTML(t) : t;
}
const zt = (r, t) => {
  const e = r.length - 1, s = [];
  let i, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = O;
  for (let l = 0; l < e; l++) {
    const a = r[l];
    let c, p, h = -1, u = 0;
    for (; u < a.length && (o.lastIndex = u, p = o.exec(a), p !== null); ) u = o.lastIndex, o === O ? p[1] === "!--" ? o = lt : p[1] !== void 0 ? o = ht : p[2] !== void 0 ? (mt.test(p[2]) && (i = RegExp("</" + p[2], "g")), o = m) : p[3] !== void 0 && (o = m) : o === m ? p[0] === ">" ? (o = i ?? O, h = -1) : p[1] === void 0 ? h = -2 : (h = o.lastIndex - p[2].length, c = p[1], o = p[3] === void 0 ? m : p[3] === '"' ? dt : ct) : o === dt || o === ct ? o = m : o === lt || o === ht ? o = O : (o = m, i = void 0);
    const _ = o === m && r[l + 1].startsWith("/>") ? " " : "";
    n += o === O ? a + Mt : h >= 0 ? (s.push(c), a.slice(0, h) + ft + a.slice(h) + f + _) : a + f + (h === -2 ? l : _);
  }
  return [vt(r, n + (r[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class R {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let n = 0, o = 0;
    const l = t.length - 1, a = this.parts, [c, p] = zt(t, e);
    if (this.el = R.createElement(c, s), v.currentNode = this.el.content, e === 2 || e === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (i = v.nextNode()) !== null && a.length < l; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const h of i.getAttributeNames()) if (h.endsWith(ft)) {
          const u = p[o++], _ = i.getAttribute(h).split(f), H = /([.?@])?(.*)/.exec(u);
          a.push({ type: 1, index: n, name: H[2], strings: _, ctor: H[1] === "." ? Nt : H[1] === "?" ? Dt : H[1] === "@" ? It : L }), i.removeAttribute(h);
        } else h.startsWith(f) && (a.push({ type: 6, index: n }), i.removeAttribute(h));
        if (mt.test(i.tagName)) {
          const h = i.textContent.split(f), u = h.length - 1;
          if (u > 0) {
            i.textContent = I ? I.emptyScript : "";
            for (let _ = 0; _ < u; _++) i.append(h[_], M()), v.nextNode(), a.push({ type: 2, index: ++n });
            i.append(h[u], M());
          }
        }
      } else if (i.nodeType === 8) if (i.data === $t) a.push({ type: 2, index: n });
      else {
        let h = -1;
        for (; (h = i.data.indexOf(f, h + 1)) !== -1; ) a.push({ type: 7, index: n }), h += f.length - 1;
      }
      n++;
    }
  }
  static createElement(t, e) {
    const s = w.createElement("template");
    return s.innerHTML = t, s;
  }
}
function C(r, t, e = r, s) {
  var o, l;
  if (t === S) return t;
  let i = s !== void 0 ? (o = e._$Co) == null ? void 0 : o[s] : e._$Cl;
  const n = k(t) ? void 0 : t._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== n && ((l = i == null ? void 0 : i._$AO) == null || l.call(i, !1), n === void 0 ? i = void 0 : (i = new n(r), i._$AT(r, e, s)), s !== void 0 ? (e._$Co ?? (e._$Co = []))[s] = i : e._$Cl = i), i !== void 0 && (t = C(r, i._$AS(r, t.values), i, s)), t;
}
class Ht {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: s } = this._$AD, i = ((t == null ? void 0 : t.creationScope) ?? w).importNode(e, !0);
    v.currentNode = i;
    let n = v.nextNode(), o = 0, l = 0, a = s[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let c;
        a.type === 2 ? c = new z(n, n.nextSibling, this, t) : a.type === 1 ? c = new a.ctor(n, a.name, a.strings, this, t) : a.type === 6 && (c = new Bt(n, this, t)), this._$AV.push(c), a = s[++l];
      }
      o !== (a == null ? void 0 : a.index) && (n = v.nextNode(), o++);
    }
    return v.currentNode = w, i;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class z {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, s, i) {
    this.type = 2, this._$AH = d, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = C(this, t, e), k(t) ? t === d || t == null || t === "" ? (this._$AH !== d && this._$AR(), this._$AH = d) : t !== this._$AH && t !== S && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : kt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== d && k(this._$AH) ? this._$AA.nextSibling.data = t : this.T(w.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var n;
    const { values: e, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = R.createElement(vt(s.h, s.h[0]), this.options)), s);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === i) this._$AH.p(e);
    else {
      const o = new Ht(i, this), l = o.u(this.options);
      o.p(e), this.T(l), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = pt.get(t.strings);
    return e === void 0 && pt.set(t.strings, e = new R(t)), e;
  }
  k(t) {
    X(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, i = 0;
    for (const n of t) i === e.length ? e.push(s = new z(this.O(M()), this.O(M()), this, this.options)) : s = e[i], s._$AI(n), i++;
    i < e.length && (this._$AR(s && s._$AB.nextSibling, i), e.length = i);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, e); t !== this._$AB; ) {
      const i = ot(t).nextSibling;
      ot(t).remove(), t = i;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class L {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, i, n) {
    this.type = 1, this._$AH = d, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = n, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = d;
  }
  _$AI(t, e = this, s, i) {
    const n = this.strings;
    let o = !1;
    if (n === void 0) t = C(this, t, e, 0), o = !k(t) || t !== this._$AH && t !== S, o && (this._$AH = t);
    else {
      const l = t;
      let a, c;
      for (t = n[0], a = 0; a < n.length - 1; a++) c = C(this, l[s + a], e, a), c === S && (c = this._$AH[a]), o || (o = !k(c) || c !== this._$AH[a]), c === d ? t = d : t !== d && (t += (c ?? "") + n[a + 1]), this._$AH[a] = c;
    }
    o && !i && this.j(t);
  }
  j(t) {
    t === d ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Nt extends L {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === d ? void 0 : t;
  }
}
class Dt extends L {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== d);
  }
}
class It extends L {
  constructor(t, e, s, i, n) {
    super(t, e, s, i, n), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = C(this, t, e, 0) ?? d) === S) return;
    const s = this._$AH, i = t === d && s !== d || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, n = t !== d && (s === d || i);
    i && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Bt {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    C(this, t);
  }
}
const W = U.litHtmlPolyfillSupport;
W == null || W(R, z), (U.litHtmlVersions ?? (U.litHtmlVersions = [])).push("3.3.2");
const Lt = (r, t, e) => {
  const s = (e == null ? void 0 : e.renderBefore) ?? t;
  let i = s._$litPart$;
  if (i === void 0) {
    const n = (e == null ? void 0 : e.renderBefore) ?? null;
    s._$litPart$ = i = new z(t.insertBefore(M(), n), n, void 0, e ?? {});
  }
  return i._$AI(r), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const y = globalThis;
class E extends x {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var e;
    const t = super.createRenderRoot();
    return (e = this.renderOptions).renderBefore ?? (e.renderBefore = t.firstChild), t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Lt(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) == null || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) == null || t.setConnected(!1);
  }
  render() {
    return S;
  }
}
var bt;
E._$litElement$ = !0, E.finalized = !0, (bt = y.litElementHydrateSupport) == null || bt.call(y, { LitElement: E });
const F = y.litElementPolyfillSupport;
F == null || F({ LitElement: E });
(y.litElementVersions ?? (y.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const jt = { attribute: !0, type: String, converter: D, reflect: !1, hasChanged: Q }, qt = (r = jt, t, e) => {
  const { kind: s, metadata: i } = e;
  let n = globalThis.litPropertyMetadata.get(i);
  if (n === void 0 && globalThis.litPropertyMetadata.set(i, n = /* @__PURE__ */ new Map()), s === "setter" && ((r = Object.create(r)).wrapped = !0), n.set(e.name, r), s === "accessor") {
    const { name: o } = e;
    return { set(l) {
      const a = t.get.call(this);
      t.set.call(this, l), this.requestUpdate(o, a, r, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(o, void 0, r, l), l;
    } };
  }
  if (s === "setter") {
    const { name: o } = e;
    return function(l) {
      const a = this[o];
      t.call(this, l), this.requestUpdate(o, a, r, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function b(r) {
  return (t, e) => typeof e == "object" ? qt(r, t, e) : ((s, i, n) => {
    const o = i.hasOwnProperty(n);
    return i.constructor.createProperty(n, s), o ? Object.getOwnPropertyDescriptor(i, n) : void 0;
  })(r, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Vt(r) {
  return b({ ...r, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Wt = (r, t, e) => (e.configurable = !0, e.enumerable = !0, Reflect.decorate && typeof t != "object" && Object.defineProperty(r, t, e), e);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Ft(r, t) {
  return (e, s, i) => {
    const n = (o) => {
      var l;
      return ((l = o.renderRoot) == null ? void 0 : l.querySelector(r)) ?? null;
    };
    return Wt(e, s, { get() {
      return n(this);
    } });
  };
}
const yt = B`
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
`;
B`
  * {
    box-sizing: border-box;
  }
`;
const Gt = B`
  :host {
    display: block;
  }

  .swim-tab__panel {
    display: block;
  }

  .swim-tab__panel[hidden] {
    display: none;
  }
`;
function K(r) {
  return r != null && `${r}` != "false";
}
const Y = {
  fromAttribute: (r) => r !== null && r !== "false" && r !== "0",
  /**
   * Use empty string when true so the boolean attribute is present; remove when false.
   * Serializing false as `attr="false"` leaves the attribute in the DOM, so selectors like
   * `[disabled]` / `[loading]` (common in resets and lazy-load styles) still match the host.
   */
  toAttribute: (r) => r ? "" : null
};
var Kt = Object.defineProperty, Zt = Object.getOwnPropertyDescriptor, P = (r, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? Zt(t, e) : t, n = r.length - 1, o; n >= 0; n--)
    (o = r[n]) && (i = (s ? o(t, e, i) : o(i)) || i);
  return s && i && Kt(t, e, i), i;
};
let Jt = 0;
const gt = "swim-tab", tt = class tt extends E {
  constructor() {
    super(...arguments), this._instanceId = ++Jt, this._generatedPanelId = `tab-panel-${this._instanceId}`, this._generatedTabId = `tab-${this._instanceId}`, this.tabId = this._generatedTabId, this.label = "", this._active = !1, this._disabled = !1;
  }
  get id() {
    return this._id ?? this._generatedPanelId;
  }
  set id(t) {
    this._id = t || this._generatedPanelId;
  }
  get title() {
    return this.label;
  }
  set title(t) {
    this.label = t;
  }
  get active() {
    return this._active;
  }
  set active(t) {
    const e = K(t);
    if (this._active !== e) {
      const s = this._active;
      this._active = e, this.requestUpdate("active", s), this.dispatchEvent(new CustomEvent("swim-tab-active-change", { bubbles: !1, composed: !1 }));
    }
  }
  get disabled() {
    return this._disabled;
  }
  set disabled(t) {
    this._disabled = K(t);
  }
  connectedCallback() {
    super.connectedCallback(), this.hasAttribute("tab-id") || (this.tabId = this._generatedTabId);
  }
  render() {
    return G`
      <div
        class="swim-tab__panel"
        role="tabpanel"
        id="${this.id}"
        aria-labelledby="${this.tabId}"
        ?hidden="${!this.active}"
      >
        <slot></slot>
      </div>
    `;
  }
};
tt.styles = [yt, Gt];
let g = tt;
P([
  b({ type: String })
], g.prototype, "id", 1);
P([
  b({ type: String, attribute: "tab-id" })
], g.prototype, "tabId", 2);
P([
  b({ type: String })
], g.prototype, "label", 2);
P([
  b({ type: String })
], g.prototype, "title", 1);
P([
  b({ type: Boolean, reflect: !0, converter: Y })
], g.prototype, "active", 1);
P([
  b({ type: Boolean, reflect: !0, converter: Y })
], g.prototype, "disabled", 1);
customElements.get(gt) || customElements.define(gt, g);
const Qt = B`
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
`;
var wt = /* @__PURE__ */ ((r) => (r.Legacy = "legacy", r.Light = "light", r))(wt || {}), Xt = Object.defineProperty, Yt = Object.getOwnPropertyDescriptor, j = (r, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? Yt(t, e) : t, n = r.length - 1, o; n >= 0; n--)
    (o = r[n]) && (i = (s ? o(t, e, i) : o(i)) || i);
  return s && i && Xt(t, e, i), i;
};
const ut = "swim-tabs", et = class et extends E {
  constructor() {
    super(...arguments), this._vertical = !1, this.appearance = wt.Legacy, this._tabs = [], this._slotChangeBound = () => this._syncTabs(), this._tabActiveChangeBound = () => this.requestUpdate();
  }
  get vertical() {
    return this._vertical;
  }
  set vertical(t) {
    this._vertical = K(t);
  }
  connectedCallback() {
    super.connectedCallback();
  }
  firstUpdated() {
    this._syncTabs(), this._listenToTabChanges();
    const t = this.slotEl;
    t && t.addEventListener("slotchange", this._slotChangeBound);
  }
  disconnectedCallback() {
    var e;
    const t = (e = this.shadowRoot) == null ? void 0 : e.querySelector("slot");
    t && t.removeEventListener("slotchange", this._slotChangeBound), this._tabs.forEach((s) => s.removeEventListener("swim-tab-active-change", this._tabActiveChangeBound)), super.disconnectedCallback();
  }
  _listenToTabChanges() {
    this._tabs.forEach((t) => t.addEventListener("swim-tab-active-change", this._tabActiveChangeBound));
  }
  _syncTabs() {
    var n;
    const t = (n = this.shadowRoot) == null ? void 0 : n.querySelector("slot"), s = ((t == null ? void 0 : t.assignedElements({ flatten: !0 })) ?? []).filter((o) => o instanceof g);
    this._tabs.forEach((o) => o.removeEventListener("swim-tab-active-change", this._tabActiveChangeBound)), this._tabs = s, this._listenToTabChanges();
    const i = s.filter((o) => o.active);
    i.length > 1 ? console.error('swim-tabs: Multiple active tabs set "active".') : i.length === 0 && s.length > 0 && (s[0].active = !0);
  }
  _tabClicked(t) {
    t.disabled || (this._tabs.forEach((e) => e.active = e === t), t.active = !0, this.dispatchEvent(
      new CustomEvent("select-tab", {
        detail: { tab: t },
        bubbles: !1,
        composed: !1
      })
    ), this.dispatchEvent(
      new CustomEvent("select", {
        detail: { tab: t },
        bubbles: !1,
        composed: !1
      })
    ));
  }
  _move(t) {
    const e = this._tabs, s = e.findIndex((i) => i.active);
    for (let i = s + t; i >= 0 && i < e.length; i += t) {
      const n = e[i];
      if (n && !n.disabled) {
        this._tabClicked(n);
        return;
      }
    }
  }
  /** Go to the previous tab. */
  prev() {
    this._move(-1);
  }
  /** Go to the next tab. */
  next() {
    this._move(1);
  }
  _handleKeyDown(t) {
    const e = this.vertical, s = t.key;
    e && (s === "ArrowUp" || s === "ArrowDown") ? (t.preventDefault(), this._move(s === "ArrowDown" ? 1 : -1)) : !e && (s === "ArrowLeft" || s === "ArrowRight") && (t.preventDefault(), this._move(s === "ArrowRight" ? 1 : -1));
  }
  render() {
    const t = this._tabs;
    return G`
      <section class="swim-tabs">
        <div class="swim-tabs__list" part="tablist" role="tablist" @keydown="${this._handleKeyDown}">
          ${t.map(
      (e) => G`
              <button
                type="button"
                role="tab"
                id="${e.tabId}"
                aria-controls="${e.id}"
                aria-selected="${e.active}"
                class="swim-tabs__tab ${e.active ? "swim-tabs__tab--active" : ""} ${e.disabled ? "swim-tabs__tab--disabled" : ""}"
                ?disabled="${e.disabled}"
                @click="${() => this._tabClicked(e)}"
              >
                ${e.label}
              </button>
            `
    )}
        </div>
        <div class="swim-tabs__content" part="tab-content">
          <slot></slot>
        </div>
      </section>
    `;
  }
};
et.styles = [yt, Qt];
let A = et;
j([
  Ft("slot")
], A.prototype, "slotEl", 2);
j([
  b({ type: Boolean, reflect: !0, converter: Y })
], A.prototype, "vertical", 1);
j([
  b({ type: String, reflect: !0 })
], A.prototype, "appearance", 2);
j([
  Vt()
], A.prototype, "_tabs", 2);
customElements.get(ut) || customElements.define(ut, A);
export {
  g as SwimTab,
  A as SwimTabs,
  wt as TabsAppearance
};
