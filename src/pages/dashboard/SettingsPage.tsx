import SectionTitle from '@/components/SectionTitle';
import SettingsForm from '@/components/dashboard/settings/SettingsForm';
import { useAuth } from '@/context/AuthProvider';

function SettingsPage() {
  const { user: userAuth } = useAuth();
  console.log(userAuth);
  return (
    <div className="page-content bg-home-background bg-cover">
      <div className="grid grid-cols-12 mt-8 mx-14 gap-4 pb-5">
        <div className="col-span-12">
          <div className="">
            <SectionTitle
              title="Datos Generales"
              button={{
                isActive: false,
                text: '',
                handle: () => {},
              }}
            />
            <div className="section-wrap px-2 py-5">
              <SettingsForm />
            </div>
          </div>
        </div>
        <div className="col-span-3">
          <div>
            <SectionTitle
              title="Mi Cuenta"
              button={{
                isActive: false,
                text: '',
                handle: () => {},
              }}
            />
            <div className="section-wrap px-2 py-5">
              <p className="text-13 font-bold text-gray-400">
                Versión del Software:
                {' '}
                <span className="text-13 text-gray-400">{userAuth?.app_version}</span>
              </p>
              <p className="text-13 font-bold text-gray-400">
                Número de Licencia:
                {' '}
                <span className="text-13 text-gray-400">{userAuth?.license.id}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}
export default SettingsPage;
