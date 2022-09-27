<template>
    <!-- 注册页面的整体盒子 -->
    <div class="reg-container">
        <!-- 注册的盒子 -->
        <div class="reg-box">
            <!-- 标题的盒子 -->
            <div class="title-box"></div>
            <!-- 注册的表单区域 -->
            <el-form ref="form" :model="form" :rules="regRules">
                <el-form-item prop="username">
                    <el-input placeholder="请输入用户名" v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input placeholder="请输入密码" v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item prop="repassword">
                    <el-input placeholder="请确认密码" v-model="form.repassword"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button class="btn-reg" type="primary" @click="registerFn">立即注册</el-button>
                    已有账号？
                    <el-link type="info" @click="$router.push('/login')">去登陆</el-link>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { getRegAPI } from '@/api'
export default {
  name: 'my-register',
  data () {
    const samePwd = (rule, value, callback) => {
      if (value !== this.form.password) {
        // 调用失败的回调函数
        callback(new Error('两次密码输入不一致！'))
      } else {
        callback()
      }
    }
    return {
      form: { // 表单数据对象
        username: '', // 用户名
        password: '', // 密码
        repassword: '' // 确认密码
      },
      regRules: { // 表单规则校验对象
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            pattern: /^[a-zA-Z0-9]{1,10}$/,
            message: '用户名必须是1-10的大小写字母数字',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            pattern: /^\S{6,15}$/,
            message: '密码必须是6-15的非空字符',
            trigger: 'blur'
          }
        ],
        repassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          //   { pattern: /^\S{6,15}$/, message: '密码必须是6-15的非空字符', trigger: 'blur' },
          { validator: samePwd, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    registerFn () {
      // js兜底校验
      this.$refs.form.validate(async vali => {
        if (!vali) return false
        // console.log(this.form)
        // 调用注册接口,{data.res}是一个解构赋值，把axios返回的数据对象里的data字段对应的值保存到res上
        const { data: res } = await getRegAPI(this.form)
        // console.log(res)
        // 注册失败提示
        if (res.code !== 0) return this.$message.error(res.message)
        // 注册成功提示
        this.$message.success(res.message)
        // 路由跳转至登录页
        this.$router.push('/login')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.reg-container {
    background: url('../../assets/images/login_bg.jpg') center;
    background-size: cover;
    height: 100%;

    .reg-box {
        width: 400px;
        height: 335px;
        background-color: #fff;
        border-radius: 3px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        padding: 0 30px;
        box-sizing: border-box;

        .title-box {
            height: 60px;
            background: url('../../assets/images/login_title.png') center no-repeat;
        }

        .btn-reg {
            width: 100%;
        }
    }
}
</style>
