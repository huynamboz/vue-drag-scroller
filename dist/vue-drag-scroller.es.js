const p = "drag-scroller-disable", v = /* @__PURE__ */ (() => {
  const n = /* @__PURE__ */ new WeakMap();
  return {
    mounted(r, e) {
      let o = !1;
      const { onlyX: l, onlyY: f, disablechild: i } = e.modifiers, d = (t) => {
        if (i)
          return t === r;
        for (; t && t.parentNode; ) {
          if (t && (t != null && t.hasAttribute(p)))
            return !1;
          if (t === r)
            return !0;
          t = t.parentNode;
        }
        return !1;
      }, s = (t) => {
        var a;
        o = d(t.target), o && ((a = e.value) != null && a.startScroll) && typeof e.value.startScroll == "function" && e.value.startScroll(t);
      }, c = (t) => {
        var a;
        o && ((a = e.value) != null && a.endScroll) && typeof e.value.endScroll == "function" && e.value.endScroll(t), o = !1;
      }, u = (t) => {
        if (!o)
          return !1;
        e.value.onScrolling && typeof e.value.onScrolling == "function" && e.value.onScrolling(t), t.stopPropagation && t.stopPropagation(), t.preventDefault && t.preventDefault(), t.cancelBubble = !0, t.returnValue = !1, l ? r.scrollLeft -= t.movementX : (f || (r.scrollLeft -= t.movementX), r.scrollTop -= t.movementY);
      };
      n.set(r, { dragStart: s, dragEnd: c, drag: u }), r.addEventListener("pointerdown", s), addEventListener("pointerup", c), addEventListener("pointermove", u);
    },
    unmounted(r) {
      const { dragStart: e, dragEnd: o, drag: l } = n.get(r);
      r.removeEventListener("pointerdown", e), removeEventListener("pointerup", o), removeEventListener("pointermove", l);
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
