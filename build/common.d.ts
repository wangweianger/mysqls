import { AnyOpt } from './types';
export declare function table(opt: string): any;
export declare function where(opt: string | AnyOpt | AnyOpt[]): any;
export declare function field(opt: string | string[]): any;
export declare function alias(opt: string): any;
export declare function data(opt: AnyOpt | string): any;
export declare function order(opt: string[] | string): any;
export declare function limit(): any;
export declare function page(option: number | string): any;
export declare function group(opt: string): any;
export declare function having(opt: string): any;
export declare function union(opt: string | string[], type?: boolean): any;
export declare function distinct(opt: boolean): any;
export declare function lock(opt: boolean): any;
export declare function comment(opt: string): any;
export declare function count(opt: string, alias: string): any;
export declare function max(opt: string, alias: string): any;
export declare function min(opt: string, alias: string): any;
export declare function avg(opt: string, alias: string): any;
export declare function sum(opt: string, alias: string): any;
/**
 * @param {Array<object>|object} opt join参数
 * opt.dir 连接方向
 * opt.table 连接表名
 * opt.where 连接条件
 */
export declare function join(opt: AnyOpt | AnyOpt[]): any;
