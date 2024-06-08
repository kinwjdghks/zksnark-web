import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs";
import { fetchAsBuffer } from "@/lib/functions/fetchAsBuffer";
import { parseState } from "@/lib/functions/parseState";
import { ReinforcedConcreteHash } from "@/reinforced-concrete/functions/hash";
export const dynamic = "force-dynamic"; // defaults to auto

export async function GET(req: NextRequest, res: NextResponse) {
  const url = req.nextUrl.searchParams.get("url") as string;
  const buffer = await fetchAsBuffer(url);
  if (!buffer) {
    console.log("read as buffer failed.");
    return;
  }
  const { matrixState, nonpadBitSize } = parseState(buffer);
  console.log("chunks created.")
  // console.log("chunks: ", chunks);
  // console.log("nonpadBitSize: ",nonpadBitSize);
  const inputPath = path.join(process.cwd(), "temp", "input.json");

  fs.writeFileSync(
    inputPath,
    JSON.stringify({
      state: matrixState,
      nonpadBitSize: nonpadBitSize,
    })
  );

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

  const myHash = new ReinforcedConcreteHash().spongeHash(matrixState, nonpadBitSize);
  console.log("myHash:", myHash);

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
