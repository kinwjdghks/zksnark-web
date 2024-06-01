import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";
import fs from 'fs';
export const dynamic = "force-dynamic"; // defaults to auto

export async function GET(req: NextRequest, res: NextResponse) {
    const state1 = req.nextUrl.searchParams.get('state1') as string;
    const state2 = req.nextUrl.searchParams.get('state2') as string;
    
    const inputPath = path.join(process.cwd(),"input.json");
    const wasmPath = path.join(process.cwd(),"reinforced-concrete","rc-circom","zkeyFiles/reinforcedConcreteTest","circuit.wasm");
    const zkeyPath = path.join(process.cwd(),"reinforced-concrete","rc-circom","zkeyFiles","reinforcedConcreteTest","final.zkey");
    const proofFilePath = path.join(process.cwd(), "temp", "proof.json");
    const publicFilePath = path.join(process.cwd(), "temp", "public.json");

    fs.writeFileSync(inputPath, JSON.stringify({ "state": [state1, state2]}));
  
    const snarkPromise = promisify(exec)
    
    try{
      await snarkPromise(`snarkjs groth16 fullprove ${inputPath} ${wasmPath} ${zkeyPath} ${proofFilePath} ${publicFilePath}`);
      
      const fileContent = fs.readFileSync(proofFilePath, 'utf-8');
      console.log(fileContent);
      return NextResponse.json({message: "prove successfully generated.", proof: fileContent })
    
    } catch (error) {
      return NextResponse.json({message: "prove generation failed."})
    }
}
