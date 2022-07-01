import * as admin from "firebase-admin";
import { cert, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

const firebaseAdmin = admin.apps.length
    ? admin.app()
    : initializeApp(
          process.env.NODE_ENV === "test"
              ? { projectId: "demo-proj", storageBucket: "demo-proj.appspot.com" }
              : {
                    credential: cert({
                        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
                        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                        privateKey: process.env.FIREBASE_PRIVATE_KEY,
                    }),
                    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
                }
      );

const firestoreAdmin = getFirestore(firebaseAdmin);
const authAdmin = getAuth(firebaseAdmin);
const bucketAdmin = getStorage(firebaseAdmin).bucket();

export { firestoreAdmin, authAdmin, bucketAdmin };
