# examples-source-map

一些关于 source map 的例子

## uglify-js

运行命令 `npm run exp01:uglify`，在 dist 目录生成压缩文件与 source map。

手动在压缩文件末行添加：

```js
//# soruceMappingURL=index.js.map
```

给 `index.js.map` 添加 `sourceRoot: '../'` 定位到正确的源文件地址。

## gulp

运行命令 `npm run exp02:gulp`，可以看到 dist 目录生成了编译过的 es5 压缩文件及 source map。

`gulp-sourcemaps` 工具会自动添加注释，也可以设置 `sourceRoot`。
