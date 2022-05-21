import { applicationDefault, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

import initializeConfig from "./configEnv";

initializeConfig();

const firebaseAdmin = initializeApp({
    credential: applicationDefault(),
});

const firestoreAdmin = getFirestore(firebaseAdmin);

export default firestoreAdmin;
