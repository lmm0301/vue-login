import axios from 'axios'
import router from '@/router'
import QS from 'qs';
//调用app方法的功能和注册供app调用的方法
import Bridge from '@/plugins/bridge.js'
import { Dialog } from 'vant';


// axios 基础配置
// 环境的切换
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV == 'development') {
    axios.defaults.baseURL = 'http://localhost:3000';
    // axios.defaults.baseURL = 'http://pretransfer.51-dg.com/';
} else if (process.env.NODE_ENV == 'debug') {
    axios.defaults.baseURL = 'http://localhost:3000';
} else if (process.env.NODE_ENV == 'production') {
    axios.defaults.baseURL = 'http://localhost:3000';

}
// 请求超时时间
axios.defaults.timeout = 10000;
// post请求头
 axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
 // axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
// 请求拦截器
axios.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.error(error);
    })

// 响应拦截器
axios.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    // 服务器状态码不是200的情况
    error => {
        if (error.response.status) {
            Toast({
                message: '网络请求不存在,请重新登录',
                duration: 1000,
                forbidClick: true
            });
            return Promise.reject(error.response);
        }
    }
);
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
                params: params
            })
            .then(res => {
                // let code = res.data.code;
                // let msg = res.data.msg;
                // console.log(res)
                // if (code == 4032) {
                //     Dialog.alert({
                //         title: '提示',
                //         message: msg
                //     }).then(() => {
                //         // 清除缓存
                //         localStorage.clear();
                //         if (window) {
                //             router.push({ path: '/login' })
                //         } else {
                //             Bridge.callhandler('updateToken', msg, (response) => {
                //                 // 处理返回数据
                //                 console.log(msg)
                //                 console.log('JS Echo called with:' + response)
                //             })
                //         }
                //     });
                //     return
                // }
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
    let data = QS.stringify(params);
    return new Promise((resolve, reject) => {
        axios.post(url, data)
            .then(res => {
                //      console.log(res)
                // let code = res.data.code;
                // let msg = res.data.msg;
                // if (code == 4032) {
                //     Dialog.alert({
                //         title: '提示',
                //         message: msg
                //     }).then(() => {
                //         console.log(window)
                //             // 清除缓存
                //         localStorage.clear();
                //         if (window) {
                //             router.push({ path: '/login' })
                //         } else {
                //             Bridge.callhandler('updateToken', msg, (response) => {
                //                 // 处理返回数据
                //                 console.log(msg)
                //                 console.log('JS Echo called with:' + response)
                //             })
                //         }

                //     });
                //     return
                // }
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}
