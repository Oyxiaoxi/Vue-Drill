import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 导入全局指令
import './directives'
import './components'
import store from './store'

// 引入外部库拓展插件
import VueSweetalert2 from './plugins/vue-sweetalert2'

Vue.use(VueSweetalert2)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
