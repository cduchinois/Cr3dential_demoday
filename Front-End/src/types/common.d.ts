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

  interface IOpportunity {
    id: string;
    title: string;
    description: string;
    img: string | StaticImageData;
    issuer: string;
    credentialsRequired: ICredential[];
    deadlineToApply: Date;
    location: string;
  }
}
