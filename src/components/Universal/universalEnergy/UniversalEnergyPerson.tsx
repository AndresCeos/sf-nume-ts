import cx from 'classnames';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

import { TiPlus } from 'react-icons/ti';

import GuestFormModal from '@/components/modal/GuestFormModal';
import { Consultant } from '@/context/EnergyContext';
import useConsult from '@/hooks/useConsult';
import Person from '@/resources/Person';

type UniversalEnergyPersonProps = {
  person: Consultant;
  setActive: () => void;
  handleUpdateGuest: (consultant: Partial<Consultant>) => void;
};

function UniversalEnergyPerson({ person, setActive, handleUpdateGuest }: UniversalEnergyPersonProps) {
  const { calculationYear } = useConsult();
  const { t } = useTranslation();
  const {
    id, name, date, selected, order,
  } = person;

  let energy;
  if (name && date) {
    energy = new Person({
      id: id ?? '', name, lastName: '', scdLastName: '', birthDate: date,
    });
  }
  const day = energy?.getDayOfBirth();
  const month = energy?.getMonthOfBirth();

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
          'text-main-700': !selected,
          'text-black': selected,
        })}
      >
        <button type="button" onClick={setActive}>
          {_.toUpper(t('home.energy') as string)}
          <br />
          <div className="font-black">
            {_.toUpper(t('home.personal') as string)}
          </div>
        </button>
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
        {energy && energy.calcPersonalDay({ day, month, year: calculationYear })}
      </li>
      <li className="rounded-full bg-white w-10 h-10 flex items-center justify-center border border-gray-700 inner-shadow text-xl mb-3 font-black">
        {energy && energy.calcPersonalWeek({ day, month, year: calculationYear })}
      </li>
      <li className="rounded-full bg-white w-10 h-10 flex items-center justify-center border border-gray-700 inner-shadow text-xl mb-3 font-black">
        {energy && energy.calcPersonalMonth({ day, month, year: calculationYear })}
      </li>
      <li className="rounded-full bg-white w-10 h-10 flex items-center justify-center border border-gray-700 inner-shadow text-xl mb-3 font-black">
        {energy && energy.calcPersonalYear(calculationYear)}
      </li>
    </ul>
  );
}

export default UniversalEnergyPerson;
