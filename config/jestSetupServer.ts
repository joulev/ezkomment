import { env } from "process";

/**
 * Run `GENERATE_DATA=true yarn test:server:ci` to generate data.
 * We will use `--import` flag to import data for Firestore Emulator on local device to save some
 * setup time.
 */
if (env.GENERATE_DATA) {
    console.log("Start generating data...");
    require("~/config/generateTestEntities").generateTestData();
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
});
