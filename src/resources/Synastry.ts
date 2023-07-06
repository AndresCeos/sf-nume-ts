/* eslint-disable no-plusplus */
import _ from 'lodash';
import moment from 'moment';
import { capitalize, getDaysOfWeek, getMonthName } from '../utils/numbers';
import Person from './Person';

import {
  getAllMonths,
  reduceMonth, reduceNumber, reduceNumberForSub, reduceNumberISK,
} from '@/utils/numbers';

type SplittedDate = {
  day?: number,
  month?: number,
  year?: number,
};
type AnnualReturn = {
  yearToCalculate: number,
  age: number,
  A: number,
  B: number,
  C: number,
  D: number,
  E: number,
  F: number,
  G: number,
  H: number
};

class Synastry {
  consultant: Person;

  partner: Person;

  NOW:moment.Moment;

  karmic: number[];

  yearMet?: number;

  constructor(consultant: Person, partner: Person) {
    this.consultant = consultant;
    this.partner = partner;
    this.NOW = moment();
    this.karmic = [13, 14, 16, 19];
    this.yearMet = partner.yearMet;
  }

  getYearMeet() :number | undefined {
    return this.yearMet;
  }

  getYearTimeCurve() :number | undefined {
    return this.yearMet;
  }

  getYearsOld(year :number) :number {
    const yearToCalculate = _.isNil(year) ? this.NOW.year() : year;
    return yearToCalculate - Number(this.yearMet);
  }

  getMonthOfBirth():number {
    const consultantBirthDate = this.consultant.getBirthDate();
    const partnerBirthDate = this.partner.getBirthDate();
    const sumBirthDates = (consultantBirthDate.month() + 1) + (partnerBirthDate.month() + 1);
    let reduce;
    if (sumBirthDates === 19) {
      reduce = 10;
    } else {
      reduce = reduceMonth(sumBirthDates);
    }
    return reduce;
  }

  getA():number {
    const birthDate = this.consultant.getBirthDate();
    const partnerBirthDate = this.partner.getBirthDate();

    return reduceNumber((birthDate.month() + 1) + (partnerBirthDate.month() + 1));
  }

  getB():number {
    const birthDate = this.consultant.getBirthDate();
    const partnerBirthDate = this.partner.getBirthDate();

    return reduceNumber(birthDate.date() + partnerBirthDate.date());
  }

  getBISK():string {
    const birthDate = this.consultant.getBirthDate();
    const partnerBirthDate = this.partner.getBirthDate();
    const B = reduceNumberISK(birthDate.date() + partnerBirthDate.date());
    return this.karmic.includes(B) ? '*' : '';
  }

  getC():number {
    const birthDate = this.consultant.getBirthDate();
    const partnerBirthDate = this.partner.getBirthDate();

    return reduceNumber(birthDate.year() + partnerBirthDate.year());
  }

  getCISK():string {
    const birthDate = this.consultant.getBirthDate();
    const partnerBirthDate = this.partner.getBirthDate();
    const C = reduceNumberISK(birthDate.year() + partnerBirthDate.year());
    return this.karmic.includes(C) ? '*' : '';
  }

  getD():number {
    return reduceNumber(
      this.getA()
      + this.getB()
      + this.getC(),
    );
  }

  getDCheck():number {
    const A = reduceNumber(this.getA());
    const B = reduceNumber(this.getB());
    const C = reduceNumber(this.getC());
    return reduceNumber(A + B + C);
  }

  getDISK():string {
    const D = reduceNumberISK(
      this.getA()
      + this.getB()
      + this.getC(),
    );
    return this.karmic.includes(D) ? '*' : '';
  }

  getDISKCheck():string {
    const D = reduceNumberISK(
      this.getA()
      + this.getB()
      + this.getC(),
    );
    return this.karmic.includes(D) ? '*' : '';
  }

  getE():number {
    return reduceNumber(
      this.getA()
      + this.getB(),
    );
  }

  getEISK():string {
    const E = reduceNumberISK(
      this.getA()
      + this.getB(),
    );
    return this.karmic.includes(E) ? '*' : '';
  }

  getEISKCheck():string {
    const E = reduceNumberISK(
      this.getA()
      + this.getB(),
    );
    return this.karmic.includes(E) ? '*' : '';
  }

  getF():number {
    return reduceNumber(
      this.getC()
      + this.getB(),
    );
  }

  getFISK():string {
    const F = reduceNumberISK(
      this.getC()
      + this.getB(),
    );
    return this.karmic.includes(F) ? '*' : '';
  }

  getFISKCheck():string {
    const F = reduceNumberISK(
      this.getC()
      + this.getB(),
    );
    return this.karmic.includes(F) ? '*' : '';
  }

  getG() :number {
    return reduceNumber(
      this.getE()
      + this.getF(),
    );
  }

  getGISK():string {
    const G = reduceNumberISK(
      this.getE()
      + this.getF(),
    );
    return this.karmic.includes(G) ? '*' : '';
  }

