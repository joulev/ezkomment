import * as admin from "firebase-admin";
import { cert, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const serviceAccount = {
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
};

const firebaseAdmin = admin.apps.length
    ? admin.app()
    : initializeApp({
          credential: cert(serviceAccount),
      });

const firestoreAdmin = getFirestore(firebaseAdmin);
const authAdmin = getAuth(firebaseAdmin);

export { firestoreAdmin, authAdmin };
