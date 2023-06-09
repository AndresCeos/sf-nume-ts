import cx from 'classnames';
import { Link } from 'react-router-dom';

import { useAuth } from '@/context/AuthProvider';

function Notifications() {
  return null;
}

function Navbar() {
  const { user: userAuth } = useAuth();
  const { firstName, lastName } = userAuth?.user ?? {};

  const handlerEdit = () => {
    console.log('handlerEdit');
  };

  const changeDate = () => {
    console.log('changeDate');
  };

  const printSingleReport = () => {
    console.log('printSingleReport');
  };

  const openModal = () => {
    console.log('openModal');
  };

  const handleModal = () => {
    console.log('handleModal');
  };

  const isDownloadPDFEnabled = false;

  return (
    <nav className="app-navbar">
      <div className="flex flex-wrap justify-between items-center mx-auto">
        <Link to="/" className="flex">
          <img
            src="/assets/logo.png"
            className="app-logo"
            alt="app-logo"
          />
        </Link>
        <div
          className="main-menu hidden w-full md:block md:w-auto mr-3"
        >
          <ul className="flex flex-col md:flex-row md:space-x-5 md:mt-0 text-xs font-medium h-full">
            <li className="flex items-center justify-center">
              <Link
                className="button-nav-bar"
                to="/consultante"
              >
                <img
                  src="/assets/navbar/add_user.svg"
                  alt="add_user"
                  className="mb-1"
                />
                Ingresar
                <br />
                Datos
              </Link>
            </li>
            <li className="flex items-center justify-center">
              <Link
                className="button-nav-bar"
                to="consultante"
                onClick={handlerEdit}
              >
                <img
                  src="/assets/navbar/update_user.svg"
                  className="mb-1"
                  alt="update_user"
                />
                Actualizar
                <br />
                Datos
              </Link>
            </li>
            <li className="flex items-center justify-center">
              <button
                type="button"
                className="button-nav-bar"
                onClick={changeDate}
              >
                <img
                  src="/assets/navbar/change_date.svg"
                  className="mb-1"
                  alt="change_date"
                />
                Cambiar
                <br />
                Fecha
              </button>
            </li>
            <li className="flex items-center justify-center">
              <Link
                className="button-nav-bar"
                to="/sinastria"
              >
                <img
                  src="/assets/navbar/partner_data.svg"
                  className="mb-1"
                  alt="partner_data"
                />
                Datos
                <br />
                de Pareja
              </Link>
            </li>
            <li className="flex items-center justify-center">
              <Link
                className="button-nav-bar"
                to="/group_pinnacle"
              >
                <img
                  src="/assets/navbar/group_data.svg"
                  className="mb-1"
                  alt="group_data"
                />
                Datos
                <br />
                de Grupo
              </Link>
            </li>
            <li className="flex items-center justify-center">
              <button
                type="button"
                className={cx(
                  isDownloadPDFEnabled ? 'button-nav-bar' : 'button-nav-bar--disabled',
                )}
                onClick={handleModal}
              >
                <img
                  src="/assets/navbar/notes.svg"
                  alt="notas"
                />
                Notas de
                <br />
                Consulta
              </button>
            </li>

            <li className="flex items-center justify-center">
              {isDownloadPDFEnabled
                ? (
                  <button
                    type="button"
                    onClick={printSingleReport}
                    className="button-nav-bar"
                  >
                    <img
                      src="/assets/navbar/save_report.svg"
                      className="mb-1"
                      alt="save_report"
                    />
                    Guardar
                    <br />
                    reporte
                  </button>
                )
                : (
                  <button
                    className="button-nav-bar--disabled"
                    type="button"
                  >
                    <img
                      src="/assets/navbar/save_report.svg"
                      className="mb-1"
                      alt="save_report"
                    />
                    Guardar
                    <br />
                    reporte
                  </button>
                )}
            </li>
            <li className="flex items-center justify-center">
              {isDownloadPDFEnabled
                ? (
                  <button
                    type="button"
                    onClick={openModal}
                    className="button-nav-bar"
                  >
                    <img
                      src="/assets/navbar/print_reports.svg"
                      className="mb-1"
                      alt="printReports"
                    />
                    Imprimir
                    <br />
                    Reportes
                  </button>
                )
                : (
                  <button
                    type="button"
                    className="flex flex-col justify-center text-center items-center text-white opacity-30 cursor-auto h-full px-3"
                  >
                    <img
                      src="/assets/navbar/print_reports.svg"
                      className="mb-1"
                      alt="printReports"
                    />
                    Imprimir
                    <br />
                    Reportes
                  </button>
                )}
            </li>
            <li className="flex items-center justify-center ml-20">
              <a href="https://app.numerologia-cotidiana.com/formulario-de-soporte-arithmax/" target="_blank" rel="noreferrer">
                <img
                  src="/assets/navbar/mail.svg"
                  alt="email"
                  className="w-6 lg:w-8"
                />
              </a>
            </li>
            <li className="flex items-center justify-center ml-7">
              <Notifications />
            </li>
            <li className="flex items-center justify-center ml-6">
              <img
                src="https://www.worldometers.info/img/flags/small/tn_mx-flag.gif"
                className="w-8"
                alt="country"
              />
            </li>
            <li className="flex items-center justify-center mx-4 text-white">|</li>
            <li className="flex items-center justify-center text-sm text-white max-w-[110px]">
              <p>
                Hola!
                {' '}
                <strong className="ml-2">{`${firstName} ${lastName}`}</strong>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
