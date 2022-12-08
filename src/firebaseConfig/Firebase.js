import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyCki0PQR8bI-zFIBHt-HN831i1qrqjJuAw",
//   authDomain: "ecom-3cd0e.firebaseapp.com",
//   projectId: "ecom-3cd0e",
//   storageBucket: "ecom-3cd0e.appspot.com",
//   messagingSenderId: "56588093771",
//   appId: "1:56588093771:web:4544c5088596690e0f80ce",
// };

const firebaseConfig = {
  apiKey: "AIzaSyABJzzsow_GBAFPecBrQtkbRAGf_Iyc1qc",
  authDomain: "ecom-firebase-768db.firebaseapp.com",
  projectId: "ecom-firebase-768db",
  storageBucket: "ecom-firebase-768db.appspot.com",
  messagingSenderId: "22358072679",
  appId: "1:22358072679:web:2d5a4ffffebc751abfa3c2",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const storage = getStorage(app);
export const auth = getAuth(app);
