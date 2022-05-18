import { config } from "dotenv";
config();

import initializeExpressApp from "./lib/expressApp";

console.log('Starting the app...');
initializeExpressApp();