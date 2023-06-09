import _ from 'lodash';
import moment from 'moment';

moment.locale('es-mx');

type UniversalDay = {
  day?: number,
  month?: number,
  year?: number,
};

export class Universal {
  date: Date;

  NOW: moment.Moment;

  karmicos: number[];

  /**
   * @param {string} date - Date in string format
   */
  constructor(date?: string) {
    this.date = new Date(date ?? '');
    this.NOW = moment();
    this.karmicos = [13, 14, 16, 19];
  }

  /**
   * @param {string | number | Date} date - Date in string format
   */
  setDate(date: string | number | Date) {
    this.date = new Date(date);
  }

  /*  Función adaptada a Redux */
  // calcUniversalDay(monthToCalculate ,dayToCalculate ,yearToCalculate) {
  calcUniversalDay(opts: UniversalDay) {
    const monthToCalculate = _.isNil(opts?.month) ? this.NOW.format('M') : opts.month;
    const dayToCalculate = _.isNil(opts?.day) ? this.NOW.format('D') : opts.day;
    const yearToCalculate = _.isNil(opts?.year) ? this.NOW.format('YYYY') : opts.year;
    return this.reduceNumber(
      this.calcUniversalYear(yearToCalculate)
      + monthToCalculate
      + dayToCalculate,
    );
  }

/* Universal  Day Karmico
calcUniversalDayISK(dayToCalculate = null, monthToCalculate = null, yearToCalculate = null) {
  const universalDay = this.reduceNumberISK(this.calcUniversalYear(yearToCalculate) + dayToCalculate + monthToCalculate);
  return this.karmicos.includes(universalDay) ? '*' : '';
}

/* Función adaptada a Redux  
calcCurrentUniversalWeek(dayToCalculate = null, monthToCalculate = null, yearToCalculate = null) {
  dayToCalculate = dayToCalculate || this.NOW.date();
  monthToCalculate = monthToCalculate || this.NOW.month() + 1;
  yearToCalculate = yearToCalculate || this.NOW.year();

  const sumUniversalWeekOne = this.reduceNumber(this.reduceNumber(yearToCalculate) + this.reduceNumber(monthToCalculate));
  if (dayToCalculate >= 1 && dayToCalculate <= 7) {
    return sumUniversalWeekOne;
  }

  const sumUniversalWeekTwo = this.reduceNumber(this.reduceNumber(yearToCalculate) + sumUniversalWeekOne);
  if (dayToCalculate >= 8 && dayToCalculate <= 14) {
    return sumUniversalWeekTwo;
  }

  const sumUniversalWeekThree = this.reduceNumber(sumUniversalWeekTwo + sumUniversalWeekOne);
  if (dayToCalculate >= 15 && dayToCalculate <= 21) {
    return sumUniversalWeekThree;
  }

  const sumUniversalWeekFour = this.reduceNumber(this.reduceNumber(monthToCalculate) + sumUniversalWeekOne);
  if (dayToCalculate >= 22) {
    return sumUniversalWeekFour;
  }
}

/* Current Universal Week Karmico 
calcCurrentUniversalWeekISK(dayToCalculate = null, monthToCalculate = null, yearToCalculate = null) {
  const sumUniversalWeekOne = this.reduceNumberISK(yearToCalculate + monthToCalculate);
  if (dayToCalculate >= 1 && dayToCalculate <= 7) {
    return this.karmicos.includes(sumUniversalWeekOne) ? '*' : '';
  }

  const sumUniversalWeekTwo = this.reduceNumberISK(yearToCalculate + sumUniversalWeekOne);
  if (dayToCalculate >= 8 && dayToCalculate <= 14) {
    return this.karmicos.includes(sumUniversalWeekTwo) ? '*' : '';
  }

  const sumUniversalWeekThree = this.reduceNumberISK(sumUniversalWeekTwo + sumUniversalWeekOne);
  if (dayToCalculate >= 15 && dayToCalculate <= 21) {
    return this.karmicos.includes(sumUniversalWeekThree) ? '*' : '';
  }

  const sumUniversalWeekFour = this.reduceNumberISK(monthToCalculate + sumUniversalWeekOne);
  if (dayToCalculate >= 22) {
    return this.karmicos.includes(sumUniversalWeekFour) ? '*' : '';
  }
}

/*  Función adaptada a Redux 
calcUniversalWeek(monthToCalculate = null, weekToCalculate, yearToCalculate = null) {
  monthToCalculate = monthToCalculate || this.NOW.month() + 1;
  yearToCalculate = yearToCalculate || this.NOW.year();
  const weekOne = monthToCalculate + this.calcUniversalYear(yearToCalculate);
  if (weekToCalculate === 1) { return this.reduceNumber(weekOne); }
  const weekTwo = this.calcUniversalYear(yearToCalculate) + weekOne;
  if (weekToCalculate === 2) { return this.reduceNumber(weekTwo); }
  const weekThr = weekOne + weekTwo;
  if (weekToCalculate === 3) { return this.reduceNumber(weekThr); }
  const weekFou = monthToCalculate + weekOne;
  if (weekToCalculate === 4) { return this.reduceNumber(weekFou); }
}

/* Universal Week Karmico 
calcUniversalWeekISK(monthToCalculate = null, weekToCalculate, yearToCalculate = null) {
  const weekOne = monthToCalculate + this.calcUniversalYear(yearToCalculate);
  if (weekToCalculate === 1) {
    const universalWeekOne = this.reduceNumberISK(weekOne);
    return this.karmicos.includes(universalWeekOne) ? '*' : '';
  }
  const weekTwo = this.calcUniversalYear(yearToCalculate) + weekOne;
  if (weekToCalculate === 2) {
    const universalWeekTwo = this.reduceNumberISK(weekTwo);
    return this.karmicos.includes(universalWeekTwo) ? '*' : '';
  }
  const weekThr = weekOne + weekTwo;
  if (weekToCalculate === 3) {
    const universalWeekThree = this.reduceNumberISK(weekThr);
    return this.karmicos.includes(universalWeekThree) ? '*' : '';
  }
  const weekFou = monthToCalculate + weekOne;
  if (weekToCalculate === 4) {
    const universalweekFou = this.reduceNumberISK(weekFou);
    return this.karmicos.includes(universalweekFou) ? '*' : '';
  }
}

/*  Función adaptada a Redux 
calcUniversalMonth(monthToCalculate = null, yearToCalculate = null) {
  monthToCalculate = monthToCalculate || this.NOW.month() + 1;
  yearToCalculate = yearToCalculate || this.NOW.year();
  return this.reduceNumber(this.calcUniversalYear(yearToCalculate) + monthToCalculate);
}

/* Universal Month Karmico 
calcUniversalMonthISK(monthToCalculate = null, yearToCalculate = null) {
  const universalMonth = this.reduceNumberISK(this.calcUniversalYear(yearToCalculate) + monthToCalculate);
  return this.karmicos.includes(universalMonth) ? '*' : '';
}

/*  Función adaptada a Redux 
calcUniversalYear(yearToCalculate = null) {
  yearToCalculate = yearToCalculate || this.NOW.year();
  return this.reduceNumber(yearToCalculate);
}

/* Universal Year Karmico 
calcUniversalYearISK(yearToCalculate = null) {
  const universalYear = this.calcUniversalYear(yearToCalculate);
  return this.karmicos.includes(universalYear) ? '*' : '';
}

reduceNumberWithOut11(reduceSum) {
  while (reduceSum > 9 && reduceSum !== 22) {
    reduceSum = reduceSum.toString().split('').reduce((r, c) => r += parseInt(c), 0);
  }
  return reduceSum;
}

reduceNumber(reduceSum) {
  while (reduceSum > 9 && !(reduceSum === 22 || reduceSum === 11)) {
    reduceSum = reduceSum.toString().split('').reduce((r, c) => r += parseInt(c), 0);
  }
  return reduceSum;
}

reduceNumberISK(reduceSum) {
  while (reduceSum > 9 && !this.karmicos.includes(reduceSum)) {
    reduceSum = reduceSum.toString().toLowerCase().split('').reduce((r, c) => r += parseInt(c), 0);
  }
  return parseInt(reduceSum);
}
}
export default Universal;
