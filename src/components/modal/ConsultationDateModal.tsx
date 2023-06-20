import moment from 'moment';
import Swal from 'sweetalert2';

import useConsult from '@/hooks/useConsult';

function ConsultationDateModal() {
  const { consultationDate, selectConsultationDate } = useConsult();

  const openModal = () => {
    Swal.fire({
      title: 'Seleccione la fecha que quieras consultar',
      icon: 'info',
      html:
        `<input  type="date" id="newDate" class="border border-gray-500 p-1 rounded-md" value="${consultationDate.format('YYYY-MM-DD')}" />`,
      showCloseButton: true,
      showCancelButton: true,
      showDenyButton: true,
      denyButtonText: 'Seleccionar',
      focusConfirm: false,
      confirmButtonText: 'Hoy',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#693061',
      denyButtonColor: '#9F5D9B',
      cancelButtonColor: '#ff0000',
    }).then((result) => {
      if (result.isConfirmed) {
        selectConsultationDate(moment());
      }
      if (result.isDenied) {
        const date = (document?.getElementById('newDate') as any)?.value ?? moment();
        selectConsultationDate(moment(date));
      }
    });
  };

  return (
    <button
      type="button"
      className="button-nav-bar"
      onClick={openModal}
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
  );
}

export default ConsultationDateModal;
