/* eslint-disable import/order */
import useConsult from '@/hooks/useConsult';
import moment from 'moment';

function LastConsult() {
  const { consultant } = useConsult();
  let lastTime = '-';
  if (consultant?.notes) {
    const date = Object.keys(consultant?.notes)[Object.keys(consultant?.notes).length - 1];
    const dateObj = moment(date);
    lastTime = `${dateObj.date()}/${dateObj.format('MM')}/${dateObj.year()}`;
  }
  return (
    <strong>
      Última Consulta:
      {lastTime}
    </strong>
  );
}
export default LastConsult;
