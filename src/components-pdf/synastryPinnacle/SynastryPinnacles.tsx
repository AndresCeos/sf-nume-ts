import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { SynastryPinnacle } from './SynastryPinnacle';

export const SynastryPinnacles: React.FC<{ synastry }> = ({ synastry }) => {
  const consultant = synastry.consultant
  const partner = synastry.partner
  return (
    <View style={data.container}>
      <View style={[data.wrap, data.synastry]}>
        <SynastryPinnacle consultant={synastry} />
      </View>
      <View style={[data.wrap, data.consultant]}>
        <SynastryPinnacle consultant={consultant} />
      </View>
      <View style={[data.wrap, data.partner]}>
        <SynastryPinnacle consultant={partner} />
      </View>
    </View>
  )
}
export const data = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '250px',
    left: '12px',
    width: '532px',
    backgroundColor: 'red'
  },
  wrap: {
    // backgroundColor: 'blue',
    position: 'absolute',
  },
  synastry: {
    position: 'relative',
    left: 18
  },
  consultant: {
    position: 'relative',
    left: 198
  },
  partner: {
    position: 'relative',
    left: 382
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