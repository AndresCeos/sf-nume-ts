import {
  memo, useCallback, useEffect, useMemo, useState,
} from 'react';
import Modal from 'react-modal';

// Lazy load del glosario para evitar cargar todo al inicio
const loadGlosario = async () => {
  const { default: glosario } = await import('@/resources/glosario.json');
  return glosario;
};

// Función para normalizar texto eliminando acentos y caracteres especiales
const normalizeText = (text: string): string => text
  .toLowerCase()
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '') // Eliminar acentos
  .replace(/[^\w\s]/g, '') // Eliminar caracteres especiales excepto letras, números y espacios
  .trim();

interface FloatingLauraProps {
  isOpen: boolean;
  onClose: () => void;
}

function FloatingLaura({ isOpen, onClose }: FloatingLauraProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const [selectedDefinition, setSelectedDefinition] = useState<string>('');
  const [glosarioData, setGlosarioData] = useState<Record<string, string> | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Cargar glosario solo cuando se abre el modal
  const loadGlosarioData = useCallback(async () => {
    if (!glosarioData && !isLoading) {
      setIsLoading(true);
      try {
        const data = await loadGlosario();
        setGlosarioData(data as Record<string, string>);
      } catch (error) {
        console.error('Error loading glosario:', error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [glosarioData, isLoading]);

  // Cargar datos cuando se abre el modal
  useEffect(() => {
    if (isOpen && !glosarioData) {
      loadGlosarioData();
    }
  }, [isOpen, glosarioData, loadGlosarioData]);

  // Optimización: debounce para búsqueda
  const filteredTerms = useMemo(() => {
    if (!searchTerm.trim() || !glosarioData) return [];

    const normalizedSearchTerm = normalizeText(searchTerm);
    return Object.keys(glosarioData).filter((key) => normalizeText(key).includes(normalizedSearchTerm));
  }, [searchTerm, glosarioData]);

  const handleTermClick = useCallback((term: string) => {
    if (!glosarioData) return;

    const definition = glosarioData[term];
    if (definition) {
      setSelectedTerm(term);
      setSelectedDefinition(definition);
    }
  }, [glosarioData]);

  const handleBackToSearch = useCallback(() => {
    setSelectedTerm(null);
    setSelectedDefinition('');
  }, []);

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
              {isLoading && (
                <p className="floating-laura-placeholder">
                  Cargando glosario...
                </p>
              )}

              {!isLoading && searchTerm.trim() && filteredTerms.length === 0 && (
                <p className="floating-laura-no-results">
                  No se encontraron términos que coincidan con &quot;
                  {searchTerm}
                  &quot;
                </p>
              )}

              {!isLoading && filteredTerms.length > 0 && (
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

              {!isLoading && !searchTerm.trim() && (
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

// Memoizar el componente para evitar re-renders innecesarios
export default memo(FloatingLaura);
