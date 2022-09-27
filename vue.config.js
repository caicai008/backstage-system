const { defineConfig } = require('@vue/cli-service')
// 需要排除的包对象
let externals = {}
// 判断是否是生产环境
const isProduction = process.env.NODE_ENV === 'production'
// 如何是生产环境，需要执行以下逻辑
if (isProduction) {
  externals = {
    /**
      * externals 对象属性解析：
      * '包名': '在项目中引入的名字'
      * 以 element-ui 举例 我再 main.js 里是以
      * import ELEMENT from 'element-ui'
      * Vue.use(ELEMENT)
      * 这样引入的，所以我的 externals 的属性值应该是 ELEMENT
      * 一定要去main.js设置
    */
    echarts: 'echarts',
    vue: 'Vue',
    'vue-router': 'VueRouter',
    vuex: 'Vuex',
    axios: 'axios',
    dayjs: 'dayjs',
    'element-ui': 'ELEMENT',
    'vue-quill-editor': 'VueQuillEditor',
    'vuex-persistedstate': 'createPersistedState'
  }
}
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'development' ? '/' : './',
  configureWebpack: {
    externals: externals
  }
})
