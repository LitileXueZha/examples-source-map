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

## typescript

分为 2 步：**编译、压缩**。

1. 运行 `npm run exp03:ts:compile`，在 dist 目录生成未压缩过的文件和 source map。主要 ts 本身不提供代码压缩功能
2. 运行 `npm run exp03:ts:uglify`，同样在 dist 目录生成压缩文件和 source map。

只执行第 1 步，也可以在 Chrome DevTools 中看到 source map，只不过文件没被压缩，而线上代码一般都被压缩成了一行减小体积。

如果第 2 步不整合上一个 source map：

```bash
npx uglifyjs --compress --mangle --source-map "url=index.js.map" --output dist/index.js -- dist/index.js
```

就算更正了 `index.js.map` 中的 `sources` 源文件地址，也能看到 source map，但其位置信息将失真，无法正确定位到源码。因此它需要上一个 source map 的信息，即编译 ts 产生的 `.map`。

> 2 步可执行一个命令：`npm run exp03:ts`

## webpack

简单配置为线上模式打包，运行 `npm run exp04:webpack`，可以看到 dist 目录生成压缩文件和 source map 文件。

查看 Sources 面板，有些奇怪的协议：

```log
webpack-internal://
webpack://
```

和常见的 `file://` 文件协议、`http://` 网络协议不一样，它们不会发起请求，在 Network 面板看不到，只是个路径名，被 Chrome 解析成了这样而已。

修改 `output.devtoolModuleFilenameTemplate` 可以更改内置的 `webpack://` 协议，改成 `file://` 可以看到 source map 中 `sources` 路径也变了。
