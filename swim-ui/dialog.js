/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const F = globalThis, Y = F.ShadowRoot && (F.ShadyCSS === void 0 || F.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ee = Symbol(), ae = /* @__PURE__ */ new WeakMap();
let ke = class {
  constructor(e, t, i) {
    if (this._$cssResult$ = !0, i !== ee) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (Y && e === void 0) {
      const i = t !== void 0 && t.length === 1;
      i && (e = ae.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && ae.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Te = (n) => new ke(typeof n == "string" ? n : n + "", void 0, ee), k = (n, ...e) => {
  const t = n.length === 1 ? n[0] : e.reduce((i, o, r) => i + ((s) => {
    if (s._$cssResult$ === !0) return s.cssText;
    if (typeof s == "number") return s;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + s + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + n[r + 1], n[0]);
  return new ke(t, n, ee);
}, Oe = (n, e) => {
  if (Y) n.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const i = document.createElement("style"), o = F.litNonce;
    o !== void 0 && i.setAttribute("nonce", o), i.textContent = t.cssText, n.appendChild(i);
  }
}, ce = Y ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const i of e.cssRules) t += i.cssText;
  return Te(t);
})(n) : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Pe, defineProperty: Me, getOwnPropertyDescriptor: Ue, getOwnPropertyNames: Re, getOwnPropertySymbols: Ie, getPrototypeOf: Ne } = Object, v = globalThis, be = v.trustedTypes, He = be ? be.emptyScript : "", J = v.reactiveElementPolyfillSupport, R = (n, e) => n, q = { toAttribute(n, e) {
  switch (e) {
    case Boolean:
      n = n ? He : null;
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
} }, te = (n, e) => !Pe(n, e), me = { attribute: !0, type: String, converter: q, reflect: !1, useDefault: !1, hasChanged: te };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), v.litPropertyMetadata ?? (v.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let z = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = me) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const i = Symbol(), o = this.getPropertyDescriptor(e, i, t);
      o !== void 0 && Me(this.prototype, e, o);
    }
  }
  static getPropertyDescriptor(e, t, i) {
    const { get: o, set: r } = Ue(this.prototype, e) ?? { get() {
      return this[t];
    }, set(s) {
      this[t] = s;
    } };
    return { get: o, set(s) {
      const a = o == null ? void 0 : o.call(this);
      r == null || r.call(this, s), this.requestUpdate(e, a, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? me;
  }
  static _$Ei() {
    if (this.hasOwnProperty(R("elementProperties"))) return;
    const e = Ne(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(R("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(R("properties"))) {
      const t = this.properties, i = [...Re(t), ...Ie(t)];
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
      for (const o of i) t.unshift(ce(o));
    } else e !== void 0 && t.push(ce(e));
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
    return Oe(e, this.constructor.elementStyles), e;
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
      const s = (((r = i.converter) == null ? void 0 : r.toAttribute) !== void 0 ? i.converter : q).toAttribute(t, i.type);
      this._$Em = e, s == null ? this.removeAttribute(o) : this.setAttribute(o, s), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var r, s;
    const i = this.constructor, o = i._$Eh.get(e);
    if (o !== void 0 && this._$Em !== o) {
      const a = i.getPropertyOptions(o), l = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((r = a.converter) == null ? void 0 : r.fromAttribute) !== void 0 ? a.converter : q;
      this._$Em = o;
      const d = l.fromAttribute(t, a.type);
      this[o] = d ?? ((s = this._$Ej) == null ? void 0 : s.get(o)) ?? d, this._$Em = null;
    }
  }
  requestUpdate(e, t, i) {
    var o;
    if (e !== void 0) {
      const r = this.constructor, s = this[e];
      if (i ?? (i = r.getPropertyOptions(e)), !((i.hasChanged ?? te)(s, t) || i.useDefault && i.reflect && s === ((o = this._$Ej) == null ? void 0 : o.get(e)) && !this.hasAttribute(r._$Eu(e, i)))) return;
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
        const { wrapped: a } = s, l = this[r];
        a !== !0 || this._$AL.has(r) || l === void 0 || this.C(r, void 0, s, l);
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
z.elementStyles = [], z.shadowRootOptions = { mode: "open" }, z[R("elementProperties")] = /* @__PURE__ */ new Map(), z[R("finalized")] = /* @__PURE__ */ new Map(), J == null || J({ ReactiveElement: z }), (v.reactiveElementVersions ?? (v.reactiveElementVersions = [])).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const I = globalThis, G = I.trustedTypes, de = G ? G.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, Ae = "$lit$", y = `lit$${Math.random().toFixed(9).slice(2)}$`, Ce = "?" + y, je = `<${Ce}>`, S = document, N = () => S.createComment(""), H = (n) => n === null || typeof n != "object" && typeof n != "function", ie = Array.isArray, Be = (n) => ie(n) || typeof (n == null ? void 0 : n[Symbol.iterator]) == "function", Z = `[ 	
\f\r]`, M = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, fe = /-->/g, he = />/g, A = RegExp(`>|${Z}(?:([^\\s"'>=/]+)(${Z}*=${Z}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), we = /'/g, ue = /"/g, Ee = /^(?:script|style|textarea|title)$/i, Le = (n) => (e, ...t) => ({ _$litType$: n, strings: e, values: t }), w = Le(1), T = Symbol.for("lit-noChange"), c = Symbol.for("lit-nothing"), ge = /* @__PURE__ */ new WeakMap(), C = S.createTreeWalker(S, 129);
function Se(n, e) {
  if (!ie(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return de !== void 0 ? de.createHTML(e) : e;
}
const De = (n, e) => {
  const t = n.length - 1, i = [];
  let o, r = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", s = M;
  for (let a = 0; a < t; a++) {
    const l = n[a];
    let d, h, b = -1, g = 0;
    for (; g < l.length && (s.lastIndex = g, h = s.exec(l), h !== null); ) g = s.lastIndex, s === M ? h[1] === "!--" ? s = fe : h[1] !== void 0 ? s = he : h[2] !== void 0 ? (Ee.test(h[2]) && (o = RegExp("</" + h[2], "g")), s = A) : h[3] !== void 0 && (s = A) : s === A ? h[0] === ">" ? (s = o ?? M, b = -1) : h[1] === void 0 ? b = -2 : (b = s.lastIndex - h[2].length, d = h[1], s = h[3] === void 0 ? A : h[3] === '"' ? ue : we) : s === ue || s === we ? s = A : s === fe || s === he ? s = M : (s = A, o = void 0);
    const _ = s === A && n[a + 1].startsWith("/>") ? " " : "";
    r += s === M ? l + je : b >= 0 ? (i.push(d), l.slice(0, b) + Ae + l.slice(b) + y + _) : l + y + (b === -2 ? a : _);
  }
  return [Se(n, r + (n[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class j {
  constructor({ strings: e, _$litType$: t }, i) {
    let o;
    this.parts = [];
    let r = 0, s = 0;
    const a = e.length - 1, l = this.parts, [d, h] = De(e, t);
    if (this.el = j.createElement(d, i), C.currentNode = this.el.content, t === 2 || t === 3) {
      const b = this.el.content.firstChild;
      b.replaceWith(...b.childNodes);
    }
    for (; (o = C.nextNode()) !== null && l.length < a; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const b of o.getAttributeNames()) if (b.endsWith(Ae)) {
          const g = h[s++], _ = o.getAttribute(b).split(y), D = /([.?@])?(.*)/.exec(g);
          l.push({ type: 1, index: r, name: D[2], strings: _, ctor: D[1] === "." ? qe : D[1] === "?" ? Ge : D[1] === "@" ? We : V }), o.removeAttribute(b);
        } else b.startsWith(y) && (l.push({ type: 6, index: r }), o.removeAttribute(b));
        if (Ee.test(o.tagName)) {
          const b = o.textContent.split(y), g = b.length - 1;
          if (g > 0) {
            o.textContent = G ? G.emptyScript : "";
            for (let _ = 0; _ < g; _++) o.append(b[_], N()), C.nextNode(), l.push({ type: 2, index: ++r });
            o.append(b[g], N());
          }
        }
      } else if (o.nodeType === 8) if (o.data === Ce) l.push({ type: 2, index: r });
      else {
        let b = -1;
        for (; (b = o.data.indexOf(y, b + 1)) !== -1; ) l.push({ type: 7, index: r }), b += y.length - 1;
      }
      r++;
    }
  }
  static createElement(e, t) {
    const i = S.createElement("template");
    return i.innerHTML = e, i;
  }
}
function O(n, e, t = n, i) {
  var s, a;
  if (e === T) return e;
  let o = i !== void 0 ? (s = t._$Co) == null ? void 0 : s[i] : t._$Cl;
  const r = H(e) ? void 0 : e._$litDirective$;
  return (o == null ? void 0 : o.constructor) !== r && ((a = o == null ? void 0 : o._$AO) == null || a.call(o, !1), r === void 0 ? o = void 0 : (o = new r(n), o._$AT(n, t, i)), i !== void 0 ? (t._$Co ?? (t._$Co = []))[i] = o : t._$Cl = o), o !== void 0 && (e = O(n, o._$AS(n, e.values), o, i)), e;
}
class Fe {
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
    let r = C.nextNode(), s = 0, a = 0, l = i[0];
    for (; l !== void 0; ) {
      if (s === l.index) {
        let d;
        l.type === 2 ? d = new B(r, r.nextSibling, this, e) : l.type === 1 ? d = new l.ctor(r, l.name, l.strings, this, e) : l.type === 6 && (d = new Ve(r, this, e)), this._$AV.push(d), l = i[++a];
      }
      s !== (l == null ? void 0 : l.index) && (r = C.nextNode(), s++);
    }
    return C.currentNode = S, o;
  }
  p(e) {
    let t = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, t), t += i.strings.length - 2) : i._$AI(e[t])), t++;
  }
}
class B {
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
    e = O(this, e, t), H(e) ? e === c || e == null || e === "" ? (this._$AH !== c && this._$AR(), this._$AH = c) : e !== this._$AH && e !== T && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Be(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== c && H(this._$AH) ? this._$AA.nextSibling.data = e : this.T(S.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var r;
    const { values: t, _$litType$: i } = e, o = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = j.createElement(Se(i.h, i.h[0]), this.options)), i);
    if (((r = this._$AH) == null ? void 0 : r._$AD) === o) this._$AH.p(t);
    else {
      const s = new Fe(o, this), a = s.u(this.options);
      s.p(t), this.T(a), this._$AH = s;
    }
  }
  _$AC(e) {
    let t = ge.get(e.strings);
    return t === void 0 && ge.set(e.strings, t = new j(e)), t;
  }
  k(e) {
    ie(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let i, o = 0;
    for (const r of e) o === t.length ? t.push(i = new B(this.O(N()), this.O(N()), this, this.options)) : i = t[o], i._$AI(r), o++;
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
class V {
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
    if (r === void 0) e = O(this, e, t, 0), s = !H(e) || e !== this._$AH && e !== T, s && (this._$AH = e);
    else {
      const a = e;
      let l, d;
      for (e = r[0], l = 0; l < r.length - 1; l++) d = O(this, a[i + l], t, l), d === T && (d = this._$AH[l]), s || (s = !H(d) || d !== this._$AH[l]), d === c ? e = c : e !== c && (e += (d ?? "") + r[l + 1]), this._$AH[l] = d;
    }
    s && !o && this.j(e);
  }
  j(e) {
    e === c ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class qe extends V {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === c ? void 0 : e;
  }
}
class Ge extends V {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== c);
  }
}
class We extends V {
  constructor(e, t, i, o, r) {
    super(e, t, i, o, r), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = O(this, e, t, 0) ?? c) === T) return;
    const i = this._$AH, o = e === c && i !== c || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, r = e !== c && (i === c || o);
    o && this.element.removeEventListener(this.name, this, i), r && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t;
    typeof this._$AH == "function" ? this._$AH.call(((t = this.options) == null ? void 0 : t.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Ve {
  constructor(e, t, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    O(this, e);
  }
}
const Q = I.litHtmlPolyfillSupport;
Q == null || Q(j, B), (I.litHtmlVersions ?? (I.litHtmlVersions = [])).push("3.3.1");
const Ke = (n, e, t) => {
  const i = (t == null ? void 0 : t.renderBefore) ?? e;
  let o = i._$litPart$;
  if (o === void 0) {
    const r = (t == null ? void 0 : t.renderBefore) ?? null;
    i._$litPart$ = o = new B(e.insertBefore(N(), r), r, void 0, t ?? {});
  }
  return o._$AI(n), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const E = globalThis;
class $ extends z {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Ke(t, this.renderRoot, this.renderOptions);
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
var xe;
$._$litElement$ = !0, $.finalized = !0, (xe = E.litElementHydrateSupport) == null || xe.call(E, { LitElement: $ });
const X = E.litElementPolyfillSupport;
X == null || X({ LitElement: $ });
(E.litElementVersions ?? (E.litElementVersions = [])).push("4.2.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Je = { attribute: !0, type: String, converter: q, reflect: !1, hasChanged: te }, Ze = (n = Je, e, t) => {
  const { kind: i, metadata: o } = t;
  let r = globalThis.litPropertyMetadata.get(o);
  if (r === void 0 && globalThis.litPropertyMetadata.set(o, r = /* @__PURE__ */ new Map()), i === "setter" && ((n = Object.create(n)).wrapped = !0), r.set(t.name, n), i === "accessor") {
    const { name: s } = t;
    return { set(a) {
      const l = e.get.call(this);
      e.set.call(this, a), this.requestUpdate(s, l, n);
    }, init(a) {
      return a !== void 0 && this.C(s, void 0, n, a), a;
    } };
  }
  if (i === "setter") {
    const { name: s } = t;
    return function(a) {
      const l = this[s];
      e.call(this, a), this.requestUpdate(s, l, n);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function m(n) {
  return (e, t) => typeof t == "object" ? Ze(n, e, t) : ((i, o, r) => {
    const s = o.hasOwnProperty(r);
    return o.constructor.createProperty(r, i), s ? Object.getOwnPropertyDescriptor(o, r) : void 0;
  })(n, e, t);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function oe(n) {
  return m({ ...n, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Qe = (n, e, t) => (t.configurable = !0, t.enumerable = !0, Reflect.decorate && typeof e != "object" && Object.defineProperty(n, e, t), t);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Xe(n, e) {
  return (t, i, o) => {
    const r = (s) => {
      var a;
      return ((a = s.renderRoot) == null ? void 0 : a.querySelector(n)) ?? null;
    };
    return Qe(t, i, { get() {
      return r(this);
    } });
  };
}
const K = k`
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
k`
  * {
    box-sizing: border-box;
  }
`;
const ze = k`
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
`, Ye = [
  K,
  ze,
  k`
    :host {
      --swim-dialog-bg: var(--grey-800);
      --swim-dialog-header-color: var(--grey-100);
      --swim-dialog-body-color: var(--grey-200);
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

    .swim-dialog__content {
      pointer-events: auto;
      position: relative;
      border-radius: var(--radius-8);
      box-shadow: var(--shadow-3);
      background: var(--swim-dialog-bg);
      padding: 1.4rem;
      min-width: 250px;
      font-size: var(--font-size-m);
      color: var(--swim-dialog-body-color);
      animation-fill-mode: forwards;
      opacity: 0;
      transform: scale3d(1.2, 1.2, 1);
      transition: opacity 0.2s ease-out, transform 0.2s ease-out;
      z-index: calc(var(--swim-dialog-z, 991) + 1);
    }

    .swim-dialog.swim-dialog--open .swim-dialog__content {
      opacity: 1;
      transform: scale3d(1, 1, 1);
    }

    .swim-dialog__content--large,
    .swim-dialog__content--medium {
      padding: var(--spacing-0);
      width: calc(100vw - 120px);
      background-color: transparent;
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
    }

    .swim-dialog__title,
    .swim-dialog__header h1,
    .swim-dialog__header h2 {
      font-size: var(--font-size-3xl);
      font-weight: 400;
      margin: 0 0 1.4rem 0;
      color: var(--swim-dialog-header-color);
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
var U = /* @__PURE__ */ ((n) => (n.Regular = "regular", n.Medium = "medium", n.Large = "large", n))(U || {});
function pe(n) {
  return n != null && `${n}` != "false";
}
function et(n, e = null) {
  return isNaN(parseFloat(n)) || isNaN(Number(n)) ? e : Number(n);
}
const tt = k`
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
`, it = k`
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
    return (Array.isArray(e) ? e : [e]).reduce((o, r) => {
      const s = this._expandKeys(r, i).map((a) => {
        const l = this._iconMap.get(a);
        return l && l.length === 1 ? l[0] : a;
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
const rt = new nt();
var st = Object.defineProperty, L = (n, e, t, i) => {
  for (var o = void 0, r = n.length - 1, s; r >= 0; r--)
    (s = n[r]) && (o = s(e, t, o) || o);
  return o && st(e, t, o), o;
};
const _e = "swim-icon", ne = class ne extends $ {
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
    var r;
    const e = this._cssClasses, t = !!this.alt, i = ((r = this.iconClass) == null ? void 0 : r.trim()) ?? "", o = i ? ` ${i}` : "";
    return !e || e.length === 0 ? w`
        <span
          part="icon"
          class="${i}"
          role="${t ? "img" : "presentation"}"
          aria-label="${t ? this.alt : c}"
          aria-hidden="${t ? "false" : "true"}"
        >
          <slot></slot>
        </span>
      ` : e.length === 1 ? w`
        <i
          part="icon"
          class="swim-icon__i ${e[0]}${o}"
          role="${t ? "img" : "presentation"}"
          aria-label="${t ? this.alt : c}"
          aria-hidden="${t ? "false" : "true"}"
        ></i>
      ` : w`
      <span
        class="swim-icon__stack"
        role="${t ? "img" : "presentation"}"
        aria-label="${t ? this.alt : c}"
        aria-hidden="${t ? "false" : "true"}"
      >
        ${e.map(
      (s, a) => w`<i part="icon icon-${a}" class="swim-icon__i swim-icon__i--${a} ${s}${o}"></i>`
    )}
      </span>
    `;
  }
};
ne.styles = [K, it];
let x = ne;
L([
  m({ type: String, attribute: "font-icon" })
], x.prototype, "fontIcon");
L([
  m({ type: String })
], x.prototype, "alt");
L([
  m({ type: String, attribute: "font-set" })
], x.prototype, "fontSet");
L([
  m({ type: String, attribute: "icon-class" })
], x.prototype, "iconClass");
L([
  oe()
], x.prototype, "_cssClasses");
customElements.get(_e) || customElements.define(_e, x);
var lt = Object.defineProperty, at = Object.getOwnPropertyDescriptor, u = (n, e, t, i) => {
  for (var o = i > 1 ? void 0 : i ? at(e, t) : e, r = n.length - 1, s; r >= 0; r--)
    (s = n[r]) && (o = (i ? s(e, t, o) : s(o)) || o);
  return i && o && lt(e, t, o), o;
};
const ye = "swim-dialog", re = class re extends $ {
  constructor() {
    super(...arguments), this.dialogTitle = "", this.content = "", this.class = "", this.cssClass = "", this.format = U.Regular, this.showBackdrop = !0, this._closeButton = !0, this._visible = !1, this._zIndex = 991, this._contentId = `swim-dialog-content-${Math.random().toString(36).slice(2, 11)}`, this._titleId = `swim-dialog-title-${Math.random().toString(36).slice(2, 11)}`, this._previousActiveElement = null;
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
    this._closeButton = pe(e);
  }
  get visible() {
    return this._visible;
  }
  set visible(e) {
    const t = pe(e);
    this._visible !== t && (this._visible = t, t ? (this._previousActiveElement = typeof document < "u" ? document.activeElement : null, this.dispatchEvent(new CustomEvent("open", { bubbles: !0 }))) : (this._restoreFocus(), this.dispatchEvent(new CustomEvent("close", { detail: void 0, bubbles: !0 }))));
  }
  get zIndex() {
    return this._zIndex;
  }
  set zIndex(e) {
    this._zIndex = et(e, 991);
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
    this.hide();
  }
  _onKeydown(e) {
    e.key === "Escape" && (e.stopPropagation(), this.hide());
  }
  firstUpdated() {
    this.visible && this._contentEl && this._contentEl.focus({ preventScroll: !0 });
  }
  updated(e) {
    e.has("visible") && this.visible && this._contentEl && requestAnimationFrame(() => {
      var t;
      (t = this._contentEl) == null || t.focus({ preventScroll: !0 });
    });
  }
  render() {
    if (!this.visible) return c;
    const e = this.format === U.Regular || this.format === "regular", t = this.format === U.Large || this.format === "large", i = this.format === U.Medium || this.format === "medium", o = [
      "swim-dialog__content",
      this.cssClass,
      t ? "swim-dialog__content--large" : "",
      i ? "swim-dialog__content--medium" : ""
    ].filter(Boolean).join(" "), r = this.class.includes("swim-dialog--full-screen"), s = ["swim-dialog", "swim-dialog--open", this.class, r ? "swim-scroll" : ""].filter(Boolean).join(" ");
    return w`
      <div class="${s}" style="--swim-dialog-z: ${this.zIndex}" role="presentation">
        ${this.showBackdrop ? w`<div class="swim-dialog__backdrop" aria-hidden="true" @click="${this._onBackdropClick}"></div>` : c}
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
          ${e ? w`
                ${this.closeButton ? w`
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
                ${this.dialogTitle ? w`
                      <div class="swim-dialog__header">
                        <h2 id="${this._titleId}" class="swim-dialog__title">${this.dialogTitle}</h2>
                      </div>
                    ` : c}
                <div class="swim-dialog__body swim-scroll">
                  <slot></slot>
                  ${this.content ? w`<div>${this.content}</div>` : c}
                </div>
              ` : w`
                <div class="swim-dialog__body swim-scroll">
                  <slot></slot>
                  ${this.content ? w`<div>${this.content}</div>` : c}
                </div>
              `}
        </div>
      </div>
    `;
  }
};
re.styles = Ye;
let f = re;
u([
  m({ type: String, attribute: "dialog-title" })
], f.prototype, "dialogTitle", 2);
u([
  m({ type: String })
], f.prototype, "title", 1);
u([
  m({ type: String })
], f.prototype, "content", 2);
u([
  m({ type: String })
], f.prototype, "class", 2);
u([
  m({ type: String, attribute: "css-class" })
], f.prototype, "cssClass", 2);
u([
  m({ type: String, reflect: !0 })
], f.prototype, "format", 2);
u([
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
u([
  m({ type: Boolean, attribute: "close-button" })
], f.prototype, "closeButton", 1);
u([
  m({ type: Boolean, reflect: !0 })
], f.prototype, "visible", 1);
u([
  m({ type: Number })
], f.prototype, "zIndex", 1);
u([
  m({ attribute: !1 })
], f.prototype, "beforeClose", 2);
u([
  oe()
], f.prototype, "_contentId", 2);
u([
  oe()
], f.prototype, "_titleId", 2);
u([
  Xe(".swim-dialog__content")
], f.prototype, "_contentEl", 2);
customElements.get(ye) || customElements.define(ye, f);
const ct = [
  K,
  k`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      position: relative;
      overflow: hidden;
      --swim-format-dialog-bg: var(--grey-800);
      --swim-format-header-height-large: 90px;
      --swim-format-header-height-medium: 60px;
      --swim-format-footer-height: 4rem;
      --swim-format-body-padding: 2rem;
      --swim-format-border: 2px solid var(--grey-700);
    }

    .format-dialog-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      max-height: var(--swim-format-max-height, 75vh);
      background: var(--swim-format-dialog-bg);
      box-shadow: 0 0 100px rgba(0, 0, 0, 0.25);
      border-radius: var(--radius-16);
      overflow: hidden;
    }

    :host([format='large']) .format-dialog-container {
      --swim-format-max-height: calc(100vh - 7.25rem);
      --swim-format-header-height: var(--swim-format-header-height-large);
    }

    :host([format='medium']) .format-dialog-container {
      --swim-format-max-height: 75vh;
      --swim-format-header-height: var(--swim-format-header-height-medium);
      --swim-format-body-max-height: calc(var(--swim-format-max-height) - var(--swim-format-header-height));
    }

    .format-dialog-container__header {
      flex: 0 0 var(--swim-format-header-height, 90px);
      height: var(--swim-format-header-height, 90px);
      min-height: var(--swim-format-header-height, 90px);
      border-bottom: var(--swim-format-border);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 var(--swim-format-body-padding);
      padding-right: 2.5rem;
      gap: 1.5rem;
      overflow: visible;
    }

    /* Match ngx-large-format-dialog-header-title__wrapper: flex 0 0 20%, height 100%, justify-content center */
    .format-dialog-container__header-title {
      display: flex;
      flex-direction: column;
      gap: 2px;
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
      --swim-format-title-size: 1.375rem;
      --swim-format-title-line: 1.625rem;
    }

    .format-dialog-container__header-action {
      flex: 0 0 auto;
      max-width: 50%;
      display: flex;
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
      gap: 0.5rem;
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
      outline: 2px solid var(--blue-500);
      outline-offset: 2px;
    }

    .format-dialog-container__body {
      flex: 1 1 auto;
      min-height: 215px;
      padding: 0 var(--swim-format-body-padding);
      color: var(--grey-200);
    }

    :host([format='medium']) .format-dialog-container__body {
      max-height: var(--swim-format-body-max-height, auto);
    }

    .format-dialog-container__footer {
      flex: 0 0 var(--swim-format-footer-height);
      height: var(--swim-format-footer-height);
      min-height: var(--swim-format-footer-height);
      border-top: var(--swim-format-border);
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: var(--swim-format-footer-gap, 0.5rem);
      padding: 0.75rem 2rem;
      box-sizing: border-box;
    }
  `
];
var bt = Object.defineProperty, P = (n, e, t, i) => {
  for (var o = void 0, r = n.length - 1, s; r >= 0; r--)
    (s = n[r]) && (o = s(e, t, o) || o);
  return o && bt(e, t, o), o;
};
const ve = "swim-large-format-dialog-content", se = class se extends $ {
  constructor() {
    super(...arguments), this.format = "large", this.dialogTitle = "", this.dialogSubtitle = "", this.dialogActionTitle = "Close", this.dialogDirtyActionTitle = "Cancel", this.dirty = !1;
  }
  _onCloseOrCancel() {
    this.dispatchEvent(new CustomEvent("close-or-cancel", { detail: this.dirty, bubbles: !0, composed: !0 }));
  }
  render() {
    const e = [
      "format-dialog-container__header-title",
      "format-dialog-container__header-title--with-subtitle"
    ].join(" ");
    return w`
      <main class="format-dialog-container">
        <header class="format-dialog-container__header">
          <div class="format-dialog-container__header-title ${e}">
            <h1>${this.dialogTitle}</h1>
            ${this.dialogSubtitle ? w`<h4>${this.dialogSubtitle}</h4>` : c}
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
        <footer class="format-dialog-container__footer">
          <slot name="footer"></slot>
        </footer>
      </main>
    `;
  }
};
se.styles = [ze, ct];
let p = se;
P([
  m({ type: String, reflect: !0 })
], p.prototype, "format");
P([
  m({ type: String, attribute: "dialog-title" })
], p.prototype, "dialogTitle");
P([
  m({ type: String, attribute: "dialog-subtitle" })
], p.prototype, "dialogSubtitle");
P([
  m({ type: String, attribute: "dialog-action-title" })
], p.prototype, "dialogActionTitle");
P([
  m({ type: String, attribute: "dialog-dirty-action-title" })
], p.prototype, "dialogDirtyActionTitle");
P([
  m({ type: Boolean, reflect: !0 })
], p.prototype, "dirty");
customElements.get(ve) || customElements.define(ve, p);
const mt = [
  K,
  k`
    :host {
      --swim-format-footer-gap: 0.5rem;
    }

    .format-dialog-footer {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: var(--swim-format-footer-gap);
      width: 100%;
      height: 100%;
    }
  `
];
var dt = Object.defineProperty, ft = (n, e, t, i) => {
  for (var o = void 0, r = n.length - 1, s; r >= 0; r--)
    (s = n[r]) && (o = s(e, t, o) || o);
  return o && dt(e, t, o), o;
};
const $e = "swim-large-format-dialog-footer", le = class le extends $ {
  constructor() {
    super(...arguments), this.format = "large";
  }
  render() {
    return w` <div class="format-dialog-footer"><slot></slot></div> `;
  }
};
le.styles = mt;
let W = le;
ft([
  m({ type: String, reflect: !0 })
], W.prototype, "format");
customElements.get($e) || customElements.define($e, W);
export {
  U as DialogFormat,
  f as SwimDialog,
  p as SwimLargeFormatDialogContent,
  W as SwimLargeFormatDialogFooter
};
