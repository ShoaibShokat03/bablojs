import {
  Div,
  H1,
  H2,
  H3,
  P,
  Section,
  Span,
  Style,
  I,
  A,
} from "../_modules/html.js";
import MainLayout from "./components/MainLayout.js";
import PageHero from "./components/PageHero.js";

function Privacy() {
  return MainLayout(
    Style(
      {},
      `
      .privacy-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }
      @media (min-width: 768px) {
        .privacy-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }
      @media (min-width: 1024px) {
        .privacy-grid {
          grid-template-columns: repeat(3, 1fr);
        }
      }
      .privacy-content-section {
        max-width: 900px;
        margin: 0 auto;
      }
      .privacy-list-item {
        display: flex;
        align-items: flex-start;
        gap: 0.75rem;
        margin-bottom: 0.75rem;
      }
      .privacy-list-item::before {
        content: "•";
        color: var(--color-primary-600);
        font-size: 1.5rem;
        line-height: 1;
        margin-top: 0.25rem;
        flex-shrink: 0;
      }
      .privacy-highlight-box {
        background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%);
        border-left: 4px solid var(--color-primary-600);
        padding: var(--space-6);
        border-radius: var(--radius-lg);
        margin: var(--space-6) 0;
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
            "Privacy ",
            Span({ class: "heading-gradient-purple-pink" }, "Policy")
          ),
          P(
            { class: "text-base md:text-lg lg:text-xl text-secondary max-w-3xl mx-auto leading-relaxed" },
            "Last updated: " + new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
          )
        )
      )
    ),

    // Introduction Section
    Section(
      { class: "section bg-neutral-50" },
      Div(
        { class: "container" },
        Div(
          { class: "privacy-content-section" },
          Div(
            { class: "card p-6 md:p-8" },
            H2(
              { class: "text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-primary-900" },
              "1. Introduction"
            ),
            P(
              { class: "text-base md:text-lg text-secondary leading-relaxed mb-6" },
              "BABLOJS (\"we,\" \"our,\" or \"us\") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services."
            )
          )
        )
      )
    ),

    // Information We Collect Section
    Section(
      { class: "section" },
      Div(
        { class: "container" },
        Div(
          { class: "privacy-content-section" },
          Div(
            { class: "card p-6 md:p-8" },
            H2(
              { class: "text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-primary-900" },
              "2. Information We Collect"
            ),
            H3(
              { class: "text-xl md:text-2xl font-bold mb-3 md:mb-4 text-primary-800 mt-6" },
              "2.1 Information You Provide"
            ),
            P(
              { class: "text-base md:text-lg text-secondary leading-relaxed mb-4" },
              "We may collect information that you voluntarily provide to us, including:"
            ),
            Div(
              { class: "privacy-grid", style: "margin: 1.5rem 0;" },
              Div(
                { class: "privacy-list-item" },
                P({ class: "text-base text-secondary leading-relaxed" }, "Name and contact information")
              ),
              Div(
                { class: "privacy-list-item" },
                P({ class: "text-base text-secondary leading-relaxed" }, "Email address")
              ),
              Div(
                { class: "privacy-list-item" },
                P({ class: "text-base text-secondary leading-relaxed" }, "Messages and communications")
              ),
              Div(
                { class: "privacy-list-item" },
                P({ class: "text-base text-secondary leading-relaxed" }, "Feedback and survey responses")
              )
            ),
            H3(
              { class: "text-xl md:text-2xl font-bold mb-3 md:mb-4 text-primary-800 mt-6" },
              "2.2 Automatically Collected Information"
            ),
            P(
              { class: "text-base md:text-lg text-secondary leading-relaxed mb-4" },
              "We may automatically collect certain information about your device and usage patterns, including:"
            ),
            Div(
              { class: "privacy-grid", style: "margin: 1.5rem 0;" },
              Div(
                { class: "privacy-list-item" },
                P({ class: "text-base text-secondary leading-relaxed" }, "IP address")
              ),
              Div(
                { class: "privacy-list-item" },
                P({ class: "text-base text-secondary leading-relaxed" }, "Browser type and version")
              ),
              Div(
                { class: "privacy-list-item" },
                P({ class: "text-base text-secondary leading-relaxed" }, "Pages visited and time spent")
              ),
              Div(
                { class: "privacy-list-item" },
                P({ class: "text-base text-secondary leading-relaxed" }, "Referring website addresses")
              )
            )
          )
        )
      )
    ),

    // How We Use Information Section
    Section(
      { class: "section bg-neutral-50" },
      Div(
        { class: "container" },
        Div(
          { class: "privacy-content-section" },
          Div(
            { class: "card p-6 md:p-8" },
            H2(
              { class: "text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-primary-900" },
              "3. How We Use Your Information"
            ),
            P(
              { class: "text-base md:text-lg text-secondary leading-relaxed mb-4" },
              "We use the information we collect to:"
            ),
            Div(
              { class: "space-y-3", style: "margin-top: 1.5rem;" },
              Div(
                { class: "flex items-start gap-3" },
                I({ class: "fa-solid fa-check-circle", style: "color: var(--color-primary-600); font-size: 1.25rem; margin-top: 0.25rem; flex-shrink: 0;" }),
                P({ class: "text-base text-secondary leading-relaxed" }, "Provide, maintain, and improve our services")
              ),
              Div(
                { class: "flex items-start gap-3" },
                I({ class: "fa-solid fa-check-circle", style: "color: var(--color-primary-600); font-size: 1.25rem; margin-top: 0.25rem; flex-shrink: 0;" }),
                P({ class: "text-base text-secondary leading-relaxed" }, "Respond to your inquiries and provide customer support")
              ),
              Div(
                { class: "flex items-start gap-3" },
                I({ class: "fa-solid fa-check-circle", style: "color: var(--color-primary-600); font-size: 1.25rem; margin-top: 0.25rem; flex-shrink: 0;" }),
                P({ class: "text-base text-secondary leading-relaxed" }, "Send you updates, newsletters, and marketing communications (with your consent)")
              ),
              Div(
                { class: "flex items-start gap-3" },
                I({ class: "fa-solid fa-check-circle", style: "color: var(--color-primary-600); font-size: 1.25rem; margin-top: 0.25rem; flex-shrink: 0;" }),
                P({ class: "text-base text-secondary leading-relaxed" }, "Analyze usage patterns and improve user experience")
              ),
              Div(
                { class: "flex items-start gap-3" },
                I({ class: "fa-solid fa-check-circle", style: "color: var(--color-primary-600); font-size: 1.25rem; margin-top: 0.25rem; flex-shrink: 0;" }),
                P({ class: "text-base text-secondary leading-relaxed" }, "Detect, prevent, and address technical issues")
              )
            )
          )
        )
      )
    ),

    // Information Sharing Section
    Section(
      { class: "section" },
      Div(
        { class: "container" },
        Div(
          { class: "privacy-content-section" },
          Div(
            { class: "card p-6 md:p-8" },
            H2(
              { class: "text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-primary-900" },
              "4. Information Sharing"
            ),
            P(
              { class: "text-base md:text-lg text-secondary leading-relaxed mb-4" },
              "We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:"
            ),
            Div(
              { class: "space-y-3", style: "margin-top: 1.5rem;" },
              Div(
                { class: "flex items-start gap-3" },
                I({ class: "fa-solid fa-shield-halved", style: "color: var(--color-primary-600); font-size: 1.25rem; margin-top: 0.25rem; flex-shrink: 0;" }),
                P({ class: "text-base text-secondary leading-relaxed" }, "With your explicit consent")
              ),
              Div(
                { class: "flex items-start gap-3" },
                I({ class: "fa-solid fa-shield-halved", style: "color: var(--color-primary-600); font-size: 1.25rem; margin-top: 0.25rem; flex-shrink: 0;" }),
                P({ class: "text-base text-secondary leading-relaxed" }, "To comply with legal obligations")
              ),
              Div(
                { class: "flex items-start gap-3" },
                I({ class: "fa-solid fa-shield-halved", style: "color: var(--color-primary-600); font-size: 1.25rem; margin-top: 0.25rem; flex-shrink: 0;" }),
                P({ class: "text-base text-secondary leading-relaxed" }, "To protect our rights and safety")
              ),
              Div(
                { class: "flex items-start gap-3" },
                I({ class: "fa-solid fa-shield-halved", style: "color: var(--color-primary-600); font-size: 1.25rem; margin-top: 0.25rem; flex-shrink: 0;" }),
                P({ class: "text-base text-secondary leading-relaxed" }, "With service providers who assist in operating our website")
              )
            )
          )
        )
      )
    ),

    // Data Security Section
    Section(
      { class: "section bg-neutral-50" },
      Div(
        { class: "container" },
        Div(
          { class: "privacy-content-section" },
          Div(
            { class: "card p-6 md:p-8" },
            H2(
              { class: "text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-primary-900" },
              "5. Data Security"
            ),
            P(
              { class: "text-base md:text-lg text-secondary leading-relaxed mb-4" },
              "We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security."
            )
          )
        )
      )
    ),

    // Your Rights Section
    Section(
      { class: "section" },
      Div(
        { class: "container" },
        Div(
          { class: "privacy-content-section" },
          Div(
            { class: "card p-6 md:p-8" },
            H2(
              { class: "text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-primary-900" },
              "6. Your Rights"
            ),
            P(
              { class: "text-base md:text-lg text-secondary leading-relaxed mb-4" },
              "You have the right to:"
            ),
            Div(
              { class: "space-y-3", style: "margin-top: 1.5rem;" },
              Div(
                { class: "flex items-start gap-3" },
                I({ class: "fa-solid fa-user-shield", style: "color: var(--color-primary-600); font-size: 1.25rem; margin-top: 0.25rem; flex-shrink: 0;" }),
                P({ class: "text-base text-secondary leading-relaxed" }, "Access and receive a copy of your personal data")
              ),
              Div(
                { class: "flex items-start gap-3" },
                I({ class: "fa-solid fa-user-shield", style: "color: var(--color-primary-600); font-size: 1.25rem; margin-top: 0.25rem; flex-shrink: 0;" }),
                P({ class: "text-base text-secondary leading-relaxed" }, "Request correction of inaccurate data")
              ),
              Div(
                { class: "flex items-start gap-3" },
                I({ class: "fa-solid fa-user-shield", style: "color: var(--color-primary-600); font-size: 1.25rem; margin-top: 0.25rem; flex-shrink: 0;" }),
                P({ class: "text-base text-secondary leading-relaxed" }, "Request deletion of your personal data")
              ),
              Div(
                { class: "flex items-start gap-3" },
                I({ class: "fa-solid fa-user-shield", style: "color: var(--color-primary-600); font-size: 1.25rem; margin-top: 0.25rem; flex-shrink: 0;" }),
                P({ class: "text-base text-secondary leading-relaxed" }, "Object to processing of your personal data")
              ),
              Div(
                { class: "flex items-start gap-3" },
                I({ class: "fa-solid fa-user-shield", style: "color: var(--color-primary-600); font-size: 1.25rem; margin-top: 0.25rem; flex-shrink: 0;" }),
                P({ class: "text-base text-secondary leading-relaxed" }, "Withdraw consent at any time")
              )
            )
          )
        )
      )
    ),

    // Cookies Section
    Section(
      { class: "section bg-neutral-50" },
      Div(
        { class: "container" },
        Div(
          { class: "privacy-content-section" },
          Div(
            { class: "card p-6 md:p-8" },
            H2(
              { class: "text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-primary-900" },
              "7. Cookies"
            ),
            P(
              { class: "text-base md:text-lg text-secondary leading-relaxed mb-4" },
              "We use cookies and similar tracking technologies to track activity on our website and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent."
            )
          )
        )
      )
    ),

    // Contact Us Section
    Section(
      { class: "section" },
      Div(
        { class: "container" },
        Div(
          { class: "privacy-content-section" },
          Div(
            { class: "card p-6 md:p-8 text-center" },
            H2(
              { class: "text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-primary-900" },
              "8. Contact Us"
            ),
            P(
              { class: "text-base md:text-lg text-secondary leading-relaxed mb-6" },
              "If you have any questions about this Privacy Policy, please contact us at:"
            ),
            Div(
              { class: "flex items-center justify-center gap-3" },
              I({ class: "fa-solid fa-envelope", style: "font-size: 1.5rem; color: #8b5cf6;" }),
              A(
                { 
                  href: "mailto:contact@BABLOJS.com",
                  class: "text-lg md:text-xl text-primary-600 font-medium hover:underline"
                },
                "contact@BABLOJS.com"
              )
            )
          )
        )
      )
    )
  );
}

export default Privacy;
