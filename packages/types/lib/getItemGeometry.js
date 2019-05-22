"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = require("lodash");

var types = _interopRequireWildcard(require("."));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const complexity = {
  Point: 1,
  LineString: 2,
  Polygon: 3,
  MultiLineString: 3,
  MultiPolygon: 4
};

const getComplexity = v => complexity[v.type] || 0;

const getGeos = (field, value) => {
  if (!field) return;
  const {
    type,
    items
  } = field; // if not geospatial, bail

  if (!types[type].geospatial) return; // if empty, bail

  if (!types.any.validators.required.test(value)) return;
  if (!items) return [value]; // flat val
  // agg subitems

  const geos = value.reduce((p, subvalue) => {
    const fieldGeos = getGeos(items, subvalue);
    if (fieldGeos) p.push(...fieldGeos);
    return p;
  }, []);
  if (geos.length === 0) return;
  return geos;
};

var _default = (dataType, item) => {
  if (typeof item !== 'object') return;
  const geos = [];
  const {
    schema
  } = dataType;
  Object.keys(schema).forEach(k => {
    const fieldGeos = getGeos(schema[k], item[k]);
    if (fieldGeos) geos.push(...fieldGeos);
  });
  if (geos.length === 0) return;
  const sorted = (0, _lodash.orderBy)(geos, [getComplexity], ['desc']);
  return sorted[0]; // TODO: make a feature collection?
};

exports.default = _default;