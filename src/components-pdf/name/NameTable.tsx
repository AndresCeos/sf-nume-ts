import React from 'react';
import { StyleSheet, Text, View } from '@react-pdf/renderer'

export const NameTable: React.FC<{ consultant }> = ({ consultant }) => {
  const { name, lastName, scdLastName } = consultant
  console.log(name)
  const names = name.split('-')
  console.log(names)
  const ungroupNames = names.map(el => {
    return {
      name: consultant.getUngroupName(el),
      values: consultant.getUngroupNameValues(el),
      total: consultant.getUngroupNameTotal(el)
    }
  })

  const ungroupLast = consultant.getUngroupName(lastName)
  const ungroupLastV = consultant.getUngroupNameValues(lastName)
  const ungroupLastT = consultant.getUngroupNameTotal(lastName)

  for (let index = ungroupLast.length; index < 28; index++) {
    ungroupLast.push([])
  }

  const ungroupSCDLast = consultant.getUngroupName(scdLastName)
  const ungroupSCDLastV = consultant.getUngroupNameValues(scdLastName)
  const ungroupSCDLastT = consultant.getUngroupNameTotal(scdLastName)

  for (let index = ungroupSCDLast.length; index < 28; index++) {
    ungroupSCDLast.push([])
  }

  const ungroupName = consultant.getUngroupName(name)
  const ungroupNameV = consultant.getUngroupNameValues(name)
  const ungroupNameT = consultant.getUngroupNameTotal(name)

  for (let index = ungroupName.length; index < 28; index++) {
    ungroupName.push([])
  }

  const table = (name) => {
    return name.map((el, i) => (
      <>
        <View style={[pinnacleName.name, { top: 16, left: 33 + (i * 14) }]}>
          <Text>
            {el.v !== 0 ? el.v : ''}
          </Text>
        </View>
        <View style={[pinnacleName.name, { top: 30, left: 33 + (i * 14) }]}>
          <Text>
            {el.L}
          </Text>
        </View>
        <View style={[pinnacleName.name, { top: 44, left: 33 + (i * 14) }]}>
          <Text>
            {el.c !== 0 ? el.c : ''}
          </Text>
        </View>
      </>
    ))
  }
  const results = (values, total, top = 0) => {
    return (
<>
      <View style={[pinnacleName.name, { top: (top + 14), left: 468 }]}>
        <Text>
          {values[0].v !== 0 ? values[0].v : ''}
        </Text>
      </View>
      <View style={[pinnacleName.name, { top: (top + 43), left: 468 }]}>
        <Text>
          {values[0].c !== 0 ? values[0].c : ''}
        </Text>
      </View>
      <View style={[pinnacleName.name, { top: (top + 14), left: 489 }]}>
        <Text>
          {total[0].v !== 0 ? total[0].v : ''}
        </Text>
      </View>
      <View style={[pinnacleName.name, { top: (top + 28), left: 489 }]}>
        <Text>
          {total[0].L}
        </Text>
      </View>
      <View style={[pinnacleName.name, { top: (top + 43), left: 489 }]}>
        <Text>
          {total[0].c !== 0 ? total[0].c : ''}
        </Text>
      </View>
</>
)
  }

  return (
    <View style={pinnacleName.container}>
      {ungroupNames.map((ungroup, i) => (
        <>
          <View style={[pinnacleName.wrap, { top: (63 * i) }]}>
            {table(ungroup.name)}
          </View>
          <View style={[pinnacleName.wrap, { top: (63 * i) }]}>
            {results(ungroup.values, ungroup.total)}
          </View>
        </>
      ))}

      <View style={[pinnacleName.wrap, { top: 125 }]}>
        {table(ungroupLast)}
      </View>
      <View style={[pinnacleName.wrap, { top: 125 }]}>
        {results(ungroupLastV, ungroupLastT)}
      </View>

      <View style={[pinnacleName.wrap, { top: 188 }]}>
        {table(ungroupSCDLast)}
      </View>
      <View style={[pinnacleName.wrap, { top: 188 }]}>
        {results(ungroupSCDLastV, ungroupSCDLastT)}
      </View>

      <View style={[pinnacleName.wrap, { top: 251 }]}>
        {table(ungroupName)}
      </View>
      <View style={[pinnacleName.wrap, { top: 252 }]}>
        {results(ungroupNameV, ungroupNameT)}
      </View>
    </View>
  )
}
export const pinnacleName = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '115px',
    left: '11px',
    fontSize: '7px',
    width: '536px',
    // backgroundColor: 'red'
  },
  wrap: {
    position: 'relative'
  },
  circle: {
    // backgroundColor: '#00000090',
    position: 'absolute',
    width: '30px',
    height: '30px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000',
    fontSize: '8px',
    top: '39px',
  },
  name: {
    position: 'absolute',
    top: '16px',
    left: '33px',
    // backgroundColor: '#00000090',
    width: '14px',
    height: '14px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  soul: {
    left: '90px',
  },
  soul_expresion: {
    left: '161px',
  },
})