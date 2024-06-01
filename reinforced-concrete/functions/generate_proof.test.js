import { fileURLToPath } from "url";
import * as snarkjs from 'snarkjs';
import fs from 'fs';
import path from 'path';
const __dirname = fileURLToPath(new URL(".", import.meta.url));
// const __filename = fileURLToPath(import.meta.url);

async function proof_generator(docId) {
    
    const baseDir = path.resolve(__dirname, `../../zk/${docId}`);
    const proofFilePath = path.join(baseDir, "proof.json");
    const publicInputFilePath = path.join(baseDir, "publicInputSignals.json");

    const input = {
        state: [
            "5318131563369638011325357465817405204783162951746317507525230104757675769920",
            "20614852220057270210230140702292305712326412047017090758177592319778719954884"
        ]
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

proof_generator("mydoc").then(() => {
    process.exit(0);
})