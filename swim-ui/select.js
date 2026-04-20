/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Q = globalThis, le = Q.ShadowRoot && (Q.ShadyCSS === void 0 || Q.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ae = Symbol(), fe = /* @__PURE__ */ new WeakMap();
let De = class {
  constructor(e, t, i) {
    if (this._$cssResult$ = !0, i !== ae) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (le && e === void 0) {
      const i = t !== void 0 && t.length === 1;
      i && (e = fe.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && fe.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Be = (n) => new De(typeof n == "string" ? n : n + "", void 0, ae), R = (n, ...e) => {
  const t = n.length === 1 ? n[0] : e.reduce((i, o, r) => i + ((s) => {
    if (s._$cssResult$ === !0) return s.cssText;
    if (typeof s == "number") return s;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + s + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + n[r + 1], n[0]);
  return new De(t, n, ae);
}, qe = (n, e) => {
  if (le) n.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const i = document.createElement("style"), o = Q.litNonce;
    o !== void 0 && i.setAttribute("nonce", o), i.textContent = t.cssText, n.appendChild(i);
  }
}, ue = le ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const i of e.cssRules) t += i.cssText;
  return Be(t);
})(n) : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: je, defineProperty: Ve, getOwnPropertyDescriptor: Ge, getOwnPropertyNames: We, getOwnPropertySymbols: Ke, getPrototypeOf: Qe } = Object, S = globalThis, me = S.trustedTypes, Je = me ? me.emptyScript : "", te = S.reactiveElementPolyfillSupport, B = (n, e) => n, J = { toAttribute(n, e) {
  switch (e) {
    case Boolean:
      n = n ? Je : null;
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
} }, ce = (n, e) => !je(n, e), we = { attribute: !0, type: String, converter: J, reflect: !1, useDefault: !1, hasChanged: ce };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), S.litPropertyMetadata ?? (S.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let H = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = we) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const i = Symbol(), o = this.getPropertyDescriptor(e, i, t);
      o !== void 0 && Ve(this.prototype, e, o);
    }
  }
  static getPropertyDescriptor(e, t, i) {
    const { get: o, set: r } = Ge(this.prototype, e) ?? { get() {
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
    return this.elementProperties.get(e) ?? we;
  }
  static _$Ei() {
    if (this.hasOwnProperty(B("elementProperties"))) return;
    const e = Qe(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(B("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(B("properties"))) {
      const t = this.properties, i = [...We(t), ...Ke(t)];
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
      for (const o of i) t.unshift(ue(o));
    } else e !== void 0 && t.push(ue(e));
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
    return qe(e, this.constructor.elementStyles), e;
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
      const s = (((r = i.converter) == null ? void 0 : r.toAttribute) !== void 0 ? i.converter : J).toAttribute(t, i.type);
      this._$Em = e, s == null ? this.removeAttribute(o) : this.setAttribute(o, s), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var r, s;
    const i = this.constructor, o = i._$Eh.get(e);
    if (o !== void 0 && this._$Em !== o) {
      const l = i.getPropertyOptions(o), a = typeof l.converter == "function" ? { fromAttribute: l.converter } : ((r = l.converter) == null ? void 0 : r.fromAttribute) !== void 0 ? l.converter : J;
      this._$Em = o;
      const b = a.fromAttribute(t, l.type);
      this[o] = b ?? ((s = this._$Ej) == null ? void 0 : s.get(o)) ?? b, this._$Em = null;
    }
  }
  requestUpdate(e, t, i, o = !1, r) {
    var s;
    if (e !== void 0) {
      const l = this.constructor;
      if (o === !1 && (r = this[e]), i ?? (i = l.getPropertyOptions(e)), !((i.hasChanged ?? ce)(r, t) || i.useDefault && i.reflect && r === ((s = this._$Ej) == null ? void 0 : s.get(e)) && !this.hasAttribute(l._$Eu(e, i)))) return;
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
H.elementStyles = [], H.shadowRootOptions = { mode: "open" }, H[B("elementProperties")] = /* @__PURE__ */ new Map(), H[B("finalized")] = /* @__PURE__ */ new Map(), te == null || te({ ReactiveElement: H }), (S.reactiveElementVersions ?? (S.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const q = globalThis, ge = (n) => n, Y = q.trustedTypes, _e = Y ? Y.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, Te = "$lit$", k = `lit$${Math.random().toFixed(9).slice(2)}$`, Le = "?" + k, Ye = `<${Le}>`, L = document, j = () => L.createComment(""), V = (n) => n === null || typeof n != "object" && typeof n != "function", de = Array.isArray, Ze = (n) => de(n) || typeof (n == null ? void 0 : n[Symbol.iterator]) == "function", ie = `[ 	
\f\r]`, U = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ye = /-->/g, ve = />/g, E = RegExp(`>|${ie}(?:([^\\s"'>=/]+)(${ie}*=${ie}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), $e = /'/g, xe = /"/g, Me = /^(?:script|style|textarea|title)$/i, Xe = (n) => (e, ...t) => ({ _$litType$: n, strings: e, values: t }), g = Xe(1), M = Symbol.for("lit-noChange"), f = Symbol.for("lit-nothing"), Ae = /* @__PURE__ */ new WeakMap(), z = L.createTreeWalker(L, 129);
function He(n, e) {
  if (!de(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return _e !== void 0 ? _e.createHTML(e) : e;
}
const et = (n, e) => {
  const t = n.length - 1, i = [];
  let o, r = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", s = U;
  for (let l = 0; l < t; l++) {
    const a = n[l];
    let b, w, c = -1, m = 0;
    for (; m < a.length && (s.lastIndex = m, w = s.exec(a), w !== null); ) m = s.lastIndex, s === U ? w[1] === "!--" ? s = ye : w[1] !== void 0 ? s = ve : w[2] !== void 0 ? (Me.test(w[2]) && (o = RegExp("</" + w[2], "g")), s = E) : w[3] !== void 0 && (s = E) : s === E ? w[0] === ">" ? (s = o ?? U, c = -1) : w[1] === void 0 ? c = -2 : (c = s.lastIndex - w[2].length, b = w[1], s = w[3] === void 0 ? E : w[3] === '"' ? xe : $e) : s === xe || s === $e ? s = E : s === ye || s === ve ? s = U : (s = E, o = void 0);
    const u = s === E && n[l + 1].startsWith("/>") ? " " : "";
    r += s === U ? a + Ye : c >= 0 ? (i.push(b), a.slice(0, c) + Te + a.slice(c) + k + u) : a + k + (c === -2 ? l : u);
  }
  return [He(n, r + (n[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class G {
  constructor({ strings: e, _$litType$: t }, i) {
    let o;
    this.parts = [];
    let r = 0, s = 0;
    const l = e.length - 1, a = this.parts, [b, w] = et(e, t);
    if (this.el = G.createElement(b, i), z.currentNode = this.el.content, t === 2 || t === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (o = z.nextNode()) !== null && a.length < l; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const c of o.getAttributeNames()) if (c.endsWith(Te)) {
          const m = w[s++], u = o.getAttribute(c).split(k), _ = /([.?@])?(.*)/.exec(m);
          a.push({ type: 1, index: r, name: _[2], strings: u, ctor: _[1] === "." ? it : _[1] === "?" ? ot : _[1] === "@" ? nt : X }), o.removeAttribute(c);
        } else c.startsWith(k) && (a.push({ type: 6, index: r }), o.removeAttribute(c));
        if (Me.test(o.tagName)) {
          const c = o.textContent.split(k), m = c.length - 1;
          if (m > 0) {
            o.textContent = Y ? Y.emptyScript : "";
            for (let u = 0; u < m; u++) o.append(c[u], j()), z.nextNode(), a.push({ type: 2, index: ++r });
            o.append(c[m], j());
          }
        }
      } else if (o.nodeType === 8) if (o.data === Le) a.push({ type: 2, index: r });
      else {
        let c = -1;
        for (; (c = o.data.indexOf(k, c + 1)) !== -1; ) a.push({ type: 7, index: r }), c += k.length - 1;
      }
      r++;
    }
  }
  static createElement(e, t) {
    const i = L.createElement("template");
    return i.innerHTML = e, i;
  }
}
function I(n, e, t = n, i) {
  var s, l;
  if (e === M) return e;
  let o = i !== void 0 ? (s = t._$Co) == null ? void 0 : s[i] : t._$Cl;
  const r = V(e) ? void 0 : e._$litDirective$;
  return (o == null ? void 0 : o.constructor) !== r && ((l = o == null ? void 0 : o._$AO) == null || l.call(o, !1), r === void 0 ? o = void 0 : (o = new r(n), o._$AT(n, t, i)), i !== void 0 ? (t._$Co ?? (t._$Co = []))[i] = o : t._$Cl = o), o !== void 0 && (e = I(n, o._$AS(n, e.values), o, i)), e;
}
class tt {
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
    const { el: { content: t }, parts: i } = this._$AD, o = ((e == null ? void 0 : e.creationScope) ?? L).importNode(t, !0);
    z.currentNode = o;
    let r = z.nextNode(), s = 0, l = 0, a = i[0];
    for (; a !== void 0; ) {
      if (s === a.index) {
        let b;
        a.type === 2 ? b = new F(r, r.nextSibling, this, e) : a.type === 1 ? b = new a.ctor(r, a.name, a.strings, this, e) : a.type === 6 && (b = new st(r, this, e)), this._$AV.push(b), a = i[++l];
      }
      s !== (a == null ? void 0 : a.index) && (r = z.nextNode(), s++);
    }
    return z.currentNode = L, o;
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
    this.type = 2, this._$AH = f, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = i, this.options = o, this._$Cv = (o == null ? void 0 : o.isConnected) ?? !0;
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
    e = I(this, e, t), V(e) ? e === f || e == null || e === "" ? (this._$AH !== f && this._$AR(), this._$AH = f) : e !== this._$AH && e !== M && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Ze(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== f && V(this._$AH) ? this._$AA.nextSibling.data = e : this.T(L.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var r;
    const { values: t, _$litType$: i } = e, o = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = G.createElement(He(i.h, i.h[0]), this.options)), i);
    if (((r = this._$AH) == null ? void 0 : r._$AD) === o) this._$AH.p(t);
    else {
      const s = new tt(o, this), l = s.u(this.options);
      s.p(t), this.T(l), this._$AH = s;
    }
  }
  _$AC(e) {
    let t = Ae.get(e.strings);
    return t === void 0 && Ae.set(e.strings, t = new G(e)), t;
  }
  k(e) {
    de(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let i, o = 0;
    for (const r of e) o === t.length ? t.push(i = new F(this.O(j()), this.O(j()), this, this.options)) : i = t[o], i._$AI(r), o++;
    o < t.length && (this._$AR(i && i._$AB.nextSibling, o), t.length = o);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, t); e !== this._$AB; ) {
      const o = ge(e).nextSibling;
      ge(e).remove(), e = o;
    }
  }
  setConnected(e) {
    var t;
    this._$AM === void 0 && (this._$Cv = e, (t = this._$AP) == null || t.call(this, e));
  }
}
class X {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, i, o, r) {
    this.type = 1, this._$AH = f, this._$AN = void 0, this.element = e, this.name = t, this._$AM = o, this.options = r, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = f;
  }
  _$AI(e, t = this, i, o) {
    const r = this.strings;
    let s = !1;
    if (r === void 0) e = I(this, e, t, 0), s = !V(e) || e !== this._$AH && e !== M, s && (this._$AH = e);
    else {
      const l = e;
      let a, b;
      for (e = r[0], a = 0; a < r.length - 1; a++) b = I(this, l[i + a], t, a), b === M && (b = this._$AH[a]), s || (s = !V(b) || b !== this._$AH[a]), b === f ? e = f : e !== f && (e += (b ?? "") + r[a + 1]), this._$AH[a] = b;
    }
    s && !o && this.j(e);
  }
  j(e) {
    e === f ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class it extends X {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === f ? void 0 : e;
  }
}
class ot extends X {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== f);
  }
}
class nt extends X {
  constructor(e, t, i, o, r) {
    super(e, t, i, o, r), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = I(this, e, t, 0) ?? f) === M) return;
    const i = this._$AH, o = e === f && i !== f || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, r = e !== f && (i === f || o);
    o && this.element.removeEventListener(this.name, this, i), r && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t;
    typeof this._$AH == "function" ? this._$AH.call(((t = this.options) == null ? void 0 : t.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class st {
  constructor(e, t, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    I(this, e);
  }
}
const rt = { I: F }, oe = q.litHtmlPolyfillSupport;
oe == null || oe(G, F), (q.litHtmlVersions ?? (q.litHtmlVersions = [])).push("3.3.2");
const lt = (n, e, t) => {
  const i = (t == null ? void 0 : t.renderBefore) ?? e;
  let o = i._$litPart$;
  if (o === void 0) {
    const r = (t == null ? void 0 : t.renderBefore) ?? null;
    i._$litPart$ = o = new F(e.insertBefore(j(), r), r, void 0, t ?? {});
  }
  return o._$AI(n), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const D = globalThis;
let T = class extends H {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = lt(t, this.renderRoot, this.renderOptions);
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
    return M;
  }
};
var ze;
T._$litElement$ = !0, T.finalized = !0, (ze = D.litElementHydrateSupport) == null || ze.call(D, { LitElement: T });
const ne = D.litElementPolyfillSupport;
ne == null || ne({ LitElement: T });
(D.litElementVersions ?? (D.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const at = { attribute: !0, type: String, converter: J, reflect: !1, hasChanged: ce }, ct = (n = at, e, t) => {
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
function h(n) {
  return (e, t) => typeof t == "object" ? ct(n, e, t) : ((i, o, r) => {
    const s = o.hasOwnProperty(r);
    return o.constructor.createProperty(r, i), s ? Object.getOwnPropertyDescriptor(o, r) : void 0;
  })(n, e, t);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function $(n) {
  return h({ ...n, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const dt = (n, e, t) => (t.configurable = !0, t.enumerable = !0, Reflect.decorate && typeof e != "object" && Object.defineProperty(n, e, t), t);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Ie(n, e) {
  return (t, i, o) => {
    const r = (s) => {
      var l;
      return ((l = s.renderRoot) == null ? void 0 : l.querySelector(n)) ?? null;
    };
    return dt(t, i, { get() {
      return r(this);
    } });
  };
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ht = { CHILD: 2 }, bt = (n) => (...e) => ({ _$litDirective$: n, values: e });
let pt = class {
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
};
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { I: ft } = rt, ke = (n) => n, Se = () => document.createComment(""), N = (n, e, t) => {
  var r;
  const i = n._$AA.parentNode, o = e === void 0 ? n._$AB : e._$AA;
  if (t === void 0) {
    const s = i.insertBefore(Se(), o), l = i.insertBefore(Se(), o);
    t = new ft(s, l, n, n.options);
  } else {
    const s = t._$AB.nextSibling, l = t._$AM, a = l !== n;
    if (a) {
      let b;
      (r = t._$AQ) == null || r.call(t, n), t._$AM = n, t._$AP !== void 0 && (b = n._$AU) !== l._$AU && t._$AP(b);
    }
    if (s !== o || a) {
      let b = t._$AA;
      for (; b !== s; ) {
        const w = ke(b).nextSibling;
        ke(i).insertBefore(b, o), b = w;
      }
    }
  }
  return t;
}, P = (n, e, t = n) => (n._$AI(e, t), n), ut = {}, mt = (n, e = ut) => n._$AH = e, wt = (n) => n._$AH, se = (n) => {
  n._$AR(), n._$AA.remove();
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ce = (n, e, t) => {
  const i = /* @__PURE__ */ new Map();
  for (let o = e; o <= t; o++) i.set(n[o], o);
  return i;
}, gt = bt(class extends pt {
  constructor(n) {
    if (super(n), n.type !== ht.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(n, e, t) {
    let i;
    t === void 0 ? t = e : e !== void 0 && (i = e);
    const o = [], r = [];
    let s = 0;
    for (const l of n) o[s] = i ? i(l, s) : s, r[s] = t(l, s), s++;
    return { values: r, keys: o };
  }
  render(n, e, t) {
    return this.dt(n, e, t).values;
  }
  update(n, [e, t, i]) {
    const o = wt(n), { values: r, keys: s } = this.dt(e, t, i);
    if (!Array.isArray(o)) return this.ut = s, r;
    const l = this.ut ?? (this.ut = []), a = [];
    let b, w, c = 0, m = o.length - 1, u = 0, _ = r.length - 1;
    for (; c <= m && u <= _; ) if (o[c] === null) c++;
    else if (o[m] === null) m--;
    else if (l[c] === s[u]) a[u] = P(o[c], r[u]), c++, u++;
    else if (l[m] === s[_]) a[_] = P(o[m], r[_]), m--, _--;
    else if (l[c] === s[_]) a[_] = P(o[c], r[_]), N(n, a[_ + 1], o[c]), c++, _--;
    else if (l[m] === s[u]) a[u] = P(o[m], r[u]), N(n, o[c], o[m]), m--, u++;
    else if (b === void 0 && (b = Ce(s, u, _), w = Ce(l, c, m)), b.has(l[c])) if (b.has(l[m])) {
      const v = w.get(s[u]), ee = v !== void 0 ? o[v] : null;
      if (ee === null) {
        const pe = N(n, o[c]);
        P(pe, r[u]), a[u] = pe;
      } else a[u] = P(ee, r[u]), N(n, o[c], ee), o[v] = null;
      u++;
    } else se(o[m]), m--;
    else se(o[c]), c++;
    for (; u <= _; ) {
      const v = N(n, a[_ + 1]);
      P(v, r[u]), a[u++] = v;
    }
    for (; c <= m; ) {
      const v = o[c++];
      v !== null && se(v);
    }
    return this.ut = s, mt(n, a), M;
  }
}), Re = R`
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
R`
  * {
    box-sizing: border-box;
  }
`;
const _t = R`
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
`, yt = R`
  :host {
    display: block;
    max-width: 100%;
    margin-top: var(--spacing-16);
    margin-bottom: var(--spacing-8);
    line-height: calc(1em + 0.75em);
    padding-top: calc(0.75rem + 8px);
    padding-bottom: 0;
    position: relative;
    min-width: 0;
  }

  :host([marginless]) {
    margin-top: 0;
    margin-bottom: 0;
  }

  :host([no-label]) {
    padding-top: 0;
  }

  :host([size='md']) .select-input {
    font-size: var(--font-size-l) !important;
  }

  :host([size='lg']) .select-input {
    font-size: var(--font-size-xl) !important;
  }

  :host([focused]:not([invalid]):not([disabled])) .select-label {
    color: var(--blue-500) !important;
  }

  :host([invalid][touched]:not([disabled])) .select-underline {
    background-color: var(--red-500) !important;
  }

  :host([invalid][touched]:not([disabled])) .underline-fill {
    background-color: var(--red-500) !important;
  }

  :host([invalid][touched]:not([disabled])) .select-label,
  :host([invalid][touched]:not([disabled])) .select-hint {
    color: var(--red-500);
  }

  :host([disabled]) .select-input {
    cursor: not-allowed;
    color: var(--grey-400);
    user-select: none;
    pointer-events: none;
  }

  :host([disabled]) .select-label {
    color: var(--grey-450);
  }

  :host([disabled]) .select-placeholder {
    color: var(--grey-450);
  }

  :host([disabled]) .select-controls {
    color: var(--grey-500);
  }

  :host([disabled]) .select-underline {
    background-color: var(--grey-700);
  }

  :host([disabled]) .underline-fill {
    width: 0 !important;
  }

  :host([disabled]) .select-hint {
    color: var(--grey-450);
  }

  :host([disabled]) .select-chip {
    background: var(--grey-650);
    color: var(--grey-300);
  }

  .select-wrap {
    position: relative;
    display: block;
    margin-bottom: 0;
    width: 100%;
  }

  .select-flex-wrap {
    display: flex;
    flex-direction: row;
  }

  .select-flex-wrap-inner {
    display: flex;
    flex: 100%;
    width: 100%;
    position: relative;
  }

  .select-input-wrap {
    width: 100%;
    position: relative;
  }

  .select-input {
    align-items: center;
    position: relative;
    background: transparent;
    outline: none;
    margin-bottom: 0;
    padding-left: 0;
    width: 100%;
    min-height: var(--input-height, 33px);
    min-width: 60px;
    cursor: pointer;
    display: flex;
    border: none;
    color: var(--grey-050);
    font-size: var(--font-size-m);
    font-family: inherit;
  }

  .select-input:focus {
    outline: none;
  }

  .select-value {
    flex: 1;
    padding: 3px 0;
    min-height: 1.4em;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .select-placeholder {
    color: var(--grey-350);
  }

  .select-controls {
    display: flex;
    align-items: center;
    gap: var(--spacing-4);
    padding-right: var(--spacing-4);
    color: var(--grey-350);
  }

  .select-clear,
  .select-caret {
    background: none;
    border: none;
    padding: var(--spacing-2);
    cursor: pointer;
    color: inherit;
    font-size: var(--font-size-xxs);
    display: flex;
    align-items: center;
    transition: color 100ms;
  }

  .select-clear:hover,
  .select-caret:hover {
    color: var(--blue-400);
  }

  .select-caret {
    transition: transform 200ms ease-in-out;
    transform: rotate(0deg);
    margin-right: var(--spacing-8);
  }

  :host([open]:not([disabled])) .select-caret {
    transform: rotate(180deg);
  }

  .select-label {
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

  :host([active]) .select-label,
  :host([has-placeholder]) .select-label {
    font-size: var(--font-size-xs);
    top: -1.4em;
  }

  .select-underline {
    width: 100%;
    height: 1px;
    background-color: var(--grey-600);
  }

  .underline-fill {
    background-color: var(--blue-500);
    transition: width 250ms ease-out;
    width: 0;
    height: 2px;
    margin: 0 auto;
  }

  :host([focused]:not([disabled])) .underline-fill,
  :host([open]:not([disabled])) .underline-fill {
    width: 100%;
  }

  .select-hint {
    font-size: var(--font-size-xs);
    color: var(--grey-350);
    margin-top: var(--spacing-8);
    min-height: 1em;
    line-height: 14px;
    transition: color 0.2s ease-in-out;
  }

  /* Dropdown */
  .select-dropdown {
    position: absolute;
    left: 0;
    right: 0;
    z-index: 1000;
    background: var(--grey-700);
    border: 1px solid transparent;
    border-radius: var(--radius-4);
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    margin-top: var(--spacing-8);
    max-height: 300px;
    display: none;
  }

  :host([open]) .select-dropdown {
    display: block;
    animation: slideDown 0.25s ease-out;
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .select-filter {
    padding: var(--spacing-10);
    background: var(--grey-600);
    position: sticky;
    top: 0;
    z-index: 1;
    border-top-left-radius: var(--radius-4);
    border-top-right-radius: var(--radius-4);
  }

  .select-filter-input {
    width: 100%;
    background: transparent;
    border: none;
    outline: none;
    color: var(--grey-050);
    font-size: var(--font-size-m);
    font-family: inherit;
    padding: var(--spacing-4);
  }

  .select-filter-input::placeholder {
    color: var(--grey-350);
  }

  .select-filter-input:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }

  .select-filter--loading .select-filter-input {
    opacity: 0.85;
    cursor: wait;
  }

  .select-filter--loading {
    position: relative;
  }

  .select-options {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .select-options--grouped .select-option {
    padding-left: 25px;
  }

  .select-option-group {
    list-style: none;
    margin: 0;
    padding: 0;
    pointer-events: none;
  }

  .select-option-group-label {
    display: block;
    padding: 7px 15px;
    font-size: var(--font-size-m);
    font-weight: var(--font-weight-semibold);
    line-height: var(--font-line-height-100);
    color: var(--grey-300);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .select-option {
    padding: 7px 15px;
    font-size: var(--font-size-m);
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--grey-050);
    transition: background-color 100ms;
  }

  .select-option:not(:last-child) {
    border-bottom: 1px solid var(--grey-650);
  }

  .select-option:hover:not([disabled]) {
    background: var(--grey-750);
  }

  .select-option[selected] {
    background: var(--blue-600);
    color: var(--white);
  }

  .select-option[disabled] {
    color: var(--grey-450);
    cursor: not-allowed;
    opacity: 0.6;
  }

  .select-option[focused]:not([disabled]) {
    background: var(--grey-725);
  }

  .select-empty {
    padding: 7px 15px;
    font-size: var(--font-size-m);
    color: var(--grey-300);
    font-style: italic;
  }

  /* Multiple selection */
  :host([multiple]) .select-value {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-4);
  }

  .select-chip {
    background: var(--grey-600);
    color: var(--white);
    border-radius: var(--radius-2);
    padding: 0 0.5em;
    font-size: var(--font-size-m);
    line-height: 1.4em;
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-4);
    white-space: nowrap;
    max-width: 200px;
  }

  .select-chip-label {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .select-chip-remove {
    background: none;
    border: none;
    padding: 4px 0 0 0;
    cursor: pointer;
    color: var(--grey-350);
    font-size: 0.5em;
    line-height: 1;
    transition: color 100ms;
  }

  .select-chip-remove:hover {
    color: var(--white);
  }

  /* Fill appearance */
  :host([appearance='fill']) .select-flex-wrap {
    position: relative;
  }

  :host([appearance='fill']) .select-flex-wrap::after {
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

  :host([appearance='fill']) .select-input {
    padding: var(--spacing-4) 10px;
    position: relative;
    z-index: 1;
  }

  :host([appearance='fill']) .select-label {
    left: 0;
  }

  /* swim-icon in clear and caret buttons */
  .select-clear swim-icon,
  .select-caret swim-icon {
    display: block;
    font-size: inherit;
  }
`, vt = /* @__PURE__ */ new Set(["name", "value", "title", "label", "description", "disabled", "group"]);
function re(n, e, t) {
  return e ? n.toLowerCase().includes(e.toLowerCase()) : !0;
}
function Fe(n, e, t, i) {
  if (n == null || i > 2)
    return !1;
  if (typeof n == "number" || typeof n == "boolean")
    return re(String(n), e);
  if (typeof n == "string")
    return re(n, e);
  if (typeof n == "object" && !Array.isArray(n)) {
    const o = Object.getOwnPropertyNames(n);
    for (const r of o)
      if (Fe(n[r], e, t, i + 1))
        return !0;
  }
  return !1;
}
function $t(n, e, t) {
  const i = e.trim();
  if (!i)
    return !0;
  const o = i.toLowerCase(), r = [n.name, n.title, n.label, n.description, n.value, n.group].filter((s) => s != null).map((s) => typeof s == "string" ? s : String(s));
  for (const s of r)
    if (re(s, o))
      return !0;
  for (const s of Object.keys(n))
    if (!vt.has(s) && Fe(n[s], o, t.filterCaseSensitive, 0))
      return !0;
  return !1;
}
var Ue = /* @__PURE__ */ ((n) => (n.legacy = "legacy", n.fill = "fill", n))(Ue || {}), Ne = /* @__PURE__ */ ((n) => (n.sm = "sm", n.md = "md", n.lg = "lg", n))(Ne || {});
function y(n) {
  return n != null && `${n}` != "false";
}
const he = {
  fromAttribute: (n) => n !== "false",
  /** Omit attribute when true (default); set explicit `="false"` only when off. */
  toAttribute: (n) => n ? null : "false"
}, x = {
  fromAttribute: (n) => n !== null && n !== "false" && n !== "0",
  /**
   * Use empty string when true so the boolean attribute is present; remove when false.
   * Serializing false as `attr="false"` leaves the attribute in the DOM, so selectors like
   * `[disabled]` / `[loading]` (common in resets and lazy-load styles) still match the host.
   */
  toAttribute: (n) => n ? "" : null
}, xt = R`
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
`, At = R`
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

  ${xt}
`, kt = (n) => `swim-icon ${n.trim().split(" ").map((t) => {
  const [i, o] = t.split(":");
  return i.length ? `${i} ${i}-${o}` : o;
}).join(" ")}`;
class St {
  constructor() {
    this._defaultFontSetClass = "lit", this._iconMap = /* @__PURE__ */ new Map();
  }
  setDefaultFontSetClass(e) {
    return this._defaultFontSetClass = e, this._defaultFontSetClass;
  }
  get(e, t) {
    return this.lookup(e, t).map((i) => kt(i));
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
const Ct = new St();
var Ot = Object.defineProperty, W = (n, e, t, i) => {
  for (var o = void 0, r = n.length - 1, s; r >= 0; r--)
    (s = n[r]) && (o = s(e, t, o) || o);
  return o && Ot(e, t, o), o;
};
const Oe = "swim-icon", be = class be extends T {
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
    this._cssClasses = Ct.get(e, this.fontSet);
  }
  render() {
    var r;
    const e = this._cssClasses, t = !!this.alt, i = ((r = this.iconClass) == null ? void 0 : r.trim()) ?? "", o = i ? ` ${i}` : "";
    return !e || e.length === 0 ? g`
        <span
          part="icon"
          class="${i}"
          role="${t ? "img" : "presentation"}"
          aria-label="${t ? this.alt : f}"
          aria-hidden="${t ? "false" : "true"}"
        >
          <slot></slot>
        </span>
      ` : e.length === 1 ? g`
        <i
          part="icon"
          class="swim-icon__i ${e[0]}${o}"
          role="${t ? "img" : "presentation"}"
          aria-label="${t ? this.alt : f}"
          aria-hidden="${t ? "false" : "true"}"
        ></i>
      ` : g`
      <span
        class="swim-icon__stack"
        role="${t ? "img" : "presentation"}"
        aria-label="${t ? this.alt : f}"
        aria-hidden="${t ? "false" : "true"}"
      >
        ${e.map(
      (s, l) => g`<i part="icon icon-${l}" class="swim-icon__i swim-icon__i--${l} ${s}${o}"></i>`
    )}
      </span>
    `;
  }
};
be.styles = [Re, At];
let C = be;
W([
  h({ type: String, attribute: "font-icon" })
], C.prototype, "fontIcon");
W([
  h({ type: String })
], C.prototype, "alt");
W([
  h({ type: String, attribute: "font-set" })
], C.prototype, "fontSet");
W([
  h({ type: String, attribute: "icon-class" })
], C.prototype, "iconClass");
W([
  $()
], C.prototype, "_cssClasses");
customElements.get(Oe) || customElements.define(Oe, C);
var Et = Object.defineProperty, Pt = Object.getOwnPropertyDescriptor, O = (n, e, t, i) => {
  for (var o = i > 1 ? void 0 : i ? Pt(e, t) : e, r = n.length - 1, s; r >= 0; r--)
    (s = n[r]) && (o = (i ? s(e, t, o) : s(o)) || o);
  return i && o && Et(e, t, o), o;
};
const Ee = "swim-option";
class A extends T {
  constructor() {
    super(...arguments), this.name = "", this.label = "", this.title = "", this.description = "", this.group = "", this._disabled = !1, this._hidden = !1;
  }
  get disabled() {
    return this._disabled;
  }
  set disabled(e) {
    this._disabled = y(e);
  }
  get hidden() {
    return this._hidden;
  }
  set hidden(e) {
    this._hidden = y(e);
  }
  createRenderRoot() {
    return this;
  }
  render() {
    return g``;
  }
  connectedCallback() {
    super.connectedCallback(), this.style.display = "none", this._notifyParent();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._notifyParent();
  }
  updated() {
    this._notifyParent();
  }
  _notifyParent() {
    const e = this.closest("swim-select");
    e && typeof e._onSlottedOptionsChange == "function" && e._onSlottedOptionsChange();
  }
}
O([
  h({ type: String })
], A.prototype, "name", 2);
O([
  h()
], A.prototype, "value", 2);
O([
  h({ type: String })
], A.prototype, "label", 2);
O([
  h({ type: String })
], A.prototype, "title", 2);
O([
  h({ type: String })
], A.prototype, "description", 2);
O([
  h({ type: String })
], A.prototype, "group", 2);
O([
  h({ type: Boolean, reflect: !0, converter: x })
], A.prototype, "disabled", 1);
O([
  h({ type: Boolean, reflect: !0, converter: x })
], A.prototype, "hidden", 1);
customElements.get(Ee) || customElements.define(Ee, A);
var zt = Object.defineProperty, Dt = Object.getOwnPropertyDescriptor, p = (n, e, t, i) => {
  for (var o = i > 1 ? void 0 : i ? Dt(e, t) : e, r = n.length - 1, s; r >= 0; r--)
    (s = n[r]) && (o = (i ? s(e, t, o) : s(o)) || o);
  return i && o && zt(e, t, o), o;
};
const Pe = "swim-select", K = typeof HTMLElement < "u" && typeof HTMLElement.prototype.showPopover == "function", Z = class Z extends T {
  constructor() {
    super(), this.label = "", this.placeholder = "Select...", this.hint = "", this.emptyPlaceholder = "No options available", this.filterPlaceholder = "Filter options...", this.filterEmptyPlaceholder = "No matches", this.filterSearchingPlaceholder = "Searching…", this._asyncFilter = !1, this.filterDebounceMs = 500, this.filterMinLength = 2, this.dropdownAlign = "start", this._loading = !1, this.options = [], this._value = [], this.name = "", this.id = `swim-select-${Math.random().toString(36).substr(2, 9)}`, this._disabled = !1, this._required = !1, this.appearance = Ue.legacy, this.size = Ne.sm, this._withMargin = !0, this._withHint = !0, this._filterable = !0, this._grouped = !1, this._multiple = !1, this._allowClear = !0, this.requiredIndicator = "*", this._slottedOptions = [], this._hasSlottedHint = !1, this._open = !1, this._focused = !1, this._touched = !1, this._invalid = !1, this._filterQuery = "", this._focusedIndex = -1, this._internals = this.attachInternals();
  }
  get asyncFilter() {
    return this._asyncFilter;
  }
  set asyncFilter(e) {
    this._asyncFilter = y(e);
  }
  get loading() {
    return this._loading;
  }
  set loading(e) {
    this._loading = y(e);
  }
  get value() {
    return this.multiple ? this._value : this._value[0] ?? null;
  }
  set value(e) {
    const t = this._value;
    this.multiple ? this._value = Array.isArray(e) ? e : e ? [e] : [] : this._value = e ? [e] : [], this._internals.setFormValue(this.multiple ? JSON.stringify(this._value) : this._value[0] ?? ""), this.requestUpdate("value", t), this._updateActiveState();
  }
  get disabled() {
    return this._disabled;
  }
  set disabled(e) {
    this._disabled = y(e);
  }
  get required() {
    return this._required;
  }
  set required(e) {
    this._required = y(e);
  }
  get marginless() {
    return !this._withMargin;
  }
  set marginless(e) {
    this._withMargin = !y(e);
  }
  get withHint() {
    return this._withHint;
  }
  set withHint(e) {
    this._withHint = y(e);
  }
  get filterable() {
    return this._filterable;
  }
  set filterable(e) {
    this._filterable = y(e);
  }
  get grouped() {
    return this._grouped;
  }
  set grouped(e) {
    this._grouped = y(e);
  }
  get multiple() {
    return this._multiple;
  }
  set multiple(e) {
    this._multiple = y(e);
  }
  get allowClear() {
    return this._allowClear;
  }
  set allowClear(e) {
    this._allowClear = y(e);
  }
  /**
   * Combined options from both the `options` property and slotted `swim-option` children.
   * Slotted children take precedence when `options` property is empty.
   */
  get _allOptions() {
    return this.options.length > 0 && this._slottedOptions.length > 0 ? [...this.options, ...this._slottedOptions] : this.options.length > 0 ? this.options : this._slottedOptions;
  }
  connectedCallback() {
    super.connectedCallback(), this._collectSlottedOptions(), this._syncSlottedHintPresence(), this._setupChildObserver(), this._updateActiveState();
  }
  disconnectedCallback() {
    var t, i;
    const e = (t = this.shadowRoot) == null ? void 0 : t.querySelector(".select-dropdown");
    this._teardownDropdownTopLayer(e), super.disconnectedCallback(), this._removeClickOutsideListener(), (i = this._childObserver) == null || i.disconnect(), this._filterDebounceTimer !== void 0 && (clearTimeout(this._filterDebounceTimer), this._filterDebounceTimer = void 0);
  }
  /** Called by swim-option children when they connect/disconnect/update */
  _onSlottedOptionsChange() {
    this._collectSlottedOptions();
  }
  _collectSlottedOptions() {
    const e = Array.from(this.querySelectorAll(":scope > swim-option"));
    this._slottedOptions = e.filter((t) => !t.hasAttribute("hidden")).map((t) => {
      const i = t.getAttribute("name") || "", o = t.getAttribute("value"), r = t.getAttribute("group");
      return {
        name: i,
        value: o !== null ? o : i,
        disabled: t.hasAttribute("disabled"),
        ...r != null && r.trim() !== "" ? { group: r.trim() } : {}
      };
    });
  }
  _syncSlottedHintPresence() {
    const e = Array.from(this.children).some((t) => t.slot === "hint");
    e !== this._hasSlottedHint && (this._hasSlottedHint = e);
  }
  _setupChildObserver() {
    this._childObserver = new MutationObserver(() => {
      this._collectSlottedOptions(), this._syncSlottedHintPresence();
    }), this._childObserver.observe(this, {
      childList: !0,
      subtree: !1,
      attributes: !0,
      attributeFilter: ["slot"]
    });
  }
  updated(e) {
    super.updated(e), e.has("disabled") && (this.disabled && (this._focused = !1, this.removeAttribute("focused"), this._open && this._closeDropdown()), this._updateActiveState()), e.has("value") && (this._updateActiveState(), this._validate()), e.has("loading") && e.get("loading") === !0 && !this.loading && this._open && this.filterable && !this.disabled && this.updateComplete.then(() => {
      this.filterInput && document.activeElement !== this.filterInput && this.filterInput.focus({ preventScroll: !0 });
    }), e.has("_open") && (this._open ? (this.setAttribute("open", ""), this._addClickOutsideListener(), this.updateComplete.then(() => this._layoutOpenDropdownPanel()), setTimeout(() => {
      this.filterable && this.filterInput && !this.disabled && this.filterInput.focus();
    }, 100)) : (this.removeAttribute("open"), this._removeClickOutsideListener(), this._filterQuery = "", this._focusedIndex = -1, this._filterDebounceTimer !== void 0 && (clearTimeout(this._filterDebounceTimer), this._filterDebounceTimer = void 0))), this._open && (e.has("options") || e.has("loading")) && !e.has("_open") && this.updateComplete.then(() => this._layoutOpenDropdownPanel());
  }
  render() {
    const e = this._value.length > 0, t = this._getFilteredOptions(), i = this.allowClear && e && !this.disabled, o = t.length > 0 && !this.loading, r = this.withHint && (this.hint.trim() !== "" || this._hasSlottedHint);
    return g`
      <div class="select-wrap">
        <div class="select-flex-wrap">
          <div class="select-flex-wrap-inner">
            <div class="select-input-wrap">
              <div
                class="select-input"
                part="select"
                role="combobox"
                aria-disabled="${this.disabled ? "true" : f}"
                aria-expanded="${this._open}"
                aria-haspopup="listbox"
                aria-controls="${this.id}-listbox"
                tabindex="${this.disabled ? -1 : 0}"
                @click="${this._handleInputClick}"
                @keydown="${this._handleKeyDown}"
                @focus="${this._handleFocus}"
                @blur="${this._handleBlur}"
              >
                <div class="select-value">${this._renderValue()}</div>
                <div class="select-controls">
                  ${i ? g`
                        <button
                          type="button"
                          class="select-clear"
                          aria-label="Clear selection"
                          @click="${this._handleClear}"
                        >
                          <swim-icon font-icon="x"></swim-icon>
                        </button>
                      ` : f}
                  <button
                    type="button"
                    class="select-caret"
                    aria-label="Toggle dropdown"
                    ?disabled="${this.disabled}"
                    @click="${this._handleToggle}"
                  >
                    <swim-icon font-icon="chevron-bold-down"></swim-icon>
                  </button>
                </div>
              </div>
              <label class="select-label" for="${this.id}">
                ${this.label} ${this.required ? g`<span>${this.requiredIndicator}</span>` : f}
              </label>
            </div>
          </div>
        </div>
        <div class="select-underline">
          <div class="underline-fill"></div>
        </div>
        ${r ? g`
              <div class="select-hint">
                <slot name="hint">${this.hint}</slot>
              </div>
            ` : f}
        ${this._open ? g`
              <div
                class="select-dropdown swim-scroll"
                part="dropdown"
                role="listbox"
                id="${this.id}-listbox"
                popover="${K ? "manual" : f}"
              >
                ${this.filterable ? g`
                      <div
                        class="select-filter ${this.loading ? "select-filter--loading" : ""}"
                        aria-busy="${this.loading}"
                      >
                        <input
                          type="text"
                          class="select-filter-input"
                          placeholder="${this.filterPlaceholder}"
                          ?disabled="${this.disabled}"
                          ?readonly="${this.loading}"
                          .value="${this._filterQuery}"
                          @input="${this._handleFilterInput}"
                          @keydown="${this._handleFilterKeyDown}"
                        />
                      </div>
                    ` : f}
                ${o ? g`
                      <ul
                        class="select-options ${this.grouped && this._listHasGroupHeadings(t) ? "select-options--grouped" : ""}"
                      >
                        ${this.grouped ? this._renderGroupedOptionRows(t) : gt(
      t,
      (s) => this._getOptionValue(s),
      (s, l) => this._renderOption(s, l)
    )}
                      </ul>
                    ` : g`<div class="select-empty">${this._emptyDropdownMessage()}</div>`}
              </div>
            ` : f}
      </div>
    `;
  }
  _renderValue() {
    if (this._value.length === 0)
      return g`<span class="select-placeholder">${this.placeholder}</span>`;
    if (this.multiple)
      return g`
        ${this._value.map((e) => {
        const t = this._allOptions.find((i) => this._getOptionValue(i) === e);
        return this._renderChip(t || { name: e, value: e });
      })}
      `;
    {
      const e = this._allOptions.find((i) => this._getOptionValue(i) === this._value[0]), t = e ? this._getOptionLabel(e) : String(this._value[0]);
      return g`${t}`;
    }
  }
  _getOptionLabel(e) {
    const t = e.title ?? e.label;
    return t != null && String(t).length > 0 ? String(t) : e.name;
  }
  /** Non-empty section title from `group`. */
  _groupHeading(e) {
    const t = e.group;
    return t != null && String(t).trim() !== "" ? String(t).trim() : "";
  }
  _listHasGroupHeadings(e) {
    return e.some((t) => this._groupHeading(t).length > 0);
  }
  _renderGroupedOptionRows(e) {
    let t = "";
    const i = [];
    for (let o = 0; o < e.length; o++) {
      const r = e[o], s = this._groupHeading(r);
      s ? s !== t && (i.push(g`
            <li class="select-option-group" role="presentation">
              <span class="select-option-group-label">${s}</span>
            </li>
          `), t = s) : t = "", i.push(this._renderOption(r, o));
    }
    return i;
  }
  _emptyDropdownMessage() {
    return this.loading ? this.filterSearchingPlaceholder : this.asyncFilter && this._filterQuery.trim().length < this.filterMinLength ? this.emptyPlaceholder : this._allOptions.length === 0 ? this.asyncFilter && this._filterQuery.trim().length > 0 ? this.filterEmptyPlaceholder : this.emptyPlaceholder : this.filterEmptyPlaceholder;
  }
  _renderChip(e) {
    const t = this._getOptionLabel(e);
    return g`
      <div class="select-chip">
        <span class="select-chip-label">${t}</span>
        ${this.disabled ? f : g`
              <button
                type="button"
                class="select-chip-remove"
                aria-label="Remove ${t}"
                @click="${(i) => this._removeChip(i, e)}"
              >
                <swim-icon font-icon="x"></swim-icon>
              </button>
            `}
      </div>
    `;
  }
  _renderOption(e, t) {
    const i = this._getOptionValue(e), o = this._isSelected(i), r = t === this._focusedIndex;
    return g`
      <li
        class="select-option"
        role="option"
        ?selected="${o}"
        ?focused="${r}"
        ?disabled="${e.disabled}"
        aria-selected="${o}"
        @click="${() => this._handleOptionClick(e)}"
        @mouseenter="${() => this._focusedIndex = t}"
      >
        ${this._getOptionLabel(e)}
      </li>
    `;
  }
  _handleInputClick(e) {
    this.disabled || this._toggleDropdown();
  }
  _handleToggle(e) {
    e.stopPropagation(), this.disabled || this._toggleDropdown();
  }
  _handleClear(e) {
    e.stopPropagation(), this.value = this.multiple ? [] : null, this._dispatchChange(), this._validate();
  }
  _handleFocus() {
    this.disabled || (this._focused = !0, this.setAttribute("focused", ""));
  }
  _handleBlur() {
    this._focused = !1, this.removeAttribute("focused"), this._touched || (this._touched = !0, this.setAttribute("touched", "")), this._validate();
  }
  _handleKeyDown(e) {
    if (!this.disabled)
      switch (e.key) {
        case "Enter":
        case " ":
          this._open || (e.preventDefault(), this._toggleDropdown());
          break;
        case "Escape":
          this._open && (e.preventDefault(), this._closeDropdown());
          break;
        case "ArrowDown":
          e.preventDefault(), this._open ? this._moveFocus(1) : this._openDropdown();
          break;
        case "ArrowUp":
          e.preventDefault(), this._open && this._moveFocus(-1);
          break;
      }
  }
  _emitFilterChange(e) {
    this.dispatchEvent(
      new CustomEvent("filter-change", {
        detail: { query: e },
        bubbles: !1,
        composed: !1
      })
    );
  }
  _handleFilterInput(e) {
    const t = e.target;
    if (this._filterQuery = t.value, this._focusedIndex = 0, this.asyncFilter) {
      this._filterDebounceTimer !== void 0 && (clearTimeout(this._filterDebounceTimer), this._filterDebounceTimer = void 0);
      const i = this._filterQuery.trim();
      if (i.length < this.filterMinLength) {
        this._emitFilterChange("");
        return;
      }
      this._filterDebounceTimer = window.setTimeout(() => {
        this._filterDebounceTimer = void 0, this._emitFilterChange(i);
      }, this.filterDebounceMs);
    }
  }
  _handleFilterKeyDown(e) {
    var t;
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault(), this._moveFocus(1);
        break;
      case "ArrowUp":
        e.preventDefault(), this._moveFocus(-1);
        break;
      case "Enter":
        e.preventDefault();
        const i = this._getFilteredOptions();
        i[this._focusedIndex] && this._handleOptionClick(i[this._focusedIndex]);
        break;
      case "Escape":
        e.preventDefault(), this._closeDropdown(), (t = this.selectInput) == null || t.focus();
        break;
    }
  }
  _handleOptionClick(e) {
    if (e.disabled) return;
    const t = this._getOptionValue(e);
    if (this.multiple) {
      const i = [...this._value], o = i.indexOf(t);
      o > -1 ? i.splice(o, 1) : i.push(t), this.value = i;
    } else
      this.value = t, this._closeDropdown();
    this._dispatchChange(), this._validate();
  }
  _removeChip(e, t) {
    e.stopPropagation();
    const i = this._getOptionValue(t), o = this._value.filter((r) => r !== i);
    this.value = o, this._dispatchChange(), this._validate();
  }
  _toggleDropdown() {
    this._open ? this._closeDropdown() : this._openDropdown();
  }
  _openDropdown() {
    this.disabled || (this._open = !0, this._focusedIndex = 0, this.dispatchEvent(new Event("dropdown-open", { bubbles: !1, composed: !1 })));
  }
  _closeDropdown() {
    var t;
    const e = (t = this.shadowRoot) == null ? void 0 : t.querySelector(".select-dropdown");
    this._teardownDropdownTopLayer(e), this._open = !1, this.dispatchEvent(new Event("dropdown-close", { bubbles: !1, composed: !1 }));
  }
  _moveFocus(e) {
    const i = this._getFilteredOptions().length - 1;
    let o = this._focusedIndex + e;
    o < 0 ? o = i : o > i && (o = 0), this._focusedIndex = o;
  }
  _getFilteredOptions() {
    return this.asyncFilter ? this._allOptions : this._filterQuery.trim() ? this._allOptions.filter(
      (e) => $t(e, this._filterQuery, { filterCaseSensitive: !1 })
    ) : this._allOptions;
  }
  _getOptionValue(e) {
    return e.value !== void 0 ? e.value : e.name;
  }
  _isSelected(e) {
    return this._value.includes(e);
  }
  _dispatchChange() {
    this.dispatchEvent(
      new CustomEvent("change", {
        detail: { value: this.value },
        bubbles: !1,
        composed: !1
      })
    );
  }
  _validate() {
    let e = !0;
    return this.required && this._value.length === 0 && (e = !1), this._invalid = !e, this._invalid ? (this.setAttribute("invalid", ""), this._internals.setValidity({ valueMissing: !0 }, "Please select an option")) : (this.removeAttribute("invalid"), this._internals.setValidity({})), e;
  }
  _updateActiveState() {
    const e = this._value.length > 0, t = !!this.placeholder;
    this._focused || e || this._open ? this.setAttribute("active", "") : this.removeAttribute("active"), t ? this.setAttribute("has-placeholder", "") : this.removeAttribute("has-placeholder"), this.label ? this.removeAttribute("no-label") : this.setAttribute("no-label", "");
  }
  _addClickOutsideListener() {
    this._clickOutsideListener = (e) => {
      e.composedPath().includes(this) || this._closeDropdown();
    }, setTimeout(() => {
      document.addEventListener("click", this._clickOutsideListener);
    }, 0);
  }
  _removeClickOutsideListener() {
    this._clickOutsideListener && (document.removeEventListener("click", this._clickOutsideListener), this._clickOutsideListener = void 0);
  }
  /** Manual popover + fixed geometry so the list escapes overflow/transform (e.g. medium dialog). */
  _layoutOpenDropdownPanel() {
    var t;
    if (!this._open || !K) return;
    const e = (t = this.shadowRoot) == null ? void 0 : t.querySelector(".select-dropdown");
    if (!(!e || !this.selectInput || typeof e.showPopover != "function")) {
      this._applyDropdownPanelGeometry(e, this.selectInput);
      try {
        e.showPopover();
      } catch {
      }
      this._addDropdownScrollListener();
    }
  }
  _applyDropdownPanelGeometry(e, t) {
    const i = t.getBoundingClientRect(), o = this.getBoundingClientRect(), r = 8, s = Math.min(300, Math.max(0, window.innerHeight - i.bottom - r - 8)), l = this.dropdownAlign === "center", a = l ? o.width : i.width;
    let b = l ? o.left : i.left;
    l && (b = Math.min(Math.max(b, 8), window.innerWidth - a - 8)), e.style.setProperty("inset", "auto"), e.style.setProperty("margin", "0"), e.style.setProperty("height", "auto"), e.style.setProperty("position", "fixed"), e.style.setProperty("left", `${b}px`), e.style.setProperty("top", `${i.bottom + r}px`), e.style.setProperty("width", `${a}px`), e.style.setProperty("max-height", `${s}px`), e.style.setProperty("z-index", "2147483646"), e.style.setProperty("animation", "none"), e.style.setProperty("transform", "none");
  }
  _clearDropdownPanelGeometry(e) {
    [
      "inset",
      "margin",
      "height",
      "position",
      "left",
      "top",
      "width",
      "max-height",
      "z-index",
      "animation",
      "transform"
    ].forEach((t) => e.style.removeProperty(t));
  }
  _teardownDropdownTopLayer(e) {
    var t;
    if (this._removeDropdownScrollListener(), !(!e || !K)) {
      try {
        (t = e.hidePopover) == null || t.call(e);
      } catch {
      }
      this._clearDropdownPanelGeometry(e);
    }
  }
  _addDropdownScrollListener() {
    !K || this._dropdownScrollOrResizeListener || (this._dropdownScrollOrResizeListener = () => {
      var t;
      if (!this._open) return;
      const e = (t = this.shadowRoot) == null ? void 0 : t.querySelector(".select-dropdown");
      e && this.selectInput && this._applyDropdownPanelGeometry(e, this.selectInput);
    }, window.addEventListener("scroll", this._dropdownScrollOrResizeListener, !0), window.addEventListener("resize", this._dropdownScrollOrResizeListener));
  }
  _removeDropdownScrollListener() {
    this._dropdownScrollOrResizeListener && (window.removeEventListener("scroll", this._dropdownScrollOrResizeListener, !0), window.removeEventListener("resize", this._dropdownScrollOrResizeListener), this._dropdownScrollOrResizeListener = void 0);
  }
  // Form API
  formResetCallback() {
    this.value = this.multiple ? [] : null, this._touched = !1, this.removeAttribute("touched");
  }
  formDisabledCallback(e) {
    this.disabled = e;
  }
};
Z.styles = [Re, _t, yt], Z.formAssociated = !0;
let d = Z;
p([
  Ie(".select-input")
], d.prototype, "selectInput", 2);
p([
  Ie(".select-filter-input")
], d.prototype, "filterInput", 2);
p([
  h({ type: String })
], d.prototype, "label", 2);
p([
  h({ type: String })
], d.prototype, "placeholder", 2);
p([
  h({ type: String })
], d.prototype, "hint", 2);
p([
  h({ type: String, attribute: "empty-placeholder" })
], d.prototype, "emptyPlaceholder", 2);
p([
  h({ type: String, attribute: "filter-placeholder" })
], d.prototype, "filterPlaceholder", 2);
p([
  h({ type: String, attribute: "filter-empty-placeholder" })
], d.prototype, "filterEmptyPlaceholder", 2);
p([
  h({ type: String, attribute: "filter-searching-placeholder" })
], d.prototype, "filterSearchingPlaceholder", 2);
p([
  h({ type: Boolean, attribute: "async-filter", converter: x })
], d.prototype, "asyncFilter", 1);
p([
  h({ type: Number, attribute: "filter-debounce-ms" })
], d.prototype, "filterDebounceMs", 2);
p([
  h({ type: Number, attribute: "filter-min-length" })
], d.prototype, "filterMinLength", 2);
p([
  h({ type: String, attribute: "dropdown-align" })
], d.prototype, "dropdownAlign", 2);
p([
  h({ type: Boolean, reflect: !0, converter: x })
], d.prototype, "loading", 1);
p([
  h({ type: Array })
], d.prototype, "options", 2);
p([
  h()
], d.prototype, "value", 1);
p([
  h({ type: String })
], d.prototype, "name", 2);
p([
  h({ type: String })
], d.prototype, "id", 2);
p([
  h({ type: Boolean, reflect: !0, converter: x })
], d.prototype, "disabled", 1);
p([
  h({ type: Boolean, reflect: !0, converter: x })
], d.prototype, "required", 1);
p([
  h({ type: String, reflect: !0 })
], d.prototype, "appearance", 2);
p([
  h({ type: String, reflect: !0 })
], d.prototype, "size", 2);
p([
  h({ type: Boolean, reflect: !0, attribute: "marginless", converter: x })
], d.prototype, "marginless", 1);
p([
  h({ type: Boolean, converter: he })
], d.prototype, "withHint", 1);
p([
  h({ type: Boolean, converter: he })
], d.prototype, "filterable", 1);
p([
  h({ type: Boolean, reflect: !0, converter: x })
], d.prototype, "grouped", 1);
p([
  h({ type: Boolean, reflect: !0, converter: x })
], d.prototype, "multiple", 1);
p([
  h({ type: Boolean, attribute: "allow-clear", converter: he })
], d.prototype, "allowClear", 1);
p([
  h({ type: String, attribute: "required-indicator" })
], d.prototype, "requiredIndicator", 2);
p([
  $()
], d.prototype, "_slottedOptions", 2);
p([
  $()
], d.prototype, "_hasSlottedHint", 2);
p([
  $()
], d.prototype, "_open", 2);
p([
  $()
], d.prototype, "_focused", 2);
p([
  $()
], d.prototype, "_touched", 2);
p([
  $()
], d.prototype, "_invalid", 2);
p([
  $()
], d.prototype, "_filterQuery", 2);
p([
  $()
], d.prototype, "_focusedIndex", 2);
customElements.get(Pe) || customElements.define(Pe, d);
export {
  A as SwimOption,
  d as SwimSelect
};
