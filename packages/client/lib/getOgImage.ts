import captureWebsite from "capture-website";
import { createHash } from "crypto";
import { mkdirSync, writeFileSync } from "fs";

import { OgImageProps } from "@client/types/components.type";

export default async function getOgImage({ title, label }: OgImageProps) {
    if (!process.env.VERCEL) return "only run on Vercel";

    const hash = createHash("sha256").update(`${title}|${label}`).digest("hex");
    const dir = `./public/images/og`;
    const filePath = `${dir}/${hash}.png`;
    const publicPath = `https://${process.env.VERCEL_URL}/images/og/${hash}.png`;

    const url = new URL("https://ezkomment-67rtb9jff-joulev.vercel.app/opengraph");
    if (title) url.searchParams.append("title", title);
    if (label) url.searchParams.append("label", label);

    const buffer = await captureWebsite.buffer(url.href, {
        width: 1200,
        height: 630,
        scaleFactor: 1,
        // https://github.com/sindresorhus/capture-website#im-getting-a-sandbox-related-error
        launchOptions: { args: ["--no-sandbox", "--disable-setuid-sandbox"] },
    });

    mkdirSync(dir, { recursive: true });
    writeFileSync(filePath, buffer);
    return publicPath;
}