  getH():number {
    return reduceNumber(
      this.getA()
      + this.getC(),
    );
  }

  getHISK():string {
    const H = reduceNumberISK(
      this.getA()
      + this.getC(),
    );
    return this.karmic.includes(H) ? '*' : '';
  }

  getHISKCheck():string {
    const H = reduceNumberISK(
      this.getA()
      + this.getC(),
    );
    return this.karmic.includes(H) ? '*' : '';
  }

  getHCheck():number {
    return reduceNumber(
      this.getA()
      + this.getC(),
    );
  }

  getI():number {
    return reduceNumber(
      this.getE()
      + this.getF()
      + this.getG(),
    );
  }

  getIISK() :string {
    const I = reduceNumberISK(
      this.getE()
      + this.getF()
      + this.getG(),
    );
    return this.karmic.includes(I) ? '*' : '';
  }

  getJ() :number {
    return reduceNumber(
      this.getH()
      + this.getD(),
    );
  }

  getJISK():string {
    const J = reduceNumberISK(
      this.getH()
      + this.getD(),
    );
    return this.karmic.includes(J) ? '*' : '';
  }

  getAs() :number {
    const birthDate = this.consultant.getBirthDate();
    const partnerBirthDate = this.partner.getBirthDate();

    return reduceNumberForSub(birthDate.month() + 1 + partnerBirthDate.month() + 1);
  }

  getBs():number {
    const birthDate = this.consultant.getBirthDate();
    const partnerBirthDate = this.partner.getBirthDate();

    return reduceNumberForSub(birthDate.date() + partnerBirthDate.date());
  }

  getCs():number {
    const birthDate = this.consultant.getBirthDate();
    const partnerBirthDate = this.partner.getBirthDate();

    return reduceNumberForSub(birthDate.year() + partnerBirthDate.year());
  }

  getK() :number {
    return Math.abs(reduceNumber(
      this.getAs()
      - this.getBs(),
    ));
  }

  getL():number {
    return Math.abs(reduceNumber(
      this.getBs()
      - this.getCs(),
    ));
  }

  getM():number {
    return Math.abs(reduceNumber(
      this.getK()
      - this.getL(),
    ));
  }

  getN():number {
    return Math.abs(reduceNumber(
      this.getAs()
      - this.getCs(),
    ));
  }

  getO():number {
    return reduceNumber(
      this.getM()
      + this.getK()
      + this.getL(),
    );
  }

  getP():number {
    return reduceNumber(
      this.getD()
      + this.getO(),
    );
  }

  getQ():number {
    return reduceNumber(
      this.getM()
      + this.getK(),
    );
  }

  getR():number {
    return reduceNumber(
      this.getM()
      + this.getL(),
    );
  }

  getS() :number {
    return reduceNumber(
      this.getQ()
      + this.getR(),
    );
  }

