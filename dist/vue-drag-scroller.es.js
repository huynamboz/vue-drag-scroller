const S = "drag-scroller-disable", L = /* @__PURE__ */ (() => {
  const l = /* @__PURE__ */ new WeakMap();
  return {
    mounted(r, e) {
      let a = !1;
      const { onlyX: s, onlyY: d, disablechild: v } = e.modifiers, i = (t) => {
        if (v)
          return t === r;
        for (; t && t.parentNode; ) {
          if (t && (t != null && t.hasAttribute(S)))
            return !1;
          if (t === r)
            return !0;
          t = t.parentNode;
        }
        return !1;
      }, n = (t) => {
        var o;
        a = i(t.target), a && ((o = e.value) != null && o.startScroll) && typeof e.value.startScroll == "function" && e.value.startScroll(t);
      }, c = (t) => {
        var o;
        a && e.value && ((o = e.value) != null && o.endScroll) && typeof e.value.endScroll == "function" && e.value.endScroll(t), a = !1;
      }, u = (t) => {
        var f, p;
        if (!a)
          return !1;
        e.value && ((f = e.value) != null && f.onScrolling) && typeof e.value.onScrolling == "function" && e.value.onScrolling(t), t.stopPropagation && t.stopPropagation(), t.preventDefault && t.preventDefault(), t.cancelBubble = !0, t.returnValue = !1;
        const o = ((p = e.value) == null ? void 0 : p.speed) || 1;
        s ? r.scrollLeft -= t.movementX * o : (d || (r.scrollLeft -= t.movementX * o), r.scrollTop -= t.movementY * o);
      };
      l.set(r, { dragStart: n, dragEnd: c, drag: u }), r.addEventListener("pointerdown", n), addEventListener("pointerup", c), addEventListener("pointermove", u);
    },
    unmounted(r) {
      const { dragStart: e, dragEnd: a, drag: s } = l.get(r);
      r.removeEventListener("pointerdown", e), removeEventListener("pointerup", a), removeEventListener("pointermove", s);
    }
  };
})(), E = {
  install(l) {
    l.directive("drag-scroller", L);
  }
};
export {
  E as default,
  L as dragScroller
};
