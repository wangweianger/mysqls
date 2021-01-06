"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sqlstring = require("sqlstring");
//把查询参数转换为strng
function getOptToString(opt) {
    let result = '';
    let optType = Object.prototype.toString.call(opt);
    if (optType === '[object Object]') {
        let _type = opt._type && opt._type.toUpperCase() || 'AND';
        let number = opt._type && opt._type.trim() ? 1 : 0;
        let keys = Object.keys(opt);
        keys.forEach((item, index) => {
            if (item === '_type')
                return;
            if (typeof (opt[item]) === 'object') {
                if (index === keys.length - 1 - number) {
                    result = result + `${checkOptObjType(item, opt[item])}`;
                }
                else {
                    result = result + `${checkOptObjType(item, opt[item])} ${_type} `;
                }
            }
            else {
                if (index === keys.length - 1 - number) {
                    result = result + `${item}=${checkOptType(opt[item])}`;
                }
                else {
                    result = result + `${item}=${checkOptType(opt[item])} ${_type} `;
                }
            }
        });
    }
    else if (optType === '[object Array]') {
        opt.forEach((item, index) => {
            let result1 = '';
            let number = 0;
            let _type = item._type && item._type.toUpperCase() || 'AND';
            let _nexttype = item._nexttype || 'AND';
            number = item._type && item._type.trim() ? number + 1 : number;
            number = item._nexttype && item._nexttype.trim() ? number + 1 : number;
            let keys = Object.keys(item);
            keys.forEach((chi_item, index) => {
                if (chi_item === '_type' || chi_item === '_nexttype')
                    return;
                if (result1) {
                    if (typeof (item[chi_item]) === 'object') {
                        result1 = result1 + `${_type} ${checkOptObjType(chi_item, item[chi_item])}`;
                    }
                    else {
                        result1 = result1 + `${_type} ${chi_item}=${checkOptType(item[chi_item])} `;
                    }
                }
                else {
                    if (typeof (item[chi_item]) === 'object') {
                        result1 = `${checkOptObjType(chi_item, item[chi_item])}`;
                    }
                    else {
                        result1 = `${chi_item}=${checkOptType(item[chi_item])} `;
                    }
                }
            });
            index === opt.length - 1 ?
                result1 = `(${result1})` :
                result1 = `(${result1}) ${_nexttype.toUpperCase()}`;
            result = `${result} ${result1}`;
        });
    }
    return result;
}
exports.getOptToString = getOptToString;
//检查值类型返回相应值
function checkOptType(opt, key, type, bol) {
    let result;
    switch (Object.prototype.toString.call(opt)) {
        case "[object String]":
            opt = opt.trim();
            opt = sqlstring.escape(opt);
            result = type && bol && opt.indexOf(key) > -1 && opt.match(/\+|-|\*|\/|%/) ? opt.slice(1, -1) : `${opt}`;
            break;
        case "[object Boolean]":
        case "[object Number]":
            result = opt;
            break;
        default:
            result = sqlstring.escape(opt);
    }
    return result;
}
exports.checkOptType = checkOptType;
//检查object值类型 返回相应值
function checkOptObjType(pre_key, val) {
    let result = '';
    let type = Object.prototype.toString.call(val);
    if (type === '[object Object]') {
        let keys = Object.keys(val);
        let number = val._type && val._type.trim() ? 1 : 0;
        keys.forEach((item, index) => {
            if (item === '_type')
                return;
            let _type = val._type || 'AND';
            result = result + expressionQuery(pre_key, item, val[item], _type.toUpperCase(), index === keys.length - 1 - number ? true : false);
        });
    }
    else {
        result = `${pre_key}=${val}`;
    }
    return `(${result}) `;
}
exports.checkOptObjType = checkOptObjType;
// 表达式匹配查询
function expressionQuery(par_key, chi_key, value, _type, isLastOne) {
    let result = '';
    switch (chi_key.toUpperCase()) {
        case 'EQ':
            result = `(${par_key}=${checkOptType(value)})`;
            break;
        case 'NEQ':
            result = `(${par_key}<>${checkOptType(value)})`;
            break;
        case 'GT':
            result = `(${par_key}>${checkOptType(value)})`;
            break;
        case 'EGT':
            result = `(${par_key}>=${checkOptType(value)})`;
            break;
        case 'LT':
            result = `(${par_key}<${checkOptType(value)})`;
            break;
        case 'ELT':
            result = `(${par_key}<=${checkOptType(value)})`;
            break;
        case 'LIKE':
            result = `(${par_key} LIKE ${checkOptType(value)})`;
            break;
        case 'NOTLIKE':
            result = `(${par_key} NOT LIKE ${checkOptType(value)})`;
            break;
        case 'BETWEEN':
            result = `(${par_key} BETWEEN ${value.replace(',', ' AND ')})`;
            break;
        case 'NOTBETWEEN':
            result = `(${par_key} NOT BETWEEN ${value.replace(',', ' AND ')})`;
            break;
        case 'IN':
            result = `(${par_key} IN (${value}))`;
            break;
        case 'NOTIN':
            result = `(${par_key} NOT IN (${value}))`;
            break;
        default:
            result = `(${par_key}=${checkOptType(value)})`;
    }
    return isLastOne ? `${result} ` : `${result} ${_type} `;
}
exports.expressionQuery = expressionQuery;
//排序 生成 sql 字符串
function sortSelectSql(json, bool = false) {
    let result = json || {};
    if (bool) {
        if (result.table)
            result.table = `${result.table}`;
    }
    else {
        if (result.count || result.max || result.min || result.avg || result.sum) {
            let concatstr = (result.count ? `,${result.count}` : '')
                + (result.max ? `,${result.max}` : '')
                + (result.min ? `,${result.min}` : '')
                + (result.avg ? `,${result.avg}` : '')
                + (result.sum ? `,${result.sum}` : '');
            result.count = result.max = result.min = result.avg = result.sum = '';
            result.field ? result.field = (result.field + concatstr) : result.field = concatstr.substring(1);
        }
        if (!result.field)
            result.field = '*';
        if (result.table)
            result.table = `FROM ${result.table}`;
        if (result.where)
            result.where = `WHERE ${result.where}`;
    }
    let keys = Object.keys(result);
    let keysresult = [];
    // 查询默认排序数组
    let searchSort = ['union', 'distinct', 'field', 'count', 'max', 'min', 'avg', 'sum', 'table',
        'alias', 'join', 'where', 'group', 'having', 'order', 'limit', 'page', 'comment'];
    //排序                    
    keys.forEach((item1, index1) => {
        searchSort.forEach((item2, index2) => {
            if (item1 === item2) {
                keysresult[index2] = item1;
            }
        });
    });
    return {
        sortkeys: keysresult,
        result: result
    };
}
exports.sortSelectSql = sortSelectSql;
function sortArray(data) {
    const result = [];
    const item = Object.keys(data[0]);
    for (let i = 1; i < data.length; i++) {
        for (let j = 0; j < item.length; j++) {
            // @ts-ignore
            if (!Object.keys(data[i]).includes(item[j])) {
                item.splice(j, 1);
            }
        }
    }
    for (let i = 0; i < data.length; i++) {
        let json = {};
        for (let j = 0; j < item.length; j++) {
            json[[item[j]]] = data[i][item[j]];
        }
        result.push(json);
    }
    return result;
}
// 处理insert批量插入data参数
function handleInsertData(data) {
    if (!data)
        return '';
    if (Array.isArray(data) && data.length === 1)
        data = data[0];
    let keys = '';
    let values = '';
    let datastr = '';
    if (Array.isArray(data)) {
        // array
        data = sortArray(data);
        keys = Object.keys(data[0]).toString();
        for (let i = 0; i < data.length; i++) {
            let items = '';
            for (let key in data[i]) {
                items = items ? `${items},${checkOptType(data[i][key])}` : checkOptType(data[i][key]);
            }
            values += `(${items}),`;
        }
        values = values.slice(0, -1);
    }
    else {
        // object
        for (let key in data) {
            keys = keys ? `${keys},${key}` : key;
            values = values ? `${values},${checkOptType(data[key])}` : checkOptType(data[key]);
        }
        values = `(${values})`;
    }
    datastr = `(${keys}) VALUES ${values}`;
    return datastr;
}
exports.handleInsertData = handleInsertData;
