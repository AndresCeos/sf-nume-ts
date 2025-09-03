import { StyleSheet, Text, View } from '@react-pdf/renderer';
import React from 'react';

interface SynastryDataProps {
  synastry: any;
  newDate: any;
  horizontal?: boolean;
}

export const SynastryData: React.FC<SynastryDataProps> = ({ synastry, newDate, horizontal = false }) => {
  const consultant = synastry.consultant
  const partner = synastry.partner
  return (
    <View style={[data.container, horizontal && { transform: 'rotate(-90deg)', width: 660, top: 320, left: -310 }]}>
      <View style={data.partners}>
        <Text style={[data.textName, { top: 18 }, horizontal && { left: 50 }]}>{consultant.fullNameView}</Text>
        <Text style={[data.textBirth, { top: 18 }, horizontal && { right: 220 }]}>{consultant.getFormBirthDate()}</Text>
        <Text style={[data.textAge, { top: 18 }, horizontal && { right: 175 }]}>{consultant.getYearsOld(newDate.year())}</Text>
      </View>
      <View style={data.partners}>
        <Text style={[data.textName, { top: 45 }, horizontal && { left: 50 }]}>{partner.fullNameView}</Text>
        <Text style={[data.textBirth, { top: 45 }, horizontal && { right: 220 }]}>{partner.getFormBirthDate()}</Text>
        <Text style={[data.textAge, { top: 45 }, horizontal && { right: 175 }]}>{partner.getYearsOld(newDate.year())}</Text>
      </View>
      <View>
        <Text style={[data.textYear, horizontal && { top: 45, left: 525 }]}>{partner.yearMeet}</Text>
      </View>
      {/* <Text>-</Text> */}
    </View>
  )
}
export const data = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '30px',
    left: '15px',
    width: '533px',
    // backgroundColor: 'red'
  },
  textName: {
    fontSize: '7px',
    color: '#7E7E7E',
    position: 'absolute',
    width: '240px',
    left: '80px'
  },
  textBirth: {
    fontSize: '7px',
    color: '#7E7E7E',
    position: 'absolute',
    width: '50px',
    right: '65px'
  },
  textAge: {
    fontSize: '7px',
    color: '#7E7E7E',
    position: 'absolute',
    width: '20px',
    right: '10px',
  },
  partners: {
    display: 'flex',
    flexDirection: 'row'
  },
  textYear: {
    fontSize: '7px',
    color: '#7E7E7E',
    position: 'absolute',
    left: '300px',
    top: 75,
  }
})