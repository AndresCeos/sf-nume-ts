import NoConsultantSelected from '@/components/NoConsultantSelected';
import SectionTitle from '@/components/SectionTitle';
import Pinnacle from '@/components/personal/pinnacle/Pinnacle';
import PinnacleName from '@/components/personal/pinnacle/PinnacleName';
import useConsult from '@/hooks/useConsult';

function PinnaclePage() {
  const { consultant } = useConsult();

  if (!consultant) return (<NoConsultantSelected />);

  const isPinnacleVerificationActive = false; // TODO: implement
  const handlePinnacleVerification = () => { // TODO: implement
    console.log('not implemented');
  };

  const isPinnacleNameVerificationActive = false; // TODO: implement
  const handlePinnacleNameVerification = () => { // TODO: implement
    console.log('not implemented');
  };

  return (
    <div className="page-content bg-home-background bg-cover">
      <div className="grid grid-cols-10 mt-8 mx-14 gap-4">
        <div className="col-span-3 row-span-6">
          <SectionTitle
            title="Pináculo"
            button={{
              text: 'Comprobación',
              handle: handlePinnacleVerification,
              isActive: isPinnacleVerificationActive,
            }}
          />
          <div className="section-wrap px-2 py-7">
            <Pinnacle size="sm" isVerificationActive={isPinnacleVerificationActive} />
          </div>
        </div>

        <div className="col-span-1 row-span-3">
          <SectionTitle
            title="Nombre"
            button={{
              text: '',
              handle: handlePinnacleNameVerification,
              isActive: isPinnacleNameVerificationActive,
            }}
          />
          <div className="section-wrap p-4">
            <PinnacleName isVerificationActive={isPinnacleNameVerificationActive} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PinnaclePage;
