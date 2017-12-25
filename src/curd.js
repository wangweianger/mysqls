import {
    checkField
} from './uitl'


export function select(){
    let result = ''
    // let newJsonObject = checkField(this.sqlObj)

    this.sqlObj = {}
    // console.log(newJsonObject)

    // for(let key in this.sqlObj){
    //     result = `${result} ${this.sqlObj[key]} `
    // }
    // return `SELECT ${result}`;
}

export function update(){
    let result = this.sqlObj.where ? 
           `UPDATE ${this.sqlObj.table} SET ${this.sqlObj.data} WHERE ${this.sqlObj.where}` :
           `UPDATE ${this.sqlObj.table} SET ${this.sqlObj.data}`
    this.sqlObj = {} 
    return result      
}   

export function insert(){
   let result = `INSERT INTO ${this.sqlObj.table} ${this.sqlObj.data}`
   this.sqlObj = {}
   return result
}

export function delet(){
    let result = this.sqlObj.where ?
           `DELETE FROM ${this.sqlObj.table} WHERE ${this.sqlObj.where}`:
           `DELETE FROM ${this.sqlObj.table}`
    this.sqlObj = {}
    return result        
}

/*query输入sql查询
  参数为 String
  案例： query('SELECT * FROM user_name')
*/
export function query(opt){
    return opt?opt:'';
}









