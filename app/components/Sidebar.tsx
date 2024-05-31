import { ReactNode } from "react";
import UploadPanel from "./UploadPanel";

const Sidebar = ():ReactNode => {

    return <div className="w-60 h-screen items-center border-solid border-[#bcbcbc] border-r-[1px] flex flex-col p-4">
        <h1 className="text-3xl">ZK Docs</h1>
        <UploadPanel/>
    </div>
}

export default Sidebar;