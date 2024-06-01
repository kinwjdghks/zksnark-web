import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs";
export const dynamic = "force-dynamic"; // defaults to auto

export async function POST(req: NextRequest, res: NextResponse) {

    const { proof, public_ } = await req.json();

    const proofFilePath = path.join(process.cwd(), "temp", "proof.json");
    const publicFilePath = path.join(process.cwd(), "temp", "public.json");
    const verificationKeyPath = path.join(process.cwd(),"reinforced-concrete","rc-circom","zkeyFiles","reinforcedConcreteTest","verification_key.json");
    const snarkPromise = promisify(exec);

    // fs.writeFileSync(proofFilePath, Buffer.from(proof, 'utf-8'));
    // fs.writeFileSync(publicFilePath, Buffer.from(public_, 'utf-8'));

    try{
      const { stderr, stdout} = await snarkPromise(`snarkjs groth16 verify ${verificationKeyPath} ${publicFilePath} ${proofFilePath}`);
      return NextResponse.json({message: "verified successfully.", res: stdout.toString() })
    
    } catch (error) {
      return NextResponse.json({message: "verification failed."})
    }
}
