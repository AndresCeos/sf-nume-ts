import useConsult from '@/hooks/useConsult';
import Person from '@/resources/Person';
import { StyleSheet, Text, View } from '@react-pdf/renderer';

const quaterY = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '280px',
    left: '10px',
    right: '10px',
    fontSize: '7px',
    width: '523px',
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
    height: '224px',
    padding: '8px',
    position: 'relative',
  },
  item: {
    width: '50px',
    height: '13px',
    border: '1px',
    borderColor: '#BFBFBF',
    textAlign: 'center',
    paddingTop: '2px',
    zIndex: '2',
    fontFamily: 'Open Sans',
    color: '#7E7E7E',
  },
  backQ1: {
    position: 'absolute',
    width: '50px',
    height: '65px',
    border: '1px',
    borderColor: '#DADADA',
    backgroundColor: '#DADADA',
    textAlign: 'center',
    zIndex: '1',
    top: '35px',

  },
  backQ2: {
    position: 'absolute',
    width: '50px',
    height: '52px',
    border: '1px',
    borderColor: '#DADADA',
    backgroundColor: '#DADADA',
    textAlign: 'center',
    zIndex: '1',
    top: '100px',

  },
  backQ3: {
    position: 'absolute',
    width: '50px',
    height: '52px',
    border: '1px',
    borderColor: '#DADADA',
    backgroundColor: '#DADADA',
    textAlign: 'center',
    zIndex: '1',
    top: '150px',
  },
  pos1: {
    position: 'absolute',
    width: '50px',
    height: '13px',
    border: '1px',
    borderColor: '#DADADA',
    backgroundColor: '#DADADA',
    textAlign: 'center',
    zIndex: '1',
    top: '35px',
  },
  pos2: {
    position: 'absolute',
    width: '50px',
    height: '13px',
    border: '1px',
    borderColor: '#DADADA',
    backgroundColor: '#DADADA',
    textAlign: 'center',
    zIndex: '1',
    top: '48px',
  },
  pos3: {
    position: 'absolute',
    width: '50px',
    height: '13px',
    border: '1px',
    borderColor: '#DADADA',
    backgroundColor: '#DADADA',
    textAlign: 'center',
    zIndex: '1',
    top: '61px',
  },
  pos4: {
    position: 'absolute',
    width: '50px',
    height: '13px',
    border: '1px',
    borderColor: '#DADADA',
    backgroundColor: '#DADADA',
    textAlign: 'center',
    zIndex: '1',
    top: '74px',
  },
  pos5: {
    position: 'absolute',
    width: '50px',
    height: '13px',
    border: '1px',
    borderColor: '#DADADA',
    backgroundColor: '#DADADA',
    textAlign: 'center',
    zIndex: '1',
    top: '87px',
  },
  pos6: {
    position: 'absolute',
    width: '50px',
    height: '13px',
    border: '1px',
    borderColor: '#DADADA',
    backgroundColor: '#DADADA',
    textAlign: 'center',
    zIndex: '1',
    top: '100px',
  },
  pos7: {
    position: 'absolute',
    width: '50px',
    height: '13px',
    border: '1px',
    borderColor: '#DADADA',
    backgroundColor: '#DADADA',
    textAlign: 'center',
    zIndex: '1',
    top: '113px',
  },
  pos8: {
    position: 'absolute',
    width: '50px',
    height: '13px',
    border: '1px',
    borderColor: '#DADADA',
    backgroundColor: '#DADADA',
    textAlign: 'center',
    zIndex: '1',
    top: '126px',
  },
  pos9: {
    position: 'absolute',
    width: '50px',
    height: '13px',
    border: '1px',
    borderColor: '#DADADA',
    backgroundColor: '#DADADA',
    textAlign: 'center',
    zIndex: '1',
    top: '139px',
  },
  pos10: {
    position: 'absolute',
    width: '50px',
    height: '13px',
    border: '1px',
    borderColor: '#DADADA',
    backgroundColor: '#DADADA',
    textAlign: 'center',
    zIndex: '1',
    top: '152px',
  },
  pos11: {
    position: 'absolute',
    width: '50px',
    height: '13px',
    border: '1px',
    borderColor: '#DADADA',
    backgroundColor: '#DADADA',
    textAlign: 'center',
    zIndex: '1',
    top: '165px',
  },
  pos12: {
    position: 'absolute',
    width: '50px',
    height: '13px',
    border: '1px',
    borderColor: '#DADADA',
    backgroundColor: '#DADADA',
    textAlign: 'center',
    zIndex: '1',
    top: '178px',
  },
  pos13: {
    position: 'absolute',
    width: '50px',
    height: '13px',
    border: '1px',
    borderColor: '#DADADA',
    backgroundColor: '#DADADA',
    textAlign: 'center',
    zIndex: '1',
    top: '191px',
  },
  itemQ1: {
    width: '50px',
    height: '65px',
    border: '1px',
    borderColor: '#BFBFBF',
    textAlign: 'center',
    zIndex: '2',
    fontFamily: 'Open Sans',
    fontSize: '25px',
    color: '#7E7E7E',
    paddingTop: '8px',
  },
  itemQ23: {
    width: '50px',
    height: '52px',
    border: '1px',
    borderColor: '#BFBFBF',
    textAlign: 'center',
    zIndex: '2',
    fontFamily: 'Open Sans',
    fontSize: '25px',
    color: '#7E7E7E',
    paddingTop: '6px',
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  bg_main: {
    backgroundColor: '#320033',
    color: '#fff',
    fontWeight: 'bold',
  },
  bg_main_select: {
    backgroundColor: '#320033',
    color: '#E3AC5A',
    fontWeight: 'bold',
  },
  bg_sec: {
    backgroundColor: '#AD99AD',
  },
  font_1: {
    backgroundColor: '#D6D6D6',
    fontWeight: 'bold',
  },
  font_2: {
    backgroundColor: '#F0F0F0',
    fontWeight: 'bold',
  },
  lineEnero: {
    height: '2px',
    width: '500px',
    zIndex: '9',
    backgroundColor: '#EBD398',
    position: 'absolute',
    left: '8px',
  },
  datePos1Up: {
    position: 'absolute',
    top: '22px',
    fontFamily: 'Open Sans',
    textAlign: 'center',
    color: '#7E7E7E',
    width: '50px',
    height: '13px',
    paddingTop: '3px',
  },
  datePos1Down: {
    position: 'absolute',
    top: '74px',
    fontFamily: 'Open Sans',
    textAlign: 'center',
    color: '#7E7E7E',
    width: '50px',
    height: '13px',
    paddingTop: '3px',
  },
  datePos2Up: {
    position: 'absolute',
    top: '89px',
    fontFamily: 'Open Sans',
    textAlign: 'center',
    color: '#7E7E7E',
    width: '50px',
    height: '13px',
    paddingTop: '3px',
  },
  datePos2Down: {
    position: 'absolute',
    top: '126px',
    fontFamily: 'Open Sans',
    textAlign: 'center',
    color: '#7E7E7E',
    width: '50px',
    height: '13px',
    paddingTop: '3px',
  },
  datePos3Up: {
    position: 'absolute',
    top: '139px',
    fontFamily: 'Open Sans',
    textAlign: 'center',
    color: '#7E7E7E',
    width: '50px',
    height: '13px',
    paddingTop: '3px',
  },
  datePos3Down: {
    position: 'absolute',
    top: '178px',
    fontFamily: 'Open Sans',
    textAlign: 'center',
    color: '#7E7E7E',
    width: '50px',
    height: '13px',
    paddingTop: '3px',
  },
});
function FontSelect({ consultant }: { consultant: Person }) {
  const listOfMonths = consultant.getCustomMonths();
  const indexOfMonth = listOfMonths.findIndex((i: string) => i === 'Enero');
  if (indexOfMonth === 0) {
    return (
      <>
        <Text style={[quaterY.backQ1, { left: '258px' }]} />
        <Text style={[quaterY.backQ2, { left: '258px' }]} />
        <Text style={[quaterY.pos10, { left: '258px' }]} />
        <Text style={[quaterY.pos11, { left: '258px' }]} />
        <Text style={[quaterY.pos12, { left: '258px' }]} />
        {(consultant.getDayOfBirth() > 1)
          ? (
            <>
              <Text style={[quaterY.pos13, { left: '258px' }]} />
              <Text style={[quaterY.lineEnero, { top: '35px' }]} />
            </>
          )
          : (
            <>
              <Text style={[quaterY.pos13, { left: '208px' }]} />
              <Text style={[quaterY.lineEnero, { top: '191px' }]} />
            </>
          )}
      </>
    );
  }
  if (indexOfMonth === 1) {
    return (
      <View>
        <Text style={[quaterY.backQ2, { left: '208px' }]} />
        <Text style={[quaterY.backQ3, { left: '208px' }]} />
        <Text style={[quaterY.pos1, { left: '258px' }]} />
        <Text style={[quaterY.pos2, { left: '208px' }]} />
        <Text style={[quaterY.pos3, { left: '208px' }]} />
        <Text style={[quaterY.pos4, { left: '208px' }]} />
        <Text style={[quaterY.pos5, { left: '208px' }]} />
        <Text style={[quaterY.lineEnero, { top: '48px' }]} />
      </View>
    );
  }
  if (indexOfMonth === 2) {
    return (
      <View>
        <Text style={[quaterY.backQ2, { left: '208px' }]} />
        <Text style={[quaterY.backQ3, { left: '208px' }]} />
        <Text style={[quaterY.pos1, { left: '258px' }]} />
        <Text style={[quaterY.pos2, { left: '258px' }]} />
        <Text style={[quaterY.pos3, { left: '208px' }]} />
        <Text style={[quaterY.pos4, { left: '208px' }]} />
        <Text style={[quaterY.pos5, { left: '208px' }]} />
        <Text style={[quaterY.lineEnero, { top: '61px' }]} />
      </View>
    );
  }
  if (indexOfMonth === 3) {
    return (
      <View>
        <Text style={[quaterY.backQ2, { left: '208px' }]} />
        <Text style={[quaterY.backQ3, { left: '208px' }]} />
        <Text style={[quaterY.pos1, { left: '258px' }]} />
        <Text style={[quaterY.pos2, { left: '258px' }]} />
        <Text style={[quaterY.pos3, { left: '258px' }]} />
        <Text style={[quaterY.pos4, { left: '208px' }]} />
        <Text style={[quaterY.pos5, { left: '208px' }]} />
        <Text style={[quaterY.lineEnero, { top: '74px' }]} />
      </View>
    );
  }
  if (indexOfMonth === 4) {
    return (
      <View>
        <Text style={[quaterY.backQ2, { left: '208px' }]} />
        <Text style={[quaterY.backQ3, { left: '208px' }]} />
        <Text style={[quaterY.pos1, { left: '258px' }]} />
        <Text style={[quaterY.pos2, { left: '258px' }]} />
        <Text style={[quaterY.pos3, { left: '258px' }]} />
        <Text style={[quaterY.pos4, { left: '258px' }]} />
        <Text style={[quaterY.pos5, { left: '208px' }]} />
        <Text style={[quaterY.lineEnero, { top: '87px' }]} />
      </View>
    );
  }
  if (indexOfMonth === 5) {
    return (
      <View>
        <Text style={[quaterY.backQ1, { left: '258px' }]} />
        <Text style={[quaterY.backQ2, { left: '208px' }]} />
        <Text style={[quaterY.backQ3, { left: '208px' }]} />
        <Text style={[quaterY.lineEnero, { top: '100px' }]} />
      </View>
    );
  }
  if (indexOfMonth === 6) {
    return (
      <View>
        <Text style={[quaterY.backQ1, { left: '258px' }]} />
        <Text style={[quaterY.backQ3, { left: '208px' }]} />
        <Text style={[quaterY.pos6, { left: '258px' }]} />
        <Text style={[quaterY.pos7, { left: '208px' }]} />
        <Text style={[quaterY.pos8, { left: '208px' }]} />
        <Text style={[quaterY.pos9, { left: '208px' }]} />
        <Text style={[quaterY.lineEnero, { top: '113px' }]} />
      </View>
    );
  }
  if (indexOfMonth === 7) {
    return (
      <View>
        <Text style={[quaterY.backQ1, { left: '258px' }]} />
        <Text style={[quaterY.backQ3, { left: '208px' }]} />
        <Text style={[quaterY.pos6, { left: '258px' }]} />
        <Text style={[quaterY.pos7, { left: '258px' }]} />
        <Text style={[quaterY.pos8, { left: '208px' }]} />
        <Text style={[quaterY.pos9, { left: '208px' }]} />
        <Text style={[quaterY.lineEnero, { top: '126px' }]} />
      </View>
    );
  }
  if (indexOfMonth === 8) {
    return (
      <View>
        <Text style={[quaterY.backQ1, { left: '258px' }]} />
        <Text style={[quaterY.backQ3, { left: '208px' }]} />
        <Text style={[quaterY.pos6, { left: '258px' }]} />
        <Text style={[quaterY.pos7, { left: '258px' }]} />
        <Text style={[quaterY.pos8, { left: '258px' }]} />
        <Text style={[quaterY.pos9, { left: '208px' }]} />
        <Text style={[quaterY.lineEnero, { top: '139px' }]} />
      </View>
    );
  }
  if (indexOfMonth === 9) {
    return (
      <View>
        <Text style={[quaterY.backQ1, { left: '258px' }]} />
        <Text style={[quaterY.backQ2, { left: '258px' }]} />
        <Text style={[quaterY.backQ3, { left: '208px' }]} />
        <Text style={[quaterY.lineEnero, { top: '152px' }]} />
      </View>
    );
  }
  if (indexOfMonth === 10) {
    return (
      <View>
        <Text style={[quaterY.backQ1, { left: '258px' }]} />
        <Text style={[quaterY.backQ2, { left: '258px' }]} />
        <Text style={[quaterY.pos10, { left: '258px' }]} />
        <Text style={[quaterY.pos11, { left: '208px' }]} />
        <Text style={[quaterY.pos12, { left: '208px' }]} />
        <Text style={[quaterY.pos13, { left: '208px' }]} />
        <Text style={[quaterY.lineEnero, { top: '165px' }]} />
      </View>
    );
  }
  if (indexOfMonth === 11) {
    return (
      <View>
        <Text style={[quaterY.backQ1, { left: '258px' }]} />
        <Text style={[quaterY.backQ2, { left: '258px' }]} />
        <Text style={[quaterY.pos10, { left: '258px' }]} />
        <Text style={[quaterY.pos11, { left: '258px' }]} />
        <Text style={[quaterY.pos12, { left: '208px' }]} />
        <Text style={[quaterY.pos13, { left: '208px' }]} />
        <Text style={[quaterY.lineEnero, { top: '178px' }]} />
      </View>
    );
  }
  return <View />;
}

