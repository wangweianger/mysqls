import Common from './common';
export default class CURD extends Common {
    constructor();
    /**
     * 选择
     *
     * @param {boolean} [type=false]
     * @returns
     * @memberof Curd
     */
    select(type?: boolean): string | this;
    /**
     * 更新
     *
     * @param {boolean} [type=false]
     * @param {boolean} [bol=false]
     * @returns
     * @memberof Curd
     */
    update(type?: boolean, bol?: boolean): string | this;
    /**
     * 插入
     *
     * @param {boolean} [type=false]
     * @returns
     * @memberof Curd
     */
    insert(type?: boolean): string | this;
    /**
     * 删除
     *
     * @param {boolean} [type=false]
     * @returns
     * @memberof Curd
     */
    delet(type?: boolean): string | this;
    /**
     * query输入sql查询
     * 参数为 String
     * 案例： query('SELECT * FROM user_name')
     *
     * @param {string} opt
     * @param {boolean} [type=false]
     * @returns
     * @memberof Curd
     */
    query(opt: string, type?: boolean): string | this;
}
