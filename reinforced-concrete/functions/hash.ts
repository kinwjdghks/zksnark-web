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


// export const hashFile = async (filePath:string):Promise<string|undefined> => {
export const hashFile = async (filePath:string):Promise<string> => {
    
    //write bytes to a file named filePath
    const writeFile = await fetch(
        "http://localhost:3000/api/writeFile",
        {
            method:"POST",
            headers:{
                "Context-Type":"application/json"
            },
            body:JSON.stringify({
                url:filePath
            })
        }
    );

    //read bytes and hash
    const hashReq = await fetch(
        "http://localhost:3000/api/hash",
        {
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        }
    );

    const { hash } = await hashReq.json();
    // console.log(res)
    return hash;
}