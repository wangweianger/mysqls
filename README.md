# [node-transform-mysql文档](https://wangweianger.gitbooks.io/node-transform-mysql/content/)

node-transform-mysql是在node.js场景中使用mysql，根据传入的参数生成相应的sql语句。

它所做的事情很简单也很专一，只负责生成sql语句，不执行任何的增删改查。

API参考很流行的ThinkPHP模型API，因为它已经做够流行和好用了。

### API文档地址：[https://wangweianger.gitbooks.io/node-transform-mysql/content/](https://wangweianger.gitbooks.io/node-transform-mysql/content/)

### 安装：

首先通过 [npm](https://www.npmjs.com/) 安装：

```js
    npm install node-transform-mysql
```

然后使用一个支持 CommonJS 或 ES2015 的模块管理器，例如 webpack：

```js
    // 使用 ES6 的转译器，如 babel
    import sql from node-transform-mysql

    // 不使用 ES6 的转译器
    var sql = require('node-transform-mysql')
```

### sql调用方法的顺序内部已经做了排序，因此可以不按严格的sql语句顺序来写

### 简单用法

**查询**
```js
sql
    .table('node_table')
    .where('id=1')
    .select()

SELECT * FROM node_table WHERE id=1


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
    .data('name=zane&email=752636052@qq.com')
    .insert()

INSERT INTO node_table (name,email) VALUES (`zane`,`752636052@qq.com`)

```

**更新**
```js
sql
    .table('node_table')
    .data({name:'zane',email:'752636052@qq.com'},true)
    .update()

UPDATE node_table SET name=`zane`,email=`752636052@qq.com`

```

**删除**
```js
let data=[{
        id:1,
        name:'zane'
    },{
        sex:1,
        address:'shenzheng'
    }]

DELETE FROM node_table WHERE name=`zane`
    
```


### 高级用法
**数据库的查询是最复杂的，因此高级用法主要针对于查询**
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








