// import { NextResponse } from 'next/server';
// import {
//   WebpayPlus,
//   Options,
//   IntegrationCommerceCodes,
//   IntegrationApiKeys,
//   Environment,
// } from 'transbank-sdk';

// const commerceCode =
//   process.env.WP_COMMERCE_CODE ?? IntegrationCommerceCodes.WEBPAY_PLUS;
// const apiKey = process.env.WP_API_KEY ?? IntegrationApiKeys.WEBPAY;
// const env =
//   process.env.WEBPAY_ENV === 'production'
//     ? Environment.Production
//     : Environment.Integration;

// const tx = new WebpayPlus.Transaction(new Options(commerceCode, apiKey, env));

// export async function POST(req: Request) {
//   try {
//     const { amount } = await req.json();
//     if (typeof amount !== 'number') {
//       return NextResponse.json(
//         { error: 'amount must be number' },
//         { status: 400 }
//       );
//     }

//     const buyOrder = `O-${Date.now()}`;
//     const sessionId = `S-${Date.now()}`;
//     const host = process.env.NEXT_PUBLIC_HOST!;
//     const returnUrl = `${host}/process`;

//     const { url, token } = await tx.create(
//       buyOrder,
//       sessionId,
//       amount,
//       returnUrl
//     );
//     return NextResponse.json({ url, token, buyOrder });
//   } catch (err: unknown) {
//     console.error('[API /transaction/create]', err);
//     return NextResponse.json(
//       { error: err || 'Internal error creating transaction' },
//       { status: 500 }
//     );
//   }
// }

export async function POST(req: Request) {
  console.log(req) // luego elimina esto
}
