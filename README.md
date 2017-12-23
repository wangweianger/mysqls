# node-transform-mysql

### 功能开发中...

>  * parcel 搭建服务器
>  * babel  编译

### 运行
```
git clone https://github.com/wangweianger/redux-source-code-learning

yarn install || npm install

npm run dev

``` 

### 运行案例

```
 import sql from 'node-transform-mysql'


 sql.table('user').field('id,name,class').where('type=1 AND status=1').select();

 得到sql语句：
 SELECT id,name,class FROM user where type=1 AND status=1

```
