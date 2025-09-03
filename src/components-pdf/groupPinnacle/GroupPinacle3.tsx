import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';

export const GroupPinacle3: React.FC<{ groupConsult }> = ({ groupConsult }) => {
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
      <Text>{p6.getA()}{p6.getAISK()}</Text>
      </View>
      <View style={[style.letter_main, style.B]}>
      <Text>{p6.getB()}{p6.getBISK()}</Text>
      </View>
      <View style={[style.letter, style.C]}>
      <Text>{p6.getC()}{p6.getCISK()}</Text>
      </View>
      <View style={[style.letter, style.D]}>
      <Text>{p6.getD()}{p6.getDISK()}</Text>
      </View>

      <View style={[style.letter, style.E]}>
      <Text>{p6.getE()}{p6.getEISK()}</Text>
      </View>
      <View style={[style.letter, style.F]}>
      <Text>{p6.getF()}{p6.getFISK()}</Text>
      </View>
      <View style={[style.letter, style.I]}>
      <Text>{p6.getI()}{p6.getIISK()}</Text>
      </View>

      <View style={[style.letter, style.H]}>
      <Text>{p6.getH()}{p6.getHISK()}</Text>
      </View>
      <View style={[style.letter, style.G]}>
      <Text>{p6.getG()}{p6.getGISK()}</Text>
      </View>

      <View style={[style.letter, style.J]}>
      <Text>{p6.getJ()}{p6.getJISK()}</Text>
      </View>

      <View style={[style.letter, style.K]}>
      <Text>{p6.getK()}</Text>
      </View>
      <View style={[style.letter, style.O]}>
      <Text>{p6.getO()}</Text>
      </View>
      <View style={[style.letter, style.L]}>
      <Text>{p6.getL()}</Text>
      </View>

      <View style={[style.letter, style.M]}>
      <Text>{p6.getM()}</Text>
      </View>

      <View style={[style.letter, style.P]}>
      <Text>{p6.getP()}</Text>
      </View>
      <View style={[style.letter, style.N]}>
      <Text>{p6.getN()}</Text>
      </View>

      <View style={[style.letter, style.R]}>
      <Text>{p6.getR()}</Text>
      </View>
      <View style={[style.letter, style.Q]}>
      <Text>{p6.getQ()}</Text>
      </View>
      <View style={[style.letter, style.S]}>
      <Text>{p6.getS()}</Text>
      </View>


      <View style={[style.letter, style.W]}>
      <Text>{p6.getW()}</Text>
      </View>
      <View style={[style.abs, style.ausensia]}>
      <Text>{p6.getAbsences()}</Text>
      </View>
</View>
) : null}
    {cap[6] !== undefined ? (
<View style={[style.wrap, style.wrap2]}>
      <View style={style.name}><Text>{p7.nameView}</Text></View>
      <View style={[style.letter, style.A]}>
      <Text>{p7.getA()}{p7.getAISK()}</Text>
      </View>
      <View style={[style.letter_main, style.B]}>
      <Text>{p7.getB()}{p7.getBISK()}</Text>
      </View>
      <View style={[style.letter, style.C]}>
      <Text>{p7.getC()}{p7.getCISK()}</Text>
      </View>
      <View style={[style.letter, style.D]}>
      <Text>{p7.getD()}{p7.getDISK()}</Text>
      </View>

      <View style={[style.letter, style.E]}>
      <Text>{p7.getE()}{p7.getEISK()}</Text>
      </View>
      <View style={[style.letter, style.F]}>
      <Text>{p7.getF()}{p7.getFISK()}</Text>
      </View>
      <View style={[style.letter, style.I]}>
      <Text>{p7.getI()}{p7.getIISK()}</Text>
      </View>

      <View style={[style.letter, style.H]}>
      <Text>{p7.getH()}{p7.getHISK()}</Text>
      </View>
      <View style={[style.letter, style.G]}>
      <Text>{p7.getG()}{p7.getGISK()}</Text>
      </View>

      <View style={[style.letter, style.J]}>
      <Text>{p7.getJ()}{p7.getJISK()}</Text>
      </View>

      <View style={[style.letter, style.K]}>
      <Text>{p7.getK()}</Text>
      </View>
      <View style={[style.letter, style.O]}>
      <Text>{p7.getO()}</Text>
      </View>
      <View style={[style.letter, style.L]}>
      <Text>{p7.getL()}</Text>
      </View>

      <View style={[style.letter, style.M]}>
      <Text>{p7.getM()}</Text>
      </View>

      <View style={[style.letter, style.P]}>
      <Text>{p7.getP()}</Text>
      </View>
      <View style={[style.letter, style.N]}>
      <Text>{p7.getN()}</Text>
      </View>

      <View style={[style.letter, style.R]}>
      <Text>{p7.getR()}</Text>
      </View>
      <View style={[style.letter, style.Q]}>
      <Text>{p7.getQ()}</Text>
      </View>
      <View style={[style.letter, style.S]}>
      <Text>{p7.getS()}</Text>
      </View>


      <View style={[style.letter, style.W]}>
      <Text>{p7.getW()}</Text>
      </View>
      <View style={[style.abs, style.ausensia]}>
      <Text>{p7.getAbsences()}</Text>
      </View>
</View>
) : null}
    {cap[7] !== undefined ? (
<View style={[style.wrap, style.wrap3]}>
    <View style={style.name}><Text>{p8.nameView}</Text></View>
    <View style={[style.letter, style.A]}>
    <Text>{p8.getA()}{p8.getAISK()}</Text>
    </View>
    <View style={[style.letter_main, style.B]}>
    <Text>{p8.getB()}{p8.getBISK()}</Text>
    </View>
    <View style={[style.letter, style.C]}>
    <Text>{p8.getC()}{p8.getCISK()}</Text>
    </View>
    <View style={[style.letter, style.D]}>
    <Text>{p8.getD()}{p8.getDISK()}</Text>
    </View>

    <View style={[style.letter, style.E]}>
    <Text>{p8.getE()}{p8.getEISK()}</Text>
    </View>
    <View style={[style.letter, style.F]}>
    <Text>{p8.getF()}{p8.getFISK()}</Text>
    </View>
    <View style={[style.letter, style.I]}>
    <Text>{p8.getI()}{p8.getIISK()}</Text>
    </View>

    <View style={[style.letter, style.H]}>
    <Text>{p8.getH()}{p8.getHISK()}</Text>
    </View>
    <View style={[style.letter, style.G]}>
    <Text>{p8.getG()}{p8.getGISK()}</Text>
    </View>

    <View style={[style.letter, style.J]}>
    <Text>{p8.getJ()}{p8.getJISK()}</Text>
    </View>

    <View style={[style.letter, style.K]}>
    <Text>{p8.getK()}</Text>
    </View>
    <View style={[style.letter, style.O]}>
    <Text>{p8.getO()}</Text>
    </View>
    <View style={[style.letter, style.L]}>
    <Text>{p8.getL()}</Text>
    </View>

    <View style={[style.letter, style.M]}>
    <Text>{p8.getM()}</Text>
    </View>

    <View style={[style.letter, style.P]}>
    <Text>{p8.getP()}</Text>
    </View>
    <View style={[style.letter, style.N]}>
    <Text>{p8.getN()}</Text>
    </View>

    <View style={[style.letter, style.R]}>
    <Text>{p8.getR()}</Text>
    </View>
    <View style={[style.letter, style.Q]}>
    <Text>{p8.getQ()}</Text>
    </View>
    <View style={[style.letter, style.S]}>
    <Text>{p8.getS()}</Text>
    </View>


    <View style={[style.letter, style.W]}>
    <Text>{p8.getW()}</Text>
    </View>
    <View style={[style.abs, style.ausensia]}>
    <Text>{p8.getAbsences()}</Text>
    </View>
</View>
) : null}
    </View>
  )
}
export const style = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '310px',
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
    width: '14px',
    height: '14px',
    // paddingTop: '5px',
    // textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // border: '1px solid #000',
    // borderRadius: '50%',
    position: 'absolute',
    fontSize: '7px'
  },
  letter_main: {
    width: '20px',
    height: '20px',
    // paddingTop: '5px',
    // textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // border: '1px solid #000',
    // borderRadius: '50%',
    position: 'absolute',
    fontSize: '10px'
  },
  abs: {
    width: '40px',
    height: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // border: '1px solid #000',
    position: 'absolute',
    fontSize: '7px'
  },
  name: {
    width: '60px',
    top: 0,
    left: 80,
    fontSize: '8px',
    color: '#ffffff',
    position: 'absolute'
  },
  A: {
    top: 93,
    left: 32
  },
  B: {
    left: 60,
    top: 86
  },
  C: {
    top: 90,
    left: 95
  },
  D: {
    top: 91,
    left: 117
  },
  E: {
    left: 47,
    top: 62
  },
  F: {
    top: 62,
    left: 79
  },
  G: {
    top: 39,
    left: 63
  },
  H: {
    top: 16,
    left: 63
  },
  I: {
    top: 62,
    left: 63
  },
  J: {
    top: 62,
    left: 108
  },
  K: {
    top: 121,
    left: 47
  },
  O: {
    top: 121,
    left: 63
  },
  L: {
    top: 121,
    left: 79
  },
  W: {
    top: 143,
    left: 27
  },
  M: {
    top: 144,
    left: 63
  },
  N: {
    top: 167,
    left: 63
  },
  P: {
    top: 167,
    left: 40
  },
  Q: {
    top: 189,
    left: 47
  },
  R: {
    top: 189,
    left: 63
  },
  S: {
    top: 189,
    left: 79
  },
  ausensia: {
    top: 183,
    left: 102
  }
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

