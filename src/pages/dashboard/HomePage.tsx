import moment from 'moment';

import UniversalEnergy from '@/components/home/UniversalEnergy';
import TimeCircle from '@/components/personal/timeCircle/TimeCircle';
import { useAuth } from '@/context/AuthProvider';
import EnergyProvider from '@/context/EnergyProvider';

function HomePage() {
  const { user: userAuth } = useAuth();
  const { firstName, lastName, birthDate } = userAuth?.user ?? {};
  const names = `${firstName} ${lastName}`;

  return (
    <div className="page-content bg-home-background bg-cover grid grid-cols-2">
      <div className="h-36 mt-20 pl-14 pt-11 pb-7 bg-white bg-opacity-50 w-full relative rounded-tr-3xl rounded-br-3xl">
        <h2 className="font-black mt-0 mb-2 text-main-700 text-2xl">
          {`Bienvenid@ ${names}`}
        </h2>
        <h2 className="text-main-700 text-2xl">a tu Software de Numerología</h2>
        <img src="/assets/welcome.png" className="welcomeLogo" alt="welcome" />
      </div>
      <EnergyProvider>
        <div className="row-span-2 flex justify-center items-center">
          {moment(birthDate).isValid() ? <TimeCircle /> : null}
        </div>
        <UniversalEnergy />
      </EnergyProvider>
    </div>
  );
}

export default HomePage;
