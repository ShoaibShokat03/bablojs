import Home from "../views/Home.js";
import { render } from "./bablo.js";
import { babloApp } from "./BabloApp.js";
import { A, Button, Div, H1, P, Strong } from "./html.js";
import { requests } from "./requests.js";

const notFound = () => {
  return Div(
    {
      style: "width: 100%; height: 100vh; display: flex; justify-content: center; align-items: center; background-color: #f8f9fa;"
    },
    Div(
      { style: "text-align: center; color: #343a40;" },
      H1(
        {
          style: "font-size: 3rem; font-weight: 700; margin-bottom: 1rem;",
        },
        "404"
      ),
      P({ style: "font-size: 1.1rem;" }, "Page not found"),
      A(
        {
          href: requests.url("/"),
          style: " margin-top: 1rem; color: #007bff; text-decoration: none;",
        },
        "Go Home"
      )
    )
  );
}

const errorPage = (error) => {
  return Div(
    {
      style: "width: 100%; height: 100vh; display: flex; justify-content: center; align-items: center; background-color: #f8f9fa;"
    },
    Div(
      { style: "text-align: center; color: #343a40;" },
      H1(
        {
          style: "font-size: 3rem; font-weight: 700; margin-bottom: 1rem;",
        },
        "Error"
      ),
      P({ style: "font-size: 1.1rem;" }, error),
      A(
        {
          href: requests.url("/"),
          style: " margin-top: 1rem; color: #007bff; text-decoration: none;",
        },
        "Go Home"
      )
    )
  );
}

const unauthorized = () =>
  Div(
    {
      style: {
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8f9fa",
      },
    },
    Div(
      { style: { textAlign: "center", color: "#343a40" } },
      H1(
        {
          style: { fontSize: "3rem", fontWeight: "700", marginBottom: "1rem" },
        },
        "Unauthorized"
      ),
      P(
        { style: { fontSize: "1.1rem" } },
        "You don’t have permission to access this page."
      ),
      A(
        {
          href: requests.url("/login"),
          style: {
            marginTop: "1rem",
            color: "#007bff",
            textDecoration: "none",
          },
        },
        "Login"
      )
    )
  );

