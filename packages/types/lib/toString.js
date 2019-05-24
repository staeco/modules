"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jsonPath = exports.select = exports.where = void 0;

var _queryGenerator = _interopRequireDefault(require("sequelize/lib/dialects/postgres/query-generator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const qg = new _queryGenerator.default({
  sequelize: {},
  _dialect: 'postgres'
}); // signatures are (v, tableName, Model)

const where = (...a) => qg.getWhereConditions(...a);

exports.where = where;

const select = (v, tableName, model) => qg.selectQuery(tableName, v, model);

exports.select = select;

const jsonPath = (col, resource, path) => {
  const ncol = qg.jsonPathExtractionQuery(col, path) // remove parens it puts on for literally no reason
  .replace(/^\(/, '').replace(/\)$/, '');
  return `"${resource}".${ncol}`;
};

exports.jsonPath = jsonPath;