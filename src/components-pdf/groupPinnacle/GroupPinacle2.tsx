import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';

export const GroupPinacle2: React.FC<{ groupConsult }> = ({ groupConsult }) => {
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
        <Text>{p3.getA()}{p3.getAISK()}</Text>
        </View>
        <View style={[style.letter_main, style.B]}>
        <Text>{p3.getB()}{p3.getBISK()}</Text>
        </View>
        <View style={[style.letter, style.C]}>
        <Text>{p3.getC()}{p3.getCISK()}</Text>
        </View>
        <View style={[style.letter, style.D]}>
        <Text>{p3.getD()}{p3.getDISK()}</Text>
        </View>

        <View style={[style.letter, style.E]}>
        <Text>{p3.getE()}{p3.getEISK()}</Text>
        </View>
        <View style={[style.letter, style.F]}>
        <Text>{p3.getF()}{p3.getFISK()}</Text>
        </View>
        <View style={[style.letter, style.I]}>
        <Text>{p3.getI()}{p3.getIISK()}</Text>
        </View>

        <View style={[style.letter, style.H]}>
        <Text>{p3.getH()}{p3.getHISK()}</Text>
        </View>
        <View style={[style.letter, style.G]}>
        <Text>{p3.getG()}{p3.getGISK()}</Text>
        </View>

        <View style={[style.letter, style.J]}>
        <Text>{p3.getJ()}{p3.getJISK()}</Text>
        </View>

        <View style={[style.letter, style.K]}>
        <Text>{p3.getK()}</Text>
        </View>
        <View style={[style.letter, style.O]}>
        <Text>{p3.getO()}</Text>
        </View>
        <View style={[style.letter, style.L]}>
        <Text>{p3.getL()}</Text>
        </View>

        <View style={[style.letter, style.M]}>
        <Text>{p3.getM()}</Text>
        </View>

        <View style={[style.letter, style.P]}>
        <Text>{p3.getP()}</Text>
        </View>
        <View style={[style.letter, style.N]}>
        <Text>{p3.getN()}</Text>
        </View>

        <View style={[style.letter, style.R]}>
        <Text>{p3.getR()}</Text>
        </View>
        <View style={[style.letter, style.Q]}>
        <Text>{p3.getQ()}</Text>
        </View>
        <View style={[style.letter, style.S]}>
        <Text>{p3.getS()}</Text>
        </View>


        <View style={[style.letter, style.W]}>
        <Text>{p3.getW()}</Text>
        </View>
        <View style={[style.abs, style.ausensia]}>
        <Text>{p3.getAbsences()}</Text>
        </View>
</View>
) : null}
      {cap[3] !== undefined ? (
<View style={[style.wrap, style.wrap2]}>
        <View style={style.name}><Text>{p4.nameView}</Text></View>
        <View style={[style.letter, style.A]}>
        <Text>{p4.getA()}{p4.getAISK()}</Text>
        </View>
        <View style={[style.letter_main, style.B]}>
        <Text>{p4.getB()}{p4.getBISK()}</Text>
        </View>
        <View style={[style.letter, style.C]}>
        <Text>{p4.getC()}{p4.getCISK()}</Text>
        </View>
        <View style={[style.letter, style.D]}>
        <Text>{p4.getD()}{p4.getDISK()}</Text>
        </View>

        <View style={[style.letter, style.E]}>
        <Text>{p4.getE()}{p4.getEISK()}</Text>
        </View>
        <View style={[style.letter, style.F]}>
        <Text>{p4.getF()}{p4.getFISK()}</Text>
        </View>
        <View style={[style.letter, style.I]}>
        <Text>{p4.getI()}{p4.getIISK()}</Text>
        </View>

        <View style={[style.letter, style.H]}>
        <Text>{p4.getH()}{p4.getHISK()}</Text>
        </View>
        <View style={[style.letter, style.G]}>
        <Text>{p4.getG()}{p4.getGISK()}</Text>
        </View>

        <View style={[style.letter, style.J]}>
        <Text>{p4.getJ()}{p4.getJISK()}</Text>
        </View>

        <View style={[style.letter, style.K]}>
        <Text>{p4.getK()}</Text>
        </View>
        <View style={[style.letter, style.O]}>
        <Text>{p4.getO()}</Text>
        </View>
        <View style={[style.letter, style.L]}>
        <Text>{p4.getL()}</Text>
        </View>

        <View style={[style.letter, style.M]}>
        <Text>{p4.getM()}</Text>
        </View>

        <View style={[style.letter, style.P]}>
        <Text>{p4.getP()}</Text>
        </View>
        <View style={[style.letter, style.N]}>
        <Text>{p4.getN()}</Text>
        </View>

        <View style={[style.letter, style.R]}>
        <Text>{p4.getR()}</Text>
        </View>
        <View style={[style.letter, style.Q]}>
        <Text>{p4.getQ()}</Text>
        </View>
        <View style={[style.letter, style.S]}>
        <Text>{p4.getS()}</Text>
        </View>


        <View style={[style.letter, style.W]}>
        <Text>{p4.getW()}</Text>
        </View>
        <View style={[style.abs, style.ausensia]}>
        <Text>{p4.getAbsences()}</Text>
        </View>
</View>
) : null}
      {cap[4] !== undefined ? (
<View style={[style.wrap, style.wrap3]}>
      <View style={style.name}><Text>{p5.nameView}</Text></View>
      <View style={[style.letter, style.A]}>
      <Text>{p5.getA()}{p5.getAISK()}</Text>
      </View>
      <View style={[style.letter_main, style.B]}>
      <Text>{p5.getB()}{p5.getBISK()}</Text>
      </View>
      <View style={[style.letter, style.C]}>
      <Text>{p5.getC()}{p5.getCISK()}</Text>
      </View>
      <View style={[style.letter, style.D]}>
      <Text>{p5.getD()}{p5.getDISK()}</Text>
      </View>

      <View style={[style.letter, style.E]}>
      <Text>{p5.getE()}{p5.getEISK()}</Text>
      </View>
      <View style={[style.letter, style.F]}>
      <Text>{p5.getF()}{p5.getFISK()}</Text>
      </View>
      <View style={[style.letter, style.I]}>
      <Text>{p5.getI()}{p5.getIISK()}</Text>
      </View>

      <View style={[style.letter, style.H]}>
      <Text>{p5.getH()}{p5.getHISK()}</Text>
      </View>
      <View style={[style.letter, style.G]}>
      <Text>{p5.getG()}{p5.getGISK()}</Text>
      </View>

      <View style={[style.letter, style.J]}>
      <Text>{p5.getJ()}{p5.getJISK()}</Text>
      </View>

      <View style={[style.letter, style.K]}>
      <Text>{p5.getK()}</Text>
      </View>
      <View style={[style.letter, style.O]}>
      <Text>{p5.getO()}</Text>
      </View>
      <View style={[style.letter, style.L]}>
      <Text>{p5.getL()}</Text>
      </View>

      <View style={[style.letter, style.M]}>
      <Text>{p5.getM()}</Text>
      </View>

      <View style={[style.letter, style.P]}>
      <Text>{p5.getP()}</Text>
      </View>
      <View style={[style.letter, style.N]}>
      <Text>{p5.getN()}</Text>
      </View>

      <View style={[style.letter, style.R]}>
      <Text>{p5.getR()}</Text>
      </View>
      <View style={[style.letter, style.Q]}>
      <Text>{p5.getQ()}</Text>
      </View>
      <View style={[style.letter, style.S]}>
      <Text>{p5.getS()}</Text>
      </View>


      <View style={[style.letter, style.W]}>
      <Text>{p5.getW()}</Text>
      </View>
      <View style={[style.abs, style.ausensia]}>
      <Text>{p5.getAbsences()}</Text>
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

