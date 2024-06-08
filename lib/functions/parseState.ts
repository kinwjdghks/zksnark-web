import { MAX_ROUND } from "@/reinforced-concrete/constants/maxround";

export const BITRATE = 508;
export const BITRATEh = 254;

export const parseState = (buffer: ArrayBuffer) => {
  let binaryString = "";
  const byteArray = new Uint8Array(buffer);
  for (let byte of byteArray) {
    binaryString += byte.toString(2).padStart(8, "0");
  }

  const nonpadBitSize = binaryString.length;
  // console.log("nonpadBitSize: %d",nonpadBitSize);
  // Pad the input with zeros to make it multiple of BITRATE bits
  // console.log("binaryString.length: ",binaryString.length);
  // console.log("BITRATE: ",BITRATE);
  // console.log("binaryString.length % BITRATE: ",binaryString.length % BITRATE);

  while (binaryString.length % BITRATE !== 0) {
    binaryString = "0" + binaryString;
  }
  // console.log("binaryString: ",binaryString);
  // Split the input into two 254-bit strings
  const chunks: string[] = [];
  for (let i = 0; i < binaryString.length; i += BITRATEh) {
    chunks.push(binaryString.slice(i, i + BITRATEh));
  }

  const count = Math.floor(chunks.length / 2);
  const matrixState: string[][] = [];

  if (count > MAX_ROUND) {
    let distance: number = Math.floor(count / MAX_ROUND);
    for (let i = 0; i < MAX_ROUND; i++) {
      matrixState.push([
        chunks[distance * i * 2],
        chunks[distance * (2 * i + 1)],
      ]);
    }
  } else {
    for (let i = 0; i < MAX_ROUND; i++) {
      matrixState.push([chunks[(2 * i) % count], chunks[(2 * i + 1) % count]]);
    }
  }

  return {
    matrixState,
    nonpadBitSize,
  };
};
