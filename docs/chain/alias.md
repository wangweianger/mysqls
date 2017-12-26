alias用于设置当前数据表的别名，便于使用其他的连贯操作例如join方法等。

示例：
设置别名:
```js 
sql.table('node_table').alias(a).where('id=1').select()
```
