import Routes from "../../_modules/Routes.js";
import Home from "../../views/Home.js";

const routes = new Routes();
routes.route("/",
  Home,
  {
    title: "Home",
    description: "Home",
    keywords: "home",
    ogImage: "/images/home.png"
  }
);
export default routes;