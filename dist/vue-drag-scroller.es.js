const p = "drag-scroller-disable", v = /* @__PURE__ */ (() => {
  const n = /* @__PURE__ */ new WeakMap();
  return {
    mounted(e, r) {
      let o = !1;
      const { onlyX: s, onlyY: f, disablechild: i } = r.modifiers, d = (t) => {
        if (i)
          return t === e;
        for (; t && t.parentNode; ) {
          if (t && (t != null && t.hasAttribute(p)))
            return !1;
          if (t === e)
            return !0;
          t = t.parentNode;
        }
        return !1;
      }, l = (t) => {
        var a;
        o = d(t.target), o && ((a = r.value) != null && a.startScroll) && typeof r.value.startScroll == "function" && r.value.startScroll(t);
      }, c = (t) => {
        var a;
        o && ((a = r.value) != null && a.endScroll) && typeof r.value.endScroll == "function" && r.value.endScroll(t), o = !1;
      }, u = (t) => {
        if (!o)
          return !1;
        t.stopPropagation && t.stopPropagation(), t.preventDefault && t.preventDefault(), t.cancelBubble = !0, t.returnValue = !1, s ? e.scrollLeft -= t.movementX : (f || (e.scrollLeft -= t.movementX), e.scrollTop -= t.movementY);
      };
      n.set(e, { dragStart: l, dragEnd: c, drag: u }), e.addEventListener("pointerdown", l), addEventListener("pointerup", c), addEventListener("pointermove", u);
    },
    unmounted(e) {
      const { dragStart: r, dragEnd: o, drag: s } = n.get(e);
      e.removeEventListener("pointerdown", r), removeEventListener("pointerup", o), removeEventListener("pointermove", s);
    }
  };
})(), S = {
  install(n) {
    n.directive("drag-scroller", v);
  }
};
export {
  S as default,
  v as dragScroller
};
