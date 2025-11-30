class Routes {
    constructor(routes = {}) {
        this.routes = routes;
    }
    route(route, component, meta = {}) {
        this.routes[route] = {
            component: component,
            meta: meta,
        };
    }
    all() {
        return this.routes;
    }
    get(route) {
        return this.routes[route];
    }
    has(route) {
        return this.routes[route] !== undefined;
    }
    remove(route) {
        delete this.routes[route];
    }
    clear() {
        this.routes = {};
    }
}
export default Routes;