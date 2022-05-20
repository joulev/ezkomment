import initializeExpressApp from "./lib/expressApp";
import firebaseAdmin from "./lib/firebaseAdmin";

console.log("Starting the app...");
initializeExpressApp();

console.log(firebaseAdmin.name);
