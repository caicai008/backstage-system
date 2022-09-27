import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/global.less'
import '@/elementUI'

// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// 导入富文本编辑器的样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

// 导入格式化日期工具
import dayjs from 'dayjs'
// 定义时间格式化函数
Vue.prototype.$formatDate = (dateObj) => {
  return dayjs(dateObj).format('YYYY-MM-DD HH:mm:ss')
}
// 全局注册富文本编辑器
Vue.use(VueQuillEditor)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
