import { MAX_ROUND } from "@/reinforced-concrete/constants/maxround";
import BigNumber from "bignumber.js";

export const BITRATE = 508;
export const BITRATEh = 254;

export const parseState = (buffer: ArrayBuffer) => {
  let binaryString = "";
  const byteArray = new Uint8Array(buffer);
  for (let byte of byteArray) {
    binaryString += byte.toString(2).padStart(8, "0");
  }

  const nonpadBitSize = binaryString.length;

  while (binaryString.length % BITRATE !== 0) {
    binaryString = "0" + binaryString;
  }
  
  const chunks: string[] = [];
  for (let i = 0; i < binaryString.length; i += BITRATEh) {
    BigNumber(chunks.push(binaryString.slice(i, i + BITRATEh)),2).toString(10);
  }

  const count = Math.floor(chunks.length / 2);
  const matrixState: string[][] = [];

  if (count > MAX_ROUND) {
    let distance: number = Math.floor(count / MAX_ROUND);
    for (let i = 0; i < MAX_ROUND; i++) {
      matrixState.push([
        BigNumber(chunks[distance * i * 2],2).toString(10),
        BigNumber(chunks[distance * (2 * i + 1)],2).toString(10),
      ]);
    }
  } else {
    for (let i = 0; i < MAX_ROUND; i++) {
      matrixState.push([
        BigNumber(chunks[(2 * i) % count],2).toString(10), 
        BigNumber(chunks[(2 * i + 1) % count],2).toString(10)
      ])
    }
  }

  return {
    matrixState,
    nonpadBitSize,
  };
};
