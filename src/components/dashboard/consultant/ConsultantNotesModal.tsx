
import { formatDate, getTheRoute, pageNameBySlug } from '@/utils/constants';
import { NavLink } from 'react-router-dom';
import NotesModal from './NotesModal';

type ConsultantNotesModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  notes: Record<string, Record<string, string>>;
};

function ConsultantNotesModal({ isOpen, setIsOpen, notes }: ConsultantNotesModalProps) {
  if (!notes) {
    return (
      <NotesModal
        size="large"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Notas del Consultor"
      >
        <div className="p-4 text-center text-gray-500">
          No hay notas disponibles para este consultor.
        </div>
      </NotesModal>
    );
  }

  // Convertir las notas a un array y ordenar por fecha (más recientes primero)
  const notesArray = Object.entries(notes).map(([date, noteContent]) => ({
    date,
    content: noteContent,
  }));

  // Ordenar por fecha descendente (más recientes primero)
  notesArray.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <NotesModal
      size="large"
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title="Notas del Consultor"
    >
      <div className="max-h-96 overflow-y-auto">
        {notesArray.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            No hay notas disponibles para este consultor.
          </div>
        ) : (
          notesArray.map((note) => (
            <div key={note.date} className="mb-4">
              <div className="bg-gradient-to-r from-main-50 to-secondary-50 rounded-xl p-4 border border-main-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-main-800 font-semibold text-sm">
                    {formatDate({ date: new Date(note.date), format: 'long' })}
                  </h3>
                  <span className="text-xs text-gray-500">
                    {formatDate({ date: new Date(note.date), format: 'short' })}
                  </span>
                </div>
                <div className="grid gap-3">
                  {Object.entries(note.content).map(([path, content]) => (
                    <div key={path} className="p-3 bg-white rounded-lg border-2 border-gray-200">
                      <NavLink to={`/${getTheRoute(path)}`}>
                        <div className="font-semibold text-sm text-gray-700 mb-1">
                          Página:
                          {' '}
                          {pageNameBySlug({ name: path })}
                        </div>
                        <div className="text-sm text-gray-600 whitespace-pre-wrap">
                          {content}
                        </div>
                      </NavLink>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </NotesModal>
  );
}

export default ConsultantNotesModal;
