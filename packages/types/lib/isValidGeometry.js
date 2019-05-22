"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _wkx = _interopRequireDefault(require("wkx"));

var _gdal = _interopRequireDefault(require("gdal"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = async geojson => {
  if (Array.isArray(geojson.coordinates) && geojson.coordinates.length === 0) {
    return 'Coordinates array is empty';
  }

  const wkb = _wkx.default.Geometry.parseGeoJSON(geojson).toWkb();

  const geo = _gdal.default.Geometry.fromWKB(wkb);

  return geo.isValid() || 'Not a valid geometry value';
};

exports.default = _default;