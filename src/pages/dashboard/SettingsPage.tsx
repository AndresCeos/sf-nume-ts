import SectionTitle from '@/components/SectionTitle';
import SettingsForm from '@/components/dashboard/settings/SettingsForm';
import { useAuth } from '@/context/AuthProvider';
import { formatDate, licenseTypes } from '@/utils/constants';

function SettingsPage() {
  const { user: userAuth } = useAuth();

  return (
    <div className="page-content bg-cover">
      <div className="grid grid-cols-12 mt-8 gap-4 pb-5">
        <div className="col-span-12">
          <div className="">
            <SectionTitle
              title="Datos Generales"
            />
            <div className="section-wrap px-2 py-5">
              <SettingsForm />
            </div>
          </div>
        </div>
        <div className="col-span-5">
          <div>
            <SectionTitle
              title="Mi Cuenta"
            />
            <div className="section-wrap px-2 py-5">
              <p className="text-13 font-bold text-gray-400">
                Versión del Software:
                {' '}
                <span className="text-13 text-black">{userAuth?.app_version}</span>
              </p>
              <p className="text-13 font-bold text-gray-400">
                Número de Licencia:
                {' '}
                <span className="text-13 text-black">{userAuth?.license.id}</span>
              </p>
              <p className="text-13 font-bold text-gray-400">
                Fecha de expiración:
                {' '}
                <span className="text-13 text-black">{userAuth?.license.expirationDate ? formatDate({ date: userAuth?.license.expirationDate, format: 'long' }) : 'N/A'}</span>
              </p>
              <p className="text-13 font-bold text-gray-400">
                Tipo de Licencia:
                {' '}
                <span className="text-13 text-black">{licenseTypes(userAuth?.license?.licenseId || '')}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}
export default SettingsPage;
