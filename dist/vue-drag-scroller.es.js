const g = "drag-scroller-disable", w = /* @__PURE__ */ (() => {
  const s = /* @__PURE__ */ new WeakMap();
  return {
    mounted(r, l) {
      let o = !1;
      const { onlyX: n, onlyY: i, disablechild: E } = l.modifiers, e = l.value ?? {}, p = new Event("scrollStart", { bubbles: !0 }), b = new Event("scrollMoving", { bubbles: !0 }), D = new Event("scrollEnd", { bubbles: !0 });
      e.hideScrollbar === !0 && (r.style.overflow = "hidden");
      const L = (t) => {
        if (E)
          return t === r;
        for (; t && t.parentNode; ) {
          if (t && (t != null && t.hasAttribute(g)))
            return !1;
          if (t === r)
            return !0;
          t = t.parentNode;
        }
        return !1;
      }, c = (t) => {
        o = L(t.target), r.dispatchEvent(p), o && (e != null && e.startScroll) && typeof (e == null ? void 0 : e.startScroll) == "function" && e.startScroll(t);
      }, f = (t) => {
        r.dispatchEvent(D), o && (e != null && e.endScroll) && typeof (e == null ? void 0 : e.endScroll) == "function" && e.endScroll(t), o = !1;
      }, u = (t) => {
        var S;
        if (!o) return !1;
        r.dispatchEvent(b), e != null && e.onScrolling && typeof (e == null ? void 0 : e.onScrolling) == "function" && e.onScrolling(t), t.stopPropagation && t.stopPropagation(), t.preventDefault && t.preventDefault(), (S = window.getSelection()) == null || S.removeAllRanges(), t.cancelBubble = !0, t.returnValue = !1;
        const a = (e == null ? void 0 : e.speed) || 1, d = e.reverseDirection ? t.movementX * a : -t.movementX * a, v = e.reverseDirection ? t.movementY * a : -t.movementY * a;
        n ? r.scrollLeft += d : (i || (r.scrollLeft += d), r.scrollTop += v);
      };
      s.set(r, { dragStart: c, dragEnd: f, drag: u }), r.addEventListener("pointerdown", c), addEventListener("pointerup", f), addEventListener("pointermove", u);
    },
    unmounted(r) {
      const { dragStart: l, dragEnd: o, drag: n } = s.get(r);
      r.removeEventListener("pointerdown", l), removeEventListener("pointerup", o), removeEventListener("pointermove", n);
    }
  };
})(), h = {
  install(s) {
    s.directive("drag-scroller", w);
  }
};
export {
  h as default,
  w as dragScroller,
  w as vDragScroller
};
