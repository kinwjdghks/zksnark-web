import { parseState } from "@/lib/functions/parseState";

export const generateProof = async (url: string) => {

  const proofReq = await fetch(`http://localhost:3000/api/proof?url=${url}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const { message, proof, public_ } = await proofReq.json();
  return { proof, public_ };
};
