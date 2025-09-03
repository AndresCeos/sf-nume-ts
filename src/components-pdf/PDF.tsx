import {
  Document, Image, Page, Text, View,
} from '@react-pdf/renderer';
import React from 'react';
import { currentDate } from '../resources';
import { PDFDocumentProps, PDFPageConfig } from '../types/pdf.types';
import { configReport } from './styles';

export const PDF: React.FC<PDFDocumentProps> = ({
  consultant,
  config,
  profile,
  date,
  sidebar,
  synastry,
  groupConsult,
  newDate,
  month,
  logoURL,
  createNameObj,
}) => {
  console.log({ config });
  console.log(groupConsult);
  console.log(profile.logoURL);

  const listOfPDF: PDFPageConfig[] = config.map((i) => {
    if (!Array.isArray(i)) {
      console.log('single');
      return i({
        consultant, newDate, synastry, groupConsult, month, createNameObj,
      });
    }
    console.log('array');
    return i.map((x) => x({
      consultant, synastry, groupConsult, newDate, month, createNameObj,
    }));
  }).flat();

  return (
    <Document>
      {listOfPDF.map((e, i) => (
        <Page key={i} size={[612, 795]} style={configReport.page}>
          {e.bg && <Image src={e.bg} style={configReport.pageBackground} />}

          <View style={configReport.header}>
            <View style={configReport.header_consultor_name}>
              <Text>{profile.fullName}</Text>
            </View>
            <View style={configReport.header_consultant_name}>
              <Text>{consultant.fullName}</Text>
            </View>
            <View style={configReport.header_date}>
              <Text>{currentDate(date)}</Text>
            </View>
            <View style={configReport.header_birth_date}>
              <Text>{consultant.getFormattedBirthDate()}</Text>
            </View>
            <View style={configReport.header_age}>
              <Text>{consultant.getYearsOld()}</Text>
            </View>
            <View style={configReport.header_logo} />
            {logoURL && <Image style={configReport.img_logo} src={logoURL} />}
          </View>
          <View style={configReport.sidebar}>
            <Text style={configReport.page_number}>{i + 1}</Text>
            <Text style={configReport.page_copy_1}>
              Copyright 2022, Laura L. Rodríguez. Prohibida su reproducción y distribución.
            </Text>
            <Text style={configReport.page_copy_2}>
              Este Software esta licenciado para uso exclusivo de:
              {' '}
              {profile.fullName}
              .
            </Text>
            <Text style={configReport.page_copy_3}>{sidebar.webSite}</Text>
            <Text style={configReport.page_copy_4}>{sidebar.email}</Text>
            <Text style={configReport.page_copy_5}>
              Tels:
              {sidebar.phone}
            </Text>
          </View>
          <View style={configReport.content}>
            {e.children}
          </View>
        </Page>
      ))}
    </Document>
  );
};
