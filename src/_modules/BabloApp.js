
import { storage } from "./storage.js";

class BabloApp {
    constructor() {
        this.root = null;
        this.version = "1.0.0";
        this.baseUrl = document.querySelector("base").href;
        this.state = new Map();
        this.routes = [];
        this.href = window.location.href;
        this.pathname = window.location.pathname;
        this.search = window.location.search;
        this.hash = window.location.hash;
        this.origin = window.location.origin;
        this.protocol = window.location.protocol;
        this.host = window.location.host;
        this.hostname = window.location.hostname;
        this.port = window.location.port;
        this.storage = storage;
        this.roles = this.roles();
        // App State Management
        this.registeredComponents = {}; // Use Map for better performance with large state
        this.componentState = new Map(); // Use Map for better performance with large state
        this.appState = new Map(); // Use Map for better performance with large state
        this.webpCache = new Map();
        this.appCache = new Set(); // Use Set for unique entries
    }
    roles() {
        return {
            admin: "admin",
            user: "user",
            guest: "guest",
        }
    }
    setState(key, value) {
        this.state.set(key, value);
    }
    getState(key) {
        return this.state.get(key);
    }
    clearState() {
        this.state.clear();
    }
    init(config = null) {
        console.log(config);
        this.config = config;
        const root = document.getElementById("root");
        if (root) {
            this.root = root;
        }
        const app = document.getElementById("app");
        if (app) {
            this.root = app;
        }
        if (config && config.app && babloApp.root) {
            this.root = babloApp.root;
        }

        // override the this.keys with app.keys if exists
        if (config) {
            Object.keys(config).forEach(key => {
                this[key] = config[key];
            });
        }
        console.log("BabloApp initialized");
    }
}
export const babloApp = new BabloApp();