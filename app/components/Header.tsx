import { cabin } from "@/public/fonts/font";
import { ReactNode } from "react";

const Header = ():ReactNode => {
    return <div className={`absolute w-screen h-24 bg-[#7879B5] z-10 text-white text-4xl flex items-center p-8 ${cabin.className}`}>zkDocs</div>
}

export default Header;