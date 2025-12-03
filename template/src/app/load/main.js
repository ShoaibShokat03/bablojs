

import { documentEvents } from "../../_modules/document.events.js";
import { babloApp } from "../../_modules/BabloApp.js";
import Config from "../config/config.js";
import { router } from "../../_modules/router.js";
import routes from "../routes/routes.js";


documentEvents.onDomContentLoaded(async () => {
  // Initialize the application
  const app = babloApp;
  app.init(Config);
  app.routes = routes.all();
  app.root = document.getElementById("app");

  // Initialize the router
  router.init();
  router.route();
});
