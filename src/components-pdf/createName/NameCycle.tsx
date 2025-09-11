import React from 'react';
import { StyleSheet, Text, View } from '@react-pdf/renderer';

export const NameCycle: React.FC<{ consultant, date }> = ({ consultant, date }) => {
  const table = consultant.getNameSetting();
  const table1 = table.slice(0, 31);
  const table2 = table.slice(31, 62);
  const table3 = table.slice(62, 93);
  const table4 = table.slice(93, 124);

  const nameCycles = consultant.calcNameCycles();

  return (
    <View>
      <ActiveName table={table1} start={0} consultant={consultant} nameCycles={nameCycles} date={date} position={0} />
      <ActiveName table={table2} start={31} consultant={consultant} nameCycles={nameCycles} date={date} position={1} />
      <ActiveName table={table3} start={62} consultant={consultant} nameCycles={nameCycles} date={date} position={2} />
      <ActiveName table={table4} start={93} consultant={consultant} nameCycles={nameCycles} date={date} position={3} />
    </View>
  );
};

export const ActiveName: React.FC<{ table, start, consultant, nameCycles, date, position }> = ({
  table, start, consultant, nameCycles, date, position,
}) => {
  const consultantAge = consultant.getYearsOld(date.year());
  const isCycle = (i) => (i === consultantAge ? false : nameCycles.includes(i));
  const bkConfig = (i, bg) => {
    if (i === consultantAge) {
      return '#e3ac5a';
    }
    if (isCycle(i)) {
      return '#F4DDBA';
    }
    return bg;
  };
  return (
    <View style={pinnacleName.container}>
      <View style={pinnacleName.wrap}>
        <View style={[pinnacleName.table, { top: 355, left: -230 + (position * 88) }]}>
          <View style={{
            width: 40, height: 20, backgroundColor: '#3200334d', display: 'flex', justifyContent: 'center',
          }}
          >
            <Text style={{ fontSize: 8, marginLeft: 5, fontWeight: 'bold' }}>Añooo</Text>
          </View>
          <View style={{
            width: 40, height: 20, backgroundColor: '#3200332d', display: 'flex', justifyContent: 'center',
          }}
          >
            <Text style={{ fontSize: 8, marginLeft: 5, fontWeight: 'bold' }}>Edad </Text>
          </View>
          <View style={{
            width: 40, height: 36, backgroundColor: '#0000002d', display: 'flex', justifyContent: 'center',
          }}
          >
            <Text style={{ fontSize: 8, marginLeft: 5, fontWeight: 'bold' }}>Ciclo del </Text>
            <Text style={{ fontSize: 8, marginLeft: 5, fontWeight: 'bold' }}>Nombre </Text>
          </View>
          {table.map((el, i) => (
            <View key={i} style={{ position: 'absolute', left: 40 + (i * 20), top: 0 }}>
              <View style={{
                width: 20, height: 20, backgroundColor: `${bkConfig(i + start, '#3200334d')}`, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
              >
                <Text style={{ fontSize: 7 }}>{consultant.getYearOfBirth() + i + start}</Text>
              </View>
              <View style={{
                width: 20, height: 20, backgroundColor: `${bkConfig(i + start, '#3200332d')}`, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
              >
                <Text style={{ fontSize: 11 }}>{i + start}</Text>
              </View>
              <View style={{
                width: 20, height: 36, backgroundColor: `${bkConfig(i + start, '#0000002d')}`, display: 'flex', justifyContent: 'center',
              }}
              >
                <View style={{
                  height: 19, display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
                >
                  <Text style={{ fontSize: 11, textAlign: 'center', fontWeight: 'bold' }}>
                    {el.pmC}
                  </Text>
                </View>
                <View style={{
                  height: 17, display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
                >
                  <Text style={{ fontSize: 7, textAlign: 'center' }}>
                    {el.pmN}
                    /
                    {el.pmD}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
      {/* <Text style={{ backgroundColor: 'red' }}>-</Text> */}
    </View>
  );
};

export const pinnacleName = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '20px',
    left: '35px',
    fontSize: '7px',
    width: '536px',
    // backgroundColor: 'red'
  },
  wrap: {
    position: 'relative',
  },
  table: {
    position: 'relative',
    transform: 'rotate(-90deg)',
  },
});
