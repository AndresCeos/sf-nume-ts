import React from 'react';

import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { AnnualReturn } from './AnnualReturn';

export const GroupRetornos3: React.FC<{ groupConsult, newDate }> = ({ groupConsult, newDate }) => {
  const cap = groupConsult.group
  let p6;
  let p7;
  let p8;
  let annualReturnLastYear;
  let annualReturnNextYear;
  let annualReturnCurrent;
  if (cap[5] !== undefined) {
    p6 = cap[5]
    annualReturnCurrent = p6.annualReturn(newDate.year())
  }
  if (cap[6] !== undefined) {
    p7 = cap[6]
    annualReturnLastYear = p7.annualReturn(newDate.year())
  }
  if (cap[7] !== undefined) {
    p8 = cap[7]
    annualReturnNextYear = p8.annualReturn(newDate.year())
  }
  return (
    <View style={annualReturn.container}>
      <View style={annualReturn.wrap}>
        {(cap[6]) ? (
<View style={annualReturn.return_2}>
        <View style={annualReturn.name}><Text>{p7.nameView}</Text></View>
          <AnnualReturn annualReturn={annualReturnLastYear} />
</View>
) : null}
        {(cap[5] !== undefined) ? (
<View style={annualReturn.return_1}>
        <View style={annualReturn.name}><Text>{p6.nameView}</Text></View>
          <AnnualReturn annualReturn={annualReturnCurrent} />
</View>
) : null}
        {(cap[7]) ? (
<View style={annualReturn.return_3}>
        <View style={annualReturn.name}><Text>{p8.nameView}</Text></View>
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