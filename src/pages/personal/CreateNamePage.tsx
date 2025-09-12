/* eslint-disable max-len */
// import { useTranslation } from 'react-i18next';

import { useEffect, useState } from 'react';
import { MdEdit } from 'react-icons/md';
import { TiPlus } from 'react-icons/ti';
import Swal from 'sweetalert2';

import NoConsultantSelected from '@/components/NoConsultantSelected';

import makeConsultant from '@/api/useConsultant';
import { PDFPageConfig } from '@/components-pdf';
import CreateNamePDF from '@/components-pdf/document/CreateNamePDF';
import PDF from '@/components-pdf/document/PDF';
import WrapTitle from '@/components/WrapTitle';
import DestinyTableCreateName from '@/components/personal/createName/DestinyTableCreateName';
import InclusionTable from '@/components/personal/createName/InclusionTable';
import NameBreak from '@/components/personal/createName/NameBreak';
import NumericValues from '@/components/personal/createName/NumericValues';
import PinnacleCreateName from '@/components/personal/createName/PinnacleCreateName';
import AnnualReturn from '@/components/personal/vibrationTime/AnnualReturn';
import { useAuth } from '@/context/AuthProvider';
import useConsult from '@/hooks/useConsult';
import useConsultants from '@/hooks/useConsultants';
import Person from '@/resources/Person';
import { pdf } from '@react-pdf/renderer';
import { format } from 'date-fns';
import { saveAs } from 'file-saver';

