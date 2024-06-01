import { zkdoc } from "@/template/doc";
import { getAllzkDocs } from "../firebase/CRUD";

export const fetchData = async () => {
    console.log("fetch data");
    const data:zkdoc[] = await getAllzkDocs();
    console.log(data);
    return data;
}
