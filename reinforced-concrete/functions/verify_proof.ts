import { baseUrl } from "@/lib/functions/dynamicURL";
import { zkdoc } from "@/template/doc";

export async function verify_proof(doc: zkdoc, proof: string) {

    const verifyReq = await fetch(
        `${baseUrl}/api/verify`,
        {
            method:"POST",
            body: JSON.stringify({
                proof: proof,
                public_: doc.hash
            }),
            headers:{
                "Content-Type":"application/json"
            }
        }
    );
    const { message, success } = await verifyReq.json();
    return success == "true";
}
