import React from 'react';
import { StyleSheet, Text, View } from '@react-pdf/renderer'

export const NameActive: React.FC<{ consultant }> = ({ consultant }) => {
  const { name, lastName, scdLastName } = consultant

  const names = name.split('-')

  const ungroupNames = names.map(el => {
    return {
      name: consultant.getUngroupName(el),
      values: consultant.getUngroupNameValues(el),
      total: consultant.getUngroupNameTotal(el)
    }
  })

  const ungroupLast = consultant.getUngroupName(lastName)
  const ungroupLastT = consultant.getUngroupNameTotal(lastName)

  for (let index = ungroupLast.length; index < 28; index++) {
    ungroupLast.push([])
  }

  const ungroupSCDLast = consultant.getUngroupName(scdLastName)
  const ungroupSCDLastT = consultant.getUngroupNameTotal(scdLastName)

  for (let index = ungroupSCDLast.length; index < 28; index++) {
    ungroupSCDLast.push([])
  }
  const ungroupNameT = consultant.getUngroupNameTotal(name)


  const row = (config, top = 0) => {
    return (
      <>
        {ungroupNames.map((ungroup, i) => (
          <View style={[pinnacleName.circle, { top, left: (66 + i * 30) }]}>
            <Text>
              {ungroup.total[0][config]}
            </Text>
          </View>
        ))}
        <View style={[pinnacleName.circle, { top, left: 123 }]}>
          <Text>
            {ungroupLastT[0][config]}
          </Text>
        </View>
        <View style={[pinnacleName.circle, { top, left: 150 }]}>
          <Text>
            {ungroupSCDLastT[0][config]}
          </Text>
        </View>
        <View style={[pinnacleName.circle, { top, left: 178 }]}>
          <Text>
            {config === 'v' ? consultant.calcSoulNumberFull() : consultant.calcSoulExpresionFull()}
          </Text>
        </View>
        <View style={[pinnacleName.circle, { top, left: 209 }]}>
          <Text>
            {
              config === 'v'
                ? `${consultant.calcSoulNumber()}${consultant.calcSoulNumberISK()}`
                : `${consultant.calcSoulExpresion()}${consultant.calcSoulExpresionISK()}`
            }
          </Text>
        </View>
      </>
    )
  }

  const rowTotals = (top = 0) => {
    return (
      <>
        {ungroupNames.map((ungroup, i) => (
          <View style={[pinnacleName.circle, { top, left: (66 + i * 30) }]}>
            <Text>
              {consultant.reduceNumber(ungroup.total[0].v + ungroup.total[0].c)}
            </Text>
          </View>
        ))}
        <View style={[pinnacleName.circle, { top, left: 123 }]}>
          <Text>
            {consultant.reduceNumber(ungroupLastT[0].v + ungroupLastT[0].c)}
          </Text>
        </View>
        <View style={[pinnacleName.circle, { top, left: 150 }]}>
          <Text>
            {consultant.reduceNumber(ungroupSCDLastT[0].v + ungroupSCDLastT[0].c)}
          </Text>
        </View>
        <View style={[pinnacleName.circle, { top, left: 178 }]}>
          <Text>
            {consultant.calcNameFull()}
          </Text>
        </View>
        <View style={[pinnacleName.circle, { top, left: 209 }]}>
          <Text>
            {consultant.calcName()}{consultant.calcNameISK()}
          </Text>
        </View>
      </>
    )
  }

  return (
    <View style={pinnacleName.container}>
      <View style={pinnacleName.wrap}>
        {row('v', 14)}
        {row('c', 42)}
        {rowTotals(70)}

        <View style={[pinnacleName.circle, pinnacleName.absences]}>
          <Text>{consultant.getAbsencesName()}</Text>
        </View>
        <View style={[pinnacleName.circle, { top: 42, left: 406, width: 78 }]}>
          <Text>{consultant.getInitials()}</Text>
        </View>
        <View style={[pinnacleName.circle, { top: 42, left: 498 }]}>
          <Text>{consultant.calcInitials()}</Text>
        </View>
        <View style={[pinnacleName.circle, { top: 71, left: 406 }]}>
          <Text>{ungroupNameT[0].vA}</Text>
        </View>
        <View style={[pinnacleName.circle, { top: 71, left: 436 }]}>
          <Text>{ungroupNameT[0].cA}</Text>
        </View>
        <View style={[pinnacleName.circle, { top: 71, left: 466 }]}>
          <Text>{(ungroupNameT[0].cA + ungroupNameT[0].vA)}</Text>
        </View>
        <View style={[pinnacleName.circle, { top: 71, left: 498 }]}>
          <Text>{ungroupNameT[0].L}{consultant.karmicos.includes(consultant.reduceNumberISK(ungroupNameT[0].c + ungroupNameT[0].v)) ? '*' : ''}</Text>
        </View>
      </View>
    </View>
  )
}

export const pinnacleName = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '465px',
    left: '14px',
    fontSize: '7px',
    width: '271px',
    // backgroundColor: 'red'
  },
  wrap: {
    position: 'relative'
  },
  circle: {
    // backgroundColor: '#00000090',
    position: 'absolute',
    width: '20px',
    height: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000',
    fontSize: '12px',
    top: '29px',
  },
  absences: {
    width: '110px',
    color: '#000',
    top: '14px',
    left: '406px'
  }
})