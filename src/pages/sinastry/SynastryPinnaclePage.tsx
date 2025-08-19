import NoConsultantSelected from '@/components/NoConsultantSelected';
import SelectPartner from '@/components/sinastry/SelectPartner';
import useConsult from '@/hooks/useConsult';

export default function SynastryPinnaclePage() {
  const { consultant } = useConsult();

  if (!consultant) return (<NoConsultantSelected />);
  return (
    <div className="page-content bg-home-background bg-cover pb-10">
      <SelectPartner />
    </div>
  );
}
