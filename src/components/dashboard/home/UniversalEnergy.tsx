import UniversalEnergyValues from '@/components/Universal/universalEnergy/UniversalEnergyValues';

function UniversalEnergy() {
  return (
    <div>
      <div className="mt-14 mb-5 text-center">
        <p className="text-sm text-gray-500">
          💡 Haz clic en el nombre para editar la información
        </p>
      </div>
      <div className="grid grid-cols-4 mt-1">
        <UniversalEnergyValues />
        <UniversalEnergyValues />
        <UniversalEnergyValues />
        <UniversalEnergyValues />

      </div>

    </div>
  );
}

export default UniversalEnergy;
