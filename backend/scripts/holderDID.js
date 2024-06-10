const xrpl = require('xrpl');
const bs58 = require('bs58');
const fs = require('fs');


// Fetches a DID document from the XRP Ledger
async function getDIDDocument(did) {
    const client = new Client("wss://s.devnet.rippletest.net:51233/");
    let address = did.substring(11); // Extracts the XRPL address from the DID

    try {
        await client.connect();
        const response = await client.request({
            command: "account_objects",
            account: address,
            ledger_index: "validated"
        });

        if (response.result.account_objects.length === 0) {
            console.log(chalk.yellow("No DID objects found for the provided DID."));
            return null;
        }

        const didDocumentHex = response.result.account_objects[0].DIDDocument;
        const prefixedHexString = "1220" + didDocumentHex;
        const buffer = Buffer.from(prefixedHexString, 'hex');
        const base58Encoded = bs58.encode(buffer);


        return base58Encoded;
    } catch (error) {
        console.error(`Error fetching DID objects for address ${address}: ${error.message}`);
        return null;
    } finally {
        await client.disconnect();
    }
}

async function createDID(issuerWallet, publicKeyForAssertion, RSApublicKey) {
    const did = `did:xrpl:1:${issuerWallet.address}`;
    const proof = fs.readFileSync('proof.json', 'utf8');

    const proofIPFSLink = await uploadJSONToIPFS(profile);
    if (!profileIPFSLink) {
        console.log('Failed to upload profile to IPFS. Aborting DID creation.');
        return null;
    }

    const didDocument = {
      "@context": "https://www.w3.org/ns/did/v1",
      "id": did,
      "controller": did,
      "verificationMethod": [{
        "id": `${did}#keys-1`,
        "type": "EcdsaSecp256k1RecoveryMethod2020",
        "controller": did,
        "publicKeyHex": publicKeyForAssertion
      }],
      "service": [{
        "id": `${did}#proof`,
        "type": "ZKProof",
        "serviceEndpoint": prefixPinata + proofIPFSLink
      },]
    };

    const didIPFSLink = await uploadJSONToIPFS(didDocument);
    const buffer = bs58.decode(didIPFSLink);
    const fullHexString = buffer.toString('hex');
    let hexCID = fullHexString.substring(4);

    return prefixPinata + didIPFSLink;
}

// Sets a DID document on the XRP Ledger
async function setDID(wallet, didIpfsHash) {
    const client = new Client("wss://s.devnet.rippletest.net:51233/");
    await client.connect();

    try {
        const prepared = await client.autofill({
            "TransactionType": "DIDSet",
            "Account": wallet.address,
            "DIDDocument": didIpfsHash
        });

        let signedTransaction = wallet.sign(prepared);

        const result = await client.submitAndWait(signedTransaction.tx_blob);
        console.log(chalk.blue(`Transaction result: ${JSON.stringify(result, null, 2)}`));
        return result;
    } catch (error) {
        console.error(chalk.red(`Error setting DID: ${error}`));
        return null;
    } finally {
        await client.disconnect();
    }
}

async function holderCreate() {
    const holderSecret = process.env.ISSUER_SEED;

    // Generate wallet and create DID
    let holderWallet = await generateWalletFromSecret(issuerSecret);
    const ipfsDid = await createDID(holderWallet, holderWallet.publicKey, RSApublicKey);
    await setDID(issuerWallet,ipfsDid)
}

// Run the main function
holderCreate();