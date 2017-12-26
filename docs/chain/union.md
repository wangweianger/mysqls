UNION操作用于合并两个或多个 SELECT 语句的结果集。

### 使用示例：

**UNION 字符串方式**
```js 
sql.union('SELECT name FROM think_user_1')
     .union('SELECT name FROM think_user_2')
     .select()
```


UNION 数组用法：
```js 
sql.union(['SELECT name FROM think_user_1','SELECT name FROM think_user_2']).select()
```


最终得到SQL
```js
(SELECT name FROM think_user_1) UNION (SELECT name FROM think_user_2)
```


**UNION ALL 字符串方式**
```js 
sql.union('SELECT name FROM think_user_1',true)
   .union('SELECT name FROM think_user_2',true)
   .select()
```

UNION ALL 数组用法
```js 
sql.union(['SELECT name FROM think_user_1','SELECT name FROM think_user_2'],true).select()
```


最终得到SQL
```js
(SELECT name FROM think_user_1) UNION ALL (SELECT name FROM think_user_2)
```


**UNION 于 UNION ALL 唯一的区别就是有第二个参数并且为 true 即可**


**UNION ， UNION ALL 组合使用**
```js 
sql
    .union('SELECT * FROM think_user_1',true)
    .union('SELECT * FROM think_user_2',true)
    .union(['SELECT * FROM think_user_3','SELECT name FROM think_user_4'])
    .union('SELECT * FROM think_user_5',true)
    .select()
```

最终得到SQL
```js
(SELECT * FROM think_user_1) UNION ALL  
(SELECT * FROM think_user_2) UNION ALL 
(SELECT * FROM think_user_3) UNION 
(SELECT name FROM think_user_4)  UNION  
(SELECT * FROM think_user_5)
```


**你甚至可以这样做**
```js 
sql
    .union(sql.table('think_user_1').select(),true)
    .union('SELECT * FROM think_user_5')
    .select()
```

最终得到SQL
```js
(SELECT  * FROM think_user_1 WHERE id=1 ) UNION ALL  (SELECT * FROM think_user_2)
```



注意：UNION 内部的 SELECT 语句必须拥有相同数量的列。列也必须拥有相似的数据类型。同时，每条 SELECT 语句中的列的顺序必须相同。


