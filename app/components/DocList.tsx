import { ReactNode } from "react";
import DocTable from "./Table";
import { dummyDocs, zkdoc } from "@/template/doc";
import { getAllzkDocs } from "@/lib/firebase/CRUD";
import { fetchData } from "@/lib/functions/fetchData";

const DocList = async ():Promise<ReactNode> => {
    const fetchData_ = () => fetchData();
    // const docs = await fetchData();
    const docs = dummyDocs
    return <DocTable docs={docs} isLoading={false}/>
}



export default DocList;