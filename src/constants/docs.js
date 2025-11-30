export const documentation = {
  sections: [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: 'fa-solid fa-rocket',
      content: {
        title: 'Getting Started with BABLOJS',
        description: 'BABLOJS is a lightweight JavaScript framework that brings React-like features to vanilla JavaScript. It\'s designed to be simple, fast, and easy to learn while maintaining the performance benefits of vanilla JavaScript.',
        subsections: [
          {
            title: 'What is BABLOJS?',
            content: 'BABLOJS provides a modern development experience without the overhead of traditional frameworks. It offers React-like hooks, component-based architecture, Virtual DOM rendering, and routing - all without requiring Node.js, build tools, or external dependencies.',
            features: [
              'React-like Hooks: useState, useEffect, useRef, and useMemo for state management and side effects',
              'Component-based Architecture: Build reusable, composable components with a simple function-based API',
              'Virtual DOM-like Rendering: Efficient DOM updates with minimal re-renders',
              'Zero Build Configuration: Start building immediately without complex build tools or transpilation',
              'Routing System: Simple, declarative routing for single-page applications',
              'Built-in Utilities: Storage, URL management, and helper functions included'
            ]
          },
          {
            title: 'Why Choose BABLOJS?',
            content: 'BABLOJS is perfect for developers who want modern framework features without the complexity.',
            benefits: [
              {
                title: 'Lightweight',
                icon: 'fa-solid fa-bolt',
                description: 'Only 2KB gzipped with zero dependencies. Perfect for projects where bundle size matters.'
              },
              {
                title: 'Familiar API',
                icon: 'fa-solid fa-bullseye',
                description: 'React-like hooks API you already know. If you\'ve used React, you\'ll feel right at home.'
              },
              {
                title: 'Fast',
                icon: 'fa-solid fa-rocket',
                description: 'Optimized rendering and minimal overhead. Get the performance of vanilla JavaScript with modern DX.'
              },
              {
                title: 'Composable',
                icon: 'fa-solid fa-puzzle-piece',
                description: 'Mix and match modules, router, and helpers to fit any architecture or project needs.'
              },
              {
                title: 'Simple',
                icon: 'fa-solid fa-box',
                description: 'No complex build tools or configuration required. Start building immediately with just vanilla JavaScript.'
              },
              {
                title: 'Flexible',
                icon: 'fa-solid fa-wrench',
                description: 'Use it for small prototypes or large applications. Scales from simple components to complex SPAs.'
              }
            ]
          }
        ]
      }
    },
    {
      id: 'installation',
      title: 'Installation',
      icon: 'fa-solid fa-download',
      content: {
        title: 'Installation',
        description: 'Get BABLOJS up and running in your project in just a few minutes.',
        subsections: [
          {
            title: 'CDN Installation',
            content: 'The quickest way to get started is using the CDN link. Add this to your HTML file:',
            code: `<script src="https://cdn.bablojs.com/bablo.min.js"></script>`,
            note: 'This gives you access to all BABLOJS modules globally.'
          },
          {
            title: 'Local Installation',
            content: 'To use BABLOJS in your project, copy the framework modules to your project directory.',
            steps: [
              'Download or clone the BABLOJS repository',
              'Copy the `_modules` folder to your project\'s `src` directory',
              'Import the modules you need in your JavaScript files using ES6 imports'
            ],
            code: `// Import hooks for state management
import { useState, useEffect } from "./_modules/hooks.js";

// Import Virtual DOM rendering
import { render } from "./_modules/bablo.js";

// Import HTML element factories
import { Div, Button, H1, P } from "./_modules/html.js";

// Import router for navigation
import { router } from "./_modules/router.js";

// Import utilities
import { requests } from "./_modules/requests.js";
import { storage } from "./_modules/storage.js";`,
            notes: [
              'All imports use ES6 module syntax',
              'You only need to import what you use',
              'Modules are located in the `_modules` folder',
              'Make sure your server supports ES6 modules'
            ]
          },
          {
            title: 'Quick Setup Example',
            content: 'Here\'s a complete example of setting up a BABLOJS application:',
            example: `// index.html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <base href="/">
  <title>My BABLOJS App</title>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="./src/app/load/main.js"></script>
</body>
</html>

// src/app/load/main.js
import { render } from "../../_modules/bablo.js";
import { router } from "../../_modules/router.js";
import routes from "../../routes/routes.js";
import Config from "../../config/config.js";

// Initialize router
router.init();
router.routes = routes;

// Initialize app
Config.init();

// Handle initial route
router.route();

// Example component
import { Div, H1, P } from "../../_modules/html.js";

function App() {
  return Div(
    { id: "app" },
    H1({}, "Welcome to BABLOJS"),
    P({}, "Your app is ready!")
  );
}

// Render the app
render(App, document.getElementById("root"));`
          },
          {
            title: 'Project Structure',
            content: 'A typical BABLOJS project structure looks like this:',
            code: `bablojs-app/
├── src/
│   ├── _modules/          # BABLOJS core modules
│   │   ├── bablo.js      # Virtual DOM and rendering
│   │   ├── hooks.js      # React-like hooks
│   │   ├── html.js       # HTML element factories
│   │   ├── router.js     # Routing system
│   │   └── ...
│   ├── views/            # Your components
│   ├── routes/           # Route definitions
│   └── app/              # App configuration
└── index.html`
          }
        ]
      }
    },
    {
      id: 'hooks',
      title: 'Hooks API',
      icon: 'fa-solid fa-code',
      content: {
        title: 'Hooks API',
        description: 'BABLOJS provides React-like hooks for state management and side effects. Hooks let you use state and other features in functional components with a familiar API.',
        subsections: [
          {
            title: 'useState',
            description: 'The useState hook allows you to add state to your components. It returns the current state value and a function to update it.',
            syntax: 'const [state, setState] = useState(initialValue);',
            parameters: [
              {
                name: 'initialValue',
                type: 'any',
                description: 'The initial state value (can be any type: string, number, object, array, etc.)'
              }
            ],
            returns: 'An array with two elements: [currentState, setStateFunction]',
            example: `import { useState } from "../_modules/hooks.js";
import { Div, Button, P } from "../_modules/html.js";

function Counter() {
  const [count, setCount] = useState(0);
  
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  
  return Div(
    { class: "counter-container" },
    P({}, "Count: " + count),
    Div(
      { class: "flex gap-2" },
      Button({ onclick: decrement }, "-"),
      Button({ onclick: increment }, "+")
    )
  );
}`,
            notes: [
              'State updates trigger re-renders automatically',
              'You can pass a function to setState for updates based on previous state',
              'State persists across re-renders until component unmounts'
            ]
          },
          {
            title: 'useEffect',
            description: 'The useEffect hook lets you perform side effects in your components. It runs after the component renders.',
            syntax: 'useEffect(callback, dependencies);',
            parameters: [
              {
                name: 'callback',
                type: 'function',
                description: 'The function to run. Can return a cleanup function.'
              },
              {
                name: 'dependencies',
                type: 'array (optional)',
                description: 'Array of dependencies. Effect runs when dependencies change. Empty array = run once. Omit = run every render.'
              }
            ],
            example: `import { useState, useEffect } from "../_modules/hooks.js";
import { Div, P } from "../_modules/html.js";

function DataFetcher() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/data');
      const result = await response.json();
      setData(result);
      setLoading(false);
    }
    fetchData();
  }, []); // Empty array = run once on mount
  
  if (loading) return Div({}, "Loading...");
  return Div({}, P({}, JSON.stringify(data)));
}`,
            notes: [
              'Use empty dependency array [] to run effect only once on mount',
              'Omit dependencies to run effect on every render',
              'Return a cleanup function to clean up subscriptions or timers'
            ]
          },
          {
            title: 'useRef',
            description: 'The useRef hook returns a mutable ref object that persists across renders. Useful for accessing DOM elements or storing mutable values.',
            syntax: 'const ref = useRef(initialValue);',
            parameters: [
              {
                name: 'initialValue',
                type: 'any',
                description: 'The initial value for the ref'
              }
            ],
            returns: 'A ref object with a current property',
            example: `import { useRef } from "../_modules/hooks.js";
import { Input, Button, Div } from "../_modules/html.js";

function FocusInput() {
  const inputRef = useRef(null);
  
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  return Div(
    {},
    Input({ ref: inputRef, placeholder: "Type here..." }),
    Button({ onclick: focusInput }, "Focus Input")
  );
}`,
            notes: [
              'Refs don\'t trigger re-renders when changed',
              'Use refs to access DOM elements directly',
              'Refs persist across re-renders'
            ]
          },
          {
            title: 'useMemo',
            description: 'The useMemo hook memoizes expensive calculations. It only recalculates when dependencies change.',
            syntax: 'const memoizedValue = useMemo(factory, dependencies);',
            parameters: [
              {
                name: 'factory',
                type: 'function',
                description: 'Function that returns the value to memoize'
              },
              {
                name: 'dependencies',
                type: 'array',
                description: 'Array of dependencies. Value recalculates when dependencies change.'
              }
            ],
            example: `import { useState, useMemo } from "../_modules/hooks.js";
import { Div, P } from "../_modules/html.js";

function ExpensiveCalculation({ numbers }) {
  const [count, setCount] = useState(0);
  
  const expensiveValue = useMemo(() => {
    console.log('Calculating expensive value...');
    return numbers.reduce((sum, num) => sum + num, 0);
  }, [numbers]); // Only recalculate when numbers change
  
  return Div(
    {},
    P({}, "Sum: " + expensiveValue),
    P({}, "Render count: " + count),
    Button({ onclick: () => setCount(count + 1) }, "Re-render")
  );
}`,
            notes: [
              'Use useMemo to optimize expensive calculations',
              'Only recalculates when dependencies change',
              'Don\'t overuse - memoization has its own overhead'
            ]
          }
        ]
      }
    },
    {
      id: 'components',
      title: 'Components',
      icon: 'fa-solid fa-puzzle-piece',
      content: {
        title: 'Components',
        description: 'Components are the building blocks of BABLOJS applications. They are JavaScript functions that return Virtual DOM elements.',
        subsections: [
          {
            title: 'Creating Components',
            content: 'Components are simple functions that return Virtual DOM elements using HTML factories.',
            example: `import { Div, H1, P, Button } from "../_modules/html.js";
import { useState } from "../_modules/hooks.js";

function Welcome({ name }) {
  return Div(
    { class: "welcome-container" },
    H1({}, "Welcome, " + name + "!"),
    P({}, "Thanks for using BABLOJS")
  );
}

function Counter() {
  const [count, setCount] = useState(0);
  
  return Div(
    { class: "counter" },
    P({}, "Count: " + count),
    Button({ onclick: () => setCount(count + 1) }, "Increment")
  );
}`,
            notes: [
              'Components are just JavaScript functions',
              'Use HTML factories (Div, H1, Button, etc.) to create elements',
              'Components can use hooks for state and side effects',
              'Pass props as function parameters'
            ]
          },
          {
            title: 'HTML Element Factories',
            content: 'BABLOJS provides capitalized functions for all HTML elements. These create Virtual DOM nodes.',
            commonElements: [
              { name: 'Div', description: 'Creates a div element' },
              { name: 'H1-H6', description: 'Creates heading elements (H1 through H6)' },
              { name: 'P', description: 'Creates a paragraph element' },
              { name: 'Button', description: 'Creates a button element' },
              { name: 'Input', description: 'Creates an input element' },
              { name: 'A', description: 'Creates anchor/link element' },
              { name: 'Ul, Li', description: 'Creates unordered list and list items' },
              { name: 'Form', description: 'Creates form element' },
              { name: 'Label', description: 'Creates label element' },
              { name: 'Textarea', description: 'Creates textarea element' },
              { name: 'Select, Option', description: 'Creates select dropdown and options' },
              { name: 'Img', description: 'Creates image element' }
            ],
            example: `import { Div, H1, Button, Input, P } from "../_modules/html.js";

function FormComponent() {
  return Form(
    { onsubmit: handleSubmit },
    Div(
      { class: "form-group" },
      Label({}, "Name"),
      Input({ type: "text", name: "name", required: true })
    ),
    Button({ type: "submit" }, "Submit")
  );
}`
          },
          {
            title: 'Component Props',
            content: 'Pass data to components through function parameters.',
            example: `function UserCard({ name, email, avatar }) {
  return Div(
    { class: "user-card" },
    Img({ src: avatar, alt: name }),
    H3({}, name),
    P({}, email)
  );
}

// Usage
UserCard({ 
  name: "John Doe", 
  email: "john@example.com",
  avatar: "/avatar.jpg"
})`
          }
        ]
      }
    },
    {
      id: 'routing',
      title: 'Routing',
      icon: 'fa-solid fa-route',
      content: {
        title: 'Routing',
        description: 'BABLOJS includes a powerful routing system for building single-page applications. It uses the History API for clean URLs and automatically handles navigation, link clicks, and browser back/forward buttons.',
        subsections: [
          {
            title: 'Router Setup',
            content: 'Set up routing by defining routes in your routes configuration file. The router is initialized in your main.js file.',
            example: `// src/routes/routes.js
const components = {
  Home: () => import("../views/Home.js"),
  About: () => import("../views/About.js"),
  Docs: () => import("../views/Docs.js"),
};

const routes = {
  "/": {
    title: "Home",
    description: "Welcome to BABLOJS",
    component: components.Home,
    auth: false,
    category: "main"
  },
  "/about": {
    title: "About",
    description: "Learn about BABLOJS",
    component: components.About,
    auth: false,
    category: "main"
  },
  "/docs": {
    title: "Documentation",
    description: "BABLOJS Documentation",
    component: components.Docs,
    auth: false,
    category: "main"
  }
};

export default routes;`,
            code: `// src/app/load/main.js
import { router } from "../../_modules/router.js";
import routes from "../../routes/routes.js";

router.init();
router.routes = routes;

documentEvents.onDomContentLoaded(async () => {
  App();
  router.route(); // Handle initial route
});`,
            notes: [
              'Routes are defined as objects with title, description, component, and optional auth/category properties',
              'Components are lazy-loaded using dynamic imports for better performance',
              'Router automatically handles navigation, link clicks, and browser history',
              'Call router.init() to set up event listeners',
              'Set router.routes to your routes object'
            ]
          },
          {
            title: 'Route Configuration',
            content: 'Each route can have the following properties:',
            parameters: [
              {
                name: 'title',
                type: 'string',
                description: 'Page title (used for document.title and SEO meta tags)'
              },
              {
                name: 'description',
                type: 'string',
                description: 'Page description (used for meta description and Open Graph tags)'
              },
              {
                name: 'component',
                type: 'function',
                description: 'Async function that returns a dynamic import of the component module'
              },
              {
                name: 'auth',
                type: 'boolean (optional)',
                description: 'Whether authentication is required (default: false)'
              },
              {
                name: 'category',
                type: 'string (optional)',
                description: 'Route category for organization (e.g., "main", "legal", "support")'
              },
              {
                name: 'keywords',
                type: 'string (optional)',
                description: 'SEO keywords for meta tags'
              },
              {
                name: 'ogImage',
                type: 'string (optional)',
                description: 'Open Graph image URL for social sharing'
              },
              {
                name: 'twitterImage',
                type: 'string (optional)',
                description: 'Twitter Card image URL'
              }
            ],
            example: `const routes = {
  "/dashboard": {
    title: "Dashboard",
    description: "User dashboard with analytics and settings",
    component: () => import("../views/Dashboard.js"),
    auth: true,
    category: "user",
    keywords: "dashboard, analytics, user",
    ogImage: "/images/dashboard-preview.png"
  }
};`
          },
          {
            title: 'Navigation Methods',
            content: 'Navigate between routes using various methods. The router automatically handles link clicks and browser navigation.',
            methods: [
              {
                name: 'router.go(path)',
                description: 'Navigate to a route using History API. Updates URL and renders the component. Returns a Promise with the new route.'
              },
              {
                name: 'router.redirect(path)',
                description: 'Alias for router.go(). Navigate to a route programmatically.'
              },
              {
                name: 'router.redirectHard(path)',
                description: 'Perform a hard redirect using window.location.href. Causes a full page reload.'
              },
              {
                name: 'router.navigate(path)',
                description: 'Alias for router.go(). Navigate to a route programmatically.'
              },
              {
                name: 'router.route(route, component)',
                description: 'Internal method to handle routing. Can be called directly with a route path and optional component.'
              }
            ],
            example: `import { router } from "../_modules/router.js";
import { requests } from "../_modules/requests.js";
import { A, Button } from "../_modules/html.js";

// Programmatic navigation
router.go("/dashboard");
router.redirect("/about");
router.navigate("/docs");

// Using anchor tag (automatically intercepted by router)
A({ href: requests.url("/about") }, "About")

// Using route attribute
Button({ 
  route: "/docs",
  onclick: () => console.log("Navigating...")
}, "Go to Docs")

// Using component attribute (renders component directly)
Button({ 
  component: () => MyComponent
}, "Show Component")`,
            notes: [
              'All anchor tags (<a>) are automatically intercepted unless they have refresh, download, target attributes, or are mailto/tel/javascript links',
              'Use requests.url() to generate proper URLs that respect the base path',
              'The router automatically handles browser back/forward buttons via popstate events',
              'App state is automatically cleared on route changes'
            ]
          },
          {
            title: 'URL Parameters and Query Strings',
            content: 'Access URL query parameters using the requests utility. The router automatically handles query strings in URLs.',
            example: `import { requests } from "../_modules/requests.js";
import { Div, P } from "../_modules/html.js";

function SearchResults() {
  // Get a single query parameter
  const searchTerm = requests.get('q');
  const page = requests.get('page');
  
  // Get all query parameters as object
  const allParams = requests.getAll();
  
  // Set a query parameter (updates URL without reload)
  requests.set('tab', 'settings');
  
  // Remove a query parameter
  requests.remove('filter');
  
  return Div(
    {},
    P({}, "Searching for: " + searchTerm),
    P({}, "Page: " + page)
  );
}`,
            notes: [
              'Use requests.get(name) to get a single query parameter',
              'Use requests.getAll() to get all query parameters as an object',
              'Use requests.set(name, value) to set a query parameter (updates URL)',
              'Use requests.remove(name) to remove a query parameter',
              'Query string changes don\'t trigger route changes - they update the URL via pushState'
            ]
          },
          {
            title: 'Automatic Features',
            content: 'The router automatically provides several features without additional configuration:',
            features: [
              'Automatic link interception: All anchor tags are intercepted and handled via SPA navigation',
              'Browser history support: Back/forward buttons work automatically via popstate events',
              '404 handling: Unknown routes automatically show a 404 page',
              'Error handling: Route loading errors are caught and displayed in an error page',
              'SEO optimization: Automatically sets document.title, meta tags, Open Graph, and Twitter Card tags',
              'State management: Automatically clears appState on route changes',
              'Component state: Stores current component in componentState for access across the app',
              'Route normalization: Automatically normalizes routes (handles trailing slashes, case-insensitive matching)'
            ]
          },
          {
            title: 'Route Guards and Authentication',
            content: 'While the router includes helper functions for authentication checking, route guards should be implemented in your route handling logic. The router provides isAuthenticated() and getUserRole() helpers.',
            example: `// In your route component or before navigation
import { router } from "../_modules/router.js";
import { babloApp } from "../_modules/BabloApp.js";

// Check authentication before navigating
const isAuthenticated = () =>
  babloApp.config.storage.get(babloApp.config.session.userProfile) !== null;

const getUserRole = () =>
  babloApp.config.storage.get(babloApp.config.session.userRoleKey) || "guest";

// Protect a route
if (!isAuthenticated()) {
  router.redirect("/login");
}

// Check role
if (getUserRole() !== "admin") {
  router.redirect("/unauthorized");
}`,
            notes: [
              'The router includes isAuthenticated() and getUserRole() helper functions',
              'Route guards should be implemented in your components or navigation logic',
              'The router provides an unauthorized() component that can be used for 403 errors',
              'Authentication state is stored in Config.storage using session keys'
            ]
          }
        ]
      }
    },
    {
      id: 'state-management',
      title: 'State Management',
      icon: 'fa-solid fa-database',
      content: {
        title: 'State Management',
        description: 'BABLOJS provides multiple ways to manage state in your application: component-level state with hooks and global state management.',
        subsections: [
          {
            title: 'Component State',
            content: 'Use useState hook for component-level state management.',
            example: `import { useState } from "../_modules/hooks.js";

function Counter() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("Anonymous");
  
  return Div(
    {},
    P({}, \`Hello \${name}, count: \${count}\`),
    Button({ onclick: () => setCount(count + 1) }, "Increment")
  );
}`
          },
          {
            title: 'Global State',
            content: 'Access global application state through Config.appState.',
            example: `import Config from "../app/config/config.js";

// Set global state
Config.appState.set('user', { name: 'John', id: 1 });

// Get global state
const user = Config.appState.get('user');

// Check if key exists
if (Config.appState.has('user')) {
  // User is logged in
}

// Delete state
Config.appState.delete('user');`,
            notes: [
              'Global state persists across component re-renders',
              'Use for application-wide data like user info, theme, etc.',
              'State is stored in a Map for efficient access'
            ]
          }
        ]
      }
    },
    {
      id: 'examples',
      title: 'Examples',
      icon: 'fa-solid fa-lightbulb',
      content: {
        title: 'Examples',
        description: 'Practical examples to help you get started with BABLOJS.',
        subsections: [
          {
            title: 'Todo List',
            content: 'A complete todo list application demonstrating state management and event handling.',
            example: `import { useState } from "../_modules/hooks.js";
import { Div, Input, Button, Ul, Li } from "../_modules/html.js";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  
  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input, done: false }]);
      setInput("");
    }
  };
  
  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ));
  };
  
  return Div(
    { class: "todo-app" },
    Div(
      { class: "todo-input" },
      Input({
        value: input,
        onchange: (e) => setInput(e.target.value),
        onkeypress: (e) => e.key === 'Enter' && addTodo()
      }),
      Button({ onclick: addTodo }, "Add")
    ),
    Ul(
      {},
      ...todos.map(todo =>
        Li(
          {
            key: todo.id,
            onclick: () => toggleTodo(todo.id),
            style: todo.done ? "text-decoration: line-through" : ""
          },
          todo.text
        )
      )
    )
  );
}`
          },
          {
            title: 'Data Fetching',
            content: 'Fetch and display data from an API using useEffect.',
            example: `import { useState, useEffect } from "../_modules/hooks.js";
import { Div, P, Ul, Li } from "../_modules/html.js";

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);
  
  if (loading) return Div({}, "Loading...");
  
  return Ul(
    {},
    ...users.map(user =>
      Li({ key: user.id }, user.name)
    )
  );
}`
          }
        ]
      }
    },
    {
      id: 'utilities',
      title: 'Utilities',
      icon: 'fa-solid fa-toolbox',
      content: {
        title: 'Utilities',
        description: 'BABLOJS includes a comprehensive set of utility functions for common tasks like storage management, URL handling, and more.',
        subsections: [
          {
            title: 'Storage Utility',
            description: 'The storage utility provides easy access to localStorage for persisting data across sessions.',
            syntax: 'import { storage } from "../_modules/storage.js";',
            methods: [
              {
                name: 'storage.set(key, value)',
                description: 'Store a value in localStorage. Values are automatically stringified if they are objects.'
              },
              {
                name: 'storage.get(key)',
                description: 'Retrieve a value from localStorage. Returns null if key doesn\'t exist.'
              },
              {
                name: 'storage.remove(key)',
                description: 'Remove a specific key from localStorage.'
              },
              {
                name: 'storage.clear()',
                description: 'Clear all data from localStorage.'
              },
              {
                name: 'storage.keys()',
                description: 'Get all keys in localStorage as an array.'
              },
              {
                name: 'storage.values()',
                description: 'Get all values in localStorage as an array.'
              },
              {
                name: 'storage.length()',
                description: 'Get the number of items in localStorage.'
              }
            ],
            example: `import { storage } from "../_modules/storage.js";

// Store data
storage.set('username', 'john_doe');
storage.set('userPreferences', { theme: 'dark', lang: 'en' });

// Retrieve data
const username = storage.get('username');
const prefs = JSON.parse(storage.get('userPreferences'));

// Check and remove
if (storage.get('username')) {
  storage.remove('username');
}

// Clear all storage
storage.clear();`,
            notes: [
              'Storage uses localStorage, so data persists across browser sessions',
              'Objects must be stringified with JSON.stringify() before storing',
              'Storage is synchronous - no async/await needed',
              'Storage is available globally through Config.storage as well'
            ]
          },
          {
            title: 'Requests Utility',
            description: 'The requests utility provides methods for URL manipulation and query parameter handling. Perfect for managing URL state and navigation.',
            syntax: 'import { requests } from "../_modules/requests.js";',
            methods: [
              {
                name: 'requests.url(path)',
                description: 'Generate a full URL with base path. Automatically handles leading/trailing slashes.'
              },
              {
                name: 'requests.get(paramName)',
                description: 'Get a single query parameter from the current URL. Returns the parameter value or null.'
              },
              {
                name: 'requests.set(paramName, paramValue)',
                description: 'Set a query parameter in the URL. Updates the URL without page reload using pushState.'
              },
              {
                name: 'requests.remove(paramName)',
                description: 'Remove a query parameter from the URL. Updates the URL without page reload.'
              },
              {
                name: 'requests.getAll()',
                description: 'Get all query parameters as an object. Returns an object with all URL parameters.'
              },
              {
                name: 'requests.pathname()',
                description: 'Get the current pathname from the URL.'
              },
              {
                name: 'requests.search()',
                description: 'Get the current search query string from the URL.'
              },
              {
                name: 'requests.hash()',
                description: 'Get the current hash fragment from the URL.'
              },
              {
                name: 'requests.hostname()',
                description: 'Get the current hostname from the URL.'
              },
              {
                name: 'requests.origin()',
                description: 'Get the current origin (protocol + hostname + port).'
              }
            ],
            example: `import { requests } from "../_modules/requests.js";
import { A, Button } from "../_modules/html.js";

// Generate URLs
const aboutUrl = requests.url("/about");
const profileUrl = requests.url("/user/profile");

// Get query parameters
const userId = requests.get('userId'); // ?userId=123
const tab = requests.get('tab'); // ?tab=settings

// Get all parameters
const allParams = requests.getAll(); // { userId: '123', tab: 'settings' }

// Set query parameter (updates URL)
requests.set('tab', 'profile');
requests.set('page', '1');

// Remove query parameter
requests.remove('filter');

// Use in components
function Navigation() {
  return Div(
    {},
    A({ href: requests.url("/about") }, "About"),
    Button({
      onclick: () => {
        requests.set('view', 'list');
        // URL updated without page reload
      }
    }, "List View")
  );
}`,
            notes: [
              'requests.url() respects the base path from your HTML base tag',
              'Setting/removing query parameters updates the URL but doesn\'t trigger route changes',
              'Query parameters are URL-encoded automatically',
              'All methods are synchronous and work immediately'
            ]
          },
          {
            title: 'Config Object',
            description: 'Access application-wide configuration through the Config object. This provides access to storage, session management, and app state.',
            example: `import Config from "../app/config/config.js";

// Access app root element
const rootElement = Config.app.root;

// Storage access (same as storage module)
Config.storage.set('key', 'value');
const value = Config.storage.get('key');

// Session management keys
const userProfileKey = Config.session.userProfile;
const userRoleKey = Config.session.userRoleKey;

// Global app state (Map-based)
Config.appState.set('theme', 'dark');
const theme = Config.appState.get('theme');
const hasTheme = Config.appState.has('theme');
Config.appState.delete('theme');

// Component state (for internal use)
Config.componentState.set('currentComponent', MyComponent);`,
            notes: [
              'Config.appState is a Map for efficient key-value storage',
              'Config.storage uses localStorage for persistence',
              'Config.session provides predefined keys for session management',
              'Config.componentState is used internally by the framework'
            ]
          }
        ]
      }
    },
    {
      id: 'html-elements',
      title: 'HTML Elements',
      icon: 'fa-solid fa-code',
      content: {
        title: 'HTML Element Factories',
        description: 'BABLOJS provides capitalized factory functions for all standard HTML elements. These create Virtual DOM nodes that can be efficiently diffed and rendered.',
        subsections: [
          {
            title: 'Common HTML Elements',
            description: 'All HTML elements are available as capitalized functions. Here are the most commonly used ones:',
            commonElements: [
              { name: 'Div', description: 'Generic container element' },
              { name: 'H1, H2, H3, H4, H5, H6', description: 'Heading elements' },
              { name: 'P', description: 'Paragraph element' },
              { name: 'Span', description: 'Inline container element' },
              { name: 'A', description: 'Anchor/link element' },
              { name: 'Button', description: 'Button element' },
              { name: 'Input', description: 'Input element (text, email, password, etc.)' },
              { name: 'Textarea', description: 'Multi-line text input' },
              { name: 'Form', description: 'Form container element' },
              { name: 'Label', description: 'Label for form inputs' },
              { name: 'Select, Option', description: 'Dropdown select and options' },
              { name: 'Img', description: 'Image element' },
              { name: 'Ul, Ol, Li', description: 'Unordered/ordered lists and list items' },
              { name: 'Table, Thead, Tbody, Tr, Th, Td', description: 'Table elements' },
              { name: 'Section', description: 'Section container' },
              { name: 'Article', description: 'Article container' },
              { name: 'Header', description: 'Header container' },
              { name: 'Footer', description: 'Footer container' },
              { name: 'Nav', description: 'Navigation container' },
              { name: 'Main', description: 'Main content container' },
              { name: 'Aside', description: 'Sidebar/aside container' },
              { name: 'Code', description: 'Inline code element' },
              { name: 'Pre', description: 'Preformatted text block' },
              { name: 'I', description: 'Icon container (for Font Awesome, etc.)' },
              { name: 'Strong', description: 'Bold/important text' },
              { name: 'Em', description: 'Emphasized text' },
              { name: 'Br', description: 'Line break' },
              { name: 'Hr', description: 'Horizontal rule' },
              { name: 'Style', description: 'Style tag for inline CSS' }
            ]
          },
          {
            title: 'Using HTML Elements',
            description: 'All HTML factory functions accept props as the first argument and children as additional arguments.',
            example: `import { Div, H1, P, Button, Input, Form, Label } from "../_modules/html.js";

// Simple element with text content
const title = H1({}, "Welcome to BABLOJS");

// Element with props
const container = Div(
  { class: "container", id: "main" },
  H1({ class: "title" }, "Hello World"),
  P({ style: "color: blue;" }, "This is a paragraph")
);

// Form example
const loginForm = Form(
  { 
    onsubmit: (e) => {
      e.preventDefault();
      // Handle form submission
    }
  },
  Div(
    { class: "form-group" },
    Label({ for: "email" }, "Email"),
    Input({ 
      type: "email", 
      id: "email", 
      name: "email",
      required: true,
      placeholder: "Enter your email"
    })
  ),
  Button({ type: "submit" }, "Submit")
);

// Element with event handlers
const button = Button(
  {
    onclick: () => alert("Clicked!"),
    onmouseover: () => console.log("Hovered"),
    disabled: false
  },
  "Click Me"
);

// Nested elements
const card = Div(
  { class: "card" },
  Img({ src: "/image.jpg", alt: "Description" }),
  Div(
    { class: "card-body" },
    H3({}, "Card Title"),
    P({}, "Card content goes here")
  )
);`,
            notes: [
              'Props are passed as the first argument (object)',
              'Children are passed as additional arguments',
              'Props support all standard HTML attributes',
              'Event handlers use camelCase (onclick, onchange, etc.)',
              'Boolean attributes (like disabled, required) should be set to true/false'
            ]
          },
          {
            title: 'Special Props',
            description: 'Some props have special handling in BABLOJS:',
            example: `import { Div, Input } from "../_modules/html.js";
import { useRef } from "../_modules/hooks.js";

// ref prop - for accessing DOM elements
function MyComponent() {
  const inputRef = useRef(null);
  
  return Input({
    ref: inputRef,
    onfocus: () => {
      if (inputRef.current) {
        inputRef.current.select();
      }
    }
  });
}

// key prop - for list items (important for efficient re-renders)
const items = data.map(item => 
  Div({ key: item.id }, item.name)
);

// route prop - for router navigation
Button({ route: "/about" }, "Go to About");

// component prop - for rendering components
Button({ component: MyComponent }, "Show Component");`,
            notes: [
              'Use ref prop to get direct access to DOM elements',
              'Always provide key prop when rendering lists for optimal performance',
              'route prop automatically handles navigation via router',
              'component prop renders a component directly'
            ]
          },
          {
            title: 'Complete Element List',
            description: 'BABLOJS supports all standard HTML5 elements. Here is the complete list:',
            content: 'A, Abbr, Address, Area, Article, Aside, Audio, B, Base, Bdi, Bdo, Blockquote, Body, Br, Button, Canvas, Caption, Cite, Code, Col, Colgroup, Data, Datalist, Dd, Del, Details, Dfn, Dialog, Div, Dl, Dt, Em, Embed, Fieldset, Figcaption, Figure, Footer, Form, H1-H6, Head, Header, Hgroup, Hr, Html, I, Iframe, Img, Input, Ins, Kbd, Label, Legend, Li, Link, Main, Map, Mark, Meta, Meter, Nav, Noscript, Object, Ol, Optgroup, Option, Output, P, Param, Picture, Pre, Progress, Q, Rp, Rt, Ruby, S, Samp, Script, Section, Select, Small, Source, Span, Strong, Style, Sub, Summary, Sup, Table, Tbody, Td, Template, Textarea, Tfoot, Th, Thead, Time, Title, Tr, Track, U, Ul, Var, Video, Wbr'
          }
        ]
      }
    },
    {
      id: 'api',
      title: 'API Reference',
      icon: 'fa-solid fa-book',
      content: {
        title: 'API Reference',
        description: 'Complete reference for all BABLOJS APIs and utilities.',
        subsections: [
          {
            title: 'Core Modules',
            modules: [
              {
                name: 'bablo.js',
                description: 'Virtual DOM and rendering engine',
                exports: ['render', 'createElement']
              },
              {
                name: 'hooks.js',
                description: 'React-like hooks system',
                exports: ['useState', 'useEffect', 'useRef', 'useMemo', 'resetStateCursor', 'runEffects']
              },
              {
                name: 'html.js',
                description: 'HTML element factories',
                exports: ['Div', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'Button', 'Input', 'A', 'Ul', 'Li', 'Form', 'Label', 'Textarea', 'Select', 'Option', 'Img', 'Span', 'I', 'Code', 'Pre', 'Section', 'Style']
              },
              {
                name: 'router.js',
                description: 'Routing system with History API support',
                exports: ['Router', 'router']
              },
              {
                name: 'requests.js',
                description: 'URL and request utilities',
                exports: ['url', 'get', 'set', 'remove', 'getAll', 'windowGetHref', 'pathname', 'search', 'hash', 'hostname', 'port', 'protocol', 'origin', 'baseURL', 'fullURL', 'href']
              }
            ]
          },
          {
            title: 'Configuration',
            content: 'Access application configuration through Config object.',
            example: `import Config from "../app/config/config.js";

// App root element
const root = Config.app.root;

// Storage utilities
Config.storage.set('key', 'value');
const value = Config.storage.get('key');

// Session management
Config.session.userProfile;
Config.session.userRoleKey;`
          }
        ]
      }
    }
  ]
};

// Flatten all content for search
export const searchableContent = (() => {
  const results = [];
  documentation.sections.forEach(section => {
    // Add section title
    results.push({
      section: section.id,
      title: section.title,
      content: section.content.description || '',
      type: 'section'
    });
    
    // Add subsections
    if (section.content.subsections) {
      section.content.subsections.forEach(subsection => {
        results.push({
          section: section.id,
          title: subsection.title,
          content: subsection.content || subsection.description || '',
          type: 'subsection',
          code: subsection.code || subsection.example || ''
        });
      });
    }
  });
  return results;
})();

