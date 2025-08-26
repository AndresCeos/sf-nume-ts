import Synastry from '@/resources/Synastry';

type PinnacleSynastryProps = {
  synastry: Synastry;
  size: 'sm' | 'lg';
  isVerificationActive?: boolean;
};

function PinnacleSynastry({ synastry, size, isVerificationActive = false }: PinnacleSynastryProps) {
  return (
    <div id="pinnacle" className={`relative ${size}`}>
      <img id="pinnacle-img" src="/assets/pinnacle.svg" className="absolute top-0 left-0 right-0 mx-auto" alt="background" />

      <div id="pinnacle-letters" className="relative w-full left-0 right-0 mx-auto">
        <div className="pinnacle-letter" data-letter="A">{synastry.getA()}</div>
        <div className="pinnacle-letter" data-letter="B">
          {synastry.getB()}
          {synastry.getBISK()}
        </div>
        <div className="pinnacle-letter" data-letter="C">
          {synastry.getC()}
          {synastry.getCISK()}
        </div>
        <div className="pinnacle-letter" data-letter="D">
          {(!isVerificationActive) ? `${synastry.getDCheck()}${synastry.getDISKCheck()}` : `${synastry.getD()}${synastry.getDISK()}`}
        </div>

        <div className="pinnacle-letter" data-letter="E">{`${synastry.getE()}${(!isVerificationActive) ? synastry.getEISK() : synastry.getEISKCheck()}`}</div>
        <div className="pinnacle-letter" data-letter="F">{`${synastry.getF()}${(!isVerificationActive) ? synastry.getFISK() : synastry.getFISKCheck()}`}</div>
        <div className="pinnacle-letter" data-letter="I">
          {synastry.getI()}
          {synastry.getIISK()}
        </div>

        <div className="pinnacle-letter" data-letter="H">{(!isVerificationActive) ? `${synastry.getHCheck()}${synastry.getHISK()}` : `${synastry.getH()}${synastry.getHISKCheck()}`}</div>
        <div className="pinnacle-letter" data-letter="G">
          {synastry.getG()}
          {synastry.getGISK()}
        </div>
        <div className="pinnacle-letter" data-letter="J">
          {synastry.getJ()}
          {synastry.getJISK()}
        </div>

        <div className="pinnacle-letter" data-letter="K">{synastry.getK()}</div>
        <div className="pinnacle-letter" data-letter="O">{synastry.getO()}</div>
        <div className="pinnacle-letter" data-letter="L">{synastry.getL()}</div>

        <div className="pinnacle-letter" data-letter="M">{synastry.getM()}</div>

        <div className="pinnacle-letter" data-letter="P">{synastry.getP()}</div>
        <div className="pinnacle-letter" data-letter="N">{synastry.getN()}</div>

        <div className="pinnacle-letter" data-letter="R">{synastry.getR()}</div>
        <div className="pinnacle-letter" data-letter="Q">{synastry.getQ()}</div>
        <div className="pinnacle-letter" data-letter="S">{synastry.getS()}</div>

        <div className="pinnacle-letter" data-letter="W">{synastry.getW()}</div>

        <div className="pinnacle-absents">{synastry.getAbsences()}</div>
      </div>
    </div>
  );
}

PinnacleSynastry.defaultProps = {
  isVerificationActive: false,
};

export default PinnacleSynastry;
