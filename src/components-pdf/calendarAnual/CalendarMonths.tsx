import { StyleSheet, Text, View } from '@react-pdf/renderer';
import React from 'react';


export const CalendarMonths: React.FC<{ consultant, newDate }> = ({ consultant, newDate }) => {
  const enero = consultant.getAllDaysInMonth(1, newDate.year())
  const febrero = consultant.getAllDaysInMonth(2, newDate.year())
  const marzo = consultant.getAllDaysInMonth(3, newDate.year())
  const abril = consultant.getAllDaysInMonth(4, newDate.year())
  const mayo = consultant.getAllDaysInMonth(5, newDate.year())
  const junio = consultant.getAllDaysInMonth(6, newDate.year())
  const julio = consultant.getAllDaysInMonth(7, newDate.year())
  const agosto = consultant.getAllDaysInMonth(8, newDate.year())

  let sem1 = false
  let sem2 = false
  let sem3 = false
  let sem4 = false
  if (newDate.date() >= 1 && newDate.date() <= 7) { sem1 = true }
  if (newDate.date() >= 8 && newDate.date() <= 14) { sem2 = true }
  if (newDate.date() >= 15 && newDate.date() <= 21) { sem3 = true }
  if (newDate.date() >= 22) { sem4 = true }
  console.log(sem1);
  console.log(sem2);
  console.log(sem3);
  console.log(sem4);


  const now = new Date()
  const DaysOfTheWeek: React.FC<{ month }> = ({ month }) => {
    const daysCustom = consultant.getDaysOfWeekCustom(month, newDate.year())
    return (
      <>
        {daysCustom.map((day, index) =>
        <View key={index} style={calendar.daysofWeek}><Text>{day[0]}</Text></View>)}
      </>
    )
  }
  const MonthsInDay: React.FC<{ month }> = ({ month }) => {
    const mes = consultant.getAllDaysInMonth(month, newDate.year())
    const semOne = mes.slice(0, 7)
    const semTwo = mes.slice(7, 14)
    const semThr = mes.slice(14, 21)
    const semFou = mes.slice(21, 28)
    const semFive = mes.slice(28)

    return (
      <>
          <View style={calendar.daysRow}>
            {semOne.map((day, index) => (
              <View style={[calendar.example, { backgroundColor: `${(day === newDate.date() && month === newDate.month() + 1) ? '#C77575' : ((sem1 === true) && month === newDate.month() + 1) ? '#DCA8A9' : (month === newDate.month() + 1) ? '#FBEDD9' : ''}` }]}>
                <Text style={[calendar.days, { color: `${(day === newDate.date() && month === newDate.month() + 1) ? '#fff' : ''}` }]}>{day}</Text>
                <Text style={[calendar.calcDays, { color: `${(day === newDate.date() && month === newDate.month() + 1) ? '#fff' : ''}` }]}>{consultant.calcPersonalDay(day, month, newDate.year())}{consultant.calcPersonalDayISK(day, month, newDate.year())}/{consultant.calcUniversalDay(day, month, newDate.year())}{consultant.calcUniversalDayISK(day, month, newDate.year())}</Text>
              </View>
            ))}
          </View>
          <View style={calendar.daysRow}>
            {semTwo.map((day, index) => (
              <View style={[calendar.example, { backgroundColor: `${(day === newDate.date() && month === newDate.month() + 1) ? '#C77575' : ((sem2 === true) && month === newDate.month() + 1) ? '#DCA8A9' : (month === newDate.month() + 1) ? '#FBEDD9' : ''}` }]}>
                <Text style={[calendar.days, { color: `${(day === newDate.date() && month === newDate.month() + 1) ? '#fff' : ''}` }]}>{day}</Text>
                <Text style={[calendar.calcDays, { color: `${(day === newDate.date() && month === newDate.month() + 1) ? '#fff' : ''}` }]}>{consultant.calcPersonalDay(day, month, newDate.year())}{consultant.calcPersonalDayISK(day, month, newDate.year())}/{consultant.calcUniversalDay(day, month, newDate.year())}{consultant.calcUniversalDayISK(day, month, newDate.year())}</Text>
              </View>
            ))}
          </View>
          <View style={calendar.daysRow}>
          {semThr.map((day, index) => (
          <View style={[calendar.example, { backgroundColor: `${(day === newDate.date() && month === newDate.month() + 1) ? '#C77575' : (sem3 === true && month === newDate.month() + 1) ? '#DCA8A9' : (month === newDate.month() + 1) ? '#FBEDD9' : ''}` }]}>
            <Text style={[calendar.days, { color: `${(day === newDate.date() && month === newDate.month() + 1) ? '#fff' : ''}` }]}>{day}</Text>
            <Text style={[calendar.calcDays, { color: `${(day === newDate.date() && month === newDate.month() + 1) ? '#fff' : ''}` }]}>{consultant.calcPersonalDay(day, month, newDate.year())}{consultant.calcPersonalDayISK(day, month, newDate.year())}/{consultant.calcUniversalDay(day, month, newDate.year())}{consultant.calcUniversalDayISK(day, month, newDate.year())}</Text>
          </View>
        ))}
          </View>
          <View style={calendar.daysRow}>
          {semFou.map((day, index) => (
          <View style={[calendar.example, { backgroundColor: `${(day === newDate.date() && month === newDate.month() + 1) ? '#C77575' : ((sem4 == true) && month === newDate.month() + 1) ? '#DCA8A9' : (month === newDate.month() + 1) ? '#FBEDD9' : ''}` }]}>
            <Text style={[calendar.days, { color: `${(day === newDate.date() && month === newDate.month() + 1) ? '#fff' : ''}` }]}>{day}</Text>
            <Text style={[calendar.calcDays, { color: `${(day === newDate.date() && month === newDate.month() + 1) ? '#fff' : ''}` }]}>{consultant.calcPersonalDay(day, month, newDate.year())}{consultant.calcPersonalDayISK(day, month, newDate.year())}/{consultant.calcUniversalDay(day, month, newDate.year())}{consultant.calcUniversalDayISK(day, month, newDate.year())}</Text>
          </View>
        ))}
          </View>
          <View style={calendar.daysRow}>
          {semFive.map((day, index) => (
          <View style={[calendar.example, { backgroundColor: `${(day === newDate.date() && month === newDate.month() + 1) ? '#C77575' : ((sem4 == true) && month === newDate.month() + 1) ? '#DCA8A9' : (month === newDate.month() + 1) ? '#FBEDD9' : ''}` }]}>
            <Text style={[calendar.days, { color: `${(day === newDate.date() && month === newDate.month() + 1) ? '#fff' : ''}` }]}>{day}</Text>
            <Text style={[calendar.calcDays, { color: `${(day === newDate.date() && month === newDate.month() + 1) ? '#fff' : ''}` }]}>{consultant.calcPersonalDay(day, month, newDate.year())}{consultant.calcPersonalDayISK(day, month, newDate.year())}/{consultant.calcUniversalDay(day, month, newDate.year())}{consultant.calcUniversalDayISK(day, month, newDate.year())}</Text>
          </View>
        ))}
          </View>
      </>
    )
  }
  const allMonths = consultant.getAllMonths()


  return (
    <View style={calendar.container}>
      {/* daysInMonth.map((day) =>
        <View>
          <Text>{day}</Text>
        </View>
        ) */}
        <View style={[calendar.wrap, calendar.wrap1]}>
          <View style={calendar.head}><Text style={calendar.headMonth}>{allMonths[0]} {consultant.calcPersonalMonth(1, newDate.year())}{consultant.calcPersonalMonthISK(1, newDate.year())}/{consultant.calcUniversalMonth(1, newDate.year())}{consultant.calcUniversalMonthISK(1, newDate.year())}</Text></View>
          <View style={calendar.head}><Text style={calendar.headQuater}>Cuatrimestre: {consultant.getQuaterMonth(1, newDate.year())}{consultant.getQuaterMonthISK(1, newDate.year())}</Text></View>
            <View style={[calendar.week1, { backgroundColor: `${(sem1 === true && newDate.month() + 1 === 1) ? '#DCA8A9' : ''}` }]}>
              <Text style={calendar.weektext}>1a Sem</Text>
              <Text style={[calendar.weektext, { fontWeight: 'bold' }]}>{consultant.calcSelectPersonalWeek(1, 1, newDate.year())}{consultant.calcSelectPersonalWeekISK(1, 1, newDate.year())}/{consultant.calcUniversalWeek(1, 1, newDate.year())}{consultant.calcUniversalWeekISK(1, 1, newDate.year())}</Text>
            </View>
            <View style={[calendar.week2, { backgroundColor: `${(sem2 === true && newDate.month() + 1 === 1) ? '#DCA8A9' : ''}` }]}>
              <Text style={calendar.weektext}>2a Sem</Text>
              <Text style={[calendar.weektext, { fontWeight: 'bold' }]}>{consultant.calcSelectPersonalWeek(1, 2, newDate.year())}{consultant.calcSelectPersonalWeekISK(1, 2, newDate.year())}/{consultant.calcUniversalWeek(1, 2, newDate.year())}{consultant.calcUniversalWeekISK(1, 2, newDate.year())}</Text>
            </View>
            <View style={[calendar.week3, { backgroundColor: `${(sem3 === true && newDate.month() + 1 === 1) ? '#DCA8A9' : ''}` }]}>
              <Text style={calendar.weektext}>3a Sem</Text>
              <Text style={[calendar.weektext, { fontWeight: 'bold' }]}>{consultant.calcSelectPersonalWeek(1, 3, newDate.year())}{consultant.calcSelectPersonalWeekISK(1, 3, newDate.year())}/{consultant.calcUniversalWeek(1, 3, newDate.year())}{consultant.calcUniversalWeekISK(1, 3, newDate.year())}</Text>
            </View>
            <View style={[calendar.week4, { backgroundColor: `${(sem4 === true && newDate.month() + 1 === 1) ? '#DCA8A9' : ''}` }]}>
              <Text style={calendar.weektext}>4a Sem</Text>
              <Text style={[calendar.weektext, { fontWeight: 'bold' }]}>{consultant.calcSelectPersonalWeek(1, 4, newDate.year())}{consultant.calcSelectPersonalWeekISK(1, 4, newDate.year())}/{consultant.calcUniversalWeek(1, 4, newDate.year())}{consultant.calcUniversalWeekISK(1, 4, newDate.year())}</Text>
            </View>
            {enero.length > 28
            ? (
<View style={[calendar.week5, { backgroundColor: `${(sem4 === true && newDate.month() + 1 === 1) ? '#DCA8A9' : ''}` }]}>
              <Text style={calendar.weektext}>4a Sem</Text>
              <Text style={[calendar.weektext, { fontWeight: 'bold' }]}>{consultant.calcSelectPersonalWeek(1, 4, newDate.year())}{consultant.calcSelectPersonalWeekISK(1, 4, newDate.year())}/{consultant.calcUniversalWeek(1, 4, newDate.year())}{consultant.calcUniversalWeekISK(1, 4, newDate.year())}</Text>
</View>
) : ''}
            <View style={calendar.daysWeek}>
              <DaysOfTheWeek month={1} />
            </View>
            <View style={calendar.daysContainer}>
              <MonthsInDay month={1} />
            </View>

        </View>

        <View style={[calendar.wrap, calendar.wrap2]}>
          <View style={calendar.head}><Text style={calendar.headMonth}>{allMonths[1]} {consultant.calcPersonalMonth(2, newDate.year())}{consultant.calcPersonalMonthISK(2, newDate.year())}/{consultant.calcUniversalMonth(2, newDate.year())}{consultant.calcUniversalMonthISK(2, newDate.year())}</Text></View>
          <View style={calendar.head}><Text style={calendar.headQuater}>Cuatrimestre: {consultant.getQuaterMonth(2, newDate.year())}{consultant.getQuaterMonthISK(2, newDate.year())}</Text></View>
          <View style={[calendar.week1, { backgroundColor: `${(sem1 === true && newDate.month() + 1 === 2) ? '#DCA8A9' : ''}` }]}>
            <Text style={calendar.weektext}>1a Sem</Text>
            <Text style={[calendar.weektext, { fontWeight: 'bold' }]}>{consultant.calcSelectPersonalWeek(2, 1, newDate.year())}{consultant.calcSelectPersonalWeekISK(2, 1, newDate.year())}/{consultant.calcUniversalWeek(2, 1, newDate.year())}{consultant.calcUniversalWeekISK(2, 1, newDate.year())}</Text>
          </View>
          <View style={[calendar.week2, { backgroundColor: `${(sem2 === true && newDate.month() + 1 === 2) ? '#DCA8A9' : ''}` }]}>
            <Text style={calendar.weektext}>2a Sem</Text>
            <Text style={[calendar.weektext, { fontWeight: 'bold' }]}>{consultant.calcSelectPersonalWeek(2, 2, newDate.year())}{consultant.calcSelectPersonalWeekISK(2, 2, newDate.year())}/{consultant.calcUniversalWeek(2, 2, newDate.year())}{consultant.calcUniversalWeekISK(2, 2, newDate.year())}</Text>
          </View>
          <View style={[calendar.week3, { backgroundColor: `${(sem3 === true && newDate.month() + 1 === 2) ? '#DCA8A9' : ''}` }]}>
            <Text style={calendar.weektext}>3a Sem</Text>
            <Text style={[calendar.weektext, { fontWeight: 'bold' }]}>{consultant.calcSelectPersonalWeek(2, 3, newDate.year())}{consultant.calcSelectPersonalWeekISK(2, 3, newDate.year())}/{consultant.calcUniversalWeek(2, 3, newDate.year())}{consultant.calcUniversalWeekISK(2, 3, newDate.year())}</Text>
          </View>
          <View style={[calendar.week4, { backgroundColor: `${(sem4 === true && newDate.month() + 1 === 2) ? '#DCA8A9' : ''}` }]}>
            <Text style={calendar.weektext}>4a Sem</Text>
            <Text style={[calendar.weektext, { fontWeight: 'bold' }]}>{consultant.calcSelectPersonalWeek(2, 4, newDate.year())}{consultant.calcSelectPersonalWeekISK(2, 4, newDate.year())}/{consultant.calcUniversalWeek(2, 4, newDate.year())}{consultant.calcUniversalWeekISK(2, 4, newDate.year())}</Text>
          </View>
          {febrero.length > 28
          ? (
<View style={[calendar.week5, { backgroundColor: `${(sem4 === true && newDate.month() + 1 === 2) ? '#DCA8A9' : ''}` }]}>
            <Text style={calendar.weektext}>4a Sem</Text>
            <Text style={[calendar.weektext, { fontWeight: 'bold' }]}>{consultant.calcSelectPersonalWeek(2, 4, newDate.year())}{consultant.calcSelectPersonalWeekISK(2, 4, newDate.year())}/{consultant.calcUniversalWeek(2, 4, newDate.year())}{consultant.calcUniversalWeekISK(2, 4, newDate.year())}</Text>
</View>
) : ''}
            <View style={calendar.daysWeek}>
              <DaysOfTheWeek month={2} />
            </View>
            <View style={calendar.daysContainer}>
              <MonthsInDay month={2} />
            </View>
        </View>

        <View style={[calendar.wrap, calendar.wrap3]}>
          <View style={calendar.head}><Text style={calendar.headMonth}>{allMonths[2]} {consultant.calcPersonalMonth(3, newDate.year())}{consultant.calcPersonalMonthISK(3, newDate.year())}/{consultant.calcUniversalMonth(3, newDate.year())}{consultant.calcUniversalMonthISK(3, newDate.year())}</Text></View>
          <View style={calendar.head}><Text style={calendar.headQuater}>Cuatrimestre: {consultant.getQuaterMonth(3, newDate.year())}{consultant.getQuaterMonthISK(3, newDate.year())}</Text></View>
          <View style={[calendar.week1, { backgroundColor: `${(sem1 === true && newDate.month() + 1 === 3) ? '#DCA8A9' : ''}` }]}>
            <Text style={calendar.weektext}>1a Sem</Text>
            <Text style={[calendar.weektext, { fontWeight: 'bold' }]}>{consultant.calcSelectPersonalWeek(3, 1, newDate.year())}{consultant.calcSelectPersonalWeekISK(3, 1, newDate.year())}/{consultant.calcUniversalWeek(3, 1, newDate.year())}{consultant.calcUniversalWeekISK(3, 1, newDate.year())}</Text>
          </View>
          <View style={[calendar.week2, { backgroundColor: `${(sem2 === true && newDate.month() + 1 === 3) ? '#DCA8A9' : ''}` }]}>
            <Text style={calendar.weektext}>2a Sem</Text>
            <Text style={[calendar.weektext, { fontWeight: 'bold' }]}>{consultant.calcSelectPersonalWeek(3, 2, newDate.year())}{consultant.calcSelectPersonalWeekISK(3, 2, newDate.year())}/{consultant.calcUniversalWeek(3, 2, newDate.year())}{consultant.calcUniversalWeekISK(3, 2, newDate.year())}</Text>
          </View>
          <View style={[calendar.week3, { backgroundColor: `${(sem3 === true && newDate.month() + 1 === 3) ? '#DCA8A9' : ''}` }]}>
            <Text style={calendar.weektext}>3a Sem</Text>
            <Text style={[calendar.weektext, { fontWeight: 'bold' }]}>{consultant.calcSelectPersonalWeek(3, 3, newDate.year())}{consultant.calcSelectPersonalWeekISK(3, 3, newDate.year())}/{consultant.calcUniversalWeek(3, 3, newDate.year())}{consultant.calcUniversalWeekISK(3, 3, newDate.year())}</Text>
          </View>
          <View style={[calendar.week4, { backgroundColor: `${(sem4 === true && newDate.month() + 1 === 3) ? '#DCA8A9' : ''}` }]}>
            <Text style={calendar.weektext}>4a Sem</Text>
            <Text style={[calendar.weektext, { fontWeight: 'bold' }]}>{consultant.calcSelectPersonalWeek(3, 4, newDate.year())}{consultant.calcSelectPersonalWeekISK(3, 4, newDate.year())}/{consultant.calcUniversalWeek(3, 4, newDate.year())}{consultant.calcUniversalWeekISK(3, 4, newDate.year())}</Text>
          </View>
          {marzo.length > 28
          ? (
<View style={[calendar.week5, { backgroundColor: `${(sem4 === true && newDate.month() + 1 === 3) ? '#DCA8A9' : ''}` }]}>
            <Text style={calendar.weektext}>4a Sem</Text>
            <Text style={[calendar.weektext, { fontWeight: 'bold' }]}>{consultant.calcSelectPersonalWeek(3, 4, newDate.year())}{consultant.calcSelectPersonalWeekISK(3, 4, newDate.year())}/{consultant.calcUniversalWeek(3, 4, newDate.year())}{consultant.calcUniversalWeekISK(3, 4, newDate.year())}</Text>
</View>
) : ''}
          <View style={calendar.daysWeek}>
              <DaysOfTheWeek month={3} />
          </View>
            <View style={calendar.daysContainer}>
              <MonthsInDay month={3} />
            </View>
        </View>

        <View style={[calendar.wrap, calendar.wrap4]}>
          <View style={calendar.head}><Text style={calendar.headMonth}>{allMonths[3]} {consultant.calcPersonalMonth(4, newDate.year())}{consultant.calcPersonalMonthISK(4, newDate.year())}/{consultant.calcUniversalMonth(4, newDate.year())}{consultant.calcUniversalMonthISK(4, newDate.year())}</Text></View>
          <View style={calendar.head}><Text style={calendar.headQuater}>Cuatrimestre: {consultant.getQuaterMonth(4, newDate.year())}{consultant.getQuaterMonthISK(4, newDate.year())}</Text></View>
          <View style={[calendar.week1, { backgroundColor: `${(sem1 === true && newDate.month() + 1 === 4) ? '#DCA8A9' : ''}` }]}>
            <Text style={calendar.weektext}>1a Sem</Text>
            <Text style={[calendar.weektext, { fontWeight: 'bold' }]}>{consultant.calcSelectPersonalWeek(4, 1, newDate.year())}{consultant.calcSelectPersonalWeekISK(4, 1, newDate.year())}/{consultant.calcUniversalWeek(4, 1, newDate.year())}{consultant.calcUniversalWeekISK(4, 1, newDate.year())}</Text>
          </View>
          <View style={[calendar.week2, { backgroundColor: `${(sem2 === true && newDate.month() + 1 === 4) ? '#DCA8A9' : ''}` }]}>
            <Text style={calendar.weektext}>2a Sem</Text>
            <Text style={[calendar.weektext, { fontWeight: 'bold' }]}>{consultant.calcSelectPersonalWeek(4, 2, newDate.year())}{consultant.calcSelectPersonalWeekISK(4, 2, newDate.year())}/{consultant.calcUniversalWeek(4, 2, newDate.year())}{consultant.calcUniversalWeekISK(4, 2, newDate.year())}</Text>
          </View>
          <View style={[calendar.week3, { backgroundColor: `${(sem3 === true && newDate.month() + 1 === 4) ? '#DCA8A9' : ''}` }]}>
            <Text style={calendar.weektext}>3a Sem</Text>
            <Text style={[calendar.weektext, { fontWeight: 'bold' }]}>{consultant.calcSelectPersonalWeek(4, 3, newDate.year())}{consultant.calcSelectPersonalWeekISK(4, 3, newDate.year())}/{consultant.calcUniversalWeek(4, 3, newDate.year())}{consultant.calcUniversalWeekISK(4, 3, newDate.year())}</Text>
          </View>
          <View style={[calendar.week4, { backgroundColor: `${(sem4 === true && newDate.month() + 1 === 4) ? '#DCA8A9' : ''}` }]}>
            <Text style={calendar.weektext}>4a Sem</Text>
            <Text style={[calendar.weektext, { fontWeight: 'bold' }]}>{consultant.calcSelectPersonalWeek(4, 4, newDate.year())}{consultant.calcSelectPersonalWeekISK(4, 4, newDate.year())}/{consultant.calcUniversalWeek(4, 4, newDate.year())}{consultant.calcUniversalWeekISK(4, 4, newDate.year())}</Text>
          </View>
          {abril.length > 28
          ? (
<View style={[calendar.week5, { backgroundColor: `${(sem4 === true && newDate.month() + 1 === 4) ? '#DCA8A9' : ''}` }]}>
            <Text style={calendar.weektext}>4a Sem</Text>
            <Text style={[calendar.weektext, { fontWeight: 'bold' }]}>{consultant.calcSelectPersonalWeek(4, 4, newDate.year())}{consultant.calcSelectPersonalWeekISK(4, 4, newDate.year())}/{consultant.calcUniversalWeek(4, 4, newDate.year())}{consultant.calcUniversalWeekISK(4, 4, newDate.year())}</Text>
</View>
) : ''}
          <View style={calendar.daysWeek}>
              <DaysOfTheWeek month={4} />
          </View>
            <View style={calendar.daysContainer}>
              <MonthsInDay month={4} />
            </View>
        </View>

        <View style={[calendar.wrap, calendar.wrap5]}>
          <View style={calendar.head}><Text style={calendar.headMonth}>{allMonths[4]} {consultant.calcPersonalMonth(5, newDate.year())}{consultant.calcPersonalMonthISK(5, newDate.year())}/{consultant.calcUniversalMonth(5, newDate.year())}{consultant.calcUniversalMonthISK(5, newDate.year())}</Text></View>
          <View style={calendar.head}><Text style={calendar.headQuater}>Cuatrimestre: {consultant.getQuaterMonth(5, newDate.year())}{consultant.getQuaterMonthISK(5, newDate.year())}</Text></View>
          <View style={[calendar.week1, { backgroundColor: `${(sem1 === true && newDate.month() + 1 === 5) ? '#DCA8A9' : ''}` }]}>
            <Text style={calendar.weektext}>1a Sem</Text>
            <Text style={[calendar.weektext, { fontWeight: 'bold' }]}>{consultant.calcSelectPersonalWeek(5, 1, newDate.year())}{consultant.calcSelectPersonalWeekISK(5, 1, newDate.year())}/{consultant.calcUniversalWeek(5, 1, newDate.year())}{consultant.calcUniversalWeekISK(5, 1, newDate.year())}</Text>
          </View>
          <View style={[calendar.week2, { backgroundColor: `${(sem2 === true && newDate.month() + 1 === 5) ? '#DCA8A9' : ''}` }]}>
            <Text style={calendar.weektext}>2a Sem</Text>
            <Text style={[calendar.weektext, { fontWeight: 'bold' }]}>{consultant.calcSelectPersonalWeek(5, 2, newDate.year())}{consultant.calcSelectPersonalWeekISK(5, 2, newDate.year())}/{consultant.calcUniversalWeek(5, 2, newDate.year())}{consultant.calcUniversalWeekISK(5, 2, newDate.year())}</Text>
          </View>
          <View style={[calendar.week3, { backgroundColor: `${(sem3 === true && newDate.month() + 1 === 5) ? '#DCA8A9' : ''}` }]}>
            <Text style={calendar.weektext}>3a Sem</Text>
            <Text style={[calendar.weektext, { fontWeight: 'bold' }]}>{consultant.calcSelectPersonalWeek(5, 3, newDate.year())}{consultant.calcSelectPersonalWeekISK(5, 3, newDate.year())}/{consultant.calcUniversalWeek(5, 3, newDate.year())}{consultant.calcUniversalWeekISK(5, 3, newDate.year())}</Text>
          </View>
          <View style={[calendar.week4, { backgroundColor: `${(sem4 === true && newDate.month() + 1 === 5) ? '#DCA8A9' : ''}` }]}>
            <Text style={calendar.weektext}>4a Sem</Text>
            <Text style={[calendar.weektext, { fontWeight: 'bold' }]}>{consultant.calcSelectPersonalWeek(5, 4, newDate.year())}{consultant.calcSelectPersonalWeekISK(5, 4, newDate.year())}/{consultant.calcUniversalWeek(5, 4, newDate.year())}{consultant.calcUniversalWeekISK(5, 4, newDate.year())}</Text>
          </View>
          {mayo.length > 28
          ? (
<View style={[calendar.week5, { backgroundColor: `${(sem4 === true && newDate.month() + 1 === 5) ? '#DCA8A9' : ''}` }]}>
            <Text style={calendar.weektext}>4a Sem</Text>
            <Text style={[calendar.weektext, { fontWeight: 'bold' }]}>{consultant.calcSelectPersonalWeek(5, 4, newDate.year())}{consultant.calcSelectPersonalWeekISK(5, 4, newDate.year())}/{consultant.calcUniversalWeek(5, 4, newDate.year())}{consultant.calcUniversalWeekISK(5, 4, newDate.year())}</Text>
</View>
) : ''}
          <View style={calendar.daysWeek}>
              <DaysOfTheWeek month={5} />
          </View>
            <View style={calendar.daysContainer}>
              <MonthsInDay month={5} />
            </View>
        </View>

        <View style={[calendar.wrap, calendar.wrap6]}>
          <View style={calendar.head}><Text style={calendar.headMonth}>{allMonths[5]} {consultant.calcPersonalMonth(6, newDate.year())}{consultant.calcPersonalMonthISK(6, newDate.year())}/{consultant.calcUniversalMonth(6, newDate.year())}{consultant.calcUniversalMonthISK(6, newDate.year())}</Text></View>
          <View style={calendar.head}><Text style={calendar.headQuater}>Cuatrimestre: {consultant.getQuaterMonth(6, newDate.year())}{consultant.getQuaterMonthISK(6, newDate.year())}</Text></View>
          <View style={[calendar.week1, { backgroundColor: `${(sem1 === true && newDate.month() + 1 === 6) ? '#DCA8A9' : ''}` }]}>
            <Text style={calendar.weektext}>1a Sem</Text>
            <Text style={[calendar.weektext, { fontWeight: 'bold' }]}>{consultant.calcSelectPersonalWeek(6, 1, newDate.year())}{consultant.calcSelectPersonalWeekISK(6, 1, newDate.year())}/{consultant.calcUniversalWeek(6, 1, newDate.year())}{consultant.calcUniversalWeekISK(6, 1, newDate.year())}</Text>
          </View>
          <View style={[calendar.week2, { backgroundColor: `${(sem2 === true && newDate.month() + 1 === 6) ? '#DCA8A9' : ''}` }]}>
            <Text style={calendar.weektext}>2a Sem</Text>
            <Text style={[calendar.weektext, { fontWeight: 'bold' }]}>{consultant.calcSelectPersonalWeek(6, 2, newDate.year())}{consultant.calcSelectPersonalWeekISK(6, 2, newDate.year())}/{consultant.calcUniversalWeek(6, 2, newDate.year())}{consultant.calcUniversalWeekISK(6, 2, newDate.year())}</Text>
          </View>
          <View style={[calendar.week3, { backgroundColor: `${(sem3 === true && newDate.month() + 1 === 6) ? '#DCA8A9' : ''}` }]}>
            <Text style={calendar.weektext}>3a Sem</Text>
            <Text style={[calendar.weektext, { fontWeight: 'bold' }]}>{consultant.calcSelectPersonalWeek(6, 3, newDate.year())}{consultant.calcSelectPersonalWeekISK(6, 3, newDate.year())}/{consultant.calcUniversalWeek(6, 3, newDate.year())}{consultant.calcUniversalWeekISK(6, 3, newDate.year())}</Text>
          </View>
          <View style={[calendar.week4, { backgroundColor: `${(sem4 === true && newDate.month() + 1 === 6) ? '#DCA8A9' : ''}` }]}>
            <Text style={calendar.weektext}>4a Sem</Text>
            <Text style={[calendar.weektext, { fontWeight: 'bold' }]}>{consultant.calcSelectPersonalWeek(6, 4, newDate.year())}{consultant.calcSelectPersonalWeekISK(6, 4, newDate.year())}/{consultant.calcUniversalWeek(6, 4, newDate.year())}{consultant.calcUniversalWeekISK(6, 4, newDate.year())}</Text>
          </View>
          {junio.length > 28
          ? (
<View style={[calendar.week5, { backgroundColor: `${(sem4 === true && newDate.month() + 1 === 6) ? '#DCA8A9' : ''}` }]}>
            <Text style={calendar.weektext}>4a Sem</Text>
            <Text style={[calendar.weektext, { fontWeight: 'bold' }]}>{consultant.calcSelectPersonalWeek(6, 4, newDate.year())}{consultant.calcSelectPersonalWeekISK(6, 4, newDate.year())}/{consultant.calcUniversalWeek(6, 4, newDate.year())}{consultant.calcUniversalWeekISK(6, 4, newDate.year())}</Text>
</View>
) : ''}
          <View style={calendar.daysWeek}>
              <DaysOfTheWeek month={6} />
          </View>
            <View style={calendar.daysContainer}>
              <MonthsInDay month={6} />
            </View>
        </View>

        <View style={[calendar.wrap, calendar.wrap7]}>
          <View style={calendar.head}><Text style={calendar.headMonth}>{allMonths[6]} {consultant.calcPersonalMonth(7, newDate.year())}{consultant.calcPersonalMonthISK(7, newDate.year())}/{consultant.calcUniversalMonth(7, newDate.year())}{consultant.calcUniversalMonthISK(7, newDate.year())}</Text></View>
          <View style={calendar.head}><Text style={calendar.headQuater}>Cuatrimestre: {consultant.getQuaterMonth(7, newDate.year())}{consultant.getQuaterMonthISK(7, newDate.year())}</Text></View>
          <View style={[calendar.week1, { backgroundColor: `${(sem1 === true && newDate.month() + 1 === 7) ? '#DCA8A9' : ''}` }]}>
            <Text style={calendar.weektext}>1a Sem</Text>
            <Text style={[calendar.weektext, { fontWeight: 'bold' }]}>{consultant.calcSelectPersonalWeek(7, 1, newDate.year())}{consultant.calcSelectPersonalWeekISK(7, 1, newDate.year())}/{consultant.calcUniversalWeek(7, 1, newDate.year())}{consultant.calcUniversalWeekISK(7, 1, newDate.year())}</Text>
          </View>
          <View style={[calendar.week2, { backgroundColor: `${(sem2 === true && newDate.month() + 1 === 1) ? '#DCA8A9' : ''}` }]}>
            <Text style={calendar.weektext}>2a Sem</Text>
            <Text style={[calendar.weektext, { fontWeight: 'bold' }]}>{consultant.calcSelectPersonalWeek(7, 2, newDate.year())}{consultant.calcSelectPersonalWeekISK(7, 2, newDate.year())}/{consultant.calcUniversalWeek(7, 2, newDate.year())}{consultant.calcUniversalWeekISK(7, 2, newDate.year())}</Text>
          </View>
          <View style={[calendar.week3, { backgroundColor: `${(sem3 === true && newDate.month() + 1 === 1) ? '#DCA8A9' : ''}` }]}>
            <Text style={calendar.weektext}>3a Sem</Text>
            <Text style={[calendar.weektext, { fontWeight: 'bold' }]}>{consultant.calcSelectPersonalWeek(7, 3, newDate.year())}{consultant.calcSelectPersonalWeekISK(7, 3, newDate.year())}/{consultant.calcUniversalWeek(7, 3, newDate.year())}{consultant.calcUniversalWeekISK(7, 3, newDate.year())}</Text>
          </View>
          <View style={[calendar.week4, { backgroundColor: `${(sem4 === true && newDate.month() + 1 === 7) ? '#DCA8A9' : ''}` }]}>
            <Text style={calendar.weektext}>4a Sem</Text>
            <Text style={[calendar.weektext, { fontWeight: 'bold' }]}>{consultant.calcSelectPersonalWeek(7, 4, newDate.year())}{consultant.calcSelectPersonalWeekISK(7, 4, newDate.year())}/{consultant.calcUniversalWeek(7, 4, newDate.year())}{consultant.calcUniversalWeekISK(7, 4, newDate.year())}</Text>
          </View>
          {julio.length > 28
          ? (
<View style={[calendar.week5, { backgroundColor: `${(sem4 === true && newDate.month() + 1 === 7) ? '#DCA8A9' : ''}` }]}>
            <Text style={calendar.weektext}>4a Sem</Text>
            <Text style={[calendar.weektext, { fontWeight: 'bold' }]}>{consultant.calcSelectPersonalWeek(7, 4, newDate.year())}{consultant.calcSelectPersonalWeekISK(7, 4, newDate.year())}/{consultant.calcUniversalWeek(7, 4, newDate.year())}{consultant.calcUniversalWeekISK(7, 4, newDate.year())}</Text>
</View>
) : ''}
          <View style={calendar.daysWeek}>
              <DaysOfTheWeek month={7} />
          </View>
            <View style={calendar.daysContainer}>
              <MonthsInDay month={7} />
            </View>
        </View>

        <View style={[calendar.wrap, calendar.wrap8]}>
          <View style={calendar.head}><Text style={calendar.headMonth}>{allMonths[7]} {consultant.calcPersonalMonth(8, newDate.year())}{consultant.calcPersonalMonthISK(8, newDate.year())}/{consultant.calcUniversalMonth(8, newDate.year())}{consultant.calcUniversalMonthISK(8, newDate.year())}</Text></View>
          <View style={calendar.head}><Text style={calendar.headQuater}>Cuatrimestre: {consultant.getQuaterMonth(8, newDate.year())}{consultant.getQuaterMonthISK(8, newDate.year())}</Text></View>
          <View style={[calendar.week1, { backgroundColor: `${(sem1 === true && newDate.month() + 1 === 8) ? '#DCA8A9' : ''}` }]}>
            <Text style={calendar.weektext}>1a Sem</Text>
            <Text style={[calendar.weektext, { fontWeight: 'bold' }]}>{consultant.calcSelectPersonalWeek(8, 1, newDate.year())}{consultant.calcSelectPersonalWeekISK(8, 1, newDate.year())}/{consultant.calcUniversalWeek(8, 1, newDate.year())}{consultant.calcUniversalWeekISK(8, 1, newDate.year())}</Text>
          </View>
          <View style={[calendar.week2, { backgroundColor: `${(sem2 === true && newDate.month() + 1 === 8) ? '#DCA8A9' : ''}` }]}>
            <Text style={calendar.weektext}>2a Sem</Text>
            <Text style={[calendar.weektext, { fontWeight: 'bold' }]}>{consultant.calcSelectPersonalWeek(8, 2, newDate.year())}{consultant.calcSelectPersonalWeekISK(8, 2, newDate.year())}/{consultant.calcUniversalWeek(8, 2, newDate.year())}{consultant.calcUniversalWeekISK(8, 2, newDate.year())}</Text>
          </View>
          <View style={[calendar.week3, { backgroundColor: `${(sem3 === true && newDate.month() + 1 === 8) ? '#DCA8A9' : ''}` }]}>
            <Text style={calendar.weektext}>3a Sem</Text>
            <Text style={[calendar.weektext, { fontWeight: 'bold' }]}>{consultant.calcSelectPersonalWeek(8, 3, newDate.year())}{consultant.calcSelectPersonalWeekISK(8, 3, newDate.year())}/{consultant.calcUniversalWeek(8, 3, newDate.year())}{consultant.calcUniversalWeekISK(8, 3, newDate.year())}</Text>
          </View>
          <View style={[calendar.week4, { backgroundColor: `${(sem4 === true && newDate.month() + 1 === 8) ? '#DCA8A9' : ''}` }]}>
            <Text style={calendar.weektext}>4a Sem</Text>
            <Text style={[calendar.weektext, { fontWeight: 'bold' }]}>{consultant.calcSelectPersonalWeek(8, 4, newDate.year())}{consultant.calcSelectPersonalWeekISK(8, 4, newDate.year())}/{consultant.calcUniversalWeek(8, 4, newDate.year())}{consultant.calcUniversalWeekISK(8, 4, newDate.year())}</Text>
          </View>
          {agosto.length > 28
          ? (
<View style={[calendar.week5, { backgroundColor: `${(sem4 === true && newDate.month() + 1 === 8) ? '#DCA8A9' : ''}` }]}>
            <Text style={calendar.weektext}>4a Sem</Text>
            <Text style={[calendar.weektext, { fontWeight: 'bold' }]}>{consultant.calcSelectPersonalWeek(8, 4, newDate.year())}{consultant.calcSelectPersonalWeekISK(8, 4, newDate.year())}/{consultant.calcUniversalWeek(8, 4, newDate.year())}{consultant.calcUniversalWeekISK(8, 4, newDate.year())}</Text>
</View>
) : ''}
          <View style={calendar.daysWeek}>
              <DaysOfTheWeek month={8} />
          </View>
            <View style={calendar.daysContainer}>
              <MonthsInDay month={8} />
            </View>
        </View>


    </View>
  )
}
export const calendar = StyleSheet.create({
  example: {
    width: '25px',
    height: '17px',
    display: 'flex',
    textAlign: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  container: {
    position: 'absolute'
  },
  wrap: {
    position: 'relative'
  },
  wrap1: {
    top: '0px',
    left: '15px'
  },
  wrap2: {
    top: '0px',
    left: '263px'
  },
  wrap3: {
    top: '153px',
    left: '15px'
  },
  wrap4: {
    top: '153px',
    left: '263px'
  },
  wrap5: {
    top: '304px',
    left: '15px'
  },
  wrap6: {
    top: '305px',
    left: '263px'
  },
  wrap7: {
    top: '455px',
    left: '15px'
  },
  wrap8: {
    top: '456px',
    left: '263px'
  },
  head: {
    width: '100px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  week1: {
    width: '31px',
    display: 'block',
    top: '112px',
    left: '26px',
    position: 'absolute'
  },
  week2: {
    width: '31px',
    display: 'block',
    top: '129px',
    left: '28px',
    position: 'absolute'
  },
  week3: {
    width: '31px',
    display: 'block',
    top: '145px',
    left: '28px',
    position: 'absolute'
  },
  week4: {
    width: '31px',
    display: 'block',
    top: '164px',
    left: '28px',
    position: 'absolute'
  },
  week5: {
    width: '31px',
    display: 'block',
    top: '181px',
    left: '28px',
    position: 'absolute'
  },
  days: {
    fontSize: '6px',
    color: '#7E7E7E'
  },
  calcDays: {
    fontSize: '7px',
    color: '#000',
    fontWeight: 'bold'
  },
  daysRow: {
    width: '176px',
    display: 'flex',
    flexDirection: 'row'
  },
  daysContainer: {
    width: '175px',
    top: '112px',
    display: 'flex',
    flexDirection: 'column',
    left: '73px',
    position: 'absolute'
  },
  daysWeek: {
    width: '175px',
    top: '102px',
    display: 'flex',
    flexDirection: 'row',
    left: '72px',
    position: 'absolute'
  },
  daysofWeek: {
    width: '25px',
    height: '10px',
    backgroundColor: '#E2E2E2',
    color: '#7E7E7E',
    fontSize: '7px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: 1,
    borderColor: '#7E7E7E'
  },
  weektext: {
    fontSize: '7px',
    textAlign: 'center',
    color: '#000'
  },
  headMonth: {
    top: '85px',
    left: '50px',
    fontSize: '10px',
    color: '#fff',
    position: 'absolute'
  },
  headQuater: {
    top: '85px',
    left: '165px',
    fontSize: '10px',
    color: '#fff',
    position: 'absolute'
  }
})

