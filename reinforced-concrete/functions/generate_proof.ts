const snarkjs = require("snarkjs");
const fs = require("fs");

export async function proof_generator(docID:string) {

    // const input = {a: 10, b: 21};
    const input = {
        state: [10, 21] // Example values, replace with actual values
    };
    const { proof, publicSignals } = await snarkjs.groth16.fullProve(
        input, 
        "reinforced-concrete/rc-circom/zkeyFiles/reinforcedConcreteTest/circuit.wasm",
        "reinforced-concrete/rc-circom/zkeyFiles/reinforcedConcreteTest/final.zkey"
    );

    const dir = `../../zk/${docID}`;
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(`../../zk/${docID}/proof.json`,JSON.stringify(proof))
    fs.writeFileSync(`../../zk/${docID}/publicInputSignals.json`,JSON.stringify(publicSignals))
    console.log("Proof & publicInput Generated!");
}

// proof_generator().then(() => {
//     process.exit(0);
// });
