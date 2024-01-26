(function(o,l){typeof exports=="object"&&typeof module<"u"?l(exports):typeof define=="function"&&define.amd?define(["exports"],l):(o=typeof globalThis<"u"?globalThis:o||self,l(o["vue-drag-scroller"]={}))})(this,function(o){"use strict";const l="drag-scroller-disable",u=(()=>{const a=new WeakMap;return{mounted(r,n){let s=!1;const{onlyX:f,onlyY:v,disablechild:m}=n.modifiers,t=n.value??{};t.hideScrollbar===!0&&(r.style.overflow="hidden");const L=e=>{if(m)return e===r;for(;e&&e.parentNode;){if(e&&(e!=null&&e.hasAttribute(l)))return!1;if(e===r)return!0;e=e.parentNode}return!1},d=e=>{s=L(e.target),s&&(t!=null&&t.startScroll)&&typeof(t==null?void 0:t.startScroll)=="function"&&t.startScroll(e)},i=e=>{s&&(t!=null&&t.endScroll)&&typeof(t==null?void 0:t.endScroll)=="function"&&t.endScroll(e),s=!1},p=e=>{if(!s)return!1;t!=null&&t.onScrolling&&typeof(t==null?void 0:t.onScrolling)=="function"&&t.onScrolling(e),e.stopPropagation&&e.stopPropagation(),e.preventDefault&&e.preventDefault(),e.cancelBubble=!0,e.returnValue=!1;const c=(t==null?void 0:t.speed)||1;f?r.scrollLeft-=e.movementX*c:(v||(r.scrollLeft-=e.movementX*c),r.scrollTop-=e.movementY*c)};a.set(r,{dragStart:d,dragEnd:i,drag:p}),r.addEventListener("pointerdown",d),addEventListener("pointerup",i),addEventListener("pointermove",p)},unmounted(r){const{dragStart:n,dragEnd:s,drag:f}=a.get(r);r.removeEventListener("pointerdown",n),removeEventListener("pointerup",s),removeEventListener("pointermove",f)}}})(),S={install(a){a.directive("drag-scroller",u)}};o.default=S,o.dragScroller=u,Object.defineProperties(o,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
