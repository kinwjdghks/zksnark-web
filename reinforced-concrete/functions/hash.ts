import { baseUrl } from "@/lib/functions/dynamicURL";

export const getHash = async () => {
  const hashReq = await fetch(`${baseUrl}/api/hash`, {
    cache: "no-store", //essential for getting different outputs
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },

  });
  const { message, hash } = await hashReq.json();
  return message == "hash failed." ? null : hash;
};
