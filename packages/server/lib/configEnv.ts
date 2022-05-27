import { config } from "dotenv";

let INITIALIZED = false;

export default function initializeConfig() {
    if (!INITIALIZED) config();
}
