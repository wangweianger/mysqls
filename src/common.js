

export function table(table){
    this.sqlstr.table = table
    return this;
} 

export function where(sql){
    this.sqlstr.where = sql
    return this;
}

export function field(field){
    this.sqlstr.field = field
    return this;
}




