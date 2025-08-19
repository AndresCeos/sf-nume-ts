import NoConsultantSelected from '@/components/NoConsultantSelected';
import SelectGroup from '@/components/group/SelectGroup';
import useConsult from '@/hooks/useConsult';

export default function GroupPinnaclePage() {
  const { consultant } = useConsult();

  if (!consultant) return (<NoConsultantSelected />);

  return (
    <div className="page-content bg-home-background bg-cover pb-10">
      <div className="container mx-auto px-4 py-6">
        <SelectGroup />
      </div>
    </div>
  );
}
