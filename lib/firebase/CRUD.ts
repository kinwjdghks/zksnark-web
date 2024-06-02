import {
  collection,
  getDocs,
  addDoc,
  doc,
  Timestamp,
  deleteDoc
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes, deleteObject } from "firebase/storage";
import { db } from "./firebase.config";
import { zkdoc } from "@/template/doc";

const storage = getStorage();
const getCollectionRef = (collectionName: "zkdoc") => collection(db, collectionName);
const getDocRef = (id: string) => doc(db, "zkdoc", id);
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

export const createzkDoc = async (title:string, url:string, hash:string, public_: string):Promise<string|undefined> => {
  let zkdoc:zkdoc = {
    title: title,
    hash: hash,
    url: url,
    timestamp: new Date(),
    public: public_,
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
      id: doc.id,
      title: doc.data().title,
      timestamp: (doc.data().timestamp as Timestamp).toDate(),
      hash: doc.data().hash,
      url: doc.data().url,
      public: doc.data().public
  }});
  // console.log(docList);
  return docList;
}


//Delete
export const deletezkDoc = async (id: string) => await deleteDoc(getDocRef(id));

export const deleteFile = async (refName: string) => await deleteObject(getStorageRef(refName));


