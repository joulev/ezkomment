import { JSDOM } from "jsdom";

export default function generateCommentHTML(html: string, apiURL: string, isDark?: boolean) {
    if (typeof window !== "undefined") throw new Error("This function should be ran on the server");
    const dom = new JSDOM(html);
    const document = dom.window.document;
    const script = document.createElement("script");
    script.textContent = `import ezkomment from "/v1/js/${
        process.env.NODE_ENV === "production" ? "ezkomment.min.js" : "ezkomment.js"
    }";ezkomment("${apiURL}");`;
    script.setAttribute("type", "module");
    document.head.appendChild(script);
    if (isDark) document.documentElement.classList.add("dark");
    return dom.serialize();
}