function Ciclo({ consultant, cycleNineY }: { consultant: Person, cycleNineY: number[] }) {
  const { calculationDate } = useConsult();
  const listOfMonths = consultant.getCustomMonths();
  const indexOfMonth = listOfMonths.findIndex((i: string) => i === 'Enero');

  return (
    <View style={quaterY.flex}>
      {cycleNineY.map((m) => (
        <View>
          {(m === calculationDate.year) ? <Text style={[quaterY.item, quaterY.bg_main_select]}>{m}</Text> : <Text style={[quaterY.item, quaterY.bg_main]}>{m}</Text>}
          {(m === calculationDate.year) ? (
            <Text style={[quaterY.item, quaterY.bg_sec, { color: '#000' }, { fontWeight: 'bold' }]}>
              {consultant.calcPersonalYear(m)}
              {consultant.calcPersonalYearISK(m)}
            </Text>
          ) : (
            <Text style={[quaterY.item, quaterY.bg_sec, { color: '#000' }]}>
              {consultant.calcPersonalYear(m)}
              {consultant.calcPersonalYearISK(m)}
            </Text>
          )}
          <Text style={quaterY.itemQ1}>
            {consultant.getQuarterOne()}
            {consultant.getQuarterOneISK()}
          </Text>
          <Text style={quaterY.itemQ23}>
            {consultant.getQuarterTwo(m)}
            {consultant.getQuarterTwoISK(m)}
          </Text>
          <Text style={quaterY.itemQ23}>
            {consultant.getQuarterThree(m)}
            {consultant.getQuarterThreeISK(m)}
          </Text>
          {indexOfMonth >= 0 && indexOfMonth < 5 ? <Text style={quaterY.datePos1Up}>{m}</Text> : ''}
          {indexOfMonth !== 0 && indexOfMonth < 5 ? <Text style={quaterY.datePos1Down}>{m + 1}</Text> : ''}
          {indexOfMonth > 4 && indexOfMonth < 9 ? <Text style={quaterY.datePos2Up}>{m}</Text> : ''}
          {indexOfMonth > 4 && indexOfMonth < 9 ? <Text style={quaterY.datePos2Down}>{m + 1}</Text> : ''}
          {indexOfMonth > 8 && indexOfMonth < 12 ? <Text style={quaterY.datePos3Up}>{m}</Text> : ''}
          {indexOfMonth > 8 && indexOfMonth < 12 ? <Text style={quaterY.datePos3Down}>{m + 1}</Text> : ''}
        </View>
      ))}
    </View>
  );
}

