const snarkjs = require("snarkjs");
const fs = require("fs");

async function run() {
    // Step 1: Generate a larger Power of Tau ceremony
    console.log("Generating initial Power of Tau...");
    await snarkjs.powersOfTau.newAccumulator("bn128", 21, "pot21_0000.ptau");

    console.log("Contributing to Power of Tau...");
    await snarkjs.powersOfTau.contribute("pot21_0000.ptau", "pot21_0001.ptau", "First contribution");

    console.log("Preparing for phase 2...");
    await snarkjs.powersOfTau.preparePhase2("pot21_0001.ptau", "pot21_final.ptau");

    // Step 2: Setup the ZK-SNARK
    console.log("Setting up ZK-SNARK...");
    await snarkjs.groth16.setup("circuits/main.r1cs", "pot21_final.ptau", "main_0000.zkey");

    console.log("Contributing to ZK-SNARK setup...");
    await snarkjs.zKey.contribute("main_0000.zkey", "main_final.zkey", "Second contribution");

    console.log("Exporting verification key...");
    await snarkjs.zKey.exportVerificationKey("main_final.zkey", "verification_key.json");

    // Step 3: Generate the Witness
    console.log("Generating witness...");
    const { generateWitness } = require("./main_js/generate_witness");
    await generateWitness("main_js/main.wasm", "input.json", "witness.wtns");

    // Step 4: Generate the Proof
    console.log("Generating proof...");
    await snarkjs.groth16.prove("main_final.zkey", "witness.wtns", "proof.json", "public.json");

    // Step 5: Verify the Proof
    console.log("Verifying proof...");
    const verificationKey = JSON.parse(fs.readFileSync("verification_key.json"));
    const publicSignals = JSON.parse(fs.readFileSync("public.json"));
    const proof = JSON.parse(fs.readFileSync("proof.json"));
    const isValid = await snarkjs.groth16.verify(verificationKey, publicSignals, proof);

    console.log("Proof is valid:", isValid);

    // Step 6: Generate Solidity Verifier
    console.log("Exporting Solidity verifier...");
    await snarkjs.zKey.exportSolidityVerifier("main_final.zkey", "Verifier.sol");
}

run().catch(err => {
    console.error(err);
    process.exit(1);
});
