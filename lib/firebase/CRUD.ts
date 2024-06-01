import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  increment,
  Timestamp,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { db } from "./firebase.config";
import { zkdoc } from "@/template/doc";

const storage = getStorage();
const getCollectionRef = (collectionName: "zkdoc") =>
  collection(db, collectionName);
export const getStorageRef = (refName: string) => ref(storage, refName);

//Create
export const storeFile = async (file:File, fileName:string):Promise<string|undefined> => {
  try{
    const fileRef = getStorageRef(fileName);
    await uploadBytes(fileRef, file, { contentType: file.type });
    return await getDownloadURL(fileRef);
  } catch(error) {
    console.error(error);
  }
}

export const createzkDoc = async (title:string, file:File, url:string, hash:string):Promise<string|undefined> => {
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
export const getAllzkDocs = async ():Promise<zkdoc[]> => {
  const docs = await getDocs(getCollectionRef("zkdoc"));

  const docList:zkdoc[] = docs.docs.map(doc => {
    return {
      title: doc.data().title,
      timestamp: (doc.data().timestamp as Timestamp).toDate(),
      hash: doc.data().hash,
      url: ""
  }});
  // console.log(docList);
  return docList;
}


//Delete


