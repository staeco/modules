import wkx from 'wkx'
import gdal from 'gdal'

export default async (geojson) => {
  if (Array.isArray(geojson.coordinates) && geojson.coordinates.length === 0) {
    return 'Coordinates array is empty'
  }
  const wkb = wkx.Geometry.parseGeoJSON(geojson).toWkb()
  const geo = gdal.Geometry.fromWKB(wkb)
  return geo.isValid() || 'Not a valid geometry value'
}
