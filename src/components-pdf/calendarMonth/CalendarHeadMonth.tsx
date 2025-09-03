import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';


export const CalendarHeadMonth: React.FC<{ consultant, newDate }> = ({ consultant, newDate }) => {
  return (
    <View style={calendar.container}>

        <View style={calendar.head}><Text style={calendar.year}>{newDate.year()}</Text></View>
        <View style={calendar.head}><Text style={calendar.persYear}>{consultant.calcPersonalYear(newDate.year())}{consultant.calcPersonalYearISK(newDate.year())}</Text></View>
        <View style={calendar.head}><Text style={calendar.univYear}>{consultant.calcUniversalYear(newDate.year())}{consultant.calcUniversalYearISK(newDate.year())}</Text></View>

    </View>
  )
}

export const calendar = StyleSheet.create({
  container: {
    position: 'absolute',
  },
  head: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute'
  },
  year: {
    top: '45px',
    left: '100px'
  },
  month: {
    top: '10px',
    left: '50px',
    color: '#000'
  },
  persYear: {
    width: '30px',
    top: '45px',
    left: '240px',
    fontSize: '12px'
  },
  univYear: {
    width: '30px',
    top: '45px',
    left: '300px',
    fontSize: '12px'
  }
})