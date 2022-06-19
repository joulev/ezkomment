import { env } from "process";
import { emulators } from "~/firebase.json";

import { generateTestData } from "~/sample/server/generateTestEntities";

/**
 * Run `GENERATE_DATA=true yarn test:server:ci` to generate data.
 * We will use `--import` flag to import data for Firestore Emulator on local device to save some
 * setup time.
 */
if (env.GENERATE_DATA) {
    console.log("Start generating data...");
    generateTestData();
}

/**
 * We need to send a request, as the emulator may run in a different process.
 */
if (Object.keys(env).every(k => !k.includes("EMULATOR_HOST"))) process.exit(1);

env.FIREBASE_AUTH_EMULATOR_HOST = `localhost:${emulators.auth.port}`;
env.FIRESTORE_EMULATOR_HOST = `localhost:${emulators.firestore.port}`;
env.FIREBASE_STORAGE_EMULATOR_HOST = `localhost:${emulators.storage.port}`;

/**
 * Have to wrap this in a async function as top level await is not allowed.
 */
(async function setup() {})();
