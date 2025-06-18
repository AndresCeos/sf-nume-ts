/* eslint-disable import/order */
import useConsult from '@/hooks/useConsult';
import {
  getDate, getMonth, getYear,
} from 'date-fns';

function LastConsult() {
  const { consultant } = useConsult();
  let lastTime = '-';
  if (consultant?.notes) {
    const date = Object.keys(consultant?.notes)[Object.keys(consultant?.notes).length - 1];
    const dateObj = new Date(date);
    lastTime = `${getDate(dateObj)}/${getMonth(dateObj) + 1}/${getYear(dateObj)}`;
  }
  return (
    <strong>
      Última Consulta:
      {lastTime}
    </strong>
  );
}
export default LastConsult;
