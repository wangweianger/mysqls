join方法属于链式调用方法之一, 主要用于联表查询


### 案例

join参数为Array<object> 或 object类型, 例如：


Array类型参数 
```js 
sql.table('node_table').join([{
  dir: 'left',
  table: ('left_table'),
  where: [{'node_talbe.id': ['join_table.id']}]
}, {
  dir: 'right',
  table: ('right_table'),
  where: [{'right_table.id': ['left_table.id']}]
}]).where('node_table.id=1').select()
```

最终得到
```js
SELECT  * FROM node_table  LEFT JOIN left_table ON  ((node_talbe.id=join_table.id) ) RIGHT JOIN right_table ON  ((right_table.id=left_table.id) ) WHERE node_table.id=1
```

object类型参数
```js 
sql.table('node_table').join({
  dir: 'left',
  table: ('left_table'),
  where: [{'node_talbe.id': ['join_table.id']}]
}).where('node_table.id=1').select()
```

最终得到
```js
SELECT  * FROM node_table  LEFT JOIN left_table ON  ((node_talbe.id=join_table.id) ) WHERE node_table.id=1
```

