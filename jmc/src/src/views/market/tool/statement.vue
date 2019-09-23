<template>
  <div class="page-container">
    <TablePage
      :fields="statement.fields"
      :items="statement.list"
      :filter-pramas.sync="statement.filterPramas"
      :total="statement.total"
      :loading="statement.loading"
      :multiple-opera="multipleOpera"
      :form-data="formData"
      @cell-click="cellClick"
      @selection-change="handleSelectionChange"
      @search="searchHandle"
    />

    <!-- 添加 -->
    <el-dialog
      title="添加语句"
      :visible.sync="addStatement.dialogvisible"
      :close-on-click-modal="false"
      width="50%"
      top="150px"
      @close="close('addStatement')"
    >
      <Dialog
        ref="addStatement"
        :form="addStatement.form"
        :rules="rules"
        marking="添加"
        :typeoptions="typeOptions"
        @cancel="cancel"
        @submit="submit"
      />
    </el-dialog>
    <!-- 编辑 -->
    <el-dialog
      title="编辑语句"
      :visible.sync="editStatement.dialogvisible"
      :close-on-click-modal="false"
      width="50%"
      top="150px"
      @close="close('editStatement')"
    >
      <Dialog
        ref="editStatement"
        :form="editStatement.form"
        :rules="rules"
        marking="编辑"
        :typeoptions="typeOptions"
        @cancel="cancel"
        @submit="submit"
      />
    </el-dialog>
    <!-- 詳情 -->
    <el-dialog
      title="查看语句"
      :visible.sync="detailStatement.dialogvisible"
      :close-on-click-modal="false"
      width="50%"
      top="150px"
      @close="close('detailStatement')"
    >
      <Dialog
        ref="detailStatement"
        :form="detailStatement.form"
        :rules="rules"
        marking="详情"
        :typeoptions="typeOptions"
        :disabled="formDisabled"
        @cancel="cancel"
        @submit="submit"
        @edit="edit"
      />
    </el-dialog>
  </div>
</template>

