import { importView } from "../../_modules/component.js";
import Routes from "../../_modules/Routes.js";

// Lazy load all routes for better code splitting and performance
// This allows the browser to only load components when needed
const routes = new Routes();

// Home route - can be loaded immediately if needed, but lazy is better
routes.route("/",
  importView("Home"),
  {
    title: "BABLOjS - Modern Vanilla JavaScript SPA Framework | Build Fast SPAs Without Build Tools",
    description: "Build modern Single Page Applications with BABLOjS - a lightweight, fast, and scalable vanilla JavaScript framework. Features Virtual DOM, hooks, routing, and component-based architecture. No build step required, just deploy!",
    keywords: "BABLOjS, vanilla JavaScript framework, SPA framework, JavaScript SPA, virtual DOM, React alternative, lightweight framework, fast JavaScript, no build tools, component framework, hooks JavaScript, routing JavaScript, vanilla JS framework",
    ogImage: "/images/home.png",
  }
);

export default routes;