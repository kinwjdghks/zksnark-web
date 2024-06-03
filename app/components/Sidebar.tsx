import { ReactNode } from "react";
import UploadPanel from "./UploadPanel";

const Sidebar = ():ReactNode => {

    return <div className="w-60 h-screen items-center border-solid border-[#9b9ccf] border-r-[1px] flex flex-col p-4 pt-12">
        <UploadPanel/>
    </div>
}

export default Sidebar;