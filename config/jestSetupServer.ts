import { env } from "process";
import { emulators } from "~/firebase.json";

/**
 * Run `GENERATE_DATA=true yarn test:server:ci` to generate data.
 * We will use `--import` flag to import data for Firestore Emulator on local device to save some
 * setup time.
 */
if (env.GENERATE_DATA) {
    const { generateTestData } = require("~/sample/server/generateTestEntities");
    console.log("Start generating data...");
    generateTestData();
}

beforeAll(async () => {
    try {
        console.log("Check for emulator...");
        const response = await fetch("http://localhost:4400/emulators", { method: "GET" });
        if (!response.ok) {
            console.log("Something is wrong...");
            process.exit(1);
        }
    } catch (err) {
        console.log(`Emulator is not running at the moment? ${String(err)}`);
        process.exit(1);
    }
    /**
     * Setup env variables to connect to the emulator.
     */
    env.FIREBASE_AUTH_EMULATOR_HOST = `localhost:${emulators.auth.port}`;
    env.FIRESTORE_EMULATOR_HOST = `localhost:${emulators.firestore.port}`;
    env.FIREBASE_STORAGE_EMULATOR_HOST = `localhost:${emulators.storage.port}`;
    env.NEXT_PUBLIC_FIREBASE_PROJECT_ID = "example-project";
});

beforeAll(async () => {
    try {
        console.log("Start importing data...");
        /**
         * Import functions to import data into the emulator.
         */
        const { importComments } = require("~/server/utils/crud/commentUtils");
        const { importPages } = require("~/server/utils/crud/pageUtils");
        const { importSites } = require("~/server/utils/crud/siteUtils");
        const { importUsers } = require("~/server/utils/crud/userUtils");
        /**
         * Sample data
         */
        const sampleComments = require("~/sample/server/comments.json");
        const samplePages = require("~/sample/server/pages.json");
        const sampleSites = require("~/sample/server/sites.json");
        const sampleUsers = require("~/sample/server/users.json");

        await Promise.all([
            importUsers(sampleUsers),
            importSites(sampleSites),
            importPages(samplePages),
            importComments(sampleComments as any[]),
        ]);
    } catch (err) {
        console.log("Error while setting up data. Maybe the data has been imported already?");
    }
}, 10000);
