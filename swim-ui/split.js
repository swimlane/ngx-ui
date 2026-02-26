/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const W = globalThis, Q = W.ShadowRoot && (W.ShadyCSS === void 0 || W.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, tt = Symbol(), ct = /* @__PURE__ */ new WeakMap();
let Pt = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== tt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Q && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = ct.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && ct.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const kt = (r) => new Pt(typeof r == "string" ? r : r + "", void 0, tt), j = (r, ...t) => {
  const e = r.length === 1 ? r[0] : t.reduce((s, i, n) => s + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + r[n + 1], r[0]);
  return new Pt(e, r, tt);
}, Nt = (r, t) => {
  if (Q) r.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), i = W.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = e.cssText, r.appendChild(s);
  }
}, dt = Q ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return kt(e);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Dt, defineProperty: jt, getOwnPropertyDescriptor: Ft, getOwnPropertyNames: It, getOwnPropertySymbols: Wt, getPrototypeOf: qt } = Object, m = globalThis, ut = m.trustedTypes, Vt = ut ? ut.emptyScript : "", J = m.reactiveElementPolyfillSupport, L = (r, t) => r, q = { toAttribute(r, t) {
  switch (t) {
    case Boolean:
      r = r ? Vt : null;
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
} }, et = (r, t) => !Dt(r, t), pt = { attribute: !0, type: String, converter: q, reflect: !1, useDefault: !1, hasChanged: et };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), m.litPropertyMetadata ?? (m.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let P = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = pt) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(t, s, e);
      i !== void 0 && jt(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: i, set: n } = Ft(this.prototype, t) ?? { get() {
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
    return this.elementProperties.get(t) ?? pt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(L("elementProperties"))) return;
    const t = qt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(L("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(L("properties"))) {
      const e = this.properties, s = [...It(e), ...Wt(e)];
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
      for (const i of s) e.unshift(dt(i));
    } else t !== void 0 && e.push(dt(t));
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
    return Nt(t, this.constructor.elementStyles), t;
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
      const o = (((n = s.converter) == null ? void 0 : n.toAttribute) !== void 0 ? s.converter : q).toAttribute(e, s.type);
      this._$Em = t, o == null ? this.removeAttribute(i) : this.setAttribute(i, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var n, o;
    const s = this.constructor, i = s._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const l = s.getPropertyOptions(i), a = typeof l.converter == "function" ? { fromAttribute: l.converter } : ((n = l.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? l.converter : q;
      this._$Em = i;
      const c = a.fromAttribute(e, l.type);
      this[i] = c ?? ((o = this._$Ej) == null ? void 0 : o.get(i)) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, e, s, i = !1, n) {
    var o;
    if (t !== void 0) {
      const l = this.constructor;
      if (i === !1 && (n = this[t]), s ?? (s = l.getPropertyOptions(t)), !((s.hasChanged ?? et)(n, e) || s.useDefault && s.reflect && n === ((o = this._$Ej) == null ? void 0 : o.get(t)) && !this.hasAttribute(l._$Eu(t, s)))) return;
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
P.elementStyles = [], P.shadowRootOptions = { mode: "open" }, P[L("elementProperties")] = /* @__PURE__ */ new Map(), P[L("finalized")] = /* @__PURE__ */ new Map(), J == null || J({ ReactiveElement: P }), (m.reactiveElementVersions ?? (m.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const R = globalThis, gt = (r) => r, V = R.trustedTypes, bt = V ? V.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, St = "$lit$", f = `lit$${Math.random().toFixed(9).slice(2)}$`, Ct = "?" + f, Gt = `<${Ct}>`, x = document, T = () => x.createComment(""), z = (r) => r === null || typeof r != "object" && typeof r != "function", st = Array.isArray, Zt = (r) => st(r) || typeof (r == null ? void 0 : r[Symbol.iterator]) == "function", K = `[ 	
\f\r]`, O = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, _t = /-->/g, ft = />/g, $ = RegExp(`>|${K}(?:([^\\s"'>=/]+)(${K}*=${K}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), mt = /'/g, $t = /"/g, Mt = /^(?:script|style|textarea|title)$/i, Jt = (r) => (t, ...e) => ({ _$litType$: r, strings: t, values: e }), it = Jt(1), M = Symbol.for("lit-noChange"), p = Symbol.for("lit-nothing"), yt = /* @__PURE__ */ new WeakMap(), y = x.createTreeWalker(x, 129);
function Bt(r, t) {
  if (!st(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return bt !== void 0 ? bt.createHTML(t) : t;
}
const Kt = (r, t) => {
  const e = r.length - 1, s = [];
  let i, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = O;
  for (let l = 0; l < e; l++) {
    const a = r[l];
    let c, d, h = -1, u = 0;
    for (; u < a.length && (o.lastIndex = u, d = o.exec(a), d !== null); ) u = o.lastIndex, o === O ? d[1] === "!--" ? o = _t : d[1] !== void 0 ? o = ft : d[2] !== void 0 ? (Mt.test(d[2]) && (i = RegExp("</" + d[2], "g")), o = $) : d[3] !== void 0 && (o = $) : o === $ ? d[0] === ">" ? (o = i ?? O, h = -1) : d[1] === void 0 ? h = -2 : (h = o.lastIndex - d[2].length, c = d[1], o = d[3] === void 0 ? $ : d[3] === '"' ? $t : mt) : o === $t || o === mt ? o = $ : o === _t || o === ft ? o = O : (o = $, i = void 0);
    const g = o === $ && r[l + 1].startsWith("/>") ? " " : "";
    n += o === O ? a + Gt : h >= 0 ? (s.push(c), a.slice(0, h) + St + a.slice(h) + f + g) : a + f + (h === -2 ? l : g);
  }
  return [Bt(r, n + (r[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class k {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let n = 0, o = 0;
    const l = t.length - 1, a = this.parts, [c, d] = Kt(t, e);
    if (this.el = k.createElement(c, s), y.currentNode = this.el.content, e === 2 || e === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (i = y.nextNode()) !== null && a.length < l; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const h of i.getAttributeNames()) if (h.endsWith(St)) {
          const u = d[o++], g = i.getAttribute(h).split(f), _ = /([.?@])?(.*)/.exec(u);
          a.push({ type: 1, index: n, name: _[2], strings: g, ctor: _[1] === "." ? Yt : _[1] === "?" ? Qt : _[1] === "@" ? te : G }), i.removeAttribute(h);
        } else h.startsWith(f) && (a.push({ type: 6, index: n }), i.removeAttribute(h));
        if (Mt.test(i.tagName)) {
          const h = i.textContent.split(f), u = h.length - 1;
          if (u > 0) {
            i.textContent = V ? V.emptyScript : "";
            for (let g = 0; g < u; g++) i.append(h[g], T()), y.nextNode(), a.push({ type: 2, index: ++n });
            i.append(h[u], T());
          }
        }
      } else if (i.nodeType === 8) if (i.data === Ct) a.push({ type: 2, index: n });
      else {
        let h = -1;
        for (; (h = i.data.indexOf(f, h + 1)) !== -1; ) a.push({ type: 7, index: n }), h += f.length - 1;
      }
      n++;
    }
  }
  static createElement(t, e) {
    const s = x.createElement("template");
    return s.innerHTML = t, s;
  }
}
function B(r, t, e = r, s) {
  var o, l;
  if (t === M) return t;
  let i = s !== void 0 ? (o = e._$Co) == null ? void 0 : o[s] : e._$Cl;
  const n = z(t) ? void 0 : t._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== n && ((l = i == null ? void 0 : i._$AO) == null || l.call(i, !1), n === void 0 ? i = void 0 : (i = new n(r), i._$AT(r, e, s)), s !== void 0 ? (e._$Co ?? (e._$Co = []))[s] = i : e._$Cl = i), i !== void 0 && (t = B(r, i._$AS(r, t.values), i, s)), t;
}
class Xt {
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
    const { el: { content: e }, parts: s } = this._$AD, i = ((t == null ? void 0 : t.creationScope) ?? x).importNode(e, !0);
    y.currentNode = i;
    let n = y.nextNode(), o = 0, l = 0, a = s[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let c;
        a.type === 2 ? c = new F(n, n.nextSibling, this, t) : a.type === 1 ? c = new a.ctor(n, a.name, a.strings, this, t) : a.type === 6 && (c = new ee(n, this, t)), this._$AV.push(c), a = s[++l];
      }
      o !== (a == null ? void 0 : a.index) && (n = y.nextNode(), o++);
    }
    return y.currentNode = x, i;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class F {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, s, i) {
    this.type = 2, this._$AH = p, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
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
    t = B(this, t, e), z(t) ? t === p || t == null || t === "" ? (this._$AH !== p && this._$AR(), this._$AH = p) : t !== this._$AH && t !== M && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Zt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== p && z(this._$AH) ? this._$AA.nextSibling.data = t : this.T(x.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var n;
    const { values: e, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = k.createElement(Bt(s.h, s.h[0]), this.options)), s);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === i) this._$AH.p(e);
    else {
      const o = new Xt(i, this), l = o.u(this.options);
      o.p(e), this.T(l), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = yt.get(t.strings);
    return e === void 0 && yt.set(t.strings, e = new k(t)), e;
  }
  k(t) {
    st(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, i = 0;
    for (const n of t) i === e.length ? e.push(s = new F(this.O(T()), this.O(T()), this, this.options)) : s = e[i], s._$AI(n), i++;
    i < e.length && (this._$AR(s && s._$AB.nextSibling, i), e.length = i);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, e); t !== this._$AB; ) {
      const i = gt(t).nextSibling;
      gt(t).remove(), t = i;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class G {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, i, n) {
    this.type = 1, this._$AH = p, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = n, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = p;
  }
  _$AI(t, e = this, s, i) {
    const n = this.strings;
    let o = !1;
    if (n === void 0) t = B(this, t, e, 0), o = !z(t) || t !== this._$AH && t !== M, o && (this._$AH = t);
    else {
      const l = t;
      let a, c;
      for (t = n[0], a = 0; a < n.length - 1; a++) c = B(this, l[s + a], e, a), c === M && (c = this._$AH[a]), o || (o = !z(c) || c !== this._$AH[a]), c === p ? t = p : t !== p && (t += (c ?? "") + n[a + 1]), this._$AH[a] = c;
    }
    o && !i && this.j(t);
  }
  j(t) {
    t === p ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Yt extends G {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === p ? void 0 : t;
  }
}
class Qt extends G {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== p);
  }
}
class te extends G {
  constructor(t, e, s, i, n) {
    super(t, e, s, i, n), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = B(this, t, e, 0) ?? p) === M) return;
    const s = this._$AH, i = t === p && s !== p || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, n = t !== p && (s === p || i);
    i && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class ee {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    B(this, t);
  }
}
const X = R.litHtmlPolyfillSupport;
X == null || X(k, F), (R.litHtmlVersions ?? (R.litHtmlVersions = [])).push("3.3.2");
const se = (r, t, e) => {
  const s = (e == null ? void 0 : e.renderBefore) ?? t;
  let i = s._$litPart$;
  if (i === void 0) {
    const n = (e == null ? void 0 : e.renderBefore) ?? null;
    s._$litPart$ = i = new F(t.insertBefore(T(), n), n, void 0, e ?? {});
  }
  return i._$AI(r), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const v = globalThis;
class A extends P {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = se(e, this.renderRoot, this.renderOptions);
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
    return M;
  }
}
var wt;
A._$litElement$ = !0, A.finalized = !0, (wt = v.litElementHydrateSupport) == null || wt.call(v, { LitElement: A });
const Y = v.litElementPolyfillSupport;
Y == null || Y({ LitElement: A });
(v.litElementVersions ?? (v.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ie = { attribute: !0, type: String, converter: q, reflect: !1, hasChanged: et }, re = (r = ie, t, e) => {
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
function w(r) {
  return (t, e) => typeof e == "object" ? re(r, t, e) : ((s, i, n) => {
    const o = i.hasOwnProperty(n);
    return i.constructor.createProperty(n, s), o ? Object.getOwnPropertyDescriptor(i, n) : void 0;
  })(r, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ne = (r, t, e) => (e.configurable = !0, e.enumerable = !0, Reflect.decorate && typeof t != "object" && Object.defineProperty(r, t, e), e);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function oe(r, t) {
  return (e, s, i) => {
    const n = (o) => {
      var l;
      return ((l = o.renderRoot) == null ? void 0 : l.querySelector(r)) ?? null;
    };
    return ne(e, s, { get() {
      return n(this);
    } });
  };
}
const rt = j`
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
const ae = j`
  :host {
    display: flex;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
  }

  :host([direction='row']) {
    flex-direction: row;
  }

  :host([direction='column']) {
    flex-direction: column;
  }

  slot {
    display: contents;
  }
`, le = [rt, ae];
var S = /* @__PURE__ */ ((r) => (r.Row = "row", r.Column = "column", r))(S || {});
function U(r) {
  const t = String(r).indexOf("calc") > -1;
  return String(r).indexOf("%") > -1 && !t;
}
function b(r) {
  return typeof r == "string" ? Number(r.replace(/%/g, "").replace(/px/g, "").trim()) : r;
}
function Ut(r, t, e, s, i, n) {
  let o = r ? U(r) ? b(r) : b(r) / n : 0, l = t ? U(t) ? b(t) : b(t) / n : 100;
  return o = Math.max(o, s === "0" ? i : 0), l = Math.min(l, e === "0" ? i : 100), [o, l];
}
function vt(r, t, e) {
  const [s, i, n] = r.currentFlexParts, o = U(n), l = b(n), a = r.initialFlexParts[2], c = U(a) ? b(a) : b(a) / e, d = o ? l * e : l;
  let h = d + t, u = h / e;
  const [g, _] = Ut(r.minBasis, r.maxBasis, s, i, c, e);
  return u = Math.max(u, g), u = Math.min(u, _), h = u * e, r.updateBasis(o ? u + "%" : h + "px"), h - d;
}
var he = Object.defineProperty, Ot = (r, t, e, s) => {
  for (var i = void 0, n = r.length - 1, o; n >= 0; n--)
    (o = r[n]) && (i = o(t, e, i) || i);
  return i && he(t, e, i), i;
};
const At = "swim-split", nt = class nt extends A {
  constructor() {
    super(...arguments), this.direction = S.Row, this._areas = [], this._handles = [], this._handleListeners = /* @__PURE__ */ new Map(), this._onSlotChange = () => {
      this._collectAreasAndHandles(), this._removeHandleListeners(), this._attachHandleListeners();
    };
  }
  connectedCallback() {
    super.connectedCallback(), this.addEventListener("slotchange", this._onSlotChange);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.removeEventListener("slotchange", this._onSlotChange), this._removeHandleListeners();
  }
  updated(t) {
    t.has("direction") && this._handles.forEach((e) => {
      e.direction = this.direction;
    });
  }
  firstUpdated() {
    requestAnimationFrame(() => {
      this._collectAreasAndHandles(), this._attachHandleListeners();
    });
  }
  _collectAreasAndHandles() {
    if (!this.slotEl) return;
    const t = this.slotEl.assignedElements({ flatten: !0 });
    this._areas = t.filter((e) => {
      var s;
      return ((s = e.tagName) == null ? void 0 : s.toLowerCase()) === "swim-split-area";
    }), this._handles = t.filter((e) => {
      var s;
      return ((s = e.tagName) == null ? void 0 : s.toLowerCase()) === "swim-split-handle";
    }), this._handles.forEach((e) => {
      e.direction = this.direction;
    });
  }
  _attachHandleListeners() {
    this._handles.forEach((t) => {
      const e = (i) => {
        const n = i.detail;
        n && this._onDrag(n);
      }, s = () => this._onDblClick();
      this._handleListeners.set(t, { drag: e, dblclick: s }), t.addEventListener("drag", e), t.addEventListener("dblclick", s);
    });
  }
  _removeHandleListeners() {
    this._handles.forEach((t) => {
      const e = this._handleListeners.get(t);
      e && (t.removeEventListener("drag", e.drag), t.removeEventListener("dblclick", e.dblclick), this._handleListeners.delete(t));
    });
  }
  _resize(t) {
    const i = (this.direction === S.Row ? this.clientWidth : this.clientHeight) / 100, n = this._areas;
    if (n.length === 0) return;
    const [o, ...l] = n;
    let a = t;
    a = vt(o, a, i), l.forEach((c) => {
      a += vt(c, -a, i);
    });
  }
  _onDrag(t) {
    const e = this.direction === S.Row ? t.movementX : t.movementY;
    this._resize(e);
  }
  _onDblClick() {
    const s = (this.direction === S.Row ? this.clientWidth : this.clientHeight) / 100, n = this._areas[0];
    if (!n) return;
    const [o, l, a] = n.currentFlexParts, c = U(a), d = b(a), u = (c ? d * s : d) / s, g = n.initialFlexParts[2], _ = U(g) ? b(g) : b(g) / s, [Rt, Tt] = Ut(
      n.minBasis,
      n.maxBasis,
      o,
      l,
      _,
      s
    ), lt = u - Rt, ht = Tt - u, zt = (lt < ht ? ht : -lt) * s;
    this._resize(zt);
  }
  render() {
    return it`<slot></slot>`;
  }
};
nt.styles = le;
let N = nt;
Ot([
  w({ type: String, reflect: !0 })
], N.prototype, "direction");
Ot([
  oe("slot")
], N.prototype, "slotEl");
customElements.get(At) || customElements.define(At, N);
const ce = j`
  :host {
    overflow: hidden;
    box-sizing: border-box;
    min-height: 0;
  }
`, de = [rt, ce];
function Ht(r) {
  const [t, e, s] = r;
  return `${t} ${e} ${s}`;
}
function C(r, t, e) {
  const s = e.split(" ");
  return s.length === 3 ? s : [r, t, e];
}
var ue = Object.defineProperty, pe = Object.getOwnPropertyDescriptor, Z = (r, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? pe(t, e) : t, n = r.length - 1, o; n >= 0; n--)
    (o = r[n]) && (i = (s ? o(t, e, i) : o(i)) || i);
  return s && i && ue(t, e, i), i;
};
const H = "1 1 1e-9px", xt = "swim-split-area", ot = class ot extends A {
  constructor() {
    super(...arguments), this._areaBasis = H, this.shouldAdjustMaxMin = !1, this.initialFlexParts = C("1", "1", H), this.currentFlexParts = C("1", "1", H);
  }
  get areaBasis() {
    return this._areaBasis;
  }
  set areaBasis(t) {
    this._areaBasis !== t && (this._areaBasis = t || H, this._applyBasis());
  }
  connectedCallback() {
    super.connectedCallback(), this._applyBasis();
  }
  updated() {
    this.style.flex = Ht(this.currentFlexParts), this.shouldAdjustMaxMin && this.currentFlexParts[2] ? (this.style.minWidth = this.currentFlexParts[2], this.style.maxWidth = this.currentFlexParts[2]) : (this.style.minWidth = "", this.style.maxWidth = "");
  }
  updateBasis(t) {
    this.currentFlexParts[2] = t, this.requestUpdate();
  }
  _applyBasis() {
    const t = this._areaBasis || H, [e, s, i] = C("1", "1", t);
    this.currentFlexParts = [e, s, i], this.initialFlexParts = [e, s, i], !this.minBasis && s === "0" && (this.minBasis = i), !this.maxBasis && e === "0" && (this.maxBasis = i), this.requestUpdate();
  }
  render() {
    return it`<slot></slot>`;
  }
};
ot.styles = de;
let E = ot;
Z([
  w({ type: String, attribute: "area-basis" })
], E.prototype, "areaBasis", 1);
Z([
  w({ type: String, attribute: "min-basis" })
], E.prototype, "minBasis", 2);
Z([
  w({ type: String, attribute: "max-basis" })
], E.prototype, "maxBasis", 2);
Z([
  w({ type: Boolean, attribute: "should-adjust-max-min" })
], E.prototype, "shouldAdjustMaxMin", 2);
customElements.get(xt) || customElements.define(xt, E);
const ge = j`
  :host {
    position: relative;
    box-sizing: border-box;
    flex-shrink: 0;
  }

  .swim-split-handle__grip {
    line-height: 0;
    font-size: var(--font-size-4xl);
    position: absolute;
    display: block;
    padding: 0;
    margin: 0;
    border: none;
    background: transparent;
    color: var(--grey-400);
    cursor: inherit;
  }

  .swim-split-handle__grip:hover {
    color: var(--grey-200);
  }

  .swim-split-handle__grip:focus {
    outline: none;
  }

  .swim-split-handle__grip:focus-visible {
    outline: 2px solid var(--blue-500);
    outline-offset: 2px;
  }

  :host([direction='row']) .swim-split-handle__grip {
    top: 50%;
    left: 50%;
    cursor: col-resize;
    transform: translate(-50%, -50%);
  }

  :host([direction='column']) .swim-split-handle__grip {
    left: 50%;
    cursor: row-resize;
    top: -3px;
    transform: translateX(-50%) rotate(270deg);
  }
`, be = [rt, ge];
var _e = Object.defineProperty, fe = Object.getOwnPropertyDescriptor, Lt = (r, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? fe(t, e) : t, n = r.length - 1, o; n >= 0; n--)
    (o = r[n]) && (i = (s ? o(t, e, i) : o(i)) || i);
  return s && i && _e(t, e, i), i;
};
const I = "0 0 15px", Et = "swim-split-handle", at = class at extends A {
  constructor() {
    super(...arguments), this._handleBasis = I, this.direction = S.Row, this.currentFlexParts = C("0", "0", I), this._boundMouseUp = this._onMouseUp.bind(this), this._boundMouseMove = this._onMouseMove.bind(this);
  }
  get handleBasis() {
    return this._handleBasis;
  }
  set handleBasis(t) {
    this._handleBasis !== t && (this._handleBasis = t || I, this.currentFlexParts = C("0", "0", this._handleBasis), this.requestUpdate());
  }
  connectedCallback() {
    super.connectedCallback(), this.currentFlexParts = C("0", "0", this._handleBasis || I);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), document.removeEventListener("mouseup", this._boundMouseUp, !0), document.removeEventListener("mousemove", this._boundMouseMove, !0);
  }
  updated() {
    this.style.flex = Ht(this.currentFlexParts);
  }
  _onMouseDown(t) {
    t.preventDefault(), document.addEventListener("mouseup", this._boundMouseUp, !0), document.addEventListener("mousemove", this._boundMouseMove, !0), this.dispatchEvent(new CustomEvent("dragstart", { detail: t, bubbles: !0, composed: !0 }));
  }
  _onMouseMove(t) {
    this.dispatchEvent(new CustomEvent("drag", { detail: t, bubbles: !0, composed: !0 }));
  }
  _onMouseUp(t) {
    document.removeEventListener("mouseup", this._boundMouseUp, !0), document.removeEventListener("mousemove", this._boundMouseMove, !0), this.dispatchEvent(new CustomEvent("dragend", { detail: t, bubbles: !0, composed: !0 }));
  }
  _onDblClick(t) {
    this.dispatchEvent(new CustomEvent("dblclick", { detail: t, bubbles: !0, composed: !0 }));
  }
  render() {
    return it`
      <button
        type="button"
        class="swim-split-handle__grip"
        aria-label="Resize split"
        @mousedown="${this._onMouseDown}"
        @dblclick="${this._onDblClick}"
      >
        <swim-icon font-icon="split-handle"></swim-icon>
      </button>
    `;
  }
};
at.styles = be;
let D = at;
Lt([
  w({ type: String, attribute: "handle-basis" })
], D.prototype, "handleBasis", 1);
Lt([
  w({ type: String, reflect: !0 })
], D.prototype, "direction", 2);
customElements.get(Et) || customElements.define(Et, D);
export {
  S as SplitDirection,
  N as SwimSplit,
  E as SwimSplitArea,
  D as SwimSplitHandle
};