<script>
import Dialog from './dialog'
import TablePage from '@/components/TableData'
import { getSentenceList, addSentence, updateSentence, deleteSentence } from '@/api/market/tool'
import { del } from '@/utils/delete'
export default {
  components: {
    TablePage,
    Dialog
  },
  data() {
    return {
      statement: {
        query: {
          page_number: 1,
          page_size: 20
        },
        loading: true,
        fields: [
          { type: 'selection', width: 50 },
          { title: '语句类型', key: 'sentence_type' },
          { title: '语句内容', key: 'sentence_content', canClick: true },
          {
            title: '操作',
            key: 'handle',
            btns: [
              {
                icon: 'el-icon-edit',
                text: '',
                tip: '编辑',
                method: 'handleEdit'
              },
              {
                icon: 'el-icon-delete',
                text: '',
                tip: '删除',
                method: 'handleDelete'
              }
            ]
          }
        ],
        list: [],
        total: 0,
        filterPramas: []
      },
      typeOptions: [
        { value: 1, label: '差异化语句' }
      ],
      addStatement: {
        form: {
          sentence_type: 1,
          sentence_content: ''
        },
        dialogvisible: false
      },
      editStatement: {
        form: {
          id: '',
          sentence_type: 1,
          sentence_content: ''
        },
        dialogvisible: false
      },
      detailStatement: {
        form: {
          id: '',
          sentence_type: 1,
          sentence_content: ''
        },
        dialogvisible: false
      },
      rules: {
        sentence_type: [
          { required: true, message: '请选择语句类型', trigger: 'change' }
        ]
      },
      formDisabled: true,
      multipleOpera: [
        {
          icon: 'el-icon-edit',
          text: '添加',
          method: 'openDialog'
        },
        {
          icon: 'el-icon-delete',
          text: '删除',
          method: 'batchDel'
        }
      ],
      batchList: [],
      formData: [
        {
          label: '搜索',
          element: 'inputSelect',
          key: 'search',
          width: '350px',
          // element为inputSelect时必须传selectKey作为选择的字段和option
          selectKey: 'selectVal',
          placeholder: '请输入内容',
          selectPlaceholder: '请选择',
          selectWidth: '100px',
          option: [
            { label: '全部', value: '', default: true }
          ],
          isSearchItem: true,
          btnWidth: '50px'
        }
      ]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.statement.loading = true
      getSentenceList(this.statement.query).then(res => {
        console.log(res)
        this.statement.loading = false
        this.statement.list = res.data.list
        this.statement.total = res.data.total
      })
    },
    // 打开编辑弹窗
    handleEdit(obj) {
      console.log(obj)
      const { sentence_type, id, sentence_content } = obj
      this.editStatement.form.id = id
      this.editStatement.form.sentence_type = sentence_type
      this.editStatement.form.sentence_content = sentence_content
      this.editStatement.dialogvisible = true
    },
    // 选中数据
    handleSelectionChange(val) {
      this.batchList = val
    },
    // 删除
    handleDelete(obj) {
      const _this = this
      del(_this, obj.id, () => {
        deleteSentence(obj.id.toString()).then(res => {
          console.log(res)
          if (res.code === 0) {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.fetchData()
          }
        })
      })
    },
    // 弹窗右上角关闭功能
    close(mark) {
      this.$refs[mark].closeDio()
    },
    // 添加弹窗取消
    cancel(obj) {
      console.log(obj)
      obj.$refs.resetFields()
      if (obj.marking === 1) {
        this.addStatement.dialogvisible = false
      } else if (obj.marking === 2) {
        this.editStatement.dialogvisible = false
      } else {
        this.detailStatement.dialogvisible = false
      }
    },
    // 添加弹窗确认
    submit(obj) {
      obj.$refs.validate(valid => {
        if (valid) {
          console.log(obj.form)
          if (obj.marking === 1) {
            addSentence(obj.form).then(res => {
              console.log(res)
              if (res.code === 0) {
                this.addStatement.dialogvisible = false
                this.$message({
                  type: 'success',
                  message: '添加成功'
                })
                this.fetchData()
              }
            })
          } else if (obj.marking === 2) {
            updateSentence(obj.form).then(res => {
              console.log(res)
              if (res.code === 0) {
                this.editStatement.dialogvisible = false
                this.$message({
                  type: 'success',
                  message: '修改成功'
                })
                this.fetchData()
              }
            })
          }
        } else {
          return false
        }
      })
    },
    // 点击表格中的某项
    cellClick(row, key) {
      const { sentence_type, id, sentence_content } = row
      this.detailStatement.form.id = id
      this.detailStatement.form.sentence_type = sentence_type
      this.detailStatement.form.sentence_content = sentence_content
      this.formDisabled = true
      this.detailStatement.dialogvisible = true
    },
    // 详情弹窗的编辑按钮
    edit() {
      console.log('kkk')
      this.formDisabled = false
    },
    // 表格右上角的添加功能
    openDialog() {
      this.addStatement.dialogvisible = true
    },
    // 批量删除
    batchDel() {
      if (this.batchList.length === 0) {
        this.$message({
          type: 'error',
          message: '请至少选择一项数据'
        })
      } else {
        const arr = []
        const _this = this
        this.batchList.forEach(item => {
          arr.push(item.id.toString())
        })
        del(_this, arr.join(), () => {
          deleteSentence(arr.join()).then(res => {
            console.log(res)
            if (res.code === 0) {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
              this.fetchData()
            }
          })
        })
      }
    },
    // 表格上方的搜索
    searchHandle(val) {
      console.log('搜索：', val)
    }
  }
}
</script>

<style lang="scss" scoped>
.page-container {
  padding: 0 20px;
}
/deep/ .el-input-group__prepend{
  width: 120px;
}
</style>
