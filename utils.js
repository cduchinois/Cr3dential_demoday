const xrpl = require('xrpl');
const axios = require('axios');
const bs58 = require('bs58');
require("dotenv").config()


// Uploads JSON data to IPFS using Pinata
async function uploadToIPFS(dataJson) {
  const url = 'https://api.pinata.cloud/pinning/pinFileToIPFS';
  const headers = {
    authorization: `Bearer ${process.env.PINATA_JWT}`,
  };

  const blob = new Blob([dataJson], { type: 'text/plain' });
  const data = new FormData();
  data.append('file', blob);

  const response = await fetch(url, {
    method: 'POST',
    headers: headers,
    body: data,
  });

  const json = await response.json();

  return json.IpfsHash;
};


// Generates a wallet from a secret
async function generateWalletFromSecret(secret) {
    const wallet = xrpl.Wallet.fromSecret(secret);
    return wallet;
}

module.exports = {uploadToIPFS, generateWalletFromSecret}