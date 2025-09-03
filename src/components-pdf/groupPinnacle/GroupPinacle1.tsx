import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';

export const GroupPinacle1: React.FC<{ groupConsult }> = ({ groupConsult }) => {
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
  console.log(p1)
return (
    <View style={style.container}>

      <View style={[style.wrap, style.wrap1]}>
      <View style={[style.letter, style.A]}>
          <Text>{groupConsult.getA()}{groupConsult.getAISK()}</Text>
      </View>
        <View style={[style.letter_main, style.B]}>
        <Text>{groupConsult.getB()}{groupConsult.getBISK()}</Text>
        </View>
        <View style={[style.letter, style.C]}>
        <Text>{groupConsult.getC()}{groupConsult.getCISK()}</Text>
        </View>
        <View style={[style.letter, style.D]}>
        <Text>{groupConsult.getD()}{groupConsult.getDISK()}</Text>
        </View>

        <View style={[style.letter, style.E]}>
        <Text>{groupConsult.getE()}{groupConsult.getEISK()}</Text>
        </View>
        <View style={[style.letter, style.F]}>
        <Text>{groupConsult.getF()}{groupConsult.getFISK()}</Text>
        </View>
        <View style={[style.letter, style.I]}>
        <Text>{groupConsult.getI()}{groupConsult.getIISK()}</Text>
        </View>

        <View style={[style.letter, style.H]}>
        <Text>{groupConsult.getH()}{groupConsult.getHISK()}</Text>
        </View>
        <View style={[style.letter, style.G]}>
        <Text>{groupConsult.getG()}{groupConsult.getGISK()}</Text>
        </View>

        <View style={[style.letter, style.J]}>
        <Text>{groupConsult.getJ()}{groupConsult.getJISK()}</Text>
        </View>

        <View style={[style.letter, style.K]}>
        <Text>{groupConsult.getK()}</Text>
        </View>
        <View style={[style.letter, style.O]}>
        <Text>{groupConsult.getO()}</Text>
        </View>
        <View style={[style.letter, style.L]}>
        <Text>{groupConsult.getL()}</Text>
        </View>

        <View style={[style.letter, style.M]}>
        <Text>{groupConsult.getM()}</Text>
        </View>

        <View style={[style.letter, style.P]}>
        <Text>{groupConsult.getP()}</Text>
        </View>
        <View style={[style.letter, style.N]}>
        <Text>{groupConsult.getN()}</Text>
        </View>

        <View style={[style.letter, style.R]}>
        <Text>{groupConsult.getR()}</Text>
        </View>
        <View style={[style.letter, style.Q]}>
        <Text>{groupConsult.getQ()}</Text>
        </View>
        <View style={[style.letter, style.S]}>
        <Text>{groupConsult.getS()}</Text>
        </View>


        <View style={[style.letter, style.W]}>
        <Text>{groupConsult.getW()}</Text>
        </View>
        <View style={[style.abs, style.ausensia]}>
        <Text>{groupConsult.getAbsences()}</Text>
        </View>
      </View>
      {cap[0] !== undefined ? (
<View style={[style.wrap, style.wrap2]}>
        <View style={style.name}><Text>{p1.nameView}</Text></View>
        <View style={[style.letter, style.A]}>
        <Text>{p1.getA()}{p1.getAISK()}</Text>
        </View>
        <View style={[style.letter_main, style.B]}>
        <Text>{p1.getB()}{p1.getBISK()}</Text>
        </View>
        <View style={[style.letter, style.C]}>
        <Text>{p1.getC()}{p1.getCISK()}</Text>
        </View>
        <View style={[style.letter, style.D]}>
        <Text>{p1.getD()}{p1.getDISK()}</Text>
        </View>

        <View style={[style.letter, style.E]}>
        <Text>{p1.getE()}{p1.getEISK()}</Text>
        </View>
        <View style={[style.letter, style.F]}>
        <Text>{p1.getF()}{p1.getFISK()}</Text>
        </View>
        <View style={[style.letter, style.I]}>
        <Text>{p1.getI()}{p1.getIISK()}</Text>
        </View>

        <View style={[style.letter, style.H]}>
        <Text>{p1.getH()}{p1.getHISK()}</Text>
        </View>
        <View style={[style.letter, style.G]}>
        <Text>{p1.getG()}{p1.getGISK()}</Text>
        </View>

        <View style={[style.letter, style.J]}>
        <Text>{p1.getJ()}{p1.getJISK()}</Text>
        </View>

        <View style={[style.letter, style.K]}>
        <Text>{p1.getK()}</Text>
        </View>
        <View style={[style.letter, style.O]}>
        <Text>{p1.getO()}</Text>
        </View>
        <View style={[style.letter, style.L]}>
        <Text>{p1.getL()}</Text>
        </View>

        <View style={[style.letter, style.M]}>
        <Text>{p1.getM()}</Text>
        </View>

        <View style={[style.letter, style.P]}>
        <Text>{p1.getP()}</Text>
        </View>
        <View style={[style.letter, style.N]}>
        <Text>{p1.getN()}</Text>
        </View>

        <View style={[style.letter, style.R]}>
        <Text>{p1.getR()}</Text>
        </View>
        <View style={[style.letter, style.Q]}>
        <Text>{p1.getQ()}</Text>
        </View>
        <View style={[style.letter, style.S]}>
        <Text>{p1.getS()}</Text>
        </View>


        <View style={[style.letter, style.W]}>
        <Text>{p1.getW()}</Text>
        </View>
        <View style={[style.abs, style.ausensia]}>
        <Text>{p1.getAbsences()}</Text>
        </View>
</View>
) : null}
      {cap[1] !== undefined ? (
<View style={[style.wrap, style.wrap3]}>
      <View style={style.name}><Text>{p2.nameView}</Text></View>
      <View style={[style.letter, style.A]}>
      <Text>{p2.getA()}{p2.getAISK()}</Text>
      </View>
      <View style={[style.letter_main, style.B]}>
      <Text>{p2.getB()}{p2.getBISK()}</Text>
      </View>
      <View style={[style.letter, style.C]}>
      <Text>{p2.getC()}{p2.getCISK()}</Text>
      </View>
      <View style={[style.letter, style.D]}>
      <Text>{p2.getD()}{p2.getDISK()}</Text>
      </View>

      <View style={[style.letter, style.E]}>
      <Text>{p2.getE()}{p2.getEISK()}</Text>
      </View>
      <View style={[style.letter, style.F]}>
      <Text>{p2.getF()}{p2.getFISK()}</Text>
      </View>
      <View style={[style.letter, style.I]}>
      <Text>{p2.getI()}{p2.getIISK()}</Text>
      </View>

      <View style={[style.letter, style.H]}>
      <Text>{p2.getH()}{p2.getHISK()}</Text>
      </View>
      <View style={[style.letter, style.G]}>
      <Text>{p2.getG()}{p2.getGISK()}</Text>
      </View>

      <View style={[style.letter, style.J]}>
      <Text>{p2.getJ()}{p2.getJISK()}</Text>
      </View>

      <View style={[style.letter, style.K]}>
      <Text>{p2.getK()}</Text>
      </View>
      <View style={[style.letter, style.O]}>
      <Text>{p2.getO()}</Text>
      </View>
      <View style={[style.letter, style.L]}>
      <Text>{p2.getL()}</Text>
      </View>

      <View style={[style.letter, style.M]}>
      <Text>{p2.getM()}</Text>
      </View>

      <View style={[style.letter, style.P]}>
      <Text>{p2.getP()}</Text>
      </View>
      <View style={[style.letter, style.N]}>
      <Text>{p2.getN()}</Text>
      </View>

      <View style={[style.letter, style.R]}>
      <Text>{p2.getR()}</Text>
      </View>
      <View style={[style.letter, style.Q]}>
      <Text>{p2.getQ()}</Text>
      </View>
      <View style={[style.letter, style.S]}>
      <Text>{p2.getS()}</Text>
      </View>


      <View style={[style.letter, style.W]}>
      <Text>{p2.getW()}</Text>
      </View>
      <View style={[style.abs, style.ausensia]}>
      <Text>{p2.getAbsences()}</Text>
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
    left: 70,
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
