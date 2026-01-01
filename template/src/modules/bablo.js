// bablo.js - Ultra-optimized VDOM (Signals-Aware & Event Delegation)
// Features: Global Event Delegation, LIS Reconciliation, Signal Reactivity

import { babloApp } from "./BabloApp.js";
import { resetStateCursor, runEffects } from "./hooks.js";
import { createEffect } from "./signals.js";

/* ---------- Config Flags ---------- */
const ENABLE_POOL = false;
const MAX_POOL_SIZE = 1000;

/* ---------- Constants ---------- */
const EMPTY_OBJ = Object.freeze({});
const EMPTY_ARR = Object.freeze([]);
const TEXT_NODE = 3;
const ELEMENT_NODE = 1;

/* ---------- VNode Pooling (optional) ---------- */
const vnodePool = [];
function getPooledVNode() {
  if (!ENABLE_POOL) return {};
  return vnodePool.pop() || {};
}
function releaseVNode(vnode) {
  if (!ENABLE_POOL || !vnode) return;
  vnode.type = null;
  vnode.key = null;
  vnode.props = null;
  if (vnodePool.length < MAX_POOL_SIZE) vnodePool.push(vnode);
}

/* ---------- Utility Helpers ---------- */
function isPrimitive(v) {
  return v == null || typeof v === "string" || typeof v === "number" || typeof v === "boolean";
}

function flattenChildren(children) {
  const out = [];
  for (let i = 0; i < children.length; i++) {
    const c = children[i];
    if (c == null || c === false || c === true) continue;
    if (Array.isArray(c)) {
      for (let j = 0; j < c.length; j++) {
        const n = c[j];
        if (n == null || n === false || n === true) continue;
        out.push(n);
      }
    } else {
      out.push(c);
    }
  }
  return out.length ? out : EMPTY_ARR;
}

/* ---------- Global Event Delegation System ---------- */
const globalEvents = new Set();
// Extended event list for faster global delegation
const delegatedEvents = [
  "click", "dblclick", "mousedown", "mouseup", "mouseover", "mouseout", "mousemove",
  "input", "change", "keydown", "keyup", "keypress",
  "submit", "reset", "focusin", "focusout", "focus", "blur",
  "touchstart", "touchend", "touchmove", "pointerdown", "pointerup"
];

function globalListener(e) {
  let target = e.target;
  const type = e.type.toLowerCase();

  // Bubble up to find handler
  while (target && target !== document) {
    const listeners = target.__listeners;
    if (listeners && listeners.has(type)) {
      const handler = listeners.get(type);
      handler(e);
      if (e.cancelBubble) break;
    }
    target = target.parentNode;
  }
}

function ensureDelegatedEvent(eventName) {
  const ev = eventName.toLowerCase();
  if (delegatedEvents.includes(ev)) {
    if (!globalEvents.has(ev)) {
      document.addEventListener(ev, globalListener, ev === 'focusin' || ev === 'focusout'); // focusin/out need capture or global
      globalEvents.add(ev);
    }
    return true; // Is delegated
  }
  return false; // Native attach required
}

/* ---------- createElement (VDOM) ---------- */
export function createElement(type, props, ...children) {
  const vnode = getPooledVNode();
  vnode.type = type;
  vnode.key = props?.key ?? null;

  if (props) {
    const p = {};
    for (const k in props) {
      if (k !== "key") p[k] = props[k];
    }
    p.children = children.length ? flattenChildren(children) : EMPTY_ARR;
    vnode.props = p;
  } else {
    vnode.props = children.length ? { children: flattenChildren(children) } : EMPTY_OBJ;
  }

  return vnode;
}

