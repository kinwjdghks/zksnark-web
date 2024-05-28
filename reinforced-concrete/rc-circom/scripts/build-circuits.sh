### This build script was copied from https://github.com/Rate-Limiting-Nullifier/circom-rln/
#!/bin/bash
set -e


cd "$(dirname "$0")" #change the directory to the location of the script.
mkdir -p ../build/contracts
mkdir -p ../build/setup

# Build context
cd ../build
echo -e "\033[36m----------------------\033[0m"
echo -e "\033[36mSETTING UP ENVIRONMENT\033[0m"
echo -e "\033[36m----------------------\033[0m"
if [ -f ./powersOfTau28_hez_final_14.ptau ]; then
    echo -e "\033[33mpowersOfTau28_hez_final_14.ptau already exists. Skipping.\033[0m"
else
    echo -e "\033[33mDownloading powersOfTau28_hez_final_14.ptau\033[0m"
    wget https://hermez.s3-eu-west-1.amazonaws.com/powersOfTau28_hez_final_14.ptau
fi

#define variables
circuit_dir="../tests/"
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

#compile the circuit and create .r1cs, .wasm, .sym
echo -e "Circuit path: $circuit_path"
echo -e "\033[36m-----------------\033[0m"
echo -e "\033[36mCOMPILING CIRCUIT\033[0m"
echo -e "\033[36m-----------------\033[0m"

echo -e "\033[36mBuild Path: $PWD\033[0m"

circom --version
circom $circuit_path --r1cs --wasm --sym

#export R1CS to json format
npx snarkjs r1cs export json ./build/$circuit_name.r1cs ./build/$circuit_name.r1cs.json

#run initial groth16 trusted setup, produce first .zkey
echo -e "\033[36mRunning groth16 trusted setup\033[0m"

npx snarkjs groth16 setup ./build/$circuit_name.r1cs ./build/powersOfTau28_hez_final_14.ptau ./build/setup/circuit_00000.zkey

#add two contribution to the phase 2 setup, each time generate .zkey
#use a beacon phase to finalize the .zkey file, ensuring no single participant has control over the final key.
npx snarkjs zkey contribute ./build/setup/circuit_00000.zkey ./build/setup/circuit_00001.zkey --name="First contribution" -v -e="Random entropy"
npx snarkjs zkey contribute ./build/setup/circuit_00001.zkey ./build/setup/circuit_00002.zkey --name="Second contribution" -v -e="Another random entropy"
npx snarkjs zkey beacon ./build/setup/circuit_00002.zkey ./build/setup/final.zkey 0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f 10 -n="Final Beacon phase2"

#exports the verification key to a JSON file and generates a Solidity contract for on-chain verification.
echo -e "Exporting artifacts to zkeyFiles and contracts directory"

mkdir -p $zkeypath
npx snarkjs zkey export verificationkey ./build/setup/final.zkey ./build/$zkeypath/verification_key.json
npx snarkjs zkey export solidityverifier ./build/setup/final.zkey ./build/contracts/verifier.sol

#copy the .wasm and final .zkey files to the specified zkeypath.
cp $circuit_name\_js/$circuit_name.wasm $zkeypath/circuit.wasm
cp ../build/setup/final.zkey $zkeypath/final.zkey

#generate a configuration file with metadata about the build process, including SHA-256 checksums for the generated files.
shasumcmd="shasum -a 256"

config_path="$zkeypath/circuit.config.toml"
echo -e "" >> $config_path

echo -e "[Circuit_Build]" >> $config_path
echo -e "Circom_Version = \"$(circom --version)\"" >> $config_path
echo -e "GitHub_URL = \"$(git config --get remote.origin.url)\""  >> $config_path
echo -e "Git_Commit = \"$(git describe --always)\"" >> $config_path
echo -e "Compilation_Time = $(date +%s)" >> $config_path

echo -e "" >> $config_path
echo -e "[Files]" >> $config_path
echo -e "Wasm = \"circuit.wasm\"" >> $config_path
wasm_sha256=$($shasumcmd $zkeypath/circuit.wasm | awk '{print $1}')
echo -e "Wasm_SHA256SUM = \"$wasm_sha256\"" >> $config_path
echo -e "Zkey = \"final.zkey\"" >> $config_path
zkey_sha256=$($shasumcmd $zkeypath/final.zkey | awk '{print $1}')
echo -e "Zkey_SHA256SUM = \"$zkey_sha256\"" >> $config_path
echo -e "Verification_Key = \"verification_key.json\"" >> $config_path
vkey_sha256=$($shasumcmd $zkeypath/verification_key.json | awk '{print $1}')
echo -e "Verification_Key_SHA256SUM = \"$vkey_sha256\"" >> $config_path
