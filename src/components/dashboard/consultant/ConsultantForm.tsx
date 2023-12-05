/* eslint-disable import/order */
import useConsult from '@/hooks/useConsult';
import useForm from '@/hooks/useForm';
import countries from '@/resources/countries.json';
import moment from 'moment';
import { useEffect, useState } from 'react';

import makeConsultant from '@/api/useConsultant';
import { useAuth } from '@/context/AuthProvider';
import useConsultants from '@/hooks/useConsultants';

type FormStatus = { displayValidations: boolean, isValid: boolean, validationMsgs: Record<string, string> };
const FORM_STATUS_INITIAL_STATE: FormStatus = { displayValidations: false, isValid: false, validationMsgs: {} };

function ConsultantForm({ initialForm }: { initialForm: any }) {
  const addConsultantAsync = makeConsultant();
  const handleConsultants = useConsultants();
  const [isLoading, setIsLoading] = useState(false);
  const { consultant } = useConsult();

  const {
    handleIsEditingConsultant, isEditingConsultant,
  } = useConsult();
  const {
    names, lastName, scdLastName, date, nationality, gender, company, email, phone,
    handleInputChange, formError, setFormError, reset,
  } = useForm(initialForm);

  const [formStatus, setFormStatus] = useState<FormStatus>(FORM_STATUS_INITIAL_STATE);
  const isFormValid = () => {
    let isValid = true;
    let validationMsgs = {};
    if (names === '') {
      validationMsgs = { ...validationMsgs, names: 'Requerido' };
      isValid = false;
    }
    if (lastName === '') {
      validationMsgs = { ...validationMsgs, lastName: 'Requerido' };
      isValid = false;
    }
    if (scdLastName === '') {
      validationMsgs = { ...validationMsgs, scdLastName: 'Requerido' };
      isValid = false;
    }
    if (date === '') {
      validationMsgs = { ...validationMsgs, date: 'Requerido' };
      isValid = false;
    }
    setFormStatus((prevState) => ({ ...prevState, isValid, validationMsgs }));
  };

  useEffect(() => {
    isFormValid();
  }, [names, lastName, scdLastName, date]);

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formStatus.isValid) {
      setFormStatus((prevState) => ({ ...prevState, displayValidations: true }));
      return;
    }
    setFormError('');
    const id = Math.random().toString(36).substring(2, 9);
    const newConsultant: Api.Consultant = {
      id,
      notes: {},
      company,
      date,
      email,
      gender,
      group: [],
      lastName,
      names,
      nationality,
      partner: [],
      phone,
      scdLastName,
    };
    setIsLoading(true);
    if (isEditingConsultant) {
      const consultantToEdit = handleConsultants.updateConsultant(consultant.id, newConsultant);
      addConsultantAsync.mutateAsync(consultantToEdit).then(() => {
        handleIsEditingConsultant(false);
        setFormStatus(FORM_STATUS_INITIAL_STATE);
        reset();
      }).catch((err) => {
        setFormError(err.message);
      }).finally(() => {
        setIsLoading(false);
      });
    } else {
      const consultantsList = handleConsultants.addConsultant(newConsultant);
      addConsultantAsync.mutateAsync(consultantsList).then(() => {
        handleIsEditingConsultant(false);
        setFormStatus(FORM_STATUS_INITIAL_STATE);
        reset();
      }).catch((err) => {
        setFormError(err.message);
      }).finally(() => {
        setIsLoading(false);
      });
    }
  };

  const createMarkup = (text: string) => ({ __html: text });

  return (
    <form className="form-container block" onSubmit={handleOnSubmit}>
      <div className="flex w-full">
        <div className="form-group w-1/3 relative">
          <p className="font-bold mb-1">
            Nombre(s)
            <span className="text-red-800">*</span>
          </p>
          <input
            type="text"
            name="names"
            id="names"
            className="rounded border-[#C4C4C4]  border w-11/12"
            onChange={(e) => handleInputChange(e.target)}
            value={names}
          />
          {(formStatus?.displayValidations && formStatus?.validationMsgs?.names) && <p className="mt-1 p-1 text-red-50 bg-red-600 rounded-sm">{formStatus.validationMsgs.names}</p>}
        </div>
        <div className="form-group w-1/3">
          <p className="font-bold mb-1">
            Apellido Paterno
            <span className="text-red-800">*</span>
          </p>
          <input
            type="text"
            name="lastName"
            className="rounded  border-[#C4C4C4]  border w-11/12"
            onChange={(e) => handleInputChange(e.target)}
            value={lastName}
          />
          {(formStatus?.displayValidations && formStatus?.validationMsgs?.lastName) && <p className="mt-1 p-1 text-red-50 bg-red-600 rounded-sm">{formStatus.validationMsgs.lastName}</p>}
        </div>
        <div className="form-group w-1/3">
          <p className="font-bold mb-1">
            Apellido Materno
            <span className="text-red-800">*</span>
          </p>
          <input
            type="text"
            name="scdLastName"
            className="rounded border-[#C4C4C4]  border w-11/12"
            onChange={(e) => handleInputChange(e.target)}
            value={scdLastName}
          />
          {(formStatus?.displayValidations && formStatus?.validationMsgs?.scdLastName) && <p className="mt-1 p-1 text-red-50 bg-red-600 rounded-sm">{formStatus.validationMsgs.scdLastName}</p>}
        </div>
      </div>
      <div className="flex w-full mt-3">
        <div className="form-group w-1/3">
          <p className="font-bold mb-1">
            Fecha de Nacimiento
            <span className="text-red-800">*</span>
          </p>
          <input
            type="date"
            name="date"
            className="rounded w-11/12 border-[#C4C4C4]  border "
            onChange={(e) => handleInputChange(e.target)}
            value={typeof date === 'string' ? date : moment(date).toISOString().split('T')[0]}
          />
          {(formStatus?.displayValidations && formStatus?.validationMsgs?.date) && <p className="mt-1 p-1 text-red-50 bg-red-600 rounded-sm">{formStatus.validationMsgs.date}</p>}
        </div>
        <div className="form-group w-1/3">
          <p className="font-bold mb-1">Nacionalidad</p>
          <select
            name="nationality"
            className="rounded border h-[30px] border-[#C4C4C4]  w-11/12 "
            onChange={(e) => handleInputChange(e.target)}
            value={nationality}
          >
            <option value="">-</option>
            {
              countries.countries.sort((a, b) => a.name_es.localeCompare(b.name_es)).map((country) => (
                <option key={country.code_2} value={country.code_2}>
                  {country.name_es}
                </option>
              ))
            }
          </select>
        </div>
        <div className="form-group w-1/3">
          <p className="font-bold mb-1">Sexo</p>
          <select
            name="gender"
            className="rounded border h-[30px] border-[#C4C4C4] px-2 w-11/12"
            onChange={(e) => handleInputChange(e.target)}
            value={gender}
          >
            <option value="">-</option>
            <option value="F">Femenino</option>
            <option value="M">Masculino</option>
          </select>
        </div>
      </div>
      <div className="flex w-full mt-3">
        <div className="form-group w-1/3">
          <p className="font-bold mb-1">
            Empresa
          </p>
          <input
            type="text"
            name="company"
            className="rounded border-[#C4C4C4]  border"
            onChange={(e) => handleInputChange(e.target)}
            value={company}
          />
        </div>
        <div className="form-group w-1/3">
          <p className="font-bold mb-1">
            Teléfono
          </p>
          <input
            type="tel"
            name="phone"
            className="rounded border h-[30px] border-[#C4C4C4]  px-2"
            onChange={(e) => handleInputChange(e.target)}
            value={phone}
          />
        </div>
        <div className="form-group w-1/3">
          <p className="font-bold mb-1">
            Correo electrónico
          </p>
          <input
            type="text"
            name="email"
            className="rounded border-[#C4C4C4]  border"
            onChange={(e) => handleInputChange(e.target)}
            value={email}
          />
        </div>
      </div>
      <div className="flex w-full gap-4 mt-3 items-center">
        <div className="w-1/3">
          {(!isEditingConsultant)
            ? (
              <div className="text-center flex justify-center items-center flex-col">
                <img src="/assets/navbar/add_user.svg" className="mb-3" alt="addUserMain" />
                <button type="submit" className="btn w-full" disabled={isLoading}>Guardar</button>
              </div>
            )
            : (
              <div className="w-full flex flex-wrap">
                <button className="w-full btn mb-3 bg-[#0000ff]" type="submit">Confirmar</button>
                <button className="w-full btn bg-[#ff0000]" type="button" disabled={isLoading} onClick={() => { handleIsEditingConsultant(false); }}>Cancelar</button>
              </div>
            )}
          {formError && (
            <div
              className="text-red-500 text-center text-sm mt-3"
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={createMarkup(formError)}
            />
          )}
        </div>
      </div>
    </form>
  );
}

function ConsultantFormWrapper() {
  const { isEditingConsultant, consultant } = useConsult();
  const { user: userAuth } = useAuth();
  const users = userAuth?.consultants;
  const consultantData = users?.find((element) => element.id === consultant?.id);

  const initialForm = {
    names: (isEditingConsultant && consultant) ? consultantData?.names : '',
    lastName: (isEditingConsultant && consultant) ? consultantData?.lastName : '',
    scdLastName: (isEditingConsultant && consultant) ? consultantData?.scdLastName : '',
    date: (isEditingConsultant && consultant) ? consultantData?.date : '',
    nationality: (isEditingConsultant && consultant) ? consultantData?.nationality : '',
    gender: (isEditingConsultant && consultant) ? consultantData?.gender : '',
    company: (isEditingConsultant && consultant) ? consultantData?.company : '',
    phone: (isEditingConsultant && consultant) ? consultantData?.phone : '',
    email: (isEditingConsultant && consultant) ? consultantData?.email : '',
  };

  return <ConsultantForm initialForm={initialForm} key={`${consultant?.id}_${isEditingConsultant}`} />;
}
export default ConsultantFormWrapper;
