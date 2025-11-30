import time from "../../_modules/time.js";

export const app = {
    root: document.querySelector("#app"),
    baseUrl: "http://localhost/apps/js/BABLOJS/api",
    key: "BABLOJS_1234",
    name: "BABLOJS",
    version: "1.0.0",
    description: "A fast and scalable SPA built with a custom vanilla JS framework",
    keywords: ["SPA", "vanilla JS", "fast", "scalable", "SEO"],
    robots: "index, follow",
    author: "BABLOJS",
    license: "MIT",
    copyright: `Copyright ${time.year()} BABLOJS`,
    contact: "contact@BABLOJS.com",
}