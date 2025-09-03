import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';


export const CalendarMonth: React.FC<{ consultant, newDate, month }> = ({ consultant, newDate, month }) => {
  let sem1 = false
  let sem2 = false
  let sem3 = false
  let sem4 = false
  if (newDate.date() >= 1 && newDate.date() <= 7) { sem1 = true }
  if (newDate.date() >= 8 && newDate.date() <= 14) { sem2 = true }
  if (newDate.date() >= 15 && newDate.date() <= 21) { sem3 = true }
  if (newDate.date() >= 22) { sem4 = true }
  const monthToCalculate = consultant.getAllMonths()
  const daysOfMonth = consultant.getAllDaysInMonth(month, newDate.year())
  const DaysOfTheWeek = () => {
    const daysCustom = consultant.getDaysOfWeekCustom(month, newDate.year())
    return (
      <>
        {daysCustom.map((day, index) =>
        <View key={index} style={calendar.daysofWeek}><Text>{day[0]}</Text></View>)}
      </>
    )
  }
  const MonthsInDay = () => {
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
                <Text style={[calendar.days, { color: `${(day === newDate.date() && month === newDate.month() + 1) ? '#fff' : '#7E7E7E'}` }]}>{day}</Text>
                <Text style={[calendar.calcDays, { color: `${(day === newDate.date() && month === newDate.month() + 1) ? '#fff' : ''}` }]}>{consultant.calcPersonalDay(day, month, newDate.year())}{consultant.calcPersonalDayISK(day, month, newDate.year())}/{consultant.calcUniversalDay(day, month, newDate.year())}{consultant.calcUniversalDayISK(day, month, newDate.year())}</Text>
              </View>
            ))}
          </View>
          <View style={calendar.daysRow}>
            {semTwo.map((day, index) => (
              <View style={[calendar.example, { backgroundColor: `${(day === newDate.date() && month === newDate.month() + 1) ? '#C77575' : ((sem2 === true) && month === newDate.month() + 1) ? '#DCA8A9' : (month === newDate.month() + 1) ? '#FBEDD9' : ''}` }]}>
                <Text style={[calendar.days, { color: `${(day === newDate.date() && month === newDate.month() + 1) ? '#fff' : '#7E7E7E'}` }]}>{day}</Text>
                <Text style={[calendar.calcDays, { color: `${(day === newDate.date() && month === newDate.month() + 1) ? '#fff' : ''}` }]}>{consultant.calcPersonalDay(day, month, newDate.year())}{consultant.calcPersonalDayISK(day, month, newDate.year())}/{consultant.calcUniversalDay(day, month, newDate.year())}{consultant.calcUniversalDayISK(day, month, newDate.year())}</Text>
              </View>
            ))}
          </View>
          <View style={calendar.daysRow}>
          {semThr.map((day, index) => (
          <View style={[calendar.example, { backgroundColor: `${(day === newDate.date() && month === newDate.month() + 1) ? '#C77575' : (sem3 === true && month === newDate.month() + 1) ? '#DCA8A9' : (month === newDate.month() + 1) ? '#FBEDD9' : ''}` }]}>
            <Text style={[calendar.days, { color: `${(day === newDate.date() && month === newDate.month() + 1) ? '#fff' : '#7E7E7E'}` }]}>{day}</Text>
            <Text style={[calendar.calcDays, { color: `${(day === newDate.date() && month === newDate.month() + 1) ? '#fff' : ''}` }]}>{consultant.calcPersonalDay(day, month, newDate.year())}{consultant.calcPersonalDayISK(day, month, newDate.year())}/{consultant.calcUniversalDay(day, month, newDate.year())}{consultant.calcUniversalDayISK(day, month, newDate.year())}</Text>
          </View>
        ))}
          </View>
          <View style={calendar.daysRow}>
          {semFou.map((day, index) => (
          <View style={[calendar.example, { backgroundColor: `${(day === newDate.date() && month === newDate.month() + 1) ? '#C77575' : ((sem4 == true) && month === newDate.month() + 1) ? '#DCA8A9' : (month === newDate.month() + 1) ? '#FBEDD9' : ''}` }]}>
            <Text style={[calendar.days, { color: `${(day === newDate.date() && month === newDate.month() + 1) ? '#fff' : '#7E7E7E'}` }]}>{day}</Text>
            <Text style={[calendar.calcDays, { color: `${(day === newDate.date() && month === newDate.month() + 1) ? '#fff' : ''}` }]}>{consultant.calcPersonalDay(day, month, newDate.year())}{consultant.calcPersonalDayISK(day, month, newDate.year())}/{consultant.calcUniversalDay(day, month, newDate.year())}{consultant.calcUniversalDayISK(day, month, newDate.year())}</Text>
          </View>
        ))}
          </View>
          <View style={calendar.daysRow}>
          {semFive.map((day, index) => (
          <View style={[calendar.example, { backgroundColor: `${(day === newDate.date() && month === newDate.month() + 1) ? '#C77575' : ((sem4 == true) && month === newDate.month() + 1) ? '#DCA8A9' : (month === newDate.month() + 1) ? '#FBEDD9' : ''}` }]}>
            <Text style={[calendar.days, { color: `${(day === newDate.date() && month === newDate.month() + 1) ? '#fff' : '#7E7E7E'}` }]}>{day}</Text>
            <Text style={[calendar.calcDays, { color: `${(day === newDate.date() && month === newDate.month() + 1) ? '#fff' : ''}` }]}>{consultant.calcPersonalDay(day, month, newDate.year())}{consultant.calcPersonalDayISK(day, month, newDate.year())}/{consultant.calcUniversalDay(day, month, newDate.year())}{consultant.calcUniversalDayISK(day, month, newDate.year())}</Text>
          </View>
        ))}
          </View>
      </>
    )
  }

