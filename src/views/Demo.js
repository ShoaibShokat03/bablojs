import {
  Div,
  H1,
  H2,
  H3,
  H4,
  P,
  Button,
  Span,
  A,
  Section,
  Input,
  Label,
  Code,
  Pre,
  Style
} from "../_modules/html.js";
import { useState, useEffect } from "../_modules/hooks.js";
import { requests } from "../_modules/requests.js";
import MainLayout from "./components/MainLayout.js";
import CodeModal from "./components/CodeModal.js";

function Demo() {
  const [activeDemo, setActiveDemo] = useState('counter');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState('');
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [todoData, setTodoData] = useState([]);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    setTodoData([{ id: 1, text: "Task 1" }]);
  }, []);

  function Welcome({ name }) {
    return Div(
      { class: "welcome-card" },
      H1({}, `Hello, ${name}!`),
      P({}, "Welcome to BABLOJS")
    );
  }

  function deleteTodoFromPreview(id) {
    setTodoData(todoData.filter(item => item.id !== id));
  }

  function TodoList({ todos }) {
    return Div(
      { class: "todo-list space-y-2" },
      H2({ class: "text-xl font-semibold" }, "My Todos"),
      ...todos.map(todo =>
        Div(
          { class: "todo-item flex justify-between items-center p-3 rounded border border-neutral-200" },
          Span({}, todo.text),
          Button(
            { class: "btn btn-outline btn-sm", onclick: () => deleteTodoFromPreview(todo.id) },
            "Delete"
          )
        )
      )
    );
  }

  const syntaxExamples = [
    {
      title: "Basic Component",
      description: "Create expressive UI blocks with plain functions.",
      code: `function Welcome({ name }) {
  return Div(
    { class: "welcome-card" },
    H1({}, \`Hello, \${name}!\`),
    P({}, "Welcome to BABLOJS")
  );
}

// Usage
return Welcome({ name: "World" });`,
      preview: Welcome({ name: "world" })
    },
    {
      title: "Dynamic List",
      description: "Map over data sources and handle events inline.",
      code: `function TodoList({ todos }) {
  return Div(
    { class: "todo-list" },
    H2({}, "My Todos"),
    ...todos.map(todo => 
      Div(
        { class: "todo-item" },
        Span({}, todo.text),
        Button(
          { onclick: () => deleteTodoFromPreview(todo.id) },
          "Delete"
        )
      )
    )
  );
}
//Usage
TodoList([{id:1,text:'Task 1'}])`,
      preview: TodoList({ todos: todoData })
    },
    {
      title: "Form Component",
      description: "Control form state without extra abstractions.",
      code: `function ContactForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, message });
  };

  return Div(
    { class: "contact-form" },
    H2({}, "Contact Us"),
    Form(
      { onsubmit: handleSubmit },
      Input({
        type: "email",
        placeholder: "Your email",
        value: email,
        onchange: (e) => setEmail(e.target.value)
      }),
      Textarea({
        placeholder: "Your message",
        value: message,
        onchange: (e) => setMessage(e.target.value)
      }),
      Button({ type: "submit" }, "Send Message")
    )
  );
}`
    },
    {
      title: "Conditional Rendering",
      description: "Render just what you need with native JS syntax.",
      code: `function UserProfile({ user }) {
  return Div(
    { class: "user-profile" },
    H1({}, \`Welcome, \${user.name}\`),
    user.isAdmin && Div(
      { class: "admin-panel" },
      H3({}, "Admin Panel"),
      Button({}, "Manage Users")
    ),
    !user.isVerified && Div(
      { class: "warning" },
      P({}, "Please verify your email address")
    )
  );
}`
    }
  ];

  // Counter functions
  const incrementCounter = () => setCount(count + 1);
  const decrementCounter = () => setCount(Math.max(0, count - 1));

  // Todo functions
  const addTodo = () => {
    if (todoInput.trim()) {
      setTodos([...todos, { id: Date.now(), text: todoInput, done: false }]);
      setTodoInput('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Timer functions
  const startTimer = () => setIsRunning(true);
  const stopTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setTimer(0);
    setIsRunning(false);
  };

  // Form functions
  const updateFormData = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const submitForm = () => {
    alert(`Form submitted:\nName: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`);
  };

  const demos = [
    {
      id: 'counter',
      title: 'Counter Demo',
      icon: '🔢',
      description: 'Basic state management with useState hook',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'todo',
      title: 'Todo List',
      icon: '✅',
      description: 'Complex state management with arrays and objects',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'timer',
      title: 'Timer',
      icon: '⏱️',
      description: 'useEffect hook for side effects and intervals',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'form',
      title: 'Form Demo',
      icon: '📝',
      description: 'Form handling with controlled inputs',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getCurrentCode = () => {
    switch (activeDemo) {
      case 'counter':
        return `import { Div, Button, Span } from "../modules/html.js";
import { useState } from "../modules/hooks.js";

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(Math.max(0, count - 1));

  return Div(
    { class: "card text-center p-8" },
    Div(
      { class: "text-6xl font-bold text-secondary-600 mb-4" },
      count.toString()
    ),
    Div(
      { class: "flex gap-4 justify-center" },
      Button(
        { 
          class: "btn btn-outline btn-lg px-8 py-3 text-2xl font-bold",
          onclick: decrement
        },
        "−"
      ),
      Button(
        { 
          class: "btn btn-gradient btn-lg px-8 py-3 text-2xl font-bold",
          onclick: increment
        },
        "+"
      )
    )
  );
}

export default Counter;`;

      case 'todo':
        return `import { Div, Input, Button, Span } from "../modules/html.js";
import { useState } from "../modules/hooks.js";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { 
        id: Date.now(), 
        text: input, 
        done: false 
      }]);
      setInput('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return Div(
    { class: "card p-6" },
    Div(
      { class: "flex gap-2 mb-6" },
      Input({ 
        class: "form-input",
        value: input, 
        onchange: (e) => setInput(e.target.value),
        placeholder: "Add a new todo...",
        onkeypress: (e) => e.key === 'Enter' && addTodo()
      }),
      Button(
        { class: "btn btn-primary", onclick: addTodo },
        "Add"
      )
    ),
    Div(
      { class: "space-y-2" },
      todos.length === 0 ? (
        P({ class: "text-secondary text-center" }, "No todos yet. Add one above!")
      ) : (
        ...todos.map(todo =>
          Div(
            { 
              class: \`card p-4 flex items-center justify-between \${todo.done ? 'opacity-50' : ''}\`
            },
            Div(
              { class: "flex items-center gap-3" },
              Input({
                type: "checkbox",
                checked: todo.done,
                onchange: () => toggleTodo(todo.id)
              }),
              Span(
                { class: \`\${todo.done ? 'line-through text-secondary' : ''}\` },
                todo.text
              )
            ),
            Button(
              { 
                class: "btn btn-outline btn-sm",
                onclick: () => deleteTodo(todo.id)
              },
              "Delete"
            )
          )
        )
      )
    )
  );
}

export default TodoList;`;

      case 'timer':
        return `import { Div, Button, Span } from "../modules/html.js";
import { useState, useEffect } from "../modules/hooks.js";

function Timer() {
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return \`\${mins.toString().padStart(2, '0')}:\${secs.toString().padStart(2, '0')}\`;
  };

  const start = () => setIsRunning(true);
  const stop = () => setIsRunning(false);
  const reset = () => {
    setTimer(0);
    setIsRunning(false);
  };

  return Div(
    { class: "card text-center p-8" },
    Div(
      { class: "text-6xl font-bold text-secondary-600 mb-6" },
      formatTime(timer)
    ),
    Div(
      { class: "flex gap-4 justify-center" },
      Button(
        { 
          class: "btn btn-primary",
          onclick: start,
          disabled: isRunning
        },
        "Start"
      ),
      Button(
        { 
          class: "btn btn-secondary",
          onclick: stop,
          disabled: !isRunning
        },
        "Stop"
      ),
      Button(
        { 
          class: "btn btn-outline",
          onclick: reset
        },
        "Reset"
      )
    )
  );
}

export default Timer;`;

      case 'form':
        return `import { Div, Input, Button, Label, P } from "../modules/html.js";
import { useState } from "../modules/hooks.js";

function ContactForm() {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    message: '' 
  });

  const updateFormData = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const submitForm = () => {
    console.log('Form submitted:', formData);
    alert(\`Form submitted:\\nName: \${formData.name}\\nEmail: \${formData.email}\\nMessage: \${formData.message}\`);
  };

  return Div(
    { class: "card p-6" },
    Div(
      { class: "grid grid-2 gap-6" },
      Div(
        { class: "space-y-4" },
        Div(
          { class: "form-group" },
          Label({ class: "form-label" }, "Name"),
          Input({ 
            class: "form-input",
            type: "text",
            value: formData.name,
            onchange: (e) => updateFormData('name', e.target.value),
            placeholder: "Enter your name"
          })
        ),
        Div(
          { class: "form-group" },
          Label({ class: "form-label" }, "Email"),
          Input({ 
            class: "form-input",
            type: "email",
            value: formData.email,
            onchange: (e) => updateFormData('email', e.target.value),
            placeholder: "Enter your email"
          })
        ),
        Div(
          { class: "form-group" },
          Label({ class: "form-label" }, "Message"),
          Input({ 
            class: "form-input",
            type: "text",
            value: formData.message,
            onchange: (e) => updateFormData('message', e.target.value),
            placeholder: "Enter your message"
          })
        ),
        Button(
          { 
            class: "btn btn-primary w-full",
            onclick: submitForm
          },
          "Submit Form"
        )
      ),
      Div(
        { class: "bg-neutral-50 p-4 rounded-lg" },
        H3({ class: "text-lg font-bold mb-4" }, "Form Data Preview:"),
        P({ class: "text-sm mb-2" }, \`Name: \${formData.name || 'Not set'}\`),
        P({ class: "text-sm mb-2" }, \`Email: \${formData.email || 'Not set'}\`),
        P({ class: "text-sm" }, \`Message: \${formData.message || 'Not set'}\`)
      )
    )
  );
}

export default ContactForm;`;

      default:
        return '';
    }
  };

  const activeDemoData = demos.find(d => d.id === activeDemo);

  return MainLayout(
    // Enhanced Demo Page Styles
    Style(
      {},
      `
      /* Grid Layouts */
      .demo-grid-4 {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--space-6);
      }
      
      .demo-grid-3 {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--space-8);
        align-items: start;
      }
      
      .demo-grid-2 {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--space-6);
        align-items: start;
      }
      
      .demo-flex-responsive {
        display: flex;
        flex-direction: column;
        gap: var(--space-4);
        justify-content: center;
        align-items: center;
        width: 100%;
      }
      
      /* Demo Card Enhancements */
      .demo-card {
        position: relative;
        overflow: hidden;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .demo-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, var(--color-secondary-500), var(--color-accent-500));
        transform: scaleX(0);
        transition: transform 0.3s ease;
      }
      
      .demo-card:hover::before {
        transform: scaleX(1);
      }
      
      .demo-card-active {
        border-color: var(--color-secondary-500) !important;
        box-shadow: 0 10px 30px rgba(139, 92, 246, 0.15);
        transform: translateY(-4px);
      }
      
      .demo-card-active::before {
        transform: scaleX(1);
      }
      
      /* Demo Preview Container */
      .demo-preview-container {
        min-height: 400px;
        display: flex;
        flex-direction: column;
        height: 100%;
      }
      
      /* Code Sidebar */
      .demo-code-sidebar {
        position: sticky;
        top: var(--space-8);
        max-height: calc(100vh - var(--space-16));
        overflow-y: auto;
        height: fit-content;
      }
      
      /* Ensure proper alignment */
      .demo-col-span-2,
      .demo-col-span-1 {
        display: flex;
        flex-direction: column;
      }
      
      .demo-col-span-2 > *,
      .demo-col-span-1 > * {
        height: 100%;
      }
      
      /* Responsive Breakpoints */
      @media (min-width: 640px) {
        .demo-grid-4 {
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-6);
        }
        
        .demo-flex-responsive {
          flex-direction: row;
          gap: var(--space-6);
        }
      }
      
      @media (min-width: 768px) {
        .demo-grid-2 {
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-6);
          align-items: start;
        }
        
        .demo-grid-3 {
          gap: var(--space-8);
        }
      }
      
      @media (min-width: 1024px) {
        .demo-grid-4 {
          grid-template-columns: repeat(4, 1fr);
          gap: var(--space-8);
        }
        
        .demo-grid-3 {
          grid-template-columns: 3fr 1fr;
          gap: var(--space-8);
          align-items: start;
        }
        
        .demo-col-span-2 {
          grid-column: span 1;
        }
        
        .demo-col-span-1 {
          grid-column: span 1;
        }
      }
      
      /* Grid Column Spans */
      .demo-col-span-2 {
        grid-column: span 1;
      }
      
      .demo-col-span-1 {
        grid-column: span 1;
      }
      
      /* Animation Enhancements */
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .demo-fade-in {
        animation: fadeInUp 0.5s ease-out;
      }
      
      /* Button Enhancements */
      .demo-btn-interactive {
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .demo-btn-interactive:hover {
        transform: scale(1.05);
      }
      
      .demo-btn-interactive:active {
        transform: scale(0.98);
      }
      
      /* Form Enhancements */
      .demo-form-group {
        margin-bottom: var(--space-5);
      }
      
      .demo-form-preview {
        background: linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(236, 72, 153, 0.05) 100%);
        border: 1px solid rgba(139, 92, 246, 0.2);
        display: flex;
        flex-direction: column;
      }
      
      /* Grid Alignment Fixes */
      .demo-grid-2 > * {
        display: flex;
        flex-direction: column;
      }
      
      /* Ensure cards align at top */
      .demo-grid-3 > .demo-col-span-2,
      .demo-grid-3 > .demo-col-span-1 {
        align-self: start;
      }
      
      /* Todo Item Enhancements */
      .demo-todo-item {
        transition: all 0.2s ease;
      }
      
      .demo-todo-item:hover {
        transform: translateX(4px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }
      
      /* Timer Display */
      .demo-timer-display {
        font-variant-numeric: tabular-nums;
        letter-spacing: 0.1em;
      }
      
      /* Counter Display */
      .demo-counter-display {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .demo-counter-display:hover {
        transform: scale(1.05);
      }
      
      /* Mobile Optimizations */
      @media (max-width: 767px) {
        .demo-preview-container {
          min-height: 300px;
        }
        
        .demo-code-sidebar {
          position: relative;
          top: 0;
          max-height: none;
        }
        
        .demo-grid-3 {
          gap: var(--space-6);
        }
      }
      `
    ),
    // Hero Section
    Section(
      { class: "section relative overflow-hidden" },
      Div(
        { class: "absolute inset-0 bg-gradient-to-br from-primary-50 via-purple-50 to-pink-50 opacity-60 -z-10" }
      ),
      Div(
        { class: "container relative z-10" },
        Div(
          { class: "max-w-4xl mx-auto text-center py-8 md:py-12 lg:py-16" },
          Span(
            {
              class: "inline-block px-4 py-2 mb-4 md:mb-6 text-sm font-semibold text-primary-700 bg-primary-100 rounded-full uppercase tracking-wider"
            },
            "Interactive Demos"
          ),
          H1(
            {
              class: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-900 mb-4 md:mb-6 leading-tight"
            },
            "Explore ",
            Span({ class: "heading-gradient-purple-pink" }, "BABLOJS"),
            " in Action"
          ),
          P(
            {
              class: "text-base md:text-lg lg:text-xl text-secondary max-w-3xl mx-auto mb-6 md:mb-8 lg:mb-10 leading-relaxed"
            },
            "Experience live examples showcasing BABLOJS capabilities. See hooks, state management, and component patterns in action with real, interactive demos."
          ),
          Div(
            {
              class: "demo-flex-responsive"
            },
            A(
              {
                href: requests.url("/docs"),
                class: "btn btn-gradient btn-lg px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:-translate-y-1"
              },
              "📚 Read Documentation"
            ),
            A(
              {
                href: requests.url("/contact"),
                class: "btn btn-outline btn-lg px-8 py-4 text-lg font-semibold border-2 hover:bg-primary-50 transition-all duration-300"
              },
              "💬 Get Support"
            )
          )
        )
      )
    ),

    // Demo Navigation
    Section(
      { class: "section bg-white" },
      Div(
        { class: "container" },
        Div(
          { class: "text-center mb-8 md:mb-12" },
          H2(
            { class: "text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 text-primary-900" },
            "Choose a Demo"
          ),
          P(
            { class: "text-base md:text-lg lg:text-xl text-secondary max-w-2xl mx-auto leading-relaxed" },
            "Click on any demo card to explore BABLOJS features interactively"
          )
        ),
        Div(
          { class: "demo-grid-4" },
          ...demos.map(demo =>
            Button(
              {
                class: `group relative demo-card card p-6 md:p-8 text-center cursor-pointer border-2 ${activeDemo === demo.id
                    ? 'demo-card-active border-secondary-500 bg-gradient-to-br from-secondary-50 to-purple-50 z-10'
                    : 'border-neutral-200 hover:border-secondary-300 hover:shadow-lg'
                  }`,
                onclick: () => setActiveDemo(demo.id),
                style: "width: 100%;"
              },
              Div(
                {
                  class: `text-5xl md:text-6xl mb-4 transform transition-transform duration-300 ${activeDemo === demo.id ? 'scale-110' : 'group-hover:scale-110'
                    }`
                },
                demo.icon
              ),
              H3(
                { class: "text-xl md:text-2xl font-bold mb-3 text-primary-900" },
                demo.title
              ),
              P(
                { class: "text-sm md:text-base text-secondary leading-relaxed mb-4" },
                demo.description
              ),
              activeDemo === demo.id && Div(
                { 
                  class: "absolute top-3 right-3 w-3 h-3 bg-secondary-500 rounded-full animate-pulse",
                  style: "box-shadow: 0 0 8px rgba(139, 92, 246, 0.6);"
                }
              )
            )
          )
        )
      )
    ),

    // Demo Content Section
    Section(
      { class: "section bg-neutral-50" },
      Div(
        { class: "container" },
        Div(
          { class: "demo-grid-3" },

          // Demo Preview - Takes 2 columns on large screens
          Div(
            { class: "demo-col-span-2 demo-fade-in" },
            Div(
              { class: "card p-6 md:p-8 demo-preview-container h-full" },
              Div(
                { class: "flex items-center justify-between mb-6 pb-4 border-b border-neutral-200" },
                Div(
                  { class: "flex-1" },
                  H3(
                    { class: "text-2xl md:text-3xl font-bold text-primary-900 mb-2" },
                    activeDemoData?.title || "Demo"
                  ),
                  P(
                    { class: "text-secondary text-base md:text-lg" },
                    activeDemoData?.description || ""
                  )
                ),
                Span(
                  { class: "text-4xl md:text-5xl ml-4" },
                  activeDemoData?.icon || "🎯"
                )
              ),

              // Counter Demo
              activeDemo === 'counter' && Div(
                { class: "text-center py-8 flex-1 flex flex-col justify-center" },
                Div(
                  { class: "demo-counter-display text-6xl md:text-7xl lg:text-8xl font-extrabold heading-gradient-purple-pink mb-6" },
                  count.toString()
                ),
                P(
                  { class: "text-secondary mb-8 text-base md:text-lg" },
                  "Click the buttons below to interact with the counter"
                ),
                Div(
                  { class: "flex gap-4 justify-center flex-wrap" },
                  Button(
                    {
                      class: "demo-btn-interactive btn btn-outline btn-lg px-8 md:px-10 py-4 text-2xl md:text-3xl font-bold",
                      onclick: decrementCounter
                    },
                    "−"
                  ),
                  Button(
                    {
                      class: "demo-btn-interactive btn btn-gradient btn-lg px-8 md:px-10 py-4 text-2xl md:text-3xl font-bold",
                      onclick: incrementCounter
                    },
                    "+"
                  )
                )
              ),

              // Todo Demo
              activeDemo === 'todo' && Div(
                { class: "py-4 flex-1 flex flex-col" },
                Div(
                  { class: "flex gap-3 mb-6" },
                  Input({
                    class: "form-input flex-1",
                    value: todoInput,
                    onchange: (e) => setTodoInput(e.target.value),
                    placeholder: "Add a new todo...",
                    onkeypress: (e) => e.key === 'Enter' && addTodo()
                  }),
                  Button(
                    {
                      class: "demo-btn-interactive btn btn-gradient px-6 font-semibold",
                      onclick: addTodo
                    },
                    "Add"
                  )
                ),
                Div(
                  { class: "space-y-3 flex-1 overflow-y-auto max-h-96" },
                 ( todos.length === 0 ? (
                    Div(
                      { class: "text-center py-12 flex items-center justify-center h-full" },
                      Div(
                        {},
                        P(
                          { class: "text-secondary text-lg mb-2 font-semibold" },
                          "No todos yet"
                        ),
                        P(
                          { class: "text-sm text-secondary" },
                          "Add one above to get started!"
                        )
                      )
                    )
                  ) : (
                    todos.map(todo =>
                      Div(
                        {
                          class: `demo-todo-item card p-4 flex items-center justify-between ${todo.done ? 'opacity-60 bg-neutral-50' : ''
                            }`
                        },
                        Div(
                          { class: "flex items-center gap-4 flex-1 min-w-0" },
                          Input({
                            type: "checkbox",
                            class: "w-5 h-5 cursor-pointer flex-shrink-0",
                            checked: todo.done,
                            onchange: () => toggleTodo(todo.id)
                          }),
                          Span(
                            {
                              class: `text-base flex-1 truncate ${todo.done
                                  ? 'line-through text-secondary'
                                  : 'text-primary-900'
                                }`
                            },
                            todo.text
                          )
                        ),
                        Button(
                          {
                            class: "btn btn-outline btn-sm hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-colors flex-shrink-0 ml-2",
                            onclick: () => deleteTodo(todo.id)
                          },
                          "Delete"
                        )
                      )
                    )
                  )
                ),
              )
            ),

            // Timer Demo
            activeDemo === 'timer' && Div(
              { class: "text-center py-8 flex-1 flex flex-col justify-center" },
              Div(
                {
                  class: `demo-timer-display text-6xl md:text-7xl lg:text-8xl font-mono font-bold mb-8 transition-all duration-300 ${isRunning ? 'text-secondary-600 animate-pulse' : 'text-secondary-600'
                    }`
                },
                formatTime(timer)
              ),
              Div(
                { class: "flex flex-wrap gap-4 justify-center" },
                Button(
                  {
                    class: `demo-btn-interactive btn btn-lg px-6 md:px-8 py-3 font-semibold transition-all ${isRunning
                        ? 'btn-secondary opacity-50 cursor-not-allowed'
                        : 'btn-gradient'
                      }`,
                    onclick: startTimer,
                    disabled: isRunning
                  },
                  "▶ Start"
                ),
                Button(
                  {
                    class: `demo-btn-interactive btn btn-lg px-6 md:px-8 py-3 font-semibold transition-all ${!isRunning
                        ? 'btn-secondary opacity-50 cursor-not-allowed'
                        : 'btn-secondary'
                      }`,
                    onclick: stopTimer,
                    disabled: !isRunning
                  },
                  "⏸ Stop"
                ),
                Button(
                  {
                    class: "demo-btn-interactive btn btn-outline btn-lg px-6 md:px-8 py-3 font-semibold transition-all",
                    onclick: resetTimer
                  },
                  "↻ Reset"
                )
              )
            ),

            // Form Demo
            activeDemo === 'form' && Div(
              { class: "py-4 flex-1 flex flex-col" },
              Div(
                { class: "demo-grid-2 flex-1" },
                Div(
                  { class: "space-y-5 flex flex-col" },
                  Div(
                    { class: "demo-form-group form-group" },
                    Label({ class: "form-label text-base font-semibold mb-2 block text-primary-900" }, "Name"),
                    Input({
                      class: "form-input w-full",
                      type: "text",
                      value: formData.name,
                      onchange: (e) => updateFormData('name', e.target.value),
                      placeholder: "Enter your name"
                    })
                  ),
                  Div(
                    { class: "demo-form-group form-group" },
                    Label({ class: "form-label text-base font-semibold mb-2 block text-primary-900" }, "Email"),
                    Input({
                      class: "form-input w-full",
                      type: "email",
                      value: formData.email,
                      onchange: (e) => updateFormData('email', e.target.value),
                      placeholder: "Enter your email"
                    })
                  ),
                  Div(
                    { class: "demo-form-group form-group" },
                    Label({ class: "form-label text-base font-semibold mb-2 block text-primary-900" }, "Message"),
                    Input({
                      class: "form-input w-full",
                      type: "text",
                      value: formData.message,
                      onchange: (e) => updateFormData('message', e.target.value),
                      placeholder: "Enter your message"
                    })
                  ),
                  Button(
                    {
                      class: "demo-btn-interactive btn btn-gradient w-full py-3 font-semibold text-lg transition-all mt-auto",
                      onclick: submitForm
                    },
                    "Submit Form"
                  )
                ),
                Div(
                  { class: "demo-form-preview card p-6 flex flex-col h-full" },
                  H3(
                    { class: "text-lg font-bold mb-4 text-primary-900" },
                    "Form Data Preview:"
                  ),
                  Div(
                    { class: "space-y-3 flex-1" },
                    Div(
                      { class: "p-4 bg-white rounded-lg border border-secondary-100 shadow-sm" },
                      Span({ class: "text-sm font-semibold text-secondary block mb-1" }, "Name"),
                      Span({ class: "text-base font-medium text-primary-900" }, formData.name || 'Not set')
                    ),
                    Div(
                      { class: "p-4 bg-white rounded-lg border border-secondary-100 shadow-sm" },
                      Span({ class: "text-sm font-semibold text-secondary block mb-1" }, "Email"),
                      Span({ class: "text-base font-medium text-primary-900 break-all" }, formData.email || 'Not set')
                    ),
                    Div(
                      { class: "p-4 bg-white rounded-lg border border-secondary-100 shadow-sm" },
                      Span({ class: "text-sm font-semibold text-secondary block mb-1" }, "Message"),
                      Span({ class: "text-base font-medium text-primary-900 break-words" }, formData.message || 'Not set')
                    )
                  )
                )
              )
            )
          )
        ),

        // Code Section - Takes 1 column on large screens
        Div(
          { class: "demo-col-span-1" },
          Div(
            { class: "card p-6 md:p-8 demo-code-sidebar h-full" },
            Div(
              { class: "flex items-center gap-3 mb-4 pb-4 border-b border-neutral-200" },
              Span({ class: "text-2xl" }, "💻"),
              H3(
                { class: "text-xl md:text-2xl font-bold text-primary-900" },
                "Source Code"
              )
            ),
            P(
              { class: "text-secondary mb-6 leading-relaxed text-sm md:text-base" },
              "View the complete implementation for this demo. Click below to see the full code in a modal."
            ),
            Button(
              {
                class: "demo-btn-interactive btn btn-gradient w-full py-3 font-semibold transition-all duration-300",
                onclick: () => setIsModalOpen(true)
              },
              "📋 View Full Code"
            ),
            Div(
              { class: "mt-6 pt-6 border-t border-neutral-200" },
              Div(
                { class: "text-sm text-secondary space-y-2" },
                P({ class: "font-semibold text-primary-900 mb-3 text-base" }, "Key Features:"),
                P({ class: "flex items-center gap-2" }, "✓", Span({}, "Live interactive demo")),
                P({ class: "flex items-center gap-2" }, "✓", Span({}, "Real-time state updates")),
                P({ class: "flex items-center gap-2" }, "✓", Span({}, "Clean, readable code")),
                P({ class: "flex items-center gap-2" }, "✓", Span({}, "No build steps required"))
              )
            )
          )
        )
      )
    )
  ),

    // Features Section
    Section(
      { class: "section bg-white" },
      Div(
        { class: "container" },
        Div(
          { class: "text-center mb-12 md:mb-16" },
          Span(
            { class: "inline-block px-4 py-2 mb-4 text-sm font-semibold text-primary-700 bg-primary-100 rounded-full uppercase tracking-wider" },
            "Capabilities"
          ),
          H2(
            { class: "text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-primary-900" },
            "What You Can Build"
          ),
          P(
            { class: "text-base md:text-lg lg:text-xl text-secondary max-w-3xl mx-auto leading-relaxed" },
            "These demos showcase the core capabilities of BABLOJS — from simple state management to complex interactive applications."
          )
        ),
        Div(
          { class: "demo-grid-4", style: "gap: 2rem;" },
          Div(
            { class: "card p-6 md:p-8 text-center transition-all duration-300 transform hover:-translate-y-2 border border-neutral-200" },
            Div(
              { class: "text-5xl md:text-6xl mb-4" },
              "🎯"
            ),
            H3(
              { class: "text-xl md:text-2xl font-bold mb-4 text-primary-900" },
              "State Management"
            ),
            P(
              { class: "text-sm md:text-base text-secondary leading-relaxed" },
              "Use useState and useEffect hooks to manage component state and side effects efficiently."
            )
          ),
          Div(
            { class: "card p-6 md:p-8 text-center transition-all duration-300 transform hover:-translate-y-2 border border-neutral-200" },
            Div(
              { class: "text-4xl md:text-5xl lg:text-6xl mb-4" },
              "🧩"
            ),
            H3(
              { class: "text-xl md:text-2xl font-bold mb-3 md:mb-4 text-primary-900" },
              "Component Architecture"
            ),
            P(
              { class: "text-sm md:text-base text-secondary leading-relaxed" },
              "Build reusable components with props and composition patterns for scalable applications."
            )
          ),
          Div(
            { class: "card p-6 md:p-8 text-center transition-all duration-300 transform hover:-translate-y-2 border border-neutral-200" },
            Div(
              { class: "text-4xl md:text-5xl lg:text-6xl mb-4" },
              "⚡"
            ),
            H3(
              { class: "text-xl md:text-2xl font-bold mb-3 md:mb-4 text-primary-900" },
              "Performance"
            ),
            P(
              { class: "text-sm md:text-base text-secondary leading-relaxed" },
              "Optimized rendering and minimal overhead for lightning-fast user experiences."
            )
          ),
          Div(
            { class: "card p-6 md:p-8 text-center transition-all duration-300 transform hover:-translate-y-2 border border-neutral-200" },
            Div(
              { class: "text-4xl md:text-5xl lg:text-6xl mb-4" },
              "🔧"
            ),
            H3(
              { class: "text-xl md:text-2xl font-bold mb-3 md:mb-4 text-primary-900" },
              "Developer Experience"
            ),
            P(
              { class: "text-sm md:text-base text-secondary leading-relaxed" },
              "Familiar patterns and excellent support for productive, enjoyable development."
            )
          )
        )
      )
    ),

    // CTA Section
    Section(
      { class: "section bg-gradient-to-br from-primary-50 via-purple-50 to-pink-50" },
      Div(
        { class: "container" },
        Div(
          { class: "max-w-3xl mx-auto text-center py-8 md:py-12 lg:py-16" },
          H2(
            { class: "text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-primary-900" },
            "Ready to Build Your Own?"
          ),
          P(
            { class: "text-base md:text-lg lg:text-xl text-secondary mb-6 md:mb-8 leading-relaxed" },
            "Start building amazing applications with BABLOJS today. No build steps, no complexity — just pure JavaScript power."
          ),
          Div(
            { class: "demo-flex-responsive" },
            A(
              {
                href: requests.url("/docs"),
                class: "btn btn-gradient btn-lg px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:-translate-y-1"
              },
              "🚀 Get Started"
            ),
            A(
              {
                href: requests.url("/contact"),
                class: "btn btn-outline btn-lg px-8 py-4 text-lg font-semibold border-2 hover:bg-white transition-all duration-300"
              },
              "💬 Get Support"
            )
          )
        )
      )
    ),

    // Expressive patterns without build steps
    Section(
      { class: "section bg-white" },
      Div(
        { class: "container" },
        Div(
          { class: "text-center mb-12 md:mb-16" },
          Span(
            { class: "inline-block px-4 py-2 mb-4 text-sm font-semibold text-primary-700 bg-primary-100 rounded-full uppercase tracking-wider" },
            "Syntax Highlights"
          ),
          H2(
            { class: "text-3xl md:text-4xl lg:text-5xl font-bold mb-6" },
            "Expressive patterns without build steps"
          ),
          P(
            { class: "text-lg md:text-xl text-secondary max-w-3xl mx-auto" },
            "BABLOJS leans on native JS so you can ship anywhere — browser, Electron, or embedded. No transpilation, no bundling, just pure JavaScript."
          )
        ),
        Div(
          { class: "demo-grid-2", style: "gap: 2rem;" },
          ...syntaxExamples.map(example =>
            Div(
              { class: "card p-6 md:p-8 space-y-4 transition-all duration-300 border border-neutral-200" },
              Div(
                {},
                H3({ class: "text-xl md:text-2xl font-bold mb-2 text-primary-900" }, example.title),
                P({ class: "text-secondary leading-relaxed" }, example.description)
              ),
              Pre(
                { class: "bg-neutral-900 text-neutral-100 p-4 md:p-6 rounded-lg overflow-x-auto border border-neutral-700" },
                Code({ class: "text-xs md:text-sm font-mono" }, example.code)
              ),
              example.preview && Div(
                { class: "bg-gradient-to-br from-neutral-50 to-primary-50 p-4 md:p-6 rounded-lg border border-neutral-200" },
                example.preview
              )
            )
          )
        )
      )
    ),

    // Code Modal
    CodeModal({
      isOpen: isModalOpen,
      onClose: () => setIsModalOpen(false),
      title: `${activeDemoData?.title || "Demo"} - Source Code`,
      subtitle: activeDemoData?.description || "",
      code: getCurrentCode(),
      language: "javascript"
    })
  );
}

export default Demo;
