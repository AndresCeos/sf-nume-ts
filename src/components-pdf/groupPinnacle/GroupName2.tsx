import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';

export const GroupName2: React.FC<{ groupConsult }> = ({ groupConsult }) => {
  const cap = groupConsult.group
  let p3;
  let p4;
  let p5
  if (cap[2] !== undefined) {
    p3 = cap[2]
  }
  if (cap[3] !== undefined) {
    p4 = cap[3]
  }
  if (cap[4] !== undefined) {
    p5 = cap[4]
  }
  return (
    <View style={style.container}>
      {cap[2] !== undefined ? (
<View style={[style.wrap, style.wrap1]}>
        <View style={style.name}><Text>{p3.nameView}</Text></View>
        <View style={[style.letter, style.A]}>
          <Text>{p3.calcName()}{p3.calcNameISK()}</Text>
        </View>
        <View style={[style.letter, style.B]}>
          <Text>{p3.calcSoulNumber()}{p3.calcSoulNumberISK()}</Text>
        </View>
        <View style={[style.letter, style.C]}>
          <Text>{p3.calcSoulExpresion()}{p3.calcSoulExpresionISK()}</Text>
        </View>
        <View style={[style.letter, style.D]}>
          <Text>{p3.calcMaturity()}{p3.calcMaturityISK()}</Text>
        </View>

</View>
) : null}
      {cap[3] !== undefined ? (
<View style={[style.wrap, style.wrap2]}>
        <View style={style.name}><Text>{p4.nameView}</Text></View>
        <View style={[style.letter, style.A]}>
          <Text>{p4.calcName()}{p4.calcNameISK()}</Text>
        </View>
        <View style={[style.letter, style.B]}>
          <Text>{p4.calcSoulNumber()}{p4.calcSoulNumberISK()}</Text>
        </View>
        <View style={[style.letter, style.C]}>
          <Text>{p4.calcSoulExpresion()}{p4.calcSoulExpresionISK()}</Text>
        </View>
        <View style={[style.letter, style.D]}>
          <Text>{p4.calcMaturity()}{p4.calcMaturityISK()}</Text>
        </View>

</View>
) : null}
      {cap[4] !== undefined ? (
<View style={[style.wrap, style.wrap3]}>
      <View style={style.name}><Text>{p5.nameView}</Text></View>
      <View style={[style.letter, style.A]}>
          <Text>{p5.calcName()}{p5.calcNameISK()}</Text>
      </View>
        <View style={[style.letter, style.B]}>
          <Text>{p5.calcSoulNumber()}{p5.calcSoulNumberISK()}</Text>
        </View>
        <View style={[style.letter, style.C]}>
          <Text>{p5.calcSoulExpresion()}{p5.calcSoulExpresionISK()}</Text>
        </View>
        <View style={[style.letter, style.D]}>
          <Text>{p5.calcMaturity()}{p5.calcMaturityISK()}</Text>
        </View>

</View>
) : null}
    </View>
  )
}
export const style = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '240px',
    left: '15px',
    width: '527px',
    // border:1,
    // borderColor:'#333'
  },
  wrap: {
    position: 'relative',
    width: '170px',
  },
  wrap1: {
    top: '0px',
    left: '0px',
    position: 'absolute'
  },
  wrap2: {
    top: '0px',
    left: '180px',
    position: 'absolute'
  },
  wrap3: {
    top: '0px',
    left: '360px',
    position: 'absolute'
  },
  bar: {
    backgroundColor: '#333',
    width: '170px',
    height: '10px'
  },
  letter: {
    width: '24px',
    height: '24px',
    // paddingTop: '5px',
    // textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // border: '1px solid #000',
    // borderRadius: '50%',
    position: 'absolute',
    fontSize: '14px'
  },
  name: {
    width: '60px',
    top: 0,
    left: 70,
    fontSize: '8px',
    color: '#ffffff',
    position: 'absolute'
  },
  A: {
    top: 32,
    left: 10
  },
  B: {
    left: 49,
    top: 32
  },
  C: {
    top: 31,
    left: 87
  },
  D: {
    top: 31,
    left: 135
  }
})