/*
    auther : zane
    version: 1.0.0
    blog:http://blog.seosiwei.com
    github: https://github.com/wangweianger/mysqls
    npm: https://www.npmjs.com/package/mysqls
*/
import { Config } from './types'
import CURD from './curd'
import * as mysql2 from 'mysql2'


let connection: any = null;
let ispool = true;


//建立sql对象
class mysql extends CURD {
    istransaction: boolean;
    exec: (sqlstring: string, type?: boolean) => Promise<unknown>;
    [propsname:string]: any;

    constructor() {
        super();
        this.sqlObj = {}
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
export function init(config: Config) {
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
        connection = (mysql as any).createConnection({
            host: config.host || '127.0.0.1',
            user: config.user || 'root',
            password: config.password || 'root',
            database: config.database || 'test',
            port: config.port || 3306,
        });
    }
}


/**
 * 运行sql
 *
 * @export
 * @param {string} sqlstring
 * @param {boolean} [type=false]
 * @returns
 */
export async function exec(sqlstring: string, type = false) {
    // @ts-ignore
    if (this instanceof mysql){
        // @ts-ignore
        sqlstring = this.sqlObj.sqlStr;
        // @ts-ignore
        this.sqlObj = {};
    }
    return new Promise(function(resolve, reject): any|void {
        if (!connection){
            reject('Please initialize mysql first.');
            return false;
        }
        connection.query(sqlstring, function(error: any, results: any, fields: any) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
            if (!ispool && !type) connection.end();
        });
    })
}


/**
 * 事务
 *
 * @export
 * @param {string[]} [sqlstringArr=[]]
 * @returns
 */
export async function transaction(sqlstringArr: string[] = []) {
    return new Promise(async function (resolve, reject): Promise<any> {
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


export const sql = new mysql()
