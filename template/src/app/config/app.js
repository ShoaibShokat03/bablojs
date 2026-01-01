import time from "../../modules/time.js";

export const app = {
    root: document.querySelector("#app"),
    baseUrl: "http://localhost/apps/js/BABLOjS/api",
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