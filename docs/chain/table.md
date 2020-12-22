table链式调用中主要用于指定操作的数据表。

例如：
```js 
sql.table('node_table').where('id=1').select()
```

设置别名:
```js 
sql.table('node_table a').where('id=1').select()
```

得到：
```
SELECT  * FROM node_table a WHERE id=1

```

多表同时查询:
```js
sql.table({'node_table1': 'a', 'node_table2': 'b'}).where('id=1').select()
```
得到:
```
SELECT * FROM node_table1 AS a, node_table2 AS b WHERE id=1
```


join方法还需要补充...