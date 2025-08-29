import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Webpay + Nextjs',
  description:
    'Ejemplo practico de pasarela de pago webpay usando unicamente Nextjs',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
