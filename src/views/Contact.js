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
  Input,
  Textarea,
  Label,
  Form,
  I,
  Style,
} from "../_modules/html.js";
import { useState } from "../_modules/hooks.js";
import { requests } from "../_modules/requests.js";
import MainLayout from "./components/MainLayout.js";
import Config from "../app/config/config.js";
import { contactInfo, contactReasons } from "../constants/contact.js";
import { router } from "../_modules/router.js";

function Contact() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    type: "general"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "", type: "general" });
    }, 2000);
  };

  return MainLayout(
    Style(
      {},
      `
      .contact-grid-4 {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }
      .contact-grid-3 {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }
      @media (min-width: 768px) {
        .contact-grid-4 {
          grid-template-columns: repeat(2, 1fr);
        }
        .contact-grid-3 {
          grid-template-columns: repeat(2, 1fr);
        }
      }
      @media (min-width: 1024px) {
        .contact-grid-4 {
          grid-template-columns: repeat(4, 1fr);
        }
        .contact-grid-3 {
          grid-template-columns: repeat(3, 1fr);
        }
      }
      .contact-form-layout {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--space-8);
        align-items: start;
      }
      @media (min-width: 1024px) {
        .contact-form-layout {
          grid-template-columns: 1fr 1.5fr;
          gap: var(--space-12);
        }
      }
      .contact-form-text {
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      .contact-form-container {
        width: 100%;
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
            "Get in ",
            Span({ class: "heading-gradient-purple-pink" }, "Touch")
          ),
          P(
            { class: "text-base md:text-lg lg:text-xl text-secondary max-w-3xl mx-auto leading-relaxed" },
            "Have questions about BABLOJS? Need help with your project? We're here to help you succeed."
          )
        )
      )
    ),

    // Contact Methods Section
    Section(
      { class: "section bg-neutral-50" },
      Div(
        { class: "container" },
        Div(
          { class: "text-center mb-12 md:mb-16" },
          H2(
            { class: "text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6" },
            "Contact Methods"
          ),
          P(
            { class: "text-base md:text-lg lg:text-xl text-secondary max-w-2xl mx-auto leading-relaxed" },
            "Choose the way that works best for you."
          )
        ),

        Div(
          { class: "contact-grid-4" },
          ...contactReasons.map(item =>
            Div(
              { class: "card p-6 md:p-8 text-center transition-all duration-300 hover:-translate-y-1" },
              Div(
                {
                  class: "mb-4",
                  style: "display: inline-flex; align-items: center; justify-content: center; width: 3.5rem; height: 3.5rem; background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%); border-radius: 0.75rem; margin: 0 auto;"
                },
                I(
                  {
                    class: item.icon,
                    style: "font-size: 1.75rem; background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;"
                  }
                )
              ),
              H3(
                { class: "text-xl md:text-2xl font-bold mb-3 md:mb-4 text-primary-900" },
                item.title
              ),
              P(
                { class: "text-sm md:text-base text-secondary mb-4 md:mb-6 leading-relaxed" },
                item.description
              ),
              A(
                {
                  href: `mailto:${item.email}`,
                  class: "btn btn-outline w-full sm:w-auto"
                },
                "Contact Us"
              )
            )
          )
        ),
        // Additional Contact Info
        Div(
          { class: "contact-grid-3", style: "margin-top: 3rem;" },
          Div(
            { class: "card p-6 text-center" },
            I({ class: "fa-solid fa-envelope", style: "font-size: 1.5rem; color: #8b5cf6; margin-bottom: 0.5rem;" }),
            P({ class: "text-sm text-secondary mb-2" }, "Email"),
            A(
              { href: `mailto:${contactInfo.email}`, class: "text-primary-600 font-medium hover:underline" },
              contactInfo.email
            )
          ),
          Div(
            { class: "card p-6 text-center" },
            I({ class: "fa-solid fa-phone", style: "font-size: 1.5rem; color: #8b5cf6; margin-bottom: 0.5rem;" }),
            P({ class: "text-sm text-secondary mb-2" }, "Phone"),
            A(
              { href: `tel:${contactInfo.phone.replace(/\s/g, '')}`, class: "text-primary-600 font-medium hover:underline" },
              contactInfo.phone
            )
          ),
          Div(
            { class: "card p-6 text-center" },
            I({ class: "fa-solid fa-clock", style: "font-size: 1.5rem; color: #8b5cf6; margin-bottom: 0.5rem;" }),
            P({ class: "text-sm text-secondary mb-2" }, "Response Time"),
            P({ class: "text-primary-600 font-medium" }, contactInfo.responseTime)
          )
        )
      )
    ),

    // Contact Form Section
    Section(
      { class: "section" },
      Div(
        { class: "container" },
        Div(
          { class: "contact-form-layout" },
          // Left Side - Text Content
          Div(
            { class: "contact-form-text" },
            H2(
              { class: "text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6" },
              "Send us a ",
              Span({ class: "heading-gradient-purple-pink" }, "Message")
            ),
            P(
              { class: "text-base md:text-lg text-secondary leading-relaxed mb-4" },
              "Fill out the form and we'll get back to you as soon as possible. We're here to help with any questions about BABLOJS."
            ),
            P(
              { class: "text-sm md:text-base text-secondary leading-relaxed mb-6" },
              "Whether you need technical support, have feature requests, or want to contribute to the project, we'd love to hear from you."
            ),
            Div(
              { class: "space-y-3" },
              Div(
                { class: "flex items-center gap-3" },
                I({ class: "fa-solid fa-envelope", style: "color: var(--color-secondary-600); font-size: 1.25rem;" }),
                P({ class: "text-sm md:text-base text-secondary" }, "Quick response time")
              ),
              Div(
                { class: "flex items-center gap-3" },
                I({ class: "fa-solid fa-headset", style: "color: var(--color-secondary-600); font-size: 1.25rem;" }),
                P({ class: "text-sm md:text-base text-secondary" }, "Expert support team")
              ),
              Div(
                { class: "flex items-center gap-3" },
                I({ class: "fa-solid fa-comments", style: "color: var(--color-secondary-600); font-size: 1.25rem;" }),
                P({ class: "text-sm md:text-base text-secondary" }, "We value your feedback")
              )
            )
          ),
          // Right Side - Contact Form
          Div(
            { class: "contact-form-container" },
            Div(
              { class: "card p-6 md:p-8" },
              Form(
                {
                  class: "space-y-5 md:space-y-6",
                  onsubmit: handleSubmit
                },

                // Name Field
                Div(
                  { class: "form-group" },
                  Label(
                    { class: "form-label" },
                    "Full Name"
                  ),
                  Input({
                    type: "text",
                    class: "form-input",
                    placeholder: "Your full name",
                    value: formData.name,
                    onchange: (e) => updateFormData("name", e.target.value),
                    required: true
                  })
                ),

                // Email Field
                Div(
                  { class: "form-group" },
                  Label(
                    { class: "form-label" },
                    "Email Address"
                  ),
                  Input({
                    type: "email",
                    class: "form-input",
                    placeholder: "your@email.com",
                    value: formData.email,
                    onchange: (e) => updateFormData("email", e.target.value),
                    required: true
                  })
                ),

                // Subject Field
                Div(
                  { class: "form-group" },
                  Label(
                    { class: "form-label" },
                    "Subject"
                  ),
                  Input({
                    type: "text",
                    class: "form-input",
                    placeholder: "What's this about?",
                    value: formData.subject,
                    onchange: (e) => updateFormData("subject", e.target.value),
                    required: true
                  })
                ),

                // Message Field
                Div(
                  { class: "form-group" },
                  Label(
                    { class: "form-label" },
                    "Message"
                  ),
                  Textarea({
                    class: "form-textarea",
                    placeholder: "Tell us more about your question or project...",
                    value: formData.message,
                    onchange: (e) => updateFormData("message", e.target.value),
                    required: true
                  })
                ),

                // Submit Button
                Div(
                  { class: "form-group" },
                  Button(
                    {
                      type: "submit",
                      class: `btn btn-gradient btn-lg w-full ${isSubmitting ? "opacity-50" : ""}`,
                      disabled: isSubmitting
                    },
                    isSubmitting ? "Sending..." : "Send Message"
                  )
                ),

                // Success Message
                submitStatus === "success" && Div(
                  { class: "p-4 md:p-6 bg-success text-white rounded-lg text-center" },
                  P({ class: "text-sm md:text-base font-medium" }, "Message sent successfully! We'll get back to you soon.")
                )
              )
            )
          )
        )
      )
    )
  );
}

export default Contact;