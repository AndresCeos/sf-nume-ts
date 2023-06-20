import useConsult from '@/hooks/useConsult';
import { formatDate } from '../utils/constants';
import ConsultantPicker from './ConsultantPicker';

function StatusBarConsultantDetails() {
  const { consultant } = useConsult();

  if (!consultant || !consultant.date) return null;

  return (
    <>
      <div>
        Fecha de Nacimiento:
        <strong className="ml-2">
          {formatDate({ date: consultant.date, format: 'long' })}
        </strong>
      </div>
      <div>
        Edad:
        <strong className="ml-2">{consultant.date?.toString()}</strong>
      </div>
    </>
  );
}

function StatusBar() {
  const { consultationDate } = useConsult();

  return (
    <div className="app-statusbar">
      <ConsultantPicker />
      <StatusBarConsultantDetails />
      <div>
        Fecha de Consulta:
        <strong className="ml-2">
          {formatDate({ date: consultationDate.toDate(), format: 'long' })}
        </strong>
      </div>
    </div>
  );
}

export default StatusBar;
