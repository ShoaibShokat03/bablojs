import time from "../../_modules/time.js";
const Config = {

  // App Configuration
  app: {
    root: document.querySelector("#app"),
    baseUrl: "http://localhost/apps/js/BABLOjS/api",
    key: "BABLOjS_1234",
    name: "BABLOjS",
    version: "1.0.0",
    description: "A fast and scalable SPA built with a custom vanilla JS framework",
    keywords: "bablojS, javascript, framework, SPA, vanilla JS",
    robots: "index, follow",
    author: "BABLOjS",
    license: "MIT",
    copyright: `Copyright ${time.year()} BABLOjS`,
    contact: "contact@BABLOjS.com",
  }
};

export default Config;

