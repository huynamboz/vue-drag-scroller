const v = "drag-scroller-disable", S = /* @__PURE__ */ (() => {
  const n = /* @__PURE__ */ new WeakMap();
  return {
    mounted(r, e) {
      let a = !1;
      const { onlyX: l, onlyY: p, disablechild: d } = e.modifiers, i = (t) => {
        if (d)
          return t === r;
        for (; t && t.parentNode; ) {
          if (t && (t != null && t.hasAttribute(v)))
            return !1;
          if (t === r)
            return !0;
          t = t.parentNode;
        }
        return !1;
      }, s = (t) => {
        var o;
        a = i(t.target), a && ((o = e.value) != null && o.startScroll) && typeof e.value.startScroll == "function" && e.value.startScroll(t);
      }, c = (t) => {
        var o;
        a && ((o = e.value) != null && o.endScroll) && typeof e.value.endScroll == "function" && e.value.endScroll(t), a = !1;
      }, u = (t) => {
        var f;
        if (!a)
          return !1;
        e.value.onScrolling && typeof e.value.onScrolling == "function" && e.value.onScrolling(t), t.stopPropagation && t.stopPropagation(), t.preventDefault && t.preventDefault(), t.cancelBubble = !0, t.returnValue = !1;
        const o = ((f = e.value) == null ? void 0 : f.speed) || 1;
        l ? r.scrollLeft -= t.movementX * o : (p || (r.scrollLeft -= t.movementX * o), r.scrollTop -= t.movementY * o);
      };
      n.set(r, { dragStart: s, dragEnd: c, drag: u }), r.addEventListener("pointerdown", s), addEventListener("pointerup", c), addEventListener("pointermove", u);
    },
    unmounted(r) {
      const { dragStart: e, dragEnd: a, drag: l } = n.get(r);
      r.removeEventListener("pointerdown", e), removeEventListener("pointerup", a), removeEventListener("pointermove", l);
    }
  };
})(), L = {
  install(n) {
    n.directive("drag-scroller", S);
  }
};
export {
  L as default,
  S as dragScroller
};
