<template>
  <div class="page-container">
    <Table
      :fields="fields"
      :items="list"
      :total="total"
      :loading="loading"
    />
  </div>
</template>

<script>
import Table from '@/components/TableData'
import { getMemberList, delMember } from '@/api/member/memberlList'
import { del } from '@/utils/delete'
export default {
  name: 'MemberList',
  components: {
    Table
  },
  data() {
    return {
      query: {
        page_number: 1,
        page_size: 10
      },
      fields: [
        { type: 'selection', width: 50 },
        { title: '序号', type: 'index', width: 50 },
        { title: '分组名', key: 'name' },
        { title: '创建时间', key: 'create_time' },
        {
          title: '操作',
          key: 'handle',
          btns: [
            {
              icon: 'el-icon-edit',
              text: '',
              tip: '编辑',
              method: 'editThis'
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
      loading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.loading = true
      getMemberList(this.query).then(res => {
        console.log(res)
        this.loading = false
        this.list = res.data.list
        this.total = res.data.total
      })
    },
    editThis(row) {
      console.log(row)
    },
    handleDelete(obj) {
      const _this = this
      del(_this, obj.id, () => {
        delMember(obj.id.toString()).then(res => {
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
  }
}
</script>

<style lang="scss" scoped>
  .page-container {
    padding: 20px;
  }
  /deep/ .form-box{
    margin-top: 0;
  }
</style>
