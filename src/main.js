import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 导入全局指令
import './directives'
import './components'
import store from './store'

// 引入由组件拓展插件
import Message from './plugins/message'

// 引入外部库拓展插件
import VueSweetalert2 from './plugins/vue-sweetalert2'

// 全局过滤器
import './filters'

Vue.use(VueSweetalert2)
Vue.use(Message)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
