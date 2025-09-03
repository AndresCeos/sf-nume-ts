import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
export const GroupName3: React.FC<{ groupConsult }> = ({ groupConsult }) => {
  const cap = groupConsult.group
  let p6;
  let p7;
  let p8
  if (cap[5] !== undefined) {
    p6 = cap[5]
  }
  if (cap[6] !== undefined) {
    p7 = cap[6]
  }
  if (cap[7] !== undefined) {
    p8 = cap[7]
  }
  return (
    <View style={style.container}>
      {cap[5] !== undefined ? (
<View style={[style.wrap, style.wrap1]}>
        <View style={style.name}><Text>{p6.nameView}</Text></View>
        <View style={[style.letter, style.A]}>
          <Text>{p6.calcName()}{p6.calcNameISK()}</Text>
        </View>
        <View style={[style.letter, style.B]}>
          <Text>{p6.calcSoulNumber()}{p6.calcSoulNumberISK()}</Text>
        </View>
        <View style={[style.letter, style.C]}>
          <Text>{p6.calcSoulExpresion()}{p6.calcSoulExpresionISK()}</Text>
        </View>
        <View style={[style.letter, style.D]}>
          <Text>{p6.calcMaturity()}{p6.calcMaturityISK()}</Text>
        </View>

</View>
) : null}
      {cap[6] !== undefined ? (
<View style={[style.wrap, style.wrap2]}>
        <View style={style.name}><Text>{p7.nameView}</Text></View>
        <View style={[style.letter, style.A]}>
          <Text>{p7.calcName()}{p7.calcNameISK()}</Text>
        </View>
        <View style={[style.letter, style.B]}>
          <Text>{p7.calcSoulNumber()}{p7.calcSoulNumberISK()}</Text>
        </View>
        <View style={[style.letter, style.C]}>
          <Text>{p7.calcSoulExpresion()}{p7.calcSoulExpresionISK()}</Text>
        </View>
        <View style={[style.letter, style.D]}>
          <Text>{p7.calcMaturity()}{p7.calcMaturityISK()}</Text>
        </View>

</View>
) : null}
      {cap[7] !== undefined ? (
<View style={[style.wrap, style.wrap3]}>
      <View style={style.name}><Text>{p8.nameView}</Text></View>
      <View style={[style.letter, style.A]}>
          <Text>{p8.calcName()}{p8.calcNameISK()}</Text>
      </View>
        <View style={[style.letter, style.B]}>
          <Text>{p8.calcSoulNumber()}{p8.calcSoulNumberISK()}</Text>
        </View>
        <View style={[style.letter, style.C]}>
          <Text>{p8.calcSoulExpresion()}{p8.calcSoulExpresionISK()}</Text>
        </View>
        <View style={[style.letter, style.D]}>
          <Text>{p8.calcMaturity()}{p8.calcMaturityISK()}</Text>
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