const A = "drag-scroller-disable", I = /* @__PURE__ */ (() => {
  const d = /* @__PURE__ */ new WeakMap();
  return {
    mounted(t, o) {
      const s = () => navigator.maxTouchPoints > 0 || window.matchMedia && window.matchMedia("(pointer: coarse)").matches;
      let a = !1;
      const { onlyX: c, onlyY: g, disablechild: l } = o.modifiers, D = o.value ?? {};
      if (s() && !D.enableOnMobile)
        return;
      const y = new Event("scrollStart", { bubbles: !0 }), m = new Event("scrollMoving", { bubbles: !0 }), M = new Event("scrollEnd", { bubbles: !0 }), e = {
        binding: o.value ?? {}
      };
      e.binding.hideScrollbar === !0 && (t.style.overflow = "hidden");
      const T = (n) => {
        if (l)
          return n === t;
        for (; n && n.parentNode; ) {
          if (n && (n != null && n.hasAttribute(A)))
            return !1;
          if (n === t)
            return !0;
          n = n.parentNode;
        }
        return !1;
      }, v = (n) => {
        var r, i;
        a = T(n.target), t.dispatchEvent(y), a && ((r = e.binding) != null && r.startScroll) && typeof ((i = e.binding) == null ? void 0 : i.startScroll) == "function" && e.binding.startScroll(n);
      }, b = (n) => {
        var r, i;
        a && (t.dispatchEvent(M), (r = e.binding) != null && r.endScroll && typeof ((i = e.binding) == null ? void 0 : i.endScroll) == "function" && e.binding.endScroll(n), a = !1);
      }, p = (n) => {
        var S, h, L;
        const r = e.binding.enabled !== !1;
        if (!a || !r) return !1;
        t.dispatchEvent(m), (S = e.binding) != null && S.onScrolling && typeof ((h = e.binding) == null ? void 0 : h.onScrolling) == "function" && e.binding.onScrolling(n);
        const i = ((L = e.binding) == null ? void 0 : L.speed) || 1, w = e.binding.reverseDirection ? n.movementX * i : -n.movementX * i, E = e.binding.reverseDirection ? n.movementY * i : -n.movementY * i;
        return c ? t.scrollLeft += w : (g || (t.scrollLeft += w), t.scrollTop += E), f(n), !1;
      };
      function f(n) {
        var r;
        (n == null ? void 0 : n.target) instanceof HTMLImageElement && n.preventDefault && n.preventDefault(), (r = window.getSelection()) == null || r.removeAllRanges();
      }
      const u = () => {
        a = !1;
      };
      d.set(t, { dragStart: v, dragEnd: b, drag: p, preventSelection: f, resetDrag: u, options: e }), t.addEventListener("pointerdown", v), t.addEventListener("dragstart", f), t.addEventListener("dragstart", u), window.addEventListener("pointerup", b), window.addEventListener("pointermove", p), window.addEventListener("blur", u);
    },
    updated(t, o) {
      const s = d.get(t);
      s && (s.options.binding = o.value ?? {}, s.options.binding.hideScrollbar === !0 ? t.style.overflow = "hidden" : s.options.binding.hideScrollbar === !1 && (t.style.overflow = ""));
    },
    unmounted(t) {
      const o = d.get(t);
      if (!o) return;
      const { dragStart: s, dragEnd: a, drag: c, preventSelection: g, resetDrag: l } = o;
      t.removeEventListener("pointerdown", s), t.removeEventListener("dragstart", g), t.removeEventListener("dragstart", l), window.removeEventListener("pointerup", a), window.removeEventListener("pointermove", c), window.removeEventListener("blur", l), d.delete(t);
    }
  };
})(), X = {
  install(d) {
    d.directive("drag-scroller", I);
  }
}, Y = X;
export {
  Y as VueDragScroller,
  X as VueDragScrollerPlugin,
  X as default,
  I as dragScroller,
  I as vDragScroller
};
