export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('es-MX', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}
