import React from 'react';
import { StyleSheet, View } from '@react-pdf/renderer';
import { AnnualReturn } from './AnnualReturn';

export const AnnualReturns: React.FC<{ consultant, newDate }> = ({ consultant, newDate }) => {
 // const newDate = moment()

  const annualReturnCurrent = consultant.annualReturn(newDate.year())
  const annualReturnLastYear = consultant.annualReturn(newDate.year() - 1)
  const annualReturnNextYear = consultant.annualReturn(newDate.year() + 1)

  const now = newDate.year()
  const annualReturn = consultant.annualReturn(now)
  const personalYear = consultant.calcPersonalYear(now)
  const yearsOld = consultant.getYearsOld(now)

  const y1 = newDate.year() - 4
  const annualReturnY1 = consultant.annualReturn(y1)
  const personalYearY1 = consultant.calcPersonalYear(y1)
  const yearsOldY1 = consultant.getYearsOld(y1)

  const y2 = newDate.year() - 3
  const annualReturnY2 = consultant.annualReturn(y2)
  const personalYearY2 = consultant.calcPersonalYear(y2)
  const yearsOldY2 = consultant.getYearsOld(y2)

  const y3 = newDate.year() - 2
  const annualReturnY3 = consultant.annualReturn(y3)
  const personalYearY3 = consultant.calcPersonalYear(y3)
  const yearsOldY3 = consultant.getYearsOld(y3)

  const y4 = newDate.year() - 1
  const annualReturnY4 = consultant.annualReturn(y4)
  const personalYearY4 = consultant.calcPersonalYear(y4)
  const yearsOldY4 = consultant.getYearsOld(y4)

  const y6 = newDate.year() + 1
  const annualReturnY6 = consultant.annualReturn(y6)
  const personalYearY6 = consultant.calcPersonalYear(y6)
  const yearsOldY6 = consultant.getYearsOld(y6)

  const y7 = newDate.year() + 2
  const annualReturnY7 = consultant.annualReturn(y7)
  const personalYearY7 = consultant.calcPersonalYear(y7)
  const yearsOldY7 = consultant.getYearsOld(y7)

  const y8 = newDate.year() + 3
  const annualReturnY8 = consultant.annualReturn(y8)
  const personalYearY8 = consultant.calcPersonalYear(y8)
  const yearsOldY8 = consultant.getYearsOld(y8)

  const y9 = newDate.year() + 4
  const annualReturnY9 = consultant.annualReturn(y9)
  const personalYearY9 = consultant.calcPersonalYear(y9)
  const yearsOldY9 = consultant.getYearsOld(y9)

  return (
    <View style={annualReturn.container}>
      <View style={annualReturn.wrap}>
        <View style={[annualReturn.return, annualReturn.return_1]}>
          <AnnualReturn
            annualReturn={annualReturnY1}
            personalYear={personalYearY1}
            yearsOld={yearsOldY1}
            year={y1}
            top={0}
            left={0}
          />
        </View>
        <View style={[annualReturn.return, annualReturn.return_2]}>
          <AnnualReturn
            annualReturn={annualReturnY2}
            personalYear={personalYearY2}
            yearsOld={yearsOldY2}
            year={y2}
            top={0}
            left={176}
          />
        </View>
        <View style={[annualReturn.return, annualReturn.return_3]}>
          <AnnualReturn
            annualReturn={annualReturnY3}
            personalYear={personalYearY3}
            yearsOld={yearsOldY3}
            year={y3}
            top={0}
            left={352}
          />
        </View>
        <View style={[annualReturn.return, annualReturn.return_4]}>
          <AnnualReturn
            annualReturn={annualReturnY4}
            personalYear={personalYearY4}
            yearsOld={yearsOldY4}
            year={y4}
            top={136}
            left={0}
          />
        </View>
        <View style={[annualReturn.return, annualReturn.return_5]}>
          <AnnualReturn
            annualReturn={annualReturn}
            personalYear={personalYear}
            yearsOld={yearsOld}
            year={now}
            top={136}
            left={176}
          />
        </View>
        <View style={[annualReturn.return, annualReturn.return_6]}>
          <AnnualReturn
            annualReturn={annualReturnY6}
            personalYear={personalYearY6}
            yearsOld={yearsOldY6}
            year={y6}
            top={136}
            left={352}
          />
        </View>
        <View style={[annualReturn.return, annualReturn.return_7]}>
          <AnnualReturn
            annualReturn={annualReturnY7}
            personalYear={personalYearY7}
            yearsOld={yearsOldY7}
            year={y7}
            top={272}
            left={0}
          />
        </View>
        <View style={[annualReturn.return, annualReturn.return_8]}>
          <AnnualReturn
            annualReturn={annualReturnY8}
            personalYear={personalYearY8}
            yearsOld={yearsOldY8}
            year={y8}
            top={272}
left={176}
          />
        </View>
        <View style={[annualReturn.return, annualReturn.return_9]}>
          <AnnualReturn
            annualReturn={annualReturnY9}
            personalYear={personalYearY9}
            yearsOld={yearsOldY9}
            year={y9}
            top={272}
left={352}
          />
        </View>
      </View>
    </View>
  )
}

export const annualReturn = StyleSheet.create({
  container: {
    backgroundColor: '#ff0000',
    position: 'absolute',
    top: '30x',
    left: '13px',
    fontSize: '10px',

  },
  wrap: {
    position: 'relative'
  },
  return: {
    position: 'absolute',
    width: '176px',
    height: '136px',
    backgroundColor: '#ff000012',
  },
  return_1: {
    top: '0px',
    left: '0px',
  },
  return_2: {
    top: '0px',
    left: '176px',
  },
  return_3: {
    top: '0px',
    left: '352px',
  },
  return_4: {
    top: '136px',
    left: '0px',
  },
  return_5: {
    top: '136px',
    left: '176px',
  },
  return_6: {
    top: '136px',
    left: '352px',
  },
  return_7: {
    top: '272px',
    left: '0px',
  },
  return_8: {
    top: '272px',
    left: '176px',
  },
  return_9: {
    top: '272px',
    left: '352px',
  },
})