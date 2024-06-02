// import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import fs from 'fs';
export const dynamic = "force-dynamic"; // defaults to auto
import path from "path";
import { fetchAsBuffer } from "@/lib/functions/fetchAsBuffer";


//get url and convert into bytes and write to a file.
export async function POST(req: NextRequest) {
    try {
        const { url } = await req.json()

        if (!url) {
            return NextResponse.json({ error: "URL is required" });
        }

        const buffer = await fetchAsBuffer(url);
        if(!buffer) return NextResponse.json({ error: "Failed to fetch the file from the URL" });

        // Define the file path to write the bytes to
        const filePath = path.join(process.cwd(), 'temp', 'fileToBytes.txt');

        // Ensure the directory exists
        fs.mkdirSync(path.dirname(filePath), { recursive: true });

        // Write the bytes to the file
        fs.writeFileSync(filePath, buffer as string | NodeJS.ArrayBufferView);

        // Send a success response
        return  NextResponse.json({ message: "File written successfully", filePath });
    } catch (error) {
        console.error("Failed to retrieve and write file:", error);
        return  NextResponse.json({ error: "Internal Server Error" });
    }
  }