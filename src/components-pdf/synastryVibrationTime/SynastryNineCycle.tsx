import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

export const SynastryNineCycle: React.FC<{ synastry, newDate }> = ({ synastry, newDate }) => {
  const currentYear = newDate.year();
  const niceCycle = synastry.getNineYearCycleStage(currentYear);
  function Cycle() {
    return (
      <>
        {niceCycle.map((year, index) => (
          <View>
            <View style={[cycle.circle, { top: 51, left: 14 + (14 * index), backgroundColor: `${(year === currentYear) ? '#D6C5E9' : ''}` }]}><Text style={[cycle.number]}>{synastry.calcPersonalYear(year)}</Text></View>
            <Text style={[cycle.text, { top: 80, left: 14 + (14 * index), color: `${(year === currentYear) ? '#000' : '#7E7E7E'}` }]}>{year}</Text>
          </View>
        ))}
      </>
    );
  }

  return (
    <View style={cycle.container}>
      <View style={[cycle.cyleMap, { width: '80px' }]}>
        <Text style={[cycle.text, { top: 25, left: 130, width: '50px' }]}>
          Etapa:
          {synastry.getLifeStageNumber(currentYear)}
          :
          {' '}
        </Text>
        <Text style={[cycle.number, { top: 23, left: 175, width: '30px' }]}>
          {synastry.getLifeStage(currentYear)}
          {synastry.getLifeStageISK(currentYear)}
        </Text>
      </View>
      <View style={cycle.cyleMap}>
        <Cycle />
      </View>
    </View>
  );
};
export const cycle = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '270px',
    left: '15px',
    width: '356px',
  },
  cyleMap: {
    display: 'flex',
    flexDirection: 'row',
  },
  text: {
    fontSize: '8px',
    position: 'absolute',
  },
  number: {
    fontSize: '12px',
    position: 'absolute',
  },
  circle: {
    width: '20px',
    height: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '25px',
  },
});
