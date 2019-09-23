<template>
  <div class="page-container">
    <TablePage
      :fields="link.fields"
      :items="link.list"
      :filter-pramas.sync="link.filterPramas"
      :total="link.total"
      :multiple-opera="multipleOpera"
      :loading="link.loading"
      :form-data="formData"
      @search="searchHandle"
      @cell-click="cellClick"
      @selection-change="handleSelectionChange"
    />

    <!-- 添加 -->
    <el-dialog
      title="添加友情链接"
      :visible.sync="addLink.dialogvisible"
      :close-on-click-modal="false"
      width="50%"
      top="50px"
      @close="close('addLink')"
    >
      <Dialog
        ref="addLink"
        :form="addLink.form"
        :rules="rules"
        marking="添加"
        @cancel="cancel"
        @submit="submit"
      />
    </el-dialog>
    <!-- 编辑 -->
    <el-dialog
      title="编辑友情链接"
      :visible.sync="editLink.dialogvisible"
      :close-on-click-modal="false"
      width="50%"
      top="50px"
      @close="close('editLink')"
    >
      <Dialog
        ref="editLink"
        :form="editLink.form"
        :rules="rules"
        marking="编辑"
        @cancel="cancel"
        @submit="submit"
      />
    </el-dialog>
    <!-- 詳情 -->
    <el-dialog
      title="查看友情链接"
      :visible.sync="detailLink.dialogvisible"
      :close-on-click-modal="false"
      width="50%"
      top="50px"
      @close="close('detailLink')"
    >
      <Dialog
        ref="detailLink"
        :form="detailLink.form"
        :rules="rules"
        marking="详情"
        :disabled="formDisabled"
        @cancel="cancel"
        @submit="submit"
      />
    </el-dialog>
  </div>
</template>

<script>
import TablePage from '@/components/TableData'
import Dialog from './dialog'
import { getLinksList, addLink, updateLink, deleteLink } from '@/api/market/seo'
import { del } from '@/utils/delete'
export default {
  components: {
    TablePage,
    Dialog
  },
  data() {
    return {
      link: {
        query: {
          page_number: 1,
          page_size: 20
        },
        fields: [
          { type: 'selection', width: 50 },
          {
            title: '排序',
            key: 'sort',
            render: (h, params) => {
              const _this = this
              return h('el-input', {
                props: {
                  size: 'small'
                },
                attrs: {
                  value: params.row.sort
                },
                style: {
                  width: '100%'
                },
                on: {
                  blur: (e) => {
                    _this.inputHandler(e, params)
                  },
                  // 如果是element-ui的组件，则需要加入这一段来达到v-model的效果，不是则不要加这一段事件
                  input: (value) => {
                    params.row.sort = value
                  }
                }
              })
            }
          },
          { title: '友链名称', key: 'name', canClick: true },
          { title: '友链地址', key: 'url' },
          { title: '添加位置', key: 'position' },
          { title: '添加时间', key: 'create_time' },
          { title: '添加人', key: 'user_id' },
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
        filterPramas: [],
        loading: true
      },
      addLink: {
        form: {
          url: '',
          sort: '',
          pr: '',
          index: '',
          phone: '',
          email: '',
          wechat: '',
          remark: ''
        },
        dialogvisible: false
      },
      editLink: {
        form: {
          id: '',
          url: '',
          sort: '',
          pr: '',
          index: '',
          phone: '',
          email: '',
          wechat: '',
          remark: ''
        },
        dialogvisible: false
      },
      detailLink: {
        form: {
          id: '',
          url: '',
          sort: '',
          pr: '',
          index: '',
          phone: '',
          email: '',
          wechat: '',
          remark: ''
        },
        dialogvisible: false
      },
      rules: {
        name: [
          { required: true, message: '请输入友链名称', trigger: 'blur' }
        ],
        url: [
          { required: true, message: '请输入友链地址', trigger: 'blur' }
        ],
        pr: [
          { required: true, message: '请输入PR', trigger: 'blur' },
          {
            validator(rule, value, callback) {
              if (!/^[+]{0,1}(\d+)$/.test(value)) {
                callback(new Error('请输入整数'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
        index: [
          { required: true, message: '请输入索引量', trigger: 'blur' },
          {
            validator(rule, value, callback) {
              if (!/^[+]{0,1}(\d+)$/.test(value)) {
                callback(new Error('请输入整数'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
        phone: [
          { required: false, message: '请输入手机号码', trigger: 'blur' },
          {
            validator(rule, value, callback) {
              if (!/^1[34578]\d{9}$/.test(value)) {
                callback(new Error('请输入正确的手机号'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
        email: [
          { required: false, message: '请输入邮箱', trigger: 'blur' },
          {
            validator(rule, value, callback) {
              if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)) {
                callback(new Error('请输入正确的邮箱'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
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
            { value: '', label: '全部', default: true },
            { value: 1, label: '友链名称' },
            { value: 2, label: '添加位置' },
            { value: 3, label: '添加人' }
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
      this.link.loading = true
      getLinksList(this.link.query).then(res => {
        this.link.loading = false
        this.link.list = res.data.list
        this.link.total = res.data.total
      })
    },
    // 打开编辑弹窗
    handleEdit(obj) {
      console.log(obj)
      const { name, id, url, pr, index, phone, email, wechat, remark } = obj
      this.editLink.form.id = id
      this.editLink.form.name = name
      this.editLink.form.url = url
      this.editLink.form.pr = pr
      this.editLink.form.index = index
      this.editLink.form.phone = phone
      this.editLink.form.email = email
      this.editLink.form.wechat = wechat
      this.editLink.form.remark = remark
      this.editLink.dialogvisible = true
    },
    // 批量选择
    handleSelectionChange(val) {
      this.batchList = val
    },
    // 删除
    handleDelete(obj) {
      const _this = this
      del(_this, obj.id, () => {
        deleteLink(obj.id.toString()).then(res => {
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
        this.addLink.dialogvisible = false
      } else if (obj.marking === 2) {
        this.editLink.dialogvisible = false
      } else {
        this.detailLink.dialogvisible = false
      }
    },
    // 添加弹窗确认
    submit(obj) {
      console.log(obj)
      obj.$refs.validate(valid => {
        if (valid) {
          if (obj.marking === 1) {
            addLink(obj.form).then(res => {
              console.log(res)
              if (res.code === 0) {
                this.addLink.dialogvisible = false
                this.$message({
                  type: 'success',
                  message: '添加成功'
                })
                this.fetchData()
              }
            })
          } else if (obj.marking === 2) {
            updateLink().then(res => {
              console.log(res)
              if (res.code === 0) {
                this.editLink.dialogvisible = false
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
    cellClick(row, key) {
      const { name, id, url, pr, index, phone, email, wechat, remark } = row
      this.detailLink.form.id = id
      this.detailLink.form.name = name
      this.detailLink.form.url = url
      this.detailLink.form.pr = pr
      this.detailLink.form.index = index
      this.detailLink.form.phone = phone
      this.detailLink.form.email = email
      this.detailLink.form.wechat = wechat
      this.detailLink.form.remark = remark
      this.detailLink.dialogvisible = true
      this.formDisabled = true
    },
    edit() {
      this.formDisabled = false
    },
    // 打开添加的弹窗
    openDialog() {
      this.addLink.dialogvisible = true
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
          deleteLink(arr.join()).then(res => {
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
    // 表格内输入表单排序失去焦点事件
    inputHandler(e, data) {
      console.log(data)
    },
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
