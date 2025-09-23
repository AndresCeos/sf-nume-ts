import { includes } from 'lodash';

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
    // Legacy personal keys
    case 'pinaculo': return 'Pináculo';
    case 'camino': return 'Camino de Vida';
    case 'nombre': return 'Nombre';
    case 'crear_nombre': return 'Crear Nombre';
    case 'destino': return 'Tabla del Destino';
    case 'tiempo': return 'Vibración de Tiempo';
    case 'retornos': return 'Retornos Anuales';
    case 'circulo_tiempo': return 'Círculo del Tiempo';
    case 'calendario': return 'Calendario Anual';
    case 'calendarioMensual': return 'Calendario Mensual';

    // Current personal route slugs
    case 'pinnacle': return 'Pináculo';
    case 'life_path': return 'Camino de Vida';
    case 'name': return 'Nombre';
    case 'create-name': return 'Crear Nombre';
    case 'destiny_table': return 'Tabla del Destino';
    case 'time_vibration': return 'Vibración del Tiempo';
    case 'annual_returns': return 'Retornos Anuales';
    case 'time_circle': return 'Círculo del Tiempo';
    case 'annual_calendar': return 'Calendario Anual';
    case 'monthly_calendar': return 'Calendario Mensual';

    // Legacy partner keys
    case 'sinastria': return 'Sinastría Análisis';
    case 'sinastria_vibracion': return 'Sinastría Vibración del Tiempo';
    case 'sinastria_retornos': return 'Sinastría Retornos Anuales';
    case 'sinastria_destino': return 'Sinastría Tabla del Destino Pareja';
    case 'sinastria_compatibilidad': return 'Sinastría Tabla de Compatibilidad';

    // Current partner route slugs
    case 'synastry_pinnacle': return 'Pináculo de Sinastría';
    case 'synastry_annual_returns': return 'Retornos Anuales de Sinastría';
    case 'synastry_destiny_table': return 'Tabla del Destino de Sinastría';
    case 'synastry_compatibility_table': return 'Tabla de Compatibilidad de Sinastría';
    case 'synastry_time_circle': return 'Círculo del Tiempo de Sinastría';
    case 'synastry_monthly_calendar': return 'Calendario Mensual de Sinastría';
    case 'synastry_annual_calendar': return 'Calendario Anual de Sinastría';
    case 'synastry_time_vibration': return 'Vibración del Tiempo de Sinastría';

    // Group keys (legacy and current)
    case 'group_pinnacle': return 'Grupo Pináculo';
    case 'group_vibracion': return 'Grupo Vibración del Tiempo'; // legacy
    case 'group_retornos': return 'Grupo Retornos Anuales'; // legacy
    case 'group_time_circle': return 'Grupo Círculo del Tiempo';
    case 'group_monthly_calendar': return 'Grupo Calendario Mensual';
    case 'group_annual_calendar': return 'Grupo Calendario Anual';
    case 'group_annual_returns': return 'Grupo Retornos Anuales';
    case 'group_vibration_time': return 'Grupo Vibración del Tiempo';
    default: return 'Numerología';
  }
}
export const getUrlLegacy = (path: string): string => {
  switch (path) {
    case 'pinaculo': return 'personal/pinnacle';
    case 'camino': return 'personal/life_path';
    case 'nombre': return 'personal/name';
    case 'crear_nombre': return 'personal/create-name';
    case 'destino': return 'personal/destiny_table';
    case 'tiempo': return 'personal/time_vibration';
    case 'retornos': return 'personal/annual_returns';
    case 'circulo_tiempo': return 'personal/time_circle';
    case 'calendario': return 'personal/annual_calendar';
    case 'calendarioMensual': return 'personal/monthly_calendar';
    case 'sinastria': return 'partner/synastry_pinnacle';
    case 'sinastria_vibracion': return 'partner/synastry_time_vibration';
    case 'sinastria_retornos': return 'partner/synastry_annual_returns';
    case 'sinastria_destino': return 'partner/synastry_destiny_table';
    case 'sinastria_compatibilidad': return 'partner/synastry_compatibility_table';
    case 'group_vibration': return 'group/group_vibration_time';
    case 'group_retornos': return 'group/group_annual_returns';
    default: return `personal/${path}`;
  }
};
export const getTheRoute = (path: string): string => {
  // First check if there's a legacy route match
  const legacyRoute = getUrlLegacy(path);
  if (legacyRoute !== `personal/${path}`) {
    return legacyRoute;
  }

  // If no legacy match, proceed with regular route checks
  if (includes(path, 'synastry')) {
    return `partner/${path}`;
  }
  if (includes(path, 'group')) {
    return `group/${path}`;
  }
  return `personal/${path}`;
};

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
