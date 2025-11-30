# How to Package BABLOJS as npm/npx/bun Package

This guide explains how to publish your BABLOJS application as an npm, npx, or bun package without including `node_modules`.

## Prerequisites

- Node.js installed (for npm/npx)
- Bun installed (optional, for bun)
- npm account (for publishing to npm registry)

## Step 1: Create package.json

Create a `package.json` file in your project root with the following configuration:

```json
{
  "name": "bablojs-app",
  "version": "1.0.0",
  "description": "BABLOJS - Modern Vanilla JavaScript SPA Framework",
  "main": "index.html",
  "type": "module",
  "scripts": {
    "start": "npx serve .",
    "dev": "npx serve ."
  },
  "files": [
    "index.html",
    "src/app/**/*",
    "src/_modules/**/*",
    "src/components/**/*",
    "src/assets/**/*",
    "src/constants/**/*",
    "src/helpers/**/*",
    "src/services/**/*",
    "src/views/**/*",
    "README.md"
  ],
  "keywords": [
    "spa",
    "vanilla-js",
    "framework",
    "bablojs",
    "single-page-application"
  ],
  "author": "Your Name",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "your-repo-url"
  },
  "engines": {
    "node": ">=14.0.0"
  }
}
```

### Key Configuration Points:

1. **`"files"` field**: This explicitly lists which files/folders to include in the package. Only these will be published.
2. **`node_modules` exclusion**: By default, npm excludes `node_modules` when publishing. The `files` field ensures only your source code is included.
3. **`"type": "module"`**: Required for ES6 module support.

## Step 2: Create .npmignore (Optional but Recommended)

Create a `.npmignore` file to explicitly exclude files you don't want in the package:

```
node_modules/
.git/
.gitignore
*.log
.DS_Store
.env
.env.local
package-lock.json
yarn.lock
bun.lockb
.vscode/
.idea/
*.md
!README.md
```

**Note**: If you have a `.gitignore`, npm will use it. The `.npmignore` file takes precedence.

## Step 3: Verify Package Contents

Before publishing, verify what will be included:

```bash
# For npm
npm pack

# This creates a .tgz file. Extract and check contents:
tar -tzf bablojs-app-1.0.0.tgz | head -20
```

## Step 4: Publishing to npm

### 4.1 Login to npm

```bash
npm login
```

Enter your npm credentials.

### 4.2 Publish the Package

```bash
# Dry run (test without publishing)
npm publish --dry-run

# Actual publish
npm publish
```

### 4.3 Publish as Public Package

```bash
npm publish --access public
```

## Step 5: Using with npx

Once published, users can run your app with npx:

```bash
npx bablojs-app
```

To enable this, you may want to add a `bin` field to `package.json`:

```json
{
  "bin": {
    "bablojs-app": "./index.html"
  }
}
```

However, since this is a web app, npx will typically download and extract the package. Users would then serve it locally.

## Step 6: Using with Bun

### 6.1 Publish to npm (same as above)

Bun can install packages from npm:

```bash
bun install bablojs-app
```

### 6.2 Using bunx (Bun's equivalent to npx)

```bash
bunx bablojs-app
```

## Step 7: Alternative - Using as Template/Starter

If you want users to scaffold a new project from your package:

### 7.1 Update package.json

Add a `bin` script:

```json
{
  "bin": {
    "create-bablojs-app": "./bin/create.js"
  }
}
```

### 7.2 Create bin/create.js

```javascript
#!/usr/bin/env node
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, mkdirSync, cpSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

const projectName = process.argv[2] || 'my-bablojs-app';
const targetDir = join(process.cwd(), projectName);

if (existsSync(targetDir)) {
  console.error(`Error: Directory ${projectName} already exists!`);
  process.exit(1);
}

mkdirSync(targetDir, { recursive: true });

// Copy necessary files
cpSync(join(projectRoot, 'index.html'), join(targetDir, 'index.html'));
cpSync(join(projectRoot, 'src'), join(targetDir, 'src'), { recursive: true });

console.log(`✅ Created ${projectName} successfully!`);
console.log(`📁 Navigate to: cd ${projectName}`);
console.log(`🚀 Start with: npm start or npx serve .`);
```

## Step 8: Minimal Package Structure

For a minimal package that only includes `index.html` and `src/app`:

### 8.1 Minimal package.json

```json
{
  "name": "bablojs-app",
  "version": "1.0.0",
  "main": "index.html",
  "type": "module",
  "files": [
    "index.html",
    "src/app"
  ]
}
```

### 8.2 Important Notes

- **Dependencies**: If your `src/app` imports from `src/_modules`, you must include those too, or users will get import errors.
- **Assets**: If your app uses CSS/images, include `src/assets` in the `files` array.
- **Complete Minimal Example**:

```json
{
  "name": "bablojs-app",
  "version": "1.0.0",
  "main": "index.html",
  "type": "module",
  "files": [
    "index.html",
    "src/app",
    "src/_modules",
    "src/assets"
  ]
}
```

## Step 9: Version Management

Update version before each publish:

```bash
# Patch version (1.0.0 -> 1.0.1)
npm version patch

# Minor version (1.0.0 -> 1.1.0)
npm version minor

# Major version (1.0.0 -> 2.0.0)
npm version major

# Then publish
npm publish
```

## Step 10: Unpublishing (if needed)

```bash
# Unpublish a specific version
npm unpublish bablojs-app@1.0.0

# Unpublish entire package (within 72 hours)
npm unpublish bablojs-app --force
```

## Best Practices

1. **Always test with `npm pack`** before publishing
2. **Use semantic versioning** (major.minor.patch)
3. **Include a README.md** in your package
4. **Tag releases** in git: `git tag v1.0.0 && git push --tags`
5. **Use `.npmignore`** to be explicit about exclusions
6. **Test installation** in a clean directory: `npm install bablojs-app`

## Troubleshooting

### Issue: Package too large
- Check what's included: `npm pack` and inspect
- Use `.npmignore` to exclude unnecessary files
- Ensure `node_modules` is not included (should be automatic)

### Issue: Import errors after installation
- Verify all imported modules are in the `files` array
- Check relative import paths are correct
- Ensure `src/_modules` is included if used by `src/app`

### Issue: Can't run with npx
- For web apps, npx downloads but doesn't execute HTML directly
- Users need to serve the files: `npx serve .` or `npx http-server`

## Example: Complete Workflow

```bash
# 1. Create package.json (see Step 1)
# 2. Create .npmignore (see Step 2)
# 3. Verify package contents
npm pack

# 4. Login to npm
npm login

# 5. Publish
npm publish --access public

# 6. Test installation
mkdir test-install
cd test-install
npm install bablojs-app
ls node_modules/bablojs-app

# 7. Verify files are present
ls node_modules/bablojs-app/src/app
```

## Summary

- ✅ Use `files` field in `package.json` to control what gets published
- ✅ `node_modules` is automatically excluded
- ✅ Test with `npm pack` before publishing
- ✅ Include all necessary source files (`src/app`, `src/_modules`, etc.)
- ✅ Publish with `npm publish --access public`
- ✅ Use semantic versioning for releases

