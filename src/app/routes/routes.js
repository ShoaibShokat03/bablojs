import { importView } from "../../_modules/component.js";
import Routes from "../../_modules/Routes.js";

// Component imports for better organization
const components = {
  // Main Views
  Login: importView("Login"),
  Home: importView("Home"),
  About: importView("About"),
  Contact: importView("Contact"),
  Docs: importView("Docs"),
  Demo: importView("Demo"),
  FAQ: importView("FAQ"),
  Privacy: importView("Privacy"),
  Terms: importView("Terms"),
  License: importView("License"),
};


const routes = new Routes();
routes.route("/",
  components.Home,
  {
    title: "Home",
    description: "Home",
    keywords: "home",
    ogImage: "/images/home.png"
  }
);
routes.route("/login", components.Login, { title: "Login", description: "Login", keywords: "login", ogImage: "/images/login.png" });
routes.route("/about", components.About, { title: "About", description: "About", keywords: "about", ogImage: "/images/about.png" });
routes.route("/contact", components.Contact, { title: "Contact", description: "Contact", keywords: "contact", ogImage: "/images/contact.png" });
routes.route("/docs", components.Docs, { title: "Docs", description: "Docs", keywords: "docs", ogImage: "/images/docs.png" });
routes.route("/demo", components.Demo, { title: "Demo", description: "Demo", keywords: "demo", ogImage: "/images/demo.png" });
routes.route("/faq", components.FAQ, { title: "FAQ", description: "FAQ", keywords: "faq", ogImage: "/images/faq.png" });
routes.route("/privacy", components.Privacy, { title: "Privacy", description: "Privacy", keywords: "privacy", ogImage: "/images/privacy.png" });
routes.route("/terms", components.Terms, { title: "Terms", description: "Terms", keywords: "terms", ogImage: "/images/terms.png" });
routes.route("/license", components.License, { title: "License", description: "License", keywords: "license", ogImage: "/images/license.png" });
export default routes;