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

const RSApublicKey = `-----BEGIN PUBLIC KEY-----
MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgHkR5GD34WaZ1xVLaFnmoKXF0o//
yNr80uYJVH7j2OvLVZk+obK6rH1JfBZVqbSBw0WEZ25Lyrgi0K1YYTVVfBpOkpf/
V5rw5J7xYAzK6vPW9skkA75gBUsF7L/7hoH9JepqFa2qIv/7Rf7BgpYWsCqXuSq/
8TCAE96cLc6CgQUHAgMBAAE=
-----END PUBLIC KEY-----`;

export async function createIssuerDID(
  issuerWalletAdress: string,
  publicKeyForAssertion: string
) {
  const did = `did:xrpl:1:${issuerWalletAdress}`;

  const profile = {
    type: 'University',
    name: 'EasyA',
    sector: 'Education',
    website: 'https://easya.com/',
  };

  const profileIPFSLink = await uploadToIPFS(JSON.stringify(profile));

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
      {
        id: `${did}#keys-2`,
        type: 'RsaVerificationKey2018',
        controller: did,
        publicKeyPem: RSApublicKey,
      },
    ],
    service: [
      {
        id: `${did}#profile`,
        type: 'Public Profile',
        serviceEndpoint: prefixPinata + profileIPFSLink,
      },
    ],
  };

  const didIPFSLink = await uploadToIPFS(JSON.stringify(didDocument));
  const buffer = bs58.decode(didIPFSLink);
  const fullHexString = buffer.toString();
  const hexCID = fullHexString.substring(4);

  return prefixPinata + didIPFSLink;
}
