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

function Terms() {
  return MainLayout(
    Style(
      {},
      `
      .terms-content-section {
        max-width: 900px;
        margin: 0 auto;
      }
      .terms-list-item {
        display: flex;
        align-items: flex-start;
        gap: 0.75rem;
        margin-bottom: 0.75rem;
      }
      .terms-highlight-box {
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
            "Terms and ",
            Span({ class: "heading-gradient-purple-pink" }, "Services")
          ),
          P(
            { class: "text-base md:text-lg lg:text-xl text-secondary max-w-3xl mx-auto leading-relaxed" },
            "Last updated: " + new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
          )
        )
      )
    ),

    // Acceptance of Terms Section
    Section(
      { class: "section bg-neutral-50" },
      Div(
        { class: "container" },
        Div(
          { class: "terms-content-section" },
          Div(
            { class: "card p-6 md:p-8" },
            H2(
              { class: "text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-primary-900" },
              "1. Acceptance of Terms"
            ),
            P(
              { class: "text-base md:text-lg text-secondary leading-relaxed mb-4" },
              "By accessing and using BABLOJS services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service."
            )
          )
        )
      )
    ),

    // Use License Section
    Section(
      { class: "section" },
      Div(
        { class: "container" },
        Div(
          { class: "terms-content-section" },
          Div(
            { class: "card p-6 md:p-8" },
            H2(
              { class: "text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-primary-900" },
              "2. Use License"
            ),
            P(
              { class: "text-base md:text-lg text-secondary leading-relaxed mb-4" },
              "Permission is granted to temporarily download one copy of BABLOJS for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:"
            ),
            Div(
              { class: "space-y-3", style: "margin-top: 1.5rem;" },
              Div(
                { class: "flex items-start gap-3" },
                I({ class: "fa-solid fa-times-circle", style: "color: var(--color-error); font-size: 1.25rem; margin-top: 0.25rem; flex-shrink: 0;" }),
                P({ class: "text-base text-secondary leading-relaxed" }, "Modify or copy the materials")
              ),
              Div(
                { class: "flex items-start gap-3" },
                I({ class: "fa-solid fa-times-circle", style: "color: var(--color-error); font-size: 1.25rem; margin-top: 0.25rem; flex-shrink: 0;" }),
                P({ class: "text-base text-secondary leading-relaxed" }, "Use the materials for any commercial purpose or for any public display")
              ),
              Div(
                { class: "flex items-start gap-3" },
                I({ class: "fa-solid fa-times-circle", style: "color: var(--color-error); font-size: 1.25rem; margin-top: 0.25rem; flex-shrink: 0;" }),
                P({ class: "text-base text-secondary leading-relaxed" }, "Attempt to reverse engineer any software contained in BABLOJS")
              ),
              Div(
                { class: "flex items-start gap-3" },
                I({ class: "fa-solid fa-times-circle", style: "color: var(--color-error); font-size: 1.25rem; margin-top: 0.25rem; flex-shrink: 0;" }),
                P({ class: "text-base text-secondary leading-relaxed" }, "Remove any copyright or other proprietary notations from the materials")
              )
            )
          )
        )
      )
    ),

    // Disclaimer Section
    Section(
      { class: "section bg-neutral-50" },
      Div(
        { class: "container" },
        Div(
          { class: "terms-content-section" },
          Div(
            { class: "card p-6 md:p-8" },
            H2(
              { class: "text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-primary-900" },
              "3. Disclaimer"
            ),
            Div(
              { class: "terms-highlight-box" },
              P(
                { class: "text-base md:text-lg text-secondary leading-relaxed" },
                "The materials on BABLOJS are provided on an 'as is' basis. BABLOJS makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights."
              )
            )
          )
        )
      )
    ),

    // Limitations Section
    Section(
      { class: "section" },
      Div(
        { class: "container" },
        Div(
          { class: "terms-content-section" },
          Div(
            { class: "card p-6 md:p-8" },
            H2(
              { class: "text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-primary-900" },
              "4. Limitations"
            ),
            P(
              { class: "text-base md:text-lg text-secondary leading-relaxed mb-4" },
              "In no event shall BABLOJS or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on BABLOJS, even if BABLOJS or a BABLOJS authorized representative has been notified orally or in writing of the possibility of such damage."
            )
          )
        )
      )
    ),

    // Accuracy of Materials Section
    Section(
      { class: "section bg-neutral-50" },
      Div(
        { class: "container" },
        Div(
          { class: "terms-content-section" },
          Div(
            { class: "card p-6 md:p-8" },
            H2(
              { class: "text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-primary-900" },
              "5. Accuracy of Materials"
            ),
            P(
              { class: "text-base md:text-lg text-secondary leading-relaxed mb-4" },
              "The materials appearing on BABLOJS could include technical, typographical, or photographic errors. BABLOJS does not warrant that any of the materials on its website are accurate, complete, or current. BABLOJS may make changes to the materials contained on its website at any time without notice."
            )
          )
        )
      )
    ),

    // Links Section
    Section(
      { class: "section" },
      Div(
        { class: "container" },
        Div(
          { class: "terms-content-section" },
          Div(
            { class: "card p-6 md:p-8" },
            H2(
              { class: "text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-primary-900" },
              "6. Links"
            ),
            P(
              { class: "text-base md:text-lg text-secondary leading-relaxed mb-4" },
              "BABLOJS has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by BABLOJS of the site. Use of any such linked website is at the user's own risk."
            )
          )
        )
      )
    ),

    // Modifications Section
    Section(
      { class: "section bg-neutral-50" },
      Div(
        { class: "container" },
        Div(
          { class: "terms-content-section" },
          Div(
            { class: "card p-6 md:p-8" },
            H2(
              { class: "text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-primary-900" },
              "7. Modifications"
            ),
            P(
              { class: "text-base md:text-lg text-secondary leading-relaxed mb-4" },
              "BABLOJS may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service."
            )
          )
        )
      )
    ),

    // Governing Law Section
    Section(
      { class: "section" },
      Div(
        { class: "container" },
        Div(
          { class: "terms-content-section" },
          Div(
            { class: "card p-6 md:p-8" },
            H2(
              { class: "text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-primary-900" },
              "8. Governing Law"
            ),
            P(
              { class: "text-base md:text-lg text-secondary leading-relaxed mb-4" },
              "These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that location."
            )
          )
        )
      )
    ),

    // Contact Information Section
    Section(
      { class: "section bg-neutral-50" },
      Div(
        { class: "container" },
        Div(
          { class: "terms-content-section" },
          Div(
            { class: "card p-6 md:p-8 text-center" },
            H2(
              { class: "text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-primary-900" },
              "9. Contact Information"
            ),
            P(
              { class: "text-base md:text-lg text-secondary leading-relaxed mb-6" },
              "If you have any questions about these Terms of Service, please contact us at:"
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

export default Terms;
