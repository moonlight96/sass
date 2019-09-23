<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" :label-width="'80px'" :disabled="disabled">
      <el-form-item label="语句类型" prop="sentence_type">
        <el-select v-model="form.sentence_type" placeholder="请选择语句类型" style="width:200px">
          <el-option
            v-for="item in typeoptions"
            :key="item.value"
            :value="item.value"
            :label="item.label"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="语句内容" class="form-item-mb">
        <el-input v-model="form.sentence_content" type="textarea" :rows="8" resize="none" placeholder="请输入语句内容" />
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
    },
    typeoptions: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    cancel() {
      if (this.marking === '添加') {
        this.$emit('cancel', { $refs: this.$refs['form'], marking: 1 })
      } else if (this.marking === '编辑') {
        this.$emit('cancel', { $refs: this.$refs['form'], marking: 2 })
      } else {
        this.$emit('cancel', { $refs: this.$refs['form'], marking: 3 })
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
