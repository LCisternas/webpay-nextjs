"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../button';
import { Card, CardTitle, CardHeader, CardContent } from '../card';
import { CreditCard, ArrowRight, Loader2 } from 'lucide-react';

const Simulator = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const resp = await fetch('/api/webpay/test/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 29990 }),
      });
      const data = await resp.json();
      if (!resp.ok)
        throw new Error(data.error || 'Error al generar transacción');

      const { url, token } = data;
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = url;
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = 'TBK_TOKEN';
      input.value = token;
      form.appendChild(input);
      document.body.appendChild(form);
      form.submit();
    } catch (err) {
      console.log(err);
      router.push('/error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="w-5 h-5" />
          Simulador de Pago
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Producto Demo</span>
            <span>$29.990</span>
          </div>
          <hr />
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>$29.990</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <Button className="w-full" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                Pagar con Webpay
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </form>

        <div className="space-y-3 text-xs">
          <h4 className="font-medium">Tarjetas de Prueba</h4>

          <div className="space-y-2">
            <div className="p-2 bg-muted rounded">
              <div className="font-medium">VISA (Aprobada)</div>
              <div className="font-mono">4051885600446623</div>
            </div>

            <div className="p-2 bg-muted rounded">
              <div className="font-medium">Mastercard (Rechazada)</div>
              <div className="font-mono">5186059559590568</div>
            </div>
          </div>

          <p className="text-muted-foreground">CVV: 123 | Fecha: cualquiera</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Simulator;
