import { cabin } from "@/public/fonts/font";
import { ReactNode } from "react";
import { FaGithub } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";

const Footer = ():ReactNode => {

    return <div className={`${cabin.className} absolute left-0 bottom-0 bg-[#7879B5] w-screen h-20 flex flex-col justify-center items-center text-white`}>
        <div className="flex flex-col gap-1">
        <div className="flex items-center">
            <FaGithub className="w-6 h-6 mr-6"/>
            <p>wjdghksdl00@gmail.com</p>
        </div>
        <div className="flex items-center">
            <MdOutlineMailOutline className="w-6 h-6 mr-6"/>
            <p>https://github.com/kinwjdghks/zksnark-web</p>
        </div>
        </div>
    </div>
}

export default Footer;