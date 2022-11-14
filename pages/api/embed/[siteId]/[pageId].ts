import { NextRequest } from "next/server";
import getAccessToken from "~/server/utils/google-auth";

export const config = { runtime: "experimental-edge" };

type EmbedConfig = {
    pageId: string;
    getURL: string;
    postURL: string;
};

async function getTemplate(siteId: string, token: string): Promise<string> {
    const url = `https://firestore.googleapis.com/v1/projects/ezkomment-dev/databases/(default)/documents/sites/${siteId}/customisation/CUSTOMISATION`;
    const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
    if (res.status === 200)
        return await res.json().then(data => data.fields.customisation.stringValue);
    return await import("~/templates/default.html").then(m => m.default);
}

async function getDomain(siteId: string, token: string): Promise<string> {
    const url = `https://firestore.googleapis.com/v1/projects/ezkomment-dev/databases/(default)/documents/sites/${siteId}`;
    const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
    if (res.status === 200) return await res.json().then(data => data.fields.domain.stringValue);
    throw new Error("Site not found");
}

/**
 * Cannot use JSDOM because this will be ran on the edge, which JSDOM does not support. Hence, this
 * function is not perfect – it's pretty easy to produce fail cases. But it's good for the average
 * HTML – would you pass anything to the <html> class list anyway?
 */
function generateCommentHTML(rawHtml: string, config: EmbedConfig, dark?: boolean) {
    let html = rawHtml;

    const scriptContent = `
        import ezkomment from "/js/${
            process.env.NODE_ENV === "production" ? "ezkomment.min.js" : "ezkomment.js"
        }";
        ezkomment(${JSON.stringify(config)});
    `;
    const script = `<script type="module">${scriptContent}</script>`;
    const bodyEnd = html.lastIndexOf("</body>");
    html = html.slice(0, bodyEnd) + script + html.slice(bodyEnd);

    // best effort, no sane man would add another class to html anyway
    if (dark) html = html.replace("<html", '<html class="dark"');

    return html;
}

function getRequestInfo(url: string) {
    const params = new URL(url).searchParams;
    return {
        siteId: params.get("siteId")!,
        pageId: params.get("pageId")!,
        isDark: params.get("dark") !== null,
    };
}

export default async function handler(req: NextRequest) {
    try {
        const token = await getAccessToken();
        const { siteId, pageId, isDark } = getRequestInfo(req.url);
        const config: EmbedConfig = {
            pageId,
            getURL: `/api/pages/${pageId}/comments`,
            postURL: `/api/comments`,
        };
        const domain = await getDomain(siteId, token);
        const template = await getTemplate(siteId, token);
        const generatedHTML = generateCommentHTML(template, config, isDark);

        const htmlHdr = { "Content-Type": "text/html; charset=utf-8" };
        const securityHdr = {
            "Content-Security-Policy": `frame-ancestors http://localhost:* ${domain}`,
        };

        if (domain === "*") return new Response(generatedHTML, { status: 200, headers: htmlHdr });

        return new Response(generatedHTML, {
            status: 200,
            headers: { ...htmlHdr, ...securityHdr },
        });
    } catch (e) {
        return new Response("Something's wrong has happened", { status: 500 });
    }
}
