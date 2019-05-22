import geojsonhint from '@mapbox/geojsonhint/lib/object'
import isValidCoordinate from './isValidCoordinate'

const ignore = new Set([
  'Polygons and MultiPolygons should follow the right-hand rule',
  'geometry object cannot contain a "properties" member'
])

const validCoordinates = (coords) => {
  if (!Array.isArray(coords)) return 'Coordinates not an array'
  if (coords.length === 0) return 'Coordinates array is empty'
  if (Array.isArray(coords[0])) {
    // recurse, this is basically a `find` but returns the right value
    // eslint-disable-next-line no-loops/no-loops
    for (let i = 0; i < coords.length; i++) {
      const issue = validCoordinates(coords[i])
      if (issue !== true) return issue
    }
    return true
  }
  return isValidCoordinate(coords)
}

export default async (v) => {
  const coordinateValidity = validCoordinates(v.coordinates)
  if (coordinateValidity !== true) return `Invalid coordinates${coordinateValidity ? ` - ${coordinateValidity}` : ''}`
  const hints = geojsonhint.hint(v).filter((i) => !ignore.has(i.message))
  if (hints.length !== 0) return hints[0].message
  return true
}
