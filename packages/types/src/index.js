import { fn, cast, literal } from 'sequelize'
import { value } from './toString'
import isEmail from 'validator/lib/isEmail'
import isURL from 'validator/lib/isURL'
import { BadRequestError } from 'sutro/dist/errors'
import isValidGeoJSON from './isValidGeoJSON'
import isValidGeometry from './isValidGeometry'
import moment from 'moment'
import isUnique from 'is-unique'
import isNumber from 'is-number'
import isObject from 'is-pure-object'

const zones = new Set(moment.tz.names())
const isPlainURL = (v) => isURL(v, { protocols: [ 'http', 'https' ] })
const getBasicGeoJSONIssues = (v, type) => {
  if (!isObject(v)) return 'Not a valid object'
  if (v.type !== type) return `Not a valid type value (Expected ${type} not ${v.type})`
}

const required = {
  name: 'Required',
  validateParam: (param) => param === true,
  test: (v) => v != null
}
const enumm = {
  name: 'In List',
  validateParam: (param) => Array.isArray(param) && param.length !== 0,
  test: (v, param) => param.includes(v)
}
const min = {
  name: 'Minimum',
  validateParam: isNumber,
  input: true,
  test: (v, param) => v >= param,
  value: 'number'
}
const max = {
  name: 'Maximum',
  validateParam: isNumber,
  input: true,
  test: (v, param) => v <= param,
  value: 'number'
}

export const any = {
  name: 'Any',
  test: () => true,
  cast: (txt) => txt,
  validators: { required }
}

export const array = {
  name: 'List',
  items: true,
  test: (v) => Array.isArray(v),
  // TODO: recursively map the array against the right types
  // this treats everything as a text array
  // probably need to pass in type and let the db figure out casting.
  // should follow moving all casting to db functions
  cast: (txt) => fn('fix_jsonb_array', txt),
  validators: {
    required,
    unique: {
      name: 'Unique',
      validateParam: (param) => param === true,
      test: (v) => isUnique(v)
    },
    notEmpty: {
      name: 'Not Empty',
      validateParam: (param) => param === true,
      test: (v) => v.length !== 0
    },
    minItems: {
      name: 'Minimum Items',
      validateParam: isNumber,
      input: true,
      test: (v, param) => v.length >= param,
      value: 'number'
    },
    maxItems: {
      name: 'Maximum Items',
      input: true,
      validateParam: isNumber,
      test: (v, param) => v.length <= param,
      value: 'number'
    }
  }
}

export const object = {
  name: 'Map',
  test: isObject,
  cast: (txt) => cast(txt, 'jsonb'),
  validators: {
    required,
    notEmpty: {
      name: 'Not Empty',
      validateParam: (param) => param === true,
      test: (v) => Object.keys(v).length !== 0
    },
    minKeys: {
      name: 'Minimum Keys',
      validateParam: (param) => isNumber(param) && param > 0,
      input: true,
      test: (v, param) => Object.keys(v).length >= param,
      value: 'number'
    },
    maxKeys: {
      name: 'Maximum Keys',
      validateParam: (param) => isNumber(param) && param > 0,
      input: true,
      test: (v, param) => Object.keys(v).length <= param,
      value: 'number'
    }
  }
}

