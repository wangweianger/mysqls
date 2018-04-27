import {
    sortSelectSql,
    checkOptType
} from './uitl'

export function select(){
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
    this.sqlObj = {}
    return `SELECT ${result.replace(/'/g,'\'').replace(/`/g,'\'')} `;
}

export function update(){
    let result      = ''
    let datastr     = ''
    let newopt      = this.sqlObj.data
    let keys        = Object.keys(newopt)
    keys.forEach((item,index)=>{
        datastr =  index==keys.length-1?
                  `${datastr}${item}=${checkOptType(newopt[item])}`:
                  `${datastr}${item}=${checkOptType(newopt[item])},`
    })
    result  = this.sqlObj.where ? 
           `UPDATE ${this.sqlObj.table} SET ${datastr} WHERE ${this.sqlObj.where}` :
           `UPDATE ${this.sqlObj.table} SET ${datastr}`
    this.sqlObj = {} 
    return result.replace(/'/g,'\'').replace(/`/g,'\'')
}   

export function insert(){
    let keys    =''
    let values  =''
    let newopt  = this.sqlObj.data
    let datastr = ''
    for(let key in newopt){
        keys    = keys ? `${keys},${key}` : key
        values  = values ? `${values},${checkOptType(newopt[key])}` : checkOptType(newopt[key])
    }
    datastr=`(${keys}) VALUES (${values})`
    let result = `INSERT INTO ${this.sqlObj.table} ${datastr}`
    this.sqlObj = {}
    return result.replace(/'/g,'\'').replace(/`/g,'\'')
}

export function delet(){
    let result = this.sqlObj.where ?
           `DELETE FROM ${this.sqlObj.table} WHERE ${this.sqlObj.where}`:
           `DELETE FROM ${this.sqlObj.table}`
    this.sqlObj = {}
    return result.replace(/'/g,'\'').replace(/`/g,'\'')
}

/*query输入sql查询
  参数为 String
  案例： query('SELECT * FROM user_name')
*/
export function query(opt){
    return opt?opt:'';
}
 





