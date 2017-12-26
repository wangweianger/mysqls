page方法属于链式调用方法之一，是完全为分页查询而诞生的一个人性化操作方法。


### 例如

```js 
sql.table('node_table').page(1,10).select()  //查询第一页数据
sql.table('node_table').page(2,10).select()  //查询第二页数据
```


也可以用字符串的方式传参

```js 
sql.table('node_table').page('1,10').select()  //查询第一页数据
sql.table('node_table').page('2,10').select()  //查询第二页数据
```


最终得到
```js
SELECT * FROM node_table LIMIT 0,9
SELECT  * FROM node_table LIMIT 10,19
```


> **备注：page 方法比 limit方法更适合分页，不用自己算，内部已经处理好**
> **如果同时使用page方法会覆盖掉limit方法**



