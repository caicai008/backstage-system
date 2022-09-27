<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>个人资料</span>
        </div>
        <el-form
            :model="userForm"
            :rules= "userFormRules"
            ref="userFormRef"
            label-width="100px"
        >
            <el-form-item label="登录名称" prop="username">
                <el-input v-model="userForm.username" disabled></el-input>
            </el-form-item>
            <el-form-item label="用户昵称" prop="nickname">
                <el-input
                v-model="userForm.nickname"
                minlength="1"
                maxlength="10"
                ></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="userForm.email"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitFn">提交修改</el-button>
                <el-button @click="resetFn">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
import { updateUserInfoAPI } from '@/api'
export default {
  name: 'user-info',
  data () {
    return {
      userForm: {
        username: this.$store.state.userInfo.username,
        nickname: this.$store.state.userInfo.nickname || '',
        email: this.$store.state.userInfo.email || ''
      },
      // 表单的验证规则对象
      userFormRules: {
        nickname: [
          { required: true, message: '请输入用户昵称', trigger: 'blur' },
          { pattern: /^\S{1,10}$/, message: '昵称必须是1-10位的非空字符串', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入用户邮箱', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitFn () {
      this.$refs.userFormRef.validate(async vali => {
        if (vali) {
          // console.log(this.userForm)
          this.userForm.id = this.$store.state.userInfo.id
          const { data: res } = await updateUserInfoAPI(this.userForm)
          console.log(res)
          if (res.code !== 0) return this.$message.error('更新信息失败！')
          this.$message.success('更新信息成功！')
          // 将信息存储进vuex中
          this.$store.dispatch('initUserInfo')
        } else {
          return false
        }
      })
    },
    resetFn () {
      this.$refs.userFormRef.resetFields()
    }
  }
}
</script>

<style>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
</style>
