import { JSDOM } from "jsdom";

import { EmbedConfigurations } from "~/types/server/nextApi.type";

export default function generateCommentHTML(
    html: string,
    config: EmbedConfigurations,
    isDark?: boolean
) {
    if (typeof window !== "undefined") throw new Error("This function should be ran on the server");
    const dom = new JSDOM(html);
    const document = dom.window.document;
    const script = document.createElement("script");
    script.textContent = `
        import ezkomment from "/v1/js/${
            process.env.NODE_ENV === "production" ? "ezkomment.min.js" : "ezkomment.js"
        }";
        ezkomment(${config});
    `;
    script.setAttribute("type", "module");
    document.head.appendChild(script);
    if (isDark) document.documentElement.classList.add("dark");
    return dom.serialize();
}
