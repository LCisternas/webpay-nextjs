'use client';

import React, { useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function WebpayCommitPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const didCommit = useRef(false);

  useEffect(() => {
    if (didCommit.current) return;
    didCommit.current = true;

    const token = searchParams.get('token_ws');

    if (!token) {
      console.log('Faltan token');
      router.replace('/error');
      return;
    }

    (async () => {
      try {
        // Confirmar transacción en Webpay
        const resp = await fetch('/api/webpay/test/commit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });
        const data = await resp.json();

        console.log('Resultado Webpay commit:', data);

        // Caso rechazado
        if (data.status !== 'AUTHORIZED') {
          console.log('Pago rechazado por Webpay:', data);
          router.replace('/error');
        } else {
          router.replace('/success');
        }
      } catch (err) {
        console.error('Error en flujo Webpay commit:', err);
        router.replace('/error');
      }
    })();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-10s0">
      <Loader2 className="h-12 w-12 animate-spin" />
    </div>
  );
}
