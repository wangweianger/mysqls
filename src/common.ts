import { AnyOpt } from './types';
import { getOptToString, sortSelectSql } from './uitl'


export default class Common {
    sqlObj: AnyOpt;

    //需要查询的table表  参数：String  案例：table('user')
    table(opt: string) {
        if (opt && opt.indexOf('SELECT') != -1) {
            opt = `(${opt})`
        }
        if (opt) this.sqlObj.table = opt
        return this;
    } 


    /*where条件
    参数为 String | Object | Array
    案例： 
    */
    where(opt: string | AnyOpt | AnyOpt[]) {
        let result = ''
        if (typeof (opt) === 'string') {
            result = opt
        } else {
            result = getOptToString(opt)
        }
        if (result) this.sqlObj.where = result
        return this;
    }


    /*查询字段
    参数为 String | Array
    案例： field('id,name,age,sex')  | field(['id','name','age','sex'])
    */
    field(opt: string | string[]){
        if(typeof(opt)==='object'){
            opt = opt.join(',')
        }
        this.sqlObj.field = opt
        return this;
    }

    /*设置别名
    参数为 String
    案例： alias('a')
    */
    alias(opt: string){
        this.sqlObj.alias=opt
        return this;
    }

    /*设置data数据
    参数为 json | string
    案例： {name:'zane',email:'752636052@qq.com'}  |  'name=zane&email=752636052@qq.com'
    */
    data(opt: AnyOpt | string){
        let newopt: AnyOpt  = {}
        if(typeof(opt)==='string'){
            let arr = opt.split('&')
            arr.forEach(item=>{
                let itemarr = item.split('=')
                newopt[itemarr[0]]=itemarr[1]
            })
        }else{
            newopt=opt
        }
        this.sqlObj.data = newopt
        return this
    }

    /*order排序
    参数为 Array | string
    案例： order(['id','number asc'])  | order('id desc')
    */
    order(opt: string[] | string){
        let orderby = 'ORDER BY'

        if(typeof(opt) === 'object'){
            opt = opt.join(',')
        }

        this.sqlObj.order = `${orderby} ${opt}`
        return this
    }

    /*limit 语句
    参数类型 ： Number
    案例 limit(10)  | limit(10,20)
    */
    limit(){ 
        this.sqlObj.limit = `LIMIT ${Array.prototype.slice.apply(arguments)}` 
        return this
    }

    /*page 语句
    参数类型 ： Number | String
    案例 page(1,10)  | page(2,10) | page('3,10')
    */
    page(option: number | string){
        let opt     = []
        if(arguments.length === 1){
            opt     = (option as string).split(',');
        }else{
            opt     = Array.prototype.slice.apply(arguments)
        }
        if(opt.length==2){
            let begin   = parseInt((opt[0]-1) as any) * parseInt(opt[1]);
            let end     = parseInt(opt[1])
            this.sqlObj.limit = `LIMIT ${begin},${end}` 
        }
        return this
    }

    /*group 语句
    参数类型 ： String
    案例        group('id,name')
    */
    group(opt: string){
        this.sqlObj.group = `GROUP BY ${opt}`
        return this
    }

    /*having 语句
        参数类型： String
        案例：    having('count(number)>3')
    */
    having(opt: string){
        this.sqlObj.having = `HAVING ${opt}`
        return this
    }

    /*union 语句
        参数类型： String | Array
        案例： union('SELECT name FROM node_user_1') | union(['SELECT name FROM node_user_1','SELECT name FROM node_user_2'])
    */
    union(opt: string | string[] ,type=false){
        if(typeof(opt) === 'string'){
            if(this.sqlObj.union){
                this.sqlObj.union =`${this.sqlObj.union} (${opt}) ${type?'UNION ALL':'UNION'}`
            }else{
                this.sqlObj.union =`(${opt}) ${type?'UNION ALL':'UNION'} `
            }
        }else if(typeof(opt)==='object'){
            if(this.sqlObj.union){
                this.sqlObj.union =`${this.sqlObj.union} (${opt.join( type?') UNION ALL (':') UNION (' )})  ${type?'UNION ALL':'UNION'} `
            }else{
                this.sqlObj.union =`(${opt.join( type?') UNION ALL (':') UNION (' )}) ${type?'UNION ALL':'UNION'} `
            }
        }
        return this
    }

    /*distinct 语句
        参数类型： Boolean
        案例： distinct(true)
    */
    distinct(opt: boolean){
        if(opt){
            this.sqlObj.distinct = 'DISTINCT'
        }
        return this
    }

    /* lock 锁语法
        参数类型： Boolean
        案例：  lock(true)
    */
    lock(opt: boolean){
        if(opt){
            this.sqlObj.lock = 'FOR UPDATE'
        }
        return this
    }

    /* comment 为sql语句添加注释
        参数类型： String
        案例：  comment('查询用户的姓名')
    */
    comment(opt: string){
        if(opt){
            this.sqlObj.comment = `/* ${opt} */`
        }
        return this
    }

    count(opt: string, alias: string){
        let optvalue = opt || 1
        this.sqlObj.count = `COUNT(${optvalue})` + (alias ? ` AS ${alias}` : '')
        return this
    }

    max(opt: string, alias: string){
        if(opt) {
            this.sqlObj.max = `MAX(${opt})` + (alias ? ` AS ${alias}` : '')
        }
        return this
    }

    min(opt: string, alias: string){
        if(opt) {
            this.sqlObj.min = `MIN(${opt})` + (alias ? ` AS ${alias}` : '')
        }
        return this
    }

    avg(opt: string, alias: string){
        if(opt) {
            this.sqlObj.avg = `AVG(${opt})` + (alias ? ` AS ${alias}` : '')
        }
        return this
    }

    sum(opt: string, alias: string){
        if(opt) {
            this.sqlObj.sum = `SUM(${opt})` + (alias ? ` AS ${alias}` : '')
        }
        return this
    }


    /**
     * @param {Array<object>|object} opt join参数
     * opt.dir 连接方向
     * opt.table 连接表名
     * opt.where 连接条件
     */
    join(opt: AnyOpt | AnyOpt[]) {
        let result = ''
        switch (Object.prototype.toString.call(opt)) {
            case '[object Array]':
                for (let i = 0, len = opt.length; i < len; i++) {
                    if (!(opt as AnyOpt[])[i].dir || !(opt as AnyOpt[])[i].table || !(opt as AnyOpt[])[i].where) continue
                    result += ` ${(opt as AnyOpt[])[i].dir.toUpperCase()} JOIN ${sortSelectSql((opt as AnyOpt[])[i].table, true).result} ON ${getOptToString((opt as AnyOpt[])[i].where)}`
                }
                break;
            case '[object Object]':
                if (!(opt as AnyOpt).dir || !(opt as AnyOpt).table || !(opt as AnyOpt).where) return
                result += ` ${(opt as AnyOpt).dir.toUpperCase()} JOIN ${sortSelectSql((opt as AnyOpt).table, true).result} ON ${getOptToString((opt as AnyOpt).where)}`
                break
            default:
                break;
        }
        if (result) this.sqlObj.join = result
        return this
    }

}





