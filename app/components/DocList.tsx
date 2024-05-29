import { ReactNode } from "react";
import DocTable from "./Table";
import { dummyDocs } from "@/template/doc";

const DocList = async () => {
    // const [isLoading,setIsLoading] = useState(true);
    // const docs = await fetchData();
    const docs = dummyDocs;
    // useEffect(() => {
    //     setIsLoading(false);
    // },[docs])

    return <DocTable docs={docs} isLoading={false}/>
}


async function fetchData() {
    // return await getZKDocs();
}

export default DocList;