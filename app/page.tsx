import Flow from '@/components/ui/layout/Flow';
import Simulator from '@/components/ui/layout/Simulator';
import Github from '@/components/ui/layout/Github';
import ApiExample from '@/components/ui/layout/ApiExamples';

export default function Home() {
  return (
    <main className="p-8 md:py-16 lg:px-28 xl:px-56 flex flex-col space-y-12">
      <section className="flex flex-col items-center space-y-2">
        <h1 className="text-4xl lg:text-6xl font-bold">Webpay + Next.js</h1>
        <p className="text-muted-foreground text-base lg:text-xl text-center">
          Integración simple del SDK de Transbank con API Routes de Nextjs
        </p>
      </section>
      <section className="flex flex-col lg:flex-row lg:justify-between space-y-6 lg:space-y-0">
        <div className="lg:hidden">
          <Simulator />
        </div>
        <Flow />
        <div className="hidden lg:flex lg:w-96">
          <Simulator />
        </div>
      </section>
      <Github />
      <ApiExample />
    </main>
  );
}
