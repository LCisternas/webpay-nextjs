import { steps } from "@/components/utils/data";

const Flow = () => {
  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-2xl font-semibold mb-8">Flujo del codigo</h2>

      <div className="space-y-6">
        {steps.map((item) => (
          <div key={item.step} className="flex gap-4">
            <div className="w-8 h-8 bg-foreground text-background rounded-full flex items-center justify-center text-sm font-medium shrink-0">
              {item.step}
            </div>
            <div>
              <h3 className="font-medium mb-1">{item.title}</h3>
              <p className="text-muted-foreground text-sm">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Flow;
