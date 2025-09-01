"use client"

import { Card, CardHeader, CardTitle, CardContent } from '../card';
import { Button } from '../button';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { createApiCode, commitApiCode } from '@/components/utils/data';

const ApiExample = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = async (code: string, id: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(id);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Error copying to clipboard:', err);
    }
  };

  return (
    <div className="flex flex-col space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col space-y-4">
            <div>
              <CardTitle className="text-lg text-center">
                POST /api/webpay/test/create
              </CardTitle>
              <p className="text-sm text-muted-foreground text-center">
                Inicializa una nueva transacción
              </p>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => copyToClipboard(createApiCode, 'create')}
              className="shrink-0 border"
            >
              {copiedCode === 'create' ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Código copiado
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copiar
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-muted rounded-lg p-4 overflow-auto h-96">
            <pre className="text-sm">
              <code>{createApiCode}</code>
            </pre>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex flex-col space-y-4">
            <div>
              <CardTitle className="text-lg text-center">
                POST /api/webpay/test/commit
              </CardTitle>
              <p className="text-sm text-muted-foreground text-center">
                Confirmar la transacción
              </p>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => copyToClipboard(commitApiCode, 'commit')}
              className="shrink-0 border"
            >
              {copiedCode === 'commit' ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Código copiado
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copiar
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-muted rounded-lg p-4 overflow-auto h-96">
            <pre className="text-sm">
              <code>{commitApiCode}</code>
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApiExample;
