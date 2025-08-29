'use client';

import { XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ErrorPage() {
  return (
    <main className="min-h-screen flex justify-center items-center">
      <section className="flex flex-col">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <XCircle className="w-24 h-24 text-red-500 mx-auto" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Error en el Pago
          </h1>

          <p className="text-xl text-muted-foreground mb-12 text-pretty leading-relaxed">
            Hubo un problema al procesar tu transacción con Webpay
          </p>

          <Link href="/">
            <Button variant="outline" size="lg" className="cursor-pointer">
              Volver
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
