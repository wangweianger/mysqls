/*
    auther : zane
    version: 1.0.0
    blog:http://blog.seosiwei.com
    github:https://github.com/wangweianger/node-transform-mysql
    npm:
*/

import * as common from './common'
import * as curd from './curd'

let connection = null;
let ispool = true;

//合并
let sqljson = Object.assign({}, common, curd)

//建立sql对象
function mysql() {
    this.sqlObj = {}
    this.istransaction = false;
}

for (let key in sqljson) {
    mysql.prototype[key] = sqljson[key]
}

/*
 *host
 *user
 *password
 *database
 *port
 *ispool  是否使用连接池链接
 *waitConnection  是否等待链接  
 *connectionLimit  连接池数
 *queueLimit 排队限制 
 */
function init(config = {}) {
    const mysql2 = require('mysql2');
    ispool = typeof(config.ispool) === 'boolean' ? config.ispool : true;
    if (ispool) {
        connection = mysql2.createPool({
            host: config.host || '127.0.0.1',
            user: config.user || 'root',
            password: config.password || 'root',
            database: config.database || 'test',
            port: config.port || 3306,
            waitForConnections: config.waitConnection || true,
            connectionLimit: config.connectionLimit || 10,
            queueLimit: config.queueLimit || 0,
        });
    } else {
        connection = mysql.createConnection({
            host: config.host || '127.0.0.1',
            user: config.user || 'root',
            password: config.password || 'root',
            database: config.database || 'test',
            port: config.port || 3306,
        });
    }
}

async function exec(sqlstring, type = false) {
    if (this instanceof mysql){
        sqlstring = this.sqlObj.sqlStr;
        this.sqlObj = {};
    }
    return new Promise(function(resolve, reject) {
        if (!connection){
            reject('Please initialize mysql first.');
            return false;
        }
        connection.query(sqlstring, function(error, results, fields) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
            if (!ispool && !type) connection.end();
        });
    })
}
mysql.prototype.exec = exec;

async function transaction(sqlstringArr = []) {
    return new Promise(async function(resolve, reject) {
        if (!connection){
            reject('Please initialize mysql first.');
            return false;
        }
        if (!sqlstringArr || !sqlstringArr.length){
            reject('The parameter is empty.');
            return false;
        }
        await exec('start transaction;', true)
        let resuarr = []
        for (let i = 0, len = sqlstringArr.length; i < len; i++) {
            try {
                let result = await exec(sqlstringArr[i], true)
                resuarr.push(result)
            } catch (err) {
                await exec('rollback;', true)
                if (!ispool) connection.end()
                reject(err)
                return
            }
        }
        if (resuarr.length == sqlstringArr.length) {
            await exec('commit;', true)
            if (!ispool) connection.end()
            resolve(resuarr)
        } else {
            await exec('rollback;', true)
            if (!ispool) connection.end()
            reject(resuarr)
        }
    })
}

module.exports = {
    init: init,
    exec: exec,
    transaction: transaction,
    sql: new mysql()
}
