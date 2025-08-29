import { CreditCard, ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Home() {
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
                <h3 className="text-2xl font-bold mb-6">
                  Flujo del codigo
                </h3>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">
                      Iniciar Transacción
                    </h4>
                    <p className="text-muted-foreground">
                      El usuario confirma su compra y se crea la transacción en
                      el servidor Next.js
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">
                      Redirección a Webpay
                    </h4>
                    <p className="text-muted-foreground">
                      Redirect automático al formulario seguro de Webpay con
                      token de transacción
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">
                      Confirmación y Callback
                    </h4>
                    <p className="text-muted-foreground">
                      Webpay procesa el pago y retorna a la aplicación con el
                      resultado
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">
                      Validación Server-Side
                    </h4>
                    <p className="text-muted-foreground">
                      La API de Next.js confirma la transacción con Transbank y
                      actualiza el estado
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
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

                    <Button className="w-full gap-2 h-12 text-base">
                      {/* <CreditCard className="w-5 h-5" /> */}
                      <CreditCard />
                      Pagar con Webpay
                      <ArrowRight className="w-5 h-5" />
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      * Este es un ambiente de pruebas. No se procesarán pagos
                      reales.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
