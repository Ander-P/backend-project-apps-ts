import admin from "firebase-admin";
import { initializeApp, cert } from "firebase-admin/app";

const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT;

if (!serviceAccountPath) {
  throw new Error(
    "La ruta al archivo de credenciales de Firebase no está definida en las variables de entorno."
  );
}
initializeApp({
  credential: cert(serviceAccountPath),
});

// admin.initializeApp();

export const sdkAdmin = admin;