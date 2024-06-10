const xrpl = require('xrpl');
const bs58 = require('bs58');
const {uploadJSONToIPFS, generateWalletFromSecret} = require("./utils")
require('dotenv').config()

const prefixPinata = "https://gateway.pinata.cloud/ipfs/";
const RSApublicKey = `-----BEGIN PUBLIC KEY-----
MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgHkR5GD34WaZ1xVLaFnmoKXF0o//
yNr80uYJVH7j2OvLVZk+obK6rH1JfBZVqbSBw0WEZ25Lyrgi0K1YYTVVfBpOkpf/
V5rw5J7xYAzK6vPW9skkA75gBUsF7L/7hoH9JepqFa2qIv/7Rf7BgpYWsCqXuSq/
8TCAE96cLc6CgQUHAgMBAAE=
-----END PUBLIC KEY-----`

// Creates a DID and uploads it to IPFS
async function createDID(issuerWallet, publicKeyForAssertion, RSApublicKey) {
    const did = `did:xrpl:1:${issuerWallet.address}`;
    const profile = {
      "type": "University",
      "name": "EasyA",
      "sector": "Education",
      "website": "https://easya.com/",
    };

    const profileIPFSLink = await uploadJSONToIPFS(profile);
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
      },{
        "id": `${did}#keys-2`,
        "type": "RsaVerificationKey2018",
        "controller": did,
        "publicKeyPem": RSApublicKey
      }],
      "service": [{
        "id": `${did}#profile`,
        "type": "Public Profile",
        "serviceEndpoint": prefixPinata + profileIPFSLink
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


async function issuerCreate() {
    const issuerSecret = process.env.ISSUER_SEED;

    // Generate wallet and create DID
    let issuerWallet = await generateWalletFromSecret(issuerSecret);
    const ipfsDid = await createDID(issuerWallet, issuerWallet.publicKey, RSApublicKey);
    await setDID(issuerWallet,ipfsDid)
}

// Run the main function
issuerCreate();

//generate_proof , uploadProof to IPFS