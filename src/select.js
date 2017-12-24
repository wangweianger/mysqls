
export function select(){
    console.log(this)
    // let sql = `SELECT ${this.sqlObj.field||'*'} FROM ${this.sqlObj.table} WHERE ${this.sqlObj.where}`

    return this.sqlObj;
}

export function update(){

}

export function insert(){

}

export function delte(){

}