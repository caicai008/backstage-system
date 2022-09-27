<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
        <span>头像设置</span>
    </div>
    <div>
        <img class="the_img" src="@/assets/images/avatar.jpg" v-if="avatar === ''">
        <img class="the_img" :src="avatar" v-else>
         <br>
        <input type="file" accept="image/*" style="display: none" ref="iptRef" @change="onFileChange" />
        <el-button type="primary" icon="el-icon-plus" @click="chooseImg">选择图片</el-button>
        <el-button type="success" icon="el-icon-upload" :disabled="avatar === ''" @click="updateFn">上传头像</el-button>
    </div>
</el-card>
</template>

<script>
import { updateAvatarAPI } from '@/api'
export default {
  name: 'user-avatar',
  data () {
    return {
      avatar: ''
    }
  },
  methods: {
    chooseImg () {
      // 触发选择文件事件
      this.$refs.iptRef.click()
    },
    onFileChange (e) {
      const files = e.target.files
      if (files.length === 0) {
        // 用户没有选择图片
        this.avatar = ''
      } else {
        // console.log(files[0])
        // 使用URL.createObjURL()来转换文件变成图片地址(纯前端本地)
        // this.avatar = URL.createObjectURL(files[0])
        const fs = new FileReader()
        // 读取文件内容
        fs.readAsDataURL(files[0])
        // 监听fs的onload事件
        fs.onload = e => {
          // 4. 通过 e.target.result 获取到读取的结果，值是字符串（base64 格式的字符串）
          this.avatar = e.target.result
        }
      }
    },

    async updateFn () {
      // 5. 调用接口, 传递给后台并根据返回结果给用户提示
      const { data: res } = await updateAvatarAPI(this.avatar)
      console.log(res)
      if (res.code !== 0) return this.$message.error('头像上传失败！')
      this.$message.success('上传头像成功！')
      // 更新
      this.$store.dispatch('initUserInfo')
    }
  }
}
</script>

<style>
.the_img {
    width: 250px;
    height: 250px;
    margin-bottom: 20px;
}
</style>
