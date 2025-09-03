import { StyleSheet, Text, View } from '@react-pdf/renderer';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { capitalize } from 'lodash';
import React from 'react';

export const GroupQuaterM: React.FC<{ groupConsult, newDate }> = ({ groupConsult, newDate }) => {
  const listOfMonths = groupConsult.getCustomMonths()
  const listOfMonthsE = groupConsult.getAllMonthsEnglish()
  const allMonths = groupConsult.getAllMonths()
  const quater1 = groupConsult.getQuaterOne()
  const quater2 = groupConsult.getQuaterTwo(newDate.year())
  const quater3 = groupConsult.getQuaterThree(newDate.year())
  const lastYear = newDate.year() - 1
  const quater1LastYear = groupConsult.getQuaterOne()
  const quater2LastYear = groupConsult.getQuaterTwo(lastYear)
  const quater3LastYear = groupConsult.getQuaterThree(lastYear)
  const quater1Karmico = groupConsult.getQuaterOneISK()
  const quater2Karmico = groupConsult.getQuaterTwoISK(newDate.year())
  const quater3Karmico = groupConsult.getQuaterThreeISK(newDate.year())
  const quater2KarmicoLast = groupConsult.getQuaterTwoISK(lastYear)
  const quater3KarmicoLast = groupConsult.getQuaterThreeISK(lastYear)
  const personalYearISK = groupConsult.calcPersonalYearISK(newDate.year())
  let m1; let m2; let m3; let m4; let cm1; let cm2; let cm3; let
cm4 = ''
  let ism1 = false
  let ism2 = false
  let ism3 = false
  let ism4 = false
  const personalYear = groupConsult.calcPersonalYear(newDate.year())

  const actualMonth = format(newDate, 'MMMM', { locale: es });
  console.log(actualMonth);
  const index = listOfMonths.findIndex(i => i === 'Enero')
  const currentMonth = listOfMonths.findIndex(i => i === capitalize(actualMonth))
  const indexE = listOfMonthsE.findIndex(i => i === capitalize(actualMonth))
  const currentMonthE = listOfMonths.findIndex(i => i === allMonths[indexE])

  switch (index) {
    case 0:
      m1 = `De ${listOfMonths[index]} a ${listOfMonths[4]}`
      m2 = `De ${listOfMonths[5]} a ${listOfMonths[8]}`
      m3 = `De ${listOfMonths[9]} a ${listOfMonths[11]}`
      cm1 = `${personalYear + personalYearISK}/${quater1}${quater1Karmico}`
      cm2 = `${personalYear + personalYearISK}/${quater2}${quater2Karmico}`
      cm3 = `${personalYear + personalYearISK}/${quater3}${quater3Karmico}`
      if (currentMonthE >= 0 && currentMonthE <= 4) { ism1 = true }
      if (currentMonthE >= 5 && currentMonthE <= 8) { ism2 = true }
      if (currentMonthE >= 9 && currentMonthE <= 11) { ism3 = true }
    break;
    case 1:
      m1 = `De ${listOfMonths[index]} a ${listOfMonths[4]}`
      m2 = `De ${listOfMonths[5]} a ${listOfMonths[8]}`
      m3 = `De ${listOfMonths[9]} a ${listOfMonths[11]}`
      m4 = `En ${listOfMonths[index - 1]}`
      cm1 = `${personalYear + personalYearISK}/${quater1LastYear}${quater1Karmico}`
      cm2 = `${personalYear + personalYearISK}/${quater2LastYear}${quater2KarmicoLast}`
      cm3 = `${personalYear + personalYearISK}/${quater3LastYear}${quater3KarmicoLast}`
      cm4 = `${personalYear + personalYearISK}/${quater1}${quater1Karmico}`
      if (currentMonthE >= 1 && currentMonthE <= 4) { ism1 = true }
      if (currentMonthE >= 5 && currentMonthE <= 8) { ism2 = true }
      if (currentMonthE >= 9 && currentMonthE <= 11) { ism3 = true }
      if (currentMonthE === 0) { ism4 = true }
    break;
    case 2:
    case 3:
      m1 = `De ${listOfMonths[index]} a ${listOfMonths[4]}`
      m2 = `De ${listOfMonths[5]} a ${listOfMonths[8]}`
      m3 = `De ${listOfMonths[9]} a ${listOfMonths[11]}`
      m4 = `De ${listOfMonths[0]} a ${listOfMonths[index - 1]}`
      cm1 = `${personalYear + personalYearISK}/${quater1LastYear}${quater1Karmico}`
      cm2 = `${personalYear + personalYearISK}/${quater2LastYear}${quater2KarmicoLast}`
      cm3 = `${personalYear + personalYearISK}/${quater3LastYear}${quater3KarmicoLast}`
      cm4 = `${personalYear + personalYearISK}/${quater1}${quater1Karmico}`
      if (currentMonthE >= 3 && currentMonthE <= 4) { ism1 = true }
      if (currentMonthE >= 5 && currentMonthE <= 8) { ism2 = true }
      if (currentMonthE >= 9 && currentMonthE <= 11) { ism3 = true }
      if (currentMonthE >= 0 && currentMonthE <= 2) { ism4 = true }
    break;
    case 4:
      m1 = `En ${listOfMonths[index]}`
      m2 = `De ${listOfMonths[5]} a ${listOfMonths[8]}`
      m3 = `De ${listOfMonths[9]} a ${listOfMonths[11]}`
      m4 = `De ${listOfMonths[0]} a ${listOfMonths[index - 1]}`
      cm1 = `${personalYear + personalYearISK}/${quater1LastYear}${quater1Karmico}`
      cm2 = `${personalYear + personalYearISK}/${quater2LastYear}${quater2KarmicoLast}`
      cm3 = `${personalYear + personalYearISK}/${quater3LastYear}${quater3KarmicoLast}`
      cm4 = `${personalYear + personalYearISK}/${quater1}${quater1Karmico}`
      if (currentMonthE === 4) { ism1 = true }
      if (currentMonthE >= 5 && currentMonthE <= 8) { ism2 = true }
      if (currentMonthE >= 9 && currentMonthE <= 11) { ism3 = true }
      if (currentMonthE >= 0 && currentMonthE <= 7) { ism4 = true }
    break;
    case 5:
      m1 = `De ${listOfMonths[index]} a ${listOfMonths[8]}`
      m2 = `De ${listOfMonths[9]} a ${listOfMonths[11]}`
      m3 = `De ${listOfMonths[12]} a ${listOfMonths[4]}`
      cm1 = `${personalYear + personalYearISK}/${quater2LastYear}${quater2KarmicoLast}`
      cm2 = `${personalYear + personalYearISK}/${quater3LastYear}${quater3KarmicoLast}`
      cm3 = `${personalYear + personalYearISK}/${quater1}${quater1Karmico}`
      if (currentMonthE >= 5 && currentMonthE <= 8) { ism1 = true }
      if (currentMonthE >= 9 && currentMonthE <= 11) { ism2 = true }
      if (currentMonthE >= 0 && currentMonthE <= 4) { ism3 = true }

    break;
    case 6:
      m1 = `De ${listOfMonths[index]} a ${listOfMonths[8]}`
      m2 = `De ${listOfMonths[9]} a ${listOfMonths[11]}`
      m3 = `De ${listOfMonths[12]} a ${listOfMonths[4]}`
      m4 = `En ${listOfMonths[index - 1]}`
      cm1 = `${personalYear + personalYearISK}/${quater2LastYear}${quater2KarmicoLast}`
      cm2 = `${personalYear + personalYearISK}/${quater3LastYear}${quater3KarmicoLast}`
      cm3 = `${personalYear + personalYearISK}/${quater1}${quater1Karmico}`
      cm4 = `${personalYear + personalYearISK}/${quater2}${quater2Karmico}`
      if (currentMonthE >= 6 && currentMonthE <= 8) { ism1 = true }
      if (currentMonthE >= 9 && currentMonthE <= 11) { ism2 = true }
      if (currentMonthE >= 0 && currentMonthE <= 4) { ism3 = true }
      if (currentMonthE === 5) { ism4 = true }
    break;
    case 7:
      m1 = `De ${listOfMonths[index]} a ${listOfMonths[8]}`
      m2 = `De ${listOfMonths[9]} a ${listOfMonths[11]}`
      m3 = `De ${listOfMonths[12]} a ${listOfMonths[4]}`
      m4 = `De ${listOfMonths[5]} a ${listOfMonths[index - 1]}`
      cm1 = `${personalYear + personalYearISK}/${quater2LastYear}${quater2KarmicoLast}`
      cm2 = `${personalYear + personalYearISK}/${quater3LastYear}${quater3KarmicoLast}`
      cm3 = `${personalYear + personalYearISK}/${quater1}${quater1Karmico}`
      cm4 = `${personalYear + personalYearISK}/${quater2}${quater2Karmico}`
      if (currentMonthE >= 7 && currentMonthE <= 8) { ism1 = true }
      if (currentMonthE >= 9 && currentMonthE <= 11) { ism2 = true }
      if (currentMonthE >= 0 && currentMonthE <= 4) { ism3 = true }
      if (currentMonthE >= 5 && currentMonthE <= index - 1) { ism4 = true }
    break;
    case 8:
      m1 = `En ${listOfMonths[index]}`
      m2 = `De ${listOfMonths[9]} a ${listOfMonths[11]}`
      m3 = `De ${listOfMonths[12]} a ${listOfMonths[4]}`
      m4 = `De ${listOfMonths[5]} a ${listOfMonths[index - 1]}`

      cm1 = `${personalYear + personalYearISK}/${quater2LastYear}${quater2KarmicoLast}`
      cm2 = `${personalYear + personalYearISK}/${quater3LastYear}${quater3KarmicoLast}`
      cm3 = `${personalYear + personalYearISK}/${quater1}${quater1Karmico}`
      cm4 = `${personalYear + personalYearISK}/${quater2}${quater2Karmico}`
      if (currentMonthE === 8) { ism1 = true }
      if (currentMonthE >= 9 && currentMonthE <= 11) { ism2 = true }
      if (currentMonthE >= 0 && currentMonthE <= 4) { ism3 = true }
      if (currentMonthE >= 5 && currentMonthE <= 7) { ism4 = true }
    break;
    case 9:
      m1 = `De ${listOfMonths[index]} a ${listOfMonths[11]}`
      m2 = `De ${listOfMonths[0]} a ${listOfMonths[4]}`
        m3 = `De ${listOfMonths[5]} a ${listOfMonths[8]}`
      cm1 = `${personalYear + personalYearISK}/${quater3LastYear}${quater3KarmicoLast}`
      cm2 = `${personalYear + personalYearISK}/${quater1}${quater1Karmico}`
      cm3 = `${personalYear + personalYearISK}/${quater2}${quater2Karmico}`
      if (currentMonthE >= index && currentMonthE <= 11) { ism1 = true }
      if (currentMonthE >= 0 && currentMonthE <= 4) { ism2 = true }
      if (currentMonthE >= 5 && currentMonthE <= 8) { ism3 = true }

    break;
    case 10:
      m1 = `De ${listOfMonths[index]} a ${listOfMonths[11]}`
      m2 = `De ${listOfMonths[0]} a ${listOfMonths[4]}`
        m3 = `De ${listOfMonths[5]} a ${listOfMonths[8]}`
      m4 = `En ${listOfMonths[index - 1]}`
      cm1 = `${personalYear + personalYearISK}/${quater3LastYear}${quater3KarmicoLast}`
      cm2 = `${personalYear + personalYearISK}/${quater1}${quater1Karmico}`
      cm3 = `${personalYear + personalYearISK}/${quater2}${quater2Karmico}`
      cm4 = `${personalYear + personalYearISK}/${quater3}${quater3Karmico}`
      if (currentMonthE >= index && currentMonthE <= 11) { ism1 = true }
      if (currentMonthE >= 0 && currentMonthE <= 4) { ism2 = true }
      if (currentMonthE >= 5 && currentMonthE <= 8) { ism3 = true }
      if (currentMonthE === index - 1) { ism4 = true }
    break;
    case 11:
      m1 = `En ${listOfMonths[index]}`
      m2 = `De ${listOfMonths[0]} a ${listOfMonths[4]}`
        m3 = `De ${listOfMonths[5]} a ${listOfMonths[8]}`
      m4 = `De ${listOfMonths[9]} a ${listOfMonths[index - 1]}`
      cm1 = `${personalYear + personalYearISK}/${quater3LastYear}${quater3KarmicoLast}`
      cm2 = `${personalYear + personalYearISK}/${quater1}${quater1Karmico}`
      cm3 = `${personalYear + personalYearISK}/${quater2}${quater2Karmico}`
      cm4 = `${personalYear + personalYearISK}/${quater3}${quater3Karmico}`
      if (currentMonthE === index) { ism1 = true }
      if (currentMonthE >= 0 && currentMonthE <= 4) { ism2 = true }
      if (currentMonthE >= 5 && currentMonthE <= 8) { ism3 = true }
      if (currentMonthE >= 9 && currentMonthE <= index - 1) { ism4 = true }
    break;
  }
return (
  <View style={quaterM.container}>
    <View style={quaterM.wrap}>
    <View style={quaterM.item_year}>
      <Text style={quaterM.title}>{newDate.year()}</Text>
    </View>
    {ism1
      ? (
<View style={quaterM.item_active}>
        <Text style={quaterM.title_item}>{m1}</Text>
        <Text style={quaterM.title_item}>{cm1}</Text>
</View>
)
      : (
<View style={quaterM.item}>
        <Text style={quaterM.title_item}>{m1}</Text>
        <Text style={quaterM.title_item}>{cm1}</Text>
</View>
)
    }
    {ism2
      ? (
<View style={quaterM.item_active}>
        <Text style={quaterM.title_item}>{m2}</Text>
        <Text style={quaterM.title_item}>{cm2}</Text>
</View>
)
    : (
<View style={quaterM.item}>
      <Text style={quaterM.title_item}>{m2}</Text>
      <Text style={quaterM.title_item}>{cm2}</Text>
</View>
)
    }
    {ism3
    ? (
<View style={quaterM.item_active}>
      <Text style={quaterM.title_item}>{m3}</Text>
      <Text style={quaterM.title_item}>{cm3}</Text>
</View>
)
    : (
<View style={quaterM.item}>
      <Text style={quaterM.title_item}>{m3}</Text>
      <Text style={quaterM.title_item}>{cm3}</Text>
</View>
)
    }
    {ism4
    ? (
<View style={quaterM.item_active}>
      {(cm4 !== '') ? <Text style={quaterM.title_item}>{m4}</Text> : ''}
      {(cm4 !== '') ? <Text style={quaterM.title_item}>{cm4}</Text> : ''}
</View>
)
    : (
<View style={quaterM.item}>
      {(cm4 !== '') ? <Text style={quaterM.title_item}>{m4}</Text> : ''}
      {(cm4 !== '') ? <Text style={quaterM.title_item}>{cm4}</Text> : ''}
</View>
)
    }

    </View>
  </View>
)
}

const quaterM = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '260px',
    right: '15px',
    fontSize: '7px',
    width: '156px'
  },
  bar: {
    backgroundColor: '#000',
    fontWeight: 'bold',
    color: '#fff',
    padding: '3px',
    borderTopLeftRadius: '5px',
    borderTopRightRadius: '5px',
    fontSize: '8px',
  },
  wrap: {
    display: 'flex',
    flexDirection: 'column',
    height: '229px',
  },
  item_year: {
    height: '30px',


    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontFamily: 'Open Sans',
    fontSize: '10px',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  title_item: {
    fontFamily: 'Open Sans',
    fontSize: '10px',
    textAlign: 'center',
    height: '24px',
    width: '155px',
    paddingTop: '3px'
  },
  item: {
    width: '155px',
    height: '47px',
    justifyContent: 'center',
    alignItems: 'center'
  },
  item_active: {
    width: '155px',
    height: '47px',
    backgroundColor: '#D9D9D9',
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center'
  }

})