import { Div, H1, P, Section, Span } from "../../_modules/html.js";

export default function PageHero(blackTitle, gradientTitle, description) {
    return Section(
        { class: "section" },
        Div(
            { class: "container" },
            Div(
                { class: "section-header" },
                H1(
                    { class: "text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6" },
                    blackTitle ? blackTitle : "",
                    gradientTitle ? Span({ class: "heading-gradient-purple-pink" }, gradientTitle) : null
                ),
                description ? P(
                    { class: "text-base md:text-lg lg:text-xl text-secondary max-w-3xl mx-auto leading-relaxed" },
                    description
                ) : null
            )
        )
    );
}