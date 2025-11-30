
import Routes from "../../_modules/routes.js";
import Home from "../../views/Home.js";
import Config from "../config/config.js";


const routes = new Routes();

// Both ways work now:
// Option 1: Direct import (eager loading)
routes.route("/",
  Home,
  {
    title: "Home",
    description: Config.app.description,
    keywords: Config.app.keywords,
  }
);
export default routes;