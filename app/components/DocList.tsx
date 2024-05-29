import { ReactNode, useEffect, useState } from "react";
import DocTable from "./Table";
import { dummyDocs } from "@/template/doc";

const DocList = async () => {
    const [isLoading,setIsLoading] = useState(true);
    const docs = await fetchData();
    useEffect(() => {
        setIsLoading(false);
    },[docs])

    return <DocTable docs={dummyDocs} isLoading={isLoading}/>
}

export default DocList;

async function fetchData() {
    return await getZKDocs();
}