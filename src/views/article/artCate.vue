<template>
  <div>
     <!-- 预览文章分类 -->
    <el-card class="box-card" style="width: 100%;">
      <div slot="header" class="clearfix header-box">
        <span>文章分类</span>
        <el-button type="primary" size="mini" @click="addCateFn">添加分类</el-button>
      </div>
      <el-table style="width: 100%" :data="cateList" border stripe>
        <el-table-column label="序号" type="index" width="100"></el-table-column>
        <el-table-column label="分类名称" prop="cate_name"></el-table-column>
        <el-table-column label="分类别名" prop="cate_alias"></el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button type="primary" size="mini" @click="updateFn(scope.row)">修改</el-button>
            <el-button type="danger" size="mini" @click="removeFn(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加分类对话框 -->
    <el-dialog
      :title="isEdit ? '编辑文章分类' : '添加文章分类'"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      @closed="onAddClosedFn"
      >
      <!-- 添加的表单 -->
      <el-form :model="addForm" :rules="addRules" ref="addRef" label-width="80px">
        <el-form-item label="分类名称" prop="cate_name">
          <el-input v-model="addForm.cate_name" minlength="1" maxlength="10"></el-input>
        </el-form-item>
        <el-form-item label="分类别名" prop="cate_alias">
          <el-input v-model="addForm.cate_alias" minlength="1" maxlength="15"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addFn">添 加</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { getArtCateListAPI, addArtCateAPI, updateArtCateAPI, delArtCateAPI } from '@/api'
export default {
  name: 'ArtCate',
  data () {
    return {
      cateList: [],
      dialogVisible: false,
      isEdit: false,
      editID: '',
      addForm: { // 表单数据对象
        cate_name: '',
        cate_alias: ''
      },
      addRules: { // 添加表单的验证规则对象
        cate_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          { pattern: /^\S{1,10}$/, message: '分类名必须是1-10位的非空字符', trigger: 'blur' }
        ],
        cate_alias: [
          { required: true, message: '请输入分类别名', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9]{1,15}$/, message: '分类别名必须是1-15位的字母数字', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getCateList()
  },
  methods: {
    // 获取文章分类
    async getCateList () {
      const res = await getArtCateListAPI()
      //   console.log(res.data.data)
      this.cateList = res.data.data
    },
    // 取消按钮
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    // 添加按钮
    addFn () {
      // 表单校验
      this.$refs.addRef.validate(async valid => {
        if (valid) {
          // 判断是修改还是添加,调用不同接口
          if (this.isEdit) {
            // 修改
            const { data: res } = await updateArtCateAPI({ id: this.editID, ...this.addForm })
            console.log(res)
            if (res.code !== 0) return this.$message.error('修改文章分类失败！')
            this.$message.success('修改文章分类成功！')
          } else {
            // 添加
            const { data: res } = await addArtCateAPI(this.addForm)
            // console.log(res)
            if (res.code !== 0) return this.$message.error('添加文章分类失败！')
            this.$message.success('添加文章分类成功！')
          }
          // 更新文章列表
          this.getCateList()
          // 关闭对话框
          this.dialogVisible = false
        } else {
          return false
        }
      })
    },
    // 修改按钮-修改分类
    updateFn (obj) {
      // console.log(obj) 数据回显
      this.isEdit = true
      this.editID = obj.id
      this.dialogVisible = true
      // 设置数据回显
      this.$nextTick(() => {
        // 先让对话框出现, 它绑定空值的对象, 才能resetFields清空用初始空值
        this.addForm.cate_name = obj.cate_name
        this.addForm.cate_alias = obj.cate_alias
      })
    },
    // 关闭修改弹窗-清空表单
    onAddClosedFn () {
      this.$refs.addRef.resetFields()
    },
    // 添加分类按钮
    addCateFn () {
      this.dialogVisible = true
      this.isEdit = false
    },
    // 删除按钮
    async removeFn (id) {
      const { data: res } = await delArtCateAPI(id)
      // console.log(res)
      if (res.code !== 0) return this.$message.error('删除文章分类失败！')
      this.$message.success('删除文章分类成功！')
      this.getCateList()
    }
  }
}
</script>

<style lang="less" scoped>
.header-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
