import { StyleSheet, Text, View } from '@react-pdf/renderer';
import React from 'react';


export const CreateBreakdown: React.FC<{ consultant }> = ({ consultant }) => {
  const createNameData = {
    name: `${consultant.name} ${consultant.lastName} ${consultant.scdLastName}`,
    lastName: '',
    scdLastName: '',
    birthDate: consultant.birthDate,
  }
  const createNameObj = new Person(createNameData)
  const ungroupName = createNameObj.getUngroupName(createNameData.name)
  const ungroupNameT = createNameObj.getUngroupNameTotal(createNameData.name)

  let ungroup = []
  const split = 32
  let tables = 0;
  let count = 0;
  do {
    count = (tables + 1) * split
    const ungroupNameI = ungroupName.slice(tables * split, count);
    while (ungroupNameI.length < 32) {
      ungroupNameI.push({})
    }
    ungroup = [
      ...ungroup,
      {
        ungroupNameI,
      }
    ]
    console.log(tables * split, count)
    tables++
  } while (count < ungroupName.length)

  console.log(ungroup)

  const table = (name, top = 0) => {
    return name.map((el, i) => (
      <>
        <View style={[pinnacleName.circle, { top: 12 + top, left: 34 + (i * 13), backgroundColor: '#e5e5e5' }]}>
          <Text>
            {el.v !== 0 ? el.v : ''}
          </Text>
        </View>
        <View style={[pinnacleName.circle, { top: 26 + top, left: 34 + (i * 13), backgroundColor: '#c2b3c2' }]}>
          <Text>
            {el.L}
          </Text>
        </View>
        <View style={[pinnacleName.circle, { top: 40 + top, left: 34 + (i * 13), backgroundColor: '#e5e5e5' }]}>
          <Text>
            {el.c !== 0 ? el.c : ''}
          </Text>
        </View>
      </>
    ))
  }

  return (
    <View style={pinnacleName.container}>
      <View style={pinnacleName.wrap}>
        {ungroup.map((group, i) => table(group.ungroupNameI, i * 51))}

        <View style={[pinnacleName.circle, { top: 29, left: 470, width: 20, height: 20, border: 0 }]}>
          <Text>
            {ungroupNameT[0].v !== 0 ? ungroupNameT[0].v : ''}
          </Text>
        </View>
        <View style={[pinnacleName.circle, { top: 58, left: 470, width: 20, height: 20, border: 0 }]}>
          <Text>
            {ungroupNameT[0].L}
          </Text>
        </View>
        <View style={[pinnacleName.circle, { top: 84, left: 470, width: 20, height: 20, border: 0 }]}>
          <Text>
            {ungroupNameT[0].c !== 0 ? ungroupNameT[0].c : ''}
          </Text>
        </View>

      </View>
    </View>
  )
}

export const pinnacleName = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '360px',
    left: '17px',
    fontSize: '7px',
    width: '271px',
    backgroundColor: 'red'
  },
  wrap: {
    position: 'relative'
  },
  circle: {
    // backgroundColor: '#0000ff90',
    position: 'absolute',
    width: '14px',
    height: '14px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000',
    fontSize: '10px',
    top: '63px',
    left: 53,
    border: '1px solid #7E7E7E'
  },
})