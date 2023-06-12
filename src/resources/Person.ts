import moment from 'moment';

import { reduceNumber } from '@/utils/numbers';

type PersonProps = {
  id?: string;
  name: string;
  lastName?: string;
  birthDate: string;
};

type SplittedDate = {
  day?: number,
  month?: number,
  year?: number,
};

class Person {
  id: string;

  name: string;

  lastName: string;

  birthDate: moment.Moment;

  constructor({
    id, name, lastName, birthDate,
  }: PersonProps) {
    this.id = id || '';
    this.name = name;
    this.lastName = lastName || '';
    this.birthDate = moment(birthDate);
  }

  /**
   * calculate karma number
   * AKA: A
   * reduce birth date month to one digit
   * @returns { Number }
   */
  calcKarma(): number {
    return reduceNumber(this.birthDate.month() + 1);
  }

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  calcPersonalDay(opts: SplittedDate) { return 1; }

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  calcPersonalWeek(opts: SplittedDate) { return 1; }

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  calcPersonalMonth(opts: SplittedDate) { return 1; }

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  calcPersonalYear(year: number) { return 1; }
}

export default Person;
