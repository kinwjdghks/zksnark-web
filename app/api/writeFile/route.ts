// import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import fs from 'fs';
export const dynamic = "force-dynamic"; // defaults to auto
import path from "path";


//get url and convert into bytes and write to a file.
export async function POST(req: NextRequest) {
    try {
        const { url } = await req.json()

        if (!url) {
            return NextResponse.json({ error: "URL is required" });
        }

        // Fetch the file from the URL
        const response = await fetch(url);
        if (!response.ok) {
            return NextResponse.json({ error: "Failed to fetch the file from the URL" });
        }

        // Convert the response to an ArrayBuffer
        const arrayBuffer = await response.arrayBuffer();

        // Convert the ArrayBuffer to a Uint8Array
        const uint8Array = new Uint8Array(arrayBuffer);

        // Convert the Uint8Array to a Buffer
        const buffer = Buffer.from(uint8Array);

        // Define the file path to write the bytes to
        const filePath = path.join(process.cwd(), 'temp', 'fileToBytes.txt');

        // Ensure the directory exists
        fs.mkdirSync(path.dirname(filePath), { recursive: true });

        // Write the bytes to the file
        fs.writeFileSync(filePath, buffer);

        // Send a success response
        return  NextResponse.json({ message: "File written successfully", filePath });
    } catch (error) {
        console.error("Failed to retrieve and write file:", error);
        return  NextResponse.json({ error: "Internal Server Error" });
    }
  }