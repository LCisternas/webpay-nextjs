// Aqui recibido la transaccion y su confirmacion... (AMBIENTE DE PRUEBAS)

interface HttpError {
  response?: {
    status?: number;
  };
  statusCode?: number;
  message?: string;
}

import { NextResponse } from 'next/server';
import {
  WebpayPlus,
  Options,
  IntegrationCommerceCodes,
  IntegrationApiKeys,
  Environment,
} from 'transbank-sdk';

const txCommit = new WebpayPlus.Transaction(
  new Options(
    IntegrationCommerceCodes.WEBPAY_PLUS,
    IntegrationApiKeys.WEBPAY,
    Environment.Integration
  )
);

export async function POST(req: Request) {
  // Extraemos token y buyOrder desde la petición
  const { token, buyOrder } = await req.json();

  if (!token || !buyOrder) {
    return NextResponse.json(
      { error: 'Faltan y son necesarios token y buyOrder' },
      { status: 400 }
    );
  }

  let result;
  try {
    result = await txCommit.commit(token);
  } catch (err: unknown) {
    const error = err as HttpError;
    const statusCode = error.response?.status ?? error.statusCode;
    console.log(statusCode, error.message);

    if (statusCode === 422) {
      try {
        result = await txCommit.status(token);
      } catch (statusErr) {
        console.error('[API /transaction/commit] status error:', statusErr);
        return NextResponse.json(
          { error: statusErr || 'Error getting status' },
          { status: 500 }
        );
      }
    } else if (statusCode === 401) {
      return NextResponse.json(
        { error: 'Unauthorized: invalid credentials' },
        { status: 401 }
      );
    } else {
      console.error('[API /transaction/commit] unexpected error:', err);
      return NextResponse.json(
        { error: error.message || 'Error confirming transaction' },
        { status: 500 }
      );
    }
  }

  return NextResponse.json(result);
}
