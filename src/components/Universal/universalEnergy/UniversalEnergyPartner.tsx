import cx from 'classnames';
import _ from 'lodash';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import partnerImg from '@/assets/partner.png';
import { TiPlus } from 'react-icons/ti';

import PartnerSelectionModal from '@/components/modal/PartnerSelectionModal';
import useConsult from '@/hooks/useConsult';
import useEnergy from '@/hooks/useEnergy';
import Person from '@/resources/Person';
import Synastry from '@/resources/Synastry';
import { useEffect } from 'react';

type UniversalEnergyPartnerProps = {
  setActive: () => void;
  selected: boolean;
};

function UniversalEnergyPartner({
  setActive, selected,
}: UniversalEnergyPartnerProps) {
  const {
    activeConsultant, calculationYear,
  } = useConsult();
  const { setActiveSelection, selectedType, setSelectedType } = useEnergy();
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  if (!activeConsultant) return null;

  // Verificar si el consultante tiene PartnerData
  const hasPartnerData = activeConsultant?.partnerData && activeConsultant.partnerData.length > 0;

  // Obtener la pareja actual seleccionada
  const currentPartner = activeConsultant?.guestEnergy?.guestPartner;

  // Efecto para establecer automáticamente la pareja seleccionada como selección activa
  useEffect(() => {
    if (selectedType === 'partner' && currentPartner && currentPartner.partner && currentPartner.partner.length >= 2) {
      const mapPartner = currentPartner.partner.map((p) => new Person({
        id: p.id,
        name: p.names,
        lastName: p.lastName,
        scdLastName: p.scdLastName,
        birthDate: p.date,
        yearMet: currentPartner.yearMeet,
      }));

      const synastryFromCurrent = new Synastry(mapPartner[0], mapPartner[1]);
      setActiveSelection(synastryFromCurrent);
    }
  }, [selectedType, currentPartner, setActiveSelection]);

  // Crear instancia de Synastry si hay pareja seleccionada
  let synastry: Synastry | null = null;
  let day = 0;
  let month = 0;

  if (currentPartner && activeConsultant) {
    const mapPartner = currentPartner?.partner?.map((partner) => new Person({
      id: partner.id,
      name: partner.names,
      lastName: partner.lastName,
      scdLastName: partner.scdLastName,
      birthDate: partner.date,
      yearMet: currentPartner.yearMeet,
    }));

    if (mapPartner && mapPartner.length >= 2) {
      synastry = new Synastry(mapPartner[0], mapPartner[1]);
      day = Number(synastry.getDayOfBirth() || 0);
      month = Number(synastry.getMonthOfBirth() || 0);
    }
  }

  const handlePartnerSelect = (partner: Api.PartnerData) => {
    // Establecer el tipo seleccionado como 'partner'
    setSelectedType('partner');

    // Crear instancia de Synastry y establecerla como selección activa
    if (partner?.partner && partner.partner.length >= 2) {
      const mapPartner = partner.partner.map((p) => new Person({
        id: p.id,
        name: p.names,
        lastName: p.lastName,
        scdLastName: p.scdLastName,
        birthDate: p.date,
        yearMet: partner.yearMeet,
      }));

      const synastrySelected = new Synastry(mapPartner[0], mapPartner[1]);
      setActiveSelection(synastrySelected);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <ul className={cx(
      'flex flex-col items-center',
      { 'opacity-25': !hasPartnerData },
      'order-2',
    )}
    >
      <li className="mb-2">
        <img src={partnerImg} width={55} height={55} alt="partner_disabled" />
      </li>
      <li
        className={cx('text-center', {
          'text-main-700': !selected,
          'text-black': selected,
          'cursor-pointer': hasPartnerData && currentPartner,
          'cursor-not-allowed opacity-50': !hasPartnerData || !currentPartner,
        })}
      >
        <button
          type="button"
          onClick={() => {
            if (hasPartnerData && currentPartner) {
              setActive();
            } else if (hasPartnerData) {
              // Si hay datos pero no hay pareja seleccionada, abrir modal
              openModal();
            }
          }}
          disabled={!hasPartnerData}
          className="w-full"
        >
          {_.toUpper(t('home.energy') as string)}
          <br />
          <div className="font-black">
            {_.toUpper(t('home.partneral') as string)}
          </div>
        </button>
      </li>
      <li className={cx('rounded-full bg-white w-32 h-10 flex items-center justify-center border border-gray-700 text-[13px] inner-shadow mt-3 mb-6 font-black cursor-pointer')}>
        {/* Modal de selección de parejas */}
        <button type="button" onClick={openModal} className="w-full h-full flex items-center justify-center">
          {!hasPartnerData && (
            <div className="flex items-center justify-center">
              <TiPlus />
            </div>
          )}
          {hasPartnerData && !currentPartner && (
            <div className="flex items-center justify-center">
              <TiPlus />
            </div>
          )}
          {hasPartnerData && currentPartner && (
            <div className="flex items-center justify-center">
              {currentPartner.name || t('home.selectPartner')}
            </div>
          )}
        </button>
      </li>
      <li className="rounded-full bg-white w-10 h-10 flex items-center justify-center border border-gray-700 inner-shadow text-xl mb-3 font-black">
        {synastry ? synastry.calcPersonalDay({ day, month, year: calculationYear }) : ''}
      </li>
      <li className="rounded-full bg-white w-10 h-10 flex items-center justify-center border border-gray-700 inner-shadow text-xl mb-3 font-black">
        {synastry ? synastry.calcPersonalWeek(day, month, calculationYear) : ''}
      </li>
      <li className="rounded-full bg-white w-10 h-10 flex items-center justify-center border border-gray-700 inner-shadow text-xl mb-3 font-black">
        {synastry ? synastry.calcPersonalMonth({ day, month, year: calculationYear }) : ''}
      </li>
      <li className="rounded-full bg-white w-10 h-10 flex items-center justify-center border border-gray-700 inner-shadow text-xl mb-3 font-black">
        {synastry ? synastry.calcPersonalYear(calculationYear) : ''}
      </li>

      <PartnerSelectionModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        partnerData={activeConsultant?.partnerData || []}
        currentPartner={currentPartner || {
          id: '',
          name: '',
          date: '',
          yearMeet: 0,
        }}
        onSelectPartner={handlePartnerSelect}
      />
    </ul>
  );
}

export default UniversalEnergyPartner;
