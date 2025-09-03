import Universal from '@/resources/Universal';
import {
  Image, StyleSheet, Text, View,
} from '@react-pdf/renderer';
import React from 'react';
import bgBlue from '../assets/backBlue.png';
import bgRed from '../assets/bgRed.png';
import borderRed from '../assets/brRed3.png';

export const Circle: React.FC<{ consultant, newDate }> = ({ consultant, newDate }) => {
  const currentYear = newDate.year();
  const currentMonth = newDate.month() + 1;
  const u = new Universal();
  return (
    <View style={circle.container}>

      <View style={[circle.year, { top: 210, left: 245 }]}>
        <Text>{consultant.calcPersonalYear(currentYear)}</Text>
      </View>
      <Text style={[circle.circleFont, { top: 235, left: 100 }]}>
        {consultant.calcSelectPersonalWeek(1, 1, currentYear)}
        {consultant.calcSelectPersonalWeekISK(1, 1, currentYear)}
      </Text>
      <Text style={[circle.circleFont, { top: 255, left: 105 }]}>
        {consultant.calcSelectPersonalWeek(1, 2, currentYear)}
        {consultant.calcSelectPersonalWeekISK(1, 2, currentYear)}
      </Text>
      <Text style={[circle.circleFont, { top: 275, left: 110 }]}>
        {consultant.calcSelectPersonalWeek(1, 3, currentYear)}
        {consultant.calcSelectPersonalWeekISK(1, 3, currentYear)}
      </Text>
      <Text style={[circle.circleFont, { top: 295, left: 115 }]}>
        {consultant.calcSelectPersonalWeek(1, 4, currentYear)}
        {consultant.calcSelectPersonalWeekISK(1, 4, currentYear)}
      </Text>

      <Text style={[circle.circleFont, { top: 320, left: 130 }]}>
        {consultant.calcSelectPersonalWeek(2, 1, currentYear)}
        {consultant.calcSelectPersonalWeekISK(2, 1, currentYear)}
      </Text>
      <Text style={[circle.circleFont, { top: 335, left: 145 }]}>
        {consultant.calcSelectPersonalWeek(2, 2, currentYear)}
        {consultant.calcSelectPersonalWeekISK(2, 2, currentYear)}
      </Text>
      <Text style={[circle.circleFont, { top: 350, left: 160 }]}>
        {consultant.calcSelectPersonalWeek(2, 3, currentYear)}
        {consultant.calcSelectPersonalWeekISK(2, 3, currentYear)}
      </Text>
      <Text style={[circle.circleFont, { top: 365, left: 175 }]}>
        {consultant.calcSelectPersonalWeek(2, 4, currentYear)}
        {consultant.calcSelectPersonalWeekISK(2, 4, currentYear)}
      </Text>

      <Text style={[circle.circleFont, { top: 375, left: 195 }]}>
        {consultant.calcSelectPersonalWeek(3, 1, currentYear)}
        {consultant.calcSelectPersonalWeekISK(3, 1, currentYear)}
      </Text>
      <Text style={[circle.circleFont, { top: 385, left: 215 }]}>
        {consultant.calcSelectPersonalWeek(3, 2, currentYear)}
        {consultant.calcSelectPersonalWeekISK(3, 2, currentYear)}
      </Text>
      <Text style={[circle.circleFont, { top: 390, left: 235 }]}>
        {consultant.calcSelectPersonalWeek(3, 3, currentYear)}
        {consultant.calcSelectPersonalWeekISK(3, 3, currentYear)}
      </Text>
      <Text style={[circle.circleFont, { top: 395, left: 255 }]}>
        {consultant.calcSelectPersonalWeek(3, 4, currentYear)}
        {consultant.calcSelectPersonalWeekISK(3, 4, currentYear)}
      </Text>

      <Text style={[circle.circleFont, { top: 395, left: 280 }]}>
        {consultant.calcSelectPersonalWeek(4, 1, currentYear)}
        {consultant.calcSelectPersonalWeekISK(4, 1, currentYear)}
      </Text>
      <Text style={[circle.circleFont, { top: 390, left: 300 }]}>
        {consultant.calcSelectPersonalWeek(4, 2, currentYear)}
        {consultant.calcSelectPersonalWeekISK(4, 2, currentYear)}
      </Text>
      <Text style={[circle.circleFont, { top: 385, left: 320 }]}>
        {consultant.calcSelectPersonalWeek(4, 3, currentYear)}
        {consultant.calcSelectPersonalWeekISK(4, 3, currentYear)}
      </Text>
      <Text style={[circle.circleFont, { top: 380, left: 340 }]}>
        {consultant.calcSelectPersonalWeek(4, 4, currentYear)}
        {consultant.calcSelectPersonalWeekISK(4, 4, currentYear)}
      </Text>

      <Text style={[circle.circleFont, { top: 365, left: 360 }]}>
        {consultant.calcSelectPersonalWeek(5, 1, currentYear)}
        {consultant.calcSelectPersonalWeekISK(5, 1, currentYear)}
      </Text>
      <Text style={[circle.circleFont, { top: 350, left: 375 }]}>
        {consultant.calcSelectPersonalWeek(5, 2, currentYear)}
        {consultant.calcSelectPersonalWeekISK(5, 2, currentYear)}
      </Text>
      <Text style={[circle.circleFont, { top: 335, left: 390 }]}>
        {consultant.calcSelectPersonalWeek(5, 3, currentYear)}
        {consultant.calcSelectPersonalWeekISK(5, 3, currentYear)}
      </Text>
      <Text style={[circle.circleFont, { top: 320, left: 405 }]}>
        {consultant.calcSelectPersonalWeek(5, 4, currentYear)}
        {consultant.calcSelectPersonalWeekISK(5, 4, currentYear)}
      </Text>

      <Text style={[circle.circleFont, { top: 300, left: 415 }]}>
        {consultant.calcSelectPersonalWeek(6, 1, currentYear)}
        {consultant.calcSelectPersonalWeekISK(6, 1, currentYear)}
      </Text>
      <Text style={[circle.circleFont, { top: 280, left: 425 }]}>
        {consultant.calcSelectPersonalWeek(6, 2, currentYear)}
        {consultant.calcSelectPersonalWeekISK(6, 2, currentYear)}
      </Text>
      <Text style={[circle.circleFont, { top: 255, left: 430 }]}>
        {consultant.calcSelectPersonalWeek(6, 3, currentYear)}
        {consultant.calcSelectPersonalWeekISK(6, 3, currentYear)}
      </Text>
      <Text style={[circle.circleFont, { top: 235, left: 435 }]}>
        {consultant.calcSelectPersonalWeek(6, 4, currentYear)}
        {consultant.calcSelectPersonalWeekISK(6, 4, currentYear)}
      </Text>

      <Text style={[circle.circleFont, { top: 215, left: 435 }]}>
        {consultant.calcSelectPersonalWeek(7, 1, currentYear)}
        {consultant.calcSelectPersonalWeekISK(7, 1, currentYear)}
      </Text>
      <Text style={[circle.circleFont, { top: 195, left: 425 }]}>
        {consultant.calcSelectPersonalWeek(7, 2, currentYear)}
        {consultant.calcSelectPersonalWeekISK(7, 2, currentYear)}
      </Text>
      <Text style={[circle.circleFont, { top: 170, left: 425 }]}>
        {consultant.calcSelectPersonalWeek(7, 3, currentYear)}
        {consultant.calcSelectPersonalWeekISK(7, 3, currentYear)}
      </Text>
      <Text style={[circle.circleFont, { top: 150, left: 420 }]}>
        {consultant.calcSelectPersonalWeek(7, 4, currentYear)}
        {consultant.calcSelectPersonalWeekISK(7, 4, currentYear)}
      </Text>

      <Text style={[circle.circleFont, { top: 130, left: 405 }]}>
        {consultant.calcSelectPersonalWeek(8, 1, currentYear)}
        {consultant.calcSelectPersonalWeekISK(8, 1, currentYear)}
      </Text>
      <Text style={[circle.circleFont, { top: 115, left: 390 }]}>
        {consultant.calcSelectPersonalWeek(8, 2, currentYear)}
        {consultant.calcSelectPersonalWeekISK(8, 2, currentYear)}
      </Text>
      <Text style={[circle.circleFont, { top: 100, left: 375 }]}>
        {consultant.calcSelectPersonalWeek(8, 3, currentYear)}
        {consultant.calcSelectPersonalWeekISK(8, 3, currentYear)}
      </Text>
      <Text style={[circle.circleFont, { top: 85, left: 360 }]}>
        {consultant.calcSelectPersonalWeek(8, 4, currentYear)}
        {consultant.calcSelectPersonalWeekISK(8, 4, currentYear)}
      </Text>

      <Text style={[circle.circleFont, { top: 75, left: 340 }]}>
        {consultant.calcSelectPersonalWeek(9, 1, currentYear)}
        {consultant.calcSelectPersonalWeekISK(9, 1, currentYear)}
      </Text>
      <Text style={[circle.circleFont, { top: 65, left: 320 }]}>
        {consultant.calcSelectPersonalWeek(9, 2, currentYear)}
        {consultant.calcSelectPersonalWeekISK(9, 2, currentYear)}
      </Text>
      <Text style={[circle.circleFont, { top: 60, left: 300 }]}>
        {consultant.calcSelectPersonalWeek(9, 3, currentYear)}
        {consultant.calcSelectPersonalWeekISK(9, 3, currentYear)}
      </Text>
      <Text style={[circle.circleFont, { top: 60, left: 275 }]}>
        {consultant.calcSelectPersonalWeek(9, 4, currentYear)}
        {consultant.calcSelectPersonalWeekISK(9, 4, currentYear)}
      </Text>

      <Text style={[circle.circleFont, { top: 60, left: 255 }]}>
        {consultant.calcSelectPersonalWeek(10, 1, currentYear)}
        {consultant.calcSelectPersonalWeekISK(10, 1, currentYear)}
      </Text>
      <Text style={[circle.circleFont, { top: 60, left: 235 }]}>
        {consultant.calcSelectPersonalWeek(10, 2, currentYear)}
        {consultant.calcSelectPersonalWeekISK(10, 2, currentYear)}
      </Text>
      <Text style={[circle.circleFont, { top: 65, left: 215 }]}>
        {consultant.calcSelectPersonalWeek(10, 3, currentYear)}
        {consultant.calcSelectPersonalWeekISK(10, 3, currentYear)}
      </Text>
      <Text style={[circle.circleFont, { top: 75, left: 195 }]}>
        {consultant.calcSelectPersonalWeek(10, 4, currentYear)}
        {consultant.calcSelectPersonalWeekISK(10, 4, currentYear)}
      </Text>

      <Text style={[circle.circleFont, { top: 85, left: 170 }]}>
        {consultant.calcSelectPersonalWeek(11, 1, currentYear)}
        {consultant.calcSelectPersonalWeekISK(11, 1, currentYear)}
      </Text>
      <Text style={[circle.circleFont, { top: 100, left: 160 }]}>
        {consultant.calcSelectPersonalWeek(11, 2, currentYear)}
        {consultant.calcSelectPersonalWeekISK(11, 2, currentYear)}
      </Text>
      <Text style={[circle.circleFont, { top: 115, left: 145 }]}>
        {consultant.calcSelectPersonalWeek(11, 3, currentYear)}
        {consultant.calcSelectPersonalWeekISK(11, 3, currentYear)}
      </Text>
      <Text style={[circle.circleFont, { top: 135, left: 130 }]}>
        {consultant.calcSelectPersonalWeek(11, 4, currentYear)}
        {consultant.calcSelectPersonalWeekISK(11, 4, currentYear)}
      </Text>

      <Text style={[circle.circleFont, { top: 150, left: 120 }]}>
        {consultant.calcSelectPersonalWeek(12, 1, currentYear)}
        {consultant.calcSelectPersonalWeekISK(12, 1, currentYear)}
      </Text>
      <Text style={[circle.circleFont, { top: 175, left: 110 }]}>
        {consultant.calcSelectPersonalWeek(12, 2, currentYear)}
        {consultant.calcSelectPersonalWeekISK(12, 2, currentYear)}
      </Text>
      <Text style={[circle.circleFont, { top: 195, left: 105 }]}>
        {consultant.calcSelectPersonalWeek(12, 3, currentYear)}
        {consultant.calcSelectPersonalWeekISK(12, 3, currentYear)}
      </Text>
      <Text style={[circle.circleFont, { top: 215, left: 100 }]}>
        {consultant.calcSelectPersonalWeek(12, 4, currentYear)}
        {consultant.calcSelectPersonalWeekISK(12, 4, currentYear)}
      </Text>

      <Text style={[circle.circleFont, { top: 250, left: 150 }, circle.w30]}>
        {consultant.calcPersonalMonth(1, currentYear)}
        {consultant.calcPersonalMonthISK(1, currentYear)}
        {' '}
        /
        {u.calcUniversalMonth(1, currentYear)}
        {u.calcUniversalMonthISK(1, currentYear)}
      </Text>
      <Text style={[circle.circleFont, { top: 300, left: 175 }, circle.w30]}>
        {consultant.calcPersonalMonth(2, currentYear)}
        {consultant.calcPersonalMonthISK(2, currentYear)}
        {' '}
        /
        {u.calcUniversalMonth(2, currentYear)}
        {u.calcUniversalMonthISK(2, currentYear)}
      </Text>
      <Text style={[circle.circleFont, { top: 330, left: 220 }, circle.w30]}>
        {consultant.calcPersonalMonth(3, currentYear)}
        {consultant.calcPersonalMonthISK(3, currentYear)}
        {' '}
        /
        {u.calcUniversalMonth(3, currentYear)}
        {u.calcUniversalMonthISK(3, currentYear)}
      </Text>

      <Text style={[circle.circleFont, { top: 330, left: 285 }, circle.w30]}>
        {consultant.calcPersonalMonth(4, currentYear)}
        {consultant.calcPersonalMonthISK(4, currentYear)}
        {' '}
        /
        {u.calcUniversalMonth(4, currentYear)}
        {u.calcUniversalMonthISK(4, currentYear)}
      </Text>
      <Text style={[circle.circleFont, { top: 300, left: 335 }, circle.w30]}>
        {consultant.calcPersonalMonth(5, currentYear)}
        {consultant.calcPersonalMonthISK(5, currentYear)}
        {' '}
        /
        {u.calcUniversalMonth(5, currentYear)}
        {u.calcUniversalMonthISK(5, currentYear)}
      </Text>
      <Text style={[circle.circleFont, { top: 250, left: 370 }, circle.w30]}>
        {consultant.calcPersonalMonth(6, currentYear)}
        {consultant.calcPersonalMonthISK(6, currentYear)}
        {' '}
        /
        {u.calcUniversalMonth(6, currentYear)}
        {u.calcUniversalMonthISK(6, currentYear)}
      </Text>

      <Text style={[circle.circleFont, { top: 195, left: 370 }, circle.w30]}>
        {consultant.calcPersonalMonth(7, currentYear)}
        {consultant.calcPersonalMonthISK(7, currentYear)}
        {' '}
        /
        {u.calcUniversalMonth(7, currentYear)}
        {u.calcUniversalMonthISK(7, currentYear)}
      </Text>
      <Text style={[circle.circleFont, { top: 140, left: 335 }, circle.w30]}>
        {consultant.calcPersonalMonth(8, currentYear)}
        {consultant.calcPersonalMonthISK(8, currentYear)}
        {' '}
        /
        {u.calcUniversalMonth(8, currentYear)}
        {u.calcUniversalMonthISK(8, currentYear)}
      </Text>
      <Text style={[circle.circleFont, { top: 105, left: 290 }, circle.w30]}>
        {consultant.calcPersonalMonth(9, currentYear)}
        {consultant.calcPersonalMonthISK(9, currentYear)}
        {' '}
        /
        {u.calcUniversalMonth(9, currentYear)}
        {u.calcUniversalMonthISK(9, currentYear)}
      </Text>

      <Text style={[circle.circleFont, { top: 105, left: 230 }, circle.w30]}>
        {consultant.calcPersonalMonth(10, currentYear)}
        {consultant.calcPersonalMonthISK(12, currentYear)}
        {' '}
        /
        {u.calcUniversalMonth(10, currentYear)}
        {u.calcUniversalMonthISK(10, currentYear)}
      </Text>
      <Text style={[circle.circleFont, { top: 140, left: 170 }, circle.w30]}>
        {consultant.calcPersonalMonth(11, currentYear)}
        {consultant.calcPersonalMonthISK(11, currentYear)}
        {' '}
        /
        {u.calcUniversalMonth(11, currentYear)}
        {u.calcUniversalMonthISK(11, currentYear)}
      </Text>
      <Text style={[circle.circleFont, { top: 195, left: 150 }, circle.w30]}>
        {consultant.calcPersonalMonth(12, currentYear)}
        {consultant.calcPersonalMonthISK(10, currentYear)}
        {' '}
        /
        {u.calcUniversalMonth(12, currentYear)}
        {u.calcUniversalMonthISK(12, currentYear)}
      </Text>

      <Text style={[circle.circleFont, { top: 240, left: 210 }]}>
        {consultant.getQuaterMonth(1, currentYear)}
        {consultant.getQuaterMonthISK(1, currentYear)}
      </Text>
      <Text style={[circle.circleFont, { top: 265, left: 225 }]}>
        {consultant.getQuaterMonth(2, currentYear)}
        {consultant.getQuaterMonthISK(2, currentYear)}
      </Text>
      <Text style={[circle.circleFont, { top: 280, left: 250 }]}>
        {consultant.getQuaterMonth(3, currentYear)}
        {consultant.getQuaterMonthISK(3, currentYear)}
      </Text>

      <Text style={[circle.circleFont, { top: 280, left: 280 }]}>
        {consultant.getQuaterMonth(4, currentYear)}
        {consultant.getQuaterMonthISK(4, currentYear)}
      </Text>
      <Text style={[circle.circleFont, { top: 265, left: 305 }]}>
        {consultant.getQuaterMonth(5, currentYear)}
        {consultant.getQuaterMonthISK(5, currentYear)}
      </Text>
      <Text style={[circle.circleFont, { top: 240, left: 320 }]}>
        {consultant.getQuaterMonth(6, currentYear)}
        {consultant.getQuaterMonthISK(6, currentYear)}
      </Text>

      <Text style={[circle.circleFont, { top: 210, left: 320 }]}>
        {consultant.getQuaterMonth(7, currentYear)}
        {consultant.getQuaterMonthISK(7, currentYear)}
      </Text>
      <Text style={[circle.circleFont, { top: 185, left: 305 }]}>
        {consultant.getQuaterMonth(8, currentYear)}
        {consultant.getQuaterMonthISK(8, currentYear)}
      </Text>
      <Text style={[circle.circleFont, { top: 170, left: 280 }]}>
        {consultant.getQuaterMonth(9, currentYear)}
        {consultant.getQuaterMonthISK(9, currentYear)}
      </Text>

      <Text style={[circle.circleFont, { top: 170, left: 250 }]}>
        {consultant.getQuaterMonth(10, currentYear)}
        {consultant.getQuaterMonthISK(10, currentYear)}
      </Text>
      <Text style={[circle.circleFont, { top: 185, left: 225 }]}>
        {consultant.getQuaterMonth(11, currentYear)}
        {consultant.getQuaterMonthISK(11, currentYear)}
      </Text>
      <Text style={[circle.circleFont, { top: 210, left: 210 }]}>
        {consultant.getQuaterMonth(12, currentYear)}
        {consultant.getQuaterMonthISK(12, currentYear)}
      </Text>

      {currentMonth !== 1 && currentMonth > 1 ? <Image style={[circle.img, circle.pos1]} src={bgBlue} /> : ''}
      {currentMonth !== 2 && currentMonth > 2 ? <Image style={[circle.img, circle.pos2, circle.rotatePos2]} src={bgBlue} /> : ''}
      {currentMonth !== 3 && currentMonth > 3 ? <Image style={[circle.img, circle.pos3, circle.rotatePos3]} src={bgBlue} /> : ''}
      {currentMonth !== 4 && currentMonth > 4 ? <Image style={[circle.img, circle.pos4, circle.rotatePos4]} src={bgBlue} /> : ''}
      {currentMonth !== 5 && currentMonth > 5 ? <Image style={[circle.img, circle.pos5, circle.rotatePos5]} src={bgBlue} /> : ''}
      {currentMonth !== 6 && currentMonth > 6 ? <Image style={[circle.img, circle.pos6, circle.rotatePos6]} src={bgBlue} /> : ''}
      {currentMonth !== 7 && currentMonth > 7 ? <Image style={[circle.img, circle.pos7, circle.rotatePos7]} src={bgBlue} /> : ''}
      {currentMonth !== 8 && currentMonth > 8 ? <Image style={[circle.img, circle.pos8, circle.rotatePos8]} src={bgBlue} /> : ''}
      {currentMonth !== 9 && currentMonth > 9 ? <Image style={[circle.img, circle.pos9, circle.rotatePos9]} src={bgBlue} /> : ''}
      {currentMonth !== 10 && currentMonth > 10 ? <Image style={[circle.img, circle.pos10, circle.rotatePos10]} src={bgBlue} /> : ''}
      {currentMonth !== 11 && currentMonth > 11 ? <Image style={[circle.img, circle.pos11, circle.rotatePos11]} src={bgBlue} /> : ''}
      {currentMonth !== 12 && currentMonth > 12 ? <Image style={[circle.img, circle.pos12, circle.rotatePos12]} src={bgBlue} /> : ''}

      {currentMonth === 1 ? (
        <>
          <Image style={[circle.img, circle.pos1]} src={bgRed} />
          <Image style={[circle.img, circle.pos1]} src={borderRed} />
        </>
      ) : ''}
      {currentMonth === 2 ? (
        <>
          <Image style={[circle.img, circle.pos2, circle.rotatePos2]} src={bgRed} />
          <Image style={[circle.img, circle.pos2, circle.rotatePos2]} src={borderRed} />
        </>
      ) : ''}
      {currentMonth === 3 ? (
        <>
          <Image style={[circle.img, circle.pos3, circle.rotatePos3]} src={bgRed} />
          <Image style={[circle.img, circle.pos3, circle.rotatePos3]} src={borderRed} />
        </>
      ) : ''}
      {currentMonth === 4 ? (
        <>
          <Image style={[circle.img, circle.pos4, circle.rotatePos4]} src={bgRed} />
          <Image style={[circle.img, circle.pos4, circle.rotatePos4]} src={borderRed} />
        </>
      ) : ''}
      {currentMonth === 5 ? (
        <>
          <Image style={[circle.img, circle.pos5, circle.rotatePos5]} src={bgRed} />
          <Image style={[circle.img, circle.pos5, circle.rotatePos5]} src={borderRed} />
        </>
      ) : ''}
      {currentMonth === 6 ? (
        <>
          <Image style={[circle.img, circle.pos6, circle.rotatePos6]} src={bgRed} />
          <Image style={[circle.img, circle.pos6, circle.rotatePos6]} src={borderRed} />
        </>
      ) : ''}
      {currentMonth === 7 ? (
        <>
          <Image style={[circle.img, circle.pos7, circle.rotatePos7]} src={bgRed} />
          <Image style={[circle.img, circle.pos7, circle.rotatePos7]} src={borderRed} />
        </>
      ) : ''}
      {currentMonth === 8 ? (
        <>
          <Image style={[circle.img, circle.pos8, circle.rotatePos8]} src={bgRed} />
          <Image style={[circle.img, circle.pos8, circle.rotatePos8]} src={borderRed} />
        </>
      ) : ''}
      {currentMonth === 9 ? (
        <>
          <Image style={[circle.img, circle.pos9, circle.rotatePos9]} src={bgRed} />
          <Image style={[circle.img, circle.pos9, circle.rotatePos9]} src={borderRed} />
        </>
      ) : ''}
      {currentMonth === 10 ? (
        <>
          <Image style={[circle.img, circle.pos10, circle.rotatePos10]} src={bgRed} />
          <Image style={[circle.img, circle.pos10, circle.rotatePos10]} src={borderRed} />
        </>
      ) : ''}
      {currentMonth === 11 ? (
        <>
          <Image style={[circle.img, circle.pos11, circle.rotatePos11]} src={bgRed} />
          <Image style={[circle.img, circle.pos11, circle.rotatePos11]} src={borderRed} />
        </>
      ) : ''}
      {currentMonth === 12 ? (
        <>
          <Image style={[circle.img, circle.pos12, circle.rotatePos12]} src={bgRed} />
          <Image style={[circle.img, circle.pos12, circle.rotatePos12]} src={borderRed} />
        </>
      ) : ''}
    </View>
  );
};
export const circle = StyleSheet.create({
  container: {
    position: 'absolute',
  },
  img: {
    width: '143px',
    height: '90px',
    position: 'absolute',
  },
  pos1: {
    top: '234px',
    left: '90px',
  },
  pos2: {
    top: '281px',
    left: '129px',
  },
  rotatePos2: {
    transform: 'rotate(-30)',
  },
  pos3: {
    top: '304px',
    left: '185 px',
  },
  rotatePos3: {
    transform: 'rotate(-60)',
  },
  pos4: {
    top: '296px',
    left: '245px',
  },
  rotatePos4: {
    transform: 'rotate(-90)',
  },
  pos5: {
    top: '257px',
    left: '292px',
  },
  rotatePos5: {
    transform: 'rotate(-120)',
  },
  pos6: {
    top: '202px',
    left: '313px',
  },
  rotatePos6: {
    transform: 'rotate(-150)',
  },
  pos7: {
    top: '143px',
    left: '307px',
  },
  rotatePos7: {
    transform: 'rotate(-180)',
  },
  pos8: {
    top: '95px',
    left: '269px',
  },
  rotatePos8: {
    transform: 'rotate(150)',
  },
  pos9: {
    top: '72px',
    left: '213px',
  },
  rotatePos9: {
    transform: 'rotate(120)',
  },
  pos10: {
    top: '80px',
    left: '154px',
  },
  rotatePos10: {
    transform: 'rotate(90)',
  },
  pos11: {
    top: '117px',
    left: '106px',
  },
  rotatePos11: {
    transform: 'rotate(60)',
  },
  pos12: {
    top: '173px',
    left: '83px',
  },
  rotatePos12: {
    transform: 'rotate(30)',
  },
  year: {
    fontSize: '42px',
    color: '#fff',
    width: 50,
    height: 55,
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleFont: {
    fontSize: '14px',
    position: 'absolute',
  },
  w30: {
    width: '40px',
  },

});
