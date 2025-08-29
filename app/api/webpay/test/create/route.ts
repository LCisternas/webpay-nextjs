// Aqui creamos la transaccion... (AMBIENTE DE PRUEBAS)

import { NextResponse } from 'next/server';
import {
  WebpayPlus,
  Options,
  IntegrationCommerceCodes,
  IntegrationApiKeys,
  Environment,
} from 'transbank-sdk';

const tx = new WebpayPlus.Transaction(
  new Options(
    IntegrationCommerceCodes.WEBPAY_PLUS,
    IntegrationApiKeys.WEBPAY,
    Environment.Integration
  )
);

export async function POST(req: Request) {
  try {
    const { amount } = await req.json();
    if (typeof amount !== 'number') {
      return NextResponse.json(
        { error: 'The amount field must be a number' },
        { status: 400 }
      );
    }

    const buyOrder = `O-${Date.now()}`;
    const sessionId = `S-${Date.now()}`;
    const host = process.env.NEXT_PUBLIC_HOST ?? 'http://localhost:3000';

    const returnUrl = `${host}/checkout/webpay/commit`;

    const { url, token } = await tx.create(
      buyOrder,
      sessionId,
      amount,
      returnUrl
    );

    return NextResponse.json({ url, token, buyOrder });
  } catch (err) {
    console.error('[API /transaction/create] 💥', err);
    return NextResponse.json(
      { error: err || 'Internal error creating transaction' },
      { status: 500 }
    );
  }
}
