import { StyleSheet, Text, View } from '@react-pdf/renderer';
import React from 'react';

interface DestinityTableProps {
  consultant: any;
  newDate: any;
  nameCycles: number[];
  nameSubCycles: number[];
  table: any[];
  slice?: number;
  start?: number;
}

export const DestinityTable: React.FC<DestinityTableProps> = ({ consultant, newDate, nameCycles, nameSubCycles, table, slice = 0, start = 0 }) => {
  const single = consultant.getSingle()
  console.log({ consultant, newDate, table, slice, start })

  const consultantAge = consultant.getYearsOld(newDate.year())
  const isCycle = i => {
    return i === consultantAge ? false : nameCycles.includes(i)
  }
  const isSubCycle = i => {
    return i === consultantAge ? false : nameSubCycles.includes(i)
  }
  const bkConfig = (i, bg) => {
    console.log({ i, consultantAge })
    if (i === consultantAge) {
      return '#b95253cc'
    }
    if (isCycle(i)) {
      return '#FBEDD9'
    }
    if (isSubCycle(i)) {
      return '#FFFDEA'
    }
    return bg
  }

  return (
    <View style={pinnacleName.container}>
      <View style={pinnacleName.wrap}>
        <View style={[pinnacleName.table, { top: 288, left: -150 + (slice * 235) }]}>
          <View style={[pinnacleName.item, { paddingLeft: 8, width: 81, height: 15, backgroundColor: '#c2b3c2' }]}>
            <Text>
              Año
            </Text>
          </View>
          <View style={[pinnacleName.item, { paddingLeft: 8, width: 81, height: 15, backgroundColor: '#e5e5e5' }]}>
            <Text>
              Edad
            </Text>
          </View>
          <View style={[pinnacleName.item, { paddingLeft: 8, width: 81, height: 30, backgroundColor: '#ffffff' }]}>
            <Text>
              Plano Mental
            </Text>
          </View>
          <View style={[pinnacleName.item, { paddingLeft: 8, width: 81, height: 30, backgroundColor: '#ffffff' }]}>
            <Text>
              Plano Físico
            </Text>
          </View>
          <View style={[pinnacleName.item, { paddingLeft: 8, width: 81, height: 30, backgroundColor: '#ffffff' }]}>
            <Text>
              Plano Emocional
            </Text>
          </View>
          <View style={[pinnacleName.item, { paddingLeft: 8, width: 81, height: 25, backgroundColor: '#edd7eb' }]}>
            <Text>
              Plano Espiritual
            </Text>
          </View>
          <View style={[pinnacleName.item, { paddingLeft: 8, width: 81, height: 25, backgroundColor: '#ededed', marginTop: 10 }]}>
            <Text>
              Año Personal
            </Text>
          </View>
          <View style={[pinnacleName.item, { paddingLeft: 8, width: 81, height: 25, backgroundColor: '#ffffff' }]}>
            <Text>
              Núm. Destino
            </Text>
          </View>
          {table.map((el, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <View key={`${consultant.getYearOfBirth() + i + start}_${i}`} style={{ position: 'absolute', left: 81 + (i * 19), top: 0 }}>
              <View style={[pinnacleName.item, { width: 19, height: 15, backgroundColor: bkConfig(i + start, '#c2b3c2') }]}>
                <Text>
                  {consultant.getYearOfBirth() + i + start}
                </Text>
              </View>
              <View style={[pinnacleName.item, { width: 19, height: 15, backgroundColor: bkConfig(i + start, '#e5e5e5') }]}>
                <Text>
                  {i + start}
                </Text>
              </View>
              <View style={[pinnacleName.item, { width: 19, height: 15, backgroundColor: bkConfig(i + start, '#ffffff') }]}>
                <Text>
                  {el.pmC}
                </Text>
              </View>
              <View style={[pinnacleName.item, { width: 19, height: 16, fontSize: 6, backgroundColor: bkConfig(i + start, '#ffffff') }]}>
                <Text>
                  {el.pmN}/{el.pmD}
                </Text>
              </View>
              <View style={[pinnacleName.item, { width: 19, height: 15, backgroundColor: bkConfig(i + start, '#ffffff') }]}>
                <Text>
                  {el.pMC}
                </Text>
              </View>
              <View style={[pinnacleName.item, { width: 19, height: 16, fontSize: 6, backgroundColor: bkConfig(i + start, '#ffffff') }]}>
                <Text>
                  {el.pMN}/{el.pMD}
                </Text>
              </View>
              <View style={[pinnacleName.item, { width: 19, height: 15, backgroundColor: bkConfig(i + start, '#ffffff') }]}>
                <Text>
                  {single && el.pfC}
                </Text>
              </View>
              <View style={[pinnacleName.item, { width: 19, height: 16, fontSize: 6, backgroundColor: bkConfig(i + start, '#ffffff') }]}>
                <Text>
                  {single && `${el.pfN}/${el.pfD}`}
                </Text>
              </View>
              <View style={[pinnacleName.item, { width: 19, height: 25, backgroundColor: bkConfig(i + start, '#edd7eb') }]}>
                <Text>
                  {consultant.reduceNumber(el.pmD + el.pMD + (single ? el.pfD : 0))}
                </Text>
              </View>
              <View style={[pinnacleName.item, { width: 19, height: 25, backgroundColor: bkConfig(i + start, '#ededed'), marginTop: 10 }]}>
                <Text>
                  {consultant.calcPersonalYear(consultant.getYearOfBirth() + i + start)}
                </Text>
              </View>
              <View style={[pinnacleName.item, { width: 19, height: 25, backgroundColor: bkConfig(i + start, '#ffffff') }]}>
                <Text>
                  {consultant.reduceNumber(el.pmD + el.pMD + (single ? el.pfD : 0) + consultant.calcPersonalYear(consultant.getYearOfBirth() + i + start))}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  )
}

export const pinnacleName = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '20px',
    left: '35px',
    fontSize: '7px',
    width: '536px',
    // backgroundColor: 'red'
  },
  wrap: {
    position: 'relative'
  },
  table: {
    position: 'relative',
    transform: 'rotate(-90deg)',
  },
  item: {
    display: 'flex',
    justifyContent: 'center',
    border: '1px solid #7E7E7E',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: -1,
    marginLeft: -1,
  }
});