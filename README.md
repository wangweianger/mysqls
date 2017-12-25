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

* [**简介**](/README.md)
* [**链式操作**](/docs/chain/README.md)
 * [**WHERE**](/docs/chain/where.md)
 * [**TABLE**](/docs/chain/table.md)
 * [**ALIAS**](/docs/chain/alias.md)
 * [**DATA**](/docs/chain/data.md)
 * [**FIELD**](/docs/chain/field.md)
 * [**ORDER**](/docs/chain/order.md)
 * [**LIMIT**](/docs/chain/limit.md)
 * [**PAGE**](/docs/chain/page.md)
 * [**GROUP**](/docs/chain/group.md)
 * [**HAVING**](/docs/chain/having.md)
 * [**UNION**](/docs/chain/union.md)
 * [**DISTINCT**](/docs/chain/distinct.md)
 * [**LOCK**](/docs/chain/lock.md)
 * [**COMMENT**](/docs/chain/comment.md)
* [**CURD调用**](/docs/curd/README.md)
 * [**SELECT**](/docs/curd/select.md)
 * [**UPDATE**](/docs/curd/update.md)
 * [**INSERT**](/docs/curd/insert.md)
 * [**DELETE**](/docs/curd/delete.md)
* [**查询方式**](/docs/advanced/README.md)
 * [**基本查询**](/docs/advanced/basesearch.md)
 * [**表达式查询**](/docs/advanced/bdssearch.md)
 * [**区间查询**](/docs/advanced/qjsearch.md)
 * [**组合查询**](/docs/advanced/zhsearch.md)
 * [**统计查询**](/docs/advanced/tjsearch.md)
 * [**SQL查询**](/docs/advanced/sqlsearch.md)








