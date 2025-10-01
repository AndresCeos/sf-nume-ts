/* eslint-disable import/order */
import MyModal from '@/components/MyModal';
import { useAuth } from '@/context/AuthProvider';
import useConsult from '@/hooks/useConsult';
import { formatDate } from '@/utils/constants';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ConsultantModalNotes from './ConsultantModalNotes';
import LastConsult from './LastConsult';

function ConsultantProfile() {
  const { consultant } = useConsult();
  const [showModal, setShowModal] = useState(false);
  const { user: userAuth } = useAuth();
  const users = userAuth?.consultants;
  const { t } = useTranslation();

  if (!consultant) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <img
          src="/assets/welcome.png"
          className="w-16 mb-4 opacity-50"
          alt="welcome"
        />
        <h3 className="text-main text-lg font-bold mb-2">
          Selecciona un consultante
        </h3>
        <p className="text-gray-600 text-sm">
          Elige un consultante del historial para ver su perfil completo
        </p>
      </div>
    );
  }
  const consultantInfo = Array.isArray(users) ? users.find((element) => element.id === consultant.id) : null;
  return (
    <div>
      <div className="flex">
        <div className="p-7 text-main text-2xl">
          <strong>{consultantInfo?.names || ''}</strong>
          {' '}
          <br />
          {consultantInfo?.lastName || ''}
          {' '}
          {consultantInfo?.scdLastName || ''}
        </div>
      </div>
      <div className=" px-7 text-13 leading-7">
        {t('forms.birthDate')}
        :
        <strong>{(consultantInfo?.date) ? formatDate({ date: new Date(`${consultantInfo?.date}`), format: 'long' }) : '-'}</strong>
        <div className="flex justify-between mb-1">
          <div className="text-13 leading-7">
            Nacionalidad:
            <strong>{consultantInfo?.nationality || '-'}</strong>
          </div>
          <div className="text-13 leading-7">
            Sexo:
            <strong>{consultantInfo?.gender || '-'}</strong>
          </div>
        </div>
      </div>
      <div className="text-13 bg-gold-15 px-7 py-2">
        <LastConsult />
      </div>
      <div className="px-7 pt-3 pb-7">
        <div className="text-13 text-main font-bold py-2">
          <p>Datos Profesionales</p>
        </div>
        <div className="text-13">
          <li>
            <strong>Empresa: </strong>
            {consultantInfo?.company || '-'}
          </li>
        </div>
      </div>
      <div>
        {showModal
        && (
        <MyModal size="large" title="Historial de Notas" isOpen={showModal} setIsOpen={setShowModal} icon isLoading={false}>
          <ConsultantModalNotes item={consultantInfo?.notes} />
        </MyModal>
        )}
      </div>
    </div>
  );
}
export default ConsultantProfile;
