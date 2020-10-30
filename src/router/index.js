import Vue from 'vue'
import Router from 'vue-router'
import store from '../store';

// import HelloWorld from '@/components/HelloWorld'
// 测试
const HelloWorld = () =>
    import ('@/components/HelloWorld');
const Login = () =>
    import ('@/view/login/Login');

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
	{
	  path: '/HelloWorld',
	  name: 'HelloWorld',
	  component: HelloWorld
	}
]

const router = new Router({
        mode: 'hash',
        base: process.env.BASE_URL,
        routes,
        scrollBehavior(to, from, savedPosition) {
            if (savedPosition) {
                return savedPosition
            } else {
                if (from.meta.keepAlive) {
                    from.meta.savedPosition = document.body.scrollTop;
                }
                return { x: 0, y: to.meta.savedPosition || 0 }
            }
        }
    })
    // 判断是否需要登录权限 以及是否登录
router.beforeEach((to, from, next) => {
  console.log(to)
    if (to.name == "approveDetail") {
        to.meta.title = to.query.title;
    }
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    if (to.query.token) {
        store.commit('setToken', to.query.token);
        // store.commit('setToken', to.query.token);
        next()
    }
    if (to.matched.some((route) => route.meta.requireToken)) {
        if (store.state.token) {
            next()
        } else {
            console.log('哪有token');
        }
    } else {
        next()
    }
})

export default router
