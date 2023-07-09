import useConsult from '@/hooks/useConsult';
import Person from '@/resources/Person';

type PinnacleProps = {
  size: 'sm' | 'lg';
  isVerificationActive?: boolean;
};

function Pinnacle({ size, isVerificationActive }: PinnacleProps) {
  const { consultant } = useConsult();

  if (!consultant) return null;

  const person = new Person({
    id: consultant.id || '',
    name: consultant.names || '',
    lastName: consultant.lastName || '',
    scdLastName: consultant.scdLastName || '',
    birthDate: consultant.date?.toString() || '',
  });

  return (
    <div id="pinnacle" className={`relative ${size}`}>

      <img id="pinnacle-img" src="/assets/pinnacle.svg" className="absolute top-0 left-0 right-0 mx-auto" alt="background" />

      <div id="pinnacle-letters" className="relative w-full left-0 right-0 mx-auto">
        <div className="pinnacle-letter" data-letter="A">{person.getA()}</div>
        <div className="pinnacle-letter" data-letter="B">
          {person.getB()}
          {person.getBISK()}
        </div>
        <div className="pinnacle-letter" data-letter="C">
          {person.getC()}
          {person.getCISK()}
        </div>
        <div className="pinnacle-letter" data-letter="D">
          {(!isVerificationActive) ? `${person.getDCheck()}${person.getDISKCheck()}` : `${person.getD()}${person.getDISK()}`}
        </div>

        <div className="pinnacle-letter" data-letter="E">{`${person.getE()}${(!isVerificationActive) ? person.getEISK() : person.getEISKCheck()}`}</div>
        <div className="pinnacle-letter" data-letter="F">{`${person.getF()}${(!isVerificationActive) ? person.getFISK() : person.getFISKCheck()}`}</div>
        <div className="pinnacle-letter" data-letter="I">
          {person.getI()}
          {person.getIISK()}
        </div>

        <div className="pinnacle-letter" data-letter="H">{(!isVerificationActive) ? `${person.getHCheck()}${person.getHISK()}` : `${person.getH()}${person.getHISKCheck()}`}</div>
        <div className="pinnacle-letter" data-letter="G">
          {person.getG()}
          {person.getGISK()}
        </div>
        <div className="pinnacle-letter" data-letter="J">
          {person.getJ()}
          {person.getJISK()}
        </div>

        <div className="pinnacle-letter" data-letter="K">{person.getK()}</div>
        <div className="pinnacle-letter" data-letter="O">{person.getO()}</div>
        <div className="pinnacle-letter" data-letter="L">{person.getL()}</div>

        <div className="pinnacle-letter" data-letter="M">{person.getM()}</div>

        <div className="pinnacle-letter" data-letter="P">{person.getP()}</div>
        <div className="pinnacle-letter" data-letter="N">{person.getN()}</div>

        <div className="pinnacle-letter" data-letter="R">{person.getR()}</div>
        <div className="pinnacle-letter" data-letter="Q">{person.getQ()}</div>
        <div className="pinnacle-letter" data-letter="S">{person.getS()}</div>

        <div className="pinnacle-letter" data-letter="W">{person.getW()}</div>

        <div className="pinnacle-absents">{person.getAbsences()}</div>
      </div>
    </div>
  );
}

Pinnacle.defaultProps = {
  isVerificationActive: false,
};

export default Pinnacle;
