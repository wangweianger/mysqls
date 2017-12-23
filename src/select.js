
export function select(){
    let sql = `SELECT ${this.sqlstr.field||'*'} FROM ${this.sqlstr.table} where ${this.sqlstr.where}`
    return sql;
}

export function update(){

}

export function insert(){

}

export function delte(){

}