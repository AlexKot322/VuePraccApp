import localizeFilter from '@/filters/localize.filter'

export default {
  install(Vue) {
    Vue.prototype.$message = function (html) {
      window.M.toast({ html })
    }

    Vue.prototype.$error = function (html) {
      window.M.toast({ html: `[${localizeFilter('Error')}]: ${html}` })
    }
  },
}
