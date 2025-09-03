import React from 'react';
import { Text, View, Image, StyleSheet } from '@react-pdf/renderer';


export const MonthCircle: React.FC<{ consultant, newDate }> = ({ consultant, newDate }) => {
  const currentMonth = newDate.month() + 1
  const months = consultant.getAllMonths()
  const nameOfMonth = months[currentMonth - 1]
  return (
    <View style={circle.container}>
      <View style={[circle.body, circle.wrap]}>
          <Text style={[circle.font, { top: 25, left: 180 }]}>{consultant.calcSelectPersonalWeek(currentMonth, 4, newDate.year())}{consultant.calcSelectPersonalWeekISK(currentMonth, 4, newDate.year())}</Text>
          <Text style={[circle.font, { top: 50, left: 190 }]}>{consultant.calcSelectPersonalWeek(currentMonth, 3, newDate.year())}{consultant.calcSelectPersonalWeekISK(currentMonth, 3, newDate.year())}</Text>
          <Text style={[circle.font, { top: 80, left: 195 }]}>{consultant.calcSelectPersonalWeek(currentMonth, 2, newDate.year())}{consultant.calcSelectPersonalWeekISK(currentMonth, 2, newDate.year())}</Text>
          <Text style={[circle.font, { top: 110, left: 200 }]}>{consultant.calcSelectPersonalWeek(currentMonth, 1, newDate.year())}{consultant.calcSelectPersonalWeekISK(currentMonth, 1, newDate.year())}</Text>
          <Text style={[circle.font, { top: 85, left: 110 }]}>{consultant.calcPersonalMonth(currentMonth, newDate.year())}{consultant.calcPersonalMonthISK(currentMonth, newDate.year())} / {consultant.calcUniversalMonth(currentMonth, newDate.year())}{consultant.calcUniversalMonthISK(currentMonth, newDate.year())}</Text>
          <Text style={[circle.font, { top: 110, left: 50 }]}>{consultant.getQuaterMonth(currentMonth, newDate.year())}</Text>
          <Text style={[circle.font, circle.fontName]}>{nameOfMonth.toUpperCase().substr(0, 3)}</Text>
      </View>
    </View>
  )
}

export const circle = StyleSheet.create({
  container: {
    position: 'absolute'
  },
  wrap: {
    position: 'relative'
  },
  body: {
    width: '250px',
    top: '470px',
    left: '100px'
  },
  font: {
    fontSize: '14px',
    position: 'absolute'
  },
  fontName: {
    transform: 'rotate(78)',
    color: '#fff',
    top: 95,
    left: 70,
    fontWeight: 700
  }
})