"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uitl_1 = require("./uitl");
//需要查询的table表  参数：String  案例：table('user')
function table(opt) {
    if (opt && opt.indexOf('SELECT') != -1) {
        opt = `(${opt})`;
    }
    if (opt)
        this.sqlObj.table = opt;
    return this;
}
exports.table = table;
/*where条件
  参数为 String | Object | Array
  案例：
*/
function where(opt) {
    let result = '';
    if (typeof (opt) === 'string') {
        result = opt;
    }
    else {
        result = uitl_1.getOptToString(opt);
    }
    if (result)
        this.sqlObj.where = result;
    return this;
}
exports.where = where;
/*查询字段
  参数为 String | Array
  案例： field('id,name,age,sex')  | field(['id','name','age','sex'])
*/
function field(opt) {
    if (typeof (opt) === 'object') {
        opt = opt.join(',');
    }
    this.sqlObj.field = opt;
    return this;
}
exports.field = field;
/*设置别名
  参数为 String
  案例： alias('a')
*/
function alias(opt) {
    this.sqlObj.alias = opt;
    return this;
}
exports.alias = alias;
/*设置data数据
  参数为 json | string
  案例： {name:'zane',email:'752636052@qq.com'}  |  'name=zane&email=752636052@qq.com'
*/
function data(opt) {
    let newopt = {};
    if (typeof (opt) === 'string') {
        let arr = opt.split('&');
        arr.forEach(item => {
            let itemarr = item.split('=');
            newopt[itemarr[0]] = itemarr[1];
        });
    }
    else {
        newopt = opt;
    }
    this.sqlObj.data = newopt;
    return this;
}
exports.data = data;
/*order排序
  参数为 Array | string
  案例： order(['id','number asc'])  | order('id desc')
*/
function order(opt) {
    let orderby = 'ORDER BY';
    if (typeof (opt) === 'object') {
        opt = opt.join(',');
    }
    this.sqlObj.order = `${orderby} ${opt}`;
    return this;
}
exports.order = order;
/*limit 语句
  参数类型 ： Number
  案例 limit(10)  | limit(10,20)
 */
function limit() {
    this.sqlObj.limit = `LIMIT ${Array.prototype.slice.apply(arguments)}`;
    return this;
}
exports.limit = limit;
/*page 语句
  参数类型 ： Number | String
  案例 page(1,10)  | page(2,10) | page('3,10')
 */
function page(option) {
    let opt = [];
    if (arguments.length === 1) {
        opt = option.split(',');
    }
    else {
        opt = Array.prototype.slice.apply(arguments);
    }
    if (opt.length == 2) {
        let begin = parseInt((opt[0] - 1)) * parseInt(opt[1]);
        let end = parseInt(opt[1]);
        this.sqlObj.limit = `LIMIT ${begin},${end}`;
    }
    return this;
}
exports.page = page;
/*group 语句
  参数类型 ： String
  案例        group('id,name')
 */
function group(opt) {
    this.sqlObj.group = `GROUP BY ${opt}`;
    return this;
}
exports.group = group;
/*having 语句
    参数类型： String
    案例：    having('count(number)>3')
 */
function having(opt) {
    this.sqlObj.having = `HAVING ${opt}`;
    return this;
}
exports.having = having;
/*union 语句
    参数类型： String | Array
    案例： union('SELECT name FROM node_user_1') | union(['SELECT name FROM node_user_1','SELECT name FROM node_user_2'])
 */
function union(opt, type = false) {
    if (typeof (opt) === 'string') {
        if (this.sqlObj.union) {
            this.sqlObj.union = `${this.sqlObj.union} (${opt}) ${type ? 'UNION ALL' : 'UNION'}`;
        }
        else {
            this.sqlObj.union = `(${opt}) ${type ? 'UNION ALL' : 'UNION'} `;
        }
    }
    else if (typeof (opt) === 'object') {
        if (this.sqlObj.union) {
            this.sqlObj.union = `${this.sqlObj.union} (${opt.join(type ? ') UNION ALL (' : ') UNION (')})  ${type ? 'UNION ALL' : 'UNION'} `;
        }
        else {
            this.sqlObj.union = `(${opt.join(type ? ') UNION ALL (' : ') UNION (')}) ${type ? 'UNION ALL' : 'UNION'} `;
        }
    }
    return this;
}
exports.union = union;
/*distinct 语句
    参数类型： Boolean
    案例： distinct(true)
 */
function distinct(opt) {
    if (opt) {
        this.sqlObj.distinct = 'DISTINCT';
    }
    return this;
}
exports.distinct = distinct;
/* lock 锁语法
    参数类型： Boolean
    案例：  lock(true)
 */
function lock(opt) {
    if (opt) {
        this.sqlObj.lock = 'FOR UPDATE';
    }
    return this;
}
exports.lock = lock;
/* comment 为sql语句添加注释
    参数类型： String
    案例：  comment('查询用户的姓名')
 */
function comment(opt) {
    if (opt) {
        this.sqlObj.comment = `/* ${opt} */`;
    }
    return this;
}
exports.comment = comment;
function count(opt, alias) {
    let optvalue = opt || 1;
    this.sqlObj.count = `COUNT(${optvalue})` + (alias ? ` AS ${alias}` : '');
    return this;
}
exports.count = count;
function max(opt, alias) {
    if (opt) {
        this.sqlObj.max = `MAX(${opt})` + (alias ? ` AS ${alias}` : '');
    }
    return this;
}
exports.max = max;
function min(opt, alias) {
    if (opt) {
        this.sqlObj.min = `MIN(${opt})` + (alias ? ` AS ${alias}` : '');
    }
    return this;
}
exports.min = min;
function avg(opt, alias) {
    if (opt) {
        this.sqlObj.avg = `AVG(${opt})` + (alias ? ` AS ${alias}` : '');
    }
    return this;
}
exports.avg = avg;
function sum(opt, alias) {
    if (opt) {
        this.sqlObj.sum = `SUM(${opt})` + (alias ? ` AS ${alias}` : '');
    }
    return this;
}
exports.sum = sum;
