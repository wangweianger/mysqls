import { Config } from './types';
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
export declare const sql: any;
