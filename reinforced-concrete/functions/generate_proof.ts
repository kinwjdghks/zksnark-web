import { baseUrl } from "@/lib/functions/dynamicURL";

export const generateProof = async (url: string) => {
  const proofReq = await fetch(`${baseUrl}/api/proof?url=${url}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const { message, proof, public_ } = await proofReq.json();
  return { proof, public_ };
};