export const text = {
  name: 'Text',
  test: (v) => typeof v === 'string',
  cast: (txt) => txt,
  validators: {
    required,
    notEmpty: {
      name: 'Not Empty',
      validateParam: (param) => param === true,
      test: (v) => v.length !== 0
    },
    minLength: {
      name: 'Minimum Length',
      validateParam: (param) => isNumber(param) && param > 0,
      input: true,
      test: (v, param) => v.length >= param,
      value: 'text'
    },
    maxLength: {
      name: 'Maximum Length',
      validateParam: (param) => isNumber(param) && param > 0,
      input: true,
      test: (v, param) => v.length <= param,
      value: 'text'
    },
    enum: enumm,
    url: {
      name: 'URL',
      validateParam: (param) => param === true,
      test: isPlainURL
    },
    image: {
      name: 'Image URL',
      validateParam: (param) => param === true,
      test: isPlainURL
    },
    video: {
      name: 'Video URL',
      validateParam: (param) => param === true,
      test: isPlainURL
    },
    audio: {
      name: 'Audio URL',
      validateParam: (param) => param === true,
      test: isPlainURL
    },
    stream: {
      name: 'Stream URL',
      validateParam: (param) => param === true,
      test: (v) =>
        isURL(v, {
          protocols: [
            'http', 'https', 'rtmp', 'rtmps'
          ]
        })
    },
    email: {
      name: 'Email',
      validateParam: (param) => param === true,
      test: (v) => isEmail(v)
    },
    phone: {
      name: 'Phone Number',
      validateParam: (param) => param === true,
      test: (v) => typeof v === 'string' // TODO: impl this using libphonenumber
    },
    address: {
      name: 'Address',
      validateParam: (param) => param === true,
      test: (v) => typeof v === 'string' // TODO: impl this using something
    },
    code: {
      name: 'Code',
      validateParam: (param) => param === true,
      test: (v) => typeof v === 'string' // TODO: impl this using something
    },
    regex: {
      name: 'Regular Expression',
      validateParam: (param) => {
        try {
          new RegExp(param)
          return true
        } catch (err) {
          return false
        }
      },
      test: (v, param) => new RegExp(param).test(v),
      value: 'text'
    }
  }
}
export const number = {
  name: 'Number',
  test: isNumber,
  cast: (txt) => cast(txt, 'numeric'),
  validators: {
    required,
    enum: enumm,
    min,
    max
  },
  measurements: {
    currency: {
      name: 'Currency',
      options: {
        usd: { name: 'USD ($)' },
        eur: { name: 'EUR (€)' }
        // TODO: add the rest
      }
    },
    distance: {
      name: 'Distance',
      options: {
        millimeter: { name: 'Millimeters (mm)' },
        centimeter: { name: 'Centimeters (cm)' },
        meter: { name: 'Meters (m)' },
        kilometer: { name: 'Kilometers (km)' }
      }
    },
    duration: {
      name: 'Duration',
      options: {
        nanosecond: { name: 'Microsecond (µs)' },
        millisecond: { name: 'Millisecond (ms)' },
        second: { name: 'Second (s)' },
        minute: { name: 'Minute (min)' },
        hour: { name: 'Hour (h)' }
      }
    },
    datePart: {
      name: 'Date Segment',
      options: {
        hourOfDay: { name: 'Hour of Day (0-23)' },
        dayOfWeek: { name: 'Day of Week (1-7)' },
        dayOfMonth: { name: 'Day of Month (01-31)' },
        dayOfYear: { name: 'Day of Year (0-366)' },
        monthOfYear: { name: 'Month of Year (01-12)' }
      }
    },
    speed: {
      name: 'Speed',
      options: {
        kilometer: { name: 'km/h' }
      }
    },
    area: {
      name: 'Area',
      options: {
        millimeter: { name: 'Millimeters (mm²)' },
        centimeter: { name: 'Centimers (cm²)' },
        meter: { name: 'Meters (m²)' },
        kilometer: { name: 'Kilometers (km²)' },
        hectare: { name: 'Hectares (ha)' }
      }
    },
    temperature: {
      name: 'Temperature',
      options: {
        celsius: { name: 'Celsius (°C)' }
      }
    },
    angle: {
      name: 'Angle',
      options: {
        degree: { name: 'Degrees (°)' },
        radian: { name: 'Radians (rad)' }
      }
    },
    percentage: {
      name: 'Percentage',
      options: {
        decimal: { name: 'Decimal (0-1)' }
      }
    },
    concentration: {
      name: 'Concentration',
      options: {
        microgram: { name: 'Micrograms per cubic meter (µg/m³)' }
      }
    }
  }
}
export const boolean = {
  name: 'True/False',
  test: (v) => typeof v === 'boolean',
  cast: (txt) => cast(txt, 'boolean'),
  validators: { required }
}

