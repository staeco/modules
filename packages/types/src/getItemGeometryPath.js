import { orderBy } from 'lodash'
import * as types from '.'

const complexity = {
  Point: 1,
  LineString: 2,
  Polygon: 3,
  MultiLineString: 3,
  MultiPolygon: 4
}
const getComplexity = (v) => complexity[v.value.type] || 0

const getGeos = (k, field, value) => {
  if (!field) return
  const { type, items } = field

  // if not geospatial, bail
  if (!types[type].geospatial) return

  // if empty, bail
  if (!types.any.validators.required.test(value)) return
  if (!items) return [ { path: k, value } ] // flat val

  // agg subitems
  const geos = value.reduce((p, subvalue) => {
    const fieldGeos = getGeos([ ...k, 'items' ], items, subvalue)
    if (fieldGeos) p.push(...fieldGeos)
    return p
  }, [])
  if (geos.length === 0) return
  return geos
}

export default (dataType, item) => {
  if (typeof item !== 'object') return
  const geos = []
  const { schema } = dataType
  Object.keys(schema).forEach((k) => {
    const fieldGeos = getGeos([ k ], schema[k], item[k])
    if (fieldGeos) geos.push(...fieldGeos)
  })
  if (geos.length === 0) return
  const sorted = orderBy(geos, [ getComplexity ], [ 'desc' ])
  return [ sorted[0].path ]
}
