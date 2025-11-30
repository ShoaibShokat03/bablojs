import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const target = path.join(process.cwd(), "myapp"); // ya jo folder create karna ho
const templatePath = path.join(__dirname, "template");

// 😤 YEH FUNCTION MANDATORY HAI
function copyFolder(src, dest) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (let entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        entry.isDirectory() 
            ? copyFolder(srcPath, destPath) 
            : fs.copyFileSync(srcPath, destPath);
    }
}

// 🏁 phir call karo
copyFolder(templatePath, target);
console.log("✅ Project created at", target);
