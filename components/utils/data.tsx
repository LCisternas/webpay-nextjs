export const steps = [
  {
    step: '1',
    title: 'Crear Transacción',
    description:
      'La API genera un token único y URL de redirección usando el SDK de Transbank.',
  },
  {
    step: '2',
    title: 'Redirección a Webpay',
    description:
      'El usuario es redirigido al formulario de pago seguro de Webpay.',
  },
  {
    step: '3',
    title: 'Procesar Pago',
    description:
      'Webpay procesa el pago y retorna el control a nuestra aplicación.',
  },
  {
    step: '4',
    title: 'Confirmar Transacción',
    description:
      'La API confirma la transacción y redirige al resultado final.',
  },
];

export const createApiCode = `import { NextResponse } from 'next/server';
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

    const buyOrder = 'O-' + Date.now();
    const sessionId = 'S-' + Date.now();
    const host = process.env.NEXT_PUBLIC_HOST ?? 'http://localhost:3000';

    const returnUrl = host + '/process';

    const { url, token } = await tx.create(
      buyOrder,
      sessionId,
      amount,
      returnUrl
    );

    return NextResponse.json({ url, token, buyOrder });
  } catch (err) {
    console.error('[API /transaction/create]', err);
    return NextResponse.json(
      { error: err || 'Internal error creating transaction' },
      { status: 500 }
    );
  }
}
`;

export const commitApiCode = `interface HttpError {
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
  // Extraemos el token desde la petición
  const { token } = await req.json();

  if (!token) {
    return NextResponse.json(
      { error: 'Token is missing' },
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
`;
