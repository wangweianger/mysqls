### [英文文档](/README.md) | [中文文档](/README-CN.md)

# mysqls
It is written in JavaScript,crud for mysql.You can also use transactions very easily.

mysqls 一款专为node.js生成sql语句的插件，链式调用，使用灵活。支持生成sql语法，也支持生成语法之后直接调用，支持事物等特性。
API参考很流行的ThinkPHP模型API。

* npm地址：https://www.npmjs.com/package/mysqls

## 安装： 
```js 
npm install mysqls --save-dev 
```

## mysqls参数说明
>  * init:          sql初始化API
>  * exec:          执行sql语句
>  * sql:           链式调用生成sql语句，支持生成后直接执行sql语句
>  * transaction:   执行事务API

## 项目使用：
```js 
//import方式
import { init, exec, sql, transaction } from 'mysqls'

//require方式
let { init, exec, sql, transaction } = require('mysqls')
```

## mysql配置初始化：
```js
// 可在项目的启动时初始化配置
init({
    host: 'localhost',
    user: 'root',
    password:'123456',
    database: 'test',
    port: 3306,
})
```

### init 参数说明
> * ispool:           是否以连接池的方式初始化 (default:true)
> * host:             host地址  (default:'127.0.0.1')
> * user:             用户名 (default:'root')
> * password:         数据库密码  (default:'root')
> * database:         使用的数据库  (default:'test')
> * port:             端口  (default:'3306')
> * waitConnection:   是否等待链接(连接池时使用)  (default:true)   
> * connectionLimit:  连接池大小   (default:10)   
> * queueLimit:       排队限制   (default:0)   

### 只生成sql语句案例
```js
sql
    .table('node_table')
    .field('id,name')
    .where({id:1})
    .select()

// result
SELECT id,name FROM node_table WHERE id=1
```

### 使用exec函数执行sql语句
```js
const sqlstr = sql
    .table('node_table')
    .field('id,name')
    .where({id:1})
    .select();

const result = await exec(sqlstr);
```

### 使用sql.prototype.exec链式调用
```js
const result = sql
    .table('node_table')
    .field('id,name')
    .where({id:1})
    .select(true)
    .exec();
```
* 链式调用执行sql时select方法需要传参数:true
* 同样适合update(true),insert(true),delet(true),query(true)方法

### 使用Promise方式
```js
//使用 exec 函数
exec(sql.table('web_pages').where({id:147}).select())
    .then(res=>{
        console.log(res)
    }).catch(err=>{
        console.log(err)
    })

// 使用 exec 方法
sql.table('web_pages').where({id:147}).select(true).exec()
    .then(res=>{
        console.log(res)
    }).catch(err=>{
        console.log(err)
    })
```

### 使用async/await
```js
//使用 exec 函数
const result = await exec(sql.table('web_pages').where({id:147}).select())

// 使用 exec 方法
const result = await sql.table('web_pages').where({id:147}).select(true).exec()
```

### 处理事务
```js
const tranSqlArr = [
    sql.table('table1').data({number:'number-5'}).update(true,true),
    sql.table('table2').data({number:'number+5'}).update(true,true)
]
const result = await transaction(tranSqlArr)
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

**批量插入**

```js
let data = [
    {name:'zane',email:'752636052@qq.com'},
    {name:'zane_1',email:'752636052_1@qq.com'},
    {name:'zane_2',email:'752636052_2@qq.com'},
]
sql
    .table('node_table')
    .data(data)
    .insert()

INSERT INTO node_table (name,email) VALUES ('zane','752636052@qq.com'),('zane_1','752636052_1@qq.com'),('zane_2','752636052_2@qq.com')
```

**更新**

```js
sql
    .table('node_table')
    .data({name:'zane',email:'752636052@qq.com'})
    .where({id:1})
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




