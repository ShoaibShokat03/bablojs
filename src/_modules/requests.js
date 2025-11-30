

export const requests = {
    url: (path = "") => {
        let baseUrl = document.querySelector("base").href;
        if (baseUrl.endsWith("/")) {
            baseUrl = baseUrl.slice(0, -1);
        }
        return `${baseUrl}${path.startsWith("/") ? path : "/" + path}`;
    },
    get(paramName) {
        return new URLSearchParams(window.location.search).get(paramName);
    },

    set(paramName, paramValue) {
        const url = new URL(window.location);
        url.searchParams.set(paramName, paramValue);
        window.history.pushState({}, "", url);
    },

    remove(paramName) {
        const url = new URL(window.location);
        url.searchParams.delete(paramName);
        window.history.pushState({}, "", url);
    },

    getAll() {
        return Object.fromEntries(new URLSearchParams(window.location.search));
    },
    windowGetHref: () => window.location.href,
    pathname: () => window.location.pathname,
    search: () => window.location.search,
    hash: () => window.location.hash,
    hostname: () => window.location.hostname,
    port: () => window.location.port,
    protocol: () => window.location.protocol,
    origin: () => window.location.origin,
    baseURL: () => window.location.baseURL,
    fullURL: () => window.location.fullURL,
    href: () => window.location.href,
};