"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jsonPath = exports.select = exports.value = exports.where = void 0;

var _queryGenerator = _interopRequireDefault(require("sequelize/lib/dialects/postgres/query-generator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// signatures are (v, tableName, Model)
const where = (...a) => _queryGenerator.default.getWhereConditions(...a);

exports.where = where;

const value = (...a) => _queryGenerator.default.handleSequelizeMethod(...a);

exports.value = value;

const select = (v, tableName, model) => _queryGenerator.default.selectQuery(tableName, v, model);

exports.select = select;

const jsonPath = (col, resource, path) => {
  const ncol = _queryGenerator.default.jsonPathExtractionQuery(col, path) // remove parens it puts on for literally no reason
  .replace(/^\(/, '').replace(/\)$/, '');

  return `"${resource}".${ncol}`;
};

exports.jsonPath = jsonPath;