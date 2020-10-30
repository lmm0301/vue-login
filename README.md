# vue-demo-first

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).



<!-- 移动端开发的适配方案 -->
<!-- 1. 安装 flexible和 postcss-pxtorem -->
### npm install lib-flexible --save   npm install postcss-pxtorem --save

<!-- 2.在项目入口文件main.js 中引入lib-flexible -->
### import 'lib-flexible'
### 由于flexible会动态给页面header中添加<meta name='viewport' >标签，所以务必请把目录 public/index.html 中的这个标签删除

<!-- 3. 配置postcss-pxtorem -->
### 修改vue.config.js（vue-cli3 构建的项目比以前的精简许多，如果没有请在根目录新建vue.config.js文件）
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');

module.exports = {
    css: {
        sourceMap: false,
        loaderOptions: {
            postcss: {
                plugins: [
                    autoprefixer({
                        overrideBrowserslist: ['Android >= 4.0', 'iOS >= 7']
                    }),
                    pxtorem({
                        rootValue: 37.5,
                        propList: ['*', '!font*'], // !不匹配属性（这里是字体相关属性不转换）
                        unitPrecision: 3, // 最小精度，小数点位数
                        minPixelValue: 2 // 替换的最小像素值
                    })
                ]
            }
        }
<!-- vue.js 使用 fastclick解决移动端click事件300毫秒延迟方法 -->
### 1. npm install fastclick -S
### 2. 在main.js中引入 import FastClick from 'fastclick'
### FastClick的ios点击穿透解决方案
FastClick.prototype.focus = function(targetElement) {
    let length;
    if (targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
        length = targetElement.value.length;
        targetElement.focus();
        targetElement.setSelectionRange(length, length);
    } else {
        targetElement.focus();
    }
};