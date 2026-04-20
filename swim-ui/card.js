/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const W = globalThis, ne = W.ShadowRoot && (W.ShadyCSS === void 0 || W.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ae = Symbol(), me = /* @__PURE__ */ new WeakMap();
let Be = class {
  constructor(e, t, s) {
    if (this._$cssResult$ = !0, s !== ae) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (ne && e === void 0) {
      const s = t !== void 0 && t.length === 1;
      s && (e = me.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), s && me.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Ke = (i) => new Be(typeof i == "string" ? i : i + "", void 0, ae), f = (i, ...e) => {
  const t = i.length === 1 ? i[0] : e.reduce((s, r, o) => s + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + i[o + 1], i[0]);
  return new Be(t, i, ae);
}, Ye = (i, e) => {
  if (ne) i.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const s = document.createElement("style"), r = W.litNonce;
    r !== void 0 && s.setAttribute("nonce", r), s.textContent = t.cssText, i.appendChild(s);
  }
}, fe = ne ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const s of e.cssRules) t += s.cssText;
  return Ke(t);
})(i) : i;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Ze, defineProperty: Je, getOwnPropertyDescriptor: Xe, getOwnPropertyNames: Qe, getOwnPropertySymbols: et, getPrototypeOf: tt } = Object, k = globalThis, ve = k.trustedTypes, rt = ve ? ve.emptyScript : "", ee = k.reactiveElementPolyfillSupport, D = (i, e) => i, q = { toAttribute(i, e) {
  switch (e) {
    case Boolean:
      i = i ? rt : null;
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
} }, le = (i, e) => !Ze(i, e), xe = { attribute: !0, type: String, converter: q, reflect: !1, useDefault: !1, hasChanged: le };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), k.litPropertyMetadata ?? (k.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let T = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = xe) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const s = Symbol(), r = this.getPropertyDescriptor(e, s, t);
      r !== void 0 && Je(this.prototype, e, r);
    }
  }
  static getPropertyDescriptor(e, t, s) {
    const { get: r, set: o } = Xe(this.prototype, e) ?? { get() {
      return this[t];
    }, set(n) {
      this[t] = n;
    } };
    return { get: r, set(n) {
      const l = r == null ? void 0 : r.call(this);
      o == null || o.call(this, n), this.requestUpdate(e, l, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? xe;
  }
  static _$Ei() {
    if (this.hasOwnProperty(D("elementProperties"))) return;
    const e = tt(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(D("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(D("properties"))) {
      const t = this.properties, s = [...Qe(t), ...et(t)];
      for (const r of s) this.createProperty(r, t[r]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [s, r] of t) this.elementProperties.set(s, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, s] of this.elementProperties) {
      const r = this._$Eu(t, s);
      r !== void 0 && this._$Eh.set(r, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const s = new Set(e.flat(1 / 0).reverse());
      for (const r of s) t.unshift(fe(r));
    } else e !== void 0 && t.push(fe(e));
    return t;
  }
  static _$Eu(e, t) {
    const s = t.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof e == "string" ? e.toLowerCase() : void 0;
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
    for (const s of t.keys()) this.hasOwnProperty(s) && (e.set(s, this[s]), delete this[s]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Ye(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$EO) == null || e.forEach((t) => {
      var s;
      return (s = t.hostConnected) == null ? void 0 : s.call(t);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$EO) == null || e.forEach((t) => {
      var s;
      return (s = t.hostDisconnected) == null ? void 0 : s.call(t);
    });
  }
  attributeChangedCallback(e, t, s) {
    this._$AK(e, s);
  }
  _$ET(e, t) {
    var o;
    const s = this.constructor.elementProperties.get(e), r = this.constructor._$Eu(e, s);
    if (r !== void 0 && s.reflect === !0) {
      const n = (((o = s.converter) == null ? void 0 : o.toAttribute) !== void 0 ? s.converter : q).toAttribute(t, s.type);
      this._$Em = e, n == null ? this.removeAttribute(r) : this.setAttribute(r, n), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var o, n;
    const s = this.constructor, r = s._$Eh.get(e);
    if (r !== void 0 && this._$Em !== r) {
      const l = s.getPropertyOptions(r), a = typeof l.converter == "function" ? { fromAttribute: l.converter } : ((o = l.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? l.converter : q;
      this._$Em = r;
      const p = a.fromAttribute(t, l.type);
      this[r] = p ?? ((n = this._$Ej) == null ? void 0 : n.get(r)) ?? p, this._$Em = null;
    }
  }
  requestUpdate(e, t, s, r = !1, o) {
    var n;
    if (e !== void 0) {
      const l = this.constructor;
      if (r === !1 && (o = this[e]), s ?? (s = l.getPropertyOptions(e)), !((s.hasChanged ?? le)(o, t) || s.useDefault && s.reflect && o === ((n = this._$Ej) == null ? void 0 : n.get(e)) && !this.hasAttribute(l._$Eu(e, s)))) return;
      this.C(e, t, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: s, reflect: r, wrapped: o }, n) {
    s && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, n ?? t ?? this[e]), o !== !0 || n !== void 0) || (this._$AL.has(e) || (this.hasUpdated || s || (t = void 0), this._$AL.set(e, t)), r === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
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
    var s;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [o, n] of this._$Ep) this[o] = n;
        this._$Ep = void 0;
      }
      const r = this.constructor.elementProperties;
      if (r.size > 0) for (const [o, n] of r) {
        const { wrapped: l } = n, a = this[o];
        l !== !0 || this._$AL.has(o) || a === void 0 || this.C(o, void 0, n, a);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), (s = this._$EO) == null || s.forEach((r) => {
        var o;
        return (o = r.hostUpdate) == null ? void 0 : o.call(r);
      }), this.update(t)) : this._$EM();
    } catch (r) {
      throw e = !1, this._$EM(), r;
    }
    e && this._$AE(t);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var t;
    (t = this._$EO) == null || t.forEach((s) => {
      var r;
      return (r = s.hostUpdated) == null ? void 0 : r.call(s);
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
T.elementStyles = [], T.shadowRootOptions = { mode: "open" }, T[D("elementProperties")] = /* @__PURE__ */ new Map(), T[D("finalized")] = /* @__PURE__ */ new Map(), ee == null || ee({ ReactiveElement: T }), (k.reactiveElementVersions ?? (k.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const B = globalThis, ye = (i) => i, K = B.trustedTypes, $e = K ? K.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, je = "$lit$", E = `lit$${Math.random().toFixed(9).slice(2)}$`, Ie = "?" + E, st = `<${Ie}>`, z = document, j = () => z.createComment(""), I = (i) => i === null || typeof i != "object" && typeof i != "function", ce = Array.isArray, it = (i) => ce(i) || typeof (i == null ? void 0 : i[Symbol.iterator]) == "function", te = `[ 	
\f\r]`, M = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, we = /-->/g, Ae = />/g, S = RegExp(`>|${te}(?:([^\\s"'>=/]+)(${te}*=${te}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ee = /'/g, ke = /"/g, Le = /^(?:script|style|textarea|title)$/i, ot = (i) => (e, ...t) => ({ _$litType$: i, strings: e, values: t }), u = ot(1), U = Symbol.for("lit-noChange"), c = Symbol.for("lit-nothing"), Se = /* @__PURE__ */ new WeakMap(), C = z.createTreeWalker(z, 129);
function Ve(i, e) {
  if (!ce(i) || !i.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return $e !== void 0 ? $e.createHTML(e) : e;
}
const nt = (i, e) => {
  const t = i.length - 1, s = [];
  let r, o = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", n = M;
  for (let l = 0; l < t; l++) {
    const a = i[l];
    let p, g, h = -1, y = 0;
    for (; y < a.length && (n.lastIndex = y, g = n.exec(a), g !== null); ) y = n.lastIndex, n === M ? g[1] === "!--" ? n = we : g[1] !== void 0 ? n = Ae : g[2] !== void 0 ? (Le.test(g[2]) && (r = RegExp("</" + g[2], "g")), n = S) : g[3] !== void 0 && (n = S) : n === S ? g[0] === ">" ? (n = r ?? M, h = -1) : g[1] === void 0 ? h = -2 : (h = n.lastIndex - g[2].length, p = g[1], n = g[3] === void 0 ? S : g[3] === '"' ? ke : Ee) : n === ke || n === Ee ? n = S : n === we || n === Ae ? n = M : (n = S, r = void 0);
    const A = n === S && i[l + 1].startsWith("/>") ? " " : "";
    o += n === M ? a + st : h >= 0 ? (s.push(p), a.slice(0, h) + je + a.slice(h) + E + A) : a + E + (h === -2 ? l : A);
  }
  return [Ve(i, o + (i[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), s];
};
class L {
  constructor({ strings: e, _$litType$: t }, s) {
    let r;
    this.parts = [];
    let o = 0, n = 0;
    const l = e.length - 1, a = this.parts, [p, g] = nt(e, t);
    if (this.el = L.createElement(p, s), C.currentNode = this.el.content, t === 2 || t === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (r = C.nextNode()) !== null && a.length < l; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const h of r.getAttributeNames()) if (h.endsWith(je)) {
          const y = g[n++], A = r.getAttribute(h).split(E), G = /([.?@])?(.*)/.exec(y);
          a.push({ type: 1, index: o, name: G[2], strings: A, ctor: G[1] === "." ? lt : G[1] === "?" ? ct : G[1] === "@" ? dt : Q }), r.removeAttribute(h);
        } else h.startsWith(E) && (a.push({ type: 6, index: o }), r.removeAttribute(h));
        if (Le.test(r.tagName)) {
          const h = r.textContent.split(E), y = h.length - 1;
          if (y > 0) {
            r.textContent = K ? K.emptyScript : "";
            for (let A = 0; A < y; A++) r.append(h[A], j()), C.nextNode(), a.push({ type: 2, index: ++o });
            r.append(h[y], j());
          }
        }
      } else if (r.nodeType === 8) if (r.data === Ie) a.push({ type: 2, index: o });
      else {
        let h = -1;
        for (; (h = r.data.indexOf(E, h + 1)) !== -1; ) a.push({ type: 7, index: o }), h += E.length - 1;
      }
      o++;
    }
  }
  static createElement(e, t) {
    const s = z.createElement("template");
    return s.innerHTML = e, s;
  }
}
function R(i, e, t = i, s) {
  var n, l;
  if (e === U) return e;
  let r = s !== void 0 ? (n = t._$Co) == null ? void 0 : n[s] : t._$Cl;
  const o = I(e) ? void 0 : e._$litDirective$;
  return (r == null ? void 0 : r.constructor) !== o && ((l = r == null ? void 0 : r._$AO) == null || l.call(r, !1), o === void 0 ? r = void 0 : (r = new o(i), r._$AT(i, t, s)), s !== void 0 ? (t._$Co ?? (t._$Co = []))[s] = r : t._$Cl = r), r !== void 0 && (e = R(i, r._$AS(i, e.values), r, s)), e;
}
class at {
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
    const { el: { content: t }, parts: s } = this._$AD, r = ((e == null ? void 0 : e.creationScope) ?? z).importNode(t, !0);
    C.currentNode = r;
    let o = C.nextNode(), n = 0, l = 0, a = s[0];
    for (; a !== void 0; ) {
      if (n === a.index) {
        let p;
        a.type === 2 ? p = new F(o, o.nextSibling, this, e) : a.type === 1 ? p = new a.ctor(o, a.name, a.strings, this, e) : a.type === 6 && (p = new ht(o, this, e)), this._$AV.push(p), a = s[++l];
      }
      n !== (a == null ? void 0 : a.index) && (o = C.nextNode(), n++);
    }
    return C.currentNode = z, r;
  }
  p(e) {
    let t = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(e, s, t), t += s.strings.length - 2) : s._$AI(e[t])), t++;
  }
}
class F {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, t, s, r) {
    this.type = 2, this._$AH = c, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = s, this.options = r, this._$Cv = (r == null ? void 0 : r.isConnected) ?? !0;
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
    e = R(this, e, t), I(e) ? e === c || e == null || e === "" ? (this._$AH !== c && this._$AR(), this._$AH = c) : e !== this._$AH && e !== U && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : it(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== c && I(this._$AH) ? this._$AA.nextSibling.data = e : this.T(z.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var o;
    const { values: t, _$litType$: s } = e, r = typeof s == "number" ? this._$AC(e) : (s.el === void 0 && (s.el = L.createElement(Ve(s.h, s.h[0]), this.options)), s);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === r) this._$AH.p(t);
    else {
      const n = new at(r, this), l = n.u(this.options);
      n.p(t), this.T(l), this._$AH = n;
    }
  }
  _$AC(e) {
    let t = Se.get(e.strings);
    return t === void 0 && Se.set(e.strings, t = new L(e)), t;
  }
  k(e) {
    ce(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let s, r = 0;
    for (const o of e) r === t.length ? t.push(s = new F(this.O(j()), this.O(j()), this, this.options)) : s = t[r], s._$AI(o), r++;
    r < t.length && (this._$AR(s && s._$AB.nextSibling, r), t.length = r);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, t); e !== this._$AB; ) {
      const r = ye(e).nextSibling;
      ye(e).remove(), e = r;
    }
  }
  setConnected(e) {
    var t;
    this._$AM === void 0 && (this._$Cv = e, (t = this._$AP) == null || t.call(this, e));
  }
}
class Q {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, s, r, o) {
    this.type = 1, this._$AH = c, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = o, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = c;
  }
  _$AI(e, t = this, s, r) {
    const o = this.strings;
    let n = !1;
    if (o === void 0) e = R(this, e, t, 0), n = !I(e) || e !== this._$AH && e !== U, n && (this._$AH = e);
    else {
      const l = e;
      let a, p;
      for (e = o[0], a = 0; a < o.length - 1; a++) p = R(this, l[s + a], t, a), p === U && (p = this._$AH[a]), n || (n = !I(p) || p !== this._$AH[a]), p === c ? e = c : e !== c && (e += (p ?? "") + o[a + 1]), this._$AH[a] = p;
    }
    n && !r && this.j(e);
  }
  j(e) {
    e === c ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class lt extends Q {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === c ? void 0 : e;
  }
}
class ct extends Q {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== c);
  }
}
class dt extends Q {
  constructor(e, t, s, r, o) {
    super(e, t, s, r, o), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = R(this, e, t, 0) ?? c) === U) return;
    const s = this._$AH, r = e === c && s !== c || e.capture !== s.capture || e.once !== s.once || e.passive !== s.passive, o = e !== c && (s === c || r);
    r && this.element.removeEventListener(this.name, this, s), o && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t;
    typeof this._$AH == "function" ? this._$AH.call(((t = this.options) == null ? void 0 : t.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class ht {
  constructor(e, t, s) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    R(this, e);
  }
}
const re = B.litHtmlPolyfillSupport;
re == null || re(L, F), (B.litHtmlVersions ?? (B.litHtmlVersions = [])).push("3.3.2");
const pt = (i, e, t) => {
  const s = (t == null ? void 0 : t.renderBefore) ?? e;
  let r = s._$litPart$;
  if (r === void 0) {
    const o = (t == null ? void 0 : t.renderBefore) ?? null;
    s._$litPart$ = r = new F(e.insertBefore(j(), o), o, void 0, t ?? {});
  }
  return r._$AI(i), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const P = globalThis;
class m extends T {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = pt(t, this.renderRoot, this.renderOptions);
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
    return U;
  }
}
var De;
m._$litElement$ = !0, m.finalized = !0, (De = P.litElementHydrateSupport) == null || De.call(P, { LitElement: m });
const se = P.litElementPolyfillSupport;
se == null || se({ LitElement: m });
(P.litElementVersions ?? (P.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ut = { attribute: !0, type: String, converter: q, reflect: !1, hasChanged: le }, gt = (i = ut, e, t) => {
  const { kind: s, metadata: r } = t;
  let o = globalThis.litPropertyMetadata.get(r);
  if (o === void 0 && globalThis.litPropertyMetadata.set(r, o = /* @__PURE__ */ new Map()), s === "setter" && ((i = Object.create(i)).wrapped = !0), o.set(t.name, i), s === "accessor") {
    const { name: n } = t;
    return { set(l) {
      const a = e.get.call(this);
      e.set.call(this, l), this.requestUpdate(n, a, i, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(n, void 0, i, l), l;
    } };
  }
  if (s === "setter") {
    const { name: n } = t;
    return function(l) {
      const a = this[n];
      e.call(this, l), this.requestUpdate(n, a, i, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function d(i) {
  return (e, t) => typeof t == "object" ? gt(i, e, t) : ((s, r, o) => {
    const n = r.hasOwnProperty(o);
    return r.constructor.createProperty(o, s), n ? Object.getOwnPropertyDescriptor(r, o) : void 0;
  })(i, e, t);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const bt = (i, e, t) => (t.configurable = !0, t.enumerable = !0, Reflect.decorate && typeof e != "object" && Object.defineProperty(i, e, t), t);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function _t(i, e) {
  return (t, s, r) => {
    const o = (n) => {
      var l;
      return ((l = n.renderRoot) == null ? void 0 : l.querySelector(i)) ?? null;
    };
    return bt(t, s, { get() {
      return o(this);
    } });
  };
}
const O = f`
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
f`
  * {
    box-sizing: border-box;
  }
`;
const Y = 4, ie = 3, Ce = 25, mt = 30, ft = 15, Pe = 27, vt = f`
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
    border: ${ie}px solid var(--blue-400);
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
    border: ${ie}px solid var(--blue-400);
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
    height: ${ie}px;
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
`, xt = f`
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
    margin-left: ${Ce}px;
  }

  :host([orientation='horizontal']) .swim-card__accent {
    position: absolute;
    width: ${Y}px;
    min-width: ${Y}px;
    right: 0;
    height: 100%;
    border-radius: var(--radius-0) var(--radius-2) var(--radius-2) var(--radius-0);
  }

  :host([orientation='horizontal']) ::slotted(swim-card-header) {
    display: flex;
    align-items: center;
    padding: var(--spacing-0) ${Ce}px;
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
    padding: var(--spacing-0) ${mt}px;
  }

  :host([orientation='horizontal']) .swim-card__outline,
  :host([orientation='horizontal']) .swim-card__outline-text {
    top: -5px;
    right: -5px;
    left: -5px;
    bottom: -5px;
  }
`, yt = f`
  :host([orientation='vertical']) {
    position: relative;
    flex-direction: column;
    min-width: 347px;
    max-width: 850px;
    height: 418px;
    color: var(--grey-350);
  }

  :host([orientation='vertical']) .swim-card__status {
    margin: ${ft}px auto var(--spacing-0) auto;
  }

  :host([orientation='vertical']) .swim-card__accent {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: ${Y}px;
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
    padding-left: ${Pe}px;
    padding-right: ${Pe}px;
  }

  :host([orientation='vertical']) ::slotted(swim-card-footer) {
    position: relative;
    width: 100%;
    flex-shrink: 0;
    height: 50px;
    padding: var(--spacing-20) var(--spacing-0);
    margin-top: 15px;
    margin-bottom: ${Y}px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`, $t = [O, vt, xt, yt];
var H = /* @__PURE__ */ ((i) => (i.Success = "success", i.Error = "error", i.Disabled = "disabled", i))(H || {}), Fe = /* @__PURE__ */ ((i) => (i.Horizontal = "horizontal", i.Vertical = "vertical", i))(Fe || {}), Ge = /* @__PURE__ */ ((i) => (i.Normal = "normal", i.Flat = "flat", i))(Ge || {});
function $(i) {
  return i != null && `${i}` != "false";
}
function wt(i, e = null) {
  return isNaN(parseFloat(i)) || isNaN(Number(i)) ? e : Number(i);
}
const v = {
  fromAttribute: (i) => i !== null && i !== "false" && i !== "0",
  /**
   * Use empty string when true so the boolean attribute is present; remove when false.
   * Serializing false as `attr="false"` leaves the attribute in the DOM, so selectors like
   * `[disabled]` / `[loading]` (common in resets and lazy-load styles) still match the host.
   */
  toAttribute: (i) => i ? "" : null
}, At = f`
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
`;
var Et = Object.defineProperty, kt = Object.getOwnPropertyDescriptor, w = (i, e, t, s) => {
  for (var r = s > 1 ? void 0 : s ? kt(e, t) : e, o = i.length - 1, n; o >= 0; o--)
    (n = i[o]) && (r = (s ? n(e, t, r) : n(r)) || r);
  return s && r && Et(e, t, r), r;
};
let St = 0;
const ze = "swim-checkbox", X = class X extends m {
  constructor() {
    super(), this.id = `swim-checkbox-${++St}`, this.name = "", this.diameter = "18px", this._checked = !1, this._indeterminate = !1, this._tabindex = 0, this._disabled = !1, this._round = !1, this._internals = this.attachInternals();
  }
  get checked() {
    return this._checked;
  }
  set checked(e) {
    const t = $(e);
    this._checked !== t && (this._checked = t, this._syncFormValue(), this.dispatchEvent(new CustomEvent("checked-change", { detail: this._checked, bubbles: !1, composed: !1 })));
  }
  get indeterminate() {
    return this._indeterminate;
  }
  set indeterminate(e) {
    const t = $(e);
    this._indeterminate !== t && (this._indeterminate = t, this.dispatchEvent(
      new CustomEvent("indeterminate-change", {
        detail: this._indeterminate,
        bubbles: !1,
        composed: !1
      })
    ));
  }
  get tabindex() {
    return this._tabindex;
  }
  set tabindex(e) {
    this._tabindex = wt(e, 0);
  }
  get disabled() {
    return this._disabled;
  }
  set disabled(e) {
    this._disabled = $(e);
  }
  get round() {
    return this._round;
  }
  set round(e) {
    this._round = $(e);
  }
  connectedCallback() {
    super.connectedCallback(), this._syncFormValue();
  }
  updated(e) {
    super.updated(e), (e.has("checked") || e.has("_checked")) && this._syncFormValue();
  }
  /** Delegate focus to the focusable checkbox for form validation and accessibility */
  focus(e) {
    var t;
    (t = this._roving) == null || t.focus(e);
  }
  _syncFormValue() {
    this._internals.setFormValue(this._checked ? "on" : "");
  }
  _onClick(e) {
    e.preventDefault(), !this.disabled && this._toggle();
  }
  _onKeydown(e) {
    e.key !== " " || this.disabled || (e.stopPropagation(), e.preventDefault(), this._toggle());
  }
  _toggle() {
    this.checked = !this.checked, this._emitChange();
  }
  _emitChange() {
    this.dispatchEvent(
      new CustomEvent("change", {
        detail: {
          stopPropagation: () => {
          },
          timeStamp: Date.now(),
          target: { checked: this._checked }
        },
        bubbles: !1,
        composed: !1
      })
    );
  }
  _onFocus(e) {
    this.dispatchEvent(new FocusEvent("focus", { ...e, bubbles: !1, composed: !1 }));
  }
  _onBlur(e) {
    this.dispatchEvent(new FocusEvent("blur", { ...e, bubbles: !1, composed: !1 }));
  }
  render() {
    const e = `${this.id}-content`;
    return u`
      <div
        class="swim-checkbox__roving swim-checkbox__label"
        role="checkbox"
        tabindex="${this.disabled ? -1 : this.tabindex}"
        aria-checked="${this.indeterminate ? "mixed" : this.checked}"
        aria-disabled="${this.disabled ? "true" : "false"}"
        aria-labelledby="${e}"
        @click="${this._onClick}"
        @keydown="${this._onKeydown}"
        @focus="${this._onFocus}"
        @blur="${this._onBlur}"
      >
        <div
          part="box"
          class="swim-checkbox__box ${this.checked && !this.indeterminate ? "swim-checkbox__box--checked" : ""} ${this.indeterminate ? "swim-checkbox__box--indeterminate" : ""}"
          style="width: ${this.diameter}; height: ${this.diameter}; min-width: ${this.diameter}; min-height: ${this.diameter};"
        ></div>
        <div part="content" class="swim-checkbox__content" id="${e}">
          <slot></slot>
        </div>
      </div>
    `;
  }
};
X.styles = [O, At], X.formAssociated = !0;
let _ = X;
w([
  _t(".swim-checkbox__roving")
], _.prototype, "_roving", 2);
w([
  d({ type: String })
], _.prototype, "id", 2);
w([
  d({ type: String })
], _.prototype, "name", 2);
w([
  d({ type: String })
], _.prototype, "diameter", 2);
w([
  d({ type: Boolean, reflect: !0, attribute: "checked", converter: v })
], _.prototype, "checked", 1);
w([
  d({ type: Boolean, reflect: !0, converter: v })
], _.prototype, "indeterminate", 1);
w([
  d({ type: Number })
], _.prototype, "tabindex", 1);
w([
  d({ type: Boolean, reflect: !0, converter: v })
], _.prototype, "disabled", 1);
w([
  d({ type: Boolean, reflect: !0, converter: v })
], _.prototype, "round", 1);
customElements.get(ze) || customElements.define(ze, _);
var Ct = Object.defineProperty, Pt = Object.getOwnPropertyDescriptor, x = (i, e, t, s) => {
  for (var r = s > 1 ? void 0 : s ? Pt(e, t) : e, o = i.length - 1, n; o >= 0; o--)
    (n = i[o]) && (r = (s ? n(e, t, r) : n(r)) || r);
  return s && r && Ct(e, t, r), r;
};
const Oe = "swim-card", he = class he extends m {
  constructor() {
    super(...arguments), this._disabled = !1, this.orientation = Fe.Horizontal, this.statusTooltip = "", this._selectable = !1, this._selected = !1, this._error = !1, this.outlineText = "", this.appearance = Ge.Normal, this._hideAccent = !1;
  }
  get disabled() {
    return this._disabled;
  }
  set disabled(e) {
    this._disabled = $(e);
  }
  get selectable() {
    return this._selectable;
  }
  set selectable(e) {
    this._selectable = $(e);
  }
  get selected() {
    return this._selected;
  }
  set selected(e) {
    this._selected = $(e);
  }
  get error() {
    return this._error;
  }
  set error(e) {
    this._error = $(e);
  }
  get hideAccent() {
    return this._hideAccent;
  }
  set hideAccent(e) {
    this._hideAccent = $(e);
  }
  _onOutlineClick(e) {
    e.stopPropagation(), this.dispatchEvent(new CustomEvent("outline-click", { bubbles: !1, composed: !1 }));
  }
  _onSelectChange(e) {
    var s, r;
    e.stopPropagation();
    const t = ((r = (s = e.detail) == null ? void 0 : s.target) == null ? void 0 : r.checked) ?? !1;
    this.selected = t, this.dispatchEvent(
      new CustomEvent("select", {
        detail: this.selected,
        bubbles: !1,
        composed: !1
      })
    );
  }
  _onCheckboxClick(e) {
    e.stopPropagation();
  }
  render() {
    const e = this.selected && !this.outlineText && !this.error, t = this.error && !this.outlineText, s = !!this.outlineText, r = !!this.status, o = this.status === H.Success ? "swim-card__status--success" : this.status === H.Error ? "swim-card__status--error" : "";
    return u`
      ${e ? u`<div class="swim-card__outline" aria-hidden="true"></div>` : c}
      ${t ? u`<div class="swim-card__outline swim-card__outline--error" aria-hidden="true"></div>` : c}
      ${s ? u`
            <div
              class="swim-card__outline-text ${this.error ? "swim-card__outline-text--error" : ""}"
              aria-hidden="true"
            >
              <div
                part="outline-text"
                class="swim-card__outline-text-inner"
                role="button"
                tabindex="${this.disabled ? -1 : 0}"
                aria-label="${this.outlineText}"
                @click="${this._onOutlineClick}"
                @keydown="${(n) => {
      (n.key === "Enter" || n.key === " ") && (n.preventDefault(), this._onOutlineClick(n));
    }}"
              >
                ${this.outlineText}
              </div>
            </div>
          ` : c}
      ${r ? u`
            <div
              class="swim-card__status ${o}"
              title="${this.statusTooltip}"
              role="status"
              aria-label="${this.statusTooltip || this.status || ""}"
            ></div>
          ` : c}
      ${this.selectable ? u`
            <div class="swim-card__select" @click="${this._onCheckboxClick}">
              <swim-checkbox
                round
                .checked="${this.selected}"
                ?disabled="${this.disabled}"
                aria-label="Select card"
                @change="${this._onSelectChange}"
              ></swim-checkbox>
            </div>
          ` : c}

      <slot></slot>

      ${this.hideAccent ? c : u`<div class="swim-card__accent" aria-hidden="true"></div>`}
    `;
  }
};
he.styles = $t;
let b = he;
x([
  d({ type: Boolean, reflect: !0, converter: v })
], b.prototype, "disabled", 1);
x([
  d({ type: String, reflect: !0 })
], b.prototype, "orientation", 2);
x([
  d({ type: String, reflect: !0 })
], b.prototype, "status", 2);
x([
  d({ type: String, attribute: "status-tooltip" })
], b.prototype, "statusTooltip", 2);
x([
  d({ type: Boolean, reflect: !0, converter: v })
], b.prototype, "selectable", 1);
x([
  d({ type: Boolean, reflect: !0, converter: v })
], b.prototype, "selected", 1);
x([
  d({ type: Boolean, reflect: !0, converter: v })
], b.prototype, "error", 1);
x([
  d({ type: String, attribute: "outline-text" })
], b.prototype, "outlineText", 2);
x([
  d({ type: String, reflect: !0 })
], b.prototype, "appearance", 2);
x([
  d({ type: Boolean, attribute: "hide-accent", converter: v })
], b.prototype, "hideAccent", 1);
customElements.get(Oe) || customElements.define(Oe, b);
var We = /* @__PURE__ */ ((i) => (i.Small = "small", i.Medium = "medium", i.Large = "large", i))(We || {});
const Te = 25, zt = f`
  :host {
    display: flex;
    align-items: center;
    padding: var(--spacing-0) ${Te}px;
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
    margin-left: ${Te}px;
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
`, Ot = [O, zt];
var Tt = Object.defineProperty, qe = (i, e, t, s) => {
  for (var r = void 0, o = i.length - 1, n; o >= 0; o--)
    (n = i[o]) && (r = n(e, t, r) || r);
  return r && Tt(e, t, r), r;
};
const He = "swim-card-header", pe = class pe extends m {
  constructor() {
    super(...arguments), this.label = "", this.orientation = "horizontal";
  }
  render() {
    return u`
      <slot name="avatar"></slot>
      <div class="swim-card-header__title-group">
        <slot></slot>
        ${this.label ? u`<div class="swim-card-header__label">${this.label}</div>` : c}
        <slot name="tag"></slot>
        <slot name="title"></slot>
        <slot name="subtitle"></slot>
      </div>
    `;
  }
};
pe.styles = Ot;
let V = pe;
qe([
  d({ type: String })
], V.prototype, "label");
qe([
  d({ type: String, reflect: !0 })
], V.prototype, "orientation");
customElements.get(He) || customElements.define(He, V);
const Ht = f`
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
`, Ut = [O, Ht];
var Rt = Object.defineProperty, Nt = (i, e, t, s) => {
  for (var r = void 0, o = i.length - 1, n; o >= 0; o--)
    (n = i[o]) && (r = n(e, t, r) || r);
  return r && Rt(e, t, r), r;
};
const Ue = "swim-card-footer", ue = class ue extends m {
  constructor() {
    super(...arguments), this.label = "";
  }
  render() {
    return u`
      ${this.label ? u`<div class="swim-card-footer__label">${this.label}</div>` : c}
      <slot></slot>
    `;
  }
};
ue.styles = Ut;
let Z = ue;
Nt([
  d({ type: String })
], Z.prototype, "label");
customElements.get(Ue) || customElements.define(Ue, Z);
const Mt = 3, Dt = f`
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
    border: ${Mt}px solid transparent;
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
`, Bt = [O, Dt];
var jt = Object.defineProperty, de = (i, e, t, s) => {
  for (var r = void 0, o = i.length - 1, n; o >= 0; o--)
    (n = i[o]) && (r = n(e, t, r) || r);
  return r && jt(e, t, r), r;
};
const Re = "swim-card-avatar", ge = class ge extends m {
  constructor() {
    super(...arguments), this.src = "", this.removeImageBackground = !1;
  }
  render() {
    const e = this.status === H.Success ? "swim-card-avatar__avatar--success" : this.status === H.Error ? "swim-card-avatar__avatar--error" : this.status === H.Disabled ? "swim-card-avatar__avatar--disabled" : "";
    return u`
      <div
        class="swim-card-avatar__avatar ${e}"
        role="${this.status ? "status" : "presentation"}"
        aria-label="${this.status || ""}"
      >
        <div class="swim-card-avatar__inner">
          ${this.src ? u`
                <img
                  class="swim-card-avatar__img ${this.removeImageBackground ? "swim-card-avatar__img--no-bg" : ""}"
                  src="${this.src}"
                  alt=""
                  draggable="false"
                  loading="lazy"
                />
              ` : u`<span class="swim-card-avatar__content"><slot></slot></span>`}
        </div>
      </div>
    `;
  }
};
ge.styles = Bt;
let N = ge;
de([
  d({ type: String })
], N.prototype, "src");
de([
  d({ type: String, reflect: !0 })
], N.prototype, "status");
de([
  d({ type: Boolean, attribute: "remove-image-background", converter: v })
], N.prototype, "removeImageBackground");
customElements.get(Re) || customElements.define(Re, N);
const It = f`
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
`, Lt = [O, It];
var Vt = Object.defineProperty, Ft = (i, e, t, s) => {
  for (var r = void 0, o = i.length - 1, n; o >= 0; o--)
    (n = i[o]) && (r = n(e, t, r) || r);
  return r && Vt(e, t, r), r;
};
const Ne = "swim-card-placeholder", be = class be extends m {
  constructor() {
    super(...arguments), this.size = We.Medium;
  }
  render() {
    return u``;
  }
};
be.styles = Lt;
let J = be;
Ft([
  d({ type: String, reflect: !0 })
], J.prototype, "size");
customElements.get(Ne) || customElements.define(Ne, J);
const Gt = 27, Wt = f`
  :host {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    gap: var(--spacing-8);
    padding: var(--spacing-16) ${Gt}px;
    box-sizing: border-box;
    overflow: auto;
    line-height: 1.5;
  }

  ::slotted(*) {
    width: 100%;
  }
`, qt = [O, Wt], Me = "swim-card-body", _e = class _e extends m {
  render() {
    return u`<slot></slot>`;
  }
};
_e.styles = qt;
let oe = _e;
customElements.get(Me) || customElements.define(Me, oe);
export {
  Ge as CardAppearance,
  Fe as CardOrientation,
  We as CardPlaceholderSize,
  H as CardStatus,
  b as SwimCard,
  N as SwimCardAvatar,
  oe as SwimCardBody,
  Z as SwimCardFooter,
  V as SwimCardHeader,
  J as SwimCardPlaceholder,
  $t as cardComponentStyles,
  xt as cardHorizontalStyles,
  vt as cardStyles,
  yt as cardVerticalStyles
};
