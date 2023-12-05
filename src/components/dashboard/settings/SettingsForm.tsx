/* eslint-disable import/order */
import { useEffect, useState } from 'react';

import makeProfile from '@/api/useProfileUpdate';
import { useAuth } from '@/context/AuthProvider';
import useForm from '@/hooks/useForm';

type FormStatus = { displayValidations: boolean, isValid: boolean, validationMsgs: Record<string, string> };
const FORM_STATUS_INITIAL_STATE: FormStatus = { displayValidations: false, isValid: false, validationMsgs: {} };

function SettingsForm() {
  const { user: userAuth } = useAuth();
  const profile = userAuth?.user;
  const company = userAuth?.company;
  const updateProfileSync = makeProfile();

  const [formStatus, setFormStatus] = useState<FormStatus>(FORM_STATUS_INITIAL_STATE);
  const [isLoading, setIsLoading] = useState(false);

  // console.log(userAuth);
  const initialForm = {
    firstName: profile?.firstName,
    lastName: profile?.lastName,
    scdLastName: profile?.scdLastName,
    email: profile?.email,
    phone: profile?.phone,
    birthDate: profile?.birthDate,
    direction: company?.direction,
    logo: company?.logo,
    name: company?.name,
    phoneCompany: company?.phone,
    website: company?.website,
  };
  const {
    firstName, lastName, scdLastName, birthDate, direction, logo, name, phone, phoneCompany, website, email, handleInputChange, formError, setFormError, reset,
  } = useForm(initialForm);

  const isFormValid = () => {
    let isValid = true;
    let validationMsgs = {};
    if (firstName === '') {
      validationMsgs = { ...validationMsgs, firstName: 'Requerido' };
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
    if (birthDate === ('' || null)) {
      validationMsgs = { ...validationMsgs, birthDate: 'Requerido' };
      isValid = false;
    }
    setFormStatus((prevState) => ({ ...prevState, isValid, validationMsgs }));
  };

  useEffect(() => {
    isFormValid();
  }, [firstName, lastName, scdLastName, birthDate]);

  useEffect(() => {}, [isLoading]);
  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formStatus.isValid) {
      setFormStatus((prevState) => ({ ...prevState, displayValidations: true }));
      return;
    }
    setFormError('');

    const newProfile: Api.ProfileUser = {
      names: firstName,
      lastName,
      scdLastName,
      date: birthDate?.toString(),
      tel: phone,
      address: direction,
      logoURL: logo,
      company: name,
      phone: phoneCompany,
      webSite: website,
    };
    console.log(newProfile);
    setIsLoading(true);
    updateProfileSync.mutateAsync(newProfile).then(() => {
      setFormStatus(FORM_STATUS_INITIAL_STATE);
      setIsLoading(false);
      reset();
    }).catch((err) => {
      setFormError(err.message);
    }).finally(() => {
      setIsLoading(false);
    });
  };
  return (
    <form action="" onSubmit={handleOnSubmit}>
      <div className="flex w-full">
        <div className="p-5 w-3/5 border-r-2 border-black">
          <h2 className="text-sm font-extrabold text-gray-400 mb-5">Datos Personales</h2>
          <div className="flex w-full">
            <div className="form-group w-1/3 mb-5">
              <p className="font-bold mb-1 text-13">
                Nombre(s)
                {' '}
                <span className="text-red-400">*</span>
              </p>
              <input
                type="text"
                name="firstName"
                className="rounded  border-[#C4C4C4]  border w-11/12"
                onChange={(e) => handleInputChange(e.target)}
                value={firstName}
              />
              {(formStatus?.displayValidations && formStatus?.validationMsgs?.firstName) && <p className="mt-1 p-1 text-red-50 bg-red-600 rounded-sm">{formStatus.validationMsgs.firstName}</p>}
            </div>
            <div className="form-group w-1/3 mb-5">
              <p className="font-bold mb-1 text-13">
                Apellido Paterno
                {' '}
                <span className="text-red-400">*</span>
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
              <p className="font-bold mb-1 text-13">
                Apellido Materno
                {' '}
                <span className="text-red-400">*</span>
              </p>
              <input
                type="text"
                name="scdLastName"
                className="rounded  border-[#C4C4C4]  border w-11/12"
                onChange={(e) => handleInputChange(e.target)}
                value={scdLastName}
              />
              {(formStatus?.displayValidations && formStatus?.validationMsgs?.scdLastName) && <p className="mt-1 p-1 text-red-50 bg-red-600 rounded-sm">{formStatus.validationMsgs.scdLastName}</p>}
            </div>

          </div>
          <div className="flex w-full">
            <div className="form-group w-1/3">
              <p className="font-bold mb-1 text-13">
                Fecha de Nacimiento
                {' '}
                <span className="text-red-400">*</span>
              </p>
              <input
                type="date"
                name="birthDate"
                className="rounded  border-[#C4C4C4]  border w-11/12"
                onChange={(e) => handleInputChange(e.target)}
                value={birthDate?.toString()}
              />
              {(formStatus?.displayValidations && formStatus?.validationMsgs?.birthDate) && <p className="mt-1 p-1 text-red-50 bg-red-600 rounded-sm">{formStatus.validationMsgs.birthDate}</p>}
            </div>
            <div className="form-group w-1/3">
              <p className="font-bold mb-1 text-13">
                Teléfono
                {' '}
              </p>
              <input
                type="tel"
                name="phone"
                className="rounded  border-[#C4C4C4]  border w-11/12"
                onChange={(e) => handleInputChange(e.target)}
                value={phone}
              />
            </div>
            <div className="form-group w-1/3">
              <p className="font-bold mb-1 text-13">
                Email
                {' '}
              </p>
              <input
                type="email"
                name="email"
                className="rounded  border-[#C4C4C4]  border w-11/12"
                onChange={(e) => handleInputChange(e.target)}
                value={email}
                disabled
              />
            </div>
          </div>
          <div className=" w-full">
            <p className="text-13 font-bold mt-5">Contraseña</p>
            <p className="text-blue underline"><a href="https://app.numerologia-cotidiana.com/mi-cuenta/lost-password/" target="_blank" rel="noreferrer">Cambiar mi contraseña</a></p>
          </div>
        </div>
        <div className="p-5 w-2/5">
          <h2 className="text-sm font-extrabold text-gray-400 mb-5">Datos Profesionales</h2>
          <div className="w-full">
            <div className="form-group w-full mb-5">
              <p className="font-bold mb-1 text-13">
                Empresa
                {' '}
              </p>
              <input
                type="text"
                name="name"
                className="rounded  border-[#C4C4C4]  border w-11/12"
                onChange={(e) => handleInputChange(e.target)}
                value={name}
              />
            </div>
            <div className="flex w-full mb-5">
              <div className="form-group w-1/2">
                <p className="font-bold mb-1 text-13">
                  Dirección
                  {' '}
                </p>
                <input
                  type="text"
                  name="direction"
                  className="rounded  border-[#C4C4C4]  border w-11/12"
                  onChange={(e) => handleInputChange(e.target)}
                  value={direction}
                />
              </div>
              <div className="form-group w-1/2">
                <p className="font-bold mb-1 text-13">
                  Teléfono
                  {' '}
                </p>
                <input
                  type="tel"
                  name="phoneCompany"
                  className="rounded  border-[#C4C4C4]  border w-11/12"
                  onChange={(e) => handleInputChange(e.target)}
                  value={phoneCompany}
                />
              </div>
            </div>
            <div className="flex w-full mb-5">
              <div className="form-group w-1/2">
                <p className="font-bold mb-1 text-13">
                  Página Web
                  {' '}
                </p>
                <input
                  type="text"
                  name="website"
                  className="rounded  border-[#C4C4C4]  border w-11/12"
                  onChange={(e) => handleInputChange(e.target)}
                  value={website}
                />
              </div>
              <div className="form-group w-1/2">
                <p className="font-bold mb-1 text-13">
                  Adjuntar Logo
                  {' '}
                </p>
                <input
                  type="file"
                  name="logo"
                  className="rounded  border-[#C4C4C4]  border w-11/12"
                  onChange={(e) => handleInputChange(e.target)}
                  value={logo}
                />
                <p className="text-13 mt-2">Tamaño del archivo max. 1MB</p>
                <p className="text-13">Tipo de archivo .jpeg ó .png</p>
                <p className="text-13">Dimensiones recomendadas 309x174 pixeles</p>
              </div>
            </div>

          </div>
        </div>
      </div>
      <div className="m-5 mb-2 flex justify-center">
        <button type="submit" className="btn px-5" disabled={isLoading}>Guardar</button>
      </div>
    </form>
  );
}
export default SettingsForm;
