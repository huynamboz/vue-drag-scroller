const v = "drag-scroller-disable", L = /* @__PURE__ */ (() => {
  const s = /* @__PURE__ */ new WeakMap();
  return {
    mounted(t, a) {
      let o = !1;
      const { onlyX: c, onlyY: d, disablechild: S } = a.modifiers, e = a.value ?? {};
      e.hideScrollbar === !0 && (t.style.overflow = "hidden");
      const p = (r) => {
        if (S)
          return r === t;
        for (; r && r.parentNode; ) {
          if (r && (r != null && r.hasAttribute(v)))
            return !1;
          if (r === t)
            return !0;
          r = r.parentNode;
        }
        return !1;
      }, n = (r) => {
        o = p(r.target), o && (e != null && e.startScroll) && typeof (e == null ? void 0 : e.startScroll) == "function" && e.startScroll(r);
      }, f = (r) => {
        o && (e != null && e.endScroll) && typeof (e == null ? void 0 : e.endScroll) == "function" && e.endScroll(r), o = !1;
      }, u = (r) => {
        if (!o)
          return !1;
        e != null && e.onScrolling && typeof (e == null ? void 0 : e.onScrolling) == "function" && e.onScrolling(r), r.stopPropagation && r.stopPropagation(), r.preventDefault && r.preventDefault(), r.cancelBubble = !0, r.returnValue = !1;
        const l = (e == null ? void 0 : e.speed) || 1;
        c ? t.scrollLeft -= r.movementX * l : (d || (t.scrollLeft -= r.movementX * l), t.scrollTop -= r.movementY * l);
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
    s.directive("drag-scroller", L);
  }
};
export {
  E as default,
  L as dragScroller
};
