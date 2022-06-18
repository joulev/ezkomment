import { env } from "process";

/**
 * First, we have to ensure that the tests are only run in the emulator.
 */
if (Object.keys(env).every(k => !k.includes("EMULATOR_HOST"))) process.exit(1);
