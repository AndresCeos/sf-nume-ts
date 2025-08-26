import CircleNumber from '@/components/CircleNumber';

interface SynastryMetrics {
  name: string;
  soul: string;
  expression: string;
  maturity: string;
}

interface MetricsGridProps {
  metrics: SynastryMetrics;
}

function MetricsGrid({ metrics }: MetricsGridProps) {
  return (
    <div className="grid grid-cols-4">
      <div className="flex flex-col items-center justify-center text-gray-500 font-bold">
        <span className="mb-3 text-gray text-13">Nombre</span>
        <CircleNumber size="sm" appearance="blue-30" border="blue">
          {metrics.name}
        </CircleNumber>
      </div>
      <div className="flex flex-col items-center justify-center text-gray-500 font-bold">
        <span className="mb-3 text-gray text-13">Alma</span>
        <CircleNumber size="sm" appearance="blue-30" border="blue" radiant>
          {metrics.soul}
        </CircleNumber>
      </div>
      <div className="flex flex-col items-center justify-center text-gray-500 font-bold">
        <span className="mb-3 text-gray text-13">Expresión</span>
        <CircleNumber size="sm" appearance="blue-30" border="blue">
          {metrics.expression}
        </CircleNumber>
      </div>
      <div className="flex flex-col items-center justify-center text-gray-500 font-bold">
        <span className="mb-3 text-gray text-13">Madurez</span>
        <CircleNumber size="sm" appearance="aguamarina-30" border="aguamarina">
          {metrics.maturity}
        </CircleNumber>
      </div>
    </div>
  );
}

export default MetricsGrid;