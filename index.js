#!/usr/bin/env node

import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// resolve dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1) Read project name from CLI
const projectName = process.argv[2];

if (!projectName) {
    console.log("Error: Project name missing!");
    console.log("Usage: create-bablojs myapp");
    process.exit(1);
}

const target = path.join(process.cwd(), projectName);
const templatePath = path.join(__dirname, "template");

// 2) Copy folder function
function copyFolder(src, dest) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (let entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            copyFolder(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

// 3) Create project
copyFolder(templatePath, target);

// 4) Output
console.log("");
console.log("Project created successfully:");
console.log(`   ${projectName}`);
console.log("");
console.log("Next steps:");
console.log("----------------------------------------------");
console.log(`1) cd ${projectName}`);
console.log("2) npm start");
console.log("   or");
console.log("   npm run dev");
console.log("   or");
console.log("   npx serve .");
console.log("");
console.log("Open in browser:");
console.log("   http://localhost:3000");
console.log("----------------------------------------------");
console.log("Recommended Dev Servers:");
console.log("");
console.log("npx serve .");
console.log("php -S localhost:8000");
console.log("python -m http.server 8000");
console.log("npx http-server -p 8080");
console.log("VS Code Live Server");
console.log("----------------------------------------------");
console.log("Note:");
console.log("   ES modules require a local server. Do not open index.html directly.");
console.log("");
