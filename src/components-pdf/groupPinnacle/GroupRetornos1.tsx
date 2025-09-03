import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { AnnualReturn } from './AnnualReturn';
export const GroupRetornos1: React.FC<{ groupConsult, newDate }> = ({ groupConsult, newDate }) => {
  const cap = groupConsult.group
  console.log(cap[1])
  console.log(cap);
  const annualReturnCurrent = groupConsult.annualReturn(newDate.year())
  let p1;
  let p2;
  let annualReturnLastYear;
  let annualReturnNextYear;
  if (cap[0] !== undefined) {
    p1 = cap[0]
    annualReturnLastYear = p1.annualReturn(newDate.year())
  }
  if (cap[1] !== undefined) {
    p2 = cap[1]
    annualReturnNextYear = p2.annualReturn(newDate.year())
  }
  return (
    <View style={annualReturn.container}>
      <View style={annualReturn.wrap}>
        {(cap[0]) ? (
<View style={annualReturn.return_2}>
        <View style={annualReturn.name}><Text>{p1.nameView}</Text></View>
          <AnnualReturn annualReturn={annualReturnLastYear} />
</View>
) : null}
        <View style={annualReturn.return_1}>
          <AnnualReturn annualReturn={annualReturnCurrent} />
        </View>
        {(cap[1]) ? (
<View style={annualReturn.return_3}>
        <View style={annualReturn.name}><Text>{p2.nameView}</Text></View>
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