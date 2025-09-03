import { StyleSheet, Text, View } from '@react-pdf/renderer';
import React from 'react';


export const CalendarMonths2: React.FC<{ consultant, newDate }> = ({ consultant, newDate }) => {
  const septiembre = consultant.getAllDaysInMonth(9, newDate.year())
  const octubre = consultant.getAllDaysInMonth(10, newDate.year())
  const noviembre = consultant.getAllDaysInMonth(11, newDate.year())
  const diciembre = consultant.getAllDaysInMonth(12, newDate.year())
  let sem1 = false
  let sem2 = false
  let sem3 = false
  let sem4 = false
  if (newDate.date() >= 1 && newDate.date() <= 7) { sem1 = true }
  if (newDate.date() >= 8 && newDate.date() <= 14) { sem2 = true }
  if (newDate.date() >= 15 && newDate.date() <= 21) { sem3 = true }
  if (newDate.date() >= 22) { sem4 = true }

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
    const mes = consultant.getAllDaysInMonth(month)
    const semOne = mes.slice(0, 7)
    const semTwo = mes.slice(7, 14)
    const semThr = mes.slice(14, 21)
    const semFou = mes.slice(21, 28)
    const semFive = mes.slice(28)
    const daysOfWeek = consultant.getDaysOfWeekCustom(month)
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
              <View style={[calendar.example, { backgroundColor: `${(day === newDate.date() && month === newDate.month() + 1) ? '#C77575' : ((sem2 == true) && month === newDate.month() + 1) ? '#DCA8A9' : (month === newDate.month() + 1) ? '#FBEDD9' : ''}` }]}>
                <Text style={[calendar.days, { color: `${(day === newDate.date() && month === newDate.month() + 1) ? '#fff' : ''}` }]}>{day}</Text>
                <Text style={[calendar.calcDays, { color: `${(day === newDate.date() && month === newDate.month() + 1) ? '#fff' : ''}` }]}>{consultant.calcPersonalDay(day, month, newDate.year())}{consultant.calcPersonalDayISK(day, month, newDate.year())}/{consultant.calcUniversalDay(day, month, newDate.year())}{consultant.calcUniversalDayISK(day, month, newDate.year())}</Text>
              </View>
            ))}
          </View>
          <View style={calendar.daysRow}>
          {semThr.map((day, index) => (
          <View style={[calendar.example, { backgroundColor: `${(day === newDate.date() && month === newDate.month() + 1) ? '#C77575' : ((sem3 === true) && month === newDate.month() + 1) ? '#DCA8A9' : (month === newDate.month() + 1) ? '#FBEDD9' : ''}` }]}>
            <Text style={[calendar.days, { color: `${(day === newDate.date() && month === newDate.month() + 1) ? '#fff' : ''}` }]}>{day}</Text>
            <Text style={[calendar.calcDays, { color: `${(day === newDate.date() && month === newDate.month() + 1) ? '#fff' : ''}` }]}>{consultant.calcPersonalDay(day, month, newDate.year())}{consultant.calcPersonalDayISK(day, month, newDate.year())}/{consultant.calcUniversalDay(day, month, newDate.year())}{consultant.calcUniversalDayISK(day, month, newDate.year())}</Text>
          </View>
        ))}
          </View>
          <View style={calendar.daysRow}>
          {semFou.map((day, index) => (
          <View style={[calendar.example, { backgroundColor: `${(day === newDate.date() && month === newDate.month() + 1) ? '#C77575' : ((sem4 === true) && month === newDate.month() + 1) ? '#DCA8A9' : (month === newDate.month() + 1) ? '#FBEDD9' : ''}` }]}>
            <Text style={[calendar.days, { color: `${(day === newDate.date() && month === newDate.month() + 1) ? '#fff' : ''}` }]}>{day}</Text>
            <Text style={[calendar.calcDays, { color: `${(day === newDate.date() && month === newDate.month() + 1) ? '#fff' : ''}` }]}>{consultant.calcPersonalDay(day, month, newDate.year())}{consultant.calcPersonalDayISK(day, month, newDate.year())}/{consultant.calcUniversalDay(day, month, newDate.year())}{consultant.calcUniversalDayISK(day, month, newDate.year())}</Text>
          </View>
        ))}
          </View>
          <View style={calendar.daysRow}>
          {semFive.map((day, index) => (
          <View style={[calendar.example, { backgroundColor: `${(day === newDate.date() && month === newDate.month() + 1) ? '#C77575' : ((sem4 === true) && month === newDate.month() + 1) ? '#DCA8A9' : (month === newDate.month() + 1) ? '#FBEDD9' : ''}` }]}>
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

        <View style={[calendar.wrap, calendar.wrap1]}>
          <View style={calendar.head}><Text style={calendar.headMonth}>{allMonths[8]} {consultant.calcPersonalMonth(9, newDate.year())}{consultant.calcPersonalMonthISK(9, newDate.year())}/{consultant.calcUniversalMonth(9, newDate.year())}{consultant.calcUniversalMonthISK(9, newDate.year())}</Text></View>
          <View style={calendar.head}><Text style={calendar.headQuater}>Cuatrimestre: {consultant.getQuaterMonth(9, newDate.year())}{consultant.getQuaterMonthISK(9, newDate.year())}</Text></View>
            <View style={[calendar.week1, { backgroundColor: `${(sem1 === true && newDate.month() + 1 === 9) ? '#DCA8A9' : ''}` }]}>
              <Text style={calendar.weektext}>1a Sem</Text>
              <Text style={[calendar.weektext, { fontWeight: 'bold' }]}>{consultant.calcSelectPersonalWeek(9, 1, newDate.year())}{consultant.calcSelectPersonalWeekISK(9, 1, newDate.year())}/{consultant.calcUniversalWeek(9, 1, newDate.year())}{consultant.calcUniversalWeekISK(9, 1, newDate.year())}</Text>
            </View>
            <View style={[calendar.week2, { backgroundColor: `${(sem2 === true && newDate.month() + 1 === 9) ? '#DCA8A9' : ''}` }]}>
              <Text style={calendar.weektext}>2a Sem</Text>
              <Text style={[calendar.weektext, { fontWeight: 'bold' }]}>{consultant.calcSelectPersonalWeek(9, 2, newDate.year())}{consultant.calcSelectPersonalWeekISK(9, 2, newDate.year())}/{consultant.calcUniversalWeek(9, 2, newDate.year())}{consultant.calcUniversalWeekISK(9, 2, newDate.year())}</Text>
            </View>
            <View style={[calendar.week3, { backgroundColor: `${(sem3 === true && newDate.month() + 1 === 9) ? '#DCA8A9' : ''}` }]}>
              <Text style={calendar.weektext}>3a Sem</Text>
              <Text style={[calendar.weektext, { fontWeight: 'bold' }]}>{consultant.calcSelectPersonalWeek(9, 3, newDate.year())}{consultant.calcSelectPersonalWeekISK(9, 3, newDate.year())}/{consultant.calcUniversalWeek(9, 3, newDate.year())}{consultant.calcUniversalWeekISK(9, 3, newDate.year())}</Text>
            </View>
            <View style={[calendar.week4, { backgroundColor: `${(sem4 === true && newDate.month() + 1 === 9) ? '#DCA8A9' : ''}` }]}>
              <Text style={calendar.weektext}>4a Sem</Text>
              <Text style={[calendar.weektext, { fontWeight: 'bold' }]}>{consultant.calcSelectPersonalWeek(9, 4, newDate.year())}{consultant.calcSelectPersonalWeekISK(9, 4, newDate.year())}/{consultant.calcUniversalWeek(9, 4, newDate.year())}{consultant.calcUniversalWeekISK(9, 4, newDate.year())}</Text>
            </View>
            {septiembre.length > 28
            ? (
<View style={[calendar.week5, { backgroundColor: `${(sem4 === true && newDate.month() + 1 === 9) ? '#DCA8A9' : ''}` }]}>
              <Text style={calendar.weektext}>4a Sem</Text>
              <Text style={[calendar.weektext, { fontWeight: 'bold' }]}>{consultant.calcSelectPersonalWeek(9, 4, newDate.year())}{consultant.calcSelectPersonalWeekISK(9, 4, newDate.year())}/{consultant.calcUniversalWeek(9, 4, newDate.year())}{consultant.calcUniversalWeekISK(9, 4, newDate.year())}</Text>
</View>
) : ''}
            <View style={calendar.daysWeek}>
              <DaysOfTheWeek month={9} />
            </View>
            <View style={calendar.daysContainer}>
              <MonthsInDay month={9} />
            </View>

        </View>

        <View style={[calendar.wrap, calendar.wrap2]}>
          <View style={calendar.head}><Text style={calendar.headMonth}>{allMonths[9]} {consultant.calcPersonalMonth(10, newDate.year())}{consultant.calcPersonalMonthISK(10, newDate.year())}/{consultant.calcUniversalMonth(10, newDate.year())}{consultant.calcUniversalMonthISK(10, newDate.year())}</Text></View>
          <View style={calendar.head}><Text style={calendar.headQuater}>Cuatrimestre: {consultant.getQuaterMonth(10, newDate.year())}{consultant.getQuaterMonthISK(10, newDate.year())}</Text></View>
          <View style={[calendar.week1, { backgroundColor: `${(sem1 === true && newDate.month() + 1 === 10) ? '#DCA8A9' : ''}` }]}>
            <Text style={calendar.weektext}>1a Sem</Text>
            <Text style={[calendar.weektext, { fontWeight: 'bold' }]}>{consultant.calcSelectPersonalWeek(10, 1, newDate.year())}{consultant.calcSelectPersonalWeekISK(10, 1, newDate.year())}/{consultant.calcUniversalWeek(10, 1, newDate.year())}{consultant.calcUniversalWeekISK(10, 1, newDate.year())}</Text>
          </View>
          <View style={[calendar.week2, { backgroundColor: `${(sem2 === true && newDate.month() + 1 === 10) ? '#DCA8A9' : ''}` }]}>
            <Text style={calendar.weektext}>2a Sem</Text>
            <Text style={[calendar.weektext, { fontWeight: 'bold' }]}>{consultant.calcSelectPersonalWeek(10, 2, newDate.year())}{consultant.calcSelectPersonalWeekISK(10, 2, newDate.year())}/{consultant.calcUniversalWeek(10, 2, newDate.year())}{consultant.calcUniversalWeekISK(10, 2, newDate.year())}</Text>
          </View>
          <View style={[calendar.week3, { backgroundColor: `${(sem3 === true && newDate.month() + 1 === 10) ? '#DCA8A9' : ''}` }]}>
            <Text style={calendar.weektext}>3a Sem</Text>
            <Text style={[calendar.weektext, { fontWeight: 'bold' }]}>{consultant.calcSelectPersonalWeek(10, 3, newDate.year())}{consultant.calcSelectPersonalWeekISK(10, 3, newDate.year())}/{consultant.calcUniversalWeek(10, 3, newDate.year())}{consultant.calcUniversalWeekISK(10, 3, newDate.year())}</Text>
          </View>
          <View style={[calendar.week4, { backgroundColor: `${(sem4 === true && newDate.month() + 1 === 10) ? '#DCA8A9' : ''}` }]}>
            <Text style={calendar.weektext}>4a Sem</Text>
            <Text style={[calendar.weektext, { fontWeight: 'bold' }]}>{consultant.calcSelectPersonalWeek(10, 4, newDate.year())}{consultant.calcSelectPersonalWeekISK(10, 4, newDate.year())}/{consultant.calcUniversalWeek(10, 4, newDate.year())}{consultant.calcUniversalWeekISK(10, 4, newDate.year())}</Text>
          </View>
          {octubre.length > 28
          ? (
<View style={[calendar.week5, { backgroundColor: `${(sem4 === true && newDate.month() + 1 === 10) ? '#DCA8A9' : ''}` }]}>
            <Text style={calendar.weektext}>4a Sem</Text>
            <Text style={[calendar.weektext, { fontWeight: 'bold' }]}>{consultant.calcSelectPersonalWeek(10, 4, newDate.year())}{consultant.calcSelectPersonalWeekISK(10, 4, newDate.year())}/{consultant.calcUniversalWeek(10, 4, newDate.year())}{consultant.calcUniversalWeekISK(10, 4, newDate.year())}</Text>
</View>
) : ''}
            <View style={calendar.daysWeek}>
              <DaysOfTheWeek month={10} />
            </View>
            <View style={calendar.daysContainer}>
              <MonthsInDay month={10} />
            </View>
        </View>

        <View style={[calendar.wrap, calendar.wrap3]}>
          <View style={calendar.head}><Text style={calendar.headMonth}>{allMonths[10]} {consultant.calcPersonalMonth(11, newDate.year())}{consultant.calcPersonalMonthISK(11, newDate.year())}/{consultant.calcUniversalMonth(11, newDate.year())}{consultant.calcUniversalMonthISK(11, newDate.year())}</Text></View>
          <View style={calendar.head}><Text style={calendar.headQuater}>Cuatrimestre: {consultant.getQuaterMonth(11, newDate.year())}{consultant.getQuaterMonthISK(11, newDate.year())}</Text></View>
          <View style={[calendar.week1, { backgroundColor: `${(sem1 === true && newDate.month() + 1 === 11) ? '#DCA8A9' : ''}` }]}>
            <Text style={calendar.weektext}>1a Sem</Text>
            <Text style={[calendar.weektext, { fontWeight: 'bold' }]}>{consultant.calcSelectPersonalWeek(11, 1, newDate.year())}{consultant.calcSelectPersonalWeekISK(11, 1, newDate.year())}/{consultant.calcUniversalWeek(11, 1, newDate.year())}{consultant.calcUniversalWeekISK(11, 1, newDate.year())}</Text>
          </View>
          <View style={[calendar.week2, { backgroundColor: `${(sem2 === true && newDate.month() + 1 === 11) ? '#DCA8A9' : ''}` }]}>
            <Text style={calendar.weektext}>2a Sem</Text>
            <Text style={[calendar.weektext, { fontWeight: 'bold' }]}>{consultant.calcSelectPersonalWeek(11, 2, newDate.year())}{consultant.calcSelectPersonalWeekISK(11, 2, newDate.year())}/{consultant.calcUniversalWeek(11, 2, newDate.year())}{consultant.calcUniversalWeekISK(11, 2, newDate.year())}</Text>
          </View>
          <View style={[calendar.week3, { backgroundColor: `${(sem3 === true && newDate.month() + 1 === 11) ? '#DCA8A9' : ''}` }]}>
            <Text style={calendar.weektext}>3a Sem</Text>
            <Text style={[calendar.weektext, { fontWeight: 'bold' }]}>{consultant.calcSelectPersonalWeek(11, 3, newDate.year())}{consultant.calcSelectPersonalWeekISK(11, 3, newDate.year())}/{consultant.calcUniversalWeek(11, 3, newDate.year())}{consultant.calcUniversalWeekISK(11, 3, newDate.year())}</Text>
          </View>
          <View style={[calendar.week4, { backgroundColor: `${(sem4 === true && newDate.month() + 1 === 11) ? '#DCA8A9' : ''}` }]}>
            <Text style={calendar.weektext}>4a Sem</Text>
            <Text style={[calendar.weektext, { fontWeight: 'bold' }]}>{consultant.calcSelectPersonalWeek(11, 4, newDate.year())}{consultant.calcSelectPersonalWeekISK(11, 4, newDate.year())}/{consultant.calcUniversalWeek(11, 4, newDate.year())}{consultant.calcUniversalWeekISK(11, 4, newDate.year())}</Text>
          </View>
          {noviembre.length > 28
          ? (
<View style={[calendar.week5, { backgroundColor: `${(sem4 === true && newDate.month() + 1 === 11) ? '#DCA8A9' : ''}` }]}>
            <Text style={calendar.weektext}>4a Sem</Text>
            <Text style={[calendar.weektext, { fontWeight: 'bold' }]}>{consultant.calcSelectPersonalWeek(11, 4, newDate.year())}{consultant.calcSelectPersonalWeekISK(11, 4, newDate.year())}/{consultant.calcUniversalWeek(11, 4, newDate.year())}{consultant.calcUniversalWeekISK(11, 4, newDate.year())}</Text>
</View>
) : ''}
          <View style={calendar.daysWeek}>
              <DaysOfTheWeek month={11} />
          </View>
            <View style={calendar.daysContainer}>
              <MonthsInDay month={11} />
            </View>
        </View>

        <View style={[calendar.wrap, calendar.wrap4]}>
          <View style={calendar.head}><Text style={calendar.headMonth}>{allMonths[11]} {consultant.calcPersonalMonth(12, newDate.year())}{consultant.calcPersonalMonthISK(12, newDate.year())}/{consultant.calcUniversalMonth(12, newDate.year())}{consultant.calcUniversalMonthISK(12, newDate.year())}</Text></View>
          <View style={calendar.head}><Text style={calendar.headQuater}>Cuatrimestre: {consultant.getQuaterMonth(12, newDate.year())}{consultant.getQuaterMonthISK(12, newDate.year())}</Text></View>
          <View style={[calendar.week1, { backgroundColor: `${(sem1 === true && newDate.month() + 1 === 12) ? '#DCA8A9' : ''}` }]}>
            <Text style={calendar.weektext}>1a Sem</Text>
            <Text style={[calendar.weektext, { fontWeight: 'bold' }]}>{consultant.calcSelectPersonalWeek(12, 1, newDate.year())}{consultant.calcSelectPersonalWeekISK(12, 1, newDate.year())}/{consultant.calcUniversalWeek(12, 1, newDate.year())}{consultant.calcUniversalWeekISK(12, 1, newDate.year())}</Text>
          </View>
          <View style={[calendar.week2, { backgroundColor: `${(sem2 === true && newDate.month() + 1 === 12) ? '#DCA8A9' : ''}` }]}>
            <Text style={calendar.weektext}>2a Sem</Text>
            <Text style={[calendar.weektext, { fontWeight: 'bold' }]}>{consultant.calcSelectPersonalWeek(12, 2, newDate.year())}{consultant.calcSelectPersonalWeekISK(12, 2, newDate.year())}/{consultant.calcUniversalWeek(12, 2, newDate.year())}{consultant.calcUniversalWeekISK(12, 2, newDate.year())}</Text>
          </View>
          <View style={[calendar.week3, { backgroundColor: `${(sem3 === true && newDate.month() + 1 === 12) ? '#DCA8A9' : ''}` }]}>
            <Text style={calendar.weektext}>3a Sem</Text>
            <Text style={[calendar.weektext, { fontWeight: 'bold' }]}>{consultant.calcSelectPersonalWeek(12, 3, newDate.year())}{consultant.calcSelectPersonalWeekISK(12, 3, newDate.year())}/{consultant.calcUniversalWeek(12, 3, newDate.year())}{consultant.calcUniversalWeekISK(12, 3, newDate.year())}</Text>
          </View>
          <View style={[calendar.week4, { backgroundColor: `${(sem4 === true && newDate.month() + 1 === 12) ? '#DCA8A9' : ''}` }]}>
            <Text style={calendar.weektext}>4a Sem</Text>
            <Text style={[calendar.weektext, { fontWeight: 'bold' }]}>{consultant.calcSelectPersonalWeek(12, 4, newDate.year())}{consultant.calcSelectPersonalWeekISK(12, 4, newDate.year())}/{consultant.calcUniversalWeek(12, 4, newDate.year())}{consultant.calcUniversalWeekISK(12, 4, newDate.year())}</Text>
          </View>
          {diciembre.length > 28
          ? (
<View style={[calendar.week5, { backgroundColor: `${(sem4 === true && newDate.month() + 1 === 12) ? '#DCA8A9' : ''}` }]}>
            <Text style={calendar.weektext}>4a Sem</Text>
            <Text style={[calendar.weektext, { fontWeight: 'bold' }]}>{consultant.calcSelectPersonalWeek(12, 4, newDate.year())}{consultant.calcSelectPersonalWeekISK(12, 4, newDate.year())}/{consultant.calcUniversalWeek(12, 4, newDate.year())}{consultant.calcUniversalWeekISK(12, 4, newDate.year())}</Text>
</View>
) : ''}
          <View style={calendar.daysWeek}>
              <DaysOfTheWeek month={12} />
          </View>
            <View style={calendar.daysContainer}>
              <MonthsInDay month={12} />
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
    left: '262px'
  },
  wrap5: {
    top: '304px',
    left: '15px'
  },
  wrap6: {
    top: '305px',
    left: '262px'
  },
  wrap7: {
    top: '455px',
    left: '15px'
  },
  wrap8: {
    top: '456px',
    left: '262px'
  },
  head: {
    width: '100px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  week1: {
    width: '33px',
    display: 'block',
    top: '112px',
    left: '28px',
    position: 'absolute'
  },
  week2: {
    width: '33px',
    display: 'block',
    top: '129px',
    left: '28px',
    position: 'absolute'
  },
  week3: {
    width: '33px',
    display: 'block',
    top: '145px',
    left: '28px',
    position: 'absolute'
  },
  week4: {
    width: '33px',
    display: 'block',
    top: '164px',
    left: '28px',
    position: 'absolute'
  },
  week5: {
    width: '33px',
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