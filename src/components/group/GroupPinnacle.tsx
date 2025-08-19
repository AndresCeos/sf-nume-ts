import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';

import useGroups from '@/hooks/useGroups';
import Group from '@/resources/Group';
import Person from '@/resources/Person';

export default function GroupPinnacle() {
  const { t } = useTranslation();
  const { activeGroup } = useGroups();

  if (!activeGroup) {
    return (
      <div className="text-center py-8 text-gray-500">
        {t('group.selectGroupToView')}
      </div>
    );
  }

  // Convert GroupMember[] to Person[] for Group calculations
  const groupMembers = activeGroup.members.map((member) => new Person({
    id: member.id,
    name: member.name,
    lastName: member.lastName,
    scdLastName: member.scdLastName,
    birthDate: member.date,
  }));

  const groupDate = new Date(activeGroup.date);
  const group = new Group(groupMembers, groupDate);

  const currentYear = new Date().getFullYear();
  const annualReturn = group.annualReturn(currentYear);

  return (
    <div className="space-y-6">
      {/* Group Info */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {activeGroup.name}
          {' '}
          -
          {t('pinnacle.title')}
        </h2>

        {activeGroup.description && (
          <p className="text-gray-600 mb-4">{activeGroup.description}</p>
        )}

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-700">
              {t('group.created')}
              :
            </span>
            <span className="ml-2 text-gray-600">
              {format(new Date(activeGroup.date), 'dd/MM/yyyy')}
            </span>
          </div>
          <div>
            <span className="font-medium text-gray-700">
              {t('group.members')}
              :
            </span>
            <span className="ml-2 text-gray-600">{activeGroup.members.length}</span>
          </div>
        </div>
      </div>

      {/* Group Pinnacle Values */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          {t('pinnacle.pinnacle.absences')}
        </h3>

        <div className="grid grid-cols-5 gap-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-xl font-bold text-blue-600">A</span>
            </div>
            <div className="text-2xl font-bold text-gray-800">{group.getA()}</div>
            <div className="text-sm text-gray-500">{group.getAISK()}</div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-xl font-bold text-green-600">B</span>
            </div>
            <div className="text-2xl font-bold text-gray-800">{group.getB()}</div>
            <div className="text-sm text-gray-500">{group.getBISK()}</div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-xl font-bold text-yellow-600">C</span>
            </div>
            <div className="text-2xl font-bold text-gray-800">{group.getC()}</div>
            <div className="text-sm text-gray-500">{group.getCISK()}</div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-xl font-bold text-red-600">D</span>
            </div>
            <div className="text-2xl font-bold text-gray-800">{group.getD()}</div>
            <div className="text-sm text-gray-500">{group.getDISK()}</div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-xl font-bold text-purple-600">E</span>
            </div>
            <div className="text-2xl font-bold text-gray-800">{group.getE()}</div>
            <div className="text-sm text-gray-500">{group.getEISK()}</div>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-4 mt-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-xl font-bold text-indigo-600">F</span>
            </div>
            <div className="text-2xl font-bold text-gray-800">{group.getF()}</div>
            <div className="text-sm text-gray-500">{group.getFISK()}</div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-xl font-bold text-pink-600">G</span>
            </div>
            <div className="text-2xl font-bold text-gray-800">{group.getG()}</div>
            <div className="text-sm text-gray-500">{group.getGISK()}</div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-xl font-bold text-orange-600">H</span>
            </div>
            <div className="text-2xl font-bold text-gray-800">{group.getH()}</div>
            <div className="text-sm text-gray-500">{group.getHISK()}</div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-xl font-bold text-teal-600">I</span>
            </div>
            <div className="text-2xl font-bold text-gray-800">{group.getI()}</div>
            <div className="text-sm text-gray-500">{group.getIISK()}</div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-xl font-bold text-gray-600">J</span>
            </div>
            <div className="text-2xl font-bold text-gray-800">{group.getJ()}</div>
            <div className="text-sm text-gray-500">{group.getJISK()}</div>
          </div>
        </div>

        {/* Absences */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-lg font-semibold text-gray-800 mb-2">
            {t('pinnacle.pinnacle.absences')}
            :
          </h4>
          <p className="text-gray-600">{group.getAbsences()}</p>
        </div>
      </div>

      {/* Annual Return */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          {t('annualReturns.annualReturns')}
          {' '}
          -
          {currentYear}
        </h3>

        <div className="grid grid-cols-5 gap-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-lg font-bold text-blue-600">A</span>
            </div>
            <div className="text-xl font-bold text-gray-800">{annualReturn.A}</div>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-lg font-bold text-green-600">B</span>
            </div>
            <div className="text-xl font-bold text-gray-800">{annualReturn.B}</div>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-lg font-bold text-yellow-600">C</span>
            </div>
            <div className="text-xl font-bold text-gray-800">{annualReturn.C}</div>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-lg font-bold text-red-600">D</span>
            </div>
            <div className="text-xl font-bold text-gray-800">{annualReturn.D}</div>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-lg font-bold text-purple-600">E</span>
            </div>
            <div className="text-xl font-bold text-gray-800">{annualReturn.E}</div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mt-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-lg font-bold text-indigo-600">F</span>
            </div>
            <div className="text-xl font-bold text-gray-800">{annualReturn.F}</div>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-lg font-bold text-pink-600">G</span>
            </div>
            <div className="text-xl font-bold text-gray-800">{annualReturn.G}</div>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-lg font-bold text-orange-600">H</span>
            </div>
            <div className="text-xl font-bold text-gray-800">{annualReturn.H}</div>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-lg font-bold text-gray-600">{t('age')}</span>
            </div>
            <div className="text-xl font-bold text-gray-800">{annualReturn.age}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