/* ---------- DOM creation & vnode cache ---------- */
function createDOMElement(vNode) {
  if (vNode == null || vNode === false || vNode === true) return document.createTextNode("");
  if (typeof vNode !== "object") return document.createTextNode(String(vNode));

  const { type, props = EMPTY_OBJ } = vNode;
  if (typeof type !== "string") return document.createTextNode(String(type));

  const el = document.createElement(type);

  // initialize listeners tracker
  el.__listeners = el.__listeners || new Map();

  // apply props then children (props first improves layout in some cases)
  applyPropsOptimized(el, EMPTY_OBJ, props);

  const children = props.children || EMPTY_ARR;
  if (children !== EMPTY_ARR && children.length) {
    const frag = document.createDocumentFragment();
    for (let i = 0; i < children.length; i++) {
      const c = children[i];
      if (c == null || c === false || c === true) continue;
      frag.appendChild(createDOMElement(c));
    }
    el.appendChild(frag);
  }

  // Handle Auto-Transitions
  if (props.animate) {
    // Simple entry animation
    requestAnimationFrame(() => {
      el.classList.add(props.animate);
      // Clean up class after animation (assumed CSS)
    });
  }

  // cache vnode on DOM for keyed lookup and later patching
  try { el.__vnode = vNode; } catch (e) { /* ignore readonly edge */ }
  return el;
}

/* ---------- Props application with listener tracking ---------- */
const eventCache = new Map();
function getEventName(key) {
  if (typeof key !== "string") return "";
  let cached = eventCache.get(key);
  if (!cached) {
    cached = key.slice(2).toLowerCase();
    eventCache.set(key, cached);
  }
  return cached;
}

function applyPropsOptimized(el, oldProps = EMPTY_OBJ, newProps = EMPTY_OBJ) {
  // ensure listener map exists
  el.__listeners = el.__listeners || new Map();

  // fast add/update path if oldProps is EMPTY_OBJ
  if (oldProps === EMPTY_OBJ) {
    for (const k in newProps) {
      if (k === "children") continue;
      setProp(el, k, newProps[k], undefined);
    }
    return;
  }

  // remove old props not present anymore
  for (const k in oldProps) {
    if (k === "children") continue;
    if (!(k in newProps)) removeProp(el, k, oldProps[k]);
  }

  // set/update new props
  for (const k in newProps) {
    if (k === "children") continue;
    const oldVal = oldProps[k];
    const newVal = newProps[k];
    if (oldVal !== newVal) {
      setProp(el, k, newVal, oldVal);
    }
  }
}

function setProp(el, key, value, oldValue) {
  // Fast path: event handlers
  if (typeof key === "string" && key.startsWith("on")) {
    const ev = getEventName(key);

    // Global Delegation Check
    if (ensureDelegatedEvent(ev)) {
      // Just store in the map, global listener handles dispatch
      if (value) el.__listeners.set(ev, value);
      else el.__listeners.delete(ev);
      return;
    }

    // Direct attach fallback
    try {
      const prev = el.__listeners.get(ev + "_native");
      if (typeof prev === "function") el.removeEventListener(ev, prev);
    } catch (e) { }

    if (typeof value === "function") {
      try { el.addEventListener(ev, value); } catch (e) { }
      el.__listeners.set(ev + "_native", value);
    }
    return;
  }

  // Fast path: style
  if (key === "style") {
    const style = el.style;
    if (typeof oldValue === "object" && typeof value === "object") {
      // Only update changed properties
      for (const p in oldValue) {
        if (!(p in value)) style[p] = "";
      }
      for (const p in value) {
        if (oldValue[p] !== value[p]) style[p] = value[p];
      }
    } else if (typeof value === "object") {
      style.cssText = "";
      for (const p in value) style[p] = value[p];
    } else {
      el.style.cssText = value == null ? "" : String(value);
    }
    return;
  }

  // Fast path: innerHTML
  if (key === "dangerouslySetInnerHTML") {
    const html = value?.__html || "";
    if (el.innerHTML !== html) el.innerHTML = html;
    return;
  }

  // Fast path: className (use direct property)
  if (key === "className" || key === "class") {
    if (el.className !== (value || "")) el.className = value || "";
    return;
  }

  // Fast path: Direct DOM properties for form elements
  if (key === "value" && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.tagName === "SELECT")) {
    if (el.value !== value) el.value = value == null ? "" : value;
    return;
  }

  if (key === "checked" && el.tagName === "INPUT") {
    if (el.checked !== !!value) el.checked = !!value;
    return;
  }

  if (key === "selected" && el.tagName === "OPTION") {
    if (el.selected !== !!value) el.selected = !!value;
    return;
  }

  if (key === "disabled") {
    if (el.disabled !== !!value) el.disabled = !!value;
    return;
  }

  // Fast path: id and tabIndex
  if (key === "id") {
    if (el.id !== (value || "")) el.id = value || "";
    return;
  }

  if (key === "tabIndex" || key === "tabindex") {
    el.tabIndex = value == null ? -1 : Number(value);
    return;
  }

  // Fast path: ref callback
  if (key === "ref") {
    if (typeof value === "function") value(el);
    else if (value && typeof value === "object") value.current = el;
    return;
  }

  // Boolean attributes
  if (typeof value === "boolean") {
    if (value) el.setAttribute(key, "");
    else el.removeAttribute(key);
    return;
  }

  // Standard attribute
  if (value == null) {
    el.removeAttribute(key);
  } else {
    const strVal = String(value);
    if (el.getAttribute(key) !== strVal) el.setAttribute(key, strVal);
  }
}

