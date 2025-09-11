import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';

export const GroupLine: React.FC<{ groupConsult, newDate }> = ({ groupConsult, newDate }) => (
  <View style={lifePathDialogs.container}>
    <View style={[lifePathDialogs.wrap]}>
      <View style={[lifePathDialogs.item, lifePathDialogs.top]}>
        <Text>{groupConsult.getSumHierarchy(groupConsult.getB(), groupConsult.getLifeStage(newDate.year()))}</Text>
      </View>
      <View style={[lifePathDialogs.item, lifePathDialogs.left]}>
        <Text>{groupConsult.getB()}</Text>
      </View>
      <View style={[lifePathDialogs.item, lifePathDialogs.right]}>
        <Text>{groupConsult.getLifeStage(newDate.year())}</Text>
      </View>
      <View style={[lifePathDialogs.item, lifePathDialogs.bottom]}>
        <Text>{groupConsult.getResHierarchy(groupConsult.getB(), groupConsult.getLifeStage(newDate.year()))}</Text>
      </View>
    </View>
    <View style={[lifePathDialogs.wrap, lifePathDialogs.wrap_2]}>
      <View style={[lifePathDialogs.item, lifePathDialogs.top]}>
        <Text>{groupConsult.getSumHierarchy(groupConsult.getLifeStage(newDate.year()), groupConsult.calcPersonalYear(newDate.year()))}</Text>
      </View>
      <View style={[lifePathDialogs.item, lifePathDialogs.left]}>
        <Text>{groupConsult.getLifeStage(newDate.year())}</Text>
      </View>
      <View style={[lifePathDialogs.item, lifePathDialogs.right]}>
        <Text>{groupConsult.calcPersonalYear(newDate.year())}</Text>
      </View>
      <View style={[lifePathDialogs.item, lifePathDialogs.bottom]}>
        <Text>{groupConsult.getResHierarchy(groupConsult.getLifeStage(newDate.year()), groupConsult.calcPersonalYear(newDate.year()))}</Text>
      </View>
    </View>
    <View style={[lifePathDialogs.wrap, lifePathDialogs.wrap_3]}>
      <View style={[lifePathDialogs.item, lifePathDialogs.top]}>
        <Text>{groupConsult.getSumHierarchy(groupConsult.calcPersonalYear(newDate.year()), groupConsult.calcCurrentQuater(newDate, newDate.year()))}</Text>
      </View>
      <View style={[lifePathDialogs.item, lifePathDialogs.left]}>
        <Text>{groupConsult.calcPersonalYear(newDate.year())}</Text>
      </View>
      <View style={[lifePathDialogs.item, lifePathDialogs.right]}>
        <Text>{groupConsult.calcCurrentQuater(newDate, newDate.year())}</Text>
      </View>
      <View style={[lifePathDialogs.item, lifePathDialogs.bottom]}>
        <Text>{groupConsult.getResHierarchy(groupConsult.calcPersonalYear(newDate.year()), groupConsult.calcCurrentQuater(newDate, newDate.year()))}</Text>
      </View>
    </View>
    <View style={[lifePathDialogs.wrap, lifePathDialogs.wrap_4]}>
      <View style={[lifePathDialogs.item, lifePathDialogs.top]}>
        <Text>{groupConsult.getSumHierarchy(groupConsult.calcCurrentQuater(newDate, newDate.year()), groupConsult.calcPersonalMonth(newDate.month() + 1, newDate.year()))}</Text>
      </View>
      <View style={[lifePathDialogs.item, lifePathDialogs.left]}>
        <Text>{groupConsult.calcCurrentQuater(newDate, newDate.year())}</Text>
      </View>
      <View style={[lifePathDialogs.item, lifePathDialogs.right]}>
        <Text>{groupConsult.calcPersonalMonth(newDate.month() + 1, newDate.year())}</Text>
      </View>
      <View style={[lifePathDialogs.item, lifePathDialogs.bottom]}>
        <Text>{groupConsult.getResHierarchy(groupConsult.calcCurrentQuater(newDate, newDate.year()), groupConsult.calcPersonalMonth(newDate.month() + 1, newDate.year()))}</Text>
      </View>
    </View>
    <View style={[lifePathDialogs.wrap, lifePathDialogs.wrap_5]}>
      <View style={[lifePathDialogs.item, lifePathDialogs.top]}>
        <Text>{groupConsult.getSumHierarchy(groupConsult.calcPersonalMonth(newDate.month() + 1, newDate.year()), groupConsult.calcPersonalWeek(newDate.date(), newDate.month() + 1, newDate.year()))}</Text>
      </View>
      <View style={[lifePathDialogs.item, lifePathDialogs.left]}>
        <Text>{groupConsult.calcPersonalMonth(newDate.month() + 1, newDate.year())}</Text>
      </View>
      <View style={[lifePathDialogs.item, lifePathDialogs.right]}>
        <Text>{groupConsult.calcPersonalWeek(newDate.date(), newDate.month() + 1, newDate.year())}</Text>
      </View>
      <View style={[lifePathDialogs.item, lifePathDialogs.bottom]}>
        <Text>{groupConsult.getResHierarchy(groupConsult.calcPersonalMonth(newDate.month() + 1, newDate.year()), groupConsult.calcPersonalWeek(newDate.date(), newDate.month() + 1, newDate.year()))}</Text>
      </View>
    </View>
  </View>
);
export const lifePathDialogs = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '515px',
    left: '11px',
    fontSize: '7px',
    width: '531px',
    backgroundColor: 'red',
  },
  wrap: {
    position: 'relative',
    backgroundColor: 'red',
    width: 106,
  },
  item: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '20px',
    height: '20px',
    fontSize: '11px',
  },
  top: {
    top: '25px',
    left: '43px',
  },
  left: {
    top: '46px',
    left: '20px',
  },
  right: {
    top: '46px',
    left: '65px',
  },
  bottom: {
    top: '70px',
    left: '43px',
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
});