  getW():string {
    const appearances = [
      this.getK(),
      this.getO(),
      this.getL(),
      this.getM(),
      this.getN(),
      this.getQ(),
      this.getR(),
      this.getS(),
      this.getP(),
    ];
    const occurrences: Record<number, number> = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const num of appearances) {
      occurrences[num] = occurrences[num] ? occurrences[num] + 1 : 1;
    }
    Object.entries(occurrences).forEach((occurrence) => {
      if (occurrence[1] === 3) {
        occurrences[occurrence[1]] += 1;
      }
    });
    return Object.entries(occurrences).filter((e) => e[1] === 3).map((e) => reduceNumber(Number(e[0]) * 3)).join(', ');
  }

  calcReaction():number {
    return reduceNumber(
      this.consultant.calcReaction()
      + this.partner.calcReaction(),
    );
  }

  calcReactionISK():string {
    const reaction = reduceNumberISK(
      this.consultant.calcReaction()
      + this.partner.calcReaction(),
    );
    return this.karmic.includes(reaction) ? '*' : '';
  }

  calcSynthesis():number {
    return reduceNumber(
      this.consultant.calcSynthesis()
      + this.partner.calcSynthesis(),
    );
  }

  calcSynthesisISK():string {
    const synthesis = reduceNumberISK(
      this.consultant.calcSynthesis()
      + this.partner.calcSynthesis(),
    );
    return this.karmic.includes(synthesis) ? '*' : '';
  }

  calcGift():number {
    return reduceNumber(
      Number(this.consultant.calcGift())
      + Number(this.partner.calcGift()),
    );
  }

  calcGiftISK():string {
    const gift = reduceNumberISK(
      Number(this.consultant.calcGift())
      + Number(this.partner.calcGift()),
    );
    return this.karmic.includes(gift) ? '*' : '';
  }

  calcName():number {
    return reduceNumber(
      this.consultant.calcName()
      + this.partner.calcName(),
    );
  }

  calcNameISK():string {
    const name = reduceNumberISK(
      this.consultant.calcName()
      + this.partner.calcName(),
    );
    return this.karmic.includes(name) ? '*' : '';
  }

  getNameCheck():number {
    return reduceNumber(
      this.consultant.getNameCheck()
      + this.partner.getNameCheck(),
    );
  }

  calcSoulNumber():number {
    return reduceNumber(
      this.consultant.calcSoulNumber()
      + this.partner.calcSoulNumber(),
    );
  }

  calcSoulNumberISK():string {
    const soul = reduceNumberISK(this.consultant.calcSoulNumber() + this.partner.calcSoulNumber());
    return this.karmic.includes(soul) ? '*' : '';
  }

  getSoulCheck():number {
    return reduceNumber(
      this.consultant.getSoulCheck()
      + this.partner.getSoulCheck(),
    );
  }

  calcSoulExpression():number {
    return reduceNumber(
      this.consultant.calcSoulExpression()
      + this.partner.calcSoulExpression(),
    );
  }

  calcSoulExpressionISK():string {
    const soul = reduceNumberISK(this.consultant.calcSoulExpression() + this.partner.calcSoulExpression());
    return this.karmic.includes(soul) ? '*' : '';
  }

  getExpressionSoulCheck():number {
    return reduceNumber(
      this.consultant.getExpressionSoulCheck()
      + this.partner.getExpressionSoulCheck(),
    );
  }

  calcMaturity():number {
    return reduceNumber(
      this.consultant.calcMaturity()
      + this.partner.calcMaturity(),
    );
  }

  calcMaturityISK():string {
    const maturity = reduceNumberISK(this.consultant.calcMaturity() + this.partner.calcMaturity());
    return this.karmic.includes(maturity) ? '*' : '';
  }

  /**
   * calculate personal year
   * @returns {Number} sumPersonalYear
   */
  calcPersonalYear(year :number):number {
    const yearToCalculate = _.isNil(year) ? this.NOW.year() : year;
    return reduceNumber(
      this.getA()
      + this.getB()
      + yearToCalculate,
    );
  }

  /* Personal  Year Keramics */
  calcPersonalYearISK(year:number):string {
    const yearToCalculate = _.isNil(year) ? this.NOW.year() : year;
    const personalYear = reduceNumberISK(this.getA() + this.getB() + yearToCalculate);
    return this.karmic.includes(personalYear) ? '*' : '';
  }

  /**
   * calculate personal month
   * @returns {Number} sumPersonalMonth
   */
  calcPersonalMonth(month :number, year :number):number {
    const yearToCalculate = _.isNil(year) ? this.NOW.year() : year;
    const monthToCalculate = _.isNil(month) ? this.NOW.month() + 1 : month;
    const personalYear = this.calcPersonalYear(yearToCalculate);
    const personalMonth = reduceNumber(personalYear + monthToCalculate);
    return personalMonth;
  }

  /** Personal Month Keramics */
  calcPersonalMonthISK(month :number, year :number):string {
    const yearToCalculate = _.isNil(year) ? this.NOW.year() : year;
    const monthToCalculate = _.isNil(month) ? this.NOW.month() + 1 : month;
    const personalYear = this.calcPersonalYear(yearToCalculate);
    const personalMonth = reduceNumberISK(personalYear + monthToCalculate);
    return this.karmic.includes(personalMonth) ? '*' : '';
  }

  /**
   * calculate personal week
   * @returns {Number} sumPersonalWeek
   */
  calcPersonalWeek(day :number, month :number, year:number):number {
    const yearToCalculate = _.isNil(year) ? this.NOW.year() : year;
    const monthToCalculate = _.isNil(month) ? this.NOW.month() + 1 : month;
    const dayToCalculate = _.isNil(day) ? this.NOW.date() : day;
    const sumPersonalWeekOne = reduceNumber(this.calcPersonalYear(yearToCalculate) + monthToCalculate);
    if (dayToCalculate >= 1 && dayToCalculate <= 7) {
      return sumPersonalWeekOne;
    }
    const sumPersonalWeekTwo = reduceNumber(this.calcPersonalYear(yearToCalculate) + sumPersonalWeekOne);
    if (dayToCalculate >= 8 && dayToCalculate <= 14) {
      return sumPersonalWeekTwo;
    }

    const sumPersonalWeekThree = reduceNumber(sumPersonalWeekTwo + sumPersonalWeekOne);
    if ((dayToCalculate) >= 15 && dayToCalculate <= 21) {
      return sumPersonalWeekThree;
    }

    const sumPersonalWeekFour = reduceNumber(monthToCalculate + sumPersonalWeekOne);
    if (dayToCalculate >= 22) {
      return sumPersonalWeekFour;
    }
    return 0;
  }

  /** Personal Week Keramics */
  calcPersonalWeekISK(day :number, month :number, year:number):string {
    const yearToCalculate = _.isNil(year) ? this.NOW.year() : year;
    const monthToCalculate = _.isNil(month) ? this.NOW.month() + 1 : month;
    const dayToCalculate = _.isNil(day) ? this.NOW.date() : day;
    const sumPersonalWeekOne = reduceNumberISK(this.calcPersonalYear(yearToCalculate) + monthToCalculate);
    if (dayToCalculate >= 1 && dayToCalculate <= 7) {
      return this.karmic.includes(sumPersonalWeekOne) ? '*' : '';
    }
    const sumPersonalWeekTwo = reduceNumberISK(this.calcPersonalYear(yearToCalculate) + sumPersonalWeekOne);
    if (dayToCalculate >= 8 && dayToCalculate <= 14) {
      return this.karmic.includes(sumPersonalWeekTwo) ? '*' : '';
    }

    const sumPersonalWeekThree = reduceNumberISK(sumPersonalWeekTwo + sumPersonalWeekOne);
    if ((dayToCalculate) >= 15 && dayToCalculate <= 21) {
      return this.karmic.includes(sumPersonalWeekThree) ? '*' : '';
    }

    const sumPersonalWeekFour = reduceNumberISK(monthToCalculate + sumPersonalWeekOne);
    if (dayToCalculate >= 22) {
      return this.karmic.includes(sumPersonalWeekFour) ? '*' : '';
    }
    return '';
  }

  /**
   * calculate personal day
   * @returns {Number} sumPersonalDay
   */
  calcPersonalDay(opts:SplittedDate):number {
    const yearToCalculate = _.isNil(opts.year) ? this.NOW.year() : opts.year;
    const monthToCalculate = _.isNil(opts.month) ? this.NOW.month() + 1 : opts.month;
    const dayToCalculate = _.isNil(opts.day) ? this.NOW.date() : opts.day;
    return reduceNumber(
      this.calcPersonalYear(yearToCalculate)
      + monthToCalculate
      + dayToCalculate,
    );
  }

  calcPersonalDayISK(opts:SplittedDate):string {
    const yearToCalculate = _.isNil(opts.year) ? this.NOW.year() : opts.year;
    const monthToCalculate = _.isNil(opts.month) ? this.NOW.month() + 1 : opts.month;
    const dayToCalculate = _.isNil(opts.day) ? this.NOW.date() : opts.day;
    const personalDay = reduceNumberISK(this.calcPersonalYear(yearToCalculate) + monthToCalculate + dayToCalculate);
    return this.karmic.includes(personalDay) ? '*' : '';
  }

  hasDoubleStage():boolean {
    const yearBirthDate = this.consultant.birthDate.year() + this.partner.birthDate.year();
    const monthBirthDate = (this.consultant.birthDate.month() + 1) + (this.partner.birthDate.month() + 1);
    const dayBirthDate = this.consultant.birthDate.date() + this.partner.birthDate.date();

    const reducedYear = reduceNumber(yearBirthDate);
    const reducedMonth = reduceNumber(monthBirthDate);
    const reducedDay = reduceNumber(dayBirthDate);

    const stageOne = yearBirthDate + monthBirthDate + dayBirthDate;
    const stageTwo = reducedYear + reducedMonth + reducedDay;
    const reduceStageOne = reduceNumber(stageOne);
    const reduceStageTwo = reduceNumber(stageTwo);

    if (reduceStageOne === reduceStageTwo) {
      return false;
    }
    return true;
  }

  /**
   * calculate life stages
   * AKA: 1 => E
   * AKA: 2 => F
   * AKA: 3 => G
   * AKA: 4 => H
   * @returns {Number}
   */
  calcLifeStage(stage:number):number {
    const stageOne = this.getE();
    if (stage === 1) return stageOne;

    const stageTwo = this.getF();
    if (stage === 2) return stageTwo;

    const stageThr = this.getG();
    if (stage === 3) return stageThr;

    const stageFou = this.getH();
    if (stage === 4) return stageFou;

    if (stage === 5) return stageThr;
    if (stage === 6) return stageTwo;
    if (stage === 7) return stageOne;
    return stageOne;
  }

  calcLifeStageISK(stage :number):string {
    const stageOne = reduceNumberISK(this.getA() + this.getB());
    if (stage === 1) return this.karmic.includes(stageOne) ? '*' : '';

    const stageTwo = reduceNumberISK(this.getC() + this.getB());
    if (stage === 2) return this.karmic.includes(stageTwo) ? '*' : '';

    const stageThr = reduceNumberISK(this.getE() + this.getF());
    if (stage === 3) return this.karmic.includes(stageThr) ? '*' : '';

    const stageFou = reduceNumberISK(this.getA() + this.getC());
    if (stage === 4) return this.karmic.includes(stageFou) ? '*' : '';

    if (stage === 5) return this.karmic.includes(stageThr) ? '*' : '';
    if (stage === 6) return this.karmic.includes(stageTwo) ? '*' : '';
    if (stage === 7) return this.karmic.includes(stageOne) ? '*' : '';
    return '';
  }

  calcDurationStage(stage:number):string {
    const stageOne = 9 - reduceNumberForSub(this.getA() + this.getB());
    if (stage === 1) return `De 0 a los ${stageOne}`;
    const stageTwo = stageOne + 9;
    if (stage === 2) return `${stageOne} a los ${stageTwo}`;

    const stageThr = stageTwo + 9;
    if (stage === 3) return `${stageTwo} a los ${stageThr}`;

    const stageFou = stageThr + 9;
    if (stage === 4) return `${stageThr} a los ${stageFou}`;
    const stageFive = stageFou + 9;
    if (stage === 5) return `${stageFou} a los ${stageFive}`;
    if (stage === 6) return `${stageFive + 9} a los ${stageFive + 18}`;
    if (stage === 7) return `${stageFive + 18} a ...`;
    return '';
  }

  calcLifeStageDuration(stage :number):number {
    const start:number = Number(this.yearMet);
    const stageOne = 9 - reduceNumberForSub(
      this.getA() + this.getB() + start,
    );
    let stageOneEnd = start + stageOne;
    if (stageOne === 0) {
      stageOneEnd += 9;
    }

    if (stage === 1) {
      return stageOneEnd;
    }
    if (stage < 8) {
      const stageEnd = stageOneEnd + Math.abs((stage - 1) * 9);
      return stageEnd;
    }
    return 0;
  }

  calcDoubleLifeStageDuration(stage :number):number {
    const start:number = Number(this.yearMet);
    const stageOne = 9 - reduceNumberForSub(this.getA() + this.getB());
    let stageOneEnd = start + stageOne;
    if (stageOne === 0) {
      stageOneEnd += 9;
    }
    if (stage === 1) return stageOneEnd;

    if (stage < 8) {
      const stageEnd = stageOneEnd + Math.abs((stage - 1) * 9);
      return stageEnd;
    }

    return 0;
  }

  getLifeStage(year:number, date :moment.Moment):number {
    const yearToCalculate = _.isNil(year) ? this.NOW.year() : year;
    const newDate = _.isNil(date) ? this.NOW : date;
    const monthCut = this.getCustomMonths();
    const actualMonth = getMonthName(newDate.toString());
    const indexEnero = monthCut.findIndex((i: string) => i === 'Enero');
    const index = monthCut.findIndex((i:string) => i === capitalize(actualMonth));

    const start:number = Number(this.yearMet);
    const duration = 9 - reduceNumberForSub(
      this.getA()
      + this.getB()
      + start,
    );
    let stageOneEnd = start + duration;
    if (duration === 0) {
      stageOneEnd += 9;
    }
    const stageOne = this.getE();
    const stageTwo = this.getF();
    const stageTwoEnd = stageOneEnd + 9;
    const stageThr = this.getG();
    const stageThrEnd = stageTwoEnd + 9;
    const stageFou = this.getH();
    const stageFouEnd = stageThrEnd + 9;
    if (start <= yearToCalculate && yearToCalculate <= stageOneEnd) {
      if (indexEnero > index && yearToCalculate === stageOneEnd) {
        return stageTwo;
      }
      return stageOne;
    }
    if (stageOneEnd <= yearToCalculate && yearToCalculate <= stageTwoEnd) {
      if (indexEnero > index && yearToCalculate === stageTwoEnd) {
        return stageThr;
      }
      return stageTwo;
    }

    if (stageTwoEnd <= yearToCalculate && yearToCalculate <= stageThrEnd) {
      if (indexEnero > index && yearToCalculate === stageThrEnd) {
        return stageFou;
      }
      return stageThr;
    }

    if (stageThrEnd <= yearToCalculate && yearToCalculate <= stageFouEnd) {
      if (indexEnero > index && yearToCalculate === stageFouEnd) {
        return stageThr;
      }
      return stageFou;
    }

    if (stageFouEnd <= yearToCalculate && yearToCalculate <= (stageFouEnd + 9)) {
      if (indexEnero > index && yearToCalculate === stageFouEnd + 9) {
        return stageTwo;
      }
      return stageThr;
    }
    if ((stageFouEnd + 9) <= yearToCalculate && yearToCalculate <= (stageFouEnd + 18)) {
      if (indexEnero > index && yearToCalculate === stageFouEnd + 18) {
        return stageOne;
      }
      return stageTwo;
    }
    if ((stageFouEnd + 18) <= yearToCalculate) {
      return stageOne;
    }
    return 0;
  }

  getLifeStageISK(year :number):string {
    const yearToCalculate = _.isNil(year) ? this.NOW.year() : year;
    const start:number = Number(this.yearMet);
    const duration = 9 - reduceNumberForSub(this.getA() + this.getB() + start);
    let stageOneEnd = start + duration;
    if (duration === 0) {
      stageOneEnd += 9;
    }
    const stageOne = reduceNumberISK(this.getA() + this.getB());
    if (start <= yearToCalculate && yearToCalculate <= stageOneEnd) {
      return this.karmic.includes(stageOne) ? '*' : '';
    }

    const stageTwo = reduceNumberISK(this.getC() + this.getB());
    const stageTwoEnd = stageOneEnd + 9;
    if (stageOneEnd <= yearToCalculate && yearToCalculate <= stageTwoEnd) {
      return this.karmic.includes(stageTwo) ? '*' : '';
    }

    const stageThr = reduceNumberISK(this.getE() + this.getF());
    const stageThrEnd = stageTwoEnd + 9;
    if (stageTwoEnd <= yearToCalculate && yearToCalculate <= stageThrEnd) {
      return this.karmic.includes(stageThr) ? '*' : '';
    }

    const stageFou = reduceNumberISK(this.getA() + this.getC());
    const stageFouEnd = stageThrEnd + 9;
    if (stageThrEnd <= yearToCalculate && yearToCalculate <= stageFouEnd) {
      return this.karmic.includes(stageFou) ? '*' : '';
    }

    if (stageFouEnd <= yearToCalculate && yearToCalculate <= (stageFouEnd + 9)) {
      return this.karmic.includes(stageThr) ? '*' : '';
    }
    if ((stageFouEnd + 9) <= yearToCalculate && yearToCalculate <= (stageFouEnd + 18)) {
      return this.karmic.includes(stageTwo) ? '*' : '';
    }
    if ((stageFouEnd + 18) <= yearToCalculate) {
      return this.karmic.includes(stageOne) ? '*' : '';
    }
    return '';
  }

  /**
   * calculate current stage number
   * @returns {Number} stage
   */
  getLifeStageNumber(year:number, date :moment.Moment):number {
    const yearToCalculate = _.isNil(year) ? this.NOW.year() : year;
    const newDate = _.isNil(date) ? this.NOW : date;
    const monthCut = this.getCustomMonths();
    const actualMonth = getMonthName(newDate.toString());
    const indexEnero = monthCut.findIndex((i:string) => i === 'Enero');
    const index = monthCut.findIndex((i:string) => i === capitalize(actualMonth));
    const start:number = Number(this.yearMet);
    const duration = 9 - reduceNumberForSub(
      this.getA()
      + this.getB()
      + start,
    );
    let stageOneEnd = start + duration;
    if (duration === 0) {
      stageOneEnd += 9;
    }
    const stageTwoEnd = stageOneEnd + 9;
    const stageThrEnd = stageTwoEnd + 9;
    const stageFouEnd = stageThrEnd + 9;
    if (start <= yearToCalculate && yearToCalculate <= stageOneEnd) {
      if (indexEnero > index && yearToCalculate === stageOneEnd) {
        return 2;
      }
      return 1;
    }

    if (stageOneEnd <= yearToCalculate && yearToCalculate <= stageTwoEnd) {
      if (indexEnero > index && yearToCalculate === stageTwoEnd) {
        return 3;
      }
      return 2;
    }
    if (stageTwoEnd <= yearToCalculate && yearToCalculate <= stageThrEnd) {
      if (indexEnero > index && yearToCalculate === stageThrEnd) {
        return 4;
      }
      return 3;
    }
    if (stageThrEnd <= yearToCalculate && yearToCalculate <= stageFouEnd) {
      if (indexEnero > index && yearToCalculate === stageFouEnd) {
        return 5;
      }
      return 4;
    }
    if (stageFouEnd <= yearToCalculate && yearToCalculate <= (stageFouEnd + 9)) {
      if (indexEnero > index && yearToCalculate === stageFouEnd + 9) {
        return 6;
      }
      return 5;
    }
    if ((stageFouEnd + 9) <= yearToCalculate && yearToCalculate <= (stageFouEnd + 18)) {
      if (indexEnero > index && yearToCalculate === stageFouEnd + 18) {
        return 7;
      }
      return 6;
    }
    if ((stageFouEnd + 18) <= yearToCalculate) {
      return 7;
    }
    return 0;
  }

  getDoubleLifeStageNumber(year:number):number {
    const start:number = Number(this.yearMet);
    const yearToCalculate = _.isNil(year) ? this.NOW.year() : year;
    const duration = 9 - reduceNumberForSub(this.getA() + this.getB());
    let stageOneEnd = start + duration;
    if (duration === 0) {
      stageOneEnd += 9;
    }
    if (start <= yearToCalculate && yearToCalculate <= stageOneEnd) {
      return 1;
    }
    const stageTwoEnd = stageOneEnd + 9;
    if (stageOneEnd <= yearToCalculate && yearToCalculate <= stageTwoEnd) {
      return 2;
    }
    const stageThrEnd = stageTwoEnd + 9;
    if (stageTwoEnd <= yearToCalculate && yearToCalculate <= stageThrEnd) {
      return 3;
    }
    const stageFouEnd = stageThrEnd + 9;
    if (stageThrEnd <= yearToCalculate && yearToCalculate <= stageFouEnd) {
      return 4;
    }
    if (stageFouEnd <= yearToCalculate && yearToCalculate <= (stageFouEnd + 9)) {
      return 5;
    }
    if ((stageFouEnd + 9) <= yearToCalculate && yearToCalculate <= (stageFouEnd + 18)) {
      return 6;
    }
    if ((stageFouEnd + 18) <= yearToCalculate) {
      return 7;
    }
    return 0;
  }

  /**
   * get nine year cycle
   * @returns {Number} nineYearCycle
   */
  getNineYearCycleStage(year:number) :number[] {
    const yearToCalculate = _.isNil(year) ? this.NOW.year() : year;
    let firstValue = false;
    let firstYear:number = 0;
    const nineYearCycle = [];
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index <= 9; index++) {
      const personalYear = this.calcPersonalYear(yearToCalculate - index);
      if (personalYear === 9 && firstValue === false) {
        nineYearCycle.push(yearToCalculate - index);
        firstYear = yearToCalculate - index;
        firstValue = true;
      }
    }
    // eslint-disable-next-line no-plusplus
    for (let index = 1; index <= 9; index++) {
      nineYearCycle[index] = firstYear + index;
    }
    return nineYearCycle;
  }

  getCycleCustom(stage:number):number[] {
    let start:number = Number(this.yearMet);
    let stageOne = 9 - reduceNumberForSub(this.getA() + this.getB());
    if (stageOne === 0) {
      stageOne += 9;
    }
    const cycleStage = [];
    if (stage === 1) {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < stageOne; i++) {
        cycleStage.push(start);
        // eslint-disable-next-line no-plusplus
        start++;
      }
    }
    if (stage < 8 && stage !== 1) {
      let stageStart = this.calcLifeStageDuration(stage) - 9;
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < 9; i++) {
        cycleStage.push(stageStart);
        // eslint-disable-next-line no-plusplus
        stageStart++;
      }
    }
    return cycleStage;
  }

  getCustomMonths():string[] {
    const consultantBirthDate = this.consultant.getBirthDate();
    const partnerBirthDate = this.partner.getBirthDate();
    const sumBirthDates = (consultantBirthDate.month() + 1) + (partnerBirthDate.month() + 1);
    let reduce;
    if (sumBirthDates === 19) {
      reduce = 10;
    } else {
      reduce = reduceMonth(sumBirthDates);
    }
    let reduceIndex = reduce - 1;
    const months = getAllMonths();
    const listOfMonths = [];
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < 13; index++) {
      if (reduceIndex > 11) {
        reduceIndex = 0;
      }
      listOfMonths.push(months[reduceIndex]);
      // eslint-disable-next-line no-plusplus
      reduceIndex++;
    }
    return listOfMonths;
  }

  getQuarterOne() {
    return this.getC();
  }

  getQuarterOneISK():string {
    const birthDate = this.consultant.getBirthDate();
    const partnerBirthDate = this.partner.getBirthDate();
    const quarterOne = reduceNumberISK(birthDate.year() + partnerBirthDate.year());
    return this.karmic.includes(quarterOne) ? '*' : '';
  }

  getQuarterTwo(year :number):number {
    const yearToCalculate = _.isNil(year) ? this.NOW.year() : year;
    return reduceNumber(yearToCalculate - this.getD());
  }

  getQuarterTwoISK(year :number):string {
    const yearToCalculate = _.isNil(year) ? this.NOW.year() : year;
    const quarterTwo = reduceNumberISK(yearToCalculate - this.getD());
    return this.karmic.includes(quarterTwo) ? '*' : '';
  }

  getQuarterThree(year :number):number {
    const yearToCalculate = _.isNil(year) ? this.NOW.year() : year;
    return reduceNumber(this.getQuarterOne() + this.getQuarterTwo(yearToCalculate));
  }

  getQuarterThreeISK(year :number):string {
    const yearToCalculate = _.isNil(year) ? this.NOW.year() : year;
    const quarterThr = reduceNumberISK(this.getQuarterOne() + this.getQuarterTwo(yearToCalculate));
    return this.karmic.includes(quarterThr) ? '*' : '';
  }

  calcCurrentQuarter(month :moment.Moment, year:number):number {
    const monthToCalculate = _.isNil(month) ? this.NOW : month;
    const yearToCalculate = _.isNil(year) ? this.NOW.year() : year;
    const listOfMonths = this.getCustomMonths();
    const actualMonth = getMonthName(monthToCalculate.toString());
    const index = listOfMonths.findIndex((i) => i === capitalize(actualMonth));
    const indexEnero = listOfMonths.findIndex((i) => i === 'Enero');
    if (index < 5) { return this.getQuarterOne(); }
    if (index > 4 && index < 9) {
      if (index > indexEnero) {
        return this.getQuarterTwo(yearToCalculate - 1);
      }
      return this.getQuarterTwo(yearToCalculate);
    }
    if (index > 8) {
      if (index > indexEnero) {
        return this.getQuarterThree(yearToCalculate - 1);
      }
      return this.getQuarterThree(yearToCalculate);
    }
    return 0;
  }

  calcCurrentQuarterISK(month :moment.Moment, year:number):string {
    const monthToCalculate = _.isNil(month) ? this.NOW : month;
    const yearToCalculate = _.isNil(year) ? this.NOW.year() : year;
    const listOfMonths = this.getCustomMonths();
    const actualMonth = getMonthName(monthToCalculate.toString());
    const index = listOfMonths.findIndex((i) => i === capitalize(actualMonth));
    const indexEnero = listOfMonths.findIndex((i) => i === 'Enero');
    if (index < 5) { return this.getQuarterOneISK(); }
    if (index > 4 && index < 9) {
      if (index > indexEnero) {
        return this.getQuarterTwoISK(yearToCalculate - 1);
      }
      return this.getQuarterTwoISK(yearToCalculate);
    }
    if (index > 8) {
      if (index > indexEnero) {
        return this.getQuarterThreeISK(yearToCalculate - 1);
      }
      return this.getQuarterThreeISK(yearToCalculate);
    }
    return '';
  }

  annualReturn(year :number):AnnualReturn {
    const yearToCalculate = _.isNil(year) ? this.NOW.year() : year;
    const age = yearToCalculate - Number(this.yearMet);
    const A = reduceNumber(yearToCalculate);
    const B = reduceNumber(
      yearToCalculate
      + reduceNumber(this.consultant.birthDate.month() + this.partner.birthDate.month() + 2)
      + reduceNumber(this.consultant.birthDate.date() + this.partner.birthDate.date()),
    );
    const C = reduceNumber(
      (
        this.consultant.birthDate.year()
        + this.partner.birthDate.year()
      )
      - yearToCalculate,
    );
    const D = reduceNumber(A + B);
    const E = reduceNumber(B + C);
    const F = reduceNumber(D + E);
    const G = reduceNumber(D + E + F);
    const H = reduceNumber(A + C);

    return {
      yearToCalculate, age, A, B, C, D, E, F, G, H,
    };
  }

  getAbsences():string {
    const appearances:number[] = [
      this.getA(),
      this.getB(),
      this.getC(),
      this.getD(),
      this.getE(),
      this.getF(),
      this.getG(),
      this.getH(),
      this.getI(),
      this.getJ(),
      this.getK(),
      this.getL(),
      this.getM(),
      this.getN(),
      this.getO(),
      this.getP(),
      this.getQ(),
      this.getR(),
      this.getS(),
      Number(this.getW()),
    ];

    const occurrences = appearances.filter((a) => a > 0).reduce((count: { [key: number]: number }, value: number) => {
      const newCount = count;
      newCount[value] = (newCount[value] || 0) + 1;
      return newCount;
    }, {});

    const base = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const intersection = base.filter((x) => !Object.keys(occurrences).includes(x));
    return intersection.join(' ');
  }

  getNineYearCycle(year :number):number[] {
    const yearToCalculate = _.isNil(year) ? this.NOW.year() : year;
    const nineYearCycle = [
      yearToCalculate - 4,
      yearToCalculate - 3,
      yearToCalculate - 2,
      yearToCalculate - 1,
      yearToCalculate,
      yearToCalculate + 1,
      yearToCalculate + 2,
      yearToCalculate + 3,
      yearToCalculate + 4,
    ];
    return nineYearCycle;
  }

  getAllDaysInMonth(month: number, year: number): number[] {
    const monthToCalculate = _.isNil(month) ? Number(this.NOW.format('M')) : month;
    const yearToCalculate = _.isNil(year) ? Number(this.NOW.format('YYYY')) : year;
    return Array.from(Array(moment(`${yearToCalculate}-${monthToCalculate}`).daysInMonth()), (x, i) => i + 1);
  }

  getDaysOfWeekCustom(month: number, year: number): string[] {
    const monthToCalculate = _.isNil(month) ? Number(this.NOW.format('M')) : month;
    const yearToCalculate = _.isNil(year) ? Number(this.NOW.format('YYYY')) : year;
    const daysInMonth = this.getAllDaysInMonth(monthToCalculate, yearToCalculate);
    const daysCustom = [];
    const dayInWeek = getDaysOfWeek();
    let firstDay = this.NOW.year(yearToCalculate).month(monthToCalculate - 1).date(daysInMonth[0]).format('ddd');
    firstDay = firstDay.replace(/\./g, '');
    let dayIndex = getDaysOfWeek().findIndex((i) => i === capitalize(firstDay));
    for (let i = 0; i < 7; i++) {
      if (dayIndex > 6) {
        dayIndex = 0;
      }
      daysCustom.push(dayInWeek[dayIndex]);
      dayIndex++;
    }
    return daysCustom;
  }
}
export default Synastry;
