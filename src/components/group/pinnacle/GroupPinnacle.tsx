import Group from '@/resources/Group';
import Person from '@/resources/Person';

type PinnacleProps = {
  size: 'small' | 'lg';
  consultant: Person | Group;
  main: 'bg-active-radial' | 'bg-white' | '';
};

function GroupPinnacle({ size, consultant, main }: PinnacleProps) {
  if (!consultant) return null;

  return (
    <div id="pinnacle" className={`relative !text-${size} ${main}`}>

      <img id="pinnacle-img" src="/assets/pinnacle.svg" className="absolute top-0 left-0 right-0 mx-auto" alt="background" />

      <div id="pinnacle-letters" className="relative w-full left-0 right-0 mx-auto">
        <div className="pinnacle-letter" data-letter="A">{consultant.getA()}</div>
        <div className="pinnacle-letter" data-letter="B">
          {consultant.getB()}
          {consultant.getBISK()}
        </div>
        <div className="pinnacle-letter" data-letter="C">
          {consultant.getC()}
          {consultant.getCISK()}
        </div>
        <div className="pinnacle-letter" data-letter="D">
          {`${consultant.getD()}${consultant.getDISK()}`}
        </div>

        <div className="pinnacle-letter" data-letter="E">{`${consultant.getE()}${consultant.getEISK()}`}</div>
        <div className="pinnacle-letter" data-letter="F">{`${consultant.getF()}${consultant.getFISK()}`}</div>
        <div className="pinnacle-letter" data-letter="I">
          {consultant.getI()}
          {consultant.getIISK()}
        </div>

        <div className="pinnacle-letter" data-letter="H">{`${consultant.getH()}${consultant.getHISK()}`}</div>
        <div className="pinnacle-letter" data-letter="G">
          {consultant.getG()}
          {consultant.getGISK()}
        </div>
        <div className="pinnacle-letter" data-letter="J">
          {consultant.getJ()}
          {consultant.getJISK()}
        </div>

        <div className="pinnacle-letter" data-letter="K">{consultant.getK()}</div>
        <div className="pinnacle-letter" data-letter="O">{consultant.getO()}</div>
        <div className="pinnacle-letter" data-letter="L">{consultant.getL()}</div>

        <div className="pinnacle-letter" data-letter="M">{consultant.getM()}</div>

        <div className="pinnacle-letter" data-letter="P">{consultant.getP()}</div>
        <div className="pinnacle-letter" data-letter="N">{consultant.getN()}</div>

        <div className="pinnacle-letter" data-letter="R">{consultant.getR()}</div>
        <div className="pinnacle-letter" data-letter="Q">{consultant.getQ()}</div>
        <div className="pinnacle-letter" data-letter="S">{consultant.getS()}</div>

        <div className="pinnacle-letter" data-letter="W">{consultant.getW()}</div>

        <div className="pinnacle-absents">{consultant.getAbsences()}</div>
      </div>
    </div>
  );
}

export default GroupPinnacle;
