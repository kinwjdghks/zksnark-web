import { NextApiRequest, NextApiResponse } from "next";
import fs from 'fs';
import path from "path";
import { NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";
export const dynamic = "force-dynamic"; // defaults to auto

const INITIAL_VECTOR = [BigInt(1), BigInt(2), BigInt(3)];

// Function to convert file to bytes
const fileToBytes = (filePath: string) => {
    return fs.readFileSync(filePath);
}

// Function to chunk bytes
const chunkBytes = (bytes:Uint8Array, chunkSize = 96) => {
    const chunks = [];
    for (let i = 0; i < bytes.length; i += chunkSize) {
        chunks.push(bytes.slice(i, i + chunkSize));
    }
    return chunks;
}

// Function to convert bytes to field elements
const bytesToFieldElements = (bytes: Uint8Array) => {
    const fieldElements = [];
    for (let i = 0; i < bytes.length; i += 32) {
        let value = BigInt(0);
        for (let j = 0; j < 32 && (i + j) < bytes.length; j++) {
            value = (value << 8n) | BigInt(bytes[i + j]);
        }
        fieldElements.push(value);
    }
    return fieldElements;
}

// Placeholder for the reinforced concrete hash function
const reinforcedConcreteHash = (state: BigInt[]): BigInt[] => {
    // Implement the reinforced concrete hash function as described
    // This function should use the bricks, concrete, and bars functions
    // to hash the given state
    return state; // Placeholder for actual implementation
}

// Function to hash a chunk
const hashChunk = (chunk: Uint8Array) => {
    const fieldElements = bytesToFieldElements(chunk);
    while (fieldElements.length < 3) {
        fieldElements.push(BigInt(0)); // Padding if less than 3 elements
    }
    return reinforcedConcreteHash(fieldElements);
}

// Function to combine hashes using a Merkle tree approach
const combineHashes = (hashes: BigInt[][]): BigInt[] => {
    while (hashes.length > 1) {
        const newHashes = [];
        for (let i = 0; i < hashes.length; i += 2) {
            if (i + 1 < hashes.length) {
                const combinedHash = reinforcedConcreteHash([hashes[i][0], hashes[i + 1][0], BigInt(0)]);
                newHashes.push(combinedHash);
            } else {
                newHashes.push(hashes[i]);
            }
        }
        hashes = newHashes;
    }
    return hashes[0];
}

// Function to hash a file using an initial vector
export const hashFile = (filePath: string) => {
    const bytes = fileToBytes(filePath);
    const chunks = chunkBytes(bytes);
    const initialHash = reinforcedConcreteHash(INITIAL_VECTOR); // Start with the initial vector
    const hashes = chunks.map(chunk => hashChunk(chunk));
    hashes.unshift(initialHash); // Include the initial hash in the combination process
    return combineHashes(hashes);
}

// export async function GET(req: NextApiRequest, res: NextApiResponse) {
//     const filePath = path.join(process.cwd(), 'temp', 'fileToBytes.txt');
//     const hashedFile = hashFile(filePath);
//     console.log(hashedFile);

//     fs.unlink(filePath, () => {});
//     return NextResponse.json({message: "Hash successfully done.", hash: hashedFile});
// }

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    console.log("Hash running...")
    const filePath = path.join(process.cwd(), 'temp', 'fileToBytes.txt');
    
    const cProgramPath = path.join(process.cwd(), 'app','api','hash','hash.out');
    const sourcePath = path.join(process.cwd(), 'temp', 'fileToBytes.txt');

    // Run the compiled executable
    const execPromise = promisify(exec);
    try{
        const  { stdout, stderr } = await execPromise(`${cProgramPath} ${sourcePath}`);
        if(stderr) {
            console.error(`Error running compiled C program: ${stderr}`);
            console.error(`stderr: ${stderr}`);
            return NextResponse.json({ error: 'Failed to run compiled C program' });
        }
        const hash = stdout.toString();
        return NextResponse.json({ message: "Hash Successed", hash: hash });
    } catch (error) {
        return NextResponse.json({ message: "Hash Failed" });
    }
    // exec(`${cProgramPath} ${sourcePath}`, (stderr, runStdout, runStderr) => {
        
    //     if (runError) {
    //         console.error(`Error running compiled C program: ${runError}`);
    //         console.error(`stderr: ${runStderr}`);
    //         return NextResponse.json({ error: 'Failed to run compiled C program' });
    //     }
        
    //     // console.log(runStdout);
    //     // Send the output of the C program as the response
    //     const hash = runStdout.toString();
    //     console.log("flag");
    //     return NextResponse.json({ message: "Hash Successed", hash: hash });
    // });
    
    // return NextResponse.json({ message: "Hash Failed" });
}
