

mysqls是在node.js场景中使用mysql，根据传入的参数生成相应的sql语句。
插件本身只负责生成sql语句，不执行任何的增删改查,增删改查交给mysql。

API参考很流行的ThinkPHP模型API，因为它已经做够流行和好用了。非常感谢ThinkPHP文档，很多案例参考其文档

* gitbooks文档地址:https://wangweianger.gitbooks.io/mysqls/content/
* npm地址：https://www.npmjs.com/package/mysqls
* 使用插件项目，完整的前端性能监控系统：https://github.com/wangweianger/web-performance-monitoring-system


### 安装：

```js
npm install mysqls --save-dev
```

### 项目使用：
```js 
//import方式
import { execute,sql,transaction } from 'mysqls'

//require方式
let { execute,sql,transaction } = require('mysqls')
```

### 参数说明
```js
execute     ：执行单挑sql语句       参数：（config,sqlStr）
sql         ：链式调用生成sql语句    链式调用语法，参考后文
transaction ：执行事务相关任务时使用  参数：（config,sqlArr）
```


### 定义一个公共的config配置
```js
let config={
    host:'localhost',
    user:'root',
    password:'123456',
    database:'web-performance',
    port:'3306',
}

```

### 使用Promise方式
```js
//使用
let sqlstr = sql.table('web_pages').where({id:147}).select()

execute(config,sqlstr).then(res=>{
      console.log(res)
}).catch(err=>{
    console.log(err)
})

```

### 使用async/await
```js
let sqlstr = sql.table('web_pages').where({id:147}).select()

let result = await execute(config,sqlstr)
console.log(result)

```


### 处理事务
```js
let tranSqlArr = [
    sql.table('table1').data({number:number-5}).update(),
    sql.table('table2').data({number:number+5}).update()
]
let result = await transaction(config,tranSqlArr)
console.log(result) 

```

### 生成sql语句简单用法
* 备注：sql调用方法的顺序内部已经做了排序，因此可以不按严格的sql语句顺序来写
**查询**

```js
sql
    .table('node_table')
    .field('id,name')
    .where({id:1})
    .select()

SELECT id,name FROM node_table WHERE id=1
```

**插入**

```js
sql
    .table('node_table')
    .data({name:'zane',email:'752636052@qq.com'})
    .insert()

INSERT INTO node_table (name,email) VALUES (`zane`,`752636052@qq.com`)
```

**更新**

```js
sql
    .table('node_table')
    .data({name:'zane',email:'752636052@qq.com'})
    .update()

UPDATE node_table SET name=`zane`,email=`752636052@qq.com`
```

**删除**

```js
sql .table('node_table')
    .where({name:'zane'})
    .delet();

DELETE FROM node_table WHERE name=`zane`
```

### 生成sql语句高级用法

```js
//参数json多字段
sql
    .table('node_table')
    .where({id:1,name:'zane'})
    .select()

SELECT  * FROM node_table WHERE id=1 AND name=`zane`

//参数数组
let data=[
    {id:1,name:'zhangsan',_type:'or'},
    {sex:1,number:3}
]
sql.table('node_table').where(data).select()

SELECT * FROM node_table WHERE (id=1 OR name=`zhangsan` ) AND (sex=1 AND number=3 )

//多字段连接方式
let data=[
    {id:1,name:'zhangsan',_type:'or',_nexttype:'or'},
    {sex:1,number:3,_type:'and'}
]
sql.table('node_table').where(data).select()

SELECT * FROM node_table WHERE (id=1 OR name=`zhangsan`) OR (sex=1 AND number=3)

//表达式查询
let data={
    id:{eq:100,egt:10,_type:'or'},
    name:'zhangshan'
}
sql.table('node_table').where(data).select()

SELECT  * FROM node_table WHERE ((id=100) OR (id>=10)) AND name=`zhangshan`

//混合查询
let data=[{
    id:{eq:100,egt:10,_type:'or'},
    name:'zhangshan',
    _nexttype:'or'
},{
    status:1,
    name:{like:'%zane%'}
}]
sql.table('node_table').where(data).select()

SELECT * FROM node_table WHERE (((id=100) OR (id>=10)) AND name=`zhangshan`) OR (status=1 AND ((name LIKE `%zane%`))) 


//UNION ， UNION ALL 组合使用
sql
    .union('SELECT * FROM think_user_1',true)
    .union('SELECT * FROM think_user_2',true)
    .union(['SELECT * FROM think_user_3','SELECT name FROM think_user_4'])
    .union('SELECT * FROM think_user_5',true)
    .select()

得到
(SELECT * FROM think_user_1) UNION ALL  
(SELECT * FROM think_user_2) UNION ALL 
(SELECT * FROM think_user_3) UNION 
(SELECT name FROM think_user_4)  UNION  
(SELECT * FROM think_user_5)
```


更多用法请查看详细文档

## 文档目录

* [**1.简介**](/README.md)
  * [**1.1.参数说明与事务**](/docs/main/main.md)
* [**2.链式操作**](/docs/chain/README.md)
  * [**2.1.WHERE**](/docs/chain/where.md)
  * [**2.2.TABLE**](/docs/chain/table.md)
  * [**2.3.ALIAS**](/docs/chain/alias.md)
  * [**2.4.DATA**](/docs/chain/data.md)
  * [**2.5.FIELD**](/docs/chain/field.md)
  * [**2.6.ORDER**](/docs/chain/order.md)
  * [**2.7.LIMIT**](/docs/chain/limit.md)
  * [**2.8.PAGE**](/docs/chain/page.md)
  * [**2.9.GROUP**](/docs/chain/group.md)
  * [**2.10.HAVING**](/docs/chain/having.md)
  * [**2.11.UNION**](/docs/chain/union.md)
  * [**2.12.DISTINCT**](/docs/chain/distinct.md)
  * [**2.13.COMMENT**](/docs/chain/comment.md)
* [**3.CURD调用**](/docs/curd/README.md)
  * [**3.1.SELECT**](/docs/curd/select.md)
  * [**3.2.UPDATE**](/docs/curd/update.md)
  * [**3.3.INSERT**](/docs/curd/insert.md)
  * [**3.4.DELETE**](/docs/curd/delete.md)
* [**4.查询方式**](/docs/advanced/README.md)
  * [**4.1.基本查询**](/docs/advanced/basesearch.md)
  * [**4.2.表达式查询**](/docs/advanced/bdssearch.md)
  * [**4.3.区间查询**](/docs/advanced/qjsearch.md)
  * [**4.4.组合查询**](/docs/advanced/zhsearch.md)
  * [**4.5.统计查询**](/docs/advanced/tjsearch.md)
  * [**4.6.SQL查询**](/docs/advanced/sqlsearch.md)
  * [**4.7.子查询**](/docs/advanced/childsearch.md)

### 项目运行

```js
git clone https://github.com/wangweianger/mysqls.git
npm install

//dve
npm run dve

//product
npm run build
```



