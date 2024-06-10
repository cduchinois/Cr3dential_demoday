const { ethers } = require('hardhat');
// Import the fs module
const fs = require('fs');

//address on EVM Sidechain
const contractAddress = '0xfaF0D9CED923E33d4f4d8cD4c66Aa0A8F97136e6';

//const provider = new ethers.providers.JsonRpcProvider('https://rpc-evm-sidechain.xrpl.org');

async function verifyProofFromFile(IPFSHash) {
    try {

        //Ideally get proof from IPFS via student did 
        // Read the proof data from the JSON file
        const data = fs.readFileSync('proof.json', 'utf8');
        const proof = JSON.parse(data);

        // Extract the proof components
        const pA = proof.pA;
        const pB = proof.pB;
        const pC = proof.pC;
        const pubSignals = proof.pubSignals;

        // Call the verifyProof function
        const verifierContract = new ethers.getContractAt("Verifier",contractAddress);
        const result = await verifierContract.verifyProof(pA, pB, pC, pubSignals);
        console.log('Proof verified:', result);
    } catch (error) {
        console.error('Error verifying proof:', error);
    }
}

// Call the function to verify the proof from the JSON file
verifyProofFromFile();