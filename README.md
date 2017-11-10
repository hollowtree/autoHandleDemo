# autoHandleDemo

接收上传的 .zip 文件，将其存储在 storage 目录下，并将其解压到 public 目录下，如果解压生成的目录的子文件中有 index.html 文件，则将此目录添加到 demoList 列表中。

### 安装
```
npm i
node app.js
```

open [http://localhost:3000/](http://localhost:3000/)

### 目录结构
```js
    ├ node_modules/
    │    ├ ...
    │    └ ...
    ├ public/
    │    ├ 404.html       // 404页面
    │    ├ demoList.html  // demo list 列表
    │    └ index.html     // 主页面
    ├ storage/            // 文件存储目录
    │    ├ ...
    │    └ ...
    ├ app.js              // 程序入口
    ├ README.md           // 说明文件
    ├ ...
    └ ...
```

### 使用
上传文件名：xxx.zip
zip文件结构：

```
    xxx.zip
        ├ index.html
        ├ css/
        │    ├ ...
        │    └ ...
        ├ img/
        │    ├ ...
        │    └ ...
        ├ js/
             ├ ...
             └ ...
```

对应的html地址： http://[domain][:port]/xxx/index.html

注意：请确证 index.html 为 xxx.zip 的子文件，而不是中间还隔了一或多层目录。

 <a href="./demoList.html">Demo List</a>