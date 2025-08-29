'use client';

import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function SuccessPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <section className="flex flex-col">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <CheckCircle className="w-24 h-24 text-green-500 mx-auto" />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              ¡Pago Exitoso!
            </h1>

            <p className="text-xl text-muted-foreground mb-12 text-pretty leading-relaxed">
              Tu transacción ha sido procesada correctamente por Webpay
            </p>

            <Link href="/">
              <Button variant="outline" size="lg" className="cursor-pointer">
                Volver
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
