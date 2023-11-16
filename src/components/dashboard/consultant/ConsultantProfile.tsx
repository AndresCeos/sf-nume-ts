/* eslint-disable import/order */
import MyModal from '@/components/MyModal';
import { useAuth } from '@/context/AuthProvider';
import useConsult from '@/hooks/useConsult';
import { formatDate } from '@/utils/constants';
import { useState } from 'react';
import ConsultantModalNotes from './ConsultantModalNotes';
import LastConsult from './LastConsult';

function ConsultantProfile() {
  const { consultant } = useConsult();
  const [showModal, setShowModal] = useState(false);
  const { user: userAuth } = useAuth();
  const users = userAuth?.consultants;
  const data = users?.find((element) => element.id === consultant.id);
  console.log(data);
  if (!consultant) return null;
  return (
    <div>
      <div className="flex">
        <div className="p-7 text-main text-2xl">
          <strong>{data?.names || ''}</strong>
          {' '}
          <br />
          {data?.lastName || ''}
          {' '}
          {data?.scdLastName || ''}
        </div>
      </div>
      <div className=" px-7 text-13 leading-7">
        Fecha de nacimiento:
        <strong>{(data?.date) ? formatDate({ date: new Date(`${data?.date}`), format: 'long' }) : '-'}</strong>
        <div className="flex justify-between mb-1">
          <div className="text-13 leading-7">
            Nacionalidad:
            <strong>{data?.nationality || '-'}</strong>
          </div>
          <div className="text-13 leading-7">
            Sexo:
            <strong>{data?.gender || '-'}</strong>
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
            {data?.company || '-'}
          </li>
        </div>
        <div className="py-3 border-t-2 border-t-gray-300">
          {data?.notes
                      && (
                      <button
                        type="button"
                        className="bg-main rounded-full text-white p-4 mb-4 flex items-center gap-2 font-bold hover:opacity-90"
                        onClick={() => setShowModal(true)}
                      >
                        <img
                          src="/assets/navbar/notes.svg"
                          alt="notas"
                        />
                        Abrir Notas
                      </button>
                      )}
          <div className="text-13 text-main font-bold py-2">
            <p>Datos de Contacto</p>
          </div>
          <div className="text-13 leading-7">
            <strong>Teléfono: </strong>
            {data?.phone || '-'}
          </div>
          <div className="text-13 leading-7">
            <strong>Correo Electrónico: </strong>
            {data?.email || '-'}
          </div>
        </div>
      </div>
      <div>
        {showModal
        && (
        <MyModal size="large" title="Historial de Notas" isOpen={showModal} setIsOpen={setShowModal} icon isLoading={false}>
          <ConsultantModalNotes item={data.notes} />
        </MyModal>
        )}
      </div>
    </div>
  );
}
export default ConsultantProfile;
