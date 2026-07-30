/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Mt = globalThis, wi = Mt.ShadowRoot && (Mt.ShadyCSS === void 0 || Mt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, _i = Symbol(), ns = /* @__PURE__ */ new WeakMap();
let Eo = class {
  constructor(e, t, i) {
    if (this._$cssResult$ = !0, i !== _i) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (wi && e === void 0) {
      const i = t !== void 0 && t.length === 1;
      i && (e = ns.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && ns.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Ao = (o) => new Eo(typeof o == "string" ? o : o + "", void 0, _i), v = (o, ...e) => {
  const t = o.length === 1 ? o[0] : e.reduce((i, s, r) => i + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + o[r + 1], o[0]);
  return new Eo(t, o, _i);
}, Ko = (o, e) => {
  if (wi) o.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const i = document.createElement("style"), s = Mt.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = t.cssText, o.appendChild(i);
  }
}, as = wi ? (o) => o : (o) => o instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const i of e.cssRules) t += i.cssText;
  return Ao(t);
})(o) : o;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Jo, defineProperty: er, getOwnPropertyDescriptor: tr, getOwnPropertyNames: ir, getOwnPropertySymbols: sr, getPrototypeOf: or } = Object, Pe = globalThis, ls = Pe.trustedTypes, rr = ls ? ls.emptyScript : "", Jt = Pe.reactiveElementPolyfillSupport, bt = (o, e) => o, Pt = { toAttribute(o, e) {
  switch (e) {
    case Boolean:
      o = o ? rr : null;
      break;
    case Object:
    case Array:
      o = o == null ? o : JSON.stringify(o);
  }
  return o;
}, fromAttribute(o, e) {
  let t = o;
  switch (e) {
    case Boolean:
      t = o !== null;
      break;
    case Number:
      t = o === null ? null : Number(o);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(o);
      } catch {
        t = null;
      }
  }
  return t;
} }, vi = (o, e) => !Jo(o, e), cs = { attribute: !0, type: String, converter: Pt, reflect: !1, useDefault: !1, hasChanged: vi };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), Pe.litPropertyMetadata ?? (Pe.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let Qe = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = cs) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const i = Symbol(), s = this.getPropertyDescriptor(e, i, t);
      s !== void 0 && er(this.prototype, e, s);
    }
  }
  static getPropertyDescriptor(e, t, i) {
    const { get: s, set: r } = tr(this.prototype, e) ?? { get() {
      return this[t];
    }, set(n) {
      this[t] = n;
    } };
    return { get: s, set(n) {
      const l = s == null ? void 0 : s.call(this);
      r == null || r.call(this, n), this.requestUpdate(e, l, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? cs;
  }
  static _$Ei() {
    if (this.hasOwnProperty(bt("elementProperties"))) return;
    const e = or(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(bt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(bt("properties"))) {
      const t = this.properties, i = [...ir(t), ...sr(t)];
      for (const s of i) this.createProperty(s, t[s]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [i, s] of t) this.elementProperties.set(i, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, i] of this.elementProperties) {
      const s = this._$Eu(t, i);
      s !== void 0 && this._$Eh.set(s, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const i = new Set(e.flat(1 / 0).reverse());
      for (const s of i) t.unshift(as(s));
    } else e !== void 0 && t.push(as(e));
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
    return Ko(e, this.constructor.elementStyles), e;
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
    const i = this.constructor.elementProperties.get(e), s = this.constructor._$Eu(e, i);
    if (s !== void 0 && i.reflect === !0) {
      const n = (((r = i.converter) == null ? void 0 : r.toAttribute) !== void 0 ? i.converter : Pt).toAttribute(t, i.type);
      this._$Em = e, n == null ? this.removeAttribute(s) : this.setAttribute(s, n), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var r, n;
    const i = this.constructor, s = i._$Eh.get(e);
    if (s !== void 0 && this._$Em !== s) {
      const l = i.getPropertyOptions(s), d = typeof l.converter == "function" ? { fromAttribute: l.converter } : ((r = l.converter) == null ? void 0 : r.fromAttribute) !== void 0 ? l.converter : Pt;
      this._$Em = s;
      const h = d.fromAttribute(t, l.type);
      this[s] = h ?? ((n = this._$Ej) == null ? void 0 : n.get(s)) ?? h, this._$Em = null;
    }
  }
  requestUpdate(e, t, i, s = !1, r) {
    var n;
    if (e !== void 0) {
      const l = this.constructor;
      if (s === !1 && (r = this[e]), i ?? (i = l.getPropertyOptions(e)), !((i.hasChanged ?? vi)(r, t) || i.useDefault && i.reflect && r === ((n = this._$Ej) == null ? void 0 : n.get(e)) && !this.hasAttribute(l._$Eu(e, i)))) return;
      this.C(e, t, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: i, reflect: s, wrapped: r }, n) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, n ?? t ?? this[e]), r !== !0 || n !== void 0) || (this._$AL.has(e) || (this.hasUpdated || i || (t = void 0), this._$AL.set(e, t)), s === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
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
        for (const [r, n] of this._$Ep) this[r] = n;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [r, n] of s) {
        const { wrapped: l } = n, d = this[r];
        l !== !0 || this._$AL.has(r) || d === void 0 || this.C(r, void 0, n, d);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), (i = this._$EO) == null || i.forEach((s) => {
        var r;
        return (r = s.hostUpdate) == null ? void 0 : r.call(s);
      }), this.update(t)) : this._$EM();
    } catch (s) {
      throw e = !1, this._$EM(), s;
    }
    e && this._$AE(t);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var t;
    (t = this._$EO) == null || t.forEach((i) => {
      var s;
      return (s = i.hostUpdated) == null ? void 0 : s.call(i);
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
Qe.elementStyles = [], Qe.shadowRootOptions = { mode: "open" }, Qe[bt("elementProperties")] = /* @__PURE__ */ new Map(), Qe[bt("finalized")] = /* @__PURE__ */ new Map(), Jt == null || Jt({ ReactiveElement: Qe }), (Pe.reactiveElementVersions ?? (Pe.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ft = globalThis, ds = (o) => o, It = ft.trustedTypes, hs = It ? It.createPolicy("lit-html", { createHTML: (o) => o }) : void 0, So = "$lit$", Oe = `lit$${Math.random().toFixed(9).slice(2)}$`, Do = "?" + Oe, nr = `<${Do}>`, je = document, gt = () => je.createComment(""), wt = (o) => o === null || typeof o != "object" && typeof o != "function", yi = Array.isArray, ar = (o) => yi(o) || typeof (o == null ? void 0 : o[Symbol.iterator]) == "function", ei = `[ 	
\f\r]`, dt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, us = /-->/g, ps = />/g, Be = RegExp(`>|${ei}(?:([^\\s"'>=/]+)(${ei}*=${ei}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ms = /'/g, bs = /"/g, Mo = /^(?:script|style|textarea|title)$/i, lr = (o) => (e, ...t) => ({ _$litType$: o, strings: e, values: t }), c = lr(1), te = Symbol.for("lit-noChange"), u = Symbol.for("lit-nothing"), fs = /* @__PURE__ */ new WeakMap(), Re = je.createTreeWalker(je, 129);
function zo(o, e) {
  if (!yi(o) || !o.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return hs !== void 0 ? hs.createHTML(e) : e;
}
const cr = (o, e) => {
  const t = o.length - 1, i = [];
  let s, r = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", n = dt;
  for (let l = 0; l < t; l++) {
    const d = o[l];
    let h, w, m = -1, f = 0;
    for (; f < d.length && (n.lastIndex = f, w = n.exec(d), w !== null); ) f = n.lastIndex, n === dt ? w[1] === "!--" ? n = us : w[1] !== void 0 ? n = ps : w[2] !== void 0 ? (Mo.test(w[2]) && (s = RegExp("</" + w[2], "g")), n = Be) : w[3] !== void 0 && (n = Be) : n === Be ? w[0] === ">" ? (n = s ?? dt, m = -1) : w[1] === void 0 ? m = -2 : (m = n.lastIndex - w[2].length, h = w[1], n = w[3] === void 0 ? Be : w[3] === '"' ? bs : ms) : n === bs || n === ms ? n = Be : n === us || n === ps ? n = dt : (n = Be, s = void 0);
    const _ = n === Be && o[l + 1].startsWith("/>") ? " " : "";
    r += n === dt ? d + nr : m >= 0 ? (i.push(h), d.slice(0, m) + So + d.slice(m) + Oe + _) : d + Oe + (m === -2 ? l : _);
  }
  return [zo(o, r + (o[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class _t {
  constructor({ strings: e, _$litType$: t }, i) {
    let s;
    this.parts = [];
    let r = 0, n = 0;
    const l = e.length - 1, d = this.parts, [h, w] = cr(e, t);
    if (this.el = _t.createElement(h, i), Re.currentNode = this.el.content, t === 2 || t === 3) {
      const m = this.el.content.firstChild;
      m.replaceWith(...m.childNodes);
    }
    for (; (s = Re.nextNode()) !== null && d.length < l; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const m of s.getAttributeNames()) if (m.endsWith(So)) {
          const f = w[n++], _ = s.getAttribute(m).split(Oe), P = /([.?@])?(.*)/.exec(f);
          d.push({ type: 1, index: r, name: P[2], strings: _, ctor: P[1] === "." ? hr : P[1] === "?" ? ur : P[1] === "@" ? pr : Qt }), s.removeAttribute(m);
        } else m.startsWith(Oe) && (d.push({ type: 6, index: r }), s.removeAttribute(m));
        if (Mo.test(s.tagName)) {
          const m = s.textContent.split(Oe), f = m.length - 1;
          if (f > 0) {
            s.textContent = It ? It.emptyScript : "";
            for (let _ = 0; _ < f; _++) s.append(m[_], gt()), Re.nextNode(), d.push({ type: 2, index: ++r });
            s.append(m[f], gt());
          }
        }
      } else if (s.nodeType === 8) if (s.data === Do) d.push({ type: 2, index: r });
      else {
        let m = -1;
        for (; (m = s.data.indexOf(Oe, m + 1)) !== -1; ) d.push({ type: 7, index: r }), m += Oe.length - 1;
      }
      r++;
    }
  }
  static createElement(e, t) {
    const i = je.createElement("template");
    return i.innerHTML = e, i;
  }
}
function tt(o, e, t = o, i) {
  var n, l;
  if (e === te) return e;
  let s = i !== void 0 ? (n = t._$Co) == null ? void 0 : n[i] : t._$Cl;
  const r = wt(e) ? void 0 : e._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== r && ((l = s == null ? void 0 : s._$AO) == null || l.call(s, !1), r === void 0 ? s = void 0 : (s = new r(o), s._$AT(o, t, i)), i !== void 0 ? (t._$Co ?? (t._$Co = []))[i] = s : t._$Cl = s), s !== void 0 && (e = tt(o, s._$AS(o, e.values), s, i)), e;
}
class dr {
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
    const { el: { content: t }, parts: i } = this._$AD, s = ((e == null ? void 0 : e.creationScope) ?? je).importNode(t, !0);
    Re.currentNode = s;
    let r = Re.nextNode(), n = 0, l = 0, d = i[0];
    for (; d !== void 0; ) {
      if (n === d.index) {
        let h;
        d.type === 2 ? h = new rt(r, r.nextSibling, this, e) : d.type === 1 ? h = new d.ctor(r, d.name, d.strings, this, e) : d.type === 6 && (h = new mr(r, this, e)), this._$AV.push(h), d = i[++l];
      }
      n !== (d == null ? void 0 : d.index) && (r = Re.nextNode(), n++);
    }
    return Re.currentNode = je, s;
  }
  p(e) {
    let t = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, t), t += i.strings.length - 2) : i._$AI(e[t])), t++;
  }
}
class rt {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, t, i, s) {
    this.type = 2, this._$AH = u, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = i, this.options = s, this._$Cv = (s == null ? void 0 : s.isConnected) ?? !0;
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
    e = tt(this, e, t), wt(e) ? e === u || e == null || e === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : e !== this._$AH && e !== te && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : ar(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== u && wt(this._$AH) ? this._$AA.nextSibling.data = e : this.T(je.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var r;
    const { values: t, _$litType$: i } = e, s = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = _t.createElement(zo(i.h, i.h[0]), this.options)), i);
    if (((r = this._$AH) == null ? void 0 : r._$AD) === s) this._$AH.p(t);
    else {
      const n = new dr(s, this), l = n.u(this.options);
      n.p(t), this.T(l), this._$AH = n;
    }
  }
  _$AC(e) {
    let t = fs.get(e.strings);
    return t === void 0 && fs.set(e.strings, t = new _t(e)), t;
  }
  k(e) {
    yi(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let i, s = 0;
    for (const r of e) s === t.length ? t.push(i = new rt(this.O(gt()), this.O(gt()), this, this.options)) : i = t[s], i._$AI(r), s++;
    s < t.length && (this._$AR(i && i._$AB.nextSibling, s), t.length = s);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, t); e !== this._$AB; ) {
      const s = ds(e).nextSibling;
      ds(e).remove(), e = s;
    }
  }
  setConnected(e) {
    var t;
    this._$AM === void 0 && (this._$Cv = e, (t = this._$AP) == null || t.call(this, e));
  }
}
class Qt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, i, s, r) {
    this.type = 1, this._$AH = u, this._$AN = void 0, this.element = e, this.name = t, this._$AM = s, this.options = r, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = u;
  }
  _$AI(e, t = this, i, s) {
    const r = this.strings;
    let n = !1;
    if (r === void 0) e = tt(this, e, t, 0), n = !wt(e) || e !== this._$AH && e !== te, n && (this._$AH = e);
    else {
      const l = e;
      let d, h;
      for (e = r[0], d = 0; d < r.length - 1; d++) h = tt(this, l[i + d], t, d), h === te && (h = this._$AH[d]), n || (n = !wt(h) || h !== this._$AH[d]), h === u ? e = u : e !== u && (e += (h ?? "") + r[d + 1]), this._$AH[d] = h;
    }
    n && !s && this.j(e);
  }
  j(e) {
    e === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class hr extends Qt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === u ? void 0 : e;
  }
}
class ur extends Qt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== u);
  }
}
class pr extends Qt {
  constructor(e, t, i, s, r) {
    super(e, t, i, s, r), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = tt(this, e, t, 0) ?? u) === te) return;
    const i = this._$AH, s = e === u && i !== u || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, r = e !== u && (i === u || s);
    s && this.element.removeEventListener(this.name, this, i), r && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t;
    typeof this._$AH == "function" ? this._$AH.call(((t = this.options) == null ? void 0 : t.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class mr {
  constructor(e, t, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    tt(this, e);
  }
}
const br = { I: rt }, ti = ft.litHtmlPolyfillSupport;
ti == null || ti(_t, rt), (ft.litHtmlVersions ?? (ft.litHtmlVersions = [])).push("3.3.2");
const fr = (o, e, t) => {
  const i = (t == null ? void 0 : t.renderBefore) ?? e;
  let s = i._$litPart$;
  if (s === void 0) {
    const r = (t == null ? void 0 : t.renderBefore) ?? null;
    i._$litPart$ = s = new rt(e.insertBefore(gt(), r), r, void 0, t ?? {});
  }
  return s._$AI(o), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ye = globalThis;
let y = class extends Qe {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = fr(t, this.renderRoot, this.renderOptions);
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
    return te;
  }
};
var Co;
y._$litElement$ = !0, y.finalized = !0, (Co = Ye.litElementHydrateSupport) == null || Co.call(Ye, { LitElement: y });
const ii = Ye.litElementPolyfillSupport;
ii == null || ii({ LitElement: y });
(Ye.litElementVersions ?? (Ye.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const gr = { attribute: !0, type: String, converter: Pt, reflect: !1, hasChanged: vi }, wr = (o = gr, e, t) => {
  const { kind: i, metadata: s } = t;
  let r = globalThis.litPropertyMetadata.get(s);
  if (r === void 0 && globalThis.litPropertyMetadata.set(s, r = /* @__PURE__ */ new Map()), i === "setter" && ((o = Object.create(o)).wrapped = !0), r.set(t.name, o), i === "accessor") {
    const { name: n } = t;
    return { set(l) {
      const d = e.get.call(this);
      e.set.call(this, l), this.requestUpdate(n, d, o, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(n, void 0, o, l), l;
    } };
  }
  if (i === "setter") {
    const { name: n } = t;
    return function(l) {
      const d = this[n];
      e.call(this, l), this.requestUpdate(n, d, o, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function a(o) {
  return (e, t) => typeof t == "object" ? wr(o, e, t) : ((i, s, r) => {
    const n = s.hasOwnProperty(r);
    return s.constructor.createProperty(r, i), n ? Object.getOwnPropertyDescriptor(s, r) : void 0;
  })(o, e, t);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function b(o) {
  return a({ ...o, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const _r = (o, e, t) => (t.configurable = !0, t.enumerable = !0, Reflect.decorate && typeof e != "object" && Object.defineProperty(o, e, t), t);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function N(o, e) {
  return (t, i, s) => {
    const r = (n) => {
      var l;
      return ((l = n.renderRoot) == null ? void 0 : l.querySelector(o)) ?? null;
    };
    return _r(t, i, { get() {
      return r(this);
    } });
  };
}
const E = v`
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
`, Bl = v`
  * {
    box-sizing: border-box;
  }
`, vr = v`
  :host {
    display: inline-block;
    cursor: pointer;
    /* Allow constrained layouts (flex/grid) to shrink below label intrinsic width so ellipsis can apply */
    min-width: 0;

    /* Private fallbacks — overridden per [variant] with higher specificity */
    --_swim-fallback-bg: var(--grey-600);
    --_swim-fallback-hover-bg: var(--grey-700);
    --_swim-fallback-border-color: transparent;
    --_swim-fallback-hover-border-color: transparent;
    --_swim-fallback-color: var(--white);
    --_swim-fallback-hover-color: var(--white);
    --_swim-fallback-shadow: var(--shadow-1);
    --_swim-fallback-outline: var(--grey-600);

    /* Slotted nodes (e.g. swim-icon) inherit color from this host, not from the shadow button. */
    color: var(--swim-button-color, var(--_swim-fallback-color));
  }

  :host([variant='primary']:not([bordered])) {
    --_swim-fallback-bg: var(--blue-400);
    --_swim-fallback-hover-bg: var(--blue-500);
    --_swim-fallback-border-color: var(--blue-400);
    --_swim-fallback-hover-border-color: var(--blue-500);
    --_swim-fallback-color: var(--white);
    --_swim-fallback-hover-color: var(--white);
    --_swim-fallback-outline: var(--blue-500);
  }

  :host([variant='primary'][bordered]) {
    --_swim-fallback-bg: transparent;
    --_swim-fallback-hover-bg: var(--blue-500);
    --_swim-fallback-border-color: var(--blue-400);
    --_swim-fallback-hover-border-color: var(--blue-200);
    --_swim-fallback-color: var(--blue-400);
    --_swim-fallback-hover-color: var(--blue-200);
    --_swim-fallback-shadow: none;
    --_swim-fallback-outline: var(--blue-400);
  }

  :host([variant='bordered']) {
    --_swim-fallback-bg: transparent;
    --_swim-fallback-hover-bg: transparent;
    --_swim-fallback-border-color: var(--blue-400);
    --_swim-fallback-hover-border-color: var(--blue-200);
    --_swim-fallback-color: var(--blue-400);
    --_swim-fallback-hover-color: var(--blue-200);
    --_swim-fallback-shadow: none;
    --_swim-fallback-outline: var(--blue-400);
  }

  :host([variant='warning']) {
    --_swim-fallback-bg: var(--orange-400);
    --_swim-fallback-hover-bg: var(--orange-500);
    --_swim-fallback-border-color: transparent;
    --_swim-fallback-hover-border-color: transparent;
    --_swim-fallback-color: var(--grey-900);
    --_swim-fallback-hover-color: var(--grey-900);
    --_swim-fallback-outline: var(--orange-500);
  }

  :host([variant='danger']) {
    --_swim-fallback-bg: var(--red-400);
    --_swim-fallback-hover-bg: var(--red-500);
    --_swim-fallback-border-color: transparent;
    --_swim-fallback-hover-border-color: transparent;
    --_swim-fallback-color: var(--white);
    --_swim-fallback-hover-color: var(--white);
    --_swim-fallback-outline: var(--red-400);
  }

  :host([variant='link']) {
    --_swim-fallback-bg: transparent;
    --_swim-fallback-hover-bg: transparent;
    --_swim-fallback-border-color: transparent;
    --_swim-fallback-hover-border-color: transparent;
    --_swim-fallback-color: var(--white);
    --_swim-fallback-hover-color: var(--white);
    --_swim-fallback-shadow: none;
    --_swim-fallback-outline: var(--grey-600);
  }

  :host(:not([disabled]):hover) {
    color: var(--swim-button-hover-color, var(--_swim-fallback-hover-color));
  }

  :host([disabled]) {
    pointer-events: none;
    cursor: not-allowed;
  }

  :host([disabled]) button {
    opacity: 0.6;
    cursor: not-allowed;
  }

  button {
    box-sizing: border-box;
    color: var(--swim-button-color, var(--_swim-fallback-color));
    display: inline-grid;
    grid-template-columns: auto;
    grid-template-rows: auto;
    justify-items: stretch;
    align-items: center;
    padding: var(--swim-button-padding, 0.35em 0.55em);
    position: relative;
    text-align: center;
    text-decoration: none;
    user-select: none;
    font: inherit;
    font-size: var(--font-size-m);
    font-weight: var(--swim-button-font-weight, var(--font-weight-bold));
    outline: none;
    line-height: var(--font-line-height-100);
    outline-offset: 2px;
    cursor: inherit;
    width: 100%;
    min-width: 0;

    background: var(--swim-button-background, var(--_swim-fallback-bg));
    border-width: var(--swim-button-border-width, 1px);
    border-style: var(--swim-button-border-style, solid);
    border-color: var(--swim-button-border-color, var(--_swim-fallback-border-color));
    border-radius: var(--radius-4);
    box-shadow: var(--swim-button-shadow, var(--_swim-fallback-shadow));
    transition: background-color 200ms, box-shadow 200ms;
    text-shadow: 1px 1px rgba(0, 0, 0, 0.07);
  }

  button:focus,
  button:focus-within {
    outline: none;
  }

  button:focus-visible {
    outline: 2px solid var(--swim-button-outline-color, var(--_swim-fallback-outline));
  }

  /* One hover layer so generic grey hover never leaks into bordered / link / etc. */
  :host(:not([disabled])) button:hover {
    cursor: pointer;
    background: var(--swim-button-hover-background, var(--_swim-fallback-hover-bg));
    border-color: var(--swim-button-hover-border-color, var(--_swim-fallback-hover-border-color));
    color: var(--swim-button-hover-color, var(--_swim-fallback-hover-color));
    outline-color: var(
      --swim-button-hover-outline-color,
      var(--swim-button-hover-background, var(--_swim-fallback-hover-bg))
    );
  }

  /* Size variants */
  :host([size='small']) button {
    font-size: var(--font-size-xxs);
  }

  :host([size='large']) button {
    font-size: 1.3em;
  }

  /* Slotted swim-icon: 1em sizing + vertical center with label text (flex on .content). */
  slot::slotted(swim-icon) {
    font-size: inherit;
    flex-shrink: 0;
    align-self: center;
    line-height: 1;
  }

  /* Button content and state icon: same grid cell so intrinsic width is max(label, state) */
  .content {
    grid-area: 1 / 1;
    min-width: 0;
    max-width: 100%;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    white-space: normal;
    overflow: visible;
    text-overflow: clip;
    word-wrap: break-word;
    overflow-wrap: break-word;
    transition: opacity 0.25s ease-out;
  }

  /* Single-line + ellipsis: wrap-text="false" (wrap-text attribute omitted when wrapping is on) */
  :host([wrap-text='false']) .content {
    flex-wrap: nowrap;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: normal;
    overflow-wrap: normal;
  }

  .state-icon {
    grid-area: 1 / 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    justify-self: center;
    width: max-content;
    box-sizing: border-box;
    opacity: 0;
    pointer-events: none;
  }

  .state-icon-group {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.35em;
    box-sizing: border-box;
    padding: 0 0.35em;
  }

  .state-loading-text {
    white-space: nowrap;
  }

  /* State: In Progress */
  :host([state='in-progress']) {
    cursor: wait !important;
    position: relative;
    opacity: 1 !important;
  }

  :host([state='in-progress']) button {
    opacity: 1;
    pointer-events: none;
    /* Loading + host disabled: UA button:disabled grays out inherited color (hurts loading-text).
 Re-apply variant foreground; !important aligns with ngx-ui .in-progress vs. UA.
 Override with --swim-button-in-progress-color on :host. */
    color: var(--swim-button-in-progress-color, var(--swim-button-color, var(--_swim-fallback-color))) !important;
  }

  :host([state='in-progress']) .content {
    opacity: 0;
  }

  :host([state='in-progress']) .state-icon {
    opacity: 1;
  }

  /* Loading glyph: same var chain as in-progress button color (explicit so it does not rely on currentColor / stale builds). */
  :host([state='in-progress']) swim-icon.icon {
    color: var(
      --swim-button-loading-icon-color,
      var(--swim-button-in-progress-color, var(--swim-button-color, var(--_swim-fallback-color)))
    );
  }

  /* State: Success */
  :host([state='success']) {
    cursor: wait !important;
  }

  :host([state='success']) button {
    color: black !important;
    background-color: var(--green-500) !important;
    background: var(--green-500) !important;
    border: 1px solid var(--green-500) !important;
    pointer-events: none;
  }

  :host([state='success']) .content {
    opacity: 0;
  }

  :host([state='success']) .state-icon {
    opacity: 1;
    color: var(--white);
  }

  /* State: Fail */
  :host([state='fail']) {
    cursor: wait !important;
  }

  :host([state='fail']) button {
    color: black !important;
    background-color: var(--red-500) !important;
    background: var(--red-500) !important;
    border: 1px solid var(--red-500) !important;
    pointer-events: none;
  }

  :host([state='fail']) .content {
    opacity: 0;
  }

  :host([state='fail']) .state-icon {
    opacity: 1;
    color: var(--white);
  }

  /* Loading swim-icon sizing (color set on :host([state='in-progress']) swim-icon.icon) */
  .icon {
    height: 1em;
    width: 1em;
    font-weight: var(--font-weight-bold);
    overflow: hidden;
    font-size: var(--font-size-m);
    display: inline-block;
  }

  /* Spinner animation */
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .spinner {
    animation: spin 1s linear infinite;
  }
`;
var ce = /* @__PURE__ */ ((o) => (o.Active = "active", o.InProgress = "in-progress", o.Success = "success", o.Fail = "fail", o))(ce || {});
function p(o) {
  return o != null && `${o}` != "false";
}
function T(o, e = null) {
  return isNaN(parseFloat(o)) || isNaN(Number(o)) ? e : Number(o);
}
const J = {
  fromAttribute: (o) => o !== "false",
  /** Omit attribute when true (default); set explicit `="false"` only when off. */
  toAttribute: (o) => o ? null : "false"
}, g = {
  fromAttribute: (o) => o !== null && o !== "false" && o !== "0",
  /**
   * Use empty string when true so the boolean attribute is present; remove when false.
   * Serializing false as `attr="false"` leaves the attribute in the DOM, so selectors like
   * `[disabled]` / `[loading]` (common in resets and lazy-load styles) still match the host.
   */
  toAttribute: (o) => o ? "" : null
}, To = "swim-ui-icon", yr = v`
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
`, si = Ao(`'${To}'`), xr = v`
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

  /* Font icon base (glyphs in icon-font-glyphs.ts); same codepoints as ngx-ui icon font. */
  .swim-icon,
  .swim-icon__i.swim-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1em;
    height: 1em;
    font: normal normal normal 1em/1 ${si};
    font-family: ${si}, sans-serif;
    flex-shrink: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Center the glyph in the em box; many icon glyphs sit high with display:block alone */
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
    font: normal normal normal 1em/1 ${si};
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

  ${yr}
`, di = "data-swim-ui-icon-font-face";
let oi = !1;
function kr() {
  if (typeof document > "u" || document.head.querySelector(`style[${di}]`)) return;
  const o = new URL("data:font/woff2;base64,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", import.meta.url).href, e = document.createElement("style");
  e.setAttribute(di, ""), e.textContent = `@font-face{font-family:'${To}';src:url('${o}') format('woff2');font-weight:normal;font-style:normal;font-display:block;}`, document.head.appendChild(e);
}
function Cr() {
  typeof document > "u" || document.head.querySelector(`style[${di}]`) || oi || (oi = !0, queueMicrotask(() => {
    oi = !1, kr();
  }));
}
const Er = (o) => `swim-icon ${o.trim().split(" ").map((t) => {
  const [i, s] = t.split(":");
  return i.length ? `${i} ${i}-${s}` : s;
}).join(" ")}`;
class Ar {
  constructor() {
    this._defaultFontSetClass = "lit", this._iconMap = /* @__PURE__ */ new Map();
  }
  setDefaultFontSetClass(e) {
    return this._defaultFontSetClass = e, this._defaultFontSetClass;
  }
  get(e, t) {
    return this.lookup(e, t).map((i) => Er(i));
  }
  lookup(e, t) {
    const i = t ?? this._defaultFontSetClass;
    return (Array.isArray(e) ? e : [e]).reduce((s, r) => {
      const n = this._expandKeys(r, i).map((l) => {
        const d = this._iconMap.get(l);
        return d && d.length === 1 ? d[0] : l;
      }).join(" ");
      return s.concat(this._iconMap.get(n) || [n]);
    }, []);
  }
  add(e, t) {
    const i = this._expandKeys(e, this._defaultFontSetClass).join(" "), s = this.lookup(t);
    this._iconMap.set(i, s);
  }
  _expandKeys(e, t) {
    return e.split(" ").map((i) => i.includes(":") ? i : `${t}:${i}`);
  }
}
const Sr = new Ar();
var Dr = Object.defineProperty, Et = (o, e, t, i) => {
  for (var s = void 0, r = o.length - 1, n; r >= 0; r--)
    (n = o[r]) && (s = n(e, t, s) || s);
  return s && Dr(e, t, s), s;
};
Cr();
const gs = "swim-icon", Ti = class Ti extends y {
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
    this._cssClasses = Sr.get(e, this.fontSet);
  }
  render() {
    var r;
    const e = this._cssClasses, t = !!this.alt, i = ((r = this.iconClass) == null ? void 0 : r.trim()) ?? "", s = i ? ` ${i}` : "";
    return !e || e.length === 0 ? c`
        <span
          part="icon"
          class="${i}"
          role="${t ? "img" : "presentation"}"
          aria-label="${t ? this.alt : u}"
          aria-hidden="${t ? "false" : "true"}"
        >
          <slot></slot>
        </span>
      ` : e.length === 1 ? c`
        <i
          part="icon"
          class="swim-icon__i ${e[0]}${s}"
          role="${t ? "img" : "presentation"}"
          aria-label="${t ? this.alt : u}"
          aria-hidden="${t ? "false" : "true"}"
        ></i>
      ` : c`
      <span
        class="swim-icon__stack"
        role="${t ? "img" : "presentation"}"
        aria-label="${t ? this.alt : u}"
        aria-hidden="${t ? "false" : "true"}"
      >
        ${e.map(
      (n, l) => c`<i part="icon icon-${l}" class="swim-icon__i swim-icon__i--${l} ${n}${s}"></i>`
    )}
      </span>
    `;
  }
};
Ti.styles = [E, xr];
let Ie = Ti;
Et([
  a({ type: String, attribute: "font-icon" })
], Ie.prototype, "fontIcon");
Et([
  a({ type: String })
], Ie.prototype, "alt");
Et([
  a({ type: String, attribute: "font-set" })
], Ie.prototype, "fontSet");
Et([
  a({ type: String, attribute: "icon-class" })
], Ie.prototype, "iconClass");
Et([
  b()
], Ie.prototype, "_cssClasses");
customElements.get(gs) || customElements.define(gs, Ie);
var Mr = Object.defineProperty, zr = Object.getOwnPropertyDescriptor, re = (o, e, t, i) => {
  for (var s = i > 1 ? void 0 : i ? zr(e, t) : e, r = o.length - 1, n; r >= 0; r--)
    (n = o[r]) && (s = (i ? n(e, t, s) : n(s)) || s);
  return i && s && Mr(e, t, s), s;
};
const ws = "swim-button", Yt = class Yt extends y {
  constructor() {
    super(), this.variant = "default", this.size = "medium", this._disabled = !1, this._state = ce.Active, this.type = "button", this.loadingText = "", this.wrapText = !0, this._inProgress = !1, this._success = !1, this._fail = !1, this._internals = this.attachInternals();
  }
  get disabled() {
    return this._disabled;
  }
  set disabled(e) {
    this._disabled = p(e);
  }
  get state() {
    return this._state;
  }
  set state(e) {
    this._state = e, this._updateStateFlags();
  }
  get timeout() {
    return this._timeout;
  }
  set timeout(e) {
    this._timeout = e === void 0 ? void 0 : T(e);
  }
  get promise() {
    return this._promise;
  }
  set promise(e) {
    this._promise = e, this._handlePromise();
  }
  connectedCallback() {
    super.connectedCallback(), this._updateState();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._clearTimer();
  }
  render() {
    return c`
      <button
        part="button"
        type="button"
        ?disabled="${this.disabled}"
        ?aria-busy="${this._inProgress}"
        @click="${this._handleClick}"
      >
        <span class="content" ?aria-hidden="${this._inProgress || this._success || this._fail}">
          <slot></slot>
        </span>
        <span class="state-icon">${this._renderStateIcon()}</span>
      </button>
    `;
  }
  _renderStateIcon() {
    return this._inProgress ? c`
        <span class="state-icon-group">
          <swim-icon class="icon" font-icon="loading"></swim-icon>
          ${this.loadingText ? c`<span class="state-loading-text">${this.loadingText}</span>` : u}
        </span>
      ` : this._success ? c`<swim-icon class="state-icon" font-icon="check"></swim-icon>` : this._fail ? c`<swim-icon class="state-icon" font-icon="x"></swim-icon>` : u;
  }
  _handleClick(e) {
    if (this.disabled) {
      e.stopPropagation(), e.preventDefault();
      return;
    }
    const t = this._internals.form;
    t && (this.type === "submit" ? t.requestSubmit() : this.type === "reset" && t.reset());
  }
  _updateStateFlags() {
    this._inProgress = this._state === ce.InProgress, this._success = this._state === ce.Success, this._fail = this._state === ce.Fail;
  }
  _updateState() {
    this._state || (this.state = ce.Active);
  }
  _scheduleReturnToActive() {
    const e = this.timeout ?? 3e3;
    e <= 0 || (this._clearTimer(), this._timer = window.setTimeout(() => {
      this.state = ce.Active;
    }, e));
  }
  _handlePromise() {
    this._promise && (this.state = ce.InProgress, this._promise.then(() => {
      this.state = ce.Success, this._scheduleReturnToActive();
    }).catch(() => {
      this.state = ce.Fail, this._scheduleReturnToActive();
    }));
  }
  _clearTimer() {
    this._timer !== void 0 && (clearTimeout(this._timer), this._timer = void 0);
  }
};
Yt.styles = [E, vr], Yt.formAssociated = !0;
let U = Yt;
re([
  a({ type: String, reflect: !0 })
], U.prototype, "variant", 2);
re([
  a({ type: String, reflect: !0 })
], U.prototype, "size", 2);
re([
  a({ type: Boolean, reflect: !0, converter: g })
], U.prototype, "disabled", 1);
re([
  a({ type: String, reflect: !0 })
], U.prototype, "state", 1);
re([
  a({ type: String })
], U.prototype, "type", 2);
re([
  a({ type: Number })
], U.prototype, "timeout", 1);
re([
  a({ type: String, attribute: "loading-text" })
], U.prototype, "loadingText", 2);
re([
  a({ type: Boolean, reflect: !0, attribute: "wrap-text", converter: J })
], U.prototype, "wrapText", 2);
re([
  a({ attribute: !1 })
], U.prototype, "promise", 1);
re([
  b()
], U.prototype, "_inProgress", 2);
re([
  b()
], U.prototype, "_success", 2);
re([
  b()
], U.prototype, "_fail", 2);
customElements.get(ws) || customElements.define(ws, U);
const Tr = v`
  :host {
    display: inline-flex;
    position: relative;
    box-sizing: border-box;

    /* Default colors - slotted swim-button inherits via --swim-button-* */
    --swim-button-background: var(--grey-600);
    --swim-button-border-color: var(--grey-600);
    --swim-button-color: var(--white);
    --swim-button-hover-background: var(--grey-700);
  }

  :host([button-group-style='primary']) {
    --swim-button-background: var(--blue-400);
    --swim-button-border-color: var(--blue-400);
    --swim-button-color: var(--white);
    --swim-button-hover-background: var(--blue-500);
  }

  /* Contained group: slotted buttons use group colors and no individual shadow */
  :host([variant='contained']) {
    --swim-button-shadow: none;
  }

  /* Horizontal: align items */
  :host([orientation='horizontal']) {
    align-items: center;
  }

  /* Vertical: column layout */
  :host([orientation='vertical']) {
    flex-direction: column;
    align-items: stretch;
  }

  /* Contained variant: unify slotted button appearance and remove radius between items */
  :host([variant='contained'][orientation='horizontal']) ::slotted(swim-button),
  :host([variant='contained'][orientation='horizontal']) ::slotted(button) {
    max-height: 30px;
  }

  :host([variant='contained'][orientation='horizontal']) ::slotted(swim-button:first-child),
  :host([variant='contained'][orientation='horizontal']) ::slotted(button:first-child) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  :host([variant='contained'][orientation='horizontal']) ::slotted(swim-button:last-child),
  :host([variant='contained'][orientation='horizontal']) ::slotted(button:last-child) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  :host([variant='contained'][orientation='horizontal']) ::slotted(swim-button:not(:first-child):not(:last-child)),
  :host([variant='contained'][orientation='horizontal']) ::slotted(button:not(:first-child):not(:last-child)) {
    border-radius: 0;
  }

  :host([variant='contained'][orientation='horizontal']) ::slotted(swim-button:not(:first-child)),
  :host([variant='contained'][orientation='horizontal']) ::slotted(button:not(:first-child)) {
    border-left: 0;
  }

  :host([variant='contained'][orientation='horizontal']) ::slotted(swim-button:not(:last-child)),
  :host([variant='contained'][orientation='horizontal']) ::slotted(button:not(:last-child)) {
    margin-right: 1px;
  }

  /* Vertical contained */
  :host([variant='contained'][orientation='vertical']) ::slotted(swim-button:first-child),
  :host([variant='contained'][orientation='vertical']) ::slotted(button:first-child) {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  :host([variant='contained'][orientation='vertical']) ::slotted(swim-button:last-child),
  :host([variant='contained'][orientation='vertical']) ::slotted(button:last-child) {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  :host([variant='contained'][orientation='vertical']) ::slotted(swim-button:not(:first-child):not(:last-child)),
  :host([variant='contained'][orientation='vertical']) ::slotted(button:not(:first-child):not(:last-child)) {
    border-radius: 0;
  }

  :host([variant='contained'][orientation='vertical']) ::slotted(swim-button:not(:first-child)),
  :host([variant='contained'][orientation='vertical']) ::slotted(button:not(:first-child)) {
    border-top: 0;
  }

  :host([variant='contained'][orientation='vertical']) ::slotted(swim-button:not(:last-child)),
  :host([variant='contained'][orientation='vertical']) ::slotted(button:not(:last-child)) {
    margin-bottom: 1px;
  }

  /* Text variant: divider between items */
  :host([variant='text'][orientation='horizontal']) ::slotted(swim-button:not(:last-child)),
  :host([variant='text'][orientation='horizontal']) ::slotted(button:not(:last-child)) {
    border-right: 1px solid var(--white);
  }

  :host([variant='text'][orientation='vertical']) ::slotted(swim-button:not(:last-child)),
  :host([variant='text'][orientation='vertical']) ::slotted(button:not(:last-child)) {
    border-bottom: 1px solid var(--white);
  }
`;
var Oo = /* @__PURE__ */ ((o) => (o.Horizontal = "horizontal", o.Vertical = "vertical", o))(Oo || {}), Po = /* @__PURE__ */ ((o) => (o.Contained = "contained", o.Text = "text", o))(Po || {}), Io = /* @__PURE__ */ ((o) => (o.Default = "default", o.Primary = "primary", o))(Io || {}), Or = Object.defineProperty, xi = (o, e, t, i) => {
  for (var s = void 0, r = o.length - 1, n; r >= 0; r--)
    (n = o[r]) && (s = n(e, t, s) || s);
  return s && Or(e, t, s), s;
};
const _s = "swim-button-group", Oi = class Oi extends y {
  constructor() {
    super(...arguments), this.orientation = Oo.Horizontal, this.variant = Po.Contained, this.buttonGroupStyle = Io.Default;
  }
  render() {
    return c`<slot></slot>`;
  }
};
Oi.styles = [E, Tr];
let it = Oi;
xi([
  a({ type: String, reflect: !0 })
], it.prototype, "orientation");
xi([
  a({ type: String, reflect: !0 })
], it.prototype, "variant");
xi([
  a({ attribute: "button-group-style", type: String, reflect: !0 })
], it.prototype, "buttonGroupStyle");
customElements.get(_s) || customElements.define(_s, it);
const Pr = v`
  :host {
    display: inline-block;
    cursor: pointer;
  }

  :host([disabled]) {
    pointer-events: none;
    cursor: default;
  }

  .swim-button-toggle {
    position: relative;
    z-index: 3;
    padding: 1px 10px;
    border-radius: var(--radius-4);
    color: var(--grey-350);
    white-space: nowrap;
    transition: background-color 0.25s cubic-bezier(0.35, 0, 0.25, 1), font-weight 0.25s ease-in;
    font: inherit;
    font-size: var(--font-size-m);
    cursor: inherit;
    border: none;
    background: transparent;
    width: 100%;
    text-align: inherit;
  }

  .swim-button-toggle.swim-button-toggle--checked {
    font-weight: var(--font-weight-semibold);
    color: var(--grey-050);
    background-color: var(--grey-700);
  }

  :host(:not([disabled])) .swim-button-toggle:hover:not(.swim-button-toggle--checked) {
    background: rgba(var(--grey-650-rgb), 0.1);
  }

  .swim-button-toggle:focus {
    outline: none;
  }

  .swim-button-toggle:focus-visible {
    outline: 2px solid var(--grey-500);
  }

  .swim-button-toggle__content {
    display: block;
  }
`;
var Ir = Object.defineProperty, Lr = Object.getOwnPropertyDescriptor, nt = (o, e, t, i) => {
  for (var s = i > 1 ? void 0 : i ? Lr(e, t) : e, r = o.length - 1, n; r >= 0; r--)
    (n = o[r]) && (s = (i ? n(e, t, s) : n(s)) || s);
  return i && s && Ir(e, t, s), s;
};
let Fr = 0;
const vs = "swim-button-toggle", Pi = class Pi extends y {
  constructor() {
    super(...arguments), this._uniqueId = `swim-button-toggle-${++Fr}`, this.name = this._uniqueId, this.value = !1, this._checked = !1, this._disabled = !1;
  }
  get id() {
    return this._id ?? this._uniqueId;
  }
  set id(e) {
    this._id = e;
  }
  get checked() {
    return this._checked;
  }
  set checked(e) {
    const t = p(e);
    this._checked !== t && (this._checked = t, this.requestUpdate("checked"));
  }
  get disabled() {
    return this._disabled;
  }
  set disabled(e) {
    this._disabled = p(e);
  }
  render() {
    return c`
      <button
        type="button"
        class="swim-button-toggle ${this._checked ? "swim-button-toggle--checked" : ""}"
        id="${this.id}"
        ?disabled="${this.disabled}"
        aria-pressed="${this._checked}"
        aria-disabled="${this.disabled ? "true" : "false"}"
        @click="${this._handleClick}"
      >
        <span class="swim-button-toggle__content">
          <slot></slot>
        </span>
      </button>
    `;
  }
  _handleClick(e) {
    e.preventDefault(), e.stopPropagation(), !(this.disabled || this.checked) && (this._checked = !0, this.dispatchEvent(
      new CustomEvent("value-change", {
        detail: this.value,
        // Must bubble so swim-button-toggle-group (light-DOM parent) receives selection.
        bubbles: !0,
        composed: !0
      })
    ));
  }
};
Pi.styles = [E, Pr];
let Ae = Pi;
nt([
  a({ type: String })
], Ae.prototype, "id", 1);
nt([
  a({ type: String })
], Ae.prototype, "name", 2);
nt([
  a()
], Ae.prototype, "value", 2);
nt([
  a({ type: Boolean, reflect: !0, converter: g })
], Ae.prototype, "checked", 1);
nt([
  b()
], Ae.prototype, "_checked", 2);
nt([
  a({ type: Boolean, reflect: !0, converter: g })
], Ae.prototype, "disabled", 1);
customElements.get(vs) || customElements.define(vs, Ae);
const Br = v`
  :host {
    display: inline-flex;
    transition: all 0.25s ease;
  }

  :host([role='group']) {
    /* Expose group semantics */
  }

  .swim-button-toggle-group__container {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .swim-button-toggle-group__container__label {
    font-weight: var(--font-weight-semibold);
    font-size: var(--font-size-xs);
    line-height: 12px;
    color: var(--grey-350);
  }

  .swim-button-toggle-group__container__toggle-buttons {
    position: relative;
    display: flex;
    flex-wrap: nowrap;
    border: 1px solid var(--grey-600);
    border-radius: var(--radius-4);
    padding: var(--spacing-2);
    gap: var(--spacing-2);
  }

  .swim-button-toggle-group__container__toggle-buttons__animation-holder {
    position: absolute;
    top: 0;
    margin: var(--spacing-2);
    height: calc(100% - 4px);
    border-radius: var(--radius-2);
    background-color: var(--grey-700);
    transition: all 0.25s cubic-bezier(0.35, 0, 0.25, 1);
    pointer-events: none;
  }

  :host([disabled]) .swim-button-toggle-group__container__toggle-buttons__animation-holder {
    display: none;
  }
`;
var Hr = Object.defineProperty, Rr = Object.getOwnPropertyDescriptor, $e = (o, e, t, i) => {
  for (var s = i > 1 ? void 0 : i ? Rr(e, t) : e, r = o.length - 1, n; r >= 0; r--)
    (n = o[r]) && (s = (i ? n(e, t, s) : n(s)) || s);
  return i && s && Hr(e, t, s), s;
};
let Yr = 0;
const ys = "swim-button-toggle-group", jt = class jt extends y {
  constructor() {
    var e;
    super(), this._uniqueId = `swim-button-toggle-group-${++Yr}`, this._animationHolderLeft = 0, this._animationHolderWidth = 0, this.label = "", this._value = void 0, this._disabled = !1, this._slotChangeBound = () => this._onSlotChange(), this._slotForCleanup = null, this._internals = ((e = this.attachInternals) == null ? void 0 : e.call(this)) ?? {}, this.setAttribute("role", "group"), this._boundValueChange = this._onValueChangeEvent.bind(this);
  }
  get id() {
    return this._id ?? this._uniqueId;
  }
  set id(e) {
    this._id = e;
  }
  get value() {
    return this._value;
  }
  set value(e) {
    this._value !== e && (this._value = e, this._internals.setFormValue(e != null ? String(e) : ""), this._syncSelection());
  }
  get disabled() {
    return this._disabled;
  }
  set disabled(e) {
    this._disabled = p(e), this._syncDisabled();
  }
  connectedCallback() {
    super.connectedCallback(), this.addEventListener("value-change", this._boundValueChange), this._internals.setFormValue && this._internals.setFormValue(this._value != null ? String(this._value) : "");
  }
  disconnectedCallback() {
    this._slotForCleanup && (this._slotForCleanup.removeEventListener("slotchange", this._slotChangeBound), this._slotForCleanup = null), this.removeEventListener("value-change", this._boundValueChange), super.disconnectedCallback();
  }
  firstUpdated(e) {
    super.firstUpdated(e);
    const t = this._slot;
    t && (this._slotForCleanup = t, t.addEventListener("slotchange", this._slotChangeBound)), this._onSlotChange();
  }
  updated(e) {
    super.updated(e), (e.has("value") || e.has("disabled")) && (this._syncSelection(), this._syncDisabled());
  }
  _getToggles() {
    const e = this._slot;
    return e ? e.assignedElements({ flatten: !0 }).filter(
      (i) => i instanceof HTMLElement && i.tagName === "SWIM-BUTTON-TOGGLE"
    ) : [];
  }
  _onSlotChange() {
    this._syncSelection(), this._syncDisabled(), requestAnimationFrame(() => this._calcAnimationDimensions());
  }
  _syncSelection() {
    const e = this._getToggles(), t = this._value;
    e.forEach((i) => {
      i.checked = i.value !== void 0 && i.value === t;
    }), requestAnimationFrame(() => this._calcAnimationDimensions());
  }
  _syncDisabled() {
    this._getToggles().forEach((t) => {
      t.disabled = this._disabled;
    });
  }
  _calcAnimationDimensions() {
    const e = this._getToggles();
    if (!e.length || this._disabled) {
      this._animationHolderLeft = 0, this._animationHolderWidth = 0;
      return;
    }
    const t = e.findIndex((l) => l.value !== void 0 && l.value === this._value);
    if (t < 0) {
      this._animationHolderLeft = 0, this._animationHolderWidth = 0;
      return;
    }
    let i = 0;
    for (let l = 0; l < t; l++)
      i += e[l].offsetWidth ?? 0;
    i += t * 2 + 2;
    const r = e[t], n = Math.max(0, ((r == null ? void 0 : r.offsetWidth) ?? 0) - 4);
    this._animationHolderLeft = i, this._animationHolderWidth = n;
  }
  _onValueChangeEvent(e) {
    const i = e.detail;
    this._value !== i && (this._value = i, this._internals.setFormValue(i != null ? String(i) : ""), this._syncSelection(), this.dispatchEvent(
      new CustomEvent("value-change", {
        detail: i,
        bubbles: !1,
        composed: !1
      })
    ));
  }
  render() {
    return c`
      <div class="swim-button-toggle-group__container" id="${this.id}">
        ${this.label ? c`<label class="swim-button-toggle-group__container__label" for="${this.id}-toggles"
              >${this.label}</label
            >` : ""}
        <div
          class="swim-button-toggle-group__container__toggle-buttons"
          id="${this.id}-toggles"
          role="group"
          aria-label="${this.label || "Toggle group"}"
        >
          <div
            class="swim-button-toggle-group__container__toggle-buttons__animation-holder"
            style="left: ${this._animationHolderLeft}px; width: ${this._animationHolderWidth}px;"
          ></div>
          <slot></slot>
        </div>
      </div>
    `;
  }
};
jt.styles = [E, Br], jt.formAssociated = !0;
let pe = jt;
$e([
  N("slot")
], pe.prototype, "_slot", 2);
$e([
  b()
], pe.prototype, "_animationHolderLeft", 2);
$e([
  b()
], pe.prototype, "_animationHolderWidth", 2);
$e([
  a({ type: String })
], pe.prototype, "id", 1);
$e([
  a({ type: String })
], pe.prototype, "label", 2);
$e([
  a()
], pe.prototype, "value", 1);
$e([
  a({ type: Boolean, reflect: !0, converter: g })
], pe.prototype, "disabled", 1);
customElements.get(ys) || customElements.define(ys, pe);
const jr = v`
  :host {
    position: relative;
    font-size: var(--font-size-m);
    background: var(--grey-800);
    display: inline-block;
    border: 1px solid var(--grey-700);
    width: 270px;
    padding: 0.5rem 0;
    border-radius: var(--radius-6);
    box-sizing: border-box;
    color: var(--grey-050);
  }

  :host(:focus) {
    outline: none;
  }

  /* ------------------------------------------------------------------ */
  /* Title row (navigation)                                              */
  /* ------------------------------------------------------------------ */

  .title-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--grey-800);
    color: var(--grey-050);
    padding: 0.69rem 0;
    font-weight: var(--font-weight-semibold);
    line-height: 1;
  }

  .title-row .title {
    color: var(--blue-400);
    min-width: 100px;
    padding: 4px 8px;
    cursor: pointer;
    border-radius: var(--radius-4);
    background: none;
    border: none;
    font: inherit;
    font-weight: var(--font-weight-semibold);
    font-size: inherit;
  }

  .title-row .title:hover {
    background: var(--grey-750);
  }

  .title-row .prev-month,
  .title-row .next-month {
    color: var(--grey-350);
    font-size: var(--font-size-xxs);
    border-radius: var(--radius-4);
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px 8px;
    line-height: 1;
  }

  .title-row .prev-month:hover,
  .title-row .next-month:hover {
    color: var(--grey-050);
  }

  .title-row .prev-month:disabled,
  .title-row .next-month:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  button {
    outline: 0px var(--blue-200);
  }

  button:focus-visible {
    outline: 2px solid var(--blue-200);
    outline-offset: 1px;
  }

  /* ------------------------------------------------------------------ */
  /* Day names row                                                       */
  /* ------------------------------------------------------------------ */

  .day-name-row {
    color: var(--grey-350);
    font-weight: var(--font-weight-semibold);
    display: flex;
  }

  .day-name {
    flex: 1 0 30px;
    margin: 0.1rem 0.2rem;
    line-height: 1.8rem;
    text-align: center;
    width: 1.8rem;
    height: 1.8rem;
  }

  /* ------------------------------------------------------------------ */
  /* Day grid                                                            */
  /* ------------------------------------------------------------------ */

  .day-container {
    margin-top: 0;
    width: 100%;
    border-collapse: collapse;
  }

  .day-row {
    display: flex;
  }

  .day-cell {
    flex: 1 0 30px;
    margin: 0.1rem 0.2rem;
    line-height: 1.8rem;
    text-align: center;
    width: 1.8rem;
    height: 1.8rem;
    padding: 0;
  }

  .day {
    color: var(--grey-050);
    height: 100%;
    width: 100%;
    max-height: 30px;
    max-width: 30px;
    line-height: 1.8rem;
    border-radius: 50%;
    text-align: center;
    transition: background 200ms;
    padding: 0;
    border: none;
    background: none;
    cursor: pointer;
    font: inherit;
    font-size: inherit;
  }

  .day.prev-month,
  .day.next-month {
    color: var(--grey-350);
    opacity: 0.2;
  }

  .day.today {
    background: var(--grey-750);
  }

  .day.active {
    background: var(--blue-400);
    color: var(--grey-050);
  }

  .day:hover:not(.active):not([disabled]) {
    background: var(--blue-400);
    color: var(--grey-050);
    opacity: 1;
  }

  .day:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  .day.focus:not([disabled]) {
    outline: 2px solid var(--blue-200);
    outline-offset: 1px;
  }

  /* ------------------------------------------------------------------ */
  /* Month grid                                                          */
  /* ------------------------------------------------------------------ */

  .months-container {
    margin: 0.5rem;
    color: var(--grey-050);
    width: calc(100% - 1rem);
    border-collapse: collapse;
  }

  .months-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    border: 1px solid var(--grey-700);
  }

  .month-cell {
    padding: 0;
    border: 1px solid var(--grey-700);
  }

  .month {
    grid-auto-rows: auto;
    text-transform: uppercase;
    text-align: center;
    font-size: var(--font-size-s);
    width: 100%;
    padding: 0.75rem;
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    font: inherit;
    font-size: var(--font-size-s);
    text-transform: uppercase;
  }

  .month.active {
    background-color: var(--blue-400);
  }

  .month.current:not(.active) {
    background-color: var(--grey-750);
  }

  .month:hover:not(.active):not([disabled]) {
    background: var(--blue-400);
    color: var(--grey-050);
    opacity: 1;
  }

  .month:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  /* ------------------------------------------------------------------ */
  /* Year grid                                                           */
  /* ------------------------------------------------------------------ */

  .years-container {
    margin: 0.5rem;
    color: var(--grey-050);
    width: calc(100% - 1rem);
    border-collapse: collapse;
  }

  .years-row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    border: 1px solid var(--grey-700);
  }

  .year-cell {
    padding: 0;
    border: 1px solid var(--grey-700);
  }

  .year {
    grid-auto-rows: auto;
    text-transform: uppercase;
    text-align: center;
    font-size: var(--font-size-s);
    width: 100%;
    padding: 0.475rem;
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    font: inherit;
    font-size: var(--font-size-s);
  }

  .year.active {
    background-color: var(--blue-400);
  }

  .year.current:not(.active) {
    background-color: var(--grey-750);
  }

  .year:hover:not(.active):not([disabled]) {
    background: var(--blue-400);
    color: var(--grey-050);
    opacity: 1;
  }

  .year:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`, Vr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], Nr = ["S", "M", "T", "W", "T", "F", "S"];
function hi(o, e) {
  return o.getFullYear() === e.getFullYear() && o.getMonth() === e.getMonth() && o.getDate() === e.getDate();
}
function Hl(o, e) {
  return o.getFullYear() === e.getFullYear() && o.getMonth() === e.getMonth();
}
function qr(o, e) {
  return o.getFullYear() === e.getFullYear();
}
function xs(o, e) {
  return new Date(o, e + 1, 0).getDate();
}
function ri(o, e, t) {
  return {
    num: o.getDate(),
    dayOfWeek: o.getDay(),
    date: new Date(o),
    today: hi(o, t),
    prevMonth: o.getMonth() < e || o.getMonth() === 11 && e === 0,
    nextMonth: o.getMonth() > e || o.getMonth() === 0 && e === 11
  };
}
function ae(o) {
  const e = /* @__PURE__ */ new Date(), t = o.getFullYear(), i = o.getMonth(), s = xs(t, i), r = new Date(t, i, 1).getDay(), n = [];
  if (r > 0) {
    const h = xs(t, i - 1);
    for (let w = r - 1; w >= 0; w--) {
      const m = new Date(t, i - 1, h - w);
      n.push(ri(m, i, e));
    }
  }
  for (let h = 1; h <= s; h++)
    n.push(ri(new Date(t, i, h), i, e));
  const l = n.length % 7;
  if (l > 0) {
    const h = 7 - l;
    for (let w = 1; w <= h; w++)
      n.push(ri(new Date(t, i + 1, w), i, e));
  }
  const d = [];
  for (let h = 0; h < n.length; h += 7)
    d.push(n.slice(h, h + 7));
  return d;
}
function ks(o) {
  return Math.floor(o / 20) * 20;
}
function ni(o, e, t = "day") {
  if (!e) return !1;
  switch (t) {
    case "year":
      return o.getFullYear() < e.getFullYear();
    case "month":
      return o.getFullYear() < e.getFullYear() || o.getFullYear() === e.getFullYear() && o.getMonth() < e.getMonth();
    default:
      return new Date(o.getFullYear(), o.getMonth(), o.getDate()) < new Date(e.getFullYear(), e.getMonth(), e.getDate());
  }
}
function ai(o, e, t = "day") {
  if (!e) return !1;
  switch (t) {
    case "year":
      return o.getFullYear() > e.getFullYear();
    case "month":
      return o.getFullYear() > e.getFullYear() || o.getFullYear() === e.getFullYear() && o.getMonth() > e.getMonth();
    default:
      return new Date(o.getFullYear(), o.getMonth(), o.getDate()) > new Date(e.getFullYear(), e.getMonth(), e.getDate());
  }
}
var M = /* @__PURE__ */ ((o) => (o.date = "date", o.time = "time", o.datetime = "datetime", o))(M || {}), L = /* @__PURE__ */ ((o) => (o.HUMAN = "human", o.TIMEZONE = "timezone", o.LOCAL = "local", o.CUSTOM = "custom", o))(L || {});
const Ur = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], Gr = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
], $r = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], Wr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], Cs = {
  L: "MM/DD/YYYY",
  l: "M/D/YYYY",
  LL: "MMMM D, YYYY",
  ll: "MMM D, YYYY",
  LLL: "MMMM D, YYYY h:mm A",
  lll: "MMM D, YYYY h:mm A",
  LLLL: "dddd, MMMM D, YYYY h:mm A",
  llll: "ddd, MMM D, YYYY h:mm A",
  LT: "h:mm A",
  LTS: "h:mm:ss A"
}, S = {
  shortDate: "l",
  shortTime: "LT",
  shortDateTime: "l LT",
  shortDateTimeSeconds: "l LTS",
  date: "ll",
  time: "LT",
  dateTime: "lll",
  dateTimeSeconds: "ll LTS",
  dateMonth: "MMM YYYY",
  dateYear: "YYYY",
  fullDate: "ddd, ll Z [(]zz[)]",
  fullTime: "LT Z [(]zz[)]",
  fullDateTime: "llll Z [(]zz[)]",
  fullDateMonth: "MMM YYYY Z [(]zz[)]",
  fullDateYear: "YYYY Z [(]zz[)]",
  localeDate: "L",
  localeDateTime: "L LT",
  localeTime: "LT",
  timezoneDate: "L Z",
  timezoneDateTime: "L LT Z",
  timezoneDateTimeSeconds: "L LTS Z",
  timezoneTime: "LT Z",
  timezoneDateMonth: "MMM YYYY Z",
  timezoneDateYear: "YYYY Z",
  locale: "LLL",
  shortLocale: "LL",
  fullLocale: "LLLL"
};
function G(o, e = 2) {
  return String(o).padStart(e, "0");
}
function Lo(o, e) {
  if (!e)
    return {
      year: o.getFullYear(),
      month: o.getMonth(),
      day: o.getDate(),
      hour: o.getHours(),
      minute: o.getMinutes(),
      second: o.getSeconds(),
      ms: o.getMilliseconds(),
      dow: o.getDay()
    };
  try {
    const i = new Intl.DateTimeFormat("en-US", {
      timeZone: e,
      year: "numeric",
      month: "numeric",
      day: "numeric",
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: !1
    }).formatToParts(o), s = (n) => {
      var l;
      return ((l = i.find((d) => d.type === n)) == null ? void 0 : l.value) ?? "";
    }, r = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    return {
      year: parseInt(s("year"), 10),
      month: parseInt(s("month"), 10) - 1,
      day: parseInt(s("day"), 10),
      hour: parseInt(s("hour"), 10) % 24,
      minute: parseInt(s("minute"), 10),
      second: parseInt(s("second"), 10),
      ms: o.getMilliseconds(),
      dow: r[s("weekday")] ?? 0
    };
  } catch {
    return Lo(o);
  }
}
function Es(o, e) {
  if (!e) {
    const t = -o.getTimezoneOffset();
    return As(t);
  }
  try {
    const t = o.toLocaleString("en-US", { timeZone: "UTC" }), i = o.toLocaleString("en-US", { timeZone: e }), s = new Date(i).getTime() - new Date(t).getTime(), r = Math.round(s / 6e4);
    return As(r);
  } catch {
    return "+00:00";
  }
}
function As(o) {
  const e = o >= 0 ? "+" : "-", t = Math.abs(o);
  return `${e}${G(Math.floor(t / 60))}:${G(t % 60)}`;
}
function Qr(o, e) {
  var t;
  try {
    return ((t = new Intl.DateTimeFormat("en-US", {
      timeZone: e || void 0,
      timeZoneName: "short"
    }).formatToParts(o).find((s) => s.type === "timeZoneName")) == null ? void 0 : t.value) ?? "";
  } catch {
    return "";
  }
}
function Zr(o) {
  const e = ["LLLL", "llll", "LLL", "lll", "LTS", "LL", "ll", "LT", "L", "l"];
  let t = o;
  for (const i of e)
    Cs[i] && (t = t.split(i).join(Cs[i]));
  return t;
}
const Xr = /(MMMM|YYYY|dddd|MMM|ddd|SSS|MM|DD|HH|hh|mm|ss|YY|ZZ|zz|M|D|H|h|A|a|Z|z)/g;
function Kr(o, e, t, i) {
  switch (o) {
    case "YYYY":
      return String(e.year);
    case "YY":
      return String(e.year).slice(-2);
    case "MMMM":
      return Gr[e.month];
    case "MMM":
      return Ur[e.month];
    case "MM":
      return G(e.month + 1);
    case "M":
      return String(e.month + 1);
    case "DD":
      return G(e.day);
    case "D":
      return String(e.day);
    case "dddd":
      return Wr[e.dow];
    case "ddd":
      return $r[e.dow];
    case "HH":
      return G(e.hour);
    case "H":
      return String(e.hour);
    case "hh":
      return G(e.hour % 12 || 12);
    case "h":
      return String(e.hour % 12 || 12);
    case "mm":
      return G(e.minute);
    case "ss":
      return G(e.second);
    case "SSS":
      return G(e.ms, 3);
    case "A":
      return e.hour >= 12 ? "PM" : "AM";
    case "a":
      return e.hour >= 12 ? "pm" : "am";
    case "Z":
      return Es(t, i);
    case "ZZ":
      return Es(t, i).replace(":", "");
    case "zz":
    case "z":
      return Qr(t, i);
    default:
      return o;
  }
}
function zt(o) {
  return S[o] || o;
}
function he(o, e, t) {
  const i = vt(t);
  let s = Zr(e);
  const r = [];
  let n = 0, l = "";
  for (; n < s.length; ) {
    const f = s.indexOf("[", n);
    if (f === -1) {
      l += s.slice(n);
      break;
    }
    l += s.slice(n, f);
    const _ = s.indexOf("]", f + 1);
    if (_ === -1) {
      l += s.slice(f);
      break;
    }
    r.push(s.slice(f + 1, _)), l += `\0${r.length - 1}\0`, n = _ + 1;
  }
  s = l;
  const d = Lo(o, i), h = s.replace(Xr, (f) => Kr(f, d, o, i));
  let w = "", m = 0;
  for (; m < h.length; ) {
    const f = h.indexOf("\0", m);
    if (f === -1) {
      w += h.slice(m);
      break;
    }
    w += h.slice(m, f);
    let _ = f + 1;
    for (; _ < h.length && h[_] >= "0" && h[_] <= "9"; ) _++;
    if (h[_] === "\0" && _ > f + 1) {
      const P = parseInt(h.slice(f + 1, _), 10);
      w += r[P] ?? "", m = _ + 1;
    } else
      w += h.slice(f, _ || f + 1), m = _ || f + 1;
  }
  return w;
}
function Ve(o) {
  if (o instanceof Date) return Y(o) ? o : null;
  if (!o || typeof o != "string") return null;
  const e = o.trim();
  if (!e) return null;
  const t = new Date(e);
  if (Y(t)) return t;
  const i = e.match(/^(\d{1,2})\/(\d{4})$/);
  if (i) {
    const n = new Date(parseInt(i[2], 10), parseInt(i[1], 10) - 1, 1);
    if (Y(n)) return n;
  }
  const s = e.match(/^(\d{4})$/);
  if (s) {
    const n = new Date(parseInt(s[1], 10), 0, 1);
    if (Y(n)) return n;
  }
  const r = e.match(/^(\w{3,})\s+(\d{4})$/);
  if (r) {
    const n = /* @__PURE__ */ new Date(`${r[1]} 1, ${r[2]}`);
    if (Y(n)) return n;
  }
  return null;
}
function Y(o) {
  return o instanceof Date && !isNaN(o.getTime());
}
function ui(o, e) {
  if (!e || !Y(o)) return o;
  const t = new Date(o), i = [
    ["millisecond", () => {
    }],
    ["second", () => t.setMilliseconds(0)],
    [
      "minute",
      () => {
        t.setMilliseconds(0), t.setSeconds(0);
      }
    ],
    [
      "hour",
      () => {
        t.setMilliseconds(0), t.setSeconds(0), t.setMinutes(0);
      }
    ],
    [
      "date",
      () => {
        t.setMilliseconds(0), t.setSeconds(0), t.setMinutes(0), t.setHours(0);
      }
    ],
    [
      "month",
      () => {
        t.setMilliseconds(0), t.setSeconds(0), t.setMinutes(0), t.setHours(0), t.setDate(1);
      }
    ],
    [
      "year",
      () => {
        t.setMilliseconds(0), t.setSeconds(0), t.setMinutes(0), t.setHours(0), t.setDate(1), t.setMonth(0);
      }
    ]
  ], s = i.findIndex(([r]) => r === e);
  return s >= 0 && i[s][1](), t;
}
function Fo(o, e, t) {
  switch (o) {
    case L.HUMAN:
    case L.TIMEZONE:
      switch (e) {
        case M.date:
          return t === "month" ? S.timezoneDateMonth : t === "year" ? S.timezoneDateYear : S.timezoneDate;
        case M.time:
          return S.timezoneTime;
        default:
          return S.timezoneDateTime;
      }
    case L.LOCAL:
      switch (e) {
        case M.date:
          return t === "month" ? S.dateMonth : t === "year" ? S.dateYear : S.localeDate;
        case M.time:
          return S.localeTime;
        default:
          return S.localeDateTime;
      }
    case L.CUSTOM:
      switch (e) {
        case M.date:
          return t === "month" ? S.dateMonth : t === "year" ? S.dateYear : S.date;
        case M.time:
          return S.time;
        default:
          return S.dateTime;
      }
    default:
      return S.localeDate;
  }
}
function Jr(o, e, t) {
  switch (o) {
    case L.HUMAN:
    case L.TIMEZONE:
      switch (e) {
        case M.date:
          return t === "month" ? S.fullDateMonth : t === "year" ? S.fullDateYear : S.fullDate;
        case M.time:
          return S.fullTime;
        default:
          return S.fullDateTime;
      }
    case L.LOCAL:
      switch (e) {
        case M.date:
          return t === "month" ? S.dateMonth : t === "year" ? S.dateYear : S.localeDate;
        case M.time:
          return S.localeTime;
        default:
          return S.localeDateTime;
      }
    case L.CUSTOM:
      switch (e) {
        case M.date:
          return t === "month" ? S.dateMonth : t === "year" ? S.dateYear : S.date;
        case M.time:
          return S.time;
        default:
          return S.dateTime;
      }
    default:
      return S.localeDate;
  }
}
function vt(o) {
  if (o)
    return o.toLowerCase() === "utc" ? "UTC" : o;
}
function Rl(o, e) {
  if (!o || !Y(o)) return "";
  const t = o.getFullYear(), i = G(o.getMonth() + 1), s = G(o.getDate()), r = G(o.getHours()), n = G(o.getMinutes()), l = G(o.getSeconds());
  switch (e) {
    case "time":
      return `${r}:${n}:${l}`;
    case "datetime":
    case "datetime-local":
      return `${t}-${i}-${s}T${r}:${n}:${l}`;
    case "month":
      return `${t}-${i}`;
    default:
      return `${t}-${i}-${s}`;
  }
}
function Ss(o, e, t) {
  if (!Y(o)) return !1;
  const i = e ? Ve(e) : null, s = t ? Ve(t) : null;
  return !!(i && Y(i) && o < i || s && Y(s) && o > s);
}
var en = Object.defineProperty, tn = Object.getOwnPropertyDescriptor, we = (o, e, t, i) => {
  for (var s = i > 1 ? void 0 : i ? tn(e, t) : e, r = o.length - 1, n; r >= 0; r--)
    (n = o[r]) && (s = (i ? n(e, t, s) : n(s)) || s);
  return i && s && en(e, t, s), s;
};
const Ds = "swim-calendar", Ii = class Ii extends y {
  constructor() {
    super(...arguments), this._value = null, this.disabled = !1, this._currentView = "date", this._focusDate = /* @__PURE__ */ new Date(), this._weeks = [], this._startYear = 0, this._currentDate = /* @__PURE__ */ new Date(), this._onDayKeyDown = (e) => {
      let t = !1;
      switch (e.code) {
        case "ArrowDown":
          this._moveFocus(1, "week"), t = !0;
          break;
        case "ArrowUp":
          this._moveFocus(-1, "week"), t = !0;
          break;
        case "ArrowLeft":
          this._moveFocus(-1, "day"), t = !0;
          break;
        case "ArrowRight":
          this._moveFocus(1, "day"), t = !0;
          break;
        case "PageUp":
          this._moveFocus(-1, e.altKey ? "year" : "month"), t = !0;
          break;
        case "PageDown":
          this._moveFocus(1, e.altKey ? "year" : "month"), t = !0;
          break;
        case "Home": {
          const i = new Date(this._focusDate);
          e.altKey ? i.setDate(1) : i.setDate(i.getDate() - i.getDay()), this._focusDate = i, this._weeks = ae(this._focusDate), this.requestUpdate(), this.updateComplete.then(() => this.focusDay()), t = !0;
          break;
        }
        case "End": {
          const i = new Date(this._focusDate);
          e.altKey ? i.setMonth(i.getMonth() + 1, 0) : i.setDate(i.getDate() + (6 - i.getDay())), this._focusDate = i, this._weeks = ae(this._focusDate), this.requestUpdate(), this.updateComplete.then(() => this.focusDay()), t = !0;
          break;
        }
        case "Enter":
          setTimeout(() => {
            this.dispatchEvent(new CustomEvent("day-key-enter", { bubbles: !1, composed: !1 }));
          }, 200);
          break;
      }
      t && (e.stopPropagation(), e.preventDefault());
    }, this._onMonthKeyDown = (e) => {
      let t = !1;
      switch (e.code) {
        case "ArrowDown":
          this._moveFocus(3, "month"), t = !0;
          break;
        case "ArrowUp":
          this._moveFocus(-3, "month"), t = !0;
          break;
        case "ArrowLeft":
          this._moveFocus(-1, "month"), t = !0;
          break;
        case "ArrowRight":
          this._moveFocus(1, "month"), t = !0;
          break;
        case "PageUp":
          this._moveFocus(-1, "year"), t = !0;
          break;
        case "PageDown":
          this._moveFocus(1, "year"), t = !0;
          break;
        case "Enter":
          setTimeout(() => {
            this.dispatchEvent(new CustomEvent("day-key-enter", { bubbles: !1, composed: !1 }));
          }, 200);
          break;
      }
      t && (e.stopPropagation(), e.preventDefault());
    }, this._onYearKeyDown = (e) => {
      let t = !1;
      switch (e.code) {
        case "ArrowDown":
          this._moveFocus(4, "year"), t = !0;
          break;
        case "ArrowUp":
          this._moveFocus(-4, "year"), t = !0;
          break;
        case "ArrowLeft":
          this._moveFocus(-1, "year"), t = !0;
          break;
        case "ArrowRight":
          this._moveFocus(1, "year"), t = !0;
          break;
        case "PageUp":
          this._moveFocus(-20, "year"), t = !0;
          break;
        case "PageDown":
          this._moveFocus(20, "year"), t = !0;
          break;
        case "Enter":
          setTimeout(() => {
            this.dispatchEvent(new CustomEvent("day-key-enter", { bubbles: !1, composed: !1 }));
          }, 200);
          break;
      }
      t && (e.stopPropagation(), e.preventDefault());
    };
  }
  get value() {
    return this._value;
  }
  set value(e) {
    const t = this._value;
    e && Y(e) ? this._value = new Date(e) : this._value = null, this.requestUpdate("value", t);
  }
  set minView(e) {
    this._minView = e, this._validateView(), this.requestUpdate();
  }
  get minView() {
    return this._minView || "date";
  }
  // today, for highlighting
  // ---------------------------------------------------------------------------
  // Lifecycle
  // ---------------------------------------------------------------------------
  connectedCallback() {
    super.connectedCallback(), this._init();
  }
  updated(e) {
    super.updated(e), e.has("value") && this._value && (this._focusDate = new Date(this._value), this._weeks = ae(this._focusDate), this._startYear = ks(this._focusDate.getFullYear()));
  }
  // ---------------------------------------------------------------------------
  // Public methods
  // ---------------------------------------------------------------------------
  /** Focus the active/focused day button. */
  focusDay() {
    var t;
    const e = (t = this.shadowRoot) == null ? void 0 : t.querySelector("button.focus");
    e == null || e.focus();
  }
  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------
  render() {
    switch (this._currentView) {
      case "month":
        return this._renderMonthView();
      case "year":
        return this._renderYearView();
      default:
        return this._renderDateView();
    }
  }
  _renderDateView() {
    const e = this._formatMonthYear(this._focusDate);
    return c`
      <div class="text-center">
        <div class="title-row">
          <button
            type="button"
            class="prev-month"
            ?disabled="${this.disabled}"
            title="Previous Month"
            @click="${this._prevMonth}"
          >
            <swim-icon font-icon="arrow-left"></swim-icon>
          </button>
          <button type="button" class="title" @click="${this._changeViews}">${e}</button>
          <button
            type="button"
            class="next-month"
            ?disabled="${this.disabled}"
            title="Next Month"
            @click="${this._nextMonth}"
          >
            <swim-icon font-icon="arrow-right"></swim-icon>
          </button>
        </div>
        <div class="day-name-row">${Nr.map((t) => c`<div class="day-name text-center">${t}</div>`)}</div>
        <table class="day-container" role="grid">
          ${this._weeks.map(
      (t) => c`
              <tr class="day-row" role="row">
                ${t.map((i) => {
        if (!i.num)
          return c`<td class="day-cell text-center" role="gridcell"></td>`;
        const s = this._value ? hi(i.date, this._value) : !1, r = hi(i.date, this._focusDate), n = this.disabled || this._isDayDisabled(i.date), l = ["day"];
        return i.prevMonth && l.push("prev-month"), i.nextMonth && l.push("next-month"), i.today && l.push("today"), s && l.push("active"), r && !n && l.push("focus"), c`
                    <td class="day-cell text-center" role="gridcell">
                      <button
                        type="button"
                        class="${l.join(" ")}"
                        ?disabled="${n}"
                        tabindex="${r && !n ? 0 : -1}"
                        @click="${() => this._onDayClick(i)}"
                        @keydown="${this._onDayKeyDown}"
                      >
                        ${i.num}
                      </button>
                    </td>
                  `;
      })}
              </tr>
            `
    )}
        </table>
      </div>
    `;
  }
  _renderMonthView() {
    const e = String(this._focusDate.getFullYear());
    return c`
      <div class="text-center">
        <div class="title-row">
          <button
            type="button"
            class="prev-month"
            ?disabled="${this.disabled}"
            title="Previous Year"
            @click="${this._prevYear}"
          >
            <swim-icon font-icon="arrow-left"></swim-icon>
          </button>
          <button type="button" class="title" @click="${this._changeViews}">${e}</button>
          <button
            type="button"
            class="next-month"
            ?disabled="${this.disabled}"
            title="Next Year"
            @click="${this._nextYear}"
          >
            <swim-icon font-icon="arrow-right"></swim-icon>
          </button>
        </div>
        <table class="months-container" role="grid">
          <tr class="months-row" role="row">
            ${Vr.map((t, i) => {
      const s = this._isMonthActive(i), r = this._isCurrentMonth(i), n = this._focusDate.getMonth() === i && qr(this._focusDate, this._focusDate), l = this.disabled || this._isMonthDisabled(i), d = ["month"];
      return s && d.push("active"), r && d.push("current"), n && d.push("focus"), c`
                <td class="month-cell text-center" role="gridcell">
                  <button
                    type="button"
                    class="${d.join(" ")}"
                    ?disabled="${l}"
                    tabindex="${n && !l ? 0 : -1}"
                    @click="${() => this._onMonthClick(i)}"
                    @keydown="${this._onMonthKeyDown}"
                  >
                    ${t}
                  </button>
                </td>
              `;
    })}
          </tr>
        </table>
      </div>
    `;
  }
  _renderYearView() {
    const e = Array.from({ length: 20 }, (t, i) => this._startYear + i);
    return c`
      <div class="text-center">
        <div class="title-row">
          <button
            type="button"
            class="prev-month"
            ?disabled="${this.disabled}"
            title="Previous Two Decades"
            @click="${this._prevTwoDecades}"
          >
            <swim-icon font-icon="arrow-left"></swim-icon>
          </button>
          <button type="button" class="title" @click="${this._changeViews}">
            ${this._startYear} - ${this._startYear + 20}
          </button>
          <button
            type="button"
            class="next-month"
            ?disabled="${this.disabled}"
            title="Next Two Decades"
            @click="${this._nextTwoDecades}"
          >
            <swim-icon font-icon="arrow-right"></swim-icon>
          </button>
        </div>
        <table class="years-container" role="grid">
          <tr class="years-row" role="row">
            ${e.map((t) => {
      const i = this._isYearActive(t), s = t === this._currentDate.getFullYear(), r = t === this._focusDate.getFullYear(), n = this.disabled || this._isYearDisabled(t), l = ["year"];
      return i && l.push("active"), s && l.push("current"), r && l.push("focus"), c`
                <td class="year-cell text-center" role="gridcell">
                  <button
                    type="button"
                    class="${l.join(" ")}"
                    ?disabled="${n}"
                    tabindex="${r && !n ? 0 : -1}"
                    @click="${() => this._onYearClick(t)}"
                    @keydown="${this._onYearKeyDown}"
                  >
                    ${t}
                  </button>
                </td>
              `;
    })}
          </tr>
        </table>
      </div>
    `;
  }
  // ---------------------------------------------------------------------------
  // Internal helpers
  // ---------------------------------------------------------------------------
  _init() {
    this._value && (this._focusDate = new Date(this._value)), this._weeks = ae(this._focusDate), this._currentDate = /* @__PURE__ */ new Date(), this._startYear = ks(this._focusDate.getFullYear()), this._validateView();
  }
  _validateView() {
    [
      "date",
      "month",
      "year"
      /* Year */
    ].indexOf(
      this._minView || "date"
      /* Date */
    ) < 0 && (this._minView = "date"), this._currentView = this._minView || "date";
  }
  _formatMonthYear(e) {
    return `${[
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ][e.getMonth()]} ${e.getFullYear()}`;
  }
  _resolveMin() {
    return this.minDate ? this.minDate instanceof Date ? this.minDate : Ve(this.minDate) : null;
  }
  _resolveMax() {
    return this.maxDate ? this.maxDate instanceof Date ? this.maxDate : Ve(this.maxDate) : null;
  }
  _isDayDisabled(e) {
    return ni(e, this._resolveMin(), "day") || ai(e, this._resolveMax(), "day");
  }
  _isMonthDisabled(e) {
    const t = new Date(this._focusDate.getFullYear(), e, 1);
    return ni(t, this._resolveMin(), "month") || ai(t, this._resolveMax(), "month");
  }
  _isYearDisabled(e) {
    const t = new Date(e, 0, 1);
    return ni(t, this._resolveMin(), "year") || ai(t, this._resolveMax(), "year");
  }
  _isMonthActive(e) {
    return this._value ? this._value.getMonth() === e && this._value.getFullYear() === this._focusDate.getFullYear() : !1;
  }
  _isCurrentMonth(e) {
    return this._currentDate.getMonth() === e && this._currentDate.getFullYear() === this._focusDate.getFullYear();
  }
  _isYearActive(e) {
    return this._value ? this._value.getFullYear() === e : !1;
  }
  // ---------------------------------------------------------------------------
  // Navigation
  // ---------------------------------------------------------------------------
  _prevMonth() {
    const e = new Date(this._focusDate);
    e.setMonth(e.getMonth() - 1), this._focusDate = e, this._weeks = ae(this._focusDate);
  }
  _nextMonth() {
    const e = new Date(this._focusDate);
    e.setMonth(e.getMonth() + 1), this._focusDate = e, this._weeks = ae(this._focusDate);
  }
  _prevYear() {
    const e = new Date(this._focusDate);
    e.setFullYear(e.getFullYear() - 1), this._focusDate = e;
  }
  _nextYear() {
    const e = new Date(this._focusDate);
    e.setFullYear(e.getFullYear() + 1), this._focusDate = e;
  }
  _prevTwoDecades() {
    this._startYear -= 20;
  }
  _nextTwoDecades() {
    this._startYear += 20;
  }
  _changeViews() {
    this._currentView === "date" ? this._currentView = "month" : this._currentView === "month" ? this._currentView = "year" : this._currentView = this._minView || "date", this._weeks = ae(this._focusDate);
  }
  // ---------------------------------------------------------------------------
  // Day interaction
  // ---------------------------------------------------------------------------
  _onDayClick(e) {
    this._focusDate = new Date(e.date), this._value = new Date(e.date), (e.prevMonth || e.nextMonth) && (this._weeks = ae(this._focusDate)), this.requestUpdate(), this.dispatchEvent(new CustomEvent("change", { detail: this._value, bubbles: !1, composed: !1 }));
  }
  _onMonthClick(e) {
    const t = new Date(this._focusDate);
    t.setMonth(e), this._focusDate = t, this._value = new Date(t), (this._minView || "date") !== "month" && (this._currentView = "date", this._weeks = ae(this._focusDate)), this.requestUpdate(), this.dispatchEvent(new CustomEvent("change", { detail: this._value, bubbles: !1, composed: !1 }));
  }
  _onYearClick(e) {
    const t = new Date(this._focusDate);
    t.setFullYear(e), this._focusDate = t, this._value = new Date(t), (this._minView || "date") !== "year" && (this._currentView = "month", this._weeks = ae(this._focusDate)), this.requestUpdate(), this.dispatchEvent(new CustomEvent("change", { detail: this._value, bubbles: !1, composed: !1 }));
  }
  // ---------------------------------------------------------------------------
  // Keyboard navigation
  // ---------------------------------------------------------------------------
  _moveFocus(e, t) {
    const i = new Date(this._focusDate);
    switch (t) {
      case "day":
        i.setDate(i.getDate() + e);
        break;
      case "week":
        i.setDate(i.getDate() + e * 7);
        break;
      case "month":
        i.setMonth(i.getMonth() + e);
        break;
      case "year":
        i.setFullYear(i.getFullYear() + e);
        break;
    }
    this._focusDate = i, this._weeks = ae(this._focusDate), this._focusDate.getFullYear() < this._startYear ? this._prevTwoDecades() : this._focusDate.getFullYear() > this._startYear + 20 && this._nextTwoDecades(), this.requestUpdate(), this.updateComplete.then(() => this.focusDay());
  }
};
Ii.styles = [E, jr];
let W = Ii;
we([
  a({ attribute: !1 })
], W.prototype, "value", 1);
we([
  a({ attribute: "min-date" })
], W.prototype, "minDate", 2);
we([
  a({ attribute: "max-date" })
], W.prototype, "maxDate", 2);
we([
  a({ type: Boolean, reflect: !0, converter: g })
], W.prototype, "disabled", 2);
we([
  a({ type: String })
], W.prototype, "timezone", 2);
we([
  a({ type: String, attribute: "min-view" })
], W.prototype, "minView", 1);
we([
  b()
], W.prototype, "_currentView", 2);
we([
  b()
], W.prototype, "_focusDate", 2);
we([
  b()
], W.prototype, "_weeks", 2);
we([
  b()
], W.prototype, "_startYear", 2);
customElements.get(Ds) || customElements.define(Ds, W);
const Lt = 4, li = 3, Ms = 25, sn = 30, on = 15, zs = 27, rn = v`
  @keyframes cardSlideIn {
    0% {
      opacity: 0;
      transform: translateY(40px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  :host {
    display: flex;
    position: relative;
    background: var(--grey-800);
    border-radius: var(--radius-6);
    box-sizing: border-box;
    color: var(--grey-050);
    font-size: var(--font-size-m);
  }

  :host([disabled]) {
    cursor: default;
    pointer-events: none;
  }

  :host([appearance='flat']) {
    background: none;
    box-shadow: none;
  }

  /* Status dot */
  .swim-card__status {
    display: block;
    background-color: var(--grey-550);
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }

  .swim-card__status--success {
    background-color: var(--color-success);
  }

  .swim-card__status--error {
    background-color: var(--color-error);
  }

  .swim-card__accent {
    display: block;
    background: linear-gradient(180deg, var(--grey-100) 0%, var(--grey-200) 100%);
  }

  .swim-card__dot {
    display: inline-block;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background-color: var(--grey-400);
    margin: 3px var(--spacing-4);
  }

  /* Outline (selected or error) – match ngx-ui */
  .swim-card__outline {
    pointer-events: none;
    position: absolute;
    top: -5px;
    right: -5px;
    left: -5px;
    bottom: -5px;
    border: ${li}px solid var(--blue-400);
    border-radius: var(--radius-6);
  }

  .swim-card__outline--error {
    border-color: var(--color-error);
  }

  .swim-card__outline-text {
    pointer-events: none;
    color: var(--blue-400);
    white-space: nowrap;
    position: absolute;
    top: -5px;
    right: -5px;
    left: -5px;
    bottom: -5px;
    border: ${li}px solid var(--blue-400);
    border-bottom: 0;
    border-radius: var(--radius-6);
  }

  .swim-card__outline-text--error {
    color: var(--color-error);
    border-color: var(--color-error);
  }

  .swim-card__outline-text-inner {
    font-size: var(--font-size-s);
    width: 100%;
    text-align: center;
    position: absolute;
    display: flex;
    align-items: center;
    bottom: -8px;
    pointer-events: auto;
    cursor: pointer;
  }

  .swim-card__outline-text-inner::before,
  .swim-card__outline-text-inner::after {
    content: '';
    height: ${li}px;
    background: var(--blue-400);
  }

  .swim-card__outline-text-inner::before {
    margin-right: var(--spacing-16);
    border-radius: var(--radius-0) var(--radius-0) var(--radius-0) var(--radius-2);
    flex: 1;
  }

  .swim-card__outline-text-inner::after {
    margin-left: var(--spacing-16);
    border-radius: var(--radius-0) var(--radius-0) var(--radius-2) var(--radius-0);
    width: var(--spacing-20);
  }

  .swim-card__outline-text--error .swim-card__outline-text-inner::before,
  .swim-card__outline-text--error .swim-card__outline-text-inner::after {
    background: var(--color-error);
  }

  /* Select checkbox (swim-checkbox round) – match ngx-ui */
  .swim-card__select {
    display: flex;
    align-items: center;
  }

  .swim-card__select swim-checkbox {
    --grey-600: var(--grey-750);
    margin: 0;
  }

  .swim-card__select swim-checkbox::part(box) {
    margin-right: 0;
  }
`, nn = v`
  :host([orientation='horizontal']) {
    position: relative;
    width: 100%;
    min-width: var(--swim-card-min-width, 500px);
    min-height: 80px;
    transition: all 0.2s ease-in-out;
    animation: 0.2s ease-in-out cardSlideIn;
  }

  :host([orientation='horizontal']) .swim-card__status {
    position: absolute;
    left: 10px;
    top: 10px;
  }

  :host([orientation='horizontal']) .swim-card__select {
    margin-left: ${Ms}px;
  }

  :host([orientation='horizontal']) .swim-card__accent {
    position: absolute;
    width: ${Lt}px;
    min-width: ${Lt}px;
    right: 0;
    height: 100%;
    border-radius: var(--radius-0) var(--radius-2) var(--radius-2) var(--radius-0);
  }

  :host([orientation='horizontal']) ::slotted(swim-card-header) {
    display: flex;
    align-items: center;
    padding: var(--spacing-0) ${Ms}px;
    flex-grow: 1;
    overflow: hidden;
    cursor: pointer;
  }

  :host([orientation='horizontal']) ::slotted(swim-card-header.no-click) {
    cursor: default;
  }

  :host([orientation='horizontal']) ::slotted(swim-card-section) {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: var(--spacing-0) ${sn}px;
  }

  :host([orientation='horizontal']) .swim-card__outline,
  :host([orientation='horizontal']) .swim-card__outline-text {
    top: -5px;
    right: -5px;
    left: -5px;
    bottom: -5px;
  }
`, an = v`
  :host([orientation='vertical']) {
    position: relative;
    flex-direction: column;
    min-width: 347px;
    max-width: 850px;
    height: 418px;
    color: var(--grey-350);
  }

  :host([orientation='vertical']) .swim-card__status {
    margin: ${on}px auto var(--spacing-0) auto;
  }

  :host([orientation='vertical']) .swim-card__accent {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: ${Lt}px;
    border-radius: var(--radius-0) var(--radius-0) var(--radius-6) var(--radius-6);
  }

  :host([orientation='vertical']) ::slotted(swim-card-header) {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    flex-shrink: 0;
    z-index: 1;
    overflow: visible;
  }

  :host([orientation='vertical']) ::slotted(swim-card-body) {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 1;
    padding: var(--spacing-20) var(--spacing-0);
    padding-left: ${zs}px;
    padding-right: ${zs}px;
  }

  :host([orientation='vertical']) ::slotted(swim-card-footer) {
    position: relative;
    width: 100%;
    flex-shrink: 0;
    height: 50px;
    padding: var(--spacing-20) var(--spacing-0);
    margin-top: 15px;
    margin-bottom: ${Lt}px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`, ln = [E, rn, nn, an];
var Je = /* @__PURE__ */ ((o) => (o.Success = "success", o.Error = "error", o.Disabled = "disabled", o))(Je || {}), Bo = /* @__PURE__ */ ((o) => (o.Horizontal = "horizontal", o.Vertical = "vertical", o))(Bo || {}), Ho = /* @__PURE__ */ ((o) => (o.Normal = "normal", o.Flat = "flat", o))(Ho || {});
const cn = v`
  :host {
    display: inline-flex;
  }

  :host([disabled]) {
    pointer-events: none;
  }

  :host([disabled]) .swim-checkbox__label {
    cursor: not-allowed;
  }

  :host([round]) .swim-checkbox__box {
    border-radius: 100%;
  }

  .swim-checkbox__label {
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-bottom: 0;
    outline: none;
  }

  .swim-checkbox__label:focus-visible {
    outline: none;
  }

  .swim-checkbox__label:focus-visible .swim-checkbox__box {
    outline: 2px solid var(--blue-200);
    outline-offset: 1px;
  }

  .swim-checkbox__box {
    position: relative;
    flex-shrink: 0;
    border-radius: var(--radius-2);
    background-color: transparent;
    border: 2px solid var(--grey-600);
    transition: transform 0.4s cubic-bezier(0.45, 1.8, 0.5, 0.75);
    user-select: none;
    margin: auto var(--spacing-10) auto 0;
    outline: 0 none transparent;
    outline-offset: 1px;
  }

  .swim-checkbox__box::after {
    position: absolute;
    top: calc(50% - 9px);
    left: calc(50% - 4px);
    width: 6px;
    height: 12px;
    content: '';
    border: solid var(--white);
    border-width: 0 2px 2px 0;
    transform: rotate(0deg) scale(0);
    transition: all 0.4s cubic-bezier(0.45, 1.8, 0.5, 0.75);
  }

  .swim-checkbox__box--indeterminate {
    background-color: var(--blue-400);
    border-radius: var(--radius-2);
    opacity: 1;
    border: 2px solid var(--blue-400);
    transform: rotate(0deg) scale(1);
  }

  .swim-checkbox__box--indeterminate::after {
    width: 12px;
    height: 2px;
    top: calc(50% - 1px);
    left: calc(50% - 6px);
    border: none;
    transform: rotate(0deg) scale(1);
    background-color: var(--white);
  }

  .swim-checkbox__box--checked {
    background-color: var(--blue-400);
    border-radius: var(--radius-2);
    opacity: 1;
    border: 2px solid var(--blue-400);
    transform: rotate(0deg) scale(1);
  }

  .swim-checkbox__box--checked::after {
    transform: rotate(45deg) scale(1);
    background-color: transparent;
  }

  .swim-checkbox__content {
    margin: auto 0;
    color: var(--grey-100);
    font-size: var(--font-size-m);
    line-height: var(--font-line-height-200);
  }
`;
var dn = Object.defineProperty, hn = Object.getOwnPropertyDescriptor, Se = (o, e, t, i) => {
  for (var s = i > 1 ? void 0 : i ? hn(e, t) : e, r = o.length - 1, n; r >= 0; r--)
    (n = o[r]) && (s = (i ? n(e, t, s) : n(s)) || s);
  return i && s && dn(e, t, s), s;
};
let un = 0;
const Ts = "swim-checkbox", Vt = class Vt extends y {
  constructor() {
    super(), this.id = `swim-checkbox-${++un}`, this.name = "", this.diameter = "18px", this._checked = !1, this._indeterminate = !1, this._tabindex = 0, this._disabled = !1, this._round = !1, this._internals = this.attachInternals();
  }
  get checked() {
    return this._checked;
  }
  set checked(e) {
    const t = p(e);
    this._checked !== t && (this._checked = t, this._syncFormValue(), this.dispatchEvent(new CustomEvent("checked-change", { detail: this._checked, bubbles: !1, composed: !1 })));
  }
  get indeterminate() {
    return this._indeterminate;
  }
  set indeterminate(e) {
    const t = p(e);
    this._indeterminate !== t && (this._indeterminate = t, this.dispatchEvent(
      new CustomEvent("indeterminate-change", {
        detail: this._indeterminate,
        bubbles: !1,
        composed: !1
      })
    ));
  }
  get tabindex() {
    return this._tabindex;
  }
  set tabindex(e) {
    this._tabindex = T(e, 0);
  }
  get disabled() {
    return this._disabled;
  }
  set disabled(e) {
    this._disabled = p(e);
  }
  get round() {
    return this._round;
  }
  set round(e) {
    this._round = p(e);
  }
  connectedCallback() {
    super.connectedCallback(), this._syncFormValue();
  }
  updated(e) {
    super.updated(e), (e.has("checked") || e.has("_checked")) && this._syncFormValue();
  }
  /** Delegate focus to the focusable checkbox for form validation and accessibility */
  focus(e) {
    var t;
    (t = this._roving) == null || t.focus(e);
  }
  _syncFormValue() {
    this._internals.setFormValue(this._checked ? "on" : "");
  }
  _onClick(e) {
    e.preventDefault(), !this.disabled && this._toggle();
  }
  _onKeydown(e) {
    e.key !== " " || this.disabled || (e.stopPropagation(), e.preventDefault(), this._toggle());
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
  render() {
    const e = `${this.id}-content`;
    return c`
      <div
        class="swim-checkbox__roving swim-checkbox__label"
        role="checkbox"
        tabindex="${this.disabled ? -1 : this.tabindex}"
        aria-checked="${this.indeterminate ? "mixed" : this.checked}"
        aria-disabled="${this.disabled ? "true" : "false"}"
        aria-labelledby="${e}"
        @click="${this._onClick}"
        @keydown="${this._onKeydown}"
        @focus="${this._onFocus}"
        @blur="${this._onBlur}"
      >
        <div
          part="box"
          class="swim-checkbox__box ${this.checked && !this.indeterminate ? "swim-checkbox__box--checked" : ""} ${this.indeterminate ? "swim-checkbox__box--indeterminate" : ""}"
          style="width: ${this.diameter}; height: ${this.diameter}; min-width: ${this.diameter}; min-height: ${this.diameter};"
        ></div>
        <div part="content" class="swim-checkbox__content" id="${e}">
          <slot></slot>
        </div>
      </div>
    `;
  }
};
Vt.styles = [E, cn], Vt.formAssociated = !0;
let ie = Vt;
Se([
  N(".swim-checkbox__roving")
], ie.prototype, "_roving", 2);
Se([
  a({ type: String })
], ie.prototype, "id", 2);
Se([
  a({ type: String })
], ie.prototype, "name", 2);
Se([
  a({ type: String })
], ie.prototype, "diameter", 2);
Se([
  a({ type: Boolean, reflect: !0, attribute: "checked", converter: g })
], ie.prototype, "checked", 1);
Se([
  a({ type: Boolean, reflect: !0, converter: g })
], ie.prototype, "indeterminate", 1);
Se([
  a({ type: Number })
], ie.prototype, "tabindex", 1);
Se([
  a({ type: Boolean, reflect: !0, converter: g })
], ie.prototype, "disabled", 1);
Se([
  a({ type: Boolean, reflect: !0, converter: g })
], ie.prototype, "round", 1);
customElements.get(Ts) || customElements.define(Ts, ie);
var pn = Object.defineProperty, mn = Object.getOwnPropertyDescriptor, _e = (o, e, t, i) => {
  for (var s = i > 1 ? void 0 : i ? mn(e, t) : e, r = o.length - 1, n; r >= 0; r--)
    (n = o[r]) && (s = (i ? n(e, t, s) : n(s)) || s);
  return i && s && pn(e, t, s), s;
};
const Os = "swim-card", Li = class Li extends y {
  constructor() {
    super(...arguments), this._disabled = !1, this.orientation = Bo.Horizontal, this.statusTooltip = "", this._selectable = !1, this._selected = !1, this._error = !1, this.outlineText = "", this.appearance = Ho.Normal, this._hideAccent = !1;
  }
  get disabled() {
    return this._disabled;
  }
  set disabled(e) {
    this._disabled = p(e);
  }
  get selectable() {
    return this._selectable;
  }
  set selectable(e) {
    this._selectable = p(e);
  }
  get selected() {
    return this._selected;
  }
  set selected(e) {
    this._selected = p(e);
  }
  get error() {
    return this._error;
  }
  set error(e) {
    this._error = p(e);
  }
  get hideAccent() {
    return this._hideAccent;
  }
  set hideAccent(e) {
    this._hideAccent = p(e);
  }
  _onOutlineClick(e) {
    e.stopPropagation(), this.dispatchEvent(new CustomEvent("outline-click", { bubbles: !1, composed: !1 }));
  }
  _onSelectChange(e) {
    var i, s;
    e.stopPropagation();
    const t = ((s = (i = e.detail) == null ? void 0 : i.target) == null ? void 0 : s.checked) ?? !1;
    this.selected = t, this.dispatchEvent(
      new CustomEvent("select", {
        detail: this.selected,
        bubbles: !1,
        composed: !1
      })
    );
  }
  _onCheckboxClick(e) {
    e.stopPropagation();
  }
  render() {
    const e = this.selected && !this.outlineText && !this.error, t = this.error && !this.outlineText, i = !!this.outlineText, s = !!this.status, r = this.status === Je.Success ? "swim-card__status--success" : this.status === Je.Error ? "swim-card__status--error" : "";
    return c`
      ${e ? c`<div class="swim-card__outline" aria-hidden="true"></div>` : u}
      ${t ? c`<div class="swim-card__outline swim-card__outline--error" aria-hidden="true"></div>` : u}
      ${i ? c`
            <div
              class="swim-card__outline-text ${this.error ? "swim-card__outline-text--error" : ""}"
              aria-hidden="true"
            >
              <div
                part="outline-text"
                class="swim-card__outline-text-inner"
                role="button"
                tabindex="${this.disabled ? -1 : 0}"
                aria-label="${this.outlineText}"
                @click="${this._onOutlineClick}"
                @keydown="${(n) => {
      (n.key === "Enter" || n.key === " ") && (n.preventDefault(), this._onOutlineClick(n));
    }}"
              >
                ${this.outlineText}
              </div>
            </div>
          ` : u}
      ${s ? c`
            <div
              class="swim-card__status ${r}"
              title="${this.statusTooltip}"
              role="status"
              aria-label="${this.statusTooltip || this.status || ""}"
            ></div>
          ` : u}
      ${this.selectable ? c`
            <div class="swim-card__select" @click="${this._onCheckboxClick}">
              <swim-checkbox
                round
                .checked="${this.selected}"
                ?disabled="${this.disabled}"
                aria-label="Select card"
                @change="${this._onSelectChange}"
              ></swim-checkbox>
            </div>
          ` : u}

      <slot></slot>

      ${this.hideAccent ? u : c`<div class="swim-card__accent" aria-hidden="true"></div>`}
    `;
  }
};
Li.styles = ln;
let Q = Li;
_e([
  a({ type: Boolean, reflect: !0, converter: g })
], Q.prototype, "disabled", 1);
_e([
  a({ type: String, reflect: !0 })
], Q.prototype, "orientation", 2);
_e([
  a({ type: String, reflect: !0 })
], Q.prototype, "status", 2);
_e([
  a({ type: String, attribute: "status-tooltip" })
], Q.prototype, "statusTooltip", 2);
_e([
  a({ type: Boolean, reflect: !0, converter: g })
], Q.prototype, "selectable", 1);
_e([
  a({ type: Boolean, reflect: !0, converter: g })
], Q.prototype, "selected", 1);
_e([
  a({ type: Boolean, reflect: !0, converter: g })
], Q.prototype, "error", 1);
_e([
  a({ type: String, attribute: "outline-text" })
], Q.prototype, "outlineText", 2);
_e([
  a({ type: String, reflect: !0 })
], Q.prototype, "appearance", 2);
_e([
  a({ type: Boolean, attribute: "hide-accent", converter: g })
], Q.prototype, "hideAccent", 1);
customElements.get(Os) || customElements.define(Os, Q);
var Ro = /* @__PURE__ */ ((o) => (o.Small = "small", o.Medium = "medium", o.Large = "large", o))(Ro || {});
const Ps = 25, bn = v`
  :host {
    display: flex;
    align-items: center;
    padding: var(--spacing-0) ${Ps}px;
    flex-grow: 1;
    overflow: hidden;
    cursor: pointer;
    box-sizing: border-box;
  }

  :host(.no-click) {
    cursor: default;
  }

  :host([orientation='vertical']) {
    flex-direction: column;
    flex-grow: 0;
    padding: var(--spacing-0);
    margin-bottom: 15px;
    width: 100%;
    box-sizing: border-box;
    overflow: visible;
    position: relative;
  }

  :host([orientation='vertical']) ::slotted(swim-card-avatar) {
    margin: 15px var(--spacing-0) var(--spacing-20) var(--spacing-0);
    flex-shrink: 0;
  }

  .swim-card-header__title-group {
    margin-left: ${Ps}px;
    display: flex;
    flex-direction: column;
    width: calc(100% - 79px);
  }

  :host([orientation='vertical']) .swim-card-header__title-group {
    margin-left: 0;
    width: 100%;
    padding: 0 var(--spacing-16);
    text-align: center;
  }

  :host([orientation='vertical']) ::slotted([slot='title']) {
    text-align: center;
  }

  :host([orientation='vertical']) ::slotted([slot='subtitle']) {
    text-align: center;
  }

  .swim-card-header__tag,
  .swim-card-header__title,
  .swim-card-header__subtitle {
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    color: var(--white);
  }

  ::slotted([slot='tag']) {
    font-weight: var(--font-weight-bold);
    font-size: var(--font-size-xxs);
    line-height: 12px;
  }

  ::slotted([slot='title']) {
    font-weight: var(--font-weight-semibold);
    font-size: var(--font-size-xl);
    color: var(--grey-050);
  }

  ::slotted([slot='subtitle']) {
    display: inline-block;
    font-weight: var(--font-weight-semibold);
    font-size: var(--font-size-s);
    color: var(--grey-300);
  }

  .swim-card-header__label {
    font-weight: var(--font-weight-semibold);
    font-size: var(--font-size-xs);
    color: var(--color-success);
    border-bottom: 0;
    margin-bottom: 0.5rem;
    white-space: nowrap;
    width: 100%;
    text-align: center;
    display: flex;
    align-items: center;
  }

  .swim-card-header__label::before,
  .swim-card-header__label::after {
    content: '';
    height: 2px;
    background: var(--grey-700);
    width: 100%;
  }

  .swim-card-header__label::before {
    margin-right: var(--spacing-20);
  }

  .swim-card-header__label::after {
    margin-left: var(--spacing-20);
  }
`, fn = [E, bn];
var gn = Object.defineProperty, Yo = (o, e, t, i) => {
  for (var s = void 0, r = o.length - 1, n; r >= 0; r--)
    (n = o[r]) && (s = n(e, t, s) || s);
  return s && gn(e, t, s), s;
};
const Is = "swim-card-header", Fi = class Fi extends y {
  constructor() {
    super(...arguments), this.label = "", this.orientation = "horizontal";
  }
  render() {
    return c`
      <slot name="avatar"></slot>
      <div class="swim-card-header__title-group">
        <slot></slot>
        ${this.label ? c`<div class="swim-card-header__label">${this.label}</div>` : u}
        <slot name="tag"></slot>
        <slot name="title"></slot>
        <slot name="subtitle"></slot>
      </div>
    `;
  }
};
Fi.styles = fn;
let yt = Fi;
Yo([
  a({ type: String })
], yt.prototype, "label");
Yo([
  a({ type: String, reflect: !0 })
], yt.prototype, "orientation");
customElements.get(Is) || customElements.define(Is, yt);
const wn = v`
  :host {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    width: 100%;
  }

  .swim-card-footer__label {
    font-weight: var(--font-weight-semibold);
    font-size: var(--font-size-xs);
    color: var(--blue-400);
    border-bottom: 0;
    white-space: nowrap;
    width: 100%;
    text-align: center;
    position: absolute;
    display: flex;
    align-items: center;
    top: -15px;
    left: 0;
  }

  .swim-card-footer__label::before,
  .swim-card-footer__label::after {
    content: '';
    height: 2px;
    background: var(--grey-700);
    width: 100%;
  }

  .swim-card-footer__label::before {
    margin-right: var(--spacing-20);
  }

  .swim-card-footer__label::after {
    margin-left: var(--spacing-20);
  }

  /* Center footer action (match ngx-ui); prevent slotted button from stretching */
  ::slotted(swim-button) {
    width: auto;
  }
`, _n = [E, wn];
var vn = Object.defineProperty, yn = (o, e, t, i) => {
  for (var s = void 0, r = o.length - 1, n; r >= 0; r--)
    (n = o[r]) && (s = n(e, t, s) || s);
  return s && vn(e, t, s), s;
};
const Ls = "swim-card-footer", Bi = class Bi extends y {
  constructor() {
    super(...arguments), this.label = "";
  }
  render() {
    return c`
      ${this.label ? c`<div class="swim-card-footer__label">${this.label}</div>` : u}
      <slot></slot>
    `;
  }
};
Bi.styles = _n;
let Ft = Bi;
yn([
  a({ type: String })
], Ft.prototype, "label");
customElements.get(Ls) || customElements.define(Ls, Ft);
const xn = 3, kn = v`
  :host {
    width: 54px;
    height: 54px;
    min-width: 54px;
    min-height: 54px;
    display: inline-block;
    box-sizing: border-box;
  }

  .swim-card-avatar__img:not(.swim-card-avatar__img--no-bg) {
    background-color: var(--white);
  }

  .swim-card-avatar__avatar {
    border: 2px solid var(--grey-100);
    border-radius: 100%;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    position: relative;
    display: flex;
    box-sizing: border-box;
  }

  /* Avatar circle border reflects status: success (green), error (red), disabled (grey) */
  .swim-card-avatar__avatar--success {
    border-color: var(--color-success);
  }

  .swim-card-avatar__avatar--error {
    border-color: var(--color-error);
  }

  .swim-card-avatar__avatar--disabled {
    border-color: var(--grey-500);
  }

  .swim-card-avatar__inner {
    display: flex;
    height: 100%;
    width: 100%;
    border: ${xn}px solid transparent;
    border-radius: 100%;
    overflow: hidden;
    position: relative;
  }

  .swim-card-avatar__img {
    width: 100%;
    height: 100%;
    border-radius: 100%;
    object-fit: cover;
  }

  .swim-card-avatar__img--no-bg {
    background-color: transparent;
  }

  .swim-card-avatar__content {
    margin: auto;
    font-size: var(--font-size-m);
    color: var(--grey-100);
    font-weight: var(--font-weight-bold);
  }
`, Cn = [E, kn];
var En = Object.defineProperty, ki = (o, e, t, i) => {
  for (var s = void 0, r = o.length - 1, n; r >= 0; r--)
    (n = o[r]) && (s = n(e, t, s) || s);
  return s && En(e, t, s), s;
};
const Fs = "swim-card-avatar", Hi = class Hi extends y {
  constructor() {
    super(...arguments), this.src = "", this.removeImageBackground = !1;
  }
  render() {
    const e = this.status === Je.Success ? "swim-card-avatar__avatar--success" : this.status === Je.Error ? "swim-card-avatar__avatar--error" : this.status === Je.Disabled ? "swim-card-avatar__avatar--disabled" : "";
    return c`
      <div
        class="swim-card-avatar__avatar ${e}"
        role="${this.status ? "status" : "presentation"}"
        aria-label="${this.status || ""}"
      >
        <div class="swim-card-avatar__inner">
          ${this.src ? c`
                <img
                  class="swim-card-avatar__img ${this.removeImageBackground ? "swim-card-avatar__img--no-bg" : ""}"
                  src="${this.src}"
                  alt=""
                  draggable="false"
                  loading="lazy"
                />
              ` : c`<span class="swim-card-avatar__content"><slot></slot></span>`}
        </div>
      </div>
    `;
  }
};
Hi.styles = Cn;
let st = Hi;
ki([
  a({ type: String })
], st.prototype, "src");
ki([
  a({ type: String, reflect: !0 })
], st.prototype, "status");
ki([
  a({ type: Boolean, attribute: "remove-image-background", converter: g })
], st.prototype, "removeImageBackground");
customElements.get(Fs) || customElements.define(Fs, st);
const An = v`
  :host {
    display: inline-block;
    background-color: var(--grey-750);
    border-radius: 11px;
    box-sizing: border-box;
    vertical-align: middle;
  }

  :host([size='small']) {
    height: 10px;
    width: 35%;
    min-width: 80px;
  }

  :host([size='medium']) {
    height: 12px;
    width: 30%;
    min-width: 100px;
  }

  :host([size='large']) {
    height: 16px;
    width: 50%;
    min-width: 150px;
  }
`, Sn = [E, An];
var Dn = Object.defineProperty, Mn = (o, e, t, i) => {
  for (var s = void 0, r = o.length - 1, n; r >= 0; r--)
    (n = o[r]) && (s = n(e, t, s) || s);
  return s && Dn(e, t, s), s;
};
const Bs = "swim-card-placeholder", Ri = class Ri extends y {
  constructor() {
    super(...arguments), this.size = Ro.Medium;
  }
  render() {
    return c``;
  }
};
Ri.styles = Sn;
let Bt = Ri;
Mn([
  a({ type: String, reflect: !0 })
], Bt.prototype, "size");
customElements.get(Bs) || customElements.define(Bs, Bt);
const zn = 27, Tn = v`
  :host {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    gap: var(--spacing-8);
    padding: var(--spacing-16) ${zn}px;
    box-sizing: border-box;
    overflow: auto;
    line-height: 1.5;
  }

  ::slotted(*) {
    width: 100%;
  }
`, On = [E, Tn], Hs = "swim-card-body", Yi = class Yi extends y {
  render() {
    return c`<slot></slot>`;
  }
};
Yi.styles = On;
let pi = Yi;
customElements.get(Hs) || customElements.define(Hs, pi);
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const de = (o) => o ?? u;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Te = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4 }, Ci = (o) => (...e) => ({ _$litDirective$: o, values: e });
let Ei = class {
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
const { I: Pn } = br, Rs = (o) => o, In = (o) => o.strings === void 0, Ys = () => document.createComment(""), ht = (o, e, t) => {
  var r;
  const i = o._$AA.parentNode, s = e === void 0 ? o._$AB : e._$AA;
  if (t === void 0) {
    const n = i.insertBefore(Ys(), s), l = i.insertBefore(Ys(), s);
    t = new Pn(n, l, o, o.options);
  } else {
    const n = t._$AB.nextSibling, l = t._$AM, d = l !== o;
    if (d) {
      let h;
      (r = t._$AQ) == null || r.call(t, o), t._$AM = o, t._$AP !== void 0 && (h = o._$AU) !== l._$AU && t._$AP(h);
    }
    if (n !== s || d) {
      let h = t._$AA;
      for (; h !== n; ) {
        const w = Rs(h).nextSibling;
        Rs(i).insertBefore(h, s), h = w;
      }
    }
  }
  return t;
}, He = (o, e, t = o) => (o._$AI(e, t), o), Ln = {}, jo = (o, e = Ln) => o._$AH = e, Fn = (o) => o._$AH, ci = (o) => {
  o._$AR(), o._$AA.remove();
};
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const js = Ci(class extends Ei {
  constructor(o) {
    if (super(o), o.type !== Te.PROPERTY && o.type !== Te.ATTRIBUTE && o.type !== Te.BOOLEAN_ATTRIBUTE) throw Error("The `live` directive is not allowed on child or event bindings");
    if (!In(o)) throw Error("`live` bindings can only contain a single expression");
  }
  render(o) {
    return o;
  }
  update(o, [e]) {
    if (e === te || e === u) return e;
    const t = o.element, i = o.name;
    if (o.type === Te.PROPERTY) {
      if (e === t[i]) return te;
    } else if (o.type === Te.BOOLEAN_ATTRIBUTE) {
      if (!!e === t.hasAttribute(i)) return te;
    } else if (o.type === Te.ATTRIBUTE && t.getAttribute(i) === e + "") return te;
    return jo(o), e;
  }
}), At = v`
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
`, Bn = v`
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
var ke = /* @__PURE__ */ ((o) => (o.text = "text", o.password = "password", o.email = "email", o.number = "number", o.tel = "tel", o.url = "url", o.textarea = "textarea", o))(ke || {}), Ai = /* @__PURE__ */ ((o) => (o.legacy = "legacy", o.fill = "fill", o))(Ai || {}), Si = /* @__PURE__ */ ((o) => (o.sm = "sm", o.md = "md", o.lg = "lg", o))(Si || {}), Hn = Object.defineProperty, Rn = Object.getOwnPropertyDescriptor, z = (o, e, t, i) => {
  for (var s = i > 1 ? void 0 : i ? Rn(e, t) : e, r = o.length - 1, n; r >= 0; r--)
    (n = o[r]) && (s = (i ? n(e, t, s) : n(s)) || s);
  return i && s && Hn(e, t, s), s;
};
const Vs = "swim-input", Nt = class Nt extends y {
  constructor() {
    super(), this.type = ke.text, this.label = "", this.placeholder = "", this.hint = "", this._value = "", this.name = "", this.id = `swim-input-${Math.random().toString(36).substr(2, 9)}`, this._disabled = !1, this._readonly = !1, this._required = !1, this._autofocus = !1, this.autocomplete = "off", this.appearance = Ai.legacy, this.size = Si.sm, this._withMargin = !0, this._withHint = !0, this._passwordToggleEnabled = !1, this.textareaRows = 3, this.requiredIndicator = "*", this._focused = !1, this._passwordVisible = !1, this._touched = !1, this._dirty = !1, this._invalid = !1, this._internals = this.attachInternals();
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
    this._disabled = p(e);
  }
  get readonly() {
    return this._readonly;
  }
  set readonly(e) {
    this._readonly = p(e);
  }
  get required() {
    return this._required;
  }
  set required(e) {
    this._required = p(e);
  }
  get autofocus() {
    return this._autofocus;
  }
  set autofocus(e) {
    this._autofocus = p(e);
  }
  get marginless() {
    return !this._withMargin;
  }
  set marginless(e) {
    this._withMargin = !p(e);
  }
  get withHint() {
    return this._withHint;
  }
  set withHint(e) {
    this._withHint = p(e);
  }
  get passwordToggleEnabled() {
    return this._passwordToggleEnabled;
  }
  set passwordToggleEnabled(e) {
    this._passwordToggleEnabled = p(e);
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
    const t = this.inputElement;
    if (t) {
      t.focus(e);
      return;
    }
    this.updateComplete.then(() => {
      var i;
      return (i = this.inputElement) == null ? void 0 : i.focus(e);
    });
  }
  /** Delegate blur to the internal input. */
  blur() {
    const e = this.inputElement;
    if (e) {
      e.blur();
      return;
    }
    this.updateComplete.then(() => {
      var t;
      return (t = this.inputElement) == null ? void 0 : t.blur();
    });
  }
  updated(e) {
    super.updated(e), e.has("value") && this._updateActiveState(), (e.has("required") || e.has("min") || e.has("max")) && this._validate();
  }
  render() {
    const e = this.type === ke.textarea, t = this.type === ke.password && this.passwordToggleEnabled && !this.disabled, i = this.type === ke.number && !this.disabled, s = this._passwordVisible ? ke.text : this.type;
    return c`
      <div class="input-wrap">
        <div class="input-flex-wrap">
          <slot name="prefix"></slot>
          <div class="input-flex-wrap-inner">
            <div class="input-box-wrap">
              ${e ? this._renderTextarea() : this._renderInput(s)}
              ${i ? c`
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
                  ` : u}
              ${t ? c`
                    <button
                      type="button"
                      class="password-toggle"
                      @click="${this._togglePassword}"
                      aria-label="Toggle password visibility"
                    >
                      <swim-icon font-icon="${this._passwordVisible ? "eye-disabled" : "eye"}"></swim-icon>
                    </button>
                  ` : u}
            </div>
            <label class="input-label" part="label" for="${this.id}">
              ${this.label} ${this.required ? c`<span>${this.requiredIndicator}</span>` : u}
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
    return c`
      <input
        part="input"
        class="input-box"
        type="${e}"
        id="${this.id}"
        name="${this.name}"
        .value="${js(this.value)}"
        placeholder="${this.placeholder}"
        ?disabled="${this.disabled}"
        ?readonly="${this.readonly}"
        ?required="${this.required}"
        min="${de(this.min)}"
        max="${de(this.max)}"
        minlength="${de(this.minlength)}"
        maxlength="${de(this.maxlength)}"
        tabindex="${de(this.tabindex)}"
        autocomplete="${this.autocomplete}"
        @input="${this._handleInput}"
        @change="${this._handleChange}"
        @focus="${this._handleFocus}"
        @blur="${this._handleBlur}"
      />
    `;
  }
  _renderTextarea() {
    return c`
      <textarea
        part="input"
        class="input-textarea swim-scroll"
        id="${this.id}"
        name="${this.name}"
        .value="${js(this.value)}"
        placeholder="${this.placeholder}"
        ?disabled="${this.disabled}"
        ?readonly="${this.readonly}"
        ?required="${this.required}"
        rows="${this.textareaRows}"
        minlength="${de(this.minlength)}"
        maxlength="${de(this.maxlength)}"
        tabindex="${de(this.tabindex)}"
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
    this.value = t.value, this._dirty || (this._dirty = !0, this.setAttribute("dirty", "")), this.dispatchEvent(new Event("input", { bubbles: !1, composed: !1 }));
  }
  _handleChange(e) {
    this._validate(), this.dispatchEvent(new Event("change", { bubbles: !1, composed: !1 }));
  }
  _handleFocus(e) {
    this._focused = !0, this.setAttribute("focused", ""), this.dispatchEvent(new FocusEvent("focus", { bubbles: !1, composed: !1 }));
  }
  _handleBlur(e) {
    this._focused = !1, this.removeAttribute("focused"), this._touched || (this._touched = !0, this.setAttribute("touched", "")), this._validate(), this.dispatchEvent(new FocusEvent("blur", { bubbles: !1, composed: !1 }));
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
    if (this.inputElement && this.type === ke.number) {
      const e = this.inputElement, t = parseFloat(e.value) || 0;
      if (this.max !== void 0 && t >= this.max) return;
      const i = t + 1;
      this.value = i.toString(), this.dispatchEvent(new Event("change", { bubbles: !1, composed: !1 }));
    }
  }
  _decrement() {
    if (this.inputElement && this.type === ke.number) {
      const e = this.inputElement, t = parseFloat(e.value) || 0;
      if (this.min !== void 0 && t <= this.min) return;
      const i = t - 1;
      this.value = i.toString(), this.dispatchEvent(new Event("change", { bubbles: !1, composed: !1 }));
    }
  }
  _validate() {
    let e = !0;
    if (this.required && !this.value && (e = !1), this.type === ke.number && this.value) {
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
Nt.styles = [E, At, Bn], Nt.formAssociated = !0;
let D = Nt;
z([
  N(".input-box, .input-textarea")
], D.prototype, "inputElement", 2);
z([
  a({ type: String })
], D.prototype, "type", 2);
z([
  a({ type: String })
], D.prototype, "label", 2);
z([
  a({ type: String })
], D.prototype, "placeholder", 2);
z([
  a({ type: String })
], D.prototype, "hint", 2);
z([
  a({ type: String })
], D.prototype, "value", 1);
z([
  a({ type: String })
], D.prototype, "name", 2);
z([
  a({ type: String })
], D.prototype, "id", 2);
z([
  a({ type: Boolean, reflect: !0, converter: g })
], D.prototype, "disabled", 1);
z([
  a({ type: Boolean, reflect: !0, converter: g })
], D.prototype, "readonly", 1);
z([
  a({ type: Boolean, reflect: !0, converter: g })
], D.prototype, "required", 1);
z([
  a({ type: Boolean, converter: g })
], D.prototype, "autofocus", 1);
z([
  a({ type: String })
], D.prototype, "autocomplete", 2);
z([
  a({ type: String, reflect: !0 })
], D.prototype, "appearance", 2);
z([
  a({ type: String, reflect: !0 })
], D.prototype, "size", 2);
z([
  a({ type: Boolean, reflect: !0, attribute: "marginless", converter: g })
], D.prototype, "marginless", 1);
z([
  a({ type: Boolean, converter: J })
], D.prototype, "withHint", 1);
z([
  a({ type: Boolean, attribute: "password-toggle-enabled", converter: g })
], D.prototype, "passwordToggleEnabled", 1);
z([
  a({ type: Number })
], D.prototype, "min", 2);
z([
  a({ type: Number })
], D.prototype, "max", 2);
z([
  a({ type: Number })
], D.prototype, "minlength", 2);
z([
  a({ type: Number })
], D.prototype, "maxlength", 2);
z([
  a({ type: Number, attribute: "textarea-rows" })
], D.prototype, "textareaRows", 2);
z([
  a({ type: String, attribute: "required-indicator" })
], D.prototype, "requiredIndicator", 2);
z([
  a({ type: Number })
], D.prototype, "tabindex", 2);
z([
  b()
], D.prototype, "_focused", 2);
z([
  b()
], D.prototype, "_passwordVisible", 2);
z([
  b()
], D.prototype, "_touched", 2);
z([
  b()
], D.prototype, "_dirty", 2);
z([
  b()
], D.prototype, "_invalid", 2);
customElements.get(Vs) || customElements.define(Vs, D);
const Yn = [
  E,
  At,
  v`
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
var pt = /* @__PURE__ */ ((o) => (o.Regular = "regular", o.Medium = "medium", o.Large = "large", o))(pt || {}), jn = Object.defineProperty, Vn = Object.getOwnPropertyDescriptor, q = (o, e, t, i) => {
  for (var s = i > 1 ? void 0 : i ? Vn(e, t) : e, r = o.length - 1, n; r >= 0; r--)
    (n = o[r]) && (s = (i ? n(e, t, s) : n(s)) || s);
  return i && s && jn(e, t, s), s;
};
const Ns = "swim-dialog", ji = class ji extends y {
  constructor() {
    super(...arguments), this.dialogTitle = "", this.content = "", this.class = "", this.cssClass = "", this.format = pt.Regular, this.showBackdrop = !0, this._closeButton = !0, this._closeOnBlur = !0, this._closeOnEscape = !0, this._visible = !1, this._zIndex = 991, this._contentId = `swim-dialog-content-${Math.random().toString(36).slice(2, 11)}`, this._titleId = `swim-dialog-title-${Math.random().toString(36).slice(2, 11)}`, this._previousActiveElement = null;
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
    this._closeButton = p(e);
  }
  get closeOnBlur() {
    return this._closeOnBlur;
  }
  set closeOnBlur(e) {
    this._closeOnBlur = p(e);
  }
  get closeOnEscape() {
    return this._closeOnEscape;
  }
  set closeOnEscape(e) {
    this._closeOnEscape = p(e);
  }
  get visible() {
    return this._visible;
  }
  set visible(e) {
    const t = p(e);
    this._visible !== t && (this._visible = t, t ? (this._previousActiveElement = typeof document < "u" ? document.activeElement : null, this.dispatchEvent(new CustomEvent("open", { bubbles: !1, composed: !1 }))) : (this._restoreFocus(), this.dispatchEvent(new CustomEvent("close", { detail: void 0, bubbles: !1, composed: !1 }))));
  }
  get zIndex() {
    return this._zIndex;
  }
  set zIndex(e) {
    this._zIndex = T(e, 991);
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
    if (!this.visible) return u;
    const e = this.format === pt.Regular || this.format === "regular", t = this.format === pt.Large || this.format === "large", i = this.format === pt.Medium || this.format === "medium", s = [
      "swim-dialog__content",
      this.cssClass,
      t ? "swim-dialog__content--large" : "",
      i ? "swim-dialog__content--medium" : ""
    ].filter(Boolean).join(" "), r = this.class.includes("swim-dialog--full-screen"), n = ["swim-dialog", "swim-dialog--open", this.class, r ? "swim-scroll" : ""].filter(Boolean).join(" ");
    return c`
      <div class="${n}" style="--swim-dialog-z: ${this.zIndex}" role="presentation">
        ${this.showBackdrop ? c`<div class="swim-dialog__backdrop" aria-hidden="true" @click="${this._onBackdropClick}"></div>` : u}
        <div
          part="content"
          class="${s}"
          style="z-index: ${this._contentzIndex}"
          tabindex="-1"
          role="dialog"
          aria-modal="true"
          aria-labelledby="${this.dialogTitle ? this._titleId : u}"
          id="${this._contentId}"
          @keydown="${this._onKeydown}"
        >
          ${e ? c`
                ${this.closeButton ? c`
                      <button
                        part="close-button"
                        type="button"
                        class="swim-dialog__close"
                        aria-label="Close dialog"
                        @click="${this.hide}"
                      >
                        <swim-icon font-icon="x"></swim-icon>
                      </button>
                    ` : u}
                ${this.dialogTitle ? c`
                      <div class="swim-dialog__header" part="header">
                        <h2 id="${this._titleId}" class="swim-dialog__title">${this.dialogTitle}</h2>
                      </div>
                    ` : u}
                <div class="swim-dialog__body swim-scroll">
                  <slot></slot>
                  ${this.content ? c`<div>${this.content}</div>` : u}
                </div>
              ` : c`
                <div class="swim-dialog__body swim-scroll">
                  <slot></slot>
                  ${this.content ? c`<div>${this.content}</div>` : u}
                </div>
              `}
        </div>
      </div>
    `;
  }
};
ji.styles = Yn;
let R = ji;
q([
  a({ type: String, attribute: "dialog-title" })
], R.prototype, "dialogTitle", 2);
q([
  a({ type: String })
], R.prototype, "title", 1);
q([
  a({ type: String })
], R.prototype, "content", 2);
q([
  a({ type: String })
], R.prototype, "class", 2);
q([
  a({ type: String, attribute: "css-class" })
], R.prototype, "cssClass", 2);
q([
  a({ type: String, reflect: !0 })
], R.prototype, "format", 2);
q([
  a({
    type: Boolean,
    attribute: "show-backdrop",
    reflect: !0,
    converter: {
      fromAttribute: (o) => o === null ? !0 : o !== "false" && o !== "0",
      toAttribute: (o) => o ? "" : "false"
    }
  })
], R.prototype, "showBackdrop", 2);
q([
  a({ type: Boolean, attribute: "close-button", converter: J })
], R.prototype, "closeButton", 1);
q([
  a({ type: Boolean, attribute: "close-on-blur", converter: J })
], R.prototype, "closeOnBlur", 1);
q([
  a({ type: Boolean, attribute: "close-on-escape", converter: J })
], R.prototype, "closeOnEscape", 1);
q([
  a({ type: Boolean, reflect: !0, converter: g })
], R.prototype, "visible", 1);
q([
  a({ type: Number })
], R.prototype, "zIndex", 1);
q([
  a({ attribute: !1 })
], R.prototype, "beforeClose", 2);
q([
  b()
], R.prototype, "_contentId", 2);
q([
  b()
], R.prototype, "_titleId", 2);
q([
  N(".swim-dialog__content")
], R.prototype, "_contentEl", 2);
customElements.get(Ns) || customElements.define(Ns, R);
const Nn = v`
  :host {
    position: relative;
    display: block;
    max-width: 100%;
  }

  :host([autosize]) {
    display: inline-block;
  }

  /* ------------------------------------------------------------------ */
  /* Container                                                          */
  /* ------------------------------------------------------------------ */

  .swim-date-time__container {
    position: relative;
  }

  /* Ensure the inner swim-input leaves space for the calendar button */
  .swim-date-time__container swim-input {
    --swim-input-padding-right: 28px;
  }

  /* Override swim-input display when host is autosize */
  :host([autosize]) .swim-date-time__container swim-input {
    display: inline-block;
  }

  /* ------------------------------------------------------------------ */
  /* Calendar / clock button                                            */
  /* ------------------------------------------------------------------ */

  .swim-date-time__calendar-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    padding: 0;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--grey-200);
    background: transparent;
    border: none;
    cursor: pointer;
    z-index: 2;
    font-size: var(--font-size-m);
    line-height: 1;
  }

  .swim-date-time__calendar-btn:hover {
    color: var(--grey-050);
  }

  .swim-date-time__calendar-btn:disabled {
    color: var(--grey-400);
    cursor: not-allowed;
    pointer-events: none;
  }

  .swim-date-time__calendar-btn:focus-visible {
    outline: 2px solid var(--blue-500);
    outline-offset: 2px;
    border-radius: var(--radius-2);
  }

  /* No-label adjustment (button at top instead of center) */
  :host(:not([has-label])) .swim-date-time__calendar-btn {
    top: 0.5rem;
    transform: translateY(0);
  }

  /* Fill appearance */
  :host([appearance='fill']) .swim-date-time__calendar-btn {
    right: 10px;
  }

  /* Autosize: tweak vertical alignment */
  :host([autosize]) .swim-date-time__calendar-btn {
    transform: translateY(-25%);
  }

  :host([autosize][appearance='fill']) .swim-date-time__calendar-btn {
    transform: translateY(-15%);
  }

  :host([autosize][marginless]) .swim-date-time__calendar-btn {
    transform: translateY(-35%);
  }

  :host([autosize]:not([has-label])) .swim-date-time__calendar-btn {
    transform: translateY(0);
  }

  /* ------------------------------------------------------------------ */
  /* Invalid / out-of-range state                                       */
  /* ------------------------------------------------------------------ */

  :host([date-invalid]) swim-input,
  :host([date-out-of-range]) swim-input {
    --swim-input-underline-color: var(--red-500);
    --swim-input-label-color: var(--red-500);
    --swim-input-hint-color: var(--red-500);
    --swim-input-caret-color: var(--red-500);
  }

  /* Force invalid styling on the inner input via attribute forwarding */
  :host([date-invalid]) swim-input,
  :host([date-out-of-range]) swim-input {
    color: inherit;
  }

  /* ------------------------------------------------------------------ */
  /* Dialog: override swim-dialog content padding                        */
  /* ------------------------------------------------------------------ */

  swim-dialog::part(content) {
    padding: 0 !important;
    width: auto;
    min-width: auto;
    background: transparent;
    box-shadow: none;
    border-radius: 0;
  }

  .swim-date-time__dialog {
    padding: 0;
    width: auto;
  }

  /* ------------------------------------------------------------------ */
  /* Selected header                                                     */
  /* ------------------------------------------------------------------ */

  .swim-date-time__dialog-header {
    border-top: 1px solid var(--grey-700);
    border-left: 1px solid var(--grey-700);
    border-right: 1px solid var(--grey-700);
    border-top-left-radius: var(--radius-6);
    border-top-right-radius: var(--radius-6);
    padding: 4px 20px;
    background: var(--grey-800);
    color: var(--grey-100);
    text-align: center;
  }

  .swim-date-time__dialog-header h1 {
    font-size: 1.2rem;
    white-space: nowrap;
    margin: 0.5rem 0;
    font-weight: normal;
  }

  .swim-date-time__dialog-header h1 small {
    color: var(--grey-100);
  }

  /* ------------------------------------------------------------------ */
  /* Calendar inside dialog                                              */
  /* ------------------------------------------------------------------ */

  .swim-date-time__dialog swim-calendar {
    box-shadow: none;
    border-radius: 0;
    border: none;
    border-left: 1px solid var(--grey-700);
    border-right: 1px solid var(--grey-700);
    border-bottom: 1px solid var(--grey-700);
    display: block;
    width: auto;
  }

  /* ------------------------------------------------------------------ */
  /* Time row                                                            */
  /* ------------------------------------------------------------------ */

  .swim-date-time__time-row {
    background: var(--grey-800);
    border-left: 1px solid var(--grey-700);
    border-right: 1px solid var(--grey-700);
    border-bottom: 1px solid var(--grey-700);
    padding: 8px 16px;
    margin-top: 0;
    height: 94px;
    flex-direction: row;
    box-sizing: border-box;
    display: flex;
    place-content: stretch center;
    align-items: baseline;
    justify-content: space-between;
  }

  .swim-date-time__time-row > * {
    flex: 0 0 calc(15% - 6px);
  }

  .swim-date-time__time-input {
    width: 42px;
    padding: 4px 2px;
    text-align: center;
    background: transparent;
    border: none;
    border-bottom: 1px solid var(--grey-400);
    color: var(--grey-050);
    font-size: var(--font-size-m);
    font-family: inherit;
    outline: none;
  }

  .swim-date-time__time-input:focus {
    border-bottom-color: var(--blue-400);
  }

  .swim-date-time__time-input:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .swim-date-time__time-input--ms {
    width: 55px;
  }

  .swim-date-time__time-hint {
    font-size: var(--font-size-xxs);
    color: var(--grey-400);
    text-align: center;
    margin-top: 2px;
  }

  .swim-date-time__time-field {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .swim-date-time__ampm-group {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .swim-date-time__ampm {
    background: none;
    border: none;
    color: var(--grey-500);
    cursor: pointer;
    padding: 2px 6px;
    font-size: var(--font-size-s);
    font-family: inherit;
    border-radius: var(--radius-2);
  }

  .swim-date-time__ampm:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .swim-date-time__ampm.selected {
    color: var(--white);
    background-color: rgba(var(--grey-350-rgb), 0.2);
  }

  /* ------------------------------------------------------------------ */
  /* Dialog footer (Current / Clear / Apply)                            */
  /* ------------------------------------------------------------------ */

  .swim-date-time__dialog-footer {
    background: var(--grey-800);
    border: 1px solid var(--grey-700);
    border-bottom-left-radius: var(--radius-6);
    border-bottom-right-radius: var(--radius-6);
    border-top: 0;
    padding: 0.5rem 0;
    flex-direction: row;
    box-sizing: border-box;
    display: flex;
    align-items: center;
  }

  .swim-date-time__dialog-footer > * {
    flex: 1 1 50%;
  }

  .swim-date-time__dialog-footer .text-left {
    text-align: left;
  }

  .swim-date-time__dialog-footer .text-right {
    text-align: right;
  }

  .swim-date-time__footer-btn {
    font-size: var(--font-size-m);
    color: var(--grey-400);
    margin: 0;
    padding: 0;
    background: none;
    border: none;
    cursor: pointer;
    font-family: inherit;
  }

  .swim-date-time__footer-btn:hover {
    color: var(--grey-200);
  }

  .swim-date-time__footer-btn--current {
    margin-left: 16px;
    opacity: 1;
    transition: opacity 200ms;
  }

  .swim-date-time__footer-btn--current[hidden] {
    display: inline-block !important;
    opacity: 0;
    pointer-events: none;
  }

  .swim-date-time__footer-btn--apply {
    margin-right: 16px;
    color: var(--blue-400);
  }

  .swim-date-time__footer-btn--apply:hover {
    color: var(--blue-300);
  }

  .swim-date-time__footer-btn--clear {
    margin-right: 16px;
  }
`;
var qn = Object.defineProperty, Un = Object.getOwnPropertyDescriptor, A = (o, e, t, i) => {
  for (var s = i > 1 ? void 0 : i ? Un(e, t) : e, r = o.length - 1, n; r >= 0; r--)
    (n = o[r]) && (s = (i ? n(e, t, s) : n(s)) || s);
  return i && s && qn(e, t, s), s;
};
let Gn = 0;
const qs = "swim-date-time", qt = class qt extends y {
  // ---------------------------------------------------------------------------
  // Lifecycle
  // ---------------------------------------------------------------------------
  constructor() {
    super(), this.id = `swim-date-time-${++Gn}`, this.name = "", this.label = "", this.hint = "", this.placeholder = "", this.size = "sm", this.appearance = "legacy", this._disabled = !1, this._required = !1, this.requiredIndicator = "*", this._autofocus = !1, this._autosize = !1, this._minWidth = 60, this._marginless = !1, this._value = null, this._displayValue = "", this._dateInvalid = !1, this._dateOutOfRange = !1, this._focused = !1, this._dialogOpen = !1, this._dialogModel = null, this._dialogHour = 12, this._dialogMinute = "00", this._dialogSecond = "00", this._dialogMillisecond = "000", this._dialogAmPm = "AM", this._modes = ["millisecond", "second", "minute", "hour", "date", "month", "year"], this._apply = () => {
      this._dialogModel && (this.value = this._dialogModel, this._update(), this.dispatchEvent(
        new CustomEvent("date-time-selected", { detail: this.value, bubbles: !1, composed: !1 })
      ), this.dispatchEvent(new CustomEvent("change", { detail: this.value, bubbles: !1, composed: !1 }))), this._close();
    }, this._clear = () => {
      this.value = void 0, this._update(), this.dispatchEvent(new CustomEvent("date-time-selected", { detail: void 0, bubbles: !1, composed: !1 })), this.dispatchEvent(new CustomEvent("change", { detail: void 0, bubbles: !1, composed: !1 })), this._close();
    }, this._selectCurrent = () => {
      this._setDialogDate(/* @__PURE__ */ new Date());
    }, this._close = () => {
      this._dialogOpen = !1, this._update();
    }, this._onCalendarChange = (e) => {
      e.stopPropagation();
      const t = e.detail;
      t && Y(t) && (this._dialogModel && this._showTime && t.setHours(
        this._dialogModel.getHours(),
        this._dialogModel.getMinutes(),
        this._dialogModel.getSeconds(),
        this._dialogModel.getMilliseconds()
      ), this._setDialogDate(t));
    }, this._onHourChange = (e) => {
      const t = +e.target.value % 12, i = this._dialogAmPm === "PM" ? 12 + t : t;
      if (this._dialogModel) {
        const s = new Date(this._dialogModel);
        s.setHours(i), this._setDialogDate(s);
      }
    }, this._onMinuteChange = (e) => {
      const t = +e.target.value;
      if (this._dialogModel) {
        const i = new Date(this._dialogModel);
        i.setMinutes(t), this._setDialogDate(i);
      }
    }, this._onSecondChange = (e) => {
      const t = +e.target.value;
      if (this._dialogModel) {
        const i = new Date(this._dialogModel);
        i.setSeconds(t), this._setDialogDate(i);
      }
    }, this._onMillisecondChange = (e) => {
      const t = +e.target.value;
      if (this._dialogModel) {
        const i = new Date(this._dialogModel);
        i.setMilliseconds(t), this._setDialogDate(i);
      }
    }, this._onDialogKeyDown = (e) => {
      e.code === "Escape" && (this._close(), e.stopPropagation(), e.preventDefault());
    }, this._internals = this.attachInternals();
  }
  get disabled() {
    return this._disabled;
  }
  set disabled(e) {
    const t = this._disabled;
    this._disabled = p(e), this.requestUpdate("disabled", t);
  }
  get required() {
    return this._required;
  }
  set required(e) {
    const t = this._required;
    this._required = p(e), this.requestUpdate("required", t);
  }
  get autofocus() {
    return this._autofocus;
  }
  set autofocus(e) {
    this._autofocus = p(e);
  }
  get autosize() {
    return this._autosize;
  }
  set autosize(e) {
    const t = this._autosize;
    this._autosize = p(e), this.requestUpdate("autosize", t);
  }
  get minWidth() {
    return this._minWidth;
  }
  set minWidth(e) {
    this._minWidth = T(e) ?? 60;
  }
  set inputType(e) {
    const t = this._inputType;
    this._inputType = e, this.requestUpdate("inputType", t);
  }
  get inputType() {
    return this._effectiveInputType;
  }
  set displayMode(e) {
    const t = this._displayMode;
    this._displayMode = e, this.requestUpdate("displayMode", t);
  }
  get displayMode() {
    return this._effectiveDisplayMode;
  }
  get marginless() {
    return this._marginless;
  }
  set marginless(e) {
    const t = this._marginless;
    this._marginless = p(e), this.requestUpdate("marginless", t);
  }
  get value() {
    return this._value;
  }
  set value(e) {
    const t = this._value;
    if (typeof e == "string" && (e = e.trim(), e || (e = null)), !e && !this._value) {
      this._value = null;
      return;
    }
    if (e === this._value) return;
    let i = e instanceof Date && Y(e);
    if (typeof e == "string") {
      const s = Ve(e);
      s && (e = s, i = !0);
    }
    if (i && e instanceof Date && this.precision && (e = ui(e, this.precision)), this._value = e, this._update(), this._internals) {
      const s = this._value instanceof Date ? this._value.toISOString() : String(this._value ?? "");
      this._internals.setFormValue(s);
    }
    this.requestUpdate("value", t);
  }
  // ---------------------------------------------------------------------------
  // Computed helpers
  // ---------------------------------------------------------------------------
  get _effectiveInputType() {
    return this._inputType ? this._inputType : this.precision === "hour" || this.precision === "minute" ? M.datetime : M.date;
  }
  get _effectiveDisplayMode() {
    return this._displayMode ? this._displayMode : this.timezone ? L.TIMEZONE : L.LOCAL;
  }
  get _effectiveFormat() {
    return this.format ? zt(this.format) : Fo(
      this._effectiveDisplayMode,
      this._effectiveInputType,
      this.precision
    );
  }
  get _iconName() {
    switch (this._effectiveInputType) {
      case M.time:
        return "clock";
      case M.datetime:
        return "calendar-clock";
      default:
        return "calendar";
    }
  }
  get _showCalendar() {
    return this._effectiveInputType === M.date || this._effectiveInputType === M.datetime;
  }
  get _showTime() {
    return this._effectiveInputType === M.time || this._effectiveInputType === M.datetime;
  }
  connectedCallback() {
    super.connectedCallback(), this._update();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
  }
  firstUpdated() {
    this.autofocus && this._swimInput && requestAnimationFrame(() => {
      var e, t;
      (t = (e = this._swimInput) == null ? void 0 : e.focus) == null || t.call(e);
    });
  }
  updated(e) {
    super.updated(e), this.label ? this.setAttribute("has-label", "") : this.removeAttribute("has-label"), this._dateInvalid ? this.setAttribute("date-invalid", "") : this.removeAttribute("date-invalid"), this._dateOutOfRange ? this.setAttribute("date-out-of-range", "") : this.removeAttribute("date-out-of-range"), this._focused ? this.setAttribute("focused", "") : this.removeAttribute("focused"), (e.has("format") || e.has("precision") || e.has("timezone") || e.has("displayMode") || e.has("inputType")) && this._update(), (e.has("required") || e.has("minDate") || e.has("maxDate")) && this._validate();
  }
  /** Delegate focus to the inner input. */
  focus(e) {
    var t, i;
    (i = (t = this._swimInput) == null ? void 0 : t.focus) == null || i.call(t, e);
  }
  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------
  render() {
    return c`
      <div class="swim-date-time__container">
        <swim-input
          part="input"
          .id="${this.id + "-input"}"
          .name="${this.name}"
          .label="${this.label}"
          .hint="${this.hint}"
          .placeholder="${this.placeholder}"
          .size="${this.size}"
          .appearance="${this.appearance}"
          .disabled="${this.disabled}"
          .required="${this.required}"
          .requiredIndicator="${String(this.requiredIndicator)}"
          .value="${this._displayValue}"
          ?marginless="${this.marginless}"
          tabindex="${de(this.tabindex)}"
          autocomplete="off"
          @input="${this._handleInput}"
          @focus="${this._handleFocus}"
          @blur="${this._handleBlur}"
          @keydown="${this._handleKeyDown}"
        ></swim-input>

        <button
          part="calendar-btn"
          class="swim-date-time__calendar-btn"
          type="button"
          ?disabled="${this.disabled}"
          @click="${this._openPicker}"
          title="Show date/time selector"
          aria-label="Open ${this._effectiveInputType} picker"
        >
          <swim-icon font-icon="${this._iconName}"></swim-icon>
        </button>
      </div>

      ${this._renderDialog()}
    `;
  }
  _renderDialog() {
    const e = this._getDialogHeaderText();
    return c`
      <swim-dialog
        css-class="ngx-date-time-dialog"
        .closeButton="${!1}"
        .visible="${this._dialogOpen}"
        @close="${this._close}"
      >
        <div class="swim-date-time__dialog" @keydown="${this._onDialogKeyDown}">
          <div class="swim-date-time__dialog-header">
            <h1>${e}</h1>
          </div>

          ${this._showCalendar ? c`
                <swim-calendar
                  .value="${this._dialogModel}"
                  .minDate="${this.minDate}"
                  .maxDate="${this.maxDate}"
                  .disabled="${this.disabled}"
                  min-view="${this._calendarMinView}"
                  @change="${this._onCalendarChange}"
                  @day-key-enter="${this._apply}"
                ></swim-calendar>
              ` : u}
          ${this._showTime ? this._renderTimeRow() : u}

          <nav role="navigation" class="swim-date-time__dialog-footer">
            <div class="text-left">
              <button
                type="button"
                class="swim-date-time__footer-btn swim-date-time__footer-btn--current"
                ?hidden="${this._isCurrent()}"
                @click="${this._selectCurrent}"
              >
                Current
              </button>
            </div>
            <div class="text-right">
              <button
                type="button"
                class="swim-date-time__footer-btn swim-date-time__footer-btn--clear"
                @click="${this._clear}"
              >
                Clear
              </button>
              <button
                type="button"
                class="swim-date-time__footer-btn swim-date-time__footer-btn--apply"
                @click="${this._apply}"
              >
                Apply
              </button>
            </div>
          </nav>
        </div>
      </swim-dialog>
    `;
  }
  _renderTimeRow() {
    const e = this._isTimeDisabled("hour"), t = this._isTimeDisabled("minute"), i = this._isTimeDisabled("second"), s = this._isTimeDisabled("millisecond");
    return c`
      <div class="swim-date-time__time-row">
        <div class="swim-date-time__time-field">
          <input
            type="number"
            class="swim-date-time__time-input"
            .value="${String(this._dialogHour)}"
            min="1"
            max="12"
            ?disabled="${e}"
            @change="${this._onHourChange}"
          />
          <div class="swim-date-time__time-hint">Hour</div>
        </div>
        <div class="swim-date-time__time-field">
          <input
            type="number"
            class="swim-date-time__time-input"
            .value="${this._dialogMinute}"
            min="0"
            max="59"
            ?disabled="${t}"
            @change="${this._onMinuteChange}"
          />
          <div class="swim-date-time__time-hint">Minute</div>
        </div>
        <div class="swim-date-time__time-field">
          <input
            type="number"
            class="swim-date-time__time-input"
            .value="${this._dialogSecond}"
            min="0"
            max="59"
            ?disabled="${i}"
            @change="${this._onSecondChange}"
          />
          <div class="swim-date-time__time-hint">Second</div>
        </div>
        <div class="swim-date-time__time-field">
          <input
            type="number"
            class="swim-date-time__time-input swim-date-time__time-input--ms"
            .value="${this._dialogMillisecond}"
            min="0"
            max="999"
            ?disabled="${s}"
            @change="${this._onMillisecondChange}"
          />
          <div class="swim-date-time__time-hint">Millisecond</div>
        </div>
        <div class="swim-date-time__ampm-group">
          <button
            type="button"
            class="swim-date-time__ampm ${this._dialogAmPm === "AM" ? "selected" : ""}"
            ?disabled="${e}"
            @click="${() => this._onAmPmChange("AM")}"
          >
            AM
          </button>
          <button
            type="button"
            class="swim-date-time__ampm ${this._dialogAmPm === "PM" ? "selected" : ""}"
            ?disabled="${e}"
            @click="${() => this._onAmPmChange("PM")}"
          >
            PM
          </button>
        </div>
      </div>
    `;
  }
  // ---------------------------------------------------------------------------
  // Dialog helpers
  // ---------------------------------------------------------------------------
  get _calendarMinView() {
    return this.precision === "month" ? "month" : this.precision === "year" ? "year" : "date";
  }
  _getDialogHeaderText() {
    if (!this._dialogModel)
      return "No value";
    const e = this._effectiveInputType, t = vt(this.timezone);
    if (e === M.time)
      return he(this._dialogModel, "h:mm a", t);
    if (e === M.datetime) {
      const i = he(this._dialogModel, "ddd, MMM D YYYY", t), s = he(this._dialogModel, "h:mm a", t);
      return c`${i} <small>${s}</small>`;
    }
    return he(this._dialogModel, "ddd, MMM D YYYY", t);
  }
  _setDialogDate(e) {
    this._dialogModel = new Date(e);
    const t = this._dialogModel.getHours();
    this._dialogHour = t % 12 || 12, this._dialogMinute = String(this._dialogModel.getMinutes()).padStart(2, "0"), this._dialogSecond = String(this._dialogModel.getSeconds()).padStart(2, "0"), this._dialogMillisecond = String(this._dialogModel.getMilliseconds()).padStart(3, "0"), this._dialogAmPm = t >= 12 ? "PM" : "AM";
  }
  _isTimeDisabled(e) {
    return this.precision ? this._modes.indexOf(this.precision) > this._modes.indexOf(e) : !1;
  }
  _isCurrent() {
    if (!this._dialogModel) return !1;
    const e = /* @__PURE__ */ new Date(), t = this._effectiveInputType;
    return t === M.time ? e.getHours() === this._dialogModel.getHours() && e.getMinutes() === this._dialogModel.getMinutes() && e.getSeconds() === this._dialogModel.getSeconds() && e.getMilliseconds() === this._dialogModel.getMilliseconds() : t === M.datetime ? e.getFullYear() === this._dialogModel.getFullYear() && e.getMonth() === this._dialogModel.getMonth() && e.getDate() === this._dialogModel.getDate() && e.getHours() === this._dialogModel.getHours() && e.getMinutes() === this._dialogModel.getMinutes() && e.getSeconds() === this._dialogModel.getSeconds() && e.getMilliseconds() === this._dialogModel.getMilliseconds() : e.getFullYear() === this._dialogModel.getFullYear() && e.getMonth() === this._dialogModel.getMonth() && e.getDate() === this._dialogModel.getDate();
  }
  // ---------------------------------------------------------------------------
  // Dialog actions
  // ---------------------------------------------------------------------------
  _openPicker() {
    if (this.disabled || this._dialogOpen) return;
    const e = this._value instanceof Date && Y(this._value) ? this._value : /* @__PURE__ */ new Date();
    this._setDialogDate(e), this._dialogOpen = !0;
  }
  _onAmPmChange(e) {
    if (!this._dialogModel) return;
    const t = new Date(this._dialogModel), i = t.getHours();
    e === "AM" && this._dialogAmPm === "PM" ? t.setHours(i - 12) : e === "PM" && this._dialogAmPm === "AM" && t.setHours(i + 12), this._setDialogDate(t);
  }
  // ---------------------------------------------------------------------------
  // Input event handlers
  // ---------------------------------------------------------------------------
  _handleInput(e) {
    e.stopPropagation();
    const i = e.target.value;
    this._displayValue = i;
    const s = Ve(i), r = this._value;
    if (s) {
      const n = this.precision ? ui(s, this.precision) : s;
      this._value = n, this._dateInvalid = !1;
    } else i ? (this._value = i, this._dateInvalid = !0) : (this._value = null, this._dateInvalid = !1);
    this._dateOutOfRange = !this._dateInvalid && this._value instanceof Date ? Ss(this._value, this.minDate, this.maxDate) : !1, this._updateFormValue(), this.dispatchEvent(new CustomEvent("input-change", { detail: this._value, bubbles: !1, composed: !1 })), this._value !== r && this.dispatchEvent(new CustomEvent("value-change", { detail: this._value, bubbles: !1, composed: !1 })), !this._dateInvalid && this._value !== r && this.dispatchEvent(new CustomEvent("change", { detail: this._value, bubbles: !1, composed: !1 }));
  }
  _handleFocus(e) {
    e.stopPropagation(), this._focused = !0, this.dispatchEvent(new FocusEvent("focus", { bubbles: !1, composed: !1 }));
  }
  _handleBlur(e) {
    e.stopPropagation(), this._focused = !1, this._update(), !this._dateInvalid && this._swimInput && this._swimInput.value !== this._displayValue && (this._swimInput.value = this._displayValue), this.dispatchEvent(new FocusEvent("blur", { bubbles: !1, composed: !1 }));
  }
  _handleKeyDown(e) {
    e.code === "ArrowDown" ? (e.preventDefault(), this._openPicker()) : e.code === "Escape" && (this._dialogOpen && this._close(), e.stopPropagation());
  }
  // ---------------------------------------------------------------------------
  // Internal helpers
  // ---------------------------------------------------------------------------
  _update() {
    const e = this._value, t = e instanceof Date && Y(e);
    if (this._dateInvalid = !!e && !t, this._displayValue = e ? String(e) : "", this._dateOutOfRange = !1, !t) return;
    const i = vt(this.timezone);
    this._displayValue = he(e, this._effectiveFormat, i), this._dateOutOfRange = Ss(e, this.minDate, this.maxDate);
  }
  _validate() {
    let e = {}, t = "";
    this._required && !this._value ? (e = { valueMissing: !0 }, t = "A value is required.") : this._dateInvalid ? (e = { typeMismatch: !0 }, t = "Invalid date.") : this._dateOutOfRange && (e = { rangeOverflow: !0 }, t = "Date is out of the allowed range."), t ? this._internals.setValidity(e, t) : this._internals.setValidity({});
  }
  _updateFormValue() {
    if (!this._internals) return;
    const e = this._value;
    e instanceof Date && Y(e) ? this._internals.setFormValue(e.toISOString()) : this._internals.setFormValue(String(e ?? "")), this._validate();
  }
  // ---------------------------------------------------------------------------
  // Form callbacks
  // ---------------------------------------------------------------------------
  formResetCallback() {
    this._value = null, this._displayValue = "", this._dateInvalid = !1, this._dateOutOfRange = !1, this._internals.setFormValue(""), this._internals.setValidity({}), this.requestUpdate();
  }
  formDisabledCallback(e) {
    this.disabled = e;
  }
};
qt.styles = [E, Nn], qt.formAssociated = !0;
let k = qt;
A([
  N("swim-input")
], k.prototype, "_swimInput", 2);
A([
  a({ type: String })
], k.prototype, "id", 2);
A([
  a({ type: String })
], k.prototype, "name", 2);
A([
  a({ type: String })
], k.prototype, "label", 2);
A([
  a({ type: String })
], k.prototype, "hint", 2);
A([
  a({ type: String })
], k.prototype, "placeholder", 2);
A([
  a({ type: String, reflect: !0 })
], k.prototype, "size", 2);
A([
  a({ type: String, reflect: !0 })
], k.prototype, "appearance", 2);
A([
  a({ type: Boolean, reflect: !0, converter: g })
], k.prototype, "disabled", 1);
A([
  a({ type: Boolean, reflect: !0, converter: g })
], k.prototype, "required", 1);
A([
  a({ type: String, attribute: "required-indicator" })
], k.prototype, "requiredIndicator", 2);
A([
  a({ type: Boolean, converter: g })
], k.prototype, "autofocus", 1);
A([
  a({ type: Boolean, reflect: !0, converter: g })
], k.prototype, "autosize", 1);
A([
  a({ type: Number, attribute: "min-width" })
], k.prototype, "minWidth", 1);
A([
  a({ type: Number })
], k.prototype, "tabindex", 2);
A([
  a({ type: String, attribute: "input-type" })
], k.prototype, "inputType", 1);
A([
  a({ type: String })
], k.prototype, "precision", 2);
A([
  a({ type: String })
], k.prototype, "timezone", 2);
A([
  a({ type: String, attribute: "display-mode" })
], k.prototype, "displayMode", 1);
A([
  a({ type: String })
], k.prototype, "format", 2);
A([
  a({ type: Boolean, reflect: !0, converter: g })
], k.prototype, "marginless", 1);
A([
  a({ attribute: "min-date" })
], k.prototype, "minDate", 2);
A([
  a({ attribute: "max-date" })
], k.prototype, "maxDate", 2);
A([
  a({ attribute: !1 })
], k.prototype, "value", 1);
A([
  b()
], k.prototype, "_displayValue", 2);
A([
  b()
], k.prototype, "_dateInvalid", 2);
A([
  b()
], k.prototype, "_dateOutOfRange", 2);
A([
  b()
], k.prototype, "_focused", 2);
A([
  b()
], k.prototype, "_dialogOpen", 2);
A([
  b()
], k.prototype, "_dialogModel", 2);
A([
  b()
], k.prototype, "_dialogHour", 2);
A([
  b()
], k.prototype, "_dialogMinute", 2);
A([
  b()
], k.prototype, "_dialogSecond", 2);
A([
  b()
], k.prototype, "_dialogMillisecond", 2);
A([
  b()
], k.prototype, "_dialogAmPm", 2);
customElements.get(qs) || customElements.define(qs, k);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Us = (o, e, t) => {
  const i = /* @__PURE__ */ new Map();
  for (let s = e; s <= t; s++) i.set(o[s], s);
  return i;
}, Vo = Ci(class extends Ei {
  constructor(o) {
    if (super(o), o.type !== Te.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(o, e, t) {
    let i;
    t === void 0 ? t = e : e !== void 0 && (i = e);
    const s = [], r = [];
    let n = 0;
    for (const l of o) s[n] = i ? i(l, n) : n, r[n] = t(l, n), n++;
    return { values: r, keys: s };
  }
  render(o, e, t) {
    return this.dt(o, e, t).values;
  }
  update(o, [e, t, i]) {
    const s = Fn(o), { values: r, keys: n } = this.dt(e, t, i);
    if (!Array.isArray(s)) return this.ut = n, r;
    const l = this.ut ?? (this.ut = []), d = [];
    let h, w, m = 0, f = s.length - 1, _ = 0, P = r.length - 1;
    for (; m <= f && _ <= P; ) if (s[m] === null) m++;
    else if (s[f] === null) f--;
    else if (l[m] === n[_]) d[_] = He(s[m], r[_]), m++, _++;
    else if (l[f] === n[P]) d[P] = He(s[f], r[P]), f--, P--;
    else if (l[m] === n[P]) d[P] = He(s[m], r[P]), ht(o, d[P + 1], s[m]), m++, P--;
    else if (l[f] === n[_]) d[_] = He(s[f], r[_]), ht(o, s[m], s[f]), f--, _++;
    else if (h === void 0 && (h = Us(n, _, P), w = Us(l, m, f)), h.has(l[m])) if (h.has(l[f])) {
      const ne = w.get(n[_]), lt = ne !== void 0 ? s[ne] : null;
      if (lt === null) {
        const ct = ht(o, s[m]);
        He(ct, r[_]), d[_] = ct;
      } else d[_] = He(lt, r[_]), ht(o, s[m], lt), s[ne] = null;
      _++;
    } else ci(s[f]), f--;
    else ci(s[m]), m++;
    for (; _ <= P; ) {
      const ne = ht(o, d[P + 1]);
      He(ne, r[_]), d[_++] = ne;
    }
    for (; m <= f; ) {
      const ne = s[m++];
      ne !== null && ci(ne);
    }
    return this.ut = n, jo(o, d), te;
  }
}), $n = v`
  :host {
    display: inline;
    vertical-align: baseline;
  }

  .swim-date-display__root {
    display: inline;
  }

  .swim-date-display__time {
    display: inline;
    margin: 0;
    padding: 0;
    font: inherit;
    color: inherit;
    border: none;
    background: transparent;
    text-align: inherit;
  }

  :host([invalid]) .swim-date-display__time {
    color: var(--red-500);
  }

  .swim-date-display__time--popup {
    text-decoration-line: underline;
    text-decoration-style: dashed;
    text-decoration-thickness: from-font;
    cursor: copy;
    color: inherit;
  }

  .swim-date-display__time--clickable {
    cursor: pointer;
  }

  .swim-date-display__time--clickable:active {
    transform: translate(1px, 1px);
    color: var(--grey-600);
  }

  .swim-date-display__time--clickable:focus-visible {
    outline: 2px solid var(--blue-500);
    outline-offset: 2px;
    border-radius: var(--radius-2);
  }

  swim-tooltip {
    display: inline;
  }

  /* Tooltip panel content (swim-tooltip exposes part="content") */
  swim-tooltip::part(content) {
    padding: var(--spacing-2);
  }

  .swim-date-display__zone-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--spacing-2);
    font-weight: var(--font-weight-bold);
    font-size: var(--font-size-m);
    color: var(--grey-800);
    margin-bottom: var(--spacing-2);
  }

  .swim-date-display__zone-row:last-child {
    margin-bottom: 0;
  }

  .swim-date-display__zone-label {
    flex: 1 1 auto;
    min-width: 0;
  }

  .swim-date-display__copy-btn {
    flex: 0 0 auto;
    text-transform: uppercase;
    font-size: var(--font-size-xs);
    line-height: 1.25;
    min-width: 4.5rem;
    width: 30px;
    --swim-button-background: var(--grey-200);
    --swim-button-hover-background: var(--white);
    --swim-button-border-color: var(--grey-400);
    --swim-button-hover-border-color: var(--grey-350);
    --swim-button-color: var(--grey-700);
    --swim-button-hover-color: var(--grey-800);
    --swim-button-outline-color: var(--blue-500);
    --swim-button-hover-outline-color: var(--blue-500);
    --swim-button-shadow: none;
  }
`;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class mi extends Ei {
  constructor(e) {
    if (super(e), this.it = u, e.type !== Te.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(e) {
    if (e === u || e == null) return this._t = void 0, this.it = e;
    if (e === te) return e;
    if (typeof e != "string") throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (e === this.it) return this._t;
    this.it = e;
    const t = [e];
    return t.raw = t, this._t = { _$litType$: this.constructor.resultType, strings: t, values: [] };
  }
}
mi.directiveName = "unsafeHTML", mi.resultType = 1;
const Wn = Ci(mi), Qn = v`
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
`, Zn = [E, Qn];
var B = /* @__PURE__ */ ((o) => (o.top = "top", o.bottom = "bottom", o.left = "left", o.right = "right", o))(B || {}), me = /* @__PURE__ */ ((o) => (o.top = "top", o.bottom = "bottom", o.left = "left", o.right = "right", o.center = "center", o))(me || {}), Di = /* @__PURE__ */ ((o) => (o.popover = "popover", o.tooltip = "tooltip", o))(Di || {}), Ce = /* @__PURE__ */ ((o) => (o.all = "all", o.focus = "focus", o.click = "click", o.mouseover = "mouseover", o))(Ce || {});
const be = 7;
function Ht(o, e, t) {
  return t === me.left ? (o.left ?? 0) - be : t === me.right ? (o.left ?? 0) + (o.width ?? 0) - (e.width ?? 0) + be : (o.left ?? 0) + (o.width ?? 0) / 2 - (e.width ?? 0) / 2;
}
function Mi(o, e, t) {
  return t === me.top ? (o.top ?? 0) - be : t === me.bottom ? (o.top ?? 0) + (o.height ?? 0) - (e.height ?? 0) + be : (o.top ?? 0) + (o.height ?? 0) / 2 - (e.height ?? 0) / 2;
}
function Gs(o, e, t) {
  let i = Ht(o, e, t);
  return i + (e.width ?? 0) > window.innerWidth && (i = window.innerWidth - (e.width ?? 0)), i;
}
function $s(o, e, t) {
  let i = Mi(o, e, t);
  return i + (e.height ?? 0) > window.innerHeight && (i = window.innerHeight - (e.height ?? 0)), i;
}
function Xn(o, e, t, i, s) {
  return t === B.right ? Ht(o, e, i) + (e.width ?? 0) + s > window.innerWidth : t === B.left ? Ht(o, e, i) - s < 0 : t === B.top ? (o.top ?? 0) - (e.height ?? 0) - s < 0 : t === B.bottom ? Mi(o, e, i) + (e.height ?? 0) + s > window.innerHeight : !1;
}
function Kn(o, e, t, i, s) {
  return Xn(t, e, o, s, i) ? o === B.right ? B.left : o === B.left ? B.right : o === B.top ? B.bottom : B.top : o;
}
function Jn(o, e, t, i, s) {
  let r = 0, n = 0;
  return o === B.right ? (n = (t.left ?? 0) + (t.width ?? 0) + i, r = $s(t, e, s)) : o === B.left ? (n = (t.left ?? 0) - (e.width ?? 0) - i, r = $s(t, e, s)) : o === B.top ? (r = (t.top ?? 0) - (e.height ?? 0) - i, n = Gs(t, e, s)) : (r = (t.top ?? 0) + (t.height ?? 0) + i, n = Gs(t, e, s)), { top: r, left: n };
}
function Ws(o, e, t, i) {
  let s;
  i === me.left ? s = (o.width ?? 0) / 2 - (t.width ?? 0) / 2 + be : i === me.right ? s = (e.width ?? 0) - (o.width ?? 0) / 2 - (t.width ?? 0) / 2 - be : s = (e.width ?? 0) / 2 - (t.width ?? 0) / 2;
  const r = Ht(o, e, i);
  return r + (e.width ?? 0) > window.innerWidth && (s += r + (e.width ?? 0) - window.innerWidth), s;
}
function Qs(o, e, t, i) {
  let s;
  i === me.top ? s = (o.height ?? 0) / 2 - (t.height ?? 0) / 2 + be : i === me.bottom ? s = (e.height ?? 0) - (o.height ?? 0) / 2 - (t.height ?? 0) / 2 - be : s = (e.height ?? 0) / 2 - (t.height ?? 0) / 2;
  const r = Mi(o, e, i);
  return r + (e.height ?? 0) > window.innerHeight && (s += r + (e.height ?? 0) - window.innerHeight), s;
}
function ea(o, e, t, i, s) {
  let r = 0, n = 0;
  return o === B.right ? (n = -be, r = Qs(t, e, i, s)) : o === B.left ? (n = e.width ?? 0, r = Qs(t, e, i, s)) : o === B.top ? (r = e.height ?? 0, n = Ws(t, e, i, s)) : (r = -be, n = Ws(t, e, i, s)), { top: r, left: n };
}
var ta = Object.defineProperty, ia = Object.getOwnPropertyDescriptor, H = (o, e, t, i) => {
  for (var s = i > 1 ? void 0 : i ? ia(e, t) : e, r = o.length - 1, n; r >= 0; r--)
    (n = o[r]) && (s = (i ? n(e, t, s) : n(s)) || s);
  return i && s && ta(e, t, s), s;
};
const Zs = "swim-tooltip", Vi = class Vi extends y {
  constructor() {
    super(...arguments), this.content = "", this.placement = B.top, this.alignment = me.center, this.type = Di.popover, this.showEvent = Ce.all, this._spacing = 10, this._showCaret = !0, this._disabled = !1, this._closeOnClickOutside = !0, this._closeOnMouseLeave = !0, this._hideTimeout = 300, this._showTimeout = 100, this.cssClass = "", this._open = !1, this._panelTop = 0, this._panelLeft = 0, this._effectivePlacement = B.top, this._caretTop = 0, this._caretLeft = 0, this._animate = !1, this._triggerRef = null, this._panelRef = null, this._caretRef = null, this._boundDocumentClick = null, this._openFromClick = !1, this._tooltipId = `swim-tooltip-${Math.random().toString(36).slice(2, 11)}`, this._throttledPosition = () => {
      this._throttleTimeout == null && (this._throttleTimeout = window.setTimeout(() => {
        this._throttleTimeout = void 0, this._open && this._position();
      }, 100));
    }, this._panelForHideListeners = null, this._panelMouseEnterBound = () => this._clearHideTimer(), this._panelMouseLeaveBound = (e) => {
      var i;
      const t = e.relatedTarget;
      t && ((i = this._triggerRef) != null && i.contains(t)) || this.hide();
    }, this._onTriggerFocus = () => {
      this._listensFocus && this.show();
    }, this._onTriggerBlur = () => {
      this._listensFocus && this.hide(!0);
    }, this._onTriggerMouseEnter = () => {
      this._listensHover && this.show();
    }, this._onTriggerMouseLeave = (e) => {
      var s;
      const t = e.relatedTarget, i = this._panelRef ?? ((s = this.shadowRoot) == null ? void 0 : s.querySelector(".swim-tooltip__panel"));
      i != null && i.contains(t) || (this._listensHover && this.closeOnMouseLeave && this.hide(), this._listensClick && this.hide());
    }, this._onPanelMouseLeave = () => {
      this.closeOnMouseLeave && this.hide();
    }, this._onTriggerClick = () => {
      if (this.showEvent === Ce.mouseover) {
        this.hide(!0);
        return;
      }
      this._listensClick && (this._openFromClick ? this.hide(!0) : (this._openFromClick = !0, this.show(!0)));
    };
  }
  get spacing() {
    return this._spacing;
  }
  set spacing(e) {
    this._spacing = T(e, 10);
  }
  get showCaret() {
    return this._showCaret;
  }
  set showCaret(e) {
    this._showCaret = p(e);
  }
  get disabled() {
    return this._disabled;
  }
  set disabled(e) {
    this._disabled = p(e);
  }
  get closeOnClickOutside() {
    return this._closeOnClickOutside;
  }
  set closeOnClickOutside(e) {
    this._closeOnClickOutside = p(e);
  }
  get closeOnMouseLeave() {
    return this._closeOnMouseLeave;
  }
  set closeOnMouseLeave(e) {
    this._closeOnMouseLeave = p(e);
  }
  get hideTimeout() {
    return this._hideTimeout;
  }
  set hideTimeout(e) {
    this._hideTimeout = T(e, 300);
  }
  get showTimeout() {
    return this._showTimeout;
  }
  set showTimeout(e) {
    this._showTimeout = T(e, 100);
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
    return this.showEvent === Ce.all || this.showEvent === Ce.focus;
  }
  get _listensHover() {
    return this.showEvent === Ce.all || this.showEvent === Ce.mouseover;
  }
  get _listensClick() {
    return this.showEvent === Ce.all || this.showEvent === Ce.click;
  }
  /** Opens the tooltip (optionally immediately, without show timeout). */
  show(e = !1) {
    if (this._open || this.disabled) return;
    this._clearShowTimer(), this._clearHideTimer();
    const t = () => {
      this._open || this.disabled || !(this._hasContentSlot || this.content != null && this.content !== "") || (this._open = !0, this._effectivePlacement = this.placement, requestAnimationFrame(() => {
        this._position(), requestAnimationFrame(() => {
          this._animate = !0, this._addHideListeners();
        });
      }), this.dispatchEvent(new CustomEvent("show", { detail: !0, bubbles: !1, composed: !1 })));
    };
    e ? t() : this._showTimer = window.setTimeout(t, this.showTimeout);
  }
  /** Hides the tooltip (optionally immediately). */
  hide(e = !1) {
    if (!this._open) return;
    this._clearShowTimer(), this._clearHideTimer();
    const t = () => {
      this._open && (this._open = !1, this._animate = !1, this._openFromClick = !1, this._removeDocumentClick(), this._removePanelHideListeners(), this.dispatchEvent(new CustomEvent("hide", { detail: !0, bubbles: !1, composed: !1 })));
    };
    e ? t() : this._hideTimer = window.setTimeout(t, this.hideTimeout);
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
    var d, h, w;
    const e = this._triggerRef ?? ((d = this.shadowRoot) == null ? void 0 : d.querySelector(".swim-tooltip__trigger")), t = this._panelRef ?? ((h = this.shadowRoot) == null ? void 0 : h.querySelector(".swim-tooltip__panel")), i = this._caretRef ?? ((w = this.shadowRoot) == null ? void 0 : w.querySelector(".swim-tooltip__caret"));
    if (!e || !t) return;
    const s = e.getBoundingClientRect();
    if (!s.height && !s.width) return;
    const r = t.getBoundingClientRect();
    this._effectivePlacement = Kn(this.placement, r, s, this.spacing, this.alignment);
    const { top: n, left: l } = Jn(this._effectivePlacement, r, s, this.spacing, this.alignment);
    if (this._panelTop = n, this._panelLeft = l, this.showCaret && i) {
      const m = i.getBoundingClientRect(), f = ea(this._effectivePlacement, r, s, m, this.alignment);
      this._caretTop = f.top, this._caretLeft = f.left;
    }
  }
  _removePanelHideListeners() {
    this._panelForHideListeners && (this._panelForHideListeners.removeEventListener("mouseenter", this._panelMouseEnterBound), this._panelForHideListeners.removeEventListener("mouseleave", this._panelMouseLeaveBound), this._panelForHideListeners = null);
  }
  _addHideListeners() {
    var t;
    const e = this._panelRef ?? ((t = this.shadowRoot) == null ? void 0 : t.querySelector(".swim-tooltip__panel"));
    e && (this._removePanelHideListeners(), this._panelForHideListeners = e, e.addEventListener("mouseenter", this._panelMouseEnterBound), this.closeOnMouseLeave && e.addEventListener("mouseleave", this._panelMouseLeaveBound), this.closeOnClickOutside && (this._boundDocumentClick = (i) => {
      var r;
      const s = i.target;
      e.contains(s) || (r = this._triggerRef) != null && r.contains(s) || this.hide(!0);
    }, setTimeout(() => document.addEventListener("click", this._boundDocumentClick, !0), 0)));
  }
  firstUpdated() {
    var e, t, i;
    this._triggerRef = (e = this.shadowRoot) == null ? void 0 : e.querySelector(".swim-tooltip__trigger"), this._panelRef = (t = this.shadowRoot) == null ? void 0 : t.querySelector(".swim-tooltip__panel"), this._caretRef = (i = this.shadowRoot) == null ? void 0 : i.querySelector(".swim-tooltip__caret");
  }
  updated(e) {
    this._open && (e.has("placement") || e.has("alignment") || e.has("spacing")) && this._position();
  }
  render() {
    const e = this._hasContentSlot(), t = e || this.content != null && this.content !== "", i = [
      "swim-tooltip__panel",
      `swim-tooltip__panel--type-${this.type}`,
      `swim-tooltip__panel--position-${this._effectivePlacement}`,
      this._animate ? "swim-tooltip__panel--animate" : "",
      this.cssClass.includes("narrow") ? "swim-tooltip__panel--narrow" : ""
    ].filter(Boolean).join(" ");
    return c`
      <div
        part="trigger"
        class="swim-tooltip__trigger"
        aria-describedby="${this._open && t ? this._tooltipId : u}"
        aria-expanded="${this._listensClick ? this._open ? "true" : "false" : u}"
        @focusin="${this._onTriggerFocus}"
        @focusout="${this._onTriggerBlur}"
        @mouseenter="${this._onTriggerMouseEnter}"
        @mouseleave="${this._onTriggerMouseLeave}"
        @click="${this._onTriggerClick}"
      >
        <slot></slot>
      </div>

      ${this._open && t ? c`
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
              ${this.showCaret ? c`
                    <span
                      part="caret"
                      class="swim-tooltip__caret swim-tooltip__caret--position-${this._effectivePlacement}"
                      style="top: ${this._caretTop}px; left: ${this._caretLeft}px;"
                    ></span>
                  ` : ""}
              <div part="content" class="swim-tooltip__content">
                ${e ? c`<slot name="content"></slot>` : c`${Wn(this.content)}`}
              </div>
            </div>
          ` : ""}
    `;
  }
};
Vi.styles = Zn;
let I = Vi;
H([
  a({ type: String })
], I.prototype, "content", 2);
H([
  a({ type: String, reflect: !0, attribute: "placement" })
], I.prototype, "placement", 2);
H([
  a({ type: String, reflect: !0, attribute: "alignment" })
], I.prototype, "alignment", 2);
H([
  a({ type: String, reflect: !0, attribute: "type" })
], I.prototype, "type", 2);
H([
  a({ type: String, attribute: "show-event" })
], I.prototype, "showEvent", 2);
H([
  a({ type: Number, attribute: "spacing" })
], I.prototype, "spacing", 1);
H([
  a({
    type: Boolean,
    attribute: "show-caret",
    converter: J
  })
], I.prototype, "showCaret", 1);
H([
  a({ type: Boolean, reflect: !0, converter: g })
], I.prototype, "disabled", 1);
H([
  a({ type: Boolean, attribute: "close-on-click-outside", converter: J })
], I.prototype, "closeOnClickOutside", 1);
H([
  a({ type: Boolean, attribute: "close-on-mouse-leave", converter: J })
], I.prototype, "closeOnMouseLeave", 1);
H([
  a({ type: Number, attribute: "hide-timeout" })
], I.prototype, "hideTimeout", 1);
H([
  a({ type: Number, attribute: "show-timeout" })
], I.prototype, "showTimeout", 1);
H([
  a({ type: String, attribute: "css-class" })
], I.prototype, "cssClass", 2);
H([
  b()
], I.prototype, "_open", 2);
H([
  b()
], I.prototype, "_panelTop", 2);
H([
  b()
], I.prototype, "_panelLeft", 2);
H([
  b()
], I.prototype, "_effectivePlacement", 2);
H([
  b()
], I.prototype, "_caretTop", 2);
H([
  b()
], I.prototype, "_caretLeft", 2);
H([
  b()
], I.prototype, "_animate", 2);
customElements.get(Zs) || customElements.define(Zs, I);
var sa = Object.defineProperty, oa = Object.getOwnPropertyDescriptor, F = (o, e, t, i) => {
  for (var s = i > 1 ? void 0 : i ? oa(e, t) : e, r = o.length - 1, n; r >= 0; r--)
    (n = o[r]) && (s = (i ? n(e, t, s) : n(s)) || s);
  return i && s && sa(e, t, s), s;
};
const Xs = "swim-date-display", Rt = Symbol("swim-date-display-clickable-auto");
function Ks() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  } catch {
    return "UTC";
  }
}
function ra(o) {
  const e = Math.round((o.getTime() - Date.now()) / 1e3), t = new Intl.RelativeTimeFormat("en", { numeric: "auto" }), i = Math.round(e / 60);
  if (Math.abs(e) < 60) return t.format(e, "second");
  const s = Math.round(i / 60);
  if (Math.abs(i) < 60) return t.format(i, "minute");
  const r = Math.round(s / 24);
  if (Math.abs(s) < 24) return t.format(s, "hour");
  const n = Math.round(r / 7);
  if (Math.abs(r) < 7) return t.format(r, "day");
  if (Math.abs(n) < 5) return t.format(n, "week");
  const l = Math.round(r / 30);
  if (Math.abs(l) < 12) return t.format(l, "month");
  const d = Math.round(r / 365);
  return t.format(d, "year");
}
function na(o) {
  return o == null ? null : o instanceof Date ? Y(o) ? o : null : Ve(o);
}
function Js(o) {
  const e = (o ?? "").toLowerCase();
  return e === L.HUMAN ? L.HUMAN : e === L.LOCAL ? L.LOCAL : e === L.CUSTOM ? L.CUSTOM : L.TIMEZONE;
}
function aa(o) {
  const e = (o ?? "").toLowerCase();
  return e === M.date ? M.date : e === M.time ? M.time : M.datetime;
}
const Ni = class Ni extends y {
  constructor() {
    super(...arguments), this.timezone = "", this.defaultInputTimeZone = "", this.mode = L.TIMEZONE, this.type = M.datetime, this.format = "", this.tooltipFormat = "", this.clipFormat = "", this._timezones = {
      UTC: "Etc/UTC",
      Local: ""
    }, this._tooltipDisabled = !1, this.tooltipCssClass = "date-tip-tooltip swim-date-display-tip", this.tooltipPlacement = B.top, this.defaultCopyKey = "Local", this.invalidDateMessage = "Invalid date", this.clickable = Rt, this._displayText = "", this._dateInvalid = !0, this._utcDatetimeAttr = "", this._zoneList = [], this._rawDatetimeEcho = "", this._titleValue = "", this._zoneValues = {};
  }
  get timezones() {
    return this._timezones;
  }
  set timezones(e) {
    e && typeof e == "object" && !Array.isArray(e) && (this._timezones = e);
  }
  get tooltipDisabled() {
    return this._tooltipDisabled;
  }
  set tooltipDisabled(e) {
    this._tooltipDisabled = p(e);
  }
  connectedCallback() {
    super.connectedCallback(), this._recompute();
  }
  willUpdate(e) {
    (e.has("datetime") || e.has("precision") || e.has("timezone") || e.has("defaultInputTimeZone") || e.has("mode") || e.has("type") || e.has("format") || e.has("tooltipFormat") || e.has("clipFormat") || e.has("timezones")) && this._recompute();
  }
  _effectiveTimezone() {
    return vt(this.timezone) || Ks();
  }
  _recompute() {
    if (this._rawDatetimeEcho = typeof this.datetime == "string" ? this.datetime : "", this._zoneValues = {}, this._zoneList = [], this._utcDatetimeAttr = "", this._titleValue = "", this._dateInvalid = !0, this._displayText = "", this.datetime == null || this.datetime === "")
      return;
    const e = na(this.datetime);
    if (!e) {
      this._dateInvalid = !0, this._rawDatetimeEcho = String(this.datetime);
      return;
    }
    const t = this.precision ? ui(e, this.precision) : e, i = Js(this.mode), s = aa(this.type), r = this.format && zt(this.format) || Jr(i, s, this.precision), n = this.tooltipFormat && zt(this.tooltipFormat) || r, l = this.clipFormat && zt(this.clipFormat) || Fo(i, s, this.precision), d = this._effectiveTimezone();
    if (this._dateInvalid = !1, i === L.LOCAL) {
      this._utcDatetimeAttr = he(t, "YYYY-MM-DD[T]HH:mm:ss.SSS", void 0), this._displayText = he(t, r, d);
      return;
    }
    this._utcDatetimeAttr = t.toISOString(), i === L.HUMAN ? this._displayText = ra(t) : this._displayText = he(t, r, d), this._zoneValues = this._buildZoneValues(t, n, l), this._zoneList = Object.keys(this.timezones).map((h) => this._zoneValues[h]).filter((h) => !!h), this._titleValue = Object.keys(this.timezones).map((h) => {
      const w = this._zoneValues[h];
      return w ? `${w.display} [${h}]` : "";
    }).filter(Boolean).join(`
`);
  }
  _buildZoneValues(e, t, i) {
    const s = {};
    for (const r of Object.keys(this.timezones)) {
      const n = this.timezones[r], l = vt(n) || Ks();
      s[r] = {
        key: r,
        clip: he(e, i, l),
        display: he(e, t, l)
      };
    }
    return s;
  }
  get _displayMode() {
    return Js(this.mode);
  }
  /** ngx `hasPopup`: underline + zone tooltip (non-local, valid). */
  get _hasPopup() {
    return !this._dateInvalid && this._displayMode !== L.LOCAL;
  }
  get _showTooltipPanel() {
    return this._hasPopup && !this.tooltipDisabled;
  }
  _effectiveClickable() {
    if (this.clickable !== Rt)
      return p(this.clickable);
    const e = this._zoneValues[this.defaultCopyKey];
    return !!this.defaultCopyKey && !!(e != null && e.clip);
  }
  _onTimeActivate(e) {
    !this._effectiveClickable() || this._dateInvalid || (e.preventDefault(), e.stopPropagation(), this._copyRow(this.defaultCopyKey));
  }
  _onTimeKeyDown(e) {
    !this._effectiveClickable() || this._dateInvalid || (e.key === "Enter" || e.key === " ") && (e.preventDefault(), this._copyRow(this.defaultCopyKey));
  }
  async _copyRow(e) {
    const t = this._zoneValues[e];
    if (t != null && t.clip) {
      try {
        await navigator.clipboard.writeText(t.clip);
      } catch {
      }
      this.dispatchEvent(
        new CustomEvent("date-copied", {
          detail: { key: e, clip: t.clip, message: `${e} date copied to clipboard` },
          bubbles: !0,
          composed: !0
        })
      );
    }
  }
  render() {
    const e = this._dateInvalid, t = this._showTooltipPanel, i = this._hasPopup && !e, s = this._effectiveClickable() && !e, r = this.tooltipDisabled && i && this._titleValue ? this._titleValue : "", n = [
      "swim-date-display__time",
      i ? "swim-date-display__time--popup" : "",
      s ? "swim-date-display__time--clickable" : ""
    ].filter(Boolean).join(" "), l = c`
      <time
        class="${n}"
        datetime="${de(e || !this._utcDatetimeAttr ? void 0 : this._utcDatetimeAttr)}"
        title="${r}"
        tabindex="${s ? 0 : u}"
        role="${s ? "button" : u}"
        aria-invalid="${e ? "true" : "false"}"
        @click="${this._onTimeActivate}"
        @keydown="${this._onTimeKeyDown}"
      >
        ${e ? c`${this.invalidDateMessage} &quot;${this._rawDatetimeEcho}&quot;` : this._displayText}
      </time>
    `;
    return c`
      <div class="swim-date-display__root">
        ${t ? c`
              <swim-tooltip
                type="${Di.popover}"
                placement="${this.tooltipPlacement}"
                css-class="${this.tooltipCssClass}"
                show-timeout="400"
                show-caret="true"
              >
                ${l}
                <div slot="content" class="swim-date-display__tooltip-body">
                  ${Vo(
      this._zoneList,
      (d) => d.key,
      (d) => c`
                      <div class="swim-date-display__zone-row">
                        <span class="swim-date-display__zone-label">${d.display}</span>
                        <swim-button
                          class="swim-date-display__copy-btn"
                          variant="bordered"
                          size="small"
                          type="button"
                          @click="${(h) => {
        h.stopPropagation(), this._copyRow(d.key);
      }}"
                        >
                          <swim-icon font-icon="copy"></swim-icon>
                          ${d.key}
                        </swim-button>
                      </div>
                    `
    )}
                </div>
              </swim-tooltip>
            ` : l}
      </div>
    `;
  }
  updated(e) {
    super.updated(e), this.toggleAttribute("invalid", this._dateInvalid);
  }
};
Ni.styles = [E, $n];
let O = Ni;
F([
  a({ attribute: "datetime" })
], O.prototype, "datetime", 2);
F([
  a({ type: String })
], O.prototype, "precision", 2);
F([
  a({ type: String, reflect: !0 })
], O.prototype, "timezone", 2);
F([
  a({ type: String, attribute: "default-input-time-zone" })
], O.prototype, "defaultInputTimeZone", 2);
F([
  a({ type: String, reflect: !0 })
], O.prototype, "mode", 2);
F([
  a({ type: String, reflect: !0 })
], O.prototype, "type", 2);
F([
  a({ type: String })
], O.prototype, "format", 2);
F([
  a({ type: String, attribute: "tooltip-format" })
], O.prototype, "tooltipFormat", 2);
F([
  a({ type: String, attribute: "clip-format" })
], O.prototype, "clipFormat", 2);
F([
  a({ type: Object, attribute: "timezones" })
], O.prototype, "timezones", 1);
F([
  a({ type: Boolean, reflect: !0, attribute: "tooltip-disabled", converter: g })
], O.prototype, "tooltipDisabled", 1);
F([
  a({ type: String, attribute: "tooltip-css-class" })
], O.prototype, "tooltipCssClass", 2);
F([
  a({ type: String, attribute: "tooltip-placement" })
], O.prototype, "tooltipPlacement", 2);
F([
  a({ type: String, attribute: "default-copy-key" })
], O.prototype, "defaultCopyKey", 2);
F([
  a({ type: String, attribute: "invalid-date-message" })
], O.prototype, "invalidDateMessage", 2);
F([
  a({
    attribute: "clickable",
    reflect: !0,
    converter: {
      fromAttribute(o) {
        return o === null ? Rt : o !== "false";
      },
      toAttribute(o) {
        return o === Rt ? null : o ? "" : "false";
      }
    }
  })
], O.prototype, "clickable", 2);
F([
  b()
], O.prototype, "_displayText", 2);
F([
  b()
], O.prototype, "_dateInvalid", 2);
F([
  b()
], O.prototype, "_utcDatetimeAttr", 2);
F([
  b()
], O.prototype, "_zoneList", 2);
F([
  b()
], O.prototype, "_rawDatetimeEcho", 2);
F([
  b()
], O.prototype, "_titleValue", 2);
customElements.get(Xs) || customElements.define(Xs, O);
const la = [
  E,
  v`
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
var ca = Object.defineProperty, We = (o, e, t, i) => {
  for (var s = void 0, r = o.length - 1, n; r >= 0; r--)
    (n = o[r]) && (s = n(e, t, s) || s);
  return s && ca(e, t, s), s;
};
const eo = "swim-large-format-dialog-content", qi = class qi extends y {
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
    var s, r;
    const e = (r = (s = this.renderRoot) == null ? void 0 : s.querySelector) == null ? void 0 : r.call(s, 'slot[name="footer"]');
    if (!e) return;
    const i = e.assignedNodes({ flatten: !0 }).some(
      (n) => {
        var l;
        return n.nodeType === Node.ELEMENT_NODE || n.nodeType === Node.TEXT_NODE && (((l = n.textContent) == null ? void 0 : l.trim()) ?? "").length > 0;
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
    return c`
      <main class="format-dialog-container">
        <header class="format-dialog-container__header">
          <div class="format-dialog-container__header-title ${e}">
            <h1>${this.dialogTitle}</h1>
            ${this.dialogSubtitle ? c`<h4>${this.dialogSubtitle}</h4>` : u}
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
qi.styles = [At, la];
let fe = qi;
We([
  a({ type: String, reflect: !0 })
], fe.prototype, "format");
We([
  a({ type: String, attribute: "dialog-title" })
], fe.prototype, "dialogTitle");
We([
  a({ type: String, attribute: "dialog-subtitle" })
], fe.prototype, "dialogSubtitle");
We([
  a({ type: String, attribute: "dialog-action-title" })
], fe.prototype, "dialogActionTitle");
We([
  a({ type: String, attribute: "dialog-dirty-action-title" })
], fe.prototype, "dialogDirtyActionTitle");
We([
  a({ type: Boolean, reflect: !0, converter: g })
], fe.prototype, "dirty");
We([
  b()
], fe.prototype, "_hasFooterSlot");
customElements.get(eo) || customElements.define(eo, fe);
const da = [
  E,
  v`
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
var ha = Object.defineProperty, No = (o, e, t, i) => {
  for (var s = void 0, r = o.length - 1, n; r >= 0; r--)
    (n = o[r]) && (s = n(e, t, s) || s);
  return s && ha(e, t, s), s;
};
const to = "swim-large-format-dialog-footer", Ui = class Ui extends y {
  constructor() {
    super(...arguments), this.format = "large", this.align = "center";
  }
  render() {
    return c` <div class="format-dialog-footer"><slot></slot></div> `;
  }
};
Ui.styles = da;
let xt = Ui;
No([
  a({ type: String, reflect: !0 })
], xt.prototype, "format");
No([
  a({ type: String, reflect: !0 })
], xt.prototype, "align");
customElements.get(to) || customElements.define(to, xt);
const ua = [
  E,
  At,
  v`
    :host {
      --swim-drawer-bg: var(--grey-800);
      display: block;
      box-sizing: border-box;
    }

    /* Root drawer: host is a full-viewport overlay wrapper */
    :host(.swim-drawer--root) {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: var(--swim-drawer-z, 998);
    }

    :host(.swim-drawer--root) .swim-drawer__backdrop {
      position: absolute;
      inset: 0;
      background-color: var(--black);
      opacity: 0;
      pointer-events: auto;
      transition: opacity 0.15s ease-out;
    }

    :host(.swim-drawer--root.swim-drawer--open) .swim-drawer__backdrop,
    :host(.swim-drawer--root.swim-drawer--closing) .swim-drawer__backdrop {
      opacity: 0.8;
    }

    /* Non-root: host is the panel container (position relative from parent) */
    :host(.swim-drawer--contained) {
      display: block;
      position: absolute;
      inset: 0;
      pointer-events: none;
    }

    /* Panel: the sliding drawer */
    .swim-drawer__panel {
      display: block;
      overflow-y: auto;
      overflow-x: hidden;
      text-align: left;
      background: var(--swim-drawer-bg);
      transition: transform 150ms ease-out;
      box-sizing: border-box;
      pointer-events: auto;
    }

    /* Left drawer: slides in from the left edge */
    :host(.swim-drawer--left) .swim-drawer__panel {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      min-width: 200px;
      width: 100%;
    }

    :host(.swim-drawer--left:not(.swim-drawer--open):not(.swim-drawer--closing)) .swim-drawer__panel {
      transform: translateX(-100%);
    }

    :host(.swim-drawer--left.swim-drawer--open) .swim-drawer__panel {
      transform: translateX(0);
    }

    :host(.swim-drawer--left.swim-drawer--closing) .swim-drawer__panel {
      transform: translateX(-100%);
    }

    /* Right drawer: slides in from the right edge */
    :host(.swim-drawer--right) .swim-drawer__panel {
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
      min-width: 200px;
      width: 100%;
    }

    :host(.swim-drawer--right:not(.swim-drawer--open):not(.swim-drawer--closing)) .swim-drawer__panel {
      transform: translateX(100%);
    }

    :host(.swim-drawer--right.swim-drawer--open) .swim-drawer__panel {
      transform: translateX(0);
    }

    :host(.swim-drawer--right.swim-drawer--closing) .swim-drawer__panel {
      transform: translateX(100%);
    }

    /* Bottom drawer: slides in from bottom */
    :host(.swim-drawer--bottom) .swim-drawer__panel {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      min-height: 150px;
      height: 100%;
    }

    :host(.swim-drawer--bottom:not(.swim-drawer--open):not(.swim-drawer--closing)) .swim-drawer__panel {
      transform: translateY(100%);
    }

    :host(.swim-drawer--bottom.swim-drawer--open) .swim-drawer__panel {
      transform: translateY(0);
    }

    :host(.swim-drawer--bottom.swim-drawer--closing) .swim-drawer__panel {
      transform: translateY(100%);
    }

    .swim-drawer__content {
      box-sizing: border-box;
      height: 100%;
      overflow: auto;
      padding: var(--spacing-16);
    }

    /* Focus visible for accessibility */
    .swim-drawer__panel:focus-visible {
      outline: 2px solid var(--blue-500);
      outline-offset: 2px;
    }
  `
];
var Xe = /* @__PURE__ */ ((o) => (o.Left = "left", o.Right = "right", o.Bottom = "bottom", o))(Xe || {}), pa = Object.defineProperty, ma = Object.getOwnPropertyDescriptor, ve = (o, e, t, i) => {
  for (var s = i > 1 ? void 0 : i ? ma(e, t) : e, r = o.length - 1, n; r >= 0; r--)
    (n = o[r]) && (s = (i ? n(e, t, s) : n(s)) || s);
  return i && s && pa(e, t, s), s;
};
const io = "swim-drawer", Gi = class Gi extends y {
  constructor() {
    super(...arguments), this.cssClass = "", this.direction = Xe.Left, this._size = 80, this._zIndex = 998, this._closeOnOutsideClick = !0, this._isRoot = !0, this._open = !1, this._closing = !1, this._contentId = `swim-drawer-content-${Math.random().toString(36).slice(2, 11)}`, this._previousActiveElement = null, this._backdropClickBound = () => this._onBackdropClick(), this._keydownBound = (e) => this._onKeydown(e), this._portalTarget = null;
  }
  get size() {
    return this._size;
  }
  set size(e) {
    this._size = T(e, 80);
  }
  get zIndex() {
    return this._zIndex;
  }
  set zIndex(e) {
    this._zIndex = T(e, 998);
  }
  get closeOnOutsideClick() {
    return this._closeOnOutsideClick;
  }
  set closeOnOutsideClick(e) {
    this._closeOnOutsideClick = p(e);
  }
  get isRoot() {
    return this._isRoot;
  }
  set isRoot(e) {
    this._isRoot = p(e);
  }
  get open() {
    return this._open;
  }
  set open(e) {
    const t = p(e);
    this._open !== t && (this._open = t, this.requestUpdate(), t ? this._previousActiveElement = typeof document < "u" ? document.activeElement : null : this._restoreFocus());
  }
  get _isLeft() {
    return this.direction === Xe.Left || this.direction === "left";
  }
  get _isRight() {
    return this.direction === Xe.Right || this.direction === "right";
  }
  get _isBottom() {
    return this.direction === Xe.Bottom || this.direction === "bottom";
  }
  get _widthSize() {
    return (this._isLeft || this._isRight) && this.size ? `${this.size}%` : "100%";
  }
  get _heightSize() {
    return this._isBottom && this.size ? `${this.size}%` : "100%";
  }
  get _isVisible() {
    return this.open || this._closing;
  }
  _restoreFocus() {
    this._previousActiveElement && typeof this._previousActiveElement.focus == "function" && this._previousActiveElement.focus(), this._previousActiveElement = null;
  }
  _emitClose() {
    this.dispatchEvent(new CustomEvent("close", { detail: !0, bubbles: !1, composed: !1 }));
  }
  _onBackdropClick() {
    this.closeOnOutsideClick && this.isRoot && this.hide();
  }
  _onKeydown(e) {
    e.key === "Escape" && this.open && (e.preventDefault(), this.hide());
  }
  /** Show the drawer */
  show() {
    this.isRoot && this.parentElement && this.parentElement !== document.body && (this._portalTarget = this.parentElement, document.body.appendChild(this)), this.open = !0;
  }
  /** Hide the drawer (animates out, then emits close event) */
  hide() {
    this._closing || !this.open || (this._closing = !0, this._clearCloseTimeout(), this._closeTimeout = window.setTimeout(() => {
      this._closeTimeout = void 0, this._closing = !1, this.open = !1, this._portalTarget && this._portalTarget.isConnected && this.parentElement === document.body && this._portalTarget.appendChild(this), this._portalTarget = null, this._emitClose();
    }, 150));
  }
  connectedCallback() {
    super.connectedCallback(), document.addEventListener("keydown", this._keydownBound);
  }
  disconnectedCallback() {
    document.removeEventListener("keydown", this._keydownBound), this._clearCloseTimeout(), super.disconnectedCallback();
  }
  _clearCloseTimeout() {
    this._closeTimeout !== void 0 && (clearTimeout(this._closeTimeout), this._closeTimeout = void 0);
  }
  willUpdate() {
    const t = ["swim-drawer", this._isLeft ? "swim-drawer--left" : this._isRight ? "swim-drawer--right" : "swim-drawer--bottom", this.isRoot ? "swim-drawer--root" : "swim-drawer--contained"];
    this.open && !this._closing && t.push("swim-drawer--open"), this._closing && t.push("swim-drawer--closing"), this.cssClass && t.push(...this.cssClass.trim().split(/\s+/).filter(Boolean)), this.className = t.join(" "), this.isRoot && this.style.setProperty("--swim-drawer-z", String(this.zIndex));
  }
  firstUpdated() {
    this.open && this._contentEl && this._contentEl.focus({ preventScroll: !0 });
  }
  updated(e) {
    e.has("open") && this.open && this._contentEl && requestAnimationFrame(() => {
      var t;
      (t = this._contentEl) == null || t.focus({ preventScroll: !0 });
    });
  }
  render() {
    return this._isVisible ? c`
      ${this.isRoot ? c` <div class="swim-drawer__backdrop" aria-hidden="true" @click="${this._backdropClickBound}"></div> ` : u}
      <div
        class="swim-drawer__panel swim-scroll"
        style="width: ${this._widthSize}; height: ${this._heightSize}; z-index: ${this.zIndex};"
      >
        <div
          part="content"
          class="swim-drawer__content swim-scroll ${this.cssClass}"
          tabindex="-1"
          role="dialog"
          aria-modal="true"
          id="${this._contentId}"
        >
          <slot></slot>
        </div>
      </div>
    ` : u;
  }
};
Gi.styles = ua;
let Z = Gi;
ve([
  a({ type: String, attribute: "css-class" })
], Z.prototype, "cssClass", 2);
ve([
  a({ type: String, reflect: !0 })
], Z.prototype, "direction", 2);
ve([
  a({ type: Number })
], Z.prototype, "size", 1);
ve([
  a({ type: Number })
], Z.prototype, "zIndex", 1);
ve([
  a({
    type: Boolean,
    attribute: "close-on-outside-click",
    reflect: !0,
    converter: {
      fromAttribute: (o) => o !== null && o !== "false" && o !== "0",
      toAttribute: (o) => o ? "" : "false"
    }
  })
], Z.prototype, "closeOnOutsideClick", 1);
ve([
  a({
    type: Boolean,
    attribute: "is-root",
    reflect: !0,
    converter: {
      fromAttribute: (o) => o !== null && o !== "false" && o !== "0",
      toAttribute: (o) => o ? "" : "false"
    }
  })
], Z.prototype, "isRoot", 1);
ve([
  a({ type: Boolean, reflect: !0, converter: g })
], Z.prototype, "open", 1);
ve([
  b()
], Z.prototype, "_closing", 2);
ve([
  b()
], Z.prototype, "_contentId", 2);
ve([
  N(".swim-drawer__content")
], Z.prototype, "_contentEl", 2);
customElements.get(io) || customElements.define(io, Z);
var ba = /* @__PURE__ */ ((o) => (o.Fixed = "fixed", o.Absolute = "absolute", o))(ba || {});
function jl(o) {
  const {
    direction: e = Xe.Left,
    size: t = 80,
    zIndex: i = 998,
    closeOnOutsideClick: s = !0,
    isRoot: r = !0,
    parentContainer: n,
    content: l,
    cssClass: d = ""
  } = o, h = document.createElement("swim-drawer");
  if (h.direction = e, h.size = t, h.zIndex = i, h.closeOnOutsideClick = s, h.isRoot = r, h.cssClass = d, l)
    if (typeof l == "string") {
      const f = document.createElement("div");
      for (f.innerHTML = l; f.firstChild; )
        h.appendChild(f.firstChild);
    } else if (l instanceof DocumentFragment)
      for (; l.firstChild; )
        h.appendChild(l.firstChild);
    else
      h.appendChild(l);
  (r ? document.body : n ?? document.body).appendChild(h);
  const m = () => {
    h.hide();
  };
  return h.addEventListener(
    "close",
    () => {
      h.parentNode && h.parentNode.removeChild(h);
    },
    { once: !0 }
  ), h.show(), { close: m, drawer: h };
}
const fa = v`
  :host {
    display: block;
    width: 100%;
    margin-bottom: 2em;
    box-sizing: border-box;

    --_swim-fallback-background: var(--grey-825);
    --_swim-fallback-header-background: var(--grey-775);
    --_swim-fallback-header-hover-background: var(--grey-750);
    --_swim-fallback-content-background: transparent;

    background: var(--swim-section-background, var(--_swim-fallback-background));
    border-radius: var(--radius-8);
  }

  :host([appearance='minimal']) {
    --_swim-fallback-background: transparent;
    --_swim-fallback-header-background: transparent;
    --_swim-fallback-header-hover-background: transparent;
    --_swim-fallback-content-background: transparent;
  }

  :host([appearance='outline']) {
    --_swim-fallback-header-background: transparent;
    --_swim-fallback-header-hover-background: var(--grey-750);
    --_swim-fallback-content-background: transparent;
  }

  :host([appearance='light']) {
    --_swim-fallback-header-background: var(--grey-700);
    --_swim-fallback-header-hover-background: var(--grey-725);
    --_swim-fallback-content-background: var(--grey-775);
  }

  .swim-section__inner {
    display: block;
    width: 100%;
  }

  .swim-section__header {
    background: var(--swim-section-header-background, var(--_swim-fallback-header-background));
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
    flex: 0 0 28px;
    width: 28px;
    align-self: stretch;
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
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .swim-section__toggle swim-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
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

  .swim-section__header.swim-section__header--collapsible:not(.swim-section__header--empty) {
    transition: background-color 200ms ease;
  }

  /* Full-row hover when user can collapse via header click or chevron (not when collapsible but no UI control) */
  .swim-section__header.swim-section__header--collapsible:hover:not(.swim-section__header--empty):is(.swim-section__header--header-toggle, :has(.swim-section__toggle)) {
    background: var(--swim-section-header-hover-background, var(--_swim-fallback-header-hover-background));
  }

  .swim-section__header.swim-section__header--header-toggle {
    cursor: pointer;
  }

  .swim-section__header.swim-section__header--header-toggle:focus-visible {
    outline: 2px solid var(--blue-200);
    border-radius: var(--radius-2);
    outline-offset: 1px;
  }

  .swim-section__header.swim-section__header--toggle-right {
    flex-direction: row-reverse;
  }

  .swim-section__header.swim-section__header--toggle-right.swim-section__header--collapsible {
    padding: var(--spacing-0) var(--spacing-20) var(--spacing-0) var(--spacing-16);
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
    background: var(--swim-section-content-background, var(--_swim-fallback-content-background));
  }

  /* Appearance: outline */
  :host([appearance='outline']) .swim-section__header,
  :host([appearance='outline']) .swim-section__content {
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
    border-radius: var(--radius-8) var(--radius-8) var(--radius-0) var(--radius-0);
  }

  :host([appearance='light']) .swim-section__header.swim-section__header--collapsed {
    border-radius: var(--radius-8);
  }

  :host([appearance='light']) .swim-section__content {
    border-radius: var(--radius-0) var(--radius-0) var(--radius-8) var(--radius-8);
  }
`, ga = [E, fa];
var qo = /* @__PURE__ */ ((o) => (o.Legacy = "legacy", o.Outline = "outline", o.Light = "light", o.Minimal = "minimal", o))(qo || {}), Tt = /* @__PURE__ */ ((o) => (o.Left = "left", o.Right = "right", o.None = "none", o))(Tt || {}), wa = Object.defineProperty, _a = Object.getOwnPropertyDescriptor, ye = (o, e, t, i) => {
  for (var s = i > 1 ? void 0 : i ? _a(e, t) : e, r = o.length - 1, n; r >= 0; r--)
    (n = o[r]) && (s = (i ? n(e, t, s) : n(s)) || s);
  return i && s && wa(e, t, s), s;
};
let so = 0;
const oo = "swim-section", $i = class $i extends y {
  constructor() {
    super(...arguments), this._id = `section-${++so}`, this._sectionCollapsed = !1, this._sectionCollapsible = !0, this._headerToggle = !1, this.sectionTitle = "", this.padding = "1.8em", this.appearance = qo.Legacy, this.togglePosition = Tt.Left, this._hasHeaderSlot = !1, this._headerSlotChangeBound = () => this._checkHeaderSlot();
  }
  get id() {
    return this._id;
  }
  set id(e) {
    this._id = e || `section-${++so}`;
  }
  get sectionCollapsed() {
    return this._sectionCollapsed;
  }
  set sectionCollapsed(e) {
    const t = e != null ? p(e) : !1;
    this._sectionCollapsed !== t && (this._sectionCollapsed = t);
  }
  get sectionCollapsible() {
    return this._sectionCollapsible;
  }
  set sectionCollapsible(e) {
    const t = e != null ? p(e) : !0;
    this._sectionCollapsible !== t && (this._sectionCollapsible = t);
  }
  get headerToggle() {
    return this._headerToggle;
  }
  set headerToggle(e) {
    const t = e != null ? p(e) : !1;
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
      const r = e.assignedNodes({ flatten: !0 }).some(
        (n) => {
          var l;
          return n.nodeType === Node.ELEMENT_NODE || n.nodeType === Node.TEXT_NODE && (((l = n.textContent) == null ? void 0 : l.trim()) ?? "").length > 0;
        }
      );
      this._hasHeaderSlot !== r && (this._hasHeaderSlot = r);
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
        bubbles: !1,
        composed: !1
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
    var n;
    const e = this.sectionCollapsible, t = e && this.togglePosition !== Tt.None, i = this.togglePosition === Tt.Right, s = [
      "swim-section__header",
      this.sectionCollapsed ? "swim-section__header--collapsed" : "",
      e ? "swim-section__header--collapsible" : "",
      this.headerToggle ? "swim-section__header--header-toggle" : "",
      i ? "swim-section__header--toggle-right" : ""
    ].filter(Boolean).join(" "), r = this._headerIsEmpty();
    return c`
      <div class="swim-section__inner">
        <header
          class="${s}${r ? " swim-section__header--empty" : ""}"
          role="${this.headerToggle && e && !r ? "button" : "presentation"}"
          tabindex="${this.headerToggle && e && !r ? 0 : -1}"
          aria-expanded="${r ? void 0 : this.sectionCollapsed ? "false" : "true"}"
          aria-controls="${this._contentId}"
          @click="${this._onHeaderClick}"
          @keydown="${this._onHeaderKeydown}"
        >
          ${t && !r ? c`
                <button
                  type="button"
                  class="swim-section__toggle"
                  title="Toggle Content Visibility"
                  aria-controls="${this._contentId}"
                  aria-expanded="${this.sectionCollapsed ? "false" : "true"}"
                  @click="${this._onToggle}"
                  @keydown="${(l) => {
      (l.key === " " || l.key === "Enter") && (l.preventDefault(), this._onToggle(l));
    }}"
                >
                  <swim-icon
                    class="swim-section__toggle-icon"
                    font-icon="${this.sectionCollapsed ? "chevron-bold-right" : "chevron-bold-down"}"
                    aria-hidden="true"
                  ></swim-icon>
                </button>
              ` : u}
          <div class="swim-section__header-content">
            ${(n = this.sectionTitle) != null && n.trim() ? c`<h1 class="swim-section__header-title">${this.sectionTitle}</h1>` : u}
            <slot name="header"></slot>
          </div>
        </header>
        ${this.sectionCollapsed ? u : c`
              <div
                id="${this._contentId}"
                class="swim-section__content"
                style="padding: ${this.padding}"
                role="region"
                aria-labelledby="${r ? "" : void 0}"
              >
                <slot></slot>
              </div>
            `}
      </div>
    `;
  }
};
$i.styles = ga;
let X = $i;
ye([
  a({ type: String, reflect: !0 })
], X.prototype, "id", 1);
ye([
  a({
    reflect: !0,
    attribute: "section-collapsed",
    converter: g
  })
], X.prototype, "sectionCollapsed", 1);
ye([
  a({
    reflect: !0,
    attribute: "section-collapsible",
    converter: J
  })
], X.prototype, "sectionCollapsible", 1);
ye([
  a({
    reflect: !0,
    attribute: "header-toggle",
    converter: g
  })
], X.prototype, "headerToggle", 1);
ye([
  a({ type: String, reflect: !0, attribute: "section-title" })
], X.prototype, "sectionTitle", 2);
ye([
  a({ type: String })
], X.prototype, "padding", 2);
ye([
  a({ type: String, reflect: !0 })
], X.prototype, "appearance", 2);
ye([
  a({ type: String, reflect: !0, attribute: "toggle-position" })
], X.prototype, "togglePosition", 2);
ye([
  b()
], X.prototype, "_hasHeaderSlot", 2);
ye([
  N('slot[name="header"]')
], X.prototype, "_headerSlot", 2);
customElements.get(oo) || customElements.define(oo, X);
const va = v`
  :host {
    display: contents;
  }
`, ro = "swim-section-header", Wi = class Wi extends y {
  render() {
    return c`<slot></slot>`;
  }
};
Wi.styles = va;
let bi = Wi;
customElements.get(ro) || customElements.define(ro, bi);
const ya = v`
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
`, xa = v`
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
var ka = Object.defineProperty, Ca = Object.getOwnPropertyDescriptor, xe = (o, e, t, i) => {
  for (var s = i > 1 ? void 0 : i ? Ca(e, t) : e, r = o.length - 1, n; r >= 0; r--)
    (n = o[r]) && (s = (i ? n(e, t, s) : n(s)) || s);
  return i && s && ka(e, t, s), s;
};
let Ea = 0;
const no = "swim-radio", Qi = class Qi extends y {
  constructor() {
    super(...arguments), this.id = `swim-radio-${++Ea}`, this.name = "", this.radioId = "", this._tabindex = 0, this._checked = !1, this.value = "", this._disabled = !1, this.groupDisabled = !1, this.isInGroup = !1;
  }
  get tabindex() {
    return this._tabindex;
  }
  set tabindex(e) {
    this._tabindex = T(e, 0);
  }
  get checked() {
    return this._checked;
  }
  set checked(e) {
    const t = p(e);
    this._checked !== t && (this._checked = t);
  }
  get disabled() {
    return this._disabled || this.groupDisabled;
  }
  set disabled(e) {
    this._disabled = p(e);
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
        // Must bubble so swim-radio-group (light-DOM parent) receives selection.
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
    this.dispatchEvent(new FocusEvent("focus", { ...e, bubbles: !1, composed: !1 }));
  }
  _onBlur(e) {
    this.dispatchEvent(new FocusEvent("blur", { ...e, bubbles: !1, composed: !1 }));
  }
  render() {
    const e = `${this.id}-content`;
    return c`
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
Qi.styles = [E, ya];
let K = Qi;
xe([
  N(".swim-radio__roving")
], K.prototype, "_roving", 2);
xe([
  a({ type: String })
], K.prototype, "id", 2);
xe([
  a({ type: String })
], K.prototype, "name", 2);
xe([
  a({ type: String, attribute: "radio-id" })
], K.prototype, "radioId", 2);
xe([
  a({ type: Number })
], K.prototype, "tabindex", 1);
xe([
  a({ type: Boolean, reflect: !0, converter: g })
], K.prototype, "checked", 1);
xe([
  a({ type: String })
], K.prototype, "value", 2);
xe([
  a({ type: Boolean, reflect: !0, converter: g })
], K.prototype, "disabled", 1);
xe([
  a({ type: Boolean, attribute: !1 })
], K.prototype, "groupDisabled", 2);
xe([
  a({ type: Boolean, attribute: !1 })
], K.prototype, "isInGroup", 2);
customElements.get(no) || customElements.define(no, K);
var Aa = Object.defineProperty, Sa = Object.getOwnPropertyDescriptor, Le = (o, e, t, i) => {
  for (var s = i > 1 ? void 0 : i ? Sa(e, t) : e, r = o.length - 1, n; r >= 0; r--)
    (n = o[r]) && (s = (i ? n(e, t, s) : n(s)) || s);
  return i && s && Aa(e, t, s), s;
};
let Da = 0;
function Ma(o, e) {
  return (o % e + e) % e;
}
const ao = "swim-radio-group", Ut = class Ut extends y {
  constructor() {
    super(), this.id = `swim-radio-group-${++Da}`, this._disabled = !1, this._value = "", this.name = "", this._focusIndex = -1, this._tabindex = 0, this._radios = [], this._changeHandler = (e) => this._onRadioChange(e), this._slotChangeBound = () => this._syncRadios(), this._onGroupFocus = (e) => {
      if (e.target !== this._slotWrapper) return;
      const t = this._radios.find((i) => i.checked);
      t ? (this._focusIndex = this._radios.indexOf(t), this._focusOn(this._focusIndex)) : this._focusFirst();
    }, this._onGroupBlur = () => {
      this.dispatchEvent(new FocusEvent("blur", { bubbles: !1, composed: !1 }));
    }, this._internals = this.attachInternals();
  }
  get disabled() {
    return this._disabled;
  }
  set disabled(e) {
    this._disabled = p(e), this._updateRadioDisabledState();
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
    this._focusIndex = T(e, -1), this._focusOn(this._focusIndex);
  }
  get tabindex() {
    return this.disabled ? -1 : this._tabindex;
  }
  set tabindex(e) {
    this._tabindex = T(e, 0);
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
    var i;
    const e = this._slot, t = ((i = e == null ? void 0 : e.assignedElements) == null ? void 0 : i.call(e)) ?? [];
    this._radios = t.filter(
      (s) => {
        var r;
        return s instanceof HTMLElement && ((r = s.tagName) == null ? void 0 : r.toLowerCase()) === "swim-radio";
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
    var s;
    const t = e.target;
    if (!t || ((s = t.tagName) == null ? void 0 : s.toLowerCase()) !== "swim-radio") return;
    const i = e.detail;
    this._value !== i && (this._value = i, this._updateSelectedFromValue(), this._internals.setFormValue(String(this._value)), this.dispatchEvent(
      new CustomEvent("change", {
        detail: this._value,
        bubbles: !1,
        composed: !1
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
    for (let i = 1; i <= t; i++) {
      const s = Ma(this._focusIndex + e * i, t);
      if (!this._radios[s].disabled) {
        this._focusIndex = s, this._focusOn(s);
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
    return c`
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
Ut.styles = [E, xa], Ut.formAssociated = !0;
let le = Ut;
Le([
  N("slot")
], le.prototype, "_slot", 2);
Le([
  N(".swim-radio-group__slot")
], le.prototype, "_slotWrapper", 2);
Le([
  a({ type: String })
], le.prototype, "id", 2);
Le([
  a({ type: Boolean, reflect: !0, converter: g })
], le.prototype, "disabled", 1);
Le([
  a({ type: String })
], le.prototype, "value", 1);
Le([
  a({ type: String })
], le.prototype, "name", 2);
Le([
  a({ type: Number })
], le.prototype, "focusIndex", 1);
Le([
  a({ type: Number })
], le.prototype, "tabindex", 1);
customElements.get(ao) || customElements.define(ao, le);
const za = v`
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
`, Ta = /* @__PURE__ */ new Set(["name", "value", "title", "label", "description", "disabled", "group"]);
function fi(o, e, t) {
  return e ? o.toLowerCase().includes(e.toLowerCase()) : !0;
}
function Uo(o, e, t, i) {
  if (o == null || i > 2)
    return !1;
  if (typeof o == "number" || typeof o == "boolean")
    return fi(String(o), e);
  if (typeof o == "string")
    return fi(o, e);
  if (typeof o == "object" && !Array.isArray(o)) {
    const s = Object.getOwnPropertyNames(o);
    for (const r of s)
      if (Uo(o[r], e, t, i + 1))
        return !0;
  }
  return !1;
}
function Oa(o, e, t) {
  const i = e.trim();
  if (!i)
    return !0;
  const s = i.toLowerCase(), r = [o.name, o.title, o.label, o.description, o.value, o.group].filter((n) => n != null).map((n) => typeof n == "string" ? n : String(n));
  for (const n of r)
    if (fi(n, s))
      return !0;
  for (const n of Object.keys(o))
    if (!Ta.has(n) && Uo(o[n], s, t.filterCaseSensitive, 0))
      return !0;
  return !1;
}
var Pa = Object.defineProperty, Ia = Object.getOwnPropertyDescriptor, Fe = (o, e, t, i) => {
  for (var s = i > 1 ? void 0 : i ? Ia(e, t) : e, r = o.length - 1, n; r >= 0; r--)
    (n = o[r]) && (s = (i ? n(e, t, s) : n(s)) || s);
  return i && s && Pa(e, t, s), s;
};
const lo = "swim-option";
class De extends y {
  constructor() {
    super(...arguments), this.name = "", this.label = "", this.title = "", this.description = "", this.group = "", this._disabled = !1, this._hidden = !1;
  }
  get disabled() {
    return this._disabled;
  }
  set disabled(e) {
    this._disabled = p(e);
  }
  get hidden() {
    return this._hidden;
  }
  set hidden(e) {
    this._hidden = p(e);
  }
  createRenderRoot() {
    return this;
  }
  render() {
    return c``;
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
Fe([
  a({ type: String })
], De.prototype, "name", 2);
Fe([
  a()
], De.prototype, "value", 2);
Fe([
  a({ type: String })
], De.prototype, "label", 2);
Fe([
  a({ type: String })
], De.prototype, "title", 2);
Fe([
  a({ type: String })
], De.prototype, "description", 2);
Fe([
  a({ type: String })
], De.prototype, "group", 2);
Fe([
  a({ type: Boolean, reflect: !0, converter: g })
], De.prototype, "disabled", 1);
Fe([
  a({ type: Boolean, reflect: !0, converter: g })
], De.prototype, "hidden", 1);
customElements.get(lo) || customElements.define(lo, De);
var La = Object.defineProperty, Fa = Object.getOwnPropertyDescriptor, C = (o, e, t, i) => {
  for (var s = i > 1 ? void 0 : i ? Fa(e, t) : e, r = o.length - 1, n; r >= 0; r--)
    (n = o[r]) && (s = (i ? n(e, t, s) : n(s)) || s);
  return i && s && La(e, t, s), s;
};
const co = "swim-select", St = typeof HTMLElement < "u" && typeof HTMLElement.prototype.showPopover == "function", Gt = class Gt extends y {
  constructor() {
    super(), this.label = "", this.placeholder = "Select...", this.hint = "", this.emptyPlaceholder = "No options available", this.filterPlaceholder = "Filter options...", this.filterEmptyPlaceholder = "No matches", this.filterSearchingPlaceholder = "Searching…", this._asyncFilter = !1, this.filterDebounceMs = 500, this.filterMinLength = 2, this.dropdownAlign = "start", this._loading = !1, this.options = [], this._value = [], this.name = "", this.id = `swim-select-${Math.random().toString(36).substr(2, 9)}`, this._disabled = !1, this._required = !1, this.appearance = Ai.legacy, this.size = Si.sm, this._withMargin = !0, this._withHint = !0, this._filterable = !0, this._grouped = !1, this._multiple = !1, this._allowClear = !0, this.requiredIndicator = "*", this._slottedOptions = [], this._hasSlottedHint = !1, this._open = !1, this._focused = !1, this._touched = !1, this._invalid = !1, this._filterQuery = "", this._focusedIndex = -1, this._internals = this.attachInternals();
  }
  get asyncFilter() {
    return this._asyncFilter;
  }
  set asyncFilter(e) {
    this._asyncFilter = p(e);
  }
  get loading() {
    return this._loading;
  }
  set loading(e) {
    this._loading = p(e);
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
    this._disabled = p(e);
  }
  get required() {
    return this._required;
  }
  set required(e) {
    this._required = p(e);
  }
  get marginless() {
    return !this._withMargin;
  }
  set marginless(e) {
    this._withMargin = !p(e);
  }
  get withHint() {
    return this._withHint;
  }
  set withHint(e) {
    this._withHint = p(e);
  }
  get filterable() {
    return this._filterable;
  }
  set filterable(e) {
    this._filterable = p(e);
  }
  get grouped() {
    return this._grouped;
  }
  set grouped(e) {
    this._grouped = p(e);
  }
  get multiple() {
    return this._multiple;
  }
  set multiple(e) {
    this._multiple = p(e);
  }
  get allowClear() {
    return this._allowClear;
  }
  set allowClear(e) {
    this._allowClear = p(e);
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
      const i = t.getAttribute("name") || "", s = t.getAttribute("value"), r = t.getAttribute("group");
      return {
        name: i,
        value: s !== null ? s : i,
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
    const e = this._value.length > 0, t = this._getFilteredOptions(), i = this.allowClear && e && !this.disabled, s = t.length > 0 && !this.loading, r = this.withHint && (this.hint.trim() !== "" || this._hasSlottedHint);
    return c`
      <div class="select-wrap">
        <div class="select-flex-wrap">
          <div class="select-flex-wrap-inner">
            <div class="select-input-wrap">
              <div
                class="select-input"
                part="select"
                role="combobox"
                aria-disabled="${this.disabled ? "true" : u}"
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
                  ${i ? c`
                        <button
                          type="button"
                          class="select-clear"
                          aria-label="Clear selection"
                          @click="${this._handleClear}"
                        >
                          <swim-icon font-icon="x"></swim-icon>
                        </button>
                      ` : u}
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
                ${this.label} ${this.required ? c`<span>${this.requiredIndicator}</span>` : u}
              </label>
            </div>
          </div>
        </div>
        <div class="select-underline">
          <div class="underline-fill"></div>
        </div>
        ${r ? c`
              <div class="select-hint">
                <slot name="hint">${this.hint}</slot>
              </div>
            ` : u}
        ${this._open ? c`
              <div
                class="select-dropdown swim-scroll"
                part="dropdown"
                role="listbox"
                id="${this.id}-listbox"
                popover="${St ? "manual" : u}"
              >
                ${this.filterable ? c`
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
                    ` : u}
                ${s ? c`
                      <ul
                        class="select-options ${this.grouped && this._listHasGroupHeadings(t) ? "select-options--grouped" : ""}"
                      >
                        ${this.grouped ? this._renderGroupedOptionRows(t) : Vo(
      t,
      (n) => this._getOptionValue(n),
      (n, l) => this._renderOption(n, l)
    )}
                      </ul>
                    ` : c`<div class="select-empty">${this._emptyDropdownMessage()}</div>`}
              </div>
            ` : u}
      </div>
    `;
  }
  _renderValue() {
    if (this._value.length === 0)
      return c`<span class="select-placeholder">${this.placeholder}</span>`;
    if (this.multiple)
      return c`
        ${this._value.map((e) => {
        const t = this._allOptions.find((i) => this._getOptionValue(i) === e);
        return this._renderChip(t || { name: e, value: e });
      })}
      `;
    {
      const e = this._allOptions.find((i) => this._getOptionValue(i) === this._value[0]), t = e ? this._getOptionLabel(e) : String(this._value[0]);
      return c`${t}`;
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
    for (let s = 0; s < e.length; s++) {
      const r = e[s], n = this._groupHeading(r);
      n ? n !== t && (i.push(c`
            <li class="select-option-group" role="presentation">
              <span class="select-option-group-label">${n}</span>
            </li>
          `), t = n) : t = "", i.push(this._renderOption(r, s));
    }
    return i;
  }
  _emptyDropdownMessage() {
    return this.loading ? this.filterSearchingPlaceholder : this.asyncFilter && this._filterQuery.trim().length < this.filterMinLength ? this.emptyPlaceholder : this._allOptions.length === 0 ? this.asyncFilter && this._filterQuery.trim().length > 0 ? this.filterEmptyPlaceholder : this.emptyPlaceholder : this.filterEmptyPlaceholder;
  }
  _renderChip(e) {
    const t = this._getOptionLabel(e);
    return c`
      <div class="select-chip">
        <span class="select-chip-label">${t}</span>
        ${this.disabled ? u : c`
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
    const i = this._getOptionValue(e), s = this._isSelected(i), r = t === this._focusedIndex;
    return c`
      <li
        class="select-option"
        role="option"
        ?selected="${s}"
        ?focused="${r}"
        ?disabled="${e.disabled}"
        aria-selected="${s}"
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
      const i = [...this._value], s = i.indexOf(t);
      s > -1 ? i.splice(s, 1) : i.push(t), this.value = i;
    } else
      this.value = t, this._closeDropdown();
    this._dispatchChange(), this._validate();
  }
  _removeChip(e, t) {
    e.stopPropagation();
    const i = this._getOptionValue(t), s = this._value.filter((r) => r !== i);
    this.value = s, this._dispatchChange(), this._validate();
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
    let s = this._focusedIndex + e;
    s < 0 ? s = i : s > i && (s = 0), this._focusedIndex = s;
  }
  _getFilteredOptions() {
    return this.asyncFilter ? this._allOptions : this._filterQuery.trim() ? this._allOptions.filter(
      (e) => Oa(e, this._filterQuery, { filterCaseSensitive: !1 })
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
    if (!this._open || !St) return;
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
    const i = t.getBoundingClientRect(), s = this.getBoundingClientRect(), r = 8, n = Math.min(300, Math.max(0, window.innerHeight - i.bottom - r - 8)), l = this.dropdownAlign === "center", d = l ? s.width : i.width;
    let h = l ? s.left : i.left;
    l && (h = Math.min(Math.max(h, 8), window.innerWidth - d - 8)), e.style.setProperty("inset", "auto"), e.style.setProperty("margin", "0"), e.style.setProperty("height", "auto"), e.style.setProperty("position", "fixed"), e.style.setProperty("left", `${h}px`), e.style.setProperty("top", `${i.bottom + r}px`), e.style.setProperty("width", `${d}px`), e.style.setProperty("max-height", `${n}px`), e.style.setProperty("z-index", "2147483646"), e.style.setProperty("animation", "none"), e.style.setProperty("transform", "none");
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
    if (this._removeDropdownScrollListener(), !(!e || !St)) {
      try {
        (t = e.hidePopover) == null || t.call(e);
      } catch {
      }
      this._clearDropdownPanelGeometry(e);
    }
  }
  _addDropdownScrollListener() {
    !St || this._dropdownScrollOrResizeListener || (this._dropdownScrollOrResizeListener = () => {
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
Gt.styles = [E, At, za], Gt.formAssociated = !0;
let x = Gt;
C([
  N(".select-input")
], x.prototype, "selectInput", 2);
C([
  N(".select-filter-input")
], x.prototype, "filterInput", 2);
C([
  a({ type: String })
], x.prototype, "label", 2);
C([
  a({ type: String })
], x.prototype, "placeholder", 2);
C([
  a({ type: String })
], x.prototype, "hint", 2);
C([
  a({ type: String, attribute: "empty-placeholder" })
], x.prototype, "emptyPlaceholder", 2);
C([
  a({ type: String, attribute: "filter-placeholder" })
], x.prototype, "filterPlaceholder", 2);
C([
  a({ type: String, attribute: "filter-empty-placeholder" })
], x.prototype, "filterEmptyPlaceholder", 2);
C([
  a({ type: String, attribute: "filter-searching-placeholder" })
], x.prototype, "filterSearchingPlaceholder", 2);
C([
  a({ type: Boolean, attribute: "async-filter", converter: g })
], x.prototype, "asyncFilter", 1);
C([
  a({ type: Number, attribute: "filter-debounce-ms" })
], x.prototype, "filterDebounceMs", 2);
C([
  a({ type: Number, attribute: "filter-min-length" })
], x.prototype, "filterMinLength", 2);
C([
  a({ type: String, attribute: "dropdown-align" })
], x.prototype, "dropdownAlign", 2);
C([
  a({ type: Boolean, reflect: !0, converter: g })
], x.prototype, "loading", 1);
C([
  a({ type: Array })
], x.prototype, "options", 2);
C([
  a()
], x.prototype, "value", 1);
C([
  a({ type: String })
], x.prototype, "name", 2);
C([
  a({ type: String })
], x.prototype, "id", 2);
C([
  a({ type: Boolean, reflect: !0, converter: g })
], x.prototype, "disabled", 1);
C([
  a({ type: Boolean, reflect: !0, converter: g })
], x.prototype, "required", 1);
C([
  a({ type: String, reflect: !0 })
], x.prototype, "appearance", 2);
C([
  a({ type: String, reflect: !0 })
], x.prototype, "size", 2);
C([
  a({ type: Boolean, reflect: !0, attribute: "marginless", converter: g })
], x.prototype, "marginless", 1);
C([
  a({ type: Boolean, converter: J })
], x.prototype, "withHint", 1);
C([
  a({ type: Boolean, converter: J })
], x.prototype, "filterable", 1);
C([
  a({ type: Boolean, reflect: !0, converter: g })
], x.prototype, "grouped", 1);
C([
  a({ type: Boolean, reflect: !0, converter: g })
], x.prototype, "multiple", 1);
C([
  a({ type: Boolean, attribute: "allow-clear", converter: J })
], x.prototype, "allowClear", 1);
C([
  a({ type: String, attribute: "required-indicator" })
], x.prototype, "requiredIndicator", 2);
C([
  b()
], x.prototype, "_slottedOptions", 2);
C([
  b()
], x.prototype, "_hasSlottedHint", 2);
C([
  b()
], x.prototype, "_open", 2);
C([
  b()
], x.prototype, "_focused", 2);
C([
  b()
], x.prototype, "_touched", 2);
C([
  b()
], x.prototype, "_invalid", 2);
C([
  b()
], x.prototype, "_filterQuery", 2);
C([
  b()
], x.prototype, "_focusedIndex", 2);
customElements.get(co) || customElements.define(co, x);
const Ba = 2, Ha = 4, Ra = 16, Ya = v`
  :host {
    --slider-track-height: ${Ba}px;
    --slider-fill-height: ${Ha}px;
    --slider-thumb-size: ${Ra}px;
    display: inline-block;
  }

  :host([disabled]) {
    pointer-events: none;
    opacity: 0.6;
  }

  .swim-slider__inner {
    margin: 1em auto;
    position: relative;
    display: inline-block;
  }

  .swim-slider__inputs {
    position: relative;
    min-width: 12.5em;
    height: var(--slider-thumb-size);
  }

  .swim-slider__input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 1;
    appearance: none;
    background-color: transparent;
    margin: 0;
    cursor: pointer;
  }

  .swim-slider__input:focus {
    outline: none;
  }

  .swim-slider__input:focus-visible {
    outline: 2px solid var(--blue-200);
    outline-offset: 2px;
  }

  .swim-slider__input::-webkit-slider-runnable-track {
    cursor: pointer;
    color: transparent;
    background: transparent;
    border-color: transparent;
    appearance: none;
  }

  .swim-slider__input::-moz-range-track {
    cursor: pointer;
    color: transparent;
    background: transparent;
    border-color: transparent;
    appearance: none;
  }

  .swim-slider__input::-ms-track {
    cursor: pointer;
    color: transparent;
    background: transparent;
    border-color: transparent;
    appearance: none;
  }

  .swim-slider__input::-webkit-slider-thumb {
    border: none;
    width: var(--slider-thumb-size);
    height: var(--slider-thumb-size);
    appearance: none;
    position: relative;
    background: transparent;
    border-color: transparent;
    cursor: pointer;
    z-index: 301;
    color: transparent;
  }

  .swim-slider__input::-moz-range-thumb {
    border: none;
    width: var(--slider-thumb-size);
    height: var(--slider-thumb-size);
    appearance: none;
    position: relative;
    background: transparent;
    border-color: transparent;
    cursor: pointer;
    z-index: 302;
    transform: scale(1);
  }

  .swim-slider__input::-ms-thumb {
    border: none;
    width: var(--slider-thumb-size);
    height: var(--slider-thumb-size);
    appearance: none;
    position: relative;
    background: transparent;
    border-color: transparent;
    cursor: pointer;
    z-index: 302;
    transform: scale(1);
  }

  .swim-slider__track {
    position: absolute;
    background-color: var(--blue-400);
    width: 100%;
    height: var(--slider-track-height);
    top: calc(var(--slider-thumb-size) * 0.5 - var(--slider-track-height) * 0.5);
    pointer-events: none;
    opacity: 0.3;
  }

  .swim-slider__thumb {
    position: absolute;
    background-color: var(--blue-400);
    height: var(--slider-thumb-size);
    width: var(--slider-thumb-size);
    border-radius: calc(var(--slider-thumb-size) * 0.5);
    pointer-events: none;
    z-index: 100;
    box-shadow: 0 0 0 0 color-mix(in srgb, var(--blue-400) 30%, transparent);
    transition: box-shadow 0.3s ease-in-out;
    top: 0;
  }

  .swim-slider__thumb--active {
    box-shadow: 0 0 0 5px color-mix(in srgb, var(--blue-400) 30%, transparent);
  }

  .swim-slider__ticks {
    position: absolute;
    display: block;
    top: 0;
    width: 100%;
    height: 3px;
    opacity: 0.3;
  }

  .swim-slider__tick {
    position: absolute;
    border: none;
    height: 100%;
    width: 2px;
    background-color: var(--blue-400);
  }

  .swim-slider--filled .swim-slider__fill {
    background-repeat: no-repeat;
    background-image: linear-gradient(var(--blue-400), var(--blue-400));
    position: absolute;
    border-radius: 0;
    z-index: 99;
    pointer-events: none;
    height: var(--slider-fill-height);
    left: 0;
    top: calc(50% - var(--slider-fill-height) * 0.5);
    width: 100%;
  }

  .swim-slider--vertical {
    display: inline-block;
    height: initial;
    min-height: 12.5em;
    width: var(--slider-thumb-size);
  }

  .swim-slider--vertical .swim-slider__inner {
    transform: translate(0%, -100%) rotate(-90deg) translate(-100%, 0);
    transform-origin: top left;
  }
`;
var ja = Object.defineProperty, Va = Object.getOwnPropertyDescriptor, $ = (o, e, t, i) => {
  for (var s = i > 1 ? void 0 : i ? Va(e, t) : e, r = o.length - 1, n; r >= 0; r--)
    (n = o[r]) && (s = (i ? n(e, t, s) : n(s)) || s);
  return i && s && ja(e, t, s), s;
};
let Na = 0;
const ho = "swim-slider", $t = class $t extends y {
  constructor() {
    super(), this.id = `swim-slider-${++Na}`, this._min = 0, this._max = 100, this._step = 1, this.orientation = "horizontal", this._filled = !1, this._multiple = !1, this._disabled = !1, this._showTicks = !1, this.ariaLabel = "", this._values = [0], this._active = [], this._internals = this.attachInternals();
  }
  get min() {
    return this._min;
  }
  set min(e) {
    this._min = T(e, 0);
  }
  get max() {
    return this._max;
  }
  set max(e) {
    this._max = T(e, 100);
  }
  get step() {
    return this._step;
  }
  set step(e) {
    this._step = T(e, 1);
  }
  get filled() {
    return this._filled;
  }
  set filled(e) {
    this._filled = p(e);
  }
  get multiple() {
    return this._multiple;
  }
  set multiple(e) {
    this._multiple = p(e);
  }
  get disabled() {
    return this._disabled;
  }
  set disabled(e) {
    this._disabled = p(e);
  }
  get showTicks() {
    return this._showTicks;
  }
  set showTicks(e) {
    this._showTicks = p(e);
  }
  get tickStep() {
    return this._tickStep ?? this._step;
  }
  set tickStep(e) {
    this._tickStep = e != null ? T(e, this._step) : void 0;
  }
  get value() {
    return this._values.length ? this.multiple ? [...this._values].sort((e, t) => e - t).join(",") : String(this._values[0]) : String(this._min);
  }
  set value(e) {
    const t = e != null ? String(e) : "", s = (t ? t.split(",").map((n) => T(n.trim(), this._min)) : [this._min]).map((n) => Math.max(this._min, Math.min(this._max, n)));
    let r;
    this.multiple ? r = s.length >= 2 ? s : s.length === 1 ? [s[0], this._max] : [this._min, this._max] : r = s.slice(0, 1), (r.length !== this._values.length || r.some((n, l) => n !== this._values[l])) && (this._values = r, this._syncFormValue());
  }
  connectedCallback() {
    super.connectedCallback(), (this._values.length === 0 || this._values.length === 1 && this._values[0] === 0 && this._min !== 0) && (this._values = this.multiple ? [this._min, this._max] : [this._min], this._syncFormValue());
  }
  updated(e) {
    super.updated(e), (e.has("value") || e.has("min") || e.has("max")) && this._syncFormValue();
  }
  _syncFormValue() {
    this._internals.setFormValue(this.value);
  }
  get _percents() {
    const e = this._max - this._min || 1;
    return this._values.map((t) => Math.round(100 * (Math.max(this._min, Math.min(this._max, t)) - this._min) / e));
  }
  get _thumbs() {
    return this._percents.map((e) => ({
      left: `calc(${e}% - ${e / 100}em)`
    }));
  }
  get _fill() {
    if (!this.filled) return null;
    const e = this._percents, t = this.multiple ? Math.min(...e) : 0, s = (this.multiple ? Math.max(...e) : e[0]) - t;
    return {
      left: `${t}%`,
      width: `${s}%`
    };
  }
  get _tickStepValue() {
    return this._tickStep ?? this._step;
  }
  get _ticks() {
    if (!this.showTicks) return [];
    const e = this._tickStepValue, t = [];
    let i = this._min;
    for (; i <= this._max; )
      t.push(i), i += e;
    const s = this._max - this._min || 1;
    return t.map((r) => {
      const n = 100 * (r - this._min) / s;
      return { left: `calc(${n}% - ${n / 100 - 0.5}em)` };
    });
  }
  _setValue(e, t) {
    const i = T(e, this._min), s = Math.max(this._min, Math.min(this._max, i));
    if (this._values[t] !== s) {
      const r = [...this._values];
      r[t] = s, this._values = r, this._syncFormValue(), this._emitChange();
    }
  }
  _onChange(e) {
    this._emitChange();
  }
  _emitChange() {
    const e = this.value, t = this.multiple ? this._percents.join(",") : String(this._percents[0]);
    this.dispatchEvent(
      new CustomEvent("change", {
        detail: { value: this.multiple ? e : Number(e), percent: t },
        bubbles: !1,
        composed: !1
      })
    );
  }
  _setActive(e, t) {
    const i = [...this._active];
    i[e] = t, this._active = i;
  }
  _ensureValuesLength() {
    this.multiple && this._values.length < 2 ? this._values = [this._min, this._max] : !this.multiple && this._values.length > 1 && (this._values = [this._values[0]]);
  }
  willUpdate(e) {
    this._ensureValuesLength();
  }
  firstUpdated() {
    this._ensureValuesLength();
  }
  _onRangeInput(e, t) {
    const i = e.target.value;
    this._setValue(Number(i), t);
  }
  render() {
    const e = this.orientation === "vertical";
    return c`
      <div
        class="swim-slider ${e ? "swim-slider--vertical" : ""} ${this.filled ? "swim-slider--filled" : ""} ${this.multiple ? "swim-slider--multiple" : ""}"
        role="group"
        aria-label="${this.ariaLabel || void 0}"
      >
        <div class="swim-slider__inner">
          ${this.showTicks ? c`
                <div class="swim-slider__ticks" aria-hidden="true">
                  ${this._ticks.map((t) => c`<div class="swim-slider__tick" style="left: ${t.left}"></div>`)}
                </div>
              ` : ""}
          <div class="swim-slider__inputs">
            <div class="swim-slider__track" part="track" aria-hidden="true"></div>
            ${this._fill ? c`
                  <span
                    class="swim-slider__fill"
                    part="fill"
                    style="left: ${this._fill.left}; width: ${this._fill.width}"
                    aria-hidden="true"
                  ></span>
                ` : ""}
            ${this._values.map((t, i) => {
      const s = this._thumbs[i], r = this._active[i], n = `${this.id}-${i}`, l = this.ariaLabel ? `${this.ariaLabel}${this.multiple ? ` (thumb ${i + 1})` : ""}` : void 0;
      return c`
                <input
                  type="range"
                  class="swim-slider__input ${i % 2 === 1 ? "swim-slider__input--odd" : ""} ${r ? "swim-slider__input--active" : ""}"
                  id="${n}"
                  aria-valuemin="${this._min}"
                  aria-valuemax="${this._max}"
                  aria-valuenow="${t}"
                  aria-label="${l || void 0}"
                  .value="${String(t)}"
                  min="${this._min}"
                  max="${this._max}"
                  step="${this._step}"
                  ?disabled="${this.disabled}"
                  @input="${(d) => this._onRangeInput(d, i)}"
                  @change="${this._onChange}"
                  @mouseenter="${() => this._setActive(i, !0)}"
                  @mouseleave="${() => this._setActive(i, !1)}"
                  @focus="${() => this._setActive(i, !0)}"
                  @blur="${() => this._setActive(i, !1)}"
                />
                <div
                  class="swim-slider__thumb ${r ? "swim-slider__thumb--active" : ""}"
                  style="${s ? `left: ${s.left}` : ""}"
                  aria-hidden="true"
                  part="thumb"
                ></div>
              `;
    })}
          </div>
        </div>
      </div>
    `;
  }
};
$t.styles = [E, Ya], $t.formAssociated = !0;
let j = $t;
$([
  a({ type: String })
], j.prototype, "id", 2);
$([
  a({ type: Number })
], j.prototype, "min", 1);
$([
  a({ type: Number })
], j.prototype, "max", 1);
$([
  a({ type: Number })
], j.prototype, "step", 1);
$([
  a({ type: String, reflect: !0 })
], j.prototype, "orientation", 2);
$([
  a({ type: Boolean, reflect: !0, converter: g })
], j.prototype, "filled", 1);
$([
  a({ type: Boolean, reflect: !0, converter: g })
], j.prototype, "multiple", 1);
$([
  a({ type: Boolean, reflect: !0, converter: g })
], j.prototype, "disabled", 1);
$([
  a({ type: Boolean, attribute: "show-ticks", converter: g })
], j.prototype, "showTicks", 1);
$([
  a({ type: Number, attribute: "tick-step" })
], j.prototype, "tickStep", 1);
$([
  a({ type: String, attribute: "aria-label" })
], j.prototype, "ariaLabel", 2);
$([
  a({ type: String })
], j.prototype, "value", 1);
$([
  b()
], j.prototype, "_values", 2);
$([
  b()
], j.prototype, "_active", 2);
customElements.get(ho) || customElements.define(ho, j);
const qa = v`
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
`, Ua = [E, qa];
var Ke = /* @__PURE__ */ ((o) => (o.Row = "row", o.Column = "column", o))(Ke || {});
function ot(o) {
  const e = String(o).indexOf("calc") > -1;
  return String(o).indexOf("%") > -1 && !e;
}
function ue(o) {
  return typeof o == "string" ? Number(o.replace(/%/g, "").replace(/px/g, "").trim()) : o;
}
function Go(o, e, t, i, s, r) {
  let n = o ? ot(o) ? ue(o) : ue(o) / r : 0, l = e ? ot(e) ? ue(e) : ue(e) / r : 100;
  return n = Math.max(n, i === "0" ? s : 0), l = Math.min(l, t === "0" ? s : 100), [n, l];
}
function uo(o, e, t) {
  const [i, s, r] = o.currentFlexParts, n = ot(r), l = ue(r), d = o.initialFlexParts[2], h = ot(d) ? ue(d) : ue(d) / t, w = n ? l * t : l;
  let m = w + e, f = m / t;
  const [_, P] = Go(o.minBasis, o.maxBasis, i, s, h, t);
  return f = Math.max(f, _), f = Math.min(f, P), m = f * t, o.updateBasis(n ? f + "%" : m + "px"), m - w;
}
var Ga = Object.defineProperty, $o = (o, e, t, i) => {
  for (var s = void 0, r = o.length - 1, n; r >= 0; r--)
    (n = o[r]) && (s = n(e, t, s) || s);
  return s && Ga(e, t, s), s;
};
const po = "swim-split", Zi = class Zi extends y {
  constructor() {
    super(...arguments), this.direction = Ke.Row, this._areas = [], this._handles = [], this._handleListeners = /* @__PURE__ */ new Map(), this._onSlotChange = () => {
      this._collectAreasAndHandles(), this._removeHandleListeners(), this._attachHandleListeners();
    };
  }
  connectedCallback() {
    super.connectedCallback(), this.addEventListener("slotchange", this._onSlotChange);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.removeEventListener("slotchange", this._onSlotChange), this._removeHandleListeners();
  }
  updated(e) {
    e.has("direction") && this._handles.forEach((t) => {
      t.direction = this.direction;
    });
  }
  firstUpdated() {
    requestAnimationFrame(() => {
      this._collectAreasAndHandles(), this._attachHandleListeners();
    });
  }
  _collectAreasAndHandles() {
    if (!this.slotEl) return;
    const e = this.slotEl.assignedElements({ flatten: !0 });
    this._areas = e.filter((t) => {
      var i;
      return ((i = t.tagName) == null ? void 0 : i.toLowerCase()) === "swim-split-area";
    }), this._handles = e.filter((t) => {
      var i;
      return ((i = t.tagName) == null ? void 0 : i.toLowerCase()) === "swim-split-handle";
    }), this._handles.forEach((t) => {
      t.direction = this.direction;
    });
  }
  _attachHandleListeners() {
    this._handles.forEach((e) => {
      const t = (s) => {
        const r = s.detail;
        r && this._onDrag(r);
      }, i = () => this._onDblClick();
      this._handleListeners.set(e, { drag: t, dblclick: i }), e.addEventListener("drag", t), e.addEventListener("dblclick", i);
    });
  }
  _removeHandleListeners() {
    this._handles.forEach((e) => {
      const t = this._handleListeners.get(e);
      t && (e.removeEventListener("drag", t.drag), e.removeEventListener("dblclick", t.dblclick), this._handleListeners.delete(e));
    });
  }
  _resize(e) {
    const s = (this.direction === Ke.Row ? this.clientWidth : this.clientHeight) / 100, r = this._areas;
    if (r.length === 0) return;
    const [n, ...l] = r;
    let d = e;
    d = uo(n, d, s), l.forEach((h) => {
      d += uo(h, -d, s);
    });
  }
  _onDrag(e) {
    const t = this.direction === Ke.Row ? e.movementX : e.movementY;
    this._resize(t);
  }
  _onDblClick() {
    const i = (this.direction === Ke.Row ? this.clientWidth : this.clientHeight) / 100, r = this._areas[0];
    if (!r) return;
    const [n, l, d] = r.currentFlexParts, h = ot(d), w = ue(d), f = (h ? w * i : w) / i, _ = r.initialFlexParts[2], P = ot(_) ? ue(_) : ue(_) / i, [ne, lt] = Go(
      r.minBasis,
      r.maxBasis,
      n,
      l,
      P,
      i
    ), ct = f - ne, rs = lt - f, Xo = (ct < rs ? rs : -ct) * i;
    this._resize(Xo);
  }
  render() {
    return c`<slot></slot>`;
  }
};
Zi.styles = Ua;
let kt = Zi;
$o([
  a({ type: String, reflect: !0 })
], kt.prototype, "direction");
$o([
  N("slot")
], kt.prototype, "slotEl");
customElements.get(po) || customElements.define(po, kt);
const $a = v`
  :host {
    overflow: hidden;
    box-sizing: border-box;
    min-height: 0;
  }
`, Wa = [E, $a];
function Wo(o) {
  const [e, t, i] = o;
  return `${e} ${t} ${i}`;
}
function et(o, e, t) {
  const i = t.split(" ");
  return i.length === 3 ? i : [o, e, t];
}
var Qa = Object.defineProperty, Za = Object.getOwnPropertyDescriptor, Zt = (o, e, t, i) => {
  for (var s = i > 1 ? void 0 : i ? Za(e, t) : e, r = o.length - 1, n; r >= 0; r--)
    (n = o[r]) && (s = (i ? n(e, t, s) : n(s)) || s);
  return i && s && Qa(e, t, s), s;
};
const ut = "1 1 1e-9px", mo = "swim-split-area", Xi = class Xi extends y {
  constructor() {
    super(...arguments), this._areaBasis = ut, this.shouldAdjustMaxMin = !1, this.initialFlexParts = et("1", "1", ut), this.currentFlexParts = et("1", "1", ut);
  }
  get areaBasis() {
    return this._areaBasis;
  }
  set areaBasis(e) {
    this._areaBasis !== e && (this._areaBasis = e || ut, this._applyBasis());
  }
  connectedCallback() {
    super.connectedCallback(), this._applyBasis();
  }
  updated() {
    this.style.flex = Wo(this.currentFlexParts), this.shouldAdjustMaxMin && this.currentFlexParts[2] ? (this.style.minWidth = this.currentFlexParts[2], this.style.maxWidth = this.currentFlexParts[2]) : (this.style.minWidth = "", this.style.maxWidth = "");
  }
  updateBasis(e) {
    this.currentFlexParts[2] = e, this.requestUpdate();
  }
  _applyBasis() {
    const e = this._areaBasis || ut, [t, i, s] = et("1", "1", e);
    this.currentFlexParts = [t, i, s], this.initialFlexParts = [t, i, s], !this.minBasis && i === "0" && (this.minBasis = s), !this.maxBasis && t === "0" && (this.maxBasis = s), this.requestUpdate();
  }
  render() {
    return c`<slot></slot>`;
  }
};
Xi.styles = Wa;
let Ne = Xi;
Zt([
  a({ type: String, attribute: "area-basis" })
], Ne.prototype, "areaBasis", 1);
Zt([
  a({ type: String, attribute: "min-basis" })
], Ne.prototype, "minBasis", 2);
Zt([
  a({ type: String, attribute: "max-basis" })
], Ne.prototype, "maxBasis", 2);
Zt([
  a({ type: Boolean, attribute: "should-adjust-max-min", converter: g })
], Ne.prototype, "shouldAdjustMaxMin", 2);
customElements.get(mo) || customElements.define(mo, Ne);
const Xa = v`
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
`, Ka = [E, Xa];
var Ja = Object.defineProperty, el = Object.getOwnPropertyDescriptor, Qo = (o, e, t, i) => {
  for (var s = i > 1 ? void 0 : i ? el(e, t) : e, r = o.length - 1, n; r >= 0; r--)
    (n = o[r]) && (s = (i ? n(e, t, s) : n(s)) || s);
  return i && s && Ja(e, t, s), s;
};
const Dt = "0 0 15px", bo = "swim-split-handle", Ki = class Ki extends y {
  constructor() {
    super(...arguments), this._handleBasis = Dt, this.direction = Ke.Row, this.currentFlexParts = et("0", "0", Dt), this._boundMouseUp = this._onMouseUp.bind(this), this._boundMouseMove = this._onMouseMove.bind(this);
  }
  get handleBasis() {
    return this._handleBasis;
  }
  set handleBasis(e) {
    this._handleBasis !== e && (this._handleBasis = e || Dt, this.currentFlexParts = et("0", "0", this._handleBasis), this.requestUpdate());
  }
  connectedCallback() {
    super.connectedCallback(), this.currentFlexParts = et("0", "0", this._handleBasis || Dt);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), document.removeEventListener("mouseup", this._boundMouseUp, !0), document.removeEventListener("mousemove", this._boundMouseMove, !0);
  }
  updated() {
    this.style.flex = Wo(this.currentFlexParts);
  }
  _onMouseDown(e) {
    e.preventDefault(), document.addEventListener("mouseup", this._boundMouseUp, !0), document.addEventListener("mousemove", this._boundMouseMove, !0), this.dispatchEvent(new CustomEvent("dragstart", { detail: e, bubbles: !1, composed: !1 }));
  }
  _onMouseMove(e) {
    this.dispatchEvent(new CustomEvent("drag", { detail: e, bubbles: !1, composed: !1 }));
  }
  _onMouseUp(e) {
    document.removeEventListener("mouseup", this._boundMouseUp, !0), document.removeEventListener("mousemove", this._boundMouseMove, !0), this.dispatchEvent(new CustomEvent("dragend", { detail: e, bubbles: !1, composed: !1 }));
  }
  _onDblClick(e) {
    this.dispatchEvent(new CustomEvent("dblclick", { detail: e, bubbles: !1, composed: !1 }));
  }
  render() {
    return c`
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
Ki.styles = Ka;
let Ct = Ki;
Qo([
  a({ type: String, attribute: "handle-basis" })
], Ct.prototype, "handleBasis", 1);
Qo([
  a({ type: String, reflect: !0 })
], Ct.prototype, "direction", 2);
customElements.get(bo) || customElements.define(bo, Ct);
const tl = v`
  ${E}

  @keyframes swim-progress-spinner--rotate {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  :host {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .swim-progress-spinner__container {
    display: inline-flex;
    border-radius: 100%;
    overflow: hidden;
    box-shadow: 0 0 10px 0 var(--spinner-color);
    position: relative;
  }

  .swim-progress-spinner__svg {
    display: block;
  }

  .swim-progress-spinner__circle {
    fill: transparent;
    transition: 0.1s stroke-dashoffset;
    transform: rotate(-90deg);
    transform-origin: 50% 50%;
    stroke: var(--spinner-color);
  }

  .swim-progress-spinner__icon-in-progress,
  .swim-progress-spinner__icon-complete,
  .swim-progress-spinner__icon-failure {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
  }

  /* Size and color for slotted or property-driven swim-icon in center */
  .swim-progress-spinner__icon-in-progress swim-icon,
  .swim-progress-spinner__icon-complete swim-icon,
  .swim-progress-spinner__icon-failure swim-icon {
    font-size: var(--font-size-5xl);
    color: var(--spinner-color);
  }

  .swim-progress-spinner__icon-failure swim-icon {
    color: var(--color-error, var(--red-500));
  }

  .swim-progress-spinner__label {
    margin-top: var(--spacing-24, 24px);
  }

  .swim-progress-spinner__label h4 {
    font-weight: var(--font-weight-semibold);
    font-size: var(--font-size-2xl);
    line-height: 30px;
    text-align: center;
    color: var(--white);
    margin: 0;
  }

  /* Indeterminate: rotating circle */
  :host([mode='indeterminate']) .swim-progress-spinner__circle {
    animation: swim-progress-spinner--rotate 1s linear infinite;
  }
`;
var Ze = /* @__PURE__ */ ((o) => (o.Indeterminate = "indeterminate", o.Determinate = "determinate", o))(Ze || {}), Ee = /* @__PURE__ */ ((o) => (o.Default = "default", o.Icon = "icon", o))(Ee || {}), il = Object.defineProperty, sl = Object.getOwnPropertyDescriptor, ee = (o, e, t, i) => {
  for (var s = i > 1 ? void 0 : i ? sl(e, t) : e, r = o.length - 1, n; r >= 0; r--)
    (n = o[r]) && (s = (i ? n(e, t, s) : n(s)) || s);
  return i && s && il(e, t, s), s;
};
const ol = 50, rl = 100, gi = 100, Ot = gi / 2, nl = Ot * 2 * Math.PI, al = "cloud-upload", ll = "check", cl = "x", fo = "swim-progress-spinner", Ji = class Ji extends y {
  constructor() {
    super(...arguments), this.mode = Ze.Indeterminate, this.color = "var(--blue-500)", this.failStatusColor = "var(--red-500)", this.appearance = Ee.Default, this.inProgressIconName = "", this.completeIconName = "", this.failIconName = "", this._isFailure = !1, this._value = 0, this._total = 100, this._diameter = 100, this._strokeWidth = 3, this._boundSlotChange = () => this.requestUpdate();
  }
  get isFailure() {
    return this._isFailure;
  }
  set isFailure(e) {
    this._isFailure = p(e);
  }
  get value() {
    return this._value;
  }
  set value(e) {
    const t = T(e, 0);
    this._value !== t && (this._value = t);
  }
  get total() {
    return this._total;
  }
  set total(e) {
    const t = T(e, 100);
    this._total !== t && (this._total = t);
  }
  get diameter() {
    return this._diameter;
  }
  set diameter(e) {
    const t = T(e, 100);
    this._diameter !== t && (this._diameter = t);
  }
  get strokeWidth() {
    return this._strokeWidth;
  }
  set strokeWidth(e) {
    const t = T(e, 3);
    this._strokeWidth !== t && (this._strokeWidth = t);
  }
  /** Circumference in viewBox units for stroke-dasharray/offset (fixed viewBox 0 0 100 100). */
  get circumference() {
    return nl;
  }
  get modeValue() {
    return this.mode === Ze.Determinate || this.isComplete ? this.value : ol;
  }
  get modeTotal() {
    return this.mode === Ze.Determinate || this.isComplete ? this.total : rl;
  }
  get percentage() {
    return 100 / this.modeTotal * this.modeValue;
  }
  get isComplete() {
    return this.value >= this.total && this.total > 0;
  }
  get spinnerColor() {
    return this.isComplete && this.isFailure ? this.failStatusColor : this.color;
  }
  get strokeDasharray() {
    return `${this.circumference} ${this.circumference}`;
  }
  get strokeDashoffset() {
    return this.circumference - this.percentage / 100 * this.circumference;
  }
  hasSlotContent(e) {
    var i;
    const t = (i = this.shadowRoot) == null ? void 0 : i.querySelector(`slot[name="${e}"]`);
    return !!(t != null && t.assignedNodes().length);
  }
  connectedCallback() {
    super.connectedCallback(), this.addEventListener("slotchange", this._boundSlotChange);
  }
  disconnectedCallback() {
    this.removeEventListener("slotchange", this._boundSlotChange), super.disconnectedCallback();
  }
  /** Resolved icon name for in-progress: slot/prop or default. */
  get effectiveInProgressIcon() {
    return this.hasSlotContent("in-progress-icon") ? "" : this.inProgressIconName || (this.appearance === Ee.Icon ? al : "");
  }
  /** Resolved icon name for complete: slot/prop or default. */
  get effectiveCompleteIcon() {
    return this.hasSlotContent("complete-icon") ? "" : this.completeIconName || (this.appearance === Ee.Icon ? ll : "");
  }
  /** Resolved icon name for failure: slot/prop or default. */
  get effectiveFailIcon() {
    return this.hasSlotContent("fail-icon") ? "" : this.failIconName || (this.appearance === Ee.Icon ? cl : "");
  }
  render() {
    const e = this.appearance === Ee.Icon && !this.isComplete && (this.effectiveInProgressIcon || this.hasSlotContent("in-progress-icon")), t = this.appearance === Ee.Icon && this.isComplete && !this.isFailure && (this.effectiveCompleteIcon || this.hasSlotContent("complete-icon")), i = this.appearance === Ee.Icon && this.isComplete && this.isFailure && (this.effectiveFailIcon || this.hasSlotContent("fail-icon"));
    return c`
      <div
        class="swim-progress-spinner__container ${this.appearance === Ee.Icon ? "swim-progress-spinner__container--icon" : ""}"
        part="container"
        style="--spinner-color: ${this.spinnerColor}"
        role="progressbar"
        aria-valuenow="${this.mode === Ze.Determinate ? this.value : u}"
        aria-valuemin="0"
        aria-valuemax="${this.mode === Ze.Determinate ? this.total : u}"
        aria-label="Progress"
      >
        <svg
          class="swim-progress-spinner__svg"
          viewBox="0 0 ${gi} ${gi}"
          width="${this.diameter}"
          height="${this.diameter}"
          aria-hidden="true"
          focusable="false"
        >
          <circle
            class="swim-progress-spinner__circle"
            stroke-width="${this.strokeWidth}"
            stroke-dasharray="${this.strokeDasharray}"
            stroke-dashoffset="${this.strokeDashoffset}"
            r="${Ot}"
            cx="${Ot}"
            cy="${Ot}"
          ></circle>
        </svg>

        ${e ? c`
              <div class="swim-progress-spinner__icon-in-progress">
                ${this.hasSlotContent("in-progress-icon") ? c`<slot name="in-progress-icon"></slot>` : c`<swim-icon font-icon="${this.effectiveInProgressIcon}"></swim-icon>`}
              </div>
            ` : t ? c`
              <div class="swim-progress-spinner__icon-complete">
                ${this.hasSlotContent("complete-icon") ? c`<slot name="complete-icon"></slot>` : c`<swim-icon font-icon="${this.effectiveCompleteIcon}"></swim-icon>`}
              </div>
            ` : i ? c`
              <div class="swim-progress-spinner__icon-failure">
                ${this.hasSlotContent("fail-icon") ? c`<slot name="fail-icon"></slot>` : c`<swim-icon font-icon="${this.effectiveFailIcon}"></swim-icon>`}
              </div>
            ` : u}
      </div>

      ${this.spinnerLabel ? c`
            <div class="swim-progress-spinner__label" part="label">
              ${!this.isComplete && this.spinnerLabel.inProgressLabel ? c`<h4>${this.spinnerLabel.inProgressLabel}</h4>` : this.isComplete && !this.isFailure && this.spinnerLabel.completeLabel ? c`<h4>${this.spinnerLabel.completeLabel}</h4>` : this.isComplete && this.isFailure && this.spinnerLabel.failLabel ? c`<h4>${this.spinnerLabel.failLabel}</h4>` : u}
            </div>
          ` : u}
    `;
  }
};
Ji.styles = tl;
let V = Ji;
ee([
  a({ type: String, reflect: !0 })
], V.prototype, "mode", 2);
ee([
  a({ type: String })
], V.prototype, "color", 2);
ee([
  a({ attribute: "fail-status-color", type: String })
], V.prototype, "failStatusColor", 2);
ee([
  a({ type: String, reflect: !0 })
], V.prototype, "appearance", 2);
ee([
  a({ type: String, attribute: "in-progress-icon-name" })
], V.prototype, "inProgressIconName", 2);
ee([
  a({ type: String, attribute: "complete-icon-name" })
], V.prototype, "completeIconName", 2);
ee([
  a({ type: String, attribute: "fail-icon-name" })
], V.prototype, "failIconName", 2);
ee([
  a({ type: Boolean, reflect: !0, attribute: "is-failure", converter: g })
], V.prototype, "isFailure", 1);
ee([
  a({ attribute: !1 })
], V.prototype, "spinnerLabel", 2);
ee([
  a({ type: Number })
], V.prototype, "value", 1);
ee([
  a({ type: Number })
], V.prototype, "total", 1);
ee([
  a({ type: Number })
], V.prototype, "diameter", 1);
ee([
  a({ attribute: "stroke-width", type: Number })
], V.prototype, "strokeWidth", 1);
customElements.get(fo) || customElements.define(fo, V);
const dl = v`
  :host {
    display: block;
  }

  .swim-tab__panel {
    display: block;
  }

  .swim-tab__panel[hidden] {
    display: none;
  }
`;
var hl = Object.defineProperty, ul = Object.getOwnPropertyDescriptor, at = (o, e, t, i) => {
  for (var s = i > 1 ? void 0 : i ? ul(e, t) : e, r = o.length - 1, n; r >= 0; r--)
    (n = o[r]) && (s = (i ? n(e, t, s) : n(s)) || s);
  return i && s && hl(e, t, s), s;
};
let pl = 0;
const go = "swim-tab", es = class es extends y {
  constructor() {
    super(...arguments), this._instanceId = ++pl, this._generatedPanelId = `tab-panel-${this._instanceId}`, this._generatedTabId = `tab-${this._instanceId}`, this.tabId = this._generatedTabId, this.label = "", this._active = !1, this._disabled = !1;
  }
  get id() {
    return this._id ?? this._generatedPanelId;
  }
  set id(e) {
    this._id = e || this._generatedPanelId;
  }
  get title() {
    return this.label;
  }
  set title(e) {
    this.label = e;
  }
  get active() {
    return this._active;
  }
  set active(e) {
    const t = p(e);
    if (this._active !== t) {
      const i = this._active;
      this._active = t, this.requestUpdate("active", i), this.dispatchEvent(new CustomEvent("swim-tab-active-change", { bubbles: !1, composed: !1 }));
    }
  }
  get disabled() {
    return this._disabled;
  }
  set disabled(e) {
    this._disabled = p(e);
  }
  connectedCallback() {
    super.connectedCallback(), this.hasAttribute("tab-id") || (this.tabId = this._generatedTabId);
  }
  render() {
    return c`
      <div
        class="swim-tab__panel"
        role="tabpanel"
        id="${this.id}"
        aria-labelledby="${this.tabId}"
        ?hidden="${!this.active}"
      >
        <slot></slot>
      </div>
    `;
  }
};
es.styles = [E, dl];
let ge = es;
at([
  a({ type: String })
], ge.prototype, "id", 1);
at([
  a({ type: String, attribute: "tab-id" })
], ge.prototype, "tabId", 2);
at([
  a({ type: String })
], ge.prototype, "label", 2);
at([
  a({ type: String })
], ge.prototype, "title", 1);
at([
  a({ type: Boolean, reflect: !0, converter: g })
], ge.prototype, "active", 1);
at([
  a({ type: Boolean, reflect: !0, converter: g })
], ge.prototype, "disabled", 1);
customElements.get(go) || customElements.define(go, ge);
const ml = v`
  :host {
    display: block;
    margin-bottom: 2em;
  }

  .swim-tabs {
    display: block;
  }

  /* Tab list – horizontal by default */
  .swim-tabs__list {
    display: block;
    border-bottom: solid 2px var(--grey-700);
  }

  .swim-tabs__tab {
    display: inline-block;
    border: none;
    color: var(--grey-250);
    background: transparent;
    box-shadow: none;
    font-size: var(--font-size-m);
    box-sizing: border-box;
    margin: 0;
    padding: 0.35em 0.75em;
    position: relative;
    text-align: center;
    user-select: none;
    font: inherit;
    font-weight: var(--font-weight-bold);
    bottom: -1px;
    cursor: pointer;
  }

  .swim-tabs__tab::after {
    content: '';
    height: 2px;
    position: absolute;
    width: 100%;
    left: 0;
    bottom: -1px;
    transition: transform 250ms ease;
    transform: scale(0);
    background: var(--blue-500);
    color: var(--white);
  }

  .swim-tabs__tab:not([disabled]):hover {
    border: none;
    color: var(--white);
    background: transparent;
    opacity: 1;
  }

  .swim-tabs__tab:not([disabled]):hover::after,
  .swim-tabs__tab--active::after {
    transform: scale(1);
  }

  .swim-tabs__tab--active,
  .swim-tabs__tab--active:focus,
  .swim-tabs__tab--active:hover {
    color: var(--white);
    border-width: 0;
  }

  .swim-tabs__tab:focus-visible {
    outline: 2px solid var(--blue-200);
    border-radius: var(--radius-2);
    outline-offset: 1px;
  }

  .swim-tabs__tab--disabled {
    pointer-events: none;
    opacity: 0.6;
  }

  /* Tab content area */
  .swim-tabs__content {
    padding: var(--spacing-10);
  }

  /* Light appearance */
  :host([appearance='light']) .swim-tabs {
    border: 2px solid var(--grey-700);
    box-shadow: var(--shadow-2);
  }

  :host([appearance='light']) .swim-tabs__list {
    background-color: var(--grey-700);
    border-bottom: 2px solid var(--grey-700);
    font-size: var(--font-size-s);
    line-height: 15px;
    font-weight: var(--font-weight-semibold);
    margin-left: -2px;
  }

  :host([appearance='light']) .swim-tabs__tab {
    height: 36px;
    padding: var(--spacing-8) 1.25em;
  }

  :host([appearance='light']) .swim-tabs__content {
    background-color: var(--grey-850);
  }

  /* Vertical layout */
  :host([vertical]) .swim-tabs {
    display: flex;
  }

  :host([vertical]) .swim-tabs__list {
    flex: 0 0 160px;
    border: none;
  }

  :host([vertical]) .swim-tabs__tab {
    height: 53px;
    width: 100%;
    text-align: left;
    font-size: var(--font-size-s);
    line-height: 45px;
    border: none !important;
    border-bottom: 1px solid var(--grey-700) !important;
    padding-left: 19px;
    font-weight: var(--font-weight-semibold);
  }

  :host([vertical]) .swim-tabs__tab::after {
    display: none;
  }

  :host([vertical]) .swim-tabs__content {
    flex: 1 1 100%;
  }

  /* Vertical + light */
  :host([vertical][appearance='light']) .swim-tabs__list {
    background-color: var(--grey-750);
    border-right: 2px solid var(--grey-700);
    border-left: 2px solid var(--grey-700);
  }

  :host([vertical][appearance='light']) .swim-tabs__tab {
    line-height: 38px;
  }

  :host([vertical][appearance='light']) .swim-tabs__tab:last-child {
    border: none !important;
    border-bottom: none !important;
  }

  :host([vertical][appearance='light']) .swim-tabs__content {
    background-color: var(--grey-750);
  }
`;
var Zo = /* @__PURE__ */ ((o) => (o.Legacy = "legacy", o.Light = "light", o))(Zo || {}), bl = Object.defineProperty, fl = Object.getOwnPropertyDescriptor, Xt = (o, e, t, i) => {
  for (var s = i > 1 ? void 0 : i ? fl(e, t) : e, r = o.length - 1, n; r >= 0; r--)
    (n = o[r]) && (s = (i ? n(e, t, s) : n(s)) || s);
  return i && s && bl(e, t, s), s;
};
const wo = "swim-tabs", ts = class ts extends y {
  constructor() {
    super(...arguments), this._vertical = !1, this.appearance = Zo.Legacy, this._tabs = [], this._slotChangeBound = () => this._syncTabs(), this._tabActiveChangeBound = () => this.requestUpdate();
  }
  get vertical() {
    return this._vertical;
  }
  set vertical(e) {
    this._vertical = p(e);
  }
  connectedCallback() {
    super.connectedCallback();
  }
  firstUpdated() {
    this._syncTabs(), this._listenToTabChanges();
    const e = this.slotEl;
    e && e.addEventListener("slotchange", this._slotChangeBound);
  }
  disconnectedCallback() {
    var t;
    const e = (t = this.shadowRoot) == null ? void 0 : t.querySelector("slot");
    e && e.removeEventListener("slotchange", this._slotChangeBound), this._tabs.forEach((i) => i.removeEventListener("swim-tab-active-change", this._tabActiveChangeBound)), super.disconnectedCallback();
  }
  _listenToTabChanges() {
    this._tabs.forEach((e) => e.addEventListener("swim-tab-active-change", this._tabActiveChangeBound));
  }
  _syncTabs() {
    var r;
    const e = (r = this.shadowRoot) == null ? void 0 : r.querySelector("slot"), i = ((e == null ? void 0 : e.assignedElements({ flatten: !0 })) ?? []).filter((n) => n instanceof ge);
    this._tabs.forEach((n) => n.removeEventListener("swim-tab-active-change", this._tabActiveChangeBound)), this._tabs = i, this._listenToTabChanges();
    const s = i.filter((n) => n.active);
    s.length > 1 ? console.error('swim-tabs: Multiple active tabs set "active".') : s.length === 0 && i.length > 0 && (i[0].active = !0);
  }
  _tabClicked(e) {
    e.disabled || (this._tabs.forEach((t) => t.active = t === e), e.active = !0, this.dispatchEvent(
      new CustomEvent("select-tab", {
        detail: { tab: e },
        bubbles: !1,
        composed: !1
      })
    ), this.dispatchEvent(
      new CustomEvent("select", {
        detail: { tab: e },
        bubbles: !1,
        composed: !1
      })
    ));
  }
  _move(e) {
    const t = this._tabs, i = t.findIndex((s) => s.active);
    for (let s = i + e; s >= 0 && s < t.length; s += e) {
      const r = t[s];
      if (r && !r.disabled) {
        this._tabClicked(r);
        return;
      }
    }
  }
  /** Go to the previous tab. */
  prev() {
    this._move(-1);
  }
  /** Go to the next tab. */
  next() {
    this._move(1);
  }
  _handleKeyDown(e) {
    const t = this.vertical, i = e.key;
    t && (i === "ArrowUp" || i === "ArrowDown") ? (e.preventDefault(), this._move(i === "ArrowDown" ? 1 : -1)) : !t && (i === "ArrowLeft" || i === "ArrowRight") && (e.preventDefault(), this._move(i === "ArrowRight" ? 1 : -1));
  }
  render() {
    const e = this._tabs;
    return c`
      <section class="swim-tabs">
        <div class="swim-tabs__list" part="tablist" role="tablist" @keydown="${this._handleKeyDown}">
          ${e.map(
      (t) => c`
              <button
                type="button"
                role="tab"
                id="${t.tabId}"
                aria-controls="${t.id}"
                aria-selected="${t.active}"
                class="swim-tabs__tab ${t.active ? "swim-tabs__tab--active" : ""} ${t.disabled ? "swim-tabs__tab--disabled" : ""}"
                ?disabled="${t.disabled}"
                @click="${() => this._tabClicked(t)}"
              >
                ${t.label}
              </button>
            `
    )}
        </div>
        <div class="swim-tabs__content" part="tab-content">
          <slot></slot>
        </div>
      </section>
    `;
  }
};
ts.styles = [E, ml];
let qe = ts;
Xt([
  N("slot")
], qe.prototype, "slotEl", 2);
Xt([
  a({ type: Boolean, reflect: !0, converter: g })
], qe.prototype, "vertical", 1);
Xt([
  a({ type: String, reflect: !0 })
], qe.prototype, "appearance", 2);
Xt([
  b()
], qe.prototype, "_tabs", 2);
customElements.get(wo) || customElements.define(wo, qe);
const gl = v`
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
var wl = Object.defineProperty, _l = Object.getOwnPropertyDescriptor, Me = (o, e, t, i) => {
  for (var s = i > 1 ? void 0 : i ? _l(e, t) : e, r = o.length - 1, n; r >= 0; r--)
    (n = o[r]) && (s = (i ? n(e, t, s) : n(s)) || s);
  return i && s && wl(e, t, s), s;
};
let vl = 0;
const _o = "swim-toggle", Wt = class Wt extends y {
  constructor() {
    super(), this.id = `swim-toggle-${++vl}`, this.name = "", this.label = "", this._checked = !1, this._disabled = !1, this._required = !1, this._showIcons = !0, this._tabindex = 0, this._internals = this.attachInternals();
  }
  get checked() {
    return this._checked;
  }
  set checked(e) {
    const t = p(e);
    this._checked !== t && (this._checked = t, this._syncFormValue());
  }
  get disabled() {
    return this._disabled;
  }
  set disabled(e) {
    this._disabled = p(e);
  }
  get required() {
    return this._required;
  }
  set required(e) {
    this._required = p(e);
  }
  get showIcons() {
    return this._showIcons;
  }
  set showIcons(e) {
    this._showIcons = e != null ? p(e) : !0;
  }
  get tabindex() {
    return this._tabindex;
  }
  set tabindex(e) {
    this._tabindex = T(e, 0);
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
    return c`
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
          ${this.showIcons ? this._checked ? c`<span class="swim-toggle__icon swim-toggle__icon--on" aria-hidden="true"
                  ><swim-icon font-icon="check"></swim-icon
                ></span>` : c`<span class="swim-toggle__icon swim-toggle__icon--off" aria-hidden="true"
                  ><swim-icon font-icon="x"></swim-icon
                ></span>` : ""}
        </div>
        <label class="swim-toggle__text" part="text" id="${e}" for="${this.id}">
          ${this.label ? c`<span>${this.label}</span>` : ""}
          <slot></slot>
        </label>
      </div>
    `;
  }
};
Wt.styles = [E, gl], Wt.formAssociated = !0;
let se = Wt;
Me([
  N(".swim-toggle__roving")
], se.prototype, "_roving", 2);
Me([
  a({ type: String })
], se.prototype, "id", 2);
Me([
  a({ type: String })
], se.prototype, "name", 2);
Me([
  a({ type: String })
], se.prototype, "label", 2);
Me([
  a({ type: Boolean, reflect: !0, attribute: "checked", converter: g })
], se.prototype, "checked", 1);
Me([
  a({ type: Boolean, reflect: !0, converter: g })
], se.prototype, "disabled", 1);
Me([
  a({ type: Boolean, reflect: !0, converter: g })
], se.prototype, "required", 1);
Me([
  a({ type: Boolean, attribute: "show-icons", converter: J })
], se.prototype, "showIcons", 1);
Me([
  a({ type: Number })
], se.prototype, "tabindex", 1);
customElements.get(_o) || customElements.define(_o, se);
const yl = 40, xl = 2, kl = v`
  :host {
    --swim-navbar-bar-size: ${yl}px;
    --swim-navbar-bar-thickness: ${xl}px;
    display: inline-flex;
    align-items: center;
    min-height: 50px;
    position: relative;
    background-color: var(--grey-825);
    box-sizing: border-box;
  }

  .swim-navbar__nav-items {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }

  .swim-navbar__bar-track {
    min-height: var(--swim-navbar-bar-thickness);
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .swim-navbar__bar {
    position: absolute;
    width: var(--swim-navbar-bar-size);
    height: var(--swim-navbar-bar-thickness);
    background-color: var(--blue-500);
    transition: transform 300ms cubic-bezier(0.35, 0, 0.25, 1);
  }

  .swim-navbar__bar--bottom {
    bottom: 0;
  }

  .swim-navbar__bar--top {
    top: 0;
  }

  :host([bar-at-top]) .swim-navbar__bar-track {
    top: 0;
    bottom: auto;
  }
`, Cl = v`
  :host {
    display: flex;
    font-size: var(--font-size-xl);
    color: var(--grey-400);
    cursor: pointer;
    transition: color 0.2s ease-in-out;
    padding: var(--spacing-8) 10px var(--spacing-0) 10px;
    box-sizing: border-box;
  }

  :host(:focus) {
    outline: none;
  }

  :host(:focus-visible) {
    outline: 2px solid var(--blue-400);
    outline-offset: 2px;
    border-radius: var(--radius-2);
  }

  :host(:hover),
  :host(.swim-navbar-item--active) {
    color: var(--blue-400);
  }
`;
var El = Object.defineProperty, Al = Object.getOwnPropertyDescriptor, zi = (o, e, t, i) => {
  for (var s = Al(e, t), r = o.length - 1, n; r >= 0; r--)
    (n = o[r]) && (s = n(e, t, s) || s);
  return s && El(e, t, s), s;
};
const vo = "swim-navbar-item", is = class is extends y {
  constructor() {
    super(...arguments), this._active = 0, this._total = 0, this._index = 0, this._clickBound = () => this._handleClick();
  }
  get active() {
    return this._active;
  }
  set active(e) {
    const t = T(e, 0);
    if (this._active !== t) {
      const i = this._active;
      this._active = t, this.requestUpdate("active", i);
    }
  }
  get total() {
    return this._total;
  }
  set total(e) {
    this._total = T(e, 0);
  }
  get index() {
    return this._index;
  }
  set index(e) {
    const t = T(e, 0);
    if (this._index !== t) {
      const i = this._index;
      this._index = t, this.requestUpdate("index", i);
    }
  }
  connectedCallback() {
    super.connectedCallback(), this.addEventListener("click", this._clickBound);
  }
  disconnectedCallback() {
    this.removeEventListener("click", this._clickBound), super.disconnectedCallback();
  }
  render() {
    const e = this._active === this._index;
    return c`
      <div
        class="swim-navbar-item ${e ? "swim-navbar-item--active" : ""}"
        role="tab"
        aria-selected="${e}"
        tabindex="${e ? 0 : -1}"
        @keydown="${this._handleKeyDown}"
      >
        <slot></slot>
      </div>
    `;
  }
  /**
   * Activate this item (sets active to index and dispatches active-change).
   * Called by parent navbar or programmatically.
   */
  setActive() {
    this._active !== this._index && (this._active = this._index, this.requestUpdate(), this.dispatchEvent(
      new CustomEvent("active-change", {
        detail: this._index,
        bubbles: !1,
        composed: !1
      })
    ));
  }
  _handleClick() {
    this.setActive();
  }
  _handleKeyDown(e) {
    (e.key === "Enter" || e.key === " ") && (e.preventDefault(), this.setActive());
  }
};
is.styles = [E, Cl];
let Ue = is;
zi([
  a({ type: Number })
], Ue.prototype, "active");
zi([
  a({ type: Number })
], Ue.prototype, "total");
zi([
  a({ type: Number })
], Ue.prototype, "index");
customElements.get(vo) || customElements.define(vo, Ue);
var Sl = Object.defineProperty, Dl = Object.getOwnPropertyDescriptor, Kt = (o, e, t, i) => {
  for (var s = i > 1 ? void 0 : i ? Dl(e, t) : e, r = o.length - 1, n; r >= 0; r--)
    (n = o[r]) && (s = (i ? n(e, t, s) : n(s)) || s);
  return i && s && Sl(e, t, s), s;
};
const Ml = 40, yo = "swim-navbar", ss = class ss extends y {
  constructor() {
    super(...arguments), this._barAtTop = !1, this._active = 0, this._navItems = [], this._slotChangeBound = () => this._syncFromSlot(), this._activeChangeBound = (e) => this._onItemActiveChange(e);
  }
  get barAtTop() {
    return this._barAtTop;
  }
  set barAtTop(e) {
    this._barAtTop = p(e);
  }
  get active() {
    return this._active;
  }
  set active(e) {
    const t = T(e, 0);
    t !== this._active && !isNaN(t) && t >= 0 && (!this._navItems.length || t < this._navItems.length) && (this._active = t, this._syncItems(), this.dispatchEvent(
      new CustomEvent("active-change", {
        detail: this._active,
        bubbles: !1,
        composed: !1
      })
    ));
  }
  connectedCallback() {
    super.connectedCallback(), requestAnimationFrame(() => this._syncFromSlot());
  }
  firstUpdated() {
    var t;
    this._syncFromSlot();
    const e = this._slotEl ?? ((t = this.shadowRoot) == null ? void 0 : t.querySelector("slot"));
    e && e.addEventListener("slotchange", this._slotChangeBound);
  }
  disconnectedCallback() {
    var t;
    const e = (t = this.shadowRoot) == null ? void 0 : t.querySelector("slot");
    e && e.removeEventListener("slotchange", this._slotChangeBound), this._navItems.forEach((i) => {
      i.removeEventListener("active-change", this._activeChangeBound);
    }), super.disconnectedCallback();
  }
  /**
   * Activate the item at the given index (zero-based). No-op if index is out of range or already active.
   */
  goTo(e) {
    const t = T(e, -1);
    if (t >= 0 && t < this._navItems.length && t !== this._active) {
      const i = this._navItems[t];
      i && i.setActive();
    }
  }
  _syncFromSlot() {
    var s;
    const e = this._slotEl ?? ((s = this.shadowRoot) == null ? void 0 : s.querySelector("slot"));
    let t = (e == null ? void 0 : e.assignedElements({ flatten: !0 })) ?? [];
    t.length === 0 && (t = Array.from(this.children));
    const i = t.filter((r) => r instanceof Ue);
    this._navItems.forEach((r) => {
      r.removeEventListener("active-change", this._activeChangeBound);
    }), this._navItems = i, i.forEach((r) => {
      r.addEventListener("active-change", this._activeChangeBound);
    }), this._syncItems();
  }
  _syncItems() {
    const e = this._active, t = this._navItems.length;
    this._navItems.forEach((i, s) => {
      i.index = s, i.total = t, i.active = e;
    });
  }
  _onItemActiveChange(e) {
    const t = e.detail;
    typeof t != "number" || t === this._active || t >= 0 && t < this._navItems.length && (this._active = t, this._syncItems(), this.requestUpdate(), this.dispatchEvent(
      new CustomEvent("active-change", {
        detail: this._active,
        bubbles: !1,
        composed: !1
      })
    ));
  }
  _getBarTransform() {
    const e = this._navItems.filter((t, i) => i < this._active).length;
    return `translateX(${Ml * e}px)`;
  }
  render() {
    const e = this._barAtTop;
    return c`
      <div class="swim-navbar__nav-items" part="nav-items" role="tablist">
        <slot></slot>
      </div>
      <div class="swim-navbar__bar-track" part="bar-track">
        <div
          class="swim-navbar__bar ${e ? "swim-navbar__bar--top" : "swim-navbar__bar--bottom"}"
          part="bar"
          style="transform: ${this._getBarTransform()}"
        ></div>
      </div>
    `;
  }
};
ss.styles = [E, kl];
let Ge = ss;
Kt([
  N("slot")
], Ge.prototype, "_slotEl", 2);
Kt([
  a({ type: Boolean, reflect: !0, attribute: "bar-at-top", converter: g })
], Ge.prototype, "barAtTop", 1);
Kt([
  a({ type: Number })
], Ge.prototype, "active", 1);
Kt([
  b()
], Ge.prototype, "_navItems", 2);
customElements.get(yo) || customElements.define(yo, Ge);
const zl = [
  E,
  v`
    :host {
      display: block;
    }

    .swim-list__headers-container {
      padding-inline: var(--spacing-16);
      margin-inline: var(--spacing-16);
      display: grid;
      gap: var(--spacing-16);
      align-items: center;
    }

    .swim-list__headers-container--scrollable {
      margin-right: 1.75rem;
    }

    .swim-list__header-cell {
      color: var(--white);
      font-size: var(--font-size-s);
      font-weight: var(--font-weight-bold);
      line-height: 22px;
    }

    .swim-list__divider {
      border-top: 1px solid var(--grey-600);
      border-bottom: 1px solid var(--grey-600);
      opacity: 0.75;
      margin: 0.75rem 0 0.5rem 0;
    }

    .swim-list__rows-container {
      overflow-y: auto;
      display: flex;
      flex-direction: column;
    }

    .swim-list__row {
      background-color: var(--grey-800);
      border: 1px solid var(--grey-600);
      border-radius: var(--radius-4);
      display: grid;
      align-items: center;
      height: 40px;
      margin: 0.25rem 1rem 0 1rem;
      padding-inline: var(--spacing-16);
      position: relative;
      gap: var(--spacing-16);
      box-sizing: border-box;
    }

    .swim-list__row::before {
      content: '';
      width: 3px;
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      border-top-left-radius: var(--radius-4);
      border-bottom-left-radius: var(--radius-4);
    }

    .swim-list__row--error::before {
      background-color: var(--red-500);
    }

    .swim-list__row--success::before {
      background-color: var(--green-500);
    }

    .swim-list__row--warning::before {
      background-color: var(--orange-400);
    }

    .swim-list__cell {
      color: var(--grey-050);
      font-size: var(--font-size-m);
      line-height: 20px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  `
];
var mt = /* @__PURE__ */ ((o) => (o.Error = "error", o.Success = "success", o.Warning = "warning", o))(mt || {}), Tl = Object.defineProperty, Ol = Object.getOwnPropertyDescriptor, ze = (o, e, t, i) => {
  for (var s = i > 1 ? void 0 : i ? Ol(e, t) : e, r = o.length - 1, n; r >= 0; r--)
    (n = o[r]) && (s = (i ? n(e, t, s) : n(s)) || s);
  return i && s && Tl(e, t, s), s;
};
const xo = 44, ko = "swim-list", os = class os extends y {
  constructor() {
    super(...arguments), this.columnLayout = "", this.dataSource = [], this.defaultRowStatus = mt.Error, this.headerLabels = [], this.columns = [], this._hasScrollbar = !1, this._page = 1, this._rowsContainer = null, this._scrollBound = (e) => this._emitScrollChanges(e);
  }
  get height() {
    return this._height;
  }
  set height(e) {
    this._height = e === void 0 ? void 0 : T(e);
  }
  connectedCallback() {
    super.connectedCallback();
  }
  firstUpdated() {
    var e;
    this._rowsContainer = ((e = this.renderRoot) == null ? void 0 : e.querySelector(".swim-list__rows-container")) ?? null, this._rowsContainer && (this._rowsContainer.addEventListener("scroll", this._scrollBound), requestAnimationFrame(() => {
      var t;
      if (this._updateScrollbarState(), (t = this.paginationConfig) != null && t.index && this.paginationConfig.index > 1 && this.paginationConfig.pageSize > 0) {
        this._page = this.paginationConfig.index;
        const i = xo * (this.paginationConfig.pageSize * (this._page - 1));
        this._rowsContainer.scrollTo({ top: i });
      }
    }));
  }
  disconnectedCallback() {
    this._rowsContainer && (this._rowsContainer.removeEventListener("scroll", this._scrollBound), this._rowsContainer = null), super.disconnectedCallback();
  }
  updated(e) {
    (e.has("dataSource") || e.has("height")) && this._updateScrollbarState();
  }
  _updateScrollbarState() {
    this._rowsContainer && (this._hasScrollbar = this._rowsContainer.scrollHeight > this._rowsContainer.clientHeight);
  }
  _emitScrollChanges(e) {
    var r;
    const i = e.target.scrollTop;
    this.dispatchEvent(new CustomEvent("scroll", { detail: i, bubbles: !1, composed: !1 }));
    const s = (r = this.paginationConfig) == null ? void 0 : r.pageSize;
    if (s) {
      const n = Math.floor(i / xo), l = Math.floor(n / s) + 1;
      l !== this._page && (this._page = l, this.dispatchEvent(new CustomEvent("page-change", { detail: l, bubbles: !1, composed: !1 })));
    }
  }
  _getGridStyle() {
    const e = Math.max(this.headerLabels.length, this.columns.length, 1);
    return this.columnLayout && this.columnLayout.trim() ? this.columnLayout.trim() : `repeat(${e}, 1fr)`;
  }
  _getRowStatus(e) {
    const t = e.status;
    return t === mt.Error || t === mt.Success || t === mt.Warning ? t : this.defaultRowStatus;
  }
  _getCellValue(e, t, i) {
    if (t === "$index")
      return `${i + 1}.`;
    const s = e[t];
    return s == null ? "" : String(s);
  }
  render() {
    const e = this._getGridStyle(), t = Math.max(this.headerLabels.length, this.columns.length, 1), i = this.headerLabels.length >= t ? this.headerLabels.slice(0, t) : [...this.headerLabels, ...Array(t - this.headerLabels.length).fill("")];
    return c`
      <div
        class="swim-list__headers-container ${this._hasScrollbar ? "swim-list__headers-container--scrollable" : ""}"
        style="grid-template-columns: ${e}"
      >
        ${i.map((s) => c`<span class="swim-list__header-cell">${s}</span>`)}
      </div>
      <hr class="swim-list__divider" />
      <div class="swim-list__rows-container" style=${this._height !== void 0 ? `height: ${this._height}px` : ""}>
        ${this.dataSource.map((s, r) => {
      const n = this._getRowStatus(s);
      return c`
            <div class="swim-list__row swim-list__row--${n}" style="grid-template-columns: ${e}">
              ${this.columns.map(
        (l) => c` <span class="swim-list__cell">${this._getCellValue(s, l, r)}</span> `
      )}
            </div>
          `;
    })}
      </div>
    `;
  }
};
os.styles = zl;
let oe = os;
ze([
  a({ type: String, attribute: "column-layout" })
], oe.prototype, "columnLayout", 2);
ze([
  a({ type: Array, attribute: !1 })
], oe.prototype, "dataSource", 2);
ze([
  a({ type: Number })
], oe.prototype, "height", 1);
ze([
  a({ attribute: !1 })
], oe.prototype, "paginationConfig", 2);
ze([
  a({ type: String, attribute: "default-row-status", reflect: !0 })
], oe.prototype, "defaultRowStatus", 2);
ze([
  a({ type: Array, attribute: !1 })
], oe.prototype, "headerLabels", 2);
ze([
  a({ type: Array, attribute: !1 })
], oe.prototype, "columns", 2);
ze([
  b()
], oe.prototype, "_hasScrollbar", 2);
ze([
  b()
], oe.prototype, "_page", 2);
customElements.get(ko) || customElements.define(ko, oe);
const Vl = {
  // Blue
  blue100: "rgb(224, 239, 255)",
  blue200: "rgb(173, 212, 255)",
  blue300: "rgb(122, 185, 255)",
  blue400: "rgb(71, 158, 255)",
  blue500: "rgb(20, 131, 255)",
  blue600: "rgb(0, 106, 224)",
  blue700: "rgb(0, 82, 173)",
  blue800: "rgb(0, 58, 122)",
  blue900: "rgb(0, 34, 71)",
  // Light Blue
  lightblue100: "rgb(234, 249, 255)",
  lightblue200: "rgb(184, 234, 254)",
  lightblue300: "rgb(134, 219, 253)",
  lightblue400: "rgb(84, 205, 252)",
  lightblue500: "rgb(34, 190, 251)",
  lightblue600: "rgb(4, 166, 230)",
  lightblue700: "rgb(3, 130, 180)",
  lightblue800: "rgb(2, 94, 130)",
  lightblue900: "rgb(1, 58, 80)",
  // Green
  green100: "rgb(206, 249, 240)",
  green200: "rgb(161, 243, 226)",
  green300: "rgb(116, 237, 212)",
  green400: "rgb(71, 231, 198)",
  green500: "rgb(29, 222, 182)",
  green600: "rgb(23, 177, 145)",
  green700: "rgb(17, 132, 108)",
  green800: "rgb(11, 87, 71)",
  green900: "rgb(5, 42, 34)",
  // Orange
  orange100: "rgb(255, 244, 224)",
  orange200: "rgb(255, 225, 173)",
  orange300: "rgb(255, 206, 122)",
  orange400: "rgb(255, 187, 71)",
  orange500: "rgb(255, 168, 20)",
  orange600: "rgb(224, 141, 0)",
  orange700: "rgb(173, 109, 0)",
  orange800: "rgb(122, 77, 0)",
  orange900: "rgb(71, 45, 0)",
  // Red
  red100: "rgb(255, 230, 224)",
  red200: "rgb(255, 190, 173)",
  red300: "rgb(255, 150, 122)",
  red400: "rgb(255, 109, 71)",
  red500: "rgb(255, 69, 20)",
  red600: "rgb(224, 47, 0)",
  red700: "rgb(173, 36, 0)",
  red800: "rgb(122, 25, 0)",
  red900: "rgb(71, 15, 0)",
  // Purple
  purple100: "rgb(255, 255, 255)",
  purple200: "rgb(239, 234, 252)",
  purple300: "rgb(205, 190, 245)",
  purple400: "rgb(172, 145, 239)",
  purple500: "rgb(138, 101, 232)",
  purple600: "rgb(104, 57, 225)",
  purple700: "rgb(78, 30, 201)",
  purple800: "rgb(61, 23, 157)",
  purple900: "rgb(44, 17, 112)",
  // Grey
  grey050: "rgb(235, 237, 242)",
  grey100: "rgb(205, 210, 221)",
  grey150: "rgb(190, 197, 211)",
  grey200: "rgb(175, 183, 200)",
  grey250: "rgb(160, 170, 190)",
  grey300: "rgb(144, 156, 180)",
  grey350: "rgb(129, 143, 169)",
  grey400: "rgb(114, 129, 159)",
  grey450: "rgb(100, 116, 147)",
  grey500: "rgb(90, 104, 132)",
  grey550: "rgb(80, 92, 117)",
  grey600: "rgb(69, 80, 102)",
  grey650: "rgb(59, 68, 87)",
  grey700: "rgb(49, 56, 71)",
  grey725: "rgb(43, 50, 64)",
  grey750: "rgb(38, 44, 56)",
  grey775: "rgb(33, 38, 49)",
  grey800: "rgb(28, 32, 41)",
  grey825: "rgb(23, 26, 33)",
  grey850: "rgb(18, 20, 26)",
  grey875: "rgb(12, 14, 18)",
  grey900: "rgb(7, 8, 11)",
  // Base
  white: "rgb(255, 255, 255)",
  black: "rgb(0, 0, 0)"
}, Nl = {
  // Font sizes
  fontSizeBase: "16px",
  fontSizeXXS: "0.625rem",
  // 10px
  fontSizeXS: "0.75rem",
  // 12px
  fontSizeS: "0.875rem",
  // 14px
  fontSizeM: "1rem",
  // 16px
  fontSizeL: "1.125rem",
  // 18px
  fontSizeXL: "1.25rem",
  // 20px
  fontSize2XL: "1.5rem",
  // 24px
  fontSize3XL: "1.75rem",
  // 28px
  fontSize4XL: "2rem",
  // 32px
  fontSize5XL: "2.25rem",
  // 36px
  fontSize6XL: "3rem",
  // 48px
  // Line heights
  fontLineHeight100: "1.1",
  fontLineHeight200: "1.42",
  fontLineHeight300: "20px",
  fontLineHeight400: "40px",
  // Font weights
  fontWeightLight: "300",
  fontWeightRegular: "400",
  fontWeightSemibold: "600",
  fontWeightBold: "700"
}, ql = {
  spacing0: "0",
  spacing2: "2px",
  spacing4: "4px",
  spacing8: "8px",
  spacing10: "10px",
  spacing16: "16px",
  spacing24: "24px",
  spacing32: "32px"
}, Ul = {
  radius2: "2px",
  radius4: "4px",
  radius8: "8px"
};
export {
  me as AlignmentType,
  Oo as ButtonGroupOrientation,
  Io as ButtonGroupStyle,
  Po as ButtonGroupVariant,
  ce as ButtonState,
  Ho as CardAppearance,
  Bo as CardOrientation,
  Ro as CardPlaceholderSize,
  Je as CardStatus,
  Nr as DAYS_OF_WEEK,
  L as DateDisplayType,
  M as DateTimeType,
  pt as DialogFormat,
  Xe as DrawerDirection,
  ba as DrawerPosition,
  Ai as InputAppearance,
  Si as InputSize,
  ke as InputTypes,
  mt as ListRowStatus,
  Vr as MONTHS_SHORT,
  B as PlacementType,
  Ze as ProgressSpinnerMode,
  To as SWIM_ICON_FONT_FAMILY,
  qo as SectionAppearance,
  Ce as ShowType,
  Ee as SpinnerAppearance,
  Ke as SplitDirection,
  Di as StyleType,
  U as SwimButton,
  it as SwimButtonGroup,
  Ae as SwimButtonToggle,
  pe as SwimButtonToggleGroup,
  W as SwimCalendar,
  Q as SwimCard,
  st as SwimCardAvatar,
  pi as SwimCardBody,
  Ft as SwimCardFooter,
  yt as SwimCardHeader,
  Bt as SwimCardPlaceholder,
  ie as SwimCheckbox,
  O as SwimDateDisplay,
  k as SwimDateTime,
  R as SwimDialog,
  Z as SwimDrawer,
  Ie as SwimIcon,
  D as SwimInput,
  fe as SwimLargeFormatDialogContent,
  xt as SwimLargeFormatDialogFooter,
  oe as SwimList,
  Ge as SwimNavbar,
  Ue as SwimNavbarItem,
  De as SwimOption,
  V as SwimProgressSpinner,
  K as SwimRadio,
  le as SwimRadioGroup,
  X as SwimSection,
  bi as SwimSectionHeader,
  x as SwimSelect,
  j as SwimSlider,
  kt as SwimSplit,
  Ne as SwimSplitArea,
  Ct as SwimSplitHandle,
  ge as SwimTab,
  qe as SwimTabs,
  se as SwimToggle,
  I as SwimTooltip,
  Zo as TabsAppearance,
  Tt as TogglePosition,
  E as baseStyles,
  ln as cardComponentStyles,
  nn as cardHorizontalStyles,
  rn as cardStyles,
  an as cardVerticalStyles,
  p as coerceBooleanProperty,
  T as coerceNumberProperty,
  Vl as colors,
  Er as convertClass,
  kr as ensureSwimUiIconFontFace,
  he as formatDate,
  ks as getDecadeStartYear,
  Jr as getEffectiveDisplayFormat,
  Fo as getEffectiveInputFormat,
  ae as getMonth,
  Bl as globalStyles,
  Sr as iconRegistry,
  ai as isAfterDate,
  ni as isBeforeDate,
  Ss as isOutOfRange,
  hi as isSameDay,
  Hl as isSameMonth,
  qr as isSameYear,
  Y as isValidDate,
  g as litBooleanAttrDefaultFalse,
  J as litBooleanAttrDefaultTrue,
  vt as normalizeTimezone,
  jl as openDrawer,
  Ve as parseDate,
  Ul as radius,
  zt as resolveFormat,
  ui as roundToPrecision,
  Cr as scheduleEnsureSwimUiIconFontFace,
  At as scrollbarStyles,
  ql as spacing,
  Rl as toNativeInputValue,
  Nl as typography
};
