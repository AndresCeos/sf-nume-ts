/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import {
  FaFacebook, FaInstagram, FaTiktok, FaYoutube,
} from 'react-icons/fa';
import { VscCircleFilled } from 'react-icons/vsc';
import { NavLink } from 'react-router-dom';

import ic_consultant from '@/assets/sidebar/consultant.svg';
import ic_group from '@/assets/sidebar/group.svg';
import ic_home from '@/assets/sidebar/home.svg';
import ic_partner from '@/assets/sidebar/partner.svg';
import ic_personal from '@/assets/sidebar/personal.svg';

import ic_annual_return from '@/assets/sidebar/annual_return.svg';
import ic_calendar from '@/assets/sidebar/calendar.svg';
import ic_circle_time from '@/assets/sidebar/circle_time.svg';
import ic_compatibility_table from '@/assets/sidebar/compatibility_table.svg';
import ic_create_name from '@/assets/sidebar/create_name.svg';
import ic_destiny_table from '@/assets/sidebar/destiny_table.svg';
import ic_life_path from '@/assets/sidebar/life_path.svg';
import ic_name from '@/assets/sidebar/name.svg';
import ic_pinnacle from '@/assets/sidebar/pinnacle.svg';
import ic_vibration_time from '@/assets/sidebar/vibration_time.svg';

import useAuth from '@/hooks/useAuth';

