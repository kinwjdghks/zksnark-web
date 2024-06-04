import { zkdoc } from "@/template/doc";
import { deleteFile, deletezkDoc } from "../firebase/CRUD";
import { getFileName } from "./fileName";

export const deleteData = async (doc:zkdoc) => {
    await deletezkDoc(doc.id!);
    await deleteFile(getFileName(doc.timestamp, doc.title));
}