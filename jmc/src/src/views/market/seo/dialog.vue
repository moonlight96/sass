<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" :label-width="'80px'" :disabled="disabled">
      <el-form-item label="友链名称" prop="name" class="form-item-mb">
        <el-input v-model="form.name" autocomplete="off" placeholder="请输入友链名称" />
      </el-form-item>
      <el-form-item label="友链地址" prop="url" class="form-item-mb">
        <el-input v-model="form.url" autocomplete="off" placeholder="请输入友链地址" />
      </el-form-item>
      <el-form-item label="PR" prop="pr" class="form-item-mb">
        <el-input v-model="form.pr" autocomplete="off" placeholder="请输入PR" />
      </el-form-item>
      <el-form-item label="索引量" prop="index" class="form-item-mb">
        <el-input v-model="form.index" autocomplete="off" placeholder="请输入索引量" />
      </el-form-item>
      <el-form-item label="TEL" prop="phone" class="form-item-mb">
        <el-input v-model="form.phone" autocomplete="off" placeholder="请输入TEL" />
      </el-form-item>
      <el-form-item label="E-mail" prop="email" class="form-item-mb">
        <el-input v-model="form.email" autocomplete="off" placeholder="请输入E-mail" />
      </el-form-item>
      <el-form-item label="wechat" class="form-item-mb">
        <el-input v-model="form.wechat" autocomplete="off" placeholder="请输入wechat" />
      </el-form-item>
      <el-form-item label="备注" class="form-item-mb">
        <el-input v-model="form.remark" type="textarea" :rows="8" resize="none" placeholder="请输入备注" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button v-if="!disabled" type="primary" @click="submit">确 定</el-button>
      <el-button v-else type="primary" @click="changeEdit">编 辑</el-button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    form: {
      type: Object,
      default() {
        return {}
      }
    },
    rules: {
      type: Object,
      default() {
        return {}
      }
    },
    marking: {
      type: String,
      default() {
        return ''
      }
    },
    disabled: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  methods: {
    cancel() {
      if (this.marking === '添加') {
        this.$emit('cancel', { $refs: this.$refs.form, marking: 1 })
      } else if (this.marking === '编辑') {
        this.$emit('cancel', { $refs: this.$refs.form, marking: 2 })
      } else {
        this.$emit('cancel', { $refs: this.$refs.form, marking: 3 })
      }
    },
    submit() {
      if (this.marking === '添加') {
        this.$emit('submit', { $refs: this.$refs['form'], form: this.form, marking: 1 })
      } else if (this.marking === '编辑') {
        this.$emit('submit', { $refs: this.$refs['form'], form: this.form, marking: 2 })
      }
    },
    closeDio() {
      this.$refs.form.resetFields()
    },
    changeEdit() {
      this.$emit('edit')
    }
  }
}
</script>
<style lang="scss" scoped>
.el-form-item {
    margin-bottom: 22px;
}
.dialog-footer{
  text-align: right;
}
</style>
