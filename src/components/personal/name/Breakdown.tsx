import useConsult from '@/hooks/useConsult';
import NameBreakdown from './NameBreakdown';

type UngroupName = {
  v: number;
  L: string;
  c: number;
};

export default function Breakdown() {
  const { consultant } = useConsult();
  if (!consultant) return null;
  const {
    name, lastName, scdLastName, nameView,
  } = consultant;
  const names = nameView.toLocaleLowerCase().split(' ');

  const ungroupNames = names.map((el: string) => ({
    name: consultant.getUngroupName(el),
    values: consultant.getUngroupNameValues(el),
    total: consultant.getUngroupNameTotal(el),
  }));

  ungroupNames.forEach((el: { name: UngroupName[] }) => {
    for (let index = el.name.length; index < 28; index += 1) {
      el.name.push({} as UngroupName);
    }
  });

  const ungroupLast = consultant.getUngroupName(lastName);
  const ungroupLastV = consultant.getUngroupNameValues(lastName);
  const ungroupLastT = consultant.getUngroupNameTotal(lastName);

  for (let index = ungroupLast.length; index < 28; index += 1) {
    ungroupLast.push({} as UngroupName);
  }

  const ungroupSCDLast = consultant.getUngroupName(scdLastName);
  const ungroupSCDLastV = consultant.getUngroupNameValues(scdLastName);
  const ungroupSCDLastT = consultant.getUngroupNameTotal(scdLastName);

  for (let index = ungroupSCDLast.length; index < 28; index += 1) {
    ungroupSCDLast.push({} as UngroupName);
  }

  const ungroupName = consultant.getUngroupName(name);
  const ungroupNameV = consultant.getUngroupNameValues(name);
  const ungroupNameT = consultant.getUngroupNameTotal(name);

  for (let index = ungroupName.length; index < 28; index += 1) {
    ungroupName.push({} as UngroupName);
  }
  return (
    <div className="pinnacle-wrap px-8 py-8">
      {ungroupNames.map((ungroup) => (
        <NameBreakdown
          key={`${ungroup.name}-${ungroup.values}-${ungroup.total}`}
          name={ungroup.name}
          values={ungroup.values}
          total={ungroup.total}
          description={`N${ungroup.name.length + 1}`}
        />
      ))}
      <NameBreakdown
        name={ungroupLast}
        values={ungroupLastV}
        total={ungroupLastT}
        description="AP"
      />
      <NameBreakdown
        name={ungroupSCDLast}
        values={ungroupSCDLastV}
        total={ungroupSCDLastT}
        description="AM"
      />
      <NameBreakdown
        name={ungroupName}
        values={ungroupNameV}
        total={ungroupNameT}
        description="NA"
      />
    </div>
  );
}
