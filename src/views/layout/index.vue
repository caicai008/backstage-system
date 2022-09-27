<template>
  <el-container class="main-container">
    <!-- 头部区域 -->
    <el-header>
      <!-- 左侧的 logo -->
      <img src="../../assets/images/logo.png" alt="" />
      <!-- 右侧的菜单 -->
      <el-menu class="el-menu-top" mode="horizontal" background-color="#0a5a39" text-color="#fff"
        active-text-color="#409EFF" router>
        <el-submenu index="1">
          <template slot="title">
            <!-- 头像 -->
            <el-avatar v-if="!user_pic" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
              style="margin-right: 5px;"></el-avatar>
            <el-avatar v-else :src="user_pic"
              style="margin-right: 5px;"></el-avatar>
            <span>个人中心</span>
          </template>
          <el-menu-item index="user-info"><i class="el-icon-s-operation"></i>基本资料</el-menu-item>
          <el-menu-item index="user-avatar"><i class="el-icon-camera"></i>更换头像</el-menu-item>
          <el-menu-item index="user-pwd"><i class="el-icon-key"></i>重置密码</el-menu-item>
        </el-submenu>
        <el-menu-item index="2" @click="quitFn"><i class="el-icon-switch-button"></i>退出</el-menu-item>
      </el-menu>
    </el-header>
    <el-container>
      <!-- 侧边栏区域 -->
      <el-aside width="200px">
        <div class="user-box">
          <!-- <img :src="user_pic" alt="" v-if="user_pic" /> -->
          <div>
            <el-avatar v-if="!user_pic" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
              style="margin-right: 5px;"></el-avatar>
            <el-avatar v-else :src="user_pic"
              style="margin-right: 5px;"></el-avatar>
          </div>
          <span>欢迎 {{ nickname || username }}</span>
        </div>
        <!-- 侧边栏菜单 -->
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo"
          background-color="#066b41" text-color="#fff" active-text-color="#ffd04b" router>
          <template v-for="item in menus">
            <!-- 没有子菜单 -->
            <el-menu-item :index="item.indexPath" v-if="!item.children" :key="item.indexPath">
              <i :class="item.icon"></i>
              <span>{{item.title}}</span>
            </el-menu-item>
            <!-- 有子菜单 -->
            <el-submenu :index="item.indexPath" :key="item.indexPath" v-if="item.children">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{item.title}}</span>
              </template>
              <el-menu-item-group v-for="subItem in item.children" :index="subItem.indexPath" :key="subItem.    indexPath">
                <el-menu-item :index="subItem.indexPath"><i :class="subItem.icon"></i>{{subItem.title}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </template>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- 页面主体区域 -->
        <el-main>
          <!-- 二级路由挂载点 -->
          <router-view></router-view>
        </el-main>
        <!-- 底部 footer 区域 -->
        <el-footer>© www.itcaicai.com - cacai008程序</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { getMenuAPI } from '@/api'
export default {
  name: 'my-layout',
  data () {
    return {
      menus: []
    }
  },
  computed: {
    ...mapGetters(['username', 'nickname', 'user_pic'])
  },
  methods: {
    quitFn () {
      // console.log(11)
      this.$confirm('您确定退出登录吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 清楚vuex缓存
        this.$store.commit('updateToken', '')
        this.$store.commit('updateUserInfo', {})
        // 跳转至登录页
        this.$router.push('login')
      }).catch(() => {

      })
    }

  },
  async created () {
    const { data: res } = await getMenuAPI()
    // console.log(res)
    this.menus = res.data
  }
}
</script>

<style lang="less" scoped>
.main-container {
  height: 100%;

  .el-aside {
    background-color: #066b41;
  }

  .el-header {
    padding: 0;
    display: flex;
    background-color: #0a5a39;
    justify-content: space-between;
  }

  .el-main {
    overflow-y: scroll;
    height: 0;
    background-color: #F2F2F2;
  }

  .el-footer {
    background-color: #eee;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.avatar {
  border-radius: 50%;
  width: 35px;
  height: 35px;
  background-color: #fff;
  margin-right: 10px;
  object-fit: cover;
}

.user-box {
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  user-select: none;

  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: #fff;
    margin-right: 15px;
    object-fit: cover;
  }

  span {
    color: white;
    font-size: 12px;
  }
}
</style>
