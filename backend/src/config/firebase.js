import admin from "firebase-admin";

/*
  Initialize Firebase Admin using
  Application Default Credentials (ADC)
*/

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

const db = admin.firestore();
const auth = admin.auth();

export { db, auth };