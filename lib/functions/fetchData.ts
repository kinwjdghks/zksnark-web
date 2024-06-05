import { zkdoc } from "@/template/doc";
import { getAllzkDocs } from "../firebase/CRUD";
import { saveAs } from "file-saver";

export const fetchData = async () => {
    // console.log("fetch data");
    const data:zkdoc[] = await getAllzkDocs();
    // console.log(data);
    return data;
}

export const downLoadData = async (url: string, fileName: string) => {
    // console.log(url);
    saveAs(url, fileName);
}