/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const L = globalThis, ee = L.ShadowRoot && (L.ShadyCSS === void 0 || L.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, te = Symbol(), re = /* @__PURE__ */ new WeakMap();
let ye = class {
  constructor(e, t, i) {
    if (this._$cssResult$ = !0, i !== te) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (ee && e === void 0) {
      const i = t !== void 0 && t.length === 1;
      i && (e = re.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && re.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Se = (n) => new ye(typeof n == "string" ? n : n + "", void 0, te), R = (n, ...e) => {
  const t = n.length === 1 ? n[0] : e.reduce((i, o, s) => i + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + n[s + 1], n[0]);
  return new ye(t, n, te);
}, Ce = (n, e) => {
  if (ee) n.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const i = document.createElement("style"), o = L.litNonce;
    o !== void 0 && i.setAttribute("nonce", o), i.textContent = t.cssText, n.appendChild(i);
  }
}, se = ee ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const i of e.cssRules) t += i.cssText;
  return Se(t);
})(n) : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Te, defineProperty: ze, getOwnPropertyDescriptor: Pe, getOwnPropertyNames: Oe, getOwnPropertySymbols: Ue, getPrototypeOf: Re } = Object, x = globalThis, le = x.trustedTypes, Me = le ? le.emptyScript : "", J = x.reactiveElementPolyfillSupport, N = (n, e) => n, W = { toAttribute(n, e) {
  switch (e) {
    case Boolean:
      n = n ? Me : null;
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
} }, ie = (n, e) => !Te(n, e), ae = { attribute: !0, type: String, converter: W, reflect: !1, useDefault: !1, hasChanged: ie };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), x.litPropertyMetadata ?? (x.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let P = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = ae) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const i = Symbol(), o = this.getPropertyDescriptor(e, i, t);
      o !== void 0 && ze(this.prototype, e, o);
    }
  }
  static getPropertyDescriptor(e, t, i) {
    const { get: o, set: s } = Pe(this.prototype, e) ?? { get() {
      return this[t];
    }, set(r) {
      this[t] = r;
    } };
    return { get: o, set(r) {
      const a = o == null ? void 0 : o.call(this);
      s == null || s.call(this, r), this.requestUpdate(e, a, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? ae;
  }
  static _$Ei() {
    if (this.hasOwnProperty(N("elementProperties"))) return;
    const e = Re(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(N("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(N("properties"))) {
      const t = this.properties, i = [...Oe(t), ...Ue(t)];
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
    return Ce(e, this.constructor.elementStyles), e;
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
      const r = (((s = i.converter) == null ? void 0 : s.toAttribute) !== void 0 ? i.converter : W).toAttribute(t, i.type);
      this._$Em = e, r == null ? this.removeAttribute(o) : this.setAttribute(o, r), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var s, r;
    const i = this.constructor, o = i._$Eh.get(e);
    if (o !== void 0 && this._$Em !== o) {
      const a = i.getPropertyOptions(o), l = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((s = a.converter) == null ? void 0 : s.fromAttribute) !== void 0 ? a.converter : W;
      this._$Em = o;
      const f = l.fromAttribute(t, a.type);
      this[o] = f ?? ((r = this._$Ej) == null ? void 0 : r.get(o)) ?? f, this._$Em = null;
    }
  }
  requestUpdate(e, t, i) {
    var o;
    if (e !== void 0) {
      const s = this.constructor, r = this[e];
      if (i ?? (i = s.getPropertyOptions(e)), !((i.hasChanged ?? ie)(r, t) || i.useDefault && i.reflect && r === ((o = this._$Ej) == null ? void 0 : o.get(e)) && !this.hasAttribute(s._$Eu(e, i)))) return;
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
        const { wrapped: a } = r, l = this[s];
        a !== !0 || this._$AL.has(s) || l === void 0 || this.C(s, void 0, r, l);
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
P.elementStyles = [], P.shadowRootOptions = { mode: "open" }, P[N("elementProperties")] = /* @__PURE__ */ new Map(), P[N("finalized")] = /* @__PURE__ */ new Map(), J == null || J({ ReactiveElement: P }), (x.reactiveElementVersions ?? (x.reactiveElementVersions = [])).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const B = globalThis, G = B.trustedTypes, ce = G ? G.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, ve = "$lit$", $ = `lit$${Math.random().toFixed(9).slice(2)}$`, _e = "?" + $, He = `<${_e}>`, T = document, I = () => T.createComment(""), q = (n) => n === null || typeof n != "object" && typeof n != "function", oe = Array.isArray, Ne = (n) => oe(n) || typeof (n == null ? void 0 : n[Symbol.iterator]) == "function", Z = `[ 	
\f\r]`, H = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, be = /-->/g, he = />/g, k = RegExp(`>|${Z}(?:([^\\s"'>=/]+)(${Z}*=${Z}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), de = /'/g, me = /"/g, $e = /^(?:script|style|textarea|title)$/i, Be = (n) => (e, ...t) => ({ _$litType$: n, strings: e, values: t }), p = Be(1), w = Symbol.for("lit-noChange"), d = Symbol.for("lit-nothing"), fe = /* @__PURE__ */ new WeakMap(), S = T.createTreeWalker(T, 129);
function xe(n, e) {
  if (!oe(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ce !== void 0 ? ce.createHTML(e) : e;
}
const Ie = (n, e) => {
  const t = n.length - 1, i = [];
  let o, s = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", r = H;
  for (let a = 0; a < t; a++) {
    const l = n[a];
    let f, u, m = -1, g = 0;
    for (; g < l.length && (r.lastIndex = g, u = r.exec(l), u !== null); ) g = r.lastIndex, r === H ? u[1] === "!--" ? r = be : u[1] !== void 0 ? r = he : u[2] !== void 0 ? ($e.test(u[2]) && (o = RegExp("</" + u[2], "g")), r = k) : u[3] !== void 0 && (r = k) : r === k ? u[0] === ">" ? (r = o ?? H, m = -1) : u[1] === void 0 ? m = -2 : (m = r.lastIndex - u[2].length, f = u[1], r = u[3] === void 0 ? k : u[3] === '"' ? me : de) : r === me || r === de ? r = k : r === be || r === he ? r = H : (r = k, o = void 0);
    const v = r === k && n[a + 1].startsWith("/>") ? " " : "";
    s += r === H ? l + He : m >= 0 ? (i.push(f), l.slice(0, m) + ve + l.slice(m) + $ + v) : l + $ + (m === -2 ? a : v);
  }
  return [xe(n, s + (n[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class V {
  constructor({ strings: e, _$litType$: t }, i) {
    let o;
    this.parts = [];
    let s = 0, r = 0;
    const a = e.length - 1, l = this.parts, [f, u] = Ie(e, t);
    if (this.el = V.createElement(f, i), S.currentNode = this.el.content, t === 2 || t === 3) {
      const m = this.el.content.firstChild;
      m.replaceWith(...m.childNodes);
    }
    for (; (o = S.nextNode()) !== null && l.length < a; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const m of o.getAttributeNames()) if (m.endsWith(ve)) {
          const g = u[r++], v = o.getAttribute(m).split($), F = /([.?@])?(.*)/.exec(g);
          l.push({ type: 1, index: s, name: F[2], strings: v, ctor: F[1] === "." ? Ve : F[1] === "?" ? je : F[1] === "@" ? De : Y }), o.removeAttribute(m);
        } else m.startsWith($) && (l.push({ type: 6, index: s }), o.removeAttribute(m));
        if ($e.test(o.tagName)) {
          const m = o.textContent.split($), g = m.length - 1;
          if (g > 0) {
            o.textContent = G ? G.emptyScript : "";
            for (let v = 0; v < g; v++) o.append(m[v], I()), S.nextNode(), l.push({ type: 2, index: ++s });
            o.append(m[g], I());
          }
        }
      } else if (o.nodeType === 8) if (o.data === _e) l.push({ type: 2, index: s });
      else {
        let m = -1;
        for (; (m = o.data.indexOf($, m + 1)) !== -1; ) l.push({ type: 7, index: s }), m += $.length - 1;
      }
      s++;
    }
  }
  static createElement(e, t) {
    const i = T.createElement("template");
    return i.innerHTML = e, i;
  }
}
function U(n, e, t = n, i) {
  var r, a;
  if (e === w) return e;
  let o = i !== void 0 ? (r = t._$Co) == null ? void 0 : r[i] : t._$Cl;
  const s = q(e) ? void 0 : e._$litDirective$;
  return (o == null ? void 0 : o.constructor) !== s && ((a = o == null ? void 0 : o._$AO) == null || a.call(o, !1), s === void 0 ? o = void 0 : (o = new s(n), o._$AT(n, t, i)), i !== void 0 ? (t._$Co ?? (t._$Co = []))[i] = o : t._$Cl = o), o !== void 0 && (e = U(n, o._$AS(n, e.values), o, i)), e;
}
class qe {
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
    const { el: { content: t }, parts: i } = this._$AD, o = ((e == null ? void 0 : e.creationScope) ?? T).importNode(t, !0);
    S.currentNode = o;
    let s = S.nextNode(), r = 0, a = 0, l = i[0];
    for (; l !== void 0; ) {
      if (r === l.index) {
        let f;
        l.type === 2 ? f = new j(s, s.nextSibling, this, e) : l.type === 1 ? f = new l.ctor(s, l.name, l.strings, this, e) : l.type === 6 && (f = new Fe(s, this, e)), this._$AV.push(f), l = i[++a];
      }
      r !== (l == null ? void 0 : l.index) && (s = S.nextNode(), r++);
    }
    return S.currentNode = T, o;
  }
  p(e) {
    let t = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, t), t += i.strings.length - 2) : i._$AI(e[t])), t++;
  }
}
class j {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, t, i, o) {
    this.type = 2, this._$AH = d, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = i, this.options = o, this._$Cv = (o == null ? void 0 : o.isConnected) ?? !0;
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
    e = U(this, e, t), q(e) ? e === d || e == null || e === "" ? (this._$AH !== d && this._$AR(), this._$AH = d) : e !== this._$AH && e !== w && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Ne(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== d && q(this._$AH) ? this._$AA.nextSibling.data = e : this.T(T.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var s;
    const { values: t, _$litType$: i } = e, o = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = V.createElement(xe(i.h, i.h[0]), this.options)), i);
    if (((s = this._$AH) == null ? void 0 : s._$AD) === o) this._$AH.p(t);
    else {
      const r = new qe(o, this), a = r.u(this.options);
      r.p(t), this.T(a), this._$AH = r;
    }
  }
  _$AC(e) {
    let t = fe.get(e.strings);
    return t === void 0 && fe.set(e.strings, t = new V(e)), t;
  }
  k(e) {
    oe(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let i, o = 0;
    for (const s of e) o === t.length ? t.push(i = new j(this.O(I()), this.O(I()), this, this.options)) : i = t[o], i._$AI(s), o++;
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
class Y {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, i, o, s) {
    this.type = 1, this._$AH = d, this._$AN = void 0, this.element = e, this.name = t, this._$AM = o, this.options = s, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = d;
  }
  _$AI(e, t = this, i, o) {
    const s = this.strings;
    let r = !1;
    if (s === void 0) e = U(this, e, t, 0), r = !q(e) || e !== this._$AH && e !== w, r && (this._$AH = e);
    else {
      const a = e;
      let l, f;
      for (e = s[0], l = 0; l < s.length - 1; l++) f = U(this, a[i + l], t, l), f === w && (f = this._$AH[l]), r || (r = !q(f) || f !== this._$AH[l]), f === d ? e = d : e !== d && (e += (f ?? "") + s[l + 1]), this._$AH[l] = f;
    }
    r && !o && this.j(e);
  }
  j(e) {
    e === d ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Ve extends Y {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === d ? void 0 : e;
  }
}
class je extends Y {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== d);
  }
}
class De extends Y {
  constructor(e, t, i, o, s) {
    super(e, t, i, o, s), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = U(this, e, t, 0) ?? d) === w) return;
    const i = this._$AH, o = e === d && i !== d || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, s = e !== d && (i === d || o);
    o && this.element.removeEventListener(this.name, this, i), s && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t;
    typeof this._$AH == "function" ? this._$AH.call(((t = this.options) == null ? void 0 : t.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Fe {
  constructor(e, t, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    U(this, e);
  }
}
const Q = B.litHtmlPolyfillSupport;
Q == null || Q(V, j), (B.litHtmlVersions ?? (B.litHtmlVersions = [])).push("3.3.1");
const Le = (n, e, t) => {
  const i = (t == null ? void 0 : t.renderBefore) ?? e;
  let o = i._$litPart$;
  if (o === void 0) {
    const s = (t == null ? void 0 : t.renderBefore) ?? null;
    i._$litPart$ = o = new j(e.insertBefore(I(), s), s, void 0, t ?? {});
  }
  return o._$AI(n), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const C = globalThis;
let O = class extends P {
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
    return w;
  }
};
var ge;
O._$litElement$ = !0, O.finalized = !0, (ge = C.litElementHydrateSupport) == null || ge.call(C, { LitElement: O });
const X = C.litElementPolyfillSupport;
X == null || X({ LitElement: O });
(C.litElementVersions ?? (C.litElementVersions = [])).push("4.2.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const We = { attribute: !0, type: String, converter: W, reflect: !1, hasChanged: ie }, Ge = (n = We, e, t) => {
  const { kind: i, metadata: o } = t;
  let s = globalThis.litPropertyMetadata.get(o);
  if (s === void 0 && globalThis.litPropertyMetadata.set(o, s = /* @__PURE__ */ new Map()), i === "setter" && ((n = Object.create(n)).wrapped = !0), s.set(t.name, n), i === "accessor") {
    const { name: r } = t;
    return { set(a) {
      const l = e.get.call(this);
      e.set.call(this, a), this.requestUpdate(r, l, n);
    }, init(a) {
      return a !== void 0 && this.C(r, void 0, n, a), a;
    } };
  }
  if (i === "setter") {
    const { name: r } = t;
    return function(a) {
      const l = this[r];
      e.call(this, a), this.requestUpdate(r, l, n);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function h(n) {
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
function M(n) {
  return h({ ...n, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ke = (n, e, t) => (t.configurable = !0, t.enumerable = !0, Reflect.decorate && typeof e != "object" && Object.defineProperty(n, e, t), t);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Ye(n, e) {
  return (t, i, o) => {
    const s = (r) => {
      var a;
      return ((a = r.renderRoot) == null ? void 0 : a.querySelector(n)) ?? null;
    };
    return Ke(t, i, { get() {
      return s(this);
    } });
  };
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const z = { ATTRIBUTE: 1, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4 }, Je = (n) => (...e) => ({ _$litDirective$: n, values: e });
class Ze {
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
const Qe = (n) => n.strings === void 0, Xe = {}, et = (n, e = Xe) => n._$AH = e;
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ue = Je(class extends Ze {
  constructor(n) {
    if (super(n), n.type !== z.PROPERTY && n.type !== z.ATTRIBUTE && n.type !== z.BOOLEAN_ATTRIBUTE) throw Error("The `live` directive is not allowed on child or event bindings");
    if (!Qe(n)) throw Error("`live` bindings can only contain a single expression");
  }
  render(n) {
    return n;
  }
  update(n, [e]) {
    if (e === w || e === d) return e;
    const t = n.element, i = n.name;
    if (n.type === z.PROPERTY) {
      if (e === t[i]) return w;
    } else if (n.type === z.BOOLEAN_ATTRIBUTE) {
      if (!!e === t.hasAttribute(i)) return w;
    } else if (n.type === z.ATTRIBUTE && t.getAttribute(i) === e + "") return w;
    return et(n), e;
  }
});
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const _ = (n) => n ?? d, Ae = R`
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
R`
  * {
    box-sizing: border-box;
  }
`;
const tt = R`
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
  .swim-icon.lit-alert::before {
    content: '\\ea11';
  }
  .swim-icon.lit-app-store::before {
    content: '\\ea12';
  }
  .swim-icon.lit-app-workspaces::before {
    content: '\\ea13';
  }
  .swim-icon.lit-applet::before {
    content: '\\ea14';
  }
  .swim-icon.lit-applets::before {
    content: '\\ea15';
  }
  .swim-icon.lit-application::before {
    content: '\\ea16';
  }
  .swim-icon.lit-apps::before {
    content: '\\ea17';
  }
  .swim-icon.lit-area-chart::before {
    content: '\\ea18';
  }
  .swim-icon.lit-arrow-bold-circle-left::before {
    content: '\\ea19';
  }
  .swim-icon.lit-arrow-bold-circle-right::before {
    content: '\\ea1a';
  }
  .swim-icon.lit-arrow-bold-down::before {
    content: '\\ea1b';
  }
  .swim-icon.lit-arrow-bold-left::before {
    content: '\\ea1c';
  }
  .swim-icon.lit-arrow-bold-right::before {
    content: '\\ea1d';
  }
  .swim-icon.lit-arrow-bold-up::before {
    content: '\\ea1e';
  }
  .swim-icon.lit-arrow-down::before {
    content: '\\ea1f';
  }
  .swim-icon.lit-arrow-input::before {
    content: '\\ea20';
  }
  .swim-icon.lit-arrow-left::before {
    content: '\\ea21';
  }
  .swim-icon.lit-arrow-output::before {
    content: '\\ea22';
  }
  .swim-icon.lit-arrow-right::before {
    content: '\\ea23';
  }
  .swim-icon.lit-arrow-right-down-medium::before {
    content: '\\ea24';
  }
  .swim-icon.lit-arrow-right-medium::before {
    content: '\\ea25';
  }
  .swim-icon.lit-arrow-tail-left::before {
    content: '\\ea26';
  }
  .swim-icon.lit-arrow-tail-right::before {
    content: '\\ea27';
  }
  .swim-icon.lit-arrow-tail-solid-left::before {
    content: '\\ea28';
  }
  .swim-icon.lit-arrow-tail-solid-right::before {
    content: '\\ea29';
  }
  .swim-icon.lit-arrow-tail-subright::before {
    content: '\\ea2a';
  }
  .swim-icon.lit-arrow-up::before {
    content: '\\ea2b';
  }
  .swim-icon.lit-asset-outline::before {
    content: '\\ea2c';
  }
  .swim-icon.lit-asset-outline-small::before {
    content: '\\ea2d';
  }
  .swim-icon.lit-assets::before {
    content: '\\ea2e';
  }
  .swim-icon.lit-attachment::before {
    content: '\\ea2f';
  }
  .swim-icon.lit-automation::before {
    content: '\\ea30';
  }
  .swim-icon.lit-automation-alternate::before {
    content: '\\ea31';
  }
  .swim-icon.lit-back-arrow::before {
    content: '\\ea32';
  }
  .swim-icon.lit-back-arrow-filled::before {
    content: '\\ea33';
  }
  .swim-icon.lit-bars::before {
    content: '\\ea34';
  }
  .swim-icon.lit-bell::before {
    content: '\\ea35';
  }
  .swim-icon.lit-bell-alarm::before {
    content: '\\ea36';
  }
  .swim-icon.lit-bold::before {
    content: '\\ea37';
  }
  .swim-icon.lit-bolt::before {
    content: '\\ea38';
  }
  .swim-icon.lit-branch-node::before {
    content: '\\ea39';
  }
  .swim-icon.lit-branch-node-vert::before {
    content: '\\ea3a';
  }
  .swim-icon.lit-broom::before {
    content: '\\ea3b';
  }
  .swim-icon.lit-browser-size::before {
    content: '\\ea3c';
  }
  .swim-icon.lit-bug::before {
    content: '\\ea3d';
  }
  .swim-icon.lit-builder::before {
    content: '\\ea3e';
  }
  .swim-icon.lit-builder-outline::before {
    content: '\\ea3f';
  }
  .swim-icon.lit-button-push-outline::before {
    content: '\\ea40';
  }
  .swim-icon.lit-button-push-outline-large::before {
    content: '\\ea41';
  }
  .swim-icon.lit-button-push-outline-small::before {
    content: '\\ea42';
  }
  .swim-icon.lit-calendar::before {
    content: '\\ea43';
  }
  .swim-icon.lit-calendar-clock::before {
    content: '\\ea44';
  }
  .swim-icon.lit-calender-clock::before {
    content: '\\ea45';
  }
  .swim-icon.lit-cards::before {
    content: '\\ea46';
  }
  .swim-icon.lit-center-align::before {
    content: '\\ea47';
  }
  .swim-icon.lit-chart-area::before {
    content: '\\ea48';
  }
  .swim-icon.lit-chart-bar-bar::before {
    content: '\\ea49';
  }
  .swim-icon.lit-chart-bubble::before {
    content: '\\ea4a';
  }
  .swim-icon.lit-chart-donut::before {
    content: '\\ea4b';
  }
  .swim-icon.lit-chart-full-stacked-area::before {
    content: '\\ea4c';
  }
  .swim-icon.lit-chart-heat::before {
    content: '\\ea4d';
  }
  .swim-icon.lit-chart-horz-full-stack-bar::before {
    content: '\\ea4e';
  }
  .swim-icon.lit-chart-number-card::before {
    content: '\\ea4f';
  }
  .swim-icon.lit-chart-pie::before {
    content: '\\ea50';
  }
  .swim-icon.lit-chart-pie-grid::before {
    content: '\\ea51';
  }
  .swim-icon.lit-chart-scatter::before {
    content: '\\ea52';
  }
  .swim-icon.lit-chart-spider::before {
    content: '\\ea53';
  }
  .swim-icon.lit-chart-stacked-area::before {
    content: '\\ea54';
  }
  .swim-icon.lit-chart-vert-bar::before {
    content: '\\ea55';
  }
  .swim-icon.lit-chart-vert-bar2::before {
    content: '\\ea56';
  }
  .swim-icon.lit-chart-vert-stacked-bar::before {
    content: '\\ea57';
  }
  .swim-icon.lit-check::before {
    content: '\\ea58';
  }
  .swim-icon.lit-check-filled::before {
    content: '\\ea59';
  }
  .swim-icon.lit-check-filled-sm::before {
    content: '\\ea5a';
  }
  .swim-icon.lit-check-square-filled::before {
    content: '\\ea5b';
  }
  .swim-icon.lit-checklist::before {
    content: '\\ea5c';
  }
  .swim-icon.lit-chevron-bold-down::before {
    content: '\\ea5d';
  }
  .swim-icon.lit-chevron-bold-left::before {
    content: '\\ea5e';
  }
  .swim-icon.lit-chevron-bold-right::before {
    content: '\\ea5f';
  }
  .swim-icon.lit-chevron-bold-up::before {
    content: '\\ea60';
  }
  .swim-icon.lit-circle::before {
    content: '\\ea61';
  }
  .swim-icon.lit-circle-filled::before {
    content: '\\ea62';
  }
  .swim-icon.lit-circles::before {
    content: '\\ea63';
  }
  .swim-icon.lit-circuit-board::before {
    content: '\\ea64';
  }
  .swim-icon.lit-clipboard::before {
    content: '\\ea65';
  }
  .swim-icon.lit-clock::before {
    content: '\\ea66';
  }
  .swim-icon.lit-cloud-download::before {
    content: '\\ea67';
  }
  .swim-icon.lit-cloud-upload::before {
    content: '\\ea68';
  }
  .swim-icon.lit-code::before {
    content: '\\ea69';
  }
  .swim-icon.lit-cog::before {
    content: '\\ea6a';
  }
  .swim-icon.lit-collapse::before {
    content: '\\ea6b';
  }
  .swim-icon.lit-commandline::before {
    content: '\\ea6c';
  }
  .swim-icon.lit-comments::before {
    content: '\\ea6d';
  }
  .swim-icon.lit-component::before {
    content: '\\ea6e';
  }
  .swim-icon.lit-component-create::before {
    content: '\\ea6f';
  }
  .swim-icon.lit-condition::before {
    content: '\\ea70';
  }
  .swim-icon.lit-copy::before {
    content: '\\ea71';
  }
  .swim-icon.lit-copy-app::before {
    content: '\\ea72';
  }
  .swim-icon.lit-copy-filled::before {
    content: '\\ea73';
  }
  .swim-icon.lit-credit-card::before {
    content: '\\ea74';
  }
  .swim-icon.lit-dashboard::before {
    content: '\\ea75';
  }
  .swim-icon.lit-dashboard-outline::before {
    content: '\\ea76';
  }
  .swim-icon.lit-database::before {
    content: '\\ea77';
  }
  .swim-icon.lit-debug::before {
    content: '\\ea78';
  }
  .swim-icon.lit-devil::before {
    content: '\\ea79';
  }
  .swim-icon.lit-disable::before {
    content: '\\ea7a';
  }
  .swim-icon.lit-document::before {
    content: '\\ea7b';
  }
  .swim-icon.lit-documentation::before {
    content: '\\ea7c';
  }
  .swim-icon.lit-domain::before {
    content: '\\ea7d';
  }
  .swim-icon.lit-dots-horz::before {
    content: '\\ea7e';
  }
  .swim-icon.lit-dots-vert::before {
    content: '\\ea7f';
  }
  .swim-icon.lit-dots-vert-round::before {
    content: '\\ea80';
  }
  .swim-icon.lit-double-down::before {
    content: '\\ea81';
  }
  .swim-icon.lit-double-left::before {
    content: '\\ea82';
  }
  .swim-icon.lit-double-right::before {
    content: '\\ea83';
  }
  .swim-icon.lit-double-up::before {
    content: '\\ea84';
  }
  .swim-icon.lit-downgrade::before {
    content: '\\ea85';
  }
  .swim-icon.lit-downgrade-horizontal::before {
    content: '\\ea86';
  }
  .swim-icon.lit-download-outline::before {
    content: '\\ea87';
  }
  .swim-icon.lit-download-outline-large::before {
    content: '\\ea88';
  }
  .swim-icon.lit-download-outline-small::before {
    content: '\\ea89';
  }
  .swim-icon.lit-drag::before {
    content: '\\ea8a';
  }
  .swim-icon.lit-edit::before {
    content: '\\ea8b';
  }
  .swim-icon.lit-edit-app::before {
    content: '\\ea8c';
  }
  .swim-icon.lit-edit-outline::before {
    content: '\\ea8d';
  }
  .swim-icon.lit-edit-outline-large::before {
    content: '\\ea8e';
  }
  .swim-icon.lit-edit-outline-small::before {
    content: '\\ea8f';
  }
  .swim-icon.lit-email::before {
    content: '\\ea90';
  }
  .swim-icon.lit-enrich-small::before {
    content: '\\ea91';
  }
  .swim-icon.lit-escalate::before {
    content: '\\ea92';
  }
  .swim-icon.lit-events-outline::before {
    content: '\\ea93';
  }
  .swim-icon.lit-events-outline-small::before {
    content: '\\ea94';
  }
  .swim-icon.lit-expand::before {
    content: '\\ea95';
  }
  .swim-icon.lit-explore::before {
    content: '\\ea96';
  }
  .swim-icon.lit-export::before {
    content: '\\ea97';
  }
  .swim-icon.lit-export-filled::before {
    content: '\\ea98';
  }
  .swim-icon.lit-export-outline::before {
    content: '\\ea99';
  }
  .swim-icon.lit-export-outline-large::before {
    content: '\\ea9a';
  }
  .swim-icon.lit-export-outline-small::before {
    content: '\\ea9b';
  }
  .swim-icon.lit-eye::before {
    content: '\\ea9c';
  }
  .swim-icon.lit-eye-disabled::before {
    content: '\\ea9d';
  }
  .swim-icon.lit-eye-hidden::before {
    content: '\\ea9e';
  }
  .swim-icon.lit-field-created-by::before {
    content: '\\ea9f';
  }
  .swim-icon.lit-field-created-date::before {
    content: '\\eaa0';
  }
  .swim-icon.lit-field-date::before {
    content: '\\eaa1';
  }
  .swim-icon.lit-field-double-select::before {
    content: '\\eaa2';
  }
  .swim-icon.lit-field-dynamic::before {
    content: '\\eaa3';
  }
  .swim-icon.lit-field-edited-by::before {
    content: '\\eaa4';
  }
  .swim-icon.lit-field-edited-date::before {
    content: '\\eaa5';
  }
  .swim-icon.lit-field-grid::before {
    content: '\\eaa6';
  }
  .swim-icon.lit-field-html::before {
    content: '\\eaa7';
  }
  .swim-icon.lit-field-json::before {
    content: '\\eaa8';
  }
  .swim-icon.lit-field-list::before {
    content: '\\eaa9';
  }
  .swim-icon.lit-field-list-small::before {
    content: '\\eaaa';
  }
  .swim-icon.lit-field-lists::before {
    content: '\\eaab';
  }
  .swim-icon.lit-field-multiselect::before {
    content: '\\eaac';
  }
  .swim-icon.lit-field-number::before {
    content: '\\eaad';
  }
  .swim-icon.lit-field-numeric::before {
    content: '\\eaae';
  }
  .swim-icon.lit-field-richtext::before {
    content: '\\eaaf';
  }
  .swim-icon.lit-field-single-select::before {
    content: '\\eab0';
  }
  .swim-icon.lit-field-singleline::before {
    content: '\\eab1';
  }
  .swim-icon.lit-field-text::before {
    content: '\\eab2';
  }
  .swim-icon.lit-field-textarea::before {
    content: '\\eab3';
  }
  .swim-icon.lit-field-textual::before {
    content: '\\eab4';
  }
  .swim-icon.lit-field-users::before {
    content: '\\eab5';
  }
  .swim-icon.lit-filter::before {
    content: '\\eab6';
  }
  .swim-icon.lit-filter-bar::before {
    content: '\\eab7';
  }
  .swim-icon.lit-find-page::before {
    content: '\\eab8';
  }
  .swim-icon.lit-flame::before {
    content: '\\eab9';
  }
  .swim-icon.lit-folder::before {
    content: '\\eaba';
  }
  .swim-icon.lit-folder-closed-small::before {
    content: '\\eabb';
  }
  .swim-icon.lit-folder-open-small::before {
    content: '\\eabc';
  }
  .swim-icon.lit-folders::before {
    content: '\\eabd';
  }
  .swim-icon.lit-font::before {
    content: '\\eabe';
  }
  .swim-icon.lit-format-indent-decrease::before {
    content: '\\eabf';
  }
  .swim-icon.lit-format-indent-increase::before {
    content: '\\eac0';
  }
  .swim-icon.lit-formula::before {
    content: '\\eac1';
  }
  .swim-icon.lit-forward-arrow::before {
    content: '\\eac2';
  }
  .swim-icon.lit-forward-arrow-filled::before {
    content: '\\eac3';
  }
  .swim-icon.lit-full-align::before {
    content: '\\eac4';
  }
  .swim-icon.lit-gauge::before {
    content: '\\eac5';
  }
  .swim-icon.lit-gear::before {
    content: '\\eac6';
  }
  .swim-icon.lit-gear-small::before {
    content: '\\eac7';
  }
  .swim-icon.lit-gear-square::before {
    content: '\\eac8';
  }
  .swim-icon.lit-globe::before {
    content: '\\eac9';
  }
  .swim-icon.lit-graph::before {
    content: '\\eaca';
  }
  .swim-icon.lit-graph-alt1::before {
    content: '\\eacb';
  }
  .swim-icon.lit-grid-view::before {
    content: '\\eacc';
  }
  .swim-icon.lit-hand::before {
    content: '\\eacd';
  }
  .swim-icon.lit-handle::before {
    content: '\\eace';
  }
  .swim-icon.lit-heat::before {
    content: '\\eacf';
  }
  .swim-icon.lit-helper::before {
    content: '\\ead0';
  }
  .swim-icon.lit-history::before {
    content: '\\ead1';
  }
  .swim-icon.lit-horz-bar-graph-grouped::before {
    content: '\\ead2';
  }
  .swim-icon.lit-horz-stacked-bar::before {
    content: '\\ead3';
  }
  .swim-icon.lit-html-code::before {
    content: '\\ead4';
  }
  .swim-icon.lit-icon-chart-bar-horizontal::before {
    content: '\\ead5';
  }
  .swim-icon.lit-icon-chart-horz-bar::before {
    content: '\\ead6';
  }
  .swim-icon.lit-import-outline::before {
    content: '\\ead7';
  }
  .swim-icon.lit-import-outline-large::before {
    content: '\\ead8';
  }
  .swim-icon.lit-import-outline-small::before {
    content: '\\ead9';
  }
  .swim-icon.lit-info-filled::before {
    content: '\\eada';
  }
  .swim-icon.lit-info-filled-2::before {
    content: '\\eadb';
  }
  .swim-icon.lit-info-filled-small::before {
    content: '\\eadc';
  }
  .swim-icon.lit-ingest-small::before {
    content: '\\eadd';
  }
  .swim-icon.lit-inspect::before {
    content: '\\eade';
  }
  .swim-icon.lit-integration::before {
    content: '\\eadf';
  }
  .swim-icon.lit-integrations::before {
    content: '\\eae0';
  }
  .swim-icon.lit-ip::before {
    content: '\\eae1';
  }
  .swim-icon.lit-italic::before {
    content: '\\eae2';
  }
  .swim-icon.lit-key::before {
    content: '\\eae3';
  }
  .swim-icon.lit-key-outline::before {
    content: '\\eae4';
  }
  .swim-icon.lit-key-outline-small::before {
    content: '\\eae5';
  }
  .swim-icon.lit-keyboard::before {
    content: '\\eae6';
  }
  .swim-icon.lit-keyboard-return::before {
    content: '\\eae7';
  }
  .swim-icon.lit-layer::before {
    content: '\\eae8';
  }
  .swim-icon.lit-left-align::before {
    content: '\\eae9';
  }
  .swim-icon.lit-library::before {
    content: '\\eaea';
  }
  .swim-icon.lit-line-chart::before {
    content: '\\eaeb';
  }
  .swim-icon.lit-line-graph::before {
    content: '\\eaec';
  }
  .swim-icon.lit-linear-gauge::before {
    content: '\\eaed';
  }
  .swim-icon.lit-link::before {
    content: '\\eaee';
  }
  .swim-icon.lit-list::before {
    content: '\\eaef';
  }
  .swim-icon.lit-list-1::before {
    content: '\\eaf0';
  }
  .swim-icon.lit-list-view::before {
    content: '\\eaf1';
  }
  .swim-icon.lit-loading::before {
    content: '\\eaf2';
  }
  .swim-icon.lit-locate-filled::before {
    content: '\\eaf3';
  }
  .swim-icon.lit-locate-outline::before {
    content: '\\eaf4';
  }
  .swim-icon.lit-locate-outline-large::before {
    content: '\\eaf5';
  }
  .swim-icon.lit-location::before {
    content: '\\eaf6';
  }
  .swim-icon.lit-lock::before {
    content: '\\eaf7';
  }
  .swim-icon.lit-lock-sm::before {
    content: '\\eaf8';
  }
  .swim-icon.lit-mail::before {
    content: '\\eaf9';
  }
  .swim-icon.lit-mail-1::before {
    content: '\\eafa';
  }
  .swim-icon.lit-map::before {
    content: '\\eafb';
  }
  .swim-icon.lit-marketplace::before {
    content: '\\eafc';
  }
  .swim-icon.lit-menu::before {
    content: '\\eafd';
  }
  .swim-icon.lit-mfa::before {
    content: '\\eafe';
  }
  .swim-icon.lit-mic::before {
    content: '\\eaff';
  }
  .swim-icon.lit-minus::before {
    content: '\\eb00';
  }
  .swim-icon.lit-money::before {
    content: '\\eb01';
  }
  .swim-icon.lit-mouse-hold::before {
    content: '\\eb02';
  }
  .swim-icon.lit-multi-line::before {
    content: '\\eb03';
  }
  .swim-icon.lit-new-app::before {
    content: '\\eb04';
  }
  .swim-icon.lit-notation-arrow-down-left::before {
    content: '\\eb05';
  }
  .swim-icon.lit-notation-arrow-up::before {
    content: '\\eb06';
  }
  .swim-icon.lit-numbered-list::before {
    content: '\\eb07';
  }
  .swim-icon.lit-open::before {
    content: '\\eb08';
  }
  .swim-icon.lit-orchestration::before {
    content: '\\eb09';
  }
  .swim-icon.lit-paragraph::before {
    content: '\\eb0a';
  }
  .swim-icon.lit-pause::before {
    content: '\\eb0b';
  }
  .swim-icon.lit-pause-circle::before {
    content: '\\eb0c';
  }
  .swim-icon.lit-percent-gauge::before {
    content: '\\eb0d';
  }
  .swim-icon.lit-phone::before {
    content: '\\eb0e';
  }
  .swim-icon.lit-photo::before {
    content: '\\eb0f';
  }
  .swim-icon.lit-pie-chart::before {
    content: '\\eb10';
  }
  .swim-icon.lit-pin::before {
    content: '\\eb11';
  }
  .swim-icon.lit-plane::before {
    content: '\\eb12';
  }
  .swim-icon.lit-play::before {
    content: '\\eb13';
  }
  .swim-icon.lit-play-circle::before {
    content: '\\eb14';
  }
  .swim-icon.lit-playbook-outline::before {
    content: '\\eb15';
  }
  .swim-icon.lit-playbook-outline-small::before {
    content: '\\eb16';
  }
  .swim-icon.lit-plugin::before {
    content: '\\eb17';
  }
  .swim-icon.lit-plugin-outline::before {
    content: '\\eb18';
  }
  .swim-icon.lit-plugin-outline-small::before {
    content: '\\eb19';
  }
  .swim-icon.lit-plus::before {
    content: '\\eb1a';
  }
  .swim-icon.lit-plus-bold::before {
    content: '\\eb1b';
  }
  .swim-icon.lit-prev::before {
    content: '\\eb1c';
  }
  .swim-icon.lit-printer::before {
    content: '\\eb1d';
  }
  .swim-icon.lit-profile::before {
    content: '\\eb1e';
  }
  .swim-icon.lit-profile-filled::before {
    content: '\\eb1f';
  }
  .swim-icon.lit-promote::before {
    content: '\\eb20';
  }
  .swim-icon.lit-promote-horizontal::before {
    content: '\\eb21';
  }
  .swim-icon.lit-question::before {
    content: '\\eb22';
  }
  .swim-icon.lit-question-filled::before {
    content: '\\eb23';
  }
  .swim-icon.lit-question-filled-sm::before {
    content: '\\eb24';
  }
  .swim-icon.lit-radio-button::before {
    content: '\\eb25';
  }
  .swim-icon.lit-redo::before {
    content: '\\eb26';
  }
  .swim-icon.lit-redo-all::before {
    content: '\\eb27';
  }
  .swim-icon.lit-reference::before {
    content: '\\eb28';
  }
  .swim-icon.lit-reference-grid::before {
    content: '\\eb29';
  }
  .swim-icon.lit-reference-multi::before {
    content: '\\eb2a';
  }
  .swim-icon.lit-reference-single::before {
    content: '\\eb2b';
  }
  .swim-icon.lit-reference-tree::before {
    content: '\\eb2c';
  }
  .swim-icon.lit-refresh::before {
    content: '\\eb2d';
  }
  .swim-icon.lit-refresh-circle::before {
    content: '\\eb2e';
  }
  .swim-icon.lit-refresh-small::before {
    content: '\\eb2f';
  }
  .swim-icon.lit-remove::before {
    content: '\\eb30';
  }
  .swim-icon.lit-remove-edge::before {
    content: '\\eb31';
  }
  .swim-icon.lit-remove-node::before {
    content: '\\eb32';
  }
  .swim-icon.lit-remove-users::before {
    content: '\\eb33';
  }
  .swim-icon.lit-repeat::before {
    content: '\\eb34';
  }
  .swim-icon.lit-replace::before {
    content: '\\eb35';
  }
  .swim-icon.lit-reports::before {
    content: '\\eb36';
  }
  .swim-icon.lit-reports-outline::before {
    content: '\\eb37';
  }
  .swim-icon.lit-resize::before {
    content: '\\eb38';
  }
  .swim-icon.lit-right-align::before {
    content: '\\eb39';
  }
  .swim-icon.lit-rocket::before {
    content: '\\eb3a';
  }
  .swim-icon.lit-rotate::before {
    content: '\\eb3b';
  }
  .swim-icon.lit-rule-outline::before {
    content: '\\eb3c';
  }
  .swim-icon.lit-runner::before {
    content: '\\eb3d';
  }
  .swim-icon.lit-runs-outline::before {
    content: '\\eb3e';
  }
  .swim-icon.lit-runs-outline-small::before {
    content: '\\eb3f';
  }
  .swim-icon.lit-sankey::before {
    content: '\\eb40';
  }
  .swim-icon.lit-save::before {
    content: '\\eb41';
  }
  .swim-icon.lit-save-outline::before {
    content: '\\eb42';
  }
  .swim-icon.lit-save-outline-large::before {
    content: '\\eb43';
  }
  .swim-icon.lit-save-outline-small::before {
    content: '\\eb44';
  }
  .swim-icon.lit-screen::before {
    content: '\\eb45';
  }
  .swim-icon.lit-screen-1::before {
    content: '\\eb46';
  }
  .swim-icon.lit-search::before {
    content: '\\eb47';
  }
  .swim-icon.lit-section::before {
    content: '\\eb48';
  }
  .swim-icon.lit-select-all::before {
    content: '\\eb49';
  }
  .swim-icon.lit-select-user::before {
    content: '\\eb4a';
  }
  .swim-icon.lit-select-users::before {
    content: '\\eb4b';
  }
  .swim-icon.lit-sensor-outline::before {
    content: '\\eb4c';
  }
  .swim-icon.lit-sensor-outline-small::before {
    content: '\\eb4d';
  }
  .swim-icon.lit-server::before {
    content: '\\eb4e';
  }
  .swim-icon.lit-shield::before {
    content: '\\eb4f';
  }
  .swim-icon.lit-shrink::before {
    content: '\\eb50';
  }
  .swim-icon.lit-skip::before {
    content: '\\eb51';
  }
  .swim-icon.lit-slide-left::before {
    content: '\\eb52';
  }
  .swim-icon.lit-slide-right::before {
    content: '\\eb53';
  }
  .swim-icon.lit-sliders::before {
    content: '\\eb54';
  }
  .swim-icon.lit-smartphone::before {
    content: '\\eb55';
  }
  .swim-icon.lit-smiley-frown::before {
    content: '\\eb56';
  }
  .swim-icon.lit-snapshot::before {
    content: '\\eb57';
  }
  .swim-icon.lit-solution::before {
    content: '\\eb58';
  }
  .swim-icon.lit-sort-ascending::before {
    content: '\\eb59';
  }
  .swim-icon.lit-sort-descending::before {
    content: '\\eb5a';
  }
  .swim-icon.lit-spaces::before {
    content: '\\eb5b';
  }
  .swim-icon.lit-spaces-list::before {
    content: '\\eb5c';
  }
  .swim-icon.lit-spaces-outline::before {
    content: '\\eb5d';
  }
  .swim-icon.lit-spaces-outline-large::before {
    content: '\\eb5e';
  }
  .swim-icon.lit-speedometer::before {
    content: '\\eb5f';
  }
  .swim-icon.lit-split-handle::before {
    content: '\\eb60';
  }
  .swim-icon.lit-square::before {
    content: '\\eb61';
  }
  .swim-icon.lit-square-filled::before {
    content: '\\eb62';
  }
  .swim-icon.lit-star::before {
    content: '\\eb63';
  }
  .swim-icon.lit-star-filled::before {
    content: '\\eb64';
  }
  .swim-icon.lit-stars::before {
    content: '\\eb65';
  }
  .swim-icon.lit-stopwatch::before {
    content: '\\eb66';
  }
  .swim-icon.lit-superscript::before {
    content: '\\eb67';
  }
  .swim-icon.lit-swap::before {
    content: '\\eb68';
  }
  .swim-icon.lit-switch::before {
    content: '\\eb69';
  }
  .swim-icon.lit-system-diagnostics::before {
    content: '\\eb6a';
  }
  .swim-icon.lit-system-diagnostics-2::before {
    content: '\\eb6b';
  }
  .swim-icon.lit-table::before {
    content: '\\eb6c';
  }
  .swim-icon.lit-tabs::before {
    content: '\\eb6d';
  }
  .swim-icon.lit-tag-filled::before {
    content: '\\eb6e';
  }
  .swim-icon.lit-tags-outline::before {
    content: '\\eb6f';
  }
  .swim-icon.lit-target::before {
    content: '\\eb70';
  }
  .swim-icon.lit-task-outline::before {
    content: '\\eb71';
  }
  .swim-icon.lit-thumb-down-filled::before {
    content: '\\eb72';
  }
  .swim-icon.lit-thumb-down-outline::before {
    content: '\\eb73';
  }
  .swim-icon.lit-thumb-down-outline-large::before {
    content: '\\eb74';
  }
  .swim-icon.lit-thumb-up-filled::before {
    content: '\\eb75';
  }
  .swim-icon.lit-thumb-up-outline::before {
    content: '\\eb76';
  }
  .swim-icon.lit-thumb-up-outline-large::before {
    content: '\\eb77';
  }
  .swim-icon.lit-tracking-id::before {
    content: '\\eb78';
  }
  .swim-icon.lit-transfer::before {
    content: '\\eb79';
  }
  .swim-icon.lit-trash::before {
    content: '\\eb7a';
  }
  .swim-icon.lit-tree::before {
    content: '\\eb7b';
  }
  .swim-icon.lit-tree-collapse::before {
    content: '\\eb7c';
  }
  .swim-icon.lit-tree-expand::before {
    content: '\\eb7d';
  }
  .swim-icon.lit-trend-down::before {
    content: '\\eb7e';
  }
  .swim-icon.lit-trend-level::before {
    content: '\\eb7f';
  }
  .swim-icon.lit-trend-up::before {
    content: '\\eb80';
  }
  .swim-icon.lit-trending::before {
    content: '\\eb81';
  }
  .swim-icon.lit-underline::before {
    content: '\\eb82';
  }
  .swim-icon.lit-undo::before {
    content: '\\eb83';
  }
  .swim-icon.lit-undo-all::before {
    content: '\\eb84';
  }
  .swim-icon.lit-unlink::before {
    content: '\\eb85';
  }
  .swim-icon.lit-upload-outline::before {
    content: '\\eb86';
  }
  .swim-icon.lit-upload-outline-large::before {
    content: '\\eb87';
  }
  .swim-icon.lit-upload-outline-small::before {
    content: '\\eb88';
  }
  .swim-icon.lit-user::before {
    content: '\\eb89';
  }
  .swim-icon.lit-user-add::before {
    content: '\\eb8a';
  }
  .swim-icon.lit-user-circle::before {
    content: '\\eb8b';
  }
  .swim-icon.lit-user-groups::before {
    content: '\\eb8c';
  }
  .swim-icon.lit-users::before {
    content: '\\eb8d';
  }
  .swim-icon.lit-version::before {
    content: '\\eb8e';
  }
  .swim-icon.lit-vert-bar-graph-grouped::before {
    content: '\\eb8f';
  }
  .swim-icon.lit-vert-full-stack-bar::before {
    content: '\\eb90';
  }
  .swim-icon.lit-view-code::before {
    content: '\\eb91';
  }
  .swim-icon.lit-view-designer::before {
    content: '\\eb92';
  }
  .swim-icon.lit-view-split::before {
    content: '\\eb93';
  }
  .swim-icon.lit-wand::before {
    content: '\\eb94';
  }
  .swim-icon.lit-warning-filled::before {
    content: '\\eb95';
  }
  .swim-icon.lit-warning-filled-sm::before {
    content: '\\eb96';
  }
  .swim-icon.lit-warning-thin::before {
    content: '\\eb97';
  }
  .swim-icon.lit-web-api::before {
    content: '\\eb98';
  }
  .swim-icon.lit-webhook-outline::before {
    content: '\\eb99';
  }
  .swim-icon.lit-webhook-outline-large::before {
    content: '\\eb9a';
  }
  .swim-icon.lit-webhook-outline-small::before {
    content: '\\eb9b';
  }
  .swim-icon.lit-widget::before {
    content: '\\eb9c';
  }
  .swim-icon.lit-worker::before {
    content: '\\eb9d';
  }
  .swim-icon.lit-workflow::before {
    content: '\\eb9e';
  }
  .swim-icon.lit-workflow-alternate::before {
    content: '\\eb9f';
  }
  .swim-icon.lit-workflow-alternate-large::before {
    content: '\\eba0';
  }
  .swim-icon.lit-workflow-alternate-small::before {
    content: '\\eba1';
  }
  .swim-icon.lit-workspaces::before {
    content: '\\eba2';
  }
  .swim-icon.lit-workstation::before {
    content: '\\eba3';
  }
  .swim-icon.lit-wrench::before {
    content: '\\eba4';
  }
  .swim-icon.lit-x::before {
    content: '\\eba5';
  }
  .swim-icon.lit-x-filled::before {
    content: '\\eba6';
  }
  .swim-icon.lit-x-small::before {
    content: '\\eba7';
  }
`, it = R`
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

  ${tt}
`, ot = (n) => `swim-icon ${n.trim().split(" ").map((t) => {
  const [i, o] = t.split(":");
  return i.length ? `${i} ${i}-${o}` : o;
}).join(" ")}`;
class nt {
  constructor() {
    this._defaultFontSetClass = "lit", this._iconMap = /* @__PURE__ */ new Map();
  }
  setDefaultFontSetClass(e) {
    return this._defaultFontSetClass = e, this._defaultFontSetClass;
  }
  get(e, t) {
    return this.lookup(e, t).map((i) => ot(i));
  }
  lookup(e, t) {
    const i = t ?? this._defaultFontSetClass;
    return (Array.isArray(e) ? e : [e]).reduce((o, s) => {
      const r = this._expandKeys(s, i).map((a) => {
        const l = this._iconMap.get(a);
        return l && l.length === 1 ? l[0] : a;
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
const rt = new nt();
var st = Object.defineProperty, D = (n, e, t, i) => {
  for (var o = void 0, s = n.length - 1, r; s >= 0; s--)
    (r = n[s]) && (o = r(e, t, o) || o);
  return o && st(e, t, o), o;
};
const pe = "swim-icon", ne = class ne extends O {
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
    this._cssClasses = rt.get(e, this.fontSet);
  }
  render() {
    var s;
    const e = this._cssClasses, t = !!this.alt, i = ((s = this.iconClass) == null ? void 0 : s.trim()) ?? "", o = i ? ` ${i}` : "";
    return !e || e.length === 0 ? p`
        <span
          part="icon"
          class="${i}"
          role="${t ? "img" : "presentation"}"
          aria-label="${t ? this.alt : d}"
          aria-hidden="${t ? "false" : "true"}"
        >
          <slot></slot>
        </span>
      ` : e.length === 1 ? p`
        <i
          part="icon"
          class="swim-icon__i ${e[0]}${o}"
          role="${t ? "img" : "presentation"}"
          aria-label="${t ? this.alt : d}"
          aria-hidden="${t ? "false" : "true"}"
        ></i>
      ` : p`
      <span
        class="swim-icon__stack"
        role="${t ? "img" : "presentation"}"
        aria-label="${t ? this.alt : d}"
        aria-hidden="${t ? "false" : "true"}"
      >
        ${e.map(
      (r, a) => p`<i part="icon icon-${a}" class="swim-icon__i swim-icon__i--${a} ${r}${o}"></i>`
    )}
      </span>
    `;
  }
};
ne.styles = [Ae, it];
let A = ne;
D([
  h({ type: String, attribute: "font-icon" })
], A.prototype, "fontIcon");
D([
  h({ type: String })
], A.prototype, "alt");
D([
  h({ type: String, attribute: "font-set" })
], A.prototype, "fontSet");
D([
  h({ type: String, attribute: "icon-class" })
], A.prototype, "iconClass");
D([
  M()
], A.prototype, "_cssClasses");
customElements.get(pe) || customElements.define(pe, A);
const lt = R`
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
`, at = R`
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
var y = /* @__PURE__ */ ((n) => (n.text = "text", n.password = "password", n.email = "email", n.number = "number", n.tel = "tel", n.url = "url", n.textarea = "textarea", n))(y || {}), ke = /* @__PURE__ */ ((n) => (n.legacy = "legacy", n.fill = "fill", n))(ke || {}), Ee = /* @__PURE__ */ ((n) => (n.sm = "sm", n.md = "md", n.lg = "lg", n))(Ee || {});
function E(n) {
  return n != null && `${n}` != "false";
}
var ct = Object.defineProperty, bt = Object.getOwnPropertyDescriptor, b = (n, e, t, i) => {
  for (var o = i > 1 ? void 0 : i ? bt(e, t) : e, s = n.length - 1, r; s >= 0; s--)
    (r = n[s]) && (o = (i ? r(e, t, o) : r(o)) || o);
  return i && o && ct(e, t, o), o;
};
const we = "swim-input", K = class K extends O {
  constructor() {
    super(), this.type = y.text, this.label = "", this.placeholder = "", this.hint = "", this._value = "", this.name = "", this.id = `swim-input-${Math.random().toString(36).substr(2, 9)}`, this._disabled = !1, this._readonly = !1, this._required = !1, this._autofocus = !1, this.autocomplete = "off", this.appearance = ke.legacy, this.size = Ee.sm, this._withMargin = !0, this._withHint = !0, this._passwordToggleEnabled = !1, this.textareaRows = 3, this.requiredIndicator = "*", this._focused = !1, this._passwordVisible = !1, this._touched = !1, this._dirty = !1, this._invalid = !1, this._internals = this.attachInternals();
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
    this._disabled = E(e);
  }
  get readonly() {
    return this._readonly;
  }
  set readonly(e) {
    this._readonly = E(e);
  }
  get required() {
    return this._required;
  }
  set required(e) {
    this._required = E(e);
  }
  get autofocus() {
    return this._autofocus;
  }
  set autofocus(e) {
    this._autofocus = E(e);
  }
  get marginless() {
    return !this._withMargin;
  }
  set marginless(e) {
    this._withMargin = !E(e);
  }
  get withHint() {
    return this._withHint;
  }
  set withHint(e) {
    this._withHint = E(e);
  }
  get passwordToggleEnabled() {
    return this._passwordToggleEnabled;
  }
  set passwordToggleEnabled(e) {
    this._passwordToggleEnabled = E(e);
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
    const e = this.type === y.textarea, t = this.type === y.password && this.passwordToggleEnabled && !this.disabled, i = this.type === y.number && !this.disabled, o = this._passwordVisible ? y.text : this.type;
    return p`
      <div class="input-wrap">
        <div class="input-flex-wrap">
          <slot name="prefix"></slot>
          <div class="input-flex-wrap-inner">
            <div class="input-box-wrap">
              ${e ? this._renderTextarea() : this._renderInput(o)}
              ${i ? p`
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
                  ` : d}
              ${t ? p`
                    <button
                      type="button"
                      class="password-toggle"
                      @click="${this._togglePassword}"
                      aria-label="Toggle password visibility"
                    >
                      <swim-icon font-icon="${this._passwordVisible ? "eye-disabled" : "eye"}"></swim-icon>
                    </button>
                  ` : d}
            </div>
            <label class="input-label" part="label" for="${this.id}">
              ${this.label} ${this.required ? p`<span>${this.requiredIndicator}</span>` : d}
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
    return p`
      <input
        part="input"
        class="input-box"
        type="${e}"
        id="${this.id}"
        name="${this.name}"
        .value="${ue(this.value)}"
        placeholder="${this.placeholder}"
        ?disabled="${this.disabled}"
        ?readonly="${this.readonly}"
        ?required="${this.required}"
        min="${_(this.min)}"
        max="${_(this.max)}"
        minlength="${_(this.minlength)}"
        maxlength="${_(this.maxlength)}"
        tabindex="${_(this.tabindex)}"
        autocomplete="${this.autocomplete}"
        @input="${this._handleInput}"
        @change="${this._handleChange}"
        @focus="${this._handleFocus}"
        @blur="${this._handleBlur}"
      />
    `;
  }
  _renderTextarea() {
    return p`
      <textarea
        part="input"
        class="input-textarea swim-scroll"
        id="${this.id}"
        name="${this.name}"
        .value="${ue(this.value)}"
        placeholder="${this.placeholder}"
        ?disabled="${this.disabled}"
        ?readonly="${this.readonly}"
        ?required="${this.required}"
        rows="${this.textareaRows}"
        minlength="${_(this.minlength)}"
        maxlength="${_(this.maxlength)}"
        tabindex="${_(this.tabindex)}"
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
    if (this.inputElement && this.type === y.number) {
      const e = this.inputElement, t = parseFloat(e.value) || 0;
      if (this.max !== void 0 && t >= this.max) return;
      const i = t + 1;
      this.value = i.toString(), this.dispatchEvent(new Event("change", { bubbles: !0, composed: !0 }));
    }
  }
  _decrement() {
    if (this.inputElement && this.type === y.number) {
      const e = this.inputElement, t = parseFloat(e.value) || 0;
      if (this.min !== void 0 && t <= this.min) return;
      const i = t - 1;
      this.value = i.toString(), this.dispatchEvent(new Event("change", { bubbles: !0, composed: !0 }));
    }
  }
  _validate() {
    let e = !0;
    if (this.required && !this.value && (e = !1), this.type === y.number && this.value) {
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
K.styles = [Ae, lt, at], K.formAssociated = !0;
let c = K;
b([
  Ye(".input-box, .input-textarea")
], c.prototype, "inputElement", 2);
b([
  h({ type: String })
], c.prototype, "type", 2);
b([
  h({ type: String })
], c.prototype, "label", 2);
b([
  h({ type: String })
], c.prototype, "placeholder", 2);
b([
  h({ type: String })
], c.prototype, "hint", 2);
b([
  h({ type: String })
], c.prototype, "value", 1);
b([
  h({ type: String })
], c.prototype, "name", 2);
b([
  h({ type: String })
], c.prototype, "id", 2);
b([
  h({ type: Boolean, reflect: !0 })
], c.prototype, "disabled", 1);
b([
  h({ type: Boolean, reflect: !0 })
], c.prototype, "readonly", 1);
b([
  h({ type: Boolean, reflect: !0 })
], c.prototype, "required", 1);
b([
  h({ type: Boolean })
], c.prototype, "autofocus", 1);
b([
  h({ type: String })
], c.prototype, "autocomplete", 2);
b([
  h({ type: String, reflect: !0 })
], c.prototype, "appearance", 2);
b([
  h({ type: String, reflect: !0 })
], c.prototype, "size", 2);
b([
  h({ type: Boolean, reflect: !0, attribute: "marginless" })
], c.prototype, "marginless", 1);
b([
  h({ type: Boolean })
], c.prototype, "withHint", 1);
b([
  h({ type: Boolean, attribute: "password-toggle-enabled" })
], c.prototype, "passwordToggleEnabled", 1);
b([
  h({ type: Number })
], c.prototype, "min", 2);
b([
  h({ type: Number })
], c.prototype, "max", 2);
b([
  h({ type: Number })
], c.prototype, "minlength", 2);
b([
  h({ type: Number })
], c.prototype, "maxlength", 2);
b([
  h({ type: Number, attribute: "textarea-rows" })
], c.prototype, "textareaRows", 2);
b([
  h({ type: String, attribute: "required-indicator" })
], c.prototype, "requiredIndicator", 2);
b([
  h({ type: Number })
], c.prototype, "tabindex", 2);
b([
  M()
], c.prototype, "_focused", 2);
b([
  M()
], c.prototype, "_passwordVisible", 2);
b([
  M()
], c.prototype, "_touched", 2);
b([
  M()
], c.prototype, "_dirty", 2);
b([
  M()
], c.prototype, "_invalid", 2);
customElements.get(we) || customElements.define(we, c);
export {
  ke as InputAppearance,
  Ee as InputSize,
  y as InputTypes,
  c as SwimInput
};
