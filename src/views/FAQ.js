import {
  Div,
  H1,
  H2,
  H3,
  P,
  Button,
  Span,
  Section,
  I,
  Style,
  A,
} from "../_modules/html.js";
import { useState } from "../_modules/hooks.js";
import { requests } from "../_modules/requests.js";
import MainLayout from "./components/MainLayout.js";
import { faqCategories, faqItems } from "../constants/contact.js";

function FAQ() {
  const [activeCategory, setActiveCategory] = useState("getting-started");
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (index) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const filteredItems = faqItems.filter(item => item.category === activeCategory);

  return MainLayout(
    Style(
      {},
      `
      .faq-flex-wrap {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1rem;
      }
      .faq-flex-responsive {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        justify-content: center;
      }
      @media (min-width: 640px) {
        .faq-flex-responsive {
          flex-direction: row;
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
            "Frequently Asked ",
            Span({ class: "heading-gradient-purple-pink" }, "Questions")
          ),
          P(
            { class: "text-base md:text-lg lg:text-xl text-secondary max-w-3xl mx-auto leading-relaxed" },
            "Find answers to common questions about BABLOJS. Can't find what you're looking for? Contact our support team."
          )
        )
      )
    ),

    // FAQ Categories
    Section(
      { class: "section bg-neutral-50" },
      Div(
        { class: "container" },
        Div(
          { class: "faq-flex-wrap", style: "margin-bottom: 2rem;" },
          ...faqCategories.map(category =>
            Button(
              {
                class: `btn ${activeCategory === category.id ? 'btn-gradient' : 'btn-outline'} btn-sm`,
                onclick: () => setActiveCategory(category.id)
              },
              I({ class: category.icon, style: "margin-right: 0.5rem;" }),
              category.title
            )
          )
        ),

        // FAQ Items
        Div(
          { class: "max-w-4xl mx-auto" },
          ...filteredItems.map((item, index) =>
            Div(
              { class: "faq-item" },
              Button(
                {
                  class: `faq-question ${openItems[index] ? 'faq-question-active' : ''}`,
                  onclick: () => toggleItem(index)
                },
                H3(
                  { class: "faq-question-text" },
                  item.question
                ),
                Span(
                  { class: "faq-toggle-icon" },
                  openItems[index] ? "−" : "+"
                )
              ),
              Div(
                { 
                  class: `faq-answer ${openItems[index] ? 'faq-answer-open' : 'faq-answer-closed'}` 
                },
                P(
                  { class: "faq-answer-text" },
                  item.answer
                )
              )
            )
          )
        )
      )
    ),

    // CTA Section
    Section(
      { class: "section" },
      Div(
        { class: "container" },
        Div(
          { class: "card p-8 md:p-12 text-center max-w-3xl mx-auto" },
          H2(
            { class: "text-2xl md:text-3xl font-bold mb-4 md:mb-6" },
            "Still have questions?"
          ),
          P(
            { class: "text-base md:text-lg text-secondary mb-6 md:mb-8 leading-relaxed" },
            "Our support team is here to help. Get in touch and we'll respond as soon as possible."
          ),
          Div(
            { class: "faq-flex-responsive" },
            A(
              {
                href: requests.url("/contact"),
                class: "btn btn-gradient btn-lg"
              },
              "Contact Support"
            ),
            A(
              {
                href: requests.url("/docs"),
                class: "btn btn-outline btn-lg"
              },
              "View Documentation"
            )
          )
        )
      )
    )
  );
}

export default FAQ;

