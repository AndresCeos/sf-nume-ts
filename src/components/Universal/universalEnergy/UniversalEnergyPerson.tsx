import cx from 'classnames';

import { TiPlus } from 'react-icons/ti';

import useConsult from '@/hooks/useConsult';
import Person from '@/resources/Person';

export type EnergyPersonProps = {
  id?: string;
  name: string;
  date: Date;
  active?: boolean;
};

type UniversalEnergyPersonProps = {
  person: EnergyPersonProps;
  setActive: () => void;
  addGuest: ({ name, date }: { name: string; date: Date; }) => void;
};

function UniversalEnergyPerson({
  person, setActive, addGuest,
}: UniversalEnergyPersonProps) {
  const { calculationDate, calculationYear } = useConsult();
  const { name, date } = person;

  const energy = new Person({ name, birthDate: new Date(date).toDateString() });

  const handleModalGuest = () => {
    addGuest({ name, date });
  };

  return (
    <ul className={cx('flex flex-col items-center', { 'opacity-25': person.active })}>
      <li className="mb-2">
        <img src="/assets/ic-universal.svg" alt="personal_disabled" />
      </li>
      <li
        className={cx('text-center cursor-pointer', {
          'text-main-700': person.active,
          'text-black': !person.active,
        })}
      >
        <button type="button" onClick={setActive}>
          ENERGÍA
        </button>
        <br />
        <div className="font-black">PERSONAL</div>
      </li>
      <li className={cx('rounded-full bg-white w-32 h-10 flex items-center justify-center border border-gray-700 text-13 inner-shadow mt-3 mb-6 font-black')}>
        <button onClick={handleModalGuest} type="button">
          {person?.name ? person?.name : <TiPlus />}
        </button>
      </li>
      <li className="rounded-full bg-white w-10 h-10 flex items-center justify-center border border-gray-700 inner-shadow text-xl mb-3 font-black">
        {energy && energy.calcPersonalDay(calculationDate)}
      </li>
      <li className="rounded-full bg-white w-10 h-10 flex items-center justify-center border border-gray-700 inner-shadow text-xl mb-3 font-black">
        {energy && energy.calcPersonalWeek(calculationDate)}
      </li>
      <li className="rounded-full bg-white w-10 h-10 flex items-center justify-center border border-gray-700 inner-shadow text-xl mb-3 font-black">
        {energy && energy.calcPersonalMonth(calculationDate)}
      </li>
      <li className="rounded-full bg-white w-10 h-10 flex items-center justify-center border border-gray-700 inner-shadow text-xl mb-3 font-black">
        {energy && energy.calcPersonalYear(calculationYear)}
      </li>
    </ul>
  );
}

export default UniversalEnergyPerson;
