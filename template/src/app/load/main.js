

import { documentEvents } from "../../modules/document.events.js";
import { babloApp } from "../../modules/BabloApp.js";
import Config from "../config/config.js";
import { Router } from "../../modules/router.js";
import Home from "../../views/Home.js";

const app = babloApp;
app.init(Config);
app.root = document.getElementById("app");

documentEvents.onDomContentLoaded(async () => {
  // Create router instance
  const router = new Router();
  // Initialize router (sets up event listeners)
  router.init();
  router.route("/",
    Home,
    {
      title: "BABLOjS - Modern Vanilla JavaScript SPA Framework | Build Fast SPAs Without Build Tools",
      description: "Build modern Single Page Applications with BABLOjS - a lightweight, fast, and scalable vanilla JavaScript framework. Features Virtual DOM, hooks, routing, and component-based architecture. No build step required, just deploy!",
      keywords: "BABLOjS, vanilla JavaScript framework, SPA framework, JavaScript SPA, virtual DOM, React alternative, lightweight framework, fast JavaScript, no build tools, component framework, hooks JavaScript, routing JavaScript, vanilla JS framework",
    }
  );
  app.routes = router.routes;
  await router.route();
});
