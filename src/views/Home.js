import {
  Div,
  H1,
  H2,
  H3,
  P,
  Button,
  Span,
  A,
  Section,
  Code,
  Pre,
  Style,
  I,
} from "../_modules/html.js";
import { useState, useEffect } from "../_modules/hooks.js";
import { requests } from "../_modules/requests.js";
import MainLayout from "./components/MainLayout.js";
import CodeModal from "./components/CodeModal.js";
import Config from "../app/config/config.js";
import { heroStats } from "../constants/stats.js";

function Home() {

  const [count, setCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const incrementCounter = () => setCount(count + 1);
  const decrementCounter = () => setCount(count > 1 ? count - 1 : 0);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const counterCode = `import { useState } from "../modules/hooks.js";
import { Div, Button } from "../modules/html.js";

function Counter() {
  const [count, setCount] = useState(0);

  const incrementCounter = () => setCount(count + 1);
  const decrementCounter = () => setCount(count > 1 ? count - 1 : 0);

  return Div(
    { class: "counter-container flex flex-col items-center gap-4 p-6" },
    Div(
      { class: "counter-display text-4xl font-bold text-secondary-600" },
      count
    ),
    Div(
      { class: "counter-controls flex gap-4" },
      Button(
        {
          class: "btn btn-outline btn-lg",
          onclick: decrementCounter,
        },
        "−"
      ),
      Button(
        {
          class: "btn btn-gradient btn-lg",
          onclick: incrementCounter,
        },
        "+"
      )
    )
  );
}

// Usage in a component
function HomePage() {
  return Div(
    { class: "page-container" },
    H1({}, "My Counter App"),
    Counter()
  );
}`;

  const heroMetrics = [
    {
      value: heroStats.BUNDLE_SIZE,
      label: "Core bundle size",
      icon: "fa-solid fa-weight-hanging"
    },
    {
      value: heroStats.BUILD_TOOLING_NEEDED,
      label: "Build tooling needed",
      icon: "fa-solid fa-toolbox"
    },
    {
      value: heroStats.PROJECTS_POWERED,
      label: "Projects powered",
      icon: "fa-solid fa-rocket"
    }
  ];

  const featureHighlights = [
    {
      icon: "fa-solid fa-bolt",
      title: "Lightning Fast",
      description: "Optimized reconciler, micro-hooks, and zero-runtime styling keep apps snappy."
    },
    {
      icon: "fa-solid fa-bullseye",
      title: "Simple API",
      description: "Write declarative components with familiar hooks using plain JavaScript."
    },
    {
      icon: "fa-solid fa-puzzle-piece",
      title: "Composable",
      description: "Mix and match modules, router, and helpers to fit any architecture."
    }
  ];

  return MainLayout(
    // Hero Section with Gradient Mesh Background
    Section(
      {
        class: "section-hero"
      },
      Div(
        {
          class: "container"
        },
        Div(
          {
            class: "hero-content"
          },
          // Main Content Section
          Div(
            {
              class: "hero-content-main",
              style: "gap:10px;"
            },
            // Main Headline with Gradient Text
            H1(
              {
                class: "hero-headline"
              },
              "Build Modern SPAs with ",
              Span(
                {
                  class: "heading-gradient-purple-pink",
                  style: "font-size: 6rem;"
                },
                "BABLOJS"
              )
            ),
            // Description
            P(
              {
                class: "hero-description"
              },
              "Hooks, components, router, and state management — all in a 2KB package that feels familiar but ships lightning fast experiences."
            ),
            // Buttons Container
            Div(
              {
                class: "hero-actions"
              },
              // Primary Button - Get Started
              A(
                {
                  href: requests.url("/docs"),
                  class: "btn btn-gradient btn-lg",
                  style: "display: inline-flex; align-items: center; gap: 0.5rem;"
                },
                I({ class: "fa-solid fa-rocket" }),
                "Get Started"
              ),
              // Secondary Button - Explore Demos
              A(
                {
                  href: requests.url("/demo"),
                  class: "btn btn-outline btn-lg",
                  style: "display: inline-flex; align-items: center; gap: 0.5rem;"
                },
                I({ class: "fa-solid fa-play-circle" }),
                "Explore Demos"
              )
            )
          ),
          // Metrics Section - Better aligned
          Div(
            {
              class: "hero-metrics"
            },
            ...heroMetrics.map((metric, index) =>
              Div(
                {
                  class: "metric-card"
                },
                // Icon on the left
                Div(
                  {
                    class: "metric-icon-container"
                  },
                  Div(
                    {
                      class: "metric-icon-wrapper"
                    },
                    I(
                      {
                        class: metric.icon,
                        style: "font-size: 1.5rem; color: var(--color-secondary-600);"
                      }
                    )
                  )
                ),
                // Metrics data on the right
                Div(
                  {
                    class: "metric-data"
                  },
                  Div(
                    {
                      class: "metric-value heading-gradient-purple-pink"
                    },
                    metric.value
                  ),
                  P(
                    {
                      class: "metric-label"
                    },
                    metric.label
                  )
                )
              )
            )
          )
        )
      ),
      // Enhanced Hero Section Styles
      Style(
        {},
        `.hero-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: var(--space-16) 0 var(--space-20) 0;
          max-width: 100%;
          gap: var(--space-12);
        }
        
        .hero-content-main {
          text-align: center;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-6);
        }
        
        .hero-headline {
          margin-bottom: var(--space-4);
        }
        
        .hero-description {
          margin-bottom: var(--space-2);
          max-width: 700px;
        }
        
        .hero-actions {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          gap: var(--space-4);
          margin-top: var(--space-4);
          width: 100%;
        }
        
        .hero-metrics {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: var(--space-6);
          padding: 0 var(--space-4);
          align-items: stretch;
        }
        
        .metric-card {
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          gap: var(--space-4);
          padding: var(--space-6);
          border-radius: var(--radius-lg);
          background-color: var(--color-white);
          border: 1px solid var(--color-border-primary);
          transition: all 0.3s ease;
          min-height: 120px;
        }
        
        .metric-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          border-color: var(--color-secondary-300);
        }
        
        /* Icon Container - Left Side */
        .metric-icon-container {
          flex-shrink: 0;
          display: flex;
          align-items: flex-start;
        }
        
        .metric-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 3.5rem;
          height: 3.5rem;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%);
          border-radius: var(--radius-lg);
          flex-shrink: 0;
        }
        
        /* Metrics Data - Right Side */
        .metric-data {
          display: flex;
          flex-direction: column;
          flex: 1;
          min-width: 0;
        }
        
        .metric-value {
          font-size: var(--text-2xl);
          font-weight: var(--font-bold);
          line-height: 1.2;
          margin-bottom: var(--space-2);
          text-align: left;
        }
        
        .metric-label {
          font-size: var(--text-xs);
          color: var(--color-text-secondary);
          text-transform: uppercase;
          letter-spacing: var(--tracking-wide);
          font-weight: var(--font-semibold);
          margin: 0;
          text-align: left;
          line-height: 1.4;
        }
        
        @media (min-width: 768px) {
          .hero-content {
            padding: var(--space-20) 0 var(--space-24) 0;
            gap: var(--space-16);
          }
          
          .hero-content-main {
            gap: var(--space-8);
          }
          
          .hero-headline {
            margin-bottom: var(--space-6);
          }
          
          .hero-description {
            margin-bottom: var(--space-4);
            font-size: var(--text-xl);
          }
          
          .hero-actions {
            margin-top: var(--space-6);
          }
          
          .metric-card {
            padding: var(--space-6) var(--space-5);
            min-height: 140px;
          }
          
          .metric-icon-wrapper {
            width: 4rem;
            height: 4rem;
          }
          
          .metric-value {
            font-size: var(--text-3xl);
          }
          
          .metric-label {
            font-size: var(--text-sm);
          }
          
          .hero-metrics {
            grid-template-columns: repeat(3, 1fr);
            gap: var(--space-8);
          }
        }
        
        @media (min-width: 1024px) {
          .hero-metrics {
            max-width: 1000px;
          }
          
          .metric-card {
            padding: var(--space-8) var(--space-6);
            min-height: 160px;
            gap: var(--space-5);
          }
          
          .metric-icon-wrapper {
            width: 4.5rem;
            height: 4.5rem;
          }
          
          .metric-value {
            font-size: var(--text-4xl);
          }
        }
        
        @media (max-width: 767px) {
          .hero-content {
            padding: var(--space-12) 0 var(--space-16) 0;
            gap: var(--space-10);
          }
          
          .hero-content-main {
            gap: var(--space-5);
          }
          
          .hero-actions {
            flex-direction: column;
            width: 100%;
            max-width: 400px;
          }
          
          .hero-actions .btn {
            width: 100%;
            justify-content: center;
          }
          
          .hero-metrics {
            grid-template-columns: 1fr;
            gap: var(--space-4);
            padding: 0 var(--space-4);
          }
          
          .metric-card {
            min-height: 160px;
            padding: var(--space-6) var(--space-5);
          }
        }`
      )
    ),
    // Custom CSS for responsive design
    Style(
      {},
      `.feature-card-row {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: var(--space-6);
        }
        .feature-card-row > * {
          flex: 0 1 calc(33.333% - var(--space-6));
          min-width: 280px;
          max-width: 380px;
        }
        @media (max-width: 1024px) {
          .feature-card-row > * {
            flex: 0 1 calc(50% - var(--space-6));
            min-width: 250px;
          }
        }
        @media (max-width: 640px) {
          .feature-card-row > * {
            flex: 0 1 100%;
            min-width: 100%;
            max-width: 100%;
          }
        }`
    ),


    Section(
      { class: "section bg-neutral-50" },
      Div(
        { class: "container" },
        Div(
          { class: "section-header" },
          Span(
            {
              class: "section-badge"
            },
            "Why Choose BABLOJS"
          ),
          H2(
            { class: "text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6" },
            "Ship delightful products without heavy frameworks"
          ),
          P(
            { class: "text-base md:text-lg lg:text-xl text-secondary max-w-3xl mx-auto leading-relaxed" },
            "Design micro-interactions, manage state, and orchestrate routing — all with ergonomic primitives that stay out of your way."
          )
        ),
        Div(
          {
            class: "feature-card-row"
          },
          ...featureHighlights.map(item =>
            Div(
              {
                class: "card p-6 md:p-8 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
                style: "display: flex; flex-direction: column;"
              },
              Div(
                {
                  class: "mb-4",
                  style: "display: inline-flex; align-items: center; justify-content: center; width: 3.5rem; height: 3.5rem; background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%); border-radius: 0.75rem;"
                },
                I(
                  {
                    class: item.icon,
                    style: "font-size: 1.75rem; background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;"
                  }
                )
              ),
              H3(
                {
                  class: "text-xl md:text-2xl font-bold mb-3 text-primary-900"
                },
                item.title
              ),
              P(
                {
                  class: "text-sm md:text-base text-secondary leading-relaxed",
                  style: "flex-grow: 1;"
                },
                item.description
              )
            )
          )
        )
      )
    ),

    // Hero Counter Section
    Section(
      { class: "section bg-white" },
      Div(
        { class: "container" },
        Div(
          { class: "max-w-6xl mx-auto" },
          Div(
            { class: "section-header" },
            Span(
              {
                class: "section-badge"
              },
              "Interactive Demo"
            ),
            H2(
              { class: "text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6" },
              "Try the Counter",
              Span(
                { class: "heading-gradient-purple-pink block mt-2" },
                "Experience BABLOJS"
              )
            ),
            P(
              { class: "text-base md:text-lg lg:text-xl text-secondary max-w-2xl mx-auto leading-relaxed" },
              "See state management in action with our interactive counter. No build steps, no complexity — just pure JavaScript."
            )
          ),
          Div(
            {
              class: "counter-section-container"
            },
            // Counter Preview - Two Column Layout
            Div(
              {
                class: "counter-preview-layout"
              },
              // Left Side - Explanation
              Div(
                {
                  class: "counter-explanation"
                },
                H3(
                  {
                    class: "text-2xl md:text-3xl font-bold mb-4 text-primary-900"
                  },
                  "How It Works"
                ),
                P(
                  {
                    class: "text-base md:text-lg text-secondary leading-relaxed mb-4"
                  },
                  "This interactive counter demonstrates BABLOJS state management using the `useState` hook. Click the buttons to increment or decrement the counter value."
                ),
                P(
                  {
                    class: "text-sm md:text-base text-secondary leading-relaxed mb-6"
                  },
                  "The state updates instantly without page reloads, showcasing the framework's reactive capabilities. The counter prevents going below zero and tracks the active state."
                )
              ),
              // Right Side - Counter or Code
              Div(
                {
                  class: "counter-preview-card"
                },
                // Toggle in top left
                Div(
                  {
                    class: "counter-toggle-label",
                  },
                  Span(
                    {
                      class: "counter-toggle-active"
                    },
                    I({ class: "fa-solid fa-eye" }),
                    " Preview"
                  ),
                  Span({}, " / "),
                  Span(
                    {
                      onclick: openModal
                    },
                    I({ class: "fa-solid fa-code" }),
                    " Code"
                  )
                ),
                // Counter Preview
                Div(
                  {
                    class: "counter-display-container"
                  },
                  // Main Counter Display
                  Div(
                    {
                      class: "counter-main-display"
                    },
                    count.toString()
                  ),
                  // Buttons Row
                  Div(
                    {
                      class: "counter-buttons-row"
                    },
                    Button(
                      {
                        class: "counter-btn counter-btn-decrement",
                        onclick: decrementCounter,
                        ariaLabel: "Decrement counter"
                      },
                      "−"
                    ),
                    Button(
                      {
                        class: "counter-btn counter-btn-increment",
                        onclick: incrementCounter,
                        ariaLabel: "Increment counter"
                      },
                      "+"
                    )
                  ),
                  // Status Row
                  Div(
                    {
                      class: "counter-status-row"
                    },
                    Div(
                      {
                        class: "counter-status-item"
                      },
                      count > 0 ? I({ class: "fa-solid fa-check-circle counter-status-icon" }) : Span({ class: "counter-status-placeholder" }, "—"),
                      Span({ class: "counter-status-text" }, "Active")
                    ),
                    Div(
                      {
                        class: "counter-status-item"
                      },
                      Span({ class: "counter-status-value" }, count),
                      Span({ class: "counter-status-text" }, "Current Value")
                    )
                  )
                )
              )
            )
          )
        )
      )
    ),

    CodeModal({
      isOpen: isModalOpen,
      onClose: closeModal,
      title: "Counter Component Code",
      subtitle: "Complete implementation example",
      code: counterCode,
      language: "javascript"
    })
  );

}

export default Home;

