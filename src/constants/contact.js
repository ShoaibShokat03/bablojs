export const contactInfo = {
  email: "contact@bablojs.com",
  supportEmail: "support@bablojs.com",
  salesEmail: "sales@bablojs.com",
  phone: "+923011840378",
  address: {
    street: "123 Developer Street",
    city: "San Francisco",
    state: "CA",
    zip: "94105",
    country: "United States"
  },
  social: {
    github: "https://github.com/bablojs",
    twitter: "https://twitter.com/bablojs",
    discord: "https://discord.gg/bablojs",
    youtube: "https://youtube.com/bablojs"
  },
  officeHours: {
    weekdays: "Monday - Friday: 9:00 AM - 6:00 PM PST",
    weekends: "Saturday - Sunday: Closed"
  },
  responseTime: "We typically respond within 24-48 hours"
};

export const contactReasons = [
  {
    icon: "fa-solid fa-question-circle",
    title: "General Inquiry",
    description: "Have questions about BABLOJS? We're here to help.",
    email: contactInfo.email
  },
  {
    icon: "fa-solid fa-life-ring",
    title: "Technical Support",
    description: "Need help with implementation or troubleshooting?",
    email: contactInfo.supportEmail
  },
  {
    icon: "fa-solid fa-handshake",
    title: "Business Inquiries",
    description: "Interested in partnerships or enterprise solutions?",
    email: contactInfo.salesEmail
  },
  {
    icon: "fa-solid fa-bug",
    title: "Report a Bug",
    description: "Found an issue? Let us know and we'll fix it.",
    email: contactInfo.supportEmail
  }
];

export const faqCategories = [
  {
    id: "getting-started",
    title: "Getting Started",
    icon: "fa-solid fa-rocket"
  },
  {
    id: "installation",
    title: "Installation",
    icon: "fa-solid fa-download"
  },
  {
    id: "features",
    title: "Features",
    icon: "fa-solid fa-star"
  },
  {
    id: "troubleshooting",
    title: "Troubleshooting",
    icon: "fa-solid fa-wrench"
  },
  {
    id: "pricing",
    title: "Pricing & Plans",
    icon: "fa-solid fa-dollar-sign"
  }
];

export const faqItems = [
  {
    category: "getting-started",
    question: "What is BABLOJS?",
    answer: "BABLOJS is a modern, lightweight JavaScript framework for building fast and responsive single-page applications (SPAs). It provides React-like features including hooks, components, and state management in a 2KB package without requiring build tools."
  },
  {
    category: "getting-started",
    question: "Do I need to know React to use BABLOJS?",
    answer: "While BABLOJS shares similar concepts with React (hooks, components), you don't need React experience. If you're familiar with JavaScript and modern web development, you'll find BABLOJS intuitive and easy to learn."
  },
  {
    category: "installation",
    question: "How do I install BABLOJS?",
    answer: "You can include BABLOJS directly in your HTML file using a CDN link, or download it and include it locally. No build tools or npm installation required. Check our Getting Started guide for detailed instructions."
  },
  {
    category: "installation",
    question: "Does BABLOJS require Node.js or npm?",
    answer: "No! BABLOJS is designed to work without any build tools. You can use it directly in the browser with vanilla JavaScript. However, if you prefer using npm, we also provide an npm package."
  },
  {
    category: "features",
    question: "What features does BABLOJS provide?",
    answer: "BABLOJS includes hooks (useState, useEffect), component system, router, state management, virtual DOM, and more. All in a lightweight 2KB package that works without build tools."
  },
  {
    category: "features",
    question: "Can I use BABLOJS with TypeScript?",
    answer: "Yes! BABLOJS has TypeScript support. You can use it with TypeScript for better type safety and developer experience."
  },
  {
    category: "troubleshooting",
    question: "My component isn't updating. What should I do?",
    answer: "Make sure you're using useState hooks correctly and that state updates are triggering re-renders. Check the browser console for errors and refer to our troubleshooting guide."
  },
  {
    category: "troubleshooting",
    question: "How do I debug BABLOJS applications?",
    answer: "BABLOJS works well with browser DevTools. You can use console.log, breakpoints, and React DevTools-like extensions. Check our debugging guide for more tips."
  },
  {
    category: "pricing",
    question: "Is BABLOJS free to use?",
    answer: "Yes! BABLOJS is completely free and open-source under the MIT License. You can use it for personal and commercial projects without any restrictions."
  },
  {
    category: "pricing",
    question: "Do you offer enterprise support?",
    answer: "Yes, we offer enterprise support plans with priority support, custom training, and dedicated resources. Contact our sales team for more information."
  }
];

