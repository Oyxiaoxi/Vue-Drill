import Vue from 'vue'
import validator from './validator'
import dropdown from './dropdown'

const directives = {
    validator,
    dropdown
}

// Object.entries 返回给定对象的键值对数组
for (const [key, value] of Object.entries(directives)) {
    Vue.directive(key, value)
}
