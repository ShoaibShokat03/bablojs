#!/usr/bin/env node
import fs from "fs";
import path from "path";

const appName = process.argv[2];
if (!appName) {
  console.log("❌ App ka naam do!");
  process.exit(1);
}

const target = path.join(process.cwd(), appName);
fs.mkdirSync(target);

console.log(`🔥 Creating ${appName}...`);

// Copy template files
function copyFolder(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const file of fs.readdirSync(src)) {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);
    if (fs.lstatSync(srcPath).isDirectory()) copyFolder(srcPath, destPath);
    else fs.copyFileSync(srcPath, destPath);
  }
}

const templatePath = path.join(process.cwd(), "template");
copyFolder(templatePath, target);

console.log(`✨ ${appName} created!`);
