import { render } from "./bablo.js";
import { babloApp } from "./BabloApp.js";
import { A, Button, Div, H1, P, Strong } from "./html.js";
import { requests } from "./requests.js";

const isAuthenticated = () =>
  babloApp.config.storage.get(babloApp.config.session.userProfile) !== null;
const getUserRole = () =>
  babloApp.config.storage.get(babloApp.config.session.userRoleKey) || "guest";

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

const errorPage = (routerInstance, error) => {
  return Div(
    {
      style: "width: 100%, height: 100vh, display: flex, justifyContent: center, alignItems: center, backgroundColor: '#f8f9fa'",
    },
    Div(
      { style: "text-align: center; color: #721c24;" },
      H1(
        {
          style: "font-size: 3rem; font-weight: 700; margin-bottom: 1rem;",
        },
        "Error"
      ),
      P({ style: "font-size: 1.1rem;" }, error),
      Button(
        {
          onclick: () => router.go("/"),
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
  // Title
  document.title = routeObj.title
    ? `${routeObj.title} - ${babloApp.config.app.name}`
    : babloApp.config.app.name;

  // Description
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement("meta");
    metaDesc.name = "description";
    document.head.appendChild(metaDesc);
  }
  metaDesc.content = routeObj.description || babloApp.config.app.description || "";

  // Keywords
  let metaKeywords = document.querySelector('meta[name="keywords"]');
  if (!metaKeywords) {
    metaKeywords = document.createElement("meta");
    metaKeywords.name = "keywords";
    document.head.appendChild(metaKeywords);
  }
  metaKeywords.content = routeObj.keywords || babloApp.config.app.keywords || "";

  // Robots
  let metaRobots = document.querySelector('meta[name="robots"]');
  if (!metaRobots) {
    metaRobots = document.createElement("meta");
    metaRobots.name = "robots";
    document.head.appendChild(metaRobots);
  }
  metaRobots.content = routeObj.robots || babloApp.config.app.robots || "";

  // Author
  let metaAuthor = document.querySelector('meta[name="author"]');
  if (!metaAuthor) {
    metaAuthor = document.createElement("meta");
    metaAuthor.name = "author";
    document.head.appendChild(metaAuthor);
  }
  metaAuthor.content = routeObj.author || babloApp.config.app.author || "";

  // License
  let metaLicense = document.querySelector('meta[name="license"]');
  if (!metaLicense) {
    metaLicense = document.createElement("meta");
    metaLicense.name = "license";
    document.head.appendChild(metaLicense);
  }
  metaLicense.content = routeObj.license || babloApp.config.app.license || "";

  // Open Graph (og:) Tags for better social sharing (optional but improves SEO)
  // og:title
  let ogTitle = document.querySelector('meta[property="og:title"]');
  if (!ogTitle) {
    ogTitle = document.createElement("meta");
    ogTitle.setAttribute("property", "og:title");
    document.head.appendChild(ogTitle);
  }
  ogTitle.content = routeObj.title
    ? `${routeObj.title} - ${babloApp.config.app.name}`
    : babloApp.config.app.name;

  // og:description
  let ogDesc = document.querySelector('meta[property="og:description"]');
  if (!ogDesc) {
    ogDesc = document.createElement("meta");
    ogDesc.setAttribute("property", "og:description");
    document.head.appendChild(ogDesc);
  }
  ogDesc.content = routeObj.description || babloApp.config.app.description || "";

  // og:type (defaults to website)
  let ogType = document.querySelector('meta[property="og:type"]');
  if (!ogType) {
    ogType = document.createElement("meta");
    ogType.setAttribute("property", "og:type");
    document.head.appendChild(ogType);
  }
  ogType.content = "website";

  // og:url (uses window.location.href)
  let ogUrl = document.querySelector('meta[property="og:url"]');
  if (!ogUrl) {
    ogUrl = document.createElement("meta");
    ogUrl.setAttribute("property", "og:url");
    document.head.appendChild(ogUrl);
  }
  ogUrl.content = window.location.href;

  // og:image (if provided in routeObj, otherwise fallback/remove)
  if (routeObj.ogImage || babloApp.config.app.ogImage) {
    let ogImage = document.querySelector('meta[property="og:image"]');
    if (!ogImage) {
      ogImage = document.createElement("meta");
      ogImage.setAttribute("property", "og:image");
      document.head.appendChild(ogImage);
    }
    ogImage.content = routeObj.ogImage || babloApp.config.app.ogImage;
  }
  // Twitter Card meta (basic support)
  let twitterCard = document.querySelector('meta[name="twitter:card"]');
  if (!twitterCard) {
    twitterCard = document.createElement("meta");
    twitterCard.name = "twitter:card";
    document.head.appendChild(twitterCard);
  }
  twitterCard.content = "summary_large_image";
  let twitterTitle = document.querySelector('meta[name="twitter:title"]');
  if (!twitterTitle) {
    twitterTitle = document.createElement("meta");
    twitterTitle.name = "twitter:title";
    document.head.appendChild(twitterTitle);
  }
  twitterTitle.content = routeObj.title
    ? `${routeObj.title} - ${babloApp.config.app.name}`
    : babloApp.config.app.name;
  let twitterDesc = document.querySelector('meta[name="twitter:description"]');
  if (!twitterDesc) {
    twitterDesc = document.createElement("meta");
    twitterDesc.name = "twitter:description";
    document.head.appendChild(twitterDesc);
  }
  twitterDesc.content = routeObj.description || babloApp.config.app.description || "";

  if (routeObj.twitterImage || babloApp.config.app.twitterImage) {
    let twitterImg = document.querySelector('meta[name="twitter:image"]');
    if (!twitterImg) {
      twitterImg = document.createElement("meta");
      twitterImg.name = "twitter:image";
      document.head.appendChild(twitterImg);
    }
    twitterImg.content = routeObj.twitterImage || babloApp.config.app.twitterImage;
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
    console.log("Pushed to history:", newRoute);
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
  }

  async route(route = null, component = null) {
    try {
      let cleanRoute = route;
      if (!route) {
        // get befor first ? mark
        route = babloApp.href;
      }
      route = route.split("?")[0];
      cleanRoute = route.replace(requests.url(""), "").toLowerCase() || "/";
      babloApp.config.appState.clear();
      if (cleanRoute.endsWith("/") && cleanRoute.length > 1) {
        cleanRoute = "/" + cleanRoute.slice(0, -1);
      }
      if (!cleanRoute.startsWith("/")) {
        cleanRoute = "/" + cleanRoute;
      }
      if (route.startsWith("/") && !route.startsWith(requests.url(""))) {
        cleanRoute = route;
      }
      console.log("cleanRoute", cleanRoute);

      let routeObj = this.routes[cleanRoute];
      if (!routeObj && !component) {
        setPageProps({ title: "404 - Page Not Found", description: "" });
        return render(notFound, babloApp.config.app.root);
      }
      if (component && typeof component === "function") {
        setPageProps({ title: "Component", description: "" });
        render(component, babloApp.config.app.root);
        return;
      }
      if (component && typeof component === "object") {
        routeObj = component;
      }
      if (routeObj) {
        setPageProps(routeObj);
        const module = await routeObj.component();
        if (babloApp.config.componentState.has("component-state")) {
          babloApp.config.componentState.delete("component-state");
        }
        babloApp.config.componentState.set("component-state", module.default);
        render(module.default, babloApp.config.app.root);
        return;
      }
    } catch (error) {
      console.error("Error loading route:", error);
      setPageProps({ title: "Error", description: "" });
      babloApp.config.app.root.innerHTML = "";
      render(errorPage(this, error.message), babloApp.config.app.root);
    }
  }

  routeNavigator() {
    window.addEventListener("popstate", () => {
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
          console.log("HREF", href);
          this.go(href);
        }
      } else if (route) {
        this.go(requests.url(route));
      } else if (component) {
        render(component(), babloApp.config.app.root);
      }
    });
  }
}

// Export a default router instance for convenience
// This will be configured in main.js with routes
export const router = new Router();
