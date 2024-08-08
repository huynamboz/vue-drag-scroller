const D = "drag-scroller-disable", w = /* @__PURE__ */ (() => {
  const n = /* @__PURE__ */ new WeakMap();
  return {
    mounted(r, a) {
      let o = !1;
      const { onlyX: l, onlyY: c, disablechild: E } = a.modifiers, t = a.value ?? {}, p = new Event("scrollStart", { bubbles: !0 }), L = new Event("scrollMoving", { bubbles: !0 }), b = new Event("scrollEnd", { bubbles: !0 });
      t.hideScrollbar === !0 && (r.style.overflow = "hidden");
      const g = (e) => {
        if (E)
          return e === r;
        for (; e && e.parentNode; ) {
          if (e && (e != null && e.hasAttribute(D)))
            return !1;
          if (e === r)
            return !0;
          e = e.parentNode;
        }
        return !1;
      }, d = (e) => {
        o = g(e.target), r.dispatchEvent(p), o && (t != null && t.startScroll) && typeof (t == null ? void 0 : t.startScroll) == "function" && t.startScroll(e);
      }, u = (e) => {
        r.dispatchEvent(b), o && (t != null && t.endScroll) && typeof (t == null ? void 0 : t.endScroll) == "function" && t.endScroll(e), o = !1;
      }, v = (e) => {
        if (!o) return !1;
        r.dispatchEvent(L), t != null && t.onScrolling && typeof (t == null ? void 0 : t.onScrolling) == "function" && t.onScrolling(e);
        const s = (t == null ? void 0 : t.speed) || 1, i = t.reverseDirection ? e.movementX * s : -e.movementX * s, S = t.reverseDirection ? e.movementY * s : -e.movementY * s;
        return l ? r.scrollLeft += i : (c || (r.scrollLeft += i), r.scrollTop += S), f(e), !1;
      };
      function f(e) {
        var s;
        (e == null ? void 0 : e.target) instanceof HTMLImageElement && e.preventDefault && e.preventDefault(), (s = window.getSelection()) == null || s.removeAllRanges();
      }
      n.set(r, { dragStart: d, dragEnd: u, drag: v, preventSelection: f }), r.addEventListener("pointerdown", d), r.addEventListener("dragstart", f), addEventListener("pointerup", u), addEventListener("pointermove", v);
    },
    unmounted(r) {
      const { dragStart: a, dragEnd: o, drag: l, preventSelection: c } = n.get(r);
      r.removeEventListener("pointerdown", a), r.removeEventListener("dragstart", c), removeEventListener("pointerup", o), removeEventListener("pointermove", l);
    }
  };
})(), h = {
  install(n) {
    n.directive("drag-scroller", w);
  }
};
export {
  h as default,
  w as dragScroller,
  w as vDragScroller
};
