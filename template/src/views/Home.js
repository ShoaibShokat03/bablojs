import { babloApp } from "../modules/BabloApp.js";
import { useState } from "../modules/hooks.js";
import { Button, Div, H1, H2, P, Section, Span, Footer, A } from "../modules/html.js";
import { requests } from "../modules/requests.js";

function Home() {
  const [count, setCount] = useState(0);

  return Div({ class: "home-starter-page" },
    // Hero Section
    Section({ class: "section-hero" },
      Div({ class: "container" },
        Div({ class: "hero-content" },
          Div({ class: "hero-content-main" },
            H1({ class: "hero-headline" },
              "Build Modern SPAs with ",
              Span({ class: "heading-gradient-purple-pink" }, babloApp.app.name)
            ),
            P({ class: "hero-description" }, babloApp.app.description),
            Div({ class: "home-badge" },
              Div({ class: "badge" }, `v${babloApp.app.version}`)
            )
          )
        )
      )
    ),

    // Counter Demo Section
    Section({ class: "section" },
      Div({ class: "container" },
        Div({ class: "home-counter-section" },
          H2({ class: "home-counter-title" }, "Interactive Counter"),
          P({ class: "home-counter-subtitle" }, "Experience the power of reactive state management"),
          Div({ class: "home-counter-display-wrapper" },
            Div({ class: "home-counter-display" }, count)
          ),
          Div({ class: "home-counter-controls" },
            Button({
              class: "home-counter-btn home-counter-btn-decrement",
              onclick: () => setCount(count > 0 ? count - 1 : 0)
            }, "Decrease"),
            Button({
              class: "home-counter-btn home-counter-btn-reset",
              onclick: () => setCount(0)
            }, "Reset"),
            Button({
              class: "home-counter-btn home-counter-btn-increment",
              onclick: () => setCount(count + 1)
            }, "Increase")
          )
        )
      )
    ),

    // Footer Section
    Footer({ class: "footer" },
      Div({ class: "container" },
        Div({ class: "footer-content" },
          Div({ class: "footer-section" },
            Div({ class: "footer-section-title" }, "Resources"),
            A({
              href: requests.url("/bablo-http"),
              class: "footer-link"
            }, "BabloHttp Demo"),
            A({
              href: "https://bablojs.com/docs",
              class: "footer-link",
              target: "_blank",
              rel: "noopener noreferrer"
            }, "Documentation"),
            A({
              href: "https://bablojs.com",
              class: "footer-link",
              target: "_blank",
              rel: "noopener noreferrer"
            }, "Visit bablojs.com")
          )
        ),
        Div({ class: "footer-bottom" },
          P({ class: "copyright" },
            "© " + new Date().getFullYear() + " " + babloApp.app.name + ". Made with ",
            Span({}, "❤️"),
            " by developers, for developers."
          )
        )
      )
    )
  );
}
export default Home;