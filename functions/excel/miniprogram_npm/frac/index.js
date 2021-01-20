module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1606370503171, function(require, module, exports) {
/* frac.js (C) 2012-present SheetJS -- http://sheetjs.com */
var frac = function frac(x, D, mixed) {
  var n1 = Math.floor(x), d1 = 1;
  var n2 = n1+1, d2 = 1;
  if(x !== n1) while(d1 <= D && d2 <= D) {
    var m = (n1 + n2) / (d1 + d2);
    if(x === m) {
      if(d1 + d2 <= D) { d1+=d2; n1+=n2; d2=D+1; }
      else if(d1 > d2) d2=D+1;
      else d1=D+1;
      break;
    }
    else if(x < m) { n2 = n1+n2; d2 = d1+d2; }
    else { n1 = n1+n2; d1 = d1+d2; }
  }
  if(d1 > D) { d1 = d2; n1 = n2; }
  if(!mixed) return [0, n1, d1];
  var q = Math.floor(n1/d1);
  return [q, n1 - q*d1, d1];
};
frac.cont = function cont(x, D, mixed) {
  var sgn = x < 0 ? -1 : 1;
  var B = x * sgn;
  var P_2 = 0, P_1 = 1, P = 0;
  var Q_2 = 1, Q_1 = 0, Q = 0;
  var A = Math.floor(B);
  while(Q_1 < D) {
    A = Math.floor(B);
    P = A * P_1 + P_2;
    Q = A * Q_1 + Q_2;
    if((B - A) < 0.00000005) break;
    B = 1 / (B - A);
    P_2 = P_1; P_1 = P;
    Q_2 = Q_1; Q_1 = Q;
  }
  if(Q > D) { if(Q_1 > D) { Q = Q_2; P = P_2; } else { Q = Q_1; P = P_1; } }
  if(!mixed) return [0, sgn * P, Q];
  var q = Math.floor(sgn * P/Q);
  return [q, sgn*P - q*Q, Q];
};
// eslint-disable-next-line no-undef
if(typeof module !== 'undefined' && typeof DO_NOT_EXPORT_FRAC === 'undefined') module.exports = frac;

}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1606370503171);
})()
//# sourceMappingURL=index.js.map