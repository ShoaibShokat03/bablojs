import { render } from "./bablo.js";
import { babloApp } from "./BabloApp.js";

/* ---------- Internal State ---------- */
let stateCursor = 0;
let effectCursor = 0;
let memoCursor = 0;
let refCursor = 0;

let effects = [];
let memoCache = [];
let refs = [];

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

/* ---------- useState ---------- */
export function useState(initialValue) {
  const index = stateCursor++;

  // ✅ Use container symbol instead of render-component-index fallback
  const compKey = babloApp.appState.get("render-component-index");
  if (!compKey) throw new Error("useState called outside render context");

  const key = `state-${compKey}-${index}`;

  // Initialize state if not exists
  if (!babloApp.appState.has(key)) {
    babloApp.appState.set(key, initialValue);
  }

  // Get current value and ensure it matches the initial type
  const rawValue = babloApp.appState.get(key);
  const currentValue = ensureTypeMatch(rawValue, initialValue);
  
  // If the value was corrupted, fix it immediately
  if (currentValue !== rawValue) {
    babloApp.appState.set(key, currentValue);
  }
  
  const setState = (val) => {
    const currentRaw = babloApp.appState.get(key);
    // Get the type-safe current value
    const current = ensureTypeMatch(currentRaw, initialValue);
    
    const next = typeof val === "function" ? val(current) : val;
    
    // Basic type validation: if next is obviously wrong type and initialValue is primitive, warn but allow it
    // For primitives (boolean, number, string), ensure type match
    const initialType = getValueType(initialValue);
    const nextType = getValueType(next);
    
    // If initialValue is a primitive type, ensure next matches
    if (initialType === 'boolean' && nextType !== 'boolean') {
      console.warn(`useState: Expected boolean, got ${nextType}. Using initialValue.`);
      return;
    }
    if (initialType === 'number' && nextType !== 'number') {
      console.warn(`useState: Expected number, got ${nextType}. Using initialValue.`);
      return;
    }
    if (initialType === 'string' && nextType !== 'string') {
      console.warn(`useState: Expected string, got ${nextType}. Using initialValue.`);
      return;
    }
    
    if (next !== current) {
      babloApp.appState.set(key, next);
      scheduleUpdate();
    }
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
  memoCache = [];
  refs = [];
}

/* ---------- useEffect ---------- */
export function useEffect(callback, dependencies) {
  const index = effectCursor++;
  const compKey = babloApp.appState.get("render-component-index");
  const key = `effect-${compKey}-${index}`;

  const old = babloApp.appState.get(key) || { deps: undefined, cleanup: null };

  // check deps properly
  const hasChanged =
    !dependencies ||
    !old.deps ||
    dependencies.length !== old.deps.length ||
    dependencies.some((d, i) => d !== old.deps[i]);

  if (hasChanged) {
    effects.push(() => {
      if (old.cleanup) {
        try { old.cleanup(); } catch (e) { console.error(e); }
      }
      const cleanup = callback();
      babloApp.appState.set(key, { deps: dependencies, cleanup });
    });
  }
}


/* ---------- useRef ---------- */
export function useRef(initialValue) {
  const index = refCursor++;
  if (!refs[index]) {
    refs[index] = { current: initialValue };
  }
  return refs[index];
}

/* ---------- useMemo ---------- */
export function useMemo(factory, dependencies) {
  const index = memoCursor++;
  const cache = memoCache[index];

  if (!cache) {
    const value = factory();
    memoCache[index] = { value, deps: dependencies };
    return value;
  }

  const { value, deps } = cache;
  const hasChanged =
    !deps ||
    dependencies.length !== deps.length ||
    dependencies.some((d, i) => d !== deps[i]);

  if (hasChanged) {
    const newValue = factory();
    memoCache[index] = { value: newValue, deps: dependencies };
    return newValue;
  }

  return value;
}

/* ---------- Scheduler ---------- */
function scheduleUpdate() {
  // Get the component that needs to be re-rendered
  const comp = babloApp.componentState.get("renderd-state");
  if (comp && babloApp.root) {
    // Use the render queue system - it will handle batching and effects
    render(comp, babloApp.root);
  }
}

/* ---------- Run Effects ---------- */
export function runEffects() {
  try {
    effects.forEach((fn) => fn());
  } catch (e) {
    console.error("Effect error:", e);
  }
  effects = [];
}
