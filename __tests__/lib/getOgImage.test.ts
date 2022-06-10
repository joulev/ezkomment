/**
 * @jest-environment node
 */
import captureWebsite from "capture-website";
import { createHash } from "crypto";
import fs from "fs";

import getOgImage from "@client/lib/client/getOgImage";

jest.mock("capture-website", () => ({
    buffer: jest.fn(async () => Buffer.from("")),
}));

const domain = "example.com";
const correctHash = (title?: string, label?: string) =>
    createHash("sha256").update(`${title}|${label}`).digest("hex");
const correctURL = (title?: string, label?: string) =>
    `https://${domain}/images/og/${correctHash(title, label)}.png`;

const captureOptions = {
    width: 1200,
    height: 630,
    scaleFactor: 1,
    launchOptions: { args: ["--no-sandbox", "--disable-setuid-sandbox"] },
};
const captureURL = "https://ezkomment-67rtb9jff-joulev.vercel.app/opengraph";

describe("Test Opengraph image fetcher", () => {
    const oldEnv = process.env;
    beforeEach(() => {
        jest.resetModules();
        process.env = { ...oldEnv };
    });
    afterEach(() => {
        process.env = oldEnv;
    });

    it("Should not be run except when on Vercel", async () => {
        const temp = await getOgImage({});
        expect(temp).toBe("only run on Vercel");
    });

    it("Should call correct URL to capture", async () => {
        process.env.VERCEL = "hello";
        process.env.VERCEL_URL = "example.com";
        fs.existsSync = jest.fn(() => false);
        captureWebsite.buffer = jest.fn(async () => Buffer.from(""));

        await getOgImage({});
        expect(captureWebsite.buffer).toHaveBeenCalledWith(captureURL, captureOptions);

        await getOgImage({ title: "hello" });
        expect(captureWebsite.buffer).toHaveBeenCalledWith(
            `${captureURL}?title=hello`,
            captureOptions
        );

        await getOgImage({ label: "posts" });
        expect(captureWebsite.buffer).toHaveBeenCalledWith(
            `${captureURL}?label=posts`,
            captureOptions
        );

        await getOgImage({ title: "hello", label: "posts" });
        expect(captureWebsite.buffer).toHaveBeenCalledWith(
            `${captureURL}?title=hello&label=posts`,
            captureOptions
        );
    });

    it("Should write screenshot to file", async () => {
        process.env.VERCEL = "hello";
        process.env.VERCEL_URL = "example.com";
        fs.existsSync = jest.fn(() => false);
        fs.writeFileSync = jest.fn();
        const buffer = Buffer.from("");
        captureWebsite.buffer = jest.fn(async () => buffer);

        await getOgImage({});
        expect(fs.writeFileSync).toHaveBeenCalledWith(
            `./public/images/og/${correctHash()}.png`,
            buffer
        );
    });
});