function setPageProps(routeObj) {
  if (!routeObj || typeof routeObj !== "object") return;

  // fallback checks meta, direct, app config, then globally defined (if any), then fallbackVal, empty
  const fallback = (k, fallbackVal) =>
  (routeObj?.meta && routeObj.meta[k] != null ? routeObj.meta[k]
    : (routeObj[k] != null ? routeObj[k]
      : (babloApp?.app && babloApp.app[k] != null ? babloApp.app[k]
        : (babloApp && babloApp[k] != null ? babloApp[k]
          : fallbackVal ?? ""))));

  const metaTags = {
    title: fallback("title", babloApp?.app?.name),
    description: fallback("description", babloApp?.app?.description),
    keywords: fallback("keywords", babloApp?.app?.keywords),
    robots: fallback("robots", babloApp?.app?.robots),
    author: fallback("author", babloApp?.app?.author),
    license: fallback("license", babloApp?.app?.license),
    ogImage: fallback("ogImage", babloApp?.app?.ogImage),
    twitterImage: fallback("twitterImage", babloApp?.app?.twitterImage),
    twitterTitle: fallback("twitterTitle", babloApp?.app?.twitterTitle),
    twitterDescription: fallback("twitterDescription", babloApp?.app?.twitterDescription),
    twitterCard: fallback("twitterCard", babloApp?.app?.twitterCard),
    twitterUrl: fallback("twitterUrl", babloApp?.app?.twitterUrl),
    twitterSite: fallback("twitterSite", babloApp?.app?.twitterSite),
    twitterCreator: fallback("twitterCreator", babloApp?.app?.twitterCreator),
    twitterDomain: fallback("twitterDomain", babloApp?.app?.twitterDomain),
  };

  // Set page title
  document.title =
    metaTags.title && metaTags.title !== babloApp?.app?.name
      ? `${metaTags.title} - ${babloApp?.app?.name || ""}`
      : babloApp?.app?.name || "";

  // Utility to get-or-create a meta tag
  const getOrCreateMeta = (selector, attrs = {}) => {
    let el = document.querySelector(selector);
    if (!el) {
      el = document.createElement("meta");
      Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
      document.head.appendChild(el);
    }
    return el;
  };

  // Standard Meta Tags
  getOrCreateMeta('meta[name="description"]', { name: "description" }).content =
    metaTags.description || "";

  getOrCreateMeta('meta[name="keywords"]', { name: "keywords" }).content =
    metaTags.keywords || "";

  getOrCreateMeta('meta[name="robots"]', { name: "robots" }).content =
    metaTags.robots || "";

  getOrCreateMeta('meta[name="author"]', { name: "author" }).content =
    metaTags.author || "";

  getOrCreateMeta('meta[name="license"]', { name: "license" }).content =
    metaTags.license || "";

  // Open Graph (og:) Tags for better social sharing
  getOrCreateMeta('meta[property="og:title"]', { property: "og:title" }).content =
    metaTags.title && metaTags.title !== babloApp?.app?.name
      ? `${metaTags.title} - ${babloApp?.app?.name || ""}`
      : babloApp?.app?.name || "";

  getOrCreateMeta('meta[property="og:description"]', { property: "og:description" }).content =
    metaTags.description || "";

  getOrCreateMeta('meta[property="og:type"]', { property: "og:type" }).content =
    "website";

  getOrCreateMeta('meta[property="og:url"]', { property: "og:url" }).content =
    window.location.href || "";

  if (metaTags.ogImage) {
    getOrCreateMeta('meta[property="og:image"]', { property: "og:image" }).content = metaTags.ogImage;
  }

  // Twitter Card meta (basic support)
  getOrCreateMeta('meta[name="twitter:card"]', { name: "twitter:card" }).content =
    metaTags.twitterCard || "summary_large_image";

  getOrCreateMeta('meta[name="twitter:title"]', { name: "twitter:title" }).content =
    metaTags.twitterTitle ||
    (metaTags.title && metaTags.title !== babloApp?.app?.name
      ? `${metaTags.title} - ${babloApp?.app?.name || ""}`
      : babloApp?.app?.name || "");

  getOrCreateMeta('meta[name="twitter:description"]', { name: "twitter:description" }).content =
    metaTags.twitterDescription || metaTags.description || "";

  if (metaTags.twitterImage) {
    getOrCreateMeta('meta[name="twitter:image"]', { name: "twitter:image" }).content = metaTags.twitterImage;
  }

  if (metaTags.twitterUrl) {
    getOrCreateMeta('meta[name="twitter:url"]', { name: "twitter:url" }).content = metaTags.twitterUrl;
  }

  if (metaTags.twitterSite) {
    getOrCreateMeta('meta[name="twitter:site"]', { name: "twitter:site" }).content = metaTags.twitterSite;
  }

  if (metaTags.twitterCreator) {
    getOrCreateMeta('meta[name="twitter:creator"]', { name: "twitter:creator" }).content = metaTags.twitterCreator;
  }

  if (metaTags.twitterDomain) {
    getOrCreateMeta('meta[name="twitter:domain"]', { name: "twitter:domain" }).content = metaTags.twitterDomain;
  }
}


export class Router {
  constructor() {
    this.routes = {};
  }

  async go(route) {
    const newRoute = route.includes(requests.url(""))
      ? route
      : requests.url(route);
    window.history.pushState({}, "", newRoute);
    //console.log("Pushed to history:", newRoute);

    // Update babloApp location properties
    babloApp.href = window.location.href;
    babloApp.pathname = window.location.pathname;
    babloApp.search = window.location.search;
    babloApp.hash = window.location.hash;

    // Dispatch custom event for route change
    window.dispatchEvent(new CustomEvent('routechange', { detail: { route: newRoute } }));

    await this.route(newRoute);
    return newRoute;
  }
  async redirectHard(route) {
    const newRoute = route.includes(requests.url(""))
      ? route
      : requests.url(route);
    window.location.href = newRoute;
    return;
  }

  async redirect(route) {
    return await this.go(route);
  }

  async navigate(route) {
    return await this.go(route);
  }

  init() {
    this.routeNavigator();
    // Preload routes on idle for better performance
    if (typeof requestIdleCallback !== 'undefined') {
      requestIdleCallback(() => this.preloadRoutes());
    } else {
      setTimeout(() => this.preloadRoutes(), 0);
    }
  }

  // Preload route components for faster navigation
  preloadNextRoute(currentRoute) {
    if (typeof requestIdleCallback === 'undefined') return;

    requestIdleCallback(() => {
      const routeKeys = Object.keys(this.routes);
      const currentIndex = routeKeys.indexOf(currentRoute);
      const nextRoute = routeKeys[currentIndex + 1];

      if (nextRoute && this.routes[nextRoute]?.component) {
        const comp = this.routes[nextRoute].component;
        if (typeof comp === 'function') {
          try {
            comp(); // Trigger lazy load
          } catch (e) {
            // Ignore errors in preload
          }
        }
      }
    });
  }

  // Preload all routes in background
  preloadRoutes() {
    if (typeof requestIdleCallback === 'undefined') return;

    Object.values(this.routes).forEach(routeObj => {
      if (routeObj?.component && typeof routeObj.component === 'function') {
        requestIdleCallback(() => {
          try {
            routeObj.component(); // Trigger lazy load
          } catch (e) {
            // Ignore errors in preload
          }
        });
      }
    });
  }

