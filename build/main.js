"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const curd_1 = require("./curd");
// @ts-ignore
const mysql2 = require('mysql2');
let connection = null;
let ispool = true;
//建立sql对象
class mysql extends curd_1.default {
    constructor() {
        super();
        this.sqlObj = {};
        this.istransaction = false;
    }
}
mysql.prototype.exec = exec;
/**
 * 初始化
 *
 * @export
 * @param {Config} config
 */
function init(config) {
    ispool = typeof (config.ispool) === 'boolean' ? config.ispool : true;
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
    }
    else {
        connection = mysql.createConnection({
            host: config.host || '127.0.0.1',
            user: config.user || 'root',
            password: config.password || 'root',
            database: config.database || 'test',
            port: config.port || 3306,
        });
    }
}
exports.init = init;
/**
 * 运行sql
 *
 * @export
 * @param {string} sqlstring
 * @param {boolean} [type=false]
 * @returns
 */
function exec(sqlstring, type = false) {
    return __awaiter(this, void 0, void 0, function* () {
        // @ts-ignore
        if (this instanceof mysql) {
            // @ts-ignore
            sqlstring = this.sqlObj.sqlStr;
            // @ts-ignore
            this.sqlObj = {};
        }
        return new Promise(function (resolve, reject) {
            if (!connection) {
                reject('Please initialize mysql first.');
                return false;
            }
            connection.query(sqlstring, function (error, results, fields) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(results);
                }
                if (!ispool && !type)
                    connection.end();
            });
        });
    });
}
exports.exec = exec;
/**
 * 事务
 *
 * @export
 * @param {string[]} [sqlstringArr=[]]
 * @returns
 */
function transaction(sqlstringArr = []) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(function (resolve, reject) {
            return __awaiter(this, void 0, void 0, function* () {
                if (!connection) {
                    reject('Please initialize mysql first.');
                    return false;
                }
                if (!sqlstringArr || !sqlstringArr.length) {
                    reject('The parameter is empty.');
                    return false;
                }
                yield exec('start transaction;', true);
                let resuarr = [];
                for (let i = 0, len = sqlstringArr.length; i < len; i++) {
                    try {
                        let result = yield exec(sqlstringArr[i], true);
                        resuarr.push(result);
                    }
                    catch (err) {
                        yield exec('rollback;', true);
                        if (!ispool)
                            connection.end();
                        reject(err);
                        return;
                    }
                }
                if (resuarr.length == sqlstringArr.length) {
                    yield exec('commit;', true);
                    if (!ispool)
                        connection.end();
                    resolve(resuarr);
                }
                else {
                    yield exec('rollback;', true);
                    if (!ispool)
                        connection.end();
                    reject(resuarr);
                }
            });
        });
    });
}
exports.transaction = transaction;
exports.sql = new mysql();
