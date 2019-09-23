<template>
  <div class="page-container">
    <TablePage
      :fields="article.fields"
      :items="article.list"
      :total="article.total"
      :multiple-opera="multipleOpera"
      :loading="article.loading"
      :form-data="formData"
      @search="searchHandle"
      @selection-change="handleSelectionChange"
    />

    <el-dialog
      custom-class="modal-xl"
      width="80%"
      :visible.sync="category.dialogvisible"
      :close-on-click-modal="false"
      top="150px"
    >
      <div slot="title" class="header-title">
        <span>分类管理</span>
        <el-button plain @click="addcategory">添加分类</el-button>
      </div>
      <Dialog
        :fields="category.fields"
        :list="category.list"
        :total="category.total"
        @category="categoryMethod"
      />
      <el-dialog
        title="添加分类"
        width="55%"
        :visible.sync="addCategory.dialogvisible"
        :close-on-click-modal="false"
        top="200px"
        append-to-body
        @close="close('addCategory')"
      >
        <Addcategory
          ref="addCategory"
          :options="category.list"
          :rules="rules"
          :form="addCategory.form"
          marking="1"
          @submit="submit"
        />
      </el-dialog>

      <el-dialog
        title="编辑分类"
        width="55%"
        :visible.sync="editCategory.dialogvisible"
        :close-on-click-modal="false"
        top="200px"
        append-to-body
        marking="2"
        @close="close('editCategory')"
      >
        <Addcategory
          ref="editCategory"
          :options="category.list"
          :rules="rules"
          :form="editCategory.form"
          @submit="submit"
        />
      </el-dialog>
    </el-dialog>

    <!-- 添加文章 -->
    <el-dialog
      title="添加文章"
      :visible.sync="addArticle.dialogvisible"
      :close-on-click-modal="false"
      width="80%"
      top="150px"
    >
      <Add />
    </el-dialog>
  </div>
</template>

