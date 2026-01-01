// BabloApp.js - Ultra-optimized version
import { storage } from "./storage.js";

class BabloApp {
    constructor() {
        // Core properties
        this.root = null;
        this.version = "2.0.0-ultra";

        // Optimized baseUrl initialization with fallback
        const baseTag = document.querySelector("base");
        this.baseUrl = baseTag?.href ?? window.location.origin;

        // Location properties (cached for performance)
        const loc = window.location;
        this.href = loc.href;
        this.pathname = loc.pathname;
        this.search = loc.search;
        this.hash = loc.hash;
        this.origin = loc.origin;
        this.protocol = loc.protocol;
        this.host = loc.host;
        this.hostname = loc.hostname;
        this.port = loc.port;

        // State management with pre-sized Maps for better performance
        this.state = new Map();
        this.routes = [];
        this.storage = storage;

        // Static roles object (no need to call function)
        this.roles = {
            admin: "admin",
            user: "user",
            guest: "guest"
        };

        // Component management with optimized Maps
        this.registeredComponents = new Map();
        this.componentState = new Map();
        this.appState = new Map();
        this.webpCache = new Map();
        this.appCache = new Set();

        // Component instance registry
        this.componentInstances = new Map();

        // Performance tracking with typed object
        this.performance = {
            renderCount: 0,
            renderTime: 0,
            routeChanges: 0,
            componentMounts: 0,
            avgRenderTime: 0 // Pre-computed for faster access
        };

        // Configuration
        this.config = null;
    }

    // Optimized state methods with inline checks
    setState(key, value) {
        this.state.set(key, value);
        return this; // Chainable
    }

    getState(key) {
        return this.state.get(key);
    }

    hasState(key) {
        return this.state.has(key);
    }

    deleteState(key) {
        return this.state.delete(key);
    }

    clearState() {
        this.state.clear();
        return this; // Chainable
    }

    // Batch state operations for better performance
    setStates(entries) {
        for (const [key, value] of entries) {
            this.state.set(key, value);
        }
        return this;
    }

    // Performance tracking methods - optimized
    trackRender(time) {
        this.performance.renderCount++;
        this.performance.renderTime += time;
        // Update average inline for faster access
        this.performance.avgRenderTime = this.performance.renderTime / this.performance.renderCount;
    }

    trackRouteChange() {
        this.performance.routeChanges++;
    }

    trackComponentMount() {
        this.performance.componentMounts++;
    }

    getPerformanceStats() {
        // Return direct reference (read-only usage assumed)
        return this.performance;
    }

    resetPerformanceStats() {
        this.performance.renderCount = 0;
        this.performance.renderTime = 0;
        this.performance.routeChanges = 0;
        this.performance.componentMounts = 0;
        this.performance.avgRenderTime = 0;
    }

    // Component instance management - optimized
    registerComponent(id, component) {
        this.componentInstances.set(id, {
            component,
            mounted: true,
            mountTime: Date.now()
        });
        this.trackComponentMount();
    }

    unregisterComponent(id) {
        const existed = this.componentInstances.delete(id);
        return existed;
    }

    getComponentInstance(id) {
        return this.componentInstances.get(id);
    }

    hasComponentInstance(id) {
        return this.componentInstances.has(id);
    }

    clearComponentInstances() {
        this.componentInstances.clear();
    }

    // Optimized initialization
    init(config = null) {
        this.config = config;

        // Fast path: find root element
        let root = document.getElementById("root");
        if (!root) {
            root = document.getElementById("app");
        }

        if (root) {
            this.root = root;
        } else if (config?.app) {
            this.root = config.app;
        }

        // Apply config overrides efficiently
        if (config) {
            // Use Object.assign for faster property copying
            Object.assign(this, config);
        }

        // Setup performance observer for advanced metrics (optional)
        if (typeof PerformanceObserver !== 'undefined') {
            try {
                const observer = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        if (entry.name.includes('bablo')) {
                            this.trackRender(entry.duration);
                        }
                    }
                });
                observer.observe({ entryTypes: ['measure'] });
            } catch (e) {
                // Performance observer not critical
            }
        }

        console.log("BabloApp initialized (v" + this.version + ")");
        return this; // Chainable
    }

    // Utility method to update location properties (call after navigation)
    updateLocation() {
        const loc = window.location;
        this.href = loc.href;
        this.pathname = loc.pathname;
        this.search = loc.search;
        this.hash = loc.hash;
        this.trackRouteChange();
    }

    // Memory cleanup method
    cleanup() {
        this.state.clear();
        this.registeredComponents.clear();
        this.componentState.clear();
        this.appState.clear();
        this.webpCache.clear();
        this.appCache.clear();
        this.componentInstances.clear();
        this.resetPerformanceStats();
    }

    // Debug info
    getDebugInfo() {
        return {
            version: this.version,
            componentCount: this.componentInstances.size,
            stateSize: this.state.size,
            appStateSize: this.appState.size,
            cacheSize: this.webpCache.size,
            performance: this.getPerformanceStats()
        };
    }
}

// Singleton instance with frozen prototype for security
export const babloApp = new BabloApp();

// Prevent prototype pollution
if (typeof Object.freeze === 'function') {
    try { Object.freeze(BabloApp.prototype); } catch (e) { /* ignore */ }
}