  async route(route = null, component = null) {
    try {
      // Only clear component-specific state, preserve global app state
      // This prevents state loss on navigation
      const currentComponentId = babloApp.appState.get("render-component-index");
      if (currentComponentId) {
        // Clean up only the current component's state
        const keysToDelete = [];
        for (const key of babloApp.appState.keys()) {
          if (key.startsWith(`state-${currentComponentId}-`) ||
            key.startsWith(`effect-${currentComponentId}-`)) {
            keysToDelete.push(key);
          }
        }
        keysToDelete.forEach(key => babloApp.appState.delete(key));
      }

      let cleanRoute = route;
      if (!route) {
        // get befor first ? mark
        route = babloApp.href;
      }
      cleanRoute = route.replace(babloApp.baseUrl, "").toLowerCase() || "/";

      if (cleanRoute.endsWith("/") && cleanRoute.length > 1) {
        cleanRoute = "/" + cleanRoute.slice(0, -1);
      }
      if (!cleanRoute.startsWith("/")) {
        cleanRoute = "/" + cleanRoute;
      }
      if (route.startsWith("/") && !route.startsWith(babloApp.baseUrl)) {
        cleanRoute = route;
      }
      cleanRoute = cleanRoute.includes("?") ? cleanRoute.split("?")[0] : cleanRoute;
      if (babloApp.routes) {
        this.routes = babloApp.routes;
      }

      let routeObj = this.routes[cleanRoute];
      if (!routeObj && !component) {
        setPageProps({ title: "404 - Page Not Found", description: "" });
        return render(notFound, babloApp.root);
      }


      if (component && typeof component === "function") {
        setPageProps({ title: "Component", description: "" });
        render(component, babloApp.root);
        return;
      }
      //console.log("Component:", component);

      if (component && typeof component === "object") {
        routeObj = component;
      }

      //console.log("ROOT:", babloApp.root);
      if (routeObj) {
        setPageProps(routeObj);
        let component;

        // Handle both lazy loading and direct imports
        if (typeof routeObj.component === "function") {
          // Store the original function in case we need it
          const componentFn = routeObj.component;

          // Try calling it to check if it returns a Promise (lazy loading)
          const result = componentFn();

          if (result && typeof result.then === "function") {
            // Lazy loading: result is a Promise
            const module = await result;
            component = module.default || module;
          } else {
            // Direct import: the function itself is the component
            // (we called it and got a VNode, but render needs the function)
            component = componentFn;
          }
        } else {
          // Component is already the function itself
          component = routeObj.component;
        }

        // Store component with unique ID for proper state tracking
        const componentId = `comp-${cleanRoute.replace(/\//g, '-').replace(/^-|-$/g, '') || 'root'}-${component.name || 'anonymous'}`;
        babloApp.componentState.set("component-state", component);
        babloApp.componentState.set("component-id", componentId);

        // Preload next route if available (performance optimization)
        this.preloadNextRoute(cleanRoute);

        babloApp.updateLocation();
        render(component, babloApp.root);
        return;
      }
      //console.log("No matching route found.");
    } catch (error) {
      console.error("Error loading route:", error);
      setPageProps({ title: "Error", description: "" });
      babloApp.root.innerHTML = "";
      render(() => errorPage(error.toString()), babloApp.root);
    }
  }

  routeNavigator() {
    window.addEventListener("popstate", () => {
      // Update babloApp location properties on popstate
      babloApp.href = window.location.href;
      babloApp.pathname = window.location.pathname;
      babloApp.search = window.location.search;
      babloApp.hash = window.location.hash;

      // Dispatch custom event for route change
      window.dispatchEvent(new CustomEvent('routechange', { detail: { route: window.location.pathname } }));

      this.navigate(requests.windowGetHref());
    });

    document.addEventListener("click", (event) => {
      const target = event.target.closest("a") || event.target;
      const route = target.getAttribute("route");
      const component = target.getAttribute("component");

      if (target.tagName === "A") {
        const href = target.href;
        if (
          !target.hasAttribute("refresh") &&
          !target.hasAttribute("download") &&
          !target.hasAttribute("target") &&
          !href.includes("mailto:") &&
          !href.includes("tel:") &&
          !href.startsWith("#") &&
          !href.includes("javascript:")
        ) {
          event.preventDefault();
          //console.log("HREF", href);
          this.go(href);
        }
      } else if (route) {
        this.go(requests.url(route));
      } else if (component) {
        render(component(), babloApp.root);
      }
    });
  }
}

// Export a default router instance for convenience
// This will be configured in main.js with routes
export const router = new Router();
