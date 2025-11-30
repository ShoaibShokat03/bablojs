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
console.log("\n📖 USAGE INFORMATION:");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("\n1️⃣  Navigate to your project:");
console.log(`   cd ${path.basename(target)}`);
console.log("\n2️⃣  Start the development server:");
console.log("   npm start");
console.log("   # or");
console.log("   npm run dev");
console.log("   # or");
console.log("   npx serve .");
console.log("\n3️⃣  Open your browser:");
console.log("   http://localhost:3000");
console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("\n🖥️  RECOMMENDED DEV SERVER OPTIONS:");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("\n📌 Option 1: npx serve (Recommended)");
console.log("   Command: npx serve .");
console.log("   Port: 3000 (default)");
console.log("   Features: Fast, simple, no installation needed");
console.log("\n📌 Option 2: PHP Built-in Server");
console.log("   Command: php -S localhost:8000");
console.log("   Port: 8000");
console.log("   Features: Good for PHP developers");
console.log("\n📌 Option 3: Python HTTP Server");
console.log("   Command: python -m http.server 8000");
console.log("   Port: 8000");
console.log("   Features: Available on most systems");
console.log("\n📌 Option 4: Node.js http-server");
console.log("   Command: npx http-server -p 8080");
console.log("   Port: 8080");
console.log("   Features: Full-featured HTTP server");
console.log("\n📌 Option 5: VS Code Live Server");
console.log("   Install: Live Server extension");
console.log("   Usage: Right-click index.html → Open with Live Server");
console.log("   Port: 5500 (default)");
console.log("   Features: Auto-reload on file changes");
console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("\n💡 TIP: ES6 modules require a local server (CORS restrictions).");
console.log("   You cannot open index.html directly in the browser.");
console.log("\n🚀 Happy coding with BABLOJS!");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
