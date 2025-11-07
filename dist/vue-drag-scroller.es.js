const P = "drag-scroller-disable", b = /* @__PURE__ */ (() => {
  const s = /* @__PURE__ */ new WeakMap(), m = () => "ontouchstart" in window || navigator.maxTouchPoints > 0 || window.matchMedia && window.matchMedia("(pointer: coarse)").matches || // Additional check for mobile user agents
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  return {
    mounted(n, a) {
      let r = !1;
      const { onlyX: d, onlyY: u, disablechild: g } = a.modifiers, l = a.value ?? {};
      if (m() && !l.enableOnMobile)
        return;
      const M = new Event("scrollStart", { bubbles: !0 }), y = new Event("scrollMoving", { bubbles: !0 }), T = new Event("scrollEnd", { bubbles: !0 }), t = {
        binding: a.value ?? {}
      };
      t.binding.hideScrollbar === !0 && (n.style.overflow = "hidden");
      const A = (e) => {
        if (g)
          return e === n;
        for (; e && e.parentNode; ) {
          if (e && (e != null && e.hasAttribute(P)))
            return !1;
          if (e === n)
            return !0;
          e = e.parentNode;
        }
        return !1;
      }, w = (e) => {
        var i, o;
        r = A(e.target), n.dispatchEvent(M), r && ((i = t.binding) != null && i.startScroll) && typeof ((o = t.binding) == null ? void 0 : o.startScroll) == "function" && t.binding.startScroll(e);
      }, c = (e) => {
        var i, o;
        r && (n.dispatchEvent(T), (i = t.binding) != null && i.endScroll && typeof ((o = t.binding) == null ? void 0 : o.endScroll) == "function" && t.binding.endScroll(e), r = !1);
      }, p = (e) => {
        var h, L, D;
        const i = t.binding.enabled !== !1;
        if (!r || !i) return !1;
        n.dispatchEvent(y), (h = t.binding) != null && h.onScrolling && typeof ((L = t.binding) == null ? void 0 : L.onScrolling) == "function" && t.binding.onScrolling(e);
        const o = ((D = t.binding) == null ? void 0 : D.speed) || 1, E = t.binding.reverseDirection ? e.movementX * o : -e.movementX * o, S = t.binding.reverseDirection ? e.movementY * o : -e.movementY * o;
        return d ? n.scrollLeft += E : (u || (n.scrollLeft += E), n.scrollTop += S), v(e), !1;
      };
      function v(e) {
        var i;
        (e == null ? void 0 : e.target) instanceof HTMLImageElement && e.preventDefault && e.preventDefault(), (i = window.getSelection()) == null || i.removeAllRanges();
      }
      const f = () => {
        r = !1;
      };
      s.set(n, { dragStart: w, dragEnd: c, drag: p, preventSelection: v, resetDrag: f, options: t }), n.addEventListener("mousedown", w), n.addEventListener("dragstart", v), n.addEventListener("mouseleave", c), window.addEventListener("mouseup", c), window.addEventListener("pointerup", c), window.addEventListener("mousemove", p), window.addEventListener("blur", f), n.addEventListener("dragstart", f);
    },
    updated(n, a) {
      const r = s.get(n);
      r && (r.options.binding = a.value ?? {}, r.options.binding.hideScrollbar === !0 ? n.style.overflow = "hidden" : r.options.binding.hideScrollbar === !1 && (n.style.overflow = ""));
    },
    unmounted(n) {
      const a = s.get(n);
      if (!a) return;
      const { dragStart: r, dragEnd: d, drag: u, preventSelection: g, resetDrag: l } = a;
      n.removeEventListener("mousedown", r), n.removeEventListener("dragstart", g), n.removeEventListener("mouseleave", d), n.removeEventListener("dragstart", l), window.removeEventListener("mouseup", d), window.removeEventListener("mousemove", u), window.removeEventListener("blur", l), s.delete(n);
    }
  };
})(), B = {
  install(s) {
    s.directive("drag-scroller", b);
  }
}, I = {
  directive: b,
  install(s) {
    s.directive("drag-scroller", b);
  }
};
export {
  I as VueDragScrollerModule,
  B as VueDragScrollerPlugin,
  B as default,
  b as dragScroller,
  b as vDragScroller
};
