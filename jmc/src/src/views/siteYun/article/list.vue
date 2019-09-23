<template>
  <div class="page-container">
    <TablePage
      :fields="article.fields"
      :items="article.list"
      :total="article.total"
      @selection-change="handleSelectionChange"
    >
      <!--图片以及网址-->
      <template v-slot:tableHref="scope">
        <div class="img1">
          <img :src="scope.row.img1" alt="">
        </div>
        <div class="img2">
          <img :src="scope.row.img2" alt="">
        </div>
        <a :href="scope.row.url" target="_blank" :title="scope.row.title">{{ scope.row.title }}</a>
      </template>
      <!--搜索表单-->
      <template v-slot:searchForm>
        <div>
          <el-select v-model="article.listQuery.status" placeholder="请选择状态">
            <el-option
              v-for="item in article.statusList"
              :key="item.key"
              :label="item.label"
              :value="item.key"
            />
          </el-select>
          <el-input v-model="article.listQuery.search" :clearable="true" placeholder="请输入..." style="width:250px">
            <el-button slot="append" icon="el-icon-search" />
          </el-input>
        </div>
      </template>
      <!--操作图标组-->
      <template v-slot:iconGroup>
        <div class="tableData-icons">
          <div class="icon-item">
            <i class="el-icon-edit" />
            <span>上架</span>
          </div>
          <div class="icon-item">
            <i class="el-icon-edit" />
            <span>下架</span>
          </div>
          <div class="icon-item">
            <i class="el-icon-edit" />
            <span>栏目分类</span>
          </div>
          <div class="icon-item">
            <i class="el-icon-edit" />
            <span>添加文章</span>
          </div>
        </div>
      </template>
    </TablePage>
  </div>
</template>

<script>
import TablePage from '@/components/TableData'
export default {
  components: {
    TablePage
  },
  data() {
    return {
      article: {
        listQuery: {
          search: '',
          status: ''
        },
        statusList: [
          { key: '', label: '全部状态' },
          { key: 1, label: '上架' },
          { key: 2, label: '置顶' },
          { key: 3, label: '下架' }
        ],
        fields: [
          { type: 'selection', width: 50 },
          { title: '标题', isHref: true, width: '406' },
          { title: '所属分类', key: 'classify' },
          { title: '状态', key: 'status' },
          { title: '创建时间', key: 'creatDate' },
          { title: '更新时间', key: 'updateDate' },
          {
            title: '操作',
            key: 'handle',
            btns: [
              {
                icon: 'el-icon-edit',
                text: '编辑',
                method: 'handleEdit'
              },
              {
                icon: 'el-icon-delete',
                text: '删除',
                method: 'handleDelete'
              }
            ]
          }
        ],
        list: [
          {
            img1: 'http://127.0.0.1:32767/09.13.03/images/n1_%E6%96%87%E7%AB%A0%E5%88%97%E8%A1%A8/u150.png',
            img2: 'http://127.0.0.1:32767/09.13.03/images/n1_%E6%96%87%E7%AB%A0%E5%88%97%E8%A1%A8/u171.png',
            title: '大江大河大上海——上海70年开放创新发展巡礼大江大河大上海——上海70年开放创新发展巡礼大江大河大上海——上海70年开放创新发展巡礼',
            url: 'http://politics.people.com.cn/n1/2019/0816/c1001-31299025.html',
            classify: '上架',
            status: '上架',
            creatDate: '2019-09-18 08:35:20',
            updateDate: '2019-09-18 11:00:00'
          },
          {
            img1: 'http://127.0.0.1:32767/09.13.03/images/n1_%E6%96%87%E7%AB%A0%E5%88%97%E8%A1%A8/u150.png',
            img2: 'http://127.0.0.1:32767/09.13.03/images/n1_%E6%96%87%E7%AB%A0%E5%88%97%E8%A1%A8/u171.png',
            title: '大江大河大上海——上海70年开放创新发展巡礼',
            url: 'http://politics.people.com.cn/n1/2019/0816/c1001-31299025.html',
            classify: '上架',
            status: '上架',
            creatDate: '2019-09-18 08:35:20',
            updateDate: '2019-09-18 11:00:00'
          }
        ],
        total: 2
      }
    }
  },
  methods: {
    handleSelectionChange(val) {
      console.log('选择的数据：', val)
    },
    handleEdit(obj) {
      console.log(obj)
    },
    handleDelete(obj) {
      console.log(obj)
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
  margin-bottom: 20px;
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
  a:hover {
    color: #007bff;
    text-decoration: underline;
  }
  a{
    width: 300px;
    color: #007bff;
    text-decoration: none;
    background-color: transparent;
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
}
</style>
