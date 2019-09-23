<template>
  <div class="outer-container">
    <!-- header -->
    <section class="header">
      <el-row type="flex" align="bottom">
        <el-col :span="11">
          <div class="lable">源域名</div>
          <el-input v-model.trim="domain" placeholder="请输入......" />
        </el-col>
        <el-col :span="11">
          <div class="lable">目标域名</div>
          <el-input v-model.trim="redirect_url" placeholder="请输入......" />
        </el-col>
        <el-col :span="2">
          <el-button @click="addList">添加</el-button>
        </el-col>
      </el-row>
    </section>
    <!-- main -->
    <section class="main">
      <Table
        :fields="fields"
        :items="list"
        :total="query.total"
        @removeList="removeList"
      />
    </section>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <span>{{ dialogVisibleMessage }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import Table from '@/components/TableData/index'
import { getList, addList, removeList } from '@/api/websiteManage/redirect301'

export default {
  name: 'Redirect301',
  components: {
    Table
  },
  data() {
    return {
      query: {
        page_count: 0,
        page_number: 1,
        page_size: 20,
        total: 0
      },
      domain: '',
      redirect_url: '',
      dialogVisible: false,
      dialogVisibleMessage: '',
      fields: [
        { type: 'selection', width: 50 },
        { title: '序号', type: 'index', width: 50 },
        { title: '源域名', key: 'domain' },
        { title: '目标域名', key: 'redirect_url' },
        { title: '添加人', key: 'createor' },
        { title: '添加时间', key: 'create_time' },
        { title: '状态', key: 'status' },
        {
          title: '操作',
          key: 'handle',
          btns: [
            {
              icon: 'el-icon-delete',
              text: '',
              tip: '删除',
              method: 'removeList'
            }
          ]
        }
      ],
      list: [
        {
          'id': 1,
          'site_id': 1,
          'domain': 'www.domian-init.com',
          'redirect_id': 1,
          'status': 1,
          'createor': 0,
          'create_time': '2019-09-18 10:32:05',
          'redirect_url': 'www.domian-point.com'
        },
        {
          'id': 2,
          'site_id': 1,
          'domain': 'www.domian-point.com',
          'redirect_id': 0,
          'type': 1,
          'status': 1,
          'createor': 0,
          'create_time': '2019-09-18 10:32:05',
          'redirect_url': ''
        }
      ]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      getList({ site_id: 1 })
        .then((res) => {
          this.list = res.data.list
          this.query.page_count = res.data.page_count
          this.query.page_number = res.data.page_number
          this.query.page_size = res.data.page_size
          this.query.total = res.data.total
          console.log('获取列表成功')
        })
    },
    addList() {
      addList({ site_id: 1, domain_init: this.domain, domain_point: this.redirect_url })
        .then(() => {
          this.dialogVisible = true
          this.dialogVisibleMessage = '添加成功'
          console.log('添加列表成功')
        })
    },
    removeList(currentElement) {
      removeList({ site_id: 1, id: currentElement.id })
        .then(() => {
          this.dialogVisible = true
          this.dialogVisibleMessage = '删除成功'
          console.log('删除列表成功')
        })
    }
  }
}
</script>

<style scoped lang="scss">
.outer-container {
  padding: 20px;

  .header{
    width: 100%;
    max-width: 800px;
    .lable{
      color: #606266;
      font-size: 12px;
      margin-bottom: 5px;
    }
    .el-col:first-of-type{
      margin-left: 0;
    }
    .el-col{
      margin-left: 20px;
    }
  }
}
</style>
