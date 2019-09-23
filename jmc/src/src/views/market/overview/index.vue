<template>
  <div class="page-container">
    <!-- 已筛选区 -->
    <TableFilters :filter-pramas.sync="filterPramas" />
    <TablePage
      :fields="fields"
      :items="tableData"
      :filter-pramas.sync="filterPramas"
      :total="18"
      :multiple-opera="multipleOpera"
      :form-data="formData"
      @cell-click="cellClick"
      @selection-change="handleSelectionChange"
      @search="searchHandle"
      @pagination-change="paginationChange"
    />
  </div>
</template>

<script>
import TablePage from '@/components/TableData'
import TableFilters from '@/components/TableFilters'

export default {
  name: 'Overview',
  components: {
    TablePage,
    TableFilters
  },
  data() {
    return {
      fields: [
        { type: 'selection', width: 50 },
        { title: '序号', type: 'index', width: 50 },
        {
          title: '文章栏目',
          key: 'column',
          render: (h, params) => {
            const _this = this
            return h('el-input', {
              props: {
                size: 'small'
              },
              attrs: {
                value: params.row.column
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
                  params.row.column = value
                }
              }
            })
          }
        },
        {
          title: '文章类型',
          key: 'type',
          render: (h, params) => {
            return h('a', {
              attrs: {
                href: 'https://www.baidu.com'
              }
            }, params.row.type)
          }
        },
        {
          title: '文章标题',
          key: 'title',
          width: 300,
          sortable: true,
          filterData: [{ text: '2016-05-01', value: '2016-05-01' }],
          // 决定怎么筛选数据
          filterHandler(value, row, column) {
            console.log(value)
            console.log(row)
            console.log(column)
            const property = column['property']
            return row[property] === value
          }
        },
        { title: '关键词', key: 'key' },
        { title: '状态', key: 'status' },
        { title: '生成时间', key: 'creatDate' },
        { title: '发布时间', key: 'creatDate' },
        { title: '收录情况', key: 'address' },
        {
          title: '操作',
          btns: [
            {
              icon: 'el-icon-edit',
              text: '',
              tip: '编辑',
              method: 'edit'
            },
            {
              icon: 'el-icon-edit',
              text: '',
              method: 'edit'
            }
          ]
        }
      ],
      tableData: [],
      tableData1: [
        {
          id: 1,
          column: '汽车配件',
          creatDate: '2016-05-02',
          type: '品牌200问',
          key: '汽车配件',
          status: '1',
          title: '作为汽修人，必须要了解的汽修专用工具',
          address: 'x'
        },
        {
          id: 2,
          column: '汽车配件',
          creatDate: '2016-05-02',
          type: '品牌200问',
          key: '汽车配件',
          status: '1',
          title: '作为汽修人，必须要了解的汽修专用工具',
          address: 'x'
        },
        {
          id: 3,
          column: '汽车配件',
          creatDate: '2016-05-02',
          type: '品牌200问',
          key: '汽车配件',
          status: '1',
          title: '作为汽修人，必须要了解的汽修专用工具',
          address: 'x'
        },
        {
          id: 4,
          column: '汽车配件',
          creatDate: '2016-05-02',
          type: '品牌200问',
          key: '汽车配件',
          status: '1',
          title: '作为汽修人，必须要了解的汽修专用工具',
          address: 'x'
        },
        {
          id: 5,
          column: '汽车配件',
          creatDate: '2016-05-02',
          type: '品牌200问',
          key: '汽车配件',
          status: '1',
          title: '作为汽修人，必须要了解的汽修专用工具',
          address: 'x'
        },
        {
          id: 6,
          column: '汽车配件',
          creatDate: '2016-05-02',
          type: '品牌200问',
          key: '汽车配件',
          status: '1',
          title: '作为汽修人，必须要了解的汽修专用工具',
          address: 'x'
        },
        {
          id: 7,
          column: '汽车配件',
          creatDate: '2016-05-02',
          type: '品牌200问',
          key: '汽车配件',
          status: '1',
          title: '作为汽修人，必须要了解的汽修专用工具',
          address: 'x'
        },
        {
          id: 8,
          column: '汽车配件',
          creatDate: '2016-05-02',
          type: '品牌200问',
          key: '汽车配件',
          status: '1',
          title: '作为汽修人，必须要了解的汽修专用工具',
          address: 'x'
        },
        {
          id: 9,
          column: '汽车配件',
          creatDate: '2016-05-02',
          type: '品牌200问',
          key: '汽车配件',
          status: '1',
          title: '作为汽修人，必须要了解的汽修专用工具',
          address: 'x'
        },
        {
          id: 10,
          column: '汽车配件',
          creatDate: '2016-05-02',
          type: '品牌200问',
          key: '汽车配件',
          status: '1',
          title: '作为汽修人，必须要了解的汽修专用工具必须要了解的汽修专用工具必须要了解的汽修专用工具必须要了解的汽修专用工具',
          address: 'x'
        }
      ],
      tableData2: [
        {
          id: 11,
          column: '汽车配件',
          creatDate: '2016-05-02',
          type: '品牌200问',
          key: '汽车配件',
          status: '1',
          title: '作为汽修人，必须要了解的汽修专用工具',
          address: 'x'
        },
        {
          id: 12,
          column: '汽车配件',
          creatDate: '2016-05-02',
          type: '品牌200问',
          key: '汽车配件',
          status: '1',
          title: '作为汽修人，必须要了解的汽修专用工具',
          address: 'x'
        },
        {
          id: 13,
          column: '汽车配件',
          creatDate: '2016-05-02',
          type: '品牌200问',
          key: '汽车配件',
          status: '1',
          title: '作为汽修人，必须要了解的汽修专用工具',
          address: 'x'
        },
        {
          id: 14,
          column: '汽车配件',
          creatDate: '2016-05-02',
          type: '品牌200问',
          key: '汽车配件',
          status: '1',
          title: '作为汽修人，必须要了解的汽修专用工具',
          address: 'x'
        },
        {
          id: 15,
          column: '汽车配件',
          creatDate: '2016-05-02',
          type: '品牌200问',
          key: '汽车配件',
          status: '1',
          title: '作为汽修人，必须要了解的汽修专用工具',
          address: 'x'
        }
      ],
      multipleOpera: [
        {
          icon: 'el-icon-edit',
          text: '编辑',
          method: 'edit'
        },
        {
          icon: 'el-icon-upload2',
          text: '导出',
          type: 'export'
        }
      ],
      formData: [
        {
          label: '性别',
          element: 'select',
          key: 'sex',
          placeholder: '请输入性别',
          // element为select时必须传option
          option: [
            { label: '男', value: 1 },
            { label: '女', value: 0 }
          ]
        },
        {
          label: '名字',
          element: 'input',
          key: 'name',
          placeholder: '请输入姓名',
          isSearchItem: true
        },
        {
          label: '名字',
          element: 'inputSelect',
          key: 'name',
          width: '400px',
          // element为inputSelect时必须传selectKey作为选择的字段和option
          selectKey: 'sex',
          placeholder: '请输入姓名',
          selectPlaceholder: '请选择',
          selectWidth: '100px',
          option: [
            { label: '男', value: 1, default: true },
            { label: '女', value: 0 }
          ],
          isSearchItem: true,
          btnWidth: '50px'
        }
      ],
      form: {},
      filterPramas: []
    }
  },
  computed: {
    siteId() {
      return this.$store.state.market.siteId // 需要监听的数据
    }
  },
  watch: {
    // 监听侧边栏站点选择的改变，重新请求数据
    siteId(newVal, oldVal) {
      console.log('站点id:', newVal)
    }
  },
  created() {
    this.tableData = this.tableData1
  },
  methods: {
    edit(row, index) {
      console.log(row, index)
      this.$message(`点击了第${index + 1}行`)
    },
    handleSelectionChange(val) {
      console.log('选择的数据：', val)
    },
    searchHandle(val) {
      console.log('搜索：', val)
    },
    cellClick(row, key) {
      console.log(row)
      this.$message(`点击了 ${row[key]}行`)
    },
    inputHandler(e, data) {
      console.log(data)
    },
    paginationChange(value) {
      if (value.page === 2) this.tableData = this.tableData2
      if (value.page === 1) this.tableData = this.tableData1
    }
  }
}
</script>

<style lang="scss" scoped>
  .page-container {
    margin: 20px;
  }
</style>