export default function VibrationTimeQuarterY({ consultant, newDate }: { consultant: Person, newDate: Date }) {
  console.log({ newDate });
  const { calculationDate } = useConsult();
  const cycleNineY = consultant.getNineYearCycle(calculationDate);
  const listOfMonths = consultant.getCustomMonths();
  const m1 = listOfMonths[0];
  const m2 = listOfMonths[1];
  const m3 = listOfMonths[2];
  const m4 = listOfMonths[3];
  const m5 = listOfMonths[4];
  const m6 = listOfMonths[5];
  const m7 = listOfMonths[6];
  const m8 = listOfMonths[7];
  const m9 = listOfMonths[8];
  const m10 = listOfMonths[9];
  const m11 = listOfMonths[10];
  const m12 = listOfMonths[11];
  const m13 = listOfMonths[12];

  return (
    <View style={quaterY.container}>
      <View style={quaterY.bar}>
        <Text>Cuatrimestres por Año</Text>
      </View>
      <View style={quaterY.wrap}>
        <FontSelect consultant={consultant} />
        <View style={quaterY.flex}>
          <View>
            <Text style={[quaterY.item, quaterY.bg_main]}>Año Calend</Text>
            <Text style={[quaterY.item, quaterY.bg_sec, { fontWeight: 'bold' }, { color: '#000' }]}>A. Personal</Text>
            <Text style={[quaterY.item, quaterY.font_1]}>{m1}</Text>
            <Text style={[quaterY.item, quaterY.font_2]}>{m2}</Text>
            <Text style={[quaterY.item, quaterY.font_1]}>{m3}</Text>
            <Text style={[quaterY.item, quaterY.font_2]}>{m4}</Text>
            <Text style={[quaterY.item, quaterY.font_1]}>{m5}</Text>
            <Text style={[quaterY.item, quaterY.font_2]}>{m6}</Text>
            <Text style={[quaterY.item, quaterY.font_1]}>{m7}</Text>
            <Text style={[quaterY.item, quaterY.font_2]}>{m8}</Text>
            <Text style={[quaterY.item, quaterY.font_1]}>{m9}</Text>
            <Text style={[quaterY.item, quaterY.font_2]}>{m10}</Text>
            <Text style={[quaterY.item, quaterY.font_1]}>{m11}</Text>
            <Text style={[quaterY.item, quaterY.font_2]}>{m12}</Text>
            <Text style={[quaterY.item, quaterY.font_1]}>{m13}</Text>
          </View>
          <Ciclo cycleNineY={cycleNineY} consultant={consultant} />
        </View>
      </View>
    </View>
  );
}
