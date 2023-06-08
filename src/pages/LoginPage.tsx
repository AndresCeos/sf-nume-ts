import request from 'axios';
import cx from 'classnames';
import { t } from 'i18next';
import { CgSpinnerTwo } from 'react-icons/cg';
import { Link } from 'react-router-dom';

import Logo from '@/assets/logo_login.png';
import welcome from '@/assets/welcome.png';

import { useAuth } from '@/context/AuthProvider';
import useForm from '@/hooks/useForm';

function LoginPage() {
  const { login, isLoggingIn } = useAuth();

  const initialForm = {
    email: '',
    password: '',
  };

  const {
    email, password, handleInputChange, formError, setFormError,
  } = useForm(initialForm);

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError('');
    try {
      await login({ username: email, password });
    } catch (err) {
      if (request.isAxiosError(err)) {
        setFormError(err.response?.data?.data?.msg ?? t('somethingWentWrong') as string);
        return;
      }
      setFormError(t('somethingWentWrong') as string);
    }
  };

  const createMarkup = (text: string) => ({ __html: text });

  return (
    <>
      <nav className="bg-white border-gray-200 max-h-[85px] h-[85px]">
        <div className="flex flex-wrap justify-between items-center mx-auto">
          <Link to="/" className="flex">
            <img src={Logo} alt="app-logo" className="w-28" />
          </Link>
          <div
            className="hidden w-full md:block md:w-auto mr-3"
            id="main-menu"
          />
        </div>
      </nav>
      <div className="bg-app bg-cover">
        <div className="page bg-cover bg-scroll grid grid-cols-14 h-full">
          <div className="col-span-9 grid grid-cols-9 bg-no-repeat bg-cover bg-login-numbers">
            <div className="col-start-2 col-span-3 bg-contain bg-repeat-y bg-login-shape" />
            <div className="col-span-4 flex flex-col justify-center items-start">
              <h2 className="text-4xl font-bold text-main-900 mb-7">“Si quieres entender el Universo, piensa en energía, frecuencia y vibración”.</h2>
              <h2 className="text-4xl text-main-900">Nikola Tesla</h2>
            </div>
          </div>
          <div className="col-span-5 h-full flex flex-col items-center justify-center bg-white bg-opacity-50">
            <div className="w-full flex flex-col items-center justify-center">
              <img src={welcome} className="w-32" alt="welcome" />
              <h2>Iniciar Sesión</h2>
              <form onSubmit={handleOnSubmit} className="w-full m-5 flex flex-col items-center">
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  value={email}
                  name="email"
                  id="email"
                  onChange={(e) => handleInputChange(e.target)}
                  className="w-4/6 h-8 border border-gray-400 rounded-md text-13 text-center mb-5 outline-none"
                  required
                />
                <input
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  name="password"
                  id="password"
                  onChange={(e) => handleInputChange(e.target)}
                  className="w-4/6 h-8 border border-gray-400 rounded-md text-13 text-center mb-5 outline-none"
                  required
                />
                <button
                  type="submit"
                  className={cx('btn w-5/12', { 'btn-icon': isLoggingIn })}
                  value="Entrar"
                  disabled={isLoggingIn}
                >
                  Entrar
                  {isLoggingIn && <CgSpinnerTwo className="animate-spin ml-2" />}
                </button>
                {formError && (
                  <div
                    className="text-red-500 text-center text-sm mt-3"
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={createMarkup(formError)}
                  />
                )}
              </form>
              <a href="https://app.numerologia-cotidiana.com/mi-cuenta/lost-password/" target="_blank" rel="noreferrer">
                Olvide mi Contraseña
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
