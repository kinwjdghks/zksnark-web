export const generateProof = async (docID: string) => {

    const state1 = 51252424195209
    const state2 = 65120471209579

    const proofReq = await fetch(
        `http://localhost:3000/api/proof?state1=${state1}&state2=${state2}`,
        {
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            },
        }
    );
    const { message, proof, public_ } = await proofReq.json();
    return { proof, public_};
}
