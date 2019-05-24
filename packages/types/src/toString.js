import QG from 'sequelize/lib/dialects/postgres/query-generator'

const qg = new QG({ sequelize: {}, _dialect: 'postgres' })
// signatures are (v, tableName, Model)
export const where = (...a) => qg.getWhereConditions(...a)
export const value = (...a) => qg.handleSequelizeMethod(...a)

export const select = (v, tableName, model) =>
  qg.selectQuery(tableName, v, model)

export const jsonPath = (col, resource, path) => {
  const ncol = qg.jsonPathExtractionQuery(col, path)
    // remove parens it puts on for literally no reason
    .replace(/^\(/, '')
    .replace(/\)$/, '')
  return `"${resource}".${ncol}`
}
