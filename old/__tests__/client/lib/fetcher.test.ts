import { getAuth } from "firebase/auth";

import { NOT_AUTHENTICATED } from "~/old/client/lib/errors";
import { internalFetcher, internalSWRGenerator } from "~/old/client/lib/fetcher";

jest.mock("firebase/auth", () => ({ getAuth: jest.fn() }));

describe("Test internalFetcher", () => {
    const oldEnv = process.env;
    beforeEach(() => {
        jest.resetModules();
        process.env = { ...oldEnv };
    });
    afterEach(() => {
        process.env = oldEnv;
    });

    it("Should throw if not authenticated", async () => {
        // @ts-ignore
        getAuth.mockImplementation(() => ({ currentUser: null }));
        try {
            await internalFetcher({ url: "http://localhost:3000/api/v1/users" });
        } catch (err) {
            expect(err).toEqual(NOT_AUTHENTICATED);
        }
    });

    it("Should send token if authenticated", async () => {
        // @ts-ignore
        getAuth.mockImplementation(() => ({ currentUser: { getIdToken: () => "123" } }));
        // @ts-ignore
        window.fetch = jest.fn(async () => ({ json: async () => ({}) }));
        await internalFetcher({ url: "http://localhost:3000/api/v1/users" });
        expect(window.fetch).toHaveBeenCalledWith(
            "http://localhost:3000/api/v1/users",
            expect.objectContaining({
                headers: expect.objectContaining({ Authorization: "Bearer 123" }),
            })
        );
    });

    it("Should have correct content-type", async () => {
        // @ts-ignore
        getAuth.mockImplementation(() => ({ currentUser: { getIdToken: () => "123" } }));
        // @ts-ignore
        window.fetch = jest.fn(async () => ({ json: async () => ({}) }));
        await internalFetcher({ url: "http://localhost:3000/api/v1/users" });
        expect(window.fetch).toHaveBeenCalledWith(
            "http://localhost:3000/api/v1/users",
            expect.objectContaining({
                headers: expect.objectContaining({ "Content-Type": "application/json" }),
            })
        );

        await internalFetcher({ url: "http://localhost:3000/api/v2/users" }, false);
        expect(window.fetch).not.toHaveBeenCalledWith(
            "http://localhost:3000/api/v2/users",
            expect.objectContaining({
                headers: expect.objectContaining({ "Content-Type": "application/json" }),
            })
        );
    });

    it("Should return data and status code correctly", async () => {
        // @ts-ignore
        getAuth.mockImplementation(() => ({ currentUser: { getIdToken: () => "123" } }));
        // @ts-ignore
        window.fetch = jest.fn(async () => ({
            ok: true,
            status: 200,
            json: async () => ({ data: {} }),
        }));
        const { success, status, body } = await internalFetcher({ url: "any" });
        expect(success).toBe(true);
        expect(status).toBe(200);
        expect(body).toEqual({ data: {} });
    });

    it("Should print to console in dev mode", async () => {
        // @ts-ignore
        getAuth.mockImplementation(() => ({ currentUser: { getIdToken: () => "123" } }));
        // @ts-ignore
        window.fetch = jest.fn(async () => ({
            ok: true,
            status: 200,
            json: async () => ({ data: {} }),
        }));
        // @ts-ignore
        process.env.NODE_ENV = "development";

        console.log = jest.fn();
        await internalFetcher({ url: "any", options: { headers: { a: "123" } } });
        expect(console.log).toHaveBeenCalledWith({
            url: "any",
            options: { headers: { a: "123" } },
        });
        expect(console.log).toHaveBeenCalledWith({ data: {} });
    });
});

describe("Test internalSWRGenerator", () => {
    beforeAll(() => {
        // @ts-ignore
        getAuth.mockImplementation(() => ({ currentUser: { getIdToken: () => "123" } }));
        // @ts-ignore
        window.fetch = jest.fn(async () => ({
            ok: true,
            status: 200,
            json: async () => ({ data: { a: 1 } }),
        }));
    });
    it("Should return data correctly", async () => {
        const data = await internalSWRGenerator()("any");
        expect(data).toEqual({ a: 1 });
    });

    it("Should allow options", async () => {
        await internalSWRGenerator()({
            url: "any",
            options: { headers: { a: "123" } },
        });
        expect(window.fetch).toHaveBeenCalledWith("any", {
            method: "GET",
            headers: expect.objectContaining({ a: "123" }),
        });
    });

    it("Should throw if fetch fails", async () => {
        // @ts-ignore
        window.fetch = jest.fn(async () => ({
            ok: false,
            status: 500,
            json: async () => ({ error: "Server crashed" }),
        }));

        try {
            await internalSWRGenerator()("any");
            expect(true).toBe(false);
        } catch (err) {}
    });
});
