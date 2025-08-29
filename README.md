# Webpay + Next.js Integration

Este proyecto es un **ejemplo práctico** de cómo integrar directamente el SDK de Transbank (Webpay) con las API Routes de Next.js, mostrando un flujo completo de pagos desde la creación hasta la confirmación de transacciones.

## 🎯 Propósito

Demostrar la integración directa entre:
- **SDK de Transbank** para procesamiento de pagos
- **API Routes de Next.js** como backend
- **Flujo completo de Webpay** (creación, redirección y confirmación)

## 🚀 Características

- ✅ Integración completa con Webpay Plus
- ✅ Ambiente de pruebas y producción
- ✅ Manejo de transacciones con tokens seguros
- ✅ Interfaz moderna con Tailwind CSS
- ✅ Validación y manejo de errores
- ✅ TypeScript para mayor seguridad

## 🛠️ Tecnologías

- **Next.js 15** - Framework React
- **TypeScript** - Tipado estático
- **Transbank SDK 6.1.0** - Procesamiento de pagos
- **Tailwind CSS** - Estilos
- **Lucide React** - Iconos

## 📋 Requisitos Previos

- Node.js 18+ instalado
- Cuenta de Transbank (para producciónm, no es necesario si solo quieres utilizar el ambiente de pruebas)
- npm/yarn/pnpm

## ⚙️ Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone <url-del-repositorio>
cd webpay-nextjs
```

### 2. Instalar dependencias
```bash
npm install
# o
yarn install
# o
pnpm install
```

### 3. Configuración de variables de entorno

Para el **ambiente de producción**, crea un archivo `.env.local` en la raíz del proyecto:

```env
# .env.local (SOLO PARA PRODUCCIÓN)
WP_COMMERCE_CODE=tu_codigo_de_comercio
WP_API_KEY=tu_api_key
WEBPAY_ENV=production
NEXT_PUBLIC_HOST=https://tu-dominio.com
```

> **Nota**: El ambiente de pruebas no requiere variables de entorno ya que utiliza las credenciales de integración predeterminadas del SDK.

### 4. Ejecutar en desarrollo
```bash
npm run dev
# o
yarn dev
# o
pnpm dev
```

El proyecto estará disponible en [http://localhost:3000](http://localhost:3000)

## 📁 Estructura del Proyecto

```
├── app/
│   ├── api/
│   │   └── webpay/
│   │       ├── test/           # Ambiente de pruebas
│   │       │   ├── create/     # Crear transacción
│   │       │   └── commit/     # Confirmar transacción
│   │       └── production/     # Ambiente de producción
│   │           ├── create/     # Crear transacción
│   │           └── commit/     # Confirmar transacción
│   ├── error/                  # Página de error
│   ├── success/                # Página de éxito
│   ├── process/                # Procesamiento de callback
│   └── page.tsx                # Página principal
├── components/
│   └── ui/                     # Componentes UI con shadcn/ui
├── lib/
│   └── utils.ts                # Utilidades
└── public/                     # Archivos estáticos
```

## 🔧 Configuración de Ambientes

### Ambiente de Pruebas (Test)
- **Ruta**: `/api/webpay/test/`
- **Credenciales**: Integración predeterminada
- **Configuración**: Sin variables de entorno requeridas

### Ambiente de Producción
- **Ruta**: `/api/webpay/production/`
- **Credenciales**: Configuración mediante `.env.local`
- **Variables requeridas**:
  - `WP_COMMERCE_CODE`: Código de comercio de Transbank
  - `WP_API_KEY`: API Key de Transbank
  - `WEBPAY_ENV=production`
  - `NEXT_PUBLIC_HOST`: URL de tu aplicación en producción

## 💳 Flujo de Transacción

1. **Inicio**: Usuario confirma la compra ($29.990)
2. **Creación**: API crea transacción en Transbank
3. **Redirección**: Usuario es enviado a Webpay
4. **Pago**: Usuario completa el pago en Webpay
5. **Callback**: Webpay retorna a `/process`
6. **Confirmación**: API confirma la transacción
7. **Resultado**: Usuario ve página de éxito o error

## 🧪 Credenciales de Prueba

### Tarjetas de Prueba

**VISA (Aprobada)**
- Número: `4051885600446623`
- CVV: `123`
- Fecha: Cualquiera

**Mastercard (Rechazada)**
- Número: `5186059559590568`
- CVV: `123`
- Fecha: Cualquiera

**Redcompra (Débito)**
- Número: Cualquier número válido
- RUT: `11.111.111-1`
- Clave: `123`

## 🔍 Endpoints de la API

### Ambiente de Pruebas
- `POST /api/webpay/test/create` - Crear transacción
- `POST /api/webpay/test/commit` - Confirmar transacción

### Ambiente de Producción
- `POST /api/webpay/production/create` - Crear transacción
- `POST /api/webpay/production/commit` - Confirmar transacción

## 🔒 Seguridad

- ✅ Validación de tokens en servidor
- ✅ Manejo seguro de credenciales
- ✅ Verificación de estado de transacciones
- ✅ Variables de entorno para datos sensibles
- ✅ Manejo de errores HTTP "decente"

## ⚠️ Consideraciones Importantes

1. **Ambiente de Pruebas**: Utiliza credenciales de integración automáticamente
2. **Ambiente de Producción**: Requiere configuración manual de variables de entorno
3. **Tokens de Transacción**: Son únicos y de un solo uso

## 🐛 Troubleshooting

### Error 401 - Unauthorized
- Verifica que las credenciales en `.env.local` sean correctas
- Asegúrate de que `WEBPAY_ENV=production` esté configurado

### Error 422 - Token ya usado
- Los tokens de Webpay son de un solo uso
- Genera una nueva transacción para cada intento de pago

### Redirección fallida
- Verifica que `NEXT_PUBLIC_HOST` tenga la URL correcta
- Asegúrate de que `/process` sea accesible públicamente

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Añadir nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

Este proyecto es un ejemplo educativo para demostrar la integración con Webpay.