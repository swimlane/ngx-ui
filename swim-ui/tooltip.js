/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const I = globalThis, tt = I.ShadowRoot && (I.ShadyCSS === void 0 || I.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, et = Symbol(), lt = /* @__PURE__ */ new WeakMap();
let Ct = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== et) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (tt && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = lt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && lt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Ht = (s) => new Ct(typeof s == "string" ? s : s + "", void 0, et), it = (s, ...t) => {
  const e = s.length === 1 ? s[0] : t.reduce((i, r, o) => i + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + s[o + 1], s[0]);
  return new Ct(e, s, et);
}, Lt = (s, t) => {
  if (tt) s.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), r = I.litNonce;
    r !== void 0 && i.setAttribute("nonce", r), i.textContent = e.cssText, s.appendChild(i);
  }
}, ht = tt ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return Ht(e);
})(s) : s;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Mt, defineProperty: kt, getOwnPropertyDescriptor: Rt, getOwnPropertyNames: Ut, getOwnPropertySymbols: Nt, getPrototypeOf: zt } = Object, x = globalThis, pt = x.trustedTypes, Bt = pt ? pt.emptyScript : "", J = x.reactiveElementPolyfillSupport, k = (s, t) => s, W = { toAttribute(s, t) {
  switch (t) {
    case Boolean:
      s = s ? Bt : null;
      break;
    case Object:
    case Array:
      s = s == null ? s : JSON.stringify(s);
  }
  return s;
}, fromAttribute(s, t) {
  let e = s;
  switch (t) {
    case Boolean:
      e = s !== null;
      break;
    case Number:
      e = s === null ? null : Number(s);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(s);
      } catch {
        e = null;
      }
  }
  return e;
} }, st = (s, t) => !Mt(s, t), ct = { attribute: !0, type: String, converter: W, reflect: !1, useDefault: !1, hasChanged: st };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), x.litPropertyMetadata ?? (x.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let O = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = ct) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), r = this.getPropertyDescriptor(t, i, e);
      r !== void 0 && kt(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: r, set: o } = Rt(this.prototype, t) ?? { get() {
      return this[e];
    }, set(n) {
      this[e] = n;
    } };
    return { get: r, set(n) {
      const l = r == null ? void 0 : r.call(this);
      o == null || o.call(this, n), this.requestUpdate(t, l, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? ct;
  }
  static _$Ei() {
    if (this.hasOwnProperty(k("elementProperties"))) return;
    const t = zt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(k("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(k("properties"))) {
      const e = this.properties, i = [...Ut(e), ...Nt(e)];
      for (const r of i) this.createProperty(r, e[r]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [i, r] of e) this.elementProperties.set(i, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, i] of this.elementProperties) {
      const r = this._$Eu(e, i);
      r !== void 0 && this._$Eh.set(r, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const r of i) e.unshift(ht(r));
    } else t !== void 0 && e.push(ht(t));
    return e;
  }
  static _$Eu(t, e) {
    const i = e.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
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
    for (const i of e.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Lt(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((e) => {
      var i;
      return (i = e.hostConnected) == null ? void 0 : i.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((e) => {
      var i;
      return (i = e.hostDisconnected) == null ? void 0 : i.call(e);
    });
  }
  attributeChangedCallback(t, e, i) {
    this._$AK(t, i);
  }
  _$ET(t, e) {
    var o;
    const i = this.constructor.elementProperties.get(t), r = this.constructor._$Eu(t, i);
    if (r !== void 0 && i.reflect === !0) {
      const n = (((o = i.converter) == null ? void 0 : o.toAttribute) !== void 0 ? i.converter : W).toAttribute(e, i.type);
      this._$Em = t, n == null ? this.removeAttribute(r) : this.setAttribute(r, n), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var o, n;
    const i = this.constructor, r = i._$Eh.get(t);
    if (r !== void 0 && this._$Em !== r) {
      const l = i.getPropertyOptions(r), a = typeof l.converter == "function" ? { fromAttribute: l.converter } : ((o = l.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? l.converter : W;
      this._$Em = r;
      const p = a.fromAttribute(e, l.type);
      this[r] = p ?? ((n = this._$Ej) == null ? void 0 : n.get(r)) ?? p, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, r = !1, o) {
    var n;
    if (t !== void 0) {
      const l = this.constructor;
      if (r === !1 && (o = this[t]), i ?? (i = l.getPropertyOptions(t)), !((i.hasChanged ?? st)(o, e) || i.useDefault && i.reflect && o === ((n = this._$Ej) == null ? void 0 : n.get(t)) && !this.hasAttribute(l._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: r, wrapped: o }, n) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, n ?? e ?? this[t]), o !== !0 || n !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), r === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
    var i;
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
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (i = this._$EO) == null || i.forEach((r) => {
        var o;
        return (o = r.hostUpdate) == null ? void 0 : o.call(r);
      }), this.update(e)) : this._$EM();
    } catch (r) {
      throw t = !1, this._$EM(), r;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$EO) == null || e.forEach((i) => {
      var r;
      return (r = i.hostUpdated) == null ? void 0 : r.call(i);
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
O.elementStyles = [], O.shadowRootOptions = { mode: "open" }, O[k("elementProperties")] = /* @__PURE__ */ new Map(), O[k("finalized")] = /* @__PURE__ */ new Map(), J == null || J({ ReactiveElement: O }), (x.reactiveElementVersions ?? (x.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const R = globalThis, ut = (s) => s, V = R.trustedTypes, dt = V ? V.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, Et = "$lit$", y = `lit$${Math.random().toFixed(9).slice(2)}$`, St = "?" + y, Ft = `<${St}>`, S = document, N = () => S.createComment(""), z = (s) => s === null || typeof s != "object" && typeof s != "function", rt = Array.isArray, jt = (s) => rt(s) || typeof (s == null ? void 0 : s[Symbol.iterator]) == "function", K = `[ 	
\f\r]`, L = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, gt = /-->/g, _t = />/g, A = RegExp(`>|${K}(?:([^\\s"'>=/]+)(${K}*=${K}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ft = /'/g, bt = /"/g, Tt = /^(?:script|style|textarea|title)$/i, qt = (s) => (t, ...e) => ({ _$litType$: s, strings: t, values: e }), M = qt(1), T = Symbol.for("lit-noChange"), u = Symbol.for("lit-nothing"), $t = /* @__PURE__ */ new WeakMap(), C = S.createTreeWalker(S, 129);
function Pt(s, t) {
  if (!rt(s) || !s.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return dt !== void 0 ? dt.createHTML(t) : t;
}
const It = (s, t) => {
  const e = s.length - 1, i = [];
  let r, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = L;
  for (let l = 0; l < e; l++) {
    const a = s[l];
    let p, _, h = -1, b = 0;
    for (; b < a.length && (n.lastIndex = b, _ = n.exec(a), _ !== null); ) b = n.lastIndex, n === L ? _[1] === "!--" ? n = gt : _[1] !== void 0 ? n = _t : _[2] !== void 0 ? (Tt.test(_[2]) && (r = RegExp("</" + _[2], "g")), n = A) : _[3] !== void 0 && (n = A) : n === A ? _[0] === ">" ? (n = r ?? L, h = -1) : _[1] === void 0 ? h = -2 : (h = n.lastIndex - _[2].length, p = _[1], n = _[3] === void 0 ? A : _[3] === '"' ? bt : ft) : n === bt || n === ft ? n = A : n === gt || n === _t ? n = L : (n = A, r = void 0);
    const v = n === A && s[l + 1].startsWith("/>") ? " " : "";
    o += n === L ? a + Ft : h >= 0 ? (i.push(p), a.slice(0, h) + Et + a.slice(h) + y + v) : a + y + (h === -2 ? l : v);
  }
  return [Pt(s, o + (s[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class B {
  constructor({ strings: t, _$litType$: e }, i) {
    let r;
    this.parts = [];
    let o = 0, n = 0;
    const l = t.length - 1, a = this.parts, [p, _] = It(t, e);
    if (this.el = B.createElement(p, i), C.currentNode = this.el.content, e === 2 || e === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (r = C.nextNode()) !== null && a.length < l; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const h of r.getAttributeNames()) if (h.endsWith(Et)) {
          const b = _[n++], v = r.getAttribute(h).split(y), j = /([.?@])?(.*)/.exec(b);
          a.push({ type: 1, index: o, name: j[2], strings: v, ctor: j[1] === "." ? Vt : j[1] === "?" ? Gt : j[1] === "@" ? Zt : Z }), r.removeAttribute(h);
        } else h.startsWith(y) && (a.push({ type: 6, index: o }), r.removeAttribute(h));
        if (Tt.test(r.tagName)) {
          const h = r.textContent.split(y), b = h.length - 1;
          if (b > 0) {
            r.textContent = V ? V.emptyScript : "";
            for (let v = 0; v < b; v++) r.append(h[v], N()), C.nextNode(), a.push({ type: 2, index: ++o });
            r.append(h[b], N());
          }
        }
      } else if (r.nodeType === 8) if (r.data === St) a.push({ type: 2, index: o });
      else {
        let h = -1;
        for (; (h = r.data.indexOf(y, h + 1)) !== -1; ) a.push({ type: 7, index: o }), h += y.length - 1;
      }
      o++;
    }
  }
  static createElement(t, e) {
    const i = S.createElement("template");
    return i.innerHTML = t, i;
  }
}
function H(s, t, e = s, i) {
  var n, l;
  if (t === T) return t;
  let r = i !== void 0 ? (n = e._$Co) == null ? void 0 : n[i] : e._$Cl;
  const o = z(t) ? void 0 : t._$litDirective$;
  return (r == null ? void 0 : r.constructor) !== o && ((l = r == null ? void 0 : r._$AO) == null || l.call(r, !1), o === void 0 ? r = void 0 : (r = new o(s), r._$AT(s, e, i)), i !== void 0 ? (e._$Co ?? (e._$Co = []))[i] = r : e._$Cl = r), r !== void 0 && (t = H(s, r._$AS(s, t.values), r, i)), t;
}
class Wt {
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
    const { el: { content: e }, parts: i } = this._$AD, r = ((t == null ? void 0 : t.creationScope) ?? S).importNode(e, !0);
    C.currentNode = r;
    let o = C.nextNode(), n = 0, l = 0, a = i[0];
    for (; a !== void 0; ) {
      if (n === a.index) {
        let p;
        a.type === 2 ? p = new F(o, o.nextSibling, this, t) : a.type === 1 ? p = new a.ctor(o, a.name, a.strings, this, t) : a.type === 6 && (p = new Jt(o, this, t)), this._$AV.push(p), a = i[++l];
      }
      n !== (a == null ? void 0 : a.index) && (o = C.nextNode(), n++);
    }
    return C.currentNode = S, r;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class F {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, i, r) {
    this.type = 2, this._$AH = u, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = r, this._$Cv = (r == null ? void 0 : r.isConnected) ?? !0;
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
    t = H(this, t, e), z(t) ? t === u || t == null || t === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : t !== this._$AH && t !== T && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : jt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== u && z(this._$AH) ? this._$AA.nextSibling.data = t : this.T(S.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var o;
    const { values: e, _$litType$: i } = t, r = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = B.createElement(Pt(i.h, i.h[0]), this.options)), i);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === r) this._$AH.p(e);
    else {
      const n = new Wt(r, this), l = n.u(this.options);
      n.p(e), this.T(l), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = $t.get(t.strings);
    return e === void 0 && $t.set(t.strings, e = new B(t)), e;
  }
  k(t) {
    rt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, r = 0;
    for (const o of t) r === e.length ? e.push(i = new F(this.O(N()), this.O(N()), this, this.options)) : i = e[r], i._$AI(o), r++;
    r < e.length && (this._$AR(i && i._$AB.nextSibling, r), e.length = r);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, e); t !== this._$AB; ) {
      const r = ut(t).nextSibling;
      ut(t).remove(), t = r;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class Z {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, r, o) {
    this.type = 1, this._$AH = u, this._$AN = void 0, this.element = t, this.name = e, this._$AM = r, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = u;
  }
  _$AI(t, e = this, i, r) {
    const o = this.strings;
    let n = !1;
    if (o === void 0) t = H(this, t, e, 0), n = !z(t) || t !== this._$AH && t !== T, n && (this._$AH = t);
    else {
      const l = t;
      let a, p;
      for (t = o[0], a = 0; a < o.length - 1; a++) p = H(this, l[i + a], e, a), p === T && (p = this._$AH[a]), n || (n = !z(p) || p !== this._$AH[a]), p === u ? t = u : t !== u && (t += (p ?? "") + o[a + 1]), this._$AH[a] = p;
    }
    n && !r && this.j(t);
  }
  j(t) {
    t === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Vt extends Z {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === u ? void 0 : t;
  }
}
class Gt extends Z {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== u);
  }
}
class Zt extends Z {
  constructor(t, e, i, r, o) {
    super(t, e, i, r, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = H(this, t, e, 0) ?? u) === T) return;
    const i = this._$AH, r = t === u && i !== u || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, o = t !== u && (i === u || r);
    r && this.element.removeEventListener(this.name, this, i), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Jt {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    H(this, t);
  }
}
const Q = R.litHtmlPolyfillSupport;
Q == null || Q(B, F), (R.litHtmlVersions ?? (R.litHtmlVersions = [])).push("3.3.2");
const Kt = (s, t, e) => {
  const i = (e == null ? void 0 : e.renderBefore) ?? t;
  let r = i._$litPart$;
  if (r === void 0) {
    const o = (e == null ? void 0 : e.renderBefore) ?? null;
    i._$litPart$ = r = new F(t.insertBefore(N(), o), o, void 0, e ?? {});
  }
  return r._$AI(s), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const E = globalThis;
let U = class extends O {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Kt(e, this.renderRoot, this.renderOptions);
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
    return T;
  }
};
var At;
U._$litElement$ = !0, U.finalized = !0, (At = E.litElementHydrateSupport) == null || At.call(E, { LitElement: U });
const X = E.litElementPolyfillSupport;
X == null || X({ LitElement: U });
(E.litElementVersions ?? (E.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Qt = { attribute: !0, type: String, converter: W, reflect: !1, hasChanged: st }, Xt = (s = Qt, t, e) => {
  const { kind: i, metadata: r } = e;
  let o = globalThis.litPropertyMetadata.get(r);
  if (o === void 0 && globalThis.litPropertyMetadata.set(r, o = /* @__PURE__ */ new Map()), i === "setter" && ((s = Object.create(s)).wrapped = !0), o.set(e.name, s), i === "accessor") {
    const { name: n } = e;
    return { set(l) {
      const a = t.get.call(this);
      t.set.call(this, l), this.requestUpdate(n, a, s, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(n, void 0, s, l), l;
    } };
  }
  if (i === "setter") {
    const { name: n } = e;
    return function(l) {
      const a = this[n];
      t.call(this, l), this.requestUpdate(n, a, s, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function f(s) {
  return (t, e) => typeof e == "object" ? Xt(s, t, e) : ((i, r, o) => {
    const n = r.hasOwnProperty(o);
    return r.constructor.createProperty(o, i), n ? Object.getOwnPropertyDescriptor(r, o) : void 0;
  })(s, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function P(s) {
  return f({ ...s, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Yt = { CHILD: 2 }, Dt = (s) => (...t) => ({ _$litDirective$: s, values: t });
class te {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, e, i) {
    this._$Ct = t, this._$AM = e, this._$Ci = i;
  }
  _$AS(t, e) {
    return this.update(t, e);
  }
  update(t, e) {
    return this.render(...e);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class D extends te {
  constructor(t) {
    if (super(t), this.it = u, t.type !== Yt.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(t) {
    if (t === u || t == null) return this._t = void 0, this.it = t;
    if (t === T) return t;
    if (typeof t != "string") throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (t === this.it) return this._t;
    this.it = t;
    const e = [t];
    return e.raw = e, this._t = { _$litType$: this.constructor.resultType, strings: e, values: [] };
  }
}
D.directiveName = "unsafeHTML", D.resultType = 1;
const ee = Dt(D), ie = it`
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
it`
  * {
    box-sizing: border-box;
  }
`;
const se = it`
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
`, re = [ie, se];
var d = /* @__PURE__ */ ((s) => (s.top = "top", s.bottom = "bottom", s.left = "left", s.right = "right", s))(d || {}), $ = /* @__PURE__ */ ((s) => (s.top = "top", s.bottom = "bottom", s.left = "left", s.right = "right", s.center = "center", s))($ || {}), Ot = /* @__PURE__ */ ((s) => (s.popover = "popover", s.tooltip = "tooltip", s))(Ot || {}), m = /* @__PURE__ */ ((s) => (s.all = "all", s.focus = "focus", s.click = "click", s.mouseover = "mouseover", s))(m || {});
const w = 7;
function G(s, t, e) {
  return e === $.left ? (s.left ?? 0) - w : e === $.right ? (s.left ?? 0) + (s.width ?? 0) - (t.width ?? 0) + w : (s.left ?? 0) + (s.width ?? 0) / 2 - (t.width ?? 0) / 2;
}
function ot(s, t, e) {
  return e === $.top ? (s.top ?? 0) - w : e === $.bottom ? (s.top ?? 0) + (s.height ?? 0) - (t.height ?? 0) + w : (s.top ?? 0) + (s.height ?? 0) / 2 - (t.height ?? 0) / 2;
}
function wt(s, t, e) {
  let i = G(s, t, e);
  return i + (t.width ?? 0) > window.innerWidth && (i = window.innerWidth - (t.width ?? 0)), i;
}
function mt(s, t, e) {
  let i = ot(s, t, e);
  return i + (t.height ?? 0) > window.innerHeight && (i = window.innerHeight - (t.height ?? 0)), i;
}
function oe(s, t, e, i, r) {
  return e === d.right ? G(s, t, i) + (t.width ?? 0) + r > window.innerWidth : e === d.left ? G(s, t, i) - r < 0 : e === d.top ? (s.top ?? 0) - (t.height ?? 0) - r < 0 : e === d.bottom ? ot(s, t, i) + (t.height ?? 0) + r > window.innerHeight : !1;
}
function ne(s, t, e, i, r) {
  return oe(e, t, s, r, i) ? s === d.right ? d.left : s === d.left ? d.right : s === d.top ? d.bottom : d.top : s;
}
function ae(s, t, e, i, r) {
  let o = 0, n = 0;
  return s === d.right ? (n = (e.left ?? 0) + (e.width ?? 0) + i, o = mt(e, t, r)) : s === d.left ? (n = (e.left ?? 0) - (t.width ?? 0) - i, o = mt(e, t, r)) : s === d.top ? (o = (e.top ?? 0) - (t.height ?? 0) - i, n = wt(e, t, r)) : (o = (e.top ?? 0) + (e.height ?? 0) + i, n = wt(e, t, r)), { top: o, left: n };
}
function vt(s, t, e, i) {
  let r;
  i === $.left ? r = (s.width ?? 0) / 2 - (e.width ?? 0) / 2 + w : i === $.right ? r = (t.width ?? 0) - (s.width ?? 0) / 2 - (e.width ?? 0) / 2 - w : r = (t.width ?? 0) / 2 - (e.width ?? 0) / 2;
  const o = G(s, t, i);
  return o + (t.width ?? 0) > window.innerWidth && (r += o + (t.width ?? 0) - window.innerWidth), r;
}
function yt(s, t, e, i) {
  let r;
  i === $.top ? r = (s.height ?? 0) / 2 - (e.height ?? 0) / 2 + w : i === $.bottom ? r = (t.height ?? 0) - (s.height ?? 0) / 2 - (e.height ?? 0) / 2 - w : r = (t.height ?? 0) / 2 - (e.height ?? 0) / 2;
  const o = ot(s, t, i);
  return o + (t.height ?? 0) > window.innerHeight && (r += o + (t.height ?? 0) - window.innerHeight), r;
}
function le(s, t, e, i, r) {
  let o = 0, n = 0;
  return s === d.right ? (n = -w, o = yt(e, t, i, r)) : s === d.left ? (n = t.width ?? 0, o = yt(e, t, i, r)) : s === d.top ? (o = t.height ?? 0, n = vt(e, t, i, r)) : (o = -w, n = vt(e, t, i, r)), { top: o, left: n };
}
function q(s) {
  return s != null && `${s}` != "false";
}
function Y(s, t = null) {
  return isNaN(parseFloat(s)) || isNaN(Number(s)) ? t : Number(s);
}
const nt = {
  fromAttribute: (s) => s !== "false",
  /** Omit attribute when true (default); set explicit `="false"` only when off. */
  toAttribute: (s) => s ? null : "false"
}, he = {
  fromAttribute: (s) => s !== null && s !== "false" && s !== "0",
  /**
   * Use empty string when true so the boolean attribute is present; remove when false.
   * Serializing false as `attr="false"` leaves the attribute in the DOM, so selectors like
   * `[disabled]` / `[loading]` (common in resets and lazy-load styles) still match the host.
   */
  toAttribute: (s) => s ? "" : null
};
var pe = Object.defineProperty, ce = Object.getOwnPropertyDescriptor, g = (s, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? ce(t, e) : t, o = s.length - 1, n; o >= 0; o--)
    (n = s[o]) && (r = (i ? n(t, e, r) : n(r)) || r);
  return i && r && pe(t, e, r), r;
};
const xt = "swim-tooltip", at = class at extends U {
  constructor() {
    super(...arguments), this.content = "", this.placement = d.top, this.alignment = $.center, this.type = Ot.popover, this.showEvent = m.all, this._spacing = 10, this._showCaret = !0, this._disabled = !1, this._closeOnClickOutside = !0, this._closeOnMouseLeave = !0, this._hideTimeout = 300, this._showTimeout = 100, this.cssClass = "", this._open = !1, this._panelTop = 0, this._panelLeft = 0, this._effectivePlacement = d.top, this._caretTop = 0, this._caretLeft = 0, this._animate = !1, this._triggerRef = null, this._panelRef = null, this._caretRef = null, this._boundDocumentClick = null, this._openFromClick = !1, this._tooltipId = `swim-tooltip-${Math.random().toString(36).slice(2, 11)}`, this._throttledPosition = () => {
      this._throttleTimeout == null && (this._throttleTimeout = window.setTimeout(() => {
        this._throttleTimeout = void 0, this._open && this._position();
      }, 100));
    }, this._panelForHideListeners = null, this._panelMouseEnterBound = () => this._clearHideTimer(), this._panelMouseLeaveBound = (t) => {
      var i;
      const e = t.relatedTarget;
      e && ((i = this._triggerRef) != null && i.contains(e)) || this.hide();
    }, this._onTriggerFocus = () => {
      this._listensFocus && this.show();
    }, this._onTriggerBlur = () => {
      this._listensFocus && this.hide(!0);
    }, this._onTriggerMouseEnter = () => {
      this._listensHover && this.show();
    }, this._onTriggerMouseLeave = (t) => {
      var r;
      const e = t.relatedTarget, i = this._panelRef ?? ((r = this.shadowRoot) == null ? void 0 : r.querySelector(".swim-tooltip__panel"));
      i != null && i.contains(e) || (this._listensHover && this.closeOnMouseLeave && this.hide(), this._listensClick && this.hide());
    }, this._onPanelMouseLeave = () => {
      this.closeOnMouseLeave && this.hide();
    }, this._onTriggerClick = () => {
      if (this.showEvent === m.mouseover) {
        this.hide(!0);
        return;
      }
      this._listensClick && (this._openFromClick ? this.hide(!0) : (this._openFromClick = !0, this.show(!0)));
    };
  }
  get spacing() {
    return this._spacing;
  }
  set spacing(t) {
    this._spacing = Y(t, 10);
  }
  get showCaret() {
    return this._showCaret;
  }
  set showCaret(t) {
    this._showCaret = q(t);
  }
  get disabled() {
    return this._disabled;
  }
  set disabled(t) {
    this._disabled = q(t);
  }
  get closeOnClickOutside() {
    return this._closeOnClickOutside;
  }
  set closeOnClickOutside(t) {
    this._closeOnClickOutside = q(t);
  }
  get closeOnMouseLeave() {
    return this._closeOnMouseLeave;
  }
  set closeOnMouseLeave(t) {
    this._closeOnMouseLeave = q(t);
  }
  get hideTimeout() {
    return this._hideTimeout;
  }
  set hideTimeout(t) {
    this._hideTimeout = Y(t, 300);
  }
  get showTimeout() {
    return this._showTimeout;
  }
  set showTimeout(t) {
    this._showTimeout = Y(t, 100);
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("resize", this._throttledPosition);
  }
  disconnectedCallback() {
    window.removeEventListener("resize", this._throttledPosition), this._throttleTimeout != null && (window.clearTimeout(this._throttleTimeout), this._throttleTimeout = void 0), this._clearShowTimer(), this._clearHideTimer(), this._removeDocumentClick(), this._removePanelHideListeners(), super.disconnectedCallback();
  }
  /** Whether the host has a child with slot="content" (detected from light DOM so we can open before panel is rendered). */
  _hasContentSlot() {
    return !!this.querySelector('[slot="content"]');
  }
  get _listensFocus() {
    return this.showEvent === m.all || this.showEvent === m.focus;
  }
  get _listensHover() {
    return this.showEvent === m.all || this.showEvent === m.mouseover;
  }
  get _listensClick() {
    return this.showEvent === m.all || this.showEvent === m.click;
  }
  /** Opens the tooltip (optionally immediately, without show timeout). */
  show(t = !1) {
    if (this._open || this.disabled) return;
    this._clearShowTimer(), this._clearHideTimer();
    const e = () => {
      this._open || this.disabled || !(this._hasContentSlot || this.content != null && this.content !== "") || (this._open = !0, this._effectivePlacement = this.placement, requestAnimationFrame(() => {
        this._position(), requestAnimationFrame(() => {
          this._animate = !0, this._addHideListeners();
        });
      }), this.dispatchEvent(new CustomEvent("show", { detail: !0, bubbles: !1, composed: !1 })));
    };
    t ? e() : this._showTimer = window.setTimeout(e, this.showTimeout);
  }
  /** Hides the tooltip (optionally immediately). */
  hide(t = !1) {
    if (!this._open) return;
    this._clearShowTimer(), this._clearHideTimer();
    const e = () => {
      this._open && (this._open = !1, this._animate = !1, this._openFromClick = !1, this._removeDocumentClick(), this._removePanelHideListeners(), this.dispatchEvent(new CustomEvent("hide", { detail: !0, bubbles: !1, composed: !1 })));
    };
    t ? e() : this._hideTimer = window.setTimeout(e, this.hideTimeout);
  }
  _clearShowTimer() {
    this._showTimer != null && (window.clearTimeout(this._showTimer), this._showTimer = void 0);
  }
  _clearHideTimer() {
    this._hideTimer != null && (window.clearTimeout(this._hideTimer), this._hideTimer = void 0);
  }
  _removeDocumentClick() {
    this._boundDocumentClick && (document.removeEventListener("click", this._boundDocumentClick, !0), this._boundDocumentClick = null);
  }
  _position() {
    var a, p, _;
    const t = this._triggerRef ?? ((a = this.shadowRoot) == null ? void 0 : a.querySelector(".swim-tooltip__trigger")), e = this._panelRef ?? ((p = this.shadowRoot) == null ? void 0 : p.querySelector(".swim-tooltip__panel")), i = this._caretRef ?? ((_ = this.shadowRoot) == null ? void 0 : _.querySelector(".swim-tooltip__caret"));
    if (!t || !e) return;
    const r = t.getBoundingClientRect();
    if (!r.height && !r.width) return;
    const o = e.getBoundingClientRect();
    this._effectivePlacement = ne(this.placement, o, r, this.spacing, this.alignment);
    const { top: n, left: l } = ae(this._effectivePlacement, o, r, this.spacing, this.alignment);
    if (this._panelTop = n, this._panelLeft = l, this.showCaret && i) {
      const h = i.getBoundingClientRect(), b = le(this._effectivePlacement, o, r, h, this.alignment);
      this._caretTop = b.top, this._caretLeft = b.left;
    }
  }
  _removePanelHideListeners() {
    this._panelForHideListeners && (this._panelForHideListeners.removeEventListener("mouseenter", this._panelMouseEnterBound), this._panelForHideListeners.removeEventListener("mouseleave", this._panelMouseLeaveBound), this._panelForHideListeners = null);
  }
  _addHideListeners() {
    var e;
    const t = this._panelRef ?? ((e = this.shadowRoot) == null ? void 0 : e.querySelector(".swim-tooltip__panel"));
    t && (this._removePanelHideListeners(), this._panelForHideListeners = t, t.addEventListener("mouseenter", this._panelMouseEnterBound), this.closeOnMouseLeave && t.addEventListener("mouseleave", this._panelMouseLeaveBound), this.closeOnClickOutside && (this._boundDocumentClick = (i) => {
      var o;
      const r = i.target;
      t.contains(r) || (o = this._triggerRef) != null && o.contains(r) || this.hide(!0);
    }, setTimeout(() => document.addEventListener("click", this._boundDocumentClick, !0), 0)));
  }
  firstUpdated() {
    var t, e, i;
    this._triggerRef = (t = this.shadowRoot) == null ? void 0 : t.querySelector(".swim-tooltip__trigger"), this._panelRef = (e = this.shadowRoot) == null ? void 0 : e.querySelector(".swim-tooltip__panel"), this._caretRef = (i = this.shadowRoot) == null ? void 0 : i.querySelector(".swim-tooltip__caret");
  }
  updated(t) {
    this._open && (t.has("placement") || t.has("alignment") || t.has("spacing")) && this._position();
  }
  render() {
    const t = this._hasContentSlot(), e = t || this.content != null && this.content !== "", i = [
      "swim-tooltip__panel",
      `swim-tooltip__panel--type-${this.type}`,
      `swim-tooltip__panel--position-${this._effectivePlacement}`,
      this._animate ? "swim-tooltip__panel--animate" : "",
      this.cssClass.includes("narrow") ? "swim-tooltip__panel--narrow" : ""
    ].filter(Boolean).join(" ");
    return M`
      <div
        part="trigger"
        class="swim-tooltip__trigger"
        aria-describedby="${this._open && e ? this._tooltipId : u}"
        aria-expanded="${this._listensClick ? this._open ? "true" : "false" : u}"
        @focusin="${this._onTriggerFocus}"
        @focusout="${this._onTriggerBlur}"
        @mouseenter="${this._onTriggerMouseEnter}"
        @mouseleave="${this._onTriggerMouseLeave}"
        @click="${this._onTriggerClick}"
      >
        <slot></slot>
      </div>

      ${this._open && e ? M`
            <div
              part="panel"
              id="${this._tooltipId}"
              class="${i}"
              style="top: ${this._panelTop}px; left: ${this._panelLeft}px;"
              role="tooltip"
              aria-hidden="false"
              @mouseenter="${() => this._clearHideTimer()}"
              @mouseleave="${this._onPanelMouseLeave}"
            >
              ${this.showCaret ? M`
                    <span
                      part="caret"
                      class="swim-tooltip__caret swim-tooltip__caret--position-${this._effectivePlacement}"
                      style="top: ${this._caretTop}px; left: ${this._caretLeft}px;"
                    ></span>
                  ` : ""}
              <div part="content" class="swim-tooltip__content">
                ${t ? M`<slot name="content"></slot>` : M`${ee(this.content)}`}
              </div>
            </div>
          ` : ""}
    `;
  }
};
at.styles = re;
let c = at;
g([
  f({ type: String })
], c.prototype, "content", 2);
g([
  f({ type: String, reflect: !0, attribute: "placement" })
], c.prototype, "placement", 2);
g([
  f({ type: String, reflect: !0, attribute: "alignment" })
], c.prototype, "alignment", 2);
g([
  f({ type: String, reflect: !0, attribute: "type" })
], c.prototype, "type", 2);
g([
  f({ type: String, attribute: "show-event" })
], c.prototype, "showEvent", 2);
g([
  f({ type: Number, attribute: "spacing" })
], c.prototype, "spacing", 1);
g([
  f({
    type: Boolean,
    attribute: "show-caret",
    converter: nt
  })
], c.prototype, "showCaret", 1);
g([
  f({ type: Boolean, reflect: !0, converter: he })
], c.prototype, "disabled", 1);
g([
  f({ type: Boolean, attribute: "close-on-click-outside", converter: nt })
], c.prototype, "closeOnClickOutside", 1);
g([
  f({ type: Boolean, attribute: "close-on-mouse-leave", converter: nt })
], c.prototype, "closeOnMouseLeave", 1);
g([
  f({ type: Number, attribute: "hide-timeout" })
], c.prototype, "hideTimeout", 1);
g([
  f({ type: Number, attribute: "show-timeout" })
], c.prototype, "showTimeout", 1);
g([
  f({ type: String, attribute: "css-class" })
], c.prototype, "cssClass", 2);
g([
  P()
], c.prototype, "_open", 2);
g([
  P()
], c.prototype, "_panelTop", 2);
g([
  P()
], c.prototype, "_panelLeft", 2);
g([
  P()
], c.prototype, "_effectivePlacement", 2);
g([
  P()
], c.prototype, "_caretTop", 2);
g([
  P()
], c.prototype, "_caretLeft", 2);
g([
  P()
], c.prototype, "_animate", 2);
customElements.get(xt) || customElements.define(xt, c);
export {
  $ as AlignmentType,
  d as PlacementType,
  m as ShowType,
  Ot as StyleType,
  c as SwimTooltip
};
