import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  increment,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { db } from "./firebase.config";

const storage = getStorage();
const getCollection = (collectionName: "notices" | "reception" | "test") =>
  collection(db, collectionName);
export const getStorageRef = (refName: string) => ref(storage, refName);

//Create


//Read

//Update

//Delete


