// eslint-disable-next-line prefer-destructuring
const env = import.meta.env;

export default env;

export function formatDate(opts: { date: Date | string, format: 'short' | 'long' }) {
  return new Date(opts.date).toLocaleDateString('es-MX', {
    day: '2-digit',
    month: opts.format === 'long' ? 'long' : 'short',
    year: 'numeric',
  }).replace(/ de /g, ' ').replace('.', '');
}
export const sanitize = (text: string) => text
  .toString()
  .normalize('NFD') // split an accented letter in the base letter and the acent
  .replace(/[\u0300-\u036f]/g, '') // remove all previously split accents
  .toLowerCase()
  .trim()
  .replace(/\s+/g, '-')
  .replace(/[^\w-]+/g, '')
  .replace(/-+/g, '-');

export function pageNameBySlug(opts:{ name:string }) {
  switch (opts.name) {
    // case 'pinaculo': return 'Pináculo'
    // case 'nombre': return 'Análisis Numerológico del Nombre'
    // case 'ajusteNombre': return 'Ajuste Numerológico del Nombre'
    // case 'retornos': return 'Retornos Anuales'
    // case 'destino': return 'Tabla del Destino'
    // case 'sinastria': return 'Análisis Numerológico de Pareja'
    // case 'retornosPareja': return 'Retornos Anuales en Pareja'

    case 'pinaculo': return 'Pináculo';
    case 'camino': return 'Camino de Vida';
    case 'nombre': return 'Nombre';
    case 'crear_nombre': return 'Crear Nombre';
    case 'destino': return 'Tabla del Destino';
    case 'tiempo': return 'Vibración de Tiempo';
    case 'retornos': return 'Retornos Anuales';
    case 'circulo_tiempo': return 'Circulo del Tiempo';
    case 'calendario': return 'Calendario Anual';
    case 'calendarioMensual': return 'Calendario Mensual';

    case 'sinastria': return 'Sinastria Análisis';
    case 'sinastria_vibracion': return 'Sinastria Vibración del Tiempo';
    case 'sinastria_retornos': return 'Sinastria Retornos Anuales';
    case 'sinastria_destino': return 'Sinastria Tabla del Destino Pareja';
    case 'sinastria_compatibilidad': return 'Sinastria Tabla del Compatibilidad';

    case 'group_pinnacle': return 'Grupo Pináculo';
    case 'group_vibracion': return 'Grupo Vibración del Tiempo';
    case 'group_retornos': return 'Grupo Retornos Anuales';
    case 'group_time_circle': return 'Grupo Círculo del Tiempo';
    case 'group_monthly_calendar': return 'Grupo Calendario Mensual';
    case 'group_annual_calendar': return 'Grupo Calendario Anual';
    default: return 'Numerología';
  }
}
export const ciclePhrases: Record<number, string[]> = {
  1: [
    'Independencia',
    'Individuación',
    'Iniciaciones',
    'Dejando atrás al niño modelo, para saber ¿Quién soy?.',
    'Creando a un nuevo "YO" más independiente y seguro.',
    'Autoafirmando mi liderazgo e individualidad en el mundo.',
    'Liberaciones y búsqueda de mi propio emprendimiento.',
  ],
  11: [
    'Realización y notoriedad',
    'Inspiración y espiritualidad',
    'Nueva visión de vida',
    'Obligado a madurar y asumir la responsabilidad de mi vida.',
    'Aprendiendo a construir una mejor versión de mi mismo.',
    'Salgo de mis fronteras, cambiando mi mentalidad y visión de vida. ',
    'Apertura de consciencia y conexión con algo más elevado.',
  ],
  3: [
    'Oportunidades',
    'Diversificación',
    'Elecciones',
    'Enamorándome de mi vida y apresurándome a experimentar.',
    'Saliendo de todo lo que me somete, para aprender a elegir ¿Qué quiero?',
    'Expreso mis deseos, sin importar el que dirán. Aprendo a decir "NO".',
    'Me Aperturo a pararme sobre el escenario y tomar el micrófono.',
  ],
  4: [
    'Reorden',
    'Estructuras',
    'Limitaciones',
    'Saliendo de estructuras rígidas, opresivas o desordenadas en la vida.',
    'Reordenando mi vida y construyendo una nueva estructura',
    'Confronto mis limitaciones, me activo y derrumbo los muros que me contienen.',
    'Construyo un nuevo orden en mi vida, con estructuras mas sanas y equilibradas.',
  ],
  5: [
    'Cambios y movimientos',
    'Liberaciones y expansión',
    'Crisis',
    'Me aventuro a ir tras mi pasión y luchar por lo que quiero.',
    'Cambios sorpresivos que me mueven a una nueva realidad.',
    'Necesidad de sentirme vivo e ir en busca de una nueva pasión.',
    'Redireccionando hacia una realidad más libre y auténtica.',
  ],
  6: [
    'Familia',
    'Fertilidad y productividad',
    'Amor propio',
    'Aprendo a construir relaciones emocionales, solidarias, profundas y productivas.',
    'Conecto con mi amor propio y me permito poner mi semilla en el mundo. Soy fértil.',
    'Aprendo a atender mis necesidades,  antes que las de los demás. Me valoro.',
    'Momento de crear y conectar con mi tribu, permitiéndome nutrirlos y ser nutrido.',
  ],
  7: [
    'Responsabilidades',
    'Aprendizajes',
    'Formalizaciones',
    'Asumo responsabilidades y compromisos de vida.',
    'Me perfecciono, aprendo y/o enseño profundizando mi sabiduría.',
    'Me especializo y comprometo en elevar y trasmitir mi conocimiento.',
    'Suelto responsabilidades para comprometerme con mi proyecto de vida.',
  ],
  8: [
    'Potencial constructivo',
    'Empoderamiento',
    'Obstáculos y oposiciones',
    'Desarrollo autoridad y liderazgo en base a mi disciplina, enfoque y determinación. ',
    'Salgo del control, domino y opresión de una autoridad y tomo el liderazgo de mi vida.',
    'Me empodero y construyo mi propio esenario de abundancia y seguridad.',
    'Materializo mi potencial y talento, construyendo un proyecto propio más ambicioso.',
  ],
  9: [
    'Termino de caminos',
    'Reencuentros y reconciliaciones',
    'Fama',
    'Fin de un camino. Crecimiento obligado, sales al mundo por ti mismo.',
    'Asumo mi madurez para ir en busca de autonomía e independencia del clan.',
    'Me identifico con un ideal más grande que "YO". Reconocimiento y notoriedad por lo que hago.',
    'Conecto con mi lado humanista, en busca de una vida con sentido y propósito.',
  ],
};
