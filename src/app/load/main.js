

import { documentEvents } from "../../_modules/document.events.js";
import { babloApp } from "../../_modules/BabloApp.js";
import Config from "../config/config.js";
import { router } from "../../_modules/router.js";
import routes from "../routes/routes.js";


const app = babloApp;
app.init(Config);
app.routes = routes.all();
router.init();

documentEvents.onDomContentLoaded(async () => {
  router.route();
});
