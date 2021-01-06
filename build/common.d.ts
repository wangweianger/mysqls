import { AnyOpt } from './types';
export default class Common {
    sqlObj: AnyOpt;
    table(opt: string): this;
    where(opt: string | AnyOpt | AnyOpt[]): this;
    field(opt: string | string[]): this;
    alias(opt: string): this;
    data(opt: AnyOpt | string): this;
    order(opt: string[] | string): this;
    limit(): this;
    page(option: number | string): this;
    group(opt: string): this;
    having(opt: string): this;
    union(opt: string | string[], type?: boolean): this;
    distinct(opt: boolean): this;
    lock(opt: boolean): this;
    comment(opt: string): this;
    count(opt: string, alias: string): this;
    max(opt: string, alias: string): this;
    min(opt: string, alias: string): this;
    avg(opt: string, alias: string): this;
    sum(opt: string, alias: string): this;
    /**
     * @param {Array<object>|object} opt join参数
     * opt.dir 连接方向
     * opt.table 连接表名
     * opt.where 连接条件
     */
    join(opt: AnyOpt | AnyOpt[]): this | undefined;
}
