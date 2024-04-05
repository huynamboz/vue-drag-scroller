const L = "drag-scroller-disable", h = /* @__PURE__ */ (() => {
  const s = /* @__PURE__ */ new WeakMap();
  return {
    mounted(r, a) {
      let o = !1;
      const { onlyX: n, onlyY: E, disablechild: S } = a.modifiers, t = a.value ?? {}, p = new Event("scrollStart", { bubbles: !0 }), i = new Event("scrollMoving", { bubbles: !0 }), b = new Event("scrollEnd", { bubbles: !0 });
      t.hideScrollbar === !0 && (r.style.overflow = "hidden");
      const D = (e) => {
        if (S)
          return e === r;
        for (; e && e.parentNode; ) {
          if (e && (e != null && e.hasAttribute(L)))
            return !1;
          if (e === r)
            return !0;
          e = e.parentNode;
        }
        return !1;
      }, c = (e) => {
        o = D(e.target), r.dispatchEvent(p), o && (t != null && t.startScroll) && typeof (t == null ? void 0 : t.startScroll) == "function" && t.startScroll(e);
      }, f = (e) => {
        r.dispatchEvent(b), o && (t != null && t.endScroll) && typeof (t == null ? void 0 : t.endScroll) == "function" && t.endScroll(e), o = !1;
      }, u = (e) => {
        if (!o)
          return !1;
        r.dispatchEvent(i), t != null && t.onScrolling && typeof (t == null ? void 0 : t.onScrolling) == "function" && t.onScrolling(e), e.stopPropagation && e.stopPropagation(), e.preventDefault && e.preventDefault(), e.cancelBubble = !0, e.returnValue = !1;
        const l = (t == null ? void 0 : t.speed) || 1, d = t.reverseDirection ? e.movementX * l : -e.movementX * l, v = t.reverseDirection ? e.movementY * l : -e.movementY * l;
        n ? r.scrollLeft += d : (E || (r.scrollLeft += d), r.scrollTop += v);
      };
      s.set(r, { dragStart: c, dragEnd: f, drag: u }), r.addEventListener("pointerdown", c), addEventListener("pointerup", f), addEventListener("pointermove", u);
    },
    unmounted(r) {
      const { dragStart: a, dragEnd: o, drag: n } = s.get(r);
      r.removeEventListener("pointerdown", a), removeEventListener("pointerup", o), removeEventListener("pointermove", n);
    }
  };
})(), w = {
  install(s) {
    s.directive("drag-scroller", h);
  }
};
export {
  w as default,
  h as dragScroller
};
