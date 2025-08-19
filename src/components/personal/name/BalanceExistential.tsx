import { useTranslation } from 'react-i18next';

import useConsult from '@/hooks/useConsult';

export default function BalanceExistential() {
  const { consultant } = useConsult();
  if (!consultant) return null;

  const { t } = useTranslation();

  const appearances = consultant.getAppearances();
  const balanceExistential = {
    'Plano Físico': {
      v: appearances[4].a + appearances[5].a,
      c: 'bg-red border-red',
      cT: 'text-red',
      d: '(Valores 4/22 y 5)',
    },
    'Plano Mental': {
      v: appearances[1].a + appearances[8].a,
      c: 'bg-green border-green',
      cT: 'text-green',
      d: '(Valores 1 y 8)',
    },
    'Plano Emocional': {
      v: appearances[2].a + appearances[3].a + appearances[6].a,
      c: 'bg-blue-30 border-blue',
      cT: 'text-blue',
      d: '(Valores 2/11, 3 y 6)',
    },
    'Plano Espiritual': {
      v: appearances[7].a + appearances[9].a,
      c: 'bg-main-40 border-main',
      cT: 'text-main',
      d: '(Valores 7 y 9)',
    },
  };

  return (
    <div className="pinnacle-wrap px-8 py-8">
      <div>
        <div className="flex">
          <div className="flex justify-center items-center w-1/4 text-13 text-gray-500 font-bold">
            {t('name.balanceExistential.firstPlace')}
          </div>
          <div className="flex justify-center items-center w-1/4 text-13 text-gray-500 font-bold">
            {t('name.balanceExistential.secondPlace')}
          </div>
          <div className="flex justify-center items-center w-1/4 text-13 text-gray-500 font-bold">
            {t('name.balanceExistential.thirdPlace')}
          </div>
          <div className="flex justify-center items-center w-1/4 text-13 text-gray-500 font-bold">
            {t('name.balanceExistential.fourthPlace')}
          </div>
        </div>
        <div className="flex">
          {Object.entries(balanceExistential).map((el) => (
            <div
              key={`${el[0]}-${el[1].v}-${el[1].c}-${el[1].cT}-${el[1].d}`}
              className="balanceExistential flex justify-center items-center flex-col w-1/4"
              data-value={el[1].v}
            >
              <div
                className={`h-10 w-10 text-xl font-bold flex justify-center items-center bg-white border border-gray-500 rounded-md inner-shadow my-4 ${el[1].c}`}
              >
                {el[1].v}
              </div>
              <div className={`text-13 font-bold ${el[1].cT}`}>{el[0]}</div>
              <div className="text-13 text-gray-500">{el[1].d}</div>
              {/* <div className='text-13 text-gray-500 h-5'>{el[1].v} </div>
                <div className='h-10 w-10 text-xl font-bold flex justify-center items-center bg-purple-30 border border-main rounded-md inner-shadow'>{el[0]} </div>
                <div className='h-10 w-10 text-xl font-bold flex justify-center items-center bg-gray-300 border border-gray-500 rounded-md inner-shadow'>{el[1].a} </div> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
