'use client';

import { CreditCard, ArrowRight, Loader2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Webpay transaction
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
    <main>
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-foreground mb-6 text-balance">
              Webpay + Nextjs
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Ejemplo practico del SDK de Transbank, con API routes de Nextjs.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="w-full flex justify-between space-x-12">
              <div className="flex flex-col space-y-6">
                <h3 className="text-2xl font-bold mb-6">Flujo del codigo</h3>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">
                      Crear Transacción
                    </h4>
                    <p className="text-muted-foreground">
                      API Route de Next.js utiliza el SDK de Transbank para crear una transacción con token único
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">
                      Redirección Segura
                    </h4>
                    <p className="text-muted-foreground">
                      El usuario es redirigido automáticamente al formulario de pago seguro de Webpay
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">
                      Procesamiento del Pago
                    </h4>
                    <p className="text-muted-foreground">
                      Webpay procesa el pago del usuario y retorna el resultado a nuestra aplicación
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">
                      Confirmación Final
                    </h4>
                    <p className="text-muted-foreground">
                      La API Route confirma la transacción con Transbank y redirige al estado final
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-border">
                  <Button
                    variant="outline"
                    size="lg"
                    className="cursor-pointer"
                    onClick={() => window.open('https://github.com/LCisternas/webpay-nextjs', '_blank')}
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                    </svg>
                    Ver Código en GitHub
                  </Button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="flex justify-center">
                <Card className="w-full h-fit">
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl">Simulador de Pago</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Ambiente de pruebas Webpay
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span>Producto Demo</span>
                        <span className="font-semibold">$29.990</span>
                      </div>
                      <hr />
                      <div className="flex justify-between items-center font-bold text-lg">
                        <span>Total</span>
                        <span>$29.990</span>
                      </div>
                    </div>

                    <Button
                      className="w-full gap-2 h-12 text-base cursor-pointer"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        <>
                          <CreditCard />
                          Pagar con Webpay
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      * Este es un ambiente de pruebas. No se procesarán pagos
                      reales.
                    </p>

                    <div className="text-xs text-muted-foreground">
                      <p className="font-semibold text-xs text-left pl-2">
                        Credenciales de Prueba
                      </p>
                      <div className="p-2">
                        <div className="font-medium">VISA (aprobada)</div>
                        <div>
                          4051885600446623 / CVV: 123 / Exp.: cualquiera
                        </div>
                      </div>

                      <div className="p-2">
                        <div className="font-medium">
                          Mastercard (rechazada)
                        </div>
                        <div>
                          5186059559590568 / CVV: 123 / Exp.: cualquiera
                        </div>
                      </div>

                      <div className="p-2">
                        <div className="font-medium">Débito (Redcompra)</div>
                        <div>cualquier número válido</div>
                      </div>

                      <div className="p-2">
                        <div className="font-medium">RUT de simulación</div>
                        <div>11.111.111-1 / Clave: 123</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}