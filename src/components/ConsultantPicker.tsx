import { useState } from 'react';
import Select, { SingleValue } from 'react-select';

import { useAuth } from '@/context/AuthProvider';

function ConsultantPicker() {
  const { user } = useAuth();
  const [userActive, setUserActive] = useState<Api.Consultant>();

  const options = user?.consultants.map(({
    id, names, lastName, scdLastName,
  }) => ({
    value: id,
    label: `${names} ${lastName} ${scdLastName}`,
  }));

  const handleChange = (selectedOption: SingleValue<{ value: string, label: string }>) => {
    console.log({ selectedOption });
    setUserActive(user?.consultants.find((consultant) => consultant.id === selectedOption?.value));
  };

  const formatUserActive = () => {
    if (!userActive) return null;
    if (userActive.id) {
      return {
        value: userActive.id,
        label: `${userActive.names} ${userActive.lastName} ${userActive.scdLastName}`,
      };
    }
    return null;
  };

  return (
    <div className="selectConsultant flex items-center">
      <img src="/assets/ic-search.svg" className="mx-2 drop-shadow-sm" alt="consultant search" />
      Consultante:
      <Select
        options={options}
        onChange={(newValue) => handleChange(newValue)}
        value={formatUserActive()}
        className="px-2 w-72"
        placeholder="Seleccionar"
        classNamePrefix="bg-transparent border-0 outline-none font-bold"
        noOptionsMessage={() => 'No hay coincidencias'}
      />
    </div>
  );
}

export default ConsultantPicker;
