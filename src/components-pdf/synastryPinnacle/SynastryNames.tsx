import { StyleSheet, Text, View } from '@react-pdf/renderer';
import React from 'react';

export const SynastryNames: React.FC<{ synastry, newDate }> = ({ synastry, newDate }) => {
  const consultant = synastry.consultant
  const partner = synastry.partner
  return (
    <View style={data.container}>
      <View style={[data.wrap, data.synastry]}>
        <View style={[data.number, { top: 32, left: 11 }]}>
          <Text>{synastry.calcName()}{synastry.calcNameISK()}</Text>
        </View>
        <View style={[data.number, { top: 32, left: 50 }]}>
          <Text>{synastry.calcSoulNumber()}{synastry.calcSoulNumberISK()}</Text>
        </View>
        <View style={[data.number, { top: 32, left: 90 }]}>
          <Text>{synastry.calcSoulExpresion()}{synastry.calcSoulExpresionISK()}</Text>
        </View>
        <View style={[data.number, { top: 32, left: 135 }]}>
          <Text>{synastry.calcMaturity()}{synastry.calcMaturityISK()}</Text>
        </View>
      </View>
      <View style={[data.wrap, data.consultant]}>
        <View style={[data.number, { top: 32, left: 11 }]}>
          <Text>{consultant.calcName()}{consultant.calcNameISK()}</Text>
        </View>
        <View style={[data.number, { top: 32, left: 50 }]}>
          <Text>{consultant.calcSoulNumber()}{consultant.calcSoulNumberISK()}</Text>
        </View>
        <View style={[data.number, { top: 32, left: 90 }]}>
          <Text>{consultant.calcSoulExpresion()}{consultant.calcSoulExpresionISK()}</Text>
        </View>
        <View style={[data.number, { top: 32, left: 135 }]}>
          <Text>{consultant.calcMaturity()}{consultant.calcMaturityISK()}</Text>
        </View>
      </View>
      <View style={[data.wrap, data.partner]}>
        <View style={[data.number, { top: 32, left: 11 }]}>
          <Text>{partner.calcName()}{partner.calcNameISK()}</Text>
        </View>
        <View style={[data.number, { top: 32, left: 50 }]}>
          <Text>{partner.calcSoulNumber()}{partner.calcSoulNumberISK()}</Text>
        </View>
        <View style={[data.number, { top: 32, left: 90 }]}>
          <Text>{partner.calcSoulExpresion()}{partner.calcSoulExpresionISK()}</Text>
        </View>
        <View style={[data.number, { top: 32, left: 135 }]}>
          <Text>{consultant.calcMaturity()}{consultant.calcMaturityISK()}</Text>
        </View>
      </View>
    </View>
  )
}
export const data = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '30px',
    left: '12px',
    width: '532px',
    // backgroundColor: 'red'
  },
  wrap: {
    // backgroundColor: 'blue',
    position: 'absolute',
    top: 144
  },
  synastry: {
    position: 'relative',
  },
  consultant: {
    position: 'relative',
    left: 181
  },
  partner: {
    position: 'relative',
    left: 362
  },
  number: {
    width: 24,
    height: 24,
    fontSize: 14,
    // backgroundColor: '#ff000023',
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
})