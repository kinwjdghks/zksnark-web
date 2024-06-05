import { ReactNode } from "react";
import DocTable from "./Table";
import { fetchData } from "@/lib/functions/fetchData";

const DocList = async ():Promise<ReactNode> => {
    const docs = await fetchData();
    return <DocTable docs={docs} isLoading={false}/>
}
export default DocList;