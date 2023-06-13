import cx from 'classnames';

import { TiPlus } from 'react-icons/ti';

import GuestFormModal from '@/components/modal/GuestFormModal';
import useConsult from '@/hooks/useConsult';
import Person from '@/resources/Person';

export type EnergyPersonProps = {
  id?: string;
  name: string | false;
  date: Date | false | string;
  active?: boolean;
  order?: number;
};

type UniversalEnergyPersonProps = {
  person: EnergyPersonProps;
  setActive: () => void;
  handleUpdateGuest: ({ name, date }: { name: string; date: Date; }) => void;
};

function UniversalEnergyPerson({
  person, setActive, handleUpdateGuest,
}: UniversalEnergyPersonProps) {
  const { calculationDate, calculationYear } = useConsult();
  const {
    id, name, date, active, order,
  } = person;

  let energy;
  if (name && date) {
    energy = new Person({ name, birthDate: new Date(date).toDateString() });
  }

  return (
    <ul className={cx(
      'flex flex-col items-center',
      { 'opacity-25': !name },
      `order-${order}`,
    )}
    >
      <li className="mb-2">
        <img src="/assets/ic-universal.svg" alt="personal_disabled" />
      </li>
      <li
        className={cx('text-center cursor-pointer', {
          'text-main-700': active,
          'text-black': !active,
        })}
      >
        <button type="button" onClick={setActive}>
          ENERGÍA
        </button>
        <br />
        <div className="font-black">PERSONAL</div>
      </li>
      <li className={cx('rounded-full bg-white w-32 h-10 flex items-center justify-center border border-gray-700 text-[13px] inner-shadow mt-3 mb-6 font-black')}>
        {(!name && !date) && (
          <GuestFormModal callback={handleUpdateGuest}>
            <TiPlus />
          </GuestFormModal>
        )}
        {(name && date) && (
          <GuestFormModal
            callback={handleUpdateGuest}
            guest={{
              id,
              name,
              date,
            }}
          >
            {name}
          </GuestFormModal>
        )}
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
