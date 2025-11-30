

import { documentEvents } from "../../_modules/document.events.js";
import { babloApp } from "../../_modules/BabloApp.js";
import Config from "../config/config.js";
import { router } from "../../_modules/router.js";
import routes from "../routes/routes.js";
import { render } from "../../_modules/bablo.js";
import LoaderComponent from "../../components/Loader.js";

const app = babloApp;
app.init(Config);
app.root = document.getElementById("app");
router.init();
router.routes = routes.all();

documentEvents.onDomContentLoaded(async () => {
  render(LoaderComponent, app.root);
  router.route();
});
