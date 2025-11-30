import Config from "../../app/config/config.js";
import { useState, useEffect } from "../../_modules/hooks.js";
import {
    A,
    Div,
    Footer,
    Header,
    Main,
    Nav,
    Button,
    Ul,
    Li,
    Span,
    P,
    H3,
    H4,
    Input,
    I,
} from "../../_modules/html.js";
import { requests } from "../../_modules/requests.js";
import time from "../../_modules/time.js";
import { followUsLinks } from "../../constants/links.js";
import { communityStats } from "../../constants/stats.js";

function MainLayout(...children) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [currentPath, setCurrentPath] = useState(requests.pathname());
    const [isScrolled, setIsScrolled] = useState(false);

    function toggleMobileMenu() {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    }

    return Div(
        { class: "layout-container" },
        // Header Section
        Header(
            { class: `header ${isScrolled ? 'scrolled' : ''}` },
            Div(
                { class: "header-container" },
                // Logo Section
                A(
                    { href: requests.url("/"), class: "logo", "aria-label": "BABLOJS Home" },
                    Span({ class: "logo-icon", "aria-hidden": "true" }, "🚀"),
                    Span({ class: "logo-text" }, Config.app.name)
                ),

                // Navigation Section
                Nav(
                    {
                        class: `nav ${isMobileMenuOpen ? 'mobile-open' : ''}`,
                        role: "navigation",
                        "aria-label": "Main navigation",
                        id: "main-navigation"
                    },
                    A({
                        href: requests.url("/"),
                        class: `nav-link ${currentPath === "/" || currentPath.endsWith("/") ? 'active' : ''}`,
                        "aria-current": (currentPath === "/" || currentPath.endsWith("/")) ? "page" : undefined,
                        onclick: () => setIsMobileMenuOpen(false)
                    }, "Home"),
                    A({
                        href: requests.url("/about"),
                        class: `nav-link ${currentPath.includes("/about") ? 'active' : ''}`,
                        "aria-current": currentPath.includes("/about") ? "page" : undefined,
                        onclick: () => setIsMobileMenuOpen(false)
                    }, "About"),
                    A({
                        href: requests.url("/contact"),
                        class: `nav-link ${currentPath.includes("/contact") ? 'active' : ''}`,
                        "aria-current": currentPath.includes("/contact") ? "page" : undefined,
                        onclick: () => setIsMobileMenuOpen(false)
                    }, "Contact"),
                    A({
                        href: requests.url("/docs"),
                        class: `nav-link ${currentPath.includes("/docs") ? 'active' : ''}`,
                        "aria-current": currentPath.includes("/docs") ? "page" : undefined,
                        onclick: () => setIsMobileMenuOpen(false)
                    }, "Docs"),
                    A({
                        href: requests.url("/demo"),
                        class: `nav-link nav-link-demo ${currentPath.includes("/demo") ? 'active' : ''}`,
                        "aria-current": currentPath.includes("/demo") ? "page" : undefined,
                        onclick: () => setIsMobileMenuOpen(false)
                    }, "Try Demo")
                ),

                // Mobile Menu Button
                Button(
                    {
                        class: `hamburger ${isMobileMenuOpen ? 'active' : ''}`,
                        onclick: toggleMobileMenu,
                        "aria-label": isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu",
                        "aria-expanded": isMobileMenuOpen,
                        "aria-controls": "main-navigation"
                    },
                    Span({ class: "hamburger-line" }),
                    Span({ class: "hamburger-line" }),
                    Span({ class: "hamburger-line" })
                )
            ),
            // Mobile Menu Overlay
            isMobileMenuOpen ? Div(
                {
                    class: "mobile-menu-overlay",
                    onclick: toggleMobileMenu
                }
            ) : null
        ),

        // Main Content Area
        Main({ class: "main" }, ...children),

        // Footer Section
        Footer(
            { class: "footer" },
            Div(
                { class: "container" },
                // Main Footer Content
                Div(
                    { class: "footer-content" },
                    // Brand Section
                    Div(
                        { class: "footer-section" },
                        Div(
                            { class: "flex items-center gap-2 mb-4" },
                            Span({ class: "logo-icon" }, "🚀"),
                            Span({ class: "logo-text" }, Config.app.name)
                        ),
                        P(
                            { class: "mb-6 text-left" },
                            "A modern, lightweight JavaScript framework for building fast and responsive web applications. " +
                            "Simple, powerful, and developer-friendly."
                        ),
                        // Community Section
                        Div(
                            { class: "footer-community" },
                            H3({ class: "footer-section-title" }, "Community"),
                            Div(
                                { class: "footer-community-stats" },
                                Div(
                                    { class: "community-stat-item" },
                                    Span(
                                        { class: "community-stat-value" },
                                        communityStats.TOTAL_PROJECTS >= 1000
                                            ? (communityStats.TOTAL_PROJECTS / 1000).toFixed(1) + "K"
                                            : communityStats.TOTAL_PROJECTS + "+"
                                    ),
                                    Span({ class: "community-stat-label" }, "Projects")
                                ),
                                Div(
                                    { class: "community-stat-item" },
                                    Span(
                                        { class: "community-stat-value" },
                                        communityStats.TOTAL_USERS >= 1000
                                            ? (communityStats.TOTAL_USERS / 1000).toFixed(1) + "K"
                                            : communityStats.TOTAL_USERS + "+"
                                    ),
                                    Span({ class: "community-stat-label" }, "Developers")
                                ),
                                Div(
                                    { class: "community-stat-item" },
                                    Span(
                                        { class: "community-stat-value" },
                                        communityStats.TOTAL_CONTRIBUTORS + "+"
                                    ),
                                    Span({ class: "community-stat-label" }, "Contributors")
                                )
                            )
                        )
                    ),

                    // Quick Links Section
                    Div(
                        { class: "footer-section" },
                        H3({ class: "footer-section-title" }, "Quick Links"),
                        Ul(
                            { class: "footer-links" },
                            Li(
                                { class: "footer-item" },
                                A({ href: requests.url("/"), class: "footer-link" }, "Home")
                            ),
                            Li(
                                { class: "footer-item" },
                                A({ href: requests.url("/about"), class: "footer-link" }, "About")
                            ),
                            Li(
                                { class: "footer-item" },
                                A({ href: requests.url("/docs"), class: "footer-link" }, "Documentation")
                            ),
                            Li(
                                { class: "footer-item" },
                                A({ href: requests.url("/demo"), class: "footer-link" }, "Live Demo")
                            ),
                            Li(
                                { class: "footer-item" },
                                A({ href: requests.url("/contact"), class: "footer-link" }, "Contact")
                            )
                        )
                    ),

                    // Resources Section
                    Div(
                        { class: "footer-section" },
                        H3({ class: "footer-section-title" }, "Resources"),
                        Ul(
                            { class: "footer-links" },
                            Li(
                                { class: "footer-item" },
                                A(
                                    {
                                        href: requests.url("/docs?tab=getting-started"),
                                        class: "footer-link",
                                        title: "Get started with BABLOJS - Installation and setup guide"
                                    },
                                    "Getting Started"
                                )
                            ),
                            Li(
                                { class: "footer-item" },
                                A(
                                    {
                                        href: requests.url("/docs?tab=installation"),
                                        class: "footer-link",
                                        title: "Installation guide and project setup"
                                    },
                                    "Installation"
                                )
                            ),
                            Li(
                                { class: "footer-item" },
                                A(
                                    {
                                        href: requests.url("/docs?tab=api"),
                                        class: "footer-link",
                                        title: "Complete API reference documentation"
                                    },
                                    "API Reference"
                                )
                            ),
                            Li(
                                { class: "footer-item" },
                                A(
                                    {
                                        href: requests.url("/docs?tab=examples"),
                                        class: "footer-link",
                                        title: "Code examples and practical tutorials"
                                    },
                                    "Examples"
                                )
                            ),
                            Li(
                                { class: "footer-item" },
                                A(
                                    {
                                        href: requests.url("/docs?tab=routing"),
                                        class: "footer-link",
                                        title: "Routing and navigation guides"
                                    },
                                    "Routing Guide"
                                )
                            ),
                            Li(
                                { class: "footer-item" },
                                A(
                                    {
                                        href: requests.url("/docs?tab=components"),
                                        class: "footer-link",
                                        title: "Component architecture and patterns"
                                    },
                                    "Components"
                                )
                            ),
                            Li(
                                { class: "footer-item" },
                                A(
                                    {
                                        href: requests.url("/faq"),
                                        class: "footer-link",
                                        title: "Frequently asked questions"
                                    },
                                    "FAQ"
                                )
                            )
                        )
                    ),

                    // Stay Updated Section
                    Div(
                        { class: "footer-section" },
                        Div(
                            { class: "stay-updated" },
                            H3({ class: "footer-section-title mb-4" }, "Stay Updated"),
                            P(
                                { class: "mb-4 text-left" },
                                "Follow us on social media to get the latest updates, tutorials, and community news."
                            ),
                            Div(
                                { class: "footer-social" },
                                Ul(
                                    { class: "flex gap-4", style: "display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;" },
                                    followUsLinks.map((link) => {
                                        return Li(
                                            { class: "social-item" },
                                            A(
                                                {

                                                    
                                                    href: link.url,
                                                    class: "footer-link flex items-center gap-2",
                                                    target: "_blank",
                                                    rel: "noopener noreferrer",
                                                    "aria-label": `Follow us on ${link.name}`
                                                },
                                                link.name === "X-Twitter" && link.customIcon
                                                    ? Span(
                                                        {
                                                            class: "x-icon",
                                                            style: "display: inline-block; font-weight: 900; font-size: 1.1rem; line-height: 1;"
                                                        },
                                                        "X"
                                                    )
                                                    : I({
                                                        class: link.icon,
                                                        style: "font-size: 1.25rem;"
                                                    }),
                                                Span({ class: "social-name" }, link.name)
                                            )
                                        )
                                    })
                                )
                            )
                        )
                    )
                ),

                // Footer Bottom
                Div(
                    { class: "footer-bottom" },
                    Div(
                        { class: "flex justify-between items-center" },
                        P(
                            { class: "copyright" },
                            "© " + time.year() + " " + Config.app.name + ". Made with ",
                            Span({ class: "heart" }, "❤️"),
                            " by developers, for developers."
                        ),
                        Div(
                            { class: "flex gap-4" },
                            A(
                                { href: requests.url("/privacy"), class: "footer-link" },
                                "Privacy Policy"
                            ),
                            A(
                                { href: requests.url("/terms"), class: "footer-link" },
                                "Terms of Service"
                            ),
                            A({ href: requests.url("/license"), class: "footer-link" }, "License")
                        )
                    )
                )
            )
        )
    );
}

export default MainLayout;
