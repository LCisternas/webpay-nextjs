// import { NextResponse } from 'next/server';
// import {
//   WebpayPlus,
//   Options,
//   IntegrationCommerceCodes,
//   IntegrationApiKeys,
//   Environment,
// } from 'transbank-sdk';

// interface HttpError {
//   response?: {
//     status?: number;
//   };
//   statusCode?: number;
//   message?: string;
// }

// const commerceCode =
//   process.env.WP_COMMERCE_CODE ?? IntegrationCommerceCodes.WEBPAY_PLUS;
// const apiKey = process.env.WP_API_KEY ?? IntegrationApiKeys.WEBPAY;
// const env =
//   process.env.WEBPAY_ENV === 'production'
//     ? Environment.Production
//     : Environment.Integration;

// const txCommit = new WebpayPlus.Transaction(
//   new Options(commerceCode, apiKey, env)
// );

// export async function POST(req: Request) {
//   const { token, buyOrder } = await req.json();
//   if (!token || !buyOrder) {
//     return NextResponse.json({ error: 'Token is missing' }, { status: 400 });
//   }

//   let result;
//   try {
//     result = await txCommit.commit(token);
//   } catch (err) {
//     const error = err as HttpError;
//     const statusCode = error.response?.status ?? error.statusCode;
//     console.log(statusCode, error.message);

//     if (statusCode === 422) {
//       try {
//         result = await txCommit.status(token);
//       } catch (statusErr) {
//         console.error('[API /transaction/commit] status error:', statusErr);
//         return NextResponse.json(
//           { error: statusErr || 'Error getting status' },
//           { status: 500 }
//         );
//       }
//     } else if (statusCode === 401) {
//       return NextResponse.json(
//         { error: 'Unauthorized: invalid credentials' },
//         { status: 401 }
//       );
//     } else {
//       console.error('[API /transaction/commit] unexpected error:', err);
//       return NextResponse.json(
//         { error: err || 'Error confirming transaction' },
//         { status: 500 }
//       );
//     }
//   }

//   return NextResponse.json(result);
// }

export async function POST(req: Request) {
  console.log(req) // luego elimina esto
}
