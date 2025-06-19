import { formatDate } from '@/utils/constants';
import ConsultantContentNotes from './ConsultantContentNotes';

function ConsultantModalNotes(modalNote: Record<string, Record<string, string>>) {
  const { item: itemNote } = modalNote;
  const pages = Object.entries(itemNote).map((items) => items);

  return (
    <li className="flex flex-col overflow-x-hidden overflow-y-auto h-96">
      { pages.map((items) => (
        <div key={items[0]} className="flex flex-col">
          <p className="text-gray-600 text-right text-xs">{formatDate({ date: items[0], format: 'short' })}</p>
          <ConsultantContentNotes data={items[1]} />
        </div>
      )) }
    </li>
  );
}

export default ConsultantModalNotes;