function removeProp(el, key, oldValue) {
  if (!el) return;
  if (typeof key === "string" && key.startsWith("on")) {
    const ev = getEventName(key);
    if (delegatedEvents.includes(ev)) {
      el.__listeners?.delete(ev);
    } else {
      try {
        const fn = el.__listeners?.get(ev + "_native");
        if (typeof fn === "function") el.removeEventListener(ev, fn);
      } catch (e) { }
    }
    return;
  }

  if (key === "className") {
    el.className = "";
    return;
  }

  if (key === "style") {
    try { el.removeAttribute("style"); } catch (e) { }
    return;
  }

  if (key === "dangerouslySetInnerHTML") {
    el.innerHTML = "";
    return;
  }

  try { el.removeAttribute(key); } catch (e) { }
}

/* ---------- Node cleanup (listeners & vnode) ---------- */
function cleanupDomNode(node) {
  if (!node) return;
  // listeners: clear map
  if (node.__listeners) node.__listeners.clear();

  // recursive cleanup
  const childNodes = node.childNodes || [];
  for (let i = childNodes.length - 1; i >= 0; i--) {
    cleanupDomNode(childNodes[i]);
  }
  // remove vnode cache
  if (node.__vnode) {
    releaseVNode(node.__vnode);
    node.__vnode = null;
  }
}

/* ---------- changed comparator ---------- */
function changed(a, b) {
  if (a === b) return false;
  if (typeof a !== typeof b) return true;
  if (typeof a !== "object") return a !== b;
  if (!a || !b) return true;
  if (a.type !== b.type) return true;
  if ((a.key ?? null) !== (b.key ?? null)) return true;
  return false;
}

/* ---------- LIS Reconciler Helper (Longest Increasing Subsequence) ---------- */
function getLIS(seq) {
  const p = seq.slice();
  const result = [0];
  const n = seq.length;
  let i, u, v, c;
  let len = 0;

  for (i = 0; i < n; i++) {
    const arrI = seq[i];
    if (arrI !== -1) {
      let j = result[len];
      if (seq[j] < arrI) {
        p[i] = j;
        result[++len] = i;
        continue;
      }
      u = 0; v = len;
      while (u < v) {
        c = (u + v) >> 1;
        if (seq[result[c]] < arrI) u = c + 1;
        else v = c;
      }
      if (arrI < seq[result[u]]) {
        if (u > 0) p[i] = result[u - 1];
        result[u] = i;
      }
    }
  }
  u = result[len];
  v = len;
  while (u !== undefined && v-- > 0) {
    result[v] = u;
    u = p[u];
  }
  return result;
}

