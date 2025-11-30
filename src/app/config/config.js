import routes from "../routes/routes.js";
import { api } from "../../services/api.js";
import { app } from "./app.js";
import { roles } from "./roles.js";
import { session } from "./session.js";
import { storage } from "../../_modules/storage.js";
import { theme } from "./theme.js";
import constants from "./constants.js";
import services from "./services.js";
import { babloApp } from "../../_modules/BabloApp.js";

const Config = {
  // App State Management
  registeredComponents: {}, // Use Map for better performance with large state
  componentState: new Map(), // Use Map for better performance with large state
  appState: new Map(), // Use Map for better performance with large state
  webpCache: new Map(),
  appCache: new Set(), // Use Set for unique entries
  routes,

  // App Configuration
  app: app,
  // Theme Configuration
  theme: theme,
  // Session Configuration
  session: session,
  // Roles Configuration
  roles: roles,
  // Storage Configuration
  storage: storage,

  // constants Configuration
  constants: constants,

  // Services Configuration
  services: services,
};

export default Config;

