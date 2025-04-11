export function convertJsonToCsv(input) {
  try {
    const parsed = JSON.parse(input)

    if (!Array.isArray(parsed) || !parsed.every(item => typeof item === 'object' && item !== null)) {
      return 'Erro: o JSON deve ser um array de objetos.'
    }

    const headers = Object.keys(parsed[0])
    const csvRows = [
      headers.join(','), // cabeçalhos
      ...parsed.map(row =>
        headers.map(field => JSON.stringify(row[field] ?? '')).join(',')
      )
    ]

    return csvRows.join('\n')
  } catch (error) {
    return `Erro: JSON inválido.\n\n${error.message}`
  }
}
