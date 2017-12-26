COMMENT方法 用于在生成的SQL语句中添加注释内容，例如：


### 案例

单个字段的排序
```js 
sql
    .comment('查询node_table表的所有数据')
    .table('node_table')
    .order('id desc')
    .where('id=1')
    .select()
```

最终得到
```js
SELECT  * FROM node_table WHERE id=1 ORDER BY id desc /* 查询node_table表的所有数据 */
```








