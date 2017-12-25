# [node-transform-mysql文档](https://wangweianger.gitbooks.io/node-transform-mysql/content/)

node-transform-mysql是在node.js场景中使用mysql，根据传入的参数生成相应的sql数据。

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
 * [**2.13.LOCK**](/docs/chain/lock.md)
 * [**2.14.COMMENT**](/docs/chain/comment.md)
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








