// eslint-disable-next-line prefer-destructuring
const env = import.meta.env;

export default env;

export function formatDate(opts: { date: Date, format: 'short' | 'long' }) {
  return new Date(opts.date).toLocaleDateString('es-MX', {
    day: '2-digit',
    month: opts.format === 'long' ? 'long' : 'short',
    year: 'numeric',
  }).replace(/ de /g, ' ').replace('.', '');
}
