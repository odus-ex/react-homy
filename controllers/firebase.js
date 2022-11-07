import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FB_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FB_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FB_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FB_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FB_MSG_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FB_APP_ID,
};

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

export async function createCollection(nameOfCollection) {
  return await collection(database, nameOfCollection);
}

export async function addToCollection(nameOfCollection, jsonData) {
  const docRef = doc(database, nameOfCollection, jsonData.id);
  return await setDoc(docRef, jsonData);
}

export async function getAllDocuments(nameOfCollection) {
  let dbRef = collection(database, nameOfCollection);
  const dbSnapshot = await getDocs(dbRef);
  return dbSnapshot.docs.map((doc) => doc.data());
}

export async function deleteDocument(nameOfColletion, addressId) {
  return await deleteDoc(doc(database, nameOfColletion, addressId));
}
