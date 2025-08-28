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
