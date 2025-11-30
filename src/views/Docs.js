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
  Section,
  Code,
  Pre,
  Input,
  Ul,
  Li,
  I,
  Style
} from "../_modules/html.js";
import { useState, useEffect } from "../_modules/hooks.js";
import { requests } from "../_modules/requests.js";
import MainLayout from "./components/MainLayout.js";
import CodeModal from "./components/CodeModal.js";
import { documentation, searchableContent } from "../constants/docs.js";

function Docs() {
  // Initialize activeSection from URL or default
  const getInitialSection = () => {
    const tabFromUrl = requests.get('tab');
    if (tabFromUrl) {
      // Validate that the tab exists in documentation sections
      const sectionExists = documentation.sections.some(s => s.id === tabFromUrl);
      if (sectionExists) {
        return tabFromUrl;
      }
    }
    return 'getting-started';
  };

  const [activeSection, setActiveSection] = useState(getInitialSection());
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalCode, setModalCode] = useState('');

  const docSections = documentation.sections.map(section => ({
    id: section.id,
    title: section.title,
    icon: section.icon
  }));

  console.log("activeSection", activeSection);
  // Update URL when activeSection changes
  useEffect(() => {
    if (activeSection) {
      requests.set('tab', activeSection);
    }
  }, [activeSection]);

  // Listen for URL changes (browser back/forward)
  useEffect(() => {
    const handlePopState = () => {
      const tabFromUrl = requests.get('tab');
      if (tabFromUrl) {
        const sectionExists = documentation.sections.some(s => s.id === tabFromUrl);
        if (sectionExists && tabFromUrl !== activeSection) {
          setActiveSection(tabFromUrl);
        }
      } else if (activeSection !== 'getting-started') {
        setActiveSection('getting-started');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [activeSection]);

  // Handle section change (updates both state and URL)
  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
    // URL is updated via useEffect above
  };

  // Real-time search handler
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.length > 2) {
      const queryLower = query.toLowerCase();
      const results = searchableContent.filter(item =>
        item.title.toLowerCase().includes(queryLower) ||
        item.content.toLowerCase().includes(queryLower) ||
        (item.code && item.code.toLowerCase().includes(queryLower))
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const showCodeModal = (code) => {
    setModalCode(code);
    setIsModalOpen(true);
  };

  // Get current section data
  const currentSection = documentation.sections.find(s => s.id === activeSection);

  // Render documentation content from JSON
  const renderSectionContent = (section) => {
    if (!section || !section.content) return Div({}, "Content not found");

    const { title, description, subsections } = section.content;

    return Div(
      {},
      Div(
        { class: "mb-6" },
        Span({ class: "section-badge" }, section.title),
        H1(
          { class: "text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-primary-900 mt-4" },
          title
        )
      ),
      description && P(
        { class: "text-base md:text-lg text-secondary mb-6 md:mb-8 leading-relaxed" },
        description
      ),
      subsections && subsections.map((subsection, index) =>
        renderSubsection(subsection, index)
      )
    );
  };

  const renderSubsection = (subsection, index) => {
    const elements = [];

    // Title
    if (subsection.title) {
      elements.push(
        H2(
          { class: "text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-primary-900 mt-8" },
          subsection.title
        )
      );
    }

    // Description/Content
    if (subsection.description) {
      elements.push(
        P(
          { class: "text-base text-secondary mb-4 leading-relaxed" },
          subsection.description
        )
      );
    } else if (subsection.content) {
      elements.push(
        P(
          { class: "text-base text-secondary mb-4 leading-relaxed" },
          subsection.content
        )
      );
    }

    // Syntax
    if (subsection.syntax) {
      elements.push(
        Div(
          { class: "bg-neutral-50 p-4 rounded-lg mb-4" },
          Code(
            { class: "text-sm font-mono" },
            subsection.syntax
          )
        )
      );
    }

    // Parameters
    if (subsection.parameters) {
      elements.push(
        P(
          { class: "text-sm text-secondary mb-2 leading-relaxed" },
          Span({ class: "font-semibold" }, "Parameters: ")
        ),
        Ul(
          { class: "space-y-2 mb-4 ml-6" },
          ...subsection.parameters.map(param =>
            Li(
              { class: "text-sm text-secondary" },
              Span({ class: "font-semibold" }, param.name + ": "),
              Span({ class: "text-primary-600" }, param.type),
              " - " + param.description
            )
          )
        )
      );
    }

    // Returns
    if (subsection.returns) {
      elements.push(
        P(
          { class: "text-sm text-secondary mb-4 leading-relaxed" },
          Span({ class: "font-semibold" }, "Returns: "),
          subsection.returns
        )
      );
    }

    // Code/Example
    if (subsection.code || subsection.example) {
      const code = subsection.code || subsection.example;
      elements.push(
        Div(
          { class: "bg-neutral-900 text-neutral-100 p-4 rounded-lg mb-4 overflow-x-auto" },
          Pre(
            {},
            Code(
              { class: "text-sm font-mono" },
              code
            )
          )
        ),
        Button(
          {
            class: "btn btn-outline btn-sm mb-6",
            onclick: () => showCodeModal(code)
          },
          I({ class: "fa-solid fa-code mr-2" }),
          "View Full Code"
        )
      );
    }

    // Features list
    if (subsection.features) {
      elements.push(
        Ul(
          { class: "space-y-3 mb-6" },
          ...subsection.features.map(feature =>
            Li(
              { class: "flex items-start" },
              Span({ class: "text-primary-600 mr-3 mt-1" }, "✓"),
              Div({}, feature)
            )
          )
        )
      );
    }

    // Benefits/Items with icons
    if (subsection.benefits) {
      elements.push(
        Div(
          { class: "grid grid-2 md:grid-3 gap-6 mt-6" },
          ...subsection.benefits.map(benefit =>
            Div(
              { class: "docs-feature-item" },
              Div(
                { class: "mb-4", style: "width: 3rem; height: 3rem; background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%); border-radius: 0.75rem; display: flex; align-items: center; justify-content: center;" },
                I({ class: benefit.icon, style: "font-size: 1.5rem; color: var(--color-secondary-600);" })
              ),
              H3(
                { class: "text-xl font-bold mb-2 text-primary-900" },
                benefit.title
              ),
              P(
                { class: "text-sm text-secondary leading-relaxed" },
                benefit.description
              )
            )
          )
        )
      );
    }

    // Steps
    if (subsection.steps) {
      elements.push(
        Ul(
          { class: "space-y-2 mb-4 ml-6" },
          ...subsection.steps.map(step =>
            Li({ class: "text-base text-secondary" }, step)
          )
        )
      );
    }

    // Common elements (for HTML factories)
    if (subsection.commonElements) {
      elements.push(
        Div(
          { class: "grid grid-1 md:grid-2 gap-4 mb-6" },
          ...subsection.commonElements.map(item =>
            Div(
              { class: "docs-api-item" },
              H4(
                { class: "text-base font-bold mb-1 text-primary-900" },
                Code({ class: "font-mono text-sm" }, item.name + "()")
              ),
              P(
                { class: "text-xs text-secondary" },
                item.description
              )
            )
          )
        )
      );
    }

    // Methods
    if (subsection.methods) {
      elements.push(
        Ul(
          { class: "space-y-3 mb-4" },
          ...subsection.methods.map(method =>
            Li(
              { class: "text-base text-secondary" },
              Span({ class: "font-semibold font-mono" }, method.name),
              " - " + method.description
            )
          )
        )
      );
    }

    // Modules
    if (subsection.modules) {
      elements.push(
        Div(
          { class: "space-y-4 mb-6" },
          ...subsection.modules.map(module =>
            Div(
              { class: "docs-example-item" },
              H4(
                { class: "text-lg font-bold mb-2 text-primary-900" },
                module.name
              ),
              P(
                { class: "text-sm text-secondary mb-2" },
                module.description
              ),
              P(
                { class: "text-xs text-secondary" },
                Span({ class: "font-semibold" }, "Exports: "),
                module.exports.join(", ")
              )
            )
          )
        )
      );
    }

    // Notes
    if (subsection.notes) {
      elements.push(
        Div(
          { class: "docs-info-box mt-6" },
          H4(
            { class: "text-base font-bold mb-2" },
            "Notes:"
          ),
          Ul(
            { class: "space-y-2" },
            ...subsection.notes.map(note =>
              Li({ class: "text-sm text-secondary" }, note)
            )
          )
        )
      );
    }

    // Note (single)
    if (subsection.note) {
      elements.push(
        Div(
          { class: "docs-info-box mt-6" },
          P(
            { class: "text-sm text-secondary" },
            subsection.note
          )
        )
      );
    }

    return Div({ key: index }, ...elements);
  };

  return MainLayout(
    Section(
      { class: "section docs-section", style: "padding-top: 1rem; padding-bottom: 1rem;" },
      Div(
        { class: "container" },

        // Documentation Header
        Div(
          { class: "docs-header" },
          H1(
            { class: "docs-title" },
            "Documentation"
          ),
          Div(
            { class: "docs-search-container" },
            Input({
              type: "search",
              placeholder: "Search documentation...",
              class: "docs-search-input",
              value: searchQuery,
              onInput: (e) => handleSearch(e.target.value)
            }),
            searchResults.length > 0 && Div(
              { class: "docs-search-results" },
              ...searchResults.map((result, index) =>
                Div(
                  {
                    class: "docs-search-result-item",
                    onclick: () => {
                      handleSectionChange(result.section);
                      setSearchQuery('');
                      setSearchResults([]);
                    }
                  },
                  H4(
                    { class: "docs-search-result-title" },
                    result.title
                  ),
                  P(
                    { class: "docs-search-result-content" },
                    result.content.substring(0, 100) + "..."
                  )
                )
              )
            )
          )
        ),

        // Main Layout: Sidebar + Content
        Div(
          {
            class: "docs-layout"
          },

          // Sidebar - On top for mobile, right side for desktop
          Div(
            {
              class: "docs-sidebar"
            },
            Div(
              {
                class: "docs-sidebar-container"
              },

              // Navigation
              H3(
                { class: "docs-sidebar-title" },
                "Navigation"
              ),
              Div(
                { class: "docs-sidebar-nav" },
                ...docSections.map((section, index) =>
                  Button(
                    {
                      class: `docs-sidebar-btn ${activeSection === section.id ? 'active' : ''}`,
                      onclick: () => handleSectionChange(section.id),
                      "data-index": index
                    },
                    I(
                      { class: `${section.icon} docs-sidebar-icon` }
                    ),
                    Span({ class: "docs-sidebar-text" }, section.title)
                  )
                )
              ),
            )
          ),

          // Main Content
          Div(
            {
              class: "docs-content"
            },
            Div(
              { class: "docs-content-wrapper" },

              // Dynamic Content from JSON
              currentSection && renderSectionContent(currentSection)
            )
          )
        ),

        // Enhanced Mobile Styles for Docs
        Style(
          {},
          `
          /* Docs Layout - Mobile First */
          .docs-layout {
            display: grid;
            grid-template-columns: 1fr;
            gap: var(--space-6);
          }
          
          /* Sidebar - Mobile: On Top, Desktop: Right Side */
          .docs-sidebar {
            order: 1;
            width: 100%;
          }
          
          .docs-content {
            order: 2;
            width: 100%;
          }
          
          /* Sidebar Container - Full Width, No Card Styling on Mobile */
          .docs-sidebar-container {
            background-color: transparent;
            border: none;
            padding: 0;
            box-shadow: none;
            position: relative;
            width: 100%;
            max-width: 100%;
          }
          
          @media (min-width: 1024px) {
            .docs-sidebar-container {
              background-color: var(--color-white);
              border-radius: var(--radius-lg);
              border: 1px solid var(--color-border-primary);
              padding: var(--space-4);
              position: sticky;
              top: calc(var(--space-8) + var(--header-height));
              max-height: calc(100vh - 6rem);
              overflow-y: auto;
              width: 100%;
            }
          }
          
          /* Sidebar Title */
          .docs-sidebar-title {
            font-size: var(--text-lg);
            font-weight: var(--font-bold);
            color: var(--color-text-primary);
            margin: 0 0 var(--space-4) 0;
            padding-bottom: var(--space-3);
            border-bottom: 2px solid var(--color-border-primary);
            width: 100%;
          }
          
          @media (min-width: 1024px) {
            .docs-sidebar-title {
              font-size: var(--text-base);
              margin: 0 0 var(--space-3) 0;
              padding-bottom: var(--space-2);
            }
          }
          
          /* Sidebar Navigation - Full Width Flex Wrap with Staggered Layout */
          .docs-sidebar-nav {
            display: flex;
            flex-wrap: wrap;
            gap: var(--space-3);
            width: 100%;
            max-width: 100%;
            align-items: stretch;
            justify-content: flex-start;
          }
          
          /* Sidebar Button - No Card, No Shadow, Staggered Sizes */
          .docs-sidebar-btn {
            display: inline-flex;
            align-items: center;
            gap: var(--space-2);
            padding: var(--space-3) var(--space-4);
            border: 1px solid var(--color-border-primary);
            border-radius: var(--radius-base);
            background-color: var(--color-white);
            color: var(--color-text-primary);
            font-size: var(--text-sm);
            font-weight: var(--font-medium);
            cursor: pointer;
            transition: all 0.2s ease;
            box-shadow: none;
            text-decoration: none;
            white-space: nowrap;
            margin: 0;
            box-sizing: border-box;
          }
        
          
          /* Hover State */
          .docs-sidebar-btn:hover {
            background-color: var(--color-secondary-50);
            border-color: var(--color-secondary-300);
            color: var(--color-secondary-700);
            transform: translateY(-1px);
          }
          
          /* Active State */
          .docs-sidebar-btn.active {
            background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%);
            border-color: var(--color-secondary-500);
            color: var(--color-secondary-700);
            font-weight: var(--font-semibold);
          }
          
          /* Sidebar Icon */
          .docs-sidebar-icon {
            font-size: var(--text-base);
            color: var(--color-secondary-600);
            flex-shrink: 0;
          }
          
          .docs-sidebar-btn.active .docs-sidebar-icon {
            color: var(--color-secondary-700);
          }
          
          /* Sidebar Text */
          .docs-sidebar-text {
            display: inline-block;
          }
          
          /* Desktop Layout */
          @media (min-width: 1024px) {
            .docs-layout {
              grid-template-columns: 280px 1fr;
              gap: var(--space-8);
            }
            
            .docs-sidebar {
              order: 1;
            }
            
            .docs-content {
              order: 2;
            }
            
            .docs-sidebar-btn {
              width: 100%;
              justify-content: flex-start;
              padding: var(--space-3) var(--space-4);
              flex: none;
            }
          }
          
          /* Tablet Adjustments */
          @media (max-width: 768px) {
            .docs-sidebar-nav {
              flex-direction: row;
              justify-content: space-between;
              align-items: center;
              width: 100%;
              margin: 0;
              list-style: none;
              gap:10px !important;
            }
            
            .docs-sidebar-btn {
              width:fit-content;
              flex-grow: 1;
            }
          }
          `
        )
      )
    ),

    // Code Modal
    CodeModal({
      isOpen: isModalOpen,
      onClose: () => setIsModalOpen(false),
      title: "Code Example",
      subtitle: "Complete implementation example",
      code: modalCode,
      language: "javascript"
    })
  );
}

export default Docs;
