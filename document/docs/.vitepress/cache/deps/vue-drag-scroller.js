// node_modules/vue-drag-scroller/dist/vue-drag-scroller.es.js
var L = "drag-scroller-disable";
var h = /* @__PURE__ */ (() => {
  const s = /* @__PURE__ */ new WeakMap();
  return {
    mounted(r, a) {
      let o = false;
      const { onlyX: n, onlyY: E, disablechild: S } = a.modifiers, t = a.value ?? {}, p = new Event("scrollStart", { bubbles: true }), i = new Event("scrollMoving", { bubbles: true }), b = new Event("scrollEnd", { bubbles: true });
      t.hideScrollbar === true && (r.style.overflow = "hidden");
      const D = (e) => {
        if (S)
          return e === r;
        for (; e && e.parentNode; ) {
          if (e && (e != null && e.hasAttribute(L)))
            return false;
          if (e === r)
            return true;
          e = e.parentNode;
        }
        return false;
      }, c = (e) => {
        o = D(e.target), r.dispatchEvent(p), o && (t != null && t.startScroll) && typeof (t == null ? void 0 : t.startScroll) == "function" && t.startScroll(e);
      }, f = (e) => {
        r.dispatchEvent(b), o && (t != null && t.endScroll) && typeof (t == null ? void 0 : t.endScroll) == "function" && t.endScroll(e), o = false;
      }, u = (e) => {
        if (!o)
          return false;
        r.dispatchEvent(i), t != null && t.onScrolling && typeof (t == null ? void 0 : t.onScrolling) == "function" && t.onScrolling(e), e.stopPropagation && e.stopPropagation(), e.preventDefault && e.preventDefault(), e.cancelBubble = true, e.returnValue = false;
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
})();
var w = {
  install(s) {
    s.directive("drag-scroller", h);
  }
};
export {
  w as default,
  h as dragScroller
};
//# sourceMappingURL=vue-drag-scroller.js.map
