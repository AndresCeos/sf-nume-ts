import { useTranslation } from 'react-i18next';

/* eslint-disable jsx-a11y/label-has-associated-control */
import CircleNumber from '@/components/CircleNumber';
import useConsult from '@/hooks/useConsult';
import Person from '@/resources/Person';

export function PinnacleName({ isVerificationActive }: { isVerificationActive: boolean }) {
  const { consultant } = useConsult();
  const { t } = useTranslation();

  if (!consultant) return null;

  const person = new Person({
    id: consultant.id || '',
    name: consultant.names || '',
    lastName: consultant.lastName || '',
    scdLastName: consultant.scdLastName || '',
    birthDate: consultant.date?.toString() || '',
  });

  return (
    <div className="pinnacle-wrap p-4">
      <div className="flex flex-col items-center justify-center text-gray-500 font-bold">
        <label className="text-10">{t('pinnacle.name.name')}</label>
        <CircleNumber size="sm" appearance="blue-30" border="blue">
          {(!isVerificationActive) ? `${person.calcName()}${person.calcNameISK()}` : `${person.getNameCheck()}${person.getNameCheckISK()}`}
        </CircleNumber>
      </div>
      <div className="flex flex-col items-center justify-center text-gray-500 font-bold">
        <label className="text-10 mt-3">{t('pinnacle.name.soul')}</label>
        <CircleNumber size="sm" appearance="blue-30" border="blue" radiant="true">
          {(!isVerificationActive) ? `${person.calcSoulNumber()}${person.calcSoulNumberISK()}` : `${person.getSoulCheck()}${person.calcSoulNumberISK()}`}
        </CircleNumber>
      </div>
      <div className="flex flex-col items-center justify-center text-gray-500 font-bold">
        <label className="text-10 mt-3">{t('pinnacle.name.expression')}</label>
        <CircleNumber size="sm" appearance="blue-30" border="blue">
          {(!isVerificationActive) ? `${person.calcSoulExpression()}${person.calcSoulExpressionISK()}` : `${person.getExpressionSoulCheck()}${person.calcSoulExpressionISK()}`}
        </CircleNumber>
      </div>
      <div className="flex flex-col items-center justify-center text-gray-500 font-bold">
        <label className="text-10 mt-3">{t('pinnacle.name.maturity')}</label>
        <CircleNumber size="sm" appearance="aguamarina-30" border="aguamarina">
          {person.calcMaturity()}
          {person.calcMaturityISK()}
        </CircleNumber>
      </div>
    </div>
  );
}

export default PinnacleName;
