import {
  Button,
  Div,
  Form,
  Input,
  Label,
  Section,
  H1,
  P,
  Span,
} from "../_modules/html.js";
import { useState } from "../_modules/hooks.js";
import MainLayout from "./components/MainLayout.js";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Login functionality would be implemented here");
    }, 1000);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return MainLayout(
    Section(
      { class: "section" },
      Div(
        { class: "container max-w-4xl mx-auto" },
        Div(
          { class: "section-header" },
          H1(
            { class: "text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6" },
            "Sign ",
            Span({ class: "heading-gradient-purple-pink" }, "In")
          ),
          P(
            { class: "text-base md:text-lg text-secondary leading-relaxed" },
            "Enter your credentials to access your BABLOJS account."
          )
        ),

        Div(
          { style: "max-width: 28rem; margin: 0 auto;" },
          Div(
            { class: "card p-6 md:p-8" },
            Form(
              {
                class: "space-y-5 md:space-y-6",
                onsubmit: handleSubmit
              },
              // Username Field
              Div(
                { class: "form-group" },
                Label(
                  { class: "form-label" },
                  "Username"
                ),
                Input({
                  type: "text",
                  class: "form-input",
                  placeholder: "Enter your username",
                  value: formData.username,
                  onchange: (e) => updateFormData("username", e.target.value),
                  required: true
                })
              ),

              // Password Field
              Div(
                { class: "form-group" },
                Label(
                  { class: "form-label" },
                  "Password"
                ),
                Div(
                  { class: "flex gap-2" },
                  Input({
                    type: showPassword ? "text" : "password",
                    class: "form-input flex-1",
                    placeholder: "Enter your password",
                    value: formData.password,
                    onchange: (e) => updateFormData("password", e.target.value),
                    required: true
                  }),
                  Button(
                    {
                      type: "button",
                      class: "btn btn-outline",
                      onclick: togglePasswordVisibility
                    },
                    showPassword ? "🙈" : "👁️"
                  )
                )
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
                  isSubmitting ? "Signing in..." : "Sign In"
                )
              ),

              // Additional Links
              Div(
                { class: "text-center mt-6 pt-6 border-t border-neutral-200" },
                P(
                  { class: "text-sm text-secondary mb-4" },
                  "Don't have an account? "
                ),
                P(
                  { class: "text-sm" },
                  Span(
                    {
                      class: "text-primary-600 hover:text-primary-700 cursor-pointer font-medium",
                      onclick: () => alert("Sign up functionality would be implemented here")
                    },
                    "Create an account"
                  )
                )
              )
            )
          )
        )
      )
    )
  );
}

export default Login;
