import {
  useContext, useMemo, useState,
} from 'react';
import { MdEdit } from 'react-icons/md';

import makeConsultant from '@/api/useConsultant';
import { ConsultContext } from '@/context/ConsultContext';
import useConsultants from '@/hooks/useConsultants';
import Person from '@/resources/Person';
import Swal from 'sweetalert2';
import add_user_main from '../../assets/icons/add_user_main.svg';
import c_delete from '../../assets/icons/c_delete.svg';
import PartnerDataForm from './PartnerDataForm';
import PartnerForm from './PartnerForm';

type PartnerFormInLineProps = {
  setIsAddFormActive: (isAddFormActive: boolean) => void;
  handleEditPartner: () => void;
  isAddFormActive: boolean;
  hasPartner: boolean;
};

export default function PartnerFormInLine({
  setIsAddFormActive,
  handleEditPartner,
  isAddFormActive,
  hasPartner,
}: PartnerFormInLineProps) {
  const {
    partnerDataAvailable,
    activePartnerData,
    selectActivePartnerData,
    activeConsultant,
    updateConsultantPartners,
    isEditingPartnerData,
    handleIsEditingPartnerData,
  } = useContext(ConsultContext);
  const handleConsultants = useConsultants();
  const addConsultantAsync = makeConsultant();

  // Usar variables del contexto global en lugar de locales

  // Obtener la versión más actualizada del partnerData activo
  const currentActivePartnerData = useMemo(() => {
    if (!activePartnerData) return null;

    // Buscar el partnerData actualizado en partnerDataAvailable
    const updatedPartnerData = (partnerDataAvailable || []).find((p) => p.id === activePartnerData.id);

    if (!updatedPartnerData) return activePartnerData;

    return updatedPartnerData;
  }, [activePartnerData, partnerDataAvailable]);
  console.log('currentActivePartnerData', currentActivePartnerData);

  // Obtener el primer partner del grupo activo para mostrar en la UI
  /* const currentActivePartner = useMemo(() => {
    if (!currentActivePartnerData || !currentActivePartnerData.partner || currentActivePartnerData.partner.length === 0) {
      return null;
    }

    const firstPartner = currentActivePartnerData.partner[0];
    return new Person({
      id: firstPartner.id,
      name: firstPartner.names,
      lastName: firstPartner.lastName,
      scdLastName: firstPartner.scdLastName,
      birthDate: firstPartner.date,
      yearMet: currentActivePartnerData.yearMeet,
    });
  }, [currentActivePartnerData]); */

  if (!activeConsultant) return null;

  const hasNoPartners = hasPartner;

  // Estado para distinguir si estamos agregando pareja a grupo existente
  const [isAddingPartnerToGroup, setIsAddingPartnerToGroup] = useState(false);

  // Estado para trackear qué pareja específica se está editando
  const [partnerBeingEdited, setPartnerBeingEdited] = useState<Api.Partner | null>(null);

  const editPartner = (partnerId: string) => {
    // Encontrar la pareja específica a editar
    const partnerToEdit = currentActivePartnerData?.partner?.find((p) => p.id === partnerId);
    if (partnerToEdit) {
      setPartnerBeingEdited(partnerToEdit);
      setIsAddFormActive(true);
      handleEditPartner();
    }
  };

  const editGroup = () => {
    setIsAddFormActive(true);
    handleIsEditingPartnerData(true);
  };

  const removeUser = () => { // TODO: Revisar esta función
    const emptyPartnerData: Api.PartnerData = {
      id: '',
      name: '',
      date: '',
      yearMeet: 0,
      partner: [],
    };
    selectActivePartnerData(emptyPartnerData);
  };

  const selectedPartner = (e: React.ChangeEvent<HTMLSelectElement>) => { // TODO: Revisar esta función
    const partnerDataId = e.target.value;
    const selectedPartnerData = (partnerDataAvailable || []).find((p) => p.id === partnerDataId);
    console.log('selectedPartnerData', selectedPartnerData);
    if (selectedPartnerData) {
      selectActivePartnerData(selectedPartnerData);
    }
  };

  // Función para crear nuevo grupo
  const handleCreateGroup = () => {
    handleIsEditingPartnerData(false);
    setIsAddFormActive(true);
  };

  // Función para agregar pareja a grupo existente
  const handleAddPartner = () => {
    setIsAddingPartnerToGroup(true);
    setIsAddFormActive(true);
  };
  const handleRemovePartner = async (partnerId: string) => {
    const partnerToRemove = currentActivePartnerData?.partner?.find((p) => p.id === partnerId);
    const partnerName = partnerToRemove ? `${partnerToRemove.names} ${partnerToRemove.lastName}` : 'este miembro';

    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Estás seguro de que quieres eliminar a ${partnerName} del grupo?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });
    if (result.isConfirmed) {
      try {
        Swal.fire({
          title: 'Eliminando...',
          text: 'Por favor espera mientras se elimina la pareja.',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        const updatedPartnerData: Api.PartnerData = {
          id: currentActivePartnerData?.id || '',
          name: currentActivePartnerData?.name || '',
          date: currentActivePartnerData?.date || '',
          yearMeet: currentActivePartnerData?.yearMeet || 0,
          partner: currentActivePartnerData?.partner?.filter((p: Api.Partner) => p.id !== partnerId) || [],
        };

        const updatedConsultant: Api.Consultant = {
          ...activeConsultant,
          partnerData: activeConsultant.partnerData?.map((p) => (p.id === currentActivePartnerData?.id ? updatedPartnerData : p)) || [],
        };

        const consultantsList = handleConsultants.updateConsultant(activeConsultant.id, updatedConsultant);
        await addConsultantAsync.mutateAsync(consultantsList);

        // Actualizar el contexto con el consultor actualizado
        updateConsultantPartners(updatedConsultant);

        Swal.fire(
          '¡Eliminado!',
          `${partnerName} ha sido eliminado del grupo exitosamente.`,
          'success',
        );
      } catch (error) {
        console.error('Error al eliminar pareja:', error);
        Swal.fire(
          'Error',
          'No se pudo eliminar la pareja. Por favor, inténtalo de nuevo.',
          'error',
        );
      }
    }
  };

  // Función para cerrar formularios
  const handleCloseForm = () => {
    setIsAddFormActive(false);
    handleIsEditingPartnerData(false);
    setIsAddingPartnerToGroup(false);
    setPartnerBeingEdited(null);
  };

  // Mostrar formulario de creación/edición de grupo
  if (isAddFormActive && isEditingPartnerData) {
    return (
      <PartnerDataForm
        activeConsultant={activeConsultant}
        setIsAddFormActive={handleCloseForm}
        isEditing
        partnerDataToEdit={currentActivePartnerData || undefined}
      />
    );
  }

  // Mostrar formulario de editar pareja individual
  if (isAddFormActive && partnerBeingEdited) {
    return (
      <PartnerForm
        activeConsultant={activeConsultant}
        setIsAddFormActive={handleCloseForm}
        isEditing
        partnerToEdit={partnerBeingEdited}
      />
    );
  }

  // Mostrar formulario de agregar pareja a grupo existente
  if (isAddFormActive && isAddingPartnerToGroup) {
    return (
      <PartnerForm
        activeConsultant={activeConsultant}
        setIsAddFormActive={handleCloseForm}
        isEditing={false}
        partnerToEdit={undefined}
      />
    );
  }

  // Mostrar formulario de crear nuevo grupo cuando viene del botón de SelectPartner
  if (isAddFormActive && !isEditingPartnerData && !isAddingPartnerToGroup && !partnerBeingEdited) {
    return (
      <PartnerDataForm
        activeConsultant={activeConsultant}
        setIsAddFormActive={handleCloseForm}
        isEditing={false}
        partnerDataToEdit={undefined}
      />
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Header Section */}
      {/* Main Group Data Form */}
      <div className="space-y-4">
        {/* Group Selection */}
        <div className="flex items-center justify-between">
          <div className="flex items-center flex-1">
            <button type="button" onClick={editGroup} disabled={!currentActivePartnerData}>
              <img src={add_user_main} className="w-6 h-6 mr-3 text-gray-400" alt="add_user_main" />
              <MdEdit className="text-gray-400 mr-2" />
            </button>
            <p className="font-bold text-sm mr-3">Grupo de Parejas:</p>
            <select
              onChange={selectedPartner}
              className="border rounded px-3 py-2 flex-1"
              value={currentActivePartnerData?.id || ''}
            >
              {!currentActivePartnerData && (
                <option value="">
                  Selecciona un grupo de parejas
                </option>
              )}
              {(partnerDataAvailable || []).map((partnerData: Api.PartnerData) => (
                <option key={partnerData.id} value={partnerData.id}>
                  {partnerData.name}
                  {' '}
                  (
                  {partnerData.partner?.length || 0}
                  {' '}
                  personas)
                </option>
              ))}
            </select>
          </div>
          <button type="button" onClick={removeUser} className="ml-4">
            <img src={c_delete} alt="delete" className="w-5 h-5" />
          </button>
        </div>

        {/* Create Group Button */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleCreateGroup}
            className="btn-save w-50 text-sm"
          >
            Crear Grupo de Parejas
          </button>
        </div>

        {/* Group Information */}
        {currentActivePartnerData && (
          <div className="flex flex-col gap-4 mt-4">
            <div className="flex flex-row gap-4 w-full">
              <div className="flex items-center w-1/2">
                <MdEdit className="text-gray-400 mr-2" />
                <p className="font-bold text-sm mr-3">Nombre</p>
                <input
                  value={currentActivePartnerData.name}
                  type="text"
                  className="border rounded px-3 py-2 flex-1"
                  readOnly
                />
              </div>

              <div className="flex items-center w-1/2">
                <MdEdit className="text-gray-400 mr-2" />
                <p className="font-bold text-sm mr-3">Fecha de Creación</p>
                <input
                  value={currentActivePartnerData.date}
                  type="text"
                  className="border rounded px-3 py-2 flex-1"
                  readOnly
                />
              </div>
            </div>

            <div className="flex flex-row gap-4 w-full">
              <div className="flex items-center w-1/2">
                <MdEdit className="text-gray-400 mr-2" />
                <p className="font-bold text-sm mr-3">Parejas:</p>
                <input
                  value={currentActivePartnerData.partner?.length || 0}
                  type="text"
                  className="border rounded px-3 py-2 flex-1"
                  readOnly
                />
              </div>

              <div className="flex items-center w-1/2">
                <MdEdit className="text-gray-400 mr-2" />
                <p className="font-bold text-sm mr-3">Año de Encuentro:</p>
                <input
                  value={currentActivePartnerData.yearMeet}
                  type="text"
                  className="border rounded px-3 py-2 flex-1"
                  readOnly
                />
              </div>
            </div>
          </div>
        )}

        {/* Add Partner Button */}
        {currentActivePartnerData && currentActivePartnerData.partner && currentActivePartnerData.partner.length < 2 && (
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleAddPartner}
              className="bg-gold text-white px-6 py-2 rounded-lg font-medium"
            >
              Agregar Pareja al Grupo
            </button>
          </div>
        )}
        {hasNoPartners && !currentActivePartnerData && (
          <div className="text-sm text-gray-600 text-center bg-gray-50 p-3 rounded">
            Este grupo no tiene parejas
          </div>
        )}

        {/* Limit Message */}
        {currentActivePartnerData && currentActivePartnerData.partner && currentActivePartnerData.partner.length >= 2 && (
          <div className="text-sm text-gray-600 text-center bg-gray-50 p-3 rounded">
            Este grupo ya tiene el máximo de 2 parejas permitidas
          </div>
        )}
      </div>

      {/* Partners Section */}
      {currentActivePartnerData && currentActivePartnerData.partner && currentActivePartnerData.partner.length > 0 && (
        <>
          <hr className="my-6" />

          {/* Partners Header */}
          <div className="bg-black text-white rounded-t-lg px-4 py-3 flex items-center justify-between">
            <h3 className="font-bold">
              Parejas del Grupo:
              {' '}
              {currentActivePartnerData.name}
            </h3>
            {currentActivePartnerData.partner.length < 2 && (
              <button
                type="button"
                onClick={handleAddPartner}
                className="bg-gold text-white px-4 py-1 rounded text-sm"
              >
                Agregar Pareja
              </button>
            )}
          </div>

          {/* Partners List */}
          <div className="bg-white border border-gray-200 rounded-b-lg">
            {currentActivePartnerData.partner.map((partner) => {
              const partnerPerson = new Person({
                id: partner.id,
                name: partner.names,
                lastName: partner.lastName,
                scdLastName: partner.scdLastName,
                birthDate: partner.date,
                yearMet: currentActivePartnerData.yearMeet,
              });

              return (
                <div key={partner.id} className="flex items-center justify-between p-4 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center flex-1">
                    <div className="w-8 h-8 flex justify-center items-center rounded-full bg-blue-100 mr-3">
                      <img src={add_user_main} className="w-4 h-4" alt="add_user_main" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">
                        {partnerPerson.name}
                        {' '}
                        {partnerPerson.lastName}
                        {' '}
                        {partnerPerson.scdLastName}
                      </div>
                      <div className="text-sm text-gray-600">
                        {partnerPerson.getFormBirthDate()}
                        {' '}
                        •
                        {partnerPerson.getYearsOld()}
                        {' '}
                        años • Encuentro:
                        {currentActivePartnerData.yearMeet}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button type="button" onClick={() => editPartner(partner.id)}>
                      <MdEdit className="text-gray-400 w-4 h-4" />
                    </button>
                    <button type="button" onClick={() => handleRemovePartner(partner.id)}>
                      <img src={c_delete} alt="delete" className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
