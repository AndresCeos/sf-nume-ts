import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

export const GroupEnergy: React.FC<{ groupConsult, newDate }> = ({ groupConsult, newDate }) => {
  const currentYear = newDate.year();
  const currentMonth = newDate.month() + 1;
  const currentDay = newDate.date();

  return (
    <View style={energy.container}>
      <View>
        <Text style={[energy.text, { top: 30, left: 30 }]}>
          {groupConsult.getLifeStage(currentYear)}
          {groupConsult.getLifeStageISK(currentYear)}
        </Text>
      </View>
      <View>
        <Text style={[energy.text, { top: 35, left: 85 }]}>
          {groupConsult.calcPersonalYear(currentYear)}
          {groupConsult.calcPersonalYearISK(currentYear)}
        </Text>
      </View>
      <View>
        <Text style={[energy.text, { top: 40, left: 140 }]}>
          {groupConsult.calcCurrentQuater(newDate, currentYear)}
          {groupConsult.calcCurrentQuaterISK(newDate, currentYear)}
        </Text>
      </View>
      <View>
        <Text style={[energy.text, { top: 50, left: 200 }]}>
          {groupConsult.calcPersonalMonth(currentMonth, currentYear)}
          {groupConsult.calcPersonalMonthISK(currentMonth, currentYear)}
        </Text>
      </View>
      <View>
        <Text style={[energy.text, { top: 65, left: 255 }]}>
          {groupConsult.calcPersonalWeek(currentDay, currentMonth, currentYear)}
          {groupConsult.calcPersonalWeekISK(currentDay, currentMonth, currentYear)}
        </Text>
      </View>
      <View>
        <Text style={[energy.text, { top: 75, left: 320 }]}>
          {groupConsult.calcPersonalDay(currentDay, currentMonth, currentYear)}
          {groupConsult.calcPersonalDayISK(currentDay, currentMonth, currentYear)}
        </Text>
      </View>

    </View>
  );
};
export const energy = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '260px',
    left: '15px',
    width: '356px',
  },
  text: {
    position: 'absolute',
    fontSize: '12px',
  },
});
