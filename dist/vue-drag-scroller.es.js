const L = "drag-scroller-disable", i = /* @__PURE__ */ (() => {
  const s = /* @__PURE__ */ new WeakMap();
  return {
    mounted(t, a) {
      let o = !1;
      const { onlyX: c, onlyY: p, disablechild: v } = a.modifiers, r = a.value ?? {};
      r.hideScrollbar === !0 && (t.style.overflow = "hidden");
      const D = (e) => {
        if (v)
          return e === t;
        for (; e && e.parentNode; ) {
          if (e && (e != null && e.hasAttribute(L)))
            return !1;
          if (e === t)
            return !0;
          e = e.parentNode;
        }
        return !1;
      }, n = (e) => {
        o = D(e.target), o && (r != null && r.startScroll) && typeof (r == null ? void 0 : r.startScroll) == "function" && r.startScroll(e);
      }, f = (e) => {
        o && (r != null && r.endScroll) && typeof (r == null ? void 0 : r.endScroll) == "function" && r.endScroll(e), o = !1;
      }, u = (e) => {
        if (!o)
          return !1;
        r != null && r.onScrolling && typeof (r == null ? void 0 : r.onScrolling) == "function" && r.onScrolling(e), e.stopPropagation && e.stopPropagation(), e.preventDefault && e.preventDefault(), e.cancelBubble = !0, e.returnValue = !1;
        const l = (r == null ? void 0 : r.speed) || 1, d = r.reverseDirection ? e.movementX * l : -e.movementX * l, S = r.reverseDirection ? e.movementY * l : -e.movementY * l;
        c ? t.scrollLeft += d : (p || (t.scrollLeft += d), t.scrollTop += S);
      };
      s.set(t, { dragStart: n, dragEnd: f, drag: u }), t.addEventListener("pointerdown", n), addEventListener("pointerup", f), addEventListener("pointermove", u);
    },
    unmounted(t) {
      const { dragStart: a, dragEnd: o, drag: c } = s.get(t);
      t.removeEventListener("pointerdown", a), removeEventListener("pointerup", o), removeEventListener("pointermove", c);
    }
  };
})(), E = {
  install(s) {
    s.directive("drag-scroller", i);
  }
};
export {
  E as default,
  i as dragScroller
};
