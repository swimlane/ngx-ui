/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const D = globalThis, G = D.ShadowRoot && (D.ShadyCSS === void 0 || D.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, K = Symbol(), Y = /* @__PURE__ */ new WeakMap();
let pe = class {
  constructor(e, t, s) {
    if (this._$cssResult$ = !0, s !== K) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (G && e === void 0) {
      const s = t !== void 0 && t.length === 1;
      s && (e = Y.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), s && Y.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const fe = (r) => new pe(typeof r == "string" ? r : r + "", void 0, K), Z = (r, ...e) => {
  const t = r.length === 1 ? r[0] : e.reduce((s, i, o) => s + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + r[o + 1], r[0]);
  return new pe(t, r, K);
}, $e = (r, e) => {
  if (G) r.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const s = document.createElement("style"), i = D.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = t.cssText, r.appendChild(s);
  }
}, ee = G ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const s of e.cssRules) t += s.cssText;
  return fe(t);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: me, defineProperty: ye, getOwnPropertyDescriptor: xe, getOwnPropertyNames: ve, getOwnPropertySymbols: we, getPrototypeOf: Ae } = Object, $ = globalThis, te = $.trustedTypes, Ee = te ? te.emptyScript : "", L = $.reactiveElementPolyfillSupport, k = (r, e) => r, I = { toAttribute(r, e) {
  switch (e) {
    case Boolean:
      r = r ? Ee : null;
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
} }, J = (r, e) => !me(r, e), se = { attribute: !0, type: String, converter: I, reflect: !1, useDefault: !1, hasChanged: J };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), $.litPropertyMetadata ?? ($.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let A = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = se) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(e, s, t);
      i !== void 0 && ye(this.prototype, e, i);
    }
  }
  static getPropertyDescriptor(e, t, s) {
    const { get: i, set: o } = xe(this.prototype, e) ?? { get() {
      return this[t];
    }, set(n) {
      this[t] = n;
    } };
    return { get: i, set(n) {
      const l = i == null ? void 0 : i.call(this);
      o == null || o.call(this, n), this.requestUpdate(e, l, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? se;
  }
  static _$Ei() {
    if (this.hasOwnProperty(k("elementProperties"))) return;
    const e = Ae(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(k("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(k("properties"))) {
      const t = this.properties, s = [...ve(t), ...we(t)];
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
      for (const i of s) t.unshift(ee(i));
    } else e !== void 0 && t.push(ee(e));
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
    return $e(e, this.constructor.elementStyles), e;
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
      const n = (((o = s.converter) == null ? void 0 : o.toAttribute) !== void 0 ? s.converter : I).toAttribute(t, s.type);
      this._$Em = e, n == null ? this.removeAttribute(i) : this.setAttribute(i, n), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var o, n;
    const s = this.constructor, i = s._$Eh.get(e);
    if (i !== void 0 && this._$Em !== i) {
      const l = s.getPropertyOptions(i), a = typeof l.converter == "function" ? { fromAttribute: l.converter } : ((o = l.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? l.converter : I;
      this._$Em = i;
      const c = a.fromAttribute(t, l.type);
      this[i] = c ?? ((n = this._$Ej) == null ? void 0 : n.get(i)) ?? c, this._$Em = null;
    }
  }
  requestUpdate(e, t, s, i = !1, o) {
    var n;
    if (e !== void 0) {
      const l = this.constructor;
      if (i === !1 && (o = this[e]), s ?? (s = l.getPropertyOptions(e)), !((s.hasChanged ?? J)(o, t) || s.useDefault && s.reflect && o === ((n = this._$Ej) == null ? void 0 : n.get(e)) && !this.hasAttribute(l._$Eu(e, s)))) return;
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
        const { wrapped: l } = n, a = this[o];
        l !== !0 || this._$AL.has(o) || a === void 0 || this.C(o, void 0, n, a);
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
A.elementStyles = [], A.shadowRootOptions = { mode: "open" }, A[k("elementProperties")] = /* @__PURE__ */ new Map(), A[k("finalized")] = /* @__PURE__ */ new Map(), L == null || L({ ReactiveElement: A }), ($.reactiveElementVersions ?? ($.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const P = globalThis, ie = (r) => r, j = P.trustedTypes, re = j ? j.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, ge = "$lit$", f = `lit$${Math.random().toFixed(9).slice(2)}$`, ue = "?" + f, Se = `<${ue}>`, w = document, U = () => w.createComment(""), N = (r) => r === null || typeof r != "object" && typeof r != "function", X = Array.isArray, Ce = (r) => X(r) || typeof (r == null ? void 0 : r[Symbol.iterator]) == "function", F = `[ 	
\f\r]`, C = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ne = /-->/g, oe = />/g, y = RegExp(`>|${F}(?:([^\\s"'>=/]+)(${F}*=${F}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ae = /'/g, le = /"/g, be = /^(?:script|style|textarea|title)$/i, ke = (r) => (e, ...t) => ({ _$litType$: r, strings: e, values: t }), H = ke(1), E = Symbol.for("lit-noChange"), d = Symbol.for("lit-nothing"), he = /* @__PURE__ */ new WeakMap(), x = w.createTreeWalker(w, 129);
function _e(r, e) {
  if (!X(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return re !== void 0 ? re.createHTML(e) : e;
}
const Pe = (r, e) => {
  const t = r.length - 1, s = [];
  let i, o = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", n = C;
  for (let l = 0; l < t; l++) {
    const a = r[l];
    let c, p, h = -1, u = 0;
    for (; u < a.length && (n.lastIndex = u, p = n.exec(a), p !== null); ) u = n.lastIndex, n === C ? p[1] === "!--" ? n = ne : p[1] !== void 0 ? n = oe : p[2] !== void 0 ? (be.test(p[2]) && (i = RegExp("</" + p[2], "g")), n = y) : p[3] !== void 0 && (n = y) : n === y ? p[0] === ">" ? (n = i ?? C, h = -1) : p[1] === void 0 ? h = -2 : (h = n.lastIndex - p[2].length, c = p[1], n = p[3] === void 0 ? y : p[3] === '"' ? le : ae) : n === le || n === ae ? n = y : n === ne || n === oe ? n = C : (n = y, i = void 0);
    const _ = n === y && r[l + 1].startsWith("/>") ? " " : "";
    o += n === C ? a + Se : h >= 0 ? (s.push(c), a.slice(0, h) + ge + a.slice(h) + f + _) : a + f + (h === -2 ? l : _);
  }
  return [_e(r, o + (r[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), s];
};
class M {
  constructor({ strings: e, _$litType$: t }, s) {
    let i;
    this.parts = [];
    let o = 0, n = 0;
    const l = e.length - 1, a = this.parts, [c, p] = Pe(e, t);
    if (this.el = M.createElement(c, s), x.currentNode = this.el.content, t === 2 || t === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (i = x.nextNode()) !== null && a.length < l; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const h of i.getAttributeNames()) if (h.endsWith(ge)) {
          const u = p[n++], _ = i.getAttribute(h).split(f), z = /([.?@])?(.*)/.exec(u);
          a.push({ type: 1, index: o, name: z[2], strings: _, ctor: z[1] === "." ? Ue : z[1] === "?" ? Ne : z[1] === "@" ? Me : q }), i.removeAttribute(h);
        } else h.startsWith(f) && (a.push({ type: 6, index: o }), i.removeAttribute(h));
        if (be.test(i.tagName)) {
          const h = i.textContent.split(f), u = h.length - 1;
          if (u > 0) {
            i.textContent = j ? j.emptyScript : "";
            for (let _ = 0; _ < u; _++) i.append(h[_], U()), x.nextNode(), a.push({ type: 2, index: ++o });
            i.append(h[u], U());
          }
        }
      } else if (i.nodeType === 8) if (i.data === ue) a.push({ type: 2, index: o });
      else {
        let h = -1;
        for (; (h = i.data.indexOf(f, h + 1)) !== -1; ) a.push({ type: 7, index: o }), h += f.length - 1;
      }
      o++;
    }
  }
  static createElement(e, t) {
    const s = w.createElement("template");
    return s.innerHTML = e, s;
  }
}
function S(r, e, t = r, s) {
  var n, l;
  if (e === E) return e;
  let i = s !== void 0 ? (n = t._$Co) == null ? void 0 : n[s] : t._$Cl;
  const o = N(e) ? void 0 : e._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== o && ((l = i == null ? void 0 : i._$AO) == null || l.call(i, !1), o === void 0 ? i = void 0 : (i = new o(r), i._$AT(r, t, s)), s !== void 0 ? (t._$Co ?? (t._$Co = []))[s] = i : t._$Cl = i), i !== void 0 && (e = S(r, i._$AS(r, e.values), i, s)), e;
}
class Oe {
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
    const { el: { content: t }, parts: s } = this._$AD, i = ((e == null ? void 0 : e.creationScope) ?? w).importNode(t, !0);
    x.currentNode = i;
    let o = x.nextNode(), n = 0, l = 0, a = s[0];
    for (; a !== void 0; ) {
      if (n === a.index) {
        let c;
        a.type === 2 ? c = new T(o, o.nextSibling, this, e) : a.type === 1 ? c = new a.ctor(o, a.name, a.strings, this, e) : a.type === 6 && (c = new Te(o, this, e)), this._$AV.push(c), a = s[++l];
      }
      n !== (a == null ? void 0 : a.index) && (o = x.nextNode(), n++);
    }
    return x.currentNode = w, i;
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
    this.type = 2, this._$AH = d, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = s, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
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
    e = S(this, e, t), N(e) ? e === d || e == null || e === "" ? (this._$AH !== d && this._$AR(), this._$AH = d) : e !== this._$AH && e !== E && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Ce(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== d && N(this._$AH) ? this._$AA.nextSibling.data = e : this.T(w.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var o;
    const { values: t, _$litType$: s } = e, i = typeof s == "number" ? this._$AC(e) : (s.el === void 0 && (s.el = M.createElement(_e(s.h, s.h[0]), this.options)), s);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === i) this._$AH.p(t);
    else {
      const n = new Oe(i, this), l = n.u(this.options);
      n.p(t), this.T(l), this._$AH = n;
    }
  }
  _$AC(e) {
    let t = he.get(e.strings);
    return t === void 0 && he.set(e.strings, t = new M(e)), t;
  }
  k(e) {
    X(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let s, i = 0;
    for (const o of e) i === t.length ? t.push(s = new T(this.O(U()), this.O(U()), this, this.options)) : s = t[i], s._$AI(o), i++;
    i < t.length && (this._$AR(s && s._$AB.nextSibling, i), t.length = i);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, t); e !== this._$AB; ) {
      const i = ie(e).nextSibling;
      ie(e).remove(), e = i;
    }
  }
  setConnected(e) {
    var t;
    this._$AM === void 0 && (this._$Cv = e, (t = this._$AP) == null || t.call(this, e));
  }
}
class q {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, s, i, o) {
    this.type = 1, this._$AH = d, this._$AN = void 0, this.element = e, this.name = t, this._$AM = i, this.options = o, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = d;
  }
  _$AI(e, t = this, s, i) {
    const o = this.strings;
    let n = !1;
    if (o === void 0) e = S(this, e, t, 0), n = !N(e) || e !== this._$AH && e !== E, n && (this._$AH = e);
    else {
      const l = e;
      let a, c;
      for (e = o[0], a = 0; a < o.length - 1; a++) c = S(this, l[s + a], t, a), c === E && (c = this._$AH[a]), n || (n = !N(c) || c !== this._$AH[a]), c === d ? e = d : e !== d && (e += (c ?? "") + o[a + 1]), this._$AH[a] = c;
    }
    n && !i && this.j(e);
  }
  j(e) {
    e === d ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Ue extends q {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === d ? void 0 : e;
  }
}
class Ne extends q {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== d);
  }
}
class Me extends q {
  constructor(e, t, s, i, o) {
    super(e, t, s, i, o), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = S(this, e, t, 0) ?? d) === E) return;
    const s = this._$AH, i = e === d && s !== d || e.capture !== s.capture || e.once !== s.once || e.passive !== s.passive, o = e !== d && (s === d || i);
    i && this.element.removeEventListener(this.name, this, s), o && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t;
    typeof this._$AH == "function" ? this._$AH.call(((t = this.options) == null ? void 0 : t.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Te {
  constructor(e, t, s) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    S(this, e);
  }
}
const V = P.litHtmlPolyfillSupport;
V == null || V(M, T), (P.litHtmlVersions ?? (P.litHtmlVersions = [])).push("3.3.2");
const ze = (r, e, t) => {
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
const v = globalThis;
class O extends A {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = ze(t, this.renderRoot, this.renderOptions);
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
    return E;
  }
}
var de;
O._$litElement$ = !0, O.finalized = !0, (de = v.litElementHydrateSupport) == null || de.call(v, { LitElement: O });
const W = v.litElementPolyfillSupport;
W == null || W({ LitElement: O });
(v.litElementVersions ?? (v.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const He = { attribute: !0, type: String, converter: I, reflect: !1, hasChanged: J }, Re = (r = He, e, t) => {
  const { kind: s, metadata: i } = t;
  let o = globalThis.litPropertyMetadata.get(i);
  if (o === void 0 && globalThis.litPropertyMetadata.set(i, o = /* @__PURE__ */ new Map()), s === "setter" && ((r = Object.create(r)).wrapped = !0), o.set(t.name, r), s === "accessor") {
    const { name: n } = t;
    return { set(l) {
      const a = e.get.call(this);
      e.set.call(this, l), this.requestUpdate(n, a, r, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(n, void 0, r, l), l;
    } };
  }
  if (s === "setter") {
    const { name: n } = t;
    return function(l) {
      const a = this[n];
      e.call(this, l), this.requestUpdate(n, a, r, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function m(r) {
  return (e, t) => typeof t == "object" ? Re(r, e, t) : ((s, i, o) => {
    const n = i.hasOwnProperty(o);
    return i.constructor.createProperty(o, s), n ? Object.getOwnPropertyDescriptor(i, o) : void 0;
  })(r, e, t);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const De = (r, e, t) => (t.configurable = !0, t.enumerable = !0, Reflect.decorate && typeof e != "object" && Object.defineProperty(r, e, t), t);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Ie(r, e) {
  return (t, s, i) => {
    const o = (n) => {
      var l;
      return ((l = n.renderRoot) == null ? void 0 : l.querySelector(r)) ?? null;
    };
    return De(t, s, { get() {
      return o(this);
    } });
  };
}
const je = Z`
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
Z`
  * {
    box-sizing: border-box;
  }
`;
const Be = Z`
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
`;
function R(r) {
  return r != null && `${r}` != "false";
}
function qe(r, e = null) {
  return isNaN(parseFloat(r)) || isNaN(Number(r)) ? e : Number(r);
}
const Le = {
  fromAttribute: (r) => r !== "false",
  /** Omit attribute when true (default); set explicit `="false"` only when off. */
  toAttribute: (r) => r ? null : "false"
}, Q = {
  fromAttribute: (r) => r !== null && r !== "false" && r !== "0",
  /**
   * Use empty string when true so the boolean attribute is present; remove when false.
   * Serializing false as `attr="false"` leaves the attribute in the DOM, so selectors like
   * `[disabled]` / `[loading]` (common in resets and lazy-load styles) still match the host.
   */
  toAttribute: (r) => r ? "" : null
};
var Fe = Object.defineProperty, Ve = Object.getOwnPropertyDescriptor, b = (r, e, t, s) => {
  for (var i = s > 1 ? void 0 : s ? Ve(e, t) : e, o = r.length - 1, n; o >= 0; o--)
    (n = r[o]) && (i = (s ? n(e, t, i) : n(i)) || i);
  return s && i && Fe(e, t, i), i;
};
let We = 0;
const ce = "swim-toggle", B = class B extends O {
  constructor() {
    super(), this.id = `swim-toggle-${++We}`, this.name = "", this.label = "", this._checked = !1, this._disabled = !1, this._required = !1, this._showIcons = !0, this._tabindex = 0, this._internals = this.attachInternals();
  }
  get checked() {
    return this._checked;
  }
  set checked(e) {
    const t = R(e);
    this._checked !== t && (this._checked = t, this._syncFormValue());
  }
  get disabled() {
    return this._disabled;
  }
  set disabled(e) {
    this._disabled = R(e);
  }
  get required() {
    return this._required;
  }
  set required(e) {
    this._required = R(e);
  }
  get showIcons() {
    return this._showIcons;
  }
  set showIcons(e) {
    this._showIcons = e != null ? R(e) : !0;
  }
  get tabindex() {
    return this._tabindex;
  }
  set tabindex(e) {
    this._tabindex = qe(e, 0);
  }
  connectedCallback() {
    super.connectedCallback(), this._syncFormValue();
  }
  updated(e) {
    super.updated(e), (e.has("checked") || e.has("_checked")) && this._syncFormValue();
  }
  focus(e) {
    var t;
    (t = this._roving) == null || t.focus(e);
  }
  _syncFormValue() {
    var t;
    this._internals.setFormValue(this._checked ? "on" : ""), this.required && !this._checked ? this._internals.setValidity({ valueMissing: !0 }, "This field is required") : this._internals.setValidity({});
    const e = (t = this.shadowRoot) == null ? void 0 : t.querySelector(".swim-toggle__input");
    e && (e.checked = this._checked, e.required = this.required);
  }
  _onClick(e) {
    e.preventDefault(), !this.disabled && this._toggle();
  }
  _onKeydown(e) {
    e.key !== " " && e.key !== "Enter" || (e.preventDefault(), !this.disabled && this._toggle());
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
  _onInputChange(e) {
    const t = e.target;
    this._checked !== t.checked && (this._checked = t.checked, this.requestUpdate(), this._syncFormValue(), this._emitChange());
  }
  render() {
    const e = `${this.id}-text`;
    return H`
      <div class="swim-toggle">
        <input
          class="swim-toggle__input"
          type="checkbox"
          id="${this.id}"
          name="${this.name || void 0}"
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
          tabindex="${this.disabled ? -1 : this.tabindex}"
          aria-checked="${this._checked}"
          aria-disabled="${this.disabled ? "true" : "false"}"
          aria-labelledby="${e}"
          @click="${this._onClick}"
          @keydown="${this._onKeydown}"
          @focus="${this._onFocus}"
          @blur="${this._onBlur}"
        >
          <span class="swim-toggle__thumb" part="thumb"></span>
          ${this.showIcons ? this._checked ? H`<span class="swim-toggle__icon swim-toggle__icon--on" aria-hidden="true"
                  ><swim-icon font-icon="check"></swim-icon
                ></span>` : H`<span class="swim-toggle__icon swim-toggle__icon--off" aria-hidden="true"
                  ><swim-icon font-icon="x"></swim-icon
                ></span>` : ""}
        </div>
        <label class="swim-toggle__text" part="text" id="${e}" for="${this.id}">
          ${this.label ? H`<span>${this.label}</span>` : ""}
          <slot></slot>
        </label>
      </div>
    `;
  }
};
B.styles = [je, Be], B.formAssociated = !0;
let g = B;
b([
  Ie(".swim-toggle__roving")
], g.prototype, "_roving", 2);
b([
  m({ type: String })
], g.prototype, "id", 2);
b([
  m({ type: String })
], g.prototype, "name", 2);
b([
  m({ type: String })
], g.prototype, "label", 2);
b([
  m({ type: Boolean, reflect: !0, attribute: "checked", converter: Q })
], g.prototype, "checked", 1);
b([
  m({ type: Boolean, reflect: !0, converter: Q })
], g.prototype, "disabled", 1);
b([
  m({ type: Boolean, reflect: !0, converter: Q })
], g.prototype, "required", 1);
b([
  m({ type: Boolean, attribute: "show-icons", converter: Le })
], g.prototype, "showIcons", 1);
b([
  m({ type: Number })
], g.prototype, "tabindex", 1);
customElements.get(ce) || customElements.define(ce, g);
export {
  g as SwimToggle
};
