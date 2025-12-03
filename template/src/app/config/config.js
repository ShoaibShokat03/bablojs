import routes from "../routes/routes.js";
import { api } from "../../services/api.js";
import { app } from "./app.js";
import { roles } from "./roles.js";
import { session } from "./session.js";
import { theme } from "./theme.js";
import constants from "./constants.js";
import services from "./services.js";
import { babloApp } from "../../_modules/BabloApp.js";

const Config = {
  // App Configuration
  app: app = {
    root: document.querySelector("#app"),
    key: "BABLOjS_1234",
    name: "BABLOjS",
    version: "1.0.0",
    description: "A fast and scalable SPA built with a custom vanilla JS framework",
    keywords: ["SPA", "vanilla JS", "fast", "scalable", "SEO"],
    robots: "index, follow",
    author: "BABLOjS",
    license: "MIT",
    copyright: `Copyright ${time.year()} BABLOjS`,
    contact: "contact@BABLOjS.com",
  }
};

export default Config;