function Sidebar() {
  const [currentPage, setCurrentPage] = useState('');
  const { user, handleLogout } = useAuth();
  const {
    firstName, lastName, photoURL, license,
  } = user;

  return (
    <div className="app-sidebar">
      <div className="overflow-y-auto">
        <div className="mt-3 flex items-center py-2 px-3">
          <img src={photoURL} className="rounded-full object-contain w-12 h-12" alt="profile" />
          <div className="flex flex-col ml-3">
            <label className="font-bold text-main-700 text-sm">{`${firstName} ${lastName}`}</label>
            <label className="text-green-600 text-sm flex items-center">
              <VscCircleFilled size={24} className="-ml-2" />
              {`Licencia ${license}`}
            </label>
          </div>
        </div>
        <nav className="mt-4">
          <ul className="flex flex-col flex-wrap pl-0 mt-0 list-none text-sm">
            <li className="">
              <NavLink
                end
                to="/dashboard"
                className="sidebar-link"
                aria-current="page"
                onClick={() => setCurrentPage('dashboard')}
              >
                <img src={ic_home} className="w-6 h-4 object-center" alt="ic_home" />
                <label className="ml-2">Inicio</label>
              </NavLink>
            </li>
            <li className="">
              <NavLink
                end
                to="/dashboard/consultante"
                className="sidebar-link"
                aria-current="page"
                onClick={() => setCurrentPage('')}
              >
                <img src={ic_consultant} className="w-6 h-4 object-center" alt="img" />
                <label className="ml-2">Consultante</label>
              </NavLink>
            </li>
            <li className="">
              <button
                type="button"
                className="sidebar-link w-full"
                aria-current="page"
                onClick={() => setCurrentPage('personal')}
              >
                <img src={ic_personal} className="w-6 h-4 object-center" alt="ic_personal" />
                <label className="ml-2">Numerología Personal</label>
              </button>
            </li>
            <li className={currentPage === 'personal' ? '' : 'hidden'}>
              <NavLink
                end
                to="/dashboard/pinaculo"
                className="sidebar-link text-13 sidebar-submenu pl-3 pr-1 py-2 flex items-center"
                aria-current="page"
              >
                <img src={ic_pinnacle} className="w-6 h-4 object-center" alt="ic_pinnacle" />
                <label className="ml-2">Pináculo</label>
              </NavLink>
            </li>
            <li className={currentPage === 'personal' ? '' : 'hidden'}>
              <NavLink
                end
                to="/dashboard/camino"
                className="sidebar-link text-13 sidebar-submenu pl-3 pr-1 py-2 flex items-center"
                aria-current="page"
              >
                <img src={ic_life_path} className="w-6 h-4 object-center" alt="ic_life_path" />
                <label className="ml-2">Camino de Vida</label>
              </NavLink>
            </li>
            <li className={currentPage === 'personal' ? '' : 'hidden'}>
              <NavLink
                end
                to="/dashboard/nombre"
                className="sidebar-link text-13 sidebar-submenu pl-3 pr-1 py-2 flex items-center"
                aria-current="page"
              >
                <img src={ic_name} className="w-6 h-4 object-center" alt="ic_name" />
                <label className="ml-2">Nombre</label>
              </NavLink>
            </li>
            <li className={currentPage === 'personal' ? '' : 'hidden'}>
              <NavLink
                end
                to="/dashboard/crear_nombre"
                className="sidebar-link text-13 sidebar-submenu pl-3 pr-1 py-2 flex items-center"
                aria-current="page"
              >
                <img src={ic_create_name} className="w-6 h-4 object-center" alt="ic_create_name" />
                <label className="ml-2">Crear Nombre</label>
              </NavLink>
            </li>
            <li className={currentPage === 'personal' ? '' : 'hidden'}>
              <NavLink
                end
                to="/dashboard/destino"
                className="sidebar-link text-13 sidebar-submenu pl-3 pr-1 py-2 flex items-center"
                aria-current="page"
              >
                <img src={ic_destiny_table} className="w-6 h-4 object-center" alt="ic_destiny_table" />
                <label className="ml-2">Tabla del Destino</label>
              </NavLink>
            </li>
            <li className={currentPage === 'personal' ? '' : 'hidden'}>
              <NavLink
                end
                to="/dashboard/tiempo"
                className="sidebar-link text-13 sidebar-submenu pl-3 pr-1 py-2 flex items-center"
                aria-current="page"
              >
                <img src={ic_vibration_time} className="w-6 h-4 object-center" alt="ic_vibration_time" />
                <label className="ml-2">Vibración de Tiempo</label>
              </NavLink>
            </li>
            <li className={currentPage === 'personal' ? '' : 'hidden'}>
              <NavLink
                end
                to="/dashboard/retornos"
                className="sidebar-link text-13 sidebar-submenu pl-3 pr-1 py-2 flex items-center"
                aria-current="page"
              >
                <img src={ic_annual_return} className="w-6 h-4 object-center" alt="ic_annual_return" />
                <label className="ml-2">Retornos Anuales</label>
              </NavLink>
            </li>
            <li className={currentPage === 'personal' ? '' : 'hidden'}>
              <NavLink
                end
                to="/dashboard/circulo_tiempo"
                className="sidebar-link text-13 sidebar-submenu pl-3 pr-1 py-2 flex items-center"
                aria-current="page"
              >
                <img src={ic_circle_time} className="w-6 h-4 object-center" alt="ic_circle_time" />
                <label className="ml-2">Circulo del Tiempo</label>
              </NavLink>
            </li>
            <li className={currentPage === 'personal' ? '' : 'hidden'}>
              <NavLink
                end
                to="/dashboard/calendario"
                className="sidebar-link text-13 sidebar-submenu pl-3 pr-1 py-2 flex items-center"
                aria-current="page"
              >
                <img src={ic_calendar} className="w-6 h-4 object-center" alt="ic_calendar" />
                <label className="ml-2">Calendario Anual</label>
              </NavLink>
            </li>
            <li className={currentPage === 'personal' ? '' : 'hidden'}>
              <NavLink
                end
                to="/dashboard/calendarioMensual"
                className="sidebar-link text-13 sidebar-submenu pl-3 pr-1 py-2 flex items-center"
                aria-current="page"
              >
                <img src={ic_calendar} className="w-6 h-4 object-center" alt="ic_calendar" />
                <label className="ml-2">Calendario Mensual</label>
              </NavLink>
            </li>
            <li className="">
              <button
                type="button"
                className="sidebar-link w-full"
                aria-current="page"
                onClick={() => setCurrentPage('partner')}
              >
                <img src={ic_partner} className="w-6 h-4 object-center" alt="ic_partner" />
                <label className="ml-2">Numerología de Pareja</label>
              </button>
            </li>
            <li className={currentPage === 'partner' ? '' : 'hidden'}>
              <NavLink
                end
                to="/dashboard/sinastria"
                className="sidebar-link text-13 sidebar-submenu pl-3 pr-1 py-2 flex items-center"
                aria-current="page"
              >
                <img src={ic_pinnacle} className="w-6 h-4 object-center" alt="ic_pinnacle" />
                <label className="ml-2">Análisis</label>
              </NavLink>
            </li>
            <li className={currentPage === 'partner' ? '' : 'hidden'}>
              <NavLink
                end
                to="/dashboard/sinastria_vibracion"
                className="sidebar-link text-13 sidebar-submenu pl-3 pr-1 py-2 flex items-center"
                aria-current="page"
              >
                <img src={ic_vibration_time} className="w-6 h-4 object-center" alt="ic_vibration_time" />
                <label className="ml-2">Vibración de Tiempo</label>
              </NavLink>
            </li>
            <li className={currentPage === 'partner' ? '' : 'hidden'}>
              <NavLink
                end
                to="/dashboard/sinastria_retornos"
                className="sidebar-link text-13 sidebar-submenu pl-3 pr-1 py-2 flex items-center"
                aria-current="page"
              >
                <img src={ic_annual_return} className="w-6 h-4 object-center" alt="ic_annual_return" />
                <label className="ml-2">Retornos Anuales</label>
              </NavLink>
            </li>
            <li className={currentPage === 'partner' ? '' : 'hidden'}>
              <NavLink
                end
                to="/dashboard/sinastria_destino"
                className="sidebar-link text-13 sidebar-submenu pl-3 pr-1 py-2 flex items-center"
                aria-current="page"
              >
                <img src={ic_destiny_table} className="w-6 h-4 object-center" alt="ic_destiny_table" />
                <label className="ml-2">Tabla del Destino P.</label>
              </NavLink>
            </li>
            <li className={currentPage === 'partner' ? '' : 'hidden'}>
              <NavLink
                end
                to="/dashboard/sinastria_compatibilidad"
                className="sidebar-link text-13 sidebar-submenu pl-3 pr-1 py-2 flex items-center"
                aria-current="page"
              >
                <img src={ic_compatibility_table} className="w-6 h-4 object-center" alt="ic_pinnacle" />
                <label className="ml-2">Tabla Compatibilidad</label>
              </NavLink>
            </li>
            <li className="">
              <button
                type="button"
                className="sidebar-link w-full"
                aria-current="page"
                onClick={() => setCurrentPage('group')}
              >
                <img src={ic_group} className="w-6 h-4 object-center" alt="ic_partner" />
                <label className="ml-2">Numerología de Grupo</label>
              </button>
            </li>
            <li className={currentPage === 'group' ? '' : 'hidden'}>
              <NavLink
                end
                to="/dashboard/group_pinnacle"
                className="sidebar-link text-13 sidebar-submenu pl-3 pr-1 py-2 flex items-center"
                aria-current="page"
              >
                <img src={ic_pinnacle} className="w-6 h-4 object-center" alt="ic_pinnacle" />
                <label className="ml-2">Pináculo</label>
              </NavLink>
            </li>
            <li className={currentPage === 'group' ? '' : 'hidden'}>
              <NavLink
                end
                to="/dashboard/group_vibracion"
                className="sidebar-link text-13 sidebar-submenu pl-3 pr-1 py-2 flex items-center"
                aria-current="page"
              >
                <img src={ic_vibration_time} className="w-6 h-4 object-center" alt="ic_vibration_time" />
                <label className="ml-2">Vibración de Tiempo</label>
              </NavLink>
            </li>
            <li className={currentPage === 'group' ? '' : 'hidden'}>
              <NavLink
                end
                to="/dashboard/group_retornos"
                className="sidebar-link text-13 sidebar-submenu pl-3 pr-1 py-2 flex items-center"
                aria-current="page"
              >
                <img src={ic_annual_return} className="w-6 h-4 object-center" alt="ic_annual_return" />
                <label className="ml-2">Retornos Anuales</label>
              </NavLink>
            </li>
            <li className="config-menu">
              <NavLink
                end
                to="/dashboard/config"
                className="sidebar-link text-13 sidebar-submenu pl-3 pr-1 py-2 flex items-center bg-black bg-opacity-5 border-b border-white"
                aria-current="page"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.8827 9.29103C15.9414 8.8802 15.9805 8.43036 15.9805 8.00004C15.9805 7.55019 15.9414 7.08072 15.8632 6.65036H13.9854C13.8289 5.94621 13.5551 5.2812 13.1639 4.67484L14.4939 3.34484C13.9854 2.62115 13.3399 1.99516 12.6357 1.48668L11.3252 2.81668C10.7384 2.44501 10.0734 2.15168 9.34968 1.99516V0.117339C8.91936 0.0391584 8.46951 0 8 0C7.56968 0 7.13933 0.0391583 6.70901 0.0978277V1.97565C5.98533 2.13215 5.32018 2.40597 4.71386 2.77765L3.38385 1.44764C2.66017 1.95616 2.03418 2.58212 1.50603 3.3058L2.83603 4.63581C2.44487 5.24213 2.15136 5.90714 1.99502 6.65048L0.117339 6.65035C0.0391583 7.08067 0 7.53051 0 8.00002C0 8.43034 0.0391585 8.88018 0.0978279 9.29101H1.97565C2.13215 10.0147 2.4255 10.6993 2.81666 11.3252L1.48665 12.6552C1.99518 13.3789 2.64066 14.0049 3.34482 14.5133L4.67482 13.1833C5.28115 13.5745 5.96582 13.868 6.70899 14.0243V15.9022C7.11982 15.9608 7.55 16 7.99998 16C8.46945 16 8.9193 15.9608 9.34965 15.8827V14.0048C10.0733 13.8483 10.758 13.555 11.3448 13.1638L12.6748 14.4938C13.3985 13.9657 14.0245 13.3398 14.533 12.616L13.203 11.286C13.5746 10.6797 13.868 10.0147 14.005 9.29085L15.8827 9.29103ZM8.00006 10.6797C6.51354 10.6797 5.32038 9.46703 5.32038 8.00004C5.32038 6.53304 6.51354 5.32036 8.00006 5.32036C9.48658 5.32036 10.6797 6.53304 10.6797 8.00004C10.6797 9.46703 9.48658 10.6797 8.00006 10.6797Z" fill="black" />
                </svg>
                <label className="ml-2">Configuración</label>
              </NavLink>
            </li>
            <li className="config-menu">
              <NavLink
                end
                to="/dashboard/soporte"
                className="sidebar-link text-13 sidebar-submenu pl-3 pr-1 py-2 flex items-center bg-black bg-opacity-5 border-b border-white"
                aria-current="page"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path opacity="0.35" d="M13.8738 5.22667L11.2709 4.86375L10.9079 2.24955L13.0024 0.155056C12.0382 -0.121645 11.0051 -0.0256188 10.1082 0.423952C9.2114 0.873633 8.51647 1.64406 8.16135 2.58237C7.80623 3.52065 7.81696 4.5582 8.19135 5.48888L0.443115 13.2385C0.159387 13.5222 0 13.9069 0 14.3082C0 14.7094 0.159373 15.0941 0.443115 15.3778L0.622228 15.5569H0.622117C0.905845 15.8406 1.29062 16 1.69179 16C2.09308 16 2.47783 15.8406 2.76146 15.5569L10.5431 7.77525C11.4341 8.10247 12.4124 8.10202 13.3031 7.77391C14.1936 7.4458 14.9385 6.81153 15.4043 5.98443C15.8699 5.15745 16.0262 4.19173 15.8449 3.26002L13.8738 5.22667Z" fill="black" />
                </svg>
                <label className="ml-2">Soporte</label>
              </NavLink>
            </li>
            <li className="config-menu">
              <button
                type="button"
                onClick={() => handleLogout()}
                className="sidebar-link w-full text-13 sidebar-submenu pl-3 pr-1 py-2 flex items-center bg-black bg-opacity-5 border-b border-white"
                aria-current="page"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.36884 8.02353C2.62332 6.76905 4.41575 6.3781 6.00508 6.84852L12.6962 0.157372L15.6854 0L15.2134 3.93324H13.3254V5.82127H11.4375V7.70914L9.15124 9.99524C9.62166 11.5846 9.23071 13.377 7.97623 14.6315C6.15153 16.4562 3.19298 16.4562 1.36852 14.6315C-0.456174 12.8068 -0.456174 9.84823 1.36852 8.02377L1.36884 8.02353ZM2.62753 11.4848C2.10621 12.0061 2.10621 12.8514 2.62753 13.3728C3.14884 13.8941 3.99408 13.8941 4.5154 13.3728C5.03671 12.8515 5.03671 12.0063 4.5154 11.485C3.99408 10.9636 3.14884 10.9636 2.62753 11.485V11.4848Z" fill="black" fillOpacity="0.35" />
                </svg>
                <label className="ml-2">Salir</label>
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <div className="sidebar-bottom p-3">
        <ul className="flex flex-col flex-wrap pl-0 mt-0 list-none">
          <li className="my-2 flex justify-around">
            <a href="https://www.facebook.com/NumerologiaCotidiana" target="_blank" className="hover:text-black" rel="noreferrer">
              <FaFacebook size={20} />
            </a>
            <a href="https://www.instagram.com/numerologia_cotidiana/" target="_blank" className="hover:text-black" rel="noreferrer">
              <FaInstagram size={20} />
            </a>
            <a href="https://www.youtube.com/channel/UCLpxV1bxOgtQ6ADN9Xkn5rg" target="_blank" className="hover:text-black" rel="noreferrer">
              <FaYoutube size={20} />
            </a>
            <a href="https://www.tiktok.com/@lanumerologiadelaura" target="_blank" className="hover:text-black" rel="noreferrer">
              <FaTiktok size={20} />
            </a>
          </li>
          <li className="my-1">
            <NavLink
              end
              to="/manual"
              className="sidebar-link text-13"
              aria-current="page"
            >
              Manual de Usuario
            </NavLink>
          </li>
          <li className="my-1">
            <NavLink
              end
              to="/politicas"
              className="sidebar-link text-13"
              aria-current="page"
            >
              Políticas y Privacidad
            </NavLink>
          </li>
          <li className="my-1">
            <a
              href="https://app.numerologia-cotidiana.com/formulario-de-soporte-arithmax/"
              target="_blank"
              className="sidebar-link text-13"
              aria-current="page"
              rel="noreferrer"
            >
              Contacto
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
