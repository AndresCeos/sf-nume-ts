import moment from 'moment';

import { reduceNumber } from '@/utils/numbers';

type PersonProps = {
  id: string;
  name: string;
  lastName: string;
  birthDate: string;
};

class Person {
  id: string;

  name: string;

  lastName: string;

  birthDate: moment.Moment;

  constructor({
    id, name, lastName, birthDate,
  }: PersonProps) {
    this.id = id;
    this.name = name;
    this.lastName = lastName;
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
}

export default Person;
