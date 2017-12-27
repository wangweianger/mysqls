子查询：
因为此库的调用方式为链式调用，返回的数据为sql语句就注定了它能做到很多的子查询形式：


例如：
一：先定义一个sql语句得到结果
```
let sqlstring = sql.field('id,name').table('node_table').group('field')
```

二：把上一次生成的sql语句当做.table 方法的参数传入即可
```
sql.table(sqlstring).group('field').where('id=1').order('status').select()
```


最终得到的sql语句：
```
SELECT * FROM (SELECT id,name FROM node_table GROUP BY field ) WHERE id=1 GROUP BY field ORDER BY status
```


依据此能力你可以生成任何可以子查询的语句