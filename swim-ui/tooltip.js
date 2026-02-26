/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const I = globalThis, tt = I.ShadowRoot && (I.ShadyCSS === void 0 || I.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, et = Symbol(), ht = /* @__PURE__ */ new WeakMap();
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
      i && (t = ht.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && ht.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Ot = (r) => new Ct(typeof r == "string" ? r : r + "", void 0, et), it = (r, ...t) => {
  const e = r.length === 1 ? r[0] : t.reduce((i, s, o) => i + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + r[o + 1], r[0]);
  return new Ct(e, r, et);
}, Ht = (r, t) => {
  if (tt) r.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), s = I.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = e.cssText, r.appendChild(i);
  }
}, lt = tt ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return Ot(e);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Lt, defineProperty: Mt, getOwnPropertyDescriptor: kt, getOwnPropertyNames: Rt, getOwnPropertySymbols: Ut, getPrototypeOf: Nt } = Object, A = globalThis, at = A.trustedTypes, zt = at ? at.emptyScript : "", J = A.reactiveElementPolyfillSupport, k = (r, t) => r, W = { toAttribute(r, t) {
  switch (t) {
    case Boolean:
      r = r ? zt : null;
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
} }, st = (r, t) => !Lt(r, t), pt = { attribute: !0, type: String, converter: W, reflect: !1, useDefault: !1, hasChanged: st };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), A.litPropertyMetadata ?? (A.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let O = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = pt) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), s = this.getPropertyDescriptor(t, i, e);
      s !== void 0 && Mt(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: s, set: o } = kt(this.prototype, t) ?? { get() {
      return this[e];
    }, set(n) {
      this[e] = n;
    } };
    return { get: s, set(n) {
      const l = s == null ? void 0 : s.call(this);
      o == null || o.call(this, n), this.requestUpdate(t, l, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? pt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(k("elementProperties"))) return;
    const t = Nt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(k("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(k("properties"))) {
      const e = this.properties, i = [...Rt(e), ...Ut(e)];
      for (const s of i) this.createProperty(s, e[s]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [i, s] of e) this.elementProperties.set(i, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, i] of this.elementProperties) {
      const s = this._$Eu(e, i);
      s !== void 0 && this._$Eh.set(s, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const s of i) e.unshift(lt(s));
    } else t !== void 0 && e.push(lt(t));
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
    return Ht(t, this.constructor.elementStyles), t;
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
    const i = this.constructor.elementProperties.get(t), s = this.constructor._$Eu(t, i);
    if (s !== void 0 && i.reflect === !0) {
      const n = (((o = i.converter) == null ? void 0 : o.toAttribute) !== void 0 ? i.converter : W).toAttribute(e, i.type);
      this._$Em = t, n == null ? this.removeAttribute(s) : this.setAttribute(s, n), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var o, n;
    const i = this.constructor, s = i._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const l = i.getPropertyOptions(s), h = typeof l.converter == "function" ? { fromAttribute: l.converter } : ((o = l.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? l.converter : W;
      this._$Em = s;
      const p = h.fromAttribute(e, l.type);
      this[s] = p ?? ((n = this._$Ej) == null ? void 0 : n.get(s)) ?? p, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, s = !1, o) {
    var n;
    if (t !== void 0) {
      const l = this.constructor;
      if (s === !1 && (o = this[t]), i ?? (i = l.getPropertyOptions(t)), !((i.hasChanged ?? st)(o, e) || i.useDefault && i.reflect && o === ((n = this._$Ej) == null ? void 0 : n.get(t)) && !this.hasAttribute(l._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: s, wrapped: o }, n) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, n ?? e ?? this[t]), o !== !0 || n !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), s === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [o, n] of s) {
        const { wrapped: l } = n, h = this[o];
        l !== !0 || this._$AL.has(o) || h === void 0 || this.C(o, void 0, n, h);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (i = this._$EO) == null || i.forEach((s) => {
        var o;
        return (o = s.hostUpdate) == null ? void 0 : o.call(s);
      }), this.update(e)) : this._$EM();
    } catch (s) {
      throw t = !1, this._$EM(), s;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$EO) == null || e.forEach((i) => {
      var s;
      return (s = i.hostUpdated) == null ? void 0 : s.call(i);
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
O.elementStyles = [], O.shadowRootOptions = { mode: "open" }, O[k("elementProperties")] = /* @__PURE__ */ new Map(), O[k("finalized")] = /* @__PURE__ */ new Map(), J == null || J({ ReactiveElement: O }), (A.reactiveElementVersions ?? (A.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const R = globalThis, ct = (r) => r, V = R.trustedTypes, ut = V ? V.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, xt = "$lit$", y = `lit$${Math.random().toFixed(9).slice(2)}$`, Et = "?" + y, Bt = `<${Et}>`, S = document, N = () => S.createComment(""), z = (r) => r === null || typeof r != "object" && typeof r != "function", rt = Array.isArray, Ft = (r) => rt(r) || typeof (r == null ? void 0 : r[Symbol.iterator]) == "function", K = `[ 	
\f\r]`, L = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, dt = /-->/g, _t = />/g, C = RegExp(`>|${K}(?:([^\\s"'>=/]+)(${K}*=${K}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), gt = /'/g, ft = /"/g, St = /^(?:script|style|textarea|title)$/i, jt = (r) => (t, ...e) => ({ _$litType$: r, strings: t, values: e }), M = jt(1), T = Symbol.for("lit-noChange"), u = Symbol.for("lit-nothing"), bt = /* @__PURE__ */ new WeakMap(), x = S.createTreeWalker(S, 129);
function Tt(r, t) {
  if (!rt(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ut !== void 0 ? ut.createHTML(t) : t;
}
const qt = (r, t) => {
  const e = r.length - 1, i = [];
  let s, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = L;
  for (let l = 0; l < e; l++) {
    const h = r[l];
    let p, g, a = -1, b = 0;
    for (; b < h.length && (n.lastIndex = b, g = n.exec(h), g !== null); ) b = n.lastIndex, n === L ? g[1] === "!--" ? n = dt : g[1] !== void 0 ? n = _t : g[2] !== void 0 ? (St.test(g[2]) && (s = RegExp("</" + g[2], "g")), n = C) : g[3] !== void 0 && (n = C) : n === C ? g[0] === ">" ? (n = s ?? L, a = -1) : g[1] === void 0 ? a = -2 : (a = n.lastIndex - g[2].length, p = g[1], n = g[3] === void 0 ? C : g[3] === '"' ? ft : gt) : n === ft || n === gt ? n = C : n === dt || n === _t ? n = L : (n = C, s = void 0);
    const v = n === C && r[l + 1].startsWith("/>") ? " " : "";
    o += n === L ? h + Bt : a >= 0 ? (i.push(p), h.slice(0, a) + xt + h.slice(a) + y + v) : h + y + (a === -2 ? l : v);
  }
  return [Tt(r, o + (r[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class B {
  constructor({ strings: t, _$litType$: e }, i) {
    let s;
    this.parts = [];
    let o = 0, n = 0;
    const l = t.length - 1, h = this.parts, [p, g] = qt(t, e);
    if (this.el = B.createElement(p, i), x.currentNode = this.el.content, e === 2 || e === 3) {
      const a = this.el.content.firstChild;
      a.replaceWith(...a.childNodes);
    }
    for (; (s = x.nextNode()) !== null && h.length < l; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const a of s.getAttributeNames()) if (a.endsWith(xt)) {
          const b = g[n++], v = s.getAttribute(a).split(y), j = /([.?@])?(.*)/.exec(b);
          h.push({ type: 1, index: o, name: j[2], strings: v, ctor: j[1] === "." ? Wt : j[1] === "?" ? Vt : j[1] === "@" ? Gt : Z }), s.removeAttribute(a);
        } else a.startsWith(y) && (h.push({ type: 6, index: o }), s.removeAttribute(a));
        if (St.test(s.tagName)) {
          const a = s.textContent.split(y), b = a.length - 1;
          if (b > 0) {
            s.textContent = V ? V.emptyScript : "";
            for (let v = 0; v < b; v++) s.append(a[v], N()), x.nextNode(), h.push({ type: 2, index: ++o });
            s.append(a[b], N());
          }
        }
      } else if (s.nodeType === 8) if (s.data === Et) h.push({ type: 2, index: o });
      else {
        let a = -1;
        for (; (a = s.data.indexOf(y, a + 1)) !== -1; ) h.push({ type: 7, index: o }), a += y.length - 1;
      }
      o++;
    }
  }
  static createElement(t, e) {
    const i = S.createElement("template");
    return i.innerHTML = t, i;
  }
}
function H(r, t, e = r, i) {
  var n, l;
  if (t === T) return t;
  let s = i !== void 0 ? (n = e._$Co) == null ? void 0 : n[i] : e._$Cl;
  const o = z(t) ? void 0 : t._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== o && ((l = s == null ? void 0 : s._$AO) == null || l.call(s, !1), o === void 0 ? s = void 0 : (s = new o(r), s._$AT(r, e, i)), i !== void 0 ? (e._$Co ?? (e._$Co = []))[i] = s : e._$Cl = s), s !== void 0 && (t = H(r, s._$AS(r, t.values), s, i)), t;
}
class It {
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
    const { el: { content: e }, parts: i } = this._$AD, s = ((t == null ? void 0 : t.creationScope) ?? S).importNode(e, !0);
    x.currentNode = s;
    let o = x.nextNode(), n = 0, l = 0, h = i[0];
    for (; h !== void 0; ) {
      if (n === h.index) {
        let p;
        h.type === 2 ? p = new F(o, o.nextSibling, this, t) : h.type === 1 ? p = new h.ctor(o, h.name, h.strings, this, t) : h.type === 6 && (p = new Zt(o, this, t)), this._$AV.push(p), h = i[++l];
      }
      n !== (h == null ? void 0 : h.index) && (o = x.nextNode(), n++);
    }
    return x.currentNode = S, s;
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
  constructor(t, e, i, s) {
    this.type = 2, this._$AH = u, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = s, this._$Cv = (s == null ? void 0 : s.isConnected) ?? !0;
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
    t = H(this, t, e), z(t) ? t === u || t == null || t === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : t !== this._$AH && t !== T && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Ft(t) ? this.k(t) : this._(t);
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
    const { values: e, _$litType$: i } = t, s = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = B.createElement(Tt(i.h, i.h[0]), this.options)), i);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === s) this._$AH.p(e);
    else {
      const n = new It(s, this), l = n.u(this.options);
      n.p(e), this.T(l), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = bt.get(t.strings);
    return e === void 0 && bt.set(t.strings, e = new B(t)), e;
  }
  k(t) {
    rt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, s = 0;
    for (const o of t) s === e.length ? e.push(i = new F(this.O(N()), this.O(N()), this, this.options)) : i = e[s], i._$AI(o), s++;
    s < e.length && (this._$AR(i && i._$AB.nextSibling, s), e.length = s);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, e); t !== this._$AB; ) {
      const s = ct(t).nextSibling;
      ct(t).remove(), t = s;
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
  constructor(t, e, i, s, o) {
    this.type = 1, this._$AH = u, this._$AN = void 0, this.element = t, this.name = e, this._$AM = s, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = u;
  }
  _$AI(t, e = this, i, s) {
    const o = this.strings;
    let n = !1;
    if (o === void 0) t = H(this, t, e, 0), n = !z(t) || t !== this._$AH && t !== T, n && (this._$AH = t);
    else {
      const l = t;
      let h, p;
      for (t = o[0], h = 0; h < o.length - 1; h++) p = H(this, l[i + h], e, h), p === T && (p = this._$AH[h]), n || (n = !z(p) || p !== this._$AH[h]), p === u ? t = u : t !== u && (t += (p ?? "") + o[h + 1]), this._$AH[h] = p;
    }
    n && !s && this.j(t);
  }
  j(t) {
    t === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Wt extends Z {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === u ? void 0 : t;
  }
}
class Vt extends Z {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== u);
  }
}
class Gt extends Z {
  constructor(t, e, i, s, o) {
    super(t, e, i, s, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = H(this, t, e, 0) ?? u) === T) return;
    const i = this._$AH, s = t === u && i !== u || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, o = t !== u && (i === u || s);
    s && this.element.removeEventListener(this.name, this, i), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Zt {
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
const Jt = (r, t, e) => {
  const i = (e == null ? void 0 : e.renderBefore) ?? t;
  let s = i._$litPart$;
  if (s === void 0) {
    const o = (e == null ? void 0 : e.renderBefore) ?? null;
    i._$litPart$ = s = new F(t.insertBefore(N(), o), o, void 0, e ?? {});
  }
  return s._$AI(r), s;
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Jt(e, this.renderRoot, this.renderOptions);
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
const Kt = { attribute: !0, type: String, converter: W, reflect: !1, hasChanged: st }, Qt = (r = Kt, t, e) => {
  const { kind: i, metadata: s } = e;
  let o = globalThis.litPropertyMetadata.get(s);
  if (o === void 0 && globalThis.litPropertyMetadata.set(s, o = /* @__PURE__ */ new Map()), i === "setter" && ((r = Object.create(r)).wrapped = !0), o.set(e.name, r), i === "accessor") {
    const { name: n } = e;
    return { set(l) {
      const h = t.get.call(this);
      t.set.call(this, l), this.requestUpdate(n, h, r, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(n, void 0, r, l), l;
    } };
  }
  if (i === "setter") {
    const { name: n } = e;
    return function(l) {
      const h = this[n];
      t.call(this, l), this.requestUpdate(n, h, r, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function f(r) {
  return (t, e) => typeof e == "object" ? Qt(r, t, e) : ((i, s, o) => {
    const n = s.hasOwnProperty(o);
    return s.constructor.createProperty(o, i), n ? Object.getOwnPropertyDescriptor(s, o) : void 0;
  })(r, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function P(r) {
  return f({ ...r, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Xt = { CHILD: 2 }, Yt = (r) => (...t) => ({ _$litDirective$: r, values: t });
class Dt {
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
class D extends Dt {
  constructor(t) {
    if (super(t), this.it = u, t.type !== Xt.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
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
const te = Yt(D), ee = it`
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
it`
  * {
    box-sizing: border-box;
  }
`;
const ie = it`
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
`, se = [ee, ie];
var d = /* @__PURE__ */ ((r) => (r.top = "top", r.bottom = "bottom", r.left = "left", r.right = "right", r))(d || {}), $ = /* @__PURE__ */ ((r) => (r.top = "top", r.bottom = "bottom", r.left = "left", r.right = "right", r.center = "center", r))($ || {}), Pt = /* @__PURE__ */ ((r) => (r.popover = "popover", r.tooltip = "tooltip", r))(Pt || {}), m = /* @__PURE__ */ ((r) => (r.all = "all", r.focus = "focus", r.click = "click", r.mouseover = "mouseover", r))(m || {});
const w = 7;
function G(r, t, e) {
  return e === $.left ? (r.left ?? 0) - w : e === $.right ? (r.left ?? 0) + (r.width ?? 0) - (t.width ?? 0) + w : (r.left ?? 0) + (r.width ?? 0) / 2 - (t.width ?? 0) / 2;
}
function ot(r, t, e) {
  return e === $.top ? (r.top ?? 0) - w : e === $.bottom ? (r.top ?? 0) + (r.height ?? 0) - (t.height ?? 0) + w : (r.top ?? 0) + (r.height ?? 0) / 2 - (t.height ?? 0) / 2;
}
function $t(r, t, e) {
  let i = G(r, t, e);
  return i + (t.width ?? 0) > window.innerWidth && (i = window.innerWidth - (t.width ?? 0)), i;
}
function wt(r, t, e) {
  let i = ot(r, t, e);
  return i + (t.height ?? 0) > window.innerHeight && (i = window.innerHeight - (t.height ?? 0)), i;
}
function re(r, t, e, i, s) {
  return e === d.right ? G(r, t, i) + (t.width ?? 0) + s > window.innerWidth : e === d.left ? G(r, t, i) - s < 0 : e === d.top ? (r.top ?? 0) - (t.height ?? 0) - s < 0 : e === d.bottom ? ot(r, t, i) + (t.height ?? 0) + s > window.innerHeight : !1;
}
function oe(r, t, e, i, s) {
  return re(e, t, r, s, i) ? r === d.right ? d.left : r === d.left ? d.right : r === d.top ? d.bottom : d.top : r;
}
function ne(r, t, e, i, s) {
  let o = 0, n = 0;
  return r === d.right ? (n = (e.left ?? 0) + (e.width ?? 0) + i, o = wt(e, t, s)) : r === d.left ? (n = (e.left ?? 0) - (t.width ?? 0) - i, o = wt(e, t, s)) : r === d.top ? (o = (e.top ?? 0) - (t.height ?? 0) - i, n = $t(e, t, s)) : (o = (e.top ?? 0) + (e.height ?? 0) + i, n = $t(e, t, s)), { top: o, left: n };
}
function mt(r, t, e, i) {
  let s;
  i === $.left ? s = (r.width ?? 0) / 2 - (e.width ?? 0) / 2 + w : i === $.right ? s = (t.width ?? 0) - (r.width ?? 0) / 2 - (e.width ?? 0) / 2 - w : s = (t.width ?? 0) / 2 - (e.width ?? 0) / 2;
  const o = G(r, t, i);
  return o + (t.width ?? 0) > window.innerWidth && (s += o + (t.width ?? 0) - window.innerWidth), s;
}
function vt(r, t, e, i) {
  let s;
  i === $.top ? s = (r.height ?? 0) / 2 - (e.height ?? 0) / 2 + w : i === $.bottom ? s = (t.height ?? 0) - (r.height ?? 0) / 2 - (e.height ?? 0) / 2 - w : s = (t.height ?? 0) / 2 - (e.height ?? 0) / 2;
  const o = ot(r, t, i);
  return o + (t.height ?? 0) > window.innerHeight && (s += o + (t.height ?? 0) - window.innerHeight), s;
}
function he(r, t, e, i, s) {
  let o = 0, n = 0;
  return r === d.right ? (n = -w, o = vt(e, t, i, s)) : r === d.left ? (n = t.width ?? 0, o = vt(e, t, i, s)) : r === d.top ? (o = t.height ?? 0, n = mt(e, t, i, s)) : (o = -w, n = mt(e, t, i, s)), { top: o, left: n };
}
function q(r) {
  return r != null && `${r}` != "false";
}
function Y(r, t = null) {
  return isNaN(parseFloat(r)) || isNaN(Number(r)) ? t : Number(r);
}
var le = Object.defineProperty, ae = Object.getOwnPropertyDescriptor, _ = (r, t, e, i) => {
  for (var s = i > 1 ? void 0 : i ? ae(t, e) : t, o = r.length - 1, n; o >= 0; o--)
    (n = r[o]) && (s = (i ? n(t, e, s) : n(s)) || s);
  return i && s && le(t, e, s), s;
};
const yt = "swim-tooltip", nt = class nt extends U {
  constructor() {
    super(...arguments), this.content = "", this.placement = d.top, this.alignment = $.center, this.type = Pt.popover, this.showEvent = m.all, this._spacing = 10, this._showCaret = !0, this._disabled = !1, this._closeOnClickOutside = !0, this._closeOnMouseLeave = !0, this._hideTimeout = 300, this._showTimeout = 100, this.cssClass = "", this._open = !1, this._panelTop = 0, this._panelLeft = 0, this._effectivePlacement = d.top, this._caretTop = 0, this._caretLeft = 0, this._animate = !1, this._triggerRef = null, this._panelRef = null, this._caretRef = null, this._boundDocumentClick = null, this._openFromClick = !1, this._tooltipId = `swim-tooltip-${Math.random().toString(36).slice(2, 11)}`, this._throttledPosition = () => {
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
      var s;
      const e = t.relatedTarget, i = this._panelRef ?? ((s = this.shadowRoot) == null ? void 0 : s.querySelector(".swim-tooltip__panel"));
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
      }), this.dispatchEvent(new CustomEvent("show", { detail: !0, bubbles: !0 })));
    };
    t ? e() : this._showTimer = window.setTimeout(e, this.showTimeout);
  }
  /** Hides the tooltip (optionally immediately). */
  hide(t = !1) {
    if (!this._open) return;
    this._clearShowTimer(), this._clearHideTimer();
    const e = () => {
      this._open && (this._open = !1, this._animate = !1, this._openFromClick = !1, this._removeDocumentClick(), this._removePanelHideListeners(), this.dispatchEvent(new CustomEvent("hide", { detail: !0, bubbles: !0 })));
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
    var h, p, g;
    const t = this._triggerRef ?? ((h = this.shadowRoot) == null ? void 0 : h.querySelector(".swim-tooltip__trigger")), e = this._panelRef ?? ((p = this.shadowRoot) == null ? void 0 : p.querySelector(".swim-tooltip__panel")), i = this._caretRef ?? ((g = this.shadowRoot) == null ? void 0 : g.querySelector(".swim-tooltip__caret"));
    if (!t || !e) return;
    const s = t.getBoundingClientRect();
    if (!s.height && !s.width) return;
    const o = e.getBoundingClientRect();
    this._effectivePlacement = oe(this.placement, o, s, this.spacing, this.alignment);
    const { top: n, left: l } = ne(this._effectivePlacement, o, s, this.spacing, this.alignment);
    if (this._panelTop = n, this._panelLeft = l, this.showCaret && i) {
      const a = i.getBoundingClientRect(), b = he(this._effectivePlacement, o, s, a, this.alignment);
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
      const s = i.target;
      t.contains(s) || (o = this._triggerRef) != null && o.contains(s) || this.hide(!0);
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
                ${t ? M`<slot name="content"></slot>` : M`${te(this.content)}`}
              </div>
            </div>
          ` : ""}
    `;
  }
};
nt.styles = se;
let c = nt;
_([
  f({ type: String })
], c.prototype, "content", 2);
_([
  f({ type: String, reflect: !0, attribute: "placement" })
], c.prototype, "placement", 2);
_([
  f({ type: String, reflect: !0, attribute: "alignment" })
], c.prototype, "alignment", 2);
_([
  f({ type: String, reflect: !0, attribute: "type" })
], c.prototype, "type", 2);
_([
  f({ type: String, attribute: "show-event" })
], c.prototype, "showEvent", 2);
_([
  f({ type: Number, attribute: "spacing" })
], c.prototype, "spacing", 1);
_([
  f({
    type: Boolean,
    attribute: "show-caret",
    converter: {
      fromAttribute: (r) => r !== "false",
      toAttribute: (r) => r ? "" : "false"
    }
  })
], c.prototype, "showCaret", 1);
_([
  f({ type: Boolean, reflect: !0 })
], c.prototype, "disabled", 1);
_([
  f({ type: Boolean, attribute: "close-on-click-outside" })
], c.prototype, "closeOnClickOutside", 1);
_([
  f({ type: Boolean, attribute: "close-on-mouse-leave" })
], c.prototype, "closeOnMouseLeave", 1);
_([
  f({ type: Number, attribute: "hide-timeout" })
], c.prototype, "hideTimeout", 1);
_([
  f({ type: Number, attribute: "show-timeout" })
], c.prototype, "showTimeout", 1);
_([
  f({ type: String, attribute: "css-class" })
], c.prototype, "cssClass", 2);
_([
  P()
], c.prototype, "_open", 2);
_([
  P()
], c.prototype, "_panelTop", 2);
_([
  P()
], c.prototype, "_panelLeft", 2);
_([
  P()
], c.prototype, "_effectivePlacement", 2);
_([
  P()
], c.prototype, "_caretTop", 2);
_([
  P()
], c.prototype, "_caretLeft", 2);
_([
  P()
], c.prototype, "_animate", 2);
customElements.get(yt) || customElements.define(yt, c);
export {
  $ as AlignmentType,
  d as PlacementType,
  m as ShowType,
  Pt as StyleType,
  c as SwimTooltip
};
