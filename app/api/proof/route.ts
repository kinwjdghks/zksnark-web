import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs";
import { fetchAsBuffer } from "@/lib/functions/fetchAsBuffer";
import { parseState } from "@/lib/functions/parseState";
import { ReinforcedConcreteHash } from "@/reinforced-concrete/functions/hash";
import BigNumber from "bignumber.js";
export const dynamic = "force-dynamic"; // defaults to auto

export async function GET(req: NextRequest, res: NextResponse) {
  let state1:string = '';
  let state2:string = '';
  const url = req.nextUrl.searchParams.get("url") as string;
  const buffer = await fetchAsBuffer(url);
  if(!buffer) {
    console.log("read as buffer failed.");
    return;
  }
  const { chunks, nonpadBitSize } = parseState(buffer);
  // console.log("chunks: ",chunks);
  // console.log("nonpadBitSize: ",nonpadBitSize);
  const myHash = new ReinforcedConcreteHash().hash(chunks, nonpadBitSize).toString(10);
  console.log("myHash:", myHash);
  state1 = chunks[0];
  state2 = chunks[1];

  const inputPath = path.join(process.cwd(), "temp", "input.json");
  const wasmPath = path.join(
    process.cwd(),
    "reinforced-concrete",
    "rc-circom",
    "zkeyFiles/reinforcedConcreteTest",
    "circuit.wasm"
  );
  const zkeyPath = path.join(
    process.cwd(),
    "reinforced-concrete",
    "rc-circom",
    "zkeyFiles",
    "reinforcedConcreteTest",
    "final.zkey"
  );
  const proofFilePath = path.join(process.cwd(), "temp", "proof.json");
  const publicFilePath = path.join(process.cwd(), "temp", "public.json");

  fs.writeFileSync(inputPath, JSON.stringify({ state: [state1, state2], nonpadBitSize:nonpadBitSize }));

  const snarkPromise = promisify(exec);

  try {
    await snarkPromise(
      `snarkjs groth16 fullprove ${inputPath} ${wasmPath} ${zkeyPath} ${proofFilePath} ${publicFilePath}`
    );

    const proof = fs.readFileSync(proofFilePath, "utf-8");
    // const public_ = fs.readFileSync(publicFilePath, "utf-8");
    // console.log(proof);
    return NextResponse.json({
      message: "prove successfully generated.",
      proof: proof,
      public_: myHash, //replace with my hash output.
    });
  } catch (error) {
    return NextResponse.json({ message: "prove generation failed." });
  }
}
