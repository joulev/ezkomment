import { config } from "dotenv";

let INITIALIZED = false;
function initializeConfig() {
    if (!INITIALIZED) config();
}

export default initializeConfig;
