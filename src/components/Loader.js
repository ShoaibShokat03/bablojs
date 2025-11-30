import { Div } from "../_modules/html.js";

const LoaderComponent = () => {
    return Div(
        {
            className: "bablo-loader"
        },
        // Hamburger menu icon in top right
        Div(
            {
                className: "bablo-loader-hamburger"
            },
            Div({ className: "bablo-loader-hamburger-line" }),
            Div({ className: "bablo-loader-hamburger-line" }),
            Div({ className: "bablo-loader-hamburger-line" })
        ),
        // Main logo container
        Div(
            {
                className: "bablo-loader-logo-container"
            },
            // Rocket icon
            Div({
                className: "bablo-loader-rocket",
                dangerouslySetInnerHTML: {
                    __html: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2.5C12 2.5 8 7 8 11C8 12.5 9.5 14 12 14C14.5 14 16 12.5 16 11C16 7 12 2.5 12 2.5Z" fill="url(#rocket-body)"/>
              <path d="M10 11C10 11.5 10.5 12 11 12C11.5 12 12 11.5 12 11C12 10.5 11.5 10 11 10C10.5 10 10 10.5 10 11Z" fill="url(#rocket-window)"/>
              <path d="M9 15L8 20L12 18L16 20L15 15L12 16L9 15Z" fill="url(#rocket-flame)"/>
              <path d="M10 13L9 15L12 16L15 15L14 13L12 14L10 13Z" fill="url(#rocket-flame-light)"/>
              <defs>
                <linearGradient id="rocket-body" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style="stop-color:#9333ea;stop-opacity:1" />
                  <stop offset="100%" style="stop-color:#7c3aed;stop-opacity:1" />
                </linearGradient>
                <linearGradient id="rocket-flame" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style="stop-color:#ec4899;stop-opacity:1" />
                  <stop offset="100%" style="stop-color:#db2777;stop-opacity:1" />
                </linearGradient>
                <linearGradient id="rocket-flame-light" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style="stop-color:#f472b6;stop-opacity:1" />
                  <stop offset="100%" style="stop-color:#ec4899;stop-opacity:1" />
                </linearGradient>
                <linearGradient id="rocket-window" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style="stop-color:#e9d5ff;stop-opacity:1" />
                  <stop offset="100%" style="stop-color:#fbcfe8;stop-opacity:1" />
                </linearGradient>
              </defs>
            </svg>`
                }
            }),
            // BABLOJS text with gradient
            Div(
                {
                    className: "bablo-loader-text"
                },
                Div(
                    {
                        className: "bablo-loader-text-bablo"
                    },
                    "BABLO"
                ),
                Div(
                    {
                        className: "bablo-loader-text-js"
                    },
                    "JS"
                )
            )
        ),
        // Keyframes for any future animations
        Div({
            style: `display: none;`
        },
        /*language=css*/`
        <style>
        @keyframes bablo-spin {
          to { transform: rotate(360deg); }
        }
        </style>
        `
        )
    );
};
export default LoaderComponent;