export const date = {
  name: 'Date/Time',
  test: (v) => moment(v, moment.ISO_8601).isValid(),
  cast: (txt, { timezone }) => {
    const base = fn('to_timestamp', txt, 'YYYY-MM-DD"T"HH24:MI:SS"Z"')
    if (!timezone) return base
    if (!zones.has(timezone)) throw new BadRequestError('Not a valid timezone')
    return literal(`${value(base)} AT TIME ZONE '${timezone}'`)
  },
  validators: {
    required,
    min,
    max
  }
}

// geo (EPSG:4979 / WGS84)
const geoCast = (txt) =>
  fn('ST_GeomFromGeoJSON', txt)

export const point = {
  name: 'GeoJSON Point',
  geospatial: true,
  syncTest: (v) => !getBasicGeoJSONIssues(v, 'Point'),
  test: async (v) => {
    const basicIssues = getBasicGeoJSONIssues(v, 'Point')
    if (basicIssues) return basicIssues
    const geojson = await isValidGeoJSON(v)
    if (geojson !== true) return geojson // return the reason
    return isValidGeometry(v)
  },
  cast: geoCast,
  validators: {
    required,
    minLongitude: {
      name: 'Minimum Longitude',
      validateParam: isNumber,
      input: true,
      test: (v, param) => param.coordinates[0] >= param,
      value: 'number'
    },
    maxLongitude: {
      name: 'Maximum Longitude',
      validateParam: isNumber,
      input: true,
      test: (v, param) => param.coordinates[0] >= param,
      value: 'number'
    },
    minLatitude: {
      name: 'Minimum Latitude',
      validateParam: isNumber,
      input: true,
      test: (v, param) => param.coordinates[1] >= param,
      value: 'number'
    },
    maxLatitude: {
      name: 'Maximum Latitude',
      validateParam: isNumber,
      input: true,
      test: (v, param) => param.coordinates[1] >= param,
      value: 'number'
    }
  }
}

export const line = {
  name: 'GeoJSON LineString',
  geospatial: true,
  syncTest: (v) => !getBasicGeoJSONIssues(v, 'LineString'),
  test: async (v) => {
    const basicIssues = getBasicGeoJSONIssues(v, 'LineString')
    if (basicIssues) return basicIssues
    const geojson = await isValidGeoJSON(v)
    if (geojson !== true) return geojson // return the reason
    return isValidGeometry(v)
  },
  cast: geoCast,
  validators: {
    required
    //minPoints,
    //maxPoints,
    //minLength,
    //maxLength
  }
}
export const multiline = {
  name: 'GeoJSON MultiLineString',
  geospatial: true,
  syncTest: (v) => !getBasicGeoJSONIssues(v, 'MultiLineString'),
  test: async (v) => {
    const basicIssues = getBasicGeoJSONIssues(v, 'MultiLineString')
    if (basicIssues) return basicIssues
    const geojson = await isValidGeoJSON(v)
    if (geojson !== true) return geojson // return the reason
    return isValidGeometry(v)
  },
  cast: geoCast,
  validators: {
    required
    //minPoints,
    //maxPoints,
    //minDistance,
    //maxDistance
  }
}
export const polygon = {
  name: 'GeoJSON Polygon',
  geospatial: true,
  syncTest: (v) => !getBasicGeoJSONIssues(v, 'Polygon'),
  test: async (v) => {
    const basicIssues = getBasicGeoJSONIssues(v, 'Polygon')
    if (basicIssues) return basicIssues
    const geojson = await isValidGeoJSON(v)
    if (geojson !== true) return geojson // return the reason
    return isValidGeometry(v)
  },
  cast: geoCast,
  validators: {
    required
    //minArea,
    //maxArea
  }
}
export const multipolygon = {
  name: 'GeoJSON MultiPolygon',
  geospatial: true,
  syncTest: (v) => !getBasicGeoJSONIssues(v, 'MultiPolygon'),
  test: async (v) => {
    const basicIssues = getBasicGeoJSONIssues(v, 'MultiPolygon')
    if (basicIssues) return basicIssues
    const geojson = await isValidGeoJSON(v)
    if (geojson !== true) return geojson // return the reason
    return isValidGeometry(v)
  },
  cast: geoCast,
  validators: {
    required
    //minArea,
    //maxArea
  }
}