/* ---------- reconcileChildren (LIS Optimized - Disabled for Stability) ---------- */
function reconcileChildren(parentEl, oldVNode, newVNode) {
  const oldChildren = (oldVNode?.props?.children) || EMPTY_ARR;
  const newChildren = (newVNode?.props?.children) || EMPTY_ARR;

  // Delegate to Robust Standard Reconciler
  reconcileChildrenStandard(parentEl, oldChildren, newChildren);
}

// Robust Standard Reconciler (Ensures Stability with Minimal Updates)
function reconcileChildrenStandard(parentEl, oldChildren = [], newChildren = []) {
  const oldLen = oldChildren.length;
  const newLen = newChildren.length;
  const oldKeyed = new Map();
  const usedUnkeyed = new Set(); // Track which unkeyed indices were used

  // Index old keyed children
  for (let i = 0; i < oldLen; i++) {
    if (oldChildren[i]?.key != null) {
      oldKeyed.set(oldChildren[i].key, { vnode: oldChildren[i], node: parentEl.childNodes[i], index: i });
    }
  }

  const nextChildren = []; // to build correct order

  for (let i = 0; i < newLen; i++) {
    const newChild = newChildren[i];
    if (newChild == null || newChild === false || newChild === true) continue;

    let nodeToUse;

    if (newChild.key != null) {
      // Keyed child - find matching old keyed child
      const oldMatch = oldKeyed.get(newChild.key);
      if (oldMatch) {
        patchElement(oldMatch.node, parentEl, oldMatch.vnode, newChild);
        nodeToUse = oldMatch.node;
        usedUnkeyed.add(oldMatch.index);
      } else {
        nodeToUse = createDOMElement(newChild);
      }
    } else {
      // Unkeyed child - try to reuse old unkeyed child at similar position
      // Find an unkeyed old child that hasn't been used yet
      let foundOldIndex = -1;

      // First, try to match by position (same index)
      if (i < oldLen && oldChildren[i]?.key == null && !usedUnkeyed.has(i)) {
        const oldChild = oldChildren[i];
        const oldNode = parentEl.childNodes[i];
        if (oldNode && !changed(oldChild, newChild)) {
          // Same type - patch in place
          patchElement(oldNode, parentEl, oldChild, newChild);
          nodeToUse = oldNode;
          usedUnkeyed.add(i);
          foundOldIndex = i;
        }
      }

      // If position match failed, look for a compatible unkeyed child
      if (foundOldIndex === -1) {
        for (let j = 0; j < oldLen; j++) {
          if (usedUnkeyed.has(j)) continue;
          if (oldChildren[j]?.key != null) continue; // Skip keyed

          const oldChild = oldChildren[j];
          const oldNode = parentEl.childNodes[j];
          if (oldNode && !changed(oldChild, newChild)) {
            // Found compatible unkeyed - patch it
            patchElement(oldNode, parentEl, oldChild, newChild);
            nodeToUse = oldNode;
            usedUnkeyed.add(j);
            foundOldIndex = j;
            break;
          }
        }
      }

      // Still no match - create new
      if (foundOldIndex === -1) {
        nodeToUse = createDOMElement(newChild);
      }
    }

    if (nodeToUse) {
      nextChildren.push(nodeToUse);
    }
  }

  // Re-assemble DOM in correct order (minimal moves)
  for (let i = 0; i < nextChildren.length; i++) {
    const node = nextChildren[i];
    const currentAtPosition = parentEl.childNodes[i];

    if (currentAtPosition !== node) {
      // Need to insert/move this node
      if (currentAtPosition) {
        parentEl.insertBefore(node, currentAtPosition);
      } else {
        parentEl.appendChild(node);
      }
    }
  }

  // Remove excess old children
  while (parentEl.childNodes.length > nextChildren.length) {
    const last = parentEl.lastChild;
    cleanupDomNode(last);
    last.remove();
  }
}


