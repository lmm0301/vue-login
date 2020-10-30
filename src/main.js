// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './request/axios.js'
// 引入Vant UI组件的样式
import 'vant/lib/index.css'
import '@/plugins/vant.js'
import '@/style/reset.less'
//引入移动端的适配
import 'lib-flexible/flexible'
//引入点击事件延迟300毫秒的解决方案
import FastClick from 'fastclick'


//FastClick的ios点击穿透解决方案
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
import Bridge from '@/plugins/bridge.js'
Vue.prototype.$bridge = Bridge
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
