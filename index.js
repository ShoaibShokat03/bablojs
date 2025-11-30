import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const templatePath = path.join(__dirname, "template"); // ✅ correct path
copyFolder(templatePath, target);