import snarkjs from 'snarkjs';
import fs from 'fs';
// const snarkjs = require("snarkjs");
const fs = require("fs");
// const path = require("path");
import path from 'path';

async function proof_generator(docId) {
    
    const baseDir = path.resolve(__dirname, `../../zk/${docId}`);
    const proofFilePath = path.join(baseDir, "proof.json");
    const publicInputFilePath = path.join(baseDir, "publicInputSignals.json");

    const input = {
        state: [10, 21] // Example values, replace with actual values
    };
    const { proof, publicSignals } = await snarkjs.groth16.fullProve(
        input, 
        "reinforced-concrete/rc-circom/zkeyFiles/reinforcedConcreteTest/circuit.wasm",
        "reinforced-concrete/rc-circom/zkeyFiles/reinforcedConcreteTest/final.zkey"
    );
    
    if (!fs.existsSync(baseDir)){
        fs.mkdirSync(baseDir, { recursive: true });
    }

    fs.writeFileSync(proofFilePath, JSON.stringify(proof))
    fs.writeFileSync(publicInputFilePath, JSON.stringify(publicSignals))
    console.log("Proof & publicInput Generated!");
}

proof_generator("123123").then(() => {
    process.exit(0);
})