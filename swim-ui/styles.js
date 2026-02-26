/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const H = globalThis, j = H.ShadowRoot && (H.ShadyCSS === void 0 || H.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, I = Symbol(), V = /* @__PURE__ */ new WeakMap();
let se = class {
  constructor(e, t, r) {
    if (this._$cssResult$ = !0, r !== I) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (j && e === void 0) {
      const r = t !== void 0 && t.length === 1;
      r && (e = V.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), r && V.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const he = (i) => new se(typeof i == "string" ? i : i + "", void 0, I), W = (i, ...e) => {
  const t = i.length === 1 ? i[0] : e.reduce((r, s, l) => r + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + i[l + 1], i[0]);
  return new se(t, i, I);
}, ce = (i, e) => {
  if (j) i.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const r = document.createElement("style"), s = H.litNonce;
    s !== void 0 && r.setAttribute("nonce", s), r.textContent = t.cssText, i.appendChild(r);
  }
}, q = j ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const r of e.cssRules) t += r.cssText;
  return he(t);
})(i) : i;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: ge, defineProperty: be, getOwnPropertyDescriptor: pe, getOwnPropertyNames: ue, getOwnPropertySymbols: de, getPrototypeOf: me } = Object, m = globalThis, F = m.trustedTypes, $e = F ? F.emptyScript : "", R = m.reactiveElementPolyfillSupport, S = (i, e) => i, D = { toAttribute(i, e) {
  switch (e) {
    case Boolean:
      i = i ? $e : null;
      break;
    case Object:
    case Array:
      i = i == null ? i : JSON.stringify(i);
  }
  return i;
}, fromAttribute(i, e) {
  let t = i;
  switch (e) {
    case Boolean:
      t = i !== null;
      break;
    case Number:
      t = i === null ? null : Number(i);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(i);
      } catch {
        t = null;
      }
  }
  return t;
} }, ie = (i, e) => !ge(i, e), Z = { attribute: !0, type: String, converter: D, reflect: !1, useDefault: !1, hasChanged: ie };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), m.litPropertyMetadata ?? (m.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let _ = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = Z) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const r = Symbol(), s = this.getPropertyDescriptor(e, r, t);
      s !== void 0 && be(this.prototype, e, s);
    }
  }
  static getPropertyDescriptor(e, t, r) {
    const { get: s, set: l } = pe(this.prototype, e) ?? { get() {
      return this[t];
    }, set(o) {
      this[t] = o;
    } };
    return { get: s, set(o) {
      const a = s == null ? void 0 : s.call(this);
      l == null || l.call(this, o), this.requestUpdate(e, a, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Z;
  }
  static _$Ei() {
    if (this.hasOwnProperty(S("elementProperties"))) return;
    const e = me(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(S("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(S("properties"))) {
      const t = this.properties, r = [...ue(t), ...de(t)];
      for (const s of r) this.createProperty(s, t[s]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [r, s] of t) this.elementProperties.set(r, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, r] of this.elementProperties) {
      const s = this._$Eu(t, r);
      s !== void 0 && this._$Eh.set(s, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const r = new Set(e.flat(1 / 0).reverse());
      for (const s of r) t.unshift(q(s));
    } else e !== void 0 && t.push(q(e));
    return t;
  }
  static _$Eu(e, t) {
    const r = t.attribute;
    return r === !1 ? void 0 : typeof r == "string" ? r : typeof e == "string" ? e.toLowerCase() : void 0;
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
    for (const r of t.keys()) this.hasOwnProperty(r) && (e.set(r, this[r]), delete this[r]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return ce(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$EO) == null || e.forEach((t) => {
      var r;
      return (r = t.hostConnected) == null ? void 0 : r.call(t);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$EO) == null || e.forEach((t) => {
      var r;
      return (r = t.hostDisconnected) == null ? void 0 : r.call(t);
    });
  }
  attributeChangedCallback(e, t, r) {
    this._$AK(e, r);
  }
  _$ET(e, t) {
    var l;
    const r = this.constructor.elementProperties.get(e), s = this.constructor._$Eu(e, r);
    if (s !== void 0 && r.reflect === !0) {
      const o = (((l = r.converter) == null ? void 0 : l.toAttribute) !== void 0 ? r.converter : D).toAttribute(t, r.type);
      this._$Em = e, o == null ? this.removeAttribute(s) : this.setAttribute(s, o), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var l, o;
    const r = this.constructor, s = r._$Eh.get(e);
    if (s !== void 0 && this._$Em !== s) {
      const a = r.getPropertyOptions(s), n = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((l = a.converter) == null ? void 0 : l.fromAttribute) !== void 0 ? a.converter : D;
      this._$Em = s;
      const c = n.fromAttribute(t, a.type);
      this[s] = c ?? ((o = this._$Ej) == null ? void 0 : o.get(s)) ?? c, this._$Em = null;
    }
  }
  requestUpdate(e, t, r, s = !1, l) {
    var o;
    if (e !== void 0) {
      const a = this.constructor;
      if (s === !1 && (l = this[e]), r ?? (r = a.getPropertyOptions(e)), !((r.hasChanged ?? ie)(l, t) || r.useDefault && r.reflect && l === ((o = this._$Ej) == null ? void 0 : o.get(e)) && !this.hasAttribute(a._$Eu(e, r)))) return;
      this.C(e, t, r);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: r, reflect: s, wrapped: l }, o) {
    r && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, o ?? t ?? this[e]), l !== !0 || o !== void 0) || (this._$AL.has(e) || (this.hasUpdated || r || (t = void 0), this._$AL.set(e, t)), s === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
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
    var r;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [l, o] of this._$Ep) this[l] = o;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [l, o] of s) {
        const { wrapped: a } = o, n = this[l];
        a !== !0 || this._$AL.has(l) || n === void 0 || this.C(l, void 0, o, n);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), (r = this._$EO) == null || r.forEach((s) => {
        var l;
        return (l = s.hostUpdate) == null ? void 0 : l.call(s);
      }), this.update(t)) : this._$EM();
    } catch (s) {
      throw e = !1, this._$EM(), s;
    }
    e && this._$AE(t);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var t;
    (t = this._$EO) == null || t.forEach((r) => {
      var s;
      return (s = r.hostUpdated) == null ? void 0 : s.call(r);
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
_.elementStyles = [], _.shadowRootOptions = { mode: "open" }, _[S("elementProperties")] = /* @__PURE__ */ new Map(), _[S("finalized")] = /* @__PURE__ */ new Map(), R == null || R({ ReactiveElement: _ }), (m.reactiveElementVersions ?? (m.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const E = globalThis, G = (i) => i, M = E.trustedTypes, J = M ? M.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, oe = "$lit$", d = `lit$${Math.random().toFixed(9).slice(2)}$`, le = "?" + d, fe = `<${le}>`, w = document, k = () => w.createComment(""), C = (i) => i === null || typeof i != "object" && typeof i != "function", X = Array.isArray, ye = (i) => X(i) || typeof (i == null ? void 0 : i[Symbol.iterator]) == "function", N = `[ 	
\f\r]`, x = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, K = /-->/g, Q = />/g, $ = RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Y = /'/g, ee = /"/g, ne = /^(?:script|style|textarea|title)$/i, v = Symbol.for("lit-noChange"), g = Symbol.for("lit-nothing"), te = /* @__PURE__ */ new WeakMap(), f = w.createTreeWalker(w, 129);
function ae(i, e) {
  if (!X(i) || !i.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return J !== void 0 ? J.createHTML(e) : e;
}
const we = (i, e) => {
  const t = i.length - 1, r = [];
  let s, l = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", o = x;
  for (let a = 0; a < t; a++) {
    const n = i[a];
    let c, b, h = -1, p = 0;
    for (; p < n.length && (o.lastIndex = p, b = o.exec(n), b !== null); ) p = o.lastIndex, o === x ? b[1] === "!--" ? o = K : b[1] !== void 0 ? o = Q : b[2] !== void 0 ? (ne.test(b[2]) && (s = RegExp("</" + b[2], "g")), o = $) : b[3] !== void 0 && (o = $) : o === $ ? b[0] === ">" ? (o = s ?? x, h = -1) : b[1] === void 0 ? h = -2 : (h = o.lastIndex - b[2].length, c = b[1], o = b[3] === void 0 ? $ : b[3] === '"' ? ee : Y) : o === ee || o === Y ? o = $ : o === K || o === Q ? o = x : (o = $, s = void 0);
    const u = o === $ && i[a + 1].startsWith("/>") ? " " : "";
    l += o === x ? n + fe : h >= 0 ? (r.push(c), n.slice(0, h) + oe + n.slice(h) + d + u) : n + d + (h === -2 ? a : u);
  }
  return [ae(i, l + (i[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), r];
};
class P {
  constructor({ strings: e, _$litType$: t }, r) {
    let s;
    this.parts = [];
    let l = 0, o = 0;
    const a = e.length - 1, n = this.parts, [c, b] = we(e, t);
    if (this.el = P.createElement(c, r), f.currentNode = this.el.content, t === 2 || t === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (s = f.nextNode()) !== null && n.length < a; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const h of s.getAttributeNames()) if (h.endsWith(oe)) {
          const p = b[o++], u = s.getAttribute(h).split(d), U = /([.?@])?(.*)/.exec(p);
          n.push({ type: 1, index: l, name: U[2], strings: u, ctor: U[1] === "." ? ve : U[1] === "?" ? Ae : U[1] === "@" ? xe : T }), s.removeAttribute(h);
        } else h.startsWith(d) && (n.push({ type: 6, index: l }), s.removeAttribute(h));
        if (ne.test(s.tagName)) {
          const h = s.textContent.split(d), p = h.length - 1;
          if (p > 0) {
            s.textContent = M ? M.emptyScript : "";
            for (let u = 0; u < p; u++) s.append(h[u], k()), f.nextNode(), n.push({ type: 2, index: ++l });
            s.append(h[p], k());
          }
        }
      } else if (s.nodeType === 8) if (s.data === le) n.push({ type: 2, index: l });
      else {
        let h = -1;
        for (; (h = s.data.indexOf(d, h + 1)) !== -1; ) n.push({ type: 7, index: l }), h += d.length - 1;
      }
      l++;
    }
  }
  static createElement(e, t) {
    const r = w.createElement("template");
    return r.innerHTML = e, r;
  }
}
function A(i, e, t = i, r) {
  var o, a;
  if (e === v) return e;
  let s = r !== void 0 ? (o = t._$Co) == null ? void 0 : o[r] : t._$Cl;
  const l = C(e) ? void 0 : e._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== l && ((a = s == null ? void 0 : s._$AO) == null || a.call(s, !1), l === void 0 ? s = void 0 : (s = new l(i), s._$AT(i, t, r)), r !== void 0 ? (t._$Co ?? (t._$Co = []))[r] = s : t._$Cl = s), s !== void 0 && (e = A(i, s._$AS(i, e.values), s, r)), e;
}
class _e {
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
    const { el: { content: t }, parts: r } = this._$AD, s = ((e == null ? void 0 : e.creationScope) ?? w).importNode(t, !0);
    f.currentNode = s;
    let l = f.nextNode(), o = 0, a = 0, n = r[0];
    for (; n !== void 0; ) {
      if (o === n.index) {
        let c;
        n.type === 2 ? c = new z(l, l.nextSibling, this, e) : n.type === 1 ? c = new n.ctor(l, n.name, n.strings, this, e) : n.type === 6 && (c = new Se(l, this, e)), this._$AV.push(c), n = r[++a];
      }
      o !== (n == null ? void 0 : n.index) && (l = f.nextNode(), o++);
    }
    return f.currentNode = w, s;
  }
  p(e) {
    let t = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(e, r, t), t += r.strings.length - 2) : r._$AI(e[t])), t++;
  }
}
class z {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, t, r, s) {
    this.type = 2, this._$AH = g, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = r, this.options = s, this._$Cv = (s == null ? void 0 : s.isConnected) ?? !0;
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
    e = A(this, e, t), C(e) ? e === g || e == null || e === "" ? (this._$AH !== g && this._$AR(), this._$AH = g) : e !== this._$AH && e !== v && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : ye(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== g && C(this._$AH) ? this._$AA.nextSibling.data = e : this.T(w.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var l;
    const { values: t, _$litType$: r } = e, s = typeof r == "number" ? this._$AC(e) : (r.el === void 0 && (r.el = P.createElement(ae(r.h, r.h[0]), this.options)), r);
    if (((l = this._$AH) == null ? void 0 : l._$AD) === s) this._$AH.p(t);
    else {
      const o = new _e(s, this), a = o.u(this.options);
      o.p(t), this.T(a), this._$AH = o;
    }
  }
  _$AC(e) {
    let t = te.get(e.strings);
    return t === void 0 && te.set(e.strings, t = new P(e)), t;
  }
  k(e) {
    X(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let r, s = 0;
    for (const l of e) s === t.length ? t.push(r = new z(this.O(k()), this.O(k()), this, this.options)) : r = t[s], r._$AI(l), s++;
    s < t.length && (this._$AR(r && r._$AB.nextSibling, s), t.length = s);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var r;
    for ((r = this._$AP) == null ? void 0 : r.call(this, !1, !0, t); e !== this._$AB; ) {
      const s = G(e).nextSibling;
      G(e).remove(), e = s;
    }
  }
  setConnected(e) {
    var t;
    this._$AM === void 0 && (this._$Cv = e, (t = this._$AP) == null || t.call(this, e));
  }
}
class T {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, r, s, l) {
    this.type = 1, this._$AH = g, this._$AN = void 0, this.element = e, this.name = t, this._$AM = s, this.options = l, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = g;
  }
  _$AI(e, t = this, r, s) {
    const l = this.strings;
    let o = !1;
    if (l === void 0) e = A(this, e, t, 0), o = !C(e) || e !== this._$AH && e !== v, o && (this._$AH = e);
    else {
      const a = e;
      let n, c;
      for (e = l[0], n = 0; n < l.length - 1; n++) c = A(this, a[r + n], t, n), c === v && (c = this._$AH[n]), o || (o = !C(c) || c !== this._$AH[n]), c === g ? e = g : e !== g && (e += (c ?? "") + l[n + 1]), this._$AH[n] = c;
    }
    o && !s && this.j(e);
  }
  j(e) {
    e === g ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class ve extends T {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === g ? void 0 : e;
  }
}
class Ae extends T {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== g);
  }
}
class xe extends T {
  constructor(e, t, r, s, l) {
    super(e, t, r, s, l), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = A(this, e, t, 0) ?? g) === v) return;
    const r = this._$AH, s = e === g && r !== g || e.capture !== r.capture || e.once !== r.once || e.passive !== r.passive, l = e !== g && (r === g || s);
    s && this.element.removeEventListener(this.name, this, r), l && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t;
    typeof this._$AH == "function" ? this._$AH.call(((t = this.options) == null ? void 0 : t.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Se {
  constructor(e, t, r) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    A(this, e);
  }
}
const L = E.litHtmlPolyfillSupport;
L == null || L(P, z), (E.litHtmlVersions ?? (E.litHtmlVersions = [])).push("3.3.2");
const Ee = (i, e, t) => {
  const r = (t == null ? void 0 : t.renderBefore) ?? e;
  let s = r._$litPart$;
  if (s === void 0) {
    const l = (t == null ? void 0 : t.renderBefore) ?? null;
    r._$litPart$ = s = new z(e.insertBefore(k(), l), l, void 0, t ?? {});
  }
  return s._$AI(i), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const y = globalThis;
class O extends _ {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Ee(t, this.renderRoot, this.renderOptions);
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
    return v;
  }
}
var re;
O._$litElement$ = !0, O.finalized = !0, (re = y.litElementHydrateSupport) == null || re.call(y, { LitElement: O });
const B = y.litElementPolyfillSupport;
B == null || B({ LitElement: O });
(y.litElementVersions ?? (y.litElementVersions = [])).push("4.2.2");
const Pe = W`
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
`, ze = W`
  * {
    box-sizing: border-box;
  }
`, Ue = W`
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
`, He = {
  // Blue
  blue100: "rgb(224, 239, 255)",
  blue200: "rgb(173, 212, 255)",
  blue300: "rgb(122, 185, 255)",
  blue400: "rgb(71, 158, 255)",
  blue500: "rgb(20, 131, 255)",
  blue600: "rgb(0, 106, 224)",
  blue700: "rgb(0, 82, 173)",
  blue800: "rgb(0, 58, 122)",
  blue900: "rgb(0, 34, 71)",
  // Light Blue
  lightblue100: "rgb(234, 249, 255)",
  lightblue200: "rgb(184, 234, 254)",
  lightblue300: "rgb(134, 219, 253)",
  lightblue400: "rgb(84, 205, 252)",
  lightblue500: "rgb(34, 190, 251)",
  lightblue600: "rgb(4, 166, 230)",
  lightblue700: "rgb(3, 130, 180)",
  lightblue800: "rgb(2, 94, 130)",
  lightblue900: "rgb(1, 58, 80)",
  // Green
  green100: "rgb(206, 249, 240)",
  green200: "rgb(161, 243, 226)",
  green300: "rgb(116, 237, 212)",
  green400: "rgb(71, 231, 198)",
  green500: "rgb(29, 222, 182)",
  green600: "rgb(23, 177, 145)",
  green700: "rgb(17, 132, 108)",
  green800: "rgb(11, 87, 71)",
  green900: "rgb(5, 42, 34)",
  // Orange
  orange100: "rgb(255, 244, 224)",
  orange200: "rgb(255, 225, 173)",
  orange300: "rgb(255, 206, 122)",
  orange400: "rgb(255, 187, 71)",
  orange500: "rgb(255, 168, 20)",
  orange600: "rgb(224, 141, 0)",
  orange700: "rgb(173, 109, 0)",
  orange800: "rgb(122, 77, 0)",
  orange900: "rgb(71, 45, 0)",
  // Red
  red100: "rgb(255, 230, 224)",
  red200: "rgb(255, 190, 173)",
  red300: "rgb(255, 150, 122)",
  red400: "rgb(255, 109, 71)",
  red500: "rgb(255, 69, 20)",
  red600: "rgb(224, 47, 0)",
  red700: "rgb(173, 36, 0)",
  red800: "rgb(122, 25, 0)",
  red900: "rgb(71, 15, 0)",
  // Purple
  purple100: "rgb(255, 255, 255)",
  purple200: "rgb(239, 234, 252)",
  purple300: "rgb(205, 190, 245)",
  purple400: "rgb(172, 145, 239)",
  purple500: "rgb(138, 101, 232)",
  purple600: "rgb(104, 57, 225)",
  purple700: "rgb(78, 30, 201)",
  purple800: "rgb(61, 23, 157)",
  purple900: "rgb(44, 17, 112)",
  // Grey
  grey050: "rgb(235, 237, 242)",
  grey100: "rgb(205, 210, 221)",
  grey150: "rgb(190, 197, 211)",
  grey200: "rgb(175, 183, 200)",
  grey250: "rgb(160, 170, 190)",
  grey300: "rgb(144, 156, 180)",
  grey350: "rgb(129, 143, 169)",
  grey400: "rgb(114, 129, 159)",
  grey450: "rgb(100, 116, 147)",
  grey500: "rgb(90, 104, 132)",
  grey550: "rgb(80, 92, 117)",
  grey600: "rgb(69, 80, 102)",
  grey650: "rgb(59, 68, 87)",
  grey700: "rgb(49, 56, 71)",
  grey725: "rgb(43, 50, 64)",
  grey750: "rgb(38, 44, 56)",
  grey775: "rgb(33, 38, 49)",
  grey800: "rgb(28, 32, 41)",
  grey825: "rgb(23, 26, 33)",
  grey850: "rgb(18, 20, 26)",
  grey875: "rgb(12, 14, 18)",
  grey900: "rgb(7, 8, 11)",
  // Base
  white: "rgb(255, 255, 255)",
  black: "rgb(0, 0, 0)"
}, Oe = {
  // Font sizes
  fontSizeBase: "16px",
  fontSizeXXS: "0.625rem",
  // 10px
  fontSizeXS: "0.75rem",
  // 12px
  fontSizeS: "0.875rem",
  // 14px
  fontSizeM: "1rem",
  // 16px
  fontSizeL: "1.125rem",
  // 18px
  fontSizeXL: "1.25rem",
  // 20px
  fontSize2XL: "1.5rem",
  // 24px
  fontSize3XL: "1.75rem",
  // 28px
  fontSize4XL: "2rem",
  // 32px
  fontSize5XL: "2.25rem",
  // 36px
  fontSize6XL: "3rem",
  // 48px
  // Line heights
  fontLineHeight100: "1.1",
  fontLineHeight200: "1.42",
  fontLineHeight300: "20px",
  fontLineHeight400: "40px",
  // Font weights
  fontWeightLight: "300",
  fontWeightRegular: "400",
  fontWeightSemibold: "600",
  fontWeightBold: "700"
}, Me = {
  spacing0: "0",
  spacing2: "2px",
  spacing4: "4px",
  spacing8: "8px",
  spacing10: "10px",
  spacing16: "16px",
  spacing24: "24px",
  spacing32: "32px"
}, Te = {
  radius2: "2px",
  radius4: "4px",
  radius8: "8px"
};
export {
  Pe as baseStyles,
  He as colors,
  ze as globalStyles,
  Te as radius,
  Ue as scrollbarStyles,
  Me as spacing,
  Oe as typography
};