<script>
import { del } from '@/utils/delete'
import TablePage from '@/components/TableData'
import Dialog from './dialog'
import Add from './add'
import Addcategory from './addcategory'
import { getArticleList, delArticle, getCategoryList, addCategory, delCategory, updateCategory } from '@/api/contentManage/articleList'
export default {
  components: {
    TablePage,
    Dialog,
    Add,
    Addcategory
  },
  data() {
    return {
      // 文章列表
      article: {
        query: {
          page_number: 1,
          page_size: 20
        },
        fields: [
          { type: 'selection', width: 50 },
          { title: '序号', type: 'index', width: 50 },
          {
            title: '标题', key: 'title', width: '406',
            render(h, context) {
              return h('div', {
                'class': {
                  'article-title': true
                }
              }, [
                h('img', {
                  attrs: { id: 2, src: context.row.thumb ? context.row.thumb : require('@/assets/images/no_url.png') },
                  style: {
                    width: '50px'
                  }
                }),
                h('a', {
                  attrs: { id: 4, href: context.row.page_url, title: context.row.page_url, class: 'ssss', target: '_blank' }
                }, context.row.title)
              ])
            }
          },
          {
            title: '所属分类',
            key: 'article_category_id',
            filterData: [
              { text: '全部分类', value: '' }
            ],
            // 决定怎么筛选数据
            filterHandler(value, row, column) {
              const property = column['property']
              return row[property] === value
            }
          },
          {
            title: '状态', key: 'status_num',
            filterData: [
              { text: '全部状态', value: '' },
              { text: '上架', value: 1 },
              { text: '置顶', value: 2 },
              { text: '下架', value: 3 }
            ],
            // 决定怎么筛选数据
            filterHandler(value, row, column) {
              const property = column['property']
              return row[property] === value
            }
          },
          { title: '创建时间', key: 'create_time', sortable: true },
          { title: '更新时间', key: 'update_time', sortable: true },
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
        total: 2,
        loading: true
      },
      // 添加文章
      addArticle: {
        dialogvisible: false,
        form: {

        }
      },
      // 文章分类树形数据
      category: {
        dialogvisible: false,
        query: {
          page_number: 1,
          page_size: 20
        },
        total: 2,
        fields: [
          { title: '文章分类', key: 'title' },
          { title: '文章数', key: 'count' },
          { title: '创建时间', key: 'create_time' },
          {
            title: '操作',
            key: 'handle',
            btns: [
              {
                icon: 'el-icon-plus',
                text: '',
                tip: '添加分类',
                method: 'addCategory'
              },
              {
                icon: 'el-icon-edit',
                text: '',
                tip: '编辑分类',
                method: 'editCategory'
              },
              {
                icon: 'el-icon-delete',
                text: '',
                tip: '删除分类',
                method: 'delCategory'
              }
            ]
          }
        ],
        list: []
      },
      // 添加文章分类
      addCategory: {
        form: {
          title: '',
          summary: '',
          id: 0
        },
        dialogvisible: false
      },
      // 编辑文章分类
      editCategory: {
        form: {
          title: '',
          summary: '',
          id: 0
        },
        dialogvisible: false
      },
      rules: {
        title: [
          { required: true, message: '请输入分类名称', trigger: 'blur' }
        ],
        id: [
          { required: true, message: '请选择上级分类', trigger: 'change' }
        ]
      },
      multipleOpera: [
        {
          icon: 'el-icon-edit',
          text: '上架',
          method: 'putaway'
        },
        {
          icon: 'el-icon-delete',
          text: '下架',
          method: 'soldOut'
        },
        {
          icon: 'el-icon-delete',
          text: '栏目分类',
          method: 'columnCategory'
        },
        {
          icon: 'el-icon-delete',
          text: '分类管理',
          method: 'openCategory'
        },
        {
          icon: 'el-icon-delete',
          text: '添加',
          method: 'openDialog'
        }
      ],
      // 搜索数据
      formData: [
        {
          label: '内容',
          element: 'input',
          key: 'search',
          placeholder: '请输入...',
          isSearchItem: true
        }
      ]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.article.loading = true
      getArticleList(this.article.query).then(res => {
        this.article.loading = false
        this.article.list = res.data.list
        this.article.total = res.data.total
      })
    },
    categoryData() {
      getCategoryList(this.category.query).then(res => {
        console.log(res)
        this.category.list = res.data
      })
    },
    openCategory() {
      this.category.dialogvisible = true
      this.categoryData()
    },
    handleSelectionChange(val) {
      console.log('选择的数据：', val)
    },
    handleEdit(obj) {
      console.log(obj)
    },
    handleDelete(obj) {
      const _this = this
      del(_this, obj.id, () => {
        delArticle(obj.id.toString()).then(res => {
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
    searchHandle(val) {
      console.log('搜索：', val)
    },
    // 上架
    putaway() {
      console.log('上架')
    },
    // 上架
    soldOut() {
      console.log('下架')
    },
    // 上架
    columnCategory() {
      console.log('栏目分类')
    },
    // 打开添加文章弹窗
    openDialog() {
      this.addArticle.dialogvisible = true
    },
    // 分类管理-总方法
    categoryMethod(obj) {
      console.log(obj)
      if (obj.name === 'addCategory') {
        this.addcategory()
      } else if (obj.name === 'delCategory') {
        delCategory(obj.row.id.toString()).then(res => {
          if (res.code === 0) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.categoryData()
          } else {
            this.$message({
              message: res.msg,
              type: 'error'
            })
          }
        })
      } else {
        this.editCategory.dialogvisible = true
        this.editCategory.form.id = obj.row.id
        this.editCategory.form.title = obj.row.title
        this.editCategory.form.summary = obj.row.summary
      }
    },
    // 分类管理-添加
    addcategory() {
      this.addCategory.dialogvisible = true
    },
    // 弹窗右上角关闭功能
    close(mark) {
      this.$refs[mark].closeDio()
    },
    // 添加分类保存
    submit(obj) {
      const id = obj.form.id[obj.form.id.length - 1]
      const pid = this.getParentId(id, this.category.list)
      // obj.form
      obj.$refs.validate(valid => {
        if (valid) {
          if (obj.marking === '1') {
            addCategory({
              site_id: 1,
              title: this.addCategory.form.title,
              summary: this.addCategory.form.summary,
              parent_id: pid
            }).then(res => {
              if (res.code === 0) {
                this.$message({
                  message: '添加成功',
                  type: 'success'
                })
                this.addCategory.dialogvisible = false
                this.categoryData()
              } else {
                this.$message({
                  message: res.msg,
                  type: 'error'
                })
                this.addCategory.dialogvisible = false
              }
            })
          } else {
            updateCategory({
              site_id: 1,
              id: this.editCategory.form.id,
              title: this.editCategory.form.title,
              summary: this.editCategory.form.summary,
              parent_id: pid
            }).then(res => {
              if (res.code === 0) {
                this.$message({
                  message: '修改成功',
                  type: 'success'
                })
                this.editCategory.dialogvisible = false
                this.categoryData()
              } else {
                this.$message({
                  message: res.msg,
                  type: 'error'
                })
                this.editCategory.dialogvisible = false
              }
            })
          }
        } else {
          return false
        }
      })
    },
    getParentId(id, arr) {
      let temp = null
      arr.forEach(item => {
        if (id === item.id) {
          temp = item.parent_id
          return temp
        }
        if (item.children) {
          temp = this.getParentId(id, item.children)
        }
      })
      return temp
    }
  }
}
</script>

<style lang="scss" scoped>
.page-container{
  padding: 20px;
}
/deep/ .form-box{
  margin-top: 0;
}
/deep/ .art-title{
  display: flex;
  align-items: center;
  .img1, .img2{
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }
  .img1{
    width: 46px;
  }
  img{
    width: 100%;
    height: 100%;
  }
}
.header-title{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: 5%;
}
</style>
<style lang='scss'>
  .article-title{
    display: flex;
    align-items: center;
    a.ssss{
      width: 300px;
      color: #007bff;
      text-decoration: none;
      background-color: transparent;
      display: -webkit-box;
      overflow: hidden;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      margin-left: 10px;
      &:hover {
        color: #007bff;
        text-decoration: underline;
      }
    }
  }
  .el-popper label.el-radio{
    margin-bottom: 0;
    line-height: 0;
  }
  .el-dialog__body{
    padding: 0 20px 20px;
    .el-table{
      margin-bottom: 0;
    }
  }
</style>
