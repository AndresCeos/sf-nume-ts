import glosario from '@/resources/glosario.json';
import { useMemo, useState } from 'react';
import Modal from 'react-modal';

interface FloatingLauraProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FloatingLaura({ isOpen, onClose }: FloatingLauraProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const [selectedDefinition, setSelectedDefinition] = useState<string>('');

  const filteredTerms = useMemo(() => {
    if (!searchTerm.trim()) return [];

    const glosarioData = glosario as Record<string, string>;
    return Object.keys(glosarioData).filter((key) => key.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [searchTerm]);

  const handleTermClick = (term: string) => {
    const glosarioData = glosario as Record<string, string>;
    const definition = glosarioData[term];
    if (definition) {
      setSelectedTerm(term);
      setSelectedDefinition(definition);
    }
  };

  const handleBackToSearch = () => {
    setSelectedTerm(null);
    setSelectedDefinition('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="floating-laura-modal"
      overlayClassName="floating-laura-overlay"
      contentLabel="Glosario de Numerología"
    >
      <div className="floating-laura-content">
        <div className="floating-laura-header">
          <div className="floating-laura-header-content">
            <div className="floating-laura-header-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
              </svg>
            </div>
            <h2 className="floating-laura-header-title">
              {selectedTerm || 'Glosario de Numerología'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="floating-laura-close-btn"
          >
            ×
          </button>
        </div>

        {selectedTerm ? (
          <div className="floating-laura-definition">
            <div className="floating-laura-info-section">
              <div className="floating-laura-info-item">
                <button
                  type="button"
                  id="floating-laura-back-link"
                  className="floating-laura-back-link"
                  onClick={handleBackToSearch}
                >
                  Volver a la búsqueda
                </button>
              </div>
            </div>

            <div className="floating-laura-definition-content">
              <p className="floating-laura-label">Definición</p>
              <div className="floating-laura-definition-text">
                <p className="floating-laura-definition-paragraph">
                  {selectedDefinition}
                </p>
              </div>
            </div>

          </div>
        ) : (
          <>
            <div className="floating-laura-info-section">
              <div className="floating-laura-info-item">
                <span className="floating-laura-info-label">Búsqueda:</span>
              </div>
            </div>

            <div className="floating-laura-search-section">
              <p className="floating-laura-label">Buscar término</p>
              <input
                type="text"
                placeholder="Escribe el término aquí..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="floating-laura-search-input"
              />
            </div>

            <div className="floating-laura-results">
              {searchTerm.trim() && filteredTerms.length === 0 && (
                <p className="floating-laura-no-results">
                  No se encontraron términos que coincidan con &quot;
                  {searchTerm}
                  &quot;
                </p>
              )}

              {filteredTerms.length > 0 && (
                <div className="floating-laura-terms-list">
                  {filteredTerms.map((term) => (
                    <button
                      type="button"
                      key={term}
                      onClick={() => handleTermClick(term)}
                      className="floating-laura-term-item"
                    >
                      <h3 className="floating-laura-term-title">{term}</h3>
                    </button>
                  ))}
                </div>
              )}

              {!searchTerm.trim() && (
                <p className="floating-laura-placeholder">
                  Escribe un término para buscar en el glosario
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}
