// 验证规则层
function validate(el, modifiers, bindingValue) {
    bindingValue = bindingValue && typeof bindingValue === 'object' ? bindingValue : {}
    const value = typeof el.value === 'string' ? el.value.trim() : ''
    const {
        title = '该项', error
    } = bindingValue
    let defaultError = ''

    if (modifiers.required && value === '') {
        defaultError = `${title}不能为空`
    } else if (bindingValue.target) {
        const target = document.querySelector(bindingValue.target)
        const targetValue = target ? target.value : null

        if (targetValue !== value) {
            defaultError = `输入的${title}不匹配`
        }
    } else if (bindingValue.regex) {
        try {
            if (!bindingValue.regex.test(value)) {
                defaultError = `${title}格式不正确`
            }
        } catch (e) {}
    }

    if (defaultError) {
        if (error === undefined) {
            showError(el, defaultError)
        } else {
            showError(el, error)
        }
    } else {
        showError(el)
    }
}

// 视图展示层
function showError(el, error) {
    const parentElement = el.parentElement
    const errorElement = getErrorElement(el)

    if (error === undefined) {
        errorElement.style.display = 'none'
        parentElement.classList.remove('has-error')
    } else {
        errorElement.textContent = error
        errorElement.style.display = 'block'
        parentElement.classList.add('has-error')
    }
}

// 节点构建层
function getErrorElement(el) {
    const parentElement = el.parentElement
    let errorElement = parentElement.querySelector('.help-block')

    if (!errorElement) {
        const tpl = `<span class="help-block"></span>`
        const fragment = document.createRange().createContextualFragment(tpl)

        parentElement.appendChild(fragment)
        errorElement = parentElement.querySelector('.help-block')
    }

    return errorElement
}

// 指令定义层(简单对象)
export default {
    bind(el, binding, vnode) {
        // 指令值(指令右值），指令参数(指令左值:),指令修饰器（左值.隔）
        const {
            value,
            arg,
            modifiers
        } = binding
        // 过滤事件值，默认监听change
        const eventType = ['change', 'blur', 'input'].indexOf(arg) !== -1 ? arg : 'change'
        const defaultHandler = () => {
            showError(el)
        }
        const handler = () => {
            validate(el, modifiers, value)
        }

        el.addEventListener('input', defaultHandler, false)
        el.addEventListener(eventType, handler, false)

        el.destroy = () => {
            el.removeEventListener('input', defaultHandler, false)
            el.removeEventListener(eventType, handler, false)
            el.destroy = null
        }
    },
    // 被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)
    inserted(el, binding, vnode) {
        const {
            value,
            modifiers
        } = binding
        const form = el.closest('[data-validator-form]')
        const submitBtn = form ? form.querySelector('[type=submit]') : null

        if (submitBtn) {
            const submitHandler = () => {
                validate(el, modifiers, value)

                const errors = form.querySelectorAll('.has-error')

                if (!errors.length) {
                    submitBtn.canSubmit = true
                } else {
                    submitBtn.canSubmit = false
                }
            }

            submitBtn.addEventListener('click', submitHandler, false)

            el.destroySubmitBtn = () => {
                submitBtn.removeEventListener('click', submitHandler, false)
                el.destroySubmitBtn = null
            }
        }
    },
    unbind(el) {
        el.destroy()
        if (el.destroySubmitBtn) el.destroySubmitBtn()
    }
}
