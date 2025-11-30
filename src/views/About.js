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
  I,
  Section,
  Img,
  Ul,
  Li,
  Style,
} from "../_modules/html.js";
import { useState, useEffect } from "../_modules/hooks.js";
import { requests } from "../_modules/requests.js";
import MainLayout from "./components/MainLayout.js";

function About() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTimeline, setActiveTimeline] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return MainLayout(
    Style(
      {},
      `
      .about-grid-2 {
        display: grid;
        grid-template-columns: 1fr;
        gap: 2rem;
      }
      .about-grid-3 {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }
      @media (min-width: 768px) {
        .about-grid-2 {
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
        }
        .about-grid-3 {
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }
      }
      @media (min-width: 640px) {
        .about-flex-responsive {
          flex-direction: row !important;
        }
      }
      @media (min-width: 1024px) {
        .about-grid-2 {
          gap: 3rem;
        }
        .about-grid-3 {
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }
      }
      `
    ),
    // Hero Section
    Section(
      { class: "section" },
      Div(
        { class: "container" },
        Div(
          { class: "section-header" },
          H1(
            { class: "text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6" },
            "About ",
            Span({ class: "heading-gradient-purple-pink" }, "BABLOJS")
          ),
          P(
            { class: "text-base md:text-lg lg:text-xl text-secondary max-w-3xl mx-auto leading-relaxed" },
            "BABLOJS is more than just a framework - it's a philosophy of keeping web development simple, fast, and enjoyable."
          )
        )
      )
    ),

    // Mission Section
    Section(
      { class: "section bg-neutral-50" },
      Div(
        { class: "container" },
        Div(
          { class: "about-grid-2", style: "align-items: center;" },
          
          // Mission Content
          Div(
            {},
            H2(
              { class: "text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6" },
              "Our Mission"
            ),
            P(
              { class: "text-base md:text-lg text-secondary mb-4 md:mb-6 leading-relaxed" },
              "We believe that modern web development shouldn't require complex build tools, heavy frameworks, or endless configuration. BABLOJS brings the power of modern JavaScript frameworks to vanilla JavaScript."
            ),
            P(
              { class: "text-sm md:text-base text-secondary mb-6 md:mb-8 leading-relaxed" },
              "Our goal is to make web development accessible, fast, and enjoyable for developers of all skill levels while maintaining the simplicity and performance of vanilla JavaScript."
            ),
            Div(
              { class: "flex about-flex-responsive", style: "flex-direction: column; gap: 1rem;" },
              A(
                { href: requests.url("/docs"), class: "btn btn-gradient btn-lg" },
                "Get Started"
              ),
              A(
                { href: requests.url("/docs"), class: "btn btn-outline btn-lg" },
                "View Documentation"
              )
            )
          ),

          // Mission Visual
          Div(
            { class: "text-center" },
            Div(
              { class: "text-6xl md:text-7xl lg:text-8xl mb-4 md:mb-6" },
              "🚀"
            ),
            H3(
              { class: "text-xl md:text-2xl font-bold mb-3 md:mb-4 text-primary-900" },
              "Simple. Fast. Powerful."
            ),
            P(
              { class: "text-sm md:text-base text-secondary leading-relaxed" },
              "Everything you need to build modern web applications without the complexity."
            )
          )
        )
      )
    ),

    // Journey Section
    Section(
      { class: "section" },
      Div(
        { class: "container" },
        Div(
          { class: "section-header" },
          H2(
            { class: "text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6" },
            "Our Journey"
          ),
          P(
            { class: "text-base md:text-lg lg:text-xl text-secondary max-w-2xl mx-auto leading-relaxed" },
            "The story behind BABLOJS - a labor of love, learning, and innovation."
          )
        ),

        // Journey Content - Full Width
        Div(
          { class: "max-w-5xl mx-auto" },
          Div(
            { class: "journey-content" },
            P(
              { class: "text-base md:text-lg lg:text-xl text-secondary leading-relaxed mb-6" },
              "My name is ",
              Span({ class: "font-semibold text-primary-900" }, "Muhammad Shoaib"),
              ", and I'm a full-stack web application developer with 4 years of experience. Throughout my career, I've worked on numerous projects and continuously pushed myself to learn and grow as a developer."
            ),
            P(
              { class: "text-base md:text-lg lg:text-xl text-secondary leading-relaxed mb-6" },
              "BABLOJS began as a passion project in ",
              Span({ class: "font-semibold text-primary-900" }, "2023"),
              ". At the time, I was learning React, but I found it challenging and somewhat overwhelming. Don't get me wrong - React is an excellent framework, but I felt there had to be a simpler way to achieve similar results without all the complexity."
            ),
            P(
              { class: "text-base md:text-lg lg:text-xl text-secondary leading-relaxed mb-6" },
              "That's when I decided to start working on this project. During development, I changed the name several times, but I ultimately chose ",
              Span({ class: "font-semibold heading-gradient-purple-pink" }, "BABLOJS"),
              " because I call my son ",
              Span({ class: "font-semibold text-primary-900" }, "BABLO"),
              ". This name is different and unique, and it gives the framework a personal touch that makes it special to me."
            ),
            P(
              { class: "text-base md:text-lg lg:text-xl text-secondary leading-relaxed mb-6" },
              "It took me ",
              Span({ class: "font-semibold text-primary-900" }, "2 years"),
              " to develop BABLOJS. The coding itself wasn't extremely difficult, but finding the time to dedicate to it was the real challenge. I used my spare time to work on it, gradually building and refining the framework."
            ),
            P(
              { class: "text-base md:text-lg lg:text-xl text-secondary leading-relaxed mb-8" },
              "I've always loved JavaScript, and I'm quite proficient in it. To improve my code, I utilized various AI tools, including ChatGPT, which helped me enhance the framework significantly. While React relies on Node.js and npm modules, I wanted BABLOJS to be completely ",
              Span({ class: "font-semibold text-primary-900" }, "dependency-free"),
              " - giving developers a truly reactive experience without requiring Node.js or any build tools."
            ),
            P(
              { class: "text-base md:text-lg lg:text-xl text-secondary leading-relaxed mb-8" },
              "As I learned React, I identified certain issues and areas for improvement. I incorporated these insights into BABLOJS, focusing on ",
              Span({ class: "font-semibold text-primary-900" }, "simplicity and ease of use"),
              ". The result is a framework that provides React-like features - hooks, components, and a Virtual DOM - but with the simplicity and performance of vanilla JavaScript."
            ),

            // No Build Highlight Section
            Div(
              { class: "journey-highlight" },
              Div(
                { class: "journey-highlight-content" },
                H3(
                  { class: "text-2xl md:text-3xl font-bold mb-4 heading-gradient-purple-pink" },
                  I({ class: "fa-solid fa-rocket", style: "margin-right: 0.5rem;" }),
                  "No Build Required - Deploy & Fix Instantly"
                ),
                P(
                  { class: "text-base md:text-lg text-secondary leading-relaxed mb-4" },
                  "One of the most powerful advantages of BABLOJS is that ",
                  Span({ class: "font-semibold text-primary-900" }, "no build process is required"),
                  " when you want to deploy your application. Unlike traditional frameworks that require compilation, bundling, and build steps, BABLOJS works directly with your source code."
                ),
                P(
                  { class: "text-base md:text-lg text-secondary leading-relaxed mb-4" },
                  "But here's the real game-changer: ",
                  Span({ class: "font-semibold text-primary-900" }, "when your application is already deployed and you need to fix an issue, you don't need to rebuild anything"),
                  ". Simply fix the code directly on the server, and it works immediately. No waiting for build processes, no redeployment of compiled files - just edit, save, and your changes are live."
                ),
                P(
                  { class: "text-base md:text-lg text-secondary leading-relaxed" },
                  "This means you can use the same code you wrote during development in production. Fix bugs, add features, or make improvements ",
                  Span({ class: "font-semibold text-primary-900" }, "on the fly without ever needing to rebuild"),
                  ". This workflow makes development faster, debugging easier, and deployment simpler than ever before."
                )
              )
            )
          )
        )
      )
    ),

    // Values Section
    Section(
      { class: "section bg-neutral-50" },
      Div(
        { class: "container" },
        Div(
          { class: "section-header" },
          H2(
            { class: "text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6" },
            "Our Values"
          ),
          P(
            { class: "text-base md:text-lg lg:text-xl text-secondary max-w-2xl mx-auto leading-relaxed" },
            "The principles that guide everything we do at BABLOJS."
          )
        ),

        Div(
          { class: "about-grid-3" },
          
          // Simplicity
          Div(
            { class: "card p-6 md:p-8 text-center transition-all duration-300 hover:-translate-y-1" },
            Div(
              { class: "text-4xl md:text-5xl mb-4" },
              "🎯"
            ),
            H3(
              { class: "text-xl md:text-2xl font-bold mb-3 md:mb-4 text-primary-900" },
              "Simplicity"
            ),
            P(
              { class: "text-sm md:text-base text-secondary leading-relaxed" },
              "We believe in keeping things simple. No unnecessary complexity, no over-engineering - just clean, readable code that works."
            )
          ),

          // Performance
          Div(
            { class: "card p-6 md:p-8 text-center transition-all duration-300 hover:-translate-y-1" },
            Div(
              { class: "text-4xl md:text-5xl mb-4" },
              "⚡"
            ),
            H3(
              { class: "text-xl md:text-2xl font-bold mb-3 md:mb-4 text-primary-900" },
              "Performance"
            ),
            P(
              { class: "text-sm md:text-base text-secondary leading-relaxed" },
              "Built for speed. Every feature is optimized for performance, ensuring your applications are fast and responsive."
            )
          ),

          // Community
          Div(
            { class: "card p-6 md:p-8 text-center transition-all duration-300 hover:-translate-y-1" },
            Div(
              { class: "text-4xl md:text-5xl mb-4" },
              "🤝"
            ),
            H3(
              { class: "text-xl md:text-2xl font-bold mb-3 md:mb-4 text-primary-900" },
              "Community"
            ),
            P(
              { class: "text-sm md:text-base text-secondary leading-relaxed" },
              "We're building this together. Your feedback, contributions, and ideas help shape the future of BABLOJS."
            )
          )
        )
      )
    ),

    // Team Section
    Section(
      { class: "section" },
      Div(
        { class: "container" },
        Div(
          { class: "section-header" },
          H2(
            { class: "text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6" },
            "Meet the Team"
          ),
          P(
            { class: "text-base md:text-lg lg:text-xl text-secondary max-w-2xl mx-auto leading-relaxed" },
            "The passionate developers behind BABLOJS."
          )
        ),

        Div(
          { class: "about-grid-2", style: "max-width: 56rem; margin: 0 auto;" },
          
          // Team Member 1
          Div(
            { class: "card p-6 md:p-8 text-center transition-all duration-300 hover:-translate-y-1" },
            Div(
              { class: "w-20 h-20 md:w-24 md:h-24 bg-gradient-purple-pink rounded-full mx-auto mb-4 md:mb-6 flex items-center justify-center" },
              Span({ class: "text-2xl md:text-3xl font-bold text-white" }, "SS")
            ),
            H3(
              { class: "text-lg md:text-xl font-bold mb-2 text-primary-900" },
              "Muhammad Shoaib"
            ),
            P(
              { class: "text-sm md:text-base text-secondary-600 font-medium mb-3" },
              "Founder & Lead Developer"
            ),
            P(
              { class: "text-xs md:text-sm text-secondary leading-relaxed" },
              "Full-stack web application developer with 4 years of experience. Creator of BABLOJS, passionate about JavaScript and building tools that simplify web development."
            )
          ),

          // Team Member 2
          Div(
            { class: "card p-6 md:p-8 text-center transition-all duration-300 hover:-translate-y-1" },
            Div(
              { class: "w-20 h-20 md:w-24 md:h-24 bg-gradient-purple-pink rounded-full mx-auto mb-4 md:mb-6 flex items-center justify-center" },
              Span({ class: "text-2xl md:text-3xl font-bold text-white" }, "AI")
            ),
            H3(
              { class: "text-lg md:text-xl font-bold mb-2 text-primary-900" },
              "AI Assistant"
            ),
            P(
              { class: "text-sm md:text-base text-secondary-600 font-medium mb-3" },
              "Development Partner"
            ),
            P(
              { class: "text-xs md:text-sm text-secondary leading-relaxed" },
              "Helping with code implementation, documentation, and bringing innovative ideas to life."
            )
          )
        )
      )
    )
  );
}

export default About;
