import QG from 'sequelize/lib/dialects/postgres/query-generator'

// signatures are (v, tableName, Model)
export const where = (...a) => QG.getWhereConditions(...a)
export const value = (...a) => QG.handleSequelizeMethod(...a)

export const select = (v, tableName, model) =>
  QG.selectQuery(tableName, v, model)

export const jsonPath = (col, resource, path) => {
  const ncol = QG.jsonPathExtractionQuery(col, path)
    // remove parens it puts on for literally no reason
    .replace(/^\(/, '')
    .replace(/\)$/, '')
  return `"${resource}".${ncol}`
}
