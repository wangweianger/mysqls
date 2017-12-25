# [node-transform-mysql文档](https://wangweianger.gitbooks.io/node-transform-mysql/content/)

node-transform-mysql是在node.js场景中使用mysql，根据传入的参数生成相应的sql数据。

它所做的事情很简单也很专一，只负责生成sql语句，不执行任何的增删改查。

API参考很流行的ThinkPHP模型API，因为它已经做够流行和好用了。


### API文档地址：https://wangweianger.gitbooks.io/node-transform-mysql/content/

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


### 看起来如何工作
```js
    调用：sql.table('user_table').where({id:1,name:'zane'}).select()
    结果：SELECT  * FROM user_table WHERE id=1 AND name=`zane`
    
    调用：sql.table('user_table').where({id:1,name:'zane',_type:'or'}).select()
    结果：SELECT  * FROM user_table WHERE id=1 OR name=`zane`

    调用：sql.table('user_table').where({id:{eq:100,egt:10}}).select()
    结果：SELECT  * FROM user_table WHERE ((id=100) AND (id>=10))

    调用：sql.table('user_table').field('id,name').where({id:{eq:100,egt:10}}).select()
    结果：SELECT id,name FROM user_table WHERE ((id=100) AND (id>=10))

    ......

```


## 文档目录

* [简介](/docs/Introduction.md)
* [链式操作](/docs/guides/chain/README.md)
 * [WHERE](/docs/guides/chain/where.md)
 * [TABLE](/docs/guides/chain/table.md)
 * [ALIAS](/docs/guides/chain/alias.md)
 * [DATA](/docs/guides/chain/data.md)
 * [FIELD](/docs/guides/chain/field.md)
 * [ORDER](/docs/guides/chain/order.md)
 * [LIMIT](/docs/guides/chain/limit.md)
 * [PAGE](/docs/guides/chain/page.md)
 * [GROUP](/docs/guides/chain/group.md)
 * [HAVING](/docs/guides/chain/having.md)
 * [UNION](/docs/guides/chain/union.md)
 * [DISTINCT](/docs/guides/chain/distinct.md)
 * [LOCK](/docs/guides/chain/lock.md)
 * [COMMENT](/docs/guides/chain/comment.md)
* [CURD调用](/docs/guides/curd/README.md)
 * [SELECT](/docs/guides/curd/select.md)
 * [UPDATE](/docs/guides/curd/update.md)
 * [INSERT](/docs/guides/curd/insert.md)
 * [DELETE](/docs/guides/curd/delete.md)
* [查询方式](/docs/guides/advanced/README.md)
 * [基本查询](/docs/guides/advanced/basesearch.md)
 * [表达式查询](/docs/guides/advanced/bdssearch.md)
 * [区间查询](/docs/guides/advanced/qjsearch.md)
 * [组合查询](/docs/guides/advanced/zhsearch.md)
 * [统计查询](/docs/guides/advanced/tjsearch.md)
 * [SQL查询](/docs/guides/advanced/sqlsearch.md)




