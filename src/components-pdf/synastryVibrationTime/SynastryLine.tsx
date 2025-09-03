import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer'

export const SynastryLine: React.FC<{ synastry, newDate }> = ({ synastry, newDate }) => {
  return (
    <View style={lifePathDialogs.container}>
      <View style={[lifePathDialogs.wrap]}>
        <View style={[lifePathDialogs.item, lifePathDialogs.top]}>
          <Text>{synastry.getSumHierarchy(synastry.getB(), synastry.getLifeStage(newDate.year()))}</Text>
        </View>
        <View style={[lifePathDialogs.item, lifePathDialogs.left]}>
          <Text>{synastry.getB()}</Text>
        </View>
        <View style={[lifePathDialogs.item, lifePathDialogs.right]}>
          <Text>{synastry.getLifeStage(newDate.year())}</Text>
        </View>
        <View style={[lifePathDialogs.item, lifePathDialogs.bottom]}>
          <Text>{synastry.getResHierarchy(synastry.getB(), synastry.getLifeStage(newDate.year()))}</Text>
        </View>
      </View>
      <View style={[lifePathDialogs.wrap, lifePathDialogs.wrap_2]}>
        <View style={[lifePathDialogs.item, lifePathDialogs.top]}>
          <Text>{synastry.getSumHierarchy(synastry.getLifeStage(newDate.year()), synastry.calcPersonalYear(newDate.year()))}</Text>
        </View>
        <View style={[lifePathDialogs.item, lifePathDialogs.left]}>
          <Text>{synastry.getLifeStage(newDate.year())}</Text>
        </View>
        <View style={[lifePathDialogs.item, lifePathDialogs.right]}>
          <Text>{synastry.calcPersonalYear(newDate.year())}</Text>
        </View>
        <View style={[lifePathDialogs.item, lifePathDialogs.bottom]}>
          <Text>{synastry.getResHierarchy(synastry.getLifeStage(newDate.year()), synastry.calcPersonalYear(newDate.year()))}</Text>
        </View>
      </View>
      <View style={[lifePathDialogs.wrap, lifePathDialogs.wrap_3]}>
        <View style={[lifePathDialogs.item, lifePathDialogs.top]}>
          <Text>{synastry.getSumHierarchy(synastry.calcPersonalYear(newDate.year()), synastry.calcCurrentQuater(newDate, newDate.year()))}</Text>
        </View>
        <View style={[lifePathDialogs.item, lifePathDialogs.left]}>
          <Text>{synastry.calcPersonalYear(newDate.year())}</Text>
        </View>
        <View style={[lifePathDialogs.item, lifePathDialogs.right]}>
          <Text>{synastry.calcCurrentQuater(newDate, newDate.year())}</Text>
        </View>
        <View style={[lifePathDialogs.item, lifePathDialogs.bottom]}>
          <Text>{synastry.getResHierarchy(synastry.calcPersonalYear(newDate.year()), synastry.calcCurrentQuater(newDate, newDate.year()))}</Text>
        </View>
      </View>
      <View style={[lifePathDialogs.wrap, lifePathDialogs.wrap_4]}>
        <View style={[lifePathDialogs.item, lifePathDialogs.top]}>
          <Text>{synastry.getSumHierarchy(synastry.calcCurrentQuater(newDate, newDate.year()), synastry.calcPersonalMonth(newDate.month() + 1, newDate.year()))}</Text>
        </View>
        <View style={[lifePathDialogs.item, lifePathDialogs.left]}>
          <Text>{synastry.calcCurrentQuater(newDate, newDate.year())}</Text>
        </View>
        <View style={[lifePathDialogs.item, lifePathDialogs.right]}>
          <Text>{synastry.calcPersonalMonth(newDate.month() + 1, newDate.year())}</Text>
        </View>
        <View style={[lifePathDialogs.item, lifePathDialogs.bottom]}>
          <Text>{synastry.getResHierarchy(synastry.calcCurrentQuater(newDate, newDate.year()), synastry.calcPersonalMonth(newDate.month() + 1, newDate.year()))}</Text>
        </View>
      </View>
      <View style={[lifePathDialogs.wrap, lifePathDialogs.wrap_5]}>
        <View style={[lifePathDialogs.item, lifePathDialogs.top]}>
          <Text>{synastry.getSumHierarchy(synastry.calcPersonalMonth(newDate.month() + 1, newDate.year()), synastry.calcPersonalWeek(newDate.date(), newDate.month() + 1, newDate.year()))}</Text>
        </View>
        <View style={[lifePathDialogs.item, lifePathDialogs.left]}>
          <Text>{synastry.calcPersonalMonth(newDate.month() + 1, newDate.year())}</Text>
        </View>
        <View style={[lifePathDialogs.item, lifePathDialogs.right]}>
          <Text>{synastry.calcPersonalWeek(newDate.date(), newDate.month() + 1, newDate.year())}</Text>
        </View>
        <View style={[lifePathDialogs.item, lifePathDialogs.bottom]}>
          <Text>{synastry.getResHierarchy(synastry.calcPersonalMonth(newDate.month() + 1, newDate.year()), synastry.calcPersonalWeek(newDate.date(), newDate.month() + 1, newDate.year()))}</Text>
        </View>
      </View>
    </View>
  )
}
export const lifePathDialogs = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '337px',
    left: '11px',
    fontSize: '7px',
    width: '531px',
    backgroundColor: 'red'
  },
  wrap: {
    position: 'relative',
    backgroundColor: 'red',
    width: 106
  },
  item: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '20px',
    height: '20px',
    fontSize: '11px'
  },
  top: {
    top: '25px',
    left: '43px'
  },
  left: {
    top: '46px',
    left: '20px'
  },
  right: {
    top: '46px',
    left: '65px'
  },
  bottom: {
    top: '70px',
    left: '43px'
  },
  wrap_2: {
    left: '106px',
  },
  wrap_3: {
    left: '212px',
  },
  wrap_4: {
    left: '318px',
  },
  wrap_5: {
    left: '424px',
  },
})