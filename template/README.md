# BABLOJS - Vanilla JavaScript SPA Framework

[![npm version](https://img.shields.io/npm/v/bablojs.svg)](https://www.npmjs.com/package/bablojs)
[![npm downloads](https://img.shields.io/npm/dm/bablojs.svg)](https://www.npmjs.com/package/bablojs)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A lightweight, fast, and scalable Single Page Application framework built with vanilla JavaScript. BABLOJS provides React-like features including Virtual DOM, hooks, routing, and component-based architecture without the overhead of external dependencies.

## 📦 Installation

### Install via npm

```bash
npm install bablojs
```

### Install via yarn

```bash
yarn add bablojs
```

### Install via pnpm

```bash
pnpm add bablojs
```

## 📖 Table of Contents

- [What is BABLOJS?](#what-is-bablojs)
- [Why BABLOJS?](#why-bablojs)
- [Core Architecture](#core-architecture)
- [Complete File Structure](#complete-file-structure)
- [Installation & Setup](#installation--setup)
- [Framework Overview](#framework-overview)
- [Core Modules Explained](#core-modules-explained)
- [Application Structure](#application-structure)
- [Quick Start Guide](#quick-start-guide)
- [Use Cases](#use-cases)
- [API Reference](#api-reference)
- [Best Practices](#best-practices)
- [Advanced Topics](#advanced-topics)
- [Troubleshooting](#troubleshooting)

---

## What is BABLOJS?

BABLOJS is a modern JavaScript framework that brings the power of React-like development to vanilla JavaScript. It's designed for developers who want:

- **Modern Development Experience**: React-like hooks, component architecture, and Virtual DOM
- **Zero Build Step**: No webpack, babel, or build tools required - just ES6 modules
- **Lightweight**: Minimal overhead, fast performance, small bundle size
- **Flexible**: Use as much or as little as you need - modular architecture
- **SEO Friendly**: Server-side rendering ready, automatic meta tag management

### Philosophy

BABLOJS follows these core principles:

1. **Simplicity First**: Easy to learn, easy to use, easy to debug
2. **Performance**: Optimized Virtual DOM, efficient rendering, minimal re-renders
3. **Developer Experience**: Familiar API (React-like), great tooling, clear patterns
4. **No Magic**: Transparent code, easy to understand and modify
5. **Progressive**: Start simple, scale as needed

---

## Why BABLOJS?

### When to Use BABLOJS

✅ **Perfect for:**
- Small to medium SPAs
- Projects requiring fast load times
- Applications without complex build pipelines
- Learning modern JavaScript patterns
- Prototyping and MVPs
- Projects where bundle size matters
- Applications needing SEO optimization

❌ **Consider alternatives for:**
- Very large enterprise applications (though BABLOJS can scale)
- Projects requiring extensive third-party ecosystem
- Teams heavily invested in React/Vue ecosystems

### Key Advantages

| Feature | BABLOJS | React | Vue |
|---------|---------|-------|-----|
| Bundle Size | ~2KB gzipped | ~45KB | ~35KB |
| Build Step | ❌ Not required | ✅ Required | ✅ Required |
| Learning Curve | Low | Medium | Low |
| Performance | Excellent | Excellent | Excellent |
| Dependencies | Zero | Many | Some |

---

## Core Architecture

BABLOJS follows a modular architecture where each component has a specific responsibility:

```
┌─────────────────────────────────────────┐
│         Application Layer               │
│  (Views, Components, Routes)            │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│         Framework Core                  │
│  (Router, Hooks, Virtual DOM)           │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│         Utilities                       │
│  (Storage, Requests, Helpers)           │
└─────────────────────────────────────────┘
```

### Data Flow

```
User Action → Event Handler → State Update → Virtual DOM Diff → DOM Update
```

### Component Lifecycle

```
Component Function → Hooks Initialization → Render → Virtual DOM Creation → 
DOM Mount → Effects Run → User Interaction → State Update → Re-render → 
DOM Update → Cleanup (if needed)
```

---

## Complete File Structure

Here's a comprehensive breakdown of every file and folder in BABLOJS:

### When Installed via npm

After installing `bablojs` via npm, your project structure should look like this:

```
my-project/
│
├── node_modules/
│   └── bablojs/                  # BABLOJS package
│       ├── index.html
│       ├── package.json
│       ├── README.md
│       └── src/
│           └── _modules/         # Core framework modules
│
├── index.html                    # Your entry HTML file (copy from bablojs)
│
├── src/
│   │
│   │
│   ├── _modules/                 # Core Framework Modules (The Engine)
│   │   │                         # Copy from node_modules/bablojs/src/_modules/
│   │   │
│   │   ├── bablo.js             # Virtual DOM implementation
│   │   │                         # - Creates virtual nodes
│   │   │                         # - Handles DOM diffing and patching
│   │   │                         # - Manages component rendering
│   │   │                         # - Exports: render(), createElement()
│   │   │
│   │   ├── hooks.js              # React-like Hooks System
│   │   │                         # - useState: Component state management
│   │   │                         # - useEffect: Side effects and lifecycle
│   │   │                         # - useRef: DOM references and mutable values
│   │   │                         # - useMemo: Memoization for performance
│   │   │                         # - Internal cursor management
│   │   │
│   │   ├── html.js               # HTML Element Factories
│   │   │                         # - Capitalized functions for all HTML elements
│   │   │                         # - Div(), H1(), Button(), Input(), etc.
│   │   │                         # - Creates Virtual DOM nodes
│   │   │                         # - Handles props and children
│   │   │
│   │   ├── router.js             # Routing System
│   │   │                         # - History API routing
│   │   │                         # - Automatic link interception
│   │   │                         # - Browser history handling
│   │   │                         # - 404 and error pages
│   │   │                         # - SEO meta tag management
│   │   │                         # - Route guards (via helpers)
│   │   │
│   │   ├── requests.js           # URL and Request Utilities
│   │   │                         # - URL generation with base path
│   │   │                         # - Query parameter management
│   │   │                         # - URL manipulation helpers
│   │   │
│   │   ├── storage.js            # Local Storage Wrapper
│   │   │                         # - Simplified localStorage API
│   │   │                         # - Type-safe get/set/remove
│   │   │                         # - Session management helpers
│   │   │
│   │   ├── BabloApp.js           # Main Application Class
│   │   │                         # - Global app instance
│   │   │                         # - Location properties (href, pathname, etc.)
│   │   │                         # - State management
│   │   │                         # - Configuration holder
│   │   │
│   │   ├── Events.js             # Event System
│   │   │                         # - Virtual DOM lifecycle events
│   │   │                         # - Custom event handling
│   │   │                         # - Component mount/unmount events
│   │   │
│   │   ├── document.events.js    # Document Event Helpers
│   │   │                         # - DOMContentLoaded wrapper
│   │   │                         # - Window event management
│   │   │
│   │   ├── babloHttp.js          # BabloHttp - Unique HTTP Client
│   │   │                         # - Better than axios
│   │   │                         # - Request/Response interceptors
│   │   │                         # - Request cancellation
│   │   │                         # - Automatic retry
│   │   │                         # - Progress tracking
│   │   │                         # - Multiple response types
│   │   │                         # - Request/response interceptors
│   │   │
│   │   ├── forms.js              # Form Utilities
│   │   │                         # - Form data handling
│   │   │                         # - Validation helpers
│   │   │
│   │   ├── Helper.js             # General Utilities
│   │   │                         # - String manipulation
│   │   │                         # - Date formatting
│   │   │                         # - Array/Object utilities
│   │   │                         # - Validation functions
│   │   │                         # - Performance utilities (debounce, throttle)
│   │   │
│   │   ├── style.js              # Dynamic Styling
│   │   │                         # - CSS injection
│   │   │                         # - Style management
│   │   │                         # - Media query support
│   │   │
│   │   ├── time.js               # Time Utilities
│   │   │                         # - Date formatting
│   │   │                         # - Time calculations
│   │   │
│   │   ├── logger.js             # Logging System
│   │   │                         # - Console logging utilities
│   │   │                         # - Debug helpers
│   │   │
│   │   ├── icons.js              # Icon Utilities
│   │   │                         # - Icon management
│   │   │
│   │   └── symboles.js           # Symbol Constants
│   │                             # - Framework symbols
│   │
│   ├── app/                      # Application Configuration
│   │   │
│   │   ├── config/               # Configuration Files
│   │   │   │
│   │   │   ├── config.js         # Main Configuration Object
│   │   │   │                     # - Aggregates all configs
│   │   │   │                     # - App state management (Maps)
│   │   │   │                     # - Component state storage
│   │   │   │                     # - Cache management
│   │   │   │
│   │   │   ├── app.js            # Application Settings
│   │   │   │                     # - App name, version
│   │   │   │                     # - Root element selector
│   │   │   │                     # - Base URL
│   │   │   │                     # - SEO defaults (description, keywords)
│   │   │   │                     # - Author, license info
│   │   │   │
│   │   │   ├── auth.js           # Authentication Module
│   │   │   │                     # - login(): Store auth data
│   │   │   │                     # - logout(): Clear session
│   │   │   │                     # - isLogged(): Check auth status
│   │   │   │                     # - user(): Get current user
│   │   │   │
│   │   │   ├── session.js        # Session Configuration
│   │   │   │                     # - Key names for storage
│   │   │   │                     # - accessToken, refreshToken
│   │   │   │                     # - userProfile, userRoleKey
│   │   │   │
│   │   │   ├── roles.js          # User Roles
│   │   │   │                     # - Role definitions
│   │   │   │                     # - Permission helpers
│   │   │   │
│   │   │   ├── theme.js          # Theme Configuration
│   │   │   │                     # - Color schemes
│   │   │   │                     # - Theme switching
│   │   │   │
│   │   │   ├── constants.js      # Application Constants
│   │   │   │                     # - Static values
│   │   │   │                     # - Configuration constants
│   │   │   │
│   │   │   └── services.js       # Service Configuration
│   │   │                           # - API endpoints
│   │   │                           # - Service definitions
│   │   │
│   │   └── load/                 # Application Bootstrap
│   │       │
│   │       ├── main.js           # Main Entry Point
│   │       │                     # - Initializes babloApp
│   │       │                     # - Sets up router
│   │       │                     # - Loads routes
│   │       │                     # - Renders App component
│   │       │                     # - Handles initial route
│   │       │
│   │       └── App.js            # Root App Component
│   │                             # - Initial loader/splash screen
│   │                             # - First component rendered
│   │
│   ├── routes/
│   │   │
│   │   └── routes.js             # Route Definitions
│   │                             # - Route configuration object
│   │                             # - Component lazy loading
│   │                             # - Route metadata (title, description)
│   │                             # - Auth requirements
│   │                             # - Route categories
│   │
│   ├── views/                     # Application Views (Pages)
│   │   │
│   │   ├── components/           # Reusable Components
│   │   │   │
│   │   │   ├── MainLayout.js     # Main Layout Wrapper
│   │   │   │                     # - Header, footer, navigation
│   │   │   │                     # - Common page structure
│   │   │   │
│   │   │   ├── CodeModal.js      # Code Display Modal
│   │   │   │                     # - Syntax highlighting
│   │   │   │                     # - Code viewing
│   │   │   │
│   │   │   └── ErrorBoundary.js  # Error Boundary Component
│   │   │                           # - Error catching
│   │   │                           # - Fallback UI
│   │   │
│   │   ├── Home.js               # Home Page Component
│   │   ├── About.js              # About Page Component
│   │   ├── Contact.js            # Contact Page Component
│   │   ├── Docs.js               # Documentation Page
│   │   ├── Demo.js               # Demo/Examples Page
│   │   ├── FAQ.js                # FAQ Page
│   │   ├── Login.js              # Login Page
│   │   ├── Privacy.js            # Privacy Policy
│   │   ├── Terms.js              # Terms of Service
│   │   └── License.js            # License Page
│   │
│   ├── assets/                    # Static Assets
│   │   │
│   │   ├── css/
│   │   │   └── style.css         # Global Styles
│   │   │                         # - Design system
│   │   │                         # - CSS variables
│   │   │                         # - Component styles
│   │   │                         # - Responsive utilities
│   │   │
│   │   └── img/                  # Images
│   │
│   ├── constants/                 # Application Constants
│   │   │
│   │   ├── docs.js               # Documentation Content
│   │   │                         # - Documentation sections
│   │   │                         # - Searchable content
│   │   │
│   │   ├── contact.js            # Contact Information
│   │   ├── links.js              # External Links
│   │   ├── stats.js              # Statistics Data
│   │   └── fruits_and_vegs.js    # Example Data
│   │
│   ├── services/                 # API Services
│   │   │
│   │   ├── api.js                # API Configuration
│   │   │                         # - Base URL
│   │   │                         # - Endpoint definitions
│   │   │
│   │   └── ai.js                 # AI Service (if applicable)
│   │
│   └── helpers/                   # Helper Functions
│       │
│       └── flag.js                # Flag Utilities (if applicable)
│
└── README.md                      # This file
```

### Package Structure (npm)

When you install BABLOJS via npm, the package structure is:

```
node_modules/bablojs/
│
├── index.html                    # Entry HTML file - loads main.js as ES6 module
├── package.json                  # Package configuration
├── README.md                     # This documentation
│
└── src/
    │
    └── _modules/                  # Core Framework Modules (The Engine)
        │
        ├── bablo.js              # Virtual DOM implementation
        ├── hooks.js              # React-like Hooks System
        ├── html.js               # HTML Element Factories
        ├── router.js             # Routing System
        ├── requests.js           # URL and Request Utilities
        ├── storage.js            # Local Storage Wrapper
        ├── BabloApp.js           # Main Application Class
        ├── Events.js             # Event System
        ├── document.events.js    # Document Event Helpers
        ├── babloHttp.js          # BabloHttp - Unique HTTP Client
        ├── forms.js              # Form Utilities
        ├── helpers.js            # General Utilities
        ├── style.js              # Dynamic Styling
        ├── time.js               # Time Utilities
        ├── logger.js             # Logging System
        ├── icons.js              # Icon Utilities
        └── symboles.js           # Symbol Constants
```

---

## Installation & Setup

### Prerequisites

- Node.js 14.0.0 or higher (for npm installation)
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (required for ES6 modules)

### Method 1: Install via npm (Recommended)

**Step 1: Install the package**

```bash
npm install bablojs
```

**Step 2: Copy files to your project**

After installation, copy the necessary files from `node_modules/bablojs/` to your project root:

```bash
# Copy index.html
cp node_modules/bablojs/index.html .

# Copy src directory
cp -r node_modules/bablojs/src ./src
```

Or manually copy:
- `index.html` → your project root
- `src/` → your project root

**Step 3: Start Local Server**

ES6 modules require a server (CORS restrictions). Choose one:

**Option A: Using npm scripts (if included)**
```bash
npm start
# or
npm run dev
```

**Option B: Node.js Serve**
```bash
npx serve .
```

**Option C: PHP Built-in Server**
```bash
php -S localhost:8000
```

**Option D: Python HTTP Server**
```bash
python -m http.server 8000
```

**Option E: VS Code Live Server**
- Install "Live Server" extension
- Right-click `index.html` → "Open with Live Server"

**Step 4: Access Application**

Open your browser and navigate to:
```
http://localhost:8000
```

### Method 2: Clone from GitHub

**Step 1: Clone the repository**

```bash
git clone https://github.com/ShoaibShokat03/bablojs.git
cd bablojs
```

**Step 2: Start Local Server**

Follow the same server options as Method 1, Step 3.

### Method 3: Download and Extract

1. Download the latest release from [GitHub Releases](https://github.com/ShoaibShokat03/bablojs/releases)
2. Extract the files
3. Follow server setup instructions above

---

## Framework Overview

### How BABLOJS Works

1. **Entry Point**: `index.html` loads `main.js` as an ES6 module
2. **Initialization**: `main.js` initializes the app, router, and loads routes
3. **First Render**: App component renders, router handles initial route
4. **Component Loading**: Routes lazy-load components on demand
5. **Virtual DOM**: Components create Virtual DOM nodes
6. **Rendering**: Virtual DOM is diffed and patched to real DOM
7. **Interactivity**: User actions trigger state updates → re-renders

### Key Concepts

#### 1. Virtual DOM
A JavaScript representation of the DOM. Changes are computed in memory first, then efficiently applied to the real DOM.

#### 2. Components
JavaScript functions that return Virtual DOM nodes. They can have state, props, and lifecycle hooks.

#### 3. Hooks
Functions that let you "hook into" component state and lifecycle. Similar to React hooks.

#### 4. Routing
Client-side routing using History API. No page reloads, smooth navigation.

#### 5. State Management
- **Component State**: `useState` hook for local component state
- **Global State**: `Config.appState` Map for application-wide state
- **Component State Storage**: `Config.componentState` for current component reference

---

## Core Modules Explained

### 1. bablo.js - Virtual DOM Engine

**Purpose**: The heart of BABLOJS. Handles Virtual DOM creation, diffing, and patching.

**Key Functions**:
- `render(component, container)`: Renders a component to a DOM element
- `createElement(type, props, ...children)`: Creates a Virtual DOM node

**How It Works**:
```javascript
// Component creates Virtual DOM
const vnode = Div({ class: "container" }, "Hello");

// Virtual DOM is diffed against current DOM
// Only changed parts are updated
// Efficient, minimal DOM manipulation
```

**Features**:
- Key-based reconciliation for lists
- Efficient diffing algorithm
- Event handler attachment
- Ref support
- Style handling (string and object)

### 2. hooks.js - State & Lifecycle Management

**Purpose**: Provides React-like hooks for component state and side effects.

**Available Hooks**:

#### useState
```javascript
const [count, setCount] = useState(0);
// Returns: [currentValue, setterFunction]
```

#### useEffect
```javascript
useEffect(() => {
  // Side effect code
  return () => {
    // Cleanup code
  };
}, [dependencies]);
```

#### useRef
```javascript
const inputRef = useRef(null);
// Returns: { current: value }
```

#### useMemo
```javascript
const expensive = useMemo(() => {
  return heavyCalculation(data);
}, [data]);
```

**Internal Mechanism**:
- Uses cursor-based system to track hook calls
- State stored in `Config.appState` Map
- Effects stored and run after render
- Memoization cache for performance

### 3. html.js - Element Factories

**Purpose**: Provides capitalized functions for all HTML elements.

**Usage**:
```javascript
import { Div, H1, Button, Input } from "./_modules/html.js";

Div({ class: "container" }, 
  H1({}, "Title"),
  Button({ onclick: handleClick }, "Click Me")
);
```

**All Available Elements**:
- Structural: `Div`, `Section`, `Article`, `Header`, `Footer`, `Main`, `Nav`
- Headings: `H1` through `H6`
- Text: `P`, `Span`, `Strong`, `Em`, `Code`, `Pre`
- Lists: `Ul`, `Ol`, `Li`, `Dl`, `Dt`, `Dd`
- Forms: `Form`, `Input`, `Button`, `Label`, `Textarea`, `Select`, `Option`
- Media: `Img`, `Video`, `Audio`, `Canvas`
- Links: `A`
- Tables: `Table`, `Thead`, `Tbody`, `Tr`, `Th`, `Td`
- And many more...

### 4. router.js - Routing System

**Purpose**: Handles client-side routing, navigation, and SEO.

**Key Features**:
- History API routing (clean URLs)
- Automatic link interception
- Browser history support (back/forward)
- 404 handling
- Error pages
- SEO meta tag management
- Route guards (via helpers)

**Router Methods**:
```javascript
router.go("/path");           // Navigate to route
router.redirect("/path");     // Alias for go()
router.navigate("/path");     // Alias for go()
router.redirectHard("/path"); // Hard redirect (full reload)
router.route();               // Handle current route
router.init();                // Initialize router
```

**Route Configuration**:
```javascript
{
  "/path": {
    title: "Page Title",
    description: "Page description",
    component: () => import("./views/Page.js"),
    auth: false,
    category: "main",
    keywords: "seo, keywords",
    ogImage: "/image.png"
  }
}
```

### 5. requests.js - URL Utilities

**Purpose**: Helper functions for URL manipulation and query parameters.

**Key Functions**:
```javascript
requests.url("/path");        // Generate full URL with base
requests.get("param");        // Get query parameter
requests.set("param", "val"); // Set query parameter
requests.remove("param");     // Remove query parameter
requests.getAll();            // Get all query parameters
```

### 6. storage.js - Local Storage Wrapper

**Purpose**: Simplified localStorage API with type safety.

**Usage**:
```javascript
storage.set("key", "value");
const value = storage.get("key");
storage.remove("key");
storage.clear();
```

### 7. babloHttp.js - BabloHttp Unique HTTP Client

**Purpose**: Powerful and unique HTTP client library for BabloJS with advanced features, better than axios.

**Key Features**:
- Request/Response interceptors
- Request cancellation (AbortController)
- Automatic retry with exponential backoff
- Multiple response types (JSON, text, blob, arrayBuffer)
- Progress tracking for upload/download
- Base URL configuration
- Query parameters builder
- Comprehensive error handling
- Instance-based client creation

**Usage**:

**Simple usage (backward compatible)**:
```javascript
import { babloRequest } from './_modules/babloHttp.js';

const data = await babloRequest({
  url: "/api/data",
  method: "POST",
  body: { name: "John" },
  headers: { "Content-Type": "application/json" },
  onProgress: (progress) => console.log(progress),
  onSuccess: (data) => console.log(data),
  onError: (error) => console.error(error),
  timeout: 10000
});
```

**Enhanced usage with convenience methods**:
```javascript
import babloHttp from './_modules/babloHttp.js';

// GET request
const users = await babloHttp.get('/api/users', {
  params: { page: 1, limit: 10 }
});

// POST request
const newUser = await babloHttp.post('/api/users', {
  name: 'John',
  email: 'john@example.com'
});

// With interceptors
babloHttp.interceptRequest((config) => {
  config.headers['Authorization'] = `Bearer ${token}`;
  return config;
});

// Create custom instance
const apiClient = babloHttp.create({
  baseURL: 'https://api.example.com',
  timeout: 5000,
  retries: 3,
  headers: {
    'Authorization': 'Bearer token'
  }
});
```

**Advanced features**:
```javascript
// Request cancellation
const controller = new AbortController();
const request = babloHttp.get('/api/data', { signal: controller.signal });
controller.abort(); // Cancel the request

// Automatic retry
const data = await babloHttp.get('/api/data', {
  retries: 3,
  retryDelay: 1000,
  retryCondition: (error) => error.status >= 500
});

// Response types
const blob = await babloHttp.get('/api/file', { responseType: 'blob' });
const text = await babloHttp.get('/api/file', { responseType: 'text' });
```

**Interactive Demo**: Visit `/bablo-http` route to see BabloHttp in action!

---

## Application Structure

### Configuration Flow

```
index.html
  └── loads main.js (ES6 module)
      └── imports Config
      └── initializes babloApp with Config
      └── sets up router
      └── loads routes
      └── renders App component
      └── router.route() handles initial route
```

### Component Loading Flow

```
User navigates to /about
  └── router.go("/about")
      └── router.route("/about")
          └── Finds route in router.routes
          └── Calls route.component() (lazy import)
          └── Component module loads
          └── setPageProps() updates meta tags
          └── render(component, root) renders
          └── Virtual DOM created
          └── DOM updated
```

### State Management Flow

```
Component uses useState
  └── State stored in Config.appState Map
  └── Key: "state-{componentIndex}-{hookIndex}"
  └── setState called
      └── State updated in Map
      └── scheduleUpdate() called
      └── Component re-renders
      └── Virtual DOM diffed
      └── DOM patched
```

---

## Quick Start Guide

### Step 1: Install BABLOJS

```bash
npm install bablojs
```

### Step 2: Set Up Your Project Structure

```
my-bablojs-app/
├── index.html          # Copy from node_modules/bablojs/
├── src/
│   ├── _modules/       # Framework core (from bablojs package)
│   ├── app/            # Your app configuration
│   ├── routes/         # Your routes
│   └── views/          # Your components
└── package.json
```

### Step 3: Create a Component

```javascript
// src/views/MyPage.js
import { Div, H1, Button, P } from "../_modules/html.js";
import { useState } from "../_modules/hooks.js";

export default function MyPage() {
  const [count, setCount] = useState(0);
  
  return Div(
    { class: "my-page" },
    H1({}, "My Page"),
    P({}, `Count: ${count}`),
    Button(
      { onclick: () => setCount(count + 1) },
      "Increment"
    )
  );
}
```

### Step 4: Add Route

```javascript
// src/app/routes/routes.js
const components = {
  MyPage: () => import("../../views/MyPage.js"),
};

const routes = {
  "/my-page": {
    title: "My Page",
    description: "A custom page",
    component: components.MyPage,
    auth: false,
    category: "main"
  }
};

export default routes;
```

### Step 5: Configure Your App

```javascript
// src/app/config/config.js
import appConfig from "./app.js";
import authConfig from "./auth.js";
// ... other configs

export default {
  app: appConfig,
  auth: authConfig,
  // ... other configs
};
```

### Step 6: Initialize Your App

```javascript
// src/app/load/main.js
import { documentEvents } from "../../_modules/document.events.js";
import { babloApp } from "../../_modules/BabloApp.js";
import Config from "../config/config.js";
import { router } from "../../_modules/router.js";
import routes from "../routes/routes.js";

const app = babloApp;
app.init(Config);
app.routes = routes;
router.init();

documentEvents.onDomContentLoaded(async () => {
  router.route();
});
```

### Step 7: Navigate to Route

```javascript
// In any component
import { router } from "../_modules/router.js";
import { requests } from "../_modules/requests.js";
import { A, Button } from "../_modules/html.js";

// Option 1: Programmatic
router.go("/my-page");

// Option 2: Link
A({ href: requests.url("/my-page") }, "Go to My Page");

// Option 3: Button with route attribute
Button({ route: "/my-page" }, "Navigate");
```

### Step 8: Start Development Server

```bash
npm start
# or
npx serve .
```

That's it! Your component is now accessible at `/my-page`.

---

## Use Cases

### 1. Simple Landing Page

**Use Case**: Marketing website with multiple pages

```javascript
// Perfect for: Company websites, portfolios, marketing sites
// Features needed: Routing, Components, Basic styling

const routes = {
  "/": { component: () => import("./views/Home.js"), ... },
  "/about": { component: () => import("./views/About.js"), ... },
  "/contact": { component: () => import("./views/Contact.js"), ... }
};
```

### 2. Dashboard Application

**Use Case**: Admin panel, analytics dashboard

```javascript
// Perfect for: Internal tools, admin panels
// Features needed: Authentication, Protected routes, State management

// Protect routes
if (!auth.isLogged()) {
  router.redirect("/login");
}

// Use global state for user data
Config.appState.set("user", userData);
```

### 3. E-commerce Product Catalog

**Use Case**: Product listing, search, filters

```javascript
// Perfect for: Shopping sites, catalogs
// Features needed: State management, URL parameters, API integration

// Use query parameters for filters
requests.set("category", "electronics");
requests.set("sort", "price");

// Fetch data
const products = await fetchRequest({
  url: `/api/products?${new URLSearchParams(requests.getAll())}`
});
```

### 4. Blog/Content Site

**Use Case**: Blog, documentation site, news site

```javascript
// Perfect for: Content-heavy sites
// Features needed: SEO optimization, Routing, Dynamic content

// SEO is automatic via route configuration
{
  "/blog/post-1": {
    title: "Post Title",
    description: "Post description",
    keywords: "blog, post, article",
    component: () => import("./views/BlogPost.js")
  }
}
```

### 5. Real-time Application

**Use Case**: Chat app, live updates, notifications

```javascript
// Perfect for: Interactive apps
// Features needed: useEffect for subscriptions, State updates
  
  useEffect(() => {
  const socket = new WebSocket("ws://...");
  socket.onmessage = (event) => {
    setMessages([...messages, JSON.parse(event.data)]);
  };
  return () => socket.close();
  }, []);
```

### 6. Form-Heavy Application

**Use Case**: Surveys, applications, data entry

```javascript
// Perfect for: Forms, wizards, multi-step processes
// Features needed: Form handling, Validation, State management

const [formData, setFormData] = useState({
  name: "",
  email: "",
  // ...
});
  
  const handleSubmit = async (e) => {
    e.preventDefault();
        await fetchRequest({
    url: "/api/submit",
          method: "POST",
          body: formData
        });
};
```

---

## API Reference

### Router API

#### `router.init()`
Initializes the router. Sets up event listeners for navigation.

#### `router.go(path)`
Navigates to a route using History API.

**Parameters**:
- `path` (string): Route path to navigate to

**Returns**: Promise<string> - The new route URL

#### `router.redirect(path)`
Alias for `router.go()`.

#### `router.navigate(path)`
Alias for `router.go()`.

#### `router.redirectHard(path)`
Performs a hard redirect using `window.location.href`.

#### `router.route(route?, component?)`
Internal method to handle routing. Can be called directly.

**Parameters**:
- `route` (string, optional): Route to navigate to
- `component` (function|object, optional): Component to render directly

### Hooks API

#### `useState(initialValue)`
Creates stateful value in component.

**Returns**: `[value, setValue]`

#### `useEffect(callback, dependencies?)`
Runs side effects after render.

**Parameters**:
- `callback` (function): Effect function
- `dependencies` (array, optional): Dependency array

#### `useRef(initialValue)`
Creates a mutable ref object.

**Returns**: `{ current: value }`

#### `useMemo(factory, dependencies)`
Memoizes expensive calculations.

**Returns**: Memoized value

### Requests API

#### `requests.url(path)`
Generates full URL with base path.

#### `requests.get(paramName)`
Gets query parameter value.

#### `requests.set(paramName, value)`
Sets query parameter (updates URL).

#### `requests.remove(paramName)`
Removes query parameter.

#### `requests.getAll()`
Gets all query parameters as object.

### Storage API

#### `storage.set(key, value)`
Stores value in localStorage.

#### `storage.get(key)`
Retrieves value from localStorage.

#### `storage.remove(key)`
Removes value from localStorage.

#### `storage.clear()`
Clears all localStorage.

### Auth API

#### `auth.isLogged()`
Checks if user is authenticated.

**Returns**: boolean

#### `auth.user()`
Gets current user object.

**Returns**: User object or `{ username: "Guest", email: "" }`

#### `auth.login(data)`
Stores authentication data.

**Parameters**:
- `data` (object): Auth data with `access_token`, `refresh_token`, `role`, `user`, `timeout`

#### `auth.logout()`
Clears authentication and redirects to `/login`.

---

## Best Practices

### 1. Component Organization

✅ **Do**:
- Keep components small and focused
- One component per file
- Use descriptive names
- Group related components in folders

❌ **Don't**:
- Create giant components
- Mix concerns in one component
- Use generic names like "Component"

### 2. State Management

✅ **Do**:
- Use `useState` for component-specific state
- Use `Config.appState` for global state
- Clear state when appropriate
- Use `useMemo` for expensive calculations

❌ **Don't**:
- Store everything in global state
- Create unnecessary re-renders
- Forget to clean up effects

### 3. Routing

✅ **Do**:
- Use lazy loading for components
- Provide meaningful route metadata
- Handle 404 cases
- Use `requests.url()` for links

❌ **Don't**:
- Hardcode URLs
- Forget SEO metadata
- Create circular navigation

### 4. Performance

✅ **Do**:
- Use keys for list items
- Memoize expensive operations
- Lazy load routes
- Optimize useEffect dependencies

❌ **Don't**:
- Create unnecessary re-renders
- Forget to clean up subscriptions
- Load everything upfront

### 5. Code Style

✅ **Do**:
- Use consistent naming
- Comment complex logic
- Follow ES6+ patterns
- Keep functions pure when possible

❌ **Don't**:
- Mix coding styles
- Write unreadable code
- Ignore errors

---

## Advanced Topics

### Custom Hooks

Create reusable hook logic:

```javascript
// src/hooks/useAuth.js
import { useState, useEffect } from "../_modules/hooks.js";
import { auth } from "../app/config/auth.js";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(auth.isLogged());
  const [user, setUser] = useState(auth.user());
  
  useEffect(() => {
    // Check auth status periodically
    const interval = setInterval(() => {
      setIsAuthenticated(auth.isLogged());
      setUser(auth.user());
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  return { isAuthenticated, user };
}
```

### Route Guards

Protect routes with authentication:

```javascript
// In router.js or route handler
async route(route) {
  const routeObj = this.routes[route];
  
  if (routeObj?.auth && !isAuthenticated()) {
    return render(unauthorized, babloApp.babloApp.root);
  }
  
  // Continue with normal routing...
}
```

### Error Boundaries

Handle component errors:

   ```javascript
// src/views/components/ErrorBoundary.js
export default function ErrorBoundary({ children, fallback }) {
  try {
    return children;
  } catch (error) {
    console.error("Component error:", error);
    return fallback || Div({}, "Something went wrong");
  }
}
```

### Performance Optimization

   ```javascript
// Use keys for lists
Ul({}, items.map(item => 
  Li({ key: item.id }, item.name)
));

// Memoize expensive calculations
const expensive = useMemo(() => {
     return heavyCalculation(data);
   }, [data]);

// Optimize effects
   useEffect(() => {
  // Only runs when dependency changes
}, [dependency]);
```

---

## Troubleshooting

### Common Issues

**Problem**: Components not rendering
- **Solution**: Check that you're exporting components as `export default`
- **Solution**: Verify router.routes is set correctly

**Problem**: State not updating
- **Solution**: Use setState function, don't mutate state directly
- **Solution**: Check that useState is called at component top level

**Problem**: Routes not working
- **Solution**: Ensure router.init() is called
- **Solution**: Check that routes object is properly formatted
- **Solution**: Verify base href in index.html

**Problem**: ES6 modules not loading
- **Solution**: Use a local server (not file://)
- **Solution**: Check browser console for CORS errors

---

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

## Support

For questions, issues, or contributions:
- Open an issue on GitHub
- Check the documentation
- Review the example code

---

## 📚 Additional Resources

- **GitHub Repository**: [https://github.com/ShoaibShokat03/bablojs](https://github.com/ShoaibShokat03/bablojs)
- **npm Package**: [https://www.npmjs.com/package/bablojs](https://www.npmjs.com/package/bablojs)
- **Issues**: [https://github.com/ShoaibShokat03/bablojs/issues](https://github.com/ShoaibShokat03/bablojs/issues)

## 🎯 Getting Started with npm Package

If you installed BABLOJS via npm, here's a quick example of how to use it:

```javascript
// Import BABLOJS modules
import { render, createElement } from './src/_modules/bablo.js';
import { useState, useEffect } from './src/_modules/hooks.js';
import { Div, H1, Button } from './src/_modules/html.js';
import { router } from './src/_modules/router.js';

// Create a simple component
function App() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    console.log('Component mounted!');
  }, []);
  
  return Div(
    { class: "app" },
    H1({}, "Welcome to BABLOJS"),
    Div({}, `Count: ${count}`),
    Button(
      { onclick: () => setCount(count + 1) },
      "Click Me"
    )
  );
}

// Render the app
render(App, document.getElementById('app'));
```

## 📝 Version History

- **1.0.0** - Initial release
  - Virtual DOM implementation
  - React-like hooks system
  - Routing system
  - Component-based architecture
  - BabloHttp HTTP client
  - Zero dependencies

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](https://github.com/ShoaibShokat03/bablojs/blob/main/CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Shoaib Shokat**

- Email: shoaibshokat6@gmail.com
- GitHub: [@ShoaibShokat03](https://github.com/ShoaibShokat03)

## 🙏 Acknowledgments

- Inspired by React's component model and hooks API
- Built with modern JavaScript (ES6+)
- Zero external dependencies for maximum performance

---

**BABLOJS** - Building fast, scalable SPAs with vanilla JavaScript! 🚀

Made with ❤️ by the BABLOJS community 
