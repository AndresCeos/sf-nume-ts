import useConsult from '@/hooks/useConsult';
import Person from '@/resources/Person';
import { getAllMonths } from '@/utils/numbers';
import { StyleSheet, Text, View } from '@react-pdf/renderer';
import { capitalize } from 'lodash';

const quaterM = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    fontSize: '7px',
    width: '156px',
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
    border: '1px solid gray',
    borderBottomRightRadius: '5px',
    borderBottomLeftRadius: '5px',
    borderTopWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    height: '229px',
  },
  item_year: {
    height: '30px',
    backgroundColor: '#D9D9D9',
    borderBottom: '1px',
    borderBottomColor: '#C4C4C4',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Open Sans',
    fontSize: '10px',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  title_item: {
    fontFamily: 'Open Sans',
    fontSize: '10px',
    textAlign: 'center',
    height: '24px',
    borderTop: '1px',
    borderTopColor: '#C4C4C4',
    width: '155px',
    paddingTop: '3px',
  },
  item: {
    width: '155px',
    height: '47px',
    justifyContent: 'center',
    alignItems: 'center',
  },
  item_active: {
    width: '155px',
    height: '47px',
    backgroundColor: '#D9D9D9',
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
  },

});

export default function VibrationTimeQuarterM({ consultant, newDate }: { consultant: Person, newDate: Date }) {
  console.log({ newDate });
  const { calculationDate } = useConsult();
  const listOfMonths = consultant.getCustomMonths();
  const allMonths = getAllMonths();
  const quater1 = consultant.getQuarterOne();
  const quater2 = consultant.getQuarterTwo(calculationDate.year);
  const quater3 = consultant.getQuarterThree(calculationDate.year);
  const lastYear = calculationDate.year - 1;
  const quater1LastYear = consultant.getQuarterOne();
  const quater2LastYear = consultant.getQuarterTwo(lastYear);
  const quater3LastYear = consultant.getQuarterThree(lastYear);
  const quater1Karmico = consultant.getQuarterOneISK();
  const quater2Karmico = consultant.getQuarterTwoISK(calculationDate.year);
  const quater3Karmico = consultant.getQuarterThreeISK(calculationDate.year);
  const quater2KarmicoLast = consultant.getQuarterTwoISK(lastYear);
  const quater3KarmicoLast = consultant.getQuarterThreeISK(lastYear);
  const personalYearISK = consultant.calcPersonalYearISK(calculationDate.year);
  let m1; let m2; let m3; let m4; let cm1; let cm2; let cm3; let
    cm4 = '';
  let ism1; let ism2; let ism3; let
    ism4 = false;
  const personalYear = consultant.calcPersonalYear(calculationDate.year);

  const actualMonth = allMonths[calculationDate.month - 1];
  const index = listOfMonths.findIndex((i) => i === 'Enero');
  const currentMonth = listOfMonths.findIndex((i) => i === capitalize(actualMonth));
  switch (index) {
    case 0:
      m1 = `De ${listOfMonths[index]} a ${listOfMonths[4]}`;
      m2 = `De ${listOfMonths[5]} a ${listOfMonths[8]}`;
      m3 = `De ${listOfMonths[9]} a ${listOfMonths[11]}`;
      cm1 = `${personalYear + personalYearISK}/${quater1}${quater1Karmico}`;
      cm2 = `${personalYear + personalYearISK}/${quater2}${quater2Karmico}`;
      cm3 = `${personalYear + personalYearISK}/${quater3}${quater3Karmico}`;
      if (currentMonth >= 0 && currentMonth <= 4) { ism1 = true; }
      if (currentMonth >= 5 && currentMonth <= 8) { ism2 = true; }
      if (currentMonth >= 9 && currentMonth <= 11) { ism3 = true; }
      break;
    case 1:
      m1 = `De ${listOfMonths[index]} a ${listOfMonths[4]}`;
      m2 = `De ${listOfMonths[5]} a ${listOfMonths[8]}`;
      m3 = `De ${listOfMonths[9]} a ${listOfMonths[11]}`;
      m4 = `En ${listOfMonths[index - 1]}`;
      cm1 = `${personalYear + personalYearISK}/${quater1LastYear}${quater1Karmico}`;
      cm2 = `${personalYear + personalYearISK}/${quater2LastYear}${quater2KarmicoLast}`;
      cm3 = `${personalYear + personalYearISK}/${quater3LastYear}${quater3KarmicoLast}`;
      cm4 = `${personalYear + personalYearISK}/${quater1}${quater1Karmico}`;
      if (currentMonth >= 1 && currentMonth <= 4) { ism1 = true; }
      if (currentMonth >= 5 && currentMonth <= 8) { ism2 = true; }
      if (currentMonth >= 9 && currentMonth <= 11) { ism3 = true; }
      if (currentMonth === 0) { ism4 = true; }
      break;
    case 2:
    case 3:
      m1 = `De ${listOfMonths[index]} a ${listOfMonths[4]}`;
      m2 = `De ${listOfMonths[5]} a ${listOfMonths[8]}`;
      m3 = `De ${listOfMonths[9]} a ${listOfMonths[11]}`;
      m4 = `De ${listOfMonths[0]} a ${listOfMonths[index - 1]}`;
      cm1 = `${personalYear + personalYearISK}/${quater1LastYear}${quater1Karmico}`;
      cm2 = `${personalYear + personalYearISK}/${quater2LastYear}${quater2KarmicoLast}`;
      cm3 = `${personalYear + personalYearISK}/${quater3LastYear}${quater3KarmicoLast}`;
      cm4 = `${personalYear + personalYearISK}/${quater1}${quater1Karmico}`;
      if (currentMonth >= 3 && currentMonth <= 4) { ism1 = true; }
      if (currentMonth >= 5 && currentMonth <= 8) { ism2 = true; }
      if (currentMonth >= 9 && currentMonth <= 11) { ism3 = true; }
      if (currentMonth >= 0 && currentMonth <= 2) { ism4 = true; }
      break;
    case 4:
      m1 = `En ${listOfMonths[index]}`;
      m2 = `De ${listOfMonths[5]} a ${listOfMonths[8]}`;
      m3 = `De ${listOfMonths[9]} a ${listOfMonths[11]}`;
      m4 = `De ${listOfMonths[0]} a ${listOfMonths[index - 1]}`;
      cm1 = `${personalYear + personalYearISK}/${quater1LastYear}${quater1Karmico}`;
      cm2 = `${personalYear + personalYearISK}/${quater2LastYear}${quater2KarmicoLast}`;
      cm3 = `${personalYear + personalYearISK}/${quater3LastYear}${quater3KarmicoLast}`;
      cm4 = `${personalYear + personalYearISK}/${quater1}${quater1Karmico}`;
      if (currentMonth === 4) { ism1 = true; }
      if (currentMonth >= 5 && currentMonth <= 8) { ism2 = true; }
      if (currentMonth >= 9 && currentMonth <= 11) { ism3 = true; }
      if (currentMonth >= 0 && currentMonth <= 7) { ism4 = true; }
      break;
    case 5:
      m1 = `De ${listOfMonths[index]} a ${listOfMonths[8]}`;
      m2 = `De ${listOfMonths[9]} a ${listOfMonths[11]}`;
      m3 = `De ${listOfMonths[12]} a ${listOfMonths[4]}`;
      cm1 = `${personalYear + personalYearISK}/${quater2LastYear}${quater2KarmicoLast}`;
      cm2 = `${personalYear + personalYearISK}/${quater3LastYear}${quater3KarmicoLast}`;
      cm3 = `${personalYear + personalYearISK}/${quater1}${quater1Karmico}`;
      if (currentMonth >= 5 && currentMonth <= 8) { ism1 = true; }
      if (currentMonth >= 9 && currentMonth <= 11) { ism2 = true; }
      if (currentMonth >= 0 && currentMonth <= 4) { ism3 = true; }

      break;
    case 6:
      m1 = `De ${listOfMonths[index]} a ${listOfMonths[8]}`;
      m2 = `De ${listOfMonths[9]} a ${listOfMonths[11]}`;
      m3 = `De ${listOfMonths[12]} a ${listOfMonths[4]}`;
      m4 = `En ${listOfMonths[index - 1]}`;
      cm1 = `${personalYear + personalYearISK}/${quater2LastYear}${quater2KarmicoLast}`;
      cm2 = `${personalYear + personalYearISK}/${quater3LastYear}${quater3KarmicoLast}`;
      cm3 = `${personalYear + personalYearISK}/${quater1}${quater1Karmico}`;
      cm4 = `${personalYear + personalYearISK}/${quater2}${quater2Karmico}`;
      if (currentMonth >= 6 && currentMonth <= 8) { ism1 = true; }
      if (currentMonth >= 9 && currentMonth <= 11) { ism2 = true; }
      if (currentMonth >= 0 && currentMonth <= 4) { ism3 = true; }
      if (currentMonth === 5) { ism4 = true; }
      break;
    case 7:
      m1 = `De ${listOfMonths[index]} a ${listOfMonths[8]}`;
      m2 = `De ${listOfMonths[9]} a ${listOfMonths[11]}`;
      m3 = `De ${listOfMonths[12]} a ${listOfMonths[4]}`;
      m4 = `De ${listOfMonths[5]} a ${listOfMonths[index - 1]}`;
      cm1 = `${personalYear + personalYearISK}/${quater2LastYear}${quater2KarmicoLast}`;
      cm2 = `${personalYear + personalYearISK}/${quater3LastYear}${quater3KarmicoLast}`;
      cm3 = `${personalYear + personalYearISK}/${quater1}${quater1Karmico}`;
      cm4 = `${personalYear + personalYearISK}/${quater2}${quater2Karmico}`;
      if (currentMonth >= 7 && currentMonth <= 8) { ism1 = true; }
      if (currentMonth >= 9 && currentMonth <= 11) { ism2 = true; }
      if (currentMonth >= 0 && currentMonth <= 4) { ism3 = true; }
      if (currentMonth >= 5 && currentMonth <= index - 1) { ism4 = true; }
      break;
    case 8:
      m1 = `En ${listOfMonths[index]}`;
      m2 = `De ${listOfMonths[9]} a ${listOfMonths[11]}`;
      m3 = `De ${listOfMonths[12]} a ${listOfMonths[4]}`;
      m4 = `De ${listOfMonths[5]} a ${listOfMonths[index - 1]}`;

      cm1 = `${personalYear + personalYearISK}/${quater2LastYear}${quater2KarmicoLast}`;
      cm2 = `${personalYear + personalYearISK}/${quater3LastYear}${quater3KarmicoLast}`;
      cm3 = `${personalYear + personalYearISK}/${quater1}${quater1Karmico}`;
      cm4 = `${personalYear + personalYearISK}/${quater2}${quater2Karmico}`;
      if (currentMonth === 8) { ism1 = true; }
      if (currentMonth >= 9 && currentMonth <= 11) { ism2 = true; }
      if (currentMonth >= 0 && currentMonth <= 4) { ism3 = true; }
      if (currentMonth >= 5 && currentMonth <= 7) { ism4 = true; }
      break;
    case 9:
      m1 = `De ${listOfMonths[index]} a ${listOfMonths[11]}`;
      m2 = `De ${listOfMonths[0]} a ${listOfMonths[4]}`;
      m3 = `De ${listOfMonths[5]} a ${listOfMonths[8]}`;
      cm1 = `${personalYear + personalYearISK}/${quater3LastYear}${quater3KarmicoLast}`;
      cm2 = `${personalYear + personalYearISK}/${quater1}${quater1Karmico}`;
      cm3 = `${personalYear + personalYearISK}/${quater2}${quater2Karmico}`;
      if (currentMonth >= index && currentMonth <= 11) { ism1 = true; }
      if (currentMonth >= 0 && currentMonth <= 4) { ism2 = true; }
      if (currentMonth >= 5 && currentMonth <= 8) { ism3 = true; }

      break;
    case 10:
      m1 = `De ${listOfMonths[index]} a ${listOfMonths[11]}`;
      m2 = `De ${listOfMonths[0]} a ${listOfMonths[4]}`;
      m3 = `De ${listOfMonths[5]} a ${listOfMonths[8]}`;
      m4 = `En ${listOfMonths[index - 1]}`;
      cm1 = `${personalYear + personalYearISK}/${quater3LastYear}${quater3KarmicoLast}`;
      cm2 = `${personalYear + personalYearISK}/${quater1}${quater1Karmico}`;
      cm3 = `${personalYear + personalYearISK}/${quater2}${quater2Karmico}`;
      cm4 = `${personalYear + personalYearISK}/${quater3}${quater3Karmico}`;
      if (currentMonth >= index && currentMonth <= 11) { ism1 = true; }
      if (currentMonth >= 0 && currentMonth <= 4) { ism2 = true; }
      if (currentMonth >= 5 && currentMonth <= 8) { ism3 = true; }
      if (currentMonth === index - 1) { ism4 = true; }
      break;
    case 11:
      m1 = `En ${listOfMonths[index]}`;
      m2 = `De ${listOfMonths[0]} a ${listOfMonths[4]}`;
      m3 = `De ${listOfMonths[5]} a ${listOfMonths[8]}`;
      m4 = `De ${listOfMonths[9]} a ${listOfMonths[index - 1]}`;
      cm1 = `${personalYear + personalYearISK}/${quater3LastYear}${quater3KarmicoLast}`;
      cm2 = `${personalYear + personalYearISK}/${quater1}${quater1Karmico}`;
      cm3 = `${personalYear + personalYearISK}/${quater2}${quater2Karmico}`;
      cm4 = `${personalYear + personalYearISK}/${quater3}${quater3Karmico}`;
      if (currentMonth === index) { ism1 = true; }
      if (currentMonth >= 0 && currentMonth <= 4) { ism2 = true; }
      if (currentMonth >= 5 && currentMonth <= 8) { ism3 = true; }
      if (currentMonth >= 9 && currentMonth <= index - 1) { ism4 = true; }
      break;
    default:
  }
  return (
    <View style={quaterM.container}>
      <View style={quaterM.bar}>
        <Text>Cuatrimeses por Meses</Text>
      </View>
      <View style={quaterM.wrap}>
        <View style={quaterM.item_year}>
          <Text style={quaterM.title}>{calculationDate.year}</Text>
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
          )}
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
          )}
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
          )}
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
          )}

      </View>
    </View>
  );
}
