import { StyleSheet, Text, View } from '@react-pdf/renderer';
import React from 'react';

interface SynastryDestinyTableProps {
  table: any[];
  start: number;
  consultant: any;
  startP: number;
  partner: any;
  tableP: any[];
  newDate: any;
  slice?: number;
}

export const SynastryDestinityTable: React.FC<SynastryDestinyTableProps> = ({ table, start, consultant, startP, partner, tableP, newDate, slice = 0 }) => {
  const singleC = consultant.getSingle()
  const singleP = partner.getSingle()
  const partnerDT = [];
  // console.log( { table, start, consultant, startP, partner, tableP } )
  for (let i = 0; i < table.length; i++) {
    partnerDT.push({
      pmC: table[i].pmC,
      pmN: table[i].pmN,
      pmD: table[i].pmD,
      pMC: table[i].pMC,
      pMN: table[i].pMN,
      pMD: table[i].pMD,
      pfC: (singleC) ? table[i].pfC : '',
      pfN: (singleC) ? table[i].pfN : 0,
      pfD: (singleC) ? table[i].pfD : 0,

      pmCP: tableP[i].pmC,
      pmNP: tableP[i].pmN,
      pmDP: tableP[i].pmD,
      pMCP: tableP[i].pMC,
      pMNP: tableP[i].pMN,
      pMDP: tableP[i].pMD,
      pfCP: singleP ? tableP[i].pfC : '',
      pfNP: singleP ? tableP[i].pfN : 0,
      pfDP: singleP ? tableP[i].pfD : 0,

      pmCPC: `${table[i].pmC} ${tableP[i].pmC}`,
      pmNPC: consultant.reduceNumber(table[i].pmN + tableP[i].pmN),
      pmDPC: consultant.reduceNumber(table[i].pmD + tableP[i].pmD),

      pMCPC: `${table[i].pMC} ${tableP[i].pMC}`,
      pMNPC: consultant.reduceNumber(table[i].pMN + tableP[i].pMN),
      pMDPC: consultant.reduceNumber(table[i].pMD + tableP[i].pMD),

      pfCPC: `${singleC ? table[i].pfC : ''} ${singleP ? tableP[i].pfC : ''}`,
      pfNPC: consultant.reduceNumber((singleC ? table[i].pfN : 0) + (singleP ? tableP[i].pfN : 0)),
      pfDPC: consultant.reduceNumber((singleC ? table[i].pfD : 0) + (singleP ? tableP[i].pfD : 0))
    })
  }
  const birthdayC = consultant.getBirthDate()
  const birthdayP = partner.getBirthDate()
  const getA = (birthdayC.month() + 1) + (birthdayP.month() + 1)
  const getB = (birthdayC.date()) + (birthdayP.date())

  const bkConfig = (i, bg) => {
    console.log(i + consultant.getYearOfBirth(), newDate.year())
    if (newDate.year() === consultant.getYearOfBirth() + i) {
      return '#b9525380';
    }
    return bg;
  }
  const bkConfigFull = (i, bg) => {
    console.log(i + consultant.getYearOfBirth(), newDate.year())
    if (newDate.year() === consultant.getYearOfBirth() + i) {
      return '#b95253';
    }
    return bg;
  }

  const borderRightConfig = (i, item) => {
    if (i + 1 === item.length) {
      return 1;
    }
    return 0;
  }

  return (
    <View style={pinnacleName.container}>
      <View style={pinnacleName.wrap}>
        <View style={[pinnacleName.table, { top: 300, left: -90 + (slice * 235) }]}>
          <View style={[pinnacleName.item, { paddingLeft: 8, width: 75, height: 15, backgroundColor: '#c2b3c2' }]}>
            <Text>
              Año
            </Text>
          </View>
          <View style={[pinnacleName.item, { paddingLeft: 8, width: 75, height: 15, backgroundColor: '#e5e5e5' }]}>
            <Text>
              Edad
            </Text>
          </View>
          <View style={[pinnacleName.item, { paddingLeft: 8, width: 75, height: 30, backgroundColor: '#ffffff' }]}>
            <Text>
              Plano Mental
            </Text>
          </View>
          <View style={[pinnacleName.item, { paddingLeft: 8, width: 75, height: 30, backgroundColor: '#ffffff' }]}>
            <Text>
              Plano Físico
            </Text>
          </View>
          <View style={[pinnacleName.item, { paddingLeft: 8, width: 75, height: 30, backgroundColor: '#ffffff' }]}>
            <Text>
              Plano Emocional
            </Text>
          </View>
          <View style={[pinnacleName.item, { paddingLeft: 8, width: 75, height: 25, backgroundColor: '#edd7eb' }]}>
            <Text>
              Plano Espiritual
            </Text>
          </View>
          <View style={[pinnacleName.item, { paddingLeft: 8, width: 75, height: 25, backgroundColor: '#ededed', marginTop: 10 }]}>
            <Text>
              Año Personal
            </Text>
          </View>
          <View style={[pinnacleName.item, { paddingLeft: 8, width: 75, height: 25, backgroundColor: '#ffffff' }]}>
            <Text>
              Núm. Destino
            </Text>
          </View>
          {partnerDT.map((el, i, item) => (
            <>
              <View
                // eslint-disable-next-line react/no-array-index-key
                key={`${consultant.getYearOfBirth() + i + start}_${i}_partner`}
                style={{ position: 'absolute', left: 81 + (i * 54), top: 0 }}
              >
                ${newDate.year() === consultant.getYearOfBirth() + i + start ? 'bg-red-50' : 'bg-main-30'}`
                <View style={[pinnacleName.item, { width: 19, borderRight: borderRightConfig(i, item), height: 15, fontSize: 6, backgroundColor: bkConfig(i + start, '#c2b3c2') }]}>
                  <Text>
                    {consultant.getYearOfBirth() + i + start}
                  </Text>
                </View>
                <View style={[pinnacleName.item, { width: 19, borderRight: borderRightConfig(i, item), height: 15, backgroundColor: bkConfig(i + start, '#e5e5e5') }]}>
                  <Text>
                    {i + start}
                  </Text>
                </View>
                <View style={[pinnacleName.item, { width: 19, borderRight: borderRightConfig(i, item), height: 15, backgroundColor: bkConfig(i + start, '#ffffff') }]}>
                  <Text>{el.pmC}</Text>
                </View>
                <View style={[pinnacleName.item, { width: 19, borderRight: borderRightConfig(i, item), height: 16, fontSize: 6, backgroundColor: bkConfig(i + start, '#ffffff') }]}>
                  <Text>{el.pmN}/{el.pmD}</Text>
                </View>
                <View style={[pinnacleName.item, { width: 19, borderRight: borderRightConfig(i, item), height: 15, backgroundColor: bkConfig(i + start, '#ffffff') }]}>
                  <Text>{el.pMC}</Text>
                </View>
                <View style={[pinnacleName.item, { width: 19, borderRight: borderRightConfig(i, item), height: 16, fontSize: 6, backgroundColor: bkConfig(i + start, '#ffffff') }]}>
                  <Text>{el.pMN}/{el.pMD}</Text>
                </View>
                <View style={[pinnacleName.item, { width: 19, borderRight: borderRightConfig(i, item), height: 15, backgroundColor: bkConfig(i + start, '#ffffff') }]}>
                  <Text>{el.pfC}</Text>
                </View>
                <View style={[pinnacleName.item, { width: 19, borderRight: borderRightConfig(i, item), height: 16, backgroundColor: bkConfig(i + start, '#ffffff') }]}>
                  <Text>{el.pfN}/{el.pfD}</Text>
                </View>
                <View style={[pinnacleName.item, { width: 19, borderRight: borderRightConfig(i, item), height: 25, backgroundColor: bkConfig(i + start, '#edd7eb') }]}>
                  <Text>{consultant.reduceNumber(el.pmD + el.pMD + el.pfD)}</Text>
                </View>
                <View style={[pinnacleName.item, { width: 19, borderRight: borderRightConfig(i, item), height: 25, backgroundColor: bkConfig(i + start, '#ededed'), marginTop: 10 }]}>
                  <Text>
                    {consultant.calcPersonalYear(consultant.getYearOfBirth() + i + start)}
                  </Text>
                </View>
                <View style={[pinnacleName.item, { width: 19, borderRight: borderRightConfig(i, item), height: 25, backgroundColor: bkConfig(i + start, '#ffffff') }]}>
                  <Text>
                    {consultant.reduceNumber(el.pmD + el.pMD + el.pfD + consultant.calcPersonalYear(consultant.getYearOfBirth() + i + start))}
                  </Text>
                </View>
              </View>

              <View
                // eslint-disable-next-line react/no-array-index-key
                key={`${consultant.getYearOfBirth() + i + start}_${i}_partner2`}
                style={{ position: 'absolute', left: 100 + (i * 54), top: 0 }}
              >
                <View style={[pinnacleName.item, { width: 19, borderRight: borderRightConfig(i, item), height: 15, fontSize: 6, backgroundColor: bkConfig(i + start, '#c2b3c2') }]}>
                  <Text>{partner.getYearOfBirth() + i + startP}</Text>
                </View>
                <View style={[pinnacleName.item, { width: 19, borderRight: borderRightConfig(i, item), height: 15, backgroundColor: bkConfig(i + start, '#e5e5e5') }]}>
                  <Text>{i + startP}</Text>
                </View>
                <View style={[pinnacleName.item, { width: 19, borderRight: borderRightConfig(i, item), height: 15, backgroundColor: bkConfig(i + start, '#ffffff') }]}>
                  <Text>{el.pmCP}</Text>
                </View>
                <View style={[pinnacleName.item, { width: 19, borderRight: borderRightConfig(i, item), height: 16, fontSize: 6, backgroundColor: bkConfig(i + start, '#ffffff') }]}>
                  <Text>{el.pmNP}/{el.pmDP}</Text>
                </View>
                <View style={[pinnacleName.item, { width: 19, borderRight: borderRightConfig(i, item), height: 15, backgroundColor: bkConfig(i + start, '#ffffff') }]}>
                  <Text>{el.pMCP}</Text>
                </View>
                <View style={[pinnacleName.item, { width: 19, borderRight: borderRightConfig(i, item), height: 16, fontSize: 6, backgroundColor: bkConfig(i + start, '#ffffff') }]}>
                  <Text>{el.pMNP}/{el.pMDP}</Text>
                </View>
                <View style={[pinnacleName.item, { width: 19, borderRight: borderRightConfig(i, item), height: 15, backgroundColor: bkConfig(i + start, '#ffffff') }]}>
                  <Text>{el.pfCP}</Text>
                </View>
                <View style={[pinnacleName.item, { width: 19, borderRight: borderRightConfig(i, item), height: 16, backgroundColor: bkConfig(i + start, '#ffffff') }]}>
                  <Text>{el.pfNP}/{el.pfDP}</Text>
                </View>
                <View style={[pinnacleName.item, { width: 19, borderRight: borderRightConfig(i, item), height: 25, backgroundColor: bkConfig(i + start, '#edd7eb') }]}>
                  <Text>{consultant.reduceNumber(el.pmDP + el.pMDP + el.pfDP)}</Text>
                </View>
                <View style={[pinnacleName.item, { width: 19, borderRight: borderRightConfig(i, item), height: 25, backgroundColor: bkConfig(i + start, '#ededed'), marginTop: 10 }]}>
                  <Text>{partner.calcPersonalYear(partner.getYearOfBirth() + i + startP)}</Text>
                </View>
                <View style={[pinnacleName.item, { width: 19, borderRight: borderRightConfig(i, item), height: 25, backgroundColor: bkConfig(i + start, '#ffffff') }]}>
                  <Text>{partner.reduceNumber(el.pmDP + el.pMDP + el.pfDP + partner.calcPersonalYear(partner.getYearOfBirth() + i + startP))}</Text>
                </View>
              </View>

              <View
                // eslint-disable-next-line react/no-array-index-key
                key={`${consultant.getYearOfBirth() + i + start}_${i}_partner3`}
                style={{ position: 'absolute', left: 119 + (i * 54), top: 0 }}
              >
                <View style={[pinnacleName.item, { width: 19, borderRight: borderRightConfig(i, item), height: 15, fontSize: 6, backgroundColor: bkConfigFull(i + start, '#c2b3c2') }]}>
                  <Text>{consultant.getYearOfBirth() + i + start}</Text>
                </View>
                <View style={[pinnacleName.item, { width: 19, borderRight: borderRightConfig(i, item), height: 15, backgroundColor: bkConfigFull(i + start, '#e5e5e5') }]}>
                  <Text>{consultant.reduceNumber(i + start + i + startP)}</Text>
                </View>
                <View style={[pinnacleName.item, { width: 19, borderRight: borderRightConfig(i, item), height: 15, backgroundColor: bkConfigFull(i + start, '#ffffff') }]}>
                  <Text>{el.pmCPC}</Text>
                </View>
                <View style={[pinnacleName.item, { width: 19, borderRight: borderRightConfig(i, item), height: 16, backgroundColor: bkConfigFull(i + start, '#ffffff') }]}>
                  <Text>{el.pmNPC}/{el.pmDPC}</Text>
                </View>
                <View style={[pinnacleName.item, { width: 19, borderRight: borderRightConfig(i, item), height: 15, backgroundColor: bkConfigFull(i + start, '#ffffff') }]}>
                  <Text>{el.pMCPC}</Text>
                </View>
                <View style={[pinnacleName.item, { width: 19, borderRight: borderRightConfig(i, item), height: 16, fontSize: 6, backgroundColor: bkConfigFull(i + start, '#ffffff') }]}>
                  <Text>{el.pMNPC}/{el.pMDPC}</Text>
                </View>
                <View style={[pinnacleName.item, { width: 19, borderRight: borderRightConfig(i, item), height: 15, backgroundColor: bkConfigFull(i + start, '#ffffff') }]}>
                  <Text>{el.pfCPC}</Text>
                </View>
                <View style={[pinnacleName.item, { width: 19, borderRight: borderRightConfig(i, item), height: 16, fontSize: 6, backgroundColor: bkConfigFull(i + start, '#ffffff') }]}>
                  <Text>{el.pfNPC}/{el.pfDPC}</Text>
                </View>
                <View style={[pinnacleName.item, { width: 19, borderRight: borderRightConfig(i, item), height: 25, backgroundColor: bkConfigFull(i + start, '#edd7eb') }]}>
                  <Text>{consultant.reduceNumber(el.pmNPC + el.pMNPC + el.pfNPC)}/{consultant.reduceNumber(el.pmDPC + el.pMDPC + el.pfDPC)}</Text>
                </View>
                <View style={[pinnacleName.item, { width: 19, borderRight: borderRightConfig(i, item), height: 25, backgroundColor: bkConfigFull(i + start, '#ededed'), marginTop: 10 }]}>
                  <Text>{consultant.reduceNumber(getA + getB + (consultant.getYearOfBirth() + start + i))}</Text>
                </View>
                <View style={[pinnacleName.item, { width: 19, borderRight: borderRightConfig(i, item), height: 25, backgroundColor: bkConfigFull(i + start, '#ffffff') }]}>
                  <Text>{consultant.reduceNumber(el.pmDPC + el.pMDPC + el.pfDPC + consultant.reduceNumber(getA + getB + (consultant.getYearOfBirth() + start + i)))}</Text>
                </View>
              </View>
            </>
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