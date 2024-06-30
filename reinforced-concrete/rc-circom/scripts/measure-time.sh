#!/bin/bash
declare -a CIRCUITS=( reinforcedConcreteTest )

set -e


cd "$(dirname "$0")"
mkdir -p ../build/contracts
mkdir -p ../build/setup

cd ../build
echo -e "\033[36m----------------------\033[0m"
echo -e "\033[36mSETTING UP ENVIRONMENT\033[0m"
echo -e "\033[36m----------------------\033[0m"
if [ -f ./powersOfTau28_hez_final_15.ptau ]; then
    echo -e "\033[33mpowersOfTau28_hez_final_15.ptau already exists. Skipping.\033[0m"
else
    echo -e "\033[33mDownloading powersOfTau28_hez_final_15.ptau\033[0m"
    wget https://hermez.s3-eu-west-1.amazonaws.com/powersOfTau28_hez_final_15.ptau
fi

#define variables
circuit_dir="../test"
circuit_path=""
circuit_type=""
zkeydir="../zkeyFiles"

circuit_name="reinforcedConcreteTest"
circuit_path="$circuit_dir/$circuit_name.circom"
zkeypath="$zkeydir/$circuit_name"

#check for circom installation
if ! [ -x "$(command -v circom)" ]; then
    echo -e '\033[31mError: circom is not installed.\033[0m' >&2
    echo -e '\033[31mError: please install circom: https://docs.circom.io/getting-started/installation/.\033[0m' >&2
    exit 1
fi

compile_circuit() {
    echo "Compiling ${1}.circom..."

    # compile circuit

    circom $circuit_path --r1cs --wasm --sym
    snarkjs r1cs info ${1}.r1cs

    #export R1CS to json format
    npx snarkjs r1cs export json ./build/$circuit_name.r1cs ./build/$circuit_name.r1cs.json

    #run initial groth16 trusted setup, produce first .zkey
    echo -e "\033[36mRunning groth16 trusted setup\033[0m"

    npx snarkjs groth16 setup ./build/$circuit_name.r1cs ./build/powersOfTau28_hez_final_15.ptau ./build/setup/circuit_00000.zkey

    #add two contribution to the phase 2 setup, each time generate .zkey
    #use a beacon phase to finalize the .zkey file, ensuring no single participant has control over the final key.
    npx snarkjs zkey contribute ./build/setup/circuit_00000.zkey ./build/setup/circuit_00001.zkey --name="First contribution" -v -e="Random entropy"
    npx snarkjs zkey contribute ./build/setup/circuit_00001.zkey ./build/setup/circuit_00002.zkey --name="Second contribution" -v -e="Another random entropy"
    npx snarkjs zkey beacon ./build/setup/circuit_00002.zkey ./build/setup/final.zkey 0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f 10 -n="Final Beacon phase2"
}

for NAME in "${CIRCUITS[@]}"
do
    time compile_circuit $NAME
    echo "⏱ ⏱ ⏱"
done

cd ../