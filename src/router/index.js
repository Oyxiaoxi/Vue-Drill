import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    linkExactActiveClass: 'active',
    routes
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
    // 获取仓库里的登录信息
    const app = router.app
    const store = app.$options.store
    const auth = store.state.auth

    app.$message.hide()

    if ( (auth && to.path.indexOf('/auth/') !== -1) || (!auth && to.meta.auth) ) {
        // 如果当前用户已登录，且目标路由包含 /auth/ ，就跳转到首页
        next('/')
    } else {
        next()
    }
})

export default router
