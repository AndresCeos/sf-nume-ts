import Person from '@/resources/Person';

type PinnaclePartnerProps = {
  partner: Person;
  size: 'sm' | 'lg';
  isVerificationActive?: boolean;
};

function PinnaclePartner({ partner, size, isVerificationActive = false }: PinnaclePartnerProps) {
  return (
    <div id="pinnacle" className={`relative ${size}`}>
      <img id="pinnacle-img" src="/assets/pinnacle.svg" className="absolute top-0 left-0 right-0 mx-auto" alt="background" />

      <div id="pinnacle-letters" className="relative w-full left-0 right-0 mx-auto">
        <div className="pinnacle-letter" data-letter="A">{partner.getA()}</div>
        <div className="pinnacle-letter" data-letter="B">
          {partner.getB()}
          {partner.getBISK()}
        </div>
        <div className="pinnacle-letter" data-letter="C">
          {partner.getC()}
          {partner.getCISK()}
        </div>
        <div className="pinnacle-letter" data-letter="D">
          {(!isVerificationActive) ? `${partner.getDCheck()}${partner.getDISKCheck()}` : `${partner.getD()}${partner.getDISK()}`}
        </div>

        <div className="pinnacle-letter" data-letter="E">{`${partner.getE()}${(!isVerificationActive) ? partner.getEISK() : partner.getEISKCheck()}`}</div>
        <div className="pinnacle-letter" data-letter="F">{`${partner.getF()}${(!isVerificationActive) ? partner.getFISK() : partner.getFISKCheck()}`}</div>
        <div className="pinnacle-letter" data-letter="I">
          {partner.getI()}
          {partner.getIISK()}
        </div>

        <div className="pinnacle-letter" data-letter="H">{(!isVerificationActive) ? `${partner.getHCheck()}${partner.getHISK()}` : `${partner.getH()}${partner.getHISKCheck()}`}</div>
        <div className="pinnacle-letter" data-letter="G">
          {partner.getG()}
          {partner.getGISK()}
        </div>
        <div className="pinnacle-letter" data-letter="J">
          {partner.getJ()}
          {partner.getJISK()}
        </div>

        <div className="pinnacle-letter" data-letter="K">{partner.getK()}</div>
        <div className="pinnacle-letter" data-letter="O">{partner.getO()}</div>
        <div className="pinnacle-letter" data-letter="L">{partner.getL()}</div>

        <div className="pinnacle-letter" data-letter="M">{partner.getM()}</div>

        <div className="pinnacle-letter" data-letter="P">{partner.getP()}</div>
        <div className="pinnacle-letter" data-letter="N">{partner.getN()}</div>

        <div className="pinnacle-letter" data-letter="R">{partner.getR()}</div>
        <div className="pinnacle-letter" data-letter="Q">{partner.getQ()}</div>
        <div className="pinnacle-letter" data-letter="S">{partner.getS()}</div>

        <div className="pinnacle-letter" data-letter="W">{partner.getW()}</div>

        <div className="pinnacle-absents">{partner.getAbsences()}</div>
      </div>
    </div>
  );
}

PinnaclePartner.defaultProps = {
  isVerificationActive: false,
};

export default PinnaclePartner;
