import chrome from "chrome-aws-lambda";
import { createHash } from "crypto";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import core from "puppeteer-core";
import { renderToStaticMarkup } from "react-dom/server";

import OgImage from "@client/components/opengraph";

import { OgImageProps } from "@client/types/components.type";

export default async function getOgImage({ title, label }: OgImageProps) {
  if (!process.env.VERCEL) return "only run on Vercel";
  if (typeof window !== "undefined")
    throw new Error("getOgImage should only be called in the server");

  const hash = createHash("sha256").update(`${title}|${label}`).digest("hex");
  const dir = `./public/images/og`;
  const filePath = `${dir}/${hash}.png`;
  const publicPath = `https://ezkomment.joulev.dev/images/og/${hash}.png`;

  const html = renderToStaticMarkup(<OgImage title={title} label={label} />);

  if (existsSync(filePath)) return publicPath;

  const browser = await core.launch({
    args: chrome.args,
    executablePath: await chrome.executablePath,
    headless: chrome.headless,
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630 });
  await page.setContent(html);
  const buffer = await page.screenshot({ type: "png" });
  await browser.close();

  mkdirSync(dir, { recursive: true });
  writeFileSync(filePath, buffer);
  return publicPath;
}
