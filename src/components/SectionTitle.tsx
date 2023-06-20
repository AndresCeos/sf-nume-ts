import cx from 'classnames';
import { TiPlus } from 'react-icons/ti';

type SectionTitleProps = {
  title: string;
  color?: string;
  button: {
    isActive: boolean;
    text: string;
    handle: () => void;
  };
};

function SectionTitle({ title, color, button }: SectionTitleProps) {
  return (
    <div className="bg-black text-white text-xs font-bold h-8 flex justify-between items-center rounded-t-lg">
      <div className="flex items-center">
        <div className={cx('w-9 h-9 flex justify-center items-center rounded-full -ml-2 p-1', color)}>
          <TiPlus />
        </div>
        {title}
      </div>
      {button && (
        <button
          type="button"
          onClick={button.handle}
          className={`float-right ${(button.isActive) ? 'bg-gold' : 'bg-yellow'} font-bold h-6 mb-1 rounded-tl-3xl rounded-bl-3xl flex justify-center items-center ${button.text ? 'px-3' : 'w-6'}`}
        >
          <img src="/assets/ic-check.svg" alt="comprobacion" className={`${button.text ? 'w-4' : 'w-3'}`} />
          {button.text}
        </button>
      )}
    </div>
  );
}

SectionTitle.defaultProps = {
  color: 'bg-main-700',
};

export default SectionTitle;
