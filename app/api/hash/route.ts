import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";
export const dynamic = "force-dynamic"; // defaults to auto

export async function GET(req: NextRequest, res: NextResponse) {

    const executableFilePath = path.join(process.cwd(), "lib", "executable", "hash.out");
    const hashPromise = promisify(exec);

    try{
      const { stderr, stdout } = await hashPromise(`cd ${path.join(process.cwd(), "temp")} && ${executableFilePath}`);
      if (stderr) {
        console.error("stderr:", stderr);
        return NextResponse.json({ message: "hash failed.", error: stderr });
    }
      console.log("stdout:",stdout);
      return NextResponse.json({ message: "hash completed.", hash: stdout })
    
    } catch (error) {
      console.error("hash error:",error);
      return NextResponse.json({ message: "hash failed." })
    }
    
}
