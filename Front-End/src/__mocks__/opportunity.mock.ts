import easyALogo from '@/assets/uBaka3Xr_400x400.jpg';
import xrpLogo from '@/assets/xrp-xrp-logo-CBBF77A5CF-seeklogo.com.webp';

export const defaultOpportunities: IOpportunity[] = [
  {
    id: '1',
    title: 'RippleX Developer Relations Advocate',
    description: `You need to hold the following credentials to be eligible to apply for this position: 
    - XRPL Dev Training
    - EasyA XRPL 101
    - EasyA XRPL EVM Sidechain Training
    
    Additional Preferred Credentials
    - Advanced Blockchain Development Certificate
    - Zero-Knowledge Proofs (ZKPs) Training
    - Smart Contract Development on XRPL
    `,
    img: xrpLogo,
    issuer: 'RippleX',
    credentialsRequired: [
      {
        id: '1',
        issuer: 'Issuer 1',
        name: 'Software Engineering Certificate',
        img: '/images/certificate1.png',
      },
    ],
    deadlineToApply: new Date('2025-12-31'),
    location: 'Remote',
  },
  {
    id: '2',
    title: 'Hacker at XRPL APEX',
    description: `You need to hold the following credentials to be eligible to apply for this position:
    - EasyA Blockchain 101
    - EasyA Smart Contract 101
    - EasyA Brief history on XRPL
    
    Additional Preferred Credentials
    - XRPL Dev Training
    `,
    img: easyALogo,
    issuer: 'EasyA APEX Hackathon',
    credentialsRequired: [
      {
        id: '2',
        issuer: 'Issuer 2',
        name: 'Data Science Certificate',
        img: '/images/certificate2.png',
      },
    ],
    deadlineToApply: new Date('2022-12-31'),
    location: 'Remote',
  },
];
