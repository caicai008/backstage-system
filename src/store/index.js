import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { getUserAPI } from '@/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '', // 用户token
    userInfo: {} // 定义用户信息对象
  },
  getters: {
    username: state => state.userInfo.username,
    nickname: state => state.userInfo.nickname,
    user_pic: state => state.userInfo.user_pic,
    avatar: state => state.userInfo.avatar
  },
  mutations: {
    updateToken (state, newToken) {
      state.token = newToken
    },
    updateUserInfo (state, val) {
      state.userInfo = val
    }
  },
  actions: {
    // 更新用户信息
    async initUserInfo (store) {
      const { data: res } = await getUserAPI()
      console.log(res)
      if (res.code === 0) {
        store.commit('updateUserInfo', res.data)
      }
    }
  },
  modules: {
  },
  // 配置为 vuex 的插件
  plugins: [createPersistedState()]
})
