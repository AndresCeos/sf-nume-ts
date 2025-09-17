/* eslint-disable import/order */
import ConsultantForm from '@/components/dashboard/consultant/ConsultantForm';
import ConsultantList from '@/components/dashboard/consultant/ConsultantList';
import ConsultantNotesModal from '@/components/dashboard/consultant/ConsultantNotesModal';
import ConsultantProfile from '@/components/dashboard/consultant/ConsultantProfile';
import NoConsultantSelected from '@/components/NoConsultantSelected';
import SectionTitle from '@/components/SectionTitle';
import { useAuth } from '@/context/AuthProvider';
import useConsult from '@/hooks/useConsult';
import { useState } from 'react';

function ConsultantPage() {
  const [searchString, setSearchString] = useState('');
  const [showNotesModal, setShowNotesModal] = useState(false);
  const { consultant } = useConsult();
  const { user: userAuth } = useAuth();

  if (!consultant) return (<NoConsultantSelected />);

  // Obtener las notas del consultor actual
  const users = userAuth?.consultants;
  const consultantInfo = users?.find((element) => element.id === consultant.id);
  const consultantNotes = consultantInfo?.notes;

  return (
    <div className="page-content bg-home-background bg-cover">
      <div className="mt-8 ml-14 flex justify-start items-center pt-10">
        <img src="/assets/welcome.png" className="w-16" alt="welcome" />
        <h2 className="font-black mt-0 mb-2 text-main text-2xl">¿A quién vas a consultar hoy?</h2>
      </div>
      <div className="grid grid-cols-10 mt-8 mx-14 gap-4">
        <div className="col-span-6">
          <div className="mb-5">
            <SectionTitle
              title="Agregar Consultante"
              button={{
                isActive: false,
                text: '',
                handle: () => { },
              }}
            />
            <div className="section-wrap px-2 py-7">
              <ConsultantForm />
            </div>
          </div>
          <div className="mb-5">
            <SectionTitle
              title="Historrial"
              button={{
                isActive: false,
                text: '',
                handle: () => { },
              }}
            />
            <div className="section-wrap px-2 py-7 users-wrap">
              <div className="users-search rounded-3xl relative mb-6">
                <img
                  src="/assets/ic-search.svg"
                  alt="edit"
                  className="absolute left-2 top-2"
                />
                <input
                  type="search"
                  className="w-full h-8 bg-transparent outline-none pl-10 pr-4"
                  value={searchString}
                  onChange={(e) => setSearchString(e.target.value)}
                  placeholder="Buscar"
                />
              </div>
              <ul className="users-table h-36 overflow-y-scroll">
                <li className="w-full grid grid-cols-12 font-bold h-10">
                  <div className="col-span-6">Nombre</div>
                  <div className="col-span-4">Fecha de Nacimiento</div>
                  <div className="col-span-2">Acciones</div>
                </li>
                <ConsultantList searchUser={searchString} />

              </ul>
            </div>

          </div>

        </div>
        <div className="col-span-4">
          <SectionTitle
            title="Perfil del Consultante"
            button={{
              isActive: false,
              text: '',
              handle: () => { },
            }}
          />
          <div className="section-wrap px-2 py-7">
            {/* Botón para ver notas */}
            {consultantNotes && Object.keys(consultantNotes).length > 0 && (
              <div className="mb-4">
                <button
                  type="button"
                  className="bg-main rounded-full text-white px-4 py-2 flex items-center gap-2 font-bold hover:opacity-90 transition-opacity"
                  onClick={() => setShowNotesModal(true)}
                >
                  <img
                    src="/assets/navbar/notes.svg"
                    alt="notas"
                    className="w-4 h-4"
                  />
                  Ver Notas del Consultor
                </button>
              </div>
            )}
            <ConsultantProfile />
          </div>
        </div>
      </div>

      {/* Modal de notas del consultor */}
      <ConsultantNotesModal
        isOpen={showNotesModal}
        setIsOpen={setShowNotesModal}
        notes={consultantNotes || {}}
      />

    </div>
  );
}

export default ConsultantPage;
