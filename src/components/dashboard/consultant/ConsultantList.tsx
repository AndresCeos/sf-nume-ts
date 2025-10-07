import { useTranslation } from 'react-i18next';

import { useAuth } from '@/context/AuthProvider';
import useConsult from '@/hooks/useConsult';
import { formatDate } from '@/utils/constants';
// eslint-disable-next-line import/order
import Swal from 'sweetalert2';

import makeConsultant from '@/api/useConsultant';
import useConsultants from '@/hooks/useConsultants';

type Props = {
  searchUser: string;
};

function ConsultantList({ searchUser }: Props) {
  const { user: userAuth } = useAuth();
  const users = userAuth?.consultants;
  const deleteConsultantAsync = makeConsultant();
  const handleConsultants = useConsultants();
  const { t } = useTranslation();

  const { handleIsEditingConsultant, selectConsultant } = useConsult();

  const handleEditUser = (user: Api.Consultant) => {
    selectConsultant(user);
    handleIsEditingConsultant(true);
  };
  const handleDeleteUser = (user:Api.Consultant) => {
    Swal.fire({
      title: '¿Estás segur@?',
      text: 'Se borrar permanetemente!',
      icon: 'warning',
      confirmButtonColor: '#E28A05',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#ff0000',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const consultantToDelete = handleConsultants.removeConsultant(user.id);
        deleteConsultantAsync.mutateAsync(consultantToDelete).then(() => {
          Swal.fire(
            'Listo',
            'Consultante Borrado',
            'success',
          );
        }).catch((err) => {
          Swal.fire(
            'Oups',
            `Ocurrio un error:${err}`,
            'error',
          );
        });
      }
    });
  };

  const search = Array.isArray(users) ? users.filter((user) => user?.names?.includes(searchUser)) : [];

  // Si no hay consultantes, mostrar mensaje
  if (!Array.isArray(users) || users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <img
          src="/assets/welcome.png"
          className="w-12 mb-3 opacity-50"
          alt="welcome"
        />
        <p className="text-gray-600 text-sm">
          No tienes consultantes registrados aún
        </p>
        <p className="text-gray-500 text-xs mt-1">
          Usa el formulario de arriba para agregar tu primer consultante
        </p>
      </div>
    );
  }

  // Si hay consultantes pero no coinciden con la búsqueda
  if (search && search.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-6 text-center">
        <p className="text-gray-600 text-sm">
          No se encontraron consultantes con ese nombre
        </p>
        <p className="text-gray-500 text-xs mt-1">
          Intenta con otro término de búsqueda
        </p>
      </div>
    );
  }

  return (
    <ul>
      {
        search?.map((user) => (
          <li key={`${user?.id}-${user?.date}`} className="w-full grid grid-cols-12 h-10">
            <div className="col-span-6">
              {user?.names}
              {' '}
              {user?.lastName}
              {' '}
              {user?.scdLastName}
            </div>
            <div className="col-span-4">{formatDate({ date: new Date(`${user.date}`), format: 'long', locale: t('locale') as string })}</div>
            <div className="col-span-2">
              <button type="button" onClick={() => { handleEditUser(user); }}>
                <img src="/assets/c_edit.svg" alt="edit" />
              </button>
              <button className="ml-6" type="button" onClick={() => { handleDeleteUser(user); }}>
                <img src="/assets/c_delete.svg" alt="delete" />
              </button>
            </div>
          </li>
        ))
      }
    </ul>
  );
}

export default ConsultantList;
