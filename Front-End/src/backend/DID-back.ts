'use server';

import bs58 from 'bs58';

export const uploadToIPFS = async (dataJson: string): Promise<string> => {
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

const prefixPinata = 'https://gateway.pinata.cloud/ipfs/';

export async function createStudentDID(
  issuerWalletAdress: string,
  publicKeyForAssertion: string
) {
  const did = `did:xrpl:1:${issuerWalletAdress}`;
  const didDocument = {
    '@context': 'https://www.w3.org/ns/did/v1',
    id: did,
    controller: did,
    verificationMethod: [
      {
        id: `${did}#keys-1`,
        type: 'EcdsaSecp256k1RecoveryMethod2020',
        controller: did,
        publicKeyHex: publicKeyForAssertion,
      },
    ],
  };

  const didIPFSLink = await uploadToIPFS(JSON.stringify(didDocument));
  const buffer = bs58.decode(didIPFSLink);
  const fullHexString = buffer.toString();
  const hexCID = fullHexString.substring(4);

  return prefixPinata + didIPFSLink;
}
