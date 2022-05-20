import { applicationDefault, initializeApp } from "firebase-admin/app";

import initializeConfig from "./configEnv";

initializeConfig();

const firebaseAdmin = initializeApp({
    credential: applicationDefault(),
});

export default firebaseAdmin;
