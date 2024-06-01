import { ReactNode } from "react";
import DocList from "./DocList";

const MainPage = ():ReactNode => {
    return <div className="items-center justify-center flex-grow h-full p-24">
        {/* @ts-expect-error Server Component */}
        <DocList/>
    </div>
}

export default MainPage;