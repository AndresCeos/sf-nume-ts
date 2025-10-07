import groupImg from '@/assets/group.png';
import partnerImg from '@/assets/partner.png';
import personImg from '@/assets/pp.png';
import UniversalEnergyGroup from '@/components/Universal/universalEnergy/UniversalEnergyGroup';
import UniversalEnergyPartner from '@/components/Universal/universalEnergy/UniversalEnergyPartner';
import UniversalEnergyPerson from '@/components/Universal/universalEnergy/UniversalEnergyPerson';
import UniversalEnergyValues from '@/components/Universal/universalEnergy/UniversalEnergyValues';
import { useAuth } from '@/context/AuthProvider';
import useConsult from '@/hooks/useConsult';
import useEnergy from '@/hooks/useEnergy';
import Person from '@/resources/Person';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// Componente para mostrar secciones deshabilitadas
function DisabledEnergyComponent({
  title,
  subtitle,
  type,
}: {
  title: string;
  subtitle: string;
  type: string;
}) {
  return (
    <ul className={`flex flex-col items-center relative opacity-50 ${type === 'partner' ? 'order-2' : 'order-3'}`}>
      <li className="mb-2">
        <img
          src={
            (() => {
              if (type === 'person') return personImg;
              if (type === 'partner') return partnerImg;
              return groupImg;
            })()
          }
          alt="disabled"
          className="grayscale"
          width={55}
          height={55}
        />
      </li>
      <li className="text-center text-main-700">
        {title}
        <br />
        <div className="font-black">
          {subtitle}
        </div>
      </li>
      <li className="rounded-full bg-gray-100 w-32 h-10 flex items-center justify-center border border-gray-300 mt-3 mb-6 font-black text-[13px] text-center text-gray-500">
        +
      </li>
      <li className="rounded-full bg-gray-100 w-10 h-10 flex items-center justify-center border border-gray-300 text-xl mb-3 text-gray-500">
        -
      </li>
      <li className="rounded-full bg-gray-100 w-10 h-10 flex items-center justify-center border border-gray-300 text-xl mb-3 text-gray-500">
        -
      </li>
      <li className="rounded-full bg-gray-100 w-10 h-10 flex items-center justify-center border border-gray-300 text-xl mb-3 text-gray-500">
        -
      </li>
      <li className="rounded-full bg-gray-100 w-10 h-10 flex items-center justify-center border border-gray-300 text-xl mb-3 text-gray-500">
        -
      </li>
    </ul>
  );
}

function UniversalEnergy() {
  const { consultant } = useConsult();
  const { user: userAuth } = useAuth();
  const {
    setActiveSelection,
    selectedType,
    setSelectedType,
    activeSelection,
  } = useEnergy();
  const { t } = useTranslation();

  const userPerson = new Person({
    id: userAuth?.user.id?.toString() || '',
    name: userAuth?.user.firstName || '',
    lastName: userAuth?.user.lastName || '',
    scdLastName: userAuth?.user.scdLastName || '',
    birthDate: userAuth?.user.birthDate?.toString() || '',
  });

  // Resetear la selección cuando cambie el consultante - pero mantener userPerson por defecto
  useEffect(() => {
    // Solo resetear si no hay una selección activa
    if (!activeSelection) {
      setActiveSelection(userPerson);
      setSelectedType('person');
    }
  }, [consultant, setActiveSelection, setSelectedType, userPerson, activeSelection]);

  // Funciones para manejar la selección activa
  const handlePersonSelect = () => {
    // Usar userPerson del contexto en lugar de consultant
    setActiveSelection(userPerson);
    setSelectedType('person');
  };

  const handlePartnerSelect = () => {
    // La lógica para pareja se manejará en el componente UniversalEnergyPartner
    setSelectedType('partner');
  };

  const handleGroupSelect = () => {
    // La lógica para grupo se manejará en el componente UniversalEnergyGroup
    setSelectedType('group');
  };

  return (
    <div>
      <div className="mt-14 mb-5 text-center">
        {consultant ? (
          <p className="text-sm text-gray-500">
            💡 Haz clic en el nombre para editar la información
          </p>
        ) : (
          <p className="text-sm text-orange-600 font-medium">
            ⚠️ Selecciona un consultante para ver la información personal, de pareja y grupo
          </p>
        )}
      </div>
      <div className="grid grid-cols-4 mt-1">
        {/* Energía Universal - siempre visible */}
        <UniversalEnergyValues />

        {/* Personal - habilitado solo si hay consultante */}
        <UniversalEnergyPerson
          person={userPerson}
          setActive={handlePersonSelect}
          selected={selectedType === 'person'}
        />

        {/* Pareja - habilitado solo si hay consultante */}
        {consultant ? (
          <UniversalEnergyPartner
            setActive={handlePartnerSelect}
            selected={selectedType === 'partner'}
          />
        ) : (
          <DisabledEnergyComponent
            type="partner"
            title={t('universalEnergy.partnerTitle')}
            subtitle={t('universalEnergy.partnerSubtitle')}
          />
        )}

        {/* Grupo - habilitado solo si hay consultante */}
        {consultant ? (
          <UniversalEnergyGroup
            setActive={handleGroupSelect}
            selected={selectedType === 'group'}
          />
        ) : (
          <DisabledEnergyComponent
            type="group"
            title={t('universalEnergy.groupTitle')}
            subtitle={t('universalEnergy.groupSubtitle')}
          />
        )}
      </div>
    </div>
  );
}

export default UniversalEnergy;