function CreateNamePage() {
  const { user: userAuth } = useAuth();
  const {
    consultant, activeConsultant, calculationDate, selectActiveConsultant, consultationDate,
  } = useConsult();
  const {
    firstName, lastName, scdLastName, birthDate,
  } = userAuth?.user ?? {};
  const handleConsultants = useConsultants();
  const addConsultantAsync = makeConsultant();

  // Estados para los inputs (no se actualizan automáticamente)
  const [inputName, setInputName] = useState('');
  const [inputDate, setInputDate] = useState(new Date());

  // Estados para los cálculos (se actualizan solo al hacer clic en "Calcular")
  const [calculatedName, setCalculatedName] = useState('');
  const [calculatedDate, setCalculatedDate] = useState(new Date());
  const [hasCalculated, setHasCalculated] = useState(false);

  // Estados para nombres guardados
  const [selectedSavedName, setSelectedSavedName] = useState<string>('');
  const [checkN, setcheckN] = useState(false);
  const [checkP, setcheckP] = useState(false);

  // Limpiar variables de cálculo cuando cambia el consultor
  useEffect(() => {
    if (activeConsultant?.id) {
      setCalculatedName('');
      setCalculatedDate(new Date());
      setHasCalculated(false);
      setSelectedSavedName('');
      setcheckN(false);
      setcheckP(false);
      // Limpiar también los campos de entrada
      setInputName('');
      setInputDate(new Date());
    }
  }, [activeConsultant?.id]);

  // Inicializar inputs con datos del consultant
  useEffect(() => {
    if (consultant && !hasCalculated) {
      const {
        name: nameConsultant, lastName: lastNameConsultant, scdLastName: scdLastNameConsultant, birthDate: birthDateConsultant,
      } = consultant;
      setInputName(`${nameConsultant} ${lastNameConsultant} ${scdLastNameConsultant}`);
      setInputDate(birthDateConsultant);
    }
  }, [consultant, hasCalculated]);

  if (!consultant) return (<NoConsultantSelected />);

  const createNames = activeConsultant?.createNames || [];

  const createNameData = {
    id: consultant.id,
    name: calculatedName || inputName,
    lastName: '',
    scdLastName: '',
    birthDate: format(calculatedDate, 'yyyy-MM-dd'),
  };

  const createNameObj = new Person(createNameData);
  console.log(createNameObj.calcMaturity());

  const annualReturnPastYear = createNameObj.annualReturn({ ...calculationDate, year: calculationDate.year - 1 });
  const annualReturnCurrent = createNameObj.annualReturn({ ...calculationDate, year: calculationDate.year });
  const annualReturnNextYear = createNameObj.annualReturn({ ...calculationDate, year: calculationDate.year + 1 });

  const checkName = () => {
    setcheckN(!checkN);
  };
  const checkPinacle = () => {
    setcheckP(!checkP);
  };

  const isValid = () => {
    const valid = /^[a-zA-Z ñÑ]+$/;
    if (inputName === '' || !valid.test(inputName)) return false;
    if (inputDate === null) return false;
    return true;
  };

  // Solo mostrar error de validación si el usuario ha intentado calcular o si hay datos inválidos
  if ((!isValid() && hasCalculated)) {
    return (
      <div className="col-span-12 text-center font-bold">Ingresa datos validos.</div>
    );
  }

  // Función para manejar cambios en inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setInputName(value);
    } else if (name === 'date') {
      setInputDate(new Date(value));
    }
    // Resetear cálculos cuando se cambian los inputs
    setHasCalculated(false);
  };

  // Función para calcular
  const handleCalculate = () => {
    setCalculatedName(inputName);
    setCalculatedDate(inputDate);
    setHasCalculated(true);
  };

  // Función para guardar
  const handleSave = async () => {
    try {
      if (!activeConsultant || !isValid()) {
        console.error('No se puede guardar: datos inválidos o consultor no seleccionado');
        return;
      }

      // Crear el nuevo nombre a guardar
      const newCreateName: Api.CreateName = {
        id: `createName_${Date.now()}`, // Generar ID único
        name: inputName,
        lastName: '',
        scdLastName: '',
        birthDate: format(inputDate, 'yyyy-MM-dd'),
      };

      // Actualizar el consultor con el nuevo nombre
      const updatedConsultant: Api.Consultant = {
        ...activeConsultant,
        createNames: [...(activeConsultant.createNames || []), newCreateName],
      };

      // Actualizar la lista de consultores
      const consultantsList = handleConsultants.updateConsultant(activeConsultant.id, updatedConsultant);

      // Guardar en el servidor
      await addConsultantAsync.mutateAsync(consultantsList);

      // Actualizar el contexto para reflejar los cambios inmediatamente
      selectActiveConsultant(updatedConsultant);

      console.log('Nombre guardado exitosamente:', newCreateName);

      // Mostrar mensaje de éxito con SweetAlert
      Swal.fire({
        title: '¡Guardado exitosamente!',
        text: 'El nombre ha sido guardado correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      });
    } catch (error) {
      console.error('Error al guardar el nombre:', error);
      Swal.fire({
        title: 'Error',
        text: 'No se pudo guardar el nombre. Por favor, inténtalo de nuevo.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  // Función para manejar selección de nombre guardado
  const handleSavedNameSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    setSelectedSavedName(selectedId);

    if (selectedId) {
      const savedName = createNames.find((name: any) => name.id === selectedId);
      if (savedName) {
        setInputName(savedName.name);
        setInputDate(new Date(savedName.birthDate));
        setHasCalculated(false); // Resetear cálculos para que el usuario haga clic en "Calcular"
      }
    }
  };

  // Función para eliminar nombre guardado
  const handleDeleteSavedName = async (id: string) => {
    try {
      if (!activeConsultant) {
        Swal.fire({
          title: 'Error',
          text: 'No hay consultor seleccionado.',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
        return;
      }

      // Buscar el nombre a eliminar
      const nameToDelete = createNames.find((name: any) => name.id === id);
      if (!nameToDelete) {
        Swal.fire({
          title: 'Error',
          text: 'No se encontró el nombre a eliminar.',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
        return;
      }

      // Confirmar eliminación con SweetAlert
      const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: `¿Deseas eliminar el nombre "${nameToDelete.name}"?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
      });

      if (result.isConfirmed) {
        // Actualizar el consultor removiendo el nombre
        const updatedConsultant: Api.Consultant = {
          ...activeConsultant,
          createNames: activeConsultant.createNames?.filter((name: any) => name.id !== id) || [],
        };

        // Actualizar la lista de consultores
        const consultantsList = handleConsultants.updateConsultant(activeConsultant.id, updatedConsultant);

        // Guardar en el servidor
        await addConsultantAsync.mutateAsync(consultantsList);

        // Actualizar el contexto para reflejar los cambios inmediatamente
        selectActiveConsultant(updatedConsultant);

        // Limpiar selección
        setSelectedSavedName('');

        Swal.fire({
          title: '¡Eliminado!',
          text: 'El nombre ha sido eliminado exitosamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
      }
    } catch (error) {
      console.error('Error al eliminar el nombre:', error);
      Swal.fire({
        title: 'Error',
        text: 'No se pudo eliminar el nombre. Por favor, inténtalo de nuevo.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  // Función para formatear fecha de forma segura
  const formatDateForInput = (date: Date) => {
    if (date instanceof Date && !Number.isNaN(date.getTime())) {
      return date.toISOString().split('T')[0];
    }
    return '';
  };

  const handleGeneratePDF = async () => {
    const config = [CreateNamePDF as unknown as PDFPageConfig];
    const profile = new Person({
      id: '0',
      name: firstName || '',
      lastName: lastName || '',
      scdLastName: scdLastName || '',
      birthDate: birthDate?.toString() || '',
    });
    const sidebar = { email: '', webSite: '', phone: '' };
    const logoURL = '';
    const blob = await pdf((
      <PDF
        consultant={createNameObj}
        config={config}
        profile={profile}
        date={calculationDate}
        newDate={consultationDate}
        month={calculationDate.month}
        synastry={null}
        groupConsult={null}
        sidebar={sidebar}
        logoURL={logoURL}
        groupYear={0}
        partnerYear={0}
      />
    )).toBlob();
    saveAs(blob, `${consultant?.fullName} - CreateName.pdf`);
  };

  return (
    <div className="page-content bg-home-background bg-cover pb-10">
      <div className="grid grid-cols-12 mt-8 mx-14 gap-6 pt-10">
        <div className="col-span-12 mb-5">
          <div className="bg-black text-white text-base font-bold h-8 flex justify-start items-center rounded-tl-2xl rounded-tr-2xl">
            <div className="w-9 h-9 flex justify-center items-center rounded-full -ml-3 mr-2 bg-blue p-2">
              <TiPlus className="text-2xl" />
            </div>
            Crear Nombre
            <MdEdit className="ml-2 text-2xl" />
          </div>
          <div className="pinnacle-wrap px-8 py-8">
            {/* Selector de nombres guardados */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-gray-800">
                  Nombres Guardados
                </h3>
                {createNames.length > 0 && (
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {createNames.length}
                    {' '}
                    nombre
                    {createNames.length !== 1 ? 's' : ''}
                  </span>
                )}
              </div>

              {createNames.length > 0 ? (
                <div className="space-y-3">
                  <div className="relative">
                    <select
                      value={selectedSavedName}
                      onChange={handleSavedNameSelect}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white cursor-pointer hover:border-gray-400 transition-colors"
                    >
                      <option value="" className="text-gray-500">
                        Seleccionar un nombre guardado...
                      </option>
                      {createNames.map((savedName: any) => (
                        <option key={savedName.id} value={savedName.id} className="py-2">
                          {savedName.name}
                          {' '}
                          •
                          {' '}
                          {new Date(savedName.birthDate).toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  {selectedSavedName && (
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleDeleteSavedName(selectedSavedName)}
                        className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Eliminar Nombre
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedSavedName('');
                          setHasCalculated(false);
                        }}
                        className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Limpiar Selección
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                  <p className="text-gray-600 font-medium">No hay nombres guardados</p>
                  <p className="text-gray-500 text-sm mt-1">Los nombres que guardes aparecerán aquí</p>
                </div>
              )}
            </div>

            <div className="form-container block">
              <div className="flex w-full gap-4">
                <div className="form-group w-2/3">
                  <p className="font-bold mb-1 ">
                    <MdEdit className="text-xl" />
                    {' '}
                    Nombre
                  </p>
                  <input
                    type="text"
                    name="name"
                    value={inputName}
                    onChange={handleInputChange}
                    className="rounded"
                  />
                </div>
                <div className="form-group w-1/3">
                  <p className="font-bold mb-1">
                    <MdEdit className="text-xl" />
                    {' '}
                    Fecha de Nacimiento:
                  </p>
                  <input
                    type="date"
                    name="date"
                    value={formatDateForInput(inputDate)}
                    onChange={handleInputChange}
                    className="rounded"
                  />
                </div>
              </div>

              {/* Botones de acción */}
              <div className="flex gap-4 mt-4">
                <button
                  type="button"
                  onClick={handleCalculate}
                  disabled={!isValid()}
                  className={`btn-save ${!isValid() ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Calcular
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={!isValid() || !hasCalculated}
                  className={`btn-save ${(!isValid() || !hasCalculated) ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Guardar
                </button>
                <button
                  type="button"
                  className={`btn-save ${(!isValid() || !hasCalculated) ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={handleGeneratePDF}
                  disabled={!isValid() || !hasCalculated}
                >
                  Generar PDF
                </button>
              </div>
            </div>
          </div>
        </div>

        {hasCalculated && (
          <>
            <div className="col-span-8 mb-5">
              <WrapTitle
                title="Valores Numéricos del Nombre"
                color="bg-blue"
                button={{
                  handle: checkName,
                  state: checkN,
                  text: 'Comprobación',
                }}
              />
              <NumericValues createNameObj={createNameObj} checkN={checkN} />
            </div>

            <div className="col-span-4 row-span-2 mb-5">
              <WrapTitle
                title="Pináculo"
                color="bg-blue"
                button={{
                  text: 'Comprobación',
                  handle: checkPinacle,
                  state: checkP,
                }}
              />
              <div className="pinnacle-wrap px-8 py-3">
                <PinnacleCreateName isVerificationActive={checkP} size="sm" consultant={createNameObj} />
              </div>
            </div>

            <div className="col-span-8 mb-5">
              <WrapTitle
                title="Tabla de inclusión"
                color="bg-blue"
              />
              <InclusionTable createNameObj={createNameObj} />
            </div>

            <div className="col-span-12 mb-5">
              <WrapTitle
                title="Retornos Anuales"
                color="bg-green"
              />
              <div className="pinnacle-wrap overflow-hidden grid grid-cols-3">
                <div className="px-5 py-8">
                  <AnnualReturn annualReturn={annualReturnPastYear} size="xs" />
                </div>
                <div className="px-5 py-8 border-b border-solid border-gray-300 bg-active-radial bg-opacity-15">
                  <AnnualReturn annualReturn={annualReturnCurrent} current months size="xs" />
                </div>
                <div className="px-5 py-8 border-r border-gray-400">
                  <AnnualReturn annualReturn={annualReturnNextYear} size="xs" />
                </div>
              </div>
            </div>

            <div className="col-span-12 mb-5">
              <WrapTitle
                title="Desglose del Nombre"
                color="bg-blue"
              />
              <NameBreak createNameObj={createNameObj} />
            </div>

            <div className="col-span-12 mb-5">
              <WrapTitle
                title="Ciclo del Nombre"
                color="bg-blue"
              />
              <DestinyTableCreateName createNameObj={createNameObj} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CreateNamePage;
