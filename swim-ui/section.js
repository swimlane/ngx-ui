/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const L = globalThis, X = L.ShadowRoot && (L.ShadyCSS === void 0 || L.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Q = Symbol(), ne = /* @__PURE__ */ new WeakMap();
let _e = class {
  constructor(e, t, i) {
    if (this._$cssResult$ = !0, i !== Q) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (X && e === void 0) {
      const i = t !== void 0 && t.length === 1;
      i && (e = ne.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && ne.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const ke = (n) => new _e(typeof n == "string" ? n : n + "", void 0, Q), z = (n, ...e) => {
  const t = n.length === 1 ? n[0] : e.reduce((i, o, s) => i + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + n[s + 1], n[0]);
  return new _e(t, n, Q);
}, Te = (n, e) => {
  if (X) n.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const i = document.createElement("style"), o = L.litNonce;
    o !== void 0 && i.setAttribute("nonce", o), i.textContent = t.cssText, n.appendChild(i);
  }
}, se = X ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const i of e.cssRules) t += i.cssText;
  return ke(t);
})(n) : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: ze, defineProperty: Pe, getOwnPropertyDescriptor: Oe, getOwnPropertyNames: He, getOwnPropertySymbols: Me, getPrototypeOf: Ue } = Object, y = globalThis, re = y.trustedTypes, Ne = re ? re.emptyScript : "", W = y.reactiveElementPolyfillSupport, O = (n, e) => n, B = { toAttribute(n, e) {
  switch (e) {
    case Boolean:
      n = n ? Ne : null;
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
} }, Y = (n, e) => !ze(n, e), ce = { attribute: !0, type: String, converter: B, reflect: !1, useDefault: !1, hasChanged: Y };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), y.litPropertyMetadata ?? (y.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let E = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = ce) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const i = Symbol(), o = this.getPropertyDescriptor(e, i, t);
      o !== void 0 && Pe(this.prototype, e, o);
    }
  }
  static getPropertyDescriptor(e, t, i) {
    const { get: o, set: s } = Oe(this.prototype, e) ?? { get() {
      return this[t];
    }, set(r) {
      this[t] = r;
    } };
    return { get: o, set(r) {
      const c = o == null ? void 0 : o.call(this);
      s == null || s.call(this, r), this.requestUpdate(e, c, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? ce;
  }
  static _$Ei() {
    if (this.hasOwnProperty(O("elementProperties"))) return;
    const e = Ue(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(O("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(O("properties"))) {
      const t = this.properties, i = [...He(t), ...Me(t)];
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
      for (const o of i) t.unshift(se(o));
    } else e !== void 0 && t.push(se(e));
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
    return Te(e, this.constructor.elementStyles), e;
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
    var s;
    const i = this.constructor.elementProperties.get(e), o = this.constructor._$Eu(e, i);
    if (o !== void 0 && i.reflect === !0) {
      const r = (((s = i.converter) == null ? void 0 : s.toAttribute) !== void 0 ? i.converter : B).toAttribute(t, i.type);
      this._$Em = e, r == null ? this.removeAttribute(o) : this.setAttribute(o, r), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var s, r;
    const i = this.constructor, o = i._$Eh.get(e);
    if (o !== void 0 && this._$Em !== o) {
      const c = i.getPropertyOptions(o), l = typeof c.converter == "function" ? { fromAttribute: c.converter } : ((s = c.converter) == null ? void 0 : s.fromAttribute) !== void 0 ? c.converter : B;
      this._$Em = o;
      const d = l.fromAttribute(t, c.type);
      this[o] = d ?? ((r = this._$Ej) == null ? void 0 : r.get(o)) ?? d, this._$Em = null;
    }
  }
  requestUpdate(e, t, i) {
    var o;
    if (e !== void 0) {
      const s = this.constructor, r = this[e];
      if (i ?? (i = s.getPropertyOptions(e)), !((i.hasChanged ?? Y)(r, t) || i.useDefault && i.reflect && r === ((o = this._$Ej) == null ? void 0 : o.get(e)) && !this.hasAttribute(s._$Eu(e, i)))) return;
      this.C(e, t, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: i, reflect: o, wrapped: s }, r) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, r ?? t ?? this[e]), s !== !0 || r !== void 0) || (this._$AL.has(e) || (this.hasUpdated || i || (t = void 0), this._$AL.set(e, t)), o === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
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
        for (const [s, r] of this._$Ep) this[s] = r;
        this._$Ep = void 0;
      }
      const o = this.constructor.elementProperties;
      if (o.size > 0) for (const [s, r] of o) {
        const { wrapped: c } = r, l = this[s];
        c !== !0 || this._$AL.has(s) || l === void 0 || this.C(s, void 0, r, l);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), (i = this._$EO) == null || i.forEach((o) => {
        var s;
        return (s = o.hostUpdate) == null ? void 0 : s.call(o);
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
E.elementStyles = [], E.shadowRootOptions = { mode: "open" }, E[O("elementProperties")] = /* @__PURE__ */ new Map(), E[O("finalized")] = /* @__PURE__ */ new Map(), W == null || W({ ReactiveElement: E }), (y.reactiveElementVersions ?? (y.reactiveElementVersions = [])).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const H = globalThis, F = H.trustedTypes, le = F ? F.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, ye = "$lit$", _ = `lit$${Math.random().toFixed(9).slice(2)}$`, $e = "?" + _, Re = `<${$e}>`, S = document, M = () => S.createComment(""), U = (n) => n === null || typeof n != "object" && typeof n != "function", ee = Array.isArray, je = (n) => ee(n) || typeof (n == null ? void 0 : n[Symbol.iterator]) == "function", V = `[ 	
\f\r]`, P = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ae = /-->/g, be = />/g, v = RegExp(`>|${V}(?:([^\\s"'>=/]+)(${V}*=${V}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), de = /'/g, fe = /"/g, ve = /^(?:script|style|textarea|title)$/i, Ie = (n) => (e, ...t) => ({ _$litType$: n, strings: e, values: t }), u = Ie(1), k = Symbol.for("lit-noChange"), b = Symbol.for("lit-nothing"), he = /* @__PURE__ */ new WeakMap(), x = S.createTreeWalker(S, 129);
function xe(n, e) {
  if (!ee(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return le !== void 0 ? le.createHTML(e) : e;
}
const Le = (n, e) => {
  const t = n.length - 1, i = [];
  let o, s = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", r = P;
  for (let c = 0; c < t; c++) {
    const l = n[c];
    let d, f, a = -1, w = 0;
    for (; w < l.length && (r.lastIndex = w, f = r.exec(l), f !== null); ) w = r.lastIndex, r === P ? f[1] === "!--" ? r = ae : f[1] !== void 0 ? r = be : f[2] !== void 0 ? (ve.test(f[2]) && (o = RegExp("</" + f[2], "g")), r = v) : f[3] !== void 0 && (r = v) : r === v ? f[0] === ">" ? (r = o ?? P, a = -1) : f[1] === void 0 ? a = -2 : (a = r.lastIndex - f[2].length, d = f[1], r = f[3] === void 0 ? v : f[3] === '"' ? fe : de) : r === fe || r === de ? r = v : r === ae || r === be ? r = P : (r = v, o = void 0);
    const g = r === v && n[c + 1].startsWith("/>") ? " " : "";
    s += r === P ? l + Re : a >= 0 ? (i.push(d), l.slice(0, a) + ye + l.slice(a) + _ + g) : l + _ + (a === -2 ? c : g);
  }
  return [xe(n, s + (n[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class N {
  constructor({ strings: e, _$litType$: t }, i) {
    let o;
    this.parts = [];
    let s = 0, r = 0;
    const c = e.length - 1, l = this.parts, [d, f] = Le(e, t);
    if (this.el = N.createElement(d, i), x.currentNode = this.el.content, t === 2 || t === 3) {
      const a = this.el.content.firstChild;
      a.replaceWith(...a.childNodes);
    }
    for (; (o = x.nextNode()) !== null && l.length < c; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const a of o.getAttributeNames()) if (a.endsWith(ye)) {
          const w = f[r++], g = o.getAttribute(a).split(_), I = /([.?@])?(.*)/.exec(w);
          l.push({ type: 1, index: s, name: I[2], strings: g, ctor: I[1] === "." ? Be : I[1] === "?" ? Fe : I[1] === "@" ? qe : q }), o.removeAttribute(a);
        } else a.startsWith(_) && (l.push({ type: 6, index: s }), o.removeAttribute(a));
        if (ve.test(o.tagName)) {
          const a = o.textContent.split(_), w = a.length - 1;
          if (w > 0) {
            o.textContent = F ? F.emptyScript : "";
            for (let g = 0; g < w; g++) o.append(a[g], M()), x.nextNode(), l.push({ type: 2, index: ++s });
            o.append(a[w], M());
          }
        }
      } else if (o.nodeType === 8) if (o.data === $e) l.push({ type: 2, index: s });
      else {
        let a = -1;
        for (; (a = o.data.indexOf(_, a + 1)) !== -1; ) l.push({ type: 7, index: s }), a += _.length - 1;
      }
      s++;
    }
  }
  static createElement(e, t) {
    const i = S.createElement("template");
    return i.innerHTML = e, i;
  }
}
function T(n, e, t = n, i) {
  var r, c;
  if (e === k) return e;
  let o = i !== void 0 ? (r = t._$Co) == null ? void 0 : r[i] : t._$Cl;
  const s = U(e) ? void 0 : e._$litDirective$;
  return (o == null ? void 0 : o.constructor) !== s && ((c = o == null ? void 0 : o._$AO) == null || c.call(o, !1), s === void 0 ? o = void 0 : (o = new s(n), o._$AT(n, t, i)), i !== void 0 ? (t._$Co ?? (t._$Co = []))[i] = o : t._$Cl = o), o !== void 0 && (e = T(n, o._$AS(n, e.values), o, i)), e;
}
class De {
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
    x.currentNode = o;
    let s = x.nextNode(), r = 0, c = 0, l = i[0];
    for (; l !== void 0; ) {
      if (r === l.index) {
        let d;
        l.type === 2 ? d = new R(s, s.nextSibling, this, e) : l.type === 1 ? d = new l.ctor(s, l.name, l.strings, this, e) : l.type === 6 && (d = new We(s, this, e)), this._$AV.push(d), l = i[++c];
      }
      r !== (l == null ? void 0 : l.index) && (s = x.nextNode(), r++);
    }
    return x.currentNode = S, o;
  }
  p(e) {
    let t = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, t), t += i.strings.length - 2) : i._$AI(e[t])), t++;
  }
}
class R {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, t, i, o) {
    this.type = 2, this._$AH = b, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = i, this.options = o, this._$Cv = (o == null ? void 0 : o.isConnected) ?? !0;
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
    e = T(this, e, t), U(e) ? e === b || e == null || e === "" ? (this._$AH !== b && this._$AR(), this._$AH = b) : e !== this._$AH && e !== k && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : je(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== b && U(this._$AH) ? this._$AA.nextSibling.data = e : this.T(S.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var s;
    const { values: t, _$litType$: i } = e, o = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = N.createElement(xe(i.h, i.h[0]), this.options)), i);
    if (((s = this._$AH) == null ? void 0 : s._$AD) === o) this._$AH.p(t);
    else {
      const r = new De(o, this), c = r.u(this.options);
      r.p(t), this.T(c), this._$AH = r;
    }
  }
  _$AC(e) {
    let t = he.get(e.strings);
    return t === void 0 && he.set(e.strings, t = new N(e)), t;
  }
  k(e) {
    ee(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let i, o = 0;
    for (const s of e) o === t.length ? t.push(i = new R(this.O(M()), this.O(M()), this, this.options)) : i = t[o], i._$AI(s), o++;
    o < t.length && (this._$AR(i && i._$AB.nextSibling, o), t.length = o);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, t); e !== this._$AB; ) {
      const o = e.nextSibling;
      e.remove(), e = o;
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
  constructor(e, t, i, o, s) {
    this.type = 1, this._$AH = b, this._$AN = void 0, this.element = e, this.name = t, this._$AM = o, this.options = s, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = b;
  }
  _$AI(e, t = this, i, o) {
    const s = this.strings;
    let r = !1;
    if (s === void 0) e = T(this, e, t, 0), r = !U(e) || e !== this._$AH && e !== k, r && (this._$AH = e);
    else {
      const c = e;
      let l, d;
      for (e = s[0], l = 0; l < s.length - 1; l++) d = T(this, c[i + l], t, l), d === k && (d = this._$AH[l]), r || (r = !U(d) || d !== this._$AH[l]), d === b ? e = b : e !== b && (e += (d ?? "") + s[l + 1]), this._$AH[l] = d;
    }
    r && !o && this.j(e);
  }
  j(e) {
    e === b ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Be extends q {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === b ? void 0 : e;
  }
}
class Fe extends q {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== b);
  }
}
class qe extends q {
  constructor(e, t, i, o, s) {
    super(e, t, i, o, s), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = T(this, e, t, 0) ?? b) === k) return;
    const i = this._$AH, o = e === b && i !== b || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, s = e !== b && (i === b || o);
    o && this.element.removeEventListener(this.name, this, i), s && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t;
    typeof this._$AH == "function" ? this._$AH.call(((t = this.options) == null ? void 0 : t.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class We {
  constructor(e, t, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    T(this, e);
  }
}
const K = H.litHtmlPolyfillSupport;
K == null || K(N, R), (H.litHtmlVersions ?? (H.litHtmlVersions = [])).push("3.3.1");
const Ve = (n, e, t) => {
  const i = (t == null ? void 0 : t.renderBefore) ?? e;
  let o = i._$litPart$;
  if (o === void 0) {
    const s = (t == null ? void 0 : t.renderBefore) ?? null;
    i._$litPart$ = o = new R(e.insertBefore(M(), s), s, void 0, t ?? {});
  }
  return o._$AI(n), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const A = globalThis;
class C extends E {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Ve(t, this.renderRoot, this.renderOptions);
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
    return k;
  }
}
var ge;
C._$litElement$ = !0, C.finalized = !0, (ge = A.litElementHydrateSupport) == null || ge.call(A, { LitElement: C });
const G = A.litElementPolyfillSupport;
G == null || G({ LitElement: C });
(A.litElementVersions ?? (A.litElementVersions = [])).push("4.2.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ke = { attribute: !0, type: String, converter: B, reflect: !1, hasChanged: Y }, Ge = (n = Ke, e, t) => {
  const { kind: i, metadata: o } = t;
  let s = globalThis.litPropertyMetadata.get(o);
  if (s === void 0 && globalThis.litPropertyMetadata.set(o, s = /* @__PURE__ */ new Map()), i === "setter" && ((n = Object.create(n)).wrapped = !0), s.set(t.name, n), i === "accessor") {
    const { name: r } = t;
    return { set(c) {
      const l = e.get.call(this);
      e.set.call(this, c), this.requestUpdate(r, l, n);
    }, init(c) {
      return c !== void 0 && this.C(r, void 0, n, c), c;
    } };
  }
  if (i === "setter") {
    const { name: r } = t;
    return function(c) {
      const l = this[r];
      e.call(this, c), this.requestUpdate(r, l, n);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function m(n) {
  return (e, t) => typeof t == "object" ? Ge(n, e, t) : ((i, o, s) => {
    const r = o.hasOwnProperty(s);
    return o.constructor.createProperty(s, i), r ? Object.getOwnPropertyDescriptor(o, s) : void 0;
  })(n, e, t);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Ae(n) {
  return m({ ...n, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Je = (n, e, t) => (t.configurable = !0, t.enumerable = !0, Reflect.decorate && typeof e != "object" && Object.defineProperty(n, e, t), t);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Ze(n, e) {
  return (t, i, o) => {
    const s = (r) => {
      var c;
      return ((c = r.renderRoot) == null ? void 0 : c.querySelector(n)) ?? null;
    };
    return Je(t, i, { get() {
      return s(this);
    } });
  };
}
const Ce = z`
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
z`
  * {
    box-sizing: border-box;
  }
`;
const Xe = z`
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
`, Qe = [Ce, Xe];
var Se = /* @__PURE__ */ ((n) => (n.Legacy = "legacy", n.Outline = "outline", n.Light = "light", n.Minimal = "minimal", n))(Se || {}), D = /* @__PURE__ */ ((n) => (n.Left = "left", n.Right = "right", n.None = "none", n))(D || {});
function J(n) {
  return n != null && `${n}` != "false";
}
const Ye = z`
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
`, et = z`
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

  ${Ye}
`, tt = (n) => `swim-icon ${n.trim().split(" ").map((t) => {
  const [i, o] = t.split(":");
  return i.length ? `${i} ${i}-${o}` : o;
}).join(" ")}`;
class it {
  constructor() {
    this._defaultFontSetClass = "lit", this._iconMap = /* @__PURE__ */ new Map();
  }
  setDefaultFontSetClass(e) {
    return this._defaultFontSetClass = e, this._defaultFontSetClass;
  }
  get(e, t) {
    return this.lookup(e, t).map((i) => tt(i));
  }
  lookup(e, t) {
    const i = t ?? this._defaultFontSetClass;
    return (Array.isArray(e) ? e : [e]).reduce((o, s) => {
      const r = this._expandKeys(s, i).map((c) => {
        const l = this._iconMap.get(c);
        return l && l.length === 1 ? l[0] : c;
      }).join(" ");
      return o.concat(this._iconMap.get(r) || [r]);
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
const ot = new it();
var nt = Object.defineProperty, j = (n, e, t, i) => {
  for (var o = void 0, s = n.length - 1, r; s >= 0; s--)
    (r = n[s]) && (o = r(e, t, o) || o);
  return o && nt(e, t, o), o;
};
const me = "swim-icon", te = class te extends C {
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
    this._cssClasses = ot.get(e, this.fontSet);
  }
  render() {
    var s;
    const e = this._cssClasses, t = !!this.alt, i = ((s = this.iconClass) == null ? void 0 : s.trim()) ?? "", o = i ? ` ${i}` : "";
    return !e || e.length === 0 ? u`
        <span
          part="icon"
          class="${i}"
          role="${t ? "img" : "presentation"}"
          aria-label="${t ? this.alt : b}"
          aria-hidden="${t ? "false" : "true"}"
        >
          <slot></slot>
        </span>
      ` : e.length === 1 ? u`
        <i
          part="icon"
          class="swim-icon__i ${e[0]}${o}"
          role="${t ? "img" : "presentation"}"
          aria-label="${t ? this.alt : b}"
          aria-hidden="${t ? "false" : "true"}"
        ></i>
      ` : u`
      <span
        class="swim-icon__stack"
        role="${t ? "img" : "presentation"}"
        aria-label="${t ? this.alt : b}"
        aria-hidden="${t ? "false" : "true"}"
      >
        ${e.map(
      (r, c) => u`<i part="icon icon-${c}" class="swim-icon__i swim-icon__i--${c} ${r}${o}"></i>`
    )}
      </span>
    `;
  }
};
te.styles = [Ce, et];
let $ = te;
j([
  m({ type: String, attribute: "font-icon" })
], $.prototype, "fontIcon");
j([
  m({ type: String })
], $.prototype, "alt");
j([
  m({ type: String, attribute: "font-set" })
], $.prototype, "fontSet");
j([
  m({ type: String, attribute: "icon-class" })
], $.prototype, "iconClass");
j([
  Ae()
], $.prototype, "_cssClasses");
customElements.get(me) || customElements.define(me, $);
var st = Object.defineProperty, rt = Object.getOwnPropertyDescriptor, p = (n, e, t, i) => {
  for (var o = i > 1 ? void 0 : i ? rt(e, t) : e, s = n.length - 1, r; s >= 0; s--)
    (r = n[s]) && (o = (i ? r(e, t, o) : r(o)) || o);
  return i && o && st(e, t, o), o;
};
const ct = {
  fromAttribute: (n) => n !== "false" && n !== "",
  toAttribute: (n) => n ? "true" : "false"
}, Ee = {
  fromAttribute: (n) => n !== null && n !== "false",
  toAttribute: (n) => n ? "true" : "false"
};
let pe = 0;
const we = "swim-section", ie = class ie extends C {
  constructor() {
    super(...arguments), this._id = `section-${++pe}`, this._sectionCollapsed = !1, this._sectionCollapsible = !0, this._headerToggle = !1, this.sectionTitle = "", this.padding = "1.8em", this.appearance = Se.Legacy, this.togglePosition = D.Left, this._hasHeaderSlot = !1, this._headerSlotChangeBound = () => this._checkHeaderSlot();
  }
  get id() {
    return this._id;
  }
  set id(e) {
    this._id = e || `section-${++pe}`;
  }
  get sectionCollapsed() {
    return this._sectionCollapsed;
  }
  set sectionCollapsed(e) {
    const t = e != null ? J(e) : !1;
    this._sectionCollapsed !== t && (this._sectionCollapsed = t);
  }
  get sectionCollapsible() {
    return this._sectionCollapsible;
  }
  set sectionCollapsible(e) {
    const t = e != null ? J(e) : !0;
    this._sectionCollapsible !== t && (this._sectionCollapsible = t);
  }
  get headerToggle() {
    return this._headerToggle;
  }
  set headerToggle(e) {
    const t = e != null ? J(e) : !1;
    this._headerToggle !== t && (this._headerToggle = t);
  }
  get _contentId() {
    return `${this.id}-content`;
  }
  firstUpdated() {
    var t, i;
    this._checkHeaderSlot();
    const e = ((i = (t = this.renderRoot) == null ? void 0 : t.querySelector) == null ? void 0 : i.call(t, 'slot[name="header"]')) ?? this._headerSlot;
    e && (this._headerSlotForCleanup = e, e.addEventListener("slotchange", this._headerSlotChangeBound));
  }
  disconnectedCallback() {
    this._headerSlotForCleanup && (this._headerSlotForCleanup.removeEventListener("slotchange", this._headerSlotChangeBound), this._headerSlotForCleanup = void 0), super.disconnectedCallback();
  }
  _checkHeaderSlot() {
    var t, i;
    const e = ((i = (t = this.renderRoot) == null ? void 0 : t.querySelector) == null ? void 0 : i.call(t, 'slot[name="header"]')) ?? this._headerSlot;
    if (e) {
      const s = e.assignedNodes({ flatten: !0 }).some(
        (r) => {
          var c;
          return r.nodeType === Node.ELEMENT_NODE || r.nodeType === Node.TEXT_NODE && (((c = r.textContent) == null ? void 0 : c.trim()) ?? "").length > 0;
        }
      );
      this._hasHeaderSlot !== s && (this._hasHeaderSlot = s);
    }
  }
  _headerIsEmpty() {
    var e;
    return !((e = this.sectionTitle) != null && e.trim()) && !this._hasHeaderSlot;
  }
  _onToggle(e) {
    if (e == null || e.stopPropagation(), !this.sectionCollapsible) return;
    const t = !this.sectionCollapsed;
    this.sectionCollapsed = t, this.dispatchEvent(
      new CustomEvent("toggle", {
        detail: t,
        bubbles: !0,
        composed: !0
      })
    );
  }
  _onHeaderKeydown(e) {
    e.key !== " " && e.key !== "Enter" || !this.headerToggle || !this.sectionCollapsible || (e.preventDefault(), this._onToggle(e));
  }
  _onHeaderClick() {
    this.headerToggle && this.sectionCollapsible && this._onToggle();
  }
  render() {
    var r;
    const e = this.sectionCollapsible, t = e && this.togglePosition !== D.None, i = this.togglePosition === D.Right, o = [
      "swim-section__header",
      this.sectionCollapsed ? "swim-section__header--collapsed" : "",
      e ? "swim-section__header--collapsible" : "",
      this.headerToggle ? "swim-section__header--header-toggle" : "",
      i ? "swim-section__header--toggle-right" : ""
    ].filter(Boolean).join(" "), s = this._headerIsEmpty();
    return u`
      <div class="swim-section__inner">
        <header
          class="${o}${s ? " swim-section__header--empty" : ""}"
          role="${this.headerToggle && e && !s ? "button" : "presentation"}"
          tabindex="${this.headerToggle && e && !s ? 0 : -1}"
          aria-expanded="${s ? void 0 : this.sectionCollapsed ? "false" : "true"}"
          aria-controls="${this._contentId}"
          @click="${this._onHeaderClick}"
          @keydown="${this._onHeaderKeydown}"
        >
          ${t && !s ? u`
                <button
                  type="button"
                  class="swim-section__toggle"
                  title="Toggle Content Visibility"
                  aria-controls="${this._contentId}"
                  aria-expanded="${this.sectionCollapsed ? "false" : "true"}"
                  @click="${this._onToggle}"
                  @keydown="${(c) => {
      (c.key === " " || c.key === "Enter") && (c.preventDefault(), this._onToggle(c));
    }}"
                >
                  <swim-icon
                    class="swim-section__toggle-icon"
                    font-icon="${this.sectionCollapsed ? "chevron-bold-right" : "chevron-bold-down"}"
                    aria-hidden="true"
                  ></swim-icon>
                </button>
              ` : b}
          <div class="swim-section__header-content">
            ${(r = this.sectionTitle) != null && r.trim() ? u`<h1 class="swim-section__header-title">${this.sectionTitle}</h1>` : b}
            <slot name="header"></slot>
          </div>
        </header>
        ${this.sectionCollapsed ? b : u`
              <div
                id="${this._contentId}"
                class="swim-section__content"
                style="padding: ${this.padding}"
                role="region"
                aria-labelledby="${s ? "" : void 0}"
              >
                <slot></slot>
              </div>
            `}
      </div>
    `;
  }
};
ie.styles = Qe;
let h = ie;
p([
  m({ type: String, reflect: !0 })
], h.prototype, "id", 1);
p([
  m({
    reflect: !0,
    attribute: "section-collapsed",
    converter: Ee
  })
], h.prototype, "sectionCollapsed", 1);
p([
  m({
    reflect: !0,
    attribute: "section-collapsible",
    converter: ct
  })
], h.prototype, "sectionCollapsible", 1);
p([
  m({
    reflect: !0,
    attribute: "header-toggle",
    converter: Ee
  })
], h.prototype, "headerToggle", 1);
p([
  m({ type: String, reflect: !0, attribute: "section-title" })
], h.prototype, "sectionTitle", 2);
p([
  m({ type: String })
], h.prototype, "padding", 2);
p([
  m({ type: String, reflect: !0 })
], h.prototype, "appearance", 2);
p([
  m({ type: String, reflect: !0, attribute: "toggle-position" })
], h.prototype, "togglePosition", 2);
p([
  Ae()
], h.prototype, "_hasHeaderSlot", 2);
p([
  Ze('slot[name="header"]')
], h.prototype, "_headerSlot", 2);
customElements.get(we) || customElements.define(we, h);
const lt = z`
  :host {
    display: contents;
  }
`, ue = "swim-section-header", oe = class oe extends C {
  render() {
    return u`<slot></slot>`;
  }
};
oe.styles = lt;
let Z = oe;
customElements.get(ue) || customElements.define(ue, Z);
export {
  Se as SectionAppearance,
  h as SwimSection,
  Z as SwimSectionHeader,
  D as TogglePosition
};
