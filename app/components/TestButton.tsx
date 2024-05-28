"use client"
import { proof_generator } from "@/reinforced-concrete/functions/generate_proof";
import { ReactNode } from "react";


const TestButton = ():ReactNode => {

    const generate_proof = async () => {
        await proof_generator("exampleDocId");
    }

    return <button onClick={generate_proof}>
        Generate Proof
    </button>
}

export default TestButton;