import { StaticImageData } from 'next/image';

export {};

declare global {
  interface Wallet {
    address: string;
  }

  interface ICredential {
    id: string;
    issuer: string;
    name: string;
    img: string | StaticImageData;
  }
}
