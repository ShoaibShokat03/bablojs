/**
 * signals.js - Ultra-fast fine-grained reactivity engine
 * Features: Batched updates, efficient dependency tracking, minimal re-renders
 */

let context = [];
let batchDepth = 0;
let pendingUpdates = new Set();

function getCurrentObserver() {
    return context[context.length - 1];
}

// Check if values are equal (handles objects shallowly)
function isEqual(a, b) {
    if (Object.is(a, b)) return true;
    if (typeof a !== typeof b) return false;
    if (a == null || b == null) return false;
    if (typeof a !== 'object') return false;
    // For objects, we do reference equality only
    return false;
}

export function createSignal(value) {
    const subscribers = new Set();

    const read = () => {
        const observer = getCurrentObserver();
        if (observer) subscribers.add(observer);
        return value;
    };

    const write = (newValue) => {
        if (typeof newValue === 'function') {
            newValue = newValue(value);
        }

        // Skip if no change
        if (isEqual(newValue, value)) return;

        value = newValue;

        // Notify subscribers
        if (batchDepth > 0) {
            // In batch mode, queue updates
            subscribers.forEach(fn => pendingUpdates.add(fn));
        } else {
            // Immediate update
            const observers = [...subscribers];
            observers.forEach(fn => fn());
        }
    };

    return [read, write];
}

export function createEffect(fn) {
    const execute = () => {
        context.push(execute);
        try {
            fn();
        } finally {
            context.pop();
        }
    };

    execute();
}

export function createMemo(fn) {
    const [s, set] = createSignal();
    createEffect(() => set(fn()));
    return s;
}

// Batch multiple signal updates together
export function batch(fn) {
    batchDepth++;
    try {
        fn();
    } finally {
        batchDepth--;
        if (batchDepth === 0 && pendingUpdates.size > 0) {
            // Flush all pending updates
            const updates = [...pendingUpdates];
            pendingUpdates.clear();
            updates.forEach(fn => fn());
        }
    }
}

// Untracked read - doesn't subscribe
export function untrack(fn) {
    const prev = context;
    context = [];
    try {
        return fn();
    } finally {
        context = prev;
    }
}

