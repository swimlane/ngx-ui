/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const G = globalThis, te = G.ShadowRoot && (G.ShadyCSS === void 0 || G.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ie = Symbol(), me = /* @__PURE__ */ new WeakMap();
let Ce = class {
  constructor(e, t, i) {
    if (this._$cssResult$ = !0, i !== ie) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (te && e === void 0) {
      const i = t !== void 0 && t.length === 1;
      i && (e = me.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && me.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Be = (n) => new Ce(typeof n == "string" ? n : n + "", void 0, ie), k = (n, ...e) => {
  const t = n.length === 1 ? n[0] : e.reduce((i, o, r) => i + ((s) => {
    if (s._$cssResult$ === !0) return s.cssText;
    if (typeof s == "number") return s;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + s + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + n[r + 1], n[0]);
  return new Ce(t, n, ie);
}, je = (n, e) => {
  if (te) n.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const i = document.createElement("style"), o = G.litNonce;
    o !== void 0 && i.setAttribute("nonce", o), i.textContent = t.cssText, n.appendChild(i);
  }
}, de = te ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const i of e.cssRules) t += i.cssText;
  return Be(t);
})(n) : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Ne, defineProperty: Ue, getOwnPropertyDescriptor: Re, getOwnPropertyNames: Ie, getOwnPropertySymbols: He, getPrototypeOf: Fe } = Object, v = globalThis, be = v.trustedTypes, De = be ? be.emptyScript : "", X = v.reactiveElementPolyfillSupport, j = (n, e) => n, V = { toAttribute(n, e) {
  switch (e) {
    case Boolean:
      n = n ? De : null;
      break;
    case Object:
    case Array:
      n = n == null ? n : JSON.stringify(n);
  }
  return n;
}, fromAttribute(n, e) {
  let t = n;
  switch (e) {
    case Boolean:
      t = n !== null;
      break;
    case Number:
      t = n === null ? null : Number(n);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(n);
      } catch {
        t = null;
      }
  }
  return t;
} }, oe = (n, e) => !Ne(n, e), fe = { attribute: !0, type: String, converter: V, reflect: !1, useDefault: !1, hasChanged: oe };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), v.litPropertyMetadata ?? (v.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let O = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = fe) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const i = Symbol(), o = this.getPropertyDescriptor(e, i, t);
      o !== void 0 && Ue(this.prototype, e, o);
    }
  }
  static getPropertyDescriptor(e, t, i) {
    const { get: o, set: r } = Re(this.prototype, e) ?? { get() {
      return this[t];
    }, set(s) {
      this[t] = s;
    } };
    return { get: o, set(s) {
      const l = o == null ? void 0 : o.call(this);
      r == null || r.call(this, s), this.requestUpdate(e, l, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? fe;
  }
  static _$Ei() {
    if (this.hasOwnProperty(j("elementProperties"))) return;
    const e = Fe(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(j("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(j("properties"))) {
      const t = this.properties, i = [...Ie(t), ...He(t)];
      for (const o of i) this.createProperty(o, t[o]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [i, o] of t) this.elementProperties.set(i, o);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, i] of this.elementProperties) {
      const o = this._$Eu(t, i);
      o !== void 0 && this._$Eh.set(o, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const i = new Set(e.flat(1 / 0).reverse());
      for (const o of i) t.unshift(de(o));
    } else e !== void 0 && t.push(de(e));
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
    return je(e, this.constructor.elementStyles), e;
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
    const i = this.constructor.elementProperties.get(e), o = this.constructor._$Eu(e, i);
    if (o !== void 0 && i.reflect === !0) {
      const s = (((r = i.converter) == null ? void 0 : r.toAttribute) !== void 0 ? i.converter : V).toAttribute(t, i.type);
      this._$Em = e, s == null ? this.removeAttribute(o) : this.setAttribute(o, s), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var r, s;
    const i = this.constructor, o = i._$Eh.get(e);
    if (o !== void 0 && this._$Em !== o) {
      const l = i.getPropertyOptions(o), a = typeof l.converter == "function" ? { fromAttribute: l.converter } : ((r = l.converter) == null ? void 0 : r.fromAttribute) !== void 0 ? l.converter : V;
      this._$Em = o;
      const b = a.fromAttribute(t, l.type);
      this[o] = b ?? ((s = this._$Ej) == null ? void 0 : s.get(o)) ?? b, this._$Em = null;
    }
  }
  requestUpdate(e, t, i, o = !1, r) {
    var s;
    if (e !== void 0) {
      const l = this.constructor;
      if (o === !1 && (r = this[e]), i ?? (i = l.getPropertyOptions(e)), !((i.hasChanged ?? oe)(r, t) || i.useDefault && i.reflect && r === ((s = this._$Ej) == null ? void 0 : s.get(e)) && !this.hasAttribute(l._$Eu(e, i)))) return;
      this.C(e, t, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: i, reflect: o, wrapped: r }, s) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, s ?? t ?? this[e]), r !== !0 || s !== void 0) || (this._$AL.has(e) || (this.hasUpdated || i || (t = void 0), this._$AL.set(e, t)), o === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
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
      const o = this.constructor.elementProperties;
      if (o.size > 0) for (const [r, s] of o) {
        const { wrapped: l } = s, a = this[r];
        l !== !0 || this._$AL.has(r) || a === void 0 || this.C(r, void 0, s, a);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), (i = this._$EO) == null || i.forEach((o) => {
        var r;
        return (r = o.hostUpdate) == null ? void 0 : r.call(o);
      }), this.update(t)) : this._$EM();
    } catch (o) {
      throw e = !1, this._$EM(), o;
    }
    e && this._$AE(t);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var t;
    (t = this._$EO) == null || t.forEach((i) => {
      var o;
      return (o = i.hostUpdated) == null ? void 0 : o.call(i);
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
O.elementStyles = [], O.shadowRootOptions = { mode: "open" }, O[j("elementProperties")] = /* @__PURE__ */ new Map(), O[j("finalized")] = /* @__PURE__ */ new Map(), X == null || X({ ReactiveElement: O }), (v.reactiveElementVersions ?? (v.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const N = globalThis, he = (n) => n, W = N.trustedTypes, we = W ? W.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, Ee = "$lit$", y = `lit$${Math.random().toFixed(9).slice(2)}$`, Se = "?" + y, Le = `<${Se}>`, S = document, U = () => S.createComment(""), R = (n) => n === null || typeof n != "object" && typeof n != "function", ne = Array.isArray, qe = (n) => ne(n) || typeof (n == null ? void 0 : n[Symbol.iterator]) == "function", Q = `[ 	
\f\r]`, M = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ge = /-->/g, pe = />/g, A = RegExp(`>|${Q}(?:([^\\s"'>=/]+)(${Q}*=${Q}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ue = /'/g, _e = /"/g, ze = /^(?:script|style|textarea|title)$/i, Ge = (n) => (e, ...t) => ({ _$litType$: n, strings: e, values: t }), g = Ge(1), T = Symbol.for("lit-noChange"), c = Symbol.for("lit-nothing"), ye = /* @__PURE__ */ new WeakMap(), C = S.createTreeWalker(S, 129);
function Oe(n, e) {
  if (!ne(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return we !== void 0 ? we.createHTML(e) : e;
}
const Ve = (n, e) => {
  const t = n.length - 1, i = [];
  let o, r = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", s = M;
  for (let l = 0; l < t; l++) {
    const a = n[l];
    let b, h, d = -1, u = 0;
    for (; u < a.length && (s.lastIndex = u, h = s.exec(a), h !== null); ) u = s.lastIndex, s === M ? h[1] === "!--" ? s = ge : h[1] !== void 0 ? s = pe : h[2] !== void 0 ? (ze.test(h[2]) && (o = RegExp("</" + h[2], "g")), s = A) : h[3] !== void 0 && (s = A) : s === A ? h[0] === ">" ? (s = o ?? M, d = -1) : h[1] === void 0 ? d = -2 : (d = s.lastIndex - h[2].length, b = h[1], s = h[3] === void 0 ? A : h[3] === '"' ? _e : ue) : s === _e || s === ue ? s = A : s === ge || s === pe ? s = M : (s = A, o = void 0);
    const _ = s === A && n[l + 1].startsWith("/>") ? " " : "";
    r += s === M ? a + Le : d >= 0 ? (i.push(b), a.slice(0, d) + Ee + a.slice(d) + y + _) : a + y + (d === -2 ? l : _);
  }
  return [Oe(n, r + (n[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class I {
  constructor({ strings: e, _$litType$: t }, i) {
    let o;
    this.parts = [];
    let r = 0, s = 0;
    const l = e.length - 1, a = this.parts, [b, h] = Ve(e, t);
    if (this.el = I.createElement(b, i), C.currentNode = this.el.content, t === 2 || t === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (o = C.nextNode()) !== null && a.length < l; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const d of o.getAttributeNames()) if (d.endsWith(Ee)) {
          const u = h[s++], _ = o.getAttribute(d).split(y), L = /([.?@])?(.*)/.exec(u);
          a.push({ type: 1, index: r, name: L[2], strings: _, ctor: L[1] === "." ? Ke : L[1] === "?" ? Je : L[1] === "@" ? Ze : K }), o.removeAttribute(d);
        } else d.startsWith(y) && (a.push({ type: 6, index: r }), o.removeAttribute(d));
        if (ze.test(o.tagName)) {
          const d = o.textContent.split(y), u = d.length - 1;
          if (u > 0) {
            o.textContent = W ? W.emptyScript : "";
            for (let _ = 0; _ < u; _++) o.append(d[_], U()), C.nextNode(), a.push({ type: 2, index: ++r });
            o.append(d[u], U());
          }
        }
      } else if (o.nodeType === 8) if (o.data === Se) a.push({ type: 2, index: r });
      else {
        let d = -1;
        for (; (d = o.data.indexOf(y, d + 1)) !== -1; ) a.push({ type: 7, index: r }), d += y.length - 1;
      }
      r++;
    }
  }
  static createElement(e, t) {
    const i = S.createElement("template");
    return i.innerHTML = e, i;
  }
}
function P(n, e, t = n, i) {
  var s, l;
  if (e === T) return e;
  let o = i !== void 0 ? (s = t._$Co) == null ? void 0 : s[i] : t._$Cl;
  const r = R(e) ? void 0 : e._$litDirective$;
  return (o == null ? void 0 : o.constructor) !== r && ((l = o == null ? void 0 : o._$AO) == null || l.call(o, !1), r === void 0 ? o = void 0 : (o = new r(n), o._$AT(n, t, i)), i !== void 0 ? (t._$Co ?? (t._$Co = []))[i] = o : t._$Cl = o), o !== void 0 && (e = P(n, o._$AS(n, e.values), o, i)), e;
}
class We {
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
    const { el: { content: t }, parts: i } = this._$AD, o = ((e == null ? void 0 : e.creationScope) ?? S).importNode(t, !0);
    C.currentNode = o;
    let r = C.nextNode(), s = 0, l = 0, a = i[0];
    for (; a !== void 0; ) {
      if (s === a.index) {
        let b;
        a.type === 2 ? b = new F(r, r.nextSibling, this, e) : a.type === 1 ? b = new a.ctor(r, a.name, a.strings, this, e) : a.type === 6 && (b = new Xe(r, this, e)), this._$AV.push(b), a = i[++l];
      }
      s !== (a == null ? void 0 : a.index) && (r = C.nextNode(), s++);
    }
    return C.currentNode = S, o;
  }
  p(e) {
    let t = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, t), t += i.strings.length - 2) : i._$AI(e[t])), t++;
  }
}
class F {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, t, i, o) {
    this.type = 2, this._$AH = c, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = i, this.options = o, this._$Cv = (o == null ? void 0 : o.isConnected) ?? !0;
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
    e = P(this, e, t), R(e) ? e === c || e == null || e === "" ? (this._$AH !== c && this._$AR(), this._$AH = c) : e !== this._$AH && e !== T && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : qe(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== c && R(this._$AH) ? this._$AA.nextSibling.data = e : this.T(S.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var r;
    const { values: t, _$litType$: i } = e, o = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = I.createElement(Oe(i.h, i.h[0]), this.options)), i);
    if (((r = this._$AH) == null ? void 0 : r._$AD) === o) this._$AH.p(t);
    else {
      const s = new We(o, this), l = s.u(this.options);
      s.p(t), this.T(l), this._$AH = s;
    }
  }
  _$AC(e) {
    let t = ye.get(e.strings);
    return t === void 0 && ye.set(e.strings, t = new I(e)), t;
  }
  k(e) {
    ne(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let i, o = 0;
    for (const r of e) o === t.length ? t.push(i = new F(this.O(U()), this.O(U()), this, this.options)) : i = t[o], i._$AI(r), o++;
    o < t.length && (this._$AR(i && i._$AB.nextSibling, o), t.length = o);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, t); e !== this._$AB; ) {
      const o = he(e).nextSibling;
      he(e).remove(), e = o;
    }
  }
  setConnected(e) {
    var t;
    this._$AM === void 0 && (this._$Cv = e, (t = this._$AP) == null || t.call(this, e));
  }
}
class K {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, i, o, r) {
    this.type = 1, this._$AH = c, this._$AN = void 0, this.element = e, this.name = t, this._$AM = o, this.options = r, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = c;
  }
  _$AI(e, t = this, i, o) {
    const r = this.strings;
    let s = !1;
    if (r === void 0) e = P(this, e, t, 0), s = !R(e) || e !== this._$AH && e !== T, s && (this._$AH = e);
    else {
      const l = e;
      let a, b;
      for (e = r[0], a = 0; a < r.length - 1; a++) b = P(this, l[i + a], t, a), b === T && (b = this._$AH[a]), s || (s = !R(b) || b !== this._$AH[a]), b === c ? e = c : e !== c && (e += (b ?? "") + r[a + 1]), this._$AH[a] = b;
    }
    s && !o && this.j(e);
  }
  j(e) {
    e === c ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Ke extends K {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === c ? void 0 : e;
  }
}
class Je extends K {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== c);
  }
}
class Ze extends K {
  constructor(e, t, i, o, r) {
    super(e, t, i, o, r), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = P(this, e, t, 0) ?? c) === T) return;
    const i = this._$AH, o = e === c && i !== c || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, r = e !== c && (i === c || o);
    o && this.element.removeEventListener(this.name, this, i), r && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t;
    typeof this._$AH == "function" ? this._$AH.call(((t = this.options) == null ? void 0 : t.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Xe {
  constructor(e, t, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    P(this, e);
  }
}
const Y = N.litHtmlPolyfillSupport;
Y == null || Y(I, F), (N.litHtmlVersions ?? (N.litHtmlVersions = [])).push("3.3.2");
const Qe = (n, e, t) => {
  const i = (t == null ? void 0 : t.renderBefore) ?? e;
  let o = i._$litPart$;
  if (o === void 0) {
    const r = (t == null ? void 0 : t.renderBefore) ?? null;
    i._$litPart$ = o = new F(e.insertBefore(U(), r), r, void 0, t ?? {});
  }
  return o._$AI(n), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const E = globalThis;
class x extends O {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Qe(t, this.renderRoot, this.renderOptions);
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
    return T;
  }
}
var Ae;
x._$litElement$ = !0, x.finalized = !0, (Ae = E.litElementHydrateSupport) == null || Ae.call(E, { LitElement: x });
const ee = E.litElementPolyfillSupport;
ee == null || ee({ LitElement: x });
(E.litElementVersions ?? (E.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ye = { attribute: !0, type: String, converter: V, reflect: !1, hasChanged: oe }, et = (n = Ye, e, t) => {
  const { kind: i, metadata: o } = t;
  let r = globalThis.litPropertyMetadata.get(o);
  if (r === void 0 && globalThis.litPropertyMetadata.set(o, r = /* @__PURE__ */ new Map()), i === "setter" && ((n = Object.create(n)).wrapped = !0), r.set(t.name, n), i === "accessor") {
    const { name: s } = t;
    return { set(l) {
      const a = e.get.call(this);
      e.set.call(this, l), this.requestUpdate(s, a, n, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(s, void 0, n, l), l;
    } };
  }
  if (i === "setter") {
    const { name: s } = t;
    return function(l) {
      const a = this[s];
      e.call(this, l), this.requestUpdate(s, a, n, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function m(n) {
  return (e, t) => typeof t == "object" ? et(n, e, t) : ((i, o, r) => {
    const s = o.hasOwnProperty(r);
    return o.constructor.createProperty(r, i), s ? Object.getOwnPropertyDescriptor(o, r) : void 0;
  })(n, e, t);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function J(n) {
  return m({ ...n, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const tt = (n, e, t) => (t.configurable = !0, t.enumerable = !0, Reflect.decorate && typeof e != "object" && Object.defineProperty(n, e, t), t);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function it(n, e) {
  return (t, i, o) => {
    const r = (s) => {
      var l;
      return ((l = s.renderRoot) == null ? void 0 : l.querySelector(n)) ?? null;
    };
    return tt(t, i, { get() {
      return r(this);
    } });
  };
}
const Z = k`
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
k`
  * {
    box-sizing: border-box;
  }
`;
const Te = k`
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
`, ot = [
  Z,
  Te,
  k`
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
  `
];
var B = /* @__PURE__ */ ((n) => (n.Regular = "regular", n.Medium = "medium", n.Large = "large", n))(B || {});
function q(n) {
  return n != null && `${n}` != "false";
}
function nt(n, e = null) {
  return isNaN(parseFloat(n)) || isNaN(Number(n)) ? e : Number(n);
}
const re = {
  fromAttribute: (n) => n !== "false",
  /** Omit attribute when true (default); set explicit `="false"` only when off. */
  toAttribute: (n) => n ? null : "false"
}, Pe = {
  fromAttribute: (n) => n !== null && n !== "false" && n !== "0",
  /**
   * Use empty string when true so the boolean attribute is present; remove when false.
   * Serializing false as `attr="false"` leaves the attribute in the DOM, so selectors like
   * `[disabled]` / `[loading]` (common in resets and lazy-load styles) still match the host.
   */
  toAttribute: (n) => n ? "" : null
}, rt = k`
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
`, st = k`
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

  /* Font icon base (glyphs in icon-font-glyphs.ts); uses same font as ngx-ui ('ngx-icon'). */
  .swim-icon,
  .swim-icon__i.swim-icon {
    display: inline-flex;
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

  /* Center the glyph in the em box; many ngx-icon glyphs sit high with display:block alone */
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

  ${rt}
`, lt = (n) => `swim-icon ${n.trim().split(" ").map((t) => {
  const [i, o] = t.split(":");
  return i.length ? `${i} ${i}-${o}` : o;
}).join(" ")}`;
class at {
  constructor() {
    this._defaultFontSetClass = "lit", this._iconMap = /* @__PURE__ */ new Map();
  }
  setDefaultFontSetClass(e) {
    return this._defaultFontSetClass = e, this._defaultFontSetClass;
  }
  get(e, t) {
    return this.lookup(e, t).map((i) => lt(i));
  }
  lookup(e, t) {
    const i = t ?? this._defaultFontSetClass;
    return (Array.isArray(e) ? e : [e]).reduce((o, r) => {
      const s = this._expandKeys(r, i).map((l) => {
        const a = this._iconMap.get(l);
        return a && a.length === 1 ? a[0] : l;
      }).join(" ");
      return o.concat(this._iconMap.get(s) || [s]);
    }, []);
  }
  add(e, t) {
    const i = this._expandKeys(e, this._defaultFontSetClass).join(" "), o = this.lookup(t);
    this._iconMap.set(i, o);
  }
  _expandKeys(e, t) {
    return e.split(" ").map((i) => i.includes(":") ? i : `${t}:${i}`);
  }
}
const ct = new at();
var mt = Object.defineProperty, D = (n, e, t, i) => {
  for (var o = void 0, r = n.length - 1, s; r >= 0; r--)
    (s = n[r]) && (o = s(e, t, o) || o);
  return o && mt(e, t, o), o;
};
const ve = "swim-icon", se = class se extends x {
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
    this._cssClasses = ct.get(e, this.fontSet);
  }
  render() {
    var r;
    const e = this._cssClasses, t = !!this.alt, i = ((r = this.iconClass) == null ? void 0 : r.trim()) ?? "", o = i ? ` ${i}` : "";
    return !e || e.length === 0 ? g`
        <span
          part="icon"
          class="${i}"
          role="${t ? "img" : "presentation"}"
          aria-label="${t ? this.alt : c}"
          aria-hidden="${t ? "false" : "true"}"
        >
          <slot></slot>
        </span>
      ` : e.length === 1 ? g`
        <i
          part="icon"
          class="swim-icon__i ${e[0]}${o}"
          role="${t ? "img" : "presentation"}"
          aria-label="${t ? this.alt : c}"
          aria-hidden="${t ? "false" : "true"}"
        ></i>
      ` : g`
      <span
        class="swim-icon__stack"
        role="${t ? "img" : "presentation"}"
        aria-label="${t ? this.alt : c}"
        aria-hidden="${t ? "false" : "true"}"
      >
        ${e.map(
      (s, l) => g`<i part="icon icon-${l}" class="swim-icon__i swim-icon__i--${l} ${s}${o}"></i>`
    )}
      </span>
    `;
  }
};
se.styles = [Z, st];
let $ = se;
D([
  m({ type: String, attribute: "font-icon" })
], $.prototype, "fontIcon");
D([
  m({ type: String })
], $.prototype, "alt");
D([
  m({ type: String, attribute: "font-set" })
], $.prototype, "fontSet");
D([
  m({ type: String, attribute: "icon-class" })
], $.prototype, "iconClass");
D([
  J()
], $.prototype, "_cssClasses");
customElements.get(ve) || customElements.define(ve, $);
var dt = Object.defineProperty, bt = Object.getOwnPropertyDescriptor, w = (n, e, t, i) => {
  for (var o = i > 1 ? void 0 : i ? bt(e, t) : e, r = n.length - 1, s; r >= 0; r--)
    (s = n[r]) && (o = (i ? s(e, t, o) : s(o)) || o);
  return i && o && dt(e, t, o), o;
};
const xe = "swim-dialog", le = class le extends x {
  constructor() {
    super(...arguments), this.dialogTitle = "", this.content = "", this.class = "", this.cssClass = "", this.format = B.Regular, this.showBackdrop = !0, this._closeButton = !0, this._closeOnBlur = !0, this._closeOnEscape = !0, this._visible = !1, this._zIndex = 991, this._contentId = `swim-dialog-content-${Math.random().toString(36).slice(2, 11)}`, this._titleId = `swim-dialog-title-${Math.random().toString(36).slice(2, 11)}`, this._previousActiveElement = null;
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
    this._closeButton = q(e);
  }
  get closeOnBlur() {
    return this._closeOnBlur;
  }
  set closeOnBlur(e) {
    this._closeOnBlur = q(e);
  }
  get closeOnEscape() {
    return this._closeOnEscape;
  }
  set closeOnEscape(e) {
    this._closeOnEscape = q(e);
  }
  get visible() {
    return this._visible;
  }
  set visible(e) {
    const t = q(e);
    this._visible !== t && (this._visible = t, t ? (this._previousActiveElement = typeof document < "u" ? document.activeElement : null, this.dispatchEvent(new CustomEvent("open", { bubbles: !1, composed: !1 }))) : (this._restoreFocus(), this.dispatchEvent(new CustomEvent("close", { detail: void 0, bubbles: !1, composed: !1 }))));
  }
  get zIndex() {
    return this._zIndex;
  }
  set zIndex(e) {
    this._zIndex = nt(e, 991);
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
    this.closeOnBlur && this.hide();
  }
  _onKeydown(e) {
    if (e.key === "Escape") {
      if (!this.closeOnEscape) return;
      e.stopPropagation(), this.hide();
    }
  }
  /** Large/medium slotted content reads `--swim-dialog-header-action-display` (inherited). */
  _syncCloseButtonCustomProperty() {
    this.closeButton ? this.style.removeProperty("--swim-dialog-header-action-display") : this.style.setProperty("--swim-dialog-header-action-display", "none");
  }
  connectedCallback() {
    super.connectedCallback(), this._syncCloseButtonCustomProperty();
  }
  disconnectedCallback() {
    this.style.removeProperty("--swim-dialog-header-action-display"), super.disconnectedCallback();
  }
  updated(e) {
    e.has("closeButton") && this._syncCloseButtonCustomProperty(), e.has("visible") && this.visible && this._contentEl && requestAnimationFrame(() => {
      var t;
      (t = this._contentEl) == null || t.focus({ preventScroll: !0 });
    });
  }
  render() {
    if (!this.visible) return c;
    const e = this.format === B.Regular || this.format === "regular", t = this.format === B.Large || this.format === "large", i = this.format === B.Medium || this.format === "medium", o = [
      "swim-dialog__content",
      this.cssClass,
      t ? "swim-dialog__content--large" : "",
      i ? "swim-dialog__content--medium" : ""
    ].filter(Boolean).join(" "), r = this.class.includes("swim-dialog--full-screen"), s = ["swim-dialog", "swim-dialog--open", this.class, r ? "swim-scroll" : ""].filter(Boolean).join(" ");
    return g`
      <div class="${s}" style="--swim-dialog-z: ${this.zIndex}" role="presentation">
        ${this.showBackdrop ? g`<div class="swim-dialog__backdrop" aria-hidden="true" @click="${this._onBackdropClick}"></div>` : c}
        <div
          part="content"
          class="${o}"
          style="z-index: ${this._contentzIndex}"
          tabindex="-1"
          role="dialog"
          aria-modal="true"
          aria-labelledby="${this.dialogTitle ? this._titleId : c}"
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
                    ` : c}
                ${this.dialogTitle ? g`
                      <div class="swim-dialog__header" part="header">
                        <h2 id="${this._titleId}" class="swim-dialog__title">${this.dialogTitle}</h2>
                      </div>
                    ` : c}
                <div class="swim-dialog__body swim-scroll">
                  <slot></slot>
                  ${this.content ? g`<div>${this.content}</div>` : c}
                </div>
              ` : g`
                <div class="swim-dialog__body swim-scroll">
                  <slot></slot>
                  ${this.content ? g`<div>${this.content}</div>` : c}
                </div>
              `}
        </div>
      </div>
    `;
  }
};
le.styles = ot;
let f = le;
w([
  m({ type: String, attribute: "dialog-title" })
], f.prototype, "dialogTitle", 2);
w([
  m({ type: String })
], f.prototype, "title", 1);
w([
  m({ type: String })
], f.prototype, "content", 2);
w([
  m({ type: String })
], f.prototype, "class", 2);
w([
  m({ type: String, attribute: "css-class" })
], f.prototype, "cssClass", 2);
w([
  m({ type: String, reflect: !0 })
], f.prototype, "format", 2);
w([
  m({
    type: Boolean,
    attribute: "show-backdrop",
    reflect: !0,
    converter: {
      fromAttribute: (n) => n === null ? !0 : n !== "false" && n !== "0",
      toAttribute: (n) => n ? "" : "false"
    }
  })
], f.prototype, "showBackdrop", 2);
w([
  m({ type: Boolean, attribute: "close-button", converter: re })
], f.prototype, "closeButton", 1);
w([
  m({ type: Boolean, attribute: "close-on-blur", converter: re })
], f.prototype, "closeOnBlur", 1);
w([
  m({ type: Boolean, attribute: "close-on-escape", converter: re })
], f.prototype, "closeOnEscape", 1);
w([
  m({ type: Boolean, reflect: !0, converter: Pe })
], f.prototype, "visible", 1);
w([
  m({ type: Number })
], f.prototype, "zIndex", 1);
w([
  m({ attribute: !1 })
], f.prototype, "beforeClose", 2);
w([
  J()
], f.prototype, "_contentId", 2);
w([
  J()
], f.prototype, "_titleId", 2);
w([
  it(".swim-dialog__content")
], f.prototype, "_contentEl", 2);
customElements.get(xe) || customElements.define(xe, f);
const ft = [
  Z,
  k`
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
  `
];
var ht = Object.defineProperty, z = (n, e, t, i) => {
  for (var o = void 0, r = n.length - 1, s; r >= 0; r--)
    (s = n[r]) && (o = s(e, t, o) || o);
  return o && ht(e, t, o), o;
};
const $e = "swim-large-format-dialog-content", ae = class ae extends x {
  constructor() {
    super(...arguments), this.format = "large", this.dialogTitle = "", this.dialogSubtitle = "", this.dialogActionTitle = "Close", this.dialogDirtyActionTitle = "Cancel", this.dirty = !1, this._hasFooterSlot = !1, this._onFooterSlotChange = () => {
      this._syncFooterSlotVisibility();
    };
  }
  _onCloseOrCancel() {
    this.dispatchEvent(new CustomEvent("close-or-cancel", { detail: this.dirty, bubbles: !1, composed: !1 }));
  }
  firstUpdated() {
    this._syncFooterSlotVisibility();
  }
  _syncFooterSlotVisibility() {
    var o, r;
    const e = (r = (o = this.renderRoot) == null ? void 0 : o.querySelector) == null ? void 0 : r.call(o, 'slot[name="footer"]');
    if (!e) return;
    const i = e.assignedNodes({ flatten: !0 }).some(
      (s) => {
        var l;
        return s.nodeType === Node.ELEMENT_NODE || s.nodeType === Node.TEXT_NODE && (((l = s.textContent) == null ? void 0 : l.trim()) ?? "").length > 0;
      }
    );
    this._hasFooterSlot !== i && (this._hasFooterSlot = i);
  }
  render() {
    const e = [
      "format-dialog-container__header-title",
      "format-dialog-container__header-title--with-subtitle"
    ].join(" "), t = [
      "format-dialog-container__footer",
      this._hasFooterSlot ? "" : "format-dialog-container__footer--hidden"
    ].filter(Boolean).join(" ");
    return g`
      <main class="format-dialog-container">
        <header class="format-dialog-container__header">
          <div class="format-dialog-container__header-title ${e}">
            <h1>${this.dialogTitle}</h1>
            ${this.dialogSubtitle ? g`<h4>${this.dialogSubtitle}</h4>` : c}
          </div>
          <div class="format-dialog-container__header-action">
            <button
              type="button"
              class="format-dialog-container__header-action__button"
              aria-label="${this.dirty ? this.dialogDirtyActionTitle : this.dialogActionTitle}"
              @click="${this._onCloseOrCancel}"
            >
              <swim-icon font-icon="x"></swim-icon>
              ${this.dirty ? this.dialogDirtyActionTitle : this.dialogActionTitle}
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
    `;
  }
};
ae.styles = [Te, ft];
let p = ae;
z([
  m({ type: String, reflect: !0 })
], p.prototype, "format");
z([
  m({ type: String, attribute: "dialog-title" })
], p.prototype, "dialogTitle");
z([
  m({ type: String, attribute: "dialog-subtitle" })
], p.prototype, "dialogSubtitle");
z([
  m({ type: String, attribute: "dialog-action-title" })
], p.prototype, "dialogActionTitle");
z([
  m({ type: String, attribute: "dialog-dirty-action-title" })
], p.prototype, "dialogDirtyActionTitle");
z([
  m({ type: Boolean, reflect: !0, converter: Pe })
], p.prototype, "dirty");
z([
  J()
], p.prototype, "_hasFooterSlot");
customElements.get($e) || customElements.define($e, p);
const wt = [
  Z,
  k`
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
  `
];
var gt = Object.defineProperty, Me = (n, e, t, i) => {
  for (var o = void 0, r = n.length - 1, s; r >= 0; r--)
    (s = n[r]) && (o = s(e, t, o) || o);
  return o && gt(e, t, o), o;
};
const ke = "swim-large-format-dialog-footer", ce = class ce extends x {
  constructor() {
    super(...arguments), this.format = "large", this.align = "center";
  }
  render() {
    return g` <div class="format-dialog-footer"><slot></slot></div> `;
  }
};
ce.styles = wt;
let H = ce;
Me([
  m({ type: String, reflect: !0 })
], H.prototype, "format");
Me([
  m({ type: String, reflect: !0 })
], H.prototype, "align");
customElements.get(ke) || customElements.define(ke, H);
export {
  B as DialogFormat,
  f as SwimDialog,
  p as SwimLargeFormatDialogContent,
  H as SwimLargeFormatDialogFooter
};
