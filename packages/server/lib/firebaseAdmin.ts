import * as admin from "firebase-admin";
import { applicationDefault, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

import initializeConfig from "./configEnv";

initializeConfig();

const firebaseAdmin = admin.apps.length
    ? admin.app()
    : initializeApp({
          credential: applicationDefault(),
      });

const firestoreAdmin = getFirestore(firebaseAdmin);
const authAdmin = getAuth(firebaseAdmin);

export { firestoreAdmin, authAdmin };
