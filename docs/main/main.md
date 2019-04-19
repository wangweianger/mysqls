###插件使用方式

```js
//import方式
import { execute,sql,transaction } from 'mysqls'

//require方式
let { execute,sql,transaction } = require('mysqls')
```


### 参数说明

**config配置**
```js
let config={
    host:'localhost',
    user:'root',
    password:'123456',
    database:'web-performance',
    port:'3306',
}
```


**sql**
> sql参数链式调用相关方法生成sql语句
参考：[sql链式语法](/docs/README.md)


**execute**
> 功能： 执行单个sql语句查询，并得到结果
> 参数： （config,sqlStr） config为数据库配置参数，sqlStr查询的sql语句
用法：
```js
let sqlStr = sql.table('table1').where({id:1}).select()

let result = await execute(config,sqlStr)

```


**transaction**
> 事务处理方法
> 参数 ：（config,arrStr） config为数据库配置参数，arrStr事务时执行的相关语句，必须为数组
> 所有的语句执行成功者事务执行成功，若有一句执行失败者关闭事务
用法：
```js
//需要执行事务的相关语句 table1表的number减少5，table2表的number增加5
let tranSqlArr = [
    sql.table('table1').data({number:number-5}).update(true,true),
    sql.table('table2').data({number:number+5}).update(true,true)
]
let result = await transaction(config,tranSqlArr)
console.log(result) 

``` 








