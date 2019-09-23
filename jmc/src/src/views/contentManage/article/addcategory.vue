<template>
  <div>
    <el-form ref="form" label-position="top" :model="form" :rules="rules" :label-width="'80px'">
      <el-form-item label="上级分类" class="form-item-mb" prop="id">
        <el-cascader
          v-model="form.id"
          :options="options"
          :props="propsOption"
        />
      </el-form-item>
      <el-form-item label="分类名称" prop="title" class="form-item-mb">
        <el-input v-model="form.title" autocomplete="off" placeholder="请输入分类名称" />
      </el-form-item>
      <el-form-item label="分类简介" class="form-item-mb">
        <el-input v-model="form.summary" type="textarea" :rows="8" resize="none" placeholder="请输入分类简介描述" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submit">保 存</el-button>
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
    options: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      propsOption: {
        value: 'id',
        label: 'title',
        checkStrictly: true
      }
    }
  },
  methods: {
    submit() {
      this.$emit('submit', { $refs: this.$refs['form'], form: this.form, marking: this.marking })
    },
    closeDio() {
      this.$refs.form.resetFields()
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
