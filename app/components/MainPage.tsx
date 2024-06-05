import { ReactNode } from "react";
import DocList from "./DocList";

const MainPage = ():ReactNode => {
    return <div className="items-center justify-center flex-grow h-full py-8 px-16">
        {/* @ts-expect-error Server Component */}
        <DocList/>
    </div>
}

export default MainPage;