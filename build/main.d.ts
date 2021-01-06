import { Config } from './types';
import CURD from './curd';
declare class mysql extends CURD {
    istransaction: boolean;
    exec: (sqlstring: string, type?: boolean) => Promise<unknown>;
    [propsname: string]: any;
    constructor();
}
/**
 * 初始化
 *
 * @export
 * @param {Config} config
 */
export declare function init(config: Config): void;
/**
 * 运行sql
 *
 * @export
 * @param {string} sqlstring
 * @param {boolean} [type=false]
 * @returns
 */
export declare function exec(sqlstring: string, type?: boolean): Promise<{}>;
/**
 * 事务
 *
 * @export
 * @param {string[]} [sqlstringArr=[]]
 * @returns
 */
export declare function transaction(sqlstringArr?: string[]): Promise<{}>;
export declare const sql: mysql;
export {};
