delete方法用来删除数据库中数据，使用简单，语法简单

在链式调用的最后调用 .delete() 方法


### 案例

```js 
sql
    .table('node_table')
    .where({name:'zane'})
    .delet();

```

最终得到
```js
DELETE FROM node_table WHERE name=`zane`
```








