'use client';

import React, { useEffect, useRef, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

function WebpayCommitContent() {
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
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <Loader2 className="h-12 w-12 animate-spin mx-auto" />
        <p className="text-muted-foreground">Procesando transacción...</p>
      </div>
    </div>
  );
}

export default function WebpayCommitPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center space-y-4">
            <Loader2 className="h-12 w-12 animate-spin mx-auto" />
            <p className="text-muted-foreground">Cargando...</p>
          </div>
        </div>
      }
    >
      <WebpayCommitContent />
    </Suspense>
  );
}
