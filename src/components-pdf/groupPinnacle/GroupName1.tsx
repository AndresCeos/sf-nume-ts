import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';

export const GroupName1: React.FC<{ groupConsult }> = ({ groupConsult }) => {
  const cap = groupConsult.group
  console.log(cap[1])
  console.log(cap);
  let p1;
  let p2
  if (cap[0] !== undefined) {
    p1 = cap[0]
  }
  if (cap[1] !== undefined) {
    p2 = cap[1]
  }
  return (
    <View style={style.container}>
      <View style={[style.wrap, style.wrap1]}>
        <View style={[style.letter, style.A]}>
          <Text>{groupConsult.calcName()}{groupConsult.calcNameISK()}</Text>
        </View>
        <View style={[style.letter, style.B]}>
          <Text>{groupConsult.calcSoulNumber()}{groupConsult.calcSoulNumberISK()}</Text>
        </View>
        <View style={[style.letter, style.C]}>
          <Text>{groupConsult.calcSoulExpresion()}{groupConsult.calcSoulExpresionISK()}</Text>
        </View>
        <View style={[style.letter, style.D]}>
          <Text>{groupConsult.calcMaturity()}{groupConsult.calcMaturityISK()}</Text>
        </View>
      </View>
      {(cap[0] !== undefined) ? (
<View style={[style.wrap, style.wrap2]}>
      <View style={style.name}><Text>{p1.nameView}</Text></View>
      <View style={[style.letter, style.A]}>
          <Text>{p1.calcName()}{p1.calcNameISK()}</Text>
      </View>
        <View style={[style.letter, style.B]}>
          <Text>{p1.calcSoulNumber()}{p1.calcSoulNumberISK()}</Text>
        </View>
        <View style={[style.letter, style.C]}>
          <Text>{p1.calcSoulExpresion()}{p1.calcSoulExpresionISK()}</Text>
        </View>
        <View style={[style.letter, style.D]}>
          <Text>{p1.calcMaturity()}{p1.calcMaturityISK()}</Text>
        </View>
</View>
) : null}
      {(cap[1] !== undefined) ? (
<View style={[style.wrap, style.wrap3]}>
        <View style={style.name}><Text>{p2.nameView}</Text></View>
        <View style={[style.letter, style.A]}>
          <Text>{p2.calcName()}{p2.calcNameISK()}</Text>
        </View>
        <View style={[style.letter, style.B]}>
          <Text>{p2.calcSoulNumber()}{p2.calcSoulNumberISK()}</Text>
        </View>
        <View style={[style.letter, style.C]}>
          <Text>{p2.calcSoulExpresion()}{p2.calcSoulExpresionISK()}</Text>
        </View>
        <View style={[style.letter, style.D]}>
          <Text>{p2.calcMaturity()}{p2.calcMaturityISK()}</Text>
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
  },
  /* container:{
    position:'absolute',
    top:'240px',
    left:'15px',
    width:'527px',
    border:1,
    borderColor:'#333'
  },
  bar:{
    backgroundColor:'#333',
    width:'170px',
    height:'10px'
  },
  pinnacle:{
    top:'60px'
  },
  names:{
    top:'0px',
    left:'0px'
  } */
})