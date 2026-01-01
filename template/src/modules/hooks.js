import { render, scheduleUpdate } from "./bablo.js";
import { babloApp } from "./BabloApp.js";
import { createSignal, createEffect, createMemo, batch, untrack } from "./signals.js";
import Config from "../app/config/config.js";

// Re-export batch and untrack for use in components
export { batch, untrack };

/* ---------- Internal State ---------- */
let stateCursor = 0;
let effectCursor = 0;
let memoCursor = 0;
let refCursor = 0;

let effects = [];

/* ---------- Type checking helper ---------- */
function getValueType(value) {
  if (value === null) return 'null';
  if (Array.isArray(value)) return 'array';
  return typeof value;
}

function ensureTypeMatch(value, initialValue) {
  // If value is undefined or null (when initialValue is not null), return initialValue
  if (value === undefined) return initialValue;

  // Check if types match
  const valueType = getValueType(value);
  const initialType = getValueType(initialValue);

  // If types don't match, return initialValue to maintain type consistency
  if (valueType !== initialType) {
    return initialValue;
  }

  // Special check for null - null should match null
  if (initialValue === null && value !== null) {
    return initialValue;
  }

  // Special check for arrays - ensure it's actually an array
  if (initialType === 'array' && !Array.isArray(value)) {
    return initialValue;
  }

  // Types match, return the value
  return value;
}

/* ---------- useState (Powered by Signals) ---------- */
export function useState(initialValue, manualKey = null) {
  const index = stateCursor++;
  const compKey = babloApp.appState.get("render-component-index");

  if (!compKey && !manualKey) {
    if (Config?.debug) console.warn("useState called outside render context without a manual key. This might cause stale state.");
    return [initialValue, (v) => v];
  }

  // Use manualKey if provided, otherwise use component-scoped key
  const key = manualKey ? `manual-${manualKey}` : `state-${compKey}-${index}`;

  const freshType = getValueType(initialValue);
  const storedRecord = babloApp.appState.get(key);

  if (storedRecord) {
    // AUTOMATIC COLLISION HANDLING: If the new initialValue type doesn't match the stored one,
    // the component structure has likely shifted. We reset the state to ensure correctness.
    if (storedRecord.initialType !== freshType && initialValue !== undefined) {
      if (Config?.debug) console.log(`useState[${key}]: Scoping shift. Resetting to ${freshType}.`);
      storedRecord.set(initialValue);
      storedRecord.initialType = freshType;
    }
  } else {
    const [get, set] = createSignal(initialValue);
    babloApp.appState.set(key, { get, set, initialType: freshType });
  }

  const { get, set, initialType } = babloApp.appState.get(key);
  const currentValue = get();

  const setState = (val) => {
    const next = typeof val === "function" ? val(get()) : val;
    if (Object.is(get(), next)) return;

    // Stricter safety: Prevent setting a string to a boolean state, etc.
    const nextType = getValueType(next);
    if (initialType !== 'null' && initialType !== 'undefined' && nextType !== initialType) {
      console.error(`useState[${key}]: Type mismatch Error. Expected ${initialType}, got ${nextType}. Rejected.`);
      return;
    }

    set(next);
    if (compKey) scheduleUpdate(compKey);
  };

  return [currentValue, setState];
}

/* ---------- Reset Cursors ---------- */
export function resetStateCursor() {
  stateCursor = 0;
  effectCursor = 0;
  memoCursor = 0;
  refCursor = 0;
  effects = [];
}

/* ---------- useEffect (Standard) ---------- */
export function useEffect(callback, dependencies) {
  const index = effectCursor++;
  const compKey = babloApp.appState.get("render-component-index");
  if (!compKey) {
    console.warn("useEffect called outside render context");
    return;
  }

  const key = `effect-${compKey}-${index}`;

  const old = babloApp.appState.get(key) || { deps: undefined, cleanup: null };

  const hasChanged =
    !dependencies ||
    !old.deps ||
    dependencies.length !== old.deps.length ||
    dependencies.some((d, i) => !Object.is(d, old.deps[i]));

  if (hasChanged) {
    effects.push(() => {
      if (old.cleanup) {
        try { old.cleanup(); } catch (e) { console.error("Effect cleanup error:", e); }
      }
      try {
        const cleanup = callback();
        babloApp.appState.set(key, { deps: dependencies ? [...dependencies] : undefined, cleanup });
      } catch (e) {
        console.error("Effect error:", e);
        babloApp.appState.set(key, { deps: dependencies ? [...dependencies] : undefined, cleanup: null });
      }
    });
  }
}

/* ---------- useRef (Component-scoped) ---------- */
export function useRef(initialValue) {
  const index = refCursor++;
  const compKey = babloApp.appState.get("render-component-index");
  if (!compKey) {
    console.warn("useRef called outside render context");
    return { current: initialValue };
  }

  const key = `ref-${compKey}-${index}`;

  // Initialize ref if not exists (component-scoped)
  if (!babloApp.appState.has(key)) {
    babloApp.appState.set(key, { current: initialValue });
  }

  return babloApp.appState.get(key);
}

/* ---------- useMemo (Component-scoped) ---------- */
export function useMemo(factory, dependencies) {
  const index = memoCursor++;
  const compKey = babloApp.appState.get("render-component-index");
  if (!compKey) {
    console.warn("useMemo called outside render context");
    return factory();
  }

  const key = `memo-${compKey}-${index}`;

  const cache = babloApp.appState.get(key);

  if (!cache) {
    const value = factory();
    babloApp.appState.set(key, { value, deps: dependencies ? [...dependencies] : undefined });
    return value;
  }

  const { value, deps } = cache;
  const hasChanged =
    !deps ||
    !dependencies ||
    dependencies.length !== deps.length ||
    dependencies.some((d, i) => !Object.is(d, deps[i]));

  if (hasChanged) {
    const newValue = factory();
    babloApp.appState.set(key, { value: newValue, deps: dependencies ? [...dependencies] : undefined });
    return newValue;
  }

  return value;
}

/* ---------- useCallback (Optimized) ---------- */
export function useCallback(callback, dependencies) {
  return useMemo(() => callback, dependencies);
}

/* ---------- Run Effects ---------- */
export function runEffects() {
  // Process effects in order, executing immediately after render
  // Immediate execution prevents fade and ensures UI is updated together
  const pendingEffects = [...effects];
  effects = [];

  // Execute effects synchronously for immediate UI updates
  pendingEffects.forEach((fn) => {
    try {
      fn();
    } catch (e) {
      console.error("Effect execution error:", e);
    }
  });
}


