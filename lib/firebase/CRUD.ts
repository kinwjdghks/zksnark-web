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
import { zkdoc } from "@/template/doc";

const storage = getStorage();
const getCollectionRef = (collectionName: "zkdoc") =>
  collection(db, collectionName);
export const getStorageRef = (refName: string) => ref(storage, refName);

//Create
const storeFile = async (file:File, hash:string):Promise<string|undefined> => {
  try{
    const fileRef = getStorageRef(hash);
    await uploadBytes(fileRef, file, { contentType: file.type });
    return getDownloadURL(fileRef);
  } catch(error) {
    console.error(error);
  }
}

export const createzkDoc = async (title:string, file:File, hash:string):Promise<string|undefined> => {
  const url = await storeFile(file, hash);
  if(!url) return;

  let zkdoc:zkdoc = {
    title: title,
    hash: hash,
    url: url,
    timestamp: new Date()
  }

  try{
    const doc = await addDoc(getCollectionRef("zkdoc"), zkdoc);
    return doc.id;
  } catch (error) {
    console.log(error);
  }
}

//Read


//Delete


