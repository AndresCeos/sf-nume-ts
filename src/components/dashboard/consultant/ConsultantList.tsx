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
      confirmButtonColor: '#ff0000',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#E28A05',
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

  console.log(users);

  const search = users?.filter((user) => user?.names?.includes(searchUser));
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
            <div className="col-span-4">{formatDate({ date: new Date(`${user.date}`), format: 'long' })}</div>
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
