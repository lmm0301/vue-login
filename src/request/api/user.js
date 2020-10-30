/**
 * api接口统一管理
 */
import {get, post } from "../axios.js"
//例如一个post请求
export const login = p => post('/usertable/login', p);
//例如一个get请求
export const desktopList = p => get('/api/m/menu/index', p);