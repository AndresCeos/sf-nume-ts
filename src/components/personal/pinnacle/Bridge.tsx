import { FaArrowAltCircleDown, FaArrowAltCircleUp } from 'react-icons/fa';

import CircleNumber from '@/components/CircleNumber';
import useConsult from '@/hooks/useConsult';
import Person from '@/resources/Person';
import { getResBridge } from '@/utils/numbers';

type BridgeState = {
  top: string | number;
  right: string | number;
  bottom: string | number;
  left: string | number;
  center: string | number;
  stageStart: string;
  stageEnd: string;
  stageDoubleStart: string;
  stageDoubleEnd: string;
  hasDouble: boolean;
  descriptionTop: string;
  descriptionBottom: string;
  descriptionRight: string;
  descriptionLeft: string;
};

type BridgeProps = {
  stage: 1 | 2 | 3 | 4;
  showVerification?: boolean;
};

function Bridge({ stage, showVerification }: BridgeProps) {
  const { consultant } = useConsult();

  if (!consultant) return null;

  const person = new Person({
    id: consultant.id || '',
    name: consultant.names || '',
    lastName: consultant.lastName || '',
    scdLastName: consultant.scdLastName || '',
    birthDate: consultant.date?.toString() || '',
  });

  const bridgeState: Record<1 | 2 | 3 | 4, BridgeState> = {
    1: {
      top: `${person.getE()}${person.getEISK()}`,
      right: `${person.getB()}${person.getBISK()}`,
      bottom: person.getK(),
      left: person.getA(),
      center: getResBridge(person.getE(), person.getK()),
      stageStart: `0 - ${person.calcLifeStageDuration(1) - person.birthDate.year()} años`,
      stageEnd: `${person.calcLifeStageDuration(6) - person.birthDate.year()} - ${person.calcLifeStageDuration(7) - person.birthDate.year()} años`,
      stageDoubleStart: `0 - ${person.calcDoubleLifeStageDuration(1) - person.birthDate.year()} años`,
      stageDoubleEnd: `${person.calcDoubleLifeStageDuration(6) - person.birthDate.year()} - ${person.calcDoubleLifeStageDuration(7) - person.birthDate.year()} años`,
      hasDouble: person.hasDoubleStage(),
      descriptionBottom: 'K',
      descriptionTop: 'E',
      descriptionRight: 'B',
      descriptionLeft: 'A',
    },
    2: {
      top: `${person.getF()}${person.getFISK()}`,
      right: `${person.getC()}${person.getCISK()}`,
      bottom: person.getL(),
      left: `${person.getB()}${person.getBISK()}`,
      center: getResBridge(person.getF(), person.getL()),
      stageStart: `${person.calcLifeStageDuration(1) - person.birthDate.year()} - ${person.calcLifeStageDuration(2) - person.birthDate.year()} años`,
      stageEnd: `${person.calcLifeStageDuration(5) - person.birthDate.year()} - ${person.calcLifeStageDuration(6) - person.birthDate.year()} años`,
      stageDoubleStart: `${person.calcDoubleLifeStageDuration(1) - person.birthDate.year()} - ${person.calcDoubleLifeStageDuration(2) - person.birthDate.year()} años`,
      stageDoubleEnd: `${person.calcDoubleLifeStageDuration(5) - person.birthDate.year()} - ${person.calcDoubleLifeStageDuration(6) - person.birthDate.year()} años`,
      hasDouble: person.hasDoubleStage(),
      descriptionTop: 'L',
      descriptionLeft: 'F',
      descriptionRight: 'C',
      descriptionBottom: 'B',
    },
    3: {
      top: `${person.getG()}${person.getGISK()}`,
      right: `${person.getF()}${person.getFISK()}`,
      bottom: person.getM(),
      left: `${person.getE()}${person.getEISK()}`,
      center: getResBridge(person.getG(), person.getM()),
      stageStart: `${person.calcLifeStageDuration(2) - person.birthDate.year()} - ${person.calcLifeStageDuration(3) - person.birthDate.year()} años`,
      stageEnd: `${person.calcLifeStageDuration(4) - person.birthDate.year()} - ${person.calcLifeStageDuration(5) - person.birthDate.year()} años`,
      stageDoubleStart: `${person.calcDoubleLifeStageDuration(2) - person.birthDate.year()} - ${person.calcDoubleLifeStageDuration(3) - person.birthDate.year()} años`,
      stageDoubleEnd: `${person.calcDoubleLifeStageDuration(4) - person.birthDate.year()} - ${person.calcDoubleLifeStageDuration(5) - person.birthDate.year()} años`,
      hasDouble: person.hasDoubleStage(),
      descriptionTop: 'M',
      descriptionLeft: 'G',
      descriptionRight: 'F',
      descriptionBottom: 'E',
    },
    4: {
      top: showVerification ? `${person.getHCheck()}${person.getHISK()}` : `${person.getH()}${person.getHISKCheck()}`,
      right: `${person.getC()}${person.getCISK()}`,
      bottom: person.getN(),
      left: person.getA(),
      center: getResBridge(person.getH(), person.getN()),
      stageStart: `${person.calcLifeStageDuration(3) - person.birthDate.year()}- ${person.calcLifeStageDuration(4) - person.birthDate.year()} años`,
      stageEnd: '',
      stageDoubleStart: `${person.calcDoubleLifeStageDuration(3) - person.birthDate.year()} - ${person.calcDoubleLifeStageDuration(4) - person.birthDate.year()} años`,
      stageDoubleEnd: '',
      hasDouble: person.hasDoubleStage(),
      descriptionBottom: 'N',
      descriptionTop: 'H',
      descriptionRight: 'C',
      descriptionLeft: 'A',
    },
  };

  return (
    <>
      <div className="w-full flex items-center justify-center bg-opacity-100">
        <div className="grid grid-cols-3 mt-3 gap-2 bridge-wrap relative">
          <CircleNumber size="xs" appearance="green" border="green" position="et" descriptionTop={bridgeState[stage].descriptionTop}>
            {bridgeState[stage].top}
          </CircleNumber>
          <CircleNumber size="xs" appearance="white" border="purple" position="el" descriptionLeft={bridgeState[stage].descriptionLeft}>
            {bridgeState[stage].left}
          </CircleNumber>
          <CircleNumber size="xs" appearance="gold" border="gold" position="ec">
            {bridgeState[stage].center}
          </CircleNumber>
          <CircleNumber size="xs" appearance="white" border="main" position="er" descriptionRight={bridgeState[stage].descriptionRight}>
            {bridgeState[stage].right}
          </CircleNumber>
          <CircleNumber size="xs" appearance="white" border="red" position="eb" descriptionBottom={bridgeState[stage].descriptionBottom}>
            {bridgeState[stage].bottom}
          </CircleNumber>
        </div>
      </div>
      <div className="grid text-xs mt-5 text-13 ml-4">
        <div className="flex gap-1">
          <FaArrowAltCircleUp color="#51A133" size={14} />
          {' '}
          {bridgeState[stage].stageStart}
        </div>
        {bridgeState[stage].stageEnd
          && (
            <div className="flex gap-1 mt-2">
              <FaArrowAltCircleDown color="#663366" size={14} />
              {' '}
              {bridgeState[stage].stageEnd}
            </div>
          )}
        {bridgeState[stage].stageStart !== bridgeState[stage].stageDoubleStart && (
          <>
            {bridgeState[stage].hasDouble && (
              <div className="flex gap-1 mt-4">
                <FaArrowAltCircleUp color="#51A133" size={14} />
                {' '}
                {bridgeState[stage].stageDoubleStart}
              </div>
            )}
            {bridgeState[stage].stageDoubleEnd
              && (
                <div className="flex gap-1 mt-2">
                  <FaArrowAltCircleDown color="#663366" size={14} />
                  {' '}
                  {bridgeState[stage].stageDoubleEnd}
                </div>
              )}
          </>
        )}
      </div>
    </>
  );
}

Bridge.defaultProps = {
  showVerification: false,
};

export default Bridge;