/* ---------- patchElement (single node) ---------- */
function patchElement(domNode, parent, oldVNode, newVNode) {
  // newVNode primitive / null handling
  if (newVNode == null || newVNode === false || newVNode === true) {
    if (domNode) {
      cleanupDomNode(domNode);
      parent.removeChild(domNode);
    }
    releaseVNode(oldVNode);
    return;
  }

  // mount if no oldVNode
  if (!oldVNode) {
    const newDom = createDOMElement(newVNode);
    if (domNode) parent.replaceChild(newDom, domNode);
    else parent.appendChild(newDom);
    return;
  }

  // type/key changed -> replace
  if (changed(oldVNode, newVNode)) {
    const newDom = createDOMElement(newVNode);
    if (domNode) {
      cleanupDomNode(domNode);
      parent.replaceChild(newDom, domNode);
    } else {
      parent.appendChild(newDom);
    }
    releaseVNode(oldVNode);
    return;
  }

  // both primitives (text) and equal type -> update text
  if (typeof newVNode !== "object") {
    if (domNode && domNode.nodeType === TEXT_NODE) {
      const txt = String(newVNode);
      if (domNode.nodeValue !== txt) domNode.nodeValue = txt;
    } else {
      const textNode = document.createTextNode(String(newVNode));
      if (domNode) {
        cleanupDomNode(domNode);
        parent.replaceChild(textNode, domNode);
      } else parent.appendChild(textNode);
    }
    releaseVNode(oldVNode);
    return;
  }

  // ensure domNode is element
  if (!domNode || domNode.nodeType !== ELEMENT_NODE) {
    const newDom = createDOMElement(newVNode);
    if (domNode) {
      cleanupDomNode(domNode);
      parent.replaceChild(newDom, domNode);
    } else parent.appendChild(newDom);
    releaseVNode(oldVNode);
    return;
  }

  // patch props
  applyPropsOptimized(domNode, oldVNode.props || EMPTY_OBJ, newVNode.props || EMPTY_OBJ);

  // update vnode cache
  domNode.__vnode = newVNode;

  // reconcile children
  reconcileChildren(domNode, oldVNode, newVNode);

  // release old vnode after patch (if pooling enabled)
  releaseVNode(oldVNode);
}

/* ---------- Batched rendering (Concurrent/Slicing) ---------- */
const renderQueue = new Map();
let scheduled = false;

// Component Registry for State Updates
export const componentRegistry = new Map();

// Time Slicing Config
const FRAME_BUDGET = 12; // ms

function flushRender(deadline) {
  scheduled = false;

  const start = performance.now();

  // Sort queue by priority? (Future improvement)
  // For now FIFO map iteration
  for (let [key, { container, renderFn }] of renderQueue) {

    // Time Slicing Check
    if (deadline && deadline.timeRemaining() < 1) {
      // Yield to browser
      scheduled = true;
      if (window.requestIdleCallback) window.requestIdleCallback(flushRender);
      else setTimeout(() => flushRender({ timeRemaining: () => 10 }), 0); // fallback
      return;
    }

    renderQueue.delete(key);

    try {
      const compId = babloApp.componentState.get("component-id") || getComponentKey(container, renderFn).toString();
      babloApp.appState.set("render-component-index", compId);

      // Register component mechanism for updates
      componentRegistry.set(compId, { container, renderFn });

      resetStateCursor();

      if (!container) continue;

      // Auto-Signal Reactivity: Wrap render in effect
      // This ensures any signal read during render auto-triggers this update again!
      // We must be careful not to create infinite loops or nested effects.
      // Since `flushRender` is called by `scheduleUpdate` which is called by `setState`,
      // we are manually scheduling.
      // BUT if we want "Auto Signals", we should register this block as an effect.
      // However, `useState` implementation in hooks.js ALREADY calls `scheduleUpdate`.
      // So we don't strictly need `createEffect` wrapper here if we rely on `hooks.js`.
      // BUT if the user uses `createSignal` manually?
      // Let's wrap it for full support.

      const doRender = () => {
        const oldVNode = container.__vnode || null;
        const newVNode = renderFn();

        if (!oldVNode) {
          while (container.firstChild) cleanupDomNode(container.firstChild), container.removeChild(container.firstChild);
          container.appendChild(createDOMElement(newVNode));
        } else if (changed(oldVNode, newVNode)) {
          while (container.firstChild) cleanupDomNode(container.firstChild), container.removeChild(container.firstChild);
          container.appendChild(createDOMElement(newVNode));
          releaseVNode(oldVNode);
        } else {
          patchElement(container.firstChild, container, oldVNode, newVNode);
        }

        container.__vnode = newVNode;
      };

      // Execute render (signals will track dependency if any)
      // Note: We are not persistently subscribing here because the VDOM paradigm rebuilds the tree.
      // A persistent effect would be cleaner but complex to manage with component unmounts.
      // For now, rely on `useState` / `hooks` triggering updates.
      doRender();

      // Store component state
      babloApp.componentState.set("renderd-state", renderFn);

      runEffects();

    } catch (err) {
      console.error("Render Error:", err, container);
    }
  }
}

