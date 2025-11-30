import {
  Div,
  H1,
  H2,
  P,
  Section,
  Span,
  Code,
  Pre,
  Style,
  I,
  A,
} from "../_modules/html.js";
import MainLayout from "./components/MainLayout.js";
import Config from "../app/config/config.js";

function License() {
  const mitLicense = `MIT License

Copyright (c) ${new Date().getFullYear()} ${Config.app.name}

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`;

  return MainLayout(
    Style(
      {},
      `
      .license-content-section {
        max-width: 900px;
        margin: 0 auto;
      }
      .license-code-block {
        background: var(--color-neutral-900);
        border-radius: var(--radius-lg);
        padding: var(--space-6);
        overflow-x: auto;
        margin: var(--space-6) 0;
        border: 1px solid var(--color-border-primary);
      }
      .license-code-block pre {
        margin: 0;
        padding: 0;
        font-family: 'Courier New', Courier, monospace;
        font-size: 0.875rem;
        line-height: 1.6;
        color: var(--color-neutral-100);
        white-space: pre-wrap;
        word-wrap: break-word;
      }
      .license-code-block code {
        font-family: 'Courier New', Courier, monospace;
        color: var(--color-neutral-100);
      }
      .license-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1rem;
      }
      @media (min-width: 640px) {
        .license-grid {
          grid-template-columns: repeat(2, 1fr);
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
            "MIT ",
            Span({ class: "heading-gradient-purple-pink" }, "License")
          ),
          P(
            { class: "text-base md:text-lg lg:text-xl text-secondary max-w-3xl mx-auto leading-relaxed" },
            "BABLOJS is released under the MIT License, one of the most permissive open-source licenses available."
          )
        )
      )
    ),

    // License Overview Section
    Section(
      { class: "section bg-neutral-50" },
      Div(
        { class: "container" },
        Div(
          { class: "license-content-section" },
          Div(
            { class: "card p-6 md:p-8" },
            H2(
              { class: "text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-primary-900" },
              "License Overview"
            ),
            P(
              { class: "text-base md:text-lg text-secondary leading-relaxed mb-6" },
              "The MIT License is a short and simple permissive license. It allows people to do almost anything they want with your code, including using it in proprietary software, as long as they include the original copyright and license notice."
            ),
            P(
              { class: "text-base md:text-lg text-secondary leading-relaxed mb-4" },
              "Key points of the MIT License:"
            ),
            Div(
              { class: "license-grid", style: "margin-top: 1.5rem;" },
              Div(
                { class: "flex items-start gap-3" },
                I({ class: "fa-solid fa-check-circle", style: "color: var(--color-success); font-size: 1.25rem; margin-top: 0.25rem; flex-shrink: 0;" }),
                P({ class: "text-base text-secondary leading-relaxed" }, "Commercial use allowed")
              ),
              Div(
                { class: "flex items-start gap-3" },
                I({ class: "fa-solid fa-check-circle", style: "color: var(--color-success); font-size: 1.25rem; margin-top: 0.25rem; flex-shrink: 0;" }),
                P({ class: "text-base text-secondary leading-relaxed" }, "Modification allowed")
              ),
              Div(
                { class: "flex items-start gap-3" },
                I({ class: "fa-solid fa-check-circle", style: "color: var(--color-success); font-size: 1.25rem; margin-top: 0.25rem; flex-shrink: 0;" }),
                P({ class: "text-base text-secondary leading-relaxed" }, "Distribution allowed")
              ),
              Div(
                { class: "flex items-start gap-3" },
                I({ class: "fa-solid fa-check-circle", style: "color: var(--color-success); font-size: 1.25rem; margin-top: 0.25rem; flex-shrink: 0;" }),
                P({ class: "text-base text-secondary leading-relaxed" }, "Private use allowed")
              ),
              Div(
                { class: "flex items-start gap-3" },
                I({ class: "fa-solid fa-check-circle", style: "color: var(--color-success); font-size: 1.25rem; margin-top: 0.25rem; flex-shrink: 0;" }),
                P({ class: "text-base text-secondary leading-relaxed" }, "No liability or warranty")
              )
            )
          )
        )
      )
    ),

    // Full License Text Section
    Section(
      { class: "section" },
      Div(
        { class: "container" },
        Div(
          { class: "license-content-section" },
          Div(
            { class: "card p-6 md:p-8" },
            H2(
              { class: "text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-primary-900" },
              "Full License Text"
            ),
            Div(
              { class: "license-code-block" },
              Pre(
                {},
                Code({}, mitLicense)
              )
            )
          )
        )
      )
    ),

    // Using BABLOJS Section
    Section(
      { class: "section bg-neutral-50" },
      Div(
        { class: "container" },
        Div(
          { class: "license-content-section" },
          Div(
            { class: "card p-6 md:p-8" },
            H2(
              { class: "text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-primary-900" },
              "Using BABLOJS"
            ),
            P(
              { class: "text-base md:text-lg text-secondary leading-relaxed mb-6" },
              "You are free to use BABLOJS in any project, commercial or personal, without any restrictions. The only requirement is that you include the original copyright notice and license text when distributing your software."
            ),
            P(
              { class: "text-base md:text-lg text-secondary leading-relaxed mb-4" },
              "If you use BABLOJS in your project, we'd love to hear about it! Consider:"
            ),
            Div(
              { class: "space-y-3", style: "margin-top: 1.5rem;" },
              Div(
                { class: "flex items-start gap-3" },
                I({ class: "fa-solid fa-star", style: "color: var(--color-primary-600); font-size: 1.25rem; margin-top: 0.25rem; flex-shrink: 0;" }),
                P({ class: "text-base text-secondary leading-relaxed" }, "Starring our GitHub repository")
              ),
              Div(
                { class: "flex items-start gap-3" },
                I({ class: "fa-solid fa-share-nodes", style: "color: var(--color-primary-600); font-size: 1.25rem; margin-top: 0.25rem; flex-shrink: 0;" }),
                P({ class: "text-base text-secondary leading-relaxed" }, "Sharing your project with the community")
              ),
              Div(
                { class: "flex items-start gap-3" },
                I({ class: "fa-solid fa-code-branch", style: "color: var(--color-primary-600); font-size: 1.25rem; margin-top: 0.25rem; flex-shrink: 0;" }),
                P({ class: "text-base text-secondary leading-relaxed" }, "Contributing improvements back to BABLOJS")
              )
            )
          )
        )
      )
    ),

    // Questions Section
    Section(
      { class: "section" },
      Div(
        { class: "container" },
        Div(
          { class: "license-content-section" },
          Div(
            { class: "card p-6 md:p-8 text-center" },
            H2(
              { class: "text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-primary-900" },
              "Questions?"
            ),
            P(
              { class: "text-base md:text-lg text-secondary leading-relaxed mb-6" },
              "If you have any questions about the license or how you can use BABLOJS, please contact us at:"
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

export default License;
