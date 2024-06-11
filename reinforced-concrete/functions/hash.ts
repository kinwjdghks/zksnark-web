import { baseUrl } from "@/lib/functions/dynamicURL";

export const getHash = async () => {
  const hashReq = await fetch(`${baseUrl}/api/hash`, {
    cache: "no-store",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },

  });
  const { message, hash } = await hashReq.json();
  // console.log("message: ", message);
  // console.log("hash:",hash);
  return message == "hash failed." ? null : hash;
};
