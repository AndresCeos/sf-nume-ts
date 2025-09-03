import React from 'react';

import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { AnnualReturn } from './AnnualReturn';

export const GroupRetornos2: React.FC<{ groupConsult, newDate }> = ({ groupConsult, newDate }) => {
  const cap = groupConsult.group
  let p3;
  let p4;
  let p5;
  let annualReturnLastYear;
  let annualReturnNextYear;
  let annualReturnCurrent;
  if (cap[2] !== undefined) {
    p3 = cap[2]
    annualReturnCurrent = p3.annualReturn(newDate.year())
  }
  if (cap[3] !== undefined) {
    p4 = cap[3]
    annualReturnLastYear = p4.annualReturn(newDate.year())
  }
  if (cap[4] !== undefined) {
    p5 = cap[4]
    annualReturnNextYear = p5.annualReturn(newDate.year())
  }
  return (
    <View style={annualReturn.container}>
      <View style={annualReturn.wrap}>
        {(cap[3]) ? (
<View style={annualReturn.return_2}>
        <View style={annualReturn.name}><Text>{p4.nameView}</Text></View>
          <AnnualReturn annualReturn={annualReturnLastYear} />
</View>
) : null}
        {(cap[2] !== undefined) ? (
<View style={annualReturn.return_1}>
        <View style={annualReturn.name}><Text>{p3.nameView}</Text></View>
          <AnnualReturn annualReturn={annualReturnCurrent} />
</View>
) : null}
        {(cap[4]) ? (
<View style={annualReturn.return_3}>
        <View style={annualReturn.name}><Text>{p5.nameView}</Text></View>
          <AnnualReturn annualReturn={annualReturnNextYear} />
</View>
) : null}
      </View>
    </View>
  )
}
export const annualReturn = StyleSheet.create({
  container: {
    // backgroundColor: '#ff0000',
    position: 'absolute',
    top: '553px',
    width: '119px',
    left: '12px',
    fontSize: '10px',

  },
  wrap: {
    position: 'relative'
  },
  return_1: {
    position: 'absolute',
    top: '0px',
    height: '134px',
    width: '174px',
    // backgroundColor: '#ff0000',
  },
  return_2: {
    position: 'absolute',
    top: '0px',
    left: '184px',
    height: '134px',
    width: '174px',
    // backgroundColor: '#00ff00',
  },
  return_3: {
    position: 'absolute',
    top: '0px',
    left: '360px',
    height: '134px',
    width: '174px',
    // backgroundColor: '#0000ff',
  },
  name: {
    idth: '60px',
    top: -18,
    left: 70,
    fontSize: '8px',
    color: '#ffffff',
    position: 'absolute'
  }
})