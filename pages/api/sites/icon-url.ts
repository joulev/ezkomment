import { NextRequest } from "next/server";

export const config = {
    runtime: "experimental-edge",
};

async function getUrl(domain: string) {
    const tryURLs = [
        `https://${domain}/apple-touch-icon.png`,
        `https://${domain}/images/apple-touch-icon.png`,
        `https://${domain}/img/apple-touch-icon.png`,
        `http://${domain}/apple-touch-icon.png`,
        `http://${domain}/images/apple-touch-icon.png`,
        `http://${domain}/img/apple-touch-icon.png`,
    ];
    for (const url of tryURLs) {
        const tryRes = await fetch(url);
        if (tryRes.status === 200) return url;
    }
    return "none";
}

export default async function handler(req: NextRequest) {
    const { domain } = await req.json();
    const url = await getUrl(domain);
    return new Response(JSON.stringify({ url }), {
        status: url === "none" ? 404 : 200,
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "public, s-maxage=86400, stale-while-revalidate",
        },
    });
}
