module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1606370503172, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.parse = parse;
exports.build = build;

var _xlsx = require('xlsx');

var _xlsx2 = _interopRequireDefault(_xlsx);

var _bufferFrom = require('buffer-from');

var _bufferFrom2 = _interopRequireDefault(_bufferFrom);

var _helpers = require('./helpers');

var _workbook = require('./workbook');

var _workbook2 = _interopRequireDefault(_workbook);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parse(mixed) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var workSheet = _xlsx2.default[(0, _helpers.isString)(mixed) ? 'readFile' : 'read'](mixed, options);
  return Object.keys(workSheet.Sheets).map(function (name) {
    var sheet = workSheet.Sheets[name];
    return { name: name, data: _xlsx2.default.utils.sheet_to_json(sheet, { header: 1, raw: options.raw !== false }) };
  });
}

function build(worksheets) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var defaults = {
    bookType: 'xlsx',
    bookSST: false,
    type: 'binary'
  };
  var workBook = new _workbook2.default();
  worksheets.forEach(function (worksheet) {
    var sheetName = worksheet.name || 'Sheet';
    var sheetOptions = worksheet.options || {};
    var sheetData = (0, _helpers.buildSheetFromMatrix)(worksheet.data || [], _extends({}, options, sheetOptions));
    workBook.SheetNames.push(sheetName);
    workBook.Sheets[sheetName] = sheetData;
  });
  var excelData = _xlsx2.default.write(workBook, Object.assign({}, defaults, options));
  return excelData instanceof Buffer ? excelData : (0, _bufferFrom2.default)(excelData, 'binary');
}

exports.default = { parse: parse, build: build };
//# sourceMappingURL=index.js.map
}, function(modId) {var map = {"./helpers":1606370503173,"./workbook":1606370503174}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1606370503173, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isCellDescriptor = exports.isObject = exports.isString = exports.isNumber = exports.isBoolean = exports.buildSheetFromMatrix = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _xlsx = require('xlsx');

var _xlsx2 = _interopRequireDefault(_xlsx);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isBoolean = function isBoolean(maybeBoolean) {
  return typeof maybeBoolean === 'boolean';
};
var isNumber = function isNumber(maybeNumber) {
  return typeof maybeNumber === 'number';
};
var isString = function isString(maybeString) {
  return typeof maybeString === 'string';
};
var isObject = function isObject(maybeObject) {
  return maybeObject !== null && (typeof maybeObject === 'undefined' ? 'undefined' : _typeof(maybeObject)) === 'object';
};
var isCellDescriptor = function isCellDescriptor(maybeCell) {
  return isObject(maybeCell) && 'v' in maybeCell;
};

var originDate = new Date(Date.UTC(1899, 11, 30));

var buildExcelDate = function buildExcelDate(value, is1904) {
  var epoch = Date.parse(value + (is1904 ? 1462 : 0));
  return (epoch - originDate) / 864e5;
};

var buildSheetFromMatrix = function buildSheetFromMatrix(data) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var workSheet = {};
  var range = { s: { c: 1e7, r: 1e7 }, e: { c: 0, r: 0 } };

  if (!Array.isArray(data)) throw new Error('sheet data is not array');

  for (var R = 0; R !== data.length; R += 1) {
    for (var C = 0; C !== data[R].length; C += 1) {
      if (!Array.isArray(data[R])) throw new Error(R + 'th row data is not array');

      if (range.s.r > R) range.s.r = R;
      if (range.s.c > C) range.s.c = C;
      if (range.e.r < R) range.e.r = R;
      if (range.e.c < C) range.e.c = C;
      if (data[R][C] === null) {
        continue; // eslint-disable-line
      }
      var cell = isCellDescriptor(data[R][C]) ? data[R][C] : { v: data[R][C] };
      var cellRef = _xlsx2.default.utils.encode_cell({ c: C, r: R });
      if (isNumber(cell.v)) {
        cell.t = 'n';
      } else if (isBoolean(cell.v)) {
        cell.t = 'b';
      } else if (cell.v instanceof Date) {
        cell.t = 'n';
        cell.v = buildExcelDate(cell.v);
        cell.z = cell.z || _xlsx2.default.SSF._table[14]; // eslint-disable-line no-underscore-dangle

        /* eslint-disable spaced-comment, no-trailing-spaces */
        /***
         * Allows for an non-abstracted representation of the data
         * 
         * example: {t:'n', z:10, f:'=AVERAGE(A:A)'}
         * 
         * Documentation:
         * - Cell Object: https://sheetjs.gitbooks.io/docs/#cell-object
         * - Data Types: https://sheetjs.gitbooks.io/docs/#data-types
         * - Format: https://sheetjs.gitbooks.io/docs/#number-formats
         **/
        /* eslint-disable spaced-comment, no-trailing-spaces */
      } else if (isObject(cell.v)) {
        cell.t = cell.v.t;
        cell.f = cell.v.f;
        cell.z = cell.v.z;
      } else {
        cell.t = 's';
      }
      if (isNumber(cell.z)) cell.z = _xlsx2.default.SSF._table[cell.z]; // eslint-disable-line no-underscore-dangle
      workSheet[cellRef] = cell;
    }
  }
  if (range.s.c < 1e7) {
    workSheet['!ref'] = _xlsx2.default.utils.encode_range(range);
  }
  if (options['!cols']) {
    workSheet['!cols'] = options['!cols'];
  }
  if (options['!merges']) {
    workSheet['!merges'] = options['!merges'];
  }
  return workSheet;
};

exports.buildSheetFromMatrix = buildSheetFromMatrix;
exports.isBoolean = isBoolean;
exports.isNumber = isNumber;
exports.isString = isString;
exports.isObject = isObject;
exports.isCellDescriptor = isCellDescriptor;
//# sourceMappingURL=helpers.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1606370503174, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Workbook = function Workbook() {
  _classCallCheck(this, Workbook);

  this.SheetNames = [];
  this.Sheets = {};
};

exports.default = Workbook;
//# sourceMappingURL=workbook.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1606370503172);
})()
//# sourceMappingURL=index.js.map