return (
  <View style={calendar.container}>
      <View style={calendar.row}>
        <View style={calendar.head}><Text style={calendar.name}>{monthToCalculate[month - 1]}</Text></View>
        <View style={calendar.head}><Text style={calendar.persMont}>{consultant.calcPersonalMonth(month, newDate.year())}{consultant.calcPersonalMonthISK(month, newDate.year())}</Text></View>
        <View style={calendar.head}><Text style={calendar.univMont}>{consultant.calcUniversalMonth(month, newDate.year())}{consultant.calcUniversalMonthISK(month, newDate.year())}</Text></View>
        <View style={calendar.head}><Text style={calendar.headQuater}>Cuatrimestre: {consultant.getQuaterMonth(1, newDate.year())}{consultant.getQuaterMonthISK(1, newDate.year())}</Text></View>
      </View>
      <View style={calendar.daysWeek}>
        <DaysOfTheWeek />
      </View>
      <View style={[calendar.wrap, calendar.monthContain]}>
        <View style={calendar.weekContaniner}>
        <View style={[calendar.week, { backgroundColor: `${(sem1 === true && newDate.month() + 1 === month) ? '#DCA8A9' : ''}` }]}>
        <Text style={[calendar.weektext, { color: '#7E7E7E' }]}>1a Sem</Text>
        <Text style={[calendar.weektext, { fontWeight: 'bold' }]}>{consultant.calcSelectPersonalWeek(month, 1, newDate.year())}{consultant.calcSelectPersonalWeekISK(month, 1, newDate.year())}/{consultant.calcUniversalWeek(month, 1, newDate.year())}{consultant.calcUniversalWeekISK(month, 1, newDate.year())}</Text>
        </View>
      <View style={[calendar.week, { backgroundColor: `${(sem2 === true && newDate.month() + 1 === month) ? '#DCA8A9' : ''}` }]}>
        <Text style={[calendar.weektext, { color: '#7E7E7E' }]}>2a Sem</Text>
        <Text style={[calendar.weektext, { fontWeight: 'bold' }]}>{consultant.calcSelectPersonalWeek(month, 2, newDate.year())}{consultant.calcSelectPersonalWeekISK(month, 2, newDate.year())}/{consultant.calcUniversalWeek(month, 2, newDate.year())}{consultant.calcUniversalWeekISK(month, 2, newDate.year())}</Text>
      </View>
      <View style={[calendar.week, { backgroundColor: `${(sem3 === true && newDate.month() + 1 === month) ? '#DCA8A9' : ''}` }]}>
        <Text style={[calendar.weektext, { color: '#7E7E7E' }]}>3a Sem</Text>
        <Text style={[calendar.weektext, { fontWeight: 'bold' }]}>{consultant.calcSelectPersonalWeek(month, 3, newDate.year())}{consultant.calcSelectPersonalWeekISK(month, 3, newDate.year())}/{consultant.calcUniversalWeek(month, 3, newDate.year())}{consultant.calcUniversalWeekISK(month, 3, newDate.year())}</Text>
      </View>
      <View style={[calendar.week, { backgroundColor: `${(sem4 === true && newDate.month() + 1 === month) ? '#DCA8A9' : ''}` }]}>
        <Text style={[calendar.weektext, { color: '#7E7E7E' }]}>4a Sem</Text>
        <Text style={[calendar.weektext, { fontWeight: 'bold' }]}>{consultant.calcSelectPersonalWeek(month, 4, newDate.year())}{consultant.calcSelectPersonalWeekISK(month, 4, newDate.year())}/{consultant.calcUniversalWeek(month, 4, newDate.year())}{consultant.calcUniversalWeekISK(month, 4, newDate.year())}</Text>
      </View>
      {daysOfMonth.length > 28
      ? (
<View style={[calendar.week, { backgroundColor: `${(sem4 === true && newDate.month() + 1 === month) ? '#DCA8A9' : ''}` }]}>
        <Text style={[calendar.weektext, { color: '#7E7E7E' }]}>4a Sem</Text>
        <Text style={[calendar.weektext, { fontWeight: 'bold' }]}>{consultant.calcSelectPersonalWeek(month, 4, newDate.year())}{consultant.calcSelectPersonalWeekISK(month, 4, newDate.year())}/{consultant.calcUniversalWeek(month, 4, newDate.year())}{consultant.calcUniversalWeekISK(month, 4, newDate.year())}</Text>
</View>
) : ''}

        </View>
        <View style={[calendar.daysContainer]}>
          <MonthsInDay />
        </View>
      </View>
  </View>
)
}
export const calendar = StyleSheet.create({
  container: {
    position: 'absolute',
  },
  row: {
    display: 'flex',
    flexDirection: 'row'
  },
  wrap: {
    position: 'relative'
  },
  monthContain: {
    top: '128px',
    left: '30px'
  },
  head: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    width: '100px',
    top: '95px',
    left: '100px',
    fontSize: '10px',
    color: '#663366',
    fontWeight: 'bold'
  },
  persMont: {
    width: '20px',
    top: '95px',
    left: '150px',
    fontSize: '12px',
    fontWeight: 'bold'
  },
  univMont: {
    width: '20px',
    top: '95px',
    left: '163px',
    fontSize: '12px',
    fontWeight: 'bold'
  },
  headQuater: {
    width: '170px',
    top: '95px',
    left: '240px',
    fontSize: '16px',
    color: '#fff',
    fontWeight: 'bold'
  },
  daysWeek: {
    width: '396px',
    top: '122px',
    display: 'flex',
    flexDirection: 'row',
    left: '130px',
    position: 'absolute'
  },
  daysofWeek: {
    width: '57px',
    height: '25px',
    backgroundColor: '#E2E2E2',
    color: '#7E7E7E',
    fontSize: '14px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: 1,
    borderColor: '#7E7E7E'
  },
  weekContaniner: {
    position: 'absolute',
    top: '0px',
    left: '0px',
    display: 'flex',
    flexDirection: 'column'
  },
  weektext: {
    fontSize: '14px',
    textAlign: 'center',
    color: '#000'
  },
  week: {
    width: '70px',
    height: '40px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  daysRow: {
    width: '399px',
    display: 'flex',
    flexDirection: 'row'
  },
  daysContainer: {
    width: '399px',
    top: '0px',
    display: 'flex',
    flexDirection: 'column',
    left: '100px',
  },
  example: {
    width: '56.5px',
    height: '40px',
    display: 'flex',
    textAlign: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    borderRight: 1,
    borderRightColor: '#7E7E7E',
    borderBottom: 1,
    borderBottomColor: '#7E7E7E'
  },
  days: {
    fontSize: '14px',
    color: '#7E7E7E'
  },
  calcDays: {
    fontSize: '16px',
    color: '#000',
    fontWeight: 'bold'
  },

})