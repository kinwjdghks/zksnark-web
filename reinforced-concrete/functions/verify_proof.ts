import { zkdoc } from "@/template/doc";

async function verify_proof(doc: zkdoc, proof: string) {
    
    const verifyReq = await fetch(
        `http://localhost:3000/api/verify`,
        {
            method:"POST",
            body: JSON.stringify({
                proof: proof,
                public: doc.public
            }),
            headers:{
                "Content-Type":"application/json"
            }
        }
    );
    const { message } = await verifyReq.json();
    return proof;
}
