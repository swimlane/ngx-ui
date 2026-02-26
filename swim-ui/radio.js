/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const M = globalThis, J = M.ShadowRoot && (M.ShadyCSS === void 0 || M.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Q = Symbol(), se = /* @__PURE__ */ new WeakMap();
let be = class {
  constructor(e, t, s) {
    if (this._$cssResult$ = !0, s !== Q) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (J && e === void 0) {
      const s = t !== void 0 && t.length === 1;
      s && (e = se.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), s && se.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Ae = (r) => new be(typeof r == "string" ? r : r + "", void 0, Q), j = (r, ...e) => {
  const t = r.length === 1 ? r[0] : e.reduce((s, i, o) => s + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + r[o + 1], r[0]);
  return new be(t, r, Q);
}, xe = (r, e) => {
  if (J) r.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const s = document.createElement("style"), i = M.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = t.cssText, r.appendChild(s);
  }
}, ie = J ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const s of e.cssRules) t += s.cssText;
  return Ae(t);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Ee, defineProperty: Se, getOwnPropertyDescriptor: ke, getOwnPropertyNames: Ce, getOwnPropertySymbols: Pe, getPrototypeOf: Oe } = Object, y = globalThis, re = y.trustedTypes, Ie = re ? re.emptyScript : "", V = y.reactiveElementPolyfillSupport, I = (r, e) => r, z = { toAttribute(r, e) {
  switch (e) {
    case Boolean:
      r = r ? Ie : null;
      break;
    case Object:
    case Array:
      r = r == null ? r : JSON.stringify(r);
  }
  return r;
}, fromAttribute(r, e) {
  let t = r;
  switch (e) {
    case Boolean:
      t = r !== null;
      break;
    case Number:
      t = r === null ? null : Number(r);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(r);
      } catch {
        t = null;
      }
  }
  return t;
} }, X = (r, e) => !Ee(r, e), oe = { attribute: !0, type: String, converter: z, reflect: !1, useDefault: !1, hasChanged: X };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), y.litPropertyMetadata ?? (y.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let S = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = oe) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(e, s, t);
      i !== void 0 && Se(this.prototype, e, i);
    }
  }
  static getPropertyDescriptor(e, t, s) {
    const { get: i, set: o } = ke(this.prototype, e) ?? { get() {
      return this[t];
    }, set(n) {
      this[t] = n;
    } };
    return { get: i, set(n) {
      const h = i == null ? void 0 : i.call(this);
      o == null || o.call(this, n), this.requestUpdate(e, h, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? oe;
  }
  static _$Ei() {
    if (this.hasOwnProperty(I("elementProperties"))) return;
    const e = Oe(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(I("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(I("properties"))) {
      const t = this.properties, s = [...Ce(t), ...Pe(t)];
      for (const i of s) this.createProperty(i, t[i]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [s, i] of t) this.elementProperties.set(s, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, s] of this.elementProperties) {
      const i = this._$Eu(t, s);
      i !== void 0 && this._$Eh.set(i, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const s = new Set(e.flat(1 / 0).reverse());
      for (const i of s) t.unshift(ie(i));
    } else e !== void 0 && t.push(ie(e));
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
    return xe(e, this.constructor.elementStyles), e;
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
    const s = this.constructor.elementProperties.get(e), i = this.constructor._$Eu(e, s);
    if (i !== void 0 && s.reflect === !0) {
      const n = (((o = s.converter) == null ? void 0 : o.toAttribute) !== void 0 ? s.converter : z).toAttribute(t, s.type);
      this._$Em = e, n == null ? this.removeAttribute(i) : this.setAttribute(i, n), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var o, n;
    const s = this.constructor, i = s._$Eh.get(e);
    if (i !== void 0 && this._$Em !== i) {
      const h = s.getPropertyOptions(i), a = typeof h.converter == "function" ? { fromAttribute: h.converter } : ((o = h.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? h.converter : z;
      this._$Em = i;
      const d = a.fromAttribute(t, h.type);
      this[i] = d ?? ((n = this._$Ej) == null ? void 0 : n.get(i)) ?? d, this._$Em = null;
    }
  }
  requestUpdate(e, t, s, i = !1, o) {
    var n;
    if (e !== void 0) {
      const h = this.constructor;
      if (i === !1 && (o = this[e]), s ?? (s = h.getPropertyOptions(e)), !((s.hasChanged ?? X)(o, t) || s.useDefault && s.reflect && o === ((n = this._$Ej) == null ? void 0 : n.get(e)) && !this.hasAttribute(h._$Eu(e, s)))) return;
      this.C(e, t, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: s, reflect: i, wrapped: o }, n) {
    s && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, n ?? t ?? this[e]), o !== !0 || n !== void 0) || (this._$AL.has(e) || (this.hasUpdated || s || (t = void 0), this._$AL.set(e, t)), i === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
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
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [o, n] of i) {
        const { wrapped: h } = n, a = this[o];
        h !== !0 || this._$AL.has(o) || a === void 0 || this.C(o, void 0, n, a);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), (s = this._$EO) == null || s.forEach((i) => {
        var o;
        return (o = i.hostUpdate) == null ? void 0 : o.call(i);
      }), this.update(t)) : this._$EM();
    } catch (i) {
      throw e = !1, this._$EM(), i;
    }
    e && this._$AE(t);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var t;
    (t = this._$EO) == null || t.forEach((s) => {
      var i;
      return (i = s.hostUpdated) == null ? void 0 : i.call(s);
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
S.elementStyles = [], S.shadowRootOptions = { mode: "open" }, S[I("elementProperties")] = /* @__PURE__ */ new Map(), S[I("finalized")] = /* @__PURE__ */ new Map(), V == null || V({ ReactiveElement: S }), (y.reactiveElementVersions ?? (y.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const N = globalThis, ne = (r) => r, B = N.trustedTypes, ae = B ? B.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, fe = "$lit$", $ = `lit$${Math.random().toFixed(9).slice(2)}$`, me = "?" + $, Ne = `<${me}>`, E = document, U = () => E.createComment(""), R = (r) => r === null || typeof r != "object" && typeof r != "function", Y = Array.isArray, Ue = (r) => Y(r) || typeof (r == null ? void 0 : r[Symbol.iterator]) == "function", G = `[ 	
\f\r]`, O = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, he = /-->/g, le = />/g, w = RegExp(`>|${G}(?:([^\\s"'>=/]+)(${G}*=${G}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), de = /'/g, ce = /"/g, $e = /^(?:script|style|textarea|title)$/i, Re = (r) => (e, ...t) => ({ _$litType$: r, strings: e, values: t }), ye = Re(1), C = Symbol.for("lit-noChange"), c = Symbol.for("lit-nothing"), ue = /* @__PURE__ */ new WeakMap(), A = E.createTreeWalker(E, 129);
function ve(r, e) {
  if (!Y(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ae !== void 0 ? ae.createHTML(e) : e;
}
const He = (r, e) => {
  const t = r.length - 1, s = [];
  let i, o = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", n = O;
  for (let h = 0; h < t; h++) {
    const a = r[h];
    let d, u, l = -1, f = 0;
    for (; f < a.length && (n.lastIndex = f, u = n.exec(a), u !== null); ) f = n.lastIndex, n === O ? u[1] === "!--" ? n = he : u[1] !== void 0 ? n = le : u[2] !== void 0 ? ($e.test(u[2]) && (i = RegExp("</" + u[2], "g")), n = w) : u[3] !== void 0 && (n = w) : n === w ? u[0] === ">" ? (n = i ?? O, l = -1) : u[1] === void 0 ? l = -2 : (l = n.lastIndex - u[2].length, d = u[1], n = u[3] === void 0 ? w : u[3] === '"' ? ce : de) : n === ce || n === de ? n = w : n === he || n === le ? n = O : (n = w, i = void 0);
    const m = n === w && r[h + 1].startsWith("/>") ? " " : "";
    o += n === O ? a + Ne : l >= 0 ? (s.push(d), a.slice(0, l) + fe + a.slice(l) + $ + m) : a + $ + (l === -2 ? h : m);
  }
  return [ve(r, o + (r[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), s];
};
class H {
  constructor({ strings: e, _$litType$: t }, s) {
    let i;
    this.parts = [];
    let o = 0, n = 0;
    const h = e.length - 1, a = this.parts, [d, u] = He(e, t);
    if (this.el = H.createElement(d, s), A.currentNode = this.el.content, t === 2 || t === 3) {
      const l = this.el.content.firstChild;
      l.replaceWith(...l.childNodes);
    }
    for (; (i = A.nextNode()) !== null && a.length < h; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const l of i.getAttributeNames()) if (l.endsWith(fe)) {
          const f = u[n++], m = i.getAttribute(l).split($), D = /([.?@])?(.*)/.exec(f);
          a.push({ type: 1, index: o, name: D[2], strings: m, ctor: D[1] === "." ? De : D[1] === "?" ? Me : D[1] === "@" ? ze : F }), i.removeAttribute(l);
        } else l.startsWith($) && (a.push({ type: 6, index: o }), i.removeAttribute(l));
        if ($e.test(i.tagName)) {
          const l = i.textContent.split($), f = l.length - 1;
          if (f > 0) {
            i.textContent = B ? B.emptyScript : "";
            for (let m = 0; m < f; m++) i.append(l[m], U()), A.nextNode(), a.push({ type: 2, index: ++o });
            i.append(l[f], U());
          }
        }
      } else if (i.nodeType === 8) if (i.data === me) a.push({ type: 2, index: o });
      else {
        let l = -1;
        for (; (l = i.data.indexOf($, l + 1)) !== -1; ) a.push({ type: 7, index: o }), l += $.length - 1;
      }
      o++;
    }
  }
  static createElement(e, t) {
    const s = E.createElement("template");
    return s.innerHTML = e, s;
  }
}
function P(r, e, t = r, s) {
  var n, h;
  if (e === C) return e;
  let i = s !== void 0 ? (n = t._$Co) == null ? void 0 : n[s] : t._$Cl;
  const o = R(e) ? void 0 : e._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== o && ((h = i == null ? void 0 : i._$AO) == null || h.call(i, !1), o === void 0 ? i = void 0 : (i = new o(r), i._$AT(r, t, s)), s !== void 0 ? (t._$Co ?? (t._$Co = []))[s] = i : t._$Cl = i), i !== void 0 && (e = P(r, i._$AS(r, e.values), i, s)), e;
}
class Te {
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
    const { el: { content: t }, parts: s } = this._$AD, i = ((e == null ? void 0 : e.creationScope) ?? E).importNode(t, !0);
    A.currentNode = i;
    let o = A.nextNode(), n = 0, h = 0, a = s[0];
    for (; a !== void 0; ) {
      if (n === a.index) {
        let d;
        a.type === 2 ? d = new T(o, o.nextSibling, this, e) : a.type === 1 ? d = new a.ctor(o, a.name, a.strings, this, e) : a.type === 6 && (d = new Be(o, this, e)), this._$AV.push(d), a = s[++h];
      }
      n !== (a == null ? void 0 : a.index) && (o = A.nextNode(), n++);
    }
    return A.currentNode = E, i;
  }
  p(e) {
    let t = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(e, s, t), t += s.strings.length - 2) : s._$AI(e[t])), t++;
  }
}
class T {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, t, s, i) {
    this.type = 2, this._$AH = c, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = s, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
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
    e = P(this, e, t), R(e) ? e === c || e == null || e === "" ? (this._$AH !== c && this._$AR(), this._$AH = c) : e !== this._$AH && e !== C && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Ue(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== c && R(this._$AH) ? this._$AA.nextSibling.data = e : this.T(E.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var o;
    const { values: t, _$litType$: s } = e, i = typeof s == "number" ? this._$AC(e) : (s.el === void 0 && (s.el = H.createElement(ve(s.h, s.h[0]), this.options)), s);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === i) this._$AH.p(t);
    else {
      const n = new Te(i, this), h = n.u(this.options);
      n.p(t), this.T(h), this._$AH = n;
    }
  }
  _$AC(e) {
    let t = ue.get(e.strings);
    return t === void 0 && ue.set(e.strings, t = new H(e)), t;
  }
  k(e) {
    Y(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let s, i = 0;
    for (const o of e) i === t.length ? t.push(s = new T(this.O(U()), this.O(U()), this, this.options)) : s = t[i], s._$AI(o), i++;
    i < t.length && (this._$AR(s && s._$AB.nextSibling, i), t.length = i);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, t); e !== this._$AB; ) {
      const i = ne(e).nextSibling;
      ne(e).remove(), e = i;
    }
  }
  setConnected(e) {
    var t;
    this._$AM === void 0 && (this._$Cv = e, (t = this._$AP) == null || t.call(this, e));
  }
}
class F {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, s, i, o) {
    this.type = 1, this._$AH = c, this._$AN = void 0, this.element = e, this.name = t, this._$AM = i, this.options = o, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = c;
  }
  _$AI(e, t = this, s, i) {
    const o = this.strings;
    let n = !1;
    if (o === void 0) e = P(this, e, t, 0), n = !R(e) || e !== this._$AH && e !== C, n && (this._$AH = e);
    else {
      const h = e;
      let a, d;
      for (e = o[0], a = 0; a < o.length - 1; a++) d = P(this, h[s + a], t, a), d === C && (d = this._$AH[a]), n || (n = !R(d) || d !== this._$AH[a]), d === c ? e = c : e !== c && (e += (d ?? "") + o[a + 1]), this._$AH[a] = d;
    }
    n && !i && this.j(e);
  }
  j(e) {
    e === c ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class De extends F {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === c ? void 0 : e;
  }
}
class Me extends F {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== c);
  }
}
class ze extends F {
  constructor(e, t, s, i, o) {
    super(e, t, s, i, o), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = P(this, e, t, 0) ?? c) === C) return;
    const s = this._$AH, i = e === c && s !== c || e.capture !== s.capture || e.once !== s.once || e.passive !== s.passive, o = e !== c && (s === c || i);
    i && this.element.removeEventListener(this.name, this, s), o && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t;
    typeof this._$AH == "function" ? this._$AH.call(((t = this.options) == null ? void 0 : t.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Be {
  constructor(e, t, s) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    P(this, e);
  }
}
const W = N.litHtmlPolyfillSupport;
W == null || W(H, T), (N.litHtmlVersions ?? (N.litHtmlVersions = [])).push("3.3.2");
const Le = (r, e, t) => {
  const s = (t == null ? void 0 : t.renderBefore) ?? e;
  let i = s._$litPart$;
  if (i === void 0) {
    const o = (t == null ? void 0 : t.renderBefore) ?? null;
    s._$litPart$ = i = new T(e.insertBefore(U(), o), o, void 0, t ?? {});
  }
  return i._$AI(r), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const x = globalThis;
class k extends S {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Le(t, this.renderRoot, this.renderOptions);
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
    return C;
  }
}
var ge;
k._$litElement$ = !0, k.finalized = !0, (ge = x.litElementHydrateSupport) == null || ge.call(x, { LitElement: k });
const q = x.litElementPolyfillSupport;
q == null || q({ LitElement: k });
(x.litElementVersions ?? (x.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const je = { attribute: !0, type: String, converter: z, reflect: !1, hasChanged: X }, Fe = (r = je, e, t) => {
  const { kind: s, metadata: i } = t;
  let o = globalThis.litPropertyMetadata.get(i);
  if (o === void 0 && globalThis.litPropertyMetadata.set(i, o = /* @__PURE__ */ new Map()), s === "setter" && ((r = Object.create(r)).wrapped = !0), o.set(t.name, r), s === "accessor") {
    const { name: n } = t;
    return { set(h) {
      const a = e.get.call(this);
      e.set.call(this, h), this.requestUpdate(n, a, r, !0, h);
    }, init(h) {
      return h !== void 0 && this.C(n, void 0, r, h), h;
    } };
  }
  if (s === "setter") {
    const { name: n } = t;
    return function(h) {
      const a = this[n];
      e.call(this, h), this.requestUpdate(n, a, r, !0, h);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function p(r) {
  return (e, t) => typeof t == "object" ? Fe(r, e, t) : ((s, i, o) => {
    const n = i.hasOwnProperty(o);
    return i.constructor.createProperty(o, s), n ? Object.getOwnPropertyDescriptor(i, o) : void 0;
  })(r, e, t);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ve = (r, e, t) => (t.configurable = !0, t.enumerable = !0, Reflect.decorate && typeof e != "object" && Object.defineProperty(r, e, t), t);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function ee(r, e) {
  return (t, s, i) => {
    const o = (n) => {
      var h;
      return ((h = n.renderRoot) == null ? void 0 : h.querySelector(r)) ?? null;
    };
    return Ve(t, s, { get() {
      return o(this);
    } });
  };
}
const we = j`
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
j`
  * {
    box-sizing: border-box;
  }
`;
const Ge = j`
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
`, We = j`
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
`;
function K(r) {
  return r != null && `${r}` != "false";
}
function Z(r, e = null) {
  return isNaN(parseFloat(r)) || isNaN(Number(r)) ? e : Number(r);
}
var qe = Object.defineProperty, Ke = Object.getOwnPropertyDescriptor, b = (r, e, t, s) => {
  for (var i = s > 1 ? void 0 : s ? Ke(e, t) : e, o = r.length - 1, n; o >= 0; o--)
    (n = r[o]) && (i = (s ? n(e, t, i) : n(i)) || i);
  return s && i && qe(e, t, i), i;
};
let Ze = 0;
const pe = "swim-radio", te = class te extends k {
  constructor() {
    super(...arguments), this.id = `swim-radio-${++Ze}`, this.name = "", this.radioId = "", this._tabindex = 0, this._checked = !1, this.value = "", this._disabled = !1, this.groupDisabled = !1, this.isInGroup = !1;
  }
  get tabindex() {
    return this._tabindex;
  }
  set tabindex(e) {
    this._tabindex = Z(e, 0);
  }
  get checked() {
    return this._checked;
  }
  set checked(e) {
    const t = K(e);
    this._checked !== t && (this._checked = t);
  }
  get disabled() {
    return this._disabled || this.groupDisabled;
  }
  set disabled(e) {
    this._disabled = K(e);
  }
  get _effectiveTabindex() {
    return this.disabled || this.isInGroup ? -1 : this._tabindex;
  }
  get _inputId() {
    return this.radioId || `${this.id}-radio`;
  }
  focus(e) {
    var t;
    (t = this._roving) == null || t.focus(e);
  }
  _onClick(e) {
    e.preventDefault(), !this.disabled && this._select();
  }
  _onKeydown(e) {
    e.key !== " " || this.disabled || (e.stopPropagation(), e.preventDefault(), this._select());
  }
  /** Select this radio. In a group only "select" (set checked); standalone can toggle. */
  _select() {
    if (this.isInGroup) {
      if (this._checked) return;
      this.checked = !0;
    } else
      this.checked = !this._checked;
    this._checked && this.dispatchEvent(
      new CustomEvent("change", {
        detail: this.value,
        bubbles: !0,
        composed: !0
      })
    );
  }
  _onInputChange(e) {
    this.checked = !0, this.dispatchEvent(
      new CustomEvent("change", {
        detail: this.value,
        bubbles: !0,
        composed: !0
      })
    );
  }
  _onFocus(e) {
    this.dispatchEvent(new FocusEvent("focus", { ...e, bubbles: !0, composed: !0 }));
  }
  _onBlur(e) {
    this.dispatchEvent(new FocusEvent("blur", { ...e, bubbles: !0, composed: !0 }));
  }
  render() {
    const e = `${this.id}-content`;
    return ye`
      <label
        class="swim-radio__label swim-radio__roving"
        for="${this._inputId}"
        tabindex="${this._effectiveTabindex}"
        role="radio"
        aria-checked="${this._checked}"
        aria-disabled="${this.disabled ? "true" : "false"}"
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
          name="${this.name || this.id}"
          aria-checked="${this._checked}"
          @change="${this._onInputChange}"
          @focus="${this._onFocus}"
          @blur="${this._onBlur}"
        />
        <span
          part="checkmark"
          class="swim-radio__checkmark ${this._checked ? "swim-radio__checkmark--checked" : ""}"
        ></span>
        <div part="content" class="swim-radio__content" id="${e}">
          <slot></slot>
        </div>
      </label>
    `;
  }
};
te.styles = [we, Ge];
let _ = te;
b([
  ee(".swim-radio__roving")
], _.prototype, "_roving", 2);
b([
  p({ type: String })
], _.prototype, "id", 2);
b([
  p({ type: String })
], _.prototype, "name", 2);
b([
  p({ type: String, attribute: "radio-id" })
], _.prototype, "radioId", 2);
b([
  p({ type: Number })
], _.prototype, "tabindex", 1);
b([
  p({ type: Boolean, reflect: !0 })
], _.prototype, "checked", 1);
b([
  p({ type: String })
], _.prototype, "value", 2);
b([
  p({ type: Boolean, reflect: !0 })
], _.prototype, "disabled", 1);
b([
  p({ type: Boolean, attribute: !1 })
], _.prototype, "groupDisabled", 2);
b([
  p({ type: Boolean, attribute: !1 })
], _.prototype, "isInGroup", 2);
customElements.get(pe) || customElements.define(pe, _);
var Je = Object.defineProperty, Qe = Object.getOwnPropertyDescriptor, v = (r, e, t, s) => {
  for (var i = s > 1 ? void 0 : s ? Qe(e, t) : e, o = r.length - 1, n; o >= 0; o--)
    (n = r[o]) && (i = (s ? n(e, t, i) : n(i)) || i);
  return s && i && Je(e, t, i), i;
};
let Xe = 0;
function Ye(r, e) {
  return (r % e + e) % e;
}
const _e = "swim-radio-group", L = class L extends k {
  constructor() {
    super(), this.id = `swim-radio-group-${++Xe}`, this._disabled = !1, this._value = "", this.name = "", this._focusIndex = -1, this._tabindex = 0, this._radios = [], this._changeHandler = (e) => this._onRadioChange(e), this._slotChangeBound = () => this._syncRadios(), this._onGroupFocus = (e) => {
      if (e.target !== this._slotWrapper) return;
      const t = this._radios.find((s) => s.checked);
      t ? (this._focusIndex = this._radios.indexOf(t), this._focusOn(this._focusIndex)) : this._focusFirst();
    }, this._onGroupBlur = () => {
      this.dispatchEvent(new FocusEvent("blur", { bubbles: !0, composed: !0 }));
    }, this._internals = this.attachInternals();
  }
  get disabled() {
    return this._disabled;
  }
  set disabled(e) {
    this._disabled = K(e), this._updateRadioDisabledState();
  }
  get value() {
    return this._value;
  }
  set value(e) {
    var t;
    this._value !== e && (this._value = e, this._updateSelectedFromValue(), (t = this._internals) == null || t.setFormValue(String(this._value)));
  }
  get focusIndex() {
    return this._focusIndex;
  }
  set focusIndex(e) {
    this._focusIndex = Z(e, -1), this._focusOn(this._focusIndex);
  }
  get tabindex() {
    return this.disabled ? -1 : this._tabindex;
  }
  set tabindex(e) {
    this._tabindex = Z(e, 0);
  }
  connectedCallback() {
    super.connectedCallback(), this.addEventListener("change", this._changeHandler), this.addEventListener("focus", this._onGroupFocus), this.addEventListener("blur", this._onGroupBlur);
  }
  disconnectedCallback() {
    var e;
    (e = this._slot) == null || e.removeEventListener("slotchange", this._slotChangeBound), this.removeEventListener("change", this._changeHandler), this.removeEventListener("focus", this._onGroupFocus), this.removeEventListener("blur", this._onGroupBlur), super.disconnectedCallback();
  }
  firstUpdated() {
    var e;
    (e = this._slot) == null || e.addEventListener("slotchange", this._slotChangeBound), this._syncRadios();
  }
  updated(e) {
    super.updated(e), (e.has("value") || e.has("name") || e.has("disabled")) && (this._updateSelectedFromValue(), this._updateRadioDisabledState(), this._updateRadioNames());
  }
  _syncRadios() {
    var s;
    const e = this._slot, t = ((s = e == null ? void 0 : e.assignedElements) == null ? void 0 : s.call(e)) ?? [];
    this._radios = t.filter(
      (i) => {
        var o;
        return i instanceof HTMLElement && ((o = i.tagName) == null ? void 0 : o.toLowerCase()) === "swim-radio";
      }
    ), this._updateRadioNames(), this._updateRadioDisabledState(), this._updateSelectedFromValue();
  }
  _updateRadioNames() {
    const e = this.name || this.id;
    this._radios.forEach((t) => {
      t.name = e, t.isInGroup = !0;
    });
  }
  _updateRadioDisabledState() {
    this._radios.forEach((e) => {
      e.groupDisabled = this._disabled;
    });
  }
  _updateSelectedFromValue() {
    this._radios.forEach((e) => {
      e.checked = this._value === e.value;
    });
  }
  _onRadioChange(e) {
    var i;
    const t = e.target;
    if (!t || ((i = t.tagName) == null ? void 0 : i.toLowerCase()) !== "swim-radio") return;
    const s = e.detail;
    this._value !== s && (this._value = s, this._updateSelectedFromValue(), this._internals.setFormValue(String(this._value)), this.dispatchEvent(
      new CustomEvent("change", {
        detail: this._value,
        bubbles: !0,
        composed: !0
      })
    ));
  }
  _focusFirst() {
    if (!(this.disabled || !this._radios.length)) {
      for (let e = 0; e < this._radios.length; e++)
        if (!this._radios[e].disabled) {
          this._focusIndex = e, this._focusOn(e);
          return;
        }
    }
  }
  _focusOn(e) {
    this.disabled || e < 0 || e >= this._radios.length || this._radios[e].focus();
  }
  _selectIndex(e) {
    if (this.disabled || e < 0 || e >= this._radios.length) return;
    const t = this._radios[e];
    t.disabled || (this.value = t.value);
  }
  _focusIn(e) {
    if (this.disabled || !this._radios.length) return;
    const t = this._radios.length;
    for (let s = 1; s <= t; s++) {
      const i = Ye(this._focusIndex + e * s, t);
      if (!this._radios[i].disabled) {
        this._focusIndex = i, this._focusOn(i);
        return;
      }
    }
  }
  _onKeydown(e) {
    switch (e.key) {
      case "ArrowLeft":
      case "ArrowUp":
        e.preventDefault(), e.stopPropagation(), this._focusIn(-1), this._selectIndex(this._focusIndex);
        break;
      case "ArrowRight":
      case "ArrowDown":
        e.preventDefault(), e.stopPropagation(), this._focusIn(1), this._selectIndex(this._focusIndex);
        break;
    }
  }
  render() {
    return ye`
      <div
        class="swim-radio-group__slot"
        role="radiogroup"
        tabindex="${this.tabindex}"
        aria-disabled="${this.disabled ? "true" : "false"}"
        @keydown="${this._onKeydown}"
      >
        <slot></slot>
      </div>
    `;
  }
};
L.styles = [we, We], L.formAssociated = !0;
let g = L;
v([
  ee("slot")
], g.prototype, "_slot", 2);
v([
  ee(".swim-radio-group__slot")
], g.prototype, "_slotWrapper", 2);
v([
  p({ type: String })
], g.prototype, "id", 2);
v([
  p({ type: Boolean, reflect: !0 })
], g.prototype, "disabled", 1);
v([
  p({ type: String })
], g.prototype, "value", 1);
v([
  p({ type: String })
], g.prototype, "name", 2);
v([
  p({ type: Number })
], g.prototype, "focusIndex", 1);
v([
  p({ type: Number })
], g.prototype, "tabindex", 1);
customElements.get(_e) || customElements.define(_e, g);
export {
  _ as SwimRadio,
  g as SwimRadioGroup
};
