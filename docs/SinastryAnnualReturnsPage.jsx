import { useDispatch, useSelector } from 'react-redux';

import { AnnualReturn, UnselectedConsultant, UserPartnerSelect } from '../components';
import { dateSelect, useConsultant } from '../hooks';
import { Person, Synastry } from '../resources';

import { TiPlus } from 'react-icons/ti';
import { setIsSelectPartner } from '../store/slices/users/users';

const SinastyAnnualReturnsPage = () => {
  const { userActive, userPartnerActive, isSelectPartner } = useSelector(state => state.users);
  const isEmpty = Object.keys(userActive).length === 0;

  const { consultant } = useConsultant()
  const { newDate } = dateSelect()
  const dispatch = useDispatch()

  if (isEmpty) {
    return <UnselectedConsultant />
  }
  const isEmptyP = Object.keys(userActive.partner).length === 0;
  if (isEmptyP) {
    dispatch(setIsSelectPartner(false))
  }

  const partner = new Person({
    name: userPartnerActive.names,
    lastName: userPartnerActive.lastName,
    scdLastName: userPartnerActive.scdLastName,
    birthDate: userPartnerActive.date,
    yearMeet: userPartnerActive.yearMeet
  })

  if (partner === undefined) {
    return <UnselectedConsultant />
  }

  const synastry = new Synastry(consultant, partner)

  const now = newDate.year()
  const annualReturn = synastry.annualReturn(now)
  const personalYear = synastry.calcPersonalYear(now)
  const yearsOld = synastry.getYearsOld(now)

  const y1 = newDate.year() - 4
  const annualReturnY1 = synastry.annualReturn(y1)
  const personalYearY1 = synastry.calcPersonalYear(y1)
  const yearsOldY1 = synastry.getYearsOld(y1)

  const y2 = newDate.year() - 3
  const annualReturnY2 = synastry.annualReturn(y2)
  const personalYearY2 = synastry.calcPersonalYear(y2)
  const yearsOldY2 = synastry.getYearsOld(y2)

  const y3 = newDate.year() - 2
  const annualReturnY3 = synastry.annualReturn(y3)
  const personalYearY3 = synastry.calcPersonalYear(y3)
  const yearsOldY3 = synastry.getYearsOld(y3)

  const y4 = newDate.year() - 1
  const annualReturnY4 = synastry.annualReturn(y4)
  const personalYearY4 = synastry.calcPersonalYear(y4)
  const yearsOldY4 = synastry.getYearsOld(y4)

  const y6 = newDate.year() + 1
  const annualReturnY6 = synastry.annualReturn(y6)
  const personalYearY6 = synastry.calcPersonalYear(y6)
  const yearsOldY6 = synastry.getYearsOld(y6)

  const y7 = newDate.year() + 2
  const annualReturnY7 = synastry.annualReturn(y7)
  const personalYearY7 = synastry.calcPersonalYear(y7)
  const yearsOldY7 = synastry.getYearsOld(y7)

  const y8 = newDate.year() + 3
  const annualReturnY8 = synastry.annualReturn(y8)
  const personalYearY8 = synastry.calcPersonalYear(y8)
  const yearsOldY8 = synastry.getYearsOld(y8)

  const y9 = newDate.year() + 4
  const annualReturnY9 = synastry.annualReturn(y9)
  const personalYearY9 = synastry.calcPersonalYear(y9)
  const yearsOldY9 = synastry.getYearsOld(y9)

  return (
    <div className='grid grid-cols-12 mx-14 gap-6 mt-8 pt-10'>

      <UserPartnerSelect />

      {(isSelectPartner)
        ? (
<div className='col-span-12'>
          <div className='bg-black text-white text-base font-bold h-8 flex justify-start items-center rounded-tl-2xl rounded-tr-2xl'>
            <div className='w-9 h-9 flex justify-center items-center rounded-full -ml-3 mr-2 bg-green-s p-2'>
              <TiPlus className='text-2xl' />
            </div>
            9 Retornos
          </div>
          <div className='pinnacle-wrap grid grid-cols-3 p-1'>
            <div className="bg-white p-4 h-80">
              <AnnualReturn
                annualReturn={annualReturnY1}
                personalYear={personalYearY1}
                yearsOld={yearsOldY1}
                year={y1}
                group
              />
            </div>
            <div className="bg-white p-4 h-80 border-gray-400 border-r border-l">
              <AnnualReturn
                annualReturn={annualReturnY2}
                personalYear={personalYearY2}
                yearsOld={yearsOldY2}
                year={y2}
                group
              />
            </div>
            <div className="bg-white p-4 h-80">
              <AnnualReturn
                annualReturn={annualReturnY3}
                personalYear={personalYearY3}
                yearsOld={yearsOldY3}
                year={y3}
                group
              />
            </div>
            <div className="bg-white p-4 h-80 border-gray-400 border-t border-b">
              <AnnualReturn
                annualReturn={annualReturnY4}
                personalYear={personalYearY4}
                yearsOld={yearsOldY4}
                year={y4}
                group
              />
            </div>
            <div className="bg-active-radial p-4 h-80 border-gray-400 border">
              <AnnualReturn
                current
                annualReturn={annualReturn}
                personalYear={personalYear}
                yearsOld={yearsOld}
                year={now}
                group
              />
            </div>
            <div className="bg-white p-4 h-80 border-gray-400 border-t border-b">
              <AnnualReturn
                annualReturn={annualReturnY6}
                personalYear={personalYearY6}
                yearsOld={yearsOldY6}
                year={y6}
                group
              />
            </div>
            <div className="bg-white p-4 h-80">
              <AnnualReturn
                annualReturn={annualReturnY7}
                personalYear={personalYearY7}
                yearsOld={yearsOldY7}
                year={y7}
                group
              />
            </div>
            <div className="bg-white p-4 h-80 border-gray-400 border-r border-l">
              <AnnualReturn
                annualReturn={annualReturnY8}
                personalYear={personalYearY8}
                yearsOld={yearsOldY8}
                year={y8}
                group
              />
            </div>
            <div className="bg-white p-4 h-80">
              <AnnualReturn
                annualReturn={annualReturnY9}
                personalYear={personalYearY9}
                yearsOld={yearsOldY9}
                year={y9}
                group
              />
            </div>
          </div>
</div>
)
      : <div className="col-span-12 text-center"><strong>Agrega/Selecciona una pareja para ver esta información</strong></div>
      }
    </div>
  )
}

export default SinastyAnnualReturnsPage;