import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

export const SynastryEnergy: React.FC<{ synastry, newDate }> = ({ synastry, newDate }) => {
  const currentYear = newDate.year();
  const currentMonth = newDate.month() + 1;
  const currentDay = newDate.date();

  return (
    <View style={energy.container}>
      <View>
        <Text style={[energy.text, { top: 30, left: 30 }]}>
          {synastry.getLifeStage(currentYear)}
          {synastry.getLifeStageISK(currentYear)}
        </Text>
      </View>
      <View>
        <Text style={[energy.text, { top: 35, left: 85 }]}>
          {synastry.calcPersonalYear(currentYear)}
          {synastry.calcPersonalYearISK(currentYear)}
        </Text>
      </View>
      <View>
        <Text style={[energy.text, { top: 40, left: 140 }]}>
          {synastry.calcCurrentQuater(newDate, currentYear)}
          {synastry.calcCurrentQuaterISK(newDate, currentYear)}
        </Text>
      </View>
      <View>
        <Text style={[energy.text, { top: 50, left: 200 }]}>
          {synastry.calcPersonalMonth(currentMonth, currentYear)}
          {synastry.calcPersonalMonthISK(currentMonth, currentYear)}
        </Text>
      </View>
      <View>
        <Text style={[energy.text, { top: 65, left: 255 }]}>
          {synastry.calcPersonalWeek(currentDay, currentMonth, currentYear)}
          {synastry.calcPersonalWeekISK(currentDay, currentMonth, currentYear)}
        </Text>
      </View>
      <View>
        <Text style={[energy.text, { top: 75, left: 320 }]}>
          {synastry.calcPersonalDay(currentDay, currentMonth, currentYear)}
          {synastry.calcPersonalDayISK(currentDay, currentMonth, currentYear)}
        </Text>
      </View>

    </View>
  );
};
export const energy = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '150px',
    left: '15px',
    width: '356px',
  },
  text: {
    position: 'absolute',
    fontSize: '12px',
  },
});
