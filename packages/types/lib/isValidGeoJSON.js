"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _object = _interopRequireDefault(require("@mapbox/geojsonhint/lib/object"));

var _isValidCoordinate = _interopRequireDefault(require("./isValidCoordinate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ignore = new Set(['Polygons and MultiPolygons should follow the right-hand rule', 'geometry object cannot contain a "properties" member']);

const validCoordinates = coords => {
  if (!Array.isArray(coords)) return 'Coordinates not an array';
  if (coords.length === 0) return 'Coordinates array is empty';

  if (Array.isArray(coords[0])) {
    // recurse, this is basically a `find` but returns the right value
    // eslint-disable-next-line no-loops/no-loops
    for (let i = 0; i < coords.length; i++) {
      const issue = validCoordinates(coords[i]);
      if (issue !== true) return issue;
    }

    return true;
  }

  return (0, _isValidCoordinate.default)(coords);
};

var _default = async v => {
  const coordinateValidity = validCoordinates(v.coordinates);
  if (coordinateValidity !== true) return `Invalid coordinates${coordinateValidity ? ` - ${coordinateValidity}` : ''}`;

  const hints = _object.default.hint(v).filter(i => !ignore.has(i.message));

  if (hints.length !== 0) return hints[0].message;
  return true;
};

exports.default = _default;