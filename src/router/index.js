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
    // 获取目标页面路由参数里的 articleId
    const articleId = to.params.articleId

    app.$message.hide()

    if (
        (auth && to.path.indexOf('/auth/') !== -1) ||
        (!auth && to.meta.auth) ||
        // 有 articleId 且不能找到与其对应的文章时，跳转到首页
        (articleId && !store.getters.getArticleById(articleId))
      ) {
        next('/')
    } else {
        next()
    }
})

// 注册全局后置钩子
router.afterEach((to, from) => {
    const app = router.app
    const store = app.$options.store
    // 获取目标页面路由参数里的 showMsg
    const showMsg = to.params.showMsg

    if (showMsg) {
        // showMsg 是一个字符时，使用它作为消息内容
        if (typeof showMsg === 'string') {
            // 显示消息提示
            app.$message.show(showMsg)
        } else {
            app.$message.show('操作成功')
        }
    }
})

export default router
