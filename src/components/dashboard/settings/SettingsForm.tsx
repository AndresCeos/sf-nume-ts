import { useAuth } from '@/context/AuthProvider';
import useForm from '@/hooks/useForm';

function SettingsForm() {
  const { user: userAuth } = useAuth();
  const profile = userAuth?.user;
  const company = userAuth?.company;
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
  console.log(initialForm);
  const {
    firstName, lastName, scdLastName, birthDate, direction, logo, name, phone, phoneCompany, website, handleInputChange, formError, setFormError,
  } = useForm(initialForm);

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError('');
    console.log(e);
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
            </div>
            <div className="form-group w-1/3">
              <p className="font-bold mb-1 text-13">
                Teléfono
                {' '}
                <span className="text-red-400">*</span>
              </p>
              <input
                type="tel"
                name="phone"
                className="rounded  border-[#C4C4C4]  border w-11/12"
                onChange={(e) => handleInputChange(e.target)}
                value={phone}
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
                <span className="text-red-400">*</span>
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
                  <span className="text-red-400">*</span>
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
                  <span className="text-red-400">*</span>
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
                  <span className="text-red-400">*</span>
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
                  <span className="text-red-400">*</span>
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
        <button type="submit" className="btn px-5">Guardar</button>
      </div>
    </form>
  );
}
export default SettingsForm;
