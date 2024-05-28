const snarkjs = require("snarkjs");
// const snarkjs = require("snarkjs");
const fs = require("fs");
const path = require("path");

async function verifier(docId) {
    const baseDir = path.resolve(__dirname, `../../zk/${docId}`);
    const proofFilePath = path.join(baseDir, "proof.json");
    const publicInputFilePath = path.join(baseDir, "publicInputSignals.json");
    const vKeyFilePath = path.resolve(__dirname, "../rc-circom/zkeyFiles/reinforcedConcreteTest/verification_key.json")


    const vKey = JSON.parse(fs.readFileSync(vKeyFilePath));
    const proof = JSON.parse(fs.readFileSync(proofFilePath));
    const publicSignals = JSON.parse(fs.readFileSync(publicInputFilePath));

    const res = await snarkjs.groth16.verify(vKey, publicSignals, proof);

    if (res === true) {
        console.log("Proof verified successfully");
    } else {
        console.log("Invalid proof");
    }

}

verifier("123123").then(() => {
    process.exit(0);
});