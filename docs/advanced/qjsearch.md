支持多个字段的区间查询

例如：

```js
id:{gt:1,lt:10}
```
得到的查询条件是： ( id > 1) AND ( id < 10)


```js
id:{neq:6,gt:3}
```
得到的查询条件是： ( id != 6) AND ( id > 3)


默认使用AND链接，传入参数 `_type='or'` 可更改为OR条件


```js
id:{neq:6,gt:3,_type:'or'}
```
得到的查询条件是： ( id != 6) OR ( id > 3)


支持所有的表达式查询，更多请查看表达式查询
 * [**4.2.表达式查询**](/docs/advanced/bdssearch.md)