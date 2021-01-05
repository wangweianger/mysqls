"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _typeof2=require("babel-runtime/helpers/typeof"),_typeof3=_interopRequireDefault(_typeof2),_keys=require("babel-runtime/core-js/object/keys"),_keys2=_interopRequireDefault(_keys);exports.getOptToString=getOptToString,exports.checkOptType=checkOptType,exports.checkOptObjType=checkOptObjType,exports.expressionQuery=expressionQuery,exports.sortSelectSql=sortSelectSql,exports.handleInsertData=handleInsertData;var _sqlstring=require("sqlstring"),_sqlstring2=_interopRequireDefault(_sqlstring);function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function getOptToString(n){var r,c,a,o="",e=Object.prototype.toString.call(n);return"[object Object]"===e?(r=n._type&&n._type.toUpperCase()||"AND",c=n._type&&n._type.trim()?1:0,(a=(0,_keys2.default)(n)).forEach(function(e,t){"_type"!==e&&("object"===(0,_typeof3.default)(n[e])?t===a.length-1-c?o+=""+checkOptObjType(e,n[e]):o=o+(checkOptObjType(e,n[e])+" ")+r+" ":t===a.length-1-c?o+=e+"="+checkOptType(n[e]):o=o+(e+"="+checkOptType(n[e]))+" "+r+" ")})):"[object Array]"===e&&n.forEach(function(r,e){var c="",t=0,a=r._type&&r._type.toUpperCase()||"AND",p=r._nexttype||"AND",t=r._type&&r._type.trim()?t+1:t;t=r._nexttype&&r._nexttype.trim()?t+1:t,(0,_keys2.default)(r).forEach(function(e,t){"_type"!==e&&"_nexttype"!==e&&(c?"object"===(0,_typeof3.default)(r[e])?c+=a+" "+checkOptObjType(e,r[e]):c=c+(a+" "+e+"="+checkOptType(r[e]))+" ":c="object"===(0,_typeof3.default)(r[e])?""+checkOptObjType(e,r[e]):e+"="+checkOptType(r[e])+" ")}),c=e===n.length-1?"("+c+")":"("+c+") "+p.toUpperCase(),o=o+" "+c}),o}function checkOptType(e,t,r,c){var a=void 0;switch(Object.prototype.toString.call(e)){case"[object String]":e=e.trim(),e=_sqlstring2.default.escape(e),a=r&&c&&-1<e.indexOf(t)&&e.match(/\+|-|\*|\/|%/)?e.slice(1,-1):""+e;break;case"[object Boolean]":case"[object Number]":a=e;break;default:a=_sqlstring2.default.escape(e)}return a}function checkOptObjType(c,a){var p,n,o="";return"[object Object]"===Object.prototype.toString.call(a)?(p=(0,_keys2.default)(a),n=a._type&&a._type.trim()?1:0,p.forEach(function(e,t){var r;"_type"!==e&&(r=a._type||"AND",o+=expressionQuery(c,e,a[e],r.toUpperCase(),t===p.length-1-n))})):o=c+"="+a,"("+o+") "}function expressionQuery(e,t,r,c,a){var p="";switch(t.toUpperCase()){case"EQ":p="("+e+"="+checkOptType(r)+")";break;case"NEQ":p="("+e+"<>"+checkOptType(r)+")";break;case"GT":p="("+e+">"+checkOptType(r)+")";break;case"EGT":p="("+e+">="+checkOptType(r)+")";break;case"LT":p="("+e+"<"+checkOptType(r)+")";break;case"ELT":p="("+e+"<="+checkOptType(r)+")";break;case"LIKE":p="("+e+" LIKE "+checkOptType(r)+")";break;case"NOTLIKE":p="("+e+" NOT LIKE "+checkOptType(r)+")";break;case"BETWEEN":p="("+e+" BETWEEN "+r.replace(","," AND ")+")";break;case"NOTBETWEEN":p="("+e+" NOT BETWEEN "+r.replace(","," AND ")+")";break;case"IN":p="("+e+" IN ("+r+"))";break;case"NOTIN":p="("+e+" NOT IN ("+r+"))";break;default:p="("+e+"="+checkOptType(r)+")"}return a?p+" ":p+" "+c+" "}function sortSelectSql(e){e=e||{};1<arguments.length&&void 0!==arguments[1]&&arguments[1]?e.table&&(e.table=""+e.table):((e.count||e.max||e.min||e.avg||e.sum)&&(t=(e.count?","+e.count:"")+(e.max?","+e.max:"")+(e.min?","+e.min:"")+(e.avg?","+e.avg:"")+(e.sum?","+e.sum:""),e.count=e.max=e.min=e.avg=e.sum="",e.field?e.field=e.field+t:e.field=t.substring(1)),e.field||(e.field="*"),e.table&&(e.table="FROM "+e.table),e.where&&(e.where="WHERE "+e.where));var t=(0,_keys2.default)(e),c=[],a=["union","distinct","field","count","max","min","avg","sum","table","alias","join","where","group","having","order","limit","page","comment"];return t.forEach(function(r,e){a.forEach(function(e,t){r===e&&(c[t]=r)})}),{sortkeys:c,result:e}}function sortArray(e){for(var t=[],r=(0,_keys2.default)(e[0]),c=1;c<e.length;c++)for(var a=0;a<r.length;a++)(0,_keys2.default)(e[c]).includes(r[a])||r.splice(a,1);for(var p=0;p<e.length;p++){for(var n={},o=0;o<r.length;o++)n[[r[o]]]=e[p][r[o]];t.push(n)}return t}function handleInsertData(e){if(!e)return"";Array.isArray(e)&&1===e.length&&(e=e[0]);var t="",r="";if(Array.isArray(e)){e=sortArray(e),t=(0,_keys2.default)(e[0]).toString();for(var c=0;c<e.length;c++){var a,p="";for(a in e[c])p=""+p?p+","+checkOptType(e[c][a]):checkOptType(e[c][a]);r+="("+p+"),"}r=r.slice(0,-1)}else{for(var n in e)t=t?t+","+n:n,r=""+r?r+","+checkOptType(e[n]):checkOptType(e[n]);r="("+r+")"}return"("+t+") VALUES "+r}