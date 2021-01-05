import {
    sortSelectSql,
    checkOptType,
    handleInsertData,
} from './uitl'

export function select(type=false){
    let result = ''
    if(this.sqlObj.union){
        result = this.sqlObj.union
        if(result.substr(-10).indexOf('ALL')!=-1){
            result=result.replace(/\sUNION\sALL\s*$/,'')
        }else{
            result=result.replace(/\sUNION\s*$/,'')
        }
        this.sqlObj = {}
        return result
    }

    let newSqlObj = sortSelectSql(this.sqlObj)
    newSqlObj.sortkeys.forEach(item=>{
        if(newSqlObj.result[item]){
            result = `${result} ${newSqlObj.result[item]}`
        }
    })
    const sqlStr = `SELECT ${result.replace(/'/g, '\'').replace(/`/g, '\'')} `;
    if (type){
        this.sqlObj.sqlStr = sqlStr; return this;
    } else {
        this.sqlObj = {}; return sqlStr;
    }
}

export function update(type = false, bol = false){
    let result      = ''
    let datastr     = ''
    let newopt      = this.sqlObj.data

    let keys        = Object.keys(newopt)

    keys.forEach((item,index)=>{
        datastr =  index==keys.length-1?
                  `${datastr}${item}=${checkOptType(newopt[item], item, type, bol)}`:
                  `${datastr}${item}=${checkOptType(newopt[item], item, type, bol)},`
    })
    result  = this.sqlObj.where ? 
           `UPDATE ${this.sqlObj.table} SET ${datastr} WHERE ${this.sqlObj.where}` :
           `UPDATE ${this.sqlObj.table} SET ${datastr}`
    const sqlStr = result.replace(/'/g, '\'').replace(/`/g, '\'');
    if (type && !bol) {
        this.sqlObj.sqlStr = sqlStr; return this;
    } else {
        this.sqlObj = {}; return sqlStr;
    }
}   

export function insert(type = false){
    let newopt  = this.sqlObj.data
    const datastr = handleInsertData(newopt);
    let result = `INSERT INTO ${this.sqlObj.table} ${datastr}`
    const sqlStr = result.replace(/'/g, '\'').replace(/`/g, '\'')
    if (type) {
        this.sqlObj.sqlStr = sqlStr; return this;
    } else {
        this.sqlObj = {}; return sqlStr;
    }
}

export function delet(type = false){
    let result = this.sqlObj.where ?
           `DELETE FROM ${this.sqlObj.table} WHERE ${this.sqlObj.where}`:
           `DELETE FROM ${this.sqlObj.table}`
    const sqlStr = result.replace(/'/g, '\'').replace(/`/g, '\'')
    if (type) {
        this.sqlObj.sqlStr = sqlStr; return this;
    } else {
        this.sqlObj = {}; return sqlStr;
    }
}

/*query输入sql查询
  参数为 String
  案例： query('SELECT * FROM user_name')
*/
export function query(opt, type = false){
    opt = opt ? opt : '';
    if (type) {
        this.sqlObj.sqlStr = opt; return this;
    } else {
        return opt;
    }
}
 