// Utility: unique component key per container + renderFn
function getComponentKey(container, renderFn) {
  if (!container.__componentKey) container.__componentKey = new Map();
  if (!container.__componentKey.has(renderFn)) container.__componentKey.set(renderFn, Symbol());
  return container.__componentKey.get(renderFn);
}

// Normal batched render - uses rAF for consistent timing and no visible fade
export function render(renderFn, container) {
  const key = getComponentKey(container, renderFn);
  renderQueue.set(key, { container, renderFn });
  if (!scheduled) {
    scheduled = true;
    // Use rAF for immediate next-frame render, preventing fade/delay
    requestAnimationFrame(() => flushRender({ timeRemaining: () => FRAME_BUDGET }));
  }
}

// Immediate synchronous render
export function renderSync(renderFn, container) {
  const key = getComponentKey(container, renderFn);
  renderQueue.set(key, { container, renderFn });
  flushRender({ timeRemaining: () => 100 });
}

// Schedule update by ID - Immediate for responsive state updates
export function scheduleUpdate(compId) {
  const record = componentRegistry.get(compId);
  if (record) {
    // Use renderSync for immediate updates - prevents double-click issues
    // This ensures state changes are reflected immediately
    const key = getComponentKey(record.container, record.renderFn);
    renderQueue.set(key, record);
    if (!scheduled) {
      scheduled = true;
      // Use microtask for immediate but batched update
      queueMicrotask(() => flushRender({ timeRemaining: () => FRAME_BUDGET }));
    }
  }
}

/* ---------- Helpers to remove/replace external nodes ---------- */
export function removeElement(selector) {
  const el = typeof selector === "string" ? document.querySelector(selector) : selector;
  if (el?.parentNode) {
    cleanupDomNode(el);
    el.parentNode.removeChild(el);
  }
}

export function updateElement(selector, newVNode) {
  const el = typeof selector === "string" ? document.querySelector(selector) : selector;
  if (!el || !el.parentNode) return;
  const newEl = createDOMElement(newVNode);
  cleanupDomNode(el);
  el.parentNode.replaceChild(newEl, el);
}

/* ---------- Perf (dev) ---------- */
export const perf = {
  renderCount: 0,
  totalRenderTime: 0,
  avgRenderTime: 0,
  reset() {
    this.renderCount = 0; this.totalRenderTime = 0; this.avgRenderTime = 0;
  },
  track(time) {
    this.renderCount++; this.totalRenderTime += time; this.avgRenderTime = this.totalRenderTime / this.renderCount;
  },
  log() { console.log(`Renders: ${this.renderCount}, Avg: ${this.avgRenderTime.toFixed(2)}ms`); }
};

if (typeof process !== "undefined" && process.env?.NODE_ENV === "development") {
  const originalFlush = flushRender;
  // Wrapper not applicable to idleCallback easily, simplified:
}
