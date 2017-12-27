在应用中我们经常会用到一些统计数据，例如当前所有（或者满足某些条件）的用户数、所有用户的最大积分、用户的平均成绩等等，本库也内置了一些方法，包括：

|方法         | 说明            |
| ------------- |:-------------: |
| Count         | 统计数量，参数是要统计的字段名（可选）       |
| Max           | 获取最大值，参数是要统计的字段名（必须）     |
| Min           | 获取最小值，参数是要统计的字段名（必须）     |
| Avg           | 获取平均值，参数是要统计的字段名（必须）     |
| Sum           | 获取总分，参数是要统计的字段名（必须）       |


用法示例

获取用户数：
```
sql.count().table('node_table').select()

SELECT count(1) FROM node_table
```

或者根据字段统计：  
 ```
sql.count('id').table('node_table').select()

SELECT count(id) FROM node_table
```
 
获取用户的最大积分：
 ```
sql.max('score').table('node_table').select()

SELECT MAX(score) FROM node_table
```

获取用户的最小积分：
 ```
sql.min('score').table('node_table').select()

SELECT MIN(score) FROM node_table
```

获取用户的平均积分:
 ```
sql.avg('score').table('node_table').select()

SELECT AVG(score) FROM node_table
```

统计用户的总成绩：
  ```
sql.sum('score').table('node_table').select()

SELECT SUM(score) FROM node_table
```


**所有的统计查询均支持连贯操作的使用**

例如：
```
sql
    .count('id')
    .min('score')
    .max('score')
    .field('id,name,score')
    .table('node_table')
    .select()

SELECT id,name,score,COUNT(id),MAX(score),MIN(score) FROM node_table
